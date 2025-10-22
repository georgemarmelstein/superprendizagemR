'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Square, ChevronUp, ChevronDown, Check, Loader, Clock, DollarSign, Cpu } from 'lucide-react'
import { useWorkflowStore } from '@/stores/workflowStore'

const LOADING_MESSAGES = [
  '☕ Pode ir tomar seu cafezinho...',
  '🧠 Claude está pensando profundamente...',
  '✨ Processando com IA...',
  '🚀 Analisando dados...',
  '📚 Lendo contexto...',
  '💡 Gerando insights...',
  '🎯 Refinando análise...',
  '⚡ Quase lá...',
  '🔍 Examinando detalhes...',
  '🎨 Elaborando resposta...',
]

export default function ExecutionPanel() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [activeTab, setActiveTab] = useState<'execution' | 'logs' | 'metrics'>('execution')
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0])

  const {
    isExecuting,
    isPaused,
    nodes,
    logs,
    totalTokensUsed,
    totalCost,
    executionStartTime,
    executeWorkflow,
    pauseExecution,
    resumeExecution,
    stopExecution,
  } = useWorkflowStore()

  // Rotate loading messages
  useEffect(() => {
    if (!isExecuting) return

    const interval = setInterval(() => {
      setLoadingMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)])
    }, 3000)

    return () => clearInterval(interval)
  }, [isExecuting])

  const executionTime = executionStartTime
    ? Math.floor((Date.now() - executionStartTime) / 1000)
    : 0

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleExecute = () => {
    if (isPaused) {
      resumeExecution()
    } else {
      executeWorkflow()
    }
  }

  return (
    <motion.div
      initial={{ y: 300 }}
      animate={{ y: isExpanded ? 0 : 240 }}
      className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 z-40"
      style={{ height: isExpanded ? 360 : 60 }}
    >
      {/* Header */}
      <div className="h-14 px-6 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-zinc-800 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-zinc-400" />
            ) : (
              <ChevronUp className="w-5 h-5 text-zinc-400" />
            )}
          </button>

          <div className="flex items-center gap-1 border-r border-zinc-700 pr-4">
            <button
              onClick={() => setActiveTab('execution')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'execution'
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              Execução
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'logs'
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              Logs
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'metrics'
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              Métricas
            </button>
          </div>

          {isExecuting && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-zinc-400"
            >
              {loadingMessage}
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {!isExecuting && !isPaused && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExecute}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700
                hover:to-blue-600 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg
                shadow-blue-500/20"
            >
              <Play className="w-5 h-5" />
              Executar Fluxo Completo
            </motion.button>
          )}

          {isExecuting && !isPaused && (
            <>
              <button
                onClick={pauseExecution}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium
                  flex items-center gap-2 transition-colors"
              >
                <Pause className="w-4 h-4" />
                Pausar
              </button>
              <button
                onClick={stopExecution}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium
                  flex items-center gap-2 transition-colors"
              >
                <Square className="w-4 h-4" />
                Parar e Zerar
              </button>
            </>
          )}

          {isPaused && (
            <>
              <button
                onClick={resumeExecution}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium
                  flex items-center gap-2 transition-colors"
              >
                <Play className="w-4 h-4" />
                Retomar
              </button>
              <button
                onClick={stopExecution}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium
                  flex items-center gap-2 transition-colors"
              >
                <Square className="w-4 h-4" />
                Parar e Zerar
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[306px] overflow-y-auto scrollbar-thin p-6"
          >
            {/* Execution Tab */}
            {activeTab === 'execution' && (
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Progresso</span>
                    <span className="text-zinc-300">
                      {nodes.filter(n => n.data.status === 'completed').length} / {nodes.length} tarefas
                    </span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: nodes.length > 0
                          ? `${(nodes.filter(n => n.data.status === 'completed').length / nodes.length) * 100}%`
                          : '0%'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Task List */}
                <div className="space-y-2">
                  {nodes.map((node, index) => (
                    <div
                      key={node.id}
                      className={`p-3 rounded-lg border transition-colors ${
                        node.data.status === 'completed'
                          ? 'bg-green-500/10 border-green-500/30'
                          : node.data.status === 'executing'
                          ? 'bg-cyan-500/10 border-cyan-500/30'
                          : node.data.status === 'error'
                          ? 'bg-red-500/10 border-red-500/30'
                          : 'bg-zinc-800 border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {node.data.status === 'completed' && (
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        )}
                        {node.data.status === 'executing' && (
                          <Loader className="w-5 h-5 text-cyan-400 flex-shrink-0 animate-spin" />
                        )}
                        {node.data.status === 'idle' && (
                          <Clock className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                        )}

                        <span className="text-sm text-zinc-300">
                          {index + 1}. {node.data.name}
                        </span>

                        {node.data.status === 'executing' && (
                          <span className="ml-auto text-xs text-cyan-400">...</span>
                        )}
                        {node.data.status === 'completed' && node.data.result && (
                          <button className="ml-auto text-xs text-zinc-400 hover:text-zinc-300">
                            Ver saída ▼
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Logs Tab */}
            {activeTab === 'logs' && (
              <div className="space-y-2 font-mono text-sm">
                {logs.length === 0 ? (
                  <div className="text-center py-12 text-zinc-500">
                    Nenhum log ainda
                  </div>
                ) : (
                  logs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 text-xs">
                      <span className="text-zinc-600">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                      <span className={`${
                        log.type === 'error' ? 'text-red-400' :
                        log.type === 'success' ? 'text-green-400' :
                        log.type === 'warning' ? 'text-yellow-400' :
                        'text-zinc-400'
                      }`}>
                        {log.message}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Metrics Tab */}
            {activeTab === 'metrics' && (
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-zinc-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-zinc-400 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Tempo Total</span>
                  </div>
                  <div className="text-2xl font-bold text-zinc-100">
                    {formatTime(executionTime)}
                  </div>
                </div>

                <div className="bg-zinc-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-zinc-400 mb-2">
                    <Cpu className="w-4 h-4" />
                    <span className="text-sm">Tokens Usados</span>
                  </div>
                  <div className="text-2xl font-bold text-zinc-100">
                    {totalTokensUsed.toLocaleString()}
                  </div>
                </div>

                <div className="bg-zinc-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-zinc-400 mb-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">Custo Estimado</span>
                  </div>
                  <div className="text-2xl font-bold text-zinc-100">
                    ${totalCost.toFixed(4)}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
