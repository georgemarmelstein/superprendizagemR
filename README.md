# FlowClaude - Workflow Builder MVP

Um aplicativo web completo de workflow builder visual estilo n8n/Miro para criar e executar workflows com Claude AI.

## Características

- **Canvas Infinito**: Interface drag & drop com React Flow para criar workflows visuais
- **Tarefas Pré-definidas**: Extração, Análise, Geração de Ideias, Pesquisa e Modelos de Escrita
- **Checkpoints Decisórios**: Pausar execução e escolher entre múltiplas opções geradas pela IA
- **Templates Prontos**: Sentenças Judiciais, Relatórios Executivos, Pesquisa Acadêmica
- **Execução Interativa**: Execute workflows passo a passo com feedback visual em tempo real
- **Animações Suaves**: Feito com Framer Motion para uma UX premium
- **Dark Theme**: Interface elegante e moderna com Tailwind CSS

## Stack Tecnológica

- **Next.js 14** (App Router)
- **React 18** + TypeScript
- **Tailwind CSS** para estilização
- **React Flow** para o canvas infinito
- **Framer Motion** para animações
- **Zustand** para state management
- **Lucide React** para ícones

## Começando

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build para Produção

```bash
npm run build
npm start
```

## Estrutura do Projeto

```
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Estilos globais
│   └── builder/
│       └── page.tsx        # Página do workflow builder
├── components/
│   ├── Header.tsx          # Header com logo e botões
│   ├── TaskSidebar.tsx     # Sidebar com tarefas drag & drop
│   ├── TaskNode.tsx        # Node customizado para o canvas
│   ├── WorkflowCanvas.tsx  # Canvas principal com React Flow
│   ├── PropertiesPanel.tsx # Panel de propriedades lateral
│   ├── CheckpointModal.tsx # Modal de checkpoint decisório
│   ├── ExecutionPanel.tsx  # Panel inferior de execução
│   └── TemplateModal.tsx   # Modal com templates prontos
├── stores/
│   └── workflowStore.ts    # Zustand store principal
├── lib/
│   ├── taskDefinitions.ts  # Definições de tarefas padrão
│   └── workflowExecutor.ts # Lógica de execução de workflows
├── hooks/
│   └── useKeyboardShortcuts.ts # Atalhos de teclado
└── types/
    └── workflow.ts         # Tipos TypeScript
```

## Atalhos de Teclado

- **Cmd/Ctrl + Enter**: Executar workflow
- **Cmd/Ctrl + N**: Novo fluxo
- **Cmd/Ctrl + S**: Salvar fluxo
- **Cmd/Ctrl + P**: Toggle properties panel
- **Delete/Backspace**: Deletar node selecionado

## Funcionalidades Principais

### 1. Canvas de Workflow

- Arraste tarefas da sidebar para o canvas
- Conecte tarefas para criar fluxos
- Zoom e pan ilimitados
- Minimap para navegação

### 2. Tipos de Tarefas

- **Extração**: Extrair informações de textos
- **Análise**: Analisar e interpretar dados
- **Geração de Ideias**: Brainstorming com IA
- **Pesquisa**: Pesquisar e sintetizar informações
- **Modelos de Escrita**: Redigir documentos
- **Checkpoint**: Ponto de decisão no workflow

### 3. Checkpoints Decisórios

- Gera múltiplas opções de decisão
- Apresenta pontos positivos, negativos e red flags
- Permite decisão customizada
- Cards expansíveis para melhor UX

### 4. Templates

- **Sentença Judicial**: Workflow completo para sentenças
- **Relatório Executivo**: Análise e relatórios de negócios
- **Pesquisa Acadêmica**: Pesquisa e síntese acadêmica

### 5. Execution Panel

- 3 tabs: Execução, Logs, Métricas
- Progress bar visual
- Lista de tarefas com status
- Mensagens rotativas durante execução
- Controles de pause/resume/stop

## Personalização

### Adicionar Nova Tarefa

Edite `lib/taskDefinitions.ts`:

```typescript
{
  type: 'custom',
  name: 'Minha Tarefa',
  icon: 'IconName',
  color: 'blue',
  description: 'Descrição',
  defaultPrompt: 'Prompt padrão...'
}
```

### Criar Novo Template

Edite `components/TemplateModal.tsx` e adicione ao array `TEMPLATES`.

## Próximos Passos

- [ ] Integração real com Claude API (atualmente simulado)
- [ ] Backend para persistência de workflows
- [ ] Colaboração em tempo real
- [ ] Biblioteca de templates da comunidade
- [ ] Exportar workflows como JSON
- [ ] Importar workflows
- [ ] Versionamento de workflows
- [ ] Analytics e métricas avançadas

## Licença

MIT

## Autor

Criado com Claude Code
