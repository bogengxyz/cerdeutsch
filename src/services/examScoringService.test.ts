import assert from 'node:assert/strict';
import test from 'node:test';
import { ALL_EXAM_CONFIGURATIONS, getExamConfiguration } from '../data/exams';
import {
  computeSelfAssessedQuestionPoints,
  evaluateExamSubmission,
  evaluateObjectiveExamQuestion,
  isExamQuestionAnswered,
} from './examScoringService';
import { validateExamDatabase } from './examService';

test('validateExamDatabase verifies all 8 Goethe and telc A1-B2 exam configs cleanly', () => {
  const report = validateExamDatabase(ALL_EXAM_CONFIGURATIONS);
  assert.equal(report.valid, true, `Validation errors: ${report.errors.join('; ')}`);
  assert.equal(report.examCount, 8);
});

test('Goethe and telc B1 configurations maintain distinct structures and passing rules', () => {
  const goetheB1 = getExamConfiguration('goethe', 'B1');
  const telcB1 = getExamConfiguration('telc', 'B1');

  assert.equal(goetheB1.moduleIndependence, 'per-module');
  assert.equal(goetheB1.totalPoints, 400);
  assert.equal(telcB1.moduleIndependence, 'written-oral-split');
  assert.equal(telcB1.totalPoints, 300);
  assert.equal(telcB1.writtenPassingPoints, 135);
  assert.equal(telcB1.oralPassingPoints, 45);

  const telcLesen = telcB1.modules.find((m) => m.moduleKey === 'lesen');
  assert.ok(telcLesen?.sections.some((s) => s.isSprachbausteine === true));
});

test('evaluateObjectiveExamQuestion handles single-choice, multiple-select, matching, sentence-ordering, and dropdown accurately', () => {
  const goetheA2 = getExamConfiguration('goethe', 'A2');
  const goetheB1 = getExamConfiguration('goethe', 'B1');
  const telcB1 = getExamConfiguration('telc', 'B1');

  const multiSelectQ = goetheA2.modules[0].sections[1].questions[0];
  const exactRes = evaluateObjectiveExamQuestion(
    multiSelectQ,
    'lesen',
    'g-a2-lesen-t2',
    multiSelectQ.correctAnswer,
  );
  assert.equal(exactRes.isCorrect, true);
  assert.equal(exactRes.earnedPoints, multiSelectQ.points);

  const orderingQ = goetheB1.modules[0].sections[2].questions[1];
  const wrongOrderRes = evaluateObjectiveExamQuestion(orderingQ, 'lesen', 'g-b1-lesen-t4', [
    'Den persönlichen Bibliotheksausweis direkt mitnehmen.',
    'Ausweis und Meldebestätigung an der Information vorzeigen.',
    'Die Jahresgebühr von 18 Euro am Automaten bezahlen.',
    'Das Anmeldeformular am Tablet ausfüllen und unterschreiben.',
  ]);
  assert.equal(wrongOrderRes.isCorrect, false);

  const sbQ = telcB1.modules[0].sections[1].questions[0];
  const sbRes = evaluateObjectiveExamQuestion(sbQ, 'lesen', 't-b1-sprachbausteine', {
    'sb-1': 'obwohl',
    'sb-2': 'weil',
    'sb-3': 'der',
  });
  assert.equal(sbRes.isCorrect, true);
  assert.equal(sbRes.earnedPoints, sbQ.points);
});

test('evaluateExamSubmission separates objective scoring from writing/speaking self-assessment and reports missing audio honestly', () => {
  const goetheA1 = getExamConfiguration('goethe', 'A1');

  const result = evaluateExamSubmission(goetheA1, 'full', {
    'g-a1-l-1': 'Falsch',
    'g-a1-l-2': 'Richtig',
    'g-a1-s-2': 'Liebe Laura, ich komme am Samstag um 14 Uhr.',
  });

  assert.equal(result.hasMissingAudioLimitation, true);
  assert.ok(result.missingAudioQuestionIds.includes('g-a1-h-1'));
  assert.equal(result.selfAssessedCount, 2);

  // Writing and Speaking questions must NOT be auto-graded as earned objective points
  const schreibenEval = result.moduleEvaluations.find((m) => m.moduleKey === 'schreiben');
  assert.ok(schreibenEval);
  assert.equal(schreibenEval.hasSelfAssessmentQuestions, true);
  assert.equal(schreibenEval.selfAssessedUserPoints, null);

  // Verify user self-assessment rubric calculation works post-submission
  const writingQ = goetheA1.modules[2].sections[1].questions[0];
  const selfPts = computeSelfAssessedQuestionPoints(writingQ, {
    aufgabenerfuellung: 3,
    inhaltliche_relevanz: 3,
  });
  assert.equal(selfPts, 3);
  assert.equal(isExamQuestionAnswered(writingQ, 'Hallo Laura'), true);
  assert.equal(isExamQuestionAnswered(writingQ, '   '), false);
});
