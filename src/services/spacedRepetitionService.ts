import { VocabularyEntry } from '../types/vocabulary';
import { FlashcardRating, FlashcardReviewRecord } from '../types/phase4';

export const SRS_STORAGE_KEY = 'deutschmeister_srs_v1';

type StorageReader = Pick<Storage, 'getItem'>;
type StorageWriter = Pick<Storage, 'setItem' | 'removeItem'>;

export function loadFlashcardSchedule(
  storage?: StorageReader,
): Record<string, FlashcardReviewRecord> {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return {};
  try {
    const raw = store.getItem(SRS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as Record<string, FlashcardReviewRecord>;
  } catch {
    return {};
  }
}

export function saveFlashcardSchedule(
  schedule: Record<string, FlashcardReviewRecord>,
  storage?: Pick<Storage, 'setItem'>,
): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.setItem(SRS_STORAGE_KEY, JSON.stringify(schedule));
  } catch {
    // Ignore storage quota errors
  }
}

export function clearFlashcardSchedule(storage?: Pick<Storage, 'removeItem'>): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.removeItem(SRS_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

export function calculateNextReviewRecord(
  vocabId: string,
  rating: FlashcardRating,
  previous?: FlashcardReviewRecord,
  nowMs: number = Date.now(),
): FlashcardReviewRecord {
  const prevReps = previous?.repetitions ?? 0;
  const prevInterval = previous?.intervalDays ?? 0;
  const prevDifficult = previous?.difficultCount ?? 0;

  let intervalDays = 0;
  let nextMs = nowMs;
  let repetitions = prevReps;
  let difficultCount = prevDifficult;

  switch (rating) {
    case 'wiederholen':
      // Same-session / short reminder (10 minutes)
      intervalDays = 0;
      nextMs = nowMs + 10 * 60 * 1000;
      repetitions = 0;
      difficultCount += 1;
      break;
    case 'schwierig':
      intervalDays = 1;
      nextMs = nowMs + 24 * 60 * 60 * 1000;
      repetitions = Math.max(1, prevReps);
      difficultCount += 1;
      break;
    case 'lernen':
      intervalDays = prevInterval >= 2 ? 3 : 2;
      nextMs = nowMs + intervalDays * 24 * 60 * 60 * 1000;
      repetitions = prevReps + 1;
      break;
    case 'gewusst': {
      if (prevInterval <= 1) {
        intervalDays = 4;
      } else if (prevInterval < 7) {
        intervalDays = 7;
      } else if (prevInterval < 14) {
        intervalDays = 14;
      } else {
        intervalDays = 30;
      }
      nextMs = nowMs + intervalDays * 24 * 60 * 60 * 1000;
      repetitions = prevReps + 1;
      break;
    }
  }

  return {
    vocabId,
    lastRating: rating,
    repetitions,
    intervalDays,
    lastReviewedAtIso: new Date(nowMs).toISOString(),
    nextReviewAtIso: new Date(nextMs).toISOString(),
    difficultCount,
  };
}

export function recordFlashcardReview(
  current: Record<string, FlashcardReviewRecord>,
  vocabId: string,
  rating: FlashcardRating,
  nowMs: number = Date.now(),
  storage?: Pick<Storage, 'setItem'> & StorageWriter,
): Record<string, FlashcardReviewRecord> {
  const updatedRecord = calculateNextReviewRecord(vocabId, rating, current[vocabId], nowMs);
  const next = {
    ...current,
    [vocabId]: updatedRecord,
  };
  saveFlashcardSchedule(next, storage);
  return next;
}

export function isFlashcardDue(
  record: FlashcardReviewRecord | undefined,
  nowMs: number = Date.now(),
): boolean {
  if (!record) return false;
  const dueMs = Date.parse(record.nextReviewAtIso);
  if (Number.isNaN(dueMs)) return true;
  return dueMs <= nowMs;
}

export function getDueFlashcardCount(
  schedule: Record<string, FlashcardReviewRecord>,
  nowMs: number = Date.now(),
): number {
  return Object.values(schedule).filter((rec) => isFlashcardDue(rec, nowMs)).length;
}

export function getDifficultFlashcardCount(
  schedule: Record<string, FlashcardReviewRecord>,
): number {
  return Object.values(schedule).filter(
    (rec) =>
      rec.lastRating === 'wiederholen' ||
      rec.lastRating === 'schwierig' ||
      rec.difficultCount > 0,
  ).length;
}

export function getDueFlashcards(
  vocabList: VocabularyEntry[],
  schedule: Record<string, FlashcardReviewRecord>,
  nowMs: number = Date.now(),
): VocabularyEntry[] {
  return vocabList.filter((item) => isFlashcardDue(schedule[item.id], nowMs));
}

export function getDifficultFlashcards(
  vocabList: VocabularyEntry[],
  schedule: Record<string, FlashcardReviewRecord>,
): VocabularyEntry[] {
  return vocabList.filter((item) => {
    const rec = schedule[item.id];
    if (!rec) return false;
    return (
      rec.lastRating === 'wiederholen' ||
      rec.lastRating === 'schwierig' ||
      rec.difficultCount > 0
    );
  });
}

export function getLearnedVocabularyCount(
  schedule: Record<string, FlashcardReviewRecord>,
): number {
  return Object.values(schedule).filter(
    (rec) => rec.lastRating === 'lernen' || rec.lastRating === 'gewusst' || rec.repetitions >= 1,
  ).length;
}
