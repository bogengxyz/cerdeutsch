import React from 'react';
import { Bookmark } from 'lucide-react';
import { ExamAnswerValue, ExamQuestion } from '../../types/exam';
import { isExamQuestionAnswered } from '../../services/examScoringService';

interface ExamQuestionNavigationProps {
  questions: ExamQuestion[];
  activeIndex: number;
  answers: Record<string, ExamAnswerValue>;
  flaggedQuestionIds: string[];
  onSelectIndex: (index: number) => void;
}

export function ExamQuestionNavigation({
  questions,
  activeIndex,
  answers,
  flaggedQuestionIds,
  onSelectIndex,
}: ExamQuestionNavigationProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">
        <span className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
          Aufgabennavigation
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#B91C1C] dark:bg-[#DC2626]" />
            Aktuell
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#15803D] dark:bg-emerald-500" />
            Beantwortet
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#D4A017]" />
            Markiert
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#D8D0C3] dark:bg-[#4A443D]" />
            Offen
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) => {
          const isCurrent = idx === activeIndex;
          const isAnswered = isExamQuestionAnswered(q, answers[q.id]);
          const isFlagged = flaggedQuestionIds.includes(q.id);

          let styleClasses =
            'bg-white text-[#57524C] border border-[#E6E0D4] hover:bg-[#F3EFE6] dark:bg-[#262320] dark:text-[#D6CFC5] dark:border-[#3A352F] dark:hover:bg-[#312D28]';

          if (isCurrent) {
            styleClasses =
              'bg-[#B91C1C] dark:bg-[#DC2626] text-white ring-4 ring-[#B91C1C]/20 border border-[#B91C1C]';
          } else if (isFlagged) {
            styleClasses =
              'bg-[#FAF2DF] text-[#92400E] border border-[#EADBC0] dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800';
          } else if (isAnswered) {
            styleClasses =
              'bg-[#ECFDF5] text-[#166534] border border-[#A7F3D0] dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800';
          }

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectIndex(idx)}
              aria-label={`Aufgabe ${idx + 1}${isFlagged ? ', markiert' : ''}${isAnswered ? ', beantwortet' : ', offen'}`}
              className={`relative min-w-[44px] min-h-[44px] px-2.5 rounded-xl font-display text-sm font-bold tabular-nums inline-flex items-center justify-center transition-all cursor-pointer ${styleClasses}`}
            >
              {idx + 1}
              {isFlagged && !isCurrent && (
                <Bookmark className="w-3 h-3 fill-current absolute top-1 right-1 opacity-75" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
