# @lets-ui/styles

Pre-compiled CSS stylesheet for the Let's UI design system. Includes all component styles, foundations, and resets. Use this package when you want CSS-only integration without JavaScript Web Components.

## Install

```bash
npm install @lets-ui/styles
```

## Usage

```html
<link rel="stylesheet" href="node_modules/@lets-ui/styles/dist/letsui.min.css" />
```

Or via JS bundler:

```js
import '@lets-ui/styles';
```

## Theming

Requires `@lets-ui/tokens` to be loaded for CSS custom properties:

```html
<link rel="stylesheet" href="node_modules/@lets-ui/tokens/dist/letsui.tokens.css" />
<link rel="stylesheet" href="node_modules/@lets-ui/styles/dist/letsui.min.css" />
```

Set the active theme and brand on the root element:

```html
<html data-brand="lets-ui" data-theme="light">
```
