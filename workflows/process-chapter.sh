#!/bin/bash
# Script de Processamento de Capítulo
# Executa pipeline completo para um capítulo específico

set -e  # Exit on error

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções de logging
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
echo "╔════════════════════════════════════════════════════════════╗"
echo "║       Pipeline de Processamento de Capítulo               ║"
echo "║       Super Aprendizagem em R - Workflow v1.0             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Validação de parâmetros
if [ $# -eq 0 ]; then
    log_error "Nenhum capítulo especificado!"
    echo "Uso: $0 <chapter-id> [--deep-analysis]"
    echo ""
    echo "Exemplo: $0 01-introducao"
    exit 1
fi

CHAPTER_ID=$1
DEEP_ANALYSIS=false

if [ "$2" == "--deep-analysis" ]; then
    DEEP_ANALYSIS=true
    log_info "Modo de análise profunda ativado"
fi

# Configuração
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG_FILE="$PROJECT_ROOT/config/book-config.yaml"
OUTPUT_DIR="$PROJECT_ROOT/output/capitulos/$CHAPTER_ID"

log_info "Diretório do projeto: $PROJECT_ROOT"
log_info "Processando capítulo: $CHAPTER_ID"
echo ""

# FASE 1: SETUP
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "FASE 1: SETUP - Context Loading"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Verificar se configuração existe
if [ ! -f "$CONFIG_FILE" ]; then
    log_error "Arquivo de configuração não encontrado: $CONFIG_FILE"
    exit 1
fi

log_success "Configuração carregada"

# Criar diretório de output
mkdir -p "$OUTPUT_DIR"
log_success "Diretório de output criado: $OUTPUT_DIR"

# Limpar processamentos anteriores (context refresh)
if [ -d "$OUTPUT_DIR" ]; then
    log_warning "Limpando processamentos anteriores..."
    rm -f "$OUTPUT_DIR"/*.md
fi

log_success "Ambiente preparado"
echo ""

# FASE 2: ANALYZE
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "FASE 2: ANALYZE - Context Building"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

log_info "Analisando documentos de estilo..."
STYLE_DOCS=$(find "$PROJECT_ROOT/estilo" -type f 2>/dev/null | wc -l)

if [ $STYLE_DOCS -eq 0 ]; then
    log_warning "Nenhum documento de estilo encontrado em estilo/"
    log_warning "Recomenda-se adicionar documentos de referência"
else
    log_success "Encontrados $STYLE_DOCS documento(s) de estilo"
fi

log_info "Analisando conteúdo..."

SURVEYS=$(find "$PROJECT_ROOT/conteudo/surveys" -type f 2>/dev/null | wc -l)
RESEARCH=$(find "$PROJECT_ROOT/conteudo/pesquisas" -type f 2>/dev/null | wc -l)
DRAFTS=$(find "$PROJECT_ROOT/conteudo/rascunhos" -type f 2>/dev/null | wc -l)

log_success "Surveys: $SURVEYS | Pesquisas: $RESEARCH | Rascunhos: $DRAFTS"
echo ""

# FASE 3: WRITE
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "FASE 3: WRITE - Content Generation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

log_info "Esta fase deve ser executada pelo Claude Code"
log_info "Use o comando: /write-chapter $CHAPTER_ID"
echo ""

# Verificar se capítulo foi gerado
if [ -f "$OUTPUT_DIR/chapter.md" ]; then
    log_success "Capítulo encontrado: $OUTPUT_DIR/chapter.md"
    WORD_COUNT=$(wc -w < "$OUTPUT_DIR/chapter.md")
    log_info "Contagem de palavras: $WORD_COUNT"
else
    log_warning "Capítulo ainda não foi gerado"
    log_info "Execute: /write-chapter $CHAPTER_ID no Claude Code"
    exit 0
fi
echo ""

# FASE 4: VALIDATE
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "FASE 4: VALIDATE - Quality Assurance"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

log_info "Executando validações básicas..."

# Validação 1: Estrutura
if grep -q "^# " "$OUTPUT_DIR/chapter.md"; then
    log_success "Estrutura de headings presente"
else
    log_error "Nenhum heading encontrado"
fi

# Validação 2: Código R
CODE_BLOCKS=$(grep -c '```r' "$OUTPUT_DIR/chapter.md" || echo "0")
if [ $CODE_BLOCKS -gt 0 ]; then
    log_success "Blocos de código R: $CODE_BLOCKS"
else
    log_warning "Nenhum bloco de código R encontrado"
fi

# Validação 3: Tamanho mínimo
if [ $WORD_COUNT -lt 500 ]; then
    log_warning "Capítulo muito curto (< 500 palavras)"
elif [ $WORD_COUNT -gt 5000 ]; then
    log_warning "Capítulo muito longo (> 5000 palavras)"
else
    log_success "Tamanho adequado: $WORD_COUNT palavras"
fi

log_info "Para validação completa de estilo, use Claude Code"
echo ""

# FASE 5: DEPLOY
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "FASE 5: DEPLOY - Output Generation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Copiar para versão final
if [ -f "$OUTPUT_DIR/chapter.md" ]; then
    cp "$OUTPUT_DIR/chapter.md" "$PROJECT_ROOT/output/capitulos/${CHAPTER_ID}-final.md"
    log_success "Capítulo salvo como: output/capitulos/${CHAPTER_ID}-final.md"
fi

# Sumário
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                  PROCESSAMENTO CONCLUÍDO                   ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Capítulo: $CHAPTER_ID"
echo "Palavras: $WORD_COUNT"
echo "Código R: $CODE_BLOCKS bloco(s)"
echo ""
echo "Arquivos gerados:"
echo "  - $OUTPUT_DIR/chapter.md"
echo "  - output/capitulos/${CHAPTER_ID}-final.md"
echo ""
echo "Próximos passos:"
echo "  1. Revisar capítulo manualmente"
echo "  2. Executar validação completa no Claude Code"
echo "  3. Processar próximo capítulo"
echo ""
