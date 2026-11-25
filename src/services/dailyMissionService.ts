import { loadVocabularyForLevel } from '../data/vocabulary';
import { VocabularyEntry } from '../types/vocabulary';

export const DAILY_MISSION_STORAGE_KEY = 'deutschmeister_daily_mission_v1';

export interface DailyMissionState {
  date: string; // YYYY-MM-DD
  step1LearnedIds: string[];
  step1Completed: boolean;
  step2Score: number;
  step2Completed: boolean;
  completed: boolean;
  completedAt?: string;
  streakDays: number;
  totalMissionsCompleted: number;
  xpEarned: number;
  badgeUnlocked: boolean;
}

export function getTodayDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime() + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Returns 5 curated A1 vocabulary entries deterministically based on date from a given word list.
 */
export function getDailyWordsFromList(words: VocabularyEntry[], dateStr?: string): VocabularyEntry[] {
  if (!words || words.length === 0) return [];
  const targetDate = dateStr ? new Date(`${dateStr}T12:00:00Z`) : new Date();
  const dayIndex = getDayOfYear(targetDate);
  const totalWords = words.length;
  const startIndex = (dayIndex * 5) % totalWords;

  const count = Math.min(5, totalWords);
  const selected: VocabularyEntry[] = [];
  for (let i = 0; i < count; i++) {
    selected.push(words[(startIndex + i) % totalWords]);
  }
  return selected;
}

/**
 * Loads A1 vocabulary dynamically and returns 5 curated entries deterministically for the day.
 */
export async function getDailyWords(dateStr?: string): Promise<VocabularyEntry[]> {
  const a1Words = await loadVocabularyForLevel('A1');
  return getDailyWordsFromList(a1Words, dateStr);
}

export function createDefaultDailyMission(today: string, previousStreak = 0, previousTotal = 0): DailyMissionState {
  return {
    date: today,
    step1LearnedIds: [],
    step1Completed: false,
    step2Score: 0,
    step2Completed: false,
    completed: false,
    streakDays: previousStreak,
    totalMissionsCompleted: previousTotal,
    xpEarned: 0,
    badgeUnlocked: false,
  };
}

export function loadDailyMissionState(
  storage?: Pick<Storage, 'getItem'>,
  currentDateStr: string = getTodayDateString(),
): DailyMissionState {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) {
    return createDefaultDailyMission(currentDateStr);
  }

  try {
    const raw = store.getItem(DAILY_MISSION_STORAGE_KEY);
    if (!raw) {
      return createDefaultDailyMission(currentDateStr);
    }

    const parsed = JSON.parse(raw) as Partial<DailyMissionState>;
    if (parsed.date === currentDateStr) {
      return {
        date: currentDateStr,
        step1LearnedIds: Array.isArray(parsed.step1LearnedIds) ? parsed.step1LearnedIds : [],
        step1Completed: Boolean(parsed.step1Completed),
        step2Score: typeof parsed.step2Score === 'number' ? parsed.step2Score : 0,
        step2Completed: Boolean(parsed.step2Completed),
        completed: Boolean(parsed.completed),
        completedAt: parsed.completedAt,
        streakDays: typeof parsed.streakDays === 'number' ? parsed.streakDays : 0,
        totalMissionsCompleted:
          typeof parsed.totalMissionsCompleted === 'number' ? parsed.totalMissionsCompleted : 0,
        xpEarned: typeof parsed.xpEarned === 'number' ? parsed.xpEarned : 0,
        badgeUnlocked: Boolean(parsed.badgeUnlocked),
      };
    }

    // New Day: Check if yesterday was completed to keep or reset streak
    const prevDate = new Date(`${parsed.date}T12:00:00Z`);
    const today = new Date(`${currentDateStr}T12:00:00Z`);
    const dayDiff = Math.round((today.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));

    let nextStreak = 0;
    if (parsed.completed && dayDiff === 1) {
      nextStreak = typeof parsed.streakDays === 'number' ? parsed.streakDays : 1;
    } else if (parsed.completed && dayDiff > 1) {
      nextStreak = 0; // Streak broken
    }

    const totalCompleted = typeof parsed.totalMissionsCompleted === 'number' ? parsed.totalMissionsCompleted : 0;
    return createDefaultDailyMission(currentDateStr, nextStreak, totalCompleted);
  } catch {
    return createDefaultDailyMission(currentDateStr);
  }
}

export function saveDailyMissionState(
  state: DailyMissionState,
  storage?: Pick<Storage, 'setItem'>,
): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.setItem(DAILY_MISSION_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota errors
  }
}

export function completeStep1(
  state: DailyMissionState,
  learnedWordIds: string[],
): DailyMissionState {
  return {
    ...state,
    step1LearnedIds: Array.from(new Set([...state.step1LearnedIds, ...learnedWordIds])),
    step1Completed: true,
  };
}

export function completeStep2(
  state: DailyMissionState,
  quizScore: number,
): DailyMissionState {
  const isFinished = !state.completed;
  const newStreak = isFinished ? state.streakDays + 1 : state.streakDays;
  const newTotal = isFinished ? state.totalMissionsCompleted + 1 : state.totalMissionsCompleted;

  return {
    ...state,
    step2Score: quizScore,
    step2Completed: true,
    completed: true,
    completedAt: state.completedAt ?? new Date().toISOString(),
    streakDays: newStreak,
    totalMissionsCompleted: newTotal,
    xpEarned: state.xpEarned > 0 ? state.xpEarned : 50,
    badgeUnlocked: true,
  };
}
