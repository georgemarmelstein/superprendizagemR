---
description: Analisa documentos de referência para extrair perfil de estilo do autor
---

# Análise de Estilo - Context Building

Execute uma **análise profunda de estilo** dos documentos de referência.

## Objetivo

Criar um perfil detalhado do estilo de escrita do autor para ser usado na geração de capítulos.

## Instruções

### 1. Identificar Documentos de Referência

Liste todos os arquivos em `estilo/`:
```bash
ls -la estilo/
```

Se a pasta estiver vazia:
- Informe o usuário
- Explique que documentos de referência são necessários
- Sugira adicionar documentos anteriores do autor

### 2. Análise Individual de Cada Documento

Para CADA documento encontrado:

**a) Aspectos de Escrita:**
- Tom e voz (formal/informal, técnico/acessível)
- Estrutura de frases (curtas/longas, simples/complexas)
- Vocabulário preferido
- Uso de primeira/terceira pessoa
- Nível de formalidade

**b) Abordagem Pedagógica:**
- Como conceitos são introduzidos?
- Progressão do simples ao complexo?
- Uso de scaffolding?
- Técnicas de engajamento
- Como erros/confusões são tratados?

**c) Exemplos e Demonstrações:**
- Tipos de exemplos usados (práticos, teóricos, mistos)
- Complexidade dos exemplos
- Relação entre teoria e prática
- Uso de código comentado
- Exercícios propostos

**d) Metáforas e Analogias:**
- Quais metáforas são recorrentes?
- Analogias com que domínios?
- Storytelling usado?
- Humor e leveza?

### 3. Consolidação do Perfil de Estilo

Crie um perfil unificado que sintetize:

```markdown
# Perfil de Estilo - [Autor]

## Tom e Voz
[Descrição consolidada]

## Estrutura e Organização
[Padrões identificados]

## Abordagem Pedagógica
[Método de ensino predominante]

## Recursos Estilísticos
- Metáforas favoritas: [lista]
- Exemplos típicos: [tipos]
- Estruturas recorrentes: [lista]

## Características Distintivas
[O que torna o estilo único]

## Aplicação Prática
[Como replicar este estilo]
```

### 4. Salvar Análise

Salve em: `output/style-profile.md`

### 5. Validação

- Identifique pelo menos 5 características distintivas
- Forneça exemplos concretos de cada característica
- Sugira técnicas para mimetizar o estilo

## Output Esperado

Apresente ao usuário:
```
✅ Análise de Estilo Concluída!

📚 Documentos analisados: [N]

🎨 Características identificadas:
- [característica 1]
- [característica 2]
- [característica 3]
...

📁 Perfil salvo em: output/style-profile.md
```

## Uso Posterior

Este perfil será usado em CADA geração de capítulo para:
- Garantir consistência estilística
- Manter voz do autor
- Aplicar mesma abordagem pedagógica
