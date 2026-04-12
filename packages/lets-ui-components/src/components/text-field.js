import {
  ensureElementId,
  hasBooleanAttribute,
  mountMarkup,
  readSize,
} from '../internal.js';

export class LuiTextField extends HTMLElement {
  static observedAttributes = [
    'label',
    'placeholder',
    'size',
    'type',
    'disabled',
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
    const input = this.querySelector('input');
    if (!input) {
      return;
    }

    input.oninput = () => {
      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    };
  }

  render() {
    const baseId = ensureElementId(this, 'lui-text-field');
    const label = this.getAttribute('label') ?? '';
    const ariaLabel =
      this.getAttribute('aria-label') ?? (label || 'Text field');
    const placeholder = this.getAttribute('placeholder') ?? '';
    const size = readSize(this, 'lg');
    const type = this.getAttribute('type') ?? 'text';
    const disabled = hasBooleanAttribute(this, 'disabled');

    mountMarkup(
      this,
      `
      <div class="form__group form__${size}">
        <label for="${baseId}-input">${label}</label>
        <input
          id="${baseId}-input"
          type="${type}"
          aria-label="${ariaLabel}"
          placeholder="${placeholder}"
          ${disabled ? 'disabled aria-disabled="true"' : ''}
        >
      </div>
      `
    );
  }
}
