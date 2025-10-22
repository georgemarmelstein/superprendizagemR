import { create } from 'zustand'
import { Node, Edge, addEdge, Connection, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from 'reactflow'
import { TaskNode, TaskResult, CheckpointData, ExecutionLog, Workflow } from '@/types/workflow'
import { executeWorkflow as runWorkflowExecutor } from '@/lib/workflowExecutor'

interface WorkflowStore {
  // Workflow data
  currentWorkflow: Workflow | null
  nodes: TaskNode[]
  edges: Edge[]

  // Selection
  selectedNodeId: string | null
  setSelectedNode: (nodeId: string | null) => void

  // Node operations
  addNode: (node: TaskNode) => void
  updateNode: (id: string, data: Partial<TaskNode['data']>) => void
  deleteNode: (id: string) => void
  onNodesChange: (changes: NodeChange[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (connection: Connection) => void

  // Workflow operations
  createNewWorkflow: () => void
  loadWorkflow: (workflow: Workflow) => void
  saveWorkflow: () => void
  clearWorkflow: () => void

  // Execution state
  isExecuting: boolean
  isPaused: boolean
  currentTaskIndex: number
  results: TaskResult[]
  logs: ExecutionLog[]

  // Execution operations
  executeWorkflow: () => Promise<void>
  pauseExecution: () => void
  resumeExecution: () => void
  stopExecution: () => void
  addLog: (log: Omit<ExecutionLog, 'id' | 'timestamp'>) => void

  // Checkpoint state
  showCheckpointModal: boolean
  currentCheckpoint: CheckpointData | null
  setCheckpointData: (data: CheckpointData | null) => void
  resolveCheckpoint: (decision: string) => void
  checkpointResolver: ((decision: string) => void) | null

  // UI state
  showPropertiesPanel: boolean
  showTemplateModal: boolean
  togglePropertiesPanel: () => void
  toggleTemplateModal: () => void

  // Metrics
  totalTokensUsed: number
  totalCost: number
  executionStartTime: number | null
}

const STORAGE_KEY = 'flowclaude_workflows'

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  // Initial state
  currentWorkflow: null,
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isExecuting: false,
  isPaused: false,
  currentTaskIndex: 0,
  results: [],
  logs: [],
  showCheckpointModal: false,
  currentCheckpoint: null,
  checkpointResolver: null,
  showPropertiesPanel: true,
  showTemplateModal: false,
  totalTokensUsed: 0,
  totalCost: 0,
  executionStartTime: null,

  // Selection
  setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),

  // Node operations
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node]
  })),

  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === id
        ? { ...node, data: { ...node.data, ...data } }
        : node
    )
  })),

  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id),
    edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
    selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId
  })),

  onNodesChange: (changes) => set((state) => ({
    nodes: applyNodeChanges(changes, state.nodes) as TaskNode[]
  })),

  onEdgesChange: (changes) => set((state) => ({
    edges: applyEdgeChanges(changes, state.edges)
  })),

  onConnect: (connection) => set((state) => ({
    edges: addEdge({ ...connection, animated: false, type: 'smoothstep' }, state.edges)
  })),

  // Workflow operations
  createNewWorkflow: () => {
    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      name: 'Novo Fluxo',
      description: '',
      nodes: [],
      edges: [],
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    set({
      currentWorkflow: newWorkflow,
      nodes: [],
      edges: [],
      selectedNodeId: null,
      results: [],
      logs: []
    })
  },

  loadWorkflow: (workflow) => set({
    currentWorkflow: workflow,
    nodes: workflow.nodes,
    edges: workflow.edges,
    results: [],
    logs: []
  }),

  saveWorkflow: () => {
    const state = get()
    if (!state.currentWorkflow) return

    const updatedWorkflow: Workflow = {
      ...state.currentWorkflow,
      nodes: state.nodes,
      edges: state.edges,
      updatedAt: Date.now()
    }

    // Save to localStorage
    const workflows = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const index = workflows.findIndex((w: Workflow) => w.id === updatedWorkflow.id)

    if (index >= 0) {
      workflows[index] = updatedWorkflow
    } else {
      workflows.push(updatedWorkflow)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(workflows))
    set({ currentWorkflow: updatedWorkflow })
  },

  clearWorkflow: () => set({
    nodes: [],
    edges: [],
    selectedNodeId: null,
    results: [],
    logs: []
  }),

  // Execution
  executeWorkflow: async () => {
    const state = get()

    if (state.nodes.length === 0) {
      state.addLog({ type: 'warning', message: 'Nenhuma tarefa no workflow' })
      return
    }

    set({
      isExecuting: true,
      isPaused: false,
      executionStartTime: Date.now(),
      logs: [],
      results: []
    })

    try {
      await runWorkflowExecutor(state.nodes, state.edges, {
        onTaskStart: (nodeId) => {
          set((state) => ({
            nodes: state.nodes.map(n =>
              n.id === nodeId ? { ...n, data: { ...n.data, status: 'executing' as const } } : n
            )
          }))
        },
        onTaskComplete: (nodeId, result) => {
          set((state) => ({
            nodes: state.nodes.map(n =>
              n.id === nodeId
                ? { ...n, data: { ...n.data, status: 'completed' as const, result } }
                : n
            ),
            results: [
              ...state.results,
              {
                nodeId,
                result,
                timestamp: Date.now()
              }
            ]
          }))
        },
        onTaskError: (nodeId, error) => {
          set((state) => ({
            nodes: state.nodes.map(n =>
              n.id === nodeId
                ? { ...n, data: { ...n.data, status: 'error' as const, error } }
                : n
            )
          }))
        },
        onCheckpoint: async (data) => {
          return new Promise((resolve) => {
            set({
              currentCheckpoint: data,
              showCheckpointModal: true,
              checkpointResolver: resolve
            })
          })
        },
        addLog: (message, type) => {
          get().addLog({ message, type })
        },
        isPaused: () => get().isPaused
      })

      set({ isExecuting: false })
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido'
      get().addLog({ type: 'error', message: `Erro na execução: ${errorMsg}` })
      set({ isExecuting: false })
    }
  },

  pauseExecution: () => set({ isPaused: true }),

  resumeExecution: () => set({ isPaused: false }),

  stopExecution: () => set({
    isExecuting: false,
    isPaused: false,
    currentTaskIndex: 0,
    executionStartTime: null
  }),

  addLog: (log) => set((state) => ({
    logs: [
      ...state.logs,
      {
        ...log,
        id: Date.now().toString(),
        timestamp: Date.now()
      }
    ]
  })),

  // Checkpoint
  setCheckpointData: (data) => set({
    currentCheckpoint: data,
    showCheckpointModal: data !== null
  }),

  resolveCheckpoint: (decision) => {
    const { checkpointResolver } = get()
    if (checkpointResolver) {
      checkpointResolver(decision)
    }
    set({
      showCheckpointModal: false,
      currentCheckpoint: null,
      checkpointResolver: null
    })
  },

  // UI
  togglePropertiesPanel: () => set((state) => ({
    showPropertiesPanel: !state.showPropertiesPanel
  })),

  toggleTemplateModal: () => set((state) => ({
    showTemplateModal: !state.showTemplateModal
  }))
}))
