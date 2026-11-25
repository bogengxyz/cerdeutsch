import React from 'react';

interface ExamProgressProps {
  currentNumber: number;
  totalQuestions: number;
  answeredCount: number;
  flaggedCount: number;
  moduleTitleDe: string;
}

export function ExamProgress({
  currentNumber,
  totalQuestions,
  answeredCount,
  flaggedCount,
  moduleTitleDe,
}: ExamProgressProps) {
  const pct = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[13px]">
        <span className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
          {moduleTitleDe} · Aufgabe{' '}
          <span className="tabular-nums">
            {currentNumber} von {totalQuestions}
          </span>
        </span>
        <span className="text-[#6B6560] dark:text-[#B5AEA5] tabular-nums">
          Beantwortet: {answeredCount}/{totalQuestions}
          {flaggedCount > 0 ? ` · Markiert: ${flaggedCount}` : ''}
        </span>
      </div>
      <div className="w-full h-2 bg-[#EAE4D9] dark:bg-[#2E2A25] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#B91C1C] dark:bg-[#DC2626] rounded-full transition-all duration-200"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
