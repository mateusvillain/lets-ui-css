import {
  ensureElementId,
  hasBooleanAttribute,
  lockBodyScroll,
  mountMarkup,
  readSize,
  unlockBodyScroll,
} from '../internal.js';

export class LuiModal extends HTMLElement {
  static observedAttributes = [
    'title',
    'size',
    'open',
    'trigger-label',
    'hide-trigger',
  ];

  connectedCallback() {
    if (this._initialized) {
      return;
    }

    this._initialized = true;
    this.handleDocumentKeydown = (event) => {
      if (!hasBooleanAttribute(this, 'open')) {
        return;
      }

      if (event.key === 'Escape') {
        this.close();
        return;
      }

      if (event.key === 'Tab') {
        this.trapFocus(event);
      }
    };

    document.addEventListener('keydown', this.handleDocumentKeydown);
    queueMicrotask(() => {
      this.captureInitialContent();
      this.render();
      this.attachEvents();
    });
  }

  attributeChangedCallback() {
    if (!this._initialized) {
      return;
    }

    this.render();
    this.attachEvents();
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleDocumentKeydown);
    if (hasBooleanAttribute(this, 'open')) {
      unlockBodyScroll();
    }
  }

  captureInitialContent() {
    if (this._contentCaptured) {
      return;
    }

    const triggers = [];
    const actions = [];
    const bodyNodes = [];

    Array.from(this.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') {
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      const slot = node.getAttribute('slot');

      if (slot === 'trigger') {
        triggers.push(node.outerHTML);
      } else if (slot === 'actions') {
        actions.push(node.outerHTML);
      } else {
        bodyNodes.push(node.outerHTML);
      }
    });

    this._triggerHtml = triggers.join('');
    this._actionsHtml = actions.join('');
    this._bodyHtml = bodyNodes.join('');
    this._contentCaptured = true;
  }

  open() {
    const openedModals = Array.from(
      document.querySelectorAll('lui-modal')
    ).filter((modal) => modal !== this && hasBooleanAttribute(modal, 'open'));

    openedModals.forEach((modal) => {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
    });

    this.setAttribute('open', '');
    lockBodyScroll();
  }

  close() {
    this.removeAttribute('open');
    unlockBodyScroll();
  }

  trapFocus(event) {
    const dialog = this.querySelector('[data-modal-dialog]');
    if (!dialog) {
      return;
    }

    const focusable = Array.from(
      dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled'));

    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const current = document.activeElement;

    if (!event.shiftKey && current === last) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && current === first) {
      event.preventDefault();
      last.focus();
    }
  }

  attachEvents() {
    const trigger =
      this.querySelector('[data-modal-trigger]') ??
      this.querySelector('[slot="trigger"]');
    const backdrop = this.querySelector('[data-modal-backdrop]');
    const dialog = this.querySelector('[data-modal-dialog]');
    const closeButtons = this.querySelectorAll('[data-modal-close]');
    const open = hasBooleanAttribute(this, 'open');

    if (trigger) {
      trigger.onclick = () => this.open();

      if (!trigger.hasAttribute('data-modal-trigger')) {
        trigger.setAttribute('aria-haspopup', 'dialog');
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (dialog) {
          trigger.setAttribute('aria-controls', dialog.id);
        }
      }
    }

    closeButtons.forEach((button) => {
      button.onclick = () => this.close();
    });

    if (backdrop && dialog) {
      backdrop.onclick = (event) => {
        if (event.target === backdrop) {
          this.close();
        }
      };
    }

    if (open && dialog) {
      requestAnimationFrame(() => dialog.focus());
    }
  }

  render() {
    const baseId = ensureElementId(this, 'lui-modal');
    const title = this.getAttribute('title') ?? 'Modal title';
    const size = readSize(this, 'md');
    const open = hasBooleanAttribute(this, 'open');
    const hideTrigger = hasBooleanAttribute(this, 'hide-trigger');
    const triggerLabel = this.getAttribute('trigger-label') ?? 'Open modal';
    const hasSlottedTrigger = Boolean(this._triggerHtml?.trim());
    const hasActions = Boolean(this._actionsHtml?.trim());

    mountMarkup(
      this,
      `
      ${
        hasSlottedTrigger
          ? this._triggerHtml
          : hideTrigger
            ? ''
            : `<button
          type="button"
          data-modal-trigger
          class="btn btn--primary btn--lg"
          aria-haspopup="dialog"
          aria-controls="${baseId}-dialog"
          aria-expanded="${open ? 'true' : 'false'}"
        >${triggerLabel}</button>`
      }

      <div
        data-modal-backdrop
        aria-hidden="${open ? 'false' : 'true'}"
        style="
          position: fixed;
          inset: 0;
          z-index: 1040;
          display: ${open ? 'flex' : 'none'};
          align-items: center;
          justify-content: center;
          background: rgb(0 0 0 / 40%);
          padding: 16px;
        "
      >
        <div
          id="${baseId}-dialog"
          data-modal-dialog
          class="modal modal--${size}"
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="${baseId}-title"
          aria-describedby="${baseId}-body"
        >
          <div id="${baseId}-title" class="modal__header">${title}</div>
          <div id="${baseId}-body" class="modal__body">
            ${this._bodyHtml ?? ''}
          </div>
          ${hasActions ? `<div class="modal__footer">${this._actionsHtml}</div>` : ''}
        </div>
      </div>
      `
    );
  }
}
