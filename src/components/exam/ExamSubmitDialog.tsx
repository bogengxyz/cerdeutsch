import React from 'react';
import { AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { ModalSheet, TouchButton } from '../ui/TouchFlowPrimitives';

interface ExamSubmitDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
  totalQuestions: number;
  answeredCount: number;
  flaggedCount: number;
}

export function ExamSubmitDialog({
  open,
  onClose,
  onConfirmSubmit,
  totalQuestions,
  answeredCount,
  flaggedCount,
}: ExamSubmitDialogProps) {
  const unansweredCount = Math.max(0, totalQuestions - answeredCount);

  return (
    <ModalSheet
      open={open}
      onClose={onClose}
      title="Prüfung wirklich abgeben?"
      subtitle="Nach der Abgabe werden deine Antworten gesperrt und die Auswertung angezeigt."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-3">
            <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">Beantwortet</p>
            <p className="font-display text-xl font-bold text-[#15803D] dark:text-emerald-400 tabular-nums mt-0.5">
              {answeredCount}
            </p>
          </div>
          <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-3">
            <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">Offen</p>
            <p className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums mt-0.5">
              {unansweredCount}
            </p>
          </div>
          <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-3">
            <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">Markiert</p>
            <p className="font-display text-xl font-bold text-[#B45309] dark:text-amber-300 tabular-nums mt-0.5">
              {flaggedCount}
            </p>
          </div>
        </div>

        {unansweredCount > 0 ? (
          <div className="rounded-xl bg-[#FAF2DF] dark:bg-[#2B2318] border border-[#EADBC0] dark:border-[#4A3D28] p-3.5 flex items-start gap-2.5 text-[13px] text-[#1C1917] dark:text-[#F5F2EB]">
            <AlertCircle className="w-4 h-4 text-[#B45309] dark:text-[#FBBF24] shrink-0 mt-0.5" />
            <span>
              Du hast noch {unansweredCount}{' '}
              {unansweredCount === 1 ? 'unbeantwortete Aufgabe' : 'unbeantwortete Aufgaben'}. Du
              kannst noch einmal zurückkehren oder jetzt endgültig abgeben.
            </span>
          </div>
        ) : (
          <div className="rounded-xl bg-[#ECFDF5] dark:bg-emerald-950/30 border border-[#A7F3D0] dark:border-emerald-900/50 p-3.5 flex items-start gap-2.5 text-[13px] text-emerald-950 dark:text-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-[#15803D] dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Alle {totalQuestions} Aufgaben wurden bearbeitet. Nach der Abgabe erscheinen die
              Auswertung sowie indonesische Erklärungen.
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
          <TouchButton variant="secondary" size="md" onClick={onClose}>
            Noch prüfen
          </TouchButton>
          <TouchButton variant="primary" size="md" onClick={onConfirmSubmit}>
            <Lock className="w-4 h-4" />
            Endgültig abgeben
          </TouchButton>
        </div>
      </div>
    </ModalSheet>
  );
}
