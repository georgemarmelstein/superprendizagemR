# Módulo 2: Técnicas Avançadas de Engenharia de Prompts

## 2.3 Zero-Shot Learning

### O que é Zero-Shot Learning?

Zero-Shot Learning é a capacidade de instruir o modelo a realizar tarefas sem fornecer exemplos, apenas com descrições claras e instruções diretas.

**Conceito-chave:** "Diga claramente o que quer, sem mostrar exemplos"

---

### Por que Zero-Shot Funciona?

#### Conhecimento Pré-Treinado
- Modelos foram expostos a bilhões de exemplos durante o treinamento
- Já "viram" padrões similares antes
- Podem generalizar conhecimento para novas tarefas

#### Vantagens
- **Eficiência:** Economiza tokens (sem exemplos longos)
- **Flexibilidade:** Adapta-se rapidamente a novas tarefas
- **Simplicidade:** Prompts mais curtos e diretos
- **Velocidade:** Menos contexto para processar

---

### Quando Usar Zero-Shot vs Few-Shot

#### Use Zero-Shot quando:
- A tarefa é comum e bem definida
- As instruções podem ser claras sem exemplos
- Você quer economizar tokens
- A tarefa é simples e direta

#### Use Few-Shot quando:
- A tarefa tem padrão específico/único
- Formato de output é customizado
- Há nuances difíceis de descrever
- Consistência extrema é necessária

---

### Anatomia de Zero-Shot Prompts

```
[Contexto opcional]
[Instrução clara e específica]
[Especificação de formato]
[Sua entrada/dados]
```

**Exemplo básico:**
```
Traduza o seguinte texto para inglês:

"Bom dia! Como posso ajudá-lo hoje?"
```

**Exemplo avançado:**
```
Você é um analista de dados especializado em relatórios executivos.

Analise os dados abaixo e forneça:
1. Três insights principais
2. Uma recomendação estratégica
3. Métricas de suporte

Dados:
[seus dados]

Formate como relatório executivo profissional.
```

---

### Técnicas de Zero-Shot Eficaz

#### 1. Instruções Ultra-Claras

**❌ Vago:**
```
"Analise isso"
```

**✅ Claro:**
```
"Analise este texto e identifique:
- Tom (formal/informal/neutro)
- Público-alvo provável
- Objetivo principal do autor
- 3 pontos-chave da mensagem"
```

#### 2. Especificação de Formato

**Sem formato definido:**
```
"Me fale sobre os benefícios da meditação"
→ Resposta pode vir em qualquer formato
```

**Com formato definido:**
```
"Liste 5 benefícios da meditação no formato:
- Benefício: [Nome]
  Descrição: [2-3 frases]
  Evidência: [Base científica]"
```

#### 3. Uso de Verbos de Ação Específicos

**Verbos genéricos:**
```
"Faça algo com estes dados"
"Melhore este texto"
```

**Verbos específicos:**
```
"Resuma estes dados em 3 pontos principais"
"Reescreva este texto em tom profissional mantendo as informações-chave"
```

---

### Aplicações Práticas de Zero-Shot

#### 1. Análise de Texto

```
Analise o sentimento deste comentário de cliente em uma escala de 1-5:
1 = Muito Negativo
2 = Negativo
3 = Neutro
4 = Positivo
5 = Muito Positivo

Comentário: "O produto é ok, mas a entrega demorou demais"

Forneça:
- Nota de sentimento (1-5)
- Justificativa (1 frase)
```

#### 2. Geração de Conteúdo

```
Escreva um email profissional para um cliente informando sobre um atraso
na entrega devido a problemas logísticos.

Requisitos:
- Tom: profissional mas empático
- Inclua: desculpas, explicação breve, nova data prevista, compensação
- Tamanho: máximo 150 palavras

Dados:
- Pedido: #12345
- Nova data: 15/03/2024
- Compensação: 10% de desconto
```

#### 3. Classificação

```
Classifique este ticket de suporte em UMA das categorias abaixo:
- TÉCNICO: problemas com sistema, bugs, erros
- FINANCEIRO: pagamentos, faturas, cobranças
- COMERCIAL: vendas, upgrade, novos serviços
- GERAL: dúvidas gerais, informações

Ticket: "Gostaria de saber como faço upgrade para o plano premium"

Responda apenas com a categoria.
```

#### 4. Transformação de Dados

```
Converta a seguinte descrição em formato JSON estruturado:

Descrição: "João Silva, 32 anos, engenheiro de software na TechCorp,
salário R$ 12.000, trabalha remotamente"

Esquema JSON desejado:
{
  "nome": "",
  "idade": 0,
  "cargo": "",
  "empresa": "",
  "salario": 0,
  "modalidade": ""
}
```

#### 5. Extração de Informações

```
Extraia todas as datas, nomes de pessoas e organizações do texto abaixo.

Formato de resposta:
Datas: [lista]
Pessoas: [lista]
Organizações: [lista]

Texto:
"Em 15 de janeiro de 2024, Maria Silva, CEO da TechStart, anunciou
parceria com a Google. A implementação começará em março."
```

---

### Zero-Shot para Tarefas Complexas

#### Decomposição de Tarefas

Quando a tarefa é complexa, divida em etapas claras:

```
Analise este código Python e forneça um relatório completo.

Seu relatório deve incluir:

1. RESUMO (2-3 frases)
   - O que o código faz
   - Complexidade geral

2. ANÁLISE DE QUALIDADE
   - Legibilidade (1-5)
   - Eficiência (1-5)
   - Manutenibilidade (1-5)

3. PROBLEMAS IDENTIFICADOS
   - Liste bugs ou possíveis erros
   - Identifique code smells
   - Aponte violações de boas práticas

4. RECOMENDAÇÕES
   - 3-5 melhorias prioritárias
   - Para cada: descrição + impacto esperado

Código:
```python
[seu código]
```
```

#### Chain-of-Thought Zero-Shot

Use "frases mágicas" para ativar raciocínio sem exemplos:

```
Problema: Uma loja vende camisetas por R$ 50 cada. Na compra de 3 ou
mais, há 20% de desconto. João comprou 4 camisetas. Quanto pagou?

Pense passo a passo e mostre seu raciocínio antes de dar a resposta final.
```

**Frases gatilho eficazes:**
- "Pense passo a passo"
- "Vamos resolver isso metodicamente"
- "Raciocine cuidadosamente"
- "Antes de responder, analise:"
- "Decomponha o problema"

---

### Estratégias Avançadas de Zero-Shot

#### 1. Role Prompting (Definição de Papel)

```
Você é um especialista em segurança da informação com 15 anos de experiência.

Avalie a política de senhas abaixo quanto à segurança:

Política:
- Mínimo 6 caracteres
- Não expira
- Sem requisitos de complexidade

Forneça:
- Avaliação de risco (Baixo/Médio/Alto/Crítico)
- Vulnerabilidades específicas
- Recomendações de melhoria
```

#### 2. Restrições e Guardrails

```
Resuma este artigo científico.

RESTRIÇÕES:
- Máximo 200 palavras
- Use linguagem acessível (evite jargão técnico)
- Mantenha precisão científica
- Não especule ou adicione informações não presentes no artigo
- Se algo não estiver claro no artigo, diga "informação não disponível"

Artigo:
[texto]
```

#### 3. Prompt Negativo (O que NÃO fazer)

```
Escreva uma descrição de produto para um smartwatch.

FAÇA:
- Destaque benefícios práticos
- Use linguagem persuasiva mas honesta
- Inclua 3-5 recursos principais

NÃO FAÇA:
- Fazer afirmações exageradas ou inverificáveis
- Comparar diretamente com concorrentes
- Usar superlativos extremos ("melhor do mundo")
- Mencionar preço
```

#### 4. Template Forcing (Forçar Formato)

```
Crie um plano de ação para lançamento de produto.

Use EXATAMENTE este formato:

## Objetivo
[1 frase]

## Público-Alvo
[descrição em 2-3 frases]

## Estratégias (3)
1. [Nome da Estratégia]
   - Ação: [descrição]
   - Prazo: [tempo]
   - Responsável: [área]
   - KPI: [métrica]

2. [...]

3. [...]

## Orçamento Estimado
[valor e breakdown]

## Riscos (3)
- [Risco 1 + mitigação]
- [...]
```

---

### Otimização de Zero-Shot Prompts

#### Princípio da Especificidade Progressiva

Comece simples e adicione especificidade conforme necessário:

**Versão 1 (Básica):**
```
"Resuma este artigo"
```

**Versão 2 (Melhorada):**
```
"Resuma este artigo em 5 frases destacando os pontos principais"
```

**Versão 3 (Otimizada):**
```
"Resuma este artigo em exatamente 5 frases.
Foco: metodologia e conclusões principais.
Público: profissionais não-técnicos.
Tom: objetivo e informativo."
```

---

### Comparação Prática

#### Mesma Tarefa: Zero-Shot vs Few-Shot

**Tarefa:** Extrair informações de produtos

**Zero-Shot Approach:**
```
Extraia: nome do produto, preço, cor, e tamanho.
Formato: JSON

Texto: "Camiseta polo azul tamanho M por apenas R$ 89,90"
```

**Few-Shot Approach:**
```
Extraia informações de produtos.

Exemplo 1:
Texto: "Calça jeans preta tam 42 - R$ 149"
JSON: {"produto": "Calça jeans", "cor": "preta", "tamanho": "42", "preco": 149.00}

Exemplo 2:
Texto: "Tênis branco num 40, promoção R$ 199,90"
JSON: {"produto": "Tênis", "cor": "branco", "tamanho": "40", "preco": 199.90}

Agora:
Texto: "Camiseta polo azul tamanho M por apenas R$ 89,90"
```

**Quando cada abordagem é melhor:**
- Zero-shot: Tarefa é padrão, quer economizar tokens
- Few-shot: Formato JSON tem estrutura específica que você quer garantir

---

### Armadilhas Comuns e Soluções

#### Armadilha 1: Instruções Ambíguas

**❌ Problema:**
```
"Melhore este texto"
```
→ Pode melhorar gramática, estilo, tom, clareza... qual?

**✅ Solução:**
```
"Reescreva este texto melhorando a clareza e removendo redundâncias,
mantendo o tom profissional e todas as informações essenciais."
```

#### Armadilha 2: Falta de Formato

**❌ Problema:**
```
"Me fale sobre inteligência artificial"
```
→ Pode ser uma frase, um ensaio, uma lista...

**✅ Solução:**
```
"Explique inteligência artificial em 3 parágrafos:
1. Definição simples (2-3 frases)
2. Aplicações práticas (3 exemplos)
3. Impacto futuro (perspectiva de 5 anos)"
```

#### Armadilha 3: Suposições Implícitas

**❌ Problema:**
```
"Analise a performance"
```
→ Performance de quê? Usando quais critérios?

**✅ Solução:**
```
"Analise a performance de vendas do Q1 considerando:
- Comparação com Q1 do ano anterior
- Metas estabelecidas
- Performance por região
Formato: tabela + insights principais"
```

---

### Templates Zero-Shot Reutilizáveis

#### Template 1: Análise

```
Analise [objeto] considerando:
- [Critério 1]
- [Critério 2]
- [Critério 3]

Forneça:
1. Avaliação geral
2. Pontos fortes (2-3)
3. Pontos fracos (2-3)
4. Recomendação

[Seu conteúdo]
```

#### Template 2: Comparação

```
Compare [A] vs [B] nos seguintes aspectos:
- [Aspecto 1]
- [Aspecto 2]
- [Aspecto 3]

Formato: tabela comparativa + conclusão

[Detalhes de A]
[Detalhes de B]
```

#### Template 3: Transformação

```
Transforme o [formato origem] em [formato destino].

Requisitos:
- [Requisito 1]
- [Requisito 2]
- [Requisito 3]

[Conteúdo original]
```

---

### Exercícios Práticos

#### Exercício 1: Refine um Prompt Vago
```
Prompt vago: "Me ajude com marketing"

Tarefa: Reescreva como prompt zero-shot eficaz incluindo:
- Contexto claro
- Instrução específica
- Formato de resposta
- Restrições relevantes
```

#### Exercício 2: Zero-Shot para Classificação
```
Crie um prompt zero-shot para classificar emails em:
Urgente, Normal, Baixa Prioridade

Não use exemplos, apenas instruções claras.
```

#### Exercício 3: Compare Abordagens
```
Para a tarefa "extrair dados de currículos", quando você usaria:
a) Zero-shot
b) Few-shot

Justifique e escreva um prompt para cada abordagem.
```

---

### Checklist Zero-Shot Eficaz

- [ ] Instrução é clara e inequívoca?
- [ ] Formato de saída está especificado?
- [ ] Contexto relevante foi fornecido?
- [ ] Restrições estão explícitas?
- [ ] Evitou ambiguidades?
- [ ] Verbos de ação são específicos?
- [ ] A tarefa é adequada para zero-shot?

---

### Principais Aprendizados

1. Zero-shot é eficiente para tarefas claras e comuns
2. Especificidade compensa a falta de exemplos
3. Formato deve sempre ser definido explicitamente
4. Role prompting aumenta a qualidade em zero-shot
5. Combine com CoT para tarefas complexas

---

### Próximos Passos

Aprenda sobre Prompt Chaining para combinar múltiplos prompts em workflows complexos.

[← Anterior: Few-Shot Learning](./02-few-shot-learning.md) | [Próximo: Prompt Chaining →](./04-prompt-chaining.md)
