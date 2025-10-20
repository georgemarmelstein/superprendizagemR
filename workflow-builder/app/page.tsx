'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Plus, Play, Pause, Square, Save } from 'lucide-react';
import { Button } from '@/components/Button';
import { TaskBar } from '@/components/TaskBar';
import { WorkflowCanvas } from '@/components/WorkflowCanvas';
import { TaskCard } from '@/components/TaskCard';
import { TaskConfigModal } from '@/components/TaskConfigModal';
import { CheckpointModal } from '@/components/CheckpointModal';
import {
  Task,
  TaskType,
  ClaudeModel,
  ExecutionStatus,
  CheckpointOption,
  CheckpointDecision,
} from '@/lib/types';
import { generateId, parseCheckpointResponse } from '@/lib/utils';
import { TASK_TYPES, LOADING_MESSAGES, DEFAULT_TEMPLATE } from '@/lib/constants';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [pendingTaskType, setPendingTaskType] = useState<TaskType | null>(null);
  const [pendingTaskName, setPendingTaskName] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [executionStatus, setExecutionStatus] = useState<ExecutionStatus>('idle');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [accumulatedContext, setAccumulatedContext] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [checkpointDecision, setCheckpointDecision] = useState<CheckpointDecision | null>(null);

  const checkpointDecisionsRef = useRef<Map<string, CheckpointDecision>>(new Map());
  const executionAbortRef = useRef(false);

  // Loading message rotation
  useEffect(() => {
    if (executionStatus === 'running') {
      let messageIndex = 0;
      setLoadingMessage(LOADING_MESSAGES[0]);

      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
        setLoadingMessage(LOADING_MESSAGES[messageIndex]);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [executionStatus]);

  // Handle adding task
  const handleAddTask = (type: TaskType, customName?: string) => {
    const taskConfig = TASK_TYPES.find((t) => t.type === type);
    const name = customName || taskConfig?.name || 'Tarefa Personalizada';
    const defaultPrompt = taskConfig?.defaultPrompt || '';

    setPendingTaskType(type);
    setPendingTaskName(name);
    setEditingTask(null);
    setConfigModalOpen(true);
  };

  // Handle task configuration save
  const handleSaveTaskConfig = (config: {
    description: string;
    prompt: string;
    model: ClaudeModel;
    attachment?: { filename: string; content: string };
  }) => {
    if (editingTask) {
      // Update existing task
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                description: config.description,
                prompt: config.prompt,
                model: config.model,
                attachment: config.attachment,
              }
            : t
        )
      );
    } else if (pendingTaskType) {
      // Add new task
      const newTask: Task = {
        id: generateId(),
        type: pendingTaskType,
        name: pendingTaskName,
        description: config.description,
        prompt: config.prompt,
        model: config.model,
        attachment: config.attachment,
        status: 'pending',
        order: tasks.length,
      };
      setTasks((prev) => [...prev, newTask]);
    }

    setConfigModalOpen(false);
    setPendingTaskType(null);
    setEditingTask(null);
  };

  // Handle task edit
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setConfigModalOpen(true);
  };

  // Handle task delete
  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Handle task move
  const handleMoveTask = (taskId: string, direction: 'up' | 'down') => {
    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === taskId);
      if (index === -1) return prev;

      const newTasks = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= newTasks.length) return prev;

      [newTasks[index], newTasks[targetIndex]] = [newTasks[targetIndex], newTasks[index]];
      return newTasks;
    });
  };

  // Execute a single task
  const executeTask = async (task: Task, context: string): Promise<string> => {
    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: task.prompt,
          model: task.model,
          context,
          attachment: task.attachment,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to execute task');
      }

      const data = await response.json();
      return data.response;
    } catch (error: any) {
      throw new Error(error.message || 'Unknown error');
    }
  };

  // Handle checkpoint decision
  const handleCheckpointDecision = (taskId: string, optionIndex?: number, customDecision?: string) => {
    const decision: CheckpointDecision = {
      taskId,
      options: checkpointDecision?.options || [],
      selectedOption: optionIndex,
      customDecision,
    };

    checkpointDecisionsRef.current.set(taskId, decision);
    setCheckpointDecision(null);

    // Continue execution
    continueExecution();
  };

  // Continue execution after checkpoint
  const continueExecution = async () => {
    if (executionAbortRef.current) return;

    for (let i = currentTaskIndex; i < tasks.length; i++) {
      if (executionAbortRef.current || executionStatus === 'paused') break;

      const task = tasks[i];
      setCurrentTaskIndex(i);

      // Update task status to executing
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: 'executing' } : t))
      );

      try {
        // Build context
        let context = accumulatedContext;

        // Add previous task results
        for (let j = 0; j < i; j++) {
          const prevTask = tasks[j];
          if (prevTask.result) {
            context += `\n\n=== ${prevTask.description} ===\n${prevTask.result}`;
          }
        }

        // Execute task
        const result = await executeTask(task, context);

        // Check if it's a checkpoint
        if (task.type === 'CHECKPOINT') {
          const options = parseCheckpointResponse(result);

          // Show checkpoint modal
          setCheckpointDecision({
            taskId: task.id,
            options,
          });

          // Mark task as completed
          setTasks((prev) =>
            prev.map((t) =>
              t.id === task.id
                ? { ...t, status: 'completed', result }
                : t
            )
          );

          // Wait for user decision
          return;
        } else {
          // Regular task - mark as completed
          setTasks((prev) =>
            prev.map((t) =>
              t.id === task.id
                ? { ...t, status: 'completed', result }
                : t
            )
          );

          // Update context
          setAccumulatedContext((prev) => prev + `\n\n=== ${task.description} ===\n${result}`);
        }
      } catch (error: any) {
        // Mark task as error
        setTasks((prev) =>
          prev.map((t) =>
            t.id === task.id
              ? { ...t, status: 'error', error: error.message }
              : t
          )
        );

        // Stop execution on error
        setExecutionStatus('stopped');
        return;
      }
    }

    // All tasks completed
    setExecutionStatus('idle');
    setCurrentTaskIndex(0);
  };

  // Start execution
  const handleStartExecution = () => {
    if (tasks.length === 0) return;

    executionAbortRef.current = false;
    setExecutionStatus('running');
    setCurrentTaskIndex(0);
    setAccumulatedContext('');

    // Reset all task statuses
    setTasks((prev) =>
      prev.map((t) => ({ ...t, status: 'pending', result: undefined, error: undefined }))
    );

    continueExecution();
  };

  // Pause execution
  const handlePauseExecution = () => {
    setExecutionStatus('paused');
  };

  // Resume execution
  const handleResumeExecution = () => {
    setExecutionStatus('running');
    continueExecution();
  };

  // Stop and reset execution
  const handleStopExecution = () => {
    executionAbortRef.current = true;
    setExecutionStatus('stopped');
    setCurrentTaskIndex(0);

    // Mark all executing tasks as stopped
    setTasks((prev) =>
      prev.map((t) =>
        t.status === 'executing'
          ? { ...t, status: 'error', error: '⏹️ Execução interrompida' }
          : t
      )
    );
  };

  // New workflow
  const handleNewWorkflow = () => {
    if (tasks.length > 0) {
      const confirmed = confirm('Tem certeza que deseja criar um novo fluxo? Todas as tarefas atuais serão perdidas.');
      if (!confirmed) return;
    }

    setTasks([]);
    setExecutionStatus('idle');
    setCurrentTaskIndex(0);
    setAccumulatedContext('');
    setCheckpointDecision(null);
    checkpointDecisionsRef.current.clear();
    executionAbortRef.current = false;
  };

  // Load default template
  const handleLoadTemplate = () => {
    const confirmed = confirm('Carregar template "Elaboração de Sentença"?');
    if (!confirmed) return;

    const templateTasks: Task[] = DEFAULT_TEMPLATE.map((t, index) => ({
      id: generateId(),
      type: t.type,
      name: t.name,
      description: t.description,
      prompt: t.prompt,
      model: 'claude-sonnet-4-20250514',
      status: 'pending',
      order: index,
    }));

    setTasks(templateTasks);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold">Claude Workflow Builder</h1>
          <div className="flex gap-3">
            <Button variant="success" size="sm" onClick={handleLoadTemplate} icon={<Save size={18} />}>
              Template: Sentença
            </Button>
            <Button variant="primary" onClick={handleNewWorkflow} icon={<Plus size={20} />}>
              Novo Fluxo
            </Button>
          </div>
        </div>
      </header>

      {/* Task Bar */}
      <TaskBar onAddTask={handleAddTask} />

      {/* Canvas */}
      <WorkflowCanvas tasks={tasks} onDrop={(taskType) => handleAddTask(taskType as TaskType)}>
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            isFirst={index === 0}
            onEdit={() => handleEditTask(task)}
            onDelete={() => handleDeleteTask(task.id)}
            onMoveUp={() => handleMoveTask(task.id, 'up')}
            onMoveDown={() => handleMoveTask(task.id, 'down')}
            canMoveUp={index > 0}
            canMoveDown={index < tasks.length - 1}
          />
        ))}
      </WorkflowCanvas>

      {/* Execution Controls */}
      {tasks.length > 0 && (
        <div className="bg-zinc-900 border-t border-zinc-800 p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex-1">
              {executionStatus === 'running' && (
                <p className="text-zinc-300 animate-pulse">{loadingMessage}</p>
              )}
              {executionStatus === 'paused' && (
                <p className="text-yellow-400">⏸️ Execução pausada</p>
              )}
            </div>

            <div className="flex gap-3">
              {executionStatus === 'idle' && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleStartExecution}
                  icon={<Play size={24} />}
                >
                  Executar Fluxo Completo
                </Button>
              )}

              {executionStatus === 'running' && (
                <>
                  <Button
                    variant="secondary"
                    onClick={handlePauseExecution}
                    icon={<Pause size={20} />}
                  >
                    Pausar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleStopExecution}
                    icon={<Square size={20} />}
                  >
                    Parar e Zerar
                  </Button>
                </>
              )}

              {executionStatus === 'paused' && (
                <>
                  <Button
                    variant="success"
                    onClick={handleResumeExecution}
                    icon={<Play size={20} />}
                  >
                    Retomar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleStopExecution}
                    icon={<Square size={20} />}
                  >
                    Parar e Zerar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Task Config Modal */}
      <TaskConfigModal
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
        onSave={handleSaveTaskConfig}
        initialConfig={
          editingTask
            ? {
                description: editingTask.description,
                prompt: editingTask.prompt,
                model: editingTask.model,
                attachment: editingTask.attachment,
              }
            : pendingTaskType
            ? {
                description: pendingTaskName,
                prompt:
                  TASK_TYPES.find((t) => t.type === pendingTaskType)?.defaultPrompt || '',
                model: 'claude-sonnet-4-20250514',
              }
            : undefined
        }
      />

      {/* Checkpoint Modal */}
      {checkpointDecision && (
        <CheckpointModal
          isOpen={true}
          options={checkpointDecision.options}
          onDecision={(optionIndex, customDecision) =>
            handleCheckpointDecision(
              checkpointDecision.taskId,
              optionIndex,
              customDecision
            )
          }
        />
      )}
    </div>
  );
}
