---
description: An AI-driven workflow that analyzes a Figma component, maps it to design tokens, generates consistent code, and delivers a fully documented, accessible component in Storybook, aligned with existing Design System standards.
---

# Criar componente

## 1. Entrada inicial e definição de contexto

Antes da execução, o Agente de IA deve receber um contexto fixo para evitar suposições:

- Link da seleção no Figma
- Nome do componente selecionado (ex.: `Button`, `Alert`, `Card`)

## 2. Análise do componente no Figma

### 2.1 Análise estrutural

O agente inspeciona o componente selecionado no Figma e extrai:

- Hierarquia do componente (container → elementos internos)
- Tipos de elementos (texto, ícone, ações)
- Variantes (tamanho, tom, aparência, layout)
- Estados (padrão, hover, foco, desabilitado, loading)
- Propriedades do componente definidas no Figma

## 3. Mapeamento de Design Tokens

O agente mapeia todos os valores visuais do Figma para tokens do Design System:

- Cores → tokens semânticos de cor
- Tipografia → tokens de fonte, tamanho e peso
- Espaçamentos → tokens de espaçamento
- Raio, borda, sombra → tokens correspondentes

**Regras:**

- Valores brutos não são permitidos
- O agente deve relacionar as variáveis do Figma com os design tokens no código
- Deve utilizar os design tokens, functions e mixins, assim como outros componentes usam
- Tokens ausentes devem ser reportados, nunca inventados

## 4. Análise de padrões de componentes existentes

Antes de criar qualquer coisa nova, o agente:

- Analisa o repositório em busca de componentes similares
- Reutiliza padrões e convenções existentes

## 5. Criação da estrutura do componente

O agente cria a estrutura do componente seguindo as convenções do sistema.

## 6. Implementação do componente

### 6.1 Marcação (Markup)

- HTML semântico
- Classes base e modificadores
- Atributos de acessibilidade

### 6.2 Estilização

- Apenas valores baseados em tokens
- Variantes e estados implementados
- Nenhum número mágico

## 7. Validação interna

O agente valida:

- Uso correto de tokens
- Consistência estrutural
- Comportamento de estados e variantes
- Conformidade com acessibilidade

## 8. Criação da story no Storybook

- Stories alinhadas às propriedades do Figma
- Variantes e estados expostos
- Exemplos significativos

## 9. Documentação no Storybook

- Propósito e diretrizes de uso
- Props e variantes
- Notas de acessibilidade
- Referências de tokens quando relevante

## 10. Entrega final

- Código do componente
- Story do Storybook
- Documentação
- Relatório resumido

## Checklist final de entrega (saída do Agente de IA)

O Agente de IA deve entregar **todos os itens abaixo** para que o componente seja considerado completo:

- [ ] Componente implementado seguindo a estrutura existente do Design System
- [ ] HTML semântico utilizado, com os atributos de acessibilidade necessários
- [ ] Todos os estilos utilizam tokens do Design System (sem valores brutos)
- [ ] Todas as variantes definidas no Figma estão implementadas
- [ ] Todos os estados do componente (padrão, hover, foco, desabilitado, etc.) estão implementados
- [ ] O comportamento visual corresponde à intenção do componente no Figma
- [ ] Convenções de nomenclatura consistentes com os componentes existentes
- [ ] Tokens de design ausentes ou não definidos são explicitamente reportados
- [ ] Doc e Story do Storybook criada e registrada corretamente
- [ ] Controles do Storybook refletem as propriedades do componente
- [ ] Variantes e estados documentados e testáveis no Storybook
- [ ] Documentação do componente explica claramente propósito e uso
- [ ] Considerações de acessibilidade documentadas
- [ ] Um breve resumo das decisões e lacunas identificadas é fornecido
