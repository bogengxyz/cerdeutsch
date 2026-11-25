export type { CEFRLevel, ModuleSkill as ModuleType } from './exercise';
export type { ActivityEntry, UserProgressState, UserSettings } from './progress';
export type { VocabularyEntry as VocabWord } from './vocabulary';

import { CEFRLevel } from './exercise';

export type SkillType = 'lesen' | 'hoeren' | 'sprechen' | 'schreiben';
export type ExamBoard = 'goethe' | 'telc';
export type ThemeMode = 'light' | 'dark';

export type NavPage =
  | 'startseite'
  | 'a0'
  | 'lernen'
  | 'lernen-detail'
  | 'pruefung'
  | 'pruefung-detail'
  | 'lesen'
  | 'hoeren'
  | 'sprechen'
  | 'schreiben'
  | 'grammatik'
  | 'wortschatz'
  | 'fehleranalyse'
  | 'sammlung'
  | 'suche'
  | 'fortschritt'
  | 'einstellungen'
  | 'ueber';

export interface LevelInfo {
  level: CEFRLevel;
  title: string;
  subtitle: string;
  description: string;
  difficultyLabel: string;
  estimatedHours: number;
  topics: string[];
  accentColor: string;
}

export interface GrammarConjugationTable {
  headers: string[];
  rows: string[][];
}

export interface GrammarTopic {
  id: string;
  level: CEFRLevel;
  title: string;
  category: string;
  summary: string;
  explanationDe: string;
  explanationId: string;
  sentenceStructureDe?: string;
  conjugationTable?: GrammarConjugationTable;
  commonMistakesId?: string;
  rulePoints: string[];
  examples: { german: string; translationId?: string; note: string }[];
  relatedExerciseId?: string;
}

export interface ExamSection {
  name: string;
  durationMinutes: number;
  points: number;
  tasksSummary: string;
}

export interface ExamOverview {
  id: string;
  board: ExamBoard;
  level: CEFRLevel;
  officialName: string;
  totalDurationMinutes: number;
  totalPoints: number;
  passingScore: number;
  formatNotes: string;
  sections: ExamSection[];
}
