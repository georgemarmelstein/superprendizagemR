# Templates de Prompts Reutilizáveis

## Template 1: Análise Geral

```
Analise [objeto/conteúdo] considerando:
- [Critério 1]
- [Critério 2]
- [Critério 3]

Forneça:
1. Resumo executivo (2-3 frases)
2. Pontos fortes (3-5 itens)
3. Áreas de melhoria (3-5 itens)
4. Recomendações prioritárias (top 3)

Formato: [especificar]
```

## Template 2: Geração de Conteúdo

```
Crie [tipo de conteúdo] sobre [tópico].

Especificações:
- Público-alvo: [descrição]
- Tom: [formal/casual/técnico/etc]
- Tamanho: [limite de palavras/caracteres]
- Estrutura: [definir seções]
- Objetivo: [informar/persuadir/educar/etc]

Requisitos obrigatórios:
- [Requisito 1]
- [Requisito 2]

Evite:
- [Restrição 1]
- [Restrição 2]
```

## Template 3: Comparação

```
Compare [A] e [B] nos seguintes aspectos:

Critérios de comparação:
1. [Critério 1]
2. [Critério 2]
3. [Critério 3]
4. [Critério 4]

Para cada critério, atribua score (1-10) e justifique.

Formato final:
- Tabela comparativa
- Vencedor por critério
- Recomendação geral com justificativa
- Casos de uso ideais para cada opção
```

## Template 4: Resolução de Problema

```
Problema: [descrição clara do problema]

Contexto:
- [Informação relevante 1]
- [Informação relevante 2]
- [Restrições/limitações]

Analise seguindo este framework:

1. COMPREENSÃO
   - Reformule o problema em suas palavras
   - Identifique stakeholders afetados

2. DIAGNÓSTICO
   - Possíveis causas raízes
   - Análise de 5 Porquês

3. SOLUÇÕES
   - Gere 5-7 opções de solução
   - Para cada: prós, contras, esforço, impacto

4. RECOMENDAÇÃO
   - Solução preferida e justificativa
   - Plano de implementação (passos)
   - Métricas de sucesso
   - Riscos e mitigações
```

## Template 5: Extração de Dados

```
Extraia as seguintes informações do texto abaixo:

Campos a extrair:
- [Campo 1]: [descrição/tipo]
- [Campo 2]: [descrição/tipo]
- [Campo 3]: [descrição/tipo]

Formato de saída:
[JSON/Tabela/Lista/etc - especificar estrutura exata]

Regras:
- Se informação não disponível, use "N/A"
- [Regra específica 2]
- [Regra específica 3]

Texto:
[seu texto aqui]
```

## Template 6: Code Review

```
Revise este código [linguagem]:

```[linguagem]
[código]
```

Avalie:

1. QUALIDADE GERAL (score 1-10)

2. ANÁLISE DETALHADA
   - Legibilidade e clareza
   - Performance e eficiência
   - Segurança
   - Manutenibilidade
   - Conformidade com boas práticas

3. ISSUES IDENTIFICADAS
   Classifique por severidade:
   - Crítico: [lista]
   - Alto: [lista]
   - Médio: [lista]
   - Baixo: [lista]

4. MELHORIAS SUGERIDAS
   Para cada issue crítico/alto:
   - Código problemático
   - Por que é problema
   - Código corrigido
   - Explicação da melhoria

5. CÓDIGO REFATORADO (se aplicável)
```

## Template 7: Planejamento de Projeto

```
Crie plano de projeto para: [objetivo]

Contexto:
- Prazo: [tempo disponível]
- Recursos: [equipe, orçamento, ferramentas]
- Restrições: [limitações]

Estrutura do plano:

1. OBJETIVOS SMART
   - Específicos, Mensuráveis, Atingíveis, Relevantes, Temporais

2. ESCOPO
   - O que está incluído
   - O que está excluído (explicitamente)

3. CRONOGRAMA
   - Fases principais
   - Milestones com datas
   - Dependências críticas

4. RECURSOS
   - Alocação de equipe
   - Orçamento por fase
   - Ferramentas necessárias

5. RISCOS
   - Top 5 riscos
   - Probabilidade e impacto
   - Planos de mitigação

6. MÉTRICAS DE SUCESSO
   - KPIs principais
   - Como e quando medir
```

## Template 8: Pesquisa e Síntese

```
Sintetize informações sobre [tópico] das fontes abaixo.

Fontes:
[Fonte 1]
[Fonte 2]
[Fonte 3]

Crie síntese estruturada:

1. VISÃO GERAL
   - Definição/conceito principal
   - Por que é importante

2. PONTOS DE CONSENSO
   - O que todas as fontes concordam

3. PERSPECTIVAS DIVERGENTES
   - Diferenças de opinião
   - Argumentos de cada lado

4. ANÁLISE CRÍTICA
   - Qualidade das evidências
   - Gaps no conhecimento
   - Vieses potenciais

5. CONCLUSÃO
   - Síntese balanceada
   - Implicações práticas
   - Recomendações para uso
```

## Template 9: Criação de Persona

```
Crie persona detalhada para [produto/serviço].

Inclua:

1. DEMOGRÁFICOS
   - Nome: [nome fictício realista]
   - Idade:
   - Localização:
   - Profissão:
   - Renda:
   - Educação:

2. PSICOGRÁFICOS
   - Objetivos (pessoais e profissionais)
   - Desafios e frustrações
   - Valores e motivações
   - Influências e fontes de informação

3. COMPORTAMENTO
   - Dia típico
   - Uso de tecnologia
   - Processo de decisão de compra
   - Canais de comunicação preferidos

4. RELAÇÃO COM [PRODUTO/SERVIÇO]
   - Necessidades específicas
   - Objeções potenciais
   - Motivadores de compra
   - Uso esperado

5. CITAÇÃO
   - Frase que resume essa persona
```

## Template 10: Feedback Construtivo

```
Forneça feedback construtivo sobre [trabalho/projeto/ideia].

Estrutura do feedback:

1. APRECIAÇÃO
   - O que funciona bem (específico)
   - Pontos fortes (3-5)

2. ANÁLISE CONSTRUTIVA
   - Áreas de melhoria (específicas)
   - Por que são importantes
   - Impacto se não endereçadas

3. SUGESTÕES ACIONÁVEIS
   Para cada área de melhoria:
   - Sugestão específica
   - Como implementar
   - Benefício esperado

4. PRIORIZAÇÃO
   - Alta prioridade (fazer primeiro)
   - Média prioridade
   - Baixa prioridade (nice to have)

5. ENCORAJAMENTO
   - Reconhecimento do esforço
   - Próximos passos recomendados

Tom: construtivo, específico, acionável, empático
```

---

## Como Usar Estes Templates

1. **Copie o template** relevante
2. **Preencha os campos** entre colchetes [...]
3. **Ajuste conforme necessário** para seu caso específico
4. **Teste e refine** baseado nos resultados
5. **Documente** variações que funcionam bem

---

## Personalizando Templates

- Adicione contexto específico do seu domínio
- Ajuste formato para suas preferências
- Combine templates para tarefas complexas
- Crie variações para casos comuns

---

*Templates são ponto de partida. Adapte-os às suas necessidades!*
