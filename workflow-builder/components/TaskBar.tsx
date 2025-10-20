'use client';

import React, { useState } from 'react';
import { TaskButton } from './TaskButton';
import { Modal } from './Modal';
import { Button } from './Button';
import { TASK_TYPES } from '@/lib/constants';
import { TaskType } from '@/lib/types';

interface TaskBarProps {
  onAddTask: (type: TaskType, customName?: string) => void;
}

export function TaskBar({ onAddTask }: TaskBarProps) {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customTaskName, setCustomTaskName] = useState('');

  const handleDragStart = (type: TaskType) => (e: React.DragEvent) => {
    e.dataTransfer.setData('taskType', type);
  };

  const handleClick = (type: TaskType) => {
    if (type === 'CUSTOM') {
      setShowCustomModal(true);
    } else {
      onAddTask(type);
    }
  };

  const handleCustomTaskSubmit = () => {
    if (customTaskName.trim()) {
      onAddTask('CUSTOM', customTaskName.trim());
      setCustomTaskName('');
      setShowCustomModal(false);
    }
  };

  return (
    <>
      <div className="bg-zinc-900 border-b border-zinc-800 p-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">
            Tipos de Tarefas
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {TASK_TYPES.map((taskType) => (
              <TaskButton
                key={taskType.type}
                type={taskType.type}
                name={taskType.name}
                icon={taskType.icon}
                color={taskType.color}
                onDragStart={handleDragStart(taskType.type)}
                onClick={() => handleClick(taskType.type)}
              />
            ))}
            <TaskButton
              type="CUSTOM"
              name="Outras..."
              icon="Plus"
              color="purple"
              onDragStart={handleDragStart('CUSTOM')}
              onClick={() => handleClick('CUSTOM')}
            />
          </div>
        </div>
      </div>

      {/* Custom Task Modal */}
      <Modal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
        title="Criar Tarefa Personalizada"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Nome da Tarefa
            </label>
            <input
              type="text"
              value={customTaskName}
              onChange={(e) => setCustomTaskName(e.target.value)}
              placeholder="Ex: Revisão Ortográfica"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCustomTaskSubmit();
                }
              }}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => setShowCustomModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleCustomTaskSubmit}
              disabled={!customTaskName.trim()}
            >
              Criar Tarefa
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
