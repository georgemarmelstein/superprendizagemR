# Módulo 1: Fundamentos da Engenharia de Prompts

## 1.3 Anatomia de um Prompt Eficaz

### Os Componentes de um Prompt Perfeito

Um prompt eficaz é como uma receita bem escrita: cada ingrediente tem seu propósito e, juntos, produzem o resultado desejado.

---

### Framework CIDER para Prompts

Um framework prático para estruturar prompts eficazes:

- **C**ontexto (Context)
- **I**nstrução (Instruction)
- **D**etalhes (Details)
- **E**xemplos (Examples)
- **R**estrições e Formato (Restrictions & Format)

---

### 1. Contexto (Context)

**O que é:** Informações de fundo que orientam o modelo sobre o cenário, papel ou situação.

**Por que importa:** Estabelece a perspectiva e o tom da resposta.

#### Tipos de Contexto:

**Role/Persona (Papel):**
```
"Você é um professor de física explicando conceitos para alunos do ensino médio."
"Atue como um consultor de negócios com 20 anos de experiência."
"Você é um desenvolvedor sênior especializado em Python."
```

**Situação:**
```
"Estou preparando uma apresentação para investidores."
"Minha equipe está enfrentando problemas de comunicação."
"Estou começando um novo projeto de e-commerce."
```

**Background:**
```
"Nossa empresa é uma startup de tecnologia com 15 funcionários."
"Tenho conhecimento básico de programação mas sou iniciante em IA."
"Este documento é parte de uma série sobre sustentabilidade."
```

#### Exemplo Prático:

```
❌ Sem contexto:
"Como melhorar produtividade?"

✅ Com contexto:
"Você é um coach de produtividade especializado em profissionais
de tecnologia que trabalham remotamente. Eu sou um desenvolvedor
de software que trabalha de casa há 6 meses e estou tendo
dificuldades em manter o foco durante o dia."
```

---

### 2. Instrução (Instruction)

**O que é:** O comando principal, o que você quer que o modelo faça.

**Por que importa:** É o núcleo do seu prompt, a ação desejada.

#### Verbos de Ação Eficazes:

**Para Análise:**
- Analise, avalie, compare, contraste, examine, investigue

**Para Criação:**
- Crie, gere, desenvolva, elabore, desenhe, construa

**Para Explicação:**
- Explique, descreva, defina, esclareça, ilustre, demonstre

**Para Transformação:**
- Converta, traduza, resuma, simplifique, reescreva, adapte

**Para Resolução:**
- Resolva, corrija, otimize, melhore, depure, refatore

#### Estrutura de Instruções Claras:

```
[Verbo de ação] + [Objeto] + [Propósito/Resultado]

Exemplos:
✅ "Crie um plano de marketing para aumentar vendas online em 30%"
✅ "Analise este código para identificar possíveis vulnerabilidades"
✅ "Resuma este artigo destacando os 3 pontos principais"
✅ "Converta esta descrição narrativa em um diagrama de fluxo"
```

#### Instruções Vagas vs. Específicas:

```
❌ Vago:
"Me ajude com marketing"

✅ Específico:
"Desenvolva uma estratégia de marketing de conteúdo para redes
sociais, focada em aumentar o engajamento de profissionais de
RH entre 30-45 anos"
```

---

### 3. Detalhes (Details)

**O que é:** Especificações, requisitos e informações adicionais necessárias.

**Por que importa:** Refina a resposta e garante que atenda suas necessidades específicas.

#### Tipos de Detalhes:

**Escopo:**
```
- "Foque apenas em estratégias gratuitas"
- "Inclua tanto opções pagas quanto orgânicas"
- "Considere apenas o mercado brasileiro"
```

**Público-alvo:**
```
- "Para iniciantes sem conhecimento técnico"
- "Destinado a executivos de alto nível"
- "Público jovem, 18-25 anos"
```

**Restrições:**
```
- "Orçamento máximo de R$ 10.000"
- "Deve ser implementável em 2 semanas"
- "Sem uso de frameworks externos"
```

**Especificações Técnicas:**
```
- "Use Python 3.9+"
- "Compatível com WordPress 6.0"
- "Máximo de 500 palavras"
```

#### Exemplo Completo:

```
Crie um programa de treinamento para novos funcionários.

Detalhes:
- Duração: 2 semanas (onboarding)
- Público: desenvolvedores júnior recém-contratados
- Formato: híbrido (remoto + presencial)
- Tópicos obrigatórios: cultura da empresa, stack tecnológico,
  processos de desenvolvimento
- Orçamento: R$ 5.000 por funcionário
- Resultado esperado: funcionário capaz de contribuir em tarefas
  simples após o programa
```

---

### 4. Exemplos (Examples)

**O que é:** Demonstrações concretas do formato ou tipo de resposta desejada.

**Por que importa:** Guia o modelo com precisão mostrando, não apenas dizendo.

#### Few-Shot Learning (Aprendizado com Poucos Exemplos):

**Formato Básico:**
```
[Instrução]

Exemplo 1:
Input: [entrada]
Output: [saída desejada]

Exemplo 2:
Input: [entrada]
Output: [saída desejada]

Agora faça:
Input: [sua entrada real]
```

#### Exemplo Prático - Classificação de Sentimento:

```
Classifique o sentimento das avaliações em: Positivo, Neutro ou Negativo.

Exemplos:

Avaliação: "Adorei este produto! Superou minhas expectativas."
Sentimento: Positivo

Avaliação: "O produto chegou no prazo. Qualidade ok."
Sentimento: Neutro

Avaliação: "Péssima qualidade, quebrouno primeiro uso."
Sentimento: Negativo

Agora classifique:
Avaliação: "Bom custo-benefício, mas poderia ter mais recursos."
Sentimento:
```

#### Exemplo Prático - Formatação:

```
Converta descrições de produtos em formato JSON.

Exemplo:
Descrição: "Cadeira ergonômica azul, altura ajustável, capacidade 120kg, R$ 899"
JSON:
{
  "produto": "Cadeira ergonômica",
  "cor": "azul",
  "caracteristicas": ["altura ajustável", "capacidade 120kg"],
  "preco": 899
}

Agora converta:
Descrição: "Mesa de escritório branca, 150cm x 75cm, madeira MDF, R$ 650"
```

---

### 5. Restrições e Formato (Restrictions & Format)

**O que é:** Especificações sobre o que evitar e como estruturar a resposta.

**Por que importa:** Garante que a resposta seja útil e esteja no formato desejado.

#### Restrições (O que NÃO fazer):

```
"Não inclua jargões técnicos"
"Evite recomendações que exijam mais de R$ 1.000"
"Não mencione concorrentes específicos"
"Sem uso de bibliotecas externas"
"Não repita informações já mencionadas"
```

#### Especificação de Formato:

**Texto Estruturado:**
```
"Formate a resposta em:
1. Introdução (2 parágrafos)
2. Corpo (3 seções com subtítulos)
3. Conclusão (1 parágrafo)
4. Referências (lista numerada)"
```

**Listas:**
```
"Apresente como lista de 5 itens numerados"
"Use bullet points com sub-itens onde necessário"
"Ordene por ordem de prioridade"
```

**Tabelas:**
```
"Crie uma tabela com colunas: Nome, Descrição, Custo, Benefício"
"Use formato Markdown para a tabela"
```

**Código:**
```
"Forneça o código com comentários explicativos"
"Use sintaxe Python com type hints"
"Inclua exemplos de uso após cada função"
```

**JSON/XML:**
```
"Retorne em formato JSON válido"
"Use schema XML seguindo o padrão [especificar]"
```

#### Tamanho e Extensão:

```
"Resposta de no máximo 300 palavras"
"Entre 5 e 10 itens"
"Explicação breve (2-3 frases por tópico)"
"Análise detalhada com pelo menos 1000 palavras"
```

---

### Template CIDER Completo

```
[CONTEXTO]
Você é [papel/persona] com [qualificações/experiência].
A situação é [descrição do cenário].
Background relevante: [informações adicionais]

[INSTRUÇÃO]
[Verbo de ação] + [objeto] + [propósito]

[DETALHES]
- Escopo: [especificação]
- Público: [descrição]
- Restrições: [limitações]
- Especificações: [requisitos técnicos]

[EXEMPLOS] (se aplicável)
Exemplo 1:
Input: [x]
Output: [y]

Exemplo 2:
Input: [x]
Output: [y]

[FORMATO E RESTRIÇÕES]
Formato desejado: [especificação]
Tamanho: [limite]
Evite: [restrições]

[SUA TAREFA]
[Input/dados específicos para processar]
```

---

### Exemplo Real Usando CIDER

```
[CONTEXTO]
Você é um nutricionista esportivo especializado em atletas
de endurance. Trabalha com corredores de longa distância há
15 anos.

[INSTRUÇÃO]
Crie um plano de nutrição pré-corrida para uma maratona.

[DETALHES]
- Atleta: homem, 35 anos, 75kg
- Experiência: corredor amador, segunda maratona
- Objetivo: completar em ~4 horas
- Restrição: intolerância à lactose
- Período: última semana antes da prova

[EXEMPLO]
Similar ao que você faria para uma meia-maratona, mas com
foco maior em carga de carboidratos nos dias finais.

[FORMATO E RESTRIÇÕES]
Formato:
- Tabela dia-por-dia (7 dias)
- Colunas: Dia, Café/Almoço/Jantar, Hidratação, Observações
- Inclua seção separada para "Manhã da Prova"

Restrições:
- Evite suplementos caros ou difíceis de encontrar
- Apenas alimentos comuns em supermercados brasileiros
- Não inclua laticínios
- Máximo 500 palavras de explicação adicional
```

---

### Quando Simplificar o Framework

Nem todo prompt precisa de todos os componentes CIDER. Use seu julgamento:

**Tarefas Simples:**
```
"Traduza 'Hello World' para português"
→ Apenas Instrução
```

**Tarefas Moderadas:**
```
"Explique o conceito de recursão em programação para iniciantes,
usando uma analogia do dia a dia. Máximo 200 palavras."
→ Instrução + Detalhes + Formato
```

**Tarefas Complexas:**
```
Use CIDER completo
```

---

### Exercícios Práticos

#### Exercício 1: Identifique os Componentes
Analise este prompt e identifique cada componente CIDER:

```
Você é um gerente de projetos ágil experiente. Crie um plano de
sprint de 2 semanas para uma equipe de 5 desenvolvedores que está
construindo um aplicativo mobile de delivery. O backlog tem 20
itens. Formate como uma tabela com colunas: Tarefa, Responsável,
Estimativa (pontos), Prioridade. Evite incluir mais de 30 pontos
no total do sprint.
```

#### Exercício 2: Complete o Prompt
Complete este prompt usando o framework CIDER:

```
Tarefa: Criar conteúdo para um post de blog sobre segurança cibernética
Público: Pequenos empresários sem background técnico
Objetivo: Educar sobre práticas básicas de segurança
```

#### Exercício 3: Melhore o Prompt
Reescreva este prompt vago usando CIDER:

```
"Me ajude a fazer um currículo melhor"
```

---

### Checklist de Qualidade do Prompt

Antes de enviar seu prompt, verifique:

- [ ] O contexto está claro?
- [ ] A instrução é específica e usa verbos de ação?
- [ ] Incluí todos os detalhes necessários?
- [ ] Exemplos são necessários? Se sim, foram incluídos?
- [ ] O formato desejado está especificado?
- [ ] As restrições estão claras?
- [ ] O prompt é conciso (sem informações redundantes)?
- [ ] Está livre de ambiguidades?

---

### Principais Aprendizados

1. Prompts eficazes têm estrutura clara
2. O framework CIDER cobre os componentes essenciais
3. Nem todo prompt precisa de todos os componentes
4. Exemplos são poderosos para guiar o formato
5. Especificidade leva a melhores resultados

---

### Próximos Passos

Com a anatomia de um prompt dominada, vamos explorar os princípios básicos de comunicação com IA.

[← Anterior: Como Modelos Funcionam](./02-como-modelos-funcionam.md) | [Próximo: Princípios Básicos →](./04-principios-basicos.md)

---

### Templates Prontos

Confira templates prontos para diversos cenários em: `../recursos/templates.md`
