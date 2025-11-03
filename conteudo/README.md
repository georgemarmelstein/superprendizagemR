# 📖 Pasta de Conteúdo

## Propósito

Esta pasta contém a **base de conhecimento** que será transformada nos capítulos do livro.

## Estrutura

```
conteudo/
├── surveys/        # Aprofundamento teórico (peso: 40%)
├── pesquisas/      # Pesquisas profundas (peso: 30%)
└── rascunhos/      # Material preliminar (peso: 30%, SUBSÍDIO)
```

## 📊 Surveys (40% do peso)

**O que são**: Revisões amplas, aprofundamento teórico, estado da arte.

**Adicione aqui**:
- Papers de survey/review sobre o tema
- Documentação oficial completa
- Tutoriais abrangentes de referência
- Livros técnicos (capítulos relevantes)

**Exemplo**:
```bash
cp ~/papers/survey-r-programming.pdf conteudo/surveys/
cp ~/docs/r-official-manual.pdf conteudo/surveys/
```

## 🔬 Pesquisas (30% do peso)

**O que são**: Suas pesquisas profundas, análises detalhadas, estudos específicos.

**Adicione aqui**:
- Suas anotações de pesquisa
- Análises comparativas que você fez
- Estudos de caso detalhados
- Experimentos e descobertas suas

**Exemplo**:
```bash
cp ~/pesquisa/analise-tidyverse-vs-base-r.md conteudo/pesquisas/
cp ~/estudos/performance-r.md conteudo/pesquisas/
```

## 📝 Rascunhos (30% do peso, SUBSÍDIO)

**O que são**: Material preliminar, notas, ideias iniciais.

**⚠️ IMPORTANTE**: Rascunhos são apenas **subsídio/inspiração**, NÃO a fonte principal!

**Adicione aqui**:
- Seus rascunhos iniciais do capítulo
- Notas e anotações
- Ideias e esboços
- Materiais "work in progress"

**Exemplo**:
```bash
cp ~/rascunhos/ideias-cap1.md conteudo/rascunhos/
cp ~/notas/exemplos-r.txt conteudo/rascunhos/
```

## 🎯 Como o Conteúdo é Usado

Para cada capítulo, o Claude:

1. **Identifica** conteúdo relevante nas três pastas
2. **Analisa profundamente** cada documento
3. **Extrai conceitos-chave** e informações técnicas
4. **Compõe o capítulo** seguindo os pesos:
   - 40% baseado em surveys
   - 30% baseado em pesquisas
   - 30% inspirado em rascunhos (transformado, não copiado)

## 📋 Checklist Pré-Geração

Antes de gerar um capítulo, certifique-se de ter:

- [ ] Pelo menos 1 arquivo em `surveys/`
- [ ] Pelo menos 1 arquivo em `pesquisas/` OU `rascunhos/`
- [ ] Conteúdo relevante para o capítulo específico

## 💡 Dicas

### Organize por Capítulo

Você pode criar subpastas:

```bash
surveys/
├── cap01-introducao/
├── cap02-fundamentos/
└── cap03-estruturas/
```

### Nomeação Clara

Use nomes descritivos:
- ✅ `survey-tidyverse-2023.pdf`
- ✅ `pesquisa-performance-dplyr.md`
- ❌ `doc1.pdf`
- ❌ `temp.txt`

### Formatos Suportados

- Markdown (`.md`)
- Texto (`.txt`)
- PDF (`.pdf`)
- R Markdown (`.Rmd`)
- Word (`.docx`)
- HTML (`.html`)

## 🔄 Context Enrichment

Para cada capítulo:
1. **Context Refresh**: Análise limpa de estilo
2. **Context Enrichment**: Análise profunda do conteúdo relevante
3. **Geração**: Combinar estilo + conteúdo

## Status Atual

```bash
# Ver conteúdo atual
tree -L 2 conteudo/
```

---

**Peso total**: 100% do conteúdo técnico
**Análise**: Específica para cada capítulo
