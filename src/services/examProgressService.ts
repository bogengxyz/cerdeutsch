import {
  ActiveExamSession,
  ExamAttemptRecord,
  ExamConfiguration,
  ExamMode,
  ExamModuleKey,
} from '../types/exam';
import { ActivityEntry, UserProgressState } from '../types/progress';
import { evaluateExamSubmission } from './examScoringService';
import { getActiveModulesForSession } from './examService';

export function createExamSession(params: {
  exam: ExamConfiguration;
  mode: ExamMode;
  selectedModuleKey?: ExamModuleKey;
  nowMs?: number;
}): ActiveExamSession {
  const now = params.nowMs ?? Date.now();
  const activeModules = getActiveModulesForSession(
    params.exam,
    params.mode,
    params.selectedModuleKey,
  );
  return {
    sessionId: `exam-${params.exam.id}-${now}`,
    examId: params.exam.id,
    provider: params.exam.provider,
    level: params.exam.level,
    mode: params.mode,
    selectedModuleKey:
      params.mode === 'module' || (params.mode === 'practice' && params.selectedModuleKey)
        ? activeModules[0]?.moduleKey
        : undefined,
    activeModuleIndex: 0,
    activeQuestionIndex: 0,
    startedAtMs: now,
    moduleStartedAtMs: now,
    totalPausedMs: 0,
    isPaused: false,
    answers: {},
    flaggedQuestionIds: [],
    submitted: false,
  };
}

export function computeElapsedModuleSeconds(
  session: ActiveExamSession,
  nowMs: number = Date.now(),
): number {
  const effectiveNow =
    session.isPaused && typeof session.pausedAtMs === 'number' ? session.pausedAtMs : nowMs;
  const rawElapsedMs = Math.max(
    0,
    effectiveNow - session.moduleStartedAtMs - session.totalPausedMs,
  );
  return Math.floor(rawElapsedMs / 1000);
}

export function computeRemainingModuleSeconds(
  session: ActiveExamSession,
  moduleDurationMinutes: number,
  nowMs: number = Date.now(),
): number {
  if (session.mode === 'practice') {
    return Math.max(0, moduleDurationMinutes * 60);
  }
  const totalSec = Math.max(60, moduleDurationMinutes * 60);
  const elapsedSec = computeElapsedModuleSeconds(session, nowMs);
  return Math.max(0, totalSec - elapsedSec);
}

export function isModuleTimerExpired(
  session: ActiveExamSession,
  moduleDurationMinutes: number,
  nowMs: number = Date.now(),
): boolean {
  if (session.mode === 'practice' || session.submitted) return false;
  return computeRemainingModuleSeconds(session, moduleDurationMinutes, nowMs) <= 0;
}

export function toggleSessionPause(
  session: ActiveExamSession,
  nowMs: number = Date.now(),
): ActiveExamSession {
  // Pause is only permitted in untimed practice mode
  if (session.mode !== 'practice' || session.submitted) {
    return session;
  }

  if (!session.isPaused) {
    return {
      ...session,
      isPaused: true,
      pausedAtMs: nowMs,
    };
  }

  const pausedDuration =
    typeof session.pausedAtMs === 'number' ? Math.max(0, nowMs - session.pausedAtMs) : 0;

  return {
    ...session,
    isPaused: false,
    pausedAtMs: undefined,
    totalPausedMs: session.totalPausedMs + pausedDuration,
  };
}

export function advanceSessionToNextModule(
  session: ActiveExamSession,
  nextModuleIndex: number,
  nowMs: number = Date.now(),
): ActiveExamSession {
  if (session.submitted) return session;
  return {
    ...session,
    activeModuleIndex: nextModuleIndex,
    activeQuestionIndex: 0,
    moduleStartedAtMs: nowMs,
    pausedAtMs: undefined,
    totalPausedMs: 0,
    isPaused: false,
  };
}

export function toggleQuestionFlag(
  session: ActiveExamSession,
  questionId: string,
): ActiveExamSession {
  if (session.submitted) return session;
  const exists = session.flaggedQuestionIds.includes(questionId);
  return {
    ...session,
    flaggedQuestionIds: exists
      ? session.flaggedQuestionIds.filter((id) => id !== questionId)
      : [...session.flaggedQuestionIds, questionId],
  };
}

export function formatClockSeconds(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function finalizeExamAttempt(
  session: ActiveExamSession,
  exam: ExamConfiguration,
  nowMs: number = Date.now(),
): { lockedSession: ActiveExamSession; attempt: ExamAttemptRecord } {
  const submittedAtIso = new Date(nowMs).toISOString();
  const lockedSession: ActiveExamSession = {
    ...session,
    submitted: true,
    isPaused: false,
    submittedAtIso,
  };

  const evaluation = evaluateExamSubmission(
    exam,
    session.mode,
    session.answers,
    session.selectedModuleKey,
  );

  const durationSpentSeconds = Math.max(1, Math.floor((nowMs - session.startedAtMs) / 1000));

  const attempt: ExamAttemptRecord = {
    attemptId: session.sessionId,
    examId: exam.id,
    provider: exam.provider,
    level: exam.level,
    officialName: exam.officialName,
    mode: session.mode,
    selectedModuleKey: session.selectedModuleKey,
    startedAtIso: new Date(session.startedAtMs).toISOString(),
    submittedAtIso,
    durationSpentSeconds,
    answers: { ...session.answers },
    flaggedQuestionIds: [...session.flaggedQuestionIds],
    selfAssessmentRatings: {},
    evaluation,
  };

  return { lockedSession, attempt };
}

export function recordExamAttemptIntoUserProgress(
  progress: UserProgressState,
  attempt: ExamAttemptRecord,
): UserProgressState {
  const minutesSpent = Math.max(5, Math.min(45, Math.round(attempt.durationSpentSeconds / 60)));
  const scoreLabel =
    attempt.evaluation.objectiveMaxPoints > 0
      ? `${attempt.evaluation.objectivePercentage} % (Simulation)`
      : 'Selbsteinschätzung';

  const modeLabel =
    attempt.mode === 'full'
      ? 'Vollprüfung'
      : attempt.mode === 'module'
        ? `Modul ${attempt.selectedModuleKey?.toUpperCase() ?? ''}`.trim()
        : 'Prüfungstraining';

  const entry: ActivityEntry = {
    id: `exam-act-${attempt.attemptId}`,
    title: `${attempt.officialName} · ${modeLabel}`,
    module: 'pruefung',
    level: attempt.level,
    scoreLabel,
    timestampLabel: 'Gerade eben',
    completedAt: attempt.submittedAtIso,
  };

  const withoutDuplicate = progress.recentActivities.filter((a) => a.id !== entry.id);

  return {
    ...progress,
    todayMinutes: progress.todayMinutes + minutesSpent,
    recentActivities: [entry, ...withoutDuplicate].slice(0, 10),
  };
}
