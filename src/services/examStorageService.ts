import { ActiveExamSession, ExamAttemptRecord } from '../types/exam';

export const EXAM_SESSION_STORAGE_KEY = 'deutschmeister_exam_session_v1';
export const EXAM_HISTORY_STORAGE_KEY = 'deutschmeister_exam_history_v1';

type StorageReader = Pick<Storage, 'getItem'>;
type StorageWriter = Pick<Storage, 'setItem' | 'removeItem'>;

export function loadActiveExamSession(storage?: StorageReader): ActiveExamSession | null {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return null;
  try {
    const raw = store.getItem(EXAM_SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ActiveExamSession>;
    if (
      !parsed ||
      typeof parsed.sessionId !== 'string' ||
      typeof parsed.examId !== 'string' ||
      typeof parsed.startedAtMs !== 'number' ||
      typeof parsed.moduleStartedAtMs !== 'number'
    ) {
      return null;
    }

    return {
      sessionId: parsed.sessionId,
      examId: parsed.examId,
      provider: parsed.provider === 'telc' ? 'telc' : 'goethe',
      level: parsed.level ?? 'A1',
      mode: parsed.mode ?? 'full',
      selectedModuleKey: parsed.selectedModuleKey,
      activeModuleIndex: typeof parsed.activeModuleIndex === 'number' ? parsed.activeModuleIndex : 0,
      activeQuestionIndex:
        typeof parsed.activeQuestionIndex === 'number' ? parsed.activeQuestionIndex : 0,
      startedAtMs: parsed.startedAtMs,
      moduleStartedAtMs: parsed.moduleStartedAtMs,
      pausedAtMs: typeof parsed.pausedAtMs === 'number' ? parsed.pausedAtMs : undefined,
      totalPausedMs: typeof parsed.totalPausedMs === 'number' ? parsed.totalPausedMs : 0,
      isPaused: Boolean(parsed.isPaused),
      answers: parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {},
      flaggedQuestionIds: Array.isArray(parsed.flaggedQuestionIds) ? parsed.flaggedQuestionIds : [],
      submitted: Boolean(parsed.submitted),
      submittedAtIso: parsed.submittedAtIso,
    };
  } catch {
    return null;
  }
}

export function saveActiveExamSession(
  session: ActiveExamSession,
  storage?: Pick<Storage, 'setItem'>,
): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.setItem(EXAM_SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export function clearActiveExamSession(storage?: Pick<Storage, 'removeItem'>): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.removeItem(EXAM_SESSION_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

export function loadExamHistory(storage?: StorageReader): ExamAttemptRecord[] {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return [];
  try {
    const raw = store.getItem(EXAM_HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is ExamAttemptRecord =>
        Boolean(item) &&
        typeof item.attemptId === 'string' &&
        typeof item.examId === 'string' &&
        typeof item.submittedAtIso === 'string' &&
        Boolean(item.evaluation),
    );
  } catch {
    return [];
  }
}

export function saveExamHistory(
  records: ExamAttemptRecord[],
  storage?: Pick<Storage, 'setItem'>,
): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.setItem(EXAM_HISTORY_STORAGE_KEY, JSON.stringify(records.slice(0, 50)));
  } catch {
    // Ignore quota errors
  }
}

export function upsertExamAttemptRecord(
  attempt: ExamAttemptRecord,
  storage?: StorageReader & StorageWriter,
): ExamAttemptRecord[] {
  const current = loadExamHistory(storage);
  const filtered = current.filter((item) => item.attemptId !== attempt.attemptId);
  const next = [attempt, ...filtered].slice(0, 50);
  saveExamHistory(next, storage);
  return next;
}

export function deleteExamAttemptRecord(
  attemptId: string,
  storage?: StorageReader & StorageWriter,
): ExamAttemptRecord[] {
  const current = loadExamHistory(storage);
  const next = current.filter((item) => item.attemptId !== attemptId);
  saveExamHistory(next, storage);
  return next;
}
