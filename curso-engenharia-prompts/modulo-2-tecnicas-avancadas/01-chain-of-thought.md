# Módulo 2: Técnicas Avançadas de Engenharia de Prompts

## 2.1 Chain-of-Thought (Cadeia de Pensamento)

### O que é Chain-of-Thought?

Chain-of-Thought (CoT) é uma técnica que instrui o modelo a "pensar em voz alta", mostrando seu raciocínio passo a passo antes de chegar à resposta final.

#### Por que funciona?
- Modelos de IA performam melhor quando decompõem problemas complexos em etapas menores
- Reduz erros de raciocínio
- Torna o processo transparente e auditável
- Permite identificar onde o raciocínio pode ter falhado

---

### Tipos de Chain-of-Thought

#### 1. CoT Explícito (Manual)

Você explicitamente solicita que o modelo mostre seu pensamento.

**Template Básico:**
```
"[Problema/Pergunta]

Antes de responder, pense passo a passo:
1. [Etapa 1]
2. [Etapa 2]
3. [Etapa 3]
...
Resposta final: [Sua conclusão]"
```

**Exemplo Prático:**
```
Pergunta: Uma loja tem 45 camisetas. Vende 18 pela manhã e recebe
uma entrega de 30 à tarde. Se vender mais 22 no final do dia,
quantas camisetas restam?

Resolva passo a passo:
1. Quantidade inicial
2. Após vendas da manhã
3. Após entrega da tarde
4. Após vendas do final do dia
5. Quantidade final

Resposta:
```

#### 2. CoT com Exemplos (Few-Shot CoT)

Fornece exemplos de raciocínio passo a passo para ensinar o padrão.

**Exemplo:**
```
Resolva estes problemas mostrando o raciocínio:

Problema 1:
Um táxi cobra R$ 5 de bandeirada + R$ 2,50 por km.
Quanto custa uma viagem de 12 km?

Raciocínio:
- Bandeirada: R$ 5,00
- Distância: 12 km
- Preço por km: R$ 2,50
- Custo da distância: 12 × R$ 2,50 = R$ 30,00
- Total: R$ 5,00 + R$ 30,00 = R$ 35,00

Resposta: R$ 35,00

Agora resolva:
Um restaurante cobra R$ 10 de taxa de entrega + R$ 45 pelo prato.
Se houver 10% de taxa de serviço sobre o total, quanto será o valor final?
```

#### 3. CoT Zero-Shot

Usando "frases mágicas" que ativam o pensamento passo a passo.

**Frases Gatilho:**
```
"Pense passo a passo"
"Vamos resolver isso etapa por etapa"
"Raciocine cuidadosamente"
"Analise sistematicamente"
"Decomponha o problema"
```

**Exemplo:**
```
Pergunta: Se todos os gatos são mamíferos, e alguns mamíferos vivem
na água, isso significa que alguns gatos vivem na água?

Vamos pensar nisso passo a passo.
```

---

### Aplicações de Chain-of-Thought

#### 1. Problemas Matemáticos e Lógicos

```
Problema: Ana tem o dobro da idade de Bruno. Bruno tem 5 anos a mais
que Carlos. Se Carlos tem 15 anos, qual a idade de Ana?

Resolva passo a passo:
Passo 1: Identifique a idade de Carlos
Passo 2: Calcule a idade de Bruno
Passo 3: Calcule a idade de Ana
Passo 4: Verifique a resposta
```

#### 2. Análise de Negócios

```
Cenário: Empresa com receita de R$ 500K/mês, custos de R$ 400K/mês.
Planeja investir R$ 100K em marketing esperando aumento de 30% nas vendas.
Vale a pena o investimento?

Analise passo a passo:
1. Calcule lucro atual
2. Projete nova receita com aumento de 30%
3. Calcule novos custos (incluindo investimento em marketing)
4. Compare lucro atual vs. projetado
5. Calcule ROI do investimento
6. Forneça recomendação com justificativa
```

#### 3. Debugging de Código

```
Este código deveria calcular a média de uma lista, mas está retornando
valores incorretos. Identifique e corrija o problema.

```python
def calcular_media(numeros):
    total = 0
    for num in numeros:
        total += num
    return total / len(numeros)

print(calcular_media([]))  # Erro!
```

Analise passo a passo:
1. O que o código faz?
2. Qual é o comportamento esperado?
3. Qual é o comportamento atual?
4. Onde está o problema?
5. Como corrigir?
6. Como prevenir erros similares?
```

#### 4. Tomada de Decisão

```
Decisão: Devo aceitar esta oferta de emprego?

Contexto:
- Oferta: R$ 12K/mês (atual: R$ 10K/mês)
- Empresa maior, mas menos flexibilidade
- Escritório a 45 min de casa (atual: remoto)
- Melhor plano de carreira

Analise usando este framework passo a passo:
1. Liste prós e contras
2. Atribua peso (1-5) para cada fator
3. Calcule score ponderado para cada opção
4. Considere fatores não-quantificáveis
5. Avalie alinhamento com objetivos de longo prazo
6. Forneça recomendação fundamentada
```

---

### Estruturas de Raciocínio

#### Framework: Problema → Análise → Solução

```
[PROBLEMA]
Defina claramente o problema

[ANÁLISE]
1. Identifique componentes-chave
2. Examine cada componente
3. Identifique relações e dependências
4. Reconheça restrições e limitações

[SOLUÇÃO]
1. Gere possíveis soluções
2. Avalie cada solução
3. Selecione a melhor opção
4. Justifique a escolha
```

#### Framework: 5 Porquês

```
Problema: Taxa de cancelamento de assinaturas aumentou

Aplique os "5 Porquês":
1. Por que aumentou? → [Resposta]
2. Por que [Resposta do 1]? → [Resposta]
3. Por que [Resposta do 2]? → [Resposta]
4. Por que [Resposta do 3]? → [Resposta]
5. Por que [Resposta do 4]? → [Causa Raiz]

Solução baseada na causa raiz: [Ação]
```

#### Framework: MECE (Mutually Exclusive, Collectively Exhaustive)

```
Problema: Como aumentar receita?

Decomponha de forma MECE:

1. Aumentar número de clientes
   a. Novos clientes
   b. Reativar clientes antigos

2. Aumentar valor por cliente
   a. Aumentar preços
   b. Upsell (produtos premium)
   c. Cross-sell (produtos complementares)

3. Aumentar frequência de compra
   a. Programas de fidelidade
   b. Campanhas de reengajamento

Analise cada opção considerando:
- Impacto potencial
- Esforço necessário
- Viabilidade
- Riscos
```

---

### Boas Práticas para CoT

#### 1. Seja Específico nos Passos

```
❌ Vago:
"Analise esta situação passo a passo"

✅ Específico:
"Analise esta situação seguindo estes passos:
1. Identifique os stakeholders envolvidos
2. Liste os interesses de cada stakeholder
3. Identifique conflitos de interesse
4. Proponha soluções que balancem os interesses
5. Recomende melhor curso de ação"
```

#### 2. Use Numeração e Estrutura Clara

```
✅ Bem estruturado:
"Resolva o problema:

Etapa 1: Compreensão
- O que está sendo perguntado?
- Quais informações temos?

Etapa 2: Planejamento
- Que estratégia usar?
- Quais cálculos são necessários?

Etapa 3: Execução
- Realize os cálculos
- Mostre cada operação

Etapa 4: Verificação
- A resposta faz sentido?
- Verificação alternativa"
```

#### 3. Peça Verificação

```
"Após chegar à conclusão, verifique seu raciocínio:
- Todos os dados foram considerados?
- A lógica está correta?
- Há suposições não declaradas?
- A resposta é razoável no contexto?"
```

#### 4. Combine com Exemplos

```
"Siga este padrão de raciocínio:

Exemplo:
Pergunta: 3 caixas, cada uma com 4 maçãs. Quantas maçãs no total?
Raciocínio:
- Número de caixas: 3
- Maçãs por caixa: 4
- Operação: multiplicação (grupos iguais)
- Cálculo: 3 × 4 = 12
- Resposta: 12 maçãs

Agora resolva usando o mesmo padrão:
Pergunta: [Sua pergunta]"
```

---

### CoT para Diferentes Domínios

#### Análise de Texto

```
"Analise o argumento do autor neste parágrafo:

[Texto]

Análise passo a passo:
1. Qual é a afirmação principal?
2. Quais evidências são apresentadas?
3. As evidências suportam a afirmação?
4. Há falácias lógicas?
5. Qual é a força do argumento?
6. Conclusão da análise"
```

#### Programação

```
"Projete uma solução para este problema:

Requisito: Sistema de login com autenticação

Pense passo a passo:
1. Requisitos funcionais
   - O que o sistema deve fazer?
2. Requisitos não-funcionais
   - Segurança, performance, etc.
3. Arquitetura
   - Componentes necessários
4. Fluxo de dados
   - Como as informações fluem?
5. Implementação
   - Tecnologias e abordagens
6. Testes
   - Como validar?
7. Deploy e manutenção"
```

#### Criatividade e Brainstorming

```
"Gere ideias para uma campanha de marketing.

Processo criativo passo a passo:
1. Objetivo da campanha
   - O que queremos alcançar?
2. Público-alvo
   - Quem estamos tentando atingir?
   - O que eles valorizam?
3. Mensagem central
   - Qual mensagem queremos passar?
4. Canais
   - Onde alcançar o público?
5. Geração de ideias
   - Brainstorm de conceitos (mínimo 10)
6. Filtragem
   - Quais ideias melhor atendem os critérios?
7. Refinamento
   - Desenvolva as top 3 ideias"
```

---

### Armadilhas Comuns e Como Evitar

#### Armadilha 1: Passos Muito Genéricos

```
❌ Problema:
"Pense passo a passo sobre este problema de negócio"
→ Passos podem ser vagos e inconsistentes

✅ Solução:
"Analise este problema usando:
Passo 1: Definição do problema (1 frase)
Passo 2: Dados relevantes (liste)
Passo 3: Análise de causa (por quê?)
Passo 4: Opções de solução (3-5)
Passo 5: Recomendação (escolha + justificativa)"
```

#### Armadilha 2: Ignorar a Verificação

```
✅ Sempre inclua:
"Após sua análise, faça uma verificação de sanidade:
- Os números fazem sentido?
- A lógica está correta?
- Há contradições?
- Abordagem alternativa levaria à mesma conclusão?"
```

#### Armadilha 3: Passos Muito Numerosos

```
❌ Problema:
15 passos detalhados para problema simples

✅ Solução:
Ajuste o nível de detalhe ao problema:
- Problema simples: 3-5 passos
- Problema médio: 5-8 passos
- Problema complexo: 8-12 passos
```

---

### Exercícios Práticos

#### Exercício 1: Problema Matemático
```
Use CoT para resolver:
Uma empresa tem 3 departamentos. Depto A tem 15 funcionários,
Depto B tem 20% mais que A, Depto C tem a soma de A e B menos 10.
Quantos funcionários no total?

Crie um prompt CoT eficaz para este problema.
```

#### Exercício 2: Análise de Decisão
```
Crie um prompt CoT para analisar:
"Devo mudar de carreira aos 35 anos com família e hipoteca?"

Inclua framework estruturado com passos claros.
```

#### Exercício 3: Debugging
```
Desenvolva um prompt CoT para identificar bugs em código.
Defina os passos sistemáticos de análise.
```

---

### Checklist para CoT Eficaz

- [ ] Os passos são claros e específicos?
- [ ] A ordem dos passos é lógica?
- [ ] Há verificação ao final?
- [ ] O número de passos é apropriado para a complexidade?
- [ ] Cada passo tem um propósito claro?
- [ ] Exemplos são fornecidos quando necessário?
- [ ] A estrutura facilita o raciocínio?

---

### Principais Aprendizados

1. CoT melhora dramaticamente o raciocínio em tarefas complexas
2. Especificidade nos passos leva a melhores resultados
3. Diferentes problemas requerem diferentes estruturas de CoT
4. Verificação é parte essencial do processo
5. Exemplos ajudam o modelo a entender o padrão desejado

---

### Próximos Passos

Agora que domina Chain-of-Thought, aprenda sobre Few-Shot Learning para maximizar a eficácia dos seus exemplos.

[← Anterior: Tipos de Prompts](../modulo-1-fundamentos/05-tipos-de-prompts.md) | [Próximo: Few-Shot Learning →](./02-few-shot-learning.md)
