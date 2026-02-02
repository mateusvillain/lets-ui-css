---
trigger: model_decision
description: Only apply this rule when the create-component workflow is executed.
---

# Components

## Creation

- DO NOT create a new component if an existing one already covers the use case.
- DO NOT duplicate components with small visual variations.
- Variations must be handled as:
  - modifiers
  - variants
  - documented properties
- If a change breaks compatibility, it must be flagged beforehand.
- NEVER invent new design tokens or use hardcoded values.
- ALWAYS compare the component variables and styles in Figma with the design system tokens.

## Documentation

- Every new component MUST be documented in Storybook.
- Updates to existing components MUST update the documentation.
- DO NOT create unrealistic examples or examples outside the expected usage.
- The documentation must reflect the real state of the code.
