import { CEFRLevel } from './exercise';

export type ExamProvider = 'goethe' | 'telc';
export type ExamLevel = CEFRLevel;
export type ExamMode = 'full' | 'module' | 'practice';
export type ExamModuleKey = 'lesen' | 'hoeren' | 'schreiben' | 'sprechen';

export type ExamQuestionType =
  | 'single-choice'
  | 'multiple-select'
  | 'true-false'
  | 'matching'
  | 'text-matching'
  | 'sentence-ordering'
  | 'fill-blank'
  | 'dropdown'
  | 'short-text'
  | 'form-completion'
  | 'email-writing'
  | 'letter-writing'
  | 'forum-post'
  | 'long-text'
  | 'speaking-prompt';

export interface ExamMatchingPair {
  left: string;
  right: string;
}

export interface ExamBlankField {
  id: string;
  labelDe: string;
  placeholderDe?: string;
  options?: string[];
  correctAnswer: string;
  acceptableAnswers?: string[];
}

export interface ExamAudioAsset {
  url: string;
  status: 'available' | 'missing';
  titleDe: string;
  durationLabel?: string;
  playLimit?: number;
  transcriptDe: string;
}

export interface ExamVocabNote {
  de: string;
  id: string;
}

export interface ExamRubricCriterion {
  id: string;
  criterionDe: string;
  criterionId: string;
  maxPoints: number;
  descriptorId: string;
}

export interface ExamQuestion {
  id: string;
  partLabelDe: string;
  type: ExamQuestionType;
  promptDe: string;
  passageTitleDe?: string;
  passageTypeDe?: string;
  passageDe?: string;
  options?: string[];
  matchingPairs?: ExamMatchingPair[];
  matchingRightChoices?: string[];
  orderingItems?: string[];
  correctOrder?: string[];
  blankFields?: ExamBlankField[];
  correctAnswer?: string | string[];
  acceptableAnswers?: string[];
  points: number;
  isEstimatedPracticePoints?: boolean;
  wordCountRange?: { min: number; max: number };
  preparationSeconds?: number;
  speakingSeconds?: number;
  partnerPromptsDe?: string[];
  audio?: ExamAudioAsset;
  explanationId: string;
  grammarNoteId?: string;
  keyVocabulary?: ExamVocabNote[];
  sampleAnswerDe?: string;
  sampleTranslationId?: string;
  rubricCriteria?: ExamRubricCriterion[];
}

export interface ExamSectionConfig {
  id: string;
  titleDe: string;
  subtitleDe: string;
  instructionsDe: string;
  durationMinutes: number;
  points: number;
  isEstimatedPracticePoints?: boolean;
  isSprachbausteine?: boolean;
  questions: ExamQuestion[];
}

export interface ExamModuleConfig {
  moduleKey: ExamModuleKey;
  titleDe: string;
  officialModuleTitleDe: string;
  durationMinutes: number;
  officialPoints: number;
  passingPoints?: number;
  instructionsDe: string;
  sections: ExamSectionConfig[];
}

export interface ExamConfiguration {
  id: string;
  provider: ExamProvider;
  level: ExamLevel;
  officialName: string;
  totalDurationMinutes: number;
  totalPoints: number;
  moduleIndependence: 'overall' | 'written-oral-split' | 'per-module';
  overallPassingPoints?: number;
  writtenTotalPoints?: number;
  writtenPassingPoints?: number;
  oralTotalPoints?: number;
  oralPassingPoints?: number;
  perModulePassingPercent?: number;
  passingRuleSummaryDe: string;
  passingRuleSummaryId: string;
  formatNotesDe: string;
  verificationSource: string;
  lastVerifiedDate: string;
  modules: ExamModuleConfig[];
}

export type ExamAnswerValue = string | string[] | Record<string, string>;

export interface ActiveExamSession {
  sessionId: string;
  examId: string;
  provider: ExamProvider;
  level: ExamLevel;
  mode: ExamMode;
  selectedModuleKey?: ExamModuleKey;
  activeModuleIndex: number;
  activeQuestionIndex: number;
  startedAtMs: number;
  moduleStartedAtMs: number;
  pausedAtMs?: number;
  totalPausedMs: number;
  isPaused: boolean;
  answers: Record<string, ExamAnswerValue>;
  flaggedQuestionIds: string[];
  submitted: boolean;
  submittedAtIso?: string;
}

export interface ExamQuestionResult {
  questionId: string;
  moduleKey: ExamModuleKey;
  sectionId: string;
  partLabelDe: string;
  type: ExamQuestionType;
  isObjective: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
  hasMissingAudioLimitation: boolean;
  earnedPoints: number;
  maxPoints: number;
  userAnswerLabel: string;
  expectedAnswerLabel: string;
}

export interface ExamModuleEvaluation {
  moduleKey: ExamModuleKey;
  titleDe: string;
  officialPoints: number;
  objectiveEarnedPoints: number;
  objectiveMaxPoints: number;
  objectivePercentage: number;
  selfAssessedMaxPoints: number;
  selfAssessedUserPoints: number | null;
  hasSelfAssessmentQuestions: boolean;
  hasMissingAudioLimitation: boolean;
  passedObjectiveThreshold: boolean | null;
  questionResults: ExamQuestionResult[];
}

export interface ExamEvaluationResult {
  examId: string;
  provider: ExamProvider;
  level: ExamLevel;
  mode: ExamMode;
  objectiveEarnedPoints: number;
  objectiveMaxPoints: number;
  objectivePercentage: number;
  correctCount: number;
  incorrectCount: number;
  unansweredObjectiveCount: number;
  selfAssessedCount: number;
  hasMissingAudioLimitation: boolean;
  missingAudioQuestionIds: string[];
  simulatedStatusLabelDe: string;
  simulatedStatusNoteId: string;
  moduleEvaluations: ExamModuleEvaluation[];
  recommendedTopicsDe: string[];
}

export interface ExamAttemptRecord {
  attemptId: string;
  examId: string;
  provider: ExamProvider;
  level: ExamLevel;
  officialName: string;
  mode: ExamMode;
  selectedModuleKey?: ExamModuleKey;
  startedAtIso: string;
  submittedAtIso: string;
  durationSpentSeconds: number;
  answers: Record<string, ExamAnswerValue>;
  flaggedQuestionIds: string[];
  selfAssessmentRatings: Record<string, Record<string, number>>;
  evaluation: ExamEvaluationResult;
}
