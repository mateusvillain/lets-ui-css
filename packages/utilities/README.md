# utilities

SCSS utility functions and mixins for the Let's UI design system. All values are resolved from design tokens — never use hardcoded colors, spacing, or sizes in component SCSS.

## Setup

```scss
@use 'utilities/src/functions' as *;
@use 'utilities/src/mixins' as *;
```

---

## Functions

### Colors

#### `bg($category, $variant)`

Semantic background color.

| Parameter  | Values |
|------------|--------|
| `$category` | `surface` \| `container` |
| `$variant`  | `primary` \| `secondary` \| `info` \| `danger` \| `success` \| `caution` \| `neutral` \| `overlay`\* |

\* `overlay` is only available in the `container` category.

```scss
background-color: bg(container, primary);
background-color: bg(surface, danger);
background-color: bg(container, overlay);
```

---

#### `text($variant)`

Semantic text color.

| `$variant` | Use case |
|------------|----------|
| `heading` | Headings and prominent labels |
| `body` | Body copy |
| `inverse` | Text on dark/colored backgrounds |
| `error` | Error messages |
| `link` | Link text |
| `link-visited` | Visited link text |

```scss
color: text(body);
color: text(inverse);
color: text(error);
```

---

#### `icon($variant)`

Semantic icon color.

`$variant`: `primary` | `secondary` | `info` | `danger` | `success` | `caution` | `neutral` | `inverse`

```scss
fill: icon(primary);
color: icon(neutral);
```

---

#### `stroke($variant, $category)`

Semantic border color. `$category` defaults to `default`.

| `$category` | Available `$variant` values |
|-------------|----------------------------|
| `default` | `primary`, `secondary`, `caution`, `danger`, `info`, `success`, `neutral` |
| `subtle` | `neutral` |
| `hover` | `danger`, `neutral` |
| `pressed` | `danger`, `neutral` |

```scss
border-color: stroke(neutral);
border-color: stroke(neutral, subtle);
border-color: stroke(danger, hover);
```

---

#### `color($category, $scale)`

Primitive (raw) color from the palette. Prefer semantic functions above for component styling.

| `$category` | `$scale` |
|-------------|----------|
| `primary` \| `secondary` \| `blue` \| `gray` \| `green` \| `orange` \| `red` \| `violet` | `1` – `8` |

```scss
background-color: color(blue, 3);
color: color(gray, 7);
```

---

#### `hover($variant)` / `pressed($variant)`

Background colors for interactive states. Used internally by the `states` mixin.

`$variant`: `primary` | `secondary` | `danger` | `success` | `neutral`

```scss
background-color: hover(primary);
background-color: pressed(danger);
```

---

### Spacing

#### `fluid($size)`

Fluid (responsive, `clamp`-based) spacing. Use for padding, gap, and margin.

`$size`: `2` | `4` | `8` | `12` | `16` | `20` | `24` | `32` | `40` | `48` | `56` | `64` | `72` | `80`

```scss
padding: fluid(16);
gap: fluid(8);
```

---

#### `fixed($size)`

Fixed pixel spacing. Use when the value must not scale with viewport.

`$size`: `0` | `8` | `16` | `24` | `32` | `40`

```scss
padding: fixed(8);
margin-top: fixed(0);
```

---

### Borders

#### `radius($size)`

Border radius from the token scale.

`$size`: `xs` | `sm` | `md` | `lg` | `xl` | `circle` | `none`

```scss
border-radius: radius(md);
border-radius: radius(circle);
```

---

#### `width($size)`

Border width.

`$size`: `0` | `1` | `2`

```scss
border-width: width(1);
```

---

#### `focus-ring($variant)`

Box-shadow value for focus rings.

`$variant`: `primary` | `secondary` | `danger` | `success` | `neutral`

```scss
box-shadow: focus-ring(primary);
```

---

### Elevation

#### `elevation($layer)`

Box-shadow for elevation levels.

`$layer`: `base` | `hovered` | `floating` | `overlay`

```scss
box-shadow: elevation(floating);
```

---

### Opacity

#### `opacity($category)`

`$category`: `disabled` | `hidden` | `visible`

```scss
opacity: opacity(disabled);
```

---

### Typography

#### `size($size)`

Font size from the type scale.

`$size`: `3xl` | `2xl` | `1xl` | `lg` | `md` | `sm` | `1xs` | `2xs` | `3xs`

```scss
font-size: size(md);
```

---

#### `weight($weight)`

Font weight.

`$weight`: `regular` | `medium` | `semibold` | `bold`

```scss
font-weight: weight(semibold);
```

---

#### `font($font)`

Font family.

`$font`: `heading` | `body`

```scss
font-family: font(heading);
```

---

#### `line-height($line-height)`

Line height.

`$line-height`: `heading` | `body`

```scss
line-height: line-height(body);
```

---

#### `case($case)`

Text transform.

`$case`: `none` | `lowercase` | `uppercase`

```scss
text-transform: case(uppercase);
```

---

#### `decoration($decoration)`

Text decoration.

`$decoration`: `none` | `underline` | `line-through`

```scss
text-decoration: decoration(underline);
```

---

### Responsive

#### `breakpoint($name)`

Returns the raw breakpoint value. Primarily used inside `media-up` / `media-down`.

`$name`: `1xs` (320px) | `sm` (768px) | `md` (1024px) | `lg` (1280px) | `1xl` (1440px)

```scss
@media (min-width: breakpoint(md)) { ... }
```

---

## Mixins

### Layout

#### `flex($direction, $align, $justify, $gap, $wrap)`

Shorthand for `display: flex` with common properties.

| Parameter | Default | Values |
|-----------|---------|--------|
| `$direction` | `row` | any `flex-direction` value |
| `$align` | `center` | any `align-items` value |
| `$justify` | `flex-start` | any `justify-content` value |
| `$gap` | `0` | any gap value (use `fluid()` or `fixed()`) |
| `$wrap` | `nowrap` | `wrap` \| `nowrap` \| `wrap-reverse` |

```scss
@include flex(row, center, space-between, fluid(16));
@include flex(column, flex-start, flex-start, fluid(8), wrap);
```

---

#### `center($axis)`

Centers children with flexbox.

`$axis`: `both` (default) | `x` | `y`

```scss
@include center;          // centers on both axes
@include center(x);       // horizontal only
@include center(y);       // vertical only
```

---

#### `center-absolute`

Centers an element absolutely within its positioned parent using `transform`.

```scss
.overlay-icon {
  @include center-absolute;
}
```

---

### Responsive

#### `media-up($breakpoint)`

Applies styles at the given breakpoint and above (`min-width`).

#### `media-down($breakpoint)`

Applies styles below the given breakpoint (`max-width - 1px`).

`$breakpoint`: `1xs` | `sm` | `md` | `lg` | `1xl`

```scss
.card {
  padding: fluid(8);

  @include media-up(md) {
    padding: fluid(16);
  }

  @include media-down(sm) {
    display: none;
  }
}
```

---

### Interactive States

#### `states($variant, $focus-visible, $focus?)`

Applies hover, pressed, focus, and disabled states for interactive elements.

| Parameter | Description |
|-----------|-------------|
| `$variant` | Hover/pressed color variant: `primary` \| `secondary` \| `danger` \| `success` \| `neutral` |
| `$focus-visible` | Focus ring variant for keyboard navigation |
| `$focus` | Optional focus ring variant for programmatic focus |

```scss
.button {
  @include states(primary, primary);
}

.input {
  @include states(neutral, primary, primary);
}
```

Handles `:hover`, `:active`, `:focus-visible`, `:focus`, `:focus-within`, and disabled states (`:disabled`, `.is-disabled`, `[aria-disabled="true"]`).

---

#### `focus-ring($variant)`

Applies a focus-visible ring to the element directly.

`$variant`: `primary` | `secondary` | `danger` | `success` | `neutral`

```scss
.link {
  @include focus-ring(primary);
}
```

---

#### `disabled`

Applies disabled styles (cursor, opacity, no text-decoration) for `:disabled`, `.disabled`, and `[aria-disabled="true"]`.

```scss
.field {
  @include disabled;
}
```

---

### Typography

#### `font-scale($scale-name)`

Applies a complete typographic scale — `font`, `font-size`, `line-height`, `font-weight`, and `text-transform` — in a single declaration.

Available scales:

| `$scale-name` | Family | Size | Weight | Case |
|---------------|--------|------|--------|------|
| `display` | heading | 3xl | regular | none |
| `title` | heading | 2xl | bold | none |
| `headline` | heading | 1xl | semibold | none |
| `subtitle` | heading | lg | regular | none |
| `block-title` | heading | md | medium | none |
| `subheadline` | heading | sm | regular | none |
| `overtitle` | heading | 3xs | medium | uppercase |
| `body--lg` | body | 1xs | regular | none |
| `body--md` | body | 2xs | regular | none |
| `body--sm` | body | 3xs | regular | none |

```scss
h1 {
  @include font-scale(display);
}

p {
  @include font-scale(body--md);
}
```

---

### Accessibility

#### `sr-only`

Visually hides an element while keeping it accessible to screen readers.

```scss
.label {
  @include sr-only;
}
```

---

#### `no-select`

Disables text selection on an element.

```scss
.button {
  @include no-select;
}
```

---

## Flex Utility Classes

`_flex.scss` generates utility classes compiled into `dist/letsui.utilities.css`. These classes are available in any HTML consuming the compiled CSS.

| Category | Classes |
|----------|---------|
| Display | `.flex`, `.inline-flex` |
| Direction | `.flex-row`, `.flex-row-reverse`, `.flex-col`, `.flex-col-reverse` |
| Wrap | `.flex-wrap`, `.flex-nowrap`, `.flex-wrap-reverse` |
| Justify | `.justify-start`, `.justify-center`, `.justify-end`, `.justify-between`, `.justify-around`, `.justify-evenly` |
| Align items | `.items-start`, `.items-center`, `.items-end`, `.items-stretch`, `.items-baseline` |
| Align content | `.content-start`, `.content-center`, `.content-end`, `.content-between`, `.content-around` |
| Align self | `.self-start`, `.self-center`, `.self-end`, `.self-stretch` |
| Grow | `.flex-grow-0`, `.flex-grow-1` |
| Shrink | `.flex-shrink-0`, `.flex-shrink-1` |
