import test from 'node:test';
import assert from 'node:assert/strict';
import { getExerciseById } from '../data/exercises';
import {
  deleteMistakeRecord,
  recordObjectiveMistakesFromEvaluation,
  toggleMistakeCorrected,
} from './mistakeNotebookService';
import { calculateExerciseResult } from './scoringService';

test('recordObjectiveMistakesFromEvaluation records incorrect objective answers and auto-corrects on retry', () => {
  const lesenEx = getExerciseById('a1-lesen-1');
  assert.ok(lesenEx, 'Expected a1-lesen-1 exercise');

  const firstQ = lesenEx.questions[0];
  const wrongOption = (firstQ.options ?? []).find((o) => o !== firstQ.correctAnswer) ?? 'Falsch';
  const wrongAnswers: Record<string, string> = { [firstQ.id]: wrongOption };
  for (const q of lesenEx.questions.slice(1)) {
    if (q.correctAnswer) wrongAnswers[q.id] = q.correctAnswer;
  }

  const evalWrong = calculateExerciseResult(lesenEx, wrongAnswers);
  const recorded = recordObjectiveMistakesFromEvaluation([], lesenEx, evalWrong, '2026-11-22T12:00:00.000Z');
  assert.equal(recorded.length, 1);
  assert.equal(recorded[0].corrected, false);
  assert.equal(recorded[0].userAnswer, wrongOption);
  assert.equal(recorded[0].correctAnswer, firstQ.correctAnswer);

  // Retry with correct answer
  const correctAnswers: Record<string, string> = {};
  for (const q of lesenEx.questions) {
    if (q.correctAnswer) correctAnswers[q.id] = q.correctAnswer;
  }
  const evalCorrect = calculateExerciseResult(lesenEx, correctAnswers);
  const updated = recordObjectiveMistakesFromEvaluation(recorded, lesenEx, evalCorrect);
  assert.equal(updated.length, 1);
  assert.equal(updated[0].corrected, true);

  const toggledBack = toggleMistakeCorrected(updated, updated[0].id);
  assert.equal(toggledBack[0].corrected, false);

  const deleted = deleteMistakeRecord(toggledBack, toggledBack[0].id);
  assert.equal(deleted.length, 0);
});

test('recordObjectiveMistakesFromEvaluation never saves personal writing or speaking drafts as mistakes', () => {
  const writingEx = getExerciseById('a1-schreiben-1');
  assert.ok(writingEx, 'Expected a1-schreiben-1 exercise');

  const evalWriting = calculateExerciseResult(
    writingEx,
    { [writingEx.questions[0].id]: 'Mein kurzer Entwurf auf Deutsch.' },
    { [writingEx.questions[0].id]: [true, false] },
  );

  const result = recordObjectiveMistakesFromEvaluation([], writingEx, evalWriting);
  assert.equal(result.length, 0);
});
