import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl',
        hover && 'hover:border-zinc-700 transition-colors cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
