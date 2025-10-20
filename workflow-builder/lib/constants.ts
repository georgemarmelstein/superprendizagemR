import { TaskTypeConfig, ClaudeModelConfig } from './types';

// Task Type Configurations
export const TASK_TYPES: TaskTypeConfig[] = [
  {
    type: 'EXTRACTION',
    name: 'Extração',
    icon: 'Database',
    color: 'blue',
    defaultPrompt: 'Extraia as informações relevantes do documento fornecido.',
  },
  {
    type: 'ANALYSIS',
    name: 'Análise',
    icon: 'BarChart3',
    color: 'purple',
    defaultPrompt: 'Analise os dados e forneça insights detalhados.',
  },
  {
    type: 'IDEA_GENERATION',
    name: 'Geração de Ideias',
    icon: 'Lightbulb',
    color: 'yellow',
    defaultPrompt: 'Gere ideias criativas e alternativas para o problema apresentado.',
  },
  {
    type: 'RESEARCH',
    name: 'Pesquisa',
    icon: 'Search',
    color: 'orange',
    defaultPrompt: 'Realize uma pesquisa aprofundada sobre o tema.',
  },
  {
    type: 'WRITING',
    name: 'Modelos de Escrita',
    icon: 'FileEdit',
    color: 'pink',
    defaultPrompt: 'Redija um documento profissional baseado nas informações fornecidas.',
  },
  {
    type: 'CHECKPOINT',
    name: 'Checkpoint Decisório',
    icon: 'GitBranch',
    color: 'red',
    defaultPrompt: 'Analise o contexto e gere 2-3 opções diferentes com prós, contras e red flags para cada uma.',
  },
];

// Claude Models
export const CLAUDE_MODELS: ClaudeModelConfig[] = [
  {
    value: 'claude-sonnet-4-20250514',
    label: 'Sonnet 4',
    description: 'Recomendado - Equilibrado',
  },
  {
    value: 'claude-opus-4-20250514',
    label: 'Opus 4',
    description: 'Mais Poderoso',
  },
  {
    value: 'claude-haiku-4-20250514',
    label: 'Haiku 4',
    description: 'Mais Rápido',
  },
];

// Loading Messages
export const LOADING_MESSAGES = [
  '☕ Estamos trabalhando por você. Pode ir tomar seu cafezinho...',
  '🧠 Claude está pensando profundamente...',
  '✨ Processando com inteligência artificial...',
  '🚀 Analisando os dados com cuidado...',
  '📚 Lendo e compreendendo o contexto...',
  '💡 Gerando insights valiosos...',
  '🎯 Refinando a análise...',
  '⚡ Quase lá! Claude está finalizando...',
  '🔍 Examinando cada detalhe...',
  '🎨 Elaborando a resposta perfeita...',
];

// Color Classes by Task Type
export const COLOR_CLASSES = {
  blue: {
    border: 'border-blue-500',
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    hover: 'hover:bg-blue-600',
    gradient: 'bg-gradient-to-r from-blue-600 to-blue-500',
  },
  purple: {
    border: 'border-purple-500',
    bg: 'bg-purple-500',
    text: 'text-purple-500',
    hover: 'hover:bg-purple-600',
    gradient: 'bg-gradient-to-r from-purple-600 to-purple-500',
  },
  yellow: {
    border: 'border-yellow-500',
    bg: 'bg-yellow-500',
    text: 'text-yellow-500',
    hover: 'hover:bg-yellow-600',
    gradient: 'bg-gradient-to-r from-yellow-600 to-yellow-500',
  },
  orange: {
    border: 'border-orange-500',
    bg: 'bg-orange-500',
    text: 'text-orange-500',
    hover: 'hover:bg-orange-600',
    gradient: 'bg-gradient-to-r from-orange-600 to-orange-500',
  },
  pink: {
    border: 'border-pink-500',
    bg: 'bg-pink-500',
    text: 'text-pink-500',
    hover: 'hover:bg-pink-600',
    gradient: 'bg-gradient-to-r from-pink-600 to-pink-500',
  },
  red: {
    border: 'border-red-500',
    bg: 'bg-red-500',
    text: 'text-red-500',
    hover: 'hover:bg-red-600',
    gradient: 'bg-gradient-to-r from-red-600 to-red-500',
  },
  emerald: {
    border: 'border-emerald-500',
    bg: 'bg-emerald-500',
    text: 'text-emerald-500',
    hover: 'hover:bg-emerald-600',
    gradient: 'bg-gradient-to-r from-emerald-600 to-emerald-500',
  },
};

// Default Template: Elaboração de Sentença
export const DEFAULT_TEMPLATE = [
  {
    type: 'EXTRACTION' as const,
    name: 'Extração de Dados do Processo',
    description: 'Extração de Dados do Processo',
    prompt: 'Extraia todas as informações relevantes do processo: partes, pedidos, causa de pedir, contestação, provas.',
  },
  {
    type: 'ANALYSIS' as const,
    name: 'Análise das Questões Jurídicas',
    description: 'Análise das Questões Jurídicas',
    prompt: 'Analise as questões jurídicas envolvidas no processo, identificando os pontos controvertidos e a legislação aplicável.',
  },
  {
    type: 'RESEARCH' as const,
    name: 'Pesquisa de Jurisprudência',
    description: 'Pesquisa de Jurisprudência',
    prompt: 'Pesquise jurisprudência relevante dos tribunais superiores sobre os temas identificados.',
  },
  {
    type: 'CHECKPOINT' as const,
    name: 'Checkpoint: Linha Argumentativa',
    description: 'Checkpoint: Linha Argumentativa',
    prompt: 'Com base na análise e pesquisa, gere 2-3 linhas argumentativas diferentes para a decisão, com prós, contras e red flags de cada uma.',
  },
  {
    type: 'WRITING' as const,
    name: 'Redação da Sentença',
    description: 'Redação da Sentença',
    prompt: 'Redija uma sentença judicial completa seguindo a linha argumentativa escolhida, com relatório, fundamentação e dispositivo.',
  },
  {
    type: 'ANALYSIS' as const,
    name: 'Revisão Crítica',
    description: 'Revisão Crítica',
    prompt: 'Faça uma revisão crítica da sentença, identificando possíveis melhorias, inconsistências ou pontos que precisam de reforço argumentativo.',
  },
];
