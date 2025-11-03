# 🏛️ Arquitetura do Workflow

## Visão Geral do Sistema

Este documento descreve a arquitetura técnica do workflow de elaboração de livros.

---

## 🎯 Modelo Conceitual

```
┌─────────────────────────────────────────────────────────────┐
│                    WORKFLOW DE LIVRO                        │
│                                                             │
│  Inputs               Processamento           Outputs       │
│  ┌────────┐           ┌──────────┐           ┌─────────┐   │
│  │ Estilo │──────────▶│ Context  │──────────▶│Capítulo │   │
│  └────────┘           │ Refresh  │           └─────────┘   │
│                       └──────────┘                          │
│  ┌────────┐           ┌──────────┐           ┌─────────┐   │
│  │Conteúdo│──────────▶│ Context  │──────────▶│ Livro   │   │
│  └────────┘           │Enrichment│           │ Final   │   │
│                       └──────────┘           └─────────┘   │
│  ┌────────┐           ┌──────────┐                          │
│  │ Config │──────────▶│Validation│                          │
│  └────────┘           └──────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Arquitetura de Camadas

```
┌───────────────────────────────────────────────────────┐
│                  Camada de Interface                  │
│                                                       │
│  • Comandos Claude (/write-chapter, etc.)            │
│  • Scripts Bash (process-chapter.sh, etc.)           │
│  • Configuração YAML (book-config.yaml)              │
└───────────────────────────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────┐
│                 Camada de Orquestração                │
│                                                       │
│  • Pipeline Controller (5 fases)                     │
│  • Context Manager (refresh/enrichment)              │
│  • Validation Engine                                 │
└───────────────────────────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────┐
│                Camada de Processamento                │
│                                                       │
│  • Style Analyzer                                    │
│  • Content Analyzer                                  │
│  • Chapter Generator                                 │
│  • Quality Validator                                 │
└───────────────────────────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────┐
│                   Camada de Dados                     │
│                                                       │
│  • estilo/      (documentos de referência)           │
│  • conteudo/    (base de conhecimento)               │
│  • output/      (artefatos gerados)                  │
│  • config/      (configurações)                      │
└───────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Dados - Pipeline Detalhado

### Fase 1: SETUP (Context Loading)

```
config/book-config.yaml
        │
        ▼
   ┌─────────────┐
   │   Loader    │
   └─────────────┘
        │
        ├──▶ Identificar capítulo
        ├──▶ Carregar configurações
        └──▶ Preparar ambiente limpo
```

### Fase 2: ANALYZE (Context Building)

```
estilo/*                conteudo/*
   │                        │
   ├── doc1.md             ├── surveys/
   ├── doc2.md             ├── pesquisas/
   └── doc3.md             └── rascunhos/
   │                        │
   ▼                        ▼
┌──────────────┐      ┌──────────────┐
│Style Analyzer│      │Content       │
│              │      │Analyzer      │
│ • Tom/Voz    │      │              │
│ • Estrutura  │      │ • Surveys    │
│ • Pedagogia  │      │   (40%)      │
│ • Metáforas  │      │ • Pesquisas  │
└──────────────┘      │   (30%)      │
   │                  │ • Rascunhos  │
   │                  │   (30%)      │
   │                  └──────────────┘
   │                        │
   ▼                        ▼
┌─────────────────────────────────────┐
│     Enriched Context Object         │
│                                     │
│  style: {                           │
│    tone: "...",                     │
│    structure: "...",                │
│    pedagogy: "..."                  │
│  }                                  │
│  content: {                         │
│    concepts: [...],                 │
│    examples: [...],                 │
│    sources: [...]                   │
│  }                                  │
└─────────────────────────────────────┘
```

### Fase 3: WRITE (Content Generation)

```
┌─────────────────────────────────────┐
│     Enriched Context Object         │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│       Chapter Generator             │
│                                     │
│  1. Apply style template            │
│  2. Integrate content (40-30-30)    │
│  3. Generate examples               │
│  4. Create structure                │
│  5. Add pedagogical elements        │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│    output/capitulos/[id]/chapter.md │
└─────────────────────────────────────┘
```

### Fase 4: VALIDATE (Quality Assurance)

```
chapter.md
    │
    ▼
┌───────────────────────────────────────┐
│       Validation Engine               │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ Style Consistency Check         │ │
│  │  • Compare with style profile   │ │
│  │  • Score: 0-100%                │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ Content Completeness Check      │ │
│  │  • Verify required topics       │ │
│  │  • Check examples presence      │ │
│  │  • Score: 0-100%                │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ Technical Accuracy Check        │ │
│  │  • Validate concepts            │ │
│  │  • Check code syntax            │ │
│  │  • Score: 0-100%                │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ Pedagogical Clarity Check       │ │
│  │  • Analyze progression          │ │
│  │  • Check accessibility          │ │
│  │  • Score: 0-100%                │ │
│  └─────────────────────────────────┘ │
└───────────────────────────────────────┘
    │
    ▼
┌───────────────────────────────────────┐
│      Validation Report                │
│                                       │
│  Overall Score: XX%                   │
│                                       │
│  ✅ PASS (if >= 85%)                  │
│  ❌ FAIL (if < 85%)                   │
└───────────────────────────────────────┘
```

### Fase 5: DEPLOY (Output Generation)

```
        [PASS]
          │
          ▼
┌─────────────────────────┐
│   Save Final Chapter    │
└─────────────────────────┘
          │
          ├──▶ output/capitulos/[id]-final.md
          ├──▶ Update book-config.yaml (status: done)
          └──▶ Version control (git)
```

---

## 🔀 Build Final - Compilação do Livro

```
output/capitulos/
  ├── 01-introducao-final.md
  ├── 02-preparacao-final.md
  ├── 03-fundamentos-final.md
  └── ...
          │
          ▼
┌─────────────────────────────┐
│    Book Builder             │
│                             │
│  1. Generate frontmatter    │
│  2. Generate TOC            │
│  3. Compile chapters        │
│  4. Add separators          │
│  5. Generate metadata       │
└─────────────────────────────┘
          │
          ▼
┌─────────────────────────────┐
│  output/final/              │
│    super-aprendizagem-r.md  │
└─────────────────────────────┘
          │
          ▼
    [Opcional: Pandoc]
          │
          ├──▶ .pdf
          ├──▶ .docx
          ├──▶ .epub
          └──▶ .html
```

---

## 🧠 Context Management Strategy

### Problema: Degradação de Contexto

```
❌ Abordagem Monolítica

Cap1 → Cap2 → Cap3 → Cap4 → Cap5
 │      │      │      │      │
 └──────┴──────┴──────┴──────┘
           │
    Contexto Acumulado
    (estilo degrada)
```

### Solução: Context Refresh

```
✅ Abordagem Modular

Cap1     Cap2     Cap3     Cap4     Cap5
 ↓        ↓        ↓        ↓        ↓
Ctx1     Ctx2     Ctx3     Ctx4     Ctx5
 │        │        │        │        │
 └────────┴────────┴────────┴────────┘
         Contextos Independentes
         (estilo consistente)

Onde cada Ctx = Context Refresh + Context Enrichment
```

### Implementação

```
For each chapter:
  1. CLEAR previous context
  2. RE-ANALYZE style documents (context refresh)
  3. RE-ANALYZE relevant content (context enrichment)
  4. GENERATE with fresh context
  5. VALIDATE independently
```

---

## 📦 Estrutura de Dados

### book-config.yaml

```yaml
book:
  title: string
  author: string
  version: semver

chapters:
  - id: string (unique)
    title: string
    status: enum [pending, in_progress, done]
    priority: integer

workflow:
  mode: enum [iterative, batch]
  context_refresh: boolean
  style_analysis: boolean
  post_generation_validation: boolean

style:
  weights:
    writing_style: float (0-1)
    pedagogical_approach: float (0-1)
    examples: float (0-1)
    metaphors: float (0-1)

content:
  priorities:
    surveys: float (0-1)
    research: float (0-1)
    drafts: float (0-1)

validation:
  min_quality_score: float (0-1)
```

### Chapter Object (interno)

```javascript
{
  id: "01-introducao",
  title: "Introdução",
  content: "...",
  metadata: {
    word_count: 2543,
    code_blocks: 5,
    generation_timestamp: "2023-11-03T14:30:00Z"
  },
  style_profile: {
    tone: "...",
    voice: "...",
    structures: [...]
  },
  content_sources: [
    { type: "survey", path: "...", weight: 0.4 },
    { type: "research", path: "...", weight: 0.3 },
    { type: "draft", path: "...", weight: 0.3 }
  ],
  validation: {
    style_score: 0.92,
    content_score: 0.95,
    technical_score: 0.90,
    pedagogical_score: 0.93,
    overall_score: 0.925,
    passed: true
  }
}
```

---

## 🎨 Design Patterns Aplicados

### 1. Pipeline Pattern

Processamento em etapas sequenciais:
```
Setup → Analyze → Write → Validate → Deploy
```

### 2. Strategy Pattern

Diferentes estratégias de processamento:
- Iterative mode (capítulo por capítulo)
- Batch mode (todos de uma vez - futuro)

### 3. Template Method

Templates reutilizáveis:
- Chapter template
- Style analysis template
- Validation report template

### 4. Observer Pattern (implícito)

TodoWrite tracking de progresso em cada fase.

### 5. Factory Pattern (implícito)

Geração de diferentes outputs (md, pdf, docx).

---

## 🔧 Componentes Principais

### 1. Pipeline Controller

**Responsabilidade**: Orquestrar as 5 fases do workflow

**Implementação**:
- Slash command: `/write-chapter`
- Bash script: `process-chapter.sh`

### 2. Context Manager

**Responsabilidade**: Gerenciar context refresh e enrichment

**Operações**:
- `clear_context()` - Limpar contexto anterior
- `refresh_style()` - Re-analisar documentos de estilo
- `enrich_content()` - Analisar conteúdo relevante

### 3. Style Analyzer

**Responsabilidade**: Extrair perfil de estilo

**Input**: Documentos em `estilo/`
**Output**: Style profile object

### 4. Content Analyzer

**Responsabilidade**: Processar conteúdo base

**Input**: Documentos em `conteudo/{surveys,pesquisas,rascunhos}/`
**Output**: Content object com pesos aplicados

### 5. Chapter Generator

**Responsabilidade**: Gerar capítulo com estilo e conteúdo

**Input**: Context object (style + content)
**Output**: chapter.md

### 6. Validation Engine

**Responsabilidade**: Validar qualidade do capítulo

**Checks**: 4 métricas principais
**Output**: Validation report + pass/fail

### 7. Book Builder

**Responsabilidade**: Compilar capítulos em livro final

**Input**: Capítulos validados
**Output**: Livro completo + metadados

---

## 📈 Métricas e Monitoramento

### Métricas de Qualidade

```
quality_score = (
  style_score * 0.3 +
  content_score * 0.3 +
  technical_score * 0.2 +
  pedagogical_score * 0.2
)

threshold = 0.85

if quality_score >= threshold:
  status = "PASS"
else:
  status = "FAIL"
```

### Métricas de Progresso

```
progress = completed_chapters / total_chapters * 100%
```

### Métricas de Tempo

```
avg_time_per_chapter = total_time / completed_chapters
estimated_remaining = avg_time_per_chapter * remaining_chapters
```

---

## 🔐 Garantias de Qualidade

### Consistência de Estilo

✅ Context refresh em cada capítulo
✅ Análise comparativa com documentos de referência
✅ Score mínimo de 85%

### Completude de Conteúdo

✅ Verificação de tópicos obrigatórios
✅ Presença de exemplos práticos
✅ Código funcional e testável

### Acurácia Técnica

✅ Conceitos corretos
✅ Sintaxe válida
✅ Referências apropriadas

### Clareza Pedagógica

✅ Progressão lógica
✅ Linguagem acessível
✅ Exercícios adequados

---

## 🚀 Escalabilidade

### Horizontal (mais capítulos)

- ✅ Pipeline modular suporta N capítulos
- ✅ Context refresh previne degradação
- ✅ Processamento independente

### Vertical (capítulos mais complexos)

- ✅ Deep analysis mode (`--deep-analysis`)
- ✅ Peso configurável de fontes
- ✅ Validação extensível

---

## 📚 Extensibilidade

### Novos Tipos de Conteúdo

```yaml
# Adicione em config/book-config.yaml
content:
  priorities:
    surveys: 0.3
    research: 0.3
    drafts: 0.2
    notebooks: 0.1      # Novo tipo
    datasets: 0.1       # Novo tipo
```

### Novas Métricas de Validação

```yaml
validation:
  quality_checks:
    - style_consistency
    - content_completeness
    - technical_accuracy
    - pedagogical_clarity
    - readability_score    # Nova métrica
    - code_coverage        # Nova métrica
```

### Novos Formatos de Output

```bash
# Adicione em build-book.sh
pandoc input.md -o output.epub  # EPUB
pandoc input.md -o output.html  # HTML
pandoc input.md -o output.tex   # LaTeX
```

---

**Arquitetura v1.0** - Desenhada para qualidade, consistência e escalabilidade
