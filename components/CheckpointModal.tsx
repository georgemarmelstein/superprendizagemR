'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, ChevronDown } from 'lucide-react'
import { useWorkflowStore } from '@/stores/workflowStore'
import { getColorClasses } from '@/lib/taskDefinitions'

export default function CheckpointModal() {
  const { showCheckpointModal, currentCheckpoint, resolveCheckpoint } = useWorkflowStore()
  const [customDecision, setCustomDecision] = useState('')
  const [openOption, setOpenOption] = useState<string | null>(null)

  if (!showCheckpointModal || !currentCheckpoint) return null

  const optionColors = ['blue', 'purple', 'green', 'orange']

  const handleChooseOption = (optionId: string, optionText: string) => {
    resolveCheckpoint(optionText)
  }

  const handleCustomDecision = () => {
    if (customDecision.trim()) {
      resolveCheckpoint(customDecision)
      setCustomDecision('')
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => {}}
      >
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="bg-zinc-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white">Checkpoint Decisório</h2>
            </div>
            <button
              onClick={() => resolveCheckpoint('')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-4">
            {/* Context */}
            {currentCheckpoint.context && (
              <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-2">
                  Contexto
                </h3>
                <p className="text-zinc-400 text-sm whitespace-pre-wrap">
                  {currentCheckpoint.context}
                </p>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              {currentCheckpoint.options.map((option, index) => {
                const color = optionColors[index % optionColors.length]
                const colors = getColorClasses(color)
                const isOpen = openOption === option.id

                return (
                  <details
                    key={option.id}
                    className="group"
                    open={isOpen}
                    onToggle={(e: any) => {
                      setOpenOption(e.target.open ? option.id : null)
                    }}
                  >
                    <summary
                      className={`cursor-pointer ${colors.bg} p-6 rounded-t-xl list-none
                        hover:opacity-90 transition-opacity`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-white">
                          OPÇÃO {index + 1}: {option.title}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </summary>

                    <div className="bg-zinc-800 border-t-2 border-zinc-700 rounded-b-xl overflow-hidden">
                      <div className="p-6 space-y-4">
                        {/* Pontos Positivos */}
                        {option.positives.length > 0 && (
                          <div>
                            <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                              <span>✅</span>
                              PONTOS POSITIVOS:
                            </h4>
                            <ul className="space-y-1 text-zinc-300">
                              {option.positives.map((point, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-zinc-500 mt-1">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Pontos Negativos */}
                        {option.negatives.length > 0 && (
                          <div>
                            <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                              <span>⚠️</span>
                              PONTOS NEGATIVOS:
                            </h4>
                            <ul className="space-y-1 text-zinc-300">
                              {option.negatives.map((point, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-zinc-500 mt-1">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Red Flags */}
                        {option.redFlags.length > 0 && (
                          <div>
                            <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                              <span>🚩</span>
                              RED FLAGS:
                            </h4>
                            <ul className="space-y-1 text-zinc-300">
                              {option.redFlags.map((point, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-zinc-500 mt-1">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Botão de Escolha */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleChooseOption(option.id, `OPÇÃO ${index + 1}: ${option.title}`)}
                          className={`w-full ${colors.bg} ${colors.hover} p-4 rounded-lg font-bold text-white
                            text-lg transition-colors flex items-center justify-center gap-2`}
                        >
                          <span>✓</span>
                          Escolher esta opção
                        </motion.button>
                      </div>
                    </div>
                  </details>
                )
              })}
            </div>

            {/* Custom Decision */}
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-zinc-200 flex items-center gap-2">
                <span>💡</span>
                Ou tome sua própria decisão
              </h3>
              <textarea
                value={customDecision}
                onChange={(e) => setCustomDecision(e.target.value)}
                placeholder="Descreva sua decisão customizada..."
                rows={4}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg
                  text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500
                  transition-colors resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCustomDecision}
                disabled={!customDecision.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-700
                  disabled:cursor-not-allowed p-4 rounded-lg font-bold text-white text-lg
                  transition-colors"
              >
                Confirmar Decisão Customizada
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
