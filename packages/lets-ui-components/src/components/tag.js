import { hasBooleanAttribute, mountMarkup, readSize } from '../internal.js';

export class LuiTag extends HTMLElement {
  static observedAttributes = ['label', 'style', 'variant', 'size', 'circle'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const label = this.getAttribute('label') ?? 'Tag';
    const style = this.getAttribute('style') ?? 'surface';
    const variant = this.getAttribute('variant') ?? 'primary';
    const size = readSize(this, 'md');
    const circle = hasBooleanAttribute(this, 'circle');

    const classes = [
      `tag--${style}-${variant}`,
      `tag--${size}`,
      circle ? 'tag--circle' : '',
    ]
      .filter(Boolean)
      .join(' ');

    mountMarkup(this, `<div class="${classes}">${label}</div>`);
  }
}
