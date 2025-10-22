'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, FileText, BarChart, Search } from 'lucide-react'
import { useWorkflowStore } from '@/stores/workflowStore'
import { Workflow } from '@/types/workflow'

const TEMPLATES: Workflow[] = [
  {
    id: 'template-judicial',
    name: 'Sentença Judicial',
    description: 'Template completo para redigir sentenças judiciais',
    tags: ['jurídico', 'sentença', 'processo'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    nodes: [
      {
        id: 'node-1',
        type: 'taskNode',
        position: { x: 250, y: 50 },
        data: {
          name: 'Extração de Dados',
          description: 'Extrair informações do processo',
          prompt: 'Extraia todas as informações relevantes do processo: partes, pedidos, provas, etc.',
          model: 'claude-sonnet-4',
          color: 'blue',
          icon: 'FileText',
          type: 'extraction',
          status: 'idle'
        }
      },
      {
        id: 'node-2',
        type: 'taskNode',
        position: { x: 250, y: 200 },
        data: {
          name: 'Análise Jurídica',
          description: 'Analisar questões jurídicas',
          prompt: 'Analise as questões de direito envolvidas, fundamentos legais e precedentes aplicáveis.',
          model: 'claude-sonnet-4',
          color: 'purple',
          icon: 'Search',
          type: 'analysis',
          status: 'idle'
        }
      },
      {
        id: 'node-3',
        type: 'taskNode',
        position: { x: 250, y: 350 },
        data: {
          name: 'Pesquisa de Jurisprudência',
          description: 'Pesquisar precedentes',
          prompt: 'Identifique jurisprudência relevante e precedentes aplicáveis ao caso.',
          model: 'claude-sonnet-4',
          color: 'orange',
          icon: 'Globe',
          type: 'research',
          status: 'idle'
        }
      },
      {
        id: 'node-4',
        type: 'taskNode',
        position: { x: 250, y: 500 },
        data: {
          name: 'Checkpoint: Linha Argumentativa',
          description: 'Escolher abordagem',
          prompt: 'Apresente diferentes linhas argumentativas possíveis para a decisão.',
          model: 'claude-opus-4',
          color: 'red',
          icon: 'GitBranch',
          type: 'checkpoint',
          status: 'idle'
        }
      },
      {
        id: 'node-5',
        type: 'taskNode',
        position: { x: 250, y: 650 },
        data: {
          name: 'Redação da Sentença',
          description: 'Redigir sentença final',
          prompt: 'Redija a sentença judicial completa seguindo a estrutura: relatório, fundamentação e dispositivo.',
          model: 'claude-opus-4',
          color: 'pink',
          icon: 'PenTool',
          type: 'writing',
          status: 'idle'
        }
      }
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2', type: 'smoothstep' },
      { id: 'edge-2', source: 'node-2', target: 'node-3', type: 'smoothstep' },
      { id: 'edge-3', source: 'node-3', target: 'node-4', type: 'smoothstep' },
      { id: 'edge-4', source: 'node-4', target: 'node-5', type: 'smoothstep' }
    ]
  },
  {
    id: 'template-report',
    name: 'Relatório Executivo',
    description: 'Criar relatórios executivos detalhados',
    tags: ['business', 'relatório', 'análise'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    nodes: [
      {
        id: 'node-1',
        type: 'taskNode',
        position: { x: 250, y: 50 },
        data: {
          name: 'Análise de Dados',
          description: 'Analisar dados fornecidos',
          prompt: 'Analise os dados e identifique insights principais, tendências e padrões.',
          model: 'claude-sonnet-4',
          color: 'purple',
          icon: 'Search',
          type: 'analysis',
          status: 'idle'
        }
      },
      {
        id: 'node-2',
        type: 'taskNode',
        position: { x: 250, y: 200 },
        data: {
          name: 'Geração de Insights',
          description: 'Gerar recomendações',
          prompt: 'Com base na análise, gere insights estratégicos e recomendações acionáveis.',
          model: 'claude-sonnet-4',
          color: 'yellow',
          icon: 'Lightbulb',
          type: 'ideas',
          status: 'idle'
        }
      },
      {
        id: 'node-3',
        type: 'taskNode',
        position: { x: 250, y: 350 },
        data: {
          name: 'Redação do Relatório',
          description: 'Escrever relatório final',
          prompt: 'Redija um relatório executivo completo com sumário, análise e recomendações.',
          model: 'claude-opus-4',
          color: 'pink',
          icon: 'PenTool',
          type: 'writing',
          status: 'idle'
        }
      }
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2', type: 'smoothstep' },
      { id: 'edge-2', source: 'node-2', target: 'node-3', type: 'smoothstep' }
    ]
  },
  {
    id: 'template-research',
    name: 'Pesquisa Acadêmica',
    description: 'Workflow para pesquisa e síntese acadêmica',
    tags: ['acadêmico', 'pesquisa', 'análise'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    nodes: [
      {
        id: 'node-1',
        type: 'taskNode',
        position: { x: 250, y: 50 },
        data: {
          name: 'Pesquisa Inicial',
          description: 'Pesquisar sobre o tema',
          prompt: 'Faça uma pesquisa abrangente sobre o tema, identificando conceitos chave e autores principais.',
          model: 'claude-sonnet-4',
          color: 'orange',
          icon: 'Globe',
          type: 'research',
          status: 'idle'
        }
      },
      {
        id: 'node-2',
        type: 'taskNode',
        position: { x: 250, y: 200 },
        data: {
          name: 'Análise Crítica',
          description: 'Analisar achados',
          prompt: 'Analise criticamente os achados da pesquisa, identificando lacunas e oportunidades.',
          model: 'claude-opus-4',
          color: 'purple',
          icon: 'Search',
          type: 'analysis',
          status: 'idle'
        }
      },
      {
        id: 'node-3',
        type: 'taskNode',
        position: { x: 250, y: 350 },
        data: {
          name: 'Síntese Acadêmica',
          description: 'Escrever síntese',
          prompt: 'Escreva uma síntese acadêmica com introdução, desenvolvimento e conclusões.',
          model: 'claude-opus-4',
          color: 'pink',
          icon: 'PenTool',
          type: 'writing',
          status: 'idle'
        }
      }
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2', type: 'smoothstep' },
      { id: 'edge-2', source: 'node-2', target: 'node-3', type: 'smoothstep' }
    ]
  }
]

export default function TemplateModal() {
  const { showTemplateModal, toggleTemplateModal, loadWorkflow } = useWorkflowStore()

  const handleUseTemplate = (template: Workflow) => {
    loadWorkflow({
      ...template,
      id: `workflow-${Date.now()}`,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
    toggleTemplateModal()
  }

  if (!showTemplateModal) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={toggleTemplateModal}
      >
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="bg-zinc-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Templates Prontos</h2>
            <button
              onClick={toggleTemplateModal}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto scrollbar-thin" style={{ maxHeight: 'calc(90vh - 80px)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TEMPLATES.map((template) => {
                const icon = template.name.includes('Judicial') ? FileText :
                            template.name.includes('Executivo') ? BarChart : Search

                const IconComponent = icon

                return (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 space-y-4
                      hover:border-zinc-600 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <IconComponent className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-zinc-100 mb-1">{template.name}</h3>
                        <p className="text-sm text-zinc-400">{template.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      {template.nodes.length} tarefas • {template.nodes.filter(n => n.data.type === 'checkpoint').length} checkpoints
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-zinc-700 text-zinc-300 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleUseTemplate(template)}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium
                        transition-colors group-hover:shadow-lg group-hover:shadow-blue-500/20"
                    >
                      Usar Template
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
