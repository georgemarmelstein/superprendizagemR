# Super Aprendizagem em R

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com)
[![Workflow](https://img.shields.io/badge/workflow-modular-blue)](./WORKFLOW.md)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> **Workflow modular e iterativo para elaboração de livro técnico usando Claude Code no modo agêntico**

## 📚 Sobre o Projeto

Este repositório contém um **sistema completo de workflow** para elaboração do livro "Super Aprendizagem em R", implementando práticas de desenvolvimento de software e produtos digitais para garantir **qualidade e consistência** na produção de conteúdo técnico-pedagógico.

### Características Principais

- ✅ **Modularidade**: Cada capítulo é processado independentemente
- ✅ **Context Refresh**: Renovação de contexto estilo+conteúdo em cada iteração
- ✅ **Iteratividade**: Processo repetível e consistente
- ✅ **Quality Assurance**: Validação automatizada em cada etapa
- ✅ **CI/CD-Inspired**: Pipeline automatizado de geração e validação
- ✅ **Versionamento**: Controle completo de versões com Git

## 🚀 Início Rápido

### Pré-requisitos

- Claude Code instalado e configurado
- Git
- Bash (Linux/Mac) ou Git Bash (Windows)
- (Opcional) Pandoc para geração de PDF

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/superprendizagemR.git
cd superprendizagemR

# Verifique a estrutura
ls -la
```

### Configuração Inicial

1. **Adicione seus materiais de estilo**:
   ```bash
   # Copie documentos que exemplificam seu estilo de escrita
   cp ~/meus-artigos/* estilo/
   ```

2. **Organize o conteúdo**:
   ```bash
   # Surveys (aprofundamento teórico)
   cp ~/surveys/* conteudo/surveys/

   # Pesquisas profundas
   cp ~/pesquisas/* conteudo/pesquisas/

   # Rascunhos (material preliminar)
   cp ~/rascunhos/* conteudo/rascunhos/
   ```

3. **Configure os capítulos**:
   ```bash
   # Edite config/book-config.yaml
   # Defina capítulos, ordem e prioridades
   nano config/book-config.yaml
   ```

### Uso Básico

#### Processar um Capítulo

**No Claude Code:**
```
/write-chapter 01-introducao
```

Ou via terminal:
```bash
./workflows/process-chapter.sh 01-introducao
```

#### Compilar Livro Final

```bash
./workflows/build-book.sh
```

## 📖 Documentação Completa

📘 **[WORKFLOW.md](./WORKFLOW.md)** - Documentação completa do workflow

📋 **[config/book-config.yaml](./config/book-config.yaml)** - Configuração do livro

📂 **[templates/](./templates/)** - Templates de capítulos

🤖 **[.claude/commands/](./claude/commands/)** - Comandos customizados

## 🏗️ Estrutura do Projeto

```
superprendizagemR/
├── estilo/                    # Documentos de referência de estilo
├── conteudo/                  # Base de conhecimento
│   ├── surveys/               # Aprofundamento teórico (peso: 40%)
│   ├── pesquisas/             # Pesquisas profundas (peso: 30%)
│   └── rascunhos/             # Material preliminar (peso: 30%)
├── output/                    # Saídas geradas
│   ├── capitulos/             # Capítulos individuais
│   └── final/                 # Livro compilado
├── workflows/                 # Scripts de automação
├── templates/                 # Templates
├── config/                    # Configurações
└── .claude/                   # Comandos customizados Claude
```

## 🔄 Pipeline de Processamento

```
SETUP → ANALYZE → WRITE → VALIDATE → DEPLOY
  ↓        ↓         ↓         ↓         ↓
 ✓Config  ✓Estilo  ✓Gerar  ✓Quality   ✓Save
          ✓Conteúdo
```

### Fases do Pipeline

1. **SETUP**: Carrega configurações e prepara ambiente limpo
2. **ANALYZE**: Analisa estilo e conteúdo (context refresh)
3. **WRITE**: Gera capítulo com contexto enriquecido
4. **VALIDATE**: Valida qualidade (min. 85% em todas métricas)
5. **DEPLOY**: Salva capítulo validado e versiona

## 💡 Filosofia: Livro Como Produto Digital

Este workflow trata o livro como um **produto digital moderno**:

| Conceito Software | Aplicação no Livro |
|-------------------|-------------------|
| Componentes | Capítulos modulares |
| CI/CD | Pipeline automatizado |
| Versionamento | Git para controle |
| Quality Gates | Validação antes de merge |
| Iteração | Feedback loops curtos |
| Automatização | Scripts repetíveis |

## 🎯 Problema Resolvido

### ❌ Abordagem Anterior (Problemática)

- Escrever tudo de uma vez
- Contexto acumulado degradando
- **Resultado**: Boa estrutura, mas estilo inconsistente

### ✅ Abordagem Atual (Solução)

- Processar capítulo por capítulo
- Context refresh em cada iteração
- Validação contínua
- **Resultado**: Estrutura + estilo consistentes

## 🛠️ Comandos Disponíveis

### Comandos Claude (Recomendado)

```
/write-chapter [capitulo-id]    # Pipeline completo de geração
/analyze-style                  # Análise profunda de estilo
/build-book                     # Compilação final do livro
```

### Scripts Bash

```bash
# Processar capítulo
./workflows/process-chapter.sh [capitulo-id]

# Build final
./workflows/build-book.sh

# Validação de estilo (se implementado)
./workflows/validate-style.sh [capitulo-id]
```

## 📊 Métricas de Qualidade

Cada capítulo é validado em:

- **Consistência de Estilo**: Comparação com documentos de referência
- **Completude de Conteúdo**: Verificação de tópicos obrigatórios
- **Acurácia Técnica**: Validação de código e exemplos
- **Clareza Pedagógica**: Análise de estrutura didática

**Threshold de aprovação**: 85% em todas as métricas

## 📝 Melhores Práticas

### DO's ✅

- Processe **um capítulo por vez**
- Valide **antes de prosseguir**
- Mantenha materiais **organizados**
- **Versione** cada capítulo
- Revise outputs **regularmente**

### DON'Ts ❌

- ~~Não tente escrever tudo de uma vez~~
- ~~Não acumule contexto entre capítulos~~
- ~~Não pule validações~~
- ~~Não misture estilos diferentes~~
- ~~Não use rascunhos como ponto principal~~

## 🔍 Troubleshooting

### Estilo inconsistente

```bash
# Re-execute análise de estilo
/analyze-style

# Verifique documentos de referência
ls -la estilo/
```

### Capítulo não passou validação

Consulte: `output/capitulos/[capitulo-id]/validation-report.md`

### Conteúdo superficial

Verifique:
1. Surveys suficientes em `conteudo/surveys/`
2. Pesquisas relevantes em `conteudo/pesquisas/`
3. Pesos configurados em `config/book-config.yaml`

## 🤝 Contribuindo

Este é um projeto pessoal de elaboração de livro, mas o **workflow é reutilizável** para outros projetos de conteúdo técnico.

Sinta-se livre para:
- Adaptar para seu próprio livro/conteúdo
- Sugerir melhorias no workflow
- Reportar bugs ou problemas

## 📄 Licença

MIT License - Veja [LICENSE](LICENSE) para detalhes

## 👤 Autor

**George Marmelstein**

## 🎓 Referências e Inspirações

Este workflow foi inspirado em:
- Práticas de desenvolvimento de software (Agile, CI/CD)
- Metodologias de produtos digitais
- Princípios de qualidade de código
- Workflows de documentação técnica (Docs as Code)

## 📅 Status do Projeto

- [x] Setup inicial do workflow
- [x] Criação de estrutura modular
- [x] Implementação de scripts de automação
- [x] Documentação completa
- [ ] Geração de capítulos
- [ ] Validação e refinamento
- [ ] Build final
- [ ] Publicação

---

**Desenvolvido com Claude Code no modo agêntico**

*"Tratando livros como produtos digitais para maximizar qualidade e eficiência"*
