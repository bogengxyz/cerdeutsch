import {
  CEFRLevel,
  DifficultyLevel,
  Exercise,
  MatchingPair,
  ModuleSkill,
  Question,
  QuestionType,
  RubricCriterion,
} from '../../types/exercise';
import { resolveAudioStatusForPath } from '../audioManifest';
import { getPracticeAudioPath } from '../../utils/listeningAudioHelpers';

export interface CompactQuestionSpec {
  id?: string;
  type: QuestionType;
  q: string;
  opts?: string[];
  ans?: string;
  ansMulti?: string[];
  accept?: string[];
  tokens?: string[];
  pairs?: MatchingPair[];
  de: string;
  idExp: string;
  diff?: DifficultyLevel;
  pts?: number;
  dir?: 'de-to-id' | 'id-to-de';
}

export interface CompactReadingSpec {
  id: string;
  level: CEFRLevel;
  topic: string;
  title: string;
  subtitle: string;
  diff: DifficultyLevel;
  mins: number;
  format: string;
  instr: string;
  pTitle: string;
  pType: NonNullable<Exercise['passageType']>;
  passage: string;
  qs: CompactQuestionSpec[];
}

export interface CompactListeningSpec {
  id: string;
  level: CEFRLevel;
  topic: string;
  title: string;
  subtitle: string;
  diff: DifficultyLevel;
  mins: number;
  format: string;
  instr: string;
  transcript: string;
  qs: CompactQuestionSpec[];
}

export interface CompactDrillSpec {
  id: string;
  level: CEFRLevel;
  skill: 'grammatik' | 'wortschatz';
  topic: string;
  title: string;
  subtitle: string;
  diff: DifficultyLevel;
  mins: number;
  format: string;
  instr: string;
  qs: CompactQuestionSpec[];
}

export interface CompactProductiveSpec {
  id: string;
  level: CEFRLevel;
  skill: 'schreiben' | 'sprechen';
  topic: string;
  title: string;
  subtitle: string;
  diff: DifficultyLevel;
  mins: number;
  format: string;
  instr: string;
  prompt: string;
  explanationDe: string;
  explanationId: string;
  sampleAnswer: string;
  checklist: string[];
  rubric: RubricCriterion[];
  wordLimit?: { min: number; max: number };
  prepSeconds?: number;
  speakSeconds?: number;
}

function buildQuestion(
  parentId: string,
  index: number,
  fallbackDiff: DifficultyLevel,
  spec: CompactQuestionSpec,
): Question {
  return {
    id: spec.id ?? `${parentId}-q${index + 1}`,
    type: spec.type,
    question: spec.q,
    ...(spec.opts ? { options: spec.opts } : {}),
    ...(spec.pairs ? { matchingPairs: spec.pairs } : {}),
    ...(spec.tokens ? { orderingTokens: spec.tokens } : {}),
    ...(spec.ans !== undefined ? { correctAnswer: spec.ans } : {}),
    ...(spec.ansMulti ? { correctAnswers: spec.ansMulti } : {}),
    ...(spec.accept ? { acceptableAnswers: spec.accept } : {}),
    explanationDe: spec.de,
    explanationId: spec.idExp,
    points: spec.pts ?? 10,
    difficulty: spec.diff ?? fallbackDiff,
    ...(spec.dir ? { translationDirection: spec.dir } : {}),
  };
}

export function buildReadingExercise(spec: CompactReadingSpec): Exercise {
  return {
    id: spec.id,
    level: spec.level,
    skill: 'lesen',
    topic: spec.topic,
    title: spec.title,
    subtitle: spec.subtitle,
    difficulty: spec.diff,
    durationMinutes: spec.mins,
    formatLabel: spec.format,
    instructions: spec.instr,
    passageTitle: spec.pTitle,
    passageType: spec.pType,
    passage: spec.passage,
    questions: spec.qs.map((q, idx) => buildQuestion(spec.id, idx, spec.diff, q)),
  };
}

export function buildListeningExercise(spec: CompactListeningSpec): Exercise {
  const audioUrl = getPracticeAudioPath(spec.level, spec.id);
  return {
    id: spec.id,
    level: spec.level,
    skill: 'hoeren',
    topic: spec.topic,
    title: spec.title,
    subtitle: spec.subtitle,
    difficulty: spec.diff,
    durationMinutes: spec.mins,
    formatLabel: spec.format,
    instructions: spec.instr,
    audioUrl,
    audioStatus: resolveAudioStatusForPath(audioUrl, 'pending'),
    transcript: spec.transcript,
    questions: spec.qs.map((q, idx) => buildQuestion(spec.id, idx, spec.diff, q)),
  };
}

export function buildDrillExercise(spec: CompactDrillSpec): Exercise {
  return {
    id: spec.id,
    level: spec.level,
    skill: spec.skill,
    topic: spec.topic,
    title: spec.title,
    subtitle: spec.subtitle,
    difficulty: spec.diff,
    durationMinutes: spec.mins,
    formatLabel: spec.format,
    instructions: spec.instr,
    questions: spec.qs.map((q, idx) => buildQuestion(spec.id, idx, spec.diff, q)),
  };
}

export function buildProductiveExercise(spec: CompactProductiveSpec): Exercise {
  const qType: QuestionType = spec.skill === 'schreiben' ? 'writing-task' : 'speaking-task';
  return {
    id: spec.id,
    level: spec.level,
    skill: spec.skill as ModuleSkill,
    topic: spec.topic,
    title: spec.title,
    subtitle: spec.subtitle,
    difficulty: spec.diff,
    durationMinutes: spec.mins,
    formatLabel: spec.format,
    instructions: spec.instr,
    questions: [
      {
        id: `${spec.id}-q1`,
        type: qType,
        question: spec.prompt,
        explanationDe: spec.explanationDe,
        explanationId: spec.explanationId,
        points: 20,
        difficulty: spec.diff,
        sampleAnswer: spec.sampleAnswer,
        checklist: spec.checklist,
        rubricCriteria: spec.rubric,
        ...(spec.wordLimit ? { wordLimit: spec.wordLimit } : {}),
        ...(spec.prepSeconds ? { preparationSeconds: spec.prepSeconds } : {}),
        ...(spec.speakSeconds ? { speakingDurationSeconds: spec.speakSeconds } : {}),
      },
    ],
  };
}
