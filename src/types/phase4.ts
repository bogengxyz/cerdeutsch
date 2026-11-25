import { CEFRLevel, KeyVocabNote, ModuleSkill } from './exercise';
import { NavPage } from './learning';
import { AudioCoverageSummary } from './listeningAudio';

export type FlashcardRating = 'wiederholen' | 'schwierig' | 'lernen' | 'gewusst';

export interface FlashcardReviewRecord {
  vocabId: string;
  lastRating: FlashcardRating;
  repetitions: number;
  intervalDays: number;
  lastReviewedAtIso: string;
  nextReviewAtIso: string;
  difficultCount: number;
}

export interface MistakeRecord {
  id: string;
  exerciseId: string;
  questionId: string;
  originalQuestion: string;
  userAnswer: string;
  correctAnswer: string;
  explanationDe?: string;
  explanationId: string;
  relatedGrammarTopic?: string;
  relatedVocabulary?: KeyVocabNote[];
  recordedAt: string;
  level: CEFRLevel;
  skill: ModuleSkill;
  topic: string;
  corrected: boolean;
}

export type BookmarkCategory =
  | 'vocab'
  | 'grammar'
  | 'lesen'
  | 'hoeren'
  | 'schreiben'
  | 'sprechen'
  | 'questions';

export interface BookmarkCollection {
  vocab: string[];
  grammar: string[];
  lesen: string[];
  hoeren: string[];
  schreiben: string[];
  sprechen: string[];
  questions?: string[];
}

export interface WritingSpeakingHistoryEntry {
  id: string;
  exerciseId: string;
  title: string;
  skill: 'schreiben' | 'sprechen';
  level: CEFRLevel;
  topic: string;
  completedAtIso: string;
  wordCount?: number;
  selfCheckCompleted: number;
  selfCheckTotal: number;
  selfCheckPercent: number;
}

export interface LearningRecommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  targetPage: NavPage;
  targetLevel?: CEFRLevel;
  targetExerciseId?: string;
  targetGrammarId?: string;
  titleDe: string;
  reasonDe: string;
  actionLabelDe: string;
}

export interface AudioAssetAuditItem {
  id: string;
  source: 'exercise' | 'exam';
  level: CEFRLevel;
  title: string;
  audioUrl?: string;
  status: 'available' | 'missing';
}

export interface LevelQuestionBankRow {
  level: CEFRLevel;
  lesen: number;
  hoerenWithAudio: number;
  hoerenAwaitingAudio: number;
  grammatik: number;
  wortschatz: number;
  schreiben: number;
  sprechen: number;
  totalCompletedObjective: number;
  totalStoredObjective: number;
}

export interface QuestionBankAuditReport {
  valid: boolean;
  generatedAtIso: string;
  totalExercises: number;
  totalQuestions: number;
  totalCompletedObjectiveQuestions: number;
  totalAwaitingAudioQuestions: number;
  totalProductiveTasks: number;
  rowsByLevel: LevelQuestionBankRow[];
  countsByTopic: Record<string, number>;
  countsByDifficulty: Record<'Leicht' | 'Mittel' | 'Anspruchsvoll', number>;
  countsByQuestionType: Record<string, number>;
  topicsCoveredCount: number;
  invalidQuestionsCount: number;
  duplicateIdsCount: number;
  nearDuplicateCount: number;
  missingAudioFilesCount: number;
  errors: string[];
  warnings: string[];
}

export interface ContentAuditReport {
  valid: boolean;
  totalExercises: number;
  totalQuestions: number;
  totalGrammarTopics: number;
  totalVocabulary: number;
  errors: string[];
  warnings: string[];
  audioAudit: AudioAssetAuditItem[];
  availableAudioCount: number;
  missingAudioCount: number;
  questionBankAudit?: QuestionBankAuditReport;
  audioCoverage?: AudioCoverageSummary;
}
