import React from 'react';
import { AlertTriangle, Clock, Play, ShieldAlert } from 'lucide-react';
import { ExamConfiguration, ExamMode, ExamModuleKey } from '../../types/exam';
import { getActiveModulesForSession } from '../../services/examService';
import {
  BRAND_NAME,
  getNeutralExamLevelLabel,
  getNeutralExamTitle,
  getNeutralModuleLabel,
  getNeutralProviderShortLabel,
  sanitizeExamBrandingText,
} from '../../utils/brandLabels';
import { TouchButton } from '../ui/TouchFlowPrimitives';

interface ExamOverviewProps {
  exam: ExamConfiguration;
  mode: ExamMode;
  selectedModuleKey: ExamModuleKey;
  onStartExam: () => void;
}

export function ExamOverview({
  exam,
  mode,
  selectedModuleKey,
  onStartExam,
}: ExamOverviewProps) {
  const activeModules = getActiveModulesForSession(exam, mode, selectedModuleKey);
  const effectiveDuration =
    mode === 'practice'
      ? null
      : activeModules.reduce((acc, m) => acc + m.durationMinutes, 0);
  const effectivePoints = activeModules.reduce((acc, m) => acc + m.officialPoints, 0);
  const hasHoeren = activeModules.some((m) => m.moduleKey === 'hoeren');

  return (
    <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_2px_12px_rgba(28,25,23,0.04)] dark:shadow-none space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
        <div className="space-y-1.5 max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#B91C1C] dark:text-[#F87171]">
            {getNeutralProviderShortLabel(exam.provider)} · {getNeutralExamLevelLabel(exam.level)}
          </p>
          <h2 className="font-display text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            {getNeutralExamTitle(exam.provider, exam.level)}
          </h2>
          <p className="text-[14px] leading-relaxed text-[#57524C] dark:text-[#B5AEA5]">
            {sanitizeExamBrandingText(exam.formatNotesDe)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 shrink-0 lg:pl-6 lg:border-l lg:border-[#EFEAE0] dark:lg:border-[#2E2A25]">
          <div>
            <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">Target Waktu</p>
            <p className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums mt-0.5">
              {effectiveDuration === null ? 'Tanpa Timer' : `${effectiveDuration} mnt`}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">Total Poin</p>
            <p className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums mt-0.5">
              {effectivePoints} poin
            </p>
          </div>
        </div>
      </div>

      {/* Passing rule summary */}
      <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-4 space-y-1">
        <p className="text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
          Aturan Penilaian Latihan ({getNeutralProviderShortLabel(exam.provider)})
        </p>
        <p className="text-[13px] leading-relaxed text-[#57524C] dark:text-[#D6CFC5]">
          {sanitizeExamBrandingText(exam.passingRuleSummaryId || exam.passingRuleSummaryDe)}
        </p>
      </div>

      {/* Sections preview */}
      <div className="space-y-2.5">
        <h3 className="font-display text-[15px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
          Bagian Latihan dalam Simulasi Ini
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeModules.map((mod) => (
            <div
              key={mod.moduleKey}
              className="rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] border border-[#E6E0D4] dark:border-[#2E2A25] p-4 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-[15px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                  {getNeutralModuleLabel(mod.moduleKey)}
                </span>
                <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#6B6560] dark:text-[#B5AEA5] tabular-nums shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  {mode === 'practice' ? 'Bebas' : `${mod.durationMinutes} mnt`}
                </span>
              </div>
              <ul className="text-[13px] text-[#57524C] dark:text-[#B5AEA5] space-y-0.5">
                {mod.sections.map((sec) => (
                  <li key={sec.id}>
                    • {sanitizeExamBrandingText(sec.titleDe)} ({sec.questions.length}{' '}
                    {sec.questions.length === 1 ? 'soal' : 'soal'})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Honest Audio + Independence Disclaimers */}
      <div className="space-y-2.5 pt-2 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
        {hasHoeren && (
          <div className="rounded-xl bg-[#FAF2DF] dark:bg-[#2B2318] border border-[#EADBC0] dark:border-[#4A3D28] p-3.5 flex items-start gap-2.5 text-[13px] text-[#1C1917] dark:text-[#F5F2EB]">
            <AlertTriangle className="w-4 h-4 text-[#B45309] dark:text-[#FBBF24] shrink-0 mt-0.5" />
            <span>
              <strong>Catatan Latihan Mendengarkan:</strong> Apabila berkas MP3 lokal belum
              tersedia untuk sebagian butir soal, status audio ditampilkan secara jujur sebagai
              „Audio nicht verfügbar“ dan transkrip tetap terkunci hingga jawaban dikirim.
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
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">
          Kurikulum latihan mandiri {BRAND_NAME} (Pembaruan: {exam.lastVerifiedDate})
        </p>
        <TouchButton variant="primary" size="lg" onClick={onStartExam}>
          <Play className="w-4 h-4" />
          Mulai Simulasi
        </TouchButton>
      </div>
    </section>
  );
}
