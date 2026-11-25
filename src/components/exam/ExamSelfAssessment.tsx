import React from 'react';
import { CheckCircle2, ClipboardCheck } from 'lucide-react';
import { ExamQuestion } from '../../types/exam';
import { computeSelfAssessedQuestionPoints } from '../../services/examScoringService';

interface ExamSelfAssessmentProps {
  question: ExamQuestion;
  ratings: Record<string, number>;
  userTextAnswer?: string;
  onUpdateRatings: (questionId: string, nextRatings: Record<string, number>) => void;
}

export function ExamSelfAssessment({
  question,
  ratings,
  userTextAnswer,
  onUpdateRatings,
}: ExamSelfAssessmentProps) {
  const criteria = question.rubricCriteria ?? [];
  const totalSelected = computeSelfAssessedQuestionPoints(question, ratings);

  return (
    <div className="rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] bg-white dark:bg-[#1F1D1A] p-5 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-[#B91C1C] dark:text-[#F87171]">
            <ClipboardCheck className="w-4 h-4" />
            <span>Selbsteinschätzung (keine automatische KI-Bewertung)</span>
          </div>
          <h4 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            {question.partLabelDe}
          </h4>
        </div>
        <div className="text-right tabular-nums">
          <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">Selbsteinschätzung</p>
          <p className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            {totalSelected !== null ? `${totalSelected} / ${question.points}` : `— / ${question.points}`} Pkt.
          </p>
        </div>
      </div>

      {userTextAnswer && userTextAnswer.trim().length > 0 && (
        <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-4 space-y-1">
          <p className="text-[12px] font-semibold text-[#6B6560] dark:text-[#B5AEA5]">
            Deine eingereichte Antwort / Notizen:
          </p>
          <p className="text-[14px] leading-6 text-[#1C1917] dark:text-[#F5F2EB] whitespace-pre-line">
            {userTextAnswer}
          </p>
        </div>
      )}

      {question.sampleAnswerDe && (
        <div className="rounded-xl bg-[#FAF2DF] dark:bg-[#2B2318] border border-[#EADBC0] dark:border-[#4A3D28] p-4 space-y-2">
          <p className="text-[13px] font-semibold text-[#92400E] dark:text-[#FBBF24]">
            Musterlösung (Contoh Jawaban)
          </p>
          <p className="font-editorial text-[15px] leading-7 text-[#1C1917] dark:text-[#F5F2EB] whitespace-pre-line">
            {question.sampleAnswerDe}
          </p>
          {question.sampleTranslationId && (
            <p className="text-[13px] leading-6 text-[#57524C] dark:text-[#D6CFC5] pt-2 border-t border-[#EADBC0] dark:border-[#4A3D28]">
              <strong>Terjemahan (Bahasa Indonesia):</strong> {question.sampleTranslationId}
            </p>
          )}
        </div>
      )}

      <div className="space-y-3">
        <p className="text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
          Rubrik Penilaian Mandiri (klik skor untuk menilai pekerjaanmu sendiri):
        </p>

        <div className="space-y-3">
          {criteria.map((crit) => {
            const currentScore = ratings[crit.id];
            const scoreOptions = [
              { label: '0', value: 0 },
              { label: `${Math.round(crit.maxPoints * 0.5)}`, value: Math.round(crit.maxPoints * 0.5) },
              { label: `${crit.maxPoints}`, value: crit.maxPoints },
            ];
            const uniqueOptions = scoreOptions.filter(
              (opt, idx, arr) => arr.findIndex((x) => x.value === opt.value) === idx,
            );

            return (
              <div
                key={crit.id}
                className="rounded-xl border border-[#E6E0D4] dark:border-[#2E2A25] bg-[#FAF8F4] dark:bg-[#1A1816] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-0.5 min-w-0">
                  <p className="text-[14px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                    {crit.criterionDe}{' '}
                    <span className="font-normal text-[#6B6560] dark:text-[#B5AEA5]">
                      ({crit.criterionId} · max. {crit.maxPoints} Pkt.)
                    </span>
                  </p>
                  <p className="text-[13px] text-[#57524C] dark:text-[#D6CFC5]">
                    {crit.descriptorId}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {uniqueOptions.map((opt) => {
                    const selected = currentScore === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          onUpdateRatings(question.id, {
                            ...ratings,
                            [crit.id]: opt.value,
                          })
                        }
                        className={`min-w-[44px] min-h-[44px] px-3 rounded-xl text-[13px] font-bold tabular-nums inline-flex items-center justify-center gap-1 border transition-colors cursor-pointer ${
                          selected
                            ? 'bg-[#B91C1C] border-[#B91C1C] text-white dark:bg-[#DC2626] dark:border-[#DC2626]'
                            : 'bg-white border-[#E6E0D4] hover:bg-[#F3EFE6] text-[#1C1917] dark:bg-[#262320] dark:border-[#3A352F] dark:text-[#F5F2EB] dark:hover:bg-[#312D28]'
                        }`}
                      >
                        {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
