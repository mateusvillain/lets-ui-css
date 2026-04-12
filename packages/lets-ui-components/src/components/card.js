import { ensureElementId, mountMarkup } from '../internal.js';

export class LuiCard extends HTMLElement {
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

  captureInitialContent() {
    if (this._cardContentCaptured) {
      return;
    }

    const actions = [];
    const cover = [];
    const content = [];

    Array.from(this.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') {
        return;
      }

      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.getAttribute('slot') === 'actions'
      ) {
        actions.push(node.outerHTML);
        return;
      }

      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.getAttribute('slot') === 'cover'
      ) {
        cover.push(node.outerHTML);
        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        content.push(node.outerHTML);
      } else {
        content.push(node.textContent);
      }
    });

    this._cardCoverHtml = cover.join('');
    this._cardContentHtml = content.join('');
    this._cardActionsHtml = actions.join('');
    this._cardContentCaptured = true;
  }

  render() {
    const baseId = ensureElementId(this, 'lui-card');
    const ariaLabel = this.getAttribute('aria-label') ?? 'Card';
    const hasCover = Boolean(this._cardCoverHtml && this._cardCoverHtml.trim());
    const hasActions = Boolean(
      this._cardActionsHtml && this._cardActionsHtml.trim()
    );

    mountMarkup(
      this,
      `
      <article class="card card__border" aria-label="${ariaLabel}" id="${baseId}">
        ${
          hasCover
            ? `<div class="card__cover">${this._cardCoverHtml ?? ''}</div>`
            : ''
        }
        <div class="card__body">
          ${this._cardContentHtml ?? ''}
          <div
            data-card-actions
            class="card-actions"
            role="group"
            aria-label="Card actions"
            style="display:${hasActions ? 'flex' : 'none'}"
          >
            ${this._cardActionsHtml ?? ''}
          </div>
        </div>
      </article>
      `
    );
  }
}
