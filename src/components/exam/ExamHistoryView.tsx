import React, { useState } from 'react';
import {
  ArrowRight,
  Clock,
  Eye,
  History,
  Play,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { ActiveExamSession, ExamAttemptRecord } from '../../types/exam';
import { getExamConfigurationById } from '../../data/exams';
import { getNeutralExamTitle } from '../../utils/brandLabels';
import { TouchButton } from '../ui/TouchFlowPrimitives';

interface ExamHistoryViewProps {
  unfinishedSession: ActiveExamSession | null;
  attempts: ExamAttemptRecord[];
  onResumeUnfinished: () => void;
  onDiscardUnfinished: () => void;
  onViewAttempt: (attempt: ExamAttemptRecord) => void;
  onDeleteAttempt: (attemptId: string) => void;
}

export function ExamHistoryView({
  unfinishedSession,
  attempts,
  onResumeUnfinished,
  onDiscardUnfinished,
  onViewAttempt,
  onDeleteAttempt,
}: ExamHistoryViewProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDiscardSession, setConfirmDiscardSession] = useState(false);

  const unfinishedConfig = unfinishedSession
    ? getExamConfigurationById(unfinishedSession.examId)
    : undefined;

  const latestAttempt = attempts[0];
  const previousAttempt = attempts[1];
  const comparisonDelta =
    latestAttempt &&
    previousAttempt &&
    latestAttempt.evaluation.objectiveMaxPoints > 0 &&
    previousAttempt.evaluation.objectiveMaxPoints > 0
      ? latestAttempt.evaluation.objectivePercentage -
        previousAttempt.evaluation.objectivePercentage
      : null;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-[#B91C1C] dark:text-[#F87171]" />
          <h2 className="font-display text-xl font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
            Prüfungsverlauf & Fortsetzen
          </h2>
        </div>
        {comparisonDelta !== null && (
          <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#57524C] dark:text-[#D6CFC5] tabular-nums">
            <TrendingUp className="w-4 h-4 text-[#15803D] dark:text-emerald-400" />
            <span>
              Vergleich zum vorletzten Versuch:{' '}
              {comparisonDelta >= 0 ? `+${comparisonDelta}` : comparisonDelta} Prozentpunkte
            </span>
          </div>
        )}
      </div>

      {unfinishedSession && !unfinishedSession.submitted && unfinishedConfig && (
        <div className="rounded-2xl bg-[#FDF2F2] dark:bg-[#2C1A19] border border-[#E9B8B8] dark:border-[#5C2926] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#B91C1C] dark:text-[#F87171]">
              Laufende Prüfung gefunden
            </p>
            <h3 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              {getNeutralExamTitle(unfinishedConfig.provider, unfinishedConfig.level)}
            </h3>
            <p className="text-[13px] text-[#57524C] dark:text-[#D6CFC5] tabular-nums">
              Modus:{' '}
              {unfinishedSession.mode === 'full'
                ? 'Vollständige Prüfung'
                : unfinishedSession.mode === 'module'
                  ? `Modul ${unfinishedSession.selectedModuleKey?.toUpperCase() ?? ''}`
                  : 'Prüfungstraining'}{' '}
              · Gespeicherte Antworten: {Object.keys(unfinishedSession.answers).length}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {confirmDiscardSession ? (
              <>
                <TouchButton
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    onDiscardUnfinished();
                    setConfirmDiscardSession(false);
                  }}
                >
                  Wirklich verwerfen
                </TouchButton>
                <TouchButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmDiscardSession(false)}
                >
                  Abbrechen
                </TouchButton>
              </>
            ) : (
              <>
                <TouchButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmDiscardSession(true)}
                >
                  Verwerfen
                </TouchButton>
                <TouchButton variant="primary" size="sm" onClick={onResumeUnfinished}>
                  <Play className="w-4 h-4" />
                  Fortsetzen
                </TouchButton>
              </>
            )}
          </div>
        </div>
      )}

      {attempts.length === 0 ? (
        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] p-6 text-center space-y-2">
          <Clock className="w-6 h-6 text-[#8A837A] mx-auto" />
          <p className="text-[14px] text-[#57524C] dark:text-[#D6CFC5]">
            Noch keine abgegebenen Prüfungssimulationen gespeichert.
          </p>
          <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">
            Alle Ergebnisse werden lokal im Browser gespeichert (ohne Konto).
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] overflow-hidden">
          <ul className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25]">
            {attempts.map((att) => {
              const dateLabel = new Date(att.submittedAtIso).toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
              const modeLabel =
                att.mode === 'full'
                  ? 'Vollprüfung'
                  : att.mode === 'module'
                    ? `Modul ${att.selectedModuleKey?.toUpperCase() ?? ''}`
                    : 'Prüfungstraining';
              const scoreDisplay =
                att.evaluation.objectiveMaxPoints > 0
                  ? `${att.evaluation.objectivePercentage} % (${att.evaluation.objectiveEarnedPoints}/${att.evaluation.objectiveMaxPoints} Pkt.)`
                  : 'Selbsteinschätzung';

              return (
                <li
                  key={att.attemptId}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <p className="font-display text-[16px] font-bold text-[#1C1917] dark:text-[#F5F2EB] truncate">
                      {getNeutralExamTitle(att.provider, att.level)}
                    </p>
                    <p className="text-[13px] text-[#6B6560] dark:text-[#B5AEA5] tabular-nums">
                      {modeLabel} · {dateLabel} · Dauer:{' '}
                      {Math.max(1, Math.round(att.durationSpentSeconds / 60))} Min.
                    </p>
                    <p className="text-[13px] font-semibold text-[#B91C1C] dark:text-[#F87171] tabular-nums">
                      Objektive Auswertung: {scoreDisplay}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <TouchButton variant="secondary" size="sm" onClick={() => onViewAttempt(att)}>
                      <Eye className="w-4 h-4" />
                      Ergebnis ansehen
                      <ArrowRight className="w-3.5 h-3.5" />
                    </TouchButton>

                    {confirmDeleteId === att.attemptId ? (
                      <div className="flex items-center gap-1.5">
                        <TouchButton
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            onDeleteAttempt(att.attemptId);
                            setConfirmDeleteId(null);
                          }}
                        >
                          Löschen
                        </TouchButton>
                        <TouchButton
                          variant="ghost"
                          size="sm"
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          Abbrechen
                        </TouchButton>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(att.attemptId)}
                        aria-label={`Hapus riwayat ${getNeutralExamTitle(att.provider, att.level)}`}
                        className="min-w-[44px] min-h-[44px] rounded-xl text-[#6B6560] hover:text-[#B91C1C] hover:bg-[#FDF2F2] dark:text-[#B5AEA5] dark:hover:bg-[#2C1A19] flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
