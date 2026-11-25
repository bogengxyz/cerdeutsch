import { GRAMMAR_TOPICS } from '../data/curriculum';
import { Exercise } from '../types/exercise';
import { MistakeRecord } from '../types/phase4';
import { ExerciseEvaluationResult } from './scoringService';

export const MISTAKES_STORAGE_KEY = 'deutschmeister_mistakes_v1';

type StorageReader = Pick<Storage, 'getItem'>;
type StorageWriter = Pick<Storage, 'setItem' | 'removeItem'>;

export function loadMistakeNotebook(storage?: StorageReader): MistakeRecord[] {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return [];
  try {
    const raw = store.getItem(MISTAKES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is MistakeRecord =>
        Boolean(item) &&
        typeof item.id === 'string' &&
        typeof item.exerciseId === 'string' &&
        typeof item.questionId === 'string',
    );
  } catch {
    return [];
  }
}

export function saveMistakeNotebook(
  records: MistakeRecord[],
  storage?: Pick<Storage, 'setItem'>,
): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(records.slice(0, 150)));
  } catch {
    // Ignore storage quota errors
  }
}

export function clearMistakeNotebook(storage?: Pick<Storage, 'removeItem'>): void {
  const store = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!store) return;
  try {
    store.removeItem(MISTAKES_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

/**
 * Records mistakes ONLY from objectively graded questions.
 * Never saves personal Writing or Speaking text drafts into the mistake notebook.
 */
export function recordObjectiveMistakesFromEvaluation(
  current: MistakeRecord[],
  exercise: Exercise,
  evaluation: ExerciseEvaluationResult,
  nowIso: string = new Date().toISOString(),
): MistakeRecord[] {
  const questionMap = new Map(exercise.questions.map((q) => [q.id, q]));
  const grammarTitleMap = new Map(GRAMMAR_TOPICS.map((g) => [g.id, g.title]));

  // Only examine objective results
  const objectiveResults = evaluation.questionResults.filter((qr) => qr.isObjective);
  if (objectiveResults.length === 0) {
    return current;
  }

  const updated = [...current];

  for (const qr of objectiveResults) {
    const q = questionMap.get(qr.questionId);
    if (!q) continue;

    const originExerciseId = q.sourceExerciseId ?? exercise.id;
    const originLevel = q.sourceLevel ?? exercise.level;
    const originSkill = q.sourceSkill ?? exercise.skill;
    const originTopic = q.sourceTopic ?? exercise.topic;

    const existingIdx = updated.findIndex(
      (m) =>
        m.questionId === qr.questionId ||
        (m.exerciseId === originExerciseId && m.questionId === qr.questionId),
    );

    if (!qr.isCorrect) {
      const grammarTitle = q.relatedGrammarTopicId
        ? grammarTitleMap.get(q.relatedGrammarTopicId)
        : undefined;

      const record: MistakeRecord = {
        id: `${originExerciseId}::${qr.questionId}`,
        exerciseId: originExerciseId,
        questionId: qr.questionId,
        originalQuestion: q.question,
        userAnswer: qr.userAnswerLabel,
        correctAnswer: qr.expectedAnswerLabel,
        explanationDe: q.explanationDe,
        explanationId: q.explanationId,
        relatedGrammarTopic: grammarTitle ?? q.grammarNoteId,
        relatedVocabulary: q.keyVocabulary,
        recordedAt: nowIso,
        level: originLevel,
        skill: originSkill,
        topic: originTopic,
        corrected: false,
      };

      if (existingIdx >= 0) {
        updated.splice(existingIdx, 1);
      }
      updated.unshift(record);
    } else if (existingIdx >= 0) {
      // Answered correctly on a later attempt (including random/incorrect practice): mark corrected
      updated[existingIdx] = {
        ...updated[existingIdx],
        corrected: true,
      };
    }
  }

  return updated.slice(0, 150);
}

export function toggleMistakeCorrected(
  records: MistakeRecord[],
  mistakeId: string,
): MistakeRecord[] {
  return records.map((m) => (m.id === mistakeId ? { ...m, corrected: !m.corrected } : m));
}

export function deleteMistakeRecord(
  records: MistakeRecord[],
  mistakeId: string,
): MistakeRecord[] {
  return records.filter((m) => m.id !== mistakeId);
}
