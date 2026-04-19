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

function renderEyeIcon(visible) {
  if (visible) {
    return `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M3 3L21 21"></path>
        <path d="M10.58 10.58C10.21 10.95 10 11.46 10 12C10 13.1 10.9 14 12 14C12.54 14 13.05 13.79 13.42 13.42"></path>
        <path d="M9.88 5.09C10.56 4.86 11.27 4.75 12 4.75C19 4.75 22.5 12 22.5 12C21.95 13.03 21.29 13.96 20.54 14.76"></path>
        <path d="M6.05 6.05C4.28 7.26 2.92 9.05 1.5 12C1.5 12 5 19.25 12 19.25C13.95 19.25 15.64 18.69 17.09 17.84"></path>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M1.5 12C1.5 12 5 4.75 12 4.75C19 4.75 22.5 12 22.5 12C22.5 12 19 19.25 12 19.25C5 19.25 1.5 12 1.5 12Z"></path>
      <circle cx="12" cy="12" r="3.5"></circle>
    </svg>
  `;
}

function renderNumberStepIcon(isIncrement) {
  if (isIncrement) {
    return `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M12 5V19"></path>
        <path d="M5 12H19"></path>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M5 12H19"></path>
    </svg>
  `;
}

export class LuiInput extends HTMLElement {
  static observedAttributes = [
    'label',
    'placeholder',
    'size',
    'type',
    'value',
    'disabled',
    'optional',
    'optional-text',
    'hint',
    'error',
    'error-text',
    'counter',
    'maxlength',
    'icon',
    'prefix',
    'suffix',
    'force-state',
    'min',
    'max',
    'step',
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

  readType() {
    const type = (this.getAttribute('type') ?? 'text').toLowerCase();
    return type === 'password' || type === 'number' ? type : 'text';
  }

  parseMaxLength() {
    const raw = this.getAttribute('maxlength');
    if (raw === null || raw === '') {
      return null;
    }

    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }

    return Math.floor(parsed);
  }

  parseNumberAttribute(name, fallback = null) {
    const raw = this.getAttribute(name);
    if (raw === null || raw === '') {
      return fallback;
    }

    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  readStep() {
    return this.parseNumberAttribute('step', 1) ?? 1;
  }

  readValueLength() {
    const input = this.querySelector('.input-field__input');
    return input?.value.length ?? 0;
  }

  updateCounter() {
    const counter = this.querySelector('[data-counter-value]');
    if (!counter) {
      return;
    }

    const valueLength = this.readValueLength();
    const maxLength = this.parseMaxLength();

    counter.textContent =
      maxLength === null ? String(valueLength) : `${valueLength}/${maxLength}`;
  }

  updatePasswordVisualState() {
    const toggle = this.querySelector('[data-password-toggle]');
    const input = this.querySelector('.input-field__input');
    const inputType = this.readType();

    if (!toggle || !input || inputType !== 'password') {
      return;
    }

    input.type = this._passwordVisible ? 'text' : 'password';
    toggle.setAttribute(
      'aria-label',
      this._passwordVisible ? 'Ocultar senha' : 'Mostrar senha'
    );
    toggle.innerHTML = renderEyeIcon(this._passwordVisible);
  }

  clampNumberValue(rawValue) {
    const parsed = Number(rawValue);
    if (!Number.isFinite(parsed)) {
      return this.parseNumberAttribute('min', 0) ?? 0;
    }

    const min = this.parseNumberAttribute('min');
    const max = this.parseNumberAttribute('max');
    let next = parsed;

    if (min !== null) {
      next = Math.max(min, next);
    }

    if (max !== null) {
      next = Math.min(max, next);
    }

    return next;
  }

  applyNumberStep(delta) {
    const input = this.querySelector('.input-field__input');
    if (!input) {
      return;
    }

    const current = this.clampNumberValue(input.value);
    const next = this.clampNumberValue(current + delta * this.readStep());

    input.value = String(next);
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  attachEvents() {
    const input = this.querySelector('.input-field__input');
    if (!input) {
      return;
    }

    input.oninput = () => {
      if (this.readType() === 'number') {
        const normalized = this.clampNumberValue(input.value);
        input.value = String(normalized);
      }

      this.updateCounter();
      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    };

    input.onchange = () => {
      if (this.readType() === 'number') {
        const normalized = this.clampNumberValue(input.value);
        input.value = String(normalized);
      }

      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true })
      );
    };

    const passwordToggle = this.querySelector('[data-password-toggle]');
    if (passwordToggle) {
      passwordToggle.onclick = () => {
        this._passwordVisible = !this._passwordVisible;
        this.updatePasswordVisualState();
      };
    }

    const minusButton = this.querySelector('[data-number-step="decrement"]');
    if (minusButton) {
      minusButton.onclick = () => this.applyNumberStep(-1);
    }

    const plusButton = this.querySelector('[data-number-step="increment"]');
    if (plusButton) {
      plusButton.onclick = () => this.applyNumberStep(1);
    }
  }

  renderRegularInput({
    baseId,
    ariaLabel,
    describedBy,
    placeholder,
    value,
    disabled,
    inputType,
    maxLength,
    icon,
    prefix,
    suffix,
  }) {
    const isPassword = inputType === 'password';

    return `
      <div class="input-field__control">
        ${
          !isPassword && icon
            ? `
              <span class="input-field__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 2.25L14.78 7.88L21 8.79L16.5 13.18L17.56 19.38L12 16.46L6.44 19.38L7.5 13.18L3 8.79L9.22 7.88L12 2.25Z"></path>
                </svg>
              </span>
            `
            : ''
        }
        ${!isPassword && prefix ? `<span class="input-field__prefix">${prefix}</span>` : ''}
        <input
          class="input-field__input"
          id="${baseId}-input"
          type="${isPassword ? (this._passwordVisible ? 'text' : 'password') : 'text'}"
          aria-label="${ariaLabel}"
          ${describedBy ? `aria-describedby="${describedBy}"` : ''}
          placeholder="${placeholder}"
          value="${value}"
          ${maxLength !== null ? `maxlength="${maxLength}"` : ''}
          ${disabled ? 'disabled aria-disabled="true"' : ''}
        >
        ${
          isPassword
            ? `
              <button
                type="button"
                class="input-field__action"
                data-password-toggle
                aria-label="${this._passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}"
                ${disabled ? 'disabled aria-disabled="true"' : ''}
              >
                ${renderEyeIcon(this._passwordVisible)}
              </button>
            `
            : ''
        }
        ${!isPassword && suffix ? `<span class="input-field__suffix">${suffix}</span>` : ''}
      </div>
    `;
  }

  renderNumberInput({ baseId, ariaLabel, describedBy, value, disabled }) {
    const min = this.parseNumberAttribute('min');
    const max = this.parseNumberAttribute('max');
    const step = this.readStep();

    return `
      <div class="input-field__control input-field__control--number">
        <button
          type="button"
          class="input-field__step"
          data-number-step="decrement"
          aria-label="Diminuir valor"
          ${disabled ? 'disabled aria-disabled="true"' : ''}
        >
          ${renderNumberStepIcon(false)}
        </button>
        <input
          class="input-field__input input-field__input--number"
          id="${baseId}-input"
          type="number"
          aria-label="${ariaLabel}"
          ${describedBy ? `aria-describedby="${describedBy}"` : ''}
          value="${value || '1'}"
          step="${step}"
          ${min !== null ? `min="${min}"` : ''}
          ${max !== null ? `max="${max}"` : ''}
          ${disabled ? 'disabled aria-disabled="true"' : ''}
        >
        <button
          type="button"
          class="input-field__step"
          data-number-step="increment"
          aria-label="Aumentar valor"
          ${disabled ? 'disabled aria-disabled="true"' : ''}
        >
          ${renderNumberStepIcon(true)}
        </button>
      </div>
    `;
  }

  render() {
    const baseId = ensureElementId(this, 'lui-input');
    const labelRaw = this.getAttribute('label') ?? '';
    const label = escapeHtml(labelRaw);
    const inputType = this.readType();
    const ariaLabel = escapeAttribute(
      this.getAttribute('aria-label') ?? (labelRaw || 'Input')
    );
    const optional = hasBooleanAttribute(this, 'optional');
    const optionalText = escapeHtml(
      this.getAttribute('optional-text') ?? '(opcional)'
    );
    const placeholder = escapeAttribute(this.getAttribute('placeholder') ?? '');
    const prefix = escapeHtml(this.getAttribute('prefix') ?? '');
    const suffix = escapeHtml(this.getAttribute('suffix') ?? '');
    const hint = escapeHtml(this.getAttribute('hint') ?? '');
    const error = hasBooleanAttribute(this, 'error');
    const errorText = escapeHtml(
      this.getAttribute('error-text') ?? 'Campo obrigatório.'
    );
    const size = readSize(this, 'lg');
    const value = escapeAttribute(this.getAttribute('value') ?? '');
    const disabled = hasBooleanAttribute(this, 'disabled');
    const icon = hasBooleanAttribute(this, 'icon');
    const maxLength = this.parseMaxLength();
    const counterEnabled =
      inputType !== 'number' &&
      (hasBooleanAttribute(this, 'counter') || maxLength !== null);
    const message = error ? errorText : hint;
    const forceState = this.getAttribute('force-state');
    const forceStateClass =
      forceState === 'hovered'
        ? ' input-field--force-hover'
        : forceState === 'focused'
          ? ' input-field--force-focus'
          : '';
    const describedBy = message ? `${baseId}-message` : '';

    if (typeof this._passwordVisible !== 'boolean') {
      this._passwordVisible = false;
    }

    const typeClass = ` input-field--type-${inputType}`;

    const inputHtml =
      inputType === 'number'
        ? this.renderNumberInput({
            baseId,
            ariaLabel,
            describedBy,
            value,
            disabled,
          })
        : this.renderRegularInput({
            baseId,
            ariaLabel,
            describedBy,
            placeholder,
            value,
            disabled,
            inputType,
            maxLength,
            icon,
            prefix,
            suffix,
          });

    mountMarkup(
      this,
      `
      <div class="input-field input-field--${size}${typeClass}${disabled ? ' input-field--disabled' : ''}${error ? ' input-field--error' : ''}${icon ? ' input-field--with-icon' : ''}${prefix ? ' input-field--with-prefix' : ''}${suffix ? ' input-field--with-suffix' : ''}${forceStateClass}">
        <div class="input-field__head">
          <div class="input-field__label-wrap">
            <label for="${baseId}-input">${label}</label>
            ${optional ? `<span class="input-field__optional">${optionalText}</span>` : ''}
          </div>
          ${counterEnabled ? '<span class="input-field__counter" data-counter-value></span>' : ''}
        </div>

        ${inputHtml}

        ${
          message
            ? `<p id="${baseId}-message" class="input-field__message">${message}</p>`
            : ''
        }
      </div>
      `
    );

    this.updatePasswordVisualState();
    this.updateCounter();
  }
}
