import { Node, Edge } from 'reactflow'

export type TaskType = 'extraction' | 'analysis' | 'ideas' | 'research' | 'writing' | 'checkpoint' | 'custom'

export type ClaudeModel = 'claude-opus-4' | 'claude-sonnet-4' | 'claude-haiku-4'

export type TaskColor = 'blue' | 'purple' | 'yellow' | 'orange' | 'pink' | 'red' | 'green' | 'cyan'

export type NodeStatus = 'idle' | 'executing' | 'completed' | 'error' | 'paused'

export interface TaskData {
  name: string
  description: string
  prompt: string
  model: ClaudeModel
  attachment?: File | null
  color: TaskColor
  icon: string
  type: TaskType
  status?: NodeStatus
  result?: string
  error?: string
}

export interface TaskNode extends Node {
  data: TaskData
}

export interface TaskResult {
  nodeId: string
  result: string
  timestamp: number
  tokensUsed?: number
  duration?: number
}

export interface CheckpointOption {
  id: string
  title: string
  positives: string[]
  negatives: string[]
  redFlags: string[]
  color: TaskColor
}

export interface CheckpointData {
  nodeId: string
  options: CheckpointOption[]
  context: string
}

export interface Workflow {
  id: string
  name: string
  description: string
  nodes: TaskNode[]
  edges: Edge[]
  tags: string[]
  createdAt: number
  updatedAt: number
}

export interface TaskDefinition {
  type: TaskType
  name: string
  icon: string
  color: TaskColor
  description: string
  defaultPrompt: string
}

export interface ExecutionLog {
  id: string
  timestamp: number
  type: 'info' | 'success' | 'error' | 'warning'
  message: string
  nodeId?: string
}
