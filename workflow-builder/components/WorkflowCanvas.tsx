'use client';

import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Task } from '@/lib/types';
import { cn } from '@/lib/utils';

interface WorkflowCanvasProps {
  tasks: Task[];
  onDrop: (taskType: string) => void;
  children?: React.ReactNode;
}

export function WorkflowCanvas({ tasks, onDrop, children }: WorkflowCanvasProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const taskType = e.dataTransfer.getData('taskType');
    if (taskType) {
      onDrop(taskType);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-black p-8">
      <div className="max-w-4xl mx-auto">
        {tasks.length === 0 ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              'border-2 border-dashed rounded-2xl p-16 text-center transition-all',
              isDraggingOver
                ? 'border-blue-500 bg-blue-500/10 scale-105'
                : 'border-zinc-800 bg-zinc-900/50'
            )}
          >
            <div className="space-y-4">
              <div className="text-6xl">📋</div>
              <h3 className="text-2xl font-bold text-white">
                {isDraggingOver ? 'Solte aqui para adicionar' : 'Seu fluxo de trabalho aparecerá aqui'}
              </h3>
              <p className="text-zinc-400 text-lg">
                Arraste tarefas da barra acima ou clique nos botões para começar
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {tasks.map((task, index) => (
              <React.Fragment key={task.id}>
                {children &&
                  React.Children.toArray(children).find(
                    (child: any) => child.props?.task?.id === task.id
                  )
                }
                {index < tasks.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowDown className="text-zinc-700" size={32} />
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* Drop zone at the end */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                'border-2 border-dashed rounded-xl p-8 text-center transition-all mt-6',
                isDraggingOver
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-zinc-800 bg-transparent hover:border-zinc-700'
              )}
            >
              <p className="text-zinc-500">
                {isDraggingOver ? '↓ Solte aqui para adicionar' : '+ Adicionar outra tarefa'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
