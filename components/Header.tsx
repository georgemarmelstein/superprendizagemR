'use client'

import { FileText, Save, Sparkles } from 'lucide-react'
import { useWorkflowStore } from '@/stores/workflowStore'

export default function Header() {
  const { createNewWorkflow, saveWorkflow, toggleTemplateModal } = useWorkflowStore()

  return (
    <header className="h-16 bg-black border-b border-zinc-800 flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            FlowClaude
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={createNewWorkflow}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>Novo Fluxo</span>
        </button>

        <button
          onClick={saveWorkflow}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Salvar Fluxo</span>
        </button>

        <button
          onClick={toggleTemplateModal}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors font-medium"
        >
          <Sparkles className="w-4 h-4" />
          <span>Templates</span>
        </button>
      </div>
    </header>
  )
}
