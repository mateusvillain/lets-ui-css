import {
  ensureElementId,
  hasBooleanAttribute,
  mountMarkup,
  readSize,
} from '../internal.js';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', '&quot;');
}

export class LuiSelect extends HTMLElement {
  static observedAttributes = [
    'label',
    'options',
    'selected',
    'disabled',
    'size',
    'optional',
    'optional-text',
    'hint',
    'error',
    'error-text',
    'placeholder',
    'force-state',
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
    const select = this.querySelector('.native-select__input');
    if (!select) {
      return;
    }

    select.onchange = () => {
      this.setAttribute('selected', String(select.selectedIndex));
      this.setAttribute('value', select.value);
      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true })
      );
    };
  }

  render() {
    const baseId = ensureElementId(this, 'lui-select');
    const label = escapeHtml(this.getAttribute('label') ?? '');
    const ariaLabel = escapeAttribute(
      this.getAttribute('aria-label') ??
        (this.getAttribute('label') || 'Native select')
    );
    const options = (
      this.getAttribute('options') ?? 'Option 1,Option 2,Option 3'
    )
      .split(',')
      .map((option) => option.trim())
      .filter(Boolean);
    const selected = Number(this.getAttribute('selected') ?? 0);
    const disabled = hasBooleanAttribute(this, 'disabled');
    const size = readSize(this, 'lg');
    const optional = hasBooleanAttribute(this, 'optional');
    const optionalText = escapeHtml(
      this.getAttribute('optional-text') ?? '(opcional)'
    );
    const hint = escapeHtml(this.getAttribute('hint') ?? '');
    const error = hasBooleanAttribute(this, 'error');
    const errorText = escapeHtml(
      this.getAttribute('error-text') ?? 'Campo obrigatório.'
    );
    const placeholder = escapeHtml(
      this.getAttribute('placeholder') ?? 'Select an option'
    );
    const forceState = this.getAttribute('force-state');
    const forceStateClass =
      forceState === 'hovered'
        ? ' native-select--force-hover'
        : forceState === 'focused'
          ? ' native-select--force-focus'
          : '';
    const selectedIndex = Number.isFinite(selected) ? Math.max(selected, 0) : 0;
    const hasSelectedOption = selectedIndex > 0;
    const message = error ? errorText : hint;
    const describedBy = message ? `${baseId}-message` : '';

    const optionsHtml = options
      .map(
        (option, index) =>
          `<option value="${escapeAttribute(option)}" ${index + 1 === selectedIndex ? 'selected' : ''}>${escapeHtml(option)}</option>`
      )
      .join('');

    mountMarkup(
      this,
      `
      <div class="native-select native-select--${size}${disabled ? ' native-select--disabled' : ''}${error ? ' native-select--error' : ''}${!hasSelectedOption ? ' native-select--placeholder' : ''}${forceStateClass}">
        <div class="native-select__head">
          <div class="native-select__label-wrap">
            <label for="${baseId}-input">${label}</label>
            ${optional ? `<span class="native-select__optional">${optionalText}</span>` : ''}
          </div>
        </div>

        <div class="native-select__control">
          <select
            class="native-select__input"
            id="${baseId}-input"
            aria-label="${ariaLabel}"
            ${describedBy ? `aria-describedby="${describedBy}"` : ''}
            ${disabled ? 'disabled aria-disabled="true"' : ''}
          >
            <option value="" ${hasSelectedOption ? '' : 'selected'} disabled hidden>${placeholder}</option>
            ${optionsHtml}
          </select>
          <span class="native-select__arrow" aria-hidden="true">
            <svg viewBox="0 0 14 7" focusable="false">
              <path d="M1 1L7 6L13 1"></path>
            </svg>
          </span>
        </div>

        ${
          message
            ? `<p id="${baseId}-message" class="native-select__message">${message}</p>`
            : ''
        }
      </div>
      `
    );

    const selectElement = this.querySelector('.native-select__input');
    if (selectElement) {
      const option = selectElement.options[selectElement.selectedIndex];
      const selectedValue = String(selectElement.selectedIndex);
      const value = option?.value ?? '';

      if (this.getAttribute('selected') !== selectedValue) {
        this.setAttribute('selected', selectedValue);
      }

      if ((this.getAttribute('value') ?? '') !== value) {
        this.setAttribute('value', value);
      }
    }
  }
}

export class LuiNativeSelect extends LuiSelect {}
