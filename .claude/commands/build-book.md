---
description: Compila todos os capítulos validados em um livro final completo
---

# Build Final do Livro - Compilação

Execute o **build final** do livro, compilando todos os capítulos validados.

## Pré-requisitos

Antes de executar, verifique:
1. Todos os capítulos foram gerados e validados
2. Capítulos estão em `output/capitulos/`
3. Config está atualizada em `config/book-config.yaml`

## Instruções de Build

### 1. Verificação de Pré-requisitos

```bash
# Liste capítulos disponíveis
ls output/capitulos/*-final.md
```

Compare com capítulos definidos em `config/book-config.yaml`:
- Todos os capítulos estão presentes?
- Todos passaram validação?
- Há capítulos pendentes?

Se houver capítulos faltando:
- Liste capítulos pendentes
- Pergunte se usuário quer prosseguir com build parcial

### 2. Compilação de Metadados

Leia `config/book-config.yaml` e extraia:
- Título do livro
- Autor
- Versão
- Data de build

### 3. Geração do Frontmatter

Crie seção inicial do livro:

```markdown
---
title: "[Título]"
author: "[Autor]"
version: "[Versão]"
date: "[Data]"
---

# [Título do Livro]

**Autor**: [Nome]
**Versão**: [X.Y.Z]
**Data**: [YYYY-MM-DD]

---

## Sobre Este Livro

[Descrição breve do livro]

## Estrutura

[Lista de capítulos]

---
```

### 4. Compilação de Capítulos

Para cada capítulo em ordem (conforme `book-config.yaml`):

1. Leia o arquivo `output/capitulos/[id]-final.md`
2. Adicione ao documento compilado
3. Insira separador entre capítulos:
   ```markdown

   ---

   ```

### 5. Geração de Elementos Adicionais

**a) Sumário Executivo**
- Gerado automaticamente com links para capítulos

**b) Índice Remissivo** (opcional)
- Termos-chave
- Conceitos importantes
- Funções R mencionadas

**c) Referências**
- Consolide referências de todos os capítulos
- Remova duplicatas

**d) Apêndices** (se existirem)
- Material suplementar
- Código completo
- Datasets

### 6. Formatação Final

Aplique formatação consistente:
- Níveis de heading uniformes
- Estilos de código
- Numeração de capítulos
- Links internos

### 7. Validação do Build

Execute checagens finais:

**Estrutura:**
- [ ] Frontmatter completo
- [ ] Todos capítulos presentes
- [ ] Sumário gerado
- [ ] Separadores corretos

**Formatação:**
- [ ] Headings consistentes
- [ ] Blocos de código válidos
- [ ] Links funcionando
- [ ] Imagens (se houver) acessíveis

**Conteúdo:**
- [ ] Sem placeholders
- [ ] Sem TODOs pendentes
- [ ] Transições entre capítulos
- [ ] Coerência geral

### 8. Salvamento

Salve livro compilado:
- **Principal**: `output/final/super-aprendizagem-r.md`
- **Versionado**: `output/final/super-aprendizagem-r-v[X.Y.Z].md`
- **Timestamped**: `output/final/super-aprendizagem-r-[YYYYMMDD-HHMMSS].md`

### 9. Geração de Formatos Alternativos (Opcional)

Se Pandoc estiver disponível, ofereça gerar:
- PDF
- DOCX
- HTML
- EPUB

```bash
# Exemplo para PDF
pandoc output/final/super-aprendizagem-r.md -o output/final/super-aprendizagem-r.pdf
```

### 10. Relatório de Build

Gere relatório com estatísticas:

```markdown
# Build Report - Super Aprendizagem em R

**Data**: [timestamp]
**Versão**: [X.Y.Z]

## Estatísticas

- Total de capítulos: [N]
- Total de palavras: [count]
- Total de blocos de código: [count]
- Total de páginas estimadas: [count]

## Capítulos Incluídos

1. [Título] - [word count] palavras
2. [Título] - [word count] palavras
...

## Qualidade

- Score médio de qualidade: [%]
- Capítulos com score > 90%: [N]
- Capítulos que precisam revisão: [lista]

## Arquivos Gerados

- Livro final: output/final/super-aprendizagem-r.md
- Versionado: output/final/super-aprendizagem-r-v[X.Y.Z].md
- Relatório: output/final/build-report.md
```

Salve em: `output/final/build-report.md`

## Output para Usuário

```
✅ BUILD CONCLUÍDO COM SUCESSO!

📖 Livro: Super Aprendizagem em R
📊 Estatísticas:
   - Capítulos: [N]
   - Palavras: [count]
   - Páginas: ~[estimate]

📁 Arquivos gerados:
   - output/final/super-aprendizagem-r.md
   - output/final/super-aprendizagem-r-v[X.Y.Z].md
   - output/final/build-report.md

🎉 Próximos passos:
   1. Revisar livro completo
   2. Gerar PDF/DOCX se necessário
   3. Fazer commit final
   4. Publicar!
```

## Troubleshooting

### Capítulos faltando
```bash
# Liste capítulos pendentes
./workflows/list-pending.sh
```

### Formatação inconsistente
```bash
# Re-processe com linting
./workflows/lint-markdown.sh output/final/super-aprendizagem-r.md
```

### Build falhou
- Verifique logs em `output/final/build.log`
- Valide cada capítulo individualmente
- Execute build incremental
