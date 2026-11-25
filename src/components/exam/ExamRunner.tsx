import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Lock,
  PauseCircle,
} from 'lucide-react';
import {
  ActiveExamSession,
  ExamAnswerValue,
  ExamAttemptRecord,
  ExamConfiguration,
} from '../../types/exam';
import {
  advanceSessionToNextModule,
  computeRemainingModuleSeconds,
  finalizeExamAttempt,
  isModuleTimerExpired,
  toggleQuestionFlag,
  toggleSessionPause,
} from '../../services/examProgressService';
import { isExamQuestionAnswered } from '../../services/examScoringService';
import { flattenModuleQuestions, getActiveModulesForSession } from '../../services/examService';
import {
  getNeutralExamLevelLabel,
  getNeutralExamTitle,
  getNeutralModuleLabel,
  getNeutralProviderShortLabel,
  sanitizeExamBrandingText,
} from '../../utils/brandLabels';
import { TouchButton } from '../ui/TouchFlowPrimitives';
import { ExamAnswerSheet } from './ExamAnswerSheet';
import { ExamFlagButton } from './ExamFlagButton';
import { ExamInstructions } from './ExamInstructions';
import { ExamProgress } from './ExamProgress';
import { ExamQuestionNavigation } from './ExamQuestionNavigation';
import { ExamQuestionRenderer } from './ExamQuestionRenderer';
import { ExamResult } from './ExamResult';
import { ExamSubmitDialog } from './ExamSubmitDialog';
import { ExamTimer } from './ExamTimer';

interface ExamRunnerProps {
  exam: ExamConfiguration;
  session: ActiveExamSession;
  submittedAttempt: ExamAttemptRecord | null;
  onUpdateSession: (next: ActiveExamSession) => void;
  onSubmitSession: (lockedSession: ActiveExamSession, attempt: ExamAttemptRecord) => void;
  onUpdateAttemptSelfRatings: (
    attemptId: string,
    questionId: string,
    nextRatings: Record<string, number>,
  ) => void;
  onExitToOverview: () => void;
  onRetryExam: () => void;
  soundEnabled?: boolean;
}

export function ExamRunner({
  exam,
  session,
  submittedAttempt,
  onUpdateSession,
  onSubmitSession,
  onUpdateAttemptSelfRatings,
  onExitToOverview,
  onRetryExam,
  soundEnabled = true,
}: ExamRunnerProps) {
  const [showAnswerSheet, setShowAnswerSheet] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [timeExpiredNotice, setTimeExpiredNotice] = useState<string | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const activeModules = useMemo(
    () => getActiveModulesForSession(exam, session.mode, session.selectedModuleKey),
    [exam, session.mode, session.selectedModuleKey],
  );

  const safeModuleIndex = Math.min(session.activeModuleIndex, Math.max(0, activeModules.length - 1));
  const currentModule = activeModules[safeModuleIndex];

  const moduleQuestionsFlattened = useMemo(
    () => (currentModule ? flattenModuleQuestions([currentModule]) : []),
    [currentModule],
  );

  const allSessionQuestions = useMemo(
    () => flattenModuleQuestions(activeModules),
    [activeModules],
  );

  const safeQuestionIndex = Math.min(
    session.activeQuestionIndex,
    Math.max(0, moduleQuestionsFlattened.length - 1),
  );
  const currentItem = moduleQuestionsFlattened[safeQuestionIndex];
  const currentSection = currentModule?.sections[currentItem?.sectionIndex ?? 0];

  const handleConfirmFinalSubmit = useCallback(() => {
    if (session.submitted) return;
    setShowSubmitDialog(false);
    const { lockedSession, attempt } = finalizeExamAttempt(session, exam, Date.now());
    onSubmitSession(lockedSession, attempt);
  }, [exam, onSubmitSession, session]);

  useEffect(() => {
    if (session.submitted || submittedAttempt || !currentModule) return;

    const tick = () => {
      const currentNow = Date.now();
      setNowMs(currentNow);

      if (
        session.mode !== 'practice' &&
        isModuleTimerExpired(session, currentModule.durationMinutes, currentNow)
      ) {
        if (safeModuleIndex < activeModules.length - 1) {
          const nextMod = activeModules[safeModuleIndex + 1];
          setTimeExpiredNotice(
            `Die Zeit für „${currentModule.titleDe}“ ist abgelaufen. Weiter mit „${nextMod.titleDe}“.`,
          );
          onUpdateSession(advanceSessionToNextModule(session, safeModuleIndex + 1, currentNow));
        } else {
          setTimeExpiredNotice('Die Prüfungszeit ist abgelaufen. Die Prüfung wird abgegeben.');
          handleConfirmFinalSubmit();
        }
      }
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, [
    activeModules,
    currentModule,
    handleConfirmFinalSubmit,
    onUpdateSession,
    safeModuleIndex,
    session,
    submittedAttempt,
  ]);

  if (submittedAttempt || session.submitted) {
    const attemptToShow =
      submittedAttempt ?? finalizeExamAttempt(session, exam, Date.now()).attempt;
    return (
      <ExamResult
        exam={exam}
        attempt={attemptToShow}
        onUpdateSelfRatings={(questionId, nextRatings) =>
          onUpdateAttemptSelfRatings(attemptToShow.attemptId, questionId, nextRatings)
        }
        onBackToOverview={onExitToOverview}
        onRetryExam={onRetryExam}
      />
    );
  }

  if (!currentModule || !currentItem || !currentSection) {
    return null;
  }

  const remainingSeconds = computeRemainingModuleSeconds(
    session,
    currentModule.durationMinutes,
    nowMs,
  );

  const moduleAnsweredCount = moduleQuestionsFlattened.filter((item) =>
    isExamQuestionAnswered(item.question, session.answers[item.question.id]),
  ).length;

  const totalAnsweredCount = allSessionQuestions.filter((item) =>
    isExamQuestionAnswered(item.question, session.answers[item.question.id]),
  ).length;

  const isFlagged = session.flaggedQuestionIds.includes(currentItem.question.id);
  const isLastQuestionInModule = safeQuestionIndex >= moduleQuestionsFlattened.length - 1;
  const isLastModule = safeModuleIndex >= activeModules.length - 1;

  const handleAnswerChange = (nextVal: ExamAnswerValue) => {
    if (session.submitted || session.isPaused) return;
    onUpdateSession({
      ...session,
      answers: {
        ...session.answers,
        [currentItem.question.id]: nextVal,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Bar: Back + Mode + Timer + Answer Sheet */}
      <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-4 sm:p-5 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_2px_10px_rgba(28,25,23,0.04)] dark:shadow-none space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <TouchButton variant="ghost" size="sm" onClick={onExitToOverview}>
              <ArrowLeft className="w-4 h-4" />
              Prüfung verlassen
            </TouchButton>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-[#B91C1C] dark:text-[#F87171]">
                {getNeutralProviderShortLabel(exam.provider)} ·{' '}
                {getNeutralExamLevelLabel(exam.level)} ·{' '}
                {session.mode === 'full'
                  ? 'Simulasi Penuh'
                  : session.mode === 'module'
                    ? 'Satu Modul'
                    : 'Latihan Bebas'}
              </p>
              <h1 className="font-display text-lg sm:text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                {getNeutralExamTitle(exam.provider, exam.level)}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <ExamTimer
              mode={session.mode}
              remainingSeconds={remainingSeconds}
              isPaused={session.isPaused}
              submitted={session.submitted}
              onTogglePause={() => onUpdateSession(toggleSessionPause(session, Date.now()))}
            />
            <TouchButton
              variant="secondary"
              size="sm"
              onClick={() => setShowAnswerSheet(true)}
            >
              <ClipboardList className="w-4 h-4" />
              Antwortbogen
            </TouchButton>
          </div>
        </div>

        {/* Module Step Tabs (visible for full exam) */}
        {activeModules.length > 1 && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
            {activeModules.map((mod, idx) => {
              const active = idx === safeModuleIndex;
              const lockedPastTimed = session.mode === 'full' && idx < safeModuleIndex;
              const lockedFutureTimed = session.mode === 'full' && idx > safeModuleIndex;
              return (
                <button
                  key={mod.moduleKey}
                  type="button"
                  disabled={lockedPastTimed || lockedFutureTimed}
                  onClick={() => {
                    if (session.mode === 'practice') {
                      onUpdateSession(advanceSessionToNextModule(session, idx, Date.now()));
                    }
                  }}
                  className={`min-h-[40px] px-3.5 rounded-xl text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#B91C1C] dark:bg-[#DC2626] text-white'
                      : lockedPastTimed
                        ? 'bg-[#ECFDF5] text-[#166534] border border-[#A7F3D0] dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60'
                        : 'bg-[#F3EFE6] text-[#57524C] border border-[#E6E0D4] dark:bg-[#262320] dark:text-[#B5AEA5] dark:border-[#3A352F]'
                  } ${session.mode === 'practice' && !active ? 'cursor-pointer hover:bg-[#EAE3D5]' : 'cursor-default'}`}
                >
                  {lockedPastTimed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {lockedFutureTimed && <Lock className="w-3.5 h-3.5 opacity-65" />}
                  <span>
                    {idx + 1}. {mod.titleDe}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <ExamProgress
          currentNumber={safeQuestionIndex + 1}
          totalQuestions={moduleQuestionsFlattened.length}
          answeredCount={moduleAnsweredCount}
          flaggedCount={
            moduleQuestionsFlattened.filter((item) =>
              session.flaggedQuestionIds.includes(item.question.id),
            ).length
          }
          moduleTitleDe={currentModule.titleDe}
        />
      </div>

      {timeExpiredNotice && (
        <div className="rounded-xl bg-[#FAF2DF] dark:bg-[#2B2318] border border-[#EADBC0] dark:border-[#4A3D28] p-3.5 text-[13px] font-medium text-[#92400E] dark:text-amber-200">
          {timeExpiredNotice}
        </div>
      )}

      {/* Paused overlay in practice mode */}
      {session.isPaused ? (
        <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-8 border border-[#E6E0D4] dark:border-[#2E2A25] text-center space-y-4">
          <PauseCircle className="w-10 h-10 text-[#B91C1C] dark:text-[#F87171] mx-auto" />
          <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Prüfungstraining pausiert
          </h2>
          <p className="text-[14px] text-[#57524C] dark:text-[#D6CFC5] max-w-md mx-auto">
            Deine bisherigen Antworten sind sicher gespeichert. Klicke auf „Training fortsetzen“,
            um weiterzuarbeiten.
          </p>
          <TouchButton
            variant="primary"
            size="md"
            onClick={() => onUpdateSession(toggleSessionPause(session, Date.now()))}
          >
            Training fortsetzen
          </TouchButton>
        </section>
      ) : (
        <>
          <ExamInstructions
            moduleTitleDe={getNeutralModuleLabel(currentModule.moduleKey)}
            instructionsDe={sanitizeExamBrandingText(currentModule.instructionsDe)}
            sectionTitleDe={sanitizeExamBrandingText(currentSection.titleDe)}
            sectionInstructionsDe={sanitizeExamBrandingText(currentSection.instructionsDe)}
            isSprachbausteine={currentSection.isSprachbausteine}
          />

          {/* Main Question Surface */}
          <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 sm:p-7 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_2px_12px_rgba(28,25,23,0.04)] dark:shadow-none space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EFEAE0] dark:border-[#2E2A25]">
              <span className="text-[13px] font-semibold text-[#6B6560] dark:text-[#B5AEA5]">
                {currentSection.subtitleDe}
              </span>
              <ExamFlagButton
                isFlagged={isFlagged}
                disabled={session.submitted}
                onToggle={() =>
                  onUpdateSession(toggleQuestionFlag(session, currentItem.question.id))
                }
              />
            </div>

            <ExamQuestionRenderer
              question={currentItem.question}
              questionNumber={safeQuestionIndex + 1}
              answer={session.answers[currentItem.question.id]}
              disabled={session.submitted}
              onChange={handleAnswerChange}
              level={exam.level}
              soundEnabled={soundEnabled}
            />

            {/* Footer Controls */}
            <div className="pt-4 border-t border-[#EFEAE0] dark:border-[#2E2A25] flex flex-wrap items-center justify-between gap-3">
              <TouchButton
                variant="secondary"
                size="md"
                disabled={safeQuestionIndex === 0}
                onClick={() =>
                  onUpdateSession({
                    ...session,
                    activeQuestionIndex: Math.max(0, safeQuestionIndex - 1),
                  })
                }
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück
              </TouchButton>

              <div className="flex flex-wrap items-center gap-2.5">
                {!isLastQuestionInModule ? (
                  <TouchButton
                    variant="primary"
                    size="md"
                    onClick={() =>
                      onUpdateSession({
                        ...session,
                        activeQuestionIndex: safeQuestionIndex + 1,
                      })
                    }
                  >
                    Nächste Aufgabe
                    <ArrowRight className="w-4 h-4" />
                  </TouchButton>
                ) : !isLastModule ? (
                  <TouchButton
                    variant="primary"
                    size="md"
                    onClick={() => {
                      setTimeExpiredNotice(null);
                      onUpdateSession(
                        advanceSessionToNextModule(session, safeModuleIndex + 1, Date.now()),
                      );
                    }}
                  >
                    Nächstes Modul starten ({activeModules[safeModuleIndex + 1]?.titleDe})
                    <ArrowRight className="w-4 h-4" />
                  </TouchButton>
                ) : (
                  <TouchButton
                    variant="primary"
                    size="md"
                    onClick={() => setShowSubmitDialog(true)}
                  >
                    Prüfung abgeben
                    <CheckCircle2 className="w-4 h-4" />
                  </TouchButton>
                )}
              </div>
            </div>
          </section>

          {/* Module Question Navigation Grid */}
          <section className="bg-[#F7F4EC] dark:bg-[#1A1816] rounded-2xl p-4 sm:p-5 border border-[#E6E0D4] dark:border-[#2E2A25] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex-1">
              <ExamQuestionNavigation
                questions={moduleQuestionsFlattened.map((i) => i.question)}
                activeIndex={safeQuestionIndex}
                answers={session.answers}
                flaggedQuestionIds={session.flaggedQuestionIds}
                onSelectIndex={(idx) =>
                  onUpdateSession({
                    ...session,
                    activeQuestionIndex: idx,
                  })
                }
              />
            </div>
            <TouchButton
              variant="secondary"
              size="sm"
              onClick={() => setShowSubmitDialog(true)}
            >
              Prüfung abgeben
            </TouchButton>
          </section>
        </>
      )}

      <ExamAnswerSheet
        open={showAnswerSheet}
        onClose={() => setShowAnswerSheet(false)}
        questions={moduleQuestionsFlattened.map((i) => i.question)}
        answers={session.answers}
        flaggedQuestionIds={session.flaggedQuestionIds}
        activeIndex={safeQuestionIndex}
        onJumpToQuestion={(idx) =>
          onUpdateSession({
            ...session,
            activeQuestionIndex: idx,
          })
        }
        onRequestSubmit={() => setShowSubmitDialog(true)}
        submitted={session.submitted}
      />

      <ExamSubmitDialog
        open={showSubmitDialog}
        onClose={() => setShowSubmitDialog(false)}
        onConfirmSubmit={handleConfirmFinalSubmit}
        totalQuestions={allSessionQuestions.length}
        answeredCount={totalAnsweredCount}
        flaggedCount={session.flaggedQuestionIds.length}
      />
    </div>
  );
}
