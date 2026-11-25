import test from 'node:test';
import assert from 'node:assert/strict';
import {
  auditAudioAssets,
  auditFullQuestionBankAsync,
  validateAllContentAsync,
} from './contentValidationService';

test('validateAllContent passes with zero errors across all A1-B2 exercises, 42+ grammar topics, and vocabulary', async () => {
  const report = await validateAllContentAsync();

  assert.equal(report.valid, true, `Validation errors:\n${report.errors.join('\n')}`);
  assert.equal(report.errors.length, 0);
  assert.ok(report.totalExercises >= 90, `Expected >= 90 exercises, got ${report.totalExercises}`);
  assert.ok(
    report.totalGrammarTopics >= 42,
    `Expected >= 42 grammar topics, got ${report.totalGrammarTopics}`,
  );
  assert.ok(
    report.totalVocabulary >= 80,
    `Expected >= 80 vocabulary entries, got ${report.totalVocabulary}`,
  );
});

test('auditFullQuestionBankAsync passes with zero errors, duplicates, or near-duplicates across A1-B2 (4800+ questions)', async () => {
  const report = await auditFullQuestionBankAsync();

  assert.equal(report.valid, true, `Full audit errors:\n${report.errors.join('\n')}`);
  assert.equal(report.errors.length, 0);
  assert.ok(report.questionBankAudit, 'Expected questionBankAudit to be present');

  const qb = report.questionBankAudit;
  assert.equal(qb.valid, true, `QB audit errors:\n${qb.errors.join('\n')}`);
  assert.deepEqual(qb.errors, []);
  assert.equal(qb.invalidQuestionsCount, 0);
  assert.equal(qb.duplicateIdsCount, 0);
  assert.equal(qb.nearDuplicateCount, 0);
  assert.ok(qb.totalQuestions >= 4800, `Expected >= 4800 questions, got ${qb.totalQuestions}`);

  const b2Row = qb.rowsByLevel.find((row) => row.level === 'B2');
  assert.ok(b2Row, 'Expected B2 row in rowsByLevel');
  assert.ok(b2Row.lesen >= 300, `Expected B2 lesen >= 300, got ${b2Row.lesen}`);
  assert.ok(
    b2Row.hoerenWithAudio + b2Row.hoerenAwaitingAudio >= 200,
    `Expected B2 total hoeren >= 200, got ${b2Row.hoerenWithAudio + b2Row.hoerenAwaitingAudio}`,
  );
  assert.ok(b2Row.grammatik >= 400, `Expected B2 grammatik >= 400, got ${b2Row.grammatik}`);
  assert.ok(b2Row.wortschatz >= 300, `Expected B2 wortschatz >= 300, got ${b2Row.wortschatz}`);
  assert.ok(b2Row.schreiben >= 10, `Expected B2 schreiben >= 10, got ${b2Row.schreiben}`);
  assert.ok(b2Row.sprechen >= 10, `Expected B2 sprechen >= 10, got ${b2Row.sprechen}`);
});

test('auditAudioAssets honestly reports missing audio assets when no real audioUrl exists', () => {
  const audioAudit = auditAudioAssets();
  assert.ok(audioAudit.length > 0);
  // Every entry without an available audioUrl must be reported as 'missing'
  for (const item of audioAudit) {
    if (!item.audioUrl) {
      assert.equal(item.status, 'missing');
    }
  }
});
