import React from 'react';
import { CEFRLevel, ModuleSkill } from '../../types/exercise';

interface ProgressIndicatorProps {
  level: CEFRLevel;
  skillLabel: string;
  skill: ModuleSkill;
  topic: string;
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
  totalPoints: number;
}

export function ProgressIndicator({
  level,
  skillLabel,
  topic,
  currentIndex,
  totalQuestions,
  answeredCount,
  totalPoints,
}: ProgressIndicatorProps) {
  const safeTotal = Math.max(1, totalQuestions);
  const progressPercent = Math.round(((currentIndex + 1) / safeTotal) * 100);

  return (
    <div className="space-y-3 pb-4 border-b border-[#EFEAE0] dark:border-[#2E2A25]">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-[#6B6560] dark:text-[#B5AEA5]">
        <span>
          <strong className="font-semibold text-[#B91C1C] dark:text-[#F87171]">
            {skillLabel} · {level}
          </strong>{' '}
          <span aria-hidden="true">·</span> {topic}
        </span>
        <div className="flex items-center gap-3 tabular-nums">
          <span>
            Aufgabe {currentIndex + 1} von {safeTotal}
          </span>
          <span aria-hidden="true">·</span>
          <span>{totalPoints} Punkte gesamt</span>
        </div>
      </div>

      <div
        className="w-full h-2.5 bg-[#EAE4D9] dark:bg-[#2E2A25] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Aufgabenfortschritt: ${currentIndex + 1} von ${safeTotal}`}
      >
        <div
          className="h-full bg-[#B91C1C] dark:bg-[#DC2626] rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5] tabular-nums">
        {answeredCount} von {safeTotal} Aufgaben beantwortet
      </p>
    </div>
  );
}
