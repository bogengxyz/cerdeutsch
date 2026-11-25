import {
  CEFRLevel,
  Exercise,
  ModuleSkill,
  Question,
  QuestionType,
} from '../types/exercise';

export type QuestionAnswerValue = string | string[] | Record<string, string>;

export interface QuestionEvaluation {
  questionId: string;
  type: QuestionType;
  isObjective: boolean;
  isCorrect: boolean;
  earnedPoints: number;
  maxPoints: number;
  userAnswerLabel: string;
  expectedAnswerLabel: string;
  matchingBreakdown?: {
    left: string;
    expectedRight: string;
    selectedRight: string;
    isMatch: boolean;
  }[];
}

export interface ExerciseEvaluationResult {
  exerciseId: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  correctCount: number;
  incorrectCount: number;
  selfAssessedCount: number;
  questionResults: QuestionEvaluation[];
}

export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.!?]+$/g, '');
}

export function isObjectiveQuestionType(type: QuestionType): boolean {
  return (
    type === 'multiple-choice' ||
    type === 'multiple-select' ||
    type === 'true-false' ||
    type === 'fill-blank' ||
    type === 'sentence-order' ||
    type === 'short-answer' ||
    type === 'matching'
  );
}

export function isQuestionAnswered(
  question: Question,
  answer: QuestionAnswerValue | undefined,
): boolean {
  if (question.type === 'matching') {
    const pairs = question.matchingPairs ?? [];
    if (pairs.length === 0 || !answer || typeof answer !== 'object' || Array.isArray(answer)) {
      return false;
    }
    return pairs.every((p) => Boolean(answer[p.left] && answer[p.left].trim().length > 0));
  }

  if (question.type === 'multiple-select') {
    return Array.isArray(answer) && answer.length > 0;
  }

  if (question.type === 'speaking-task') {
    // Speaking can be completed after practicing orally or recording
    return true;
  }

  if (typeof answer !== 'string') return false;
  return answer.trim().length > 0;
}

export function evaluateObjectiveQuestion(
  question: Question,
  answer: QuestionAnswerValue | undefined,
): QuestionEvaluation {
  if (question.type === 'matching') {
    const pairs = question.matchingPairs ?? [];
    const mapAnswer: Record<string, string> =
      typeof answer === 'object' && answer !== null && !Array.isArray(answer) ? answer : {};
    const breakdown = pairs.map((pair) => {
      const selected = mapAnswer[pair.left] ?? '';
      const isMatch = normalizeAnswer(selected) === normalizeAnswer(pair.right);
      return {
        left: pair.left,
        expectedRight: pair.right,
        selectedRight: selected,
        isMatch,
      };
    });

    const matchedCount = breakdown.filter((b) => b.isMatch).length;
    const isCorrect = pairs.length > 0 && matchedCount === pairs.length;
    const earnedPoints =
      pairs.length === 0
        ? 0
        : isCorrect
          ? question.points
          : Math.round((matchedCount / pairs.length) * question.points);

    const userAnswerLabel =
      breakdown.length > 0
        ? breakdown.map((b) => `${b.left} → ${b.selectedRight || '—'}`).join('; ')
        : '—';
    const expectedAnswerLabel = pairs.map((p) => `${p.left} → ${p.right}`).join('; ');

    return {
      questionId: question.id,
      type: question.type,
      isObjective: true,
      isCorrect,
      earnedPoints,
      maxPoints: question.points,
      userAnswerLabel,
      expectedAnswerLabel,
      matchingBreakdown: breakdown,
    };
  }

  if (question.type === 'multiple-select') {
    const selectedRaw = Array.isArray(answer) ? answer : [];
    const expectedRaw = question.correctAnswers ?? [];
    const selectedNorm = [...new Set(selectedRaw.map(normalizeAnswer).filter(Boolean))].sort();
    const expectedNorm = [...new Set(expectedRaw.map(normalizeAnswer).filter(Boolean))].sort();

    const isCorrect =
      expectedNorm.length > 0 &&
      selectedNorm.length === expectedNorm.length &&
      selectedNorm.every((val, idx) => val === expectedNorm[idx]);

    return {
      questionId: question.id,
      type: question.type,
      isObjective: true,
      isCorrect,
      earnedPoints: isCorrect ? question.points : 0,
      maxPoints: question.points,
      userAnswerLabel: selectedRaw.length > 0 ? selectedRaw.join(', ') : '—',
      expectedAnswerLabel: expectedRaw.length > 0 ? expectedRaw.join(', ') : '—',
    };
  }

  const rawAnswer = typeof answer === 'string' ? answer : '';
  const normalizedUser = normalizeAnswer(rawAnswer);

  const candidates = [
    ...(question.correctAnswer ? [question.correctAnswer] : []),
    ...(question.acceptableAnswers ?? []),
  ].map(normalizeAnswer);

  const isCorrect = normalizedUser.length > 0 && candidates.includes(normalizedUser);

  return {
    questionId: question.id,
    type: question.type,
    isObjective: true,
    isCorrect,
    earnedPoints: isCorrect ? question.points : 0,
    maxPoints: question.points,
    userAnswerLabel: rawAnswer.trim() || '—',
    expectedAnswerLabel: question.correctAnswer ?? question.acceptableAnswers?.[0] ?? '—',
  };
}

export function evaluateSelfAssessedQuestion(
  question: Question,
  checkedChecklist: boolean[] = [],
  userText?: string,
): QuestionEvaluation {
  const checklist = question.checklist ?? [];
  let earnedPoints = question.points;

  if (checklist.length > 0) {
    const checkedCount = checklist.filter((_, idx) => Boolean(checkedChecklist[idx])).length;
    earnedPoints = Math.round((checkedCount / checklist.length) * question.points);
  }

  const trimmedText = userText?.trim() ?? '';
  const wordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;

  return {
    questionId: question.id,
    type: question.type,
    isObjective: false,
    isCorrect: true,
    earnedPoints,
    maxPoints: question.points,
    userAnswerLabel:
      question.type === 'writing-task'
        ? wordCount > 0
          ? `${wordCount} Wörter verfasst`
          : 'Entwurf eingereicht'
        : 'Mündliche Übung abgeschlossen',
    expectedAnswerLabel: 'Selbsteinschätzung anhand der Rubrik',
  };
}

export function calculateExerciseResult(
  exercise: Exercise,
  answers: Record<string, QuestionAnswerValue>,
  selfChecks: Record<string, boolean[]> = {},
): ExerciseEvaluationResult {
  const questionResults = exercise.questions.map((question) => {
    if (isObjectiveQuestionType(question.type)) {
      return evaluateObjectiveQuestion(question, answers[question.id]);
    }
    const rawText = typeof answers[question.id] === 'string' ? (answers[question.id] as string) : '';
    return evaluateSelfAssessedQuestion(question, selfChecks[question.id], rawText);
  });

  const totalScore = questionResults.reduce((acc, item) => acc + item.earnedPoints, 0);
  const maxScore = questionResults.reduce((acc, item) => acc + item.maxPoints, 0);
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const objectiveResults = questionResults.filter((r) => r.isObjective);
  const correctCount = objectiveResults.filter((r) => r.isCorrect).length;
  const incorrectCount = objectiveResults.filter((r) => !r.isCorrect).length;
  const selfAssessedCount = questionResults.filter((r) => !r.isObjective).length;

  return {
    exerciseId: exercise.id,
    totalScore,
    maxScore,
    percentage,
    correctCount,
    incorrectCount,
    selfAssessedCount,
    questionResults,
  };
}

export interface DatabaseValidationReport {
  valid: boolean;
  errors: string[];
  countsByLevelAndSkill: Record<CEFRLevel, Record<ModuleSkill, number>>;
}

export function validateExerciseDatabase(exercises: Exercise[]): DatabaseValidationReport {
  const errors: string[] = [];
  const seenExerciseIds = new Set<string>();
  const seenQuestionIds = new Set<string>();

  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2'];
  const skills: ModuleSkill[] = [
    'lesen',
    'hoeren',
    'sprechen',
    'schreiben',
    'grammatik',
    'wortschatz',
  ];

  const countsByLevelAndSkill: Record<CEFRLevel, Record<ModuleSkill, number>> = {
    A1: { lesen: 0, hoeren: 0, sprechen: 0, schreiben: 0, grammatik: 0, wortschatz: 0 },
    A2: { lesen: 0, hoeren: 0, sprechen: 0, schreiben: 0, grammatik: 0, wortschatz: 0 },
    B1: { lesen: 0, hoeren: 0, sprechen: 0, schreiben: 0, grammatik: 0, wortschatz: 0 },
    B2: { lesen: 0, hoeren: 0, sprechen: 0, schreiben: 0, grammatik: 0, wortschatz: 0 },
  };

  for (const ex of exercises) {
    if (seenExerciseIds.has(ex.id)) {
      errors.push(`Duplicate exercise id: ${ex.id}`);
    }
    seenExerciseIds.add(ex.id);

    countsByLevelAndSkill[ex.level][ex.skill] += 1;

    if (!ex.title.trim() || !ex.instructions.trim()) {
      errors.push(`Exercise ${ex.id} is missing title or instructions.`);
    }

    if (ex.skill === 'hoeren' && (!ex.transcript || !ex.transcript.trim())) {
      errors.push(`Listening exercise ${ex.id} is missing transcript.`);
    }

    if (ex.questions.length === 0) {
      errors.push(`Exercise ${ex.id} has no questions.`);
    }

    for (const q of ex.questions) {
      if (seenQuestionIds.has(q.id)) {
        errors.push(`Duplicate question id: ${q.id}`);
      }
      seenQuestionIds.add(q.id);

      if (!q.question.trim()) {
        errors.push(`Question ${q.id} has empty prompt.`);
      }
      if (!q.explanationId || !q.explanationId.trim()) {
        errors.push(`Question ${q.id} is missing Indonesian explanationId.`);
      }
      if (q.points <= 0) {
        errors.push(`Question ${q.id} must have positive points.`);
      }

      if (q.type === 'multiple-choice' || q.type === 'true-false') {
        if (!q.options || q.options.length < 2) {
          errors.push(`Question ${q.id} (${q.type}) must define at least 2 options.`);
        } else if (!q.correctAnswer || !q.options.includes(q.correctAnswer)) {
          errors.push(`Question ${q.id} correctAnswer must match one of its options.`);
        }
      } else if (q.type === 'multiple-select') {
        if (!q.options || q.options.length < 3) {
          errors.push(`Question ${q.id} (multiple-select) must define at least 3 options.`);
        } else if (!q.correctAnswers || q.correctAnswers.length < 1) {
          errors.push(`Question ${q.id} (multiple-select) must define at least 1 correctAnswers entry.`);
        } else if (!q.correctAnswers.every((ans) => q.options!.includes(ans))) {
          errors.push(`Question ${q.id} (multiple-select) correctAnswers must all exist in options.`);
        }
      } else if (q.type === 'sentence-order') {
        if (!q.orderingTokens || q.orderingTokens.length < 2) {
          errors.push(`Question ${q.id} (sentence-order) must define at least 2 orderingTokens.`);
        }
        if (!q.correctAnswer || !q.correctAnswer.trim()) {
          errors.push(`Question ${q.id} (sentence-order) must define correctAnswer.`);
        }
      } else if (q.type === 'fill-blank' || q.type === 'short-answer') {
        if (!q.correctAnswer && (!q.acceptableAnswers || q.acceptableAnswers.length === 0)) {
          errors.push(`Question ${q.id} (${q.type}) must have correctAnswer or acceptableAnswers.`);
        }
      } else if (q.type === 'matching') {
        if (!q.matchingPairs || q.matchingPairs.length < 2) {
          errors.push(`Question ${q.id} (matching) must have at least 2 matchingPairs.`);
        }
      } else if (q.type === 'writing-task' || q.type === 'speaking-task') {
        if (!q.sampleAnswer || !q.sampleAnswer.trim()) {
          errors.push(`Question ${q.id} (${q.type}) should have a sampleAnswer.`);
        }
        if (!q.rubricCriteria || q.rubricCriteria.length === 0) {
          errors.push(`Question ${q.id} (${q.type}) should have rubricCriteria.`);
        }
      }
    }
  }

  for (const lvl of levels) {
    for (const sk of skills) {
      if (countsByLevelAndSkill[lvl][sk] < 3) {
        errors.push(
          `Level ${lvl} skill ${sk} has only ${countsByLevelAndSkill[lvl][sk]} exercises (expected >= 3).`,
        );
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    countsByLevelAndSkill,
  };
}
