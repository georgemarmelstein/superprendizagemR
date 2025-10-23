# Módulo 2: Técnicas Avançadas

## 2.6 Iteração e Refinamento

### O Ciclo de Refinamento

Raramente o primeiro prompt é perfeito. Iteração sistemática leva à excelência.

---

### Processo de Iteração

```
1. Prompt Inicial → Teste
2. Analise Resultados
3. Identifique Problemas
4. Ajuste Prompt
5. Repita até Satisfatório
```

---

### Estratégias de Refinamento

#### 1. Adicionar Especificidade
```
V1: "Explique blockchain"
V2: "Explique blockchain para iniciantes"
V3: "Explique blockchain para iniciantes sem background técnico,
     usando analogia simples, em 200 palavras"
```

#### 2. Ajustar Formato
```
Problema: Resposta muito longa
Solução: "Resuma em máximo 5 bullet points"

Problema: Resposta muito vaga
Solução: "Forneça exemplos específicos para cada ponto"
```

#### 3. Refinar Escopo
```
Problema: Resposta muito ampla
Solução: Adicione restrições específicas

Problema: Resposta muito estreita
Solução: Amplie o escopo gradualmente
```

---

### Técnicas de Debug de Prompts

#### Quando o resultado está errado:

**1. Verifique Clareza**
- O prompt tem ambiguidades?
- As instruções são contradito´rias?

**2. Teste Partes Isoladamente**
- Remova componentes para identificar problemas
- Teste cada instrução separadamente

**3. Adicione Exemplos**
- Se zero-shot falha, tente few-shot
- Exemplos podem clarificar intenção

**4. Simplifique**
- Prompts muito complexos confundem
- Divida em múltiplos prompts (chaining)

---

### Refinamento Conversacional

```
Você: [Prompt inicial]
IA: [Resposta]

Você: "Bom começo. Agora [ajuste específico]"
IA: [Resposta refinada]

Você: "Perfeito. Adicione [elemento adicional]"
IA: [Resposta final]
```

---

### Documentando Aprendizados

Mantenha um registro:

```
PROMPT LOG

Objetivo: Gerar meta descriptions SEO

V1: "Crie meta description"
Resultado: Muito genérico
Aprendizado: Precisa de limite de caracteres

V2: "Crie meta description com max 155 chars"
Resultado: Melhor, mas sem palavra-chave
Aprendizado: Deve incluir palavra-chave

V3: "Crie meta description (max 155 chars) incluindo palavra-chave '[X]'"
Resultado: ✓ Funciona bem

PROMPT FINAL: [V3]
```

---

### Testes A/B de Prompts

Compare variações:

```
Prompt A (direto):
"Liste 5 benefícios de exercícios"

Prompt B (com role):
"Você é um personal trainer. Liste 5 benefícios de exercícios"

Prompt C (com contexto):
"Para alguém sedentário que quer começar, liste 5 benefícios
motivadores de exercícios regulares"

→ Teste os 3 e veja qual atende melhor sua necessidade
```

---

### Checklist de Refinamento

- [ ] O resultado está correto factualmente?
- [ ] O formato é adequado?
- [ ] O tom está apropriado?
- [ ] A extensão é ideal?
- [ ] Todos requisitos foram atendidos?
- [ ] Há informações desnecessárias?
- [ ] Ficou algo de fora?

---

### Exercício

Refine este prompt através de 3 iterações:
```
"Me ajude a melhorar produtividade"
```

[← Anterior](./05-role-prompting.md) | [Próximo →](./07-gestao-contexto.md)
