# Módulo 2: Técnicas Avançadas de Engenharia de Prompts

## 2.2 Few-Shot Learning

### O que é Few-Shot Learning?

Few-Shot Learning é a técnica de ensinar o modelo através de exemplos práticos, demonstrando o padrão desejado de input e output.

**Conceito-chave:** "Mostre, não apenas diga"

---

### Por que Few-Shot Learning Funciona?

#### Modelos Aprendem por Padrões
- Treinados em bilhões de exemplos de texto
- Excelentes em reconhecer e reproduzir padrões
- Exemplos concretos são mais claros que descrições abstratas

#### Vantagens
- **Precisão:** Define exatamente o formato desejado
- **Consistência:** Resultados mais previsíveis
- **Reduz ambiguidade:** Menos espaço para interpretação
- **Funciona para tarefas customizadas:** Ensina padrões específicos do seu domínio

---

### Anatomia de Few-Shot Prompts

```
[Instrução ou descrição da tarefa]

[Exemplo 1]
Input: [X₁]
Output: [Y₁]

[Exemplo 2]
Input: [X₂]
Output: [Y₂]

[Exemplo 3]
Input: [X₃]
Output: [Y₃]

[Sua tarefa real]
Input: [X]
Output:
```

---

### Quantos Exemplos Usar?

#### Zero-Shot (0 exemplos)
**Quando usar:** Tarefas simples e universais
```
"Traduza para inglês: Olá, como vai?"
```

#### One-Shot (1 exemplo)
**Quando usar:** Demonstrar formato específico
```
"Extraia informações de produtos.

Exemplo:
Texto: 'iPhone 14 Pro, 256GB, cor preta, R$ 7.999'
JSON: {"produto": "iPhone 14 Pro", "capacidade": "256GB", "cor": "preta", "preco": 7999}

Agora extraia:
Texto: 'MacBook Air M2, 16GB RAM, tela 13 pol, R$ 9.499'"
```

#### Few-Shot (2-5 exemplos)
**Quando usar:** Tarefas com nuances, múltiplas categorias
```
Classifique o sentimento: Positivo, Negativo, Neutro

Exemplos:

"Adorei! Melhor compra do ano" → Positivo
"Produto ok, nada de especial" → Neutro
"Péssimo, quebrou no primeiro dia" → Negativo

Classifique: "Bom custo-benefício, mas poderia melhorar"
```

#### Many-Shot (5+ exemplos)
**Quando usar:** Padrões complexos, muitas variações
```
[Quando há 10+ categorias diferentes ou padrões muito específicos]
```

---

### Estruturas de Few-Shot

#### Formato Básico

```
Tarefa: [Descrição]

Exemplo 1:
[Input] → [Output]

Exemplo 2:
[Input] → [Output]

Agora você:
[Input] →
```

#### Formato com Explicação

```
Tarefa: [Descrição]

Exemplo 1:
Input: [X]
Output: [Y]
Razão: [Por que Y é correto]

Exemplo 2:
Input: [X]
Output: [Y]
Razão: [Por que Y é correto]

Agora:
Input: [X]
Output:
```

#### Formato de Diálogo

```
Q: [Pergunta 1]
A: [Resposta 1]

Q: [Pergunta 2]
A: [Resposta 2]

Q: [Sua pergunta]
A:
```

---

### Aplicações Práticas

#### 1. Classificação de Texto

**Exemplo: Triagem de Tickets de Suporte**

```
Classifique tickets em: Técnico, Financeiro, Geral

Exemplos:

Ticket: "Não consigo fazer login no sistema"
Categoria: Técnico

Ticket: "Quando vence minha fatura?"
Categoria: Financeiro

Ticket: "Gostaria de informações sobre novos planos"
Categoria: Geral

Ticket: "O sistema está apresentando erro 500"
Categoria: Técnico

Classifique:
Ticket: "Como atualizo meu cartão de crédito?"
Categoria:
```

#### 2. Extração de Informações

**Exemplo: Parsing de Endereços**

```
Extraia componentes de endereços brasileiros.

Exemplo 1:
Endereço: "Av. Paulista, 1578, Bela Vista, São Paulo - SP, 01310-200"
Resultado:
{
  "logradouro": "Av. Paulista",
  "numero": "1578",
  "bairro": "Bela Vista",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01310-200"
}

Exemplo 2:
Endereço: "Rua das Flores, 123, apto 45, Centro, Rio de Janeiro - RJ"
Resultado:
{
  "logradouro": "Rua das Flores",
  "numero": "123",
  "complemento": "apto 45",
  "bairro": "Centro",
  "cidade": "Rio de Janeiro",
  "estado": "RJ"
}

Agora extraia:
Endereço: "Praça da Sé, s/n, Sé, São Paulo - SP, 01001-000"
```

#### 3. Transformação de Formato

**Exemplo: Conversão de Dados**

```
Converta descrições narrativas em formato estruturado.

Exemplo 1:
Narrativa: "João Silva, 28 anos, trabalha como engenheiro na XYZ Corp,
ganha R$ 8.500 mensais"
Estruturado:
| Nome | Idade | Profissão | Empresa | Salário |
|------|-------|-----------|---------|---------|
| João Silva | 28 | Engenheiro | XYZ Corp | R$ 8.500 |

Exemplo 2:
Narrativa: "Maria Santos, 35 anos, atua como designer freelancer,
renda variável aproximadamente R$ 6.000"
Estruturado:
| Nome | Idade | Profissão | Empresa | Salário |
|------|-------|-----------|---------|---------|
| Maria Santos | 35 | Designer | Freelancer | ~R$ 6.000 |

Agora converta:
Narrativa: "Pedro Oliveira, 42 anos, gerente de vendas na ABC Ltda,
salário de R$ 12.000"
```

#### 4. Geração de Conteúdo Específico

**Exemplo: Criação de Meta Descriptions SEO**

```
Crie meta descriptions otimizadas para SEO (máx. 155 caracteres).

Exemplo 1:
Título: "Guia Completo de Python para Iniciantes"
Meta: "Aprenda Python do zero com nosso guia completo. Tutoriais práticos,
exercícios e projetos reais. Comece sua jornada em programação hoje!"
[152 caracteres]

Exemplo 2:
Título: "Melhores Receitas de Bolo de Chocolate"
Meta: "Descubra 10 receitas incríveis de bolo de chocolate. Fáceis, rápidas
e deliciosas. De simples a gourmet. Confira agora!"
[129 caracteres]

Agora crie:
Título: "Como Investir em Ações para Iniciantes"
Meta:
```

#### 5. Análise e Avaliação

**Exemplo: Avaliação de Qualidade de Código**

```
Avalie código Python de 1-5 considerando: legibilidade, eficiência,
boas práticas.

Exemplo 1:
```python
def soma(a, b):
    return a + b
```
Avaliação: 5/5
- Código claro e direto
- Nomes descritivos
- Eficiente
- Segue PEP 8

Exemplo 2:
```python
def f(x,y):
  z=0
  for i in range(len(x)):
    z+=x[i]
  return z/len(x)
```
Avaliação: 2/5
- Nomes de variáveis ruins (f, x, y, z)
- Não segue PEP 8 (espaçamento)
- Lógica pode ser simplificada
- Não trata lista vazia

Agora avalie:
```python
def calcular_media(numeros):
    if not numeros:
        return 0
    return sum(numeros) / len(numeros)
```
Avaliação:
```

---

### Estratégias para Exemplos Eficazes

#### 1. Escolha Exemplos Representativos

**❌ Exemplos muito similares:**
```
Exemplo 1: "Adorei este produto!" → Positivo
Exemplo 2: "Amei esta compra!" → Positivo
Exemplo 3: "Excelente produto!" → Positivo
```

**✅ Exemplos diversos:**
```
Exemplo 1: "Adorei este produto!" → Positivo
Exemplo 2: "Produto ok, nada excepcional" → Neutro
Exemplo 3: "Péssima qualidade" → Negativo
Exemplo 4: "Bom custo-benefício" → Positivo
```

#### 2. Cubra Casos Extremos

Inclua exemplos de casos especiais ou ambíguos:

```
Classificação de Urgência:

Exemplo 1:
"Sistema completamente fora do ar" → Urgente

Exemplo 2:
"Como funciona o recurso X?" → Não Urgente

Exemplo 3:
"Erro intermitente afetando alguns usuários" → Média Urgência

Exemplo 4:
"Sugestão de melhoria para o futuro" → Baixa Urgência

[Exemplo 3 captura caso ambíguo]
```

#### 3. Mantenha Formato Consistente

**❌ Inconsistente:**
```
Exemplo 1:
Input: "texto"
Output: resultado

Exemplo 2:
"outro texto" => outro resultado
```

**✅ Consistente:**
```
Exemplo 1:
Input: "texto"
Output: resultado

Exemplo 2:
Input: "outro texto"
Output: outro resultado
```

#### 4. Ordenação Intencional

**Considere a ordem dos exemplos:**

```
Estratégia 1: Simples → Complexo
- Começa com casos óbvios
- Progride para nuances

Estratégia 2: Comum → Raro
- Prioriza casos frequentes
- Depois casos especiais

Estratégia 3: Positivo/Negativo Alternado
- Evita viés de recência
```

---

### Combinando Few-Shot com Outras Técnicas

#### Few-Shot + Chain-of-Thought

```
Resolva problemas mostrando o raciocínio.

Exemplo:
Problema: Táxi cobra R$ 5 bandeirada + R$ 2/km. Quanto custa 8km?
Raciocínio:
- Bandeirada: R$ 5
- Distância: 8 km
- Valor por km: R$ 2
- Custo distância: 8 × 2 = R$ 16
- Total: R$ 5 + R$ 16 = R$ 21
Resposta: R$ 21

Agora resolva:
Problema: Estacionamento cobra R$ 8 primeira hora + R$ 3 hora adicional.
Quanto custa 5 horas?
```

#### Few-Shot + Role Prompting

```
Você é um revisor técnico de código. Revise seguindo este padrão:

Exemplo:
Código: [código]
Revisão:
✅ Pontos Positivos: [lista]
⚠️ Melhorias Sugeridas: [lista]
🐛 Bugs Identificados: [lista]
Nota Final: [X/10]

Agora revise: [seu código]
```

---

### Otimização de Few-Shot Prompts

#### Teste A/B de Exemplos

```
Versão A: 3 exemplos simples
Versão B: 5 exemplos incluindo casos extremos

Teste ambas e veja qual performa melhor para seu caso.
```

#### Refinamento Iterativo

```
1. Comece com 2-3 exemplos básicos
2. Teste em diversos inputs
3. Identifique onde o modelo erra
4. Adicione exemplos que cubram esses casos
5. Repita até satisfatório
```

#### Balanceamento de Exemplos

```
Para classificação em 4 categorias:

❌ Desbalanceado:
- 5 exemplos categoria A
- 1 exemplo categoria B
- 0 exemplos categoria C
- 2 exemplos categoria D

✅ Balanceado:
- 2 exemplos categoria A
- 2 exemplos categoria B
- 2 exemplos categoria C
- 2 exemplos categoria D
```

---

### Armadilhas Comuns

#### 1. Exemplos Muito Complexos

**Problema:** Exemplos difíceis de processar
```
❌ Exemplo com 500 palavras de contexto
```

**Solução:** Simplifique mantendo a essência
```
✅ Exemplos concisos mas representativos
```

#### 2. Exemplos Contraditórios

**Problema:**
```
Exemplo 1: "Produto bom" → Positivo
Exemplo 2: "Produto bom mas caro" → Negativo
[Contradição: "bom" em ambos mas sentimentos diferentes]
```

**Solução:** Garanta consistência lógica

#### 3. Muitos Exemplos

**Problema:**
- Consome muitos tokens
- Pode confundir o modelo
- Retorno diminuído depois de certo ponto

**Solução:**
- Use quantidade mínima necessária
- Normalmente 3-5 exemplos são suficientes
- Foque em qualidade, não quantidade

---

### Templates Práticos

#### Template 1: Classificação Simples

```
Classifique [itens] em uma destas categorias: [cat1, cat2, cat3]

Exemplos:

[Item 1] → [Categoria]
[Item 2] → [Categoria]
[Item 3] → [Categoria]

Classifique:
[Seu item] →
```

#### Template 2: Extração Estruturada

```
Extraia [informações] no formato [especificação].

Exemplo 1:
Input: [texto não estruturado]
Output: [formato estruturado]

Exemplo 2:
Input: [texto não estruturado]
Output: [formato estruturado]

Extraia:
Input: [seu texto]
Output:
```

#### Template 3: Transformação

```
Transforme [formato A] em [formato B].

Exemplo 1:
[Formato A]: [conteúdo]
[Formato B]: [conteúdo transformado]

Exemplo 2:
[Formato A]: [conteúdo]
[Formato B]: [conteúdo transformado]

Transforme:
[Formato A]: [seu conteúdo]
[Formato B]:
```

---

### Exercícios Práticos

#### Exercício 1: Crie Few-Shot para Classificação
```
Tarefa: Classificar emails em Trabalho, Pessoal, Spam, Promoção
Crie prompt few-shot com 4-6 exemplos bem escolhidos
```

#### Exercício 2: Extração de Informações
```
Tarefa: Extrair nome, telefone, email de assinaturas de email
Desenvolva prompt com 3 exemplos de diferentes formatos
```

#### Exercício 3: Otimização
```
Você tem um prompt few-shot que funciona 70% das vezes.
Como você o melhoraria? Que exemplos adicionaria?
```

---

### Checklist Few-Shot Eficaz

- [ ] Número adequado de exemplos (nem muito, nem pouco)
- [ ] Exemplos representativos da variedade de casos
- [ ] Formato consistente em todos os exemplos
- [ ] Casos extremos ou ambíguos cobertos
- [ ] Exemplos balanceados entre categorias
- [ ] Livre de contradições
- [ ] Conciso mas completo

---

### Principais Aprendizados

1. Few-shot é poderoso para ensinar padrões específicos
2. Qualidade > Quantidade de exemplos
3. Exemplos devem ser diversos e representativos
4. Consistência de formato é crucial
5. Combine com outras técnicas para máximo efeito

---

### Próximos Passos

Explore Zero-Shot Learning para entender quando você NÃO precisa de exemplos.

[← Anterior: Chain-of-Thought](./01-chain-of-thought.md) | [Próximo: Zero-Shot Learning →](./03-zero-shot-learning.md)
