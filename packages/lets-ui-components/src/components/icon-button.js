import { hasBooleanAttribute, mountMarkup, readSize } from '../internal.js';

export class LuiIconButton extends HTMLElement {
  static observedAttributes = ['size', 'icon', 'disabled', 'aria-label'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const size = readSize(this, 'md');
    const icon = this.getAttribute('icon') ?? 'add';
    const disabled = hasBooleanAttribute(this, 'disabled');
    const ariaLabel = this.getAttribute('aria-label') ?? icon;

    mountMarkup(
      this,
      `
      <button class="icon-button icon-button--${size}" aria-label="${ariaLabel}" ${
        disabled ? 'disabled aria-disabled="true"' : ''
      }>
        <i class="material-symbols-rounded" aria-hidden="true">${icon}</i>
      </button>
      `
    );
  }
}
