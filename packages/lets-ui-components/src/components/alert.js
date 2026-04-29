import { ensureElementId, mountMarkup } from '../internal.js';

const VARIANT_ICONS = {
  success: 'check-circle',
  caution: 'alert',
  danger: 'exclamation-circle',
  info: 'info-circle',
};

export class LuiAlert extends HTMLElement {
  static observedAttributes = [
    'variant',
    'title',
    'content',
    'primary-button',
    'secondary-button',
  ];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const baseId = ensureElementId(this, 'lui-alert');
    const variant = this.getAttribute('variant') ?? 'success';
    const title = this.getAttribute('title') ?? '';
    const content = this.getAttribute('content') ?? '';
    const primaryButton = this.getAttribute('primary-button') ?? '';
    const secondaryButton = this.getAttribute('secondary-button') ?? '';
    const hasActions = primaryButton || secondaryButton;
    const iconName = VARIANT_ICONS[variant] ?? VARIANT_ICONS.success;

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
        ${
          hasActions
            ? `
          <div class="alert__actions">
            ${secondaryButton ? `<button class="btn btn--secondary btn--lg">${secondaryButton}</button>` : ''}
            ${primaryButton ? `<button class="btn btn--primary btn--lg">${primaryButton}</button>` : ''}
          </div>
        `
            : ''
        }
      </div>
      `
    );
  }
}
