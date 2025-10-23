# Módulo 1: Fundamentos da Engenharia de Prompts

## 1.2 Como Modelos de Linguagem Funcionam

### Entendendo os Large Language Models (LLMs)

Para criar prompts eficazes, é essencial entender como os modelos de linguagem processam e geram texto.

---

### O que são Large Language Models?

Large Language Models (LLMs) são modelos de inteligência artificial treinados em vastas quantidades de texto para entender e gerar linguagem natural.

#### Características Principais:

- **Bilhões de parâmetros**: Conexões neurais que armazenam conhecimento
- **Treinamento massivo**: Expostos a terabytes de texto da internet
- **Predição de padrões**: Aprendem relações estatísticas entre palavras
- **Contexto**: Processam informações dentro de uma janela de contexto

---

### Como Funcionam Internamente?

#### 1. Tokenização
O texto é dividido em unidades menores chamadas "tokens".

**Exemplo:**
```
Texto: "Inteligência Artificial é incrível!"

Tokens possíveis:
["Intelig", "ência", " Artificial", " é", " incr", "ível", "!"]
```

**Importante:**
- Uma palavra pode ser múltiplos tokens
- Espaços e pontuação são tokens
- Limites de tokens (~4K-128K dependendo do modelo)

#### 2. Embedding
Tokens são convertidos em representações numéricas (vetores) que capturam significado.

Palavras similares têm vetores próximos no espaço matemático:
- "cachorro" e "cão" → vetores similares
- "cachorro" e "foguete" → vetores distantes

#### 3. Processamento Transformador
Camadas de atenção processam as relações entre todos os tokens:

```
Frase: "O gato bebeu o leite porque estava com sede"

O modelo aprende que:
- "estava" se refere a "gato" (não "leite")
- "sede" explica "bebeu"
- "o" antes de "gato" e "leite" tem funções diferentes
```

#### 4. Predição
O modelo prediz o próximo token mais provável baseado em:
- Contexto anterior
- Padrões aprendidos no treinamento
- Probabilidades estatísticas

---

### O que os Modelos PODEM Fazer

#### 1. Reconhecimento de Padrões
Identificar estruturas e relações em texto.

**Exemplo:**
```
Prompt: Complete o padrão: 2, 4, 6, 8, __

O modelo reconhece: sequência de números pares
Resposta: 10
```

#### 2. Transformação de Informação
Converter informação de um formato para outro.

**Exemplo:**
```
Texto narrativo → Tabela
Lista de itens → JSON
Formal → Informal
```

#### 3. Síntese e Resumo
Condensar informações mantendo pontos essenciais.

#### 4. Geração Criativa
Criar conteúdo original baseado em padrões aprendidos.

#### 5. Raciocínio Básico
Seguir lógica simples e fazer inferências.

---

### O que os Modelos NÃO PODEM Fazer (Limitações)

#### 1. Conhecimento em Tempo Real
Modelos têm uma "data de corte" de treinamento.

**Exemplo:**
```
❌ "Quem venceu o campeonato hoje?"
✅ "Quem venceu o campeonato de 2022?"
```

#### 2. Acesso a Informações Externas
Não podem buscar na internet ou acessar bancos de dados (sem ferramentas).

#### 3. Cálculos Complexos Precisos
Podem errar em matemática complexa.

**Exemplo:**
```
❌ Multiplicar números grandes: 8,734 × 9,821
✅ Explicar como fazer a multiplicação
```

#### 4. Memória Persistente
Não se lembram de conversas anteriores (a menos que no contexto atual).

#### 5. Autoconsciência
Não têm consciência, sentimentos ou experiências reais.

#### 6. Garantia de Veracidade
Podem "alucinar" (gerar informações plausíveis mas falsas).

---

### Conceitos Importantes para Engenharia de Prompts

#### 1. Janela de Contexto

A quantidade de tokens que o modelo pode processar de uma vez.

**Implicações:**
```
Modelo com 4K tokens de contexto:
- ~3.000 palavras de entrada + saída combinadas
- Prompts muito longos = menos espaço para resposta
- Informações além da janela são "esquecidas"
```

**Dica:** Seja conciso e relevante no seu prompt.

#### 2. Atenção e Relevância

O modelo presta mais "atenção" a:
- Informações no início e fim do prompt
- Padrões repetidos
- Estruturas claras

**Aplicação prática:**
```
✅ Coloque instruções importantes no início e fim
✅ Repita pontos críticos
✅ Use formatação clara (listas, separadores)
```

#### 3. Priming (Preparação)

O contexto inicial influencia fortemente a resposta.

**Exemplo:**

**Prompt A:**
```
"Avalie este produto: [descrição]"
→ Resposta neutra/mista
```

**Prompt B:**
```
"Você é um crítico rigoroso. Avalie este produto: [descrição]"
→ Resposta mais crítica
```

**Prompt C:**
```
"Você é um entusiasta. Avalie este produto: [descrição]"
→ Resposta mais positiva
```

#### 4. Temperatura e Amostragem

**Temperatura Baixa (0.0 - 0.3):**
- Escolhe tokens mais prováveis
- Respostas consistentes e determinísticas
- Melhor para: tarefas técnicas, análises, código

**Temperatura Alta (0.7 - 1.0):**
- Mais diversidade na escolha de tokens
- Respostas mais criativas e variadas
- Melhor para: brainstorming, escrita criativa, ideias

---

### Como os Modelos "Entendem" Prompts

#### Processo de Interpretação:

1. **Análise Estrutural**
   - Identifica componentes do prompt
   - Reconhece formato e padrões

2. **Extração de Intenção**
   - Determina o que está sendo pedido
   - Identifica o tipo de tarefa

3. **Contextualização**
   - Considera todo o contexto fornecido
   - Relaciona com conhecimento treinado

4. **Geração**
   - Produz resposta token por token
   - Cada token influencia o próximo

---

### Implicações para Engenharia de Prompts

#### 1. Seja Explícito
Modelos não "adivinham" intenções ocultas.

```
❌ "Me fale sobre isso"
✅ "Explique os principais benefícios da meditação para
    redução de estresse, com base em evidências científicas"
```

#### 2. Forneça Contexto
Quanto mais contexto relevante, melhor.

```
❌ "Como melhorar isso?"
✅ "Tenho um blog de tecnologia com 1000 visitantes/mês.
    Como posso melhorar o engajamento e aumentar o tempo
    de permanência na página?"
```

#### 3. Use Estrutura
Formatação ajuda o modelo a processar informações.

```
✅ Use:
- Listas numeradas/com marcadores
- Seções claras
- Separadores (---, ###)
- Exemplos formatados
```

#### 4. Especifique Formato
Diga exatamente como quer a resposta.

```
"Responda em formato JSON"
"Liste 5 itens numerados"
"Crie uma tabela com 3 colunas"
```

#### 5. Considere Limitações
Adapte tarefas às capacidades do modelo.

```
❌ "Acesse este site e me diga o preço atual"
✅ "Com base nesta descrição do produto, estime uma
    faixa de preço razoável no mercado"
```

---

### Modelos Populares e Suas Características

#### GPT-4 (OpenAI)
- **Pontos fortes:** Raciocínio, análise complexa, código
- **Janela:** ~8K-32K tokens (varia por versão)
- **Melhor para:** Tarefas analíticas e técnicas

#### Claude (Anthropic)
- **Pontos fortes:** Textos longos, análise nuançada, segurança
- **Janela:** ~100K-200K tokens
- **Melhor para:** Análise de documentos, escrita refinada

#### Gemini (Google)
- **Pontos fortes:** Multimodalidade, integração com Google
- **Janela:** ~32K-1M tokens (varia por versão)
- **Melhor para:** Tarefas que combinam texto e imagem

#### LLaMA (Meta)
- **Pontos fortes:** Open source, personalizável
- **Janela:** Varia por versão
- **Melhor para:** Projetos customizados, privacidade

---

### Exercício Prático

**Cenário:** Você precisa que o modelo analise um contrato de 50 páginas.

**Questões:**
1. Que limitações você precisa considerar?
2. Como você estruturaria o prompt?
3. Que modelo seria mais adequado?
4. Como você dividiria a tarefa se o documento for muito grande?

---

### Principais Aprendizados

1. Modelos são sistemas de predição estatística, não inteligências conscientes
2. Eles têm capacidades impressionantes, mas também limitações importantes
3. Entender como funcionam permite criar prompts mais eficazes
4. Contexto, estrutura e clareza são fundamentais
5. Diferentes modelos têm diferentes pontos fortes

---

### Próximos Passos

Agora que você entende como os modelos funcionam, vamos aprender sobre a anatomia de um prompt eficaz.

[← Anterior: Introdução](./01-introducao.md) | [Próximo: Anatomia de um Prompt →](./03-anatomia-prompt.md)

---

### Recursos Adicionais

- Para mais detalhes técnicos, consulte as documentações oficiais dos modelos
- Experimente diferentes modelos para entender suas diferenças
- Mantenha-se atualizado sobre novos lançamentos e capacidades
