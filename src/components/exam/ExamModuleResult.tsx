import React from 'react';
import { AlertTriangle, CheckCircle2, FileText, XCircle } from 'lucide-react';
import {
  ExamAnswerValue,
  ExamModuleConfig,
  ExamModuleEvaluation,
  ExamQuestion,
} from '../../types/exam';
import { getNeutralModuleLabel, sanitizeExamBrandingText } from '../../utils/brandLabels';
import { ExamSelfAssessment } from './ExamSelfAssessment';

interface ExamModuleResultProps {
  moduleConfig: ExamModuleConfig;
  moduleEvaluation: ExamModuleEvaluation;
  answers: Record<string, ExamAnswerValue>;
  selfAssessmentRatings: Record<string, Record<string, number>>;
  onUpdateSelfRatings: (questionId: string, nextRatings: Record<string, number>) => void;
}

export function ExamModuleResult({
  moduleConfig,
  moduleEvaluation,
  answers,
  selfAssessmentRatings,
  onUpdateSelfRatings,
}: ExamModuleResultProps) {
  const questionMap = new Map<string, ExamQuestion>();
  moduleConfig.sections.forEach((sec) => {
    sec.questions.forEach((q) => questionMap.set(q.id, q));
  });

  return (
    <section className="space-y-4">
      <div className="bg-[#F7F4EC] dark:bg-[#1A1816] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            {getNeutralModuleLabel(moduleConfig.moduleKey)}
          </h3>
          <p className="text-[13px] text-[#6B6560] dark:text-[#B5AEA5]">
            Bobot poin simulasi: {moduleConfig.officialPoints} poin
            {moduleEvaluation.hasMissingAudioLimitation
              ? ' · Keterbatasan audio pada bagian Mendengarkan'
              : ''}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 tabular-nums shrink-0">
          {moduleEvaluation.objectiveMaxPoints > 0 && (
            <div>
              <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">Objektive Punkte</p>
              <p className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                {moduleEvaluation.objectiveEarnedPoints} / {moduleEvaluation.objectiveMaxPoints}{' '}
                <span className="text-sm font-medium text-[#6B6560] dark:text-[#B5AEA5]">
                  ({moduleEvaluation.objectivePercentage} %)
                </span>
              </p>
            </div>
          )}
          {moduleEvaluation.hasSelfAssessmentQuestions && (
            <div>
              <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">Selbsteinschätzung</p>
              <p className="font-display text-xl font-bold text-[#B91C1C] dark:text-[#F87171]">
                {moduleEvaluation.selfAssessedUserPoints !== null
                  ? `${moduleEvaluation.selfAssessedUserPoints} / ${moduleEvaluation.selfAssessedMaxPoints}`
                  : `Offen (${moduleEvaluation.selfAssessedMaxPoints} Pkt.)`}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {moduleEvaluation.questionResults.map((qr) => {
          const question = questionMap.get(qr.questionId);
          if (!question) return null;

          if (!qr.isObjective) {
            const rawText = typeof answers[question.id] === 'string' ? (answers[question.id] as string) : '';
            return (
              <div key={question.id} className="space-y-3">
                <ExamSelfAssessment
                  question={question}
                  ratings={selfAssessmentRatings[question.id] ?? {}}
                  userTextAnswer={rawText}
                  onUpdateRatings={onUpdateSelfRatings}
                />
                <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-4 space-y-2 text-[14px]">
                  <p className="font-semibold text-[#B91C1C] dark:text-[#F87171]">
                    Penjelasan Tugas (Bahasa Indonesia)
                  </p>
                  <p className="text-[#1C1917] dark:text-[#F5F2EB] leading-relaxed">
                    {sanitizeExamBrandingText(question.explanationId)}
                  </p>
                  {question.grammarNoteId && (
                    <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8]">
                      <strong>Tata Bahasa:</strong> {sanitizeExamBrandingText(question.grammarNoteId)}
                    </p>
                  )}
                </div>
              </div>
            );
          }

          return (
            <article
              key={question.id}
              className="rounded-2xl bg-white dark:bg-[#1F1D1A] border border-[#E6E0D4] dark:border-[#2E2A25] p-5 space-y-3.5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  {qr.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-[#15803D] dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#B91C1C] dark:text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-[12px] font-semibold text-[#6B6560] dark:text-[#B5AEA5]">
                      {sanitizeExamBrandingText(question.partLabelDe)}
                    </p>
                    <h4 className="font-display text-[16px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                      {question.promptDe}
                    </h4>
                  </div>
                </div>
                <span className="text-[13px] font-bold tabular-nums text-[#1C1917] dark:text-[#F5F2EB] shrink-0">
                  {qr.earnedPoints} / {qr.maxPoints} Pkt.
                </span>
              </div>

              {qr.hasMissingAudioLimitation && (
                <div className="rounded-xl bg-[#FAF2DF] dark:bg-[#2B2318] border border-[#EADBC0] dark:border-[#4A3D28] p-3 flex items-start gap-2 text-[13px] text-[#92400E] dark:text-amber-200">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Audio-Hinweis: Diese Höraufgabe hatte keine aktive MP3-Datei (nur Simulation).
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
                <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-3">
                  <p className="text-[#6B6560] dark:text-[#B5AEA5] font-medium">Deine Antwort:</p>
                  <p className="text-[#1C1917] dark:text-[#F5F2EB] font-semibold mt-0.5">
                    {qr.userAnswerLabel}
                  </p>
                </div>
                <div className="rounded-xl bg-[#ECFDF5] dark:bg-emerald-950/30 border border-[#A7F3D0] dark:border-emerald-900/50 p-3">
                  <p className="text-[#15803D] dark:text-emerald-300 font-medium">
                    Richtige Lösung:
                  </p>
                  <p className="text-emerald-950 dark:text-emerald-100 font-semibold mt-0.5">
                    {qr.expectedAnswerLabel}
                  </p>
                </div>
              </div>

              {question.audio?.transcriptDe && (
                <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#B91C1C] dark:text-[#F87171]">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Hörtranskript (nach Abgabe freigeschaltet)</span>
                  </div>
                  <p className="font-editorial text-[14px] leading-6 text-[#1C1917] dark:text-[#F5F2EB]">
                    {question.audio.transcriptDe}
                  </p>
                </div>
              )}

              <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-4 space-y-2 text-[13px]">
                <p className="font-semibold text-[#B91C1C] dark:text-[#F87171]">
                  Penjelasan (Bahasa Indonesia)
                </p>
                <p className="text-[#1C1917] dark:text-[#F5F2EB] leading-6">
                  {sanitizeExamBrandingText(question.explanationId)}
                </p>
                {question.grammarNoteId && (
                  <p className="text-[#57524C] dark:text-[#D6CFC5]">
                    <strong>Tata Bahasa:</strong> {sanitizeExamBrandingText(question.grammarNoteId)}
                  </p>
                )}
                {question.keyVocabulary && question.keyVocabulary.length > 0 && (
                  <div className="pt-1 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#57524C] dark:text-[#D6CFC5]">
                    {question.keyVocabulary.map((v) => (
                      <span key={v.de}>
                        <strong className="text-[#1C1917] dark:text-[#F5F2EB]">{v.de}</strong> = {v.id}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
