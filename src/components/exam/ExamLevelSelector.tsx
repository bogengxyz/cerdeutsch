import React from 'react';
import { ExamLevel } from '../../types/exam';
import { getNeutralExamLevelLabel } from '../../utils/brandLabels';

interface ExamLevelSelectorProps {
  selectedLevel: ExamLevel;
  onSelectLevel: (level: ExamLevel) => void;
}

const LEVEL_OPTIONS: { level: ExamLevel; label: string }[] = [
  { level: 'A1', label: 'Pemula' },
  { level: 'A2', label: 'Dasar' },
  { level: 'B1', label: 'Menengah' },
  { level: 'B2', label: 'Lanjutan' },
];

export function ExamLevelSelector({
  selectedLevel,
  onSelectLevel,
}: ExamLevelSelectorProps) {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
      role="radiogroup"
      aria-label="Pilih tingkat persiapan ujian"
    >
      {LEVEL_OPTIONS.map((item) => {
        const isActive = selectedLevel === item.level;
        return (
          <button
            key={item.level}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onSelectLevel(item.level)}
            className={`min-h-[58px] px-4 py-2.5 rounded-xl text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B91C1C]/20 ${
              isActive
                ? 'bg-[#B91C1C] dark:bg-[#DC2626] text-white shadow-xs'
                : 'bg-[#F7F4EC] hover:bg-[#EFEAE0] text-[#1C1917] border border-[#E6E0D4] dark:bg-[#1A1816] dark:hover:bg-[#262320] dark:text-[#F5F2EB] dark:border-[#2E2A25]'
            }`}
          >
            <span className="block font-display text-[15px] font-bold tabular-nums">
              {getNeutralExamLevelLabel(item.level)}
            </span>
            <span
              className={`block text-[12px] ${
                isActive ? 'text-red-100' : 'text-[#6B6560] dark:text-[#B5AEA5]'
              }`}
            >
              Tingkat {item.level} · {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
