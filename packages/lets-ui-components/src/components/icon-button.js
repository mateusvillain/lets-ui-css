import { hasBooleanAttribute, mountMarkup, readSize } from '../internal.js';

export class LuiIconButton extends HTMLElement {
  static observedAttributes = [
    'size',
    'icon',
    'weight',
    'disabled',
    'aria-label',
  ];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const size = readSize(this, 'md');
    const icon = this.getAttribute('icon') ?? 'x';
    const weight = this.getAttribute('weight') ?? 'outline';
    const disabled = hasBooleanAttribute(this, 'disabled');
    const ariaLabel = this.getAttribute('aria-label') ?? icon;
    const weightClass = weight === 'solid' ? 'lui-solid' : 'lui';

    mountMarkup(
      this,
      `
      <button class="icon-button icon-button--${size}" aria-label="${ariaLabel}" ${
        disabled ? 'disabled aria-disabled="true"' : ''
      }>
        <i class="${weightClass} lui-${icon}" aria-hidden="true"></i>
      </button>
      `
    );
  }
}
