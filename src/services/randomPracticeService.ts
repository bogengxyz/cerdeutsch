import {
  CEFRLevel,
  DifficultyLevel,
  Exercise,
  ModuleSkill,
  Question,
} from '../types/exercise';
import { resolveAudioStatusForPath } from '../data/audioManifest';
import { BookmarkCollection, MistakeRecord } from '../types/phase4';
import { isObjectiveQuestionType } from './scoringService';

export const RECENT_QUESTIONS_STORAGE_KEY = 'deutschmeister_recent_questions_v1';

export type PracticeSelectionMode = 'random' | 'topic' | 'incorrect' | 'bookmarked';
export type PracticeCountOption = 10 | 20 | 30 | 50 | 'all';

export interface RandomPracticeRequest {
  exercises: Exercise[];
  mode: PracticeSelectionMode;
  count: PracticeCountOption;
  level: CEFRLevel | 'Alle';
  skill: ModuleSkill | 'Alle';
  topic: string | 'Alle';
  difficulty: DifficultyLevel | 'Alle';
  mistakes?: MistakeRecord[];
  bookmarks?: BookmarkCollection;
  recentQuestionIds?: string[];
  includePendingAudio?: boolean;
  seed?: number;
}

export interface TaggedQuestionPoolItem {
  question: Question;
  exercise: Exercise;
}

export function loadRecentQuestionIds(storage?: Pick<Storage, 'getItem'>): string[] {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return [];
  try {
    const raw = store.getItem(RECENT_QUESTIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function saveRecentQuestionIds(
  ids: string[],
  storage?: Pick<Storage, 'setItem'>,
): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.setItem(RECENT_QUESTIONS_STORAGE_KEY, JSON.stringify(ids.slice(0, 300)));
  } catch {
    // Ignore storage errors
  }
}

export function recordRecentQuestionIds(
  current: string[],
  newlyCompletedQuestionIds: string[],
): string[] {
  const merged = [...newlyCompletedQuestionIds, ...current];
  return [...new Set(merged)].slice(0, 300);
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithRng<T>(items: T[], rng: () => number): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function attachSourceContext(item: TaggedQuestionPoolItem): Question {
  const { question, exercise } = item;
  const resolvedUrl = question.audioUrl ?? exercise.audioUrl;
  return {
    ...question,
    difficulty: question.difficulty ?? exercise.difficulty,
    passage: question.passage ?? exercise.passage,
    passageTitle: question.passageTitle ?? exercise.passageTitle,
    passageType: question.passageType ?? exercise.passageType,
    audioUrl: resolvedUrl,
    audioStatus: resolveAudioStatusForPath(resolvedUrl, question.audioStatus ?? exercise.audioStatus),
    transcript: question.transcript ?? exercise.transcript,
    sourceExerciseId: question.sourceExerciseId ?? exercise.id,
    sourceTopic: question.sourceTopic ?? exercise.topic,
    sourceLevel: question.sourceLevel ?? exercise.level,
    sourceSkill: question.sourceSkill ?? exercise.skill,
  };
}

export function collectObjectiveQuestionPool(
  request: RandomPracticeRequest,
): TaggedQuestionPoolItem[] {
  const {
    exercises,
    mode,
    level,
    skill,
    topic,
    difficulty,
    mistakes = [],
    bookmarks,
    includePendingAudio = false,
  } = request;

  const openMistakeQuestionIds = new Set(
    mistakes.filter((m) => !m.corrected).map((m) => m.questionId),
  );
  const allMistakeQuestionIds = new Set(mistakes.map((m) => m.questionId));
  const targetMistakeIds =
    openMistakeQuestionIds.size > 0 ? openMistakeQuestionIds : allMistakeQuestionIds;

  const bookmarkedQuestionIds = new Set(bookmarks?.questions ?? []);
  const bookmarkedExerciseIds = new Set([
    ...(bookmarks?.lesen ?? []),
    ...(bookmarks?.hoeren ?? []),
    ...(bookmarks?.schreiben ?? []),
    ...(bookmarks?.sprechen ?? []),
  ]);

  const seenQuestionIds = new Set<string>();
  const pool: TaggedQuestionPoolItem[] = [];

  for (const ex of exercises) {
    if (level !== 'Alle' && ex.level !== level) continue;
    if (skill !== 'Alle' && ex.skill !== skill) continue;
    if (topic !== 'Alle' && ex.topic.toLowerCase() !== topic.toLowerCase()) continue;

    // Exclude transcript-only listening exercises unless explicitly requested
    if (ex.skill === 'hoeren' && !includePendingAudio) {
      const effectiveStatus = resolveAudioStatusForPath(ex.audioUrl, ex.audioStatus ?? 'missing');
      const hasPlayableAudio = effectiveStatus === 'available' && Boolean(ex.audioUrl?.trim());
      if (!hasPlayableAudio) continue;
    }

    for (const q of ex.questions) {
      if (!isObjectiveQuestionType(q.type)) continue;
      if (seenQuestionIds.has(q.id)) continue;

      const qDifficulty = q.difficulty ?? ex.difficulty;
      if (difficulty !== 'Alle' && qDifficulty !== difficulty) continue;

      if (mode === 'incorrect' && !targetMistakeIds.has(q.id)) {
        continue;
      }

      if (
        mode === 'bookmarked' &&
        !bookmarkedQuestionIds.has(q.id) &&
        !bookmarkedExerciseIds.has(ex.id)
      ) {
        continue;
      }

      seenQuestionIds.add(q.id);
      pool.push({ question: q, exercise: ex });
    }
  }

  return pool;
}

export function buildRandomPracticeExercise(
  request: RandomPracticeRequest,
): Exercise | null {
  const pool = collectObjectiveQuestionPool(request);
  if (pool.length === 0) return null;

  const rng = mulberry32(request.seed ?? Date.now());
  const recentSet = new Set(request.recentQuestionIds ?? []);

  const unseen = pool.filter((item) => !recentSet.has(item.question.id));
  const seen = pool.filter((item) => recentSet.has(item.question.id));

  const shuffledUnseen = shuffleWithRng(unseen, rng);
  const shuffledSeen = shuffleWithRng(seen, rng);

  // Prefer unseen questions first to avoid immediate repetition
  const orderedPool = [...shuffledUnseen, ...shuffledSeen];

  const selectedItems =
    request.count === 'all' || request.mode === 'topic'
      ? orderedPool
      : orderedPool.slice(0, request.count);

  if (selectedItems.length === 0) return null;

  const questions = selectedItems.map(attachSourceContext);

  const effectiveLevel: CEFRLevel =
    request.level !== 'Alle'
      ? request.level
      : selectedItems[0].exercise.level;

  const effectiveSkill: ModuleSkill =
    request.skill !== 'Alle'
      ? request.skill
      : selectedItems[0].exercise.skill;

  const modeLabelMap: Record<PracticeSelectionMode, string> = {
    random: 'Zufallstraining',
    topic: 'Thementraining',
    incorrect: 'Fehler-Wiederholung',
    bookmarked: 'Gespeicherte Fragen',
  };

  const titleParts = [
    modeLabelMap[request.mode],
    request.level === 'Alle' ? 'A1–B2' : request.level,
    request.topic !== 'Alle' ? request.topic : null,
  ].filter(Boolean);

  return {
    id: `practice-${request.mode}-${Date.now()}`,
    level: effectiveLevel,
    skill: effectiveSkill,
    topic: request.topic !== 'Alle' ? request.topic : modeLabelMap[request.mode],
    title: titleParts.join(' · '),
    subtitle: `${questions.length} ausgewählte ${
      questions.length === 1 ? 'Aufgabe' : 'Aufgaben'
    } aus der Fragenbank`,
    learningObjectiveDe:
      request.mode === 'incorrect'
        ? 'Gezielte Wiederholung zuvor falsch beantworteter Fragen'
        : request.mode === 'bookmarked'
          ? 'Gezieltes Training deiner gespeicherten Fragen'
          : 'Abwechslungsreiches Training ohne sofortige Wiederholung',
    difficulty: request.difficulty === 'Alle' ? 'Mittel' : request.difficulty,
    durationMinutes: Math.max(5, Math.round(questions.length * 0.8)),
    formatLabel: `${modeLabelMap[request.mode]} · ${questions.length} Aufgaben`,
    instructions:
      'Bearbeite die ausgewählten Aufgaben nacheinander. Nach dem Prüfen erhältst du direkt die deutsche und indonesische Erklärung.',
    questions,
  };
}
