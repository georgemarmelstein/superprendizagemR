# 🚀 Guia de Início Rápido

## Em 5 Minutos Para Seu Primeiro Capítulo

### Passo 1: Adicione Material de Estilo (2 minutos)

```bash
# Copie 1-3 documentos que você escreveu anteriormente
cp ~/meus-documentos/artigo1.md estilo/
cp ~/meus-documentos/post-blog.md estilo/

# Podem ser: artigos, posts, tutoriais, qualquer coisa sua!
```

**Por quê?** Claude analisará seu estilo para replicá-lo.

### Passo 2: Adicione Conteúdo Base (1 minuto)

```bash
# Adicione pelo menos um arquivo em cada categoria

# Surveys/teoria sobre o tema
cp ~/pesquisa/survey-r.pdf conteudo/surveys/

# Suas pesquisas profundas
cp ~/pesquisa/analise-r.md conteudo/pesquisas/

# Seus rascunhos/notas
cp ~/rascunhos/notas-capitulo1.md conteudo/rascunhos/
```

**Por quê?** Este é o conteúdo técnico que será transformado em capítulo.

### Passo 3: Configure Seu Primeiro Capítulo (1 minuto)

Edite `config/book-config.yaml`:

```yaml
chapters:
  - id: "01-introducao"
    title: "Introdução ao R"
    status: "pending"
    priority: 1
```

### Passo 4: Gere o Capítulo! (1 minuto)

**No Claude Code:**

```
/write-chapter 01-introducao
```

**Ou no terminal:**

```bash
./workflows/process-chapter.sh 01-introducao
```

### Passo 5: Revise o Output

```bash
# Veja o capítulo gerado
cat output/capitulos/01-introducao-final.md

# Veja a análise de estilo
cat output/capitulos/01-introducao/style-analysis.md

# Veja o relatório de validação
cat output/capitulos/01-introducao/validation-report.md
```

---

## 🎯 Próximos Passos

Após seu primeiro capítulo:

### 1. Revise e Ajuste

Se o estilo não ficou ideal:
- Adicione mais documentos de referência em `estilo/`
- Execute `/analyze-style` novamente
- Re-processe o capítulo

### 2. Continue Com Próximos Capítulos

```bash
# Adicione mais capítulos no config/book-config.yaml
# Depois processe cada um

/write-chapter 02-fundamentos
/write-chapter 03-estruturas-dados
# ...
```

### 3. Compile o Livro Final

Quando todos capítulos estiverem prontos:

```bash
./workflows/build-book.sh
```

Output: `output/final/super-aprendizagem-r.md`

---

## 💡 Dicas Para Melhores Resultados

### Documentos de Estilo

**✅ Bons exemplos**:
- Seus artigos publicados
- Posts de blog técnicos seus
- Tutoriais que você escreveu
- Documentação sua

**❌ Evite**:
- Documentos de outras pessoas
- Conteúdo muito curto (< 500 palavras)
- Estilos muito diferentes entre si

### Conteúdo Base

**Organização recomendada**:

```
conteudo/
├── surveys/           # 40% do peso
│   ├── survey-tidyverse.pdf
│   └── fundamentals-r.md
├── pesquisas/         # 30% do peso
│   ├── analise-profunda-r.md
│   └── comparacao-python-r.md
└── rascunhos/         # 30% do peso (subsídio)
    ├── notas-cap1.md
    └── ideias-exemplos.txt
```

**Lembre-se**: Rascunhos são apenas **subsídio**, não fonte principal!

### Configuração de Capítulos

**Defina claramente**:

```yaml
- id: "02-fundamentos"        # ID único
  title: "Fundamentos do R"   # Título descritivo
  status: "pending"           # pending | in_progress | done
  priority: 2                 # Ordem de processamento
```

---

## 🔧 Troubleshooting Rápido

### Erro: "Nenhum documento de estilo"

```bash
# Verifique se adicionou documentos
ls estilo/

# Adicione pelo menos um documento
cp ~/meu-artigo.md estilo/
```

### Erro: "Capítulo muito curto"

Adicione mais conteúdo base:
```bash
# Mais surveys ou pesquisas
cp ~/mais-conteudo/* conteudo/surveys/
```

### Estilo inconsistente

```bash
# Re-analise o estilo
/analyze-style

# Adicione mais documentos de referência
cp ~/outros-documentos/* estilo/

# Re-processe o capítulo
/write-chapter [capitulo-id]
```

---

## 📚 Comandos Essenciais

### Claude Code

```
/write-chapter [id]     # Gera capítulo completo
/analyze-style          # Analisa estilo dos documentos
/build-book            # Compila livro final
```

### Terminal

```bash
# Processar capítulo
./workflows/process-chapter.sh [id]

# Build final
./workflows/build-book.sh

# Ver estrutura
tree -L 2
```

---

## 📖 Documentação Completa

Para workflow detalhado: **[WORKFLOW.md](./WORKFLOW.md)**

Para arquitetura completa: **[README.md](./README.md)**

---

## ✅ Checklist Pré-Geração

Antes de executar `/write-chapter`:

- [ ] Pelo menos 1 documento em `estilo/`
- [ ] Pelo menos 1 arquivo em `conteudo/surveys/`
- [ ] Pelo menos 1 arquivo em `conteudo/pesquisas/` ou `conteudo/rascunhos/`
- [ ] Capítulo configurado em `config/book-config.yaml`
- [ ] Scripts com permissão de execução (`chmod +x workflows/*.sh`)

---

## 🎉 Você Está Pronto!

Execute:

```
/write-chapter [seu-capitulo-id]
```

E veja a mágica acontecer! 🚀

---

**Tempo total de setup**: ~5 minutos
**Tempo de geração por capítulo**: ~5-10 minutos (dependendo da complexidade)
**Resultado**: Capítulo com seu estilo, conteúdo técnico rico e validação de qualidade!
