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

export class LuiTextarea extends HTMLElement {
  static observedAttributes = [
    'label',
    'placeholder',
    'size',
    'value',
    'disabled',
    'optional',
    'optional-text',
    'hint',
    'error',
    'error-text',
    'maxlength',
    'rows',
    'resize',
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

  parseMaxLength() {
    const raw = this.getAttribute('maxlength');
    if (raw === null || raw === '') return null;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed <= 0) return null;
    return Math.floor(parsed);
  }

  readValueLength() {
    const textarea = this.querySelector('.textarea-field__input');
    return textarea?.value.length ?? 0;
  }

  updateCounter() {
    const counter = this.querySelector('[data-counter-value]');
    if (!counter) return;
    counter.textContent = `${this.readValueLength()}/${this.parseMaxLength()}`;
  }

  attachEvents() {
    const textarea = this.querySelector('.textarea-field__input');
    if (!textarea) return;

    textarea.oninput = () => {
      this.updateCounter();
      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    };

    textarea.onchange = () => {
      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true })
      );
    };
  }

  render() {
    const baseId = ensureElementId(this, 'lui-textarea');
    const labelRaw = this.getAttribute('label') ?? '';
    const label = escapeHtml(labelRaw);
    const ariaLabel = escapeAttribute(
      this.getAttribute('aria-label') ?? (labelRaw || 'Textarea')
    );
    const optional = hasBooleanAttribute(this, 'optional');
    const optionalText = escapeHtml(
      this.getAttribute('optional-text') ?? '(opcional)'
    );
    const placeholder = escapeAttribute(this.getAttribute('placeholder') ?? '');
    const hint = escapeHtml(this.getAttribute('hint') ?? '');
    const error = hasBooleanAttribute(this, 'error');
    const errorText = escapeHtml(
      this.getAttribute('error-text') ?? 'Campo obrigatório.'
    );
    const size = readSize(this, 'lg');
    const value = escapeHtml(this.getAttribute('value') ?? '');
    const disabled = hasBooleanAttribute(this, 'disabled');
    const maxLength = this.parseMaxLength();
    const counterEnabled = maxLength !== null;
    const message = error ? errorText : hint;
    const forceState = this.getAttribute('force-state');
    const forceStateClass =
      forceState === 'hovered'
        ? ' textarea-field--force-hover'
        : forceState === 'focused'
          ? ' textarea-field--force-focus'
          : '';
    const describedBy = message ? `${baseId}-message` : '';
    const rows = this.getAttribute('rows') ?? '4';
    const resize = this.getAttribute('resize') ?? 'vertical';
    const resizeValue =
      resize === 'none' ? 'none' : resize === 'both' ? 'both' : 'vertical';

    mountMarkup(
      this,
      `
      <div class="textarea-field textarea-field--${size}${disabled ? ' textarea-field--disabled' : ''}${error ? ' textarea-field--error' : ''}${forceStateClass}">
        <div class="textarea-field__head">
          <div class="textarea-field__label-wrap">
            <label for="${baseId}-input">${label}</label>
            ${optional ? `<span class="textarea-field__optional">${optionalText}</span>` : ''}
          </div>
          ${counterEnabled ? `<span class="textarea-field__counter" data-counter-value>${value.length}/${maxLength}</span>` : ''}
        </div>

        <label class="textarea-field__control" for="${baseId}-input">
          <textarea
            class="textarea-field__input"
            id="${baseId}-input"
            aria-label="${ariaLabel}"
            ${describedBy ? `aria-describedby="${describedBy}"` : ''}
            placeholder="${placeholder}"
            rows="${rows}"
            style="resize: ${resizeValue};"
            ${maxLength !== null ? `maxlength="${maxLength}"` : ''}
            ${disabled ? 'disabled aria-disabled="true"' : ''}
          >${value}</textarea>
        </label>

        ${message ? `<p id="${baseId}-message" class="textarea-field__message">${message}</p>` : ''}
      </div>
      `
    );
  }
}
