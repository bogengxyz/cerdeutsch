import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { Question } from '../../types/exercise';
import { TouchCheckbox } from '../ui/TouchFlowPrimitives';

interface WritingEditorProps {
  question: Question;
  value: string;
  onChange: (next: string) => void;
  isSubmitted: boolean;
  checkedChecklist: boolean[];
  onToggleChecklist: (index: number, next: boolean) => void;
}

export function WritingEditor({
  question,
  value,
  onChange,
  isSubmitted,
  checkedChecklist,
  onToggleChecklist,
}: WritingEditorProps) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const minWords = question.wordLimit?.min;
  const maxWords = question.wordLimit?.max;

  const isUnderMin = typeof minWords === 'number' && wordCount > 0 && wordCount < minWords;
  const isOverMax = typeof maxWords === 'number' && wordCount > maxWords;

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label
            htmlFor={`writing-input-${question.id}`}
            className="text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8]"
          >
            Dein deutscher Textentwurf
          </label>
          <div className="flex items-center gap-3 text-[12px] tabular-nums">
            {question.wordLimit && (
              <span className="text-[#6B6560] dark:text-[#B5AEA5]">
                Richtwert: {question.wordLimit.min}–{question.wordLimit.max} Wörter
              </span>
            )}
            <span
              className={`font-semibold ${
                isOverMax
                  ? 'text-[#B45309] dark:text-[#FBBF24]'
                  : isUnderMin
                    ? 'text-[#57524C] dark:text-[#D6CFC5]'
                    : 'text-[#B91C1C] dark:text-[#F87171]'
              }`}
            >
              {wordCount} {wordCount === 1 ? 'Wort' : 'Wörter'}
            </span>
          </div>
        </div>

        <textarea
          id={`writing-input-${question.id}`}
          rows={7}
          value={value}
          disabled={isSubmitted}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Schreibe hier deinen Text auf Deutsch..."
          className="w-full rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] px-4 py-3 text-[15px] leading-7 text-[#1C1917] placeholder:text-[#8A837A] focus:border-[#B91C1C] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/12 disabled:opacity-80 dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB] dark:focus:bg-[#1F1D1A]"
        />

        {!isSubmitted && (
          <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 shrink-0" />
            Reiche zuerst deinen Entwurf ein, um Musterlösung, Bewertungsrubrik und Erklärung zu sehen.
          </p>
        )}
      </div>

      {/* Revealed ONLY after submission */}
      {isSubmitted && (
        <div className="space-y-5 pt-4 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
          <div className="rounded-2xl bg-[#ECFDF5] dark:bg-emerald-950/35 border border-[#A7F3D0] dark:border-emerald-900/60 p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#15803D] dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-[14px] leading-6 text-[#1C1917] dark:text-[#F5F2EB]">
              <p className="font-semibold">Textentwurf gespeichert (Selbstkontrolle)</p>
              <p className="text-[13px] text-[#57524C] dark:text-[#D6CFC5]">
                Vergleiche deinen Text mit der Musterlösung und hake die erfüllten Kriterien ab.
              </p>
            </div>
          </div>

          {question.sampleAnswer && (
            <div className="rounded-2xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-4 sm:p-5 space-y-2">
              <h3 className="text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8]">
                Musterlösung (Beispielantwort)
              </h3>
              <p className="font-editorial text-[15px] leading-7 text-[#1C1917] dark:text-[#F5F2EB] whitespace-pre-line">
                {question.sampleAnswer}
              </p>
            </div>
          )}

          {question.rubricCriteria && question.rubricCriteria.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8]">
                Bewertungsrubrik
              </h3>
              <div className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25] rounded-2xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25]">
                {question.rubricCriteria.map((rubric) => (
                  <div key={rubric.criterion} className="px-4 py-3 space-y-0.5">
                    <p className="text-[14px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                      {rubric.criterion}
                    </p>
                    <p className="text-[13px] leading-5 text-[#57524C] dark:text-[#D6CFC5]">
                      {rubric.descriptionId}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {question.checklist && question.checklist.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8]">
                Checkliste zur Selbstbewertung
              </h3>
              <div className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25] rounded-2xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] px-4 py-1">
                {question.checklist.map((item, idx) => (
                  <TouchCheckbox
                    key={item}
                    checked={Boolean(checkedChecklist[idx])}
                    onChange={(next) => onToggleChecklist(idx, next)}
                    label={item}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
