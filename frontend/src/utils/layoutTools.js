import defaultPublished from '../data/layout.published.json';
import defaultDraft from '../data/layout.draft.json';
import { validateLayoutData } from '../data/schema';

const DRAFT_KEY = 'nanda_layout_draft_v1';
const PUBLISHED_KEY = 'nanda_layout_published_v1';
const HISTORY_KEY = 'nanda_layout_history_v1';

// Internal listener system for reactive re-rendering
const listeners = new Set();

export function subscribeLayoutChanges(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

/**
 * 1. Read Published Layout (Auth public view)
 */
export function getPublishedLayout() {
  try {
    const raw = localStorage.getItem(PUBLISHED_KEY);
    if (!raw) return defaultPublished;
    const parsed = JSON.parse(raw);
    const validation = validateLayoutData(parsed);
    return validation.valid ? validation.data : defaultPublished;
  } catch (err) {
    console.warn('Failed to parse published layout, fallback to default:', err);
    return defaultPublished;
  }
}

/**
 * 2. Read Draft Layout (AI agent & editor view)
 */
export function getDraftLayout() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return defaultDraft;
    const parsed = JSON.parse(raw);
    const validation = validateLayoutData(parsed);
    return validation.valid ? validation.data : defaultDraft;
  } catch (err) {
    console.warn('Failed to parse draft layout, fallback to default draft:', err);
    return defaultDraft;
  }
}

/**
 * Save draft layout (internal helper with Zod validation)
 */
function saveDraftLayout(newLayout) {
  const validation = validateLayoutData(newLayout);
  if (!validation.valid) {
    console.error('Validation failed! Cannot save invalid draft data:', validation.error);
    return false;
  }
  localStorage.setItem(DRAFT_KEY, JSON.stringify(validation.data));
  notifyListeners();
  return true;
}

/**
 * 3. AI Agent Tool: updateElementPosition(id, x, y)
 */
export function updateElementPosition(id, x, y) {
  const layout = getDraftLayout();
  const updated = layout.map((item) => {
    if (item.id === id) {
      return { ...item, x, y };
    }
    return item;
  });
  return saveDraftLayout(updated);
}

/**
 * 4. AI Agent Tool: updateElementSize(id, width, height)
 */
export function updateElementSize(id, width, height) {
  const layout = getDraftLayout();
  const updated = layout.map((item) => {
    if (item.id === id) {
      return { ...item, width, height };
    }
    return item;
  });
  return saveDraftLayout(updated);
}

/**
 * 5. AI Agent Tool: reorderElements(idsInOrder)
 */
export function reorderElements(idsInOrder) {
  const layout = getDraftLayout();
  const itemMap = new Map(layout.map((item) => [item.id, item]));
  const reordered = [];

  idsInOrder.forEach((id) => {
    if (itemMap.has(id)) {
      reordered.push(itemMap.get(id));
      itemMap.delete(id);
    }
  });

  // Append remaining elements not specified
  itemMap.forEach((item) => reordered.push(item));
  return saveDraftLayout(reordered);
}

/**
 * 6. AI Agent Tool: updateElementContent(id, content)
 */
export function updateElementContent(id, newContent) {
  const layout = getDraftLayout();
  const updated = layout.map((item) => {
    if (item.id === id) {
      return { ...item, content: { ...(item.content || {}), ...newContent } };
    }
    return item;
  });
  return saveDraftLayout(updated);
}

/**
 * 7. AI Agent Tool: resetDraftToPublished()
 */
export function resetDraftToPublished() {
  const currentPublished = getPublishedLayout();
  return saveDraftLayout(currentPublished);
}

/**
 * 8. Mechanism: publishDraftLayout()
 * Copies draft -> published, creates snapshot entry in history
 */
export function publishDraftLayout() {
  const draft = getDraftLayout();
  const validation = validateLayoutData(draft);
  if (!validation.valid) {
    console.error('Cannot publish corrupted draft:', validation.error);
    return false;
  }

  // 1. Update Published Storage
  localStorage.setItem(PUBLISHED_KEY, JSON.stringify(validation.data));

  // 2. Create History Snapshot
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const snapshotKey = `published-${timestamp}`;
  const historyRaw = localStorage.getItem(HISTORY_KEY);
  const history = historyRaw ? JSON.parse(historyRaw) : [];

  history.unshift({
    timestamp,
    snapshotKey,
    data: validation.data,
  });

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 10))); // keep 10 latest snapshots
  notifyListeners();
  return true;
}

/**
 * Check if Edit Mode is enabled
 */
export function isEditModeAllowed() {
  if (typeof window === 'undefined') return false;
  const urlParams = new URLSearchParams(window.location.search);
  const isEditParam = urlParams.get('mode') === 'edit' || window.location.pathname === '/editor';
  const hasToken = localStorage.getItem('editModeToken') === 'true' || localStorage.getItem('editModeToken') === 'enabled';
  const envEnabled = import.meta.env.VITE_ENABLE_EDITOR !== 'false';
  
  return isEditParam && (hasToken || envEnabled);
}

// Expose tools to global window object so AI agent or console can invoke directly
if (typeof window !== 'undefined') {
  window.NandaLayoutTools = {
    getDraftLayout,
    getPublishedLayout,
    updateElementPosition,
    updateElementSize,
    reorderElements,
    updateElementContent,
    resetDraftToPublished,
    publishDraftLayout,
  };
}
