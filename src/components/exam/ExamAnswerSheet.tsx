import React from 'react';
import { Bookmark, CheckCircle2, Circle } from 'lucide-react';
import { ExamAnswerValue, ExamQuestion } from '../../types/exam';
import { isExamQuestionAnswered } from '../../services/examScoringService';
import { ModalSheet, TouchButton } from '../ui/TouchFlowPrimitives';

interface ExamAnswerSheetProps {
  open: boolean;
  onClose: () => void;
  questions: ExamQuestion[];
  answers: Record<string, ExamAnswerValue>;
  flaggedQuestionIds: string[];
  activeIndex: number;
  onJumpToQuestion: (index: number) => void;
  onRequestSubmit: () => void;
  submitted: boolean;
}

export function ExamAnswerSheet({
  open,
  onClose,
  questions,
  answers,
  flaggedQuestionIds,
  activeIndex,
  onJumpToQuestion,
  onRequestSubmit,
  submitted,
}: ExamAnswerSheetProps) {
  const answeredCount = questions.filter((q) => isExamQuestionAnswered(q, answers[q.id])).length;
  const unansweredCount = questions.length - answeredCount;
  const flaggedCount = questions.filter((q) => flaggedQuestionIds.includes(q.id)).length;

  return (
    <ModalSheet
      open={open}
      onClose={onClose}
      title="Antwortbogen & Übersicht"
      subtitle={`Beantwortet: ${answeredCount} · Offen: ${unansweredCount} · Markiert: ${flaggedCount}`}
    >
      <div className="space-y-5">
        <ul className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25] border border-[#E6E0D4] dark:border-[#2E2A25] rounded-xl overflow-hidden">
          {questions.map((q, idx) => {
            const answered = isExamQuestionAnswered(q, answers[q.id]);
            const flagged = flaggedQuestionIds.includes(q.id);
            const isCurrent = idx === activeIndex;

            return (
              <li key={q.id}>
                <button
                  type="button"
                  onClick={() => {
                    onJumpToQuestion(idx);
                    onClose();
                  }}
                  className={`w-full min-h-[54px] px-4 py-3 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-[#FDF2F2] dark:bg-[#2C1A19]'
                      : 'bg-white hover:bg-[#FAF8F4] dark:bg-[#1F1D1A] dark:hover:bg-[#262320]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {answered ? (
                      <CheckCircle2 className="w-4 h-4 text-[#15803D] dark:text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#9E968D] shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-[#1C1917] dark:text-[#F5F2EB] truncate">
                        Aufgabe {idx + 1} · {q.partLabelDe}
                      </p>
                      <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5] truncate">
                        {answered ? 'Eingabe gespeichert' : 'Noch keine Antwort'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {flagged && (
                      <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#B45309] dark:text-amber-300">
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                        Markiert
                      </span>
                    )}
                    <span className="text-[12px] font-semibold text-[#B91C1C] dark:text-[#F87171]">
                      Öffnen
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <TouchButton variant="ghost" size="sm" onClick={onClose}>
            Zurück zur Prüfung
          </TouchButton>
          {!submitted && (
            <TouchButton
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onRequestSubmit();
              }}
            >
              Zur Abgabe prüfen
            </TouchButton>
          )}
        </div>
      </div>
    </ModalSheet>
  );
}
