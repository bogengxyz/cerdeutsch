import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_EXERCISES, getExerciseById, getExercisesBySkillAndLevel } from '../data/exercises';
import {
  calculateExerciseResult,
  evaluateObjectiveQuestion,
  evaluateSelfAssessedQuestion,
  normalizeAnswer,
  validateExerciseDatabase,
} from './scoringService';

test('validateExerciseDatabase passes across all 4 levels and 6 modules (>= 3 per cell)', () => {
  const report = validateExerciseDatabase(ALL_EXERCISES);
  assert.equal(report.valid, true, `Validation errors: ${report.errors.join(' | ')}`);
  assert.ok(ALL_EXERCISES.length >= 96, `Expected >= 96 exercises, got ${ALL_EXERCISES.length}`);
  const countedTotal = Object.values(report.countsByLevelAndSkill).reduce(
    (sum, skillMap) =>
      sum + Object.values(skillMap).reduce((s, n) => s + n, 0),
    0,
  );
  assert.equal(countedTotal, ALL_EXERCISES.length);

  for (const level of ['A1', 'A2', 'B1', 'B2'] as const) {
    for (const skill of [
      'lesen',
      'hoeren',
      'sprechen',
      'schreiben',
      'grammatik',
      'wortschatz',
    ] as const) {
      assert.ok(
        report.countsByLevelAndSkill[level][skill] >= 3,
        `Expected >= 3 exercises for ${level} ${skill}`,
      );
      assert.equal(
        getExercisesBySkillAndLevel(skill, level).length,
        report.countsByLevelAndSkill[level][skill],
      );
    }
  }
});

test('normalizeAnswer trims, collapses whitespace, lowercases, and strips trailing punctuation', () => {
  assert.equal(normalizeAnswer('  Am  Montag! '), 'am montag');
  assert.equal(normalizeAnswer('PÜNKTLICH.'), 'pünktlich');
});

test('evaluateObjectiveQuestion scores multiple-choice, true-false, fill-blank, short-answer, and matching deterministically', () => {
  const lesen1 = getExerciseById('a1-lesen-1')!;
  const mcCorrect = evaluateObjectiveQuestion(lesen1.questions[0], 'Aus Österreich');
  assert.equal(mcCorrect.isCorrect, true);
  assert.equal(mcCorrect.earnedPoints, 10);

  const mcWrong = evaluateObjectiveQuestion(lesen1.questions[0], 'Aus Deutschland');
  assert.equal(mcWrong.isCorrect, false);
  assert.equal(mcWrong.earnedPoints, 0);

  const tfCorrect = evaluateObjectiveQuestion(lesen1.questions[2], 'Falsch');
  assert.equal(tfCorrect.isCorrect, true);

  const lesen2 = getExerciseById('a1-lesen-2')!;
  const fillCorrectAlt = evaluateObjectiveQuestion(lesen2.questions[2], ' 5 ');
  assert.equal(fillCorrectAlt.isCorrect, true);
  assert.equal(fillCorrectAlt.earnedPoints, 10);

  const lesen3 = getExerciseById('a1-lesen-3')!;
  const matchingQ = lesen3.questions[1];
  const matchAll = evaluateObjectiveQuestion(matchingQ, {
    Anna: 'macht die Party',
    Maria: 'soll einen Salat mitbringen',
    Thomas: 'bringt Getränke mit',
  });
  assert.equal(matchAll.isCorrect, true);
  assert.equal(matchAll.earnedPoints, matchingQ.points);

  const matchPartial = evaluateObjectiveQuestion(matchingQ, {
    Anna: 'macht die Party',
    Maria: 'bringt Getränke mit',
    Thomas: 'macht die Party',
  });
  assert.equal(matchPartial.isCorrect, false);
  assert.equal(matchPartial.earnedPoints, 5);

  const wort2 = getExerciseById('a1-wortschatz-2')!;
  const shortCorrect = evaluateObjectiveQuestion(wort2.questions[0], 'pünktlich');
  assert.equal(shortCorrect.isCorrect, true);
});

test('evaluateSelfAssessedQuestion scales score by checklist completion', () => {
  const schreiben1 = getExerciseById('a1-schreiben-1')!;
  const q = schreiben1.questions[0];
  const half = evaluateSelfAssessedQuestion(q, [true, true, false, false], 'Lieber Tim, ...');
  assert.equal(half.isObjective, false);
  assert.equal(half.earnedPoints, Math.round((2 / 4) * q.points));
});

test('calculateExerciseResult aggregates points, percentage, and counts accurately', () => {
  const lesen1 = getExerciseById('a1-lesen-1')!;
  const result = calculateExerciseResult(lesen1, {
    'a1-lesen-1-q1': 'Aus Österreich',
    'a1-lesen-1-q2': 'Nur am Montag nachmittags',
    'a1-lesen-1-q3': 'Falsch',
  });

  assert.equal(result.totalScore, 20);
  assert.equal(result.maxScore, 30);
  assert.equal(result.percentage, 67);
  assert.equal(result.correctCount, 2);
  assert.equal(result.incorrectCount, 1);
});
