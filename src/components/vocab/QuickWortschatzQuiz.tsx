import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  HelpCircle,
  Keyboard,
  ListChecks,
  PartyPopper,
  RotateCcw,
  Sparkles,
  Volume2,
  XCircle,
} from 'lucide-react';
import { FlashcardRating, FlashcardReviewRecord } from '../../types/phase4';
import { VocabularyEntry } from '../../types/vocabulary';

type BatchSize = 5 | 10;
type QuizMode = 'mcq' | 'typing';
type RoundPhase = 'learn' | 'quiz' | 'summary';

interface QuickWortschatzQuizProps {
  words: VocabularyEntry[];
  allLevelWords: VocabularyEntry[];
  srsSchedule: Record<string, FlashcardReviewRecord>;
  onRateFlashcard: (vocabId: string, rating: FlashcardRating) => void;
  soundEnabled: boolean;
  activeLevelLabel: string;
  activeTopicLabel: string;
}

const GERMAN_SPECIAL_CHARS = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'] as const;

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Selects a fresh batch of words prioritizing:
 * 1. Words never reviewed yet in SRS
 * 2. Words currently due for review
 * 3. Other words in the filtered pool
 * Excludes previously practiced IDs in the current session when possible.
 */
function pickRoundWords(
  pool: VocabularyEntry[],
  srsSchedule: Record<string, FlashcardReviewRecord>,
  count: number,
  excludeIds: Set<string>,
): VocabularyEntry[] {
  if (pool.length === 0) return [];
  const now = Date.now();

  const preferredPool =
    pool.length > count && excludeIds.size > 0
      ? pool.filter((w) => !excludeIds.has(w.id))
      : pool;
  const source = preferredPool.length >= Math.min(count, pool.length) ? preferredPool : pool;

  const unseen: VocabularyEntry[] = [];
  const due: VocabularyEntry[] = [];
  const mastered: VocabularyEntry[] = [];

  for (const w of source) {
    const rec = srsSchedule[w.id];
    if (!rec) {
      unseen.push(w);
    } else if (new Date(rec.nextReviewAtIso).getTime() <= now) {
      due.push(w);
    } else {
      mastered.push(w);
    }
  }

  const ordered = [
    ...shuffleArray(unseen),
    ...shuffleArray(due),
    ...shuffleArray(mastered),
  ];

  return ordered.slice(0, Math.min(count, ordered.length));
}

export function checkTypedVocabAnswer(input: string, entry: VocabularyEntry): boolean {
  const cleanInput = input.trim().replace(/\s+/g, ' ').toLowerCase();
  if (!cleanInput) return false;

  const targetWord = entry.word.trim().toLowerCase();
  if (cleanInput === targetWord) return true;

  if (entry.article) {
    const withArticle = `${entry.article.trim().toLowerCase()} ${targetWord}`;
    if (cleanInput === withArticle) return true;
  }

  return false;
}

export function QuickWortschatzQuiz({
  words,
  allLevelWords,
  srsSchedule,
  onRateFlashcard,
  soundEnabled,
  activeLevelLabel,
  activeTopicLabel,
}: QuickWortschatzQuizProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [batchSize, setBatchSize] = useState<BatchSize>(5);
  const [quizMode, setQuizMode] = useState<QuizMode>('mcq');
  const [phase, setPhase] = useState<RoundPhase>('learn');

  const [roundWords, setRoundWords] = useState<VocabularyEntry[]>([]);
  const [recentIds, setRecentIds] = useState<Set<string>>(() => new Set());

  // Step 1: Learn state
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [learnedIds, setLearnedIds] = useState<string[]>([]);

  // Step 2: Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [showTypingHint, setShowTypingHint] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  const typingInputRef = useRef<HTMLInputElement | null>(null);

  const unmasteredCount = useMemo(() => {
    return words.filter((w) => !srsSchedule[w.id]).length;
  }, [words, srsSchedule]);

  const startNewRound = (
    targetSize: BatchSize = batchSize,
    keepCurrentWords = false,
  ) => {
    const nextWords = keepCurrentWords && roundWords.length > 0
      ? roundWords
      : pickRoundWords(words, srsSchedule, targetSize, recentIds);

    setRoundWords(nextWords);
    if (!keepCurrentWords && nextWords.length > 0) {
      setRecentIds((prev) => {
        const updated = new Set(prev);
        for (const w of nextWords) updated.add(w.id);
        if (updated.size >= words.length) {
          return new Set(nextWords.map((w) => w.id));
        }
        return updated;
      });
    }

    setPhase('learn');
    setActiveWordIndex(0);
    setLearnedIds([]);
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setTypedAnswer('');
    setShowTypingHint(false);
    setQuizAnswered(false);
    setLastAnswerCorrect(false);
  };

  // Initialize or refresh round when opened or when filter pool changes significantly
  useEffect(() => {
    if (isOpen && words.length > 0 && roundWords.length === 0) {
      startNewRound(batchSize, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, words]);

  // Reset round when level or topic filter changes while open
  useEffect(() => {
    if (isOpen && words.length > 0) {
      setRecentIds(new Set());
      startNewRound(batchSize, false);
    } else if (!isOpen) {
      setRoundWords([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLevelLabel, activeTopicLabel]);

  // Auto-focus typing input when advancing in typing quiz
  useEffect(() => {
    if (isOpen && phase === 'quiz' && quizMode === 'typing' && !quizAnswered) {
      typingInputRef.current?.focus();
    }
  }, [isOpen, phase, quizMode, quizIndex, quizAnswered]);

  const currentWord = roundWords[activeWordIndex] ?? roundWords[0];
  const currentQuizWord = roundWords[quizIndex] ?? roundWords[0];

  const mcqOptions = useMemo(() => {
    if (!currentQuizWord) return [];
    const distractorSource = allLevelWords.length >= 4 ? allLevelWords : words;
    const distractors = shuffleArray(
      distractorSource.filter(
        (w) =>
          w.id !== currentQuizWord.id &&
          w.meaningId.toLowerCase() !== currentQuizWord.meaningId.toLowerCase(),
      ),
    )
      .slice(0, 3)
      .map((w) => w.meaningId);

    return shuffleArray([currentQuizWord.meaningId, ...distractors]);
  }, [currentQuizWord, allLevelWords, words]);

  const playAudio = (audioPath?: string) => {
    if (!soundEnabled || !audioPath) return;
    try {
      const audio = new Audio(audioPath);
      audio.play().catch(() => {});
    } catch {
      // Ignore playback error
    }
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

  const handleToggleLearned = (wordId: string) => {
    const already = learnedIds.includes(wordId);
    const next = already
      ? learnedIds.filter((id) => id !== wordId)
      : [...learnedIds, wordId];
    setLearnedIds(next);

    if (!already && activeWordIndex < roundWords.length - 1) {
      setActiveWordIndex((prev) => prev + 1);
    }
  };

  const handleStartQuizPhase = () => {
    setPhase('quiz');
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setTypedAnswer('');
    setShowTypingHint(false);
    setQuizAnswered(false);
    setLastAnswerCorrect(false);
  };

  const advanceQuizOrFinish = () => {
    if (quizIndex < roundWords.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setTypedAnswer('');
      setShowTypingHint(false);
      setQuizAnswered(false);
      setLastAnswerCorrect(false);
    } else {
      setPhase('summary');
    }
  };

  const handleSelectMcqOption = (option: string) => {
    if (quizAnswered || !currentQuizWord) return;
    setSelectedOption(option);
    setQuizAnswered(true);

    const isCorrect = option === currentQuizWord.meaningId;
    setLastAnswerCorrect(isCorrect);
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      playAudio(currentQuizWord.audioPath);
    }
    onRateFlashcard(currentQuizWord.id, isCorrect ? 'gewusst' : 'wiederholen');

    setTimeout(() => {
      advanceQuizOrFinish();
    }, 1100);
  };

  const handleSubmitTypedAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (quizAnswered || !currentQuizWord || !typedAnswer.trim()) return;

    const isCorrect = checkTypedVocabAnswer(typedAnswer, currentQuizWord);
    setQuizAnswered(true);
    setLastAnswerCorrect(isCorrect);

    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      playAudio(currentQuizWord.audioPath);
    }
    onRateFlashcard(currentQuizWord.id, isCorrect ? 'gewusst' : 'wiederholen');
  };

  const handleInsertSpecialChar = (ch: string) => {
    if (quizAnswered) return;
    setTypedAnswer((prev) => prev + ch);
    typingInputRef.current?.focus();
  };

  if (words.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Latihan Hafalan Cepat Kosakata"
      className="rounded-2xl bg-linear-to-br from-[#FFFBF5] via-[#FAF4EA] to-[#F3EAD9] dark:from-[#221E19] dark:via-[#1D1A16] dark:to-[#171512] border border-[#E8DCB8] dark:border-[#3D3528] shadow-xs overflow-hidden"
    >
      {/* Collapsible Header */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#B91C1C] text-white">
              Latihan Hafalan Cepat
            </span>
            <span className="text-[12px] font-semibold text-[#854D0E] dark:text-[#FCD34D] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {activeLevelLabel} • {activeTopicLabel} ({unmasteredCount} belum hafal)
              </span>
            </span>
          </div>
          <h2 className="font-display text-[17px] sm:text-[19px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Kuis Flashcard & Ketik Kata (Bebas Kapan Saja)
          </h2>
          <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8]">
            Hafalkan 5 atau 10 kata sesuai filter aktif, lalu uji lewat pilihan ganda atau ketik langsung kata Jermannya.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="min-h-[42px] px-4 py-2 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-[13px] font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 self-start sm:self-center shadow-xs"
        >
          <span>{isOpen ? 'Sembunyikan' : 'Mulai Latihan Cepat'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Interactive Area */}
      {isOpen && currentWord && (
        <div className="px-4 sm:px-6 pb-6 pt-3 border-t border-[#EADCC3] dark:border-[#383023] space-y-5">
          {/* Controls Bar: Batch Size + Quiz Mode */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-bold text-[#786E64] dark:text-[#C8C1B8]">
                Jumlah:
              </span>
              {([5, 10] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => {
                    setBatchSize(sz);
                    startNewRound(sz, false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-colors cursor-pointer ${
                    batchSize === sz
                      ? 'bg-[#B91C1C] text-white'
                      : 'bg-white dark:bg-[#26211A] text-[#57524C] dark:text-[#C8C1B8] border border-[#E6DECE] dark:border-[#3A352F]'
                  }`}
                >
                  {sz} Kata
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 bg-white/80 dark:bg-[#26211A] p-1 rounded-xl border border-[#E6DECE] dark:border-[#3A352F]">
              <button
                type="button"
                onClick={() => setQuizMode('mcq')}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                  quizMode === 'mcq'
                    ? 'bg-[#1C1917] text-white dark:bg-[#F5F2EB] dark:text-[#1C1917]'
                    : 'text-[#57524C] dark:text-[#C8C1B8]'
                }`}
              >
                <ListChecks className="w-3.5 h-3.5" />
                <span>Pilihan Ganda</span>
              </button>
              <button
                type="button"
                onClick={() => setQuizMode('typing')}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                  quizMode === 'typing'
                    ? 'bg-[#1C1917] text-white dark:bg-[#F5F2EB] dark:text-[#1C1917]'
                    : 'text-[#57524C] dark:text-[#C8C1B8]'
                }`}
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span>Ketik Kata</span>
              </button>
            </div>
          </div>

          {/* 3-Step Indicator */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { key: 'learn', num: 1, title: `Hafalkan ${roundWords.length} Kata` },
              {
                key: 'quiz',
                num: 2,
                title: quizMode === 'typing' ? 'Tebak & Ketik Kata' : 'Kuis Pilihan Ganda',
              },
              { key: 'summary', num: 3, title: 'Selesai & Lanjut' },
            ].map((s, idx) => {
              const phaseIdx = phase === 'learn' ? 0 : phase === 'quiz' ? 1 : 2;
              const isDone = idx < phaseIdx || (phase === 'summary' && idx === 2);
              const isCur = idx === phaseIdx && phase !== 'summary';
              return (
                <div
                  key={s.key}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                    isDone
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                      : isCur
                        ? 'bg-white dark:bg-[#2A2621] border-[#B91C1C] text-[#B91C1C] dark:text-[#FCA5A5]'
                        : 'bg-white/60 dark:bg-[#1F1C18] border-[#E8DEC8] dark:border-[#383126] text-[#786E64] dark:text-[#9E968C]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11.5px] font-bold shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isCur
                          ? 'bg-[#B91C1C] text-white'
                          : 'bg-[#EADDC5] dark:bg-[#3A3328] text-[#57524C] dark:text-[#C8C1B8]'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.num}
                  </div>
                  <span className="text-[12px] font-bold truncate">{s.title}</span>
                </div>
              );
            })}
          </div>

          {/* ================================================================= */}
          {/* PHASE 1: LEARN WORDS */}
          {/* ================================================================= */}
          {phase === 'learn' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[12.5px] font-bold">
                <span className="text-[#786E64] dark:text-[#C8C1B8]">
                  Kata {activeWordIndex + 1} dari {roundWords.length}
                </span>
                <span className="text-[#B91C1C] dark:text-[#FCA5A5]">
                  {learnedIds.length} dari {roundWords.length} ditandai paham
                </span>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1E1B17] border border-[#E6DECE] dark:border-[#332D23] shadow-xs space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FAF8F4] dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] text-[#786E64] dark:text-[#C8C1B8]">
                        {currentWord.level}
                      </span>
                      {currentWord.article && (
                        <span
                          className={`text-[12px] font-bold px-2 py-0.5 rounded-md border ${getArticleColorClass(
                            currentWord.article,
                          )}`}
                        >
                          {currentWord.article}
                        </span>
                      )}
                      <span className="text-[11.5px] font-medium text-[#786E64] dark:text-[#9E968C]">
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
                      onClick={() => playAudio(currentWord.audioPath)}
                      title="Dengarkan pengucapan"
                      className="w-10 h-10 rounded-xl bg-[#FDF2F2] hover:bg-[#FCE7E7] dark:bg-[#2C1A19] text-[#B91C1C] dark:text-[#EF4444] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF5EC] dark:bg-[#26211A] border border-[#DFCBB5] dark:border-[#423A30]">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#B91C1C] dark:text-[#FCA5A5]">
                    Arti Bahasa Indonesia
                  </p>
                  <p className="text-[16px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                    {currentWord.meaningId}
                  </p>
                </div>

                {currentWord.exampleDe && (
                  <div className="space-y-1 text-[13px]">
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

                <div className="pt-3 border-t border-[#EFEAE0] dark:border-[#2E2A25] flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleLearned(currentWord.id)}
                    className={`min-h-[40px] px-4 rounded-xl text-[13px] font-bold transition-all cursor-pointer inline-flex items-center gap-2 ${
                      learnedIds.includes(currentWord.id)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#FAF8F4] dark:bg-[#262320] text-[#57524C] dark:text-[#C8C1B8] border border-[#E6E0D4] dark:border-[#3A352F] hover:border-emerald-600'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {learnedIds.includes(currentWord.id) ? 'Sudah Dipahami' : 'Tandai Sudah Paham'}
                    </span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={activeWordIndex === 0}
                      onClick={() => setActiveWordIndex((prev) => prev - 1)}
                      className="p-2 rounded-xl border border-[#E6E0D4] dark:border-[#3A352F] disabled:opacity-40 text-[#57524C] dark:text-[#C8C1B8] cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={activeWordIndex === roundWords.length - 1}
                      onClick={() => setActiveWordIndex((prev) => prev + 1)}
                      className="p-2 rounded-xl border border-[#E6E0D4] dark:border-[#3A352F] disabled:opacity-40 text-[#57524C] dark:text-[#C8C1B8] cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Word Indicator Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {roundWords.map((w, idx) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setActiveWordIndex(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[12px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      activeWordIndex === idx
                        ? 'bg-[#B91C1C] text-white'
                        : learnedIds.includes(w.id)
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800'
                          : 'bg-white dark:bg-[#1E1B17] text-[#57524C] dark:text-[#C8C1B8] border border-[#E6DECE] dark:border-[#332D23]'
                    }`}
                  >
                    <span>{w.word}</span>
                    {learnedIds.includes(w.id) && <CheckCircle2 className="w-3 h-3" />}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => startNewRound(batchSize, false)}
                  className="px-3.5 py-2 rounded-xl border border-[#E6DECE] dark:border-[#3A352F] bg-white dark:bg-[#1E1B17] text-[12.5px] font-semibold text-[#57524C] dark:text-[#C8C1B8] hover:border-[#B91C1C] cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ganti Kata Acak</span>
                </button>

                <button
                  type="button"
                  onClick={handleStartQuizPhase}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold text-[13.5px] shadow-xs transition-all cursor-pointer"
                >
                  <span>
                    Lanjut ke Kuis ({quizMode === 'typing' ? 'Ketik Kata' : 'Pilihan Ganda'})
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* PHASE 2: QUIZ (MCQ OR TYPING) */}
          {/* ================================================================= */}
          {phase === 'quiz' && currentQuizWord && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[13px] font-bold">
                <span className="text-[#786E64] dark:text-[#C8C1B8]">
                  Soal {quizIndex + 1} dari {roundWords.length}
                </span>
                <span className="text-emerald-700 dark:text-emerald-400">
                  Skor: {quizScore}
                </span>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1E1B17] border border-[#E6DECE] dark:border-[#332D23] shadow-xs space-y-4">
                {quizMode === 'mcq' ? (
                  <>
                    <div className="space-y-1 text-center py-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#B91C1C] dark:text-[#FCA5A5] px-2.5 py-0.5 rounded-full bg-[#FDF2F2] dark:bg-[#2C1A19]">
                        Tebak Arti Kosakata
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1C1917] dark:text-[#F5F2EB] pt-1">
                        {currentQuizWord.article ? `${currentQuizWord.article} ` : ''}
                        {currentQuizWord.word}
                      </h3>
                      <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8]">
                        Apa arti dari kata bahasa Jerman di atas?
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {mcqOptions.map((opt, idx) => {
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

                        return (
                          <button
                            key={idx}
                            type="button"
                            disabled={quizAnswered}
                            onClick={() => handleSelectMcqOption(opt)}
                            className={`min-h-[48px] p-3.5 rounded-xl border text-[14px] text-left transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
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
                  </>
                ) : (
                  /* TYPING MODE */
                  <form onSubmit={handleSubmitTypedAnswer} className="space-y-4">
                    <div className="space-y-1.5 text-center py-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#B91C1C] dark:text-[#FCA5A5] px-2.5 py-0.5 rounded-full bg-[#FDF2F2] dark:bg-[#2C1A19]">
                        Ketik Kata Bahasa Jerman
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#1C1917] dark:text-[#F5F2EB] pt-1">
                        “{currentQuizWord.meaningId}”
                      </h3>
                      <p className="text-[12.5px] text-[#57524C] dark:text-[#C8C1B8]">
                        Jenis kata: <strong>{currentQuizWord.partOfSpeech}</strong>
                        {currentQuizWord.article ? ' (boleh ketik kata saja atau dengan artikel)' : ''}
                      </p>
                    </div>

                    {/* Input + Submit */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        ref={typingInputRef}
                        type="text"
                        disabled={quizAnswered}
                        value={typedAnswer}
                        onChange={(e) => setTypedAnswer(e.target.value)}
                        placeholder="Ketik kata Jerman di sini..."
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        className="flex-1 min-h-[46px] px-4 rounded-xl border border-[#DFCBB5] dark:border-[#423A30] bg-[#FAF8F4] dark:bg-[#26211A] text-[15px] font-semibold text-[#1C1917] dark:text-[#F5F2EB] focus:border-[#B91C1C] focus:outline-none"
                      />
                      {!quizAnswered ? (
                        <button
                          type="submit"
                          disabled={!typedAnswer.trim()}
                          className="min-h-[46px] px-5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] disabled:opacity-40 text-white text-[13.5px] font-bold cursor-pointer transition-colors"
                        >
                          Periksa Jawaban
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={advanceQuizOrFinish}
                          className="min-h-[46px] px-5 rounded-xl bg-[#1C1917] hover:bg-[#332E2A] dark:bg-[#F5F2EB] dark:text-[#1C1917] text-white text-[13.5px] font-bold cursor-pointer inline-flex items-center justify-center gap-1.5"
                        >
                          <span>
                            {quizIndex < roundWords.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil'}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Special German Character Buttons + Hint */}
                    {!quizAnswered && (
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1">
                          {GERMAN_SPECIAL_CHARS.map((ch) => (
                            <button
                              key={ch}
                              type="button"
                              onClick={() => handleInsertSpecialChar(ch)}
                              className="w-8 h-8 rounded-lg border border-[#E6DECE] dark:border-[#3A352F] bg-[#FAF8F4] dark:bg-[#26211A] text-[13px] font-bold text-[#1C1917] dark:text-[#F5F2EB] hover:border-[#B91C1C] cursor-pointer"
                            >
                              {ch}
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowTypingHint((prev) => !prev)}
                          className="text-[12px] font-semibold text-[#854D0E] dark:text-[#FCD34D] inline-flex items-center gap-1 cursor-pointer hover:underline"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>
                            {showTypingHint
                              ? `Petunjuk: ${currentQuizWord.article ? `${currentQuizWord.article} ` : ''}${currentQuizWord.word.slice(0, 2)}... (${currentQuizWord.word.length} huruf)`
                              : 'Buka Petunjuk'}
                          </span>
                        </button>
                      </div>
                    )}

                    {/* Feedback Banner */}
                    {quizAnswered && (
                      <div
                        className={`p-3.5 rounded-xl border flex flex-wrap items-center justify-between gap-3 ${
                          lastAnswerCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
                            : 'bg-red-50 border-red-300 text-red-900 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-[13.5px]">
                          {lastAnswerCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                          )}
                          <div>
                            <p className="font-bold">
                              {lastAnswerCorrect ? 'Benar!' : 'Belum tepat.'}
                            </p>
                            <p className="text-[12.5px]">
                              Jawaban tepat:{' '}
                              <strong>
                                {currentQuizWord.article ? `${currentQuizWord.article} ` : ''}
                                {currentQuizWord.word}
                              </strong>
                            </p>
                          </div>
                        </div>

                        {currentQuizWord.audioPath && (
                          <button
                            type="button"
                            onClick={() => playAudio(currentQuizWord.audioPath)}
                            className="p-2 rounded-lg bg-white/80 dark:bg-[#1E1B17] text-[#B91C1C] cursor-pointer"
                            title="Dengarkan pelafalan"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* PHASE 3: ROUND SUMMARY */}
          {/* ================================================================= */}
          {phase === 'summary' && (
            <div className="p-6 rounded-2xl bg-linear-to-r from-[#FAF2DF] via-[#F6EBD0] to-[#EFE2C2] dark:from-[#262016] dark:via-[#2F271B] dark:to-[#382E1E] border border-[#E8D9B8] dark:border-[#4A3D28] text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                <PartyPopper className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#1C1917] dark:text-[#F5F2EB]">
                  Sesi Hafalan Selesai! Skor: {quizScore} / {roundWords.length}
                </h3>
                <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8] max-w-md mx-auto">
                  Progres hafalan dari {roundWords.length} kata ini otomatis tersimpan ke jadwal <em>Spaced Repetition</em> lokal Anda.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => startNewRound(batchSize, true)}
                  className="px-4 py-2.5 rounded-xl border border-[#DFCBB5] dark:border-[#423A30] bg-white dark:bg-[#1E1B17] text-[#57524C] dark:text-[#C8C1B8] text-[13px] font-semibold hover:border-[#B91C1C] cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Kata Ini</span>
                </button>

                <button
                  type="button"
                  onClick={() => startNewRound(batchSize, false)}
                  className="px-5 py-2.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-[13.5px] font-bold cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                >
                  <span>Lanjut {batchSize} Kata Baru</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
