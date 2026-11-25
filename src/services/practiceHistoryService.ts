import { Exercise } from '../types/exercise';
import { WritingSpeakingHistoryEntry } from '../types/phase4';
import { QuestionAnswerValue } from './scoringService';

export const PRACTICE_HISTORY_STORAGE_KEY = 'deutschmeister_practice_history_v1';

type StorageReader = Pick<Storage, 'getItem'>;

export function loadPracticeHistory(storage?: StorageReader): WritingSpeakingHistoryEntry[] {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return [];
  try {
    const raw = store.getItem(PRACTICE_HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is WritingSpeakingHistoryEntry =>
        Boolean(item) &&
        typeof item.id === 'string' &&
        typeof item.exerciseId === 'string' &&
        (item.skill === 'schreiben' || item.skill === 'sprechen'),
    );
  } catch {
    return [];
  }
}

export function savePracticeHistory(
  entries: WritingSpeakingHistoryEntry[],
  storage?: Pick<Storage, 'setItem'>,
): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.setItem(PRACTICE_HISTORY_STORAGE_KEY, JSON.stringify(entries.slice(0, 60)));
  } catch {
    // Ignore storage quota errors
  }
}

export function clearPracticeHistory(storage?: Pick<Storage, 'removeItem'>): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.removeItem(PRACTICE_HISTORY_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

export function recordWritingSpeakingAttempt(
  current: WritingSpeakingHistoryEntry[],
  params: {
    exercise: Exercise;
    answers: Record<string, QuestionAnswerValue>;
    selfChecks: Record<string, boolean[]>;
    nowIso?: string;
  },
): WritingSpeakingHistoryEntry[] {
  const { exercise, answers, selfChecks, nowIso = new Date().toISOString() } = params;
  if (exercise.skill !== 'schreiben' && exercise.skill !== 'sprechen') {
    return current;
  }

  let totalChecklist = 0;
  let completedChecklist = 0;
  let totalWords = 0;

  for (const q of exercise.questions) {
    const list = q.checklist ?? [];
    const checks = selfChecks[q.id] ?? [];
    totalChecklist += list.length;
    completedChecklist += list.filter((_, idx) => Boolean(checks[idx])).length;

    const raw = answers[q.id];
    if (typeof raw === 'string' && raw.trim()) {
      totalWords += raw.trim().split(/\s+/).length;
    }
  }

  const selfCheckPercent =
    totalChecklist > 0 ? Math.round((completedChecklist / totalChecklist) * 100) : 100;

  const entry: WritingSpeakingHistoryEntry = {
    id: `${exercise.id}::${nowIso}`,
    exerciseId: exercise.id,
    title: exercise.title,
    skill: exercise.skill,
    level: exercise.level,
    topic: exercise.topic,
    completedAtIso: nowIso,
    wordCount: exercise.skill === 'schreiben' ? totalWords : undefined,
    selfCheckCompleted: completedChecklist,
    selfCheckTotal: totalChecklist,
    selfCheckPercent,
  };

  // Replace latest attempt for same day/exercise if toggled right after submission, else prepend
  const filtered = current.filter(
    (item) => !(item.exerciseId === exercise.id && item.completedAtIso === nowIso),
  );
  return [entry, ...filtered].slice(0, 60);
}
