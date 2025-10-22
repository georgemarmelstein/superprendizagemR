import { TaskNode, CheckpointOption, CheckpointData } from '@/types/workflow'
import { Edge } from 'reactflow'

interface ExecutorCallbacks {
  onTaskStart: (nodeId: string) => void
  onTaskComplete: (nodeId: string, result: string) => void
  onTaskError: (nodeId: string, error: string) => void
  onCheckpoint: (data: CheckpointData) => Promise<string>
  addLog: (message: string, type: 'info' | 'success' | 'error' | 'warning') => void
  isPaused: () => boolean
}

export class WorkflowExecutor {
  private nodes: TaskNode[]
  private edges: Edge[]
  private callbacks: ExecutorCallbacks
  private context: string = ''

  constructor(nodes: TaskNode[], edges: Edge[], callbacks: ExecutorCallbacks) {
    this.nodes = nodes
    this.edges = edges
    this.callbacks = callbacks
  }

  async execute() {
    this.callbacks.addLog('Iniciando execução do workflow', 'info')

    // Get execution order (topological sort)
    const orderedNodes = this.getExecutionOrder()

    for (let i = 0; i < orderedNodes.length; i++) {
      // Check if paused
      while (this.callbacks.isPaused()) {
        await this.sleep(100)
      }

      const node = orderedNodes[i]

      try {
        this.callbacks.onTaskStart(node.id)
        this.callbacks.addLog(`Executando: ${node.data.name}`, 'info')

        if (node.data.type === 'checkpoint') {
          // Handle checkpoint
          const decision = await this.handleCheckpoint(node)
          this.context += `\n\n### Decisão do Checkpoint: ${node.data.name}\n${decision}\n`
          this.callbacks.onTaskComplete(node.id, decision)
        } else {
          // Regular task
          const result = await this.executeTask(node)
          this.context = result // Update context
          this.callbacks.onTaskComplete(node.id, result)
          this.callbacks.addLog(`✓ Concluído: ${node.data.name}`, 'success')
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido'
        this.callbacks.onTaskError(node.id, errorMsg)
        this.callbacks.addLog(`✗ Erro em ${node.data.name}: ${errorMsg}`, 'error')
        throw error
      }
    }

    this.callbacks.addLog('Workflow concluído com sucesso!', 'success')
  }

  private async executeTask(node: TaskNode): Promise<string> {
    const prompt = this.buildPrompt(node)

    // In a real implementation, this would call the Claude API
    // For now, we'll simulate it
    await this.sleep(2000) // Simulate API call

    // Mock response
    return `Resultado da tarefa "${node.data.name}":\n\nEsta é uma resposta simulada. Em produção, aqui viria a resposta real da API do Claude.\n\nContexto processado: ${this.context.substring(0, 100)}...`
  }

  private async handleCheckpoint(node: TaskNode): Promise<string> {
    // Generate checkpoint options
    const options = await this.generateCheckpointOptions(node)

    // Show checkpoint modal and wait for decision
    const checkpointData: CheckpointData = {
      nodeId: node.id,
      options,
      context: this.context
    }

    const decision = await this.callbacks.onCheckpoint(checkpointData)
    return decision
  }

  private async generateCheckpointOptions(node: TaskNode): Promise<CheckpointOption[]> {
    // Simulate API call to generate options
    await this.sleep(2000)

    // Mock options
    return [
      {
        id: 'option-1',
        title: 'Abordagem Conservadora',
        color: 'blue',
        positives: [
          'Menor risco de contestação',
          'Fundamentação sólida em precedentes',
          'Maior previsibilidade'
        ],
        negatives: [
          'Pode não ser a solução mais justa',
          'Menos inovadora'
        ],
        redFlags: [
          'Pode perpetuar injustiças sistêmicas'
        ]
      },
      {
        id: 'option-2',
        title: 'Abordagem Progressista',
        color: 'purple',
        positives: [
          'Mais alinhada com valores modernos',
          'Potencial de criar precedente positivo',
          'Maior justiça social'
        ],
        negatives: [
          'Maior risco de reforma',
          'Menos precedentes de apoio'
        ],
        redFlags: [
          'Pode ser vista como ativismo judicial'
        ]
      },
      {
        id: 'option-3',
        title: 'Abordagem Intermediária',
        color: 'green',
        positives: [
          'Equilibra tradição e inovação',
          'Moderadamente segura',
          'Aceitável para ambas as partes'
        ],
        negatives: [
          'Pode não satisfazer completamente ninguém',
          'Menos impacto transformador'
        ],
        redFlags: [
          'Risco de ser vista como indecisa'
        ]
      }
    ]
  }

  private buildPrompt(node: TaskNode): string {
    const contextSection = this.context
      ? `\n\n### Contexto das etapas anteriores:\n${this.context}\n`
      : ''

    return `${node.data.prompt}${contextSection}`
  }

  private getExecutionOrder(): TaskNode[] {
    // Simple execution order based on position
    // In a real implementation, this should do a proper topological sort
    return [...this.nodes].sort((a, b) => a.position.y - b.position.y)
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export async function executeWorkflow(
  nodes: TaskNode[],
  edges: Edge[],
  callbacks: ExecutorCallbacks
) {
  const executor = new WorkflowExecutor(nodes, edges, callbacks)
  await executor.execute()
}
