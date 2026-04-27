# @lets-ui/tokens

Design tokens for the Let's UI design system — compiled as CSS custom properties and a SCSS variable map.

## Install

```bash
npm install @lets-ui/tokens
```

## Usage

### CSS (recommended)

```html
<link rel="stylesheet" href="node_modules/@lets-ui/tokens/dist/letsui.tokens.css" />
```

Or via JS bundler:

```js
import '@lets-ui/tokens';
```

### SCSS

```scss
@use '@lets-ui/tokens/scss';
```

## Theming

Tokens support light/dark themes and multi-brand via `data-theme` and `data-brand` attributes:

```html
<html data-brand="lets-ui" data-theme="light">
```

Switching theme at runtime:

```js
document.documentElement.setAttribute('data-theme', 'dark');
```
