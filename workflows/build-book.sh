#!/bin/bash
# Script de Build Final do Livro
# Compila todos os capítulos em um documento único

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# Banner
echo ""
echo -e "${MAGENTA}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              BUILD FINAL DO LIVRO                          ║"
echo "║        Super Aprendizagem em R - Workflow v1.0            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

# Configuração
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG_FILE="$PROJECT_ROOT/config/book-config.yaml"
OUTPUT_DIR="$PROJECT_ROOT/output/final"
CHAPTERS_DIR="$PROJECT_ROOT/output/capitulos"

# Criar diretório de output
mkdir -p "$OUTPUT_DIR"

# Timestamp para versionamento
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
DATE_FORMATTED=$(date +"%Y-%m-%d")

# Arquivos de output
FINAL_BOOK="$OUTPUT_DIR/super-aprendizagem-r.md"
VERSIONED_BOOK="$OUTPUT_DIR/super-aprendizagem-r-$TIMESTAMP.md"
BUILD_REPORT="$OUTPUT_DIR/build-report.md"

log_info "Iniciando build do livro..."
echo ""

# Verificar capítulos disponíveis
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Verificando Capítulos Disponíveis"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

CHAPTERS=($(ls "$CHAPTERS_DIR"/*-final.md 2>/dev/null | sort))
CHAPTER_COUNT=${#CHAPTERS[@]}

if [ $CHAPTER_COUNT -eq 0 ]; then
    log_error "Nenhum capítulo encontrado em $CHAPTERS_DIR"
    log_info "Execute /write-chapter para gerar capítulos"
    exit 1
fi

log_success "Encontrados $CHAPTER_COUNT capítulo(s):"
for chapter in "${CHAPTERS[@]}"; do
    BASENAME=$(basename "$chapter")
    WORD_COUNT=$(wc -w < "$chapter")
    echo "  - $BASENAME ($WORD_COUNT palavras)"
done
echo ""

# Iniciar compilação
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Compilando Livro"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Criar arquivo temporário
TEMP_FILE=$(mktemp)

# Frontmatter
cat > "$TEMP_FILE" << 'EOF'
---
title: "Super Aprendizagem em R"
author: "George Marmelstein"
date: "$DATE_FORMATTED"
---

# Super Aprendizagem em R

**Autor**: George Marmelstein
**Data**: $DATE_FORMATTED
**Versão**: 1.0.0

---

## Sobre Este Livro

Este livro é um guia completo para dominar o R, cobrindo desde os fundamentos até técnicas avançadas de análise de dados e programação estatística.

## Como Usar Este Livro

- **Iniciantes**: Comece pelo Capítulo 1 e siga sequencialmente
- **Intermediários**: Foque nos capítulos específicos de seu interesse
- **Referência**: Use o sumário para encontrar tópicos específicos

---

EOF

# Substituir variáveis no frontmatter
sed -i "s/\$DATE_FORMATTED/$DATE_FORMATTED/g" "$TEMP_FILE"

log_success "Frontmatter criado"

# Sumário
echo "" >> "$TEMP_FILE"
echo "## Sumário" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

CHAPTER_NUM=1
for chapter in "${CHAPTERS[@]}"; do
    BASENAME=$(basename "$chapter" -final.md)
    TITLE=$(grep -m 1 "^# " "$chapter" | sed 's/^# //')
    if [ -z "$TITLE" ]; then
        TITLE=$BASENAME
    fi
    echo "$CHAPTER_NUM. [$TITLE](#$(echo $BASENAME | tr '[:upper:]' '[:lower:]'))" >> "$TEMP_FILE"
    ((CHAPTER_NUM++))
done

echo "" >> "$TEMP_FILE"
echo "---" >> "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

log_success "Sumário gerado"

# Adicionar capítulos
log_info "Compilando capítulos..."

for chapter in "${CHAPTERS[@]}"; do
    BASENAME=$(basename "$chapter")
    log_info "  Processando: $BASENAME"

    # Adicionar separador
    echo "" >> "$TEMP_FILE"
    echo "<div style=\"page-break-after: always;\"></div>" >> "$TEMP_FILE"
    echo "" >> "$TEMP_FILE"

    # Adicionar conteúdo do capítulo
    cat "$chapter" >> "$TEMP_FILE"
done

log_success "Todos os capítulos compilados"
echo ""

# Mover para destino final
cp "$TEMP_FILE" "$FINAL_BOOK"
cp "$TEMP_FILE" "$VERSIONED_BOOK"
rm "$TEMP_FILE"

# Calcular estatísticas
TOTAL_WORDS=$(wc -w < "$FINAL_BOOK")
TOTAL_LINES=$(wc -l < "$FINAL_BOOK")
TOTAL_CODE_BLOCKS=$(grep -c '```r' "$FINAL_BOOK" || echo "0")
ESTIMATED_PAGES=$((TOTAL_WORDS / 300))

# Gerar relatório de build
cat > "$BUILD_REPORT" << EOF
# Build Report - Super Aprendizagem em R

**Data do Build**: $DATE_FORMATTED $TIMESTAMP
**Status**: ✅ Concluído com Sucesso

---

## Estatísticas Gerais

| Métrica | Valor |
|---------|-------|
| Total de Capítulos | $CHAPTER_COUNT |
| Total de Palavras | $TOTAL_WORDS |
| Total de Linhas | $TOTAL_LINES |
| Blocos de Código R | $TOTAL_CODE_BLOCKS |
| Páginas Estimadas | ~$ESTIMATED_PAGES |

---

## Capítulos Incluídos

EOF

CHAPTER_NUM=1
for chapter in "${CHAPTERS[@]}"; do
    BASENAME=$(basename "$chapter")
    WORD_COUNT=$(wc -w < "$chapter")
    TITLE=$(grep -m 1 "^# " "$chapter" | sed 's/^# //' || echo "Sem título")
    echo "$CHAPTER_NUM. **$TITLE**" >> "$BUILD_REPORT"
    echo "   - Arquivo: \`$BASENAME\`" >> "$BUILD_REPORT"
    echo "   - Palavras: $WORD_COUNT" >> "$BUILD_REPORT"
    echo "" >> "$BUILD_REPORT"
    ((CHAPTER_NUM++))
done

cat >> "$BUILD_REPORT" << EOF

---

## Arquivos Gerados

- **Livro Final**: \`output/final/super-aprendizagem-r.md\`
- **Versão Timestamped**: \`output/final/super-aprendizagem-r-$TIMESTAMP.md\`
- **Relatório de Build**: \`output/final/build-report.md\`

---

## Próximos Passos

1. ✅ Revisar livro completo
2. ⬜ Gerar PDF usando Pandoc (se disponível)
3. ⬜ Fazer commit final no Git
4. ⬜ Publicar!

---

**Build executado por**: $(whoami)@$(hostname)
**Comando**: \`./workflows/build-book.sh\`
EOF

log_success "Relatório de build gerado"
echo ""

# Resultado final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}BUILD CONCLUÍDO COM SUCESSO!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📖 Livro: Super Aprendizagem em R"
echo ""
echo "📊 Estatísticas:"
echo "   - Capítulos: $CHAPTER_COUNT"
echo "   - Palavras: $TOTAL_WORDS"
echo "   - Páginas: ~$ESTIMATED_PAGES"
echo "   - Código R: $TOTAL_CODE_BLOCKS blocos"
echo ""
echo "📁 Arquivos gerados:"
echo "   - $FINAL_BOOK"
echo "   - $VERSIONED_BOOK"
echo "   - $BUILD_REPORT"
echo ""
echo "🎉 Próximos passos:"
echo "   1. Revisar: cat $FINAL_BOOK"
echo "   2. Gerar PDF: pandoc $FINAL_BOOK -o output/final/livro.pdf"
echo "   3. Commit: git add . && git commit -m \"Build final do livro\""
echo ""
