import {
  ensureElementId,
  hasBooleanAttribute,
  mountMarkup,
  readSize,
} from '../internal.js';

export class LuiRadio extends HTMLElement {
  static observedAttributes = [
    'label',
    'checked',
    'disabled',
    'size',
    'name',
    'value',
    'aria-label',
  ];

  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  attributeChangedCallback() {
    this.render();
    this.attachEvents();
  }

  attachEvents() {
    const input = this.querySelector('input[type="radio"]');
    if (!input) {
      return;
    }

    input.onchange = () => {
      if (input.checked) {
        this.setAttribute('checked', '');
      } else {
        this.removeAttribute('checked');
      }

      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true })
      );
    };
  }

  render() {
    const baseId = ensureElementId(this, 'lui-radio');
    const label = this.getAttribute('label') ?? '';
    const ariaLabel = this.getAttribute('aria-label') ?? (label || 'Radio');
    const checked = hasBooleanAttribute(this, 'checked');
    const disabled = hasBooleanAttribute(this, 'disabled');
    const size = readSize(this, 'lg');
    const name = this.getAttribute('name') ?? '';
    const value = this.getAttribute('value') ?? '';

    mountMarkup(
      this,
      `
      <label class="radio radio--${size}">
        <input
          id="${baseId}-input"
          type="radio"
          aria-label="${ariaLabel}"
          ${name ? `name="${name}"` : ''}
          ${value ? `value="${value}"` : ''}
          ${checked ? 'checked' : ''}
          ${disabled ? 'disabled aria-disabled="true"' : ''}
        >
        <span id="${baseId}-label">${label}</span>
      </label>
      `
    );
  }
}
