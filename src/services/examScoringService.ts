import {
  ExamAnswerValue,
  ExamConfiguration,
  ExamEvaluationResult,
  ExamMode,
  ExamModuleConfig,
  ExamModuleEvaluation,
  ExamModuleKey,
  ExamQuestion,
  ExamQuestionResult,
} from '../types/exam';
import { getActiveModulesForSession, isObjectiveExamQuestionType } from './examService';
import { getNeutralExamTitle, sanitizeExamBrandingText } from '../utils/brandLabels';

export function normalizeExamText(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.!?]+$/g, '');
}

export function roundPercent(earned: number, max: number): number {
  if (max <= 0) return 0;
  return Math.round((earned / max) * 100);
}

export function isExamQuestionAnswered(
  question: ExamQuestion,
  answer: ExamAnswerValue | undefined,
): boolean {
  if (!answer) return false;

  if (question.type === 'multiple-select') {
    return Array.isArray(answer) && answer.length > 0;
  }

  if (question.type === 'sentence-ordering') {
    return (
      Array.isArray(answer) &&
      answer.length > 0 &&
      answer.every((item) => item.trim().length > 0)
    );
  }

  if (question.type === 'matching' || question.type === 'text-matching') {
    const pairs = question.matchingPairs ?? [];
    if (pairs.length === 0 || typeof answer !== 'object' || Array.isArray(answer)) return false;
    return pairs.every((p) => Boolean(answer[p.left] && answer[p.left].trim().length > 0));
  }

  if (question.blankFields && question.blankFields.length > 0) {
    if (typeof answer !== 'object' || Array.isArray(answer)) return false;
    return question.blankFields.every((f) => Boolean(answer[f.id] && answer[f.id].trim().length > 0));
  }

  if (typeof answer === 'string') {
    return answer.trim().length > 0;
  }

  return false;
}

export function evaluateObjectiveExamQuestion(
  question: ExamQuestion,
  moduleKey: ExamModuleKey,
  sectionId: string,
  answer: ExamAnswerValue | undefined,
): ExamQuestionResult {
  const hasMissingAudioLimitation = question.audio?.status === 'missing';
  const isAnswered = isExamQuestionAnswered(question, answer);

  if (question.type === 'multiple-select') {
    const expected = Array.isArray(question.correctAnswer) ? question.correctAnswer : [];
    const selected = Array.isArray(answer) ? answer : [];
    const normalizedExpected = new Set(expected.map(normalizeExamText));
    const normalizedSelected = new Set(selected.map(normalizeExamText));

    const exactMatch =
      normalizedExpected.size > 0 &&
      normalizedExpected.size === normalizedSelected.size &&
      [...normalizedExpected].every((item) => normalizedSelected.has(item));

    let overlap = 0;
    normalizedSelected.forEach((item) => {
      if (normalizedExpected.has(item)) overlap += 1;
      else overlap -= 0.5;
    });
    const ratio =
      normalizedExpected.size > 0 ? Math.max(0, Math.min(1, overlap / normalizedExpected.size)) : 0;
    const earnedPoints = exactMatch ? question.points : Math.round(ratio * question.points);

    return {
      questionId: question.id,
      moduleKey,
      sectionId,
      partLabelDe: question.partLabelDe,
      type: question.type,
      isObjective: true,
      isAnswered,
      isCorrect: exactMatch,
      hasMissingAudioLimitation,
      earnedPoints,
      maxPoints: question.points,
      userAnswerLabel: selected.length > 0 ? selected.join(', ') : '—',
      expectedAnswerLabel: expected.join(', '),
    };
  }

  if (question.type === 'matching' || question.type === 'text-matching') {
    const pairs = question.matchingPairs ?? [];
    const mapAnswer =
      answer && typeof answer === 'object' && !Array.isArray(answer) ? answer : {};
    let matchedCount = 0;
    const userPairs = pairs.map((p) => {
      const chosen = mapAnswer[p.left] ?? '';
      if (normalizeExamText(chosen) === normalizeExamText(p.right)) {
        matchedCount += 1;
      }
      return `${p.left} → ${chosen || '—'}`;
    });

    const isCorrect = pairs.length > 0 && matchedCount === pairs.length;
    const earnedPoints =
      pairs.length === 0
        ? 0
        : isCorrect
          ? question.points
          : Math.round((matchedCount / pairs.length) * question.points);

    return {
      questionId: question.id,
      moduleKey,
      sectionId,
      partLabelDe: question.partLabelDe,
      type: question.type,
      isObjective: true,
      isAnswered,
      isCorrect,
      hasMissingAudioLimitation,
      earnedPoints,
      maxPoints: question.points,
      userAnswerLabel: userPairs.join(' | '),
      expectedAnswerLabel: pairs.map((p) => `${p.left} → ${p.right}`).join(' | '),
    };
  }

  if (question.type === 'sentence-ordering') {
    const expected = question.correctOrder ?? [];
    const selected = Array.isArray(answer) ? answer : [];
    let matchPositions = 0;
    expected.forEach((step, idx) => {
      if (normalizeExamText(selected[idx] ?? '') === normalizeExamText(step)) {
        matchPositions += 1;
      }
    });
    const isCorrect = expected.length > 0 && matchPositions === expected.length;
    const earnedPoints =
      expected.length === 0
        ? 0
        : isCorrect
          ? question.points
          : Math.round((matchPositions / expected.length) * question.points);

    return {
      questionId: question.id,
      moduleKey,
      sectionId,
      partLabelDe: question.partLabelDe,
      type: question.type,
      isObjective: true,
      isAnswered,
      isCorrect,
      hasMissingAudioLimitation,
      earnedPoints,
      maxPoints: question.points,
      userAnswerLabel:
        selected.length > 0 ? selected.map((s, i) => `${i + 1}. ${s}`).join(' ') : '—',
      expectedAnswerLabel: expected.map((s, i) => `${i + 1}. ${s}`).join(' '),
    };
  }

  if (question.blankFields && question.blankFields.length > 0) {
    const fields = question.blankFields;
    const mapAnswer =
      answer && typeof answer === 'object' && !Array.isArray(answer) ? answer : {};
    let correctFieldCount = 0;
    const userSummary: string[] = [];
    const expectedSummary: string[] = [];

    fields.forEach((field) => {
      const userVal = mapAnswer[field.id] ?? '';
      const validValues = [field.correctAnswer, ...(field.acceptableAnswers ?? [])].map(
        normalizeExamText,
      );
      if (userVal.trim() && validValues.includes(normalizeExamText(userVal))) {
        correctFieldCount += 1;
      }
      userSummary.push(`${field.labelDe}: ${userVal.trim() || '—'}`);
      expectedSummary.push(`${field.labelDe}: ${field.correctAnswer}`);
    });

    const isCorrect = correctFieldCount === fields.length;
    const earnedPoints = isCorrect
      ? question.points
      : Math.round((correctFieldCount / fields.length) * question.points);

    return {
      questionId: question.id,
      moduleKey,
      sectionId,
      partLabelDe: question.partLabelDe,
      type: question.type,
      isObjective: true,
      isAnswered,
      isCorrect,
      hasMissingAudioLimitation,
      earnedPoints,
      maxPoints: question.points,
      userAnswerLabel: userSummary.join(' · '),
      expectedAnswerLabel: expectedSummary.join(' · '),
    };
  }

  const rawText = typeof answer === 'string' ? answer : '';
  const normalizedUser = normalizeExamText(rawText);
  const candidates = [
    ...(typeof question.correctAnswer === 'string' ? [question.correctAnswer] : []),
    ...(question.acceptableAnswers ?? []),
  ].map(normalizeExamText);

  const isCorrect = normalizedUser.length > 0 && candidates.includes(normalizedUser);

  return {
    questionId: question.id,
    moduleKey,
    sectionId,
    partLabelDe: question.partLabelDe,
    type: question.type,
    isObjective: true,
    isAnswered,
    isCorrect,
    hasMissingAudioLimitation,
    earnedPoints: isCorrect ? question.points : 0,
    maxPoints: question.points,
    userAnswerLabel: rawText.trim() || '—',
    expectedAnswerLabel:
      typeof question.correctAnswer === 'string'
        ? question.correctAnswer
        : question.acceptableAnswers?.[0] ?? '—',
  };
}

export function evaluateSubjectiveExamQuestion(
  question: ExamQuestion,
  moduleKey: ExamModuleKey,
  sectionId: string,
  answer: ExamAnswerValue | undefined,
): ExamQuestionResult {
  const textAnswer = typeof answer === 'string' ? answer.trim() : '';
  const wordCount = textAnswer ? textAnswer.split(/\s+/).length : 0;
  const isAnswered =
    question.type === 'speaking-prompt' ? textAnswer.length > 0 : wordCount > 0;

  return {
    questionId: question.id,
    moduleKey,
    sectionId,
    partLabelDe: question.partLabelDe,
    type: question.type,
    isObjective: false,
    isAnswered,
    isCorrect: false,
    hasMissingAudioLimitation: false,
    earnedPoints: 0, // Never auto-graded!
    maxPoints: question.points,
    userAnswerLabel:
      question.type === 'speaking-prompt'
        ? textAnswer
          ? 'Mündliche Notizen / Aufnahme dokumentiert'
          : 'Keine Notizen gespeichert (Selbsteinschätzung erforderlich)'
        : wordCount > 0
          ? `${wordCount} Wörter eingereicht (Selbsteinschätzung erforderlich)`
          : 'Kein Text eingereicht',
    expectedAnswerLabel: 'Selbsteinschätzung nach Bewertungsraster (keine automatische KI-Note)',
  };
}

export function computeSelfAssessedQuestionPoints(
  question: ExamQuestion,
  ratings: Record<string, number> | undefined,
): number | null {
  if (!question.rubricCriteria || question.rubricCriteria.length === 0) return null;
  if (!ratings) return null;
  const ratedKeys = question.rubricCriteria.filter((c) => typeof ratings[c.id] === 'number');
  if (ratedKeys.length === 0) return null;

  return question.rubricCriteria.reduce((sum, crit) => {
    const val = ratings[crit.id];
    if (typeof val !== 'number') return sum;
    return sum + Math.max(0, Math.min(crit.maxPoints, Math.round(val)));
  }, 0);
}

export function evaluateExamSubmission(
  exam: ExamConfiguration,
  mode: ExamMode,
  answers: Record<string, ExamAnswerValue>,
  selectedModuleKey?: ExamModuleKey,
  selfAssessmentRatings: Record<string, Record<string, number>> = {},
): ExamEvaluationResult {
  const activeModules: ExamModuleConfig[] = getActiveModulesForSession(
    exam,
    mode,
    selectedModuleKey,
  );

  const missingAudioQuestionIds: string[] = [];
  const moduleEvaluations: ExamModuleEvaluation[] = [];
  const recommendedTopicsSet = new Set<string>();

  for (const mod of activeModules) {
    const modResults: ExamQuestionResult[] = [];
    let objectiveEarnedPoints = 0;
    let objectiveMaxPoints = 0;
    let selfAssessedMaxPoints = 0;
    let selfAssessedUserSum = 0;
    let hasAnySelfRating = false;
    let hasSelfAssessmentQuestions = false;
    let hasMissingAudioLimitation = false;

    for (const sec of mod.sections) {
      for (const q of sec.questions) {
        if (isObjectiveExamQuestionType(q.type)) {
          const res = evaluateObjectiveExamQuestion(q, mod.moduleKey, sec.id, answers[q.id]);
          modResults.push(res);
          objectiveEarnedPoints += res.earnedPoints;
          objectiveMaxPoints += res.maxPoints;
          if (res.hasMissingAudioLimitation) {
            hasMissingAudioLimitation = true;
            missingAudioQuestionIds.push(q.id);
          }
          if (!res.isCorrect && !res.hasMissingAudioLimitation) {
            recommendedTopicsSet.add(`${mod.titleDe}: ${sec.titleDe}`);
          }
        } else {
          hasSelfAssessmentQuestions = true;
          const res = evaluateSubjectiveExamQuestion(q, mod.moduleKey, sec.id, answers[q.id]);
          modResults.push(res);
          selfAssessedMaxPoints += res.maxPoints;
          const rated = computeSelfAssessedQuestionPoints(q, selfAssessmentRatings[q.id]);
          if (rated !== null) {
            hasAnySelfRating = true;
            selfAssessedUserSum += rated;
          }
        }
      }
    }

    const objectivePercentage = roundPercent(objectiveEarnedPoints, objectiveMaxPoints);
    const passedObjectiveThreshold =
      objectiveMaxPoints > 0 ? objectivePercentage >= 60 : null;

    moduleEvaluations.push({
      moduleKey: mod.moduleKey,
      titleDe: mod.titleDe,
      officialPoints: mod.officialPoints,
      objectiveEarnedPoints,
      objectiveMaxPoints,
      objectivePercentage,
      selfAssessedMaxPoints,
      selfAssessedUserPoints: hasAnySelfRating ? selfAssessedUserSum : null,
      hasSelfAssessmentQuestions,
      hasMissingAudioLimitation,
      passedObjectiveThreshold,
      questionResults: modResults,
    });
  }

  const allResults = moduleEvaluations.flatMap((m) => m.questionResults);
  const objectiveResults = allResults.filter((r) => r.isObjective);

  const objectiveEarnedPoints = moduleEvaluations.reduce(
    (s, m) => s + m.objectiveEarnedPoints,
    0,
  );
  const objectiveMaxPoints = moduleEvaluations.reduce((s, m) => s + m.objectiveMaxPoints, 0);
  const objectivePercentage = roundPercent(objectiveEarnedPoints, objectiveMaxPoints);

  const correctCount = objectiveResults.filter((r) => r.isCorrect).length;
  const incorrectCount = objectiveResults.filter((r) => !r.isCorrect).length;
  const unansweredObjectiveCount = objectiveResults.filter((r) => !r.isAnswered).length;
  const selfAssessedCount = allResults.filter((r) => !r.isObjective).length;
  const hasMissingAudioLimitation = missingAudioQuestionIds.length > 0;

  let simulatedStatusLabelDe = 'Bukan penilaian resmi — Simulasi ujian selesai';
  let simulatedStatusNoteId =
    'Hasil ini adalah simulasi latihan tanpa penilaian AI untuk Schreiben/Sprechen dan bukan sertifikat resmi lembaga ujian mana pun.';

  if (mode === 'full') {
    const lesenEval = moduleEvaluations.find((m) => m.moduleKey === 'lesen');
    const hoerenEval = moduleEvaluations.find((m) => m.moduleKey === 'hoeren');
    const neutralTitle = getNeutralExamTitle(exam.provider, exam.level);
    if (exam.moduleIndependence === 'per-module') {
      simulatedStatusLabelDe =
        'Modul objektif telah dievaluasi · Schreiben & Sprechen menggunakan penilaian mandiri';
      simulatedStatusNoteId = `${neutralTitle} dinilai per modul (>= 60%). Modul Lesen/Hören dinilai objektif, sedangkan Schreiben & Sprechen menggunakan rubrik penilaian mandiri.`;
    } else if (exam.moduleIndependence === 'written-oral-split') {
      simulatedStatusLabelDe =
        'Simulasi selesai (evaluasi terpisah tertulis / lisan)';
      simulatedStatusNoteId = sanitizeExamBrandingText(exam.passingRuleSummaryId);
    } else {
      simulatedStatusLabelDe = 'Simulasi selesai (evaluasi skor total)';
      simulatedStatusNoteId = sanitizeExamBrandingText(exam.passingRuleSummaryId);
    }

    if (hasMissingAudioLimitation && hoerenEval) {
      simulatedStatusNoteId +=
        ' Catatan: Audio resmi belum tersedia di perangkat lokal sehingga bagian Hören memiliki keterbatasan audio.';
    }
    if (lesenEval && lesenEval.objectivePercentage < 60) {
      recommendedTopicsSet.add(`${lesenEval.titleDe} (Wiederholung unter 60 %)`);
    }
  } else if (mode === 'module') {
    const single = moduleEvaluations[0];
    if (single && !single.hasSelfAssessmentQuestions) {
      simulatedStatusLabelDe =
        single.objectivePercentage >= 60
          ? `Modul-Simulation: Orientierungswert erreicht (${single.objectivePercentage} %)`
          : `Modul-Simulation: Weiter üben empfohlen (${single.objectivePercentage} %)`;
    } else {
      simulatedStatusLabelDe =
        'Modul-Simulation abgeschlossen · Selbsteinschätzung nach Rubrik';
    }
  } else {
    simulatedStatusLabelDe = 'Prüfungstraining ohne Zeitdruck abgeschlossen';
  }

  return {
    examId: exam.id,
    provider: exam.provider,
    level: exam.level,
    mode,
    objectiveEarnedPoints,
    objectiveMaxPoints,
    objectivePercentage,
    correctCount,
    incorrectCount,
    unansweredObjectiveCount,
    selfAssessedCount,
    hasMissingAudioLimitation,
    missingAudioQuestionIds,
    simulatedStatusLabelDe,
    simulatedStatusNoteId,
    moduleEvaluations,
    recommendedTopicsDe: Array.from(recommendedTopicsSet),
  };
}
