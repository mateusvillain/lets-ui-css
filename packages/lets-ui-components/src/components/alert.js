import {
  ensureElementId,
  hasBooleanAttribute,
  mountMarkup,
} from '../internal.js';

export class LuiAlert extends HTMLElement {
  static observedAttributes = ['variant', 'title', 'content', 'actions'];

  connectedCallback() {
    if (this._initialized) {
      return;
    }

    this._initialized = true;
    queueMicrotask(() => {
      this.captureInitialActions();
      this.render();
    });
  }

  attributeChangedCallback() {
    if (!this._initialized) {
      return;
    }

    this.render();
  }

  captureInitialActions() {
    if (this._actionsCaptured) {
      return;
    }

    const actions = [];

    Array.from(this.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') {
        return;
      }

      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.getAttribute('slot') === 'actions'
      ) {
        actions.push(node.outerHTML);
      }
    });

    this._actionsHtml = actions.join('');
    this._actionsCaptured = true;
  }

  render() {
    const baseId = ensureElementId(this, 'lui-alert');
    const variant = this.getAttribute('variant') ?? 'success';
    const title = this.getAttribute('title') ?? '';
    const content = this.getAttribute('content') ?? '';
    const hasSlottedActions = Boolean(
      this._actionsHtml && this._actionsHtml.trim()
    );
    const actions = hasSlottedActions || hasBooleanAttribute(this, 'actions');

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
          <div class="alert__text">
            <p id="${baseId}-title" class="body--lg">${title}</p>
            <p id="${baseId}-content" class="body--lg">${content}</p>
          </div>
        </div>
        ${
          actions
            ? `
          <div class="alert__actions">
            ${
              hasSlottedActions
                ? this._actionsHtml
                : `
              <button class="btn btn--secondary btn--lg">Button</button>
              <button class="btn btn--primary btn--lg">Button</button>
            `
            }
          </div>
        `
            : ''
        }
      </div>
      `
    );
  }
}
