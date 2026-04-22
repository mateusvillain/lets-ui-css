import {
  ensureElementId,
  hasBooleanAttribute,
  mountMarkup,
} from '../internal.js';

function readVariant(element) {
  const v = element.getAttribute('variant') ?? 'line';
  return v === 'card' ? 'card' : 'line';
}

export class LuiTabs extends HTMLElement {
  static observedAttributes = ['variant', 'expand'];

  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    queueMicrotask(() => {
      this._captureContent();
      this._render();
      this._attachEvents();
    });
  }

  attributeChangedCallback() {
    if (!this._initialized) return;
    this._render();
    this._attachEvents();
  }

  _captureContent() {
    if (this._contentCaptured) return;

    const tabEls = Array.from(this.children).filter(
      (el) => el.tagName?.toLowerCase() === 'lui-tab'
    );

    this._tabs = tabEls.map((el) => ({
      label: el.getAttribute('label') ?? '',
      disabled: hasBooleanAttribute(el, 'disabled'),
      active: hasBooleanAttribute(el, 'active'),
      content: el.innerHTML,
    }));

    if (
      this._tabs.length > 0 &&
      !this._tabs.some((t) => t.active && !t.disabled)
    ) {
      const first = this._tabs.find((t) => !t.disabled);
      if (first) first.active = true;
    }

    this._contentCaptured = true;
  }

  _activateTab(index) {
    const tabs = this._tabs ?? [];
    if (!tabs[index] || tabs[index].disabled) return;

    tabs.forEach((t, i) => {
      t.active = i === index;
    });

    const tabEls = Array.from(this.querySelectorAll('[role="tab"]'));
    const panelEls = Array.from(this.querySelectorAll('[role="tabpanel"]'));

    tabEls.forEach((el, i) => {
      const isActive = i === index;
      el.setAttribute('aria-selected', isActive ? 'true' : 'false');
      el.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    panelEls.forEach((el, i) => {
      if (i === index) el.removeAttribute('hidden');
      else el.setAttribute('hidden', '');
    });

    tabEls[index]?.focus();

    this.dispatchEvent(
      new CustomEvent('tab-change', {
        bubbles: true,
        composed: true,
        detail: { index, label: tabs[index].label },
      })
    );
  }

  _attachEvents() {
    const tabList = this.querySelector('[role="tablist"]');
    if (!tabList) return;

    tabList.onclick = (event) => {
      const tab = event.target.closest('[role="tab"]');
      if (!tab) return;
      const allTabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
      this._activateTab(allTabs.indexOf(tab));
    };

    tabList.onkeydown = (event) => {
      const allTabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
      const currentIndex = allTabs.indexOf(document.activeElement);
      if (currentIndex === -1) return;

      const isEnabled = (el) =>
        !el.disabled && el.getAttribute('aria-disabled') !== 'true';

      switch (event.key) {
        case 'ArrowLeft': {
          event.preventDefault();
          for (let i = currentIndex - 1; i >= 0; i--) {
            if (isEnabled(allTabs[i])) {
              this._activateTab(i);
              break;
            }
          }
          break;
        }
        case 'ArrowRight': {
          event.preventDefault();
          for (let i = currentIndex + 1; i < allTabs.length; i++) {
            if (isEnabled(allTabs[i])) {
              this._activateTab(i);
              break;
            }
          }
          break;
        }
        case 'Home': {
          event.preventDefault();
          const first = allTabs.findIndex(isEnabled);
          if (first !== -1) this._activateTab(first);
          break;
        }
        case 'End': {
          event.preventDefault();
          for (let i = allTabs.length - 1; i >= 0; i--) {
            if (isEnabled(allTabs[i])) {
              this._activateTab(i);
              break;
            }
          }
          break;
        }
      }
    };
  }

  _render() {
    const baseId = ensureElementId(this, 'lui-tabs');
    const variant = readVariant(this);
    const expand = hasBooleanAttribute(this, 'expand');
    const tabs = this._tabs ?? [];

    const listClass = ['tabs__list', expand ? 'tabs__list--expand' : '']
      .filter(Boolean)
      .join(' ');

    const tabsHtml = tabs
      .map(
        (tab, i) => `
        <button
          id="${baseId}-tab-${i}"
          class="tab"
          role="tab"
          type="button"
          aria-selected="${tab.active ? 'true' : 'false'}"
          aria-controls="${baseId}-panel-${i}"
          tabindex="${tab.active ? '0' : '-1'}"
          ${tab.disabled ? 'disabled aria-disabled="true"' : ''}
        >${tab.label}</button>`
      )
      .join('');

    const panelsHtml = tabs
      .map(
        (tab, i) => `
        <div
          id="${baseId}-panel-${i}"
          class="tabs__panel"
          role="tabpanel"
          aria-labelledby="${baseId}-tab-${i}"
          ${tab.active ? '' : 'hidden'}
        >${tab.content}</div>`
      )
      .join('');

    mountMarkup(
      this,
      `
      <div class="tabs tabs--${variant}">
        <div class="${listClass}" role="tablist">
          ${tabsHtml}
        </div>
        ${panelsHtml}
      </div>
      `
    );
  }
}

export class LuiTab extends HTMLElement {}
