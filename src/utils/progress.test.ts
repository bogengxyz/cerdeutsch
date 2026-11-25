import test from 'node:test';
import assert from 'node:assert/strict';
import { getExerciseById } from '../data/exercises';
import { calculateExerciseResult } from '../services/scoringService';
import {
  DEFAULT_PROGRESS,
  calculateDailyGoalPercent,
  calculateLevelProgressPercent,
  calculateOverallProgressPercent,
  createEmptyProgress,
  getLevelModuleCounts,
  loadProgress,
  recordCompletedExerciseResult,
  recordExerciseCompletion,
  saveProgress,
  toggleGrammarCompletion,
  toggleVocabBookmark,
} from './progress';

test('calculateDailyGoalPercent clamps between 0 and 100', () => {
  assert.equal(calculateDailyGoalPercent(15, 30), 50);
  assert.equal(calculateDailyGoalPercent(45, 30), 100);
  assert.equal(calculateDailyGoalPercent(0, 30), 0);
});

test('calculateOverallProgressPercent computes ratio of completed exercises and grammar', () => {
  const empty = createEmptyProgress('A1', 30);
  assert.equal(calculateOverallProgressPercent(empty), 0);

  const defaultPercent = calculateOverallProgressPercent(DEFAULT_PROGRESS);
  assert.ok(defaultPercent > 0 && defaultPercent <= 100);
});

test('calculateLevelProgressPercent reflects A1 completions accurately', () => {
  const empty = createEmptyProgress('A1', 30);
  assert.equal(calculateLevelProgressPercent(empty, 'A1'), 0);

  const a1Percent = calculateLevelProgressPercent(DEFAULT_PROGRESS, 'A1');
  assert.ok(a1Percent > 0);
});

test('recordExerciseCompletion updates completed IDs, scores, minutes, skill score, and activity feed', () => {
  const start = createEmptyProgress('A1', 30);
  const updated = recordExerciseCompletion(start, {
    exerciseId: 'a1-lesen-1',
    title: 'Neue Kursteilnehmer im Deutschkurs',
    skill: 'lesen',
    level: 'A1',
    durationMinutes: 8,
    scorePercent: 100,
    score: 30,
    maxScore: 30,
  });

  assert.deepEqual(updated.completedExerciseIds, ['a1-lesen-1']);
  assert.equal(updated.skillScores.lesen, 100);
  assert.equal(updated.todayMinutes, 8);
  assert.equal(updated.exerciseScores['a1-lesen-1']?.percentage, 100);
  assert.equal(updated.recentActivities[0]?.title, 'Neue Kursteilnehmer im Deutschkurs');
});

test('recordCompletedExerciseResult tracks completedTopics and resolves mistakes on retry', () => {
  const start = createEmptyProgress('A1', 30);
  const exercise = getExerciseById('a1-lesen-1')!;

  // First attempt: 2/3 correct -> 67% -> topic completed, 1 incorrect recorded
  const eval1 = calculateExerciseResult(exercise, {
    'a1-lesen-1-q1': 'Aus Österreich',
    'a1-lesen-1-q2': 'Jeden Samstagabend',
    'a1-lesen-1-q3': 'Falsch',
  });
  const afterFirst = recordCompletedExerciseResult(start, exercise, eval1);
  assert.equal(afterFirst.incorrectAnswers.length, 1);
  assert.equal(afterFirst.incorrectAnswers[0]?.questionId, 'a1-lesen-1-q2');
  assert.ok(afterFirst.completedTopics.includes('A1:Begrüßung und Vorstellung'));

  // Retry: all 3 correct -> previous mistake cleared
  const eval2 = calculateExerciseResult(exercise, {
    'a1-lesen-1-q1': 'Aus Österreich',
    'a1-lesen-1-q2': 'Am Dienstag und Donnerstag vormittags',
    'a1-lesen-1-q3': 'Falsch',
  });
  const afterRetry = recordCompletedExerciseResult(afterFirst, exercise, eval2);
  assert.equal(afterRetry.incorrectAnswers.length, 0);
  assert.equal(afterRetry.exerciseScores['a1-lesen-1']?.percentage, 100);
});

test('toggleGrammarCompletion and toggleVocabBookmark toggle state idempotently', () => {
  const start = createEmptyProgress('A1', 30);
  const gAdded = toggleGrammarCompletion(start, 'gram-a1-1', 'Artikel und Genus', 'A1');
  assert.deepEqual(gAdded.completedGrammarIds, ['gram-a1-1']);
  const gRemoved = toggleGrammarCompletion(gAdded, 'gram-a1-1', 'Artikel und Genus', 'A1');
  assert.deepEqual(gRemoved.completedGrammarIds, []);

  const vAdded = toggleVocabBookmark(start, 'voc-a1-1');
  assert.deepEqual(vAdded.bookmarkedVocabIds, ['voc-a1-1']);
  const vRemoved = toggleVocabBookmark(vAdded, 'voc-a1-1');
  assert.deepEqual(vRemoved.bookmarkedVocabIds, []);
});

test('saveProgress and loadProgress round-trip through storage including Phase 2 fields', () => {
  const mem = new Map<string, string>();
  const mockStorage = {
    getItem: (k: string) => mem.get(k) ?? null,
    setItem: (k: string, v: string) => {
      mem.set(k, v);
    },
  };

  const state = createEmptyProgress('B1', 45);
  saveProgress(state, mockStorage);
  const loaded = loadProgress(mockStorage);
  assert.equal(loaded.currentLevel, 'B1');
  assert.equal(loaded.dailyGoalMinutes, 45);
  assert.deepEqual(loaded.completedTopics, []);
  assert.deepEqual(loaded.incorrectAnswers, []);
});

test('getLevelModuleCounts returns >= 3 items across all 6 modules for A1-B2', () => {
  for (const lvl of ['A1', 'A2', 'B1', 'B2'] as const) {
    const counts = getLevelModuleCounts(lvl);
    assert.ok(counts.lesen >= 3 && counts.hoeren >= 3 && counts.sprechen >= 3 && counts.schreiben >= 3);
    assert.ok(counts.grammatik >= 3 && counts.wortschatz >= 3);
  }
});
