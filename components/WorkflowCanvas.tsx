'use client'

import { useCallback, useRef, DragEvent } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useWorkflowStore } from '@/stores/workflowStore'
import TaskNode from './TaskNode'
import { TaskDefinition, TaskData } from '@/types/workflow'
import { motion } from 'framer-motion'

const nodeTypes = {
  taskNode: TaskNode,
}

function FlowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { screenToFlowPosition } = useReactFlow()
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setSelectedNode,
  } = useWorkflowStore()

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault()

      const taskData = event.dataTransfer.getData('application/reactflow')
      if (!taskData) return

      const task: TaskDefinition = JSON.parse(taskData)
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const newNode = {
        id: `${task.type}-${Date.now()}`,
        type: 'taskNode',
        position,
        data: {
          name: task.name,
          description: task.description,
          prompt: task.defaultPrompt,
          model: 'claude-sonnet-4' as const,
          attachment: null,
          color: task.color,
          icon: task.icon,
          type: task.type,
          status: 'idle' as const,
        } as TaskData,
      }

      addNode(newNode as any)
    },
    [screenToFlowPosition, addNode]
  )

  const onNodeClick = useCallback(
    (_: any, node: any) => {
      setSelectedNode(node.id)
    },
    [setSelectedNode]
  )

  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [setSelectedNode])

  return (
    <div ref={reactFlowWrapper} className="w-full h-full bg-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-black"
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: false,
          style: { stroke: '#52525b', strokeWidth: 2 },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#27272a"
          className="bg-black"
        />
        <Controls className="bg-zinc-900 border-zinc-800" />
        <MiniMap
          className="bg-zinc-900 border-zinc-800"
          nodeColor={(node: any) => {
            const colorMap: Record<string, string> = {
              blue: '#3b82f6',
              purple: '#a855f7',
              yellow: '#eab308',
              orange: '#f97316',
              pink: '#ec4899',
              red: '#ef4444',
              green: '#22c55e',
              cyan: '#06b6d4',
            }
            return colorMap[node.data.color] || '#3b82f6'
          }}
        />

        {/* Empty State */}
        {nodes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center space-y-4">
              <div className="text-6xl">🎨</div>
              <h3 className="text-2xl font-bold text-zinc-400">
                Arraste tarefas aqui para começar
              </h3>
              <p className="text-zinc-500">ou use um template pronto</p>
            </div>
          </motion.div>
        )}
      </ReactFlow>
    </div>
  )
}

export default function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  )
}
