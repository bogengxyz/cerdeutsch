import React from 'react';
import { Bookmark } from 'lucide-react';

interface ExamFlagButtonProps {
  isFlagged: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

export function ExamFlagButton({
  isFlagged,
  disabled = false,
  onToggle,
}: ExamFlagButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onToggle}
      aria-pressed={isFlagged}
      className={`min-h-[44px] px-3.5 rounded-xl text-[13px] font-semibold inline-flex items-center gap-1.5 border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
        isFlagged
          ? 'bg-[#FAF2DF] text-[#92400E] border-[#EADBC0] dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800'
          : 'bg-[#F7F4EC] hover:bg-[#EFEAE0] text-[#57524C] border-[#E6E0D4] dark:bg-[#262320] dark:hover:bg-[#312D28] dark:text-[#D6CFC5] dark:border-[#3A352F]'
      }`}
    >
      <Bookmark className={`w-4 h-4 ${isFlagged ? 'fill-current' : ''}`} />
      <span>{isFlagged ? 'Markiert' : 'Markieren'}</span>
    </button>
  );
}
