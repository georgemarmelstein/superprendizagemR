// Task Types
export type TaskType =
  | 'EXTRACTION'
  | 'ANALYSIS'
  | 'IDEA_GENERATION'
  | 'RESEARCH'
  | 'WRITING'
  | 'CHECKPOINT'
  | 'CUSTOM';

// Claude Models
export type ClaudeModel =
  | 'claude-sonnet-4-20250514'
  | 'claude-opus-4-20250514'
  | 'claude-haiku-4-20250514';

// Task Status
export type TaskStatus =
  | 'pending'
  | 'executing'
  | 'completed'
  | 'error'
  | 'paused';

// Execution Status
export type ExecutionStatus =
  | 'idle'
  | 'running'
  | 'paused'
  | 'stopped';

// Task Configuration
export interface Task {
  id: string;
  type: TaskType;
  name: string;
  description: string;
  prompt: string;
  model: ClaudeModel;
  attachment?: {
    filename: string;
    content: string;
  };
  status: TaskStatus;
  result?: string;
  error?: string;
  order: number;
}

// Checkpoint Option
export interface CheckpointOption {
  title: string;
  positives: string[];
  negatives: string[];
  redFlags: string[];
}

// Checkpoint Decision
export interface CheckpointDecision {
  taskId: string;
  options: CheckpointOption[];
  selectedOption?: number;
  customDecision?: string;
}

// Task Type Configuration
export interface TaskTypeConfig {
  type: TaskType;
  name: string;
  icon: string;
  color: string;
  defaultPrompt: string;
}

// Claude Model Configuration
export interface ClaudeModelConfig {
  value: ClaudeModel;
  label: string;
  description: string;
}

// Execution State
export interface ExecutionState {
  status: ExecutionStatus;
  currentTaskIndex: number;
  context: string;
}
