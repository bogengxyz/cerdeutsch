import test from 'node:test';
import assert from 'node:assert/strict';
import { createEmptyProgress } from './progressService';
import { generateLearningRecommendations } from './recommendationService';

test('generateLearningRecommendations returns empty array when local data is insufficient', () => {
  const emptyProgress = createEmptyProgress('A1', 30);
  const recs = generateLearningRecommendations({
    progress: emptyProgress,
    mistakes: [],
    srsSchedule: {},
    examHistory: [],
  });
  assert.deepEqual(recs, []);
});

test('generateLearningRecommendations prioritizes open mistakes and due flashcards with German rationale', () => {
  const progress = createEmptyProgress('A1', 30);
  progress.completedExerciseIds = ['a1-grammatik-1'];
  progress.exerciseScores = {
    'a1-grammatik-1': {
      score: 10,
      maxScore: 20,
      percentage: 50,
      completedAt: '2026-11-22T10:00:00.000Z',
    },
  };

  const nowMs = Date.parse('2026-11-22T12:00:00.000Z');
  const recs = generateLearningRecommendations({
    progress,
    mistakes: [
      {
        id: 'a1-grammatik-1::q1',
        exerciseId: 'a1-grammatik-1',
        questionId: 'q1',
        originalQuestion: 'Testfrage',
        userAnswer: 'bin',
        correctAnswer: 'sind',
        explanationId: 'Penjelasan',
        recordedAt: '2026-11-22T10:00:00.000Z',
        level: 'A1',
        skill: 'grammatik',
        topic: 'Verbkonjugation',
        corrected: false,
      },
    ],
    srsSchedule: {
      'voc-a1-1': {
        vocabId: 'voc-a1-1',
        lastRating: 'wiederholen',
        repetitions: 0,
        intervalDays: 0,
        lastReviewedAtIso: '2026-11-22T11:00:00.000Z',
        nextReviewAtIso: '2026-11-22T11:10:00.000Z',
        difficultCount: 1,
      },
    },
    examHistory: [],
    nowMs,
  });

  assert.ok(recs.length >= 2);
  assert.equal(recs[0].targetPage, 'fehleranalyse');
  assert.ok(recs[0].reasonDe.includes('Verbkonjugation'));
  assert.ok(recs.some((r) => r.targetPage === 'wortschatz'));
});
