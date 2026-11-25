import React, { useState } from 'react';
import { ArrowRight, Headphones, Info } from 'lucide-react';
import { getManifestEntryByExerciseId } from '../../data/audioManifest';
import { getExamConfiguration } from '../../data/exams';
import {
  getListeningScriptsByProviderAndLevel,
  toPracticeExercise,
} from '../../data/listeningScripts';
import {
  ActiveExamSession,
  ExamAttemptRecord,
  ExamLevel,
  ExamMode,
  ExamModuleKey,
  ExamProvider,
} from '../../types/exam';
import { Exercise } from '../../types/exercise';
import { CEFRLevel, ExamBoard, SkillType } from '../../types/learning';
import { ExamHistoryView } from '../exam/ExamHistoryView';
import { ExamLevelSelector } from '../exam/ExamLevelSelector';
import { ExamModeSelector } from '../exam/ExamModeSelector';
import { ExamOverview } from '../exam/ExamOverview';
import { ExamProviderSelector } from '../exam/ExamProviderSelector';
import {
  BRAND_NAME,
  getNeutralExamLevelLabel,
  getNeutralProviderShortLabel,
  sanitizeExamBrandingText,
} from '../../utils/brandLabels';
import { TouchButton } from '../ui/TouchFlowPrimitives';

interface PruefungViewProps {
  selectedExam: { board: ExamBoard; level: CEFRLevel } | null;
  onSelectExam: (selection: { board: ExamBoard; level: CEFRLevel } | null) => void;
  onStartSampleExercise: (level: CEFRLevel, skill: SkillType) => void;
  onStartExercise: (exercise: Exercise) => void;
  unfinishedSession: ActiveExamSession | null;
  examHistory: ExamAttemptRecord[];
  onStartExamSimulation: (params: {
    provider: ExamProvider;
    level: ExamLevel;
    mode: ExamMode;
    moduleKey?: ExamModuleKey;
  }) => void;
  onResumeUnfinishedExam: () => void;
  onDiscardUnfinishedExam: () => void;
  onViewAttempt: (attempt: ExamAttemptRecord) => void;
  onDeleteAttempt: (attemptId: string) => void;
}

export function PruefungView({
  selectedExam,
  onSelectExam,
  onStartSampleExercise,
  onStartExercise,
  unfinishedSession,
  examHistory,
  onStartExamSimulation,
  onResumeUnfinishedExam,
  onDiscardUnfinishedExam,
  onViewAttempt,
  onDeleteAttempt,
}: PruefungViewProps) {
  const [provider, setProvider] = useState<ExamProvider>(selectedExam?.board ?? 'goethe');
  const [level, setLevel] = useState<ExamLevel>(selectedExam?.level ?? 'A1');
  const [mode, setMode] = useState<ExamMode>('full');
  const [selectedModuleKey, setSelectedModuleKey] = useState<ExamModuleKey>('lesen');

  const activeProvider = selectedExam?.board ?? provider;
  const activeLevel = selectedExam?.level ?? level;
  const activeConfig = getExamConfiguration(activeProvider, activeLevel);
  const listeningScriptsForSelection = getListeningScriptsByProviderAndLevel(
    activeProvider,
    activeLevel,
  );

  const handleProviderChange = (nextProvider: ExamProvider) => {
    setProvider(nextProvider);
    if (selectedExam) {
      onSelectExam({ board: nextProvider, level: activeLevel });
    }
  };

  const handleLevelChange = (nextLevel: ExamLevel) => {
    setLevel(nextLevel);
    if (selectedExam) {
      onSelectExam({ board: activeProvider, level: nextLevel });
    }
  };

  return (
    <div className="space-y-9">
      {/* Header & Independence Notice */}
      <section className="space-y-3 max-w-3xl">
        <h1 className="font-display text-2xl sm:text-[30px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          Simulasi & Persiapan Ujian (A1–B2)
        </h1>
        <p className="text-[15px] leading-relaxed text-[#57524C] dark:text-[#C8C1B8]">
          Latih kesiapan Anda untuk Persiapan Ujian A1, A2, B1, dan B2 sebagai simulasi lengkap
          dengan pengatur waktu, latihan per keterampilan, atau mode bebas.
        </p>

        <div className="bg-[#FAF2DF] dark:bg-[#252017] border border-[#EADBC0] dark:border-[#3A3122] rounded-2xl p-4 flex items-start gap-3 text-[13px] leading-5 text-[#4B453F] dark:text-[#D1CBC2]">
          <Info className="w-4 h-4 text-[#B45309] dark:text-[#F59E0B] shrink-0 mt-0.5" />
          <p>
            Simulasi ujian ini disediakan secara independen oleh {BRAND_NAME} untuk latihan
            persiapan. {BRAND_NAME} bukan penyelenggara, mitra, atau platform resmi lembaga ujian
            mana pun dan tidak menerbitkan sertifikat resmi. Pembahasan berbahasa Indonesia muncul
            setelah jawaban dikirim.
          </p>
        </div>
      </section>

      {/* Step 1: Format Selector */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          1. Pilih Paket Format Simulasi
        </h2>
        <ExamProviderSelector
          selectedProvider={activeProvider}
          onSelectProvider={handleProviderChange}
        />
      </section>

      {/* Step 2: Level Selector */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          2. Pilih Tingkat (Persiapan Ujian A1–B2)
        </h2>
        <ExamLevelSelector selectedLevel={activeLevel} onSelectLevel={handleLevelChange} />
      </section>

      {/* Step 3: Mode & Module Selector */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          3. Tentukan Mode Simulasi
        </h2>
        <ExamModeSelector
          selectedMode={mode}
          onSelectMode={setMode}
          modules={activeConfig.modules}
          selectedModuleKey={selectedModuleKey}
          onSelectModuleKey={setSelectedModuleKey}
        />
      </section>

      {/* Step 4: Exam Overview & Start CTA */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          4. Ringkasan Simulasi & Mulai
        </h2>
        <ExamOverview
          exam={activeConfig}
          mode={mode}
          selectedModuleKey={selectedModuleKey}
          onStartExam={() =>
            onStartExamSimulation({
              provider: activeProvider,
              level: activeLevel,
              mode,
              moduleKey: mode === 'full' ? undefined : selectedModuleKey,
            })
          }
        />
      </section>

      {/* Quick Skill Practice Link */}
      <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-display text-[16px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Latihan Keterampilan Khusus — {getNeutralExamLevelLabel(activeLevel)}
          </h3>
          <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8]">
            Ingin melatih keterampilan tertentu sebelum memulai simulasi penuh?
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['lesen', 'hoeren', 'schreiben', 'sprechen'] as SkillType[]).map((sk) => (
            <TouchButton
              key={sk}
              variant="secondary"
              size="sm"
              onClick={() => onStartSampleExercise(activeLevel, sk)}
            >
              {sk === 'lesen'
                ? 'Latihan Membaca'
                : sk === 'hoeren'
                  ? 'Latihan Mendengarkan'
                  : sk === 'schreiben'
                    ? 'Latihan Menulis'
                    : 'Latihan Berbicara'}
              <ArrowRight className="w-3.5 h-3.5" />
            </TouchButton>
          ))}
        </div>
      </section>

      {/* Format-Separated Listening Scripts Launcher (Teil 1-4) */}
      <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-[#B91C1C] dark:text-[#EF4444]" />
              <h3 className="font-display text-[17px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Latihan Mendengarkan ({getNeutralProviderShortLabel(activeProvider)} ·{' '}
                {getNeutralExamLevelLabel(activeLevel)})
              </h3>
            </div>
            <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8]">
              Naskah latihan mendengarkan (Bagian 1–4) tersusun sesuai paket simulasi. Transkrip
              tetap terkunci hingga jawaban dikirim.
            </p>
          </div>
          <span className="text-[12px] font-semibold text-[#6B6560] dark:text-[#A8A095] tabular-nums">
            {listeningScriptsForSelection.length} bagian audio
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {listeningScriptsForSelection.map((script) => {
            const manifest = getManifestEntryByExerciseId(script.exerciseId);
            const status = manifest?.status ?? (script.examQuestionId ? 'missing' : 'pending');
            const statusLabel =
              status === 'available'
                ? 'MP3 tersedia'
                : status === 'pending'
                  ? 'Audio menunggu'
                  : 'Audio belum tersedia';

            return (
              <div
                key={script.scriptId}
                className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] p-4 flex flex-col justify-between gap-3"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[12px]">
                    <span className="font-semibold text-[#B91C1C] dark:text-[#FCA5A5]">
                      Bagian {script.partNumber} · {script.topicDe}
                    </span>
                    <span
                      className={`font-semibold tabular-nums shrink-0 ${
                        status === 'available'
                          ? 'text-[#15803D] dark:text-emerald-400'
                          : 'text-[#B45309] dark:text-amber-400'
                      }`}
                    >
                      {statusLabel}
                    </span>
                  </div>
                  <h4 className="font-display text-[15px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                    {sanitizeExamBrandingText(script.partTitleDe)}
                  </h4>
                  <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8]">
                    {sanitizeExamBrandingText(script.contextDe)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E6E0D4] dark:border-[#3A352F]">
                  <span className="text-[12px] text-[#6B6560] dark:text-[#A8A095] tabular-nums">
                    ca. {script.durationLabel} · {script.questions.length}{' '}
                    {script.questions.length === 1 ? 'Aufgabe' : 'Aufgaben'} · max. {script.playLimit}×
                  </span>
                  <TouchButton
                    variant="secondary"
                    size="sm"
                    onClick={() => onStartExercise(toPracticeExercise(script, manifest))}
                  >
                    Hörteil starten
                    <ArrowRight className="w-3.5 h-3.5" />
                  </TouchButton>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Step 5: Unfinished Session & History */}
      <ExamHistoryView
        unfinishedSession={unfinishedSession}
        attempts={examHistory}
        onResumeUnfinished={onResumeUnfinishedExam}
        onDiscardUnfinished={onDiscardUnfinishedExam}
        onViewAttempt={onViewAttempt}
        onDeleteAttempt={onDeleteAttempt}
      />
    </div>
  );
}
