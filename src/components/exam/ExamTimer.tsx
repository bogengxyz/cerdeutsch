import React from 'react';
import { AlertCircle, Clock, Pause, Play } from 'lucide-react';
import { ExamMode } from '../../types/exam';
import { formatClockSeconds } from '../../services/examProgressService';

interface ExamTimerProps {
  mode: ExamMode;
  remainingSeconds: number;
  isPaused: boolean;
  submitted: boolean;
  onTogglePause?: () => void;
}

export function ExamTimer({
  mode,
  remainingSeconds,
  isPaused,
  submitted,
  onTogglePause,
}: ExamTimerProps) {
  if (mode === 'practice') {
    return (
      <div className="flex items-center gap-2.5">
        <div className="inline-flex items-center gap-2 min-h-[44px] px-3.5 rounded-xl bg-[#F3EFE6] dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] text-[#1C1917] dark:text-[#F5F2EB] text-[13px] font-medium">
          <Clock className="w-4 h-4 text-[#B91C1C] dark:text-[#F87171]" />
          <span>{isPaused ? 'Pausiert (Training)' : 'Ohne Zeitlimit'}</span>
        </div>
        {!submitted && onTogglePause && (
          <button
            type="button"
            onClick={onTogglePause}
            className="min-h-[44px] px-3.5 rounded-xl bg-white border border-[#E6E0D4] hover:bg-[#F3EFE6] dark:bg-[#1F1D1A] dark:border-[#3A352F] dark:hover:bg-[#262320] text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB] inline-flex items-center gap-1.5 cursor-pointer"
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4" />
                Fortsetzen
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" />
                Pausieren
              </>
            )}
          </button>
        )}
      </div>
    );
  }

  const isLowTime = remainingSeconds > 0 && remainingSeconds <= 300;
  const isExpired = remainingSeconds <= 0;

  return (
    <div
      className={`inline-flex items-center gap-2 min-h-[44px] px-3.5 rounded-xl border text-[14px] font-mono font-bold tabular-nums transition-colors ${
        isExpired
          ? 'bg-[#FDF2F2] border-[#E9B8B8] text-[#B91C1C] dark:bg-red-950/60 dark:border-red-900/60 dark:text-red-300'
          : isLowTime
            ? 'bg-[#FAF2DF] border-[#EADBC0] text-[#92400E] dark:bg-amber-950/60 dark:border-amber-800 dark:text-amber-300'
            : 'bg-[#F3EFE6] border-[#E6E0D4] text-[#1C1917] dark:bg-[#262320] dark:border-[#3A352F] dark:text-[#F5F2EB]'
      }`}
      role="timer"
      aria-live="polite"
    >
      {isLowTime || isExpired ? (
        <AlertCircle className="w-4 h-4 shrink-0" />
      ) : (
        <Clock className="w-4 h-4 shrink-0 text-[#B91C1C] dark:text-[#F87171]" />
      )}
      <span>{isExpired ? '00:00 · Zeit abgelaufen' : formatClockSeconds(remainingSeconds)}</span>
    </div>
  );
}
