import {
  ensureElementId,
  hasBooleanAttribute,
  mountMarkup,
  readSize,
} from '../internal.js';

export class LuiModal extends HTMLElement {
  static observedAttributes = [
    'title',
    'body',
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
      this.captureInitialActions();
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
  }

  close() {
    this.removeAttribute('open');
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
    const trigger = this.querySelector('[data-modal-trigger]');
    const backdrop = this.querySelector('[data-modal-backdrop]');
    const dialog = this.querySelector('[data-modal-dialog]');
    const closeButtons = this.querySelectorAll('[data-modal-close]');
    const open = hasBooleanAttribute(this, 'open');

    if (trigger) {
      trigger.onclick = () => this.open();
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
    const body =
      this.getAttribute('body') ??
      'This is the modal body text. It defines the main content of the modal.';
    const size = readSize(this, 'md');
    const open = hasBooleanAttribute(this, 'open');
    const hideTrigger = hasBooleanAttribute(this, 'hide-trigger');
    const triggerLabel = this.getAttribute('trigger-label') ?? 'Open modal';
    const hasSlottedActions = Boolean(
      this._actionsHtml && this._actionsHtml.trim()
    );

    mountMarkup(
      this,
      `
      ${
        hideTrigger
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
            <p>${body}</p>
          </div>
          <div class="modal__footer">
            ${
              hasSlottedActions
                ? this._actionsHtml
                : `
              <button type="button" data-modal-close class="btn btn--secondary btn--lg">Cancel</button>
              <button type="button" data-modal-close class="btn btn--primary btn--lg">Confirm</button>
            `
            }
          </div>
        </div>
      </div>
      `
    );
  }
}
