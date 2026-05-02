<div align="center">
  <h1>Let's UI</h1>
  <p>
    An open-source, framework-agnostic design system built with well-structured design tokens
    and accessible Web Components.
  </p>

[![release](https://img.shields.io/github/v/release/mateusvillain/lets-ui?logo=github&logoColor=white)](https://github.com/mateusvillain/lets-ui/releases)
[![npm](https://img.shields.io/npm/v/@lets-ui/styles?label=npm&logo=npm)](https://www.npmjs.com/package/@lets-ui/styles)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/@lets-ui/styles?logo=jsdelivr&logoColor=white)](https://www.jsdelivr.com/package/npm/@lets-ui/styles)
[![Figma](https://img.shields.io/badge/figma-library-F24E1E?logo=figma&logoColor=white)](https://www.figma.com/community/file/1535276013550483080/lets-ui)
[![license](https://img.shields.io/npm/l/@lets-ui/styles)](LICENSE)

</div>

## About

Let's UI is a multi-brand design system built around a token-first approach. Design tokens are defined in JSON and compiled by [Terrazzo](https://github.com/terrazzoapp/terrazzo) into CSS custom properties and a Sass variables map, supporting light/dark themes and multiple brands via `data-theme` and `data-brand` attributes.

The system ships three publishable packages:

| Package | Description |
| --- | --- |
| [`@lets-ui/tokens`](packages/lets-ui-tokens) | CSS custom properties and SCSS variables |
| [`@lets-ui/styles`](packages/styles) | Component styles compiled to `letsui.min.css` |
| [`@lets-ui/components`](packages/lets-ui-components) | Vanilla JS Web Components (custom elements) |

A complete [Figma library](https://www.figma.com/community/file/1535276013550483080/lets-ui) and interactive [Storybook](https://mateusvillain.github.io/lets-ui/) are available alongside the code.

## Installation

### npm

Install only what you need:

```bash
# CSS styles only
npm install @lets-ui/styles

# CSS + Web Components
npm install @lets-ui/styles @lets-ui/components
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lets-ui/styles@latest/dist/letsui.min.css" />
```

## Usage

### CSS

```css
@import '@lets-ui/styles';
```

Or in HTML:

```html
<link rel="stylesheet" href="node_modules/@lets-ui/styles/dist/letsui.min.css" />
```

### Web Components

Import all components at once:

```js
import '@lets-ui/components';
```

Or import only what you use (tree-shakeable):

```js
import '@lets-ui/components/button';
import '@lets-ui/components/modal';
import '@lets-ui/components/input';
```

Then use the custom elements directly in HTML:

```html
<ui-button variant="primary">Click me</ui-button>
<ui-input label="Email" type="email"></ui-input>
<ui-modal trigger="open-btn">...</ui-modal>
```

### Theming

Apply a theme and brand via data attributes:

```html
<html data-theme="dark" data-brand="brand-name">
```

## Development

### Requirements

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/) 10+

### Setup

```bash
git clone https://github.com/mateusvillain/lets-ui.git
cd lets-ui
pnpm install
```

### Commands

```bash
pnpm build            # build all packages
pnpm storybook        # start Storybook on port 6006
pnpm lint             # lint CSS/SCSS and Markdown
```

## Contributing

Contributions are welcome. Please open an issue before submitting large changes.

This project uses [Conventional Commits](https://www.conventionalcommits.org/) and [Changesets](https://github.com/changesets/changesets) for versioning. Every PR that touches a published package must include a changeset:

```bash
pnpm changeset
```

See [`.changeset/README.md`](.changeset/README.md) for the full release flow.

## License

[MIT](LICENSE) — free to use, modify, and distribute.
