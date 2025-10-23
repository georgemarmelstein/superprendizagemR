# Módulo 1: Fundamentos da Engenharia de Prompts

## 1.5 Tipos de Prompts

### Classificação e Aplicação de Diferentes Tipos de Prompts

Entender os diferentes tipos de prompts e quando usar cada um é essencial para maximizar a eficácia da sua comunicação com IA.

---

## Classificação por Propósito

### 1. Prompts de Geração

**Objetivo:** Criar conteúdo original do zero.

#### Casos de Uso:
- Escrita criativa
- Geração de ideias
- Criação de código
- Design de planos e estratégias

#### Estrutura Típica:
```
"Crie/Gere/Desenvolva [tipo de conteúdo]
com estas características: [especificações]"
```

#### Exemplos:

**Geração de Conteúdo:**
```
"Crie um artigo de blog de 800 palavras sobre os benefícios
da meditação para profissionais de tecnologia. Inclua:
- 3 benefícios principais com evidências
- Dicas práticas para começar
- Tom: profissional mas acessível
- Público: desenvolvedores e engenheiros de software"
```

**Geração de Ideias:**
```
"Gere 10 ideias criativas para uma campanha de marketing
de lançamento de um aplicativo de fitness focado em:
- Público: mulheres 25-40 anos
- Diferencial: gamificação e comunidade
- Orçamento: marketing digital de baixo custo
Para cada ideia, inclua: conceito (1 frase) e canal principal"
```

**Geração de Código:**
```
"Crie uma função Python que:
- Recebe uma lista de dicionários representando produtos
- Filtra produtos com preço > R$ 100
- Ordena por preço (decrescente)
- Retorna lista de nomes dos produtos

Inclua:
- Type hints
- Docstring
- Tratamento de erros
- Exemplo de uso"
```

---

### 2. Prompts de Transformação

**Objetivo:** Converter informação de um formato/estilo para outro.

#### Casos de Uso:
- Reformulação de texto
- Tradução
- Conversão de formato
- Simplificação/Complexificação

#### Estrutura Típica:
```
"Transforme/Converta [conteúdo original]
de [formato/estilo A] para [formato/estilo B]
seguindo [especificações]"
```

#### Exemplos:

**Reformulação de Tom:**
```
Texto original:
"O desempenho do Q3 foi insatisfatório devido a múltiplos
fatores macroeconômicos adversos e falhas operacionais internas."

Tarefa:
"Reformule este texto corporativo em linguagem simples e direta
que um público geral possa entender facilmente."
```

**Conversão de Formato:**
```
Dados em texto:
"João Silva tem 35 anos e mora em São Paulo. Trabalha como
engenheiro e ganha R$ 8.000 por mês. Maria Santos tem 28 anos..."

Tarefa:
"Converta estas informações em formato JSON com estrutura:
{
  'pessoas': [
    {'nome': '', 'idade': '', 'cidade': '', 'profissao': '', 'salario': ''}
  ]
}"
```

**Simplificação:**
```
Texto técnico:
"A implementação de algoritmos de machine learning supervisionado
requer um dataset rotulado adequado para o treinamento do modelo,
além de features engineering apropriado para maximizar a acurácia..."

Tarefa:
"Simplifique este texto para que uma pessoa sem conhecimento técnico
possa entender o conceito básico."
```

---

### 3. Prompts de Análise

**Objetivo:** Examinar, avaliar e interpretar informações.

#### Casos de Uso:
- Análise de dados
- Avaliação de qualidade
- Identificação de padrões
- Diagnóstico de problemas

#### Estrutura Típica:
```
"Analise [conteúdo/dados]
considerando [critérios/aspectos]
e forneça [tipo de conclusões/insights]"
```

#### Exemplos:

**Análise de Sentimento:**
```
"Analise o sentimento das seguintes avaliações de clientes
e classifique cada uma como: Positivo, Negativo ou Neutro.
Além disso, identifique os principais temas mencionados
(produto, atendimento, entrega, preço).

Avaliações:
1. 'Produto ótimo mas demorou muito para chegar'
2. 'Atendimento péssimo, nunca mais compro'
3. 'Exatamente como descrito, recomendo'

Formato: Tabela com colunas: Avaliação | Sentimento | Temas"
```

**Análise de Código:**
```
"Analise este código Python e identifique:
1. Possíveis bugs ou erros
2. Problemas de performance
3. Violações de boas práticas
4. Melhorias sugeridas

Para cada ponto, explique o problema e forneça solução.

```python
def calcular_media(numeros):
    soma = 0
    for i in range(len(numeros)):
        soma = soma + numeros[i]
    return soma / len(numeros)
```"
```

**Análise Estratégica:**
```
"Analise esta descrição de negócio usando análise SWOT:

Empresa: Startup de entrega de comida saudável
- 6 meses de operação
- 500 clientes ativos
- Opera em 3 bairros de São Paulo
- Concorre com iFood, Rappi
- Diferencial: refeições nutritivas e sustentáveis

Formate como:
Forças: [lista]
Fraquezas: [lista]
Oportunidades: [lista]
Ameaças: [lista]
Recomendações estratégicas: [3-5 ações prioritárias]"
```

---

### 4. Prompts de Extração

**Objetivo:** Identificar e extrair informações específicas de conteúdo maior.

#### Casos de Uso:
- Extração de dados estruturados
- Identificação de entidades
- Filtragem de informações relevantes
- Resumo de pontos-chave

#### Estrutura Típica:
```
"Extraia [tipo de informação]
de [fonte]
no formato [especificação]"
```

#### Exemplos:

**Extração de Dados Estruturados:**
```
"Extraia as seguintes informações do texto abaixo:
- Nome da empresa
- Localização
- Ano de fundação
- Número de funcionários
- Principais produtos/serviços

Texto:
'A TechCorp foi estabelecida em 2010 em São Paulo e hoje emprega
cerca de 150 profissionais. Especializada em soluções de software
para varejo, a empresa oferece sistemas de PDV e gestão de estoque...'

Formate como JSON."
```

**Extração de Entidades:**
```
"Do seguinte artigo de notícia, extraia:
- Pessoas mencionadas (nome e papel)
- Organizações (nome e tipo)
- Localizações geográficas
- Datas relevantes
- Valores monetários

[Texto do artigo]

Apresente em tabela organizada."
```

**Extração de Insights:**
```
"Leia este relatório de 5 páginas e extraia:
1. As 3 conclusões principais
2. Todos os números/estatísticas mencionados
3. Recomendações de ação
4. Riscos identificados

[Texto do relatório]

Para cada item, cite a seção de origem."
```

---

### 5. Prompts de Classificação

**Objetivo:** Categorizar informações em grupos predefinidos.

#### Casos de Uso:
- Categorização de conteúdo
- Triagem de mensagens
- Classificação de prioridade
- Identificação de tipos

#### Estrutura Típica:
```
"Classifique [item(ns)]
em uma destas categorias: [lista de categorias]
baseado em [critérios]"
```

#### Exemplos:

**Classificação de Tickets:**
```
"Classifique estes tickets de suporte em:
- Urgente (responder em 1h)
- Alta (responder em 4h)
- Média (responder em 24h)
- Baixa (responder em 48h)

Tickets:
1. 'Sistema totalmente fora do ar, não consigo acessar'
2. 'Como faço para mudar minha senha?'
3. 'Tenho uma dúvida sobre a fatura deste mês'
4. 'Erro crítico no módulo de pagamentos afetando vendas'

Formato: Tabela com justificativa para cada classificação"
```

**Categorização de Conteúdo:**
```
"Categorize cada um destes artigos em exatamente uma categoria:
Tecnologia, Negócios, Saúde, Educação, Entretenimento

Artigos:
1. 'Novos avanços em inteligência artificial transformam diagnósticos médicos'
2. 'Startup brasileira capta R$ 50 milhões em rodada Series A'
3. 'Como a gamificação está mudando o ensino fundamental'

Formato: Artigo X → Categoria Y (Confiança: XX%)"
```

---

### 6. Prompts de Comparação

**Objetivo:** Identificar semelhanças, diferenças e fazer avaliações comparativas.

#### Casos de Uso:
- Comparação de produtos/serviços
- Benchmark
- Análise de alternativas
- Avaliação de opções

#### Estrutura Típica:
```
"Compare [item A] e [item B]
considerando [critérios]
e determine [conclusão desejada]"
```

#### Exemplos:

**Comparação de Produtos:**
```
"Compare estes dois smartphones considerando:
- Performance
- Câmera
- Bateria
- Preço
- Custo-benefício

Smartphone A: [especificações]
Smartphone B: [especificações]

Formato:
- Tabela comparativa
- Vencedor por categoria
- Recomendação final baseada em perfil de usuário"
```

**Comparação de Abordagens:**
```
"Compare arquitetura monolítica vs. microserviços para um
sistema de e-commerce de médio porte (10K usuários/dia).

Critérios:
- Complexidade de implementação
- Escalabilidade
- Custo de manutenção
- Tempo de desenvolvimento
- Adequação ao caso de uso

Formate como análise estruturada com recomendação justificada."
```

---

### 7. Prompts de Solução de Problemas

**Objetivo:** Diagnosticar problemas e propor soluções.

#### Casos de Uso:
- Debugging
- Troubleshooting
- Resolução de desafios
- Otimização

#### Estrutura Típica:
```
"[Descrição do problema]

Analise as possíveis causas e forneça soluções
considerando [restrições/contexto]"
```

#### Exemplos:

**Debugging de Código:**
```
"Este código Python está retornando erro. Identifique o problema
e forneça a correção:

```python
def dividir_lista(lista, n):
    resultado = []
    for i in range(0, len(lista), n):
        resultado.append(lista[i:i+n])
    return resultado

numeros = [1, 2, 3, 4, 5]
print(dividir_lista(numeros, 0))  # Erro aqui
```

Explique:
1. Qual é o erro
2. Por que ocorre
3. Como corrigir
4. Como prevenir no futuro"
```

**Solução de Problema de Negócio:**
```
"Problema: Nossa taxa de conversão no e-commerce caiu de 3% para 1.5%
no último mês.

Contexto:
- Não mudamos preços
- Tráfego aumentou 20%
- Novo design foi lançado há 1 mês
- Competidores lançaram promoções agressivas

Tarefa:
1. Liste possíveis causas (ordenadas por probabilidade)
2. Para cada causa, sugira método de validação
3. Proponha 3-5 ações corretivas prioritárias
4. Estime impacto e esforço para cada ação"
```

---

### 8. Prompts de Explicação/Educação

**Objetivo:** Ensinar conceitos, explicar processos, esclarecer dúvidas.

#### Casos de Uso:
- Tutoria
- Documentação
- Onboarding
- Explicação de conceitos

#### Estrutura Típica:
```
"Explique [conceito/processo]
para [audiência]
usando [abordagem/método]"
```

#### Exemplos:

**Explicação com Analogia:**
```
"Explique o conceito de APIs para alguém sem conhecimento técnico.
Use analogias do dia a dia. Máximo 200 palavras.

Estrutura:
1. Definição simples (1 frase)
2. Analogia explicativa
3. Exemplo prático do uso
4. Por que é importante"
```

**Tutorial Passo a Passo:**
```
"Crie um tutorial para configurar autenticação JWT em uma API Node.js.

Público: Desenvolvedor júnior com conhecimento básico de Node

Formato:
1. Pré-requisitos
2. Instalação de dependências (com comandos)
3. Implementação (passo a passo com código comentado)
4. Testes
5. Troubleshooting comum

Para cada passo, explique o 'porquê', não apenas o 'como'."
```

---

## Classificação por Técnica

### Zero-Shot Prompts

**O que é:** Instruções diretas sem exemplos.

**Quando usar:** Tarefas simples e bem definidas.

```
"Traduza para inglês: 'Bom dia, como vai você?'"

"Resuma este artigo em 3 frases: [artigo]"
```

### One-Shot Prompts

**O que é:** Uma instrução com um exemplo.

**Quando usar:** Demonstrar formato ou padrão específico.

```
"Converta endereços para formato estruturado.

Exemplo:
Input: 'Moro na Rua das Flores, 123, apto 45, São Paulo, SP'
Output: {'rua': 'Rua das Flores', 'numero': '123', 'complemento': 'apto 45',
         'cidade': 'São Paulo', 'estado': 'SP'}

Agora converta:
Input: 'Av. Paulista, 1000, sala 201, São Paulo, SP'"
```

### Few-Shot Prompts

**O que é:** Múltiplos exemplos para estabelecer padrão.

**Quando usar:** Tarefas com nuances ou classificações complexas.

```
"Classifique perguntas de suporte por categoria.

Exemplos:

Pergunta: 'Como reseto minha senha?'
Categoria: Conta

Pergunta: 'O pagamento não está sendo processado'
Categoria: Financeiro

Pergunta: 'Como adiciono um novo usuário?'
Categoria: Funcionalidade

Agora classifique:
Pergunta: 'Meu cartão foi cobrado duas vezes'"
```

### Chain-of-Thought Prompts

**O que é:** Solicita raciocínio passo a passo antes da resposta.

**Quando usar:** Problemas complexos que exigem múltiplas etapas.

```
"Problema: Uma loja oferece 20% de desconto em um produto de R$ 150.
Se há 8% de imposto sobre o preço com desconto, qual o valor final?

Resolva passo a passo:
1. Calcule o valor do desconto
2. Subtraia o desconto do preço original
3. Calcule o imposto sobre o preço com desconto
4. Some o imposto ao preço com desconto
5. Forneça o valor final"
```

---

## Escolhendo o Tipo Certo de Prompt

### Árvore de Decisão:

```
Qual é seu objetivo?

├─ Criar conteúdo novo
│  └─ Use: Prompt de Geração
│
├─ Mudar formato/estilo de conteúdo existente
│  └─ Use: Prompt de Transformação
│
├─ Entender/avaliar informação
│  └─ Use: Prompt de Análise
│
├─ Encontrar informações específicas
│  └─ Use: Prompt de Extração
│
├─ Organizar em categorias
│  └─ Use: Prompt de Classificação
│
├─ Avaliar opções
│  └─ Use: Prompt de Comparação
│
├─ Resolver um problema
│  └─ Use: Prompt de Solução
│
└─ Explicar/ensinar
   └─ Use: Prompt de Explicação
```

---

## Combinando Tipos de Prompts

Prompts eficazes frequentemente combinam múltiplos tipos:

**Exemplo: Análise + Comparação + Recomendação**
```
"Analise estes dois planos de marketing [ANÁLISE]

Compare-os considerando ROI, prazo e viabilidade [COMPARAÇÃO]

Recomende o melhor curso de ação com justificativa [SOLUÇÃO]"
```

---

## Exercícios Práticos

### Exercício 1: Identifique o Tipo
Classifique estes prompts nos tipos estudados:

a) "Liste as diferenças entre Python e JavaScript"
b) "Crie um slogan para uma cafeteria artesanal"
c) "Este código tem um bug. Encontre e corrija-o"
d) "Extraia todos os emails deste texto"

### Exercício 2: Crie Prompts
Para cada cenário, escreva um prompt do tipo indicado:

a) **Geração**: Criar um plano de estudos para aprender machine learning
b) **Análise**: Avaliar a qualidade de um artigo científico
c) **Classificação**: Categorizar despesas empresariais
d) **Transformação**: Converter um relatório técnico para apresentação executiva

---

## Principais Aprendizados

1. Diferentes tipos de prompts servem diferentes propósitos
2. Escolher o tipo certo aumenta a eficácia
3. Prompts podem (e devem) combinar múltiplos tipos
4. A técnica (zero-shot, few-shot, etc.) complementa o tipo
5. Clareza sobre seu objetivo ajuda a escolher o tipo adequado

---

## Conclusão do Módulo 1

Parabéns! Você completou o Módulo 1 e agora tem uma base sólida em:
- O que é engenharia de prompts
- Como modelos de linguagem funcionam
- Anatomia de um prompt eficaz
- Princípios fundamentais de comunicação com IA
- Diferentes tipos de prompts e quando usar cada um

---

### Próximos Passos

Você está pronto para técnicas mais avançadas no Módulo 2!

[← Anterior: Princípios Básicos](./04-principios-basicos.md) | [Próximo: Módulo 2 - Técnicas Avançadas →](../modulo-2-tecnicas-avancadas/01-chain-of-thought.md)

---

### Exercícios do Módulo

Complete os exercícios práticos em: `../exercicios/modulo-1-exercicios.md`
