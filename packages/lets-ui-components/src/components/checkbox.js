import {
  ensureElementId,
  hasBooleanAttribute,
  mountMarkup,
  readSize,
} from '../internal.js';

export class LuiCheckbox extends HTMLElement {
  static observedAttributes = [
    'label',
    'checked',
    'disabled',
    'size',
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
    const input = this.querySelector('input[type="checkbox"]');
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
    const baseId = ensureElementId(this, 'lui-checkbox');
    const label = this.getAttribute('label') ?? '';
    const ariaLabel = this.getAttribute('aria-label') ?? (label || 'Checkbox');
    const checked = hasBooleanAttribute(this, 'checked');
    const disabled = hasBooleanAttribute(this, 'disabled');
    const size = readSize(this, 'lg');

    mountMarkup(
      this,
      `
      <label class="checkbox checkbox--${size}">
        <input id="${baseId}-input" type="checkbox" aria-label="${ariaLabel}" ${
          checked ? 'checked' : ''
        } ${disabled ? 'disabled aria-disabled="true"' : ''}>
        <span id="${baseId}-label">${label}</span>
      </label>
      `
    );
  }
}
