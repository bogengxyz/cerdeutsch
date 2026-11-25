import test from 'node:test';
import assert from 'node:assert/strict';
import {
  completeStep1,
  completeStep2,
  getDailyWords,
  getTodayDateString,
  loadDailyMissionState,
  saveDailyMissionState,
  DAILY_MISSION_STORAGE_KEY,
} from './dailyMissionService';

test('getDailyWords returns 5 unique A1 vocabulary words', async () => {
  const words = await getDailyWords('2026-11-24');
  assert.equal(words.length, 5);
  const ids = new Set(words.map((w) => w.id));
  assert.equal(ids.size, 5);
  for (const w of words) {
    assert.equal(w.level, 'A1');
    assert.ok(w.word.length > 0);
    assert.ok(w.meaningId.length > 0);
  }
});

test('dailyMissionService handles new day, step completions, streak and persistence', () => {
  const storageMap = new Map<string, string>();
  const mockStorage = {
    getItem: (k: string) => storageMap.get(k) ?? null,
    setItem: (k: string, v: string) => storageMap.set(k, v),
  };

  // Day 1 initial load
  const day1 = '2026-11-24';
  const state1 = loadDailyMissionState(mockStorage, day1);
  assert.equal(state1.date, day1);
  assert.equal(state1.completed, false);
  assert.equal(state1.step1Completed, false);
  assert.equal(state1.streakDays, 0);

  // Complete step 1
  const afterStep1 = completeStep1(state1, ['voc-a1-1', 'voc-a1-2']);
  assert.equal(afterStep1.step1Completed, true);
  assert.equal(afterStep1.step1LearnedIds.length, 2);

  // Complete step 2
  const afterStep2 = completeStep2(afterStep1, 5);
  assert.equal(afterStep2.step2Completed, true);
  assert.equal(afterStep2.completed, true);
  assert.equal(afterStep2.streakDays, 1);
  assert.equal(afterStep2.totalMissionsCompleted, 1);
  assert.equal(afterStep2.badgeUnlocked, true);
  assert.equal(afterStep2.xpEarned, 50);

  saveDailyMissionState(afterStep2, mockStorage);

  // Next consecutive day load (Day 2)
  const day2 = '2026-11-25';
  const state2 = loadDailyMissionState(mockStorage, day2);
  assert.equal(state2.date, day2);
  assert.equal(state2.completed, false);
  assert.equal(state2.streakDays, 1); // Streak preserved!
  assert.equal(state2.totalMissionsCompleted, 1);

  // Complete Day 2
  const state2Done = completeStep2(completeStep1(state2, ['voc-a1-3']), 4);
  assert.equal(state2Done.streakDays, 2);
  assert.equal(state2Done.totalMissionsCompleted, 2);
});
