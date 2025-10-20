import React from 'react';
import {
  Database,
  BarChart3,
  Lightbulb,
  Search,
  FileEdit,
  GitBranch,
  Plus,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaskType } from '@/lib/types';

interface TaskButtonProps {
  type: TaskType;
  name: string;
  icon: string;
  color: string;
  onDragStart?: (e: React.DragEvent) => void;
  onClick?: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  Database,
  BarChart3,
  Lightbulb,
  Search,
  FileEdit,
  GitBranch,
  Plus,
};

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-500/10 border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500',
  purple: 'bg-purple-500/10 border-purple-500/50 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500',
  yellow: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500',
  orange: 'bg-orange-500/10 border-orange-500/50 text-orange-400 hover:bg-orange-500/20 hover:border-orange-500',
  pink: 'bg-pink-500/10 border-pink-500/50 text-pink-400 hover:bg-pink-500/20 hover:border-pink-500',
  red: 'bg-red-500/10 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-500',
};

export function TaskButton({
  type,
  name,
  icon,
  color,
  onDragStart,
  onClick,
}: TaskButtonProps) {
  const Icon = iconMap[icon] || Plus;

  return (
    <button
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all cursor-grab active:cursor-grabbing font-medium whitespace-nowrap',
        colorClasses[color] || colorClasses.blue
      )}
    >
      <Icon size={20} />
      <span>{name}</span>
    </button>
  );
}
