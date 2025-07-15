## 0.12.0

### Added
- Created `border.scss` and `spacing.scss` files with utility classes for borders and spacing
- Added new `fluid` and `scale` spacing options

### Changed
- Improved `flexbox.scss` code for better readability and maintenance
- Updated typographic scales using `clamp()` for better responsiveness

### Removed
- Removed `border-width` tokens with values of `8px`, `12px`, and `16px` due to low usage or inconsistency with the rest of the scale

## 0.11.0

### Added
- New modular scale system using [modularscale-sass](https://github.com/modularscale/modularscale-sass)

### Fixed
- Correct path to variables.css in style files

## 0.10.0

### Added
- Elevation tokens:
    - Base
    - Floating
    - Overlay
- Card

## 0.9.0

### Added
- New variants for tag:
    - Primary
    - Danger
    - Success
    - Neutral

## 0.8.2

### Added
- Button now has `.scss` file

## 0.8.1

### New
- Brand design tokens structure:
    - Primary and secondary color (light and dark)
    - Font-family for heading and body texts
    - Font-size for desktop and mobile devices
    - Border-radius default for brand interfaces

### Removed
- Classes for brand color and font-family from `baseline.css`.

## 0.8.0

### New
- Style Dictionary + Tokens Studio + GitHub connections

### Added
- All tokens in `.json` files

## 0.8.0

### Added
- Header

## 0.7.0

### Improvement
- Grid structure:
    - Now grid have 12 columns by default
    - New classes for large, medium and small devices.

## 0.6.0

### Improvement
- Hover, active and focus microinteraction

## 0.5.0

### New
- Baseline file to import all styles and components

## 0.4.0

### Added
- Navbar
- Grid for large and small screens

## 0.3.0

### Added
- Icon Button
- Icon font-family for tests

## 0.2.0

### Added
- 2 base components
    - Breadcrumb
    - Checkbox
    - Radio Button

## 0.2.0

### Added
- 2 base components
    - Text field
    - Select

## 0.1.0

### Added
- Initial project structure for the design system
- Components:
    - Button
    - Link
    - Tag
- Design tokens:
    - Primitive spacing tokens and styles
    - Primitive color tokens and styles
    - Primitive border tokens and styles
    - Primitive typography tokens and styles
    - Semantic color tokens
- Reset CSS and Flexbox styles included