import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Compass,
  GraduationCap,
  RotateCcw,
  Sparkles,
  Target,
  X,
  XCircle,
} from 'lucide-react';
import {
  LEARNING_GOAL_OPTIONS,
  PLACEMENT_QUESTIONS,
  evaluatePlacementScore,
} from '../../data/onboardingData';
import { CEFRLevel, NavPage } from '../../types/learning';
import { LearningGoal } from '../../types/progress';
import { GermanFlagMark } from '../ui/TouchFlowPrimitives';

export interface OnboardingResult {
  preferredLevel: CEFRLevel;
  learningGoal: LearningGoal;
  directToA0: boolean;
  startingExperience: 'beginner' | 'intermediate' | 'placement';
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (result: OnboardingResult) => void;
}

type WizardStep = 'experience' | 'placementQuiz' | 'goal' | 'summary';

export function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>('experience');

  // Experience choice state
  const [chosenExperience, setChosenExperience] = useState<'beginner' | 'intermediate' | 'placement'>('beginner');
  const [intermediateLevel, setIntermediateLevel] = useState<CEFRLevel>('A1');

  // Placement quiz state
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [placementFinished, setPlacementFinished] = useState(false);
  const [placementScore, setPlacementScore] = useState(0);

  // Goal state
  const [chosenGoal, setChosenGoal] = useState<LearningGoal>('ausbildung');

  // Computed summary values
  const [computedLevel, setComputedLevel] = useState<CEFRLevel>('A1');
  const [computedDirectToA0, setComputedDirectToA0] = useState(true);
  const [summaryMessage, setSummaryMessage] = useState({
    badge: 'Level Rekomendasi: A0 (Langkah Pertama)',
    title: 'Mulai dari Pondasi Nol (A0)',
    description: 'Pelajari cara membaca huruf Jerman, bunyi vokal unik, dan 20 kalimat darurat sebelum masuk ke A1.',
  });

  if (!isOpen) return null;

  // Handle Experience Selection
  const handleSelectExperience = (type: 'beginner' | 'intermediate' | 'placement') => {
    setChosenExperience(type);
    if (type === 'beginner') {
      setComputedLevel('A1');
      setComputedDirectToA0(true);
      setSummaryMessage({
        badge: 'Level Rekomendasi: A0 (Langkah Pertama)',
        title: 'Mulai dari Pondasi Nol (A0)',
        description: 'Sangat tepat untuk Anda! Modul A0 akan membimbing pengucapan alfabet Jerman, huruf unik (ä, ö, ü, ß), dan salam darurat.',
      });
      setCurrentStep('goal');
    } else if (type === 'intermediate') {
      setComputedLevel(intermediateLevel);
      setComputedDirectToA0(false);
      setSummaryMessage({
        badge: `Level Rekomendasi: ${intermediateLevel} (${intermediateLevel === 'A1' ? 'Tingkat Dasar' : 'Pra-Menengah'})`,
        title: `Lanjut ke Materi ${intermediateLevel}`,
        description: 'Anda sudah memiliki dasar kosakata. Kurikulum terstruktur kami akan membantu melatih tata bahasa dan 4 keterampilan utama.',
      });
      setCurrentStep('goal');
    } else {
      // Start Placement Quiz
      setQuizQuestionIndex(0);
      setQuizAnswers({});
      setPlacementFinished(false);
      setCurrentStep('placementQuiz');
    }
  };

  // Handle Placement Quiz Answer
  const handleAnswerPlacement = (qId: string, optionIdx: number) => {
    const updated = { ...quizAnswers, [qId]: optionIdx };
    setQuizAnswers(updated);

    // If last question, calculate score
    if (quizQuestionIndex === PLACEMENT_QUESTIONS.length - 1) {
      let finalScore = 0;
      PLACEMENT_QUESTIONS.forEach((q) => {
        if (updated[q.id] === q.correctIndex) {
          finalScore += 1;
        }
      });
      setPlacementScore(finalScore);
      setPlacementFinished(true);

      const evalResult = evaluatePlacementScore(finalScore);
      setComputedLevel(evalResult.targetCEFR);
      setComputedDirectToA0(evalResult.directToA0);
      setSummaryMessage({
        badge: evalResult.levelBadge,
        title: evalResult.feedbackTitle,
        description: evalResult.feedbackDescription,
      });
    } else {
      setQuizQuestionIndex((prev) => prev + 1);
    }
  };

  // Submit Final Onboarding
  const handleFinalSubmit = () => {
    onComplete({
      preferredLevel: computedLevel,
      learningGoal: chosenGoal,
      directToA0: computedDirectToA0,
      startingExperience: chosenExperience,
    });
  };

  // Goal Icon helper
  const renderGoalIcon = (name: string) => {
    switch (name) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Panduan Memulai Belajar Bahasa Jerman"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1917]/60 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1C1A17] rounded-3xl border border-[#E6E0D4] dark:border-[#2E2A25] shadow-2xl overflow-hidden flex flex-col my-8 animate-fade-in">
        {/* Header with Progress Steps and Close Button */}
        <div className="px-6 py-5 border-b border-[#EFEAE0] dark:border-[#2E2A25] flex items-center justify-between bg-[#FAF8F4] dark:bg-[#221F1B]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#B91C1C] text-white flex items-center justify-center shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-wider uppercase text-[#B91C1C] dark:text-[#FCA5A5]">
                Selamat Datang di cerDeutsch
              </p>
              <h2 className="font-display text-[17px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                {currentStep === 'experience' && 'Langkah 1: Pengalaman Belajar'}
                {currentStep === 'placementQuiz' && 'Tes Penempatan Singkat (Placement Test)'}
                {currentStep === 'goal' && 'Langkah 2: Target & Tujuan Belajar'}
                {currentStep === 'summary' && 'Langkah 3: Rekomendasi Profil Anda'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup panduan"
              className="p-2 rounded-xl text-[#6B6560] hover:bg-[#EFEAE0] dark:text-[#A8A095] dark:hover:bg-[#2C2721] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Indicators */}
        <div className="px-6 pt-3 pb-2 flex items-center justify-between gap-2 border-b border-[#EFEAE0] dark:border-[#262320] bg-white dark:bg-[#1C1A17]">
          <div className="flex items-center gap-2 flex-1">
            <div
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                currentStep === 'experience' || currentStep === 'placementQuiz'
                  ? 'bg-[#B91C1C]'
                  : 'bg-emerald-500'
              }`}
            />
            <div
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                currentStep === 'goal'
                  ? 'bg-[#B91C1C]'
                  : currentStep === 'summary'
                    ? 'bg-emerald-500'
                    : 'bg-[#EFEAE0] dark:bg-[#2E2A25]'
              }`}
            />
            <div
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                currentStep === 'summary' ? 'bg-[#B91C1C]' : 'bg-[#EFEAE0] dark:border-[#2E2A25] bg-[#EFEAE0] dark:bg-[#2E2A25]'
              }`}
            />
          </div>
          <span className="text-[11px] font-semibold text-[#786E64] dark:text-[#9E968C] tabular-nums">
            {currentStep === 'experience' && '1 dari 3'}
            {currentStep === 'placementQuiz' && 'Kuis Penempatan'}
            {currentStep === 'goal' && '2 dari 3'}
            {currentStep === 'summary' && '3 dari 3'}
          </span>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-7 space-y-6">
          {/* STEP 1: EXPERIENCE SELECTION */}
          {currentStep === 'experience' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                  Halo! Seberapa jauh kamu mengenal bahasa Jerman?
                </h3>
                <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
                  Pilih opsi yang paling menggambarkan kondisimu saat ini agar kami bisa menyajikan materi yang pas:
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {/* Option A: True Beginner */}
                <button
                  type="button"
                  onClick={() => handleSelectExperience('beginner')}
                  className="w-full text-left p-4 sm:p-5 rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] hover:border-[#B91C1C] bg-[#FAF8F4] dark:bg-[#221F1B] hover:bg-white dark:hover:bg-[#282420] transition-all cursor-pointer flex items-start gap-4 group shadow-2xs"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FDF2F2] dark:bg-[#2C1A19] border border-[#EED8D2] dark:border-[#4A2624] text-[#B91C1C] dark:text-[#EF4444] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-[16px] font-bold text-[#1C1917] dark:text-[#F5F2EB] group-hover:text-[#B91C1C] dark:group-hover:text-[#EF4444] transition-colors">
                        Baru mau mulai dari nol banget
                      </p>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FAF5EC] dark:bg-[#2C2721] text-[#B91C1C] dark:text-[#FCA5A5] border border-[#DFCBB5] dark:border-[#423A30]">
                        Pemula Mutlak
                      </span>
                    </div>
                    <p className="text-[13px] text-[#57524C] dark:text-[#B5AEA5] leading-relaxed">
                      Belum pernah belajar bahasa Jerman sama sekali. Ingin mulai santai dari cara baca alfabet, vokal unik (ä, ö, ü, ß), dan salam darurat (A0).
                    </p>
                  </div>
                </button>

                {/* Option B: Has Some Experience */}
                <div className="p-4 sm:p-5 rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] bg-[#FAF8F4] dark:bg-[#221F1B] space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="font-display text-[16px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                        Sudah pernah belajar sedikit
                      </p>
                      <p className="text-[13px] text-[#57524C] dark:text-[#B5AEA5] leading-relaxed">
                        Sudah mengenal salam dasar, angka, atau beberapa kata benda. Ingin langsung fokus pada kurikulum terstruktur.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#EFEAE0] dark:border-[#2E2A25] flex flex-wrap items-center justify-between gap-2.5">
                    <span className="text-[12.5px] font-medium text-[#6B6560] dark:text-[#A8A095]">
                      Pilih tingkat awalmu:
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIntermediateLevel('A1');
                          handleSelectExperience('intermediate');
                        }}
                        className="px-3.5 py-1.5 rounded-xl border border-[#B91C1C] text-[#B91C1C] bg-[#FDF2F2] dark:bg-[#2C1A19] dark:text-[#FCA5A5] text-[12.5px] font-bold hover:bg-[#B91C1C] hover:text-white transition-colors cursor-pointer"
                      >
                        Mulai dari A1 (Dasar)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIntermediateLevel('A2');
                          handleSelectExperience('intermediate');
                        }}
                        className="px-3.5 py-1.5 rounded-xl border border-[#E6E0D4] dark:border-[#3A352F] text-[#57524C] dark:text-[#C8C1B8] hover:border-[#B91C1C] hover:text-[#B91C1C] bg-white dark:bg-[#1C1A17] text-[12.5px] font-bold transition-colors cursor-pointer"
                      >
                        Mulai dari A2 (Pra-Menengah)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Option C: Quick Placement Test */}
                <button
                  type="button"
                  onClick={() => handleSelectExperience('placement')}
                  className="w-full text-left p-4 sm:p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 hover:border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all cursor-pointer flex items-start gap-4 group shadow-2xs"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-[16px] font-bold text-emerald-950 dark:text-emerald-200 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                        Tes penempatan cepat (Quick Placement Test)
                      </p>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
                        6 Soal · 3 Mnt
                      </span>
                    </div>
                    <p className="text-[13px] text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
                      Belum yakin di mana posisimu? Jawab 6 soal santai untuk kami bantu rekomendasikan level yang paling tepat untukmu.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* SUB-STEP: PLACEMENT QUIZ */}
          {currentStep === 'placementQuiz' && (
            <div className="space-y-5">
              {!placementFinished ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] font-bold text-[#B91C1C] dark:text-[#FCA5A5] uppercase tracking-wider">
                      Pertanyaan {quizQuestionIndex + 1} dari {PLACEMENT_QUESTIONS.length}
                    </span>
                    <span className="text-[12px] text-[#786E64] dark:text-[#9E968C]">
                      Target: {PLACEMENT_QUESTIONS[quizQuestionIndex].levelTarget}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F4] dark:bg-[#221F1B] border border-[#E6E0D4] dark:border-[#2E2A25] space-y-4">
                    <p className="font-display text-[16px] sm:text-[17px] font-bold text-[#1C1917] dark:text-[#F5F2EB] leading-snug">
                      {PLACEMENT_QUESTIONS[quizQuestionIndex].question}
                    </p>

                    <div className="grid grid-cols-1 gap-2.5">
                      {PLACEMENT_QUESTIONS[quizQuestionIndex].options.map((option, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            handleAnswerPlacement(
                              PLACEMENT_QUESTIONS[quizQuestionIndex].id,
                              idx,
                            )
                          }
                          className="min-h-[46px] p-3 rounded-xl border border-[#E6E0D4] dark:border-[#3A352F] bg-white dark:bg-[#1C1A17] hover:border-[#B91C1C] hover:bg-[#FDF2F2] dark:hover:bg-[#2C1A19] text-[#1C1917] dark:text-[#F5F2EB] text-[13.5px] font-medium text-left transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>{option}</span>
                          <ChevronRight className="w-4 h-4 text-[#786E64] shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('experience')}
                      className="text-[13px] font-medium text-[#786E64] hover:text-[#1C1917] dark:text-[#A8A095] dark:hover:text-[#F5F2EB] flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Kembali ke pilihan awal</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Placement Quiz Finished Screen */
                <div className="text-center space-y-4 py-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-[13px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                      Tes Penempatan Selesai
                    </p>
                    <h3 className="font-display text-2xl font-extrabold text-[#1C1917] dark:text-[#F5F2EB]">
                      Skor Anda: {placementScore} dari 6 Benar
                    </h3>
                  </div>

                  <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#FAF5EC] dark:bg-[#2C2721] border border-[#DFCBB5] dark:border-[#423A30] text-left space-y-1.5">
                    <span className="text-[11.5px] font-bold uppercase text-[#B91C1C] dark:text-[#FCA5A5]">
                      {summaryMessage.badge}
                    </span>
                    <p className="font-display text-[15px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      {summaryMessage.title}
                    </p>
                    <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8] leading-relaxed">
                      {summaryMessage.description}
                    </p>
                  </div>

                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('goal')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold text-[14px] shadow-sm transition-colors cursor-pointer"
                    >
                      <span>Lanjut ke Target Belajar</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: LEARNING GOAL SELECTION */}
          {currentStep === 'goal' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                  Apa target utamamu belajar bahasa Jerman?
                </h3>
                <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
                  Pilih fokus utama agar kami bisa mengarahkan konten dan latihan yang relevan:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {LEARNING_GOAL_OPTIONS.map((goal) => {
                  const isSelected = chosenGoal === goal.id;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setChosenGoal(goal.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        isSelected
                          ? 'border-[#B91C1C] bg-[#FDF2F2] dark:bg-[#2C1A19] shadow-xs'
                          : 'border-[#E6E0D4] dark:border-[#2E2A25] bg-[#FAF8F4] dark:bg-[#221F1B] hover:border-[#B91C1C]/40'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#B91C1C] text-white'
                              : 'bg-white dark:bg-[#1C1A17] text-[#57524C] dark:text-[#C8C1B8] border border-[#E6E0D4] dark:border-[#3A352F]'
                          }`}
                        >
                          {renderGoalIcon(goal.iconName)}
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-[#B91C1C] dark:text-[#EF4444]" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <p className="font-display text-[15.5px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                          {goal.title}
                        </p>
                        <p className="text-[12px] text-[#B91C1C] dark:text-[#FCA5A5] font-medium">
                          {goal.subtitle}
                        </p>
                        <p className="text-[12.5px] text-[#57524C] dark:text-[#B5AEA5] leading-relaxed">
                          {goal.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#EFEAE0] dark:border-[#2E2A25]">
                <button
                  type="button"
                  onClick={() => setCurrentStep('experience')}
                  className="text-[13px] font-medium text-[#786E64] hover:text-[#1C1917] dark:text-[#A8A095] dark:hover:text-[#F5F2EB] flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep('summary')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold text-[14px] shadow-sm transition-colors cursor-pointer"
                >
                  <span>Lihat Rekomendasi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUMMARY & FINAL CONFIRMATION */}
          {currentStep === 'summary' && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#B91C1C] text-white flex items-center justify-center mx-auto shadow-sm">
                  <GermanFlagMark className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-[#1C1917] dark:text-[#F5F2EB] pt-1">
                  Rencana Belajar Pribadimu Siap!
                </h3>
                <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8] max-w-md mx-auto">
                  Berdasarkan jawabanmu, kami telah menyesuaikan profil belajarmu:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="p-4 rounded-2xl bg-[#FAF5EC] dark:bg-[#26221D] border border-[#DFCBB5] dark:border-[#423A30] space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B91C1C] dark:text-[#FCA5A5]">
                    Tingkat Awal Pembelajaran
                  </span>
                  <p className="font-display text-[17px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                    {computedDirectToA0 ? 'Level A0 · Langkah Pertama' : `Level ${computedLevel}`}
                  </p>
                  <p className="text-[12.5px] text-[#57524C] dark:text-[#C8C1B8]">
                    {summaryMessage.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF5EC] dark:bg-[#26221D] border border-[#DFCBB5] dark:border-[#423A30] space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B91C1C] dark:text-[#FCA5A5]">
                    Fokus Target Utama
                  </span>
                  <p className="font-display text-[17px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                    {LEARNING_GOAL_OPTIONS.find((g) => g.id === chosenGoal)?.title}
                  </p>
                  <p className="text-[12.5px] text-[#57524C] dark:text-[#C8C1B8]">
                    {LEARNING_GOAL_OPTIONS.find((g) => g.id === chosenGoal)?.description}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5" />
                <p className="text-[13px] text-emerald-900 dark:text-emerald-200 leading-relaxed">
                  Semua pengaturan ini tersimpan otomatis di perangkatmu (100% lokal & offline) dan dapat diubah kapan saja di menu <strong>Pengaturan</strong>.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep('goal')}
                  className="text-[13px] font-medium text-[#786E64] hover:text-[#1C1917] dark:text-[#A8A095] dark:hover:text-[#F5F2EB] flex items-center gap-1.5 cursor-pointer order-2 sm:order-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Ubah Target</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold text-[15px] shadow-sm transition-all cursor-pointer order-1 sm:order-2"
                >
                  <span>Mulai Petualangan Belajarmu!</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
