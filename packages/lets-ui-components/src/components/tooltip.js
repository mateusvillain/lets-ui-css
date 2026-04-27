import { ensureElementId, mountMarkup } from '../internal.js';

const VALID_POSITIONS = new Set(['top', 'bottom', 'left', 'right']);
const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), lui-button, lui-icon-button, lui-link';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export class LuiTooltip extends HTMLElement {
  static observedAttributes = ['text', 'position', 'label', 'aria-label'];

  connectedCallback() {
    if (this._initialized) {
      return;
    }

    this._initialized = true;
    this.captureInitialTrigger();
    this.render();
  }

  attributeChangedCallback() {
    if (!this._initialized) {
      return;
    }

    this.render();
  }

  captureInitialTrigger() {
    if (this._triggerCaptured) {
      return;
    }

    const nodes = Array.from(this.childNodes).filter((node) => {
      return !(
        node.nodeType === Node.TEXT_NODE && node.textContent.trim() === ''
      );
    });

    this._triggerHtml = nodes
      .map((node) => node.outerHTML ?? node.textContent)
      .join('');
    this._triggerCaptured = true;
  }

  readPosition() {
    const position = this.getAttribute('position') ?? 'top';
    return VALID_POSITIONS.has(position) ? position : 'top';
  }

  render() {
    const baseId = ensureElementId(this, 'lui-tooltip');
    const text = this.getAttribute('text') ?? 'Tooltip';
    const position = this.readPosition();
    const label = this.getAttribute('label') ?? 'Mostrar tooltip';
    const ariaLabel =
      this.getAttribute('aria-label') ??
      (this._triggerHtml ? null : `${label}: ${text}`);
    const describedBy = `${baseId}-content`;
    const hasCustomTrigger = Boolean(
      this._triggerHtml && this._triggerHtml.trim()
    );
    const fallbackTrigger = `
      <button
        type="button"
        class="tooltip__trigger"
        data-tooltip-trigger
        aria-label="${escapeHtml(ariaLabel)}"
        aria-describedby="${describedBy}"
      >
        ${escapeHtml(label)}
      </button>
    `;

    mountMarkup(
      this,
      `
      <span class="tooltip tooltip--${position}">
        ${
          hasCustomTrigger
            ? `<span class="tooltip__trigger" data-tooltip-trigger>${this._triggerHtml}</span>`
            : fallbackTrigger
        }
        <span id="${describedBy}" class="tooltip__content" role="tooltip">${escapeHtml(text)}</span>
      </span>
      `
    );

    if (hasCustomTrigger) {
      this.connectCustomTrigger(describedBy);
    }
  }

  connectCustomTrigger(describedBy) {
    const trigger = this.querySelector('[data-tooltip-trigger]');
    if (!trigger) {
      return;
    }

    const focusables = Array.from(trigger.querySelectorAll(FOCUSABLE_SELECTOR));
    if (focusables.length > 0) {
      focusables.forEach((element) => {
        element.setAttribute('aria-describedby', describedBy);
      });
      return;
    }

    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('aria-describedby', describedBy);
  }
}
