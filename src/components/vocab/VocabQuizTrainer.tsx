import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  Layers,
  ListChecks,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  XCircle,
} from 'lucide-react';
import { CEFRLevel } from '../../types/exercise';
import { FlashcardRating } from '../../types/phase4';
import { VocabularyEntry } from '../../types/vocabulary';
import { TouchButton } from '../ui/TouchFlowPrimitives';

export type VocabQuizMode = 'multiple-choice' | 'matching' | 'sentence-completion';

interface VocabQuizTrainerProps {
  words: VocabularyEntry[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onRateCard: (vocabId: string, rating: FlashcardRating) => void;
  soundEnabled: boolean;
  defaultLevel?: CEFRLevel | 'Alle';
  defaultTopic?: string;
  onClose?: () => void;
}

interface Question {
  vocab: VocabularyEntry;
  type: VocabQuizMode;
  prompt: string;
  secondaryPrompt?: string;
  options?: string[];
  correctAnswer: string;
}

export function VocabQuizTrainer({
  words,
  bookmarkedIds,
  onToggleBookmark,
  onRateCard,
  soundEnabled,
  defaultLevel = 'Alle',
  defaultTopic = 'Alle',
  onClose,
}: VocabQuizTrainerProps) {
  // Setup state
  const [sessionMode, setSessionMode] = useState<VocabQuizMode>('multiple-choice');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'Alle'>(defaultLevel);
  const [selectedTopic, setSelectedTopic] = useState<string>(defaultTopic);
  const [sessionSize, setSessionSize] = useState<number>(10);
  const [isStarted, setIsStarted] = useState(false);

  // Active quiz state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakeEntries, setMistakeEntries] = useState<VocabularyEntry[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Matching mode state
  const [matchingPairs, setMatchingPairs] = useState<{ de: string; id: string; matched: boolean; deWord: string }[]>([]);
  const [selectedDe, setSelectedDe] = useState<string | null>(null);
  const [selectedIdOption, setSelectedIdOption] = useState<string | null>(null);
  const [matchedCount, setMatchedCount] = useState(0);

  // Filter pool
  const eligibleWords = useMemo(() => {
    return words.filter((w) => {
      const matchLvl = selectedLevel === 'Alle' || w.level === selectedLevel;
      const matchTop = selectedTopic === 'Alle' || w.topic === selectedTopic;
      return matchLvl && matchTop;
    });
  }, [words, selectedLevel, selectedTopic]);

  const availableTopics = useMemo(() => {
    const s = new Set<string>();
    for (const w of words) {
      if (selectedLevel === 'Alle' || w.level === selectedLevel) {
        s.add(w.topic);
      }
    }
    return [...s].sort((a, b) => a.localeCompare(b, 'de'));
  }, [words, selectedLevel]);

  // Active questions queue
  const [quizQueue, setQuizQueue] = useState<VocabularyEntry[]>([]);

  const startQuiz = (customList?: VocabularyEntry[]) => {
    const pool = customList ?? [...eligibleWords];
    if (pool.length === 0) return;

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const targetSize = customList ? customList.length : Math.min(sessionSize, shuffled.length);
    const selected = shuffled.slice(0, targetSize);

    setQuizQueue(selected);
    setCurrentIndex(0);
    setScore(0);
    setMistakeEntries([]);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsFinished(false);
    setIsStarted(true);

    if (sessionMode === 'matching') {
      setupMatchingRound(selected.slice(0, 5));
    }
  };

  const setupMatchingRound = (batch: VocabularyEntry[]) => {
    const pairs = batch.map((item) => {
      const displayWord = item.article ? `${item.article} ${item.word}` : item.word;
      return {
        de: displayWord,
        id: item.meaningId,
        matched: false,
        deWord: item.word,
      };
    });
    setMatchingPairs(pairs);
    setSelectedDe(null);
    setSelectedIdOption(null);
    setMatchedCount(0);
  };

  const currentVocab = quizQueue[currentIndex];

  // Generate question options for multiple choice or sentence completion
  const currentOptions = useMemo(() => {
    if (!currentVocab) return [];
    if (sessionMode === 'multiple-choice') {
      const correct = currentVocab.meaningId;
      const distractors = words
        .filter((w) => w.id !== currentVocab.id && w.meaningId !== correct)
        .map((w) => w.meaningId);
      const shuffledDistractors = [...new Set(distractors)].sort(() => 0.5 - Math.random()).slice(0, 3);
      return [correct, ...shuffledDistractors].sort(() => 0.5 - Math.random());
    }
    if (sessionMode === 'sentence-completion') {
      const correct = currentVocab.word;
      const distractors = words
        .filter((w) => w.id !== currentVocab.id && w.partOfSpeech === currentVocab.partOfSpeech && w.word !== correct)
        .map((w) => w.word);
      const shuffledDistractors = [...new Set(distractors)].sort(() => 0.5 - Math.random()).slice(0, 3);
      return [correct, ...shuffledDistractors].sort(() => 0.5 - Math.random());
    }
    return [];
  }, [currentVocab, sessionMode, words]);

  const handleSelectOption = (option: string) => {
    if (isAnswered || !currentVocab) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect =
      sessionMode === 'multiple-choice'
        ? option === currentVocab.meaningId
        : option === currentVocab.word;

    if (isCorrect) {
      setScore((s) => s + 1);
      onRateCard(currentVocab.id, 'gewusst');
    } else {
      setMistakeEntries((prev) => [...prev, currentVocab]);
      onRateCard(currentVocab.id, 'wiederholen');
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < quizQueue.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handlePlayAudio = (audioPath?: string) => {
    if (!soundEnabled || !audioPath) return;
    try {
      const audio = new Audio(audioPath);
      audio.play().catch(() => {});
    } catch {
      // Graceful ignore
    }
  };

  // Matching click logic
  const handleMatchDeClick = (de: string) => {
    setSelectedDe(de);
    if (selectedIdOption) {
      checkMatch(de, selectedIdOption);
    }
  };

  const handleMatchIdClick = (idText: string) => {
    setSelectedIdOption(idText);
    if (selectedDe) {
      checkMatch(selectedDe, idText);
    }
  };

  const checkMatch = (de: string, idText: string) => {
    const pair = matchingPairs.find((p) => p.de === de && p.id === idText);
    if (pair) {
      // Correct match!
      setMatchingPairs((prev) =>
        prev.map((p) => (p.de === de ? { ...p, matched: true } : p)),
      );
      setScore((s) => s + 1);
      setMatchedCount((c) => {
        const next = c + 1;
        if (next >= matchingPairs.length) {
          // Finished matching set
          setTimeout(() => {
            setIsFinished(true);
          }, 600);
        }
        return next;
      });
      setSelectedDe(null);
      setSelectedIdOption(null);
    } else {
      // Mismatch
      setTimeout(() => {
        setSelectedDe(null);
        setSelectedIdOption(null);
      }, 500);
    }
  };

  // Start Screen
  if (!isStarted) {
    return (
      <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 sm:p-8 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-sm space-y-6 max-w-2xl mx-auto">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B91C1C]/10 text-[#B91C1C] dark:text-[#EF4444] text-[12px] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Interaktiver Vokabel-Trainer
          </div>
          <h2 className="font-display text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Wortschatz intensiv trainieren
          </h2>
          <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8] leading-relaxed">
            Wähle einen Übungsmodus und teste dein deutsches Vokabelwissen mit Multiple-Choice, Zuordnungen oder Beispielsatz-Vervollständigung.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
            Übungsmodus
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              {
                id: 'multiple-choice' as VocabQuizMode,
                title: 'Multiple-Choice',
                desc: 'Bedeutung aus 4 Optionen wählen',
              },
              {
                id: 'matching' as VocabQuizMode,
                title: 'Zuordnung',
                desc: 'Deutsch & Indonesisch paaren',
              },
              {
                id: 'sentence-completion' as VocabQuizMode,
                title: 'Lückentext',
                desc: 'Fehlendes Wort im Satz ergänzen',
              },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSessionMode(m.id)}
                className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                  sessionMode === m.id
                    ? 'border-[#B91C1C] bg-[#FDF2F2] dark:border-[#EF4444] dark:bg-[#2C1A19]'
                    : 'border-[#E6E0D4] dark:border-[#3A352F] hover:bg-[#FAF8F4] dark:hover:bg-[#262320]'
                }`}
              >
                <p className="text-[13px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                  {m.title}
                </p>
                <p className="text-[11px] text-[#6B6560] dark:text-[#A8A095] mt-0.5">
                  {m.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Level and Topic Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="quiz-level-filter" className="text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
              Niveau
            </label>
            <select
              id="quiz-level-filter"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as CEFRLevel | 'Alle')}
              className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#E6E0D4] bg-white text-[14px] text-[#1C1917] dark:border-[#3A352F] dark:bg-[#1F1D1A] dark:text-[#F5F2EB]"
            >
              <option value="Alle">Alle Niveaus (A1–B2)</option>
              <option value="A1">A1 (Grundstufe 1)</option>
              <option value="A2">A2 (Grundstufe 2)</option>
              <option value="B1">B1 (Mittelstufe 1)</option>
              <option value="B2">B2 (Mittelstufe 2)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="quiz-topic-filter" className="text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
              Themenfeld
            </label>
            <select
              id="quiz-topic-filter"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#E6E0D4] bg-white text-[14px] text-[#1C1917] dark:border-[#3A352F] dark:bg-[#1F1D1A] dark:text-[#F5F2EB]"
            >
              <option value="Alle">Alle 18 Themenfelder</option>
              {availableTopics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Word Count */}
        {sessionMode !== 'matching' && (
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
              Anzahl der Vokabeln pro Einheit
            </label>
            <div className="flex flex-wrap gap-2">
              {[10, 20, 30, 50].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setSessionSize(count)}
                  className={`min-h-[40px] px-4 rounded-xl text-[13px] font-bold border transition-colors cursor-pointer ${
                    sessionSize === count
                      ? 'bg-[#B91C1C] text-white border-[#B91C1C] dark:bg-[#DC2626] dark:border-[#DC2626]'
                      : 'border-[#E6E0D4] dark:border-[#3A352F] text-[#57524C] dark:text-[#C8C1B8] hover:bg-[#FAF8F4] dark:hover:bg-[#262320]'
                  }`}
                >
                  {count} Wörter
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 flex items-center justify-between border-t border-[#EFEAE0] dark:border-[#2E2A25]">
          <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095]">
            Verfügbarer Pool: <strong>{eligibleWords.length}</strong> Wörter
          </p>
          <TouchButton
            variant="primary"
            size="md"
            onClick={() => startQuiz()}
            disabled={eligibleWords.length === 0}
          >
            <Play className="w-4 h-4 fill-current" />
            Training starten
          </TouchButton>
        </div>
      </div>
    );
  }

  // Finished Screen
  if (isFinished) {
    const totalQ = sessionMode === 'matching' ? matchingPairs.length : quizQueue.length;
    const pct = totalQ > 0 ? Math.round((score / totalQ) * 100) : 0;

    return (
      <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 sm:p-8 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-sm space-y-6 max-w-2xl mx-auto">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-[#ECFDF5] dark:bg-emerald-950/50 text-[#15803D] dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Training abgeschlossen!
          </h2>
          <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
            Du hast {score} von {totalQ} Aufgaben richtig beantwortet ({pct} %).
          </p>
        </div>

        {/* Mistake Review Section */}
        {mistakeEntries.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-[#B91C1C] dark:text-[#EF4444] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Fehleranalyse ({mistakeEntries.length} Wörter zur Wiederholung)
              </h3>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {mistakeEntries.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-[#FCA5A5]/40 bg-[#FEF2F2] dark:bg-[#2C1A19] dark:border-red-900/40 text-[13px] space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      {item.article ? `${item.article} ` : ''}
                      {item.word}
                    </span>
                    <span className="text-[11px] font-semibold text-[#B91C1C] dark:text-[#EF4444]">
                      {item.level} · {item.partOfSpeech}
                    </span>
                  </div>
                  <p className="text-[#B91C1C] dark:text-[#F87171] font-medium">
                    Bedeutung: {item.meaningId}
                  </p>
                  <p className="text-[12px] text-[#57524C] dark:text-[#D1CBC2] italic">
                    „{item.exampleDe}“
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
          <TouchButton
            variant="secondary"
            size="md"
            onClick={() => setIsStarted(false)}
          >
            Zurück zur Modusauswahl
          </TouchButton>

          <div className="flex items-center gap-2">
            {mistakeEntries.length > 0 && (
              <TouchButton
                variant="primary"
                size="md"
                onClick={() => startQuiz(mistakeEntries)}
              >
                <RotateCcw className="w-4 h-4" />
                Fehler wiederholen ({mistakeEntries.length})
              </TouchButton>
            )}
            <TouchButton
              variant={mistakeEntries.length === 0 ? 'primary' : 'secondary'}
              size="md"
              onClick={() => startQuiz()}
            >
              Neue Runde starten
            </TouchButton>
          </div>
        </div>
      </div>
    );
  }

  // Matching Mode Round
  if (sessionMode === 'matching') {
    const unMatchedDe = matchingPairs.filter((p) => !p.matched);
    const unMatchedId = matchingPairs.filter((p) => !p.matched);

    return (
      <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 sm:p-8 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-sm space-y-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[12px] font-semibold text-[#B91C1C] dark:text-[#EF4444] uppercase tracking-wider">
              Zuordnungsspiel
            </p>
            <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Ordne die deutschen Begriffe den indonesischen Bedeutungen zu
            </h2>
          </div>
          <span className="text-[13px] font-bold text-[#57524C] dark:text-[#C8C1B8] tabular-nums">
            {matchedCount} / {matchingPairs.length}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* German column */}
          <div className="space-y-2">
            <p className="text-[12px] font-bold text-[#6B6560] dark:text-[#A8A095]">Deutsch</p>
            {matchingPairs.map((p) => {
              if (p.matched) {
                return (
                  <div
                    key={`de-${p.de}`}
                    className="p-3 rounded-xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-800 text-[13px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-between"
                  >
                    <span>{p.de}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                );
              }
              const isSelected = selectedDe === p.de;
              return (
                <button
                  key={`de-${p.de}`}
                  type="button"
                  onClick={() => handleMatchDeClick(p.de)}
                  className={`w-full p-3 rounded-xl border text-left text-[13px] font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#B91C1C] bg-[#FDF2F2] text-[#B91C1C] dark:border-[#EF4444] dark:bg-[#2C1A19] dark:text-[#EF4444] shadow-xs'
                      : 'border-[#E6E0D4] dark:border-[#3A352F] text-[#1C1917] dark:text-[#F5F2EB] hover:bg-[#FAF8F4] dark:hover:bg-[#262320]'
                  }`}
                >
                  {p.de}
                </button>
              );
            })}
          </div>

          {/* Indonesian column */}
          <div className="space-y-2">
            <p className="text-[12px] font-bold text-[#6B6560] dark:text-[#A8A095]">Indonesisch</p>
            {matchingPairs.map((p) => {
              if (p.matched) {
                return (
                  <div
                    key={`id-${p.id}`}
                    className="p-3 rounded-xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-800 text-[13px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-between"
                  >
                    <span>{p.id}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                );
              }
              const isSelected = selectedIdOption === p.id;
              return (
                <button
                  key={`id-${p.id}`}
                  type="button"
                  onClick={() => handleMatchIdClick(p.id)}
                  className={`w-full p-3 rounded-xl border text-left text-[13px] font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#B91C1C] bg-[#FDF2F2] text-[#B91C1C] dark:border-[#EF4444] dark:bg-[#2C1A19] dark:text-[#EF4444] shadow-xs'
                      : 'border-[#E6E0D4] dark:border-[#3A352F] text-[#1C1917] dark:text-[#F5F2EB] hover:bg-[#FAF8F4] dark:hover:bg-[#262320]'
                  }`}
                >
                  {p.id}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <TouchButton variant="secondary" size="sm" onClick={() => setIsStarted(false)}>
            Abbrechen
          </TouchButton>
        </div>
      </div>
    );
  }

  // Multiple Choice / Sentence Completion View
  const displayTarget = currentVocab.article
    ? `${currentVocab.article} ${currentVocab.word}`
    : currentVocab.word;
  const isBookmarked = bookmarkedIds.includes(currentVocab.id);

  // Blanked sentence for sentence completion
  const sentencePrompt = currentVocab.exampleDe.replace(
    new RegExp(currentVocab.word, 'gi'),
    '_______',
  );

  return (
    <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 sm:p-8 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-sm space-y-6 max-w-2xl mx-auto">
      {/* Quiz Header & Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[13px] text-[#6B6560] dark:text-[#A8A095]">
          <span className="font-semibold text-[#B91C1C] dark:text-[#EF4444]">
            Frage {currentIndex + 1} von {quizQueue.length}
          </span>
          <div className="flex items-center gap-2">
            <span className="tabular-nums font-semibold">Richtig: {score}</span>
            <button
              type="button"
              onClick={() => onToggleBookmark(currentVocab.id)}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-[#B91C1C] dark:text-[#EF4444]'
                  : 'text-[#8A837A] hover:text-[#1C1917] dark:hover:text-[#F5F2EB]'
              }`}
              title={isBookmarked ? 'Lesezeichen entfernen' : 'Lesezeichen setzen'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
        <div className="w-full h-1.5 bg-[#EAE4D9] dark:bg-[#332F2B] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#B91C1C] dark:bg-[#DC2626] transition-all duration-300"
            style={{ width: `${Math.round(((currentIndex + 1) / quizQueue.length) * 100)}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="p-5 rounded-2xl bg-[#FAF8F4] dark:bg-[#262320] border border-[#EFEAE0] dark:border-[#2E2A25] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#6B6560] dark:text-[#A8A095]">
            {currentVocab.level} · {currentVocab.topic} · {currentVocab.partOfSpeech}
          </span>
          {currentVocab.audioPath && soundEnabled && (
            <button
              type="button"
              onClick={() => handlePlayAudio(currentVocab.audioPath)}
              className="p-1.5 rounded-lg text-[#6B6560] hover:text-[#B91C1C] dark:hover:text-[#EF4444] cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {sessionMode === 'multiple-choice' ? (
          <div>
            <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095] mb-1">
              Was bedeutet dieser deutsche Begriff auf Indonesisch?
            </p>
            <h3 className="font-display text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              {displayTarget}
            </h3>
            {currentVocab.plural && (
              <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095] mt-1">
                Plural: {currentVocab.plural}
              </p>
            )}
          </div>
        ) : (
          <div>
            <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095] mb-1">
              Welches Wort fehlt im Beispielsatz?
            </p>
            <p className="font-editorial text-lg text-[#1C1917] dark:text-[#F5F2EB] leading-relaxed">
              „{sentencePrompt}“
            </p>
            <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8] mt-1 italic">
              {currentVocab.exampleId}
            </p>
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-2.5">
        {currentOptions.map((opt) => {
          const isSelected = selectedOption === opt;
          const isCorrect =
            sessionMode === 'multiple-choice'
              ? opt === currentVocab.meaningId
              : opt === currentVocab.word;

          let btnClass =
            'border-[#E6E0D4] dark:border-[#3A352F] hover:bg-[#FAF8F4] dark:hover:bg-[#262320] text-[#1C1917] dark:text-[#F5F2EB]';

          if (isAnswered) {
            if (isCorrect) {
              btnClass =
                'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700 font-bold';
            } else if (isSelected) {
              btnClass =
                'border-red-500 bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300 dark:border-red-700';
            }
          }

          return (
            <button
              key={opt}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectOption(opt)}
              className={`w-full min-h-[48px] p-3.5 rounded-xl border text-left text-[14px] transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
            >
              <span>{opt}</span>
              {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Explanation & Next */}
      {isAnswered && (
        <div className="pt-2 space-y-4 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
          <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] p-4 border border-[#E6E0D4] dark:border-[#3A352F] space-y-1.5 text-[13px]">
            <p className="font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              {displayTarget} = {currentVocab.meaningId}
            </p>
            <p className="text-[#57524C] dark:text-[#C8C1B8]">
              „{currentVocab.exampleDe}“
            </p>
            <p className="text-[#6B6560] dark:text-[#A8A095]">
              {currentVocab.exampleId}
            </p>
            {currentVocab.praesens && (
              <p className="text-[12px] text-[#B91C1C] dark:text-[#EF4444] pt-1">
                Konjugation: {currentVocab.praesens} · {currentVocab.praeteritum} · {currentVocab.perfekt}
              </p>
            )}
            {currentVocab.comparative && (
              <p className="text-[12px] text-[#B91C1C] dark:text-[#EF4444] pt-1">
                Steigerung: {currentVocab.comparative} · {currentVocab.superlative}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <TouchButton variant="primary" size="md" onClick={handleNextQuestion}>
              Nächste Frage
              <ArrowRight className="w-4 h-4" />
            </TouchButton>
          </div>
        </div>
      )}
    </div>
  );
}
