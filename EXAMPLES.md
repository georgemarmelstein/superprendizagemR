# 📚 Exemplos de Uso do Workflow

## Exemplo Completo: Do Setup ao Livro Final

### Cenário

Você quer escrever um livro sobre R com 5 capítulos, mantendo seu estilo pessoal consistente.

---

## Parte 1: Setup Inicial (10 minutos)

### 1. Adicione Documentos de Estilo

```bash
# Você tem 3 artigos que escreveu sobre R
cp ~/blog/introducao-ao-r.md estilo/
cp ~/artigos/tidyverse-pratico.md estilo/
cp ~/tutoriais/analise-dados-r.md estilo/

# Verifique
ls estilo/
# Output:
# introducao-ao-r.md
# tidyverse-pratico.md
# analise-dados-r.md
```

### 2. Organize o Conteúdo

```bash
# Surveys (40% do peso)
cp ~/papers/r-programming-survey-2023.pdf conteudo/surveys/
cp ~/docs/r-documentation.pdf conteudo/surveys/

# Pesquisas (30% do peso)
cp ~/pesquisa/comparacao-r-python.md conteudo/pesquisas/
cp ~/analises/performance-r.md conteudo/pesquisas/

# Rascunhos (30% do peso)
cp ~/rascunhos/notas-livro.md conteudo/rascunhos/
cp ~/ideias/exemplos-r.txt conteudo/rascunhos/

# Verifique estrutura
tree conteudo/
```

### 3. Configure os Capítulos

Edite `config/book-config.yaml`:

```yaml
book:
  title: "Super Aprendizagem em R"
  author: "George Marmelstein"
  version: "1.0.0"

chapters:
  - id: "01-introducao"
    title: "Introdução: Por Que R?"
    status: "pending"
    priority: 1

  - id: "02-preparacao"
    title: "Preparando o Ambiente R"
    status: "pending"
    priority: 2

  - id: "03-fundamentos"
    title: "Fundamentos da Linguagem R"
    status: "pending"
    priority: 3

  - id: "04-tidyverse"
    title: "Tidyverse: Manipulação Moderna de Dados"
    status: "pending"
    priority: 4

  - id: "05-visualizacao"
    title: "Visualização com ggplot2"
    status: "pending"
    priority: 5
```

---

## Parte 2: Geração do Primeiro Capítulo (10 minutos)

### No Claude Code

```
Você: /write-chapter 01-introducao
```

### O Que Acontece (Automaticamente)

**FASE 1: SETUP**
```
✓ Configuração carregada
✓ Capítulo identificado: 01-introducao
✓ Ambiente preparado
```

**FASE 2: ANALYZE**
```
✓ Analisando 3 documentos de estilo...
  - Estilo identificado: [análise detalhada]
✓ Analisando conteúdo relevante...
  - 2 surveys encontrados
  - 2 pesquisas encontradas
  - 2 rascunhos encontrados
```

**FASE 3: WRITE**
```
✓ Gerando capítulo com contexto enriquecido...
  - Aplicando estilo mimetizado
  - Integrando conteúdo técnico
  - Criando exemplos práticos
```

**FASE 4: VALIDATE**
```
✓ Validação de qualidade:
  - Consistência de estilo: 92%
  - Completude de conteúdo: 95%
  - Acurácia técnica: 90%
  - Clareza pedagógica: 93%

  Score geral: 92.5% ✅ (threshold: 85%)
```

**FASE 5: DEPLOY**
```
✓ Capítulo salvo: output/capitulos/01-introducao-final.md
✓ Análises salvas: output/capitulos/01-introducao/
```

### Resultado

```bash
# Ver o capítulo gerado
cat output/capitulos/01-introducao-final.md
```

**Output**: Capítulo completo com seu estilo, conteúdo técnico rico, exemplos práticos em R.

---

## Parte 3: Revisão e Ajustes (5 minutos)

### Revisar Análise de Estilo

```bash
cat output/capitulos/01-introducao/style-analysis.md
```

**Se o estilo não ficou ideal**:

```
Você: /analyze-style

# Adicione mais documentos se necessário
cp ~/mais-artigos/* estilo/

# Re-processe o capítulo
Você: /write-chapter 01-introducao
```

### Revisar Validação

```bash
cat output/capitulos/01-introducao/validation-report.md
```

**Exemplo de relatório**:
```markdown
# Relatório de Validação - Capítulo 01

## Scores
- Estilo: 92% ✅
- Conteúdo: 95% ✅
- Técnico: 90% ✅
- Pedagógico: 93% ✅

## Pontos Fortes
- Exemplos práticos bem escolhidos
- Código limpo e comentado
- Progressão lógica clara

## Sugestões
- Adicionar mais metáforas (característica do seu estilo)
- Incluir exercício prático no final
```

---

## Parte 4: Processar Demais Capítulos (10 min/capítulo)

### Capítulo 2

```
Você: /write-chapter 02-preparacao
```

**Note**: O processo é **idêntico**, mas com:
- ✅ Context refresh (estilo analisado novamente)
- ✅ Contexto limpo (não acumula do cap 1)
- ✅ Conteúdo específico para este capítulo

### Capítulos 3, 4, 5

```
Você: /write-chapter 03-fundamentos
Você: /write-chapter 04-tidyverse
Você: /write-chapter 05-visualizacao
```

Cada um segue o **mesmo processo modular**.

---

## Parte 5: Build Final (5 minutos)

### Compilar Livro

```bash
./workflows/build-book.sh
```

**Output**:
```
✅ BUILD CONCLUÍDO COM SUCESSO!

📖 Livro: Super Aprendizagem em R
📊 Estatísticas:
   - Capítulos: 5
   - Palavras: 12,543
   - Páginas: ~42

📁 Arquivos gerados:
   - output/final/super-aprendizagem-r.md
   - output/final/super-aprendizagem-r-20231103-143022.md
   - output/final/build-report.md
```

### Ver Livro Final

```bash
# Markdown
cat output/final/super-aprendizagem-r.md

# Gerar PDF (se Pandoc disponível)
pandoc output/final/super-aprendizagem-r.md \
  -o output/final/super-aprendizagem-r.pdf \
  --pdf-engine=xelatex

# Gerar DOCX
pandoc output/final/super-aprendizagem-r.md \
  -o output/final/super-aprendizagem-r.docx
```

---

## Parte 6: Controle de Versão (2 minutos)

```bash
# Commit do livro completo
git add .
git commit -m "feat: livro completo - 5 capítulos validados"
git push -u origin claude/book-workflow-setup-011CUkujmnPBJP8Fq3to7pAN
```

---

## 📊 Timeline Total

| Etapa | Tempo | Atividade |
|-------|-------|-----------|
| Setup | 10 min | Organizar materiais e configurar |
| Cap 1 | 10 min | Gerar e validar primeiro capítulo |
| Revisão | 5 min | Revisar e ajustar se necessário |
| Cap 2-5 | 40 min | Gerar capítulos restantes (10 min cada) |
| Build | 5 min | Compilar livro final |
| Git | 2 min | Commit e push |
| **TOTAL** | **~72 min** | **Livro completo de 5 capítulos!** |

---

## 🎯 Comparação: Antes vs. Depois

### ❌ Abordagem Anterior

```
Tempo: 4-6 horas
Qualidade: Estrutura boa, estilo degradando
Manutenção: Difícil (monolito)
Versionamento: Caótico
Validação: Manual, inconsistente
```

### ✅ Com Este Workflow

```
Tempo: ~72 minutos
Qualidade: Estrutura + estilo consistentes
Manutenção: Fácil (modular)
Versionamento: Automático por capítulo
Validação: Automática, > 85% em todas métricas
```

---

## 💡 Casos de Uso Adicionais

### Atualizar Um Capítulo Específico

```bash
# Edite conteúdo relevante
nano conteudo/surveys/novo-material-cap3.md

# Re-processe apenas esse capítulo
/write-chapter 03-fundamentos

# Re-compile o livro
./workflows/build-book.sh
```

### Adicionar Novo Capítulo Ao Livro Existente

```yaml
# Edite config/book-config.yaml
chapters:
  # ... capítulos existentes ...
  - id: "06-machine-learning"
    title: "Machine Learning com R"
    status: "pending"
    priority: 6
```

```bash
# Gere o novo capítulo
/write-chapter 06-machine-learning

# Re-compile
./workflows/build-book.sh
```

### Experimento: Diferentes Estilos

```bash
# Crie branch para experimento
git checkout -b experiment/estilo-informal

# Substitua documentos de estilo
rm estilo/*
cp ~/artigos-informais/* estilo/

# Re-processe capítulo
/write-chapter 01-introducao

# Compare resultados
diff output/capitulos/01-introducao-final.md \
     ../main/output/capitulos/01-introducao-final.md
```

---

## 🎓 Lições Aprendidas

1. **Context refresh funciona**: Cada capítulo mantém estilo consistente
2. **Modularidade é poder**: Fácil atualizar partes específicas
3. **Validação automática poupa tempo**: Problemas detectados cedo
4. **Rascunhos são subsídio**: Conteúdo final é muito mais rico que rascunhos
5. **Pipeline CI/CD para livros funciona**: Qualidade e eficiência aumentam

---

**Este workflow transformou**: horas de trabalho inconsistente → minutos de produção de alta qualidade! 🚀
