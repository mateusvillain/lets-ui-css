import {
  ensureElementId,
  hasBooleanAttribute,
  lockBodyScroll,
  mountMarkup,
  readSize,
  unlockBodyScroll,
} from '../internal.js';

function renderCloseIcon() {
  return `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M18 6L6 18"></path>
      <path d="M6 6L18 18"></path>
    </svg>
  `;
}

export class LuiDrawer extends HTMLElement {
  static observedAttributes = [
    'title',
    'size',
    'open',
    'trigger-label',
    'hide-trigger',
    'primary-button',
    'secondary-button',
    'close-on-backdrop',
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

      if (hasBooleanAttribute(this, 'open')) {
        this._syncOpenState(false);
      }
    });
  }

  attributeChangedCallback(name) {
    if (!this._initialized) {
      return;
    }

    if (name === 'open') {
      this._syncOpenState(true);
    } else {
      const wasOpen = this._isPanelOpen();

      this.render();
      this.attachEvents();

      if (wasOpen) {
        this._syncOpenState(false);
      }
    }
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

    const nodes = [];

    Array.from(this.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') {
        return;
      }

      nodes.push(
        node.nodeType === Node.ELEMENT_NODE ? node.outerHTML : node.textContent
      );
    });

    this._bodyHtml = nodes.join('');
    this._contentCaptured = true;
  }

  open() {
    this.setAttribute('open', '');
  }

  close() {
    this.removeAttribute('open');
  }

  _isPanelOpen() {
    return (
      this.querySelector('[data-drawer-panel]')?.classList.contains(
        'is-open'
      ) ?? false
    );
  }

  _syncOpenState(animate) {
    const isOpen = hasBooleanAttribute(this, 'open');
    const backdrop = this.querySelector('[data-drawer-backdrop]');
    const panel = this.querySelector('[data-drawer-panel]');
    const trigger = this.querySelector('[data-drawer-trigger]');

    if (!panel || !backdrop) {
      return;
    }

    if (isOpen) {
      panel.removeAttribute('inert');
      panel.setAttribute('aria-hidden', 'false');
      lockBodyScroll();

      if (animate) {
        requestAnimationFrame(() => {
          backdrop.classList.add('is-open');
          panel.classList.add('is-open');
        });
      } else {
        backdrop.classList.add('is-open');
        panel.classList.add('is-open');
      }

      if (trigger) {
        trigger.setAttribute('aria-expanded', 'true');
      }

      requestAnimationFrame(() => panel.focus());
    } else {
      backdrop.classList.remove('is-open');
      panel.classList.remove('is-open');
      unlockBodyScroll();

      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      }

      setTimeout(
        () => {
          if (!hasBooleanAttribute(this, 'open')) {
            panel.setAttribute('inert', '');
            panel.setAttribute('aria-hidden', 'true');

            if (trigger) {
              trigger.focus();
            }
          }
        },
        animate ? 300 : 0
      );
    }
  }

  trapFocus(event) {
    const panel = this.querySelector('[data-drawer-panel]');

    if (!panel) {
      return;
    }

    const focusable = Array.from(
      panel.querySelectorAll(
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
    const trigger = this.querySelector('[data-drawer-trigger]');
    const backdrop = this.querySelector('[data-drawer-backdrop]');
    const closeButtons = this.querySelectorAll('[data-drawer-close]');
    const closeOnBackdrop = hasBooleanAttribute(this, 'close-on-backdrop');

    if (trigger) {
      trigger.onclick = () => this.open();
    }

    closeButtons.forEach((btn) => {
      btn.onclick = () => this.close();
    });

    if (backdrop && closeOnBackdrop) {
      backdrop.onclick = (event) => {
        if (event.target === backdrop) {
          this.close();
        }
      };
    }
  }

  render() {
    const baseId = ensureElementId(this, 'lui-drawer');
    const title = this.getAttribute('title') ?? 'Drawer title';
    const size = readSize(this, 'md');
    const open = hasBooleanAttribute(this, 'open');
    const hideTrigger = hasBooleanAttribute(this, 'hide-trigger');
    const triggerLabel = this.getAttribute('trigger-label') ?? 'Abrir drawer';
    const primaryButton = this.getAttribute('primary-button') ?? '';
    const secondaryButton = this.getAttribute('secondary-button') ?? '';
    const hasActions = primaryButton || secondaryButton;

    mountMarkup(
      this,
      `
      ${
        hideTrigger
          ? ''
          : `<button
          type="button"
          data-drawer-trigger
          class="btn btn--primary btn--lg"
          aria-haspopup="dialog"
          aria-controls="${baseId}-panel"
          aria-expanded="${open ? 'true' : 'false'}"
        >${triggerLabel}</button>`
      }

      <div
        data-drawer-backdrop
        class="drawer-backdrop"
        aria-hidden="true"
      ></div>

      <div
        id="${baseId}-panel"
        data-drawer-panel
        class="drawer drawer--${size}"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="${baseId}-title"
        aria-hidden="true"
        inert
      >
        <div class="drawer__header">
          <span id="${baseId}-title" class="drawer__title">${title}</span>
          <button
            type="button"
            class="icon-button icon-button--md"
            data-drawer-close
            aria-label="Fechar drawer"
          >
            <i class="lui lui-x" aria-hidden="true"></i>
          </button>
        </div>

        <div class="drawer__body">
          ${this._bodyHtml ?? ''}
        </div>

        ${
          hasActions
            ? `
          <div class="drawer__footer">
            ${secondaryButton ? `<button type="button" data-drawer-close class="btn btn--secondary btn--lg">${secondaryButton}</button>` : ''}
            ${primaryButton ? `<button type="button" class="btn btn--primary btn--lg">${primaryButton}</button>` : ''}
          </div>
        `
            : ''
        }
      </div>
      `
    );
  }
}
