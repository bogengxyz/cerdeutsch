import React, { useEffect, useState } from 'react';
import { DailyStarterTrack } from '../home/DailyStarterTrack';
import {
  AlertCircle,
  ArrowRight,
  Award,
  BarChart3,
  Bookmark,
  CheckCircle2,
  Clock,
  GraduationCap,
  History,
  Landmark,
  Layers,
  Play,
  Sparkles,
  Star,
  Target,
} from 'lucide-react';
import lessonHoerenImg from '../../assets/images/lesson_hoeren_berlin_1795411465865.jpg';
import recommendationBooksImg from '../../assets/images/recommendation_books_editorial_1795411464860.jpg';
import { CEFR_LEVELS, SKILL_META } from '../../data/curriculum';
import { CEFRLevel, ExamBoard, NavPage, SkillType, UserProgressState } from '../../types/learning';
import { LearningRecommendation } from '../../types/phase4';
import {
  BRAND_NAME,
  BRAND_TAGLINE,
  getNeutralExamLevelLabel,
  sanitizeExamBrandingText,
} from '../../utils/brandLabels';
import { getLandmarkImageUrl } from '../../utils/landmarkImages';
import { getLandmarkForLevel } from '../../utils/landmarkRegistry';
import {
  calculateLevelProgressPercent,
  calculateOverallProgressPercent,
} from '../../utils/progress';
import {
  GermanFlagMark,
  SkillIcon,
  TouchButton,
  getEditorialLevelColor,
} from '../ui/TouchFlowPrimitives';

interface StartseiteViewProps {
  progress: UserProgressState;
  recommendations?: LearningRecommendation[];
  openMistakesCount?: number;
  dueFlashcardsCount?: number;
  bookmarksCount?: number;
  isLastLessonBookmarked?: boolean;
  onToggleLastLessonBookmark?: () => void;
  onNavigate: (page: NavPage) => void;
  onSelectLevelDetail: (level: CEFRLevel) => void;
  onSelectExamDetail: (board: ExamBoard, level: CEFRLevel) => void;
  onResumeLastLesson: () => void;
  onOpenRecommendation?: (rec: LearningRecommendation) => void;
  onChangeLevel?: (level: CEFRLevel) => void;
  soundEnabled?: boolean;
}

const LEVEL_TILE_SUBTITLES: Record<CEFRLevel, string> = {
  A1: 'Dasar',
  A2: 'Pra-Menengah',
  B1: 'Menengah',
  B2: 'Menengah Atas',
};

const LEVEL_SUMMARY_LABELS: Record<CEFRLevel, string> = {
  A1: 'Pemula',
  A2: 'Dasar',
  B1: 'Menengah',
  B2: 'Mandiri',
};

const SKILL_INDONESIAN_LABELS: Record<SkillType, string> = {
  lesen: 'Latihan Membaca',
  hoeren: 'Latihan Mendengarkan',
  sprechen: 'Latihan Berbicara',
  schreiben: 'Latihan Menulis',
};

export function StartseiteView({
  progress,
  recommendations = [],
  openMistakesCount = 0,
  dueFlashcardsCount = 0,
  bookmarksCount = 0,
  isLastLessonBookmarked = false,
  onToggleLastLessonBookmark,
  onNavigate,
  onSelectLevelDetail,
  onSelectExamDetail,
  onResumeLastLesson,
  onOpenRecommendation,
  onChangeLevel,
  soundEnabled = true,
}: StartseiteViewProps) {
  const landmark = getLandmarkForLevel(progress.currentLevel);
  const landmarkImageUrl = getLandmarkImageUrl(landmark.imageKey);
  const [loadedImageUrl, setLoadedImageUrl] = useState<string | null>(null);
  const [failedImageUrls, setFailedImageUrls] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (failedImageUrls[landmarkImageUrl]) return;
    let cancelled = false;
    const preloader = new Image();
    preloader.referrerPolicy = 'no-referrer';
    preloader.onload = () => {
      if (!cancelled) {
        setLoadedImageUrl(landmarkImageUrl);
      }
    };
    preloader.onerror = () => {
      if (!cancelled) {
        setFailedImageUrls((prev) => ({ ...prev, [landmarkImageUrl]: true }));
      }
    };
    preloader.src = landmarkImageUrl;
    if (preloader.complete && preloader.naturalWidth > 0) {
      setLoadedImageUrl(landmarkImageUrl);
    }
    return () => {
      cancelled = true;
    };
  }, [landmarkImageUrl, failedImageUrls]);

  const hasHeroImageFailed = Boolean(failedImageUrls[landmarkImageUrl]);
  const isHeroImageLoaded = loadedImageUrl === landmarkImageUrl;

  const overallPercent = calculateOverallProgressPercent(progress);
  const learnedLessonsCount =
    progress.completedExerciseIds.length + progress.completedGrammarIds.length;
  const hasPriorActivity =
    learnedLessonsCount > 0 || progress.recentActivities.length > 0;
  const topRecommendation = recommendations[0];

  const lastLessonSkill: SkillType =
    progress.lastLesson.module === 'lesen' ||
    progress.lastLesson.module === 'hoeren' ||
    progress.lastLesson.module === 'sprechen' ||
    progress.lastLesson.module === 'schreiben'
      ? progress.lastLesson.module
      : 'hoeren';

  return (
    <div className="space-y-6">
      {/* C. Hero Banner */}
      <section
        aria-label="Selamat datang di Cerdeutsch"
        className="relative overflow-hidden rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] bg-[#F4EFE4] dark:bg-[#1B1917] shadow-[0_2px_10px_rgba(28,25,23,0.05)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4EFE4] via-[#EAE2D3] to-[#DFD4BF] dark:from-[#1B1917] dark:via-[#221E1A] dark:to-[#2B2520]">
          {hasHeroImageFailed ? (
            <div
              aria-hidden="true"
              className="w-full h-full flex items-center justify-end pr-12 text-[#C8BEB0] dark:text-[#3A352F]"
            >
              <Landmark className="w-28 h-28 opacity-50" />
            </div>
          ) : (
            <img
              key={landmarkImageUrl}
              data-testid="hero-landmark-image"
              data-landmark-level={landmark.level}
              src={landmarkImageUrl}
              alt={landmark.alt}
              referrerPolicy="no-referrer"
              onLoad={() => setLoadedImageUrl(landmarkImageUrl)}
              onError={() =>
                setFailedImageUrls((prev) => ({ ...prev, [landmarkImageUrl]: true }))
              }
              className={`w-full h-full object-cover ${landmark.objectPositionClass} transition-opacity duration-300 motion-reduce:transition-none ${
                isHeroImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#FAF8F4]/98 via-[#FAF8F4]/92 to-[#FAF8F4]/72 sm:from-[#FAF8F4] sm:via-[#FAF8F4]/92 sm:to-[#FAF8F4]/15 dark:from-[#1A1816]/98 dark:via-[#1A1816]/92 dark:to-[#1A1816]/75 sm:dark:from-[#1A1816] sm:dark:via-[#1A1816]/94 sm:dark:to-[#1A1816]/35"
          />
        </div>

        <div className="relative z-10 px-6 py-7 sm:px-9 sm:py-9 max-w-2xl space-y-4">
          <div className="inline-flex flex-wrap items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#6B6560] dark:text-[#C8C1B8]">
            <GermanFlagMark />
            <span>
              {BRAND_NAME} · {landmark.level} · {landmark.name}, {landmark.city}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-[28px] sm:text-[36px] font-bold leading-[1.12] tracking-tight text-[#1C1917] dark:text-[#F5F2EB] text-balance">
              {hasPriorActivity ? 'Selamat datang kembali!' : 'Selamat datang di Cerdeutsch!'}
            </h1>
            <p className="text-[15px] sm:text-[17px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
              {BRAND_TAGLINE}
            </p>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#57524C] dark:text-[#C8C1B8] max-w-xl">
              Platform belajar bahasa Jerman dari tingkat A1 hingga B2 dengan latihan membaca,
              mendengarkan, berbicara, menulis, serta simulasi ujian mandiri.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onResumeLastLesson}
              className="inline-flex items-center gap-2.5 min-h-[48px] px-6 rounded-full bg-[#B91C1C] hover:bg-[#991B1B] dark:bg-[#DC2626] dark:hover:bg-[#B91C1C] text-white text-[15px] font-semibold shadow-[0_3px_10px_rgba(185,28,28,0.28)] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Lanjut Belajar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('pruefung')}
              className="inline-flex items-center gap-2 min-h-[48px] px-5 rounded-full bg-white/90 hover:bg-white dark:bg-[#262320]/90 dark:hover:bg-[#312D28] text-[#1C1917] dark:text-[#F5F2EB] border border-[#E6E0D4] dark:border-[#3A352F] text-[14px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <Award className="w-4 h-4 text-[#B91C1C] dark:text-[#EF4444]" />
              <span>Simulasi Ujian</span>
            </button>
          </div>
        </div>
      </section>

      {/* D. Horizontal 3-Zone Learning Summary Bar */}
      <section
        aria-label="Ringkasan belajar"
        className="rounded-2xl bg-[#F7F3EA] dark:bg-[#1E1C19] border border-[#E6E0D4] dark:border-[#2E2A25] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E6E0D4] dark:divide-[#2E2A25]"
      >
        <div className="px-6 py-4 flex items-center gap-4">
          <span className="w-10 h-10 rounded-xl bg-white/80 dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] text-[#1C1917] dark:text-[#F5F2EB] flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </span>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[12px] font-medium text-[#6B6560] dark:text-[#A8A095]">
                Tingkat Saat Ini
              </p>
              <span className="text-[12px] font-medium text-[#57524C] dark:text-[#C8C1B8] truncate">
                {LEVEL_SUMMARY_LABELS[progress.currentLevel]}
              </span>
            </div>
            {onChangeLevel ? (
              <div
                role="group"
                aria-label="Pilih tingkat CEFR saat ini"
                className="grid grid-cols-4 gap-1.5"
              >
                {(['A1', 'A2', 'B1', 'B2'] as CEFRLevel[]).map((lvl) => {
                  const isActive = progress.currentLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => onChangeLevel(lvl)}
                      aria-pressed={isActive}
                      className={`min-h-[40px] px-2 rounded-lg text-[13px] font-bold tabular-nums transition-colors cursor-pointer whitespace-nowrap border ${
                        isActive
                          ? 'bg-[#B91C1C] text-white border-[#B91C1C] dark:bg-[#DC2626] dark:border-[#DC2626] shadow-xs'
                          : 'bg-white/80 hover:bg-white text-[#57524C] border-[#E6E0D4] hover:border-[#B91C1C]/40 hover:text-[#1C1917] dark:bg-[#262320] dark:hover:bg-[#312D28] dark:text-[#C8C1B8] dark:border-[#3A352F] dark:hover:text-[#F5F2EB]'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-baseline gap-2.5 mt-0.5">
                <span className="font-display text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
                  {progress.currentLevel}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 flex items-center gap-4">
          <span className="w-10 h-10 rounded-xl bg-[#FDF2F2] dark:bg-[#2C1A19] border border-[#EED8D2] dark:border-[#4A2624] text-[#B91C1C] dark:text-[#EF4444] flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </span>
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-[#6B6560] dark:text-[#A8A095]">
              Target Belajar
            </p>
            <p className="font-display text-[17px] font-bold text-[#1C1917] dark:text-[#F5F2EB] mt-0.5 truncate">
              Persiapan Ujian {progress.currentLevel}
            </p>
            <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095] tabular-nums">
              {progress.todayMinutes} / {progress.dailyGoalMinutes} mnt target harian ·{' '}
              {learnedLessonsCount} pelajaran
            </p>
          </div>
        </div>

        <div className="px-6 py-4 flex items-center gap-4">
          <span className="w-10 h-10 rounded-xl bg-white/80 dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] text-[#B91C1C] dark:text-[#EF4444] flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5" />
          </span>
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[12px] font-medium text-[#6B6560] dark:text-[#A8A095]">
                Kemajuan Belajar
              </p>
              <span className="font-display text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
                {overallPercent}%
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#E5DEC9] dark:bg-[#332E27] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#B91C1C] dark:bg-[#DC2626] transition-all duration-300"
                style={{ width: `${Math.max(2, Math.min(100, overallPercent))}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Beginner Welcome Card for A0 */}
      <section
        aria-label="Zona Pemula A0 Erste Schritte"
        className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#FAF2DF] via-[#F6EBD0] to-[#EFE2C2] dark:from-[#262016] dark:via-[#2F271B] dark:to-[#382E1E] border border-[#E8D9B8] dark:border-[#4A3D28] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#B91C1C] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#B91C1C] text-white">
                Zona Pemula (A0)
              </span>
              <span className="text-[13px] font-bold text-[#854D0E] dark:text-[#FCD34D]">
                Baru Pertama Belajar Bahasa Jerman?
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Mulai dari Nol: Alfabet, Bunyi Unik & 20 Kalimat Penyelamat
            </h3>
            <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8]">
              Pelajari cara membaca huruf Jerman, vokal Umlaut (ä, ö, ü), serta 3 rahasia dasar tata bahasa dalam 5 menit.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('a0')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-[13.5px] font-bold transition-all cursor-pointer whitespace-nowrap self-start sm:self-center shadow-xs"
        >
          <span>Buka Langkah Pertama</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* D2. Daily Starter Track (Misi Harian Pemula 5 Menit) */}
      <DailyStarterTrack
        onNavigate={onNavigate}
        onOpenVocabA1={() => onNavigate('wortschatz')}
        soundEnabled={soundEnabled}
      />

      {/* E. Main 2-Column Learning Area */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Last Opened Lesson + Recent Activities */}
        <div className="lg:col-span-6 space-y-5">
          {/* Last Opened Lesson */}
          <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] p-5 sm:p-6 shadow-[0_1px_3px_rgba(28,25,23,0.04)] space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-[19px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Pelajaran Terakhir Anda
              </h2>
              {onToggleLastLessonBookmark ? (
                <button
                  type="button"
                  onClick={onToggleLastLessonBookmark}
                  aria-pressed={isLastLessonBookmarked}
                  aria-label={
                    isLastLessonBookmarked
                      ? 'Hapus pelajaran dari koleksi'
                      : 'Simpan pelajaran ke koleksi'
                  }
                  className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-[#B91C1C] dark:text-[#EF4444] hover:bg-[#FDF2F2] dark:hover:bg-[#2C1A19] transition-colors cursor-pointer"
                >
                  <Bookmark
                    className={`w-5 h-5 ${isLastLessonBookmarked ? 'fill-current' : ''}`}
                  />
                </button>
              ) : (
                <Bookmark className="w-5 h-5 text-[#B91C1C] dark:text-[#EF4444] fill-current shrink-0" />
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="sm:w-44 aspect-[4/3] rounded-xl overflow-hidden bg-[#F3EFE6] dark:bg-[#262320] shrink-0 border border-[#E6E0D4] dark:border-[#2E2A25]">
                <img
                  src={lessonHoerenImg}
                  alt="Belajar bahasa Jerman bersama Cerdeutsch"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-2.5">
                <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#B91C1C] dark:text-[#EF4444]">
                  <SkillIcon skill={lastLessonSkill} className="w-4 h-4 shrink-0" />
                  <span>{SKILL_INDONESIAN_LABELS[lastLessonSkill] ?? 'Modul Belajar'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{progress.lastLesson.level}</span>
                </div>

                <h3 className="font-display text-[18px] font-bold text-[#1C1917] dark:text-[#F5F2EB] leading-snug">
                  {sanitizeExamBrandingText(progress.lastLesson.title)}
                </h3>

                <p className="text-[13px] text-[#6B6560] dark:text-[#B5AEA5]">
                  {SKILL_META[lastLessonSkill]?.shortDescription} ·{' '}
                  <span className="tabular-nums font-medium text-[#1C1917] dark:text-[#F5F2EB]">
                    {progress.lastLesson.progressPercent}%
                  </span>{' '}
                  selesai
                </p>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={onResumeLastLesson}
                    className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full bg-[#B91C1C] hover:bg-[#991B1B] dark:bg-[#DC2626] dark:hover:bg-[#B91C1C] text-white text-[14px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Lanjutkan Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] overflow-hidden shadow-[0_1px_3px_rgba(28,25,23,0.04)]">
            <div className="px-5 sm:px-6 py-4 border-b border-[#EFEAE0] dark:border-[#2E2A25] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[#6B6560] dark:text-[#A8A095]" />
                <h2 className="font-display text-[17px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                  Aktivitas Terakhir Anda
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('fortschritt')}
                className="text-[13px] font-semibold text-[#57524C] hover:text-[#B91C1C] dark:text-[#C8C1B8] dark:hover:text-[#EF4444] inline-flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap"
              >
                <span>Lihat semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {progress.recentActivities.length === 0 ? (
              <div className="p-6 text-center space-y-3">
                <Clock className="w-6 h-6 text-[#9E968C] mx-auto" />
                <p className="text-[14px] text-[#6B6560] dark:text-[#B5AEA5]">
                  Belum ada aktivitas belajar yang selesai.
                </p>
                <TouchButton variant="secondary" size="sm" onClick={() => onNavigate('lernen')}>
                  Mulai Pelajaran Pertama
                </TouchButton>
              </div>
            ) : (
              <ul className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25]">
                {progress.recentActivities.slice(0, 4).map((act) => (
                  <li
                    key={act.id}
                    className="min-h-[56px] px-5 sm:px-6 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-7 h-7 rounded-lg bg-[#FAF8F4] dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] text-[#B91C1C] dark:text-[#EF4444] flex items-center justify-center shrink-0">
                        <SkillIcon
                          skill={
                            act.module === 'lesen' ||
                            act.module === 'hoeren' ||
                            act.module === 'sprechen' ||
                            act.module === 'schreiben'
                              ? act.module
                              : 'lesen'
                          }
                          className="w-3.5 h-3.5"
                        />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[14px] font-medium text-[#1C1917] dark:text-[#F5F2EB] truncate">
                          {sanitizeExamBrandingText(act.title)}
                        </p>
                        <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">
                          {act.level} · {act.scoreLabel}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-[12px] text-[#6B6560] dark:text-[#A8A095] whitespace-nowrap tabular-nums">
                        {act.timestampLabel}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-[#15803D] dark:text-emerald-400" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Column: Level Selector + Recommendation Card */}
        <div className="lg:col-span-6 space-y-5">
          {/* CEFR Level Cards */}
          <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] p-5 sm:p-6 shadow-[0_1px_3px_rgba(28,25,23,0.04)] space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-[19px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Tingkat Pembelajaran (A1–B2)
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('lernen')}
                className="text-[13px] font-semibold text-[#57524C] hover:text-[#B91C1C] dark:text-[#C8C1B8] dark:hover:text-[#EF4444] inline-flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap"
              >
                <span>Semua tingkat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CEFR_LEVELS.map((lvl) => {
                const pct = calculateLevelProgressPercent(progress, lvl.level);
                const isCurrent = progress.currentLevel === lvl.level;
                const accent = getEditorialLevelColor(lvl.level);
                return (
                  <button
                    key={lvl.level}
                    type="button"
                    onClick={() => onSelectLevelDetail(lvl.level)}
                    className={`rounded-xl p-4 text-center border transition-all cursor-pointer flex flex-col items-center justify-between gap-3 min-h-[116px] ${
                      isCurrent
                        ? 'bg-[#FDFBF7] dark:bg-[#262320] border-[#B91C1C]/50 dark:border-[#DC2626]/60'
                        : 'bg-[#FAF8F4] hover:bg-[#F3EFE6] dark:bg-[#24211D] dark:hover:bg-[#2D2924] border-[#E6E0D4] dark:border-[#342F2A]'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="font-display text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB] block tabular-nums">
                        {lvl.level}
                      </span>
                      <span className="text-[12px] font-medium text-[#6B6560] dark:text-[#B5AEA5] block">
                        {LEVEL_TILE_SUBTITLES[lvl.level]}
                      </span>
                    </div>
                    <div className="w-full space-y-1">
                      <div className="w-8 h-1 rounded-full bg-[#E4DDD0] dark:bg-[#3A352F] mx-auto overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.max(isCurrent ? 35 : 0, pct)}%`,
                            backgroundColor: accent,
                          }}
                        />
                      </div>
                      <span className="text-[11px] text-[#6B6560] dark:text-[#A8A095] tabular-nums block">
                        {pct}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editorial Recommendation Card */}
          <div className="bg-[#FCF5F2] dark:bg-[#241B19] rounded-2xl border border-[#EED8D2] dark:border-[#3D2B27] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-[0_1px_3px_rgba(28,25,23,0.04)]">
            <div className="flex-1 min-w-0 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#B91C1C] dark:text-[#FCA5A5]">
                <Star className="w-4 h-4 fill-current" />
                <span>Rekomendasi Belajar</span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-[18px] font-bold text-[#1C1917] dark:text-[#F5F2EB] leading-snug">
                  {topRecommendation
                    ? sanitizeExamBrandingText(topRecommendation.titleDe)
                    : 'Tata Bahasa: Artikel der, die, das'}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#57524C] dark:text-[#C8C1B8]">
                  {topRecommendation
                    ? sanitizeExamBrandingText(topRecommendation.reasonDe)
                    : 'Pelajari penggunaan artikel tentu „der“, „die“, dan „das“ beserta contoh praktisnya.'}
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    if (topRecommendation && onOpenRecommendation) {
                      onOpenRecommendation(topRecommendation);
                    } else {
                      onNavigate('grammatik');
                    }
                  }}
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full bg-[#B91C1C] hover:bg-[#991B1B] dark:bg-[#DC2626] dark:hover:bg-[#B91C1C] text-white text-[14px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>{topRecommendation?.actionLabelDe ?? 'Mulai Belajar'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="w-32 sm:w-36 aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF2EB] dark:bg-[#2D221F] border border-[#EED8D2] dark:border-[#4A342F] shrink-0">
              <img
                src={recommendationBooksImg}
                alt="Buku tata bahasa dan latihan bahasa Jerman"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Real Compact Study Shortcuts */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => onNavigate('fehleranalyse')}
              className="text-left rounded-xl bg-white dark:bg-[#1F1D1A] hover:bg-[#F7F3EA] dark:hover:bg-[#262320] border border-[#E6E0D4] dark:border-[#2E2A25] p-3.5 transition-colors cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between text-[#B91C1C] dark:text-[#EF4444]">
                <AlertCircle className="w-4 h-4" />
                <span className="font-display text-base font-bold tabular-nums text-[#1C1917] dark:text-[#F5F2EB]">
                  {openMistakesCount}
                </span>
              </div>
              <p className="text-[12px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                Analisis Kesalahan
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('wortschatz')}
              className="text-left rounded-xl bg-white dark:bg-[#1F1D1A] hover:bg-[#F7F3EA] dark:hover:bg-[#262320] border border-[#E6E0D4] dark:border-[#2E2A25] p-3.5 transition-colors cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between text-[#B45309] dark:text-[#F59E0B]">
                <Layers className="w-4 h-4" />
                <span className="font-display text-base font-bold tabular-nums text-[#1C1917] dark:text-[#F5F2EB]">
                  {dueFlashcardsCount}
                </span>
              </div>
              <p className="text-[12px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                Kartu Kosakata
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('sammlung')}
              className="text-left rounded-xl bg-white dark:bg-[#1F1D1A] hover:bg-[#F7F3EA] dark:hover:bg-[#262320] border border-[#E6E0D4] dark:border-[#2E2A25] p-3.5 transition-colors cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between text-[#15803D] dark:text-emerald-400">
                <Bookmark className="w-4 h-4" />
                <span className="font-display text-base font-bold tabular-nums text-[#1C1917] dark:text-[#F5F2EB]">
                  {bookmarksCount}
                </span>
              </div>
              <p className="text-[12px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                Koleksi Saya
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Compact Neutral Exam Quick Launchers */}
      <section className="space-y-3 pt-1">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-[18px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Persiapan & Simulasi Ujian (A1–B2)
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('pruefung')}
            className="text-[13px] font-semibold text-[#57524C] hover:text-[#B91C1C] dark:text-[#C8C1B8] dark:hover:text-[#EF4444] inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Semua Simulasi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] p-5 flex flex-col justify-between gap-3.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-[16px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                  Simulasi Ujian — Paket Latihan A
                </h3>
                <p className="text-[13px] text-[#6B6560] dark:text-[#B5AEA5] mt-0.5">
                  Struktur gabungan (A1–A2) dan modul keterampilan terpisah (B1–B2)
                </p>
              </div>
              <Award className="w-5 h-5 text-[#B91C1C] dark:text-[#EF4444] shrink-0" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(['A1', 'A2', 'B1', 'B2'] as CEFRLevel[]).map((lvl) => (
                <button
                  key={`goethe-${lvl}`}
                  type="button"
                  onClick={() => onSelectExamDetail('goethe', lvl)}
                  className="min-h-[40px] px-3 rounded-xl bg-[#FAF8F4] hover:bg-[#FDF2F2] hover:text-[#B91C1C] hover:border-[#B91C1C]/40 dark:bg-[#262320] dark:hover:bg-[#2C1A19] dark:hover:text-[#FCA5A5] border border-[#E6E0D4] dark:border-[#3A352F] text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB] transition-colors cursor-pointer text-left"
                >
                  {getNeutralExamLevelLabel(lvl)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] p-5 flex flex-col justify-between gap-3.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-[16px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                  Simulasi Ujian — Paket Latihan B
                </h3>
                <p className="text-[13px] text-[#6B6560] dark:text-[#B5AEA5] mt-0.5">
                  Latihan terpadu dengan tata bahasa dalam konteks dan simulasi lisan
                </p>
              </div>
              <Award className="w-5 h-5 text-[#1C1917] dark:text-[#D1CBC2] shrink-0" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(['A1', 'A2', 'B1', 'B2'] as CEFRLevel[]).map((lvl) => (
                <button
                  key={`telc-${lvl}`}
                  type="button"
                  onClick={() => onSelectExamDetail('telc', lvl)}
                  className="min-h-[40px] px-3 rounded-xl bg-[#FAF8F4] hover:bg-[#FDF2F2] hover:text-[#B91C1C] hover:border-[#B91C1C]/40 dark:bg-[#262320] dark:hover:bg-[#2C1A19] dark:hover:text-[#FCA5A5] border border-[#E6E0D4] dark:border-[#3A352F] text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB] transition-colors cursor-pointer text-left"
                >
                  {getNeutralExamLevelLabel(lvl)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
