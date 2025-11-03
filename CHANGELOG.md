# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-03

### Added - Implementação Inicial do Workflow

#### 🏗️ Arquitetura
- Estrutura modular de diretórios (`estilo/`, `conteudo/`, `output/`, `workflows/`, `config/`, `templates/`)
- Pipeline de processamento inspirado em CI/CD com 5 fases (Setup → Analyze → Write → Validate → Deploy)
- Sistema de context refresh para garantir consistência de estilo
- Configuração centralizada em YAML (`config/book-config.yaml`)

#### 🤖 Comandos Claude Customizados
- `/write-chapter [id]` - Pipeline completo de geração de capítulo
- `/analyze-style` - Análise profunda de documentos de referência
- `/build-book` - Compilação final do livro

#### ⚙️ Scripts de Automação
- `process-chapter.sh` - Processamento automatizado de capítulos
- `build-book.sh` - Build final com estatísticas e versionamento
- Scripts com validação, logging colorido e error handling

#### 📋 Templates
- `chapter-template.md` - Template padrão para capítulos
- `style-analysis.md` - Template para análise de estilo

#### 📚 Documentação
- `README.md` - Visão geral completa do projeto
- `WORKFLOW.md` - Documentação detalhada do workflow
- `QUICKSTART.md` - Guia de início rápido (5 minutos)
- `EXAMPLES.md` - Exemplos práticos de uso
- READMEs específicos em cada pasta explicando propósitos

#### 📦 Organização de Conteúdo
- Sistema de pesos: Surveys (40%), Pesquisas (30%), Rascunhos (30%)
- Separação clara entre estilo e conteúdo
- Suporte para múltiplos formatos (md, pdf, docx, Rmd, etc.)

#### ✅ Validação e Qualidade
- Sistema de validação automática com 4 métricas
- Threshold de qualidade (85%)
- Relatórios de validação detalhados
- Build reports com estatísticas completas

#### 🔧 Configuração
- `.gitignore` completo para R e workflow
- Configuração YAML extensível
- Versionamento automático de outputs

#### 📖 Conteúdo Inicial
- Rascunho inicial movido para `conteudo/rascunhos/`
- Estrutura preparada para adição de materiais

### Design Principles

1. **Modularidade**: Cada capítulo é um módulo independente
2. **Context Refresh**: Renovação de contexto em cada iteração
3. **Iteratividade**: Processo repetível e consistente
4. **Quality Assurance**: Validação em cada etapa
5. **Versionamento**: Controle completo com Git

### Workflow Philosophy

Tratamento do livro como **produto digital moderno**:
- Componentização (capítulos = componentes)
- CI/CD (pipeline automatizado)
- Quality Gates (validação antes de deploy)
- Iteração rápida (feedback loops curtos)
- Automatização (scripts repetíveis)

### Problema Resolvido

**Antes**:
- ❌ Escrever tudo de uma vez
- ❌ Contexto acumulado degradando estilo
- ❌ Resultado: Estrutura OK, estilo inconsistente

**Depois**:
- ✅ Processar capítulo por capítulo
- ✅ Context refresh em cada iteração
- ✅ Resultado: Estrutura + estilo consistentes

### Technical Stack

- Claude Code (modo agêntico)
- Bash scripting
- YAML configuration
- Markdown documentation
- Git versioning

### Metrics

- Setup time: ~10 minutos
- Time per chapter: ~10 minutos
- Quality threshold: 85% em todas métricas
- Estimated total time (5 chapters): ~72 minutos

---

## [Unreleased]

### Planejado para próximas versões

#### v1.1.0 - Melhorias de Validação
- [ ] Validação de sintaxe R nos blocos de código
- [ ] Análise de legibilidade (Flesch-Kincaid)
- [ ] Detecção de plágio/similaridade excessiva
- [ ] Verificação de links quebrados

#### v1.2.0 - Extensões do Workflow
- [ ] Suporte para imagens e diagramas
- [ ] Geração automática de índice remissivo
- [ ] Suporte para referências bibliográficas (BibTeX)
- [ ] Preview mode para capítulos

#### v1.3.0 - Ferramentas Adicionais
- [ ] Dashboard de progresso
- [ ] Métricas de qualidade ao longo do tempo
- [ ] Comparação entre versões de capítulos
- [ ] Suporte para múltiplos idiomas

#### v2.0.0 - Advanced Features
- [ ] Integração com Pandoc avançada
- [ ] Themes customizáveis para output
- [ ] Suporte para notebooks interativos
- [ ] CI/CD real com GitHub Actions

---

## Tipos de Mudanças

- `Added` - Novas funcionalidades
- `Changed` - Mudanças em funcionalidades existentes
- `Deprecated` - Funcionalidades que serão removidas
- `Removed` - Funcionalidades removidas
- `Fixed` - Correções de bugs
- `Security` - Correções de segurança

---

[1.0.0]: https://github.com/georgemarmelstein/superprendizagemR/releases/tag/v1.0.0
[Unreleased]: https://github.com/georgemarmelstein/superprendizagemR/compare/v1.0.0...HEAD
