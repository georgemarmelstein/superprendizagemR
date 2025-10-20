'use client';

import React from 'react';
import {
  Database,
  BarChart3,
  Lightbulb,
  Search,
  FileEdit,
  GitBranch,
  Plus,
  GripVertical,
  Edit,
  Trash2,
  File,
  CheckCircle,
  XCircle,
  Loader2,
  Pause,
  LucideIcon,
} from 'lucide-react';
import { Card } from './Card';
import { Task } from '@/lib/types';
import { CLAUDE_MODELS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  isFirst: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  EXTRACTION: Database,
  ANALYSIS: BarChart3,
  IDEA_GENERATION: Lightbulb,
  RESEARCH: Search,
  WRITING: FileEdit,
  CHECKPOINT: GitBranch,
  CUSTOM: Plus,
};

const colorClasses: Record<string, string> = {
  EXTRACTION: 'text-blue-400 bg-blue-500/10 border-blue-500/50',
  ANALYSIS: 'text-purple-400 bg-purple-500/10 border-purple-500/50',
  IDEA_GENERATION: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/50',
  RESEARCH: 'text-orange-400 bg-orange-500/10 border-orange-500/50',
  WRITING: 'text-pink-400 bg-pink-500/10 border-pink-500/50',
  CHECKPOINT: 'text-red-400 bg-red-500/10 border-red-500/50',
  CUSTOM: 'text-purple-400 bg-purple-500/10 border-purple-500/50',
};

export function TaskCard({
  task,
  isFirst,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: TaskCardProps) {
  const Icon = iconMap[task.type] || Plus;
  const modelLabel = CLAUDE_MODELS.find((m) => m.value === task.model)?.label || 'Sonnet 4';

  const getStatusBorder = () => {
    if (task.status === 'executing') return 'border-blue-500 shadow-lg shadow-blue-500/20';
    if (task.status === 'completed') return 'border-emerald-500';
    if (task.status === 'error') return 'border-red-500';
    if (task.status === 'paused') return 'border-yellow-500';
    return 'border-zinc-800';
  };

  const getStatusIcon = () => {
    if (task.status === 'executing')
      return <Loader2 className="text-blue-400 animate-spin" size={20} />;
    if (task.status === 'completed')
      return <CheckCircle className="text-emerald-400" size={20} />;
    if (task.status === 'error')
      return <XCircle className="text-red-400" size={20} />;
    if (task.status === 'paused')
      return <Pause className="text-yellow-400" size={20} />;
    return null;
  };

  return (
    <Card className={cn('p-6 transition-all', getStatusBorder())}>
      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border',
            colorClasses[task.type] || colorClasses.CUSTOM
          )}
        >
          <Icon size={24} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                {task.description}
              </h3>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <span className="flex items-center gap-1">
                  🤖 {modelLabel}
                </span>
                {task.attachment && (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <File size={14} />
                    {task.attachment.filename}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {getStatusIcon()}

              {task.status === 'pending' && (
                <>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={onMoveUp}
                      disabled={!canMoveUp}
                      className="p-1 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Mover para cima"
                    >
                      <GripVertical size={16} />
                    </button>
                    <button
                      onClick={onMoveDown}
                      disabled={!canMoveDown}
                      className="p-1 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Mover para baixo"
                    >
                      <GripVertical size={16} />
                    </button>
                  </div>

                  <button
                    onClick={onEdit}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={onDelete}
                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Deletar"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Status Messages */}
          {task.status === 'executing' && (
            <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300">Executando...</p>
            </div>
          )}

          {task.status === 'paused' && (
            <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-sm text-yellow-300">⏸️ Pausado</p>
            </div>
          )}

          {task.status === 'completed' && task.result && (
            <div className="mt-3 p-4 bg-zinc-800 border border-zinc-700 rounded-lg">
              <p className="text-sm text-zinc-300 whitespace-pre-wrap line-clamp-6">
                {task.result}
              </p>
            </div>
          )}

          {task.status === 'error' && task.error && (
            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-300">❌ Erro: {task.error}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
