import { GRAMMAR_TOPICS, VOCABULARY_COUNTS } from '../data/curriculum';
import { ALL_EXERCISES } from '../data/exercises';
import { CEFRLevel, Exercise, ModuleSkill } from '../types/exercise';
import { ModuleType, SkillType } from '../types/learning';
import {
  ActivityEntry,
  ExerciseScoreRecord,
  IncorrectAnswerRecord,
  UserProgressState,
  UserSettings,
} from '../types/progress';
import { ExerciseEvaluationResult } from './scoringService';

export const PROGRESS_STORAGE_KEY = 'deutschmeister_progress_v1';
export const SETTINGS_STORAGE_KEY = 'deutschmeister_settings_v1';

export const DEFAULT_PROGRESS: UserProgressState = {
  currentLevel: 'A1',
  completedExerciseIds: ['a1-lesen-1', 'a1-hoeren-1', 'a1-sprechen-1'],
  completedGrammarIds: ['gram-a1-1'],
  completedTopics: ['A1:Begrüßung und Vorstellung'],
  bookmarkedVocabIds: ['voc-a1-1', 'voc-a2-1'],
  exerciseScores: {
    'a1-lesen-1': {
      score: 30,
      maxScore: 30,
      percentage: 100,
      completedAt: '2026-11-22T14:20:00.000Z',
    },
    'a1-hoeren-1': {
      score: 20,
      maxScore: 20,
      percentage: 100,
      completedAt: '2026-11-21T18:45:00.000Z',
    },
    'a1-sprechen-1': {
      score: 16,
      maxScore: 20,
      percentage: 80,
      completedAt: '2026-11-20T16:10:00.000Z',
    },
  },
  incorrectAnswers: [],
  dailyGoalMinutes: 30,
  todayMinutes: 20,
  lastLesson: {
    id: 'a1-lesen-2',
    title: 'Einladung und Speisekarte im Café',
    module: 'lesen',
    level: 'A1',
    progressPercent: 65,
  },
  skillScores: {
    lesen: 85,
    hoeren: 80,
    sprechen: 75,
    schreiben: 70,
  },
  recentActivities: [
    {
      id: 'act-1',
      title: 'Neue Kursteilnehmer im Deutschkurs',
      module: 'lesen',
      level: 'A1',
      scoreLabel: '100 %',
      timestampLabel: 'Heute, 14:20',
      completedAt: '2026-11-22T14:20:00.000Z',
    },
    {
      id: 'act-2',
      title: 'Durchsage am Hauptbahnhof',
      module: 'hoeren',
      level: 'A1',
      scoreLabel: '100 %',
      timestampLabel: 'Gestern, 18:45',
      completedAt: '2026-11-21T18:45:00.000Z',
    },
    {
      id: 'act-3',
      title: 'Personalpronomen, „sein“ und „haben“',
      module: 'grammatik',
      level: 'A1',
      scoreLabel: 'Abgeschlossen',
      timestampLabel: 'Vor 2 Tagen',
      completedAt: '2026-11-20T16:10:00.000Z',
    },
  ],
};

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  soundEnabled: true,
  autoPlayAudio: false,
  dailyTargetMinutes: 30,
  preferredLevel: 'A1',
  uiLanguage: 'id',
  onboardingCompleted: false,
  learningGoal: 'ausbildung',
};

export function loadProgress(storage?: Pick<Storage, 'getItem'>): UserProgressState {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return DEFAULT_PROGRESS;
  try {
    const raw = store.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<UserProgressState>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      skillScores: {
        ...DEFAULT_PROGRESS.skillScores,
        ...(parsed.skillScores ?? {}),
      },
      lastLesson: parsed.lastLesson ?? DEFAULT_PROGRESS.lastLesson,
      completedExerciseIds: Array.isArray(parsed.completedExerciseIds)
        ? parsed.completedExerciseIds
        : DEFAULT_PROGRESS.completedExerciseIds,
      completedGrammarIds: Array.isArray(parsed.completedGrammarIds)
        ? parsed.completedGrammarIds
        : DEFAULT_PROGRESS.completedGrammarIds,
      completedTopics: Array.isArray(parsed.completedTopics)
        ? parsed.completedTopics
        : DEFAULT_PROGRESS.completedTopics,
      bookmarkedVocabIds: Array.isArray(parsed.bookmarkedVocabIds)
        ? parsed.bookmarkedVocabIds
        : DEFAULT_PROGRESS.bookmarkedVocabIds,
      exerciseScores:
        parsed.exerciseScores && typeof parsed.exerciseScores === 'object'
          ? parsed.exerciseScores
          : DEFAULT_PROGRESS.exerciseScores,
      incorrectAnswers: Array.isArray(parsed.incorrectAnswers)
        ? parsed.incorrectAnswers
        : DEFAULT_PROGRESS.incorrectAnswers,
      recentActivities: Array.isArray(parsed.recentActivities)
        ? parsed.recentActivities
        : DEFAULT_PROGRESS.recentActivities,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(
  progress: UserProgressState,
  storage?: Pick<Storage, 'setItem'>,
): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export function loadSettings(storage?: Pick<Storage, 'getItem'>): UserSettings {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return DEFAULT_SETTINGS;
  try {
    const raw = store.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return {
      ...DEFAULT_SETTINGS,
      ...(JSON.parse(raw) as Partial<UserSettings>),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(
  settings: UserSettings,
  storage?: Pick<Storage, 'setItem'>,
): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage quota errors
  }
}

export function createEmptyProgress(
  preferredLevel: CEFRLevel = 'A1',
  dailyGoalMinutes = 30,
): UserProgressState {
  const firstMatch =
    ALL_EXERCISES.find((ex) => ex.level === preferredLevel && ex.skill === 'lesen') ??
    ALL_EXERCISES[0];

  return {
    currentLevel: preferredLevel,
    completedExerciseIds: [],
    completedGrammarIds: [],
    completedTopics: [],
    bookmarkedVocabIds: [],
    exerciseScores: {},
    incorrectAnswers: [],
    dailyGoalMinutes,
    todayMinutes: 0,
    lastLesson: {
      id: firstMatch.id,
      title: firstMatch.title,
      module: firstMatch.skill,
      level: preferredLevel,
      progressPercent: 0,
    },
    skillScores: {
      lesen: 0,
      hoeren: 0,
      sprechen: 0,
      schreiben: 0,
    },
    recentActivities: [],
  };
}

export function calculateOverallProgressPercent(progress: UserProgressState): number {
  const totalItems = ALL_EXERCISES.length + GRAMMAR_TOPICS.length;
  if (totalItems === 0) return 0;
  const completedCount =
    progress.completedExerciseIds.length + progress.completedGrammarIds.length;
  return Math.min(100, Math.round((completedCount / totalItems) * 100));
}

export function calculateLevelProgressPercent(
  progress: UserProgressState,
  level: CEFRLevel,
): number {
  const levelExercises = ALL_EXERCISES.filter((ex) => ex.level === level);
  const levelGrammar = GRAMMAR_TOPICS.filter((gr) => gr.level === level);
  const total = levelExercises.length + levelGrammar.length;
  if (total === 0) return 0;

  const doneExercises = levelExercises.filter((ex) =>
    progress.completedExerciseIds.includes(ex.id),
  ).length;
  const doneGrammar = levelGrammar.filter((gr) =>
    progress.completedGrammarIds.includes(gr.id),
  ).length;

  return Math.min(100, Math.round(((doneExercises + doneGrammar) / total) * 100));
}

export function calculateDailyGoalPercent(
  todayMinutes: number,
  dailyGoalMinutes: number,
): number {
  if (dailyGoalMinutes <= 0) return 100;
  return Math.min(100, Math.round((todayMinutes / dailyGoalMinutes) * 100));
}

export function recordExerciseCompletion(
  progress: UserProgressState,
  params: {
    exerciseId: string;
    title: string;
    skill: ModuleSkill;
    level: CEFRLevel;
    durationMinutes: number;
    scorePercent: number;
    score?: number;
    maxScore?: number;
  },
): UserProgressState {
  const nowIso = new Date().toISOString();
  const alreadyCompleted = progress.completedExerciseIds.includes(params.exerciseId);
  const completedExerciseIds = alreadyCompleted
    ? progress.completedExerciseIds
    : [...progress.completedExerciseIds, params.exerciseId];

  const isFourSkill =
    params.skill === 'lesen' ||
    params.skill === 'hoeren' ||
    params.skill === 'sprechen' ||
    params.skill === 'schreiben';

  const nextSkillScores = { ...progress.skillScores };
  if (isFourSkill) {
    const skillKey = params.skill as SkillType;
    const currentSkillScore = progress.skillScores[skillKey];
    nextSkillScores[skillKey] =
      currentSkillScore === 0
        ? params.scorePercent
        : Math.round((currentSkillScore + params.scorePercent) / 2);
  }

  const scoreRecord: ExerciseScoreRecord = {
    score: params.score ?? params.scorePercent,
    maxScore: params.maxScore ?? 100,
    percentage: params.scorePercent,
    completedAt: nowIso,
  };

  const newEntry: ActivityEntry = {
    id: `act-${Date.now()}`,
    title: params.title,
    module: params.skill,
    level: params.level,
    scoreLabel: `${params.scorePercent} %`,
    timestampLabel: 'Gerade eben',
    completedAt: nowIso,
  };

  return {
    ...progress,
    currentLevel: params.level,
    completedExerciseIds,
    exerciseScores: {
      ...progress.exerciseScores,
      [params.exerciseId]: scoreRecord,
    },
    todayMinutes: progress.todayMinutes + Math.max(5, Math.min(20, params.durationMinutes)),
    lastLesson: {
      id: params.exerciseId,
      title: params.title,
      module: params.skill,
      level: params.level,
      progressPercent: 100,
    },
    skillScores: nextSkillScores,
    recentActivities: [newEntry, ...progress.recentActivities].slice(0, 10),
  };
}

export function recordCompletedExerciseResult(
  progress: UserProgressState,
  exercise: Exercise,
  evaluation: ExerciseEvaluationResult,
): UserProgressState {
  const baseUpdated = recordExerciseCompletion(progress, {
    exerciseId: exercise.id,
    title: exercise.title,
    skill: exercise.skill,
    level: exercise.level,
    durationMinutes: exercise.durationMinutes,
    scorePercent: evaluation.percentage,
    score: evaluation.totalScore,
    maxScore: evaluation.maxScore,
  });

  const topicKey = `${exercise.level}:${exercise.topic}`;
  const completedTopics =
    evaluation.percentage >= 60 && !baseUpdated.completedTopics.includes(topicKey)
      ? [...baseUpdated.completedTopics, topicKey]
      : baseUpdated.completedTopics;

  const nowIso = new Date().toISOString();

  // Remove resolved questions from this exercise and record current incorrect objective ones
  const questionMap = new Map(exercise.questions.map((q) => [q.id, q]));
  const remainingMistakes = baseUpdated.incorrectAnswers.filter(
    (item) => item.exerciseId !== exercise.id,
  );

  const newMistakes: IncorrectAnswerRecord[] = evaluation.questionResults
    .filter((qr) => qr.isObjective && !qr.isCorrect)
    .map((qr) => {
      const q = questionMap.get(qr.questionId);
      return {
        exerciseId: exercise.id,
        questionId: qr.questionId,
        question: q?.question ?? '',
        userAnswer: qr.userAnswerLabel,
        correctAnswer: qr.expectedAnswerLabel,
        level: exercise.level,
        skill: exercise.skill,
        recordedAt: nowIso,
      };
    });

  return {
    ...baseUpdated,
    completedTopics,
    incorrectAnswers: [...newMistakes, ...remainingMistakes].slice(0, 40),
  };
}

export function toggleGrammarCompletion(
  progress: UserProgressState,
  grammarId: string,
  title: string,
  level: CEFRLevel,
): UserProgressState {
  const exists = progress.completedGrammarIds.includes(grammarId);
  const completedGrammarIds = exists
    ? progress.completedGrammarIds.filter((id) => id !== grammarId)
    : [...progress.completedGrammarIds, grammarId];

  const recentActivities = exists
    ? progress.recentActivities
    : [
        {
          id: `act-${Date.now()}`,
          title,
          module: 'grammatik' as ModuleType,
          level,
          scoreLabel: 'Gelernt',
          timestampLabel: 'Gerade eben',
          completedAt: new Date().toISOString(),
        },
        ...progress.recentActivities,
      ].slice(0, 10);

  return {
    ...progress,
    completedGrammarIds,
    todayMinutes: exists ? progress.todayMinutes : progress.todayMinutes + 5,
    recentActivities,
  };
}

export function toggleVocabBookmark(
  progress: UserProgressState,
  vocabId: string,
): UserProgressState {
  const exists = progress.bookmarkedVocabIds.includes(vocabId);
  return {
    ...progress,
    bookmarkedVocabIds: exists
      ? progress.bookmarkedVocabIds.filter((id) => id !== vocabId)
      : [...progress.bookmarkedVocabIds, vocabId],
  };
}

export function getLevelModuleCounts(level: CEFRLevel): Record<ModuleType, number> {
  return {
    lesen: ALL_EXERCISES.filter((e) => e.level === level && e.skill === 'lesen').length,
    hoeren: ALL_EXERCISES.filter((e) => e.level === level && e.skill === 'hoeren').length,
    sprechen: ALL_EXERCISES.filter((e) => e.level === level && e.skill === 'sprechen').length,
    schreiben: ALL_EXERCISES.filter((e) => e.level === level && e.skill === 'schreiben').length,
    grammatik:
      ALL_EXERCISES.filter((e) => e.level === level && e.skill === 'grammatik').length +
      GRAMMAR_TOPICS.filter((g) => g.level === level).length,
    wortschatz:
      ALL_EXERCISES.filter((e) => e.level === level && e.skill === 'wortschatz').length +
      VOCABULARY_COUNTS[level],
  };
}
