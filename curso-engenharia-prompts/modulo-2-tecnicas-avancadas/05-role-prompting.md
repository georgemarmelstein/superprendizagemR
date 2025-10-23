# Módulo 2: Técnicas Avançadas

## 2.5 Role Prompting (Prompts com Papéis)

### O que é Role Prompting?

Atribuir um papel, persona ou identidade específica ao modelo para moldar suas respostas.

**Template básico:**
```
"Você é um [papel/profissão] com [qualificações/experiência]..."
```

---

### Por que Funciona?

- Ativa conhecimento específico do domínio
- Define tom e estilo apropriados
- Estabelece perspectiva e expertise
- Melhora relevância das respostas

---

### Exemplos de Roles

#### Especialistas Técnicos
```
"Você é um arquiteto de software sênior com 15 anos de experiência
em sistemas distribuídos..."
```

#### Profissionais de Negócio
```
"Você é um consultor de estratégia empresarial especializado
em startups de tecnologia..."
```

#### Educadores
```
"Você é um professor de física que tem talento especial para
explicar conceitos complexos usando analogias do dia a dia..."
```

#### Criativos
```
"Você é um copywriter premiado especializado em storytelling
para marcas B2B..."
```

---

### Componentes de um Role Eficaz

1. **Profissão/Papel**
2. **Nível de Experiência**
3. **Especialização**
4. **Características Únicas** (opcional)

**Exemplo completo:**
```
Você é uma nutricionista esportiva [1] certificada com 10 anos
de experiência [2], especializada em atletas de endurance [3],
conhecida por criar planos práticos e fáceis de seguir [4].
```

---

### Aplicações Práticas

#### Análise Técnica
```
Você é um especialista em segurança cibernética.
Avalie esta política de senhas e identifique vulnerabilidades.
```

#### Escrita Criativa
```
Você é um roteirista de cinema especializado em suspense psicológico.
Crie o outline de uma cena de abertura impactante.
```

#### Consultoria de Negócio
```
Você é um consultor McKinsey analisando uma startup de SaaS.
Conduza uma análise SWOT e forneça recomendações estratégicas.
```

---

### Combinando Role com Outras Técnicas

#### Role + Few-Shot
```
Você é um analista de dados financeiros.

Analise transações seguindo este padrão:

Exemplo:
Transação: R$ 1.500 - "Compra equipamento escritório"
Análise: Despesa capital, depreciável, categoria: Ativo Fixo

Agora analise: [nova transação]
```

#### Role + Chain-of-Thought
```
Você é um médico diagnosticando sintomas.

Paciente relata: febre, dor de cabeça, fadiga

Pense como um médico:
1. Quais são os diagnósticos diferenciais?
2. Que perguntas adicionais fazer?
3. Que exames solicitar?
4. Qual o mais provável e por quê?
```

---

### Exercício
Crie roles para:
1. Revisar um contrato
2. Ensinar programação para crianças
3. Analisar tendências de moda

[← Anterior](./04-prompt-chaining.md) | [Próximo →](./06-iteracao-refinamento.md)
