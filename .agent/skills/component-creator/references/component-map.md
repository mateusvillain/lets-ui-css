# Let\'s UI Component Map

Usar este mapa para decidir se o componente já existe e em qual formato.

## Pastas Fonte

- SCSS: `packages/styles/src/components`
- Web Components: `packages/lets-ui-components/src/components`

## Componentes Mapeados

| Base name   | SCSS                | Web Component    | Observação                                    |
| ----------- | ------------------- | ---------------- | --------------------------------------------- |
| alert       | `_alert.scss`       | `alert.js`       | cobertura completa                            |
| breadcrumb  | `_breadcrumb.scss`  | `breadcrumb.js`  | `breadcrumb-item.js` existe como suporte      |
| button      | `_button.scss`      | `button.js`      | cobertura completa                            |
| card        | `_card.scss`        | `card.js`        | cobertura completa                            |
| checkbox    | `_checkbox.scss`    | `checkbox.js`    | cobertura completa                            |
| icon-button | `_icon-button.scss` | `icon-button.js` | cobertura completa                            |
| link        | `_link.scss`        | `link.js`        | cobertura completa                            |
| modal       | `_modal.scss`       | `modal.js`       | cobertura completa                            |
| select      | `_select.scss`      | `select.js`      | cobertura completa                            |
| tag         | `_tag.scss`         | `tag.js`         | cobertura completa                            |
| tooltip     | `_tooltip.scss`     | `tooltip.js`     | cobertura completa                            |
| text-field  | `_form.scss`        | `text-field.js`  | mapeamento indireto via estilos de formulário |
| navbar      | `_navbar.scss`      | não existe       | formato web component ausente                 |

## Arquivos de Apoio Obrigatórios

- Agregador SCSS: `packages/styles/src/components/_components.scss`
- Registro/export Web Components: `packages/lets-ui-components/src/index.js`
- Helpers Web Components: `packages/lets-ui-components/src/internal.js`
- Functions de token: `packages/utilities/src/_functions.scss`
- Mixins utilitários: `packages/utilities/src/_mixins.scss`
- Mapa de tokens SCSS: `packages/utilities/src/_tokens.map.scss`

## Checklist Rápido

1. Confirmar cobertura atual do componente (SCSS/Web Component).
2. Confirmar se precisa pedir link Figma (somente quando não existir no repositório).
3. Confirmar que não há valor bruto no SCSS e que há apenas tokens/functions/mixins.
4. Confirmar semântica HTML e acessibilidade.
5. Reportar pendências, se houver.
