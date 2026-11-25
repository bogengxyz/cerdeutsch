import { useEffect, useMemo, useState } from 'react';
import { CEFRLevel } from '../../types/learning';
import { VocabularyEntry } from '../../types/vocabulary';

export type VocabularyLevel = 'A1' | 'A2' | 'B1' | 'B2';

export const VOCABULARY_COUNTS: Record<CEFRLevel, number> = {
  A1: 700,
  A2: 900,
  B1: 1100,
  B2: 1300,
};

export const TOTAL_VOCABULARY_COUNT = 4000;

export function getVocabularyCountByLevel(level: CEFRLevel): number {
  return VOCABULARY_COUNTS[level] ?? 0;
}

export function getLevelFromVocabId(vocabId: string): CEFRLevel | undefined {
  if (vocabId.startsWith('voc-a1-')) return 'A1';
  if (vocabId.startsWith('voc-a2-')) return 'A2';
  if (vocabId.startsWith('voc-b1-')) return 'B1';
  if (vocabId.startsWith('voc-b2-')) return 'B2';
  return undefined;
}

const VOCAB_LOADERS: Record<VocabularyLevel, () => Promise<VocabularyEntry[]>> = {
  A1: () => import('./a1').then((m) => m.A1_VOCAB_WORDS),
  A2: () => import('./a2').then((m) => m.A2_VOCAB_WORDS),
  B1: () => import('./b1').then((m) => m.B1_VOCAB_WORDS),
  B2: () => import('./b2').then((m) => m.B2_VOCAB_WORDS),
};

const VOCAB_CACHE = new Map<VocabularyLevel, VocabularyEntry[]>();
const PENDING_PROMISES = new Map<VocabularyLevel, Promise<VocabularyEntry[]>>();

/**
 * Dynamically loads vocabulary entries for a specific CEFR level.
 * Cached in memory so each level is only fetched once across the entire session.
 */
export async function loadVocabularyForLevel(level: VocabularyLevel): Promise<VocabularyEntry[]> {
  const cached = VOCAB_CACHE.get(level);
  if (cached) return cached;

  const pending = PENDING_PROMISES.get(level);
  if (pending) return pending;

  const loader = VOCAB_LOADERS[level];
  if (!loader) {
    return [];
  }

  const promise = loader()
    .then((words) => {
      VOCAB_CACHE.set(level, words);
      PENDING_PROMISES.delete(level);
      return words;
    })
    .catch((err) => {
      PENDING_PROMISES.delete(level);
      throw err;
    });

  PENDING_PROMISES.set(level, promise);
  return promise;
}

/**
 * Loads vocabulary for multiple CEFR levels concurrently.
 */
export async function loadVocabularyForLevels(
  levels: VocabularyLevel[],
): Promise<VocabularyEntry[]> {
  const arrays = await Promise.all(levels.map((lvl) => loadVocabularyForLevel(lvl)));
  return arrays.flat();
}

/**
 * Loads all 4,000 vocabulary entries across A1, A2, B1, and B2.
 */
export async function loadAllVocabulary(): Promise<VocabularyEntry[]> {
  return loadVocabularyForLevels(['A1', 'A2', 'B1', 'B2']);
}

export function isVocabularyLevelLoaded(level: VocabularyLevel): boolean {
  return VOCAB_CACHE.has(level);
}

/**
 * Returns any already-loaded vocabulary entries from the in-memory cache without awaiting.
 */
export function getLoadedVocabulary(level?: CEFRLevel | 'Alle'): VocabularyEntry[] {
  if (!level || level === 'Alle') {
    const all: VocabularyEntry[] = [];
    for (const lvl of ['A1', 'A2', 'B1', 'B2'] as const) {
      const cached = VOCAB_CACHE.get(lvl);
      if (cached) all.push(...cached);
    }
    return all;
  }
  return VOCAB_CACHE.get(level as VocabularyLevel) ?? [];
}

/**
 * React hook to lazily load and subscribe to vocabulary by CEFR level.
 */
export function useVocabulary(level: CEFRLevel | 'Alle'): {
  words: VocabularyEntry[];
  loading: boolean;
  error: Error | null;
} {
  const [words, setWords] = useState<VocabularyEntry[]>(() => getLoadedVocabulary(level));
  const [loading, setLoading] = useState<boolean>(() => {
    if (level === 'Alle') {
      return (['A1', 'A2', 'B1', 'B2'] as const).some((lvl) => !isVocabularyLevelLoaded(lvl));
    }
    return !isVocabularyLevelLoaded(level as VocabularyLevel);
  });
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;

    if (level === 'Alle') {
      const allLoaded = (['A1', 'A2', 'B1', 'B2'] as const).every((lvl) =>
        isVocabularyLevelLoaded(lvl),
      );
      if (allLoaded) {
        setWords(getLoadedVocabulary('Alle'));
        setLoading(false);
        return;
      }
      setLoading(true);
      void loadAllVocabulary()
        .then((loaded) => {
          if (!active) return;
          setWords(loaded);
          setLoading(false);
        })
        .catch((err) => {
          if (!active) return;
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        });
    } else {
      const lvl = level as VocabularyLevel;
      if (isVocabularyLevelLoaded(lvl)) {
        setWords(getLoadedVocabulary(lvl));
        setLoading(false);
        return;
      }
      setLoading(true);
      void loadVocabularyForLevel(lvl)
        .then((loaded) => {
          if (!active) return;
          setWords(loaded);
          setLoading(false);
        })
        .catch((err) => {
          if (!active) return;
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        });
    }

    return () => {
      active = false;
    };
  }, [level]);

  return { words, loading, error };
}

/**
 * React hook to lazily load only the levels required for a given list of bookmark IDs.
 */
export function useVocabularyForBookmarkIds(vocabIds: string[]): {
  words: VocabularyEntry[];
  loading: boolean;
} {
  const neededLevels = useMemo(() => {
    const set = new Set<VocabularyLevel>();
    for (const id of vocabIds) {
      const lvl = getLevelFromVocabId(id);
      if (lvl) set.add(lvl as VocabularyLevel);
    }
    return Array.from(set);
  }, [vocabIds]);

  const [words, setWords] = useState<VocabularyEntry[]>(() => getLoadedVocabulary());
  const [loading, setLoading] = useState<boolean>(() =>
    neededLevels.some((lvl) => !isVocabularyLevelLoaded(lvl)),
  );

  const neededLevelsKey = neededLevels.sort().join(',');

  useEffect(() => {
    if (neededLevels.length === 0) {
      setLoading(false);
      return;
    }
    const allLoaded = neededLevels.every((lvl) => isVocabularyLevelLoaded(lvl));
    if (allLoaded) {
      setWords(getLoadedVocabulary());
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    void loadVocabularyForLevels(neededLevels).then(() => {
      if (!active) return;
      setWords(getLoadedVocabulary());
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [neededLevelsKey]);

  return { words, loading };
}
