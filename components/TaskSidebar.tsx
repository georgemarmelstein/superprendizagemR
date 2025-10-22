'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Plus } from 'lucide-react'
import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'
import { TASK_DEFINITIONS, getColorClasses } from '@/lib/taskDefinitions'
import { TaskDefinition } from '@/types/workflow'

interface TaskCardProps {
  task: TaskDefinition
  onDragStart: (e: React.DragEvent, task: TaskDefinition) => void
}

function TaskCard({ task, onDragStart }: TaskCardProps) {
  const Icon = (Icons as any)[task.icon] || Icons.Circle
  const colors = getColorClasses(task.color)

  return (
    <motion.div
      draggable
      onDragStart={(e: any) => onDragStart(e, task)}
      className={`p-3 bg-zinc-800 border ${colors.border} rounded-lg cursor-grab active:cursor-grabbing
        hover:scale-105 transition-all group relative`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      title={task.description}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 ${colors.bg} rounded-lg flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-zinc-100 truncate">
            {task.name}
          </h4>
          <p className="text-xs text-zinc-400 truncate">
            {task.description}
          </p>
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute left-full ml-2 top-0 bg-zinc-900 border border-zinc-700 rounded-lg p-3
        opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 w-64 shadow-xl">
        <p className="text-sm text-zinc-300">{task.description}</p>
      </div>
    </motion.div>
  )
}

interface SectionProps {
  title: string
  tasks: TaskDefinition[]
  onDragStart: (e: React.DragEvent, task: TaskDefinition) => void
}

function Section({ title, tasks, onDragStart }: SectionProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-zinc-800 rounded-lg transition-colors mb-2"
      >
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        )}
        <span className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
          {title}
        </span>
      </button>

      {isOpen && (
        <div className="space-y-2 px-1">
          {tasks.map((task) => (
            <TaskCard key={task.type} task={task} onDragStart={onDragStart} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function TaskSidebar() {
  const handleDragStart = (e: React.DragEvent, task: TaskDefinition) => {
    e.dataTransfer.setData('application/reactflow', JSON.stringify(task))
    e.dataTransfer.effectAllowed = 'move'
  }

  const basicTasks = TASK_DEFINITIONS.filter(t => t.type !== 'checkpoint')
  const specialTasks = TASK_DEFINITIONS.filter(t => t.type === 'checkpoint')

  return (
    <aside className="w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-lg font-bold text-zinc-100">Tarefas</h2>
        <p className="text-xs text-zinc-400 mt-1">Arraste para o canvas</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
        <Section title="Básicas" tasks={basicTasks} onDragStart={handleDragStart} />
        <Section title="Especiais" tasks={specialTasks} onDragStart={handleDragStart} />

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide px-3 mb-2">
            Minhas Tarefas
          </h3>
          <button className="w-full p-3 border-2 border-dashed border-zinc-700 hover:border-zinc-600
            rounded-lg flex items-center justify-center gap-2 text-zinc-400 hover:text-zinc-300
            transition-colors group">
            <Plus className="w-4 h-4" />
            <span className="text-sm">Criar Nova Tarefa</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
