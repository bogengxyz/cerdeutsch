import React from 'react';
import { ArrowLeft, Award, CheckCircle2, Info, RotateCcw, XCircle } from 'lucide-react';
import { Exercise } from '../../types/exercise';
import { ExerciseEvaluationResult } from '../../services/scoringService';
import { sanitizeExamBrandingText } from '../../utils/brandLabels';
import { TouchButton } from '../ui/TouchFlowPrimitives';

interface ExerciseResultProps {
  exercise: Exercise;
  result: ExerciseEvaluationResult;
  onRepeat: () => void;
  onBackToOverview: () => void;
}

export function ExerciseResult({
  exercise,
  result,
  onRepeat,
  onBackToOverview,
}: ExerciseResultProps) {
  const passed = result.percentage >= 60;
  const hasSelfAssessed = result.selfAssessedCount > 0;

  return (
    <div className="space-y-6">
      {/* Score Summary Card */}
      <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_2px_12px_rgba(28,25,23,0.04)] dark:shadow-none space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#B91C1C] dark:text-[#F87171]">
              Übung abgeschlossen · {exercise.level} · {exercise.topic}
            </p>
            <h2 className="font-display text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              {sanitizeExamBrandingText(exercise.title)}
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
                passed
                  ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#15803D] dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-400'
                  : 'bg-[#FDF2F2] border-[#E9B8B8] text-[#B91C1C] dark:bg-[#2C1A19] dark:border-[#5C2926] dark:text-[#F87171]'
              }`}
            >
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
                {result.percentage} %
              </p>
              <p className="text-[13px] text-[#6B6560] dark:text-[#B5AEA5] tabular-nums">
                {result.totalScore} / {result.maxScore} Punkte
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-3 bg-[#EAE4D9] dark:bg-[#2E2A25] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              passed ? 'bg-[#15803D] dark:bg-emerald-500' : 'bg-[#B91C1C] dark:bg-[#DC2626]'
            }`}
            style={{ width: `${result.percentage}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[14px] text-[#57524C] dark:text-[#D6CFC5] tabular-nums">
          {result.correctCount + result.incorrectCount > 0 && (
            <>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] dark:text-emerald-400" />
                {result.correctCount} richtig
              </span>
              <span className="inline-flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-[#B91C1C] dark:text-red-400" />
                {result.incorrectCount} zu wiederholen
              </span>
            </>
          )}
          {hasSelfAssessed && (
            <span className="inline-flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#B91C1C] dark:text-[#F87171]" />
              {result.selfAssessedCount} Aufgabe(n) per Selbstkontrolle bewertet
            </span>
          )}
        </div>

        {hasSelfAssessed && (
          <div className="rounded-xl bg-[#FAF2DF] dark:bg-[#2B2318] border border-[#EADBC0] dark:border-[#4A3D28] px-4 py-3 text-[13px] text-[#57524C] dark:text-[#D6CFC5] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#B45309] dark:text-[#FBBF24] shrink-0 mt-0.5" />
            <span>
              Catatan: Hasil latihan Menulis dan Berbicara didasarkan pada evaluasi mandiri
              menggunakan rubrik dan bukan penilaian ujian resmi lembaga sertifikasi mana pun.
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
          <TouchButton variant="primary" size="md" onClick={onRepeat}>
            <RotateCcw className="w-4 h-4" />
            Übung wiederholen
          </TouchButton>
          <TouchButton variant="secondary" size="md" onClick={onBackToOverview}>
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Übersicht
          </TouchButton>
        </div>
      </section>

      {/* Post-submission detailed review for every question */}
      <section className="space-y-4">
        <h3 className="font-display text-xl font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
          Auswertung & Erklärungen (Pembahasan)
        </h3>

        <div className="space-y-4">
          {exercise.questions.map((q, idx) => {
            const evalItem = result.questionResults.find((r) => r.questionId === q.id);
            return (
              <article
                key={q.id}
                className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[12px] font-medium text-[#6B6560] dark:text-[#B5AEA5] tabular-nums">
                      Aufgabe {idx + 1} · {evalItem?.earnedPoints ?? 0} / {q.points} Punkte
                    </span>
                    <h4 className="font-display text-[16px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                      {q.question}
                    </h4>
                  </div>
                  {evalItem?.isObjective && (
                    <span
                      className={`text-[13px] font-semibold shrink-0 ${
                        evalItem.isCorrect
                          ? 'text-[#15803D] dark:text-emerald-400'
                          : 'text-[#B91C1C] dark:text-red-400'
                      }`}
                    >
                      {evalItem.isCorrect ? 'Richtig' : 'Falsch'}
                    </span>
                  )}
                </div>

                {evalItem && (
                  <div className="text-[13px] space-y-1 text-[#57524C] dark:text-[#D6CFC5]">
                    <p>
                      <strong className="text-[#1C1917] dark:text-[#F5F2EB]">Deine Antwort:</strong>{' '}
                      {evalItem.userAnswerLabel}
                    </p>
                    {evalItem.isObjective && !evalItem.isCorrect && (
                      <p className="text-[#15803D] dark:text-emerald-400">
                        <strong>Richtige Antwort:</strong> {evalItem.expectedAnswerLabel}
                      </p>
                    )}
                  </div>
                )}

                {q.sampleAnswer && (
                  <div className="pt-2 border-t border-[#EFEAE0] dark:border-[#2E2A25] text-[13px] text-[#57524C] dark:text-[#D6CFC5]">
                    <p className="font-semibold text-[#1C1917] dark:text-[#F5F2EB] mb-1">
                      Musterlösung:
                    </p>
                    <p className="whitespace-pre-line">{q.sampleAnswer}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-[#EFEAE0] dark:border-[#2E2A25] space-y-1.5">
                  {q.explanationDe && (
                    <p className="text-[13px] leading-5 text-[#57524C] dark:text-[#D6CFC5]">
                      <strong className="text-[#1C1917] dark:text-[#F5F2EB]">Erklärung (DE):</strong>{' '}
                      {sanitizeExamBrandingText(q.explanationDe)}
                    </p>
                  )}
                  <p className="text-[12px] font-semibold text-[#B91C1C] dark:text-[#F87171]">
                    Penjelasan (Bahasa Indonesia)
                  </p>
                  <p className="text-[14px] leading-6 text-[#1C1917] dark:text-[#F5F2EB]">
                    {sanitizeExamBrandingText(q.explanationId)}
                  </p>
                  {q.commonMistakeId && (
                    <p className="text-[13px] text-[#B45309] dark:text-amber-300">
                      <strong>Kesalahan Umum:</strong> {sanitizeExamBrandingText(q.commonMistakeId)}
                    </p>
                  )}
                  {q.grammarNoteId && (
                    <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8]">
                      <strong>Tata Bahasa:</strong> {sanitizeExamBrandingText(q.grammarNoteId)}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
