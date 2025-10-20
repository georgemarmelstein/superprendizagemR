# Claude Workflow Builder

Uma plataforma visual e intuitiva para criação e execução de workflows automatizados utilizando a família de modelos Claude (Opus, Sonnet, Haiku).

## Visão Geral

O Claude Workflow Builder permite criar fluxos complexos de tarefas de IA através de uma interface drag-and-drop elegante e moderna, projetada para usuários não-técnicos.

## Funcionalidades Principais

### Interface Visual
- Design sofisticado em tema escuro
- Interface drag & drop intuitiva
- Canvas de trabalho fluido e responsivo

### Tipos de Tarefas
- **Extração**: Extrair dados de documentos e textos
- **Análise**: Análise profunda de dados e contextos
- **Geração de Ideias**: Brainstorming e criação de alternativas
- **Pesquisa**: Pesquisas especializadas
- **Modelos de Escrita**: Redação de documentos profissionais
- **Checkpoint Decisório**: Pausa para decisão humana com múltiplas opções
- **Tarefas Personalizadas**: Crie suas próprias tarefas

### Checkpoint Decisório
Funcionalidade única que permite:
- Pausa automática do fluxo
- Geração de 2-3 opções pelo Claude
- Análise de prós, contras e red flags
- Decisão humana informada
- Continuação automática após escolha

### Execução de Workflows
- Execução sequencial automática
- Contexto acumulativo entre tarefas
- Controles de execução (Executar, Pausar, Retomar, Parar)
- Mensagens animadas durante processamento
- Feedback visual detalhado

## Pré-requisitos

- Node.js 18+
- NPM ou Yarn
- Chave de API da Anthropic

## Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd workflow-builder
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a API Key da Anthropic:
```bash
cp .env.example .env.local
```

4. Edite `.env.local` e adicione sua chave:
```
ANTHROPIC_API_KEY=sua_chave_aqui
```

## Como Usar

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Abra [http://localhost:3000](http://localhost:3000) no navegador

### Criando um Workflow

1. **Adicione Tarefas**: Clique ou arraste os botões de tarefas da barra superior
2. **Configure**: Preencha descrição, prompt, escolha o modelo Claude e anexe arquivos (opcional)
3. **Organize**: Use as setas para reordenar tarefas
4. **Execute**: Clique em "Executar Fluxo Completo"

### Template Pronto

Experimente o template "Elaboração de Sentença" que demonstra um workflow completo com 6 etapas:
1. Extração de dados do processo
2. Análise de questões jurídicas
3. Pesquisa de jurisprudência
4. Checkpoint para escolher linha argumentativa
5. Redação da sentença
6. Revisão crítica

## Modelos Claude Disponíveis

- **Sonnet 4**: Equilibrado (Recomendado)
- **Opus 4**: Mais poderoso
- **Haiku 4**: Mais rápido

## Estrutura do Projeto

```
workflow-builder/
├── app/
│   ├── api/claude/          # API route para Claude
│   ├── page.tsx             # Página principal
│   └── globals.css          # Estilos globais
├── components/              # Componentes React
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── Card.tsx
│   ├── TaskBar.tsx
│   ├── TaskButton.tsx
│   ├── WorkflowCanvas.tsx
│   ├── TaskCard.tsx
│   ├── TaskConfigModal.tsx
│   └── CheckpointModal.tsx
├── lib/                     # Bibliotecas e utilitários
│   ├── types.ts            # Tipos TypeScript
│   ├── constants.ts        # Constantes
│   └── utils.ts            # Funções utilitárias
└── public/                 # Arquivos estáticos
```

## Tecnologias Utilizadas

- **Next.js 15**: Framework React
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **Lucide React**: Ícones
- **Anthropic SDK**: Integração com Claude

## Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Inicia produção
npm run lint     # Linter
```

## Obtendo API Key da Anthropic

1. Acesse [https://console.anthropic.com/](https://console.anthropic.com/)
2. Faça login ou crie uma conta
3. Navegue até "API Keys"
4. Crie uma nova chave
5. Copie e adicione ao `.env.local`

## Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

## Suporte

Para questões e suporte, abra uma issue no repositório.

---

Desenvolvido com Claude Code
