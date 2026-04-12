import {
  ensureElementId,
  hasBooleanAttribute,
  mountMarkup,
  readSize,
} from '../internal.js';

export class LuiSelect extends HTMLElement {
  static observedAttributes = [
    'label',
    'options',
    'selected',
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
    const select = this.querySelector('select');
    if (!select) {
      return;
    }

    select.onchange = () => {
      this.setAttribute('selected', String(select.selectedIndex));
      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true })
      );
    };
  }

  render() {
    const baseId = ensureElementId(this, 'lui-select');
    const label = this.getAttribute('label') ?? '';
    const ariaLabel = this.getAttribute('aria-label') ?? (label || 'Select');
    const options = (
      this.getAttribute('options') ?? 'Option 1,Option 2,Option 3'
    )
      .split(',')
      .map((option) => option.trim())
      .filter(Boolean);
    const selected = Number(this.getAttribute('selected') ?? 0);
    const disabled = hasBooleanAttribute(this, 'disabled');
    const size = readSize(this, 'lg');

    const optionsHtml = options
      .map(
        (option, index) =>
          `<option ${index === selected ? 'selected' : ''}>${option}</option>`
      )
      .join('');

    mountMarkup(
      this,
      `
      <div class="form__group form__${size}">
        <label for="${baseId}-input">${label}</label>
        <select id="${baseId}-input" aria-label="${ariaLabel}" ${
          disabled ? 'disabled aria-disabled="true"' : ''
        }>
          ${optionsHtml}
        </select>
      </div>
      `
    );
  }
}
