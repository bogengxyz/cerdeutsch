import assert from 'node:assert/strict';
import test from 'node:test';
import { getExamConfiguration } from '../data/exams';
import {
  advanceSessionToNextModule,
  computeRemainingModuleSeconds,
  createExamSession,
  finalizeExamAttempt,
  isModuleTimerExpired,
  recordExamAttemptIntoUserProgress,
  toggleQuestionFlag,
  toggleSessionPause,
} from './examProgressService';
import {
  clearActiveExamSession,
  deleteExamAttemptRecord,
  loadActiveExamSession,
  loadExamHistory,
  saveActiveExamSession,
  upsertExamAttemptRecord,
} from './examStorageService';
import { DEFAULT_PROGRESS } from './progressService';

function createMemoryStorage() {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
  };
}

test('timestamp-based exam timer survives reload, counts down accurately, and expires on deadline', () => {
  const goetheA1 = getExamConfiguration('goethe', 'A1');
  const t0 = 1_700_000_000_000;
  const session = createExamSession({
    exam: goetheA1,
    mode: 'full',
    nowMs: t0,
  });

  // 25 min Lesen module = 1500s
  assert.equal(computeRemainingModuleSeconds(session, 25, t0 + 120_000), 1380);
  assert.equal(isModuleTimerExpired(session, 25, t0 + 120_000), false);
  assert.equal(isModuleTimerExpired(session, 25, t0 + 1_500_000), true);
});

test('pause is allowed only in practice mode and never in timed full/module exams', () => {
  const telcB1 = getExamConfiguration('telc', 'B1');
  const t0 = 1_700_000_000_000;

  const timed = createExamSession({ exam: telcB1, mode: 'full', nowMs: t0 });
  const afterTimedPause = toggleSessionPause(timed, t0 + 10_000);
  assert.equal(afterTimedPause.isPaused, false);

  const practice = createExamSession({
    exam: telcB1,
    mode: 'practice',
    selectedModuleKey: 'lesen',
    nowMs: t0,
  });
  const paused = toggleSessionPause(practice, t0 + 10_000);
  assert.equal(paused.isPaused, true);
  const resumed = toggleSessionPause(paused, t0 + 40_000);
  assert.equal(resumed.isPaused, false);
  assert.equal(resumed.totalPausedMs, 30_000);
});

test('flagging, module advancement, submission lock, and localStorage persistence work reliably', () => {
  const storage = createMemoryStorage();
  const goetheB1 = getExamConfiguration('goethe', 'B1');
  const t0 = 1_700_000_000_000;

  let session = createExamSession({ exam: goetheB1, mode: 'full', nowMs: t0 });
  session = toggleQuestionFlag(session, 'g-b1-l-1');
  assert.deepEqual(session.flaggedQuestionIds, ['g-b1-l-1']);

  session = advanceSessionToNextModule(session, 1, t0 + 500_000);
  assert.equal(session.activeModuleIndex, 1);
  saveActiveExamSession(session, storage);

  const restored = loadActiveExamSession(storage);
  assert.ok(restored);
  assert.equal(restored.activeModuleIndex, 1);
  assert.deepEqual(restored.flaggedQuestionIds, ['g-b1-l-1']);

  const { lockedSession, attempt } = finalizeExamAttempt(restored, goetheB1, t0 + 700_000);
  assert.equal(lockedSession.submitted, true);

  // Flagging after submit is locked
  const afterSubmitFlag = toggleQuestionFlag(lockedSession, 'g-b1-l-2');
  assert.deepEqual(afterSubmitFlag.flaggedQuestionIds, ['g-b1-l-1']);

  clearActiveExamSession(storage);
  assert.equal(loadActiveExamSession(storage), null);

  upsertExamAttemptRecord(attempt, storage);
  assert.equal(loadExamHistory(storage).length, 1);
  deleteExamAttemptRecord(attempt.attemptId, storage);
  assert.equal(loadExamHistory(storage).length, 0);

  // Bridge into Phase 2 progress preserves existing scores cleanly
  const nextProgress = recordExamAttemptIntoUserProgress(DEFAULT_PROGRESS, attempt);
  assert.equal(nextProgress.completedExerciseIds.length, DEFAULT_PROGRESS.completedExerciseIds.length);
  assert.equal(nextProgress.recentActivities[0].module, 'pruefung');
});
