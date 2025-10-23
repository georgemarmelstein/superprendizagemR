# Módulo 2: Técnicas Avançadas

## 2.7 Gestão de Contexto

### Entendendo Contexto em LLMs

**Contexto** = Toda informação que o modelo considera ao gerar resposta

---

### Limites de Contexto

Modelos têm janelas de contexto limitadas:
- GPT-4: ~8K-32K tokens
- Claude: ~100K-200K tokens
- Gemini: ~32K-1M tokens

**1 token ≈ 0.75 palavras em português**

---

### Gerenciando Contexto Eficientemente

#### 1. Priorize Informações

```
❌ Incluir tudo sem discriminar
✅ Incluir apenas informações relevantes para a tarefa
```

#### 2. Estruture Hierarquicamente

```
### CONTEXTO ESSENCIAL
[Informações críticas]

### CONTEXTO ADICIONAL
[Informações complementares]

### INFORMAÇÕES DE BACKGROUND
[Nice to have]
```

#### 3. Use Resumos

Para documentos longos:
```
Etapa 1: "Resuma este documento em 500 palavras focando em [aspectos]"
Etapa 2: Use o resumo para tarefas subsequentes
```

---

### Técnicas para Documentos Longos

#### Estratégia 1: Chunking
```
Divida documento em seções
Processe cada seção separadamente
Agregue resultados
```

#### Estratégia 2: Map-Reduce
```
Map: Analise cada chunk → resultados parciais
Reduce: Combine resultados parciais → resultado final
```

#### Estratégia 3: Extração Seletiva
```
"Do documento completo, extraia apenas informações sobre [tópico X]"
[Use apenas o extraído nas próximas etapas]
```

---

### Mantendo Contexto em Conversações

#### Referências Explícitas
```
"Com base na análise que você fez anteriormente..."
"Usando os dados da tabela acima..."
"Considerando os 3 pontos que identificamos..."
```

#### Recapitulação
```
"Até agora identificamos:
1. [Ponto A]
2. [Ponto B]

Agora, considerando esses pontos, [próxima instrução]"
```

---

### Otimização de Tokens

#### Seja Conciso
```
❌ "Eu gostaria que você, por favor, considerasse analisar..."
✅ "Analise..."
```

#### Evite Redundância
```
❌ "Resuma o documento, fazendo um resumo dos pontos principais..."
✅ "Resuma os pontos principais do documento"
```

#### Use Abreviações Claras
```
"Analise os KPIs (Key Performance Indicators) abaixo..."
[Depois pode usar apenas "KPIs"]
```

---

### Quando Contexto é Insuficiente

#### Sinais de Problema:
- Modelo "esquece" informações
- Respostas genéricas demais
- Inconsistências

#### Soluções:
1. **Reduza escopo** da tarefa
2. **Divida em subtarefas** menores
3. **Forneça resumo** em vez de texto completo
4. **Use modelo com janela maior**

---

### Contexto vs Conhecimento Geral

**Contexto** (fornecido no prompt):
- Dados específicos da sua situação
- Informações proprietárias
- Detalhes únicos

**Conhecimento Geral** (treinamento do modelo):
- Fatos públicos
- Conceitos estabelecidos
- Práticas comuns

```
✅ Forneça contexto para:
- Dados internos da empresa
- Situações específicas
- Informações pós data de treinamento

✅ Confie no conhecimento geral para:
- Conceitos estabelecidos
- Melhores práticas conhecidas
- Informações públicas
```

---

### Exercícios

1. Você tem um relatório de 50 páginas. Como processá-lo eficientemente?

2. Otimize este prompt para usar menos tokens:
```
"Eu gostaria muito que você pudesse, por gentileza, analisar
cuidadosamente todos os aspectos deste código e identificar
qualquer tipo de problema que você possa encontrar..."
```

---

### Principais Aprendizados

1. Contexto é limitado - use sabiamente
2. Priorize informações relevantes
3. Estruture para facilitar processamento
4. Para textos longos, use estratégias de chunking
5. Seja conciso sem perder clareza

---

[← Anterior](./06-iteracao-refinamento.md) | [Próximo: Módulo 3 →](../modulo-3-aplicacoes-praticas/01-escrita-conteudo.md)
