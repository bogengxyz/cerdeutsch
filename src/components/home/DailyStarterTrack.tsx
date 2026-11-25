import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flame,
  HelpCircle,
  PartyPopper,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  Volume2,
  XCircle,
} from 'lucide-react';
import { loadVocabularyForLevel } from '../../data/vocabulary';
import {
  DailyMissionState,
  completeStep1,
  completeStep2,
  getDailyWordsFromList,
  loadDailyMissionState,
  saveDailyMissionState,
} from '../../services/dailyMissionService';
import { NavPage } from '../../types/learning';
import { VocabularyEntry } from '../../types/vocabulary';

interface DailyStarterTrackProps {
  onNavigate: (page: NavPage) => void;
  onOpenVocabA1?: () => void;
  soundEnabled?: boolean;
}

export function DailyStarterTrack({
  onNavigate,
  onOpenVocabA1,
  soundEnabled = true,
}: DailyStarterTrackProps) {
  const [missionState, setMissionState] = useState<DailyMissionState>(() =>
    loadDailyMissionState(),
  );

  const [dailyWords, setDailyWords] = useState<VocabularyEntry[]>([]);
  const [isLoadingWords, setIsLoadingWords] = useState(true);

  useEffect(() => {
    let active = true;
    loadVocabularyForLevel('A1').then((a1Words) => {
      if (active) {
        setDailyWords(getDailyWordsFromList(a1Words, missionState.date));
        setIsLoadingWords(false);
      }
    });
    return () => {
      active = false;
    };
  }, [missionState.date]);

  // Step 1: Word navigation & checked states
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [learnedIds, setLearnedIds] = useState<string[]>(
    missionState.step1LearnedIds,
  );

  // Step 2: Quick Quiz states
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // Active step in UI
  const activeStep = !missionState.step1Completed
    ? 1
    : !missionState.step2Completed
      ? 2
      : 3;

  const currentWord = dailyWords[activeWordIndex] ?? dailyWords[0];

  // Generate quiz options for current quiz question
  const currentQuizWord = dailyWords[quizIndex] ?? dailyWords[0];
  const quizOptions = useMemo(() => {
    if (!currentQuizWord) return [];
    const correct = currentQuizWord.meaningId;
    const others = dailyWords
      .filter((w) => w.id !== currentQuizWord.id)
      .map((w) => w.meaningId);
    // Shuffle
    const options = [correct, ...others.slice(0, 3)].sort(() => Math.random() - 0.5);
    return options;
  }, [currentQuizWord, dailyWords]);

  // Play audio helper
  const handlePlayAudio = (audioPath?: string) => {
    if (!soundEnabled || !audioPath) return;
    try {
      const audio = new Audio(audioPath);
      audio.play().catch(() => {});
    } catch {
      // Ignore audio error
    }
  };

  // Toggle word learned in Step 1
  const handleToggleWordLearned = (wordId: string) => {
    const next = learnedIds.includes(wordId)
      ? learnedIds.filter((id) => id !== wordId)
      : [...learnedIds, wordId];
    setLearnedIds(next);

    // Auto advance if next word exists
    if (activeWordIndex < dailyWords.length - 1 && !learnedIds.includes(wordId)) {
      setActiveWordIndex((prev) => prev + 1);
    }
  };

  // Submit Step 1
  const handleFinishStep1 = () => {
    const allIds = dailyWords.map((w) => w.id);
    const updated = completeStep1(missionState, allIds);
    setMissionState(updated);
    saveDailyMissionState(updated);
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setQuizAnswered(false);
  };

  // Answer quiz question in Step 2
  const handleSelectQuizOption = (option: string) => {
    if (quizAnswered) return;
    setSelectedOption(option);
    setQuizAnswered(true);

    const isCorrect = option === currentQuizWord.meaningId;
    const newScore = isCorrect ? quizScore + 1 : quizScore;
    setQuizScore(newScore);

    // Wait 1.2s then next question or finish Step 2
    setTimeout(() => {
      if (quizIndex < dailyWords.length - 1) {
        setQuizIndex((prev) => prev + 1);
        setSelectedOption(null);
        setQuizAnswered(false);
      } else {
        // Complete mission!
        const updated = completeStep2(missionState, newScore);
        setMissionState(updated);
        saveDailyMissionState(updated);
      }
    }, 1200);
  };

  // Reset mission for replay
  const handleReplayMission = () => {
    setLearnedIds([]);
    setActiveWordIndex(0);
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setQuizAnswered(false);
    const reset = {
      ...missionState,
      step1Completed: false,
      step2Completed: false,
      completed: false,
    };
    setMissionState(reset);
    saveDailyMissionState(reset);
  };

  const getArticleColorClass = (art?: string) => {
    switch (art) {
      case 'der':
        return 'text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/40';
      case 'die':
        return 'text-red-700 bg-red-50 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/40';
      case 'das':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/40';
      default:
        return 'text-[#6B6560] bg-[#FAF8F4] border-[#E6E0D4] dark:bg-[#262320] dark:text-[#A8A095] dark:border-[#3A352F]';
    }
  };

  if (isLoadingWords || !currentWord) {
    return (
      <section
        aria-label="Misi Hari Ini untuk Pemula"
        className="p-5 sm:p-7 rounded-3xl bg-linear-to-br from-[#FFFBF5] via-[#FAF4EA] to-[#F3EAD9] dark:from-[#221E19] dark:via-[#1D1A16] dark:to-[#171512] border border-[#E8DCB8] dark:border-[#3D3528] shadow-sm animate-pulse space-y-4"
      >
        <div className="h-6 w-48 bg-[#EADDC5] dark:bg-[#332D23] rounded-md" />
        <div className="h-32 bg-white/60 dark:bg-[#1E1B17] rounded-2xl" />
      </section>
    );
  }

  return (
    <section
      aria-label="Misi Hari Ini untuk Pemula"
      className="p-5 sm:p-7 rounded-3xl bg-linear-to-br from-[#FFFBF5] via-[#FAF4EA] to-[#F3EAD9] dark:from-[#221E19] dark:via-[#1D1A16] dark:to-[#171512] border border-[#E8DCB8] dark:border-[#3D3528] shadow-sm space-y-6"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EADCC3] dark:border-[#383023] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#B91C1C] text-white shadow-2xs">
              Daily Starter Track
            </span>
            <span className="text-[12.5px] font-bold text-[#854D0E] dark:text-[#FCD34D] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>5 Menit Setiap Hari</span>
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#1C1917] dark:text-[#F5F2EB]">
            Misi Hari Ini untuk Pemula
          </h2>
          <p className="text-[13.5px] text-[#57524C] dark:text-[#C8C1B8]">
            Latih 5 kosa kata A1, selesaikan 1 kuis mini, dan dapatkan poin serta badge disiplin harian.
          </p>
        </div>

        {/* Streak & XP Counters */}
        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/90 dark:bg-[#28241F] border border-[#DFCBB5] dark:border-[#423A30] text-[13px] font-bold text-[#B91C1C] dark:text-[#EF4444] shadow-2xs">
            <Flame className="w-4 h-4 fill-current text-amber-500" />
            <span>{missionState.streakDays} Hari Beruntun</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/90 dark:bg-[#28241F] border border-[#DFCBB5] dark:border-[#423A30] text-[13px] font-bold text-emerald-700 dark:text-emerald-400 shadow-2xs">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span>+{missionState.completed ? 50 : 0} XP</span>
          </div>
        </div>
      </div>

      {/* 3 Steps Progress Tracker */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        {[
          { num: 1, title: 'Pelajari 5 Kata', done: missionState.step1Completed, isCur: activeStep === 1 },
          { num: 2, title: 'Kuis Flashcard', done: missionState.step2Completed, isCur: activeStep === 2 },
          { num: 3, title: 'Klaim Badge & XP', done: missionState.completed, isCur: activeStep === 3 },
        ].map((s) => (
          <div
            key={s.num}
            className={`p-3 rounded-2xl border transition-all flex items-center gap-2.5 ${
              s.done
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : s.isCur
                  ? 'bg-white dark:bg-[#2A2621] border-[#B91C1C] text-[#B91C1C] dark:text-[#FCA5A5] shadow-xs'
                  : 'bg-white/60 dark:bg-[#1F1C18] border-[#E8DEC8] dark:border-[#383126] text-[#786E64] dark:text-[#9E968C]'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-[12px] shrink-0 ${
                s.done
                  ? 'bg-emerald-600 text-white'
                  : s.isCur
                    ? 'bg-[#B91C1C] text-white'
                    : 'bg-[#EADDC5] dark:bg-[#3A3328] text-[#57524C] dark:text-[#C8C1B8]'
              }`}
            >
              {s.done ? <CheckCircle2 className="w-4 h-4" /> : s.num}
            </div>
            <div className="min-w-0">
              <p className="text-[12.5px] font-bold truncate">{s.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: PELAJARI 5 KATA HARI INI */}
      {/* ========================================================================= */}
      {activeStep === 1 && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-[#786E64] dark:text-[#C8C1B8]">
              Kata {activeWordIndex + 1} dari 5
            </span>
            <span className="text-[12px] text-[#B91C1C] dark:text-[#FCA5A5] font-semibold">
              {learnedIds.length} dari 5 dipelajari
            </span>
          </div>

          {/* Current Word Display Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1E1B17] border border-[#E6DECE] dark:border-[#332D23] shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {currentWord.article && (
                    <span
                      className={`text-[12px] font-bold px-2 py-0.5 rounded-lg border ${getArticleColorClass(
                        currentWord.article,
                      )}`}
                    >
                      {currentWord.article}
                    </span>
                  )}
                  <span className="text-[11px] font-medium text-[#786E64] dark:text-[#9E968C]">
                    {currentWord.partOfSpeech}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1C1917] dark:text-[#F5F2EB]">
                  {currentWord.word}
                </h3>
                {currentWord.plural && (
                  <p className="text-[13px] text-[#786E64] dark:text-[#A8A095]">
                    Plural: <em>{currentWord.plural}</em>
                  </p>
                )}
              </div>

              {currentWord.audioPath && (
                <button
                  type="button"
                  onClick={() => handlePlayAudio(currentWord.audioPath)}
                  title="Dengarkan pengucapan"
                  className="w-10 h-10 rounded-2xl bg-[#FDF2F2] hover:bg-[#FCE7E7] dark:bg-[#2C1A19] dark:hover:bg-[#38201E] text-[#B91C1C] dark:text-[#EF4444] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF5EC] dark:bg-[#26211A] border border-[#DFCBB5] dark:border-[#423A30] space-y-1">
              <p className="text-[11.5px] font-bold uppercase tracking-wider text-[#B91C1C] dark:text-[#FCA5A5]">
                Arti Bahasa Indonesia
              </p>
              <p className="text-[16px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                {currentWord.meaningId}
              </p>
            </div>

            {currentWord.exampleDe && (
              <div className="space-y-1 text-[13px] pt-1">
                <p className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                  🇩🇪 {currentWord.exampleDe}
                </p>
                {currentWord.exampleId && (
                  <p className="text-[#57524C] dark:text-[#C8C1B8]">
                    🇮🇩 {currentWord.exampleId}
                  </p>
                )}
              </div>
            )}

            {/* Bottom Actions for current word */}
            <div className="pt-3 border-t border-[#EFEAE0] dark:border-[#2E2A25] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleToggleWordLearned(currentWord.id)}
                className={`min-h-[42px] px-4 rounded-xl text-[13px] font-bold transition-all cursor-pointer inline-flex items-center gap-2 ${
                  learnedIds.includes(currentWord.id)
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-[#FAF8F4] dark:bg-[#262320] text-[#57524C] dark:text-[#C8C1B8] border border-[#E6E0D4] dark:border-[#3A352F] hover:border-emerald-600'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {learnedIds.includes(currentWord.id)
                    ? 'Sudah Dipahami'
                    : 'Tandai Sudah Paham'}
                </span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={activeWordIndex === 0}
                  onClick={() => setActiveWordIndex((prev) => prev - 1)}
                  className="p-2 rounded-xl border border-[#E6E0D4] dark:border-[#3A352F] disabled:opacity-40 text-[#57524C] dark:text-[#C8C1B8] hover:bg-white dark:hover:bg-[#262320] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={activeWordIndex === dailyWords.length - 1}
                  onClick={() => setActiveWordIndex((prev) => prev + 1)}
                  className="p-2 rounded-xl border border-[#E6E0D4] dark:border-[#3A352F] disabled:opacity-40 text-[#57524C] dark:text-[#C8C1B8] hover:bg-white dark:hover:bg-[#262320] cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Word Indicator Pills */}
          <div className="flex items-center justify-center gap-2">
            {dailyWords.map((w, idx) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setActiveWordIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeWordIndex === idx
                    ? 'bg-[#B91C1C] text-white shadow-xs'
                    : learnedIds.includes(w.id)
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800'
                      : 'bg-white dark:bg-[#1E1B17] text-[#57524C] dark:text-[#C8C1B8] border border-[#E6DECE] dark:border-[#332D23]'
                }`}
              >
                <span>{w.word}</span>
                {learnedIds.includes(w.id) && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>

          {/* Finish Step 1 Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleFinishStep1}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold text-[14px] shadow-sm transition-all cursor-pointer"
            >
              <span>Lanjut ke Langkah 2: Kuis Flashcard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: KUIS FLASHCARD 5 SOAL */}
      {/* ========================================================================= */}
      {activeStep === 2 && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-[#786E64] dark:text-[#C8C1B8]">
              Soal {quizIndex + 1} dari 5
            </span>
            <span className="text-[12.5px] font-bold text-emerald-700 dark:text-emerald-400">
              Skor: {quizScore}
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1E1B17] border border-[#E6DECE] dark:border-[#332D23] shadow-xs space-y-4">
            <div className="space-y-1 text-center py-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B91C1C] dark:text-[#FCA5A5] px-2.5 py-0.5 rounded-full bg-[#FDF2F2] dark:bg-[#2C1A19]">
                Tebak Arti Kosa Kata
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1C1917] dark:text-[#F5F2EB] pt-1">
                {currentQuizWord.article ? `${currentQuizWord.article} ` : ''}
                {currentQuizWord.word}
              </h3>
              <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8]">
                Apa arti dari kata bahasa Jerman di atas?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {quizOptions.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === currentQuizWord.meaningId;

                let btnClass =
                  'border-[#E6DECE] bg-[#FAF8F4] text-[#1C1917] hover:border-[#B91C1C] dark:border-[#332D23] dark:bg-[#26211A] dark:text-[#F5F2EB]';
                if (quizAnswered) {
                  if (isCorrect) {
                    btnClass =
                      'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-700';
                  } else if (isSelected && !isCorrect) {
                    btnClass =
                      'border-red-500 bg-red-50 text-red-900 dark:bg-red-950/60 dark:text-red-200 dark:border-red-700';
                  }
                }

                if (isLoadingWords || !currentWord) {
    return (
      <section
        aria-label="Misi Hari Ini untuk Pemula"
        className="p-5 sm:p-7 rounded-3xl bg-linear-to-br from-[#FFFBF5] via-[#FAF4EA] to-[#F3EAD9] dark:from-[#221E19] dark:via-[#1D1A16] dark:to-[#171512] border border-[#E8DCB8] dark:border-[#3D3528] shadow-sm animate-pulse space-y-4"
      >
        <div className="h-6 w-48 bg-[#EADDC5] dark:bg-[#332D23] rounded-md" />
        <div className="h-32 bg-white/60 dark:bg-[#1E1B17] rounded-2xl" />
      </section>
    );
  }

  return (
                  <button
                    key={idx}
                    type="button"
                    disabled={quizAnswered}
                    onClick={() => handleSelectQuizOption(opt)}
                    className={`min-h-[50px] p-3.5 rounded-xl border text-[14px] text-left transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                  >
                    <span>{opt}</span>
                    {quizAnswered && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {quizAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: KLAIM BADGE & POIN PENYEMANGAT */}
      {/* ========================================================================= */}
      {activeStep === 3 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-[#FAF2DF] via-[#F6EBD0] to-[#EFE2C2] dark:from-[#262016] dark:via-[#2F271B] dark:to-[#382E1E] border border-[#E8D9B8] dark:border-[#4A3D28] text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
            <PartyPopper className="w-8 h-8" />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <span className="text-[11.5px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
              Misi Harian Selesai!
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1C1917] dark:text-[#F5F2EB] pt-1">
              Selamat! Kamu Mendapat Badge:
            </h3>
            <p className="font-display text-xl font-bold text-[#B91C1C] dark:text-[#EF4444]">
              🏅 Pemula Disiplin (+50 XP)
            </p>
            <p className="text-[13.5px] text-[#57524C] dark:text-[#C8C1B8] leading-relaxed">
              Kamu telah melatih 5 kosa kata A1 hari ini dengan skor kuis {missionState.step2Score}/5. Belajar 5 menit setiap hari jauh lebih efektif daripada belajar berjam-jam sekali seminggu!
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleReplayMission}
              className="px-4 py-2.5 rounded-xl border border-[#DFCBB5] dark:border-[#423A30] bg-white dark:bg-[#1E1B17] text-[#57524C] dark:text-[#C8C1B8] text-[13px] font-semibold hover:border-[#B91C1C] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Latihan</span>
            </button>

            {onOpenVocabA1 ? (
              <button
                type="button"
                onClick={onOpenVocabA1}
                className="px-5 py-2.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-[13.5px] font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <span>Buka Bank Kosakata A1</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate('wortschatz')}
                className="px-5 py-2.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-[13.5px] font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <span>Buka Bank Kosakata</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
