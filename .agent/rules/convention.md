---
trigger: always_on
---

# Rules — Code and Class Conventions

These rules define **mandatory conventions** for writing code and naming classes.
Any AI agent must follow them strictly.

## General naming conventions

- The naming pattern must follow the [BEM](https://getbem.com/naming/) methodology
- Classes use only lowercase letters and hyphens (`kebab-case`).
- DO NOT use camelCase, snake_case, or PascalCase in CSS classes.
- Existing prefixes and patterns MUST be respected.
- Names must be predictable and consistent throughout the project.

## Structures

- Structures MUST use the `__` affix (`__header`, `__body`, `__footer`, etc.).
- Structures MUST have clear naming that matches their purpose.

## Sizes

- Sizes MUST use exclusively the following suffixes:
  - `--xs`
  - `--sm`
  - `--md`
  - `--lg`
  - `--xl`
- DO NOT create alternative sizes (`--small`, `--big`, `--huge`, etc.).
- The absence of a suffix represents the default size (`md`).
- Sizes must not encode direct visual values (e.g. `--16`, `--24`).

Example:

```html
<button class="btn btn--lg"></button>
```

## Variants

- Variants MUST use the -- suffix.
- Variants should represent type or intent, not state.
- DO NOT mix variant with size.

```html
<button class="btn btn--primary"></button>
```

## Order and combination of classes

- Base class always comes first.
- Then variants.
- Then sizes.

```html
<button class="btn btn--primary btn--lg"></button>
```
