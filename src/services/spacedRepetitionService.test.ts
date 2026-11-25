import test from 'node:test';
import assert from 'node:assert/strict';
import { A1_VOCAB_WORDS } from '../data/vocabulary/a1';
import {
  calculateNextReviewRecord,
  getDifficultFlashcards,
  getDueFlashcards,
  getDueFlashcardCount,
  getLearnedVocabularyCount,
  isFlashcardDue,
  loadFlashcardSchedule,
  recordFlashcardReview,
} from './spacedRepetitionService';

function createMemoryStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => {
      map.set(k, v);
    },
    removeItem: (k: string) => {
      map.delete(k);
    },
  };
}

test('calculateNextReviewRecord schedules intervals based on rating', () => {
  const baseMs = Date.parse('2026-11-22T12:00:00.000Z');

  const repeat = calculateNextReviewRecord('voc-a1-1', 'wiederholen', undefined, baseMs);
  assert.equal(repeat.intervalDays, 0);
  assert.equal(repeat.repetitions, 0);
  assert.equal(repeat.difficultCount, 1);

  const hard = calculateNextReviewRecord('voc-a1-1', 'schwierig', repeat, baseMs);
  assert.equal(hard.intervalDays, 1);
  assert.equal(hard.difficultCount, 2);

  const learn = calculateNextReviewRecord('voc-a1-1', 'lernen', hard, baseMs);
  assert.equal(learn.intervalDays, 2);
  assert.equal(learn.repetitions, 2);

  const known1 = calculateNextReviewRecord('voc-a1-1', 'gewusst', undefined, baseMs);
  assert.equal(known1.intervalDays, 4);

  const known2 = calculateNextReviewRecord('voc-a1-1', 'gewusst', known1, baseMs);
  assert.equal(known2.intervalDays, 7);
});

test('getDueFlashcards, getDifficultFlashcards, and persistence work accurately', () => {
  const storage = createMemoryStorage();
  const baseMs = Date.parse('2026-11-22T12:00:00.000Z');

  let schedule = loadFlashcardSchedule(storage);
  assert.deepEqual(schedule, {});

  schedule = recordFlashcardReview(schedule, A1_VOCAB_WORDS[0].id, 'wiederholen', baseMs, storage);
  schedule = recordFlashcardReview(schedule, A1_VOCAB_WORDS[1].id, 'gewusst', baseMs, storage);

  const reloaded = loadFlashcardSchedule(storage);
  assert.equal(Object.keys(reloaded).length, 2);

  // Immediately after rating: neither is due yet (wiederholen is +10 min, gewusst is +4 days)
  assert.equal(isFlashcardDue(reloaded[A1_VOCAB_WORDS[0].id], baseMs + 5 * 60 * 1000), false);
  assert.equal(isFlashcardDue(reloaded[A1_VOCAB_WORDS[0].id], baseMs + 11 * 60 * 1000), true);

  const dueAfter11Min = getDueFlashcards(A1_VOCAB_WORDS, reloaded, baseMs + 11 * 60 * 1000);
  assert.equal(dueAfter11Min.some((w) => w.id === A1_VOCAB_WORDS[0].id), true);
  assert.equal(dueAfter11Min.some((w) => w.id === A1_VOCAB_WORDS[1].id), false);
  assert.equal(getDueFlashcardCount(reloaded, baseMs + 11 * 60 * 1000), 1);

  const difficult = getDifficultFlashcards(A1_VOCAB_WORDS, reloaded);
  assert.equal(difficult.some((w) => w.id === A1_VOCAB_WORDS[0].id), true);
  assert.equal(difficult.some((w) => w.id === A1_VOCAB_WORDS[1].id), false);

  assert.equal(getLearnedVocabularyCount(reloaded), 1);
});
