import { CEFRLevel, ModuleSkill } from './exercise';

export interface ExerciseScoreRecord {
  score: number;
  maxScore: number;
  percentage: number;
  completedAt: string;
}

export interface IncorrectAnswerRecord {
  exerciseId: string;
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  level: CEFRLevel;
  skill: ModuleSkill;
  recordedAt: string;
}

export interface ActivityEntry {
  id: string;
  title: string;
  module: ModuleSkill | 'pruefung';
  level: CEFRLevel;
  scoreLabel: string;
  timestampLabel: string;
  completedAt: string;
}

export interface UserProgressState {
  currentLevel: CEFRLevel;
  completedExerciseIds: string[];
  completedGrammarIds: string[];
  completedTopics: string[];
  bookmarkedVocabIds: string[];
  exerciseScores: Record<string, ExerciseScoreRecord>;
  incorrectAnswers: IncorrectAnswerRecord[];
  dailyGoalMinutes: number;
  todayMinutes: number;
  lastLesson: {
    id: string;
    title: string;
    module: ModuleSkill;
    level: CEFRLevel;
    progressPercent: number;
  };
  skillScores: Record<'lesen' | 'hoeren' | 'sprechen' | 'schreiben', number>;
  recentActivities: ActivityEntry[];
}

export type UILanguage = 'id' | 'de';

export type LearningGoal = 'ausbildung' | 'studium' | 'pruefung' | 'hobi';

export interface UserSettings {
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  autoPlayAudio: boolean;
  dailyTargetMinutes: number;
  preferredLevel: CEFRLevel;
  uiLanguage?: UILanguage;
  onboardingCompleted?: boolean;
  learningGoal?: LearningGoal;
  startingExperience?: 'beginner' | 'intermediate' | 'placement';
}
