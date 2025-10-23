# Módulo 2: Técnicas Avançadas de Engenharia de Prompts

## 2.4 Prompt Chaining (Encadeamento de Prompts)

### O que é Prompt Chaining?

Prompt Chaining é a técnica de dividir tarefas complexas em uma sequência de prompts simples, onde a saída de um prompt alimenta o próximo.

**Conceito-chave:** "Divida e conquiste - uma etapa de cada vez"

---

### Por que Usar Prompt Chaining?

#### Vantagens

**1. Reduz Complexidade**
- Tarefas grandes → múltiplas tarefas pequenas
- Cada prompt foca em uma coisa
- Mais fácil de debugar

**2. Melhora Qualidade**
- Resultados intermediários podem ser validados
- Cada etapa otimizada individualmente
- Menos erros compostos

**3. Aumenta Confiabilidade**
- Processo mais previsível
- Erros isolados em etapas específicas
- Facilita correção e refinamento

**4. Flexibilidade**
- Etapas podem ser adicionadas/removidas
- Ordem pode ser ajustada
- Reutilização de etapas em diferentes workflows

---

### Quando Usar Prompt Chaining

#### Use Prompt Chaining quando:
- A tarefa tem múltiplas etapas distintas
- Cada etapa requer raciocínio diferente
- Precisa validar resultados intermediários
- A tarefa é muito complexa para um único prompt
- Diferentes etapas têm diferentes requisitos de formato

#### Use Prompt Único quando:
- A tarefa é simples e direta
- As etapas estão fortemente acopladas
- Não há necessidade de validação intermediária
- Eficiência (tokens) é prioridade

---

### Estrutura Básica de Chaining

```
PROMPT 1: Preparação
Input: [Dados brutos]
Output: [Dados processados] →

PROMPT 2: Análise
Input: [Dados processados]
Output: [Insights] →

PROMPT 3: Recomendação
Input: [Insights]
Output: [Plano de ação]
```

---

### Exemplos Práticos

#### Exemplo 1: Análise de Feedback de Clientes

**Etapa 1: Extração**
```
Extraia todos os comentários de clientes deste relatório e liste-os
numerados.

Relatório:
[texto longo com feedback misturado]

Formato:
1. [Comentário 1]
2. [Comentário 2]
...
```

**Etapa 2: Classificação**
```
Classifique cada comentário abaixo por categoria:
PRODUTO, ATENDIMENTO, ENTREGA, PREÇO

Comentários:
[output da Etapa 1]

Formato:
Comentário X → Categoria Y
```

**Etapa 3: Análise de Sentimento**
```
Para cada comentário, determine o sentimento:
Positivo, Neutro, Negativo

[output da Etapa 2]

Formato tabular:
| # | Comentário | Categoria | Sentimento |
```

**Etapa 4: Síntese**
```
Com base nesta análise de feedback:

[output da Etapa 3]

Forneça:
1. 3 principais problemas identificados
2. 3 principais elogios
3. 2-3 recomendações prioritárias de ação

Formato de relatório executivo.
```

---

#### Exemplo 2: Criação de Conteúdo

**Etapa 1: Pesquisa de Tópicos**
```
Gere 10 ideias de tópicos para blog sobre "produtividade remota".

Cada tópico deve:
- Ser específico e acionável
- Ter apelo para trabalhadores remotos
- Ser evergreen (atemporal)

Formato: lista numerada
```

**Etapa 2: Seleção e Expansão**
```
Dos tópicos abaixo, escolha os 3 mais promissores e, para cada um, crie:
- Título chamativo (max 60 caracteres)
- Subtítulo descritivo
- 5 pontos principais a cobrir

Tópicos:
[output da Etapa 1]
```

**Etapa 3: Outline Detalhado**
```
Para o tópico selecionado abaixo, crie um outline detalhado:

[um tópico do output da Etapa 2]

Estrutura:
I. Introdução (gancho + problema + promessa)
II. Corpo (3-5 seções principais com sub-pontos)
III. Conclusão (resumo + call-to-action)

Inclua notas sobre exemplos e dados a usar.
```

**Etapa 4: Redação**
```
Escreva o artigo completo seguindo este outline:

[output da Etapa 3]

Requisitos:
- 800-1000 palavras
- Tom: profissional mas conversacional
- Inclua exemplos práticos
- CTA no final
```

**Etapa 5: Otimização SEO**
```
Otimize este artigo para SEO:

[output da Etapa 4]

Tarefas:
1. Sugira palavras-chave secundárias (5-7)
2. Crie meta description (150-155 chars)
3. Sugira 3 alt texts para imagens
4. Identifique oportunidades de internal linking
```

---

#### Exemplo 3: Análise e Decisão de Negócio

**Etapa 1: Estruturação de Dados**
```
Extraia e estruture as informações financeiras do texto abaixo:

[Texto com dados financeiros misturados]

Formato JSON:
{
  "receitas": {"q1": X, "q2": Y, ...},
  "despesas": {"q1": X, "q2": Y, ...},
  "lucro": {"q1": X, "q2": Y, ...}
}
```

**Etapa 2: Cálculo de Métricas**
```
Com base nestes dados financeiros:

[output da Etapa 1]

Calcule:
- Margem de lucro por trimestre
- Crescimento YoY por trimestre
- Média de receita mensal
- Taxa de crescimento (MoM)

Apresente em tabela.
```

**Etapa 3: Análise de Tendências**
```
Analisando estas métricas:

[output da Etapa 2]

Identifique:
1. Tendências principais (crescimento/declínio)
2. Padrões sazonais
3. Anomalias ou outliers
4. Pontos de inflexão

Para cada ponto, forneça evidência dos dados.
```

**Etapa 4: Projeção**
```
Com base nas tendências identificadas:

[output da Etapa 3]

Projete os próximos 2 trimestres:
- Receita esperada (cenário conservador, realista, otimista)
- Suposições para cada cenário
- Fatores de risco
```

**Etapa 5: Recomendações**
```
Sintetizando toda a análise:

Dados: [Etapa 1]
Métricas: [Etapa 2]
Tendências: [Etapa 3]
Projeções: [Etapa 4]

Forneça:
1. Avaliação geral da saúde financeira
2. 3-5 recomendações estratégicas prioritárias
3. Ações táticas para próximos 30/60/90 dias
4. KPIs para monitorar

Formato: relatório executivo (max 500 palavras)
```

---

### Padrões Comuns de Chaining

#### Padrão 1: Expansão Progressiva
```
Input Simples → Brainstorm → Seleção → Detalhamento → Refinamento
```

**Uso:** Geração criativa, planejamento

#### Padrão 2: Redução Progressiva
```
Input Extenso → Extração → Filtragem → Categorização → Resumo
```

**Uso:** Análise de dados, síntese de informação

#### Padrão 3: Transformação em Etapas
```
Formato A → Normalização → Transformação → Validação → Formato B
```

**Uso:** Processamento de dados, conversão de formatos

#### Padrão 4: Análise Multi-Perspectiva
```
Input → Análise Técnica → Análise de Negócio → Análise de Usuário → Síntese
```

**Uso:** Decisões complexas, avaliações abrangentes

#### Padrão 5: Iteração Refinada
```
Draft Inicial → Crítica → Revisão → Crítica → Versão Final
```

**Uso:** Escrita, design, refinamento de soluções

---

### Técnicas Avançadas

#### 1. Branching (Ramificação)

Criar caminhos alternativos baseados em resultados intermediários:

```
PROMPT 1: Classificação
Input: [Texto]
Output: Categoria X, Y ou Z

IF Categoria X:
  → PROMPT 2A: [Processamento específico para X]
IF Categoria Y:
  → PROMPT 2B: [Processamento específico para Y]
IF Categoria Z:
  → PROMPT 2C: [Processamento específico para Z]

Todas convergem para:
PROMPT 3: Síntese final
```

#### 2. Validação Intermediária

Adicionar checkpoints de qualidade:

```
PROMPT 1: Geração
[Gera conteúdo]

PROMPT 2: Validação
"Avalie o output acima quanto a:
- Completude (todas informações presentes?)
- Correção (informações estão corretas?)
- Clareza (é fácil entender?)
Score: X/10. Se < 7, identifique problemas."

IF score ≥ 7:
  → Continue para PROMPT 3
IF score < 7:
  → Volta ao PROMPT 1 com feedback do PROMPT 2
```

#### 3. Agregação Paralela

Processar múltiplas perspectivas em paralelo:

```
PROMPT 1: Input comum
[Dados para análise]

↓ (divide em 3 análises paralelas)

PROMPT 2A: Análise Financeira
PROMPT 2B: Análise de Mercado
PROMPT 2C: Análise Operacional

↓ (agrega resultados)

PROMPT 3: Síntese
"Combine os 3 relatórios acima em recomendação unificada"
```

#### 4. Refinamento Iterativo

Loop de melhoria contínua:

```
PROMPT 1: Versão Inicial
[Cria primeira versão]

Loop (até satisfatório):
  PROMPT 2: Crítica
  "Identifique 3 áreas de melhoria"

  PROMPT 3: Refinamento
  "Melhore baseado na crítica"

  PROMPT 4: Avaliação
  "Score 1-10. Continuar refinando?"

Output: Versão Final
```

---

### Implementando Prompt Chains

#### Manualmente (Conversação)

```
Você: [PROMPT 1]
IA: [RESPOSTA 1]

Você: [PROMPT 2 usando RESPOSTA 1]
IA: [RESPOSTA 2]

Você: [PROMPT 3 usando RESPOSTA 2]
IA: [RESPOSTA 3]
...
```

#### Semi-Automatizado (Template)

```
"Vamos fazer um análise em 3 etapas:

ETAPA 1: Primeiro, extraia as informações-chave deste texto:
[texto]

ETAPA 2: Após extrair, classifique cada informação por importância:
Alta, Média, Baixa

ETAPA 3: Finalmente, com base na classificação, crie um resumo
executivo destacando apenas os pontos de Alta importância.

Execute cada etapa sequencialmente, mostrando o resultado de cada uma."
```

#### Automatizado (Programático)

```python
# Pseudocódigo
def prompt_chain(input_data):
    # Etapa 1
    result_1 = call_ai(prompt_1, input_data)

    # Etapa 2
    result_2 = call_ai(prompt_2, result_1)

    # Etapa 3
    result_3 = call_ai(prompt_3, result_2)

    return result_3
```

---

### Otimização de Chains

#### 1. Minimize Etapas Desnecessárias

```
❌ Ineficiente:
Etapa 1: Extraia nomes
Etapa 2: Extraia emails
Etapa 3: Combine nomes e emails

✅ Eficiente:
Etapa 1: Extraia nomes E emails em formato estruturado
```

#### 2. Formate Outputs para Próxima Etapa

```
Etapa 1:
"Extraia produtos e preços.
IMPORTANTE: Formate como JSON pois será processado automaticamente."

Output:
{
  "produtos": [
    {"nome": "X", "preco": 100},
    ...
  ]
}
```

#### 3. Use Referências Explícitas

```
Etapa 2:
"Com base nos dados JSON acima (resultado da extração), calcule..."

[Isso deixa claro que está usando output anterior]
```

#### 4. Adicione Validação de Transição

```
Após cada etapa:
"Antes de continuar, confirme:
- Output está no formato esperado?
- Todas informações foram preservadas?
- Não há erros óbvios?"
```

---

### Armadilhas Comuns

#### 1. Chain Muito Longo

**Problema:** Muitas etapas = perda de contexto, acúmulo de erros

**Solução:**
- Mantenha chains com 3-7 etapas idealmente
- Se precisar de mais, considere sub-chains

#### 2. Perda de Informação entre Etapas

**Problema:** Informação importante perdida na transição

**Solução:**
```
"Ao processar, preserve TODAS as informações do input anterior,
adicionando sua análise, não substituindo."
```

#### 3. Formato Inconsistente

**Problema:** Output de uma etapa não é compatível com input da próxima

**Solução:**
- Especifique formato de output em cada etapa
- Valide formatos entre etapas

#### 4. Falta de Flexibilidade

**Problema:** Chain rígida que não se adapta a casos especiais

**Solução:**
- Adicione branching para casos diferentes
- Inclua etapas de decisão

---

### Exemplos de Chains Reutilizáveis

#### Chain: Pesquisa e Síntese
```
1. Identificar subtópicos principais
2. Para cada subtópico, coletar informações-chave
3. Organizar informações por tema
4. Sintetizar em narrativa coerente
5. Adicionar conclusões e insights
```

#### Chain: Análise de Problema
```
1. Definir problema claramente
2. Identificar causas raízes (5 Porquês)
3. Mapear impactos
4. Gerar opções de solução
5. Avaliar opções (custo/benefício)
6. Recomendar solução e plano de ação
```

#### Chain: Criação de Documento
```
1. Definir objetivos e audiência
2. Criar outline estruturado
3. Desenvolver cada seção
4. Revisar para consistência e fluxo
5. Polir linguagem e formatação
6. Gerar versão final
```

---

### Exercícios Práticos

#### Exercício 1: Desenhe uma Chain
```
Tarefa: Análise competitiva de 3 produtos similares

Desenhe uma chain com 4-6 etapas incluindo:
- Extração de dados
- Análise comparativa
- Síntese de insights
- Recomendação
```

#### Exercício 2: Otimize uma Chain
```
Chain atual (5 etapas):
1. Ler documento
2. Listar pontos principais
3. Categorizar pontos
4. Priorizar categorias
5. Criar sumário

Como poderia ser otimizada para 3 etapas?
```

#### Exercício 3: Implemente Branching
```
Crie uma chain com branching para processar diferentes
tipos de feedback: Bug, Feature Request, Dúvida
```

---

### Checklist de Prompt Chain

- [ ] Cada etapa tem objetivo claro e único?
- [ ] Número de etapas é mínimo necessário?
- [ ] Formato de output de cada etapa é especificado?
- [ ] Transições entre etapas são claras?
- [ ] Há validação de resultados intermediários?
- [ ] Chain é resiliente a variações no input?
- [ ] Há tratamento para casos extremos?

---

### Principais Aprendizados

1. Chaining quebra tarefas complexas em etapas simples
2. Cada etapa deve ter um propósito claro
3. Validação intermediária aumenta qualidade final
4. Formate outputs pensando na próxima etapa
5. Equilíbrio entre completude e simplicidade

---

### Próximos Passos

Explore Role Prompting para dar personalidade e expertise específicas ao modelo.

[← Anterior: Zero-Shot Learning](./03-zero-shot-learning.md) | [Próximo: Role Prompting →](./05-role-prompting.md)
