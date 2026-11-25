export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2';

export type ModuleSkill =
  | 'lesen'
  | 'hoeren'
  | 'sprechen'
  | 'schreiben'
  | 'grammatik'
  | 'wortschatz';

export type QuestionType =
  | 'multiple-choice'
  | 'multiple-select'
  | 'true-false'
  | 'fill-blank'
  | 'sentence-order'
  | 'matching'
  | 'short-answer'
  | 'writing-task'
  | 'speaking-task';

export type DifficultyLevel = 'Leicht' | 'Mittel' | 'Anspruchsvoll';

export interface MatchingPair {
  left: string;
  right: string;
}

export interface KeyVocabNote {
  de: string;
  id: string;
}

export interface RubricCriterion {
  criterion: string;
  descriptionId: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  matchingPairs?: MatchingPair[];
  orderingTokens?: string[];
  correctAnswer?: string;
  correctAnswers?: string[];
  acceptableAnswers?: string[];
  explanationId: string;
  explanationDe?: string;
  commonMistakeId?: string;
  keyVocabulary?: KeyVocabNote[];
  grammarNoteId?: string;
  relatedGrammarTopicId?: string;
  usefulExpressionsDe?: KeyVocabNote[];
  preparationGuidanceDe?: string;
  points: number;
  difficulty?: DifficultyLevel;
  translationDirection?: 'de-to-id' | 'id-to-de';
  wordLimit?: { min: number; max: number };
  sampleAnswer?: string;
  rubricCriteria?: RubricCriterion[];
  checklist?: string[];
  preparationSeconds?: number;
  speakingDurationSeconds?: number;
  // Optional source context attached during randomized/filtered practice sessions
  passage?: string;
  passageTitle?: string;
  passageType?: Exercise['passageType'];
  audioUrl?: string;
  audioStatus?: Exercise['audioStatus'];
  transcript?: string;
  sourceExerciseId?: string;
  sourceTopic?: string;
  sourceLevel?: CEFRLevel;
  sourceSkill?: ModuleSkill;
}

export interface Exercise {
  id: string;
  level: CEFRLevel;
  skill: ModuleSkill;
  topic: string;
  title: string;
  subtitle: string;
  learningObjectiveDe?: string;
  difficulty: DifficultyLevel;
  durationMinutes: number;
  formatLabel: string;
  instructions: string;
  passageTitle?: string;
  passageType?:
    | 'E-Mail'
    | 'Brief'
    | 'Anzeige'
    | 'Mitteilung'
    | 'Artikel'
    | 'Dialog'
    | 'Informationstext'
    | 'Forumsbeitrag'
    | 'Hinweisschild'
    | 'Meinungstext';
  passage?: string;
  audioUrl?: string;
  audioStatus?: 'available' | 'pending' | 'missing';
  transcript?: string;
  questions: Question[];
}

export interface TopicCurriculumItem {
  id: string;
  level: CEFRLevel;
  topic: string;
  objectiveDe: string;
  shortMaterialDe: string;
  grammarFocus: string;
  keyWords: string[];
}
