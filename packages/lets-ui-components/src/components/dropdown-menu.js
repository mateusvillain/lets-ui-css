import {
  ensureElementId,
  hasBooleanAttribute,
  mountMarkup,
} from '../internal.js';

const CHEVRON_RIGHT = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" focusable="false" aria-hidden="true"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const FOCUSABLE_SELECTOR =
  'button, [href], input, [tabindex]:not([tabindex="-1"]), lui-button, lui-icon-button';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildShortcutHtml(shortcut) {
  const keys = shortcut
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);

  if (keys.length === 0) return '';

  const keysHtml = keys
    .map((key, i) => {
      const sep =
        i < keys.length - 1
          ? `<span class="shortcut__sep" aria-hidden="true">+</span>`
          : '';
      return `<kbd class="shortcut__key">${escapeHtml(key)}</kbd>${sep}`;
    })
    .join('');

  return `<span class="menu-item__shortcut shortcut" aria-label="${escapeHtml(keys.join(' + '))}" role="group">${keysHtml}</span>`;
}

const DIVIDER_TAGS = new Set(['lui-divider', 'lui-menu-divider']);
const ITEM_TAGS = new Set(['lui-menu-item', ...DIVIDER_TAGS]);

function buildItemsHtml(items) {
  return Array.from(items)
    .filter((child) => ITEM_TAGS.has(child.tagName?.toLowerCase()))
    .map((child) => {
      if (DIVIDER_TAGS.has(child.tagName.toLowerCase())) {
        return `<li role="separator" class="divider"></li>`;
      }

      const label = escapeHtml(child.getAttribute('label') ?? '');
      const shortcut = child.getAttribute('shortcut') ?? '';
      const disabled = hasBooleanAttribute(child, 'disabled');
      const variant = child.getAttribute('variant') ?? '';

      const submenuChildren = Array.from(child.children).filter((c) =>
        ITEM_TAGS.has(c.tagName.toLowerCase())
      );
      const hasSubmenu = submenuChildren.length > 0;

      const itemClasses = [
        'menu-item',
        variant === 'danger' ? 'menu-item--danger' : '',
      ]
        .filter(Boolean)
        .join(' ');

      const shortcutHtml = shortcut ? buildShortcutHtml(shortcut) : '';
      const chevronHtml = hasSubmenu
        ? `<span class="menu-item__chevron" aria-hidden="true">${CHEVRON_RIGHT}</span>`
        : '';
      const submenuHtml = hasSubmenu
        ? `<ul class="dropdown-menu__panel" role="menu">${buildItemsHtml(child.children)}</ul>`
        : '';

      return `
        <li role="presentation"${hasSubmenu ? ' class="menu-item--has-submenu"' : ''}>
          <button
            class="${itemClasses}"
            role="menuitem"
            type="button"
            ${disabled ? 'disabled aria-disabled="true"' : ''}
            ${hasSubmenu ? 'aria-haspopup="menu" aria-expanded="false"' : ''}
          >
            <span class="menu-item__label">${label}</span>
            ${shortcutHtml}
            ${chevronHtml}
          </button>
          ${submenuHtml}
        </li>
      `;
    })
    .join('');
}

export class LuiDropdownMenu extends HTMLElement {
  static observedAttributes = ['open'];

  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    this.handleDocumentClick = (event) => {
      if (!this.contains(event.target)) {
        this.close();
      }
    };

    this.handleDocumentKeydown = (event) => {
      if (!hasBooleanAttribute(this, 'open')) return;
      if (event.key === 'Escape') {
        this.close();
        this._focusTrigger();
      }
    };

    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('keydown', this.handleDocumentKeydown);

    queueMicrotask(() => {
      this.captureInitialContent();
      this.render();
      this.attachEvents();
    });
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleDocumentKeydown);
  }

  attributeChangedCallback() {
    if (!this._initialized) return;
    this._syncOpenState();
  }

  captureInitialContent() {
    if (this._contentCaptured) return;

    const triggerNodes = [];
    const itemNodes = [];

    Array.from(this.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '')
        return;

      const tag = node.tagName?.toLowerCase();
      if (ITEM_TAGS.has(tag)) {
        itemNodes.push(node);
      } else {
        triggerNodes.push(node.outerHTML ?? node.textContent ?? '');
      }
    });

    this._triggerHtml = triggerNodes.join('');
    this._itemsSnapshot = itemNodes;
    this._contentCaptured = true;
  }

  open() {
    this.setAttribute('open', '');
  }

  close() {
    this.removeAttribute('open');
  }

  toggle() {
    if (hasBooleanAttribute(this, 'open')) {
      this.close();
    } else {
      this.open();
    }
  }

  _syncOpenState() {
    const isOpen = hasBooleanAttribute(this, 'open');
    const panel = this.querySelector('[data-dropdown-panel]');
    const triggerWrapper = this.querySelector('[data-dropdown-trigger]');
    const focusable = triggerWrapper?.querySelector(FOCUSABLE_SELECTOR);
    const ariaTarget = focusable || triggerWrapper;

    panel?.classList.toggle('is-open', isOpen);
    ariaTarget?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    if (isOpen) {
      requestAnimationFrame(() => {
        const first = this.querySelector(
          '.dropdown-menu__panel > li > .menu-item:not([disabled]):not([aria-disabled="true"])'
        );
        first?.focus();
      });
    }
  }

  _focusTrigger() {
    const wrapper = this.querySelector('[data-dropdown-trigger]');
    const focusable = wrapper?.querySelector(FOCUSABLE_SELECTOR);
    (focusable || wrapper)?.focus();
  }

  attachEvents() {
    const triggerWrapper = this.querySelector('[data-dropdown-trigger]');
    const panel = this.querySelector('[data-dropdown-panel]');
    const isOpen = hasBooleanAttribute(this, 'open');

    if (triggerWrapper) {
      const focusable = triggerWrapper.querySelector(FOCUSABLE_SELECTOR);
      const ariaTarget = focusable || triggerWrapper;

      ariaTarget.setAttribute('aria-haspopup', 'menu');
      ariaTarget.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (panel?.id) {
        ariaTarget.setAttribute('aria-controls', panel.id);
      }

      triggerWrapper.onclick = (event) => {
        if (event.target.closest('[disabled], [aria-disabled="true"]')) return;
        this.toggle();
      };
    }

    if (panel) {
      panel.addEventListener('click', (event) => {
        const item = event.target.closest('.menu-item');
        if (!item) return;

        const li = item.parentElement;
        if (li?.classList.contains('menu-item--has-submenu')) return;

        const label = item
          .querySelector('.menu-item__label')
          ?.textContent?.trim();
        this.dispatchEvent(
          new CustomEvent('menu-select', {
            bubbles: true,
            composed: true,
            detail: { label },
          })
        );
        this.close();
      });

      panel.addEventListener('keydown', (event) => {
        const activePanel = event.target.closest('.dropdown-menu__panel');
        if (!activePanel) return;

        const items = Array.from(
          activePanel.querySelectorAll(
            ':scope > li > .menu-item:not([disabled]):not([aria-disabled="true"])'
          )
        );
        const focused = event.target.closest('.menu-item');
        const currentIndex = items.indexOf(focused);

        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            items[(currentIndex + 1) % items.length]?.focus();
            break;

          case 'ArrowUp':
            event.preventDefault();
            items[(currentIndex - 1 + items.length) % items.length]?.focus();
            break;

          case 'ArrowRight': {
            const li = focused?.parentElement;
            if (li?.classList.contains('menu-item--has-submenu')) {
              event.preventDefault();
              const submenuPanel = li.querySelector(
                ':scope > .dropdown-menu__panel'
              );
              const firstItem = submenuPanel?.querySelector(
                '.menu-item:not([disabled]):not([aria-disabled="true"])'
              );
              firstItem?.focus();
            }
            break;
          }

          case 'ArrowLeft': {
            const parentLi = activePanel.closest('.menu-item--has-submenu');
            if (parentLi) {
              event.preventDefault();
              parentLi.querySelector(':scope > .menu-item')?.focus();
            }
            break;
          }

          case 'Tab':
            this.close();
            break;
        }
      });
    }
  }

  render() {
    const baseId = ensureElementId(this, 'lui-dropdown-menu');
    const isOpen = hasBooleanAttribute(this, 'open');
    const triggerHtml = this._triggerHtml ?? '';
    const itemsHtml = this._itemsSnapshot
      ? buildItemsHtml(this._itemsSnapshot)
      : '';

    mountMarkup(
      this,
      `
      <div class="dropdown-menu">
        <span class="dropdown-menu__trigger" data-dropdown-trigger>${triggerHtml}</span>
        <ul
          id="${baseId}-panel"
          class="dropdown-menu__panel${isOpen ? ' is-open' : ''}"
          role="menu"
          data-dropdown-panel
        >
          ${itemsHtml}
        </ul>
      </div>
      `
    );
  }
}

export class LuiMenuItem extends HTMLElement {}
export class LuiMenuDivider extends HTMLElement {}
