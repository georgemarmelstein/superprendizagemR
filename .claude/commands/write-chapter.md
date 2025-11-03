---
description: Processa e escreve um capítulo completo do livro seguindo o workflow modular
---

# Processamento de Capítulo - Pipeline Completo

Você está executando o **pipeline de geração de capítulo** seguindo a metodologia modular definida no WORKFLOW.md.

## Parâmetros Recebidos

Capítulo solicitado: {{args}}

## Instruções de Execução

Execute as seguintes fases **sequencialmente**, marcando cada uma como concluída antes de prosseguir:

### FASE 1: SETUP - Context Loading 🔧

1. Leia `config/book-config.yaml` para obter:
   - Título do capítulo
   - Status atual
   - Prioridade
   - Configurações de estilo e conteúdo

2. Verifique se o capítulo existe na configuração
   - Se não existir, informe o usuário e liste capítulos disponíveis

3. Prepare ambiente limpo:
   - Crie diretório `output/capitulos/{{args}}/` se não existir
   - Limpe contexto de processamentos anteriores

### FASE 2: ANALYZE - Context Building 🔍

**2.1 Análise de Estilo (Context Refresh)**

1. Liste e leia TODOS os documentos em `estilo/`:
   ```
   Para cada documento:
   - Identifique estilo de escrita
   - Identifique abordagem pedagógica
   - Extraia exemplos típicos
   - Extraia metáforas e analogias
   ```

2. Crie perfil de estilo consolidado:
   - Tom e voz
   - Estrutura de frases
   - Uso de exemplos
   - Recursos pedagógicos preferidos

3. Salve análise em: `output/capitulos/{{args}}/style-analysis.md`

**2.2 Análise de Conteúdo (Context Enrichment)**

1. Identifique conteúdo relevante para o capítulo:
   - `conteudo/surveys/` → Aprofundamento teórico (peso: 40%)
   - `conteudo/pesquisas/` → Pesquisas profundas (peso: 30%)
   - `conteudo/rascunhos/` → Material preliminar (peso: 30%, SUBSÍDIO APENAS)

2. Para cada fonte identificada:
   - Leia completamente
   - Extraia pontos-chave
   - Identifique gaps de conteúdo
   - Priorize informações por relevância

3. Crie mapa de conteúdo:
   - Tópicos obrigatórios
   - Conceitos a explicar
   - Exemplos práticos necessários
   - Código/demonstrações

4. Salve análise em: `output/capitulos/{{args}}/content-analysis.md`

### FASE 3: WRITE - Content Generation ✍️

**IMPORTANTE: Este é o momento de GERAR o capítulo com contexto fresco**

1. Com base nas análises de estilo e conteúdo:
   - Estruture o capítulo seguindo padrão pedagógico identificado
   - Aplique o estilo mimetizado dos documentos de referência
   - Integre conteúdo técnico com profundidade adequada
   - Use exemplos e metáforas no estilo identificado

2. Composição do conteúdo:
   - 40% baseado em surveys
   - 30% baseado em pesquisas
   - 30% inspirado em rascunhos (NÃO copiar, TRANSFORMAR)

3. Elementos obrigatórios:
   - Introdução clara
   - Desenvolvimento progressivo
   - Exemplos práticos em R
   - Exercícios ou reflexões
   - Sumário/conclusão

4. Salve capítulo em: `output/capitulos/{{args}}/chapter.md`

### FASE 4: VALIDATE - Quality Assurance ✅

Execute validações automáticas:

1. **Consistência de Estilo**:
   - Compare com análise de estilo
   - Verifique tom e voz
   - Valide uso de recursos pedagógicos

2. **Completude de Conteúdo**:
   - Todos tópicos obrigatórios cobertos?
   - Exemplos suficientes?
   - Código funcional?

3. **Acurácia Técnica**:
   - Conceitos corretos?
   - Código sintaticamente válido?
   - Referências apropriadas?

4. **Clareza Pedagógica**:
   - Progressão lógica?
   - Linguagem acessível?
   - Exercícios apropriados?

5. Calcule score de qualidade (0-100%)

6. Salve relatório em: `output/capitulos/{{args}}/validation-report.md`

7. **Se score < 85%**:
   - Liste problemas identificados
   - Sugira melhorias
   - Pergunte se usuário quer re-processar

### FASE 5: DEPLOY - Output Generation 🚀

1. Se validação passou:
   - Copie `chapter.md` para `output/capitulos/{{args}}-final.md`
   - Atualize status no `config/book-config.yaml`
   - Crie commit com mensagem descritiva

2. Apresente sumário ao usuário:
   ```
   ✅ Capítulo {{args}} processado com sucesso!

   📊 Métricas:
   - Qualidade: [score]%
   - Palavras: [count]
   - Exemplos de código: [count]
   - Tempo de processamento: [time]

   📁 Outputs:
   - Capítulo final: output/capitulos/{{args}}-final.md
   - Análises: output/capitulos/{{args}}/
   ```

3. Sugira próximos passos:
   - Revisar capítulo manualmente
   - Processar próximo capítulo
   - Executar build final (se último capítulo)

## Princípios Críticos

⚠️ **CONTEXT REFRESH**: Analise estilo NOVAMENTE para este capítulo, não reutilize análise anterior

⚠️ **NÃO ACUMULAR**: Não carregue contexto de capítulos anteriores

⚠️ **RASCUNHO = SUBSÍDIO**: Rascunhos são apenas inspiração, não fonte principal

⚠️ **QUALIDADE > VELOCIDADE**: Não pule validações

## Início da Execução

Processe o capítulo **{{args}}** seguindo rigorosamente as fases acima.

Use TodoWrite para trackear progresso de cada fase.
