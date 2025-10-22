import { TaskDefinition } from '@/types/workflow'

export const TASK_DEFINITIONS: TaskDefinition[] = [
  {
    type: 'extraction',
    name: 'Extração',
    icon: 'FileText',
    color: 'blue',
    description: 'Extrair informações e dados de textos',
    defaultPrompt: 'Extraia as informações principais do texto fornecido.'
  },
  {
    type: 'analysis',
    name: 'Análise',
    icon: 'Search',
    color: 'purple',
    description: 'Analisar e interpretar dados',
    defaultPrompt: 'Analise as informações fornecidas e identifique padrões e insights.'
  },
  {
    type: 'ideas',
    name: 'Geração de Ideias',
    icon: 'Lightbulb',
    color: 'yellow',
    description: 'Gerar ideias criativas',
    defaultPrompt: 'Gere ideias criativas e inovadoras sobre o tema.'
  },
  {
    type: 'research',
    name: 'Pesquisa',
    icon: 'Globe',
    color: 'orange',
    description: 'Pesquisar e sintetizar informações',
    defaultPrompt: 'Pesquise e sintetize informações sobre o tópico.'
  },
  {
    type: 'writing',
    name: 'Modelos de Escrita',
    icon: 'PenTool',
    color: 'pink',
    description: 'Escrever textos e documentos',
    defaultPrompt: 'Escreva um texto seguindo as diretrizes fornecidas.'
  },
  {
    type: 'checkpoint',
    name: 'Checkpoint Decisório',
    icon: 'GitBranch',
    color: 'red',
    description: 'Ponto de decisão no workflow',
    defaultPrompt: 'Analise as informações e apresente opções de decisão.'
  }
]

export const getTaskDefinition = (type: string): TaskDefinition => {
  return TASK_DEFINITIONS.find(t => t.type === type) || TASK_DEFINITIONS[0]
}

export const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string, border: string, text: string, hover: string, glow: string }> = {
    blue: {
      bg: 'bg-blue-500',
      border: 'border-blue-500',
      text: 'text-blue-500',
      hover: 'hover:bg-blue-600',
      glow: 'shadow-blue-500/50'
    },
    purple: {
      bg: 'bg-purple-500',
      border: 'border-purple-500',
      text: 'text-purple-500',
      hover: 'hover:bg-purple-600',
      glow: 'shadow-purple-500/50'
    },
    yellow: {
      bg: 'bg-yellow-500',
      border: 'border-yellow-500',
      text: 'text-yellow-500',
      hover: 'hover:bg-yellow-600',
      glow: 'shadow-yellow-500/50'
    },
    orange: {
      bg: 'bg-orange-500',
      border: 'border-orange-500',
      text: 'text-orange-500',
      hover: 'hover:bg-orange-600',
      glow: 'shadow-orange-500/50'
    },
    pink: {
      bg: 'bg-pink-500',
      border: 'border-pink-500',
      text: 'text-pink-500',
      hover: 'hover:bg-pink-600',
      glow: 'shadow-pink-500/50'
    },
    red: {
      bg: 'bg-red-500',
      border: 'border-red-500',
      text: 'text-red-500',
      hover: 'hover:bg-red-600',
      glow: 'shadow-red-500/50'
    },
    green: {
      bg: 'bg-green-500',
      border: 'border-green-500',
      text: 'text-green-500',
      hover: 'hover:bg-green-600',
      glow: 'shadow-green-500/50'
    },
    cyan: {
      bg: 'bg-cyan-500',
      border: 'border-cyan-500',
      text: 'text-cyan-500',
      hover: 'hover:bg-cyan-600',
      glow: 'shadow-cyan-500/50'
    }
  }

  return colorMap[color] || colorMap.blue
}
