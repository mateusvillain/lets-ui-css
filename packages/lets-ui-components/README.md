# lets-ui-components

Web Components package based on existing Let`s UI components and SCSS styles.

## Install

```bash
pnpm add lets-ui-components
```

## Usage

```js
import 'lets-ui-components';
```

```html
<lui-button label="Button" variant="primary" size="lg"></lui-button>
<lui-alert
  variant="success"
  title="Alert title"
  content="Description"
  actions
></lui-alert>
<lui-checkbox label="Checkbox label" size="lg"></lui-checkbox>
<lui-select
  label="Choose an option"
  options="Option 1,Option 2,Option 3"
></lui-select>
<lui-tag label="Tag" style="surface" variant="primary" size="md"></lui-tag>
<lui-tooltip text="Tooltip" position="top"></lui-tooltip>
```

## Available Components

- `lui-alert`
- `lui-breadcrumb`
- `lui-button`
- `lui-card`
- `lui-checkbox`
- `lui-icon-button`
- `lui-link`
- `lui-modal`
- `lui-select`
- `lui-tag`
- `lui-text-field`
- `lui-tooltip`
