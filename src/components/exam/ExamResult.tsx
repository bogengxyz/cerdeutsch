import React from 'react';
import { AlertTriangle, ArrowLeft, BookOpen, RotateCcw, ShieldAlert } from 'lucide-react';
import {
  ExamAnswerValue,
  ExamAttemptRecord,
  ExamConfiguration,
} from '../../types/exam';
import {
  BRAND_NAME,
  getNeutralExamTitle,
  sanitizeExamBrandingText,
} from '../../utils/brandLabels';
import { TouchButton } from '../ui/TouchFlowPrimitives';
import { ExamModuleResult } from './ExamModuleResult';

interface ExamResultProps {
  exam: ExamConfiguration;
  attempt: ExamAttemptRecord;
  onUpdateSelfRatings: (questionId: string, nextRatings: Record<string, number>) => void;
  onBackToOverview: () => void;
  onRetryExam: () => void;
}

export function ExamResult({
  exam,
  attempt,
  onUpdateSelfRatings,
  onBackToOverview,
  onRetryExam,
}: ExamResultProps) {
  const { evaluation } = attempt;
  const durationMin = Math.max(1, Math.round(attempt.durationSpentSeconds / 60));

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TouchButton variant="ghost" size="sm" onClick={onBackToOverview}>
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Prüfungsübersicht
        </TouchButton>
        <TouchButton variant="secondary" size="sm" onClick={onRetryExam}>
          <RotateCcw className="w-4 h-4" />
          Simulation wiederholen
        </TouchButton>
      </div>

      {/* Main Honest Summary Card */}
      <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_2px_12px_rgba(28,25,23,0.04)] dark:shadow-none space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#B91C1C] dark:text-[#F87171]">
              Hasil Simulasi Ujian · Bukan Penilaian Resmi
            </p>
            <h1 className="font-display text-2xl sm:text-[28px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              {getNeutralExamTitle(exam.provider, exam.level)}
            </h1>
            <p className="text-[14px] font-medium text-[#1C1917] dark:text-[#F5F2EB]">
              {sanitizeExamBrandingText(evaluation.simulatedStatusLabelDe)}
            </p>
            <p className="text-[13px] leading-6 text-[#57524C] dark:text-[#D6CFC5]">
              {sanitizeExamBrandingText(evaluation.simulatedStatusNoteId)}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 shrink-0 tabular-nums">
            <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-3.5 min-w-[120px]">
              <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">Objektiv (Lesen/Hören)</p>
              <p className="font-display text-2xl font-bold text-[#B91C1C] dark:text-[#F87171] mt-0.5">
                {evaluation.objectiveMaxPoints > 0 ? `${evaluation.objectivePercentage} %` : '—'}
              </p>
              <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">
                {evaluation.objectiveEarnedPoints} / {evaluation.objectiveMaxPoints} Pkt.
              </p>
            </div>
            <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-3.5 min-w-[120px]">
              <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">Richtige Aufgaben</p>
              <p className="font-display text-2xl font-bold text-[#15803D] dark:text-emerald-400 mt-0.5">
                {evaluation.correctCount}
              </p>
              <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">
                Falsch/Offen: {evaluation.incorrectCount}
              </p>
            </div>
            <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-3.5 min-w-[120px] col-span-2 sm:col-span-1">
              <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">Bearbeitungszeit</p>
              <p className="font-display text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB] mt-0.5">
                {durationMin} Min.
              </p>
              <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">
                Selbsteinschätzung: {evaluation.selfAssessedCount}
              </p>
            </div>
          </div>
        </div>

        {evaluation.hasMissingAudioLimitation && (
          <div className="rounded-xl bg-[#FAF2DF] dark:bg-[#2B2318] border border-[#EADBC0] dark:border-[#4A3D28] p-3.5 flex items-start gap-2.5 text-[13px] text-[#92400E] dark:text-amber-200">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Hinweis zur Audio-Einschränkung:</strong> Im Hörteil lagen keine lokalen
              MP3-Aufnahmen vor. Die Hörtranskripte wurden jetzt zur Kontrolle freigeschaltet.
            </span>
          </div>
        )}

        <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-3.5 flex items-start gap-2.5 text-[13px] text-[#57524C] dark:text-[#D6CFC5]">
          <ShieldAlert className="w-4 h-4 text-[#B91C1C] dark:text-[#F87171] shrink-0 mt-0.5" />
          <span>
            Simulasi latihan gratis oleh {BRAND_NAME} untuk persiapan mandiri. {BRAND_NAME} bukan
            penyelenggara, mitra, atau platform resmi lembaga ujian mana pun dan tidak menerbitkan
            sertifikat resmi.
          </span>
        </div>

        {evaluation.recommendedTopicsDe.length > 0 && (
          <div className="rounded-xl border border-[#E6E0D4] dark:border-[#2E2A25] bg-[#FAF8F4] dark:bg-[#1A1816] p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
              <BookOpen className="w-4 h-4 text-[#B91C1C] dark:text-[#F87171]" />
              <span>Empfohlene Themen zur Wiederholung</span>
            </div>
            <ul className="text-[13px] text-[#57524C] dark:text-[#D6CFC5] space-y-0.5">
              {evaluation.recommendedTopicsDe.map((topic) => (
                <li key={topic}>• {topic}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Module Breakdown */}
      <div className="space-y-8">
        {evaluation.moduleEvaluations.map((modEval) => {
          const modConfig = exam.modules.find((m) => m.moduleKey === modEval.moduleKey);
          if (!modConfig) return null;
          return (
            <ExamModuleResult
              key={modEval.moduleKey}
              moduleConfig={modConfig}
              moduleEvaluation={modEval}
              answers={attempt.answers as Record<string, ExamAnswerValue>}
              selfAssessmentRatings={attempt.selfAssessmentRatings}
              onUpdateSelfRatings={onUpdateSelfRatings}
            />
          );
        })}
      </div>
    </div>
  );
}
