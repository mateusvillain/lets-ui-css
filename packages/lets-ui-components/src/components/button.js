import { hasBooleanAttribute, mountMarkup, readSize } from '../internal.js';

export class LuiButton extends HTMLElement {
  static observedAttributes = [
    'variant',
    'size',
    'disabled',
    'label',
    'aria-label',
  ];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variant = this.getAttribute('variant') ?? 'primary';
    const size = readSize(this, 'lg');
    const disabled = hasBooleanAttribute(this, 'disabled');
    const label = this.getAttribute('label') ?? '';
    const ariaLabel = this.getAttribute('aria-label') ?? (label || 'Button');
    const classes = `btn btn--${variant} btn--${size}`;

    mountMarkup(
      this,
      `<button class="${classes}" aria-label="${ariaLabel}" ${
        disabled ? 'disabled aria-disabled="true"' : ''
      }>${label}</button>`
    );
  }
}
