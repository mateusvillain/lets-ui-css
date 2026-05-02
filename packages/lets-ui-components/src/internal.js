import { letsUiStyles } from '../dist/generated/lets-ui-styles.js';

const STYLE_ELEMENT_ID = 'lets-ui-components-styles';
let elementIdCounter = 0;

export function hasBooleanAttribute(element, name) {
  if (!element.hasAttribute(name)) {
    return false;
  }

  const value = element.getAttribute(name);
  return value !== 'false';
}

export function mountMarkup(host, markup) {
  if (!document.getElementById(STYLE_ELEMENT_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ELEMENT_ID;
    style.textContent = letsUiStyles;
    document.head.append(style);
  }

  host.innerHTML = markup;
}

export function readSize(element, fallback = 'md') {
  const size = element.getAttribute('size') ?? fallback;
  return size === 'xl' || size === 'lg' || size === 'md' || size === 'sm'
    ? size
    : fallback;
}

export function ensureElementId(element, prefix) {
  if (!element.__luiId) {
    elementIdCounter += 1;
    element.__luiId = `${prefix}-${elementIdCounter}`;
  }

  return element.__luiId;
}

export function lockBodyScroll() {
  const count = parseInt(document.body.dataset.luiLockCount || '0', 10);
  document.body.dataset.luiLockCount = count + 1;
  document.body.style.overflow = 'hidden';
}

export function unlockBodyScroll() {
  const count = Math.max(
    0,
    parseInt(document.body.dataset.luiLockCount || '0', 10) - 1
  );
  document.body.dataset.luiLockCount = count;
  if (count === 0) {
    document.body.style.overflow = '';
  }
}
