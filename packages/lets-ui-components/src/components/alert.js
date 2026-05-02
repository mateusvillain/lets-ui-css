import { ensureElementId, mountMarkup } from '../internal.js';

const VARIANT_ICONS = {
  success: 'check-circle',
  caution: 'alert',
  danger: 'exclamation-circle',
  info: 'info-circle',
};

export class LuiAlert extends HTMLElement {
  static observedAttributes = ['variant', 'title', 'content'];

  connectedCallback() {
    if (this._initialized) {
      return;
    }

    this._initialized = true;

    queueMicrotask(() => {
      this.captureInitialContent();
      this.render();
    });
  }

  attributeChangedCallback() {
    if (!this._initialized) {
      return;
    }

    this.render();
  }

  captureInitialContent() {
    if (this._contentCaptured) {
      return;
    }

    const actions = [];

    Array.from(this.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') {
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      if (node.getAttribute('slot') === 'actions') {
        actions.push(node.outerHTML);
      }
    });

    this._actionsHtml = actions.join('');
    this._contentCaptured = true;
  }

  render() {
    const baseId = ensureElementId(this, 'lui-alert');
    const rawVariant = this.getAttribute('variant') ?? 'success';
    const variant = VARIANT_ICONS[rawVariant] ? rawVariant : 'success';
    const title = this.getAttribute('title') ?? '';
    const content = this.getAttribute('content') ?? '';
    const iconName = VARIANT_ICONS[variant];
    const hasActions = Boolean(this._actionsHtml?.trim());

    mountMarkup(
      this,
      `
      <div
        class="alert alert--${variant}"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        aria-labelledby="${baseId}-title"
        aria-describedby="${baseId}-content"
      >
        <div class="alert__content">
          <i class="lui-solid lui-${iconName} alert__icon" aria-hidden="true"></i>
          <div class="alert__text">
            <p id="${baseId}-title" class="body--lg">${title}</p>
            <p id="${baseId}-content" class="body--lg">${content}</p>
          </div>
        </div>
        ${hasActions ? `<div class="alert__actions">${this._actionsHtml}</div>` : ''}
      </div>
      `
    );
  }
}
