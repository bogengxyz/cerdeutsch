import { BookmarkCategory, BookmarkCollection } from '../types/phase4';

export const BOOKMARKS_STORAGE_KEY = 'deutschmeister_bookmarks_v1';

type StorageReader = Pick<Storage, 'getItem'>;

export function createEmptyBookmarks(initialVocabIds: string[] = []): BookmarkCollection {
  return {
    vocab: [...new Set(initialVocabIds)],
    grammar: [],
    lesen: [],
    hoeren: [],
    schreiben: [],
    sprechen: [],
    questions: [],
  };
}

export function loadBookmarks(
  fallbackVocabIds: string[] = [],
  storage?: StorageReader,
): BookmarkCollection {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return createEmptyBookmarks(fallbackVocabIds);
  try {
    const raw = store.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) return createEmptyBookmarks(fallbackVocabIds);
    const parsed = JSON.parse(raw) as Partial<BookmarkCollection>;
    return {
      vocab: Array.isArray(parsed.vocab)
        ? [...new Set([...parsed.vocab, ...fallbackVocabIds])]
        : [...new Set(fallbackVocabIds)],
      grammar: Array.isArray(parsed.grammar) ? [...new Set(parsed.grammar)] : [],
      lesen: Array.isArray(parsed.lesen) ? [...new Set(parsed.lesen)] : [],
      hoeren: Array.isArray(parsed.hoeren) ? [...new Set(parsed.hoeren)] : [],
      schreiben: Array.isArray(parsed.schreiben) ? [...new Set(parsed.schreiben)] : [],
      sprechen: Array.isArray(parsed.sprechen) ? [...new Set(parsed.sprechen)] : [],
      questions: Array.isArray(parsed.questions) ? [...new Set(parsed.questions)] : [],
    };
  } catch {
    return createEmptyBookmarks(fallbackVocabIds);
  }
}

export function saveBookmarks(
  bookmarks: BookmarkCollection,
  storage?: Pick<Storage, 'setItem'>,
): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
  } catch {
    // Ignore storage quota errors
  }
}

export function clearBookmarks(storage?: Pick<Storage, 'removeItem'>): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.removeItem(BOOKMARKS_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

export function toggleCategoryBookmark(
  collection: BookmarkCollection,
  category: BookmarkCategory,
  itemId: string,
): BookmarkCollection {
  const currentList = collection[category] ?? [];
  const exists = currentList.includes(itemId);
  return {
    ...collection,
    [category]: exists
      ? currentList.filter((id) => id !== itemId)
      : [...currentList, itemId],
  };
}

export function isItemBookmarked(
  collection: BookmarkCollection,
  category: BookmarkCategory,
  itemId: string,
): boolean {
  return (collection[category] ?? []).includes(itemId);
}

export function getTotalBookmarkCount(collection: BookmarkCollection): number {
  return (
    collection.vocab.length +
    collection.grammar.length +
    collection.lesen.length +
    collection.hoeren.length +
    collection.schreiben.length +
    collection.sprechen.length +
    (collection.questions?.length ?? 0)
  );
}
