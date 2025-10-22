'use client'

import { memo, useMemo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Settings, Edit, Trash2, Check, AlertCircle } from 'lucide-react'
import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'
import { TaskData } from '@/types/workflow'
import { getColorClasses } from '@/lib/taskDefinitions'
import { useWorkflowStore } from '@/stores/workflowStore'

function TaskNode({ id, data, selected }: NodeProps<TaskData>) {
  const { deleteNode, setSelectedNode, nodes } = useWorkflowStore()
  const Icon = (Icons as any)[data.icon] || Icons.Circle
  const colors = getColorClasses(data.color)

  // Get node index
  const nodeIndex = useMemo(() => {
    return nodes.findIndex(n => n.id === id) + 1
  }, [nodes, id])

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    deleteNode(id)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedNode(id)
  }

  // Determine border and animation based on status
  const getBorderClass = () => {
    switch (data.status) {
      case 'executing':
        return 'border-cyan-500 shadow-lg shadow-cyan-500/50'
      case 'completed':
        return 'border-green-500 shadow-lg shadow-green-500/30'
      case 'error':
        return 'border-red-500 shadow-lg shadow-red-500/30'
      case 'paused':
        return 'border-yellow-500 shadow-lg shadow-yellow-500/30'
      default:
        return selected ? `${colors.border} shadow-lg ${colors.glow}` : 'border-zinc-700'
    }
  }

  const nodeVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    executing: {
      borderColor: ['#06b6d4', '#3b82f6', '#06b6d4'],
      scale: [1, 1.01, 1],
      transition: { duration: 2, repeat: Infinity }
    },
    error: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div
      className={`bg-zinc-900 border-2 rounded-xl overflow-hidden transition-all ${getBorderClass()}`}
      style={{ width: 320 }}
      initial="idle"
      whileHover="hover"
      animate={data.status === 'executing' ? 'executing' : data.status === 'error' ? 'error' : 'idle'}
      variants={nodeVariants}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className={`!w-3 !h-3 !border-2 ${colors.border} !bg-zinc-800 hover:!scale-150 transition-transform`}
      />

      {/* Header */}
      <div className={`${colors.bg} px-4 py-3 flex items-center gap-3`}>
        <div className="bg-white/20 p-2 rounded-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs font-bold">#{nodeIndex}</span>
            <h3 className="text-white font-bold text-sm truncate">{data.name}</h3>
          </div>
        </div>
        {data.status === 'completed' && (
          <Check className="w-5 h-5 text-white" />
        )}
        {data.status === 'error' && (
          <AlertCircle className="w-5 h-5 text-white" />
        )}
        {data.status === 'executing' && (
          <motion.div
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {data.description && (
          <p className="text-sm text-zinc-300 line-clamp-2">{data.description}</p>
        )}

        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span>Modelo:</span>
          <span className="text-zinc-300">{data.model}</span>
        </div>

        {data.attachment && (
          <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-400">
            <Icons.Paperclip className="w-3 h-3" />
            <span>Anexo</span>
          </div>
        )}

        {data.status === 'executing' && (
          <div className="flex items-center gap-2 text-xs text-cyan-400">
            <motion.div
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span>Executando...</span>
          </div>
        )}

        {data.error && (
          <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded p-2">
            {data.error}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-800 flex items-center justify-end gap-2">
        <button
          onClick={handleEdit}
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors group"
          title="Configurar"
        >
          <Settings className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
        </button>
        <button
          onClick={handleEdit}
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors group"
          title="Editar"
        >
          <Edit className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
          title="Deletar"
        >
          <Trash2 className="w-4 h-4 text-zinc-400 group-hover:text-red-400" />
        </button>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className={`!w-3 !h-3 !border-2 ${colors.border} !bg-zinc-800 hover:!scale-150 transition-transform`}
      />
    </motion.div>
  )
}

export default memo(TaskNode)
