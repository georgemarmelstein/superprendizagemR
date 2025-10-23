# Melhores Práticas de Engenharia de Prompts

## Princípios Fundamentais

### 1. Clareza é Fundamental
- Seja específico e direto
- Evite ambiguidades
- Use linguagem simples quando possível
- Defina termos importantes

### 2. Estrutura Facilita Processamento
- Use numeração e bullet points
- Separe seções claramente
- Aplique hierarquia visual
- Mantenha formatação consistente

### 3. Contexto é Poder
- Forneça informações relevantes
- Estabeleça o cenário
- Defina o público-alvo
- Especifique objetivos

### 4. Exemplos Ensinam Melhor
- Mostre, não apenas diga
- Use exemplos diversos
- Cubra casos extremos
- Mantenha consistência

### 5. Especificidade Gera Qualidade
- Defina formato de output
- Estabeleça limites (tamanho, escopo)
- Especifique tom e estilo
- Liste o que evitar

---

## Do's and Don'ts

### ✅ DO (Faça)

**1. Seja Explícito**
```
✅ "Liste exatamente 5 benefícios, cada um com 2-3 frases de explicação"
❌ "Liste alguns benefícios"
```

**2. Forneça Contexto**
```
✅ "Como gerente de produto em startup B2B SaaS..."
❌ "Como gerente..."
```

**3. Especifique Formato**
```
✅ "Responda em formato JSON com campos: nome, descrição, prioridade"
❌ "Forneça as informações"
```

**4. Use Exemplos**
```
✅ Inclua 2-3 exemplos de input/output esperado
❌ Apenas descreva o que quer
```

**5. Divida Tarefas Complexas**
```
✅ Use prompt chaining para processos com múltiplas etapas
❌ Tente fazer tudo em um prompt gigante
```

**6. Itere e Refine**
```
✅ Teste, analise, ajuste, repita
❌ Espere perfeição no primeiro prompt
```

**7. Valide Resultados**
```
✅ Teste com múltiplos inputs
❌ Confie cegamente no primeiro resultado
```

### ❌ DON'T (Não Faça)

**1. Não Seja Vago**
```
❌ "Me ajude com isso"
❌ "Faça melhor"
❌ "Analise esses dados"
```

**2. Não Assuma Conhecimento Implícito**
```
❌ "Use aquele framework que mencionei"
❌ "Como sempre fazemos"
```

**3. Não Sobrecarregue com Informação Irrelevante**
```
❌ Incluir história completa não relacionada
❌ Contexto excessivo que não ajuda
```

**4. Não Use Linguagem Ambígua**
```
❌ "Alguns", "vários", "recentemente"
✅ "3-5", "5-7", "nos últimos 30 dias"
```

**5. Não Ignore Limitações**
```
❌ Pedir informações em tempo real
❌ Esperar cálculos complexos perfeitos
❌ Assumir memória entre sessões
```

**6. Não Misture Múltiplas Tarefas Não-Relacionadas**
```
❌ "Analise este código E crie um plano de marketing E resuma este artigo"
✅ Separe em prompts individuais ou chain bem estruturado
```

---

## Checklist de Qualidade

Antes de enviar um prompt, verifique:

### Clareza
- [ ] Instrução é inequívoca?
- [ ] Termos importantes estão definidos?
- [ ] Não há contradições?

### Contexto
- [ ] Informações relevantes fornecidas?
- [ ] Público-alvo especificado?
- [ ] Objetivo é claro?

### Especificidade
- [ ] Formato de output definido?
- [ ] Limites estabelecidos?
- [ ] Tom e estilo especificados?

### Estrutura
- [ ] Bem organizado visualmente?
- [ ] Fácil de seguir?
- [ ] Seções claras?

### Completude
- [ ] Todos detalhes necessários incluídos?
- [ ] Exemplos quando necessário?
- [ ] Restrições explícitas?

---

## Otimização de Performance

### Para Velocidade
1. Use prompts mais curtos quando possível
2. Minimize contexto desnecessário
3. Use zero-shot para tarefas simples

### Para Qualidade
1. Adicione exemplos (few-shot)
2. Use chain-of-thought para raciocínio
3. Especifique critérios de qualidade
4. Peça verificação/validação

### Para Consistência
1. Use templates padronizados
2. Forneça exemplos consistentes
3. Especifique formato rigorosamente
4. Teste com múltiplas variações

---

## Troubleshooting

### Problema: Resposta Muito Genérica

**Soluções:**
- Adicione mais contexto específico
- Forneça exemplos concretos
- Especifique público e caso de uso
- Use role prompting

### Problema: Resposta Muito Longa

**Soluções:**
- Defina limite explícito de palavras/caracteres
- Peça resumo executivo
- Use formato bullet points
- Especifique "apenas o essencial"

### Problema: Formato Incorreto

**Soluções:**
- Forneça exemplo exato do formato desejado
- Use few-shot com exemplos de formato
- Seja explícito sobre estrutura
- Valide e peça reformatação se necessário

### Problema: Informações Imprecisas

**Soluções:**
- Peça citações/fontes
- Instrua a admitir incertezas
- Use "verifique este fato"
- Valide informações críticas externamente

### Problema: Falta de Criatividade

**Soluções:**
- Aumente temperatura (se disponível)
- Peça múltiplas alternativas
- Use "pense fora da caixa"
- Evite exemplos muito restritivos

### Problema: Muito Criativo (Alucina)

**Soluções:**
- Reduza temperatura
- Seja mais específico e restritivo
- Peça para usar apenas informações fornecidas
- Adicione "não especule"

---

## Padrões de Sucesso

### Padrão 1: Especificidade Progressiva
```
Comece simples → Teste → Adicione especificidade → Teste → Refine
```

### Padrão 2: Template + Customização
```
Use template comprovado → Adapte para seu caso → Documente variações
```

### Padrão 3: Validação Multi-Input
```
Crie prompt → Teste com 5+ inputs diferentes → Ajuste para edge cases
```

### Padrão 4: Documentação de Aprendizados
```
Mantenha log: [Prompt → Resultado → Lição → Versão Melhorada]
```

---

## Segurança e Ética

### Considerações Importantes

1. **Privacidade**
   - Não inclua informações pessoais sensíveis
   - Anonimize dados quando possível
   - Respeite confidencialidade

2. **Viés**
   - Esteja ciente de possíveis vieses
   - Use linguagem inclusiva
   - Teste com perspectivas diversas

3. **Verificação**
   - Valide informações críticas
   - Não confie cegamente em outputs
   - Use IA como ferramenta, não autoridade final

4. **Transparência**
   - Seja claro quando conteúdo é gerado por IA
   - Revise e edite outputs
   - Assuma responsabilidade pelo uso

---

## Evolução Contínua

### Mantenha-se Atualizado

- Modelos evoluem constantemente
- Novas técnicas surgem regularmente
- Comunidade compartilha descobertas
- Práticas se refinam com tempo

### Aprenda com a Comunidade

- Participe de fóruns e discussões
- Compartilhe suas descobertas
- Teste técnicas compartilhadas por outros
- Contribua com feedback

### Experimente Constantemente

- Teste novas abordagens
- Compare técnicas diferentes
- Documente o que funciona
- Compartilhe aprendizados

---

## Resumo - Top 10 Melhores Práticas

1. **Seja específico e claro**
2. **Forneça contexto relevante**
3. **Especifique formato de output**
4. **Use exemplos quando apropriado**
5. **Divida tarefas complexas (chaining)**
6. **Itere e refine sistematicamente**
7. **Valide resultados criticamente**
8. **Documente o que funciona**
9. **Mantenha ética e responsabilidade**
10. **Continue aprendendo e experimentando**

---

*Práticas evoluem. Este documento é vivo e deve ser atualizado regularmente.*
