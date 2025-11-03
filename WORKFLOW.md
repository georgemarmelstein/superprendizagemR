# Workflow de Elaboração de Livro com Claude Code

## 🎯 Visão Geral

Este workflow implementa uma **abordagem modular e iterativa** para elaboração de livros usando Claude Code no modo agêntico, inspirado em práticas de desenvolvimento de software e produtos digitais.

### Princípios Fundamentais

1. **Modularidade**: Cada capítulo é um módulo independente
2. **Context Refresh**: Renovação de contexto (estilo + conteúdo) em cada iteração
3. **Iteratividade**: Processo repetível e consistente
4. **Qualidade Contínua**: Validação e verificação em cada etapa
5. **Versionamento**: Controle de versões como em desenvolvimento de software

## 🏗️ Arquitetura do Sistema

```
superprendizagemR/
├── estilo/                    # 📚 Documentos de referência de estilo
│   └── [seus documentos anteriores]
│
├── conteudo/                  # 📖 Base de conhecimento
│   ├── surveys/               # Aprofundamento teórico
│   ├── pesquisas/             # Pesquisas profundas
│   └── rascunhos/             # Material preliminar (subsídio)
│
├── output/                    # 📄 Saídas geradas
│   ├── capitulos/             # Capítulos individuais
│   └── final/                 # Livro compilado
│
├── workflows/                 # ⚙️ Scripts de automação
│   ├── process-chapter.sh     # Pipeline de processamento de capítulo
│   ├── validate-style.py      # Validação de consistência de estilo
│   └── build-book.sh          # Build final do livro
│
├── templates/                 # 📋 Templates
│   ├── chapter-template.md
│   └── style-analysis.md
│
├── config/                    # ⚙️ Configurações
│   └── book-config.yaml       # Configuração principal
│
└── .claude/                   # 🤖 Comandos customizados
    └── commands/
        ├── write-chapter.md
        ├── analyze-style.md
        └── validate-chapter.md
```

## 🔄 Pipeline de Processamento (Inspirado em CI/CD)

### Fase 1: SETUP (Context Loading)
```
┌─────────────────────────────────────┐
│  1. Carregar configurações          │
│  2. Identificar capítulo a processar│
│  3. Preparar ambiente limpo         │
└─────────────────────────────────────┘
```

### Fase 2: ANALYZE (Context Building)
```
┌─────────────────────────────────────┐
│  1. Analisar documentos de estilo   │
│     • Estilo de escrita             │
│     • Abordagem pedagógica          │
│     • Exemplos e metáforas          │
│                                     │
│  2. Analisar conteúdo do capítulo   │
│     • Surveys relevantes (40%)      │
│     • Pesquisas profundas (30%)     │
│     • Rascunhos (30%, subsídio)     │
└─────────────────────────────────────┘
```

### Fase 3: WRITE (Content Generation)
```
┌─────────────────────────────────────┐
│  1. Gerar capítulo com contexto     │
│     enriquecido                     │
│  2. Aplicar estilo mimetizado       │
│  3. Integrar conteúdo técnico       │
└─────────────────────────────────────┘
```

### Fase 4: VALIDATE (Quality Assurance)
```
┌─────────────────────────────────────┐
│  1. Verificar consistência de estilo│
│  2. Validar completude de conteúdo  │
│  3. Checar acurácia técnica         │
│  4. Avaliar clareza pedagógica      │
└─────────────────────────────────────┘
```

### Fase 5: DEPLOY (Output Generation)
```
┌─────────────────────────────────────┐
│  1. Salvar capítulo validado        │
│  2. Atualizar índice                │
│  3. Versionar mudanças              │
│  4. Preparar para próximo capítulo  │
└─────────────────────────────────────┘
```

## 📝 Como Usar

### Preparação Inicial

1. **Organize seus materiais de estilo**
   ```bash
   # Copie seus documentos anteriores para a pasta estilo/
   cp ~/meus-artigos/* estilo/
   ```

2. **Prepare o conteúdo**
   ```bash
   # Organize por tipo
   cp ~/surveys-tema-x/* conteudo/surveys/
   cp ~/pesquisas-profundas/* conteudo/pesquisas/
   cp ~/rascunhos/* conteudo/rascunhos/
   ```

3. **Configure o livro**
   - Edite `config/book-config.yaml`
   - Defina capítulos, ordem, prioridades

### Processamento Capítulo por Capítulo

#### Método 1: Usando Comandos Claude (Recomendado)

```bash
# No Claude Code, use os comandos customizados:
/write-chapter 01-introducao
```

Este comando executa automaticamente:
- ✅ Análise de estilo
- ✅ Análise de conteúdo
- ✅ Geração do capítulo
- ✅ Validação
- ✅ Salvamento

#### Método 2: Usando Scripts

```bash
# Execute o pipeline completo para um capítulo
./workflows/process-chapter.sh 01-introducao

# Ou execute etapas individuais
./workflows/analyze-style.sh
./workflows/generate-chapter.sh 01-introducao
./workflows/validate-chapter.sh 01-introducao
```

### Build Final

Quando todos os capítulos estiverem prontos:

```bash
# Compilar livro completo
./workflows/build-book.sh

# Output: output/final/super-aprendizagem-r.md
```

## 🎨 Garantindo Consistência de Estilo

### Problema Identificado
- ✅ Estrutura e conteúdo mantidos
- ❌ Degradação de estilo ao longo da conversa

### Solução Implementada

**Context Refresh em Cada Capítulo**:

```
Para cada novo capítulo:
1. LIMPAR contexto anterior
2. RE-ANALISAR documentos de estilo
3. RE-ANALISAR conteúdo específico
4. GERAR com contexto fresco
5. VALIDAR consistência
```

**Não Acumular Contexto Global** → Previne degradação

**Enriquecimento Contextual Iterativo** → Mantém qualidade

## 🔍 Validação de Qualidade

### Métricas Automáticas

- **Consistência de Estilo**: Comparação com documentos de referência
- **Completude de Conteúdo**: Verificação de tópicos obrigatórios
- **Acurácia Técnica**: Validação de código e exemplos
- **Clareza Pedagógica**: Análise de estrutura didática

### Threshold de Aprovação

Mínimo de 85% em todas as métricas para passar validação.

## 🚀 Melhores Práticas

### DO's ✅

- **Processe um capítulo por vez**
- **Valide antes de prosseguir**
- **Mantenha materiais organizados**
- **Versione cada capítulo**
- **Revise outputs regularmente**

### DON'Ts ❌

- **Não tente escrever tudo de uma vez**
- **Não acumule contexto entre capítulos**
- **Não pule validações**
- **Não misture estilos diferentes**
- **Não use rascunhos como ponto principal**

## 🔧 Troubleshooting

### Estilo está inconsistente

```bash
# Re-execute análise de estilo
./workflows/analyze-style.sh

# Verifique documentos de referência
ls -la estilo/
```

### Capítulo não passou validação

```bash
# Veja detalhes da validação
cat output/capitulos/[capitulo-id]/validation-report.md

# Re-processe com mais contexto
./workflows/process-chapter.sh [capitulo-id] --deep-analysis
```

### Conteúdo muito superficial

Verifique:
1. Surveys suficientes em `conteudo/surveys/`
2. Pesquisas relevantes em `conteudo/pesquisas/`
3. Configuração de pesos em `config/book-config.yaml`

## 📊 Monitoramento de Progresso

```bash
# Ver status de todos os capítulos
cat config/book-config.yaml | grep -A 3 "chapters:"

# Contar capítulos concluídos
ls output/capitulos/ | wc -l

# Ver métricas de qualidade
./workflows/quality-report.sh
```

## 🎓 Filosofia: Livro Como Produto Digital

Este workflow trata o livro como um **produto digital moderno**:

- **Componentização**: Capítulos são componentes modulares
- **CI/CD**: Pipeline automatizado de geração e validação
- **Versionamento**: Git para controle de mudanças
- **Quality Gates**: Validação antes de merge/aprovação
- **Iteração Rápida**: Feedback loops curtos
- **Automatização**: Scripts para tarefas repetitivas

**Resultado**: Livro com qualidade consistente, processo eficiente, manutenibilidade alta.

## 📚 Próximos Passos

1. ✅ Configure `config/book-config.yaml` com seus capítulos
2. ✅ Adicione materiais em `estilo/` e `conteudo/`
3. ✅ Execute `/write-chapter [capitulo-id]` para cada capítulo
4. ✅ Valide e itere conforme necessário
5. ✅ Execute build final quando todos capítulos estiverem prontos

---

**Desenvolvido para maximizar qualidade e eficiência na elaboração de conteúdo técnico-pedagógico.**
