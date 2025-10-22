'use client'

import { useState, useEffect } from 'react'
import { X, Save, Paperclip, FileText, MessageSquare, Cpu, Palette, Tag } from 'lucide-react'
import { useWorkflowStore } from '@/stores/workflowStore'
import { motion, AnimatePresence } from 'framer-motion'
import { getColorClasses } from '@/lib/taskDefinitions'
import { TaskColor, ClaudeModel } from '@/types/workflow'

export default function PropertiesPanel() {
  const {
    selectedNodeId,
    nodes,
    updateNode,
    showPropertiesPanel,
    togglePropertiesPanel,
  } = useWorkflowStore()

  const selectedNode = nodes.find(n => n.id === selectedNodeId)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    prompt: '',
    model: 'claude-sonnet-4' as ClaudeModel,
    color: 'blue' as TaskColor,
  })

  useEffect(() => {
    if (selectedNode) {
      setFormData({
        name: selectedNode.data.name,
        description: selectedNode.data.description,
        prompt: selectedNode.data.prompt,
        model: selectedNode.data.model,
        color: selectedNode.data.color,
      })
    }
  }, [selectedNode])

  const handleSave = () => {
    if (selectedNodeId) {
      updateNode(selectedNodeId, formData)
    }
  }

  const colors: TaskColor[] = ['blue', 'purple', 'yellow', 'orange', 'pink', 'red', 'green', 'cyan']

  if (!showPropertiesPanel) return null

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ x: 360 }}
        animate={{ x: 0 }}
        exit={{ x: 360 }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-96 bg-zinc-900 border-l border-zinc-800 flex flex-col h-full overflow-hidden"
      >
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-100">Propriedades</h2>
          <button
            onClick={togglePropertiesPanel}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
          {selectedNode ? (
            <div className="space-y-6">
              {/* Nome */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                  <FileText className="w-4 h-4" />
                  Nome da Tarefa
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg
                    text-zinc-100 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Ex: Extrair dados do contrato"
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg
                    text-zinc-100 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Breve descrição da tarefa"
                />
              </div>

              {/* Prompt */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Prompt / Instruções
                </label>
                <textarea
                  value={formData.prompt}
                  onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg
                    text-zinc-100 focus:outline-none focus:border-blue-500 transition-colors resize-y"
                  placeholder="Descreva detalhadamente o que o Claude deve fazer..."
                />
              </div>

              {/* Modelo */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-3">
                  <Cpu className="w-4 h-4" />
                  Modelo Claude
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-zinc-800 border border-zinc-700
                    rounded-lg cursor-pointer hover:border-zinc-600 transition-colors">
                    <input
                      type="radio"
                      name="model"
                      value="claude-haiku-4"
                      checked={formData.model === 'claude-haiku-4'}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value as ClaudeModel })}
                      className="text-blue-500"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-zinc-200">Haiku 4</div>
                      <div className="text-xs text-zinc-400">Rápido - $</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-zinc-800 border-2 border-blue-500
                    rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="model"
                      value="claude-sonnet-4"
                      checked={formData.model === 'claude-sonnet-4'}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value as ClaudeModel })}
                      className="text-blue-500"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-zinc-200">Sonnet 4</div>
                      <div className="text-xs text-zinc-400">Recomendado - $$</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-zinc-800 border border-zinc-700
                    rounded-lg cursor-pointer hover:border-zinc-600 transition-colors">
                    <input
                      type="radio"
                      name="model"
                      value="claude-opus-4"
                      checked={formData.model === 'claude-opus-4'}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value as ClaudeModel })}
                      className="text-blue-500"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-zinc-200">Opus 4</div>
                      <div className="text-xs text-zinc-400">Poderoso - $$$</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Anexo */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                  <Paperclip className="w-4 h-4" />
                  Anexo (.txt)
                </label>
                <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center
                  hover:border-zinc-600 transition-colors cursor-pointer">
                  <Paperclip className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                  <p className="text-sm text-zinc-400">Arraste um arquivo ou clique</p>
                  <p className="text-xs text-zinc-500 mt-1">Apenas .txt</p>
                </div>
              </div>

              {/* Cor */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-3">
                  <Palette className="w-4 h-4" />
                  Cor do Card
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => {
                    const colorClass = getColorClasses(color)
                    return (
                      <button
                        key={color}
                        onClick={() => setFormData({ ...formData, color })}
                        className={`h-10 rounded-lg ${colorClass.bg} ${
                          formData.color === color
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900'
                            : 'opacity-60 hover:opacity-100'
                        } transition-all`}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Botão Salvar */}
              <button
                onClick={handleSave}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium
                  flex items-center justify-center gap-2 transition-colors"
              >
                <Save className="w-5 h-5" />
                Salvar Alterações
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-zinc-400 mb-2">
                  Nenhuma tarefa selecionada
                </h3>
                <p className="text-sm text-zinc-500">
                  Clique em uma tarefa no canvas para editar
                </p>
              </div>

              {/* Estatísticas do Workflow */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
                  Estatísticas do Workflow
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                    <span className="text-sm text-zinc-400">Tarefas no fluxo</span>
                    <span className="text-lg font-bold text-zinc-200">{nodes.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                    <span className="text-sm text-zinc-400">Checkpoints</span>
                    <span className="text-lg font-bold text-zinc-200">
                      {nodes.filter(n => n.data.type === 'checkpoint').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}
