import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Layers,
  RotateCcw,
  Sparkles,
  Volume2,
  XCircle,
} from 'lucide-react';
import { SATZBAU_ITEMS, SatzbauItem } from '../../data/satzbauData';
import { CEFRLevel } from '../../types/learning';

const SATZBAU_STORAGE_KEY = 'deutschmeister_satzbau_v1';

interface SatzbauChip {
  idx: number;
  text: string;
}

interface SatzbauTrainerProps {
  levelFilter: CEFRLevel | 'Alle';
  soundEnabled?: boolean;
}

function loadCompletedSatzbauIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SATZBAU_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCompletedSatzbauIds(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SATZBAU_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage quota errors
  }
}

function shuffleChips(tokens: string[]): SatzbauChip[] {
  const chips: SatzbauChip[] = tokens.map((text, idx) => ({ idx, text }));
  for (let i = chips.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [chips[i], chips[j]] = [chips[j], chips[i]];
  }
  if (chips.length >= 2 && chips.every((c, i) => c.idx === i)) {
    [chips[0], chips[chips.length - 1]] = [chips[chips.length - 1], chips[0]];
  }
  return chips;
}

export function SatzbauTrainer({ levelFilter, soundEnabled = true }: SatzbauTrainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLevel, setActiveLevel] = useState<CEFRLevel | 'Alle'>(levelFilter);
  const [selectedTopic, setSelectedTopic] = useState<string>('Alle');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>(() => loadCompletedSatzbauIds());

  const [bankChips, setBankChips] = useState<SatzbauChip[]>([]);
  const [placedChips, setPlacedChips] = useState<SatzbauChip[]>([]);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Sync with parent level filter when changed
  useEffect(() => {
    setActiveLevel(levelFilter);
    setSelectedTopic('Alle');
    setCurrentIdx(0);
  }, [levelFilter]);

  const levelItems: SatzbauItem[] = useMemo(() => {
    if (activeLevel === 'Alle') return SATZBAU_ITEMS;
    return SATZBAU_ITEMS.filter((item) => item.level === activeLevel);
  }, [activeLevel]);

  const availableTopics = useMemo(() => {
    const set = new Set<string>();
    for (const item of levelItems) {
      set.add(item.topic);
    }
    return [...set];
  }, [levelItems]);

  const effectiveTopic =
    selectedTopic !== 'Alle' && !availableTopics.includes(selectedTopic)
      ? 'Alle'
      : selectedTopic;

  const filteredItems: SatzbauItem[] = useMemo(() => {
    if (effectiveTopic === 'Alle') return levelItems;
    return levelItems.filter((item) => item.topic === effectiveTopic);
  }, [levelItems, effectiveTopic]);

  const safeIdx = filteredItems.length > 0 ? currentIdx % filteredItems.length : 0;
  const currentItem = filteredItems[safeIdx];

  // Reset chip bank whenever currentItem changes or card opens
  useEffect(() => {
    if (currentItem) {
      setBankChips(shuffleChips(currentItem.tokens));
      setPlacedChips([]);
      setChecked(false);
      setIsCorrect(false);
    }
  }, [currentItem, isOpen]);

  const placedIndexSet = useMemo(() => {
    return new Set(placedChips.map((c) => c.idx));
  }, [placedChips]);

  const playSentenceAudio = (audioPath?: string) => {
    if (!soundEnabled || !audioPath) return;
    try {
      const audio = new Audio(audioPath);
      audio.play().catch(() => {});
    } catch {
      // Ignore playback error
    }
  };

  const handlePlaceChip = (chip: SatzbauChip) => {
    if (checked || placedIndexSet.has(chip.idx)) return;
    setPlacedChips((prev) => [...prev, chip]);
  };

  const handleRemoveChip = (chipIdx: number) => {
    if (checked) return;
    setPlacedChips((prev) => prev.filter((c) => c.idx !== chipIdx));
  };

  const handleResetSentence = () => {
    setPlacedChips([]);
    setChecked(false);
    setIsCorrect(false);
  };

  const handleHintNextWord = () => {
    if (checked || !currentItem) return;
    const nextPos = placedChips.length;
    if (nextPos >= currentItem.tokens.length) return;

    const expectedToken = currentItem.tokens[nextPos];
    const availableChip = bankChips.find(
      (c) => !placedIndexSet.has(c.idx) && c.text === expectedToken,
    );
    if (availableChip) {
      setPlacedChips((prev) => [...prev, availableChip]);
    }
  };

  const handleCheckAnswer = () => {
    if (!currentItem || placedChips.length === 0) return;
    const userSentence = placedChips.map((c) => c.text).join(' ');
    const targetSentence = currentItem.tokens.join(' ');
    const ok = userSentence === targetSentence;

    setChecked(true);
    setIsCorrect(ok);

    if (ok) {
      playSentenceAudio(currentItem.audioPath);
      if (!completedIds.includes(currentItem.id)) {
        const nextCompleted = [...completedIds, currentItem.id];
        setCompletedIds(nextCompleted);
        saveCompletedSatzbauIds(nextCompleted);
      }
    }
  };

  const handleNextSentence = () => {
    setCurrentIdx((prev) => (prev + 1) % filteredItems.length);
  };

  const levelCompletedCount = useMemo(() => {
    const ids = new Set(completedIds);
    return filteredItems.filter((item) => ids.has(item.id)).length;
  }, [filteredItems, completedIds]);

  return (
    <section
      aria-label="Satzbau-Trainer: Menyusun Kalimat A1–B2"
      className="rounded-2xl bg-linear-to-br from-[#FFFBF5] via-[#FAF4EA] to-[#F3EAD9] dark:from-[#221E19] dark:via-[#1D1A16] dark:to-[#171512] border border-[#E8DCB8] dark:border-[#3D3528] shadow-xs overflow-hidden"
    >
      {/* Collapsible Header */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#B91C1C] text-white">
              Satzbau-Trainer ({SATZBAU_ITEMS.length} Kalimat)
            </span>
            <span className="text-[12px] font-semibold text-[#854D0E] dark:text-[#FCD34D] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {activeLevel === 'Alle' ? 'Semua Level (A1–B2)' : `Level ${activeLevel}`} •{' '}
                {levelCompletedCount}/{filteredItems.length} selesai
              </span>
            </span>
          </div>
          <h2 className="font-display text-[17px] sm:text-[19px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Latihan Menyusun Kalimat Bahasa Jerman (A1–B2)
          </h2>
          <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8]">
            Susun balok kata per topik tata bahasa untuk melatih posisi kata kerja, lengkap dengan audio pelafalan dan penjelasan aturan.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="min-h-[42px] px-4 py-2 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-[13px] font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 self-start sm:self-center shadow-xs"
        >
          <Layers className="w-4 h-4" />
          <span>{isOpen ? 'Sembunyikan' : 'Mulai Susun Kalimat'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Exercise Area */}
      {isOpen && currentItem && (
        <div className="px-4 sm:px-6 pb-6 pt-3 border-t border-[#EADCC3] dark:border-[#383023] space-y-4">
          {/* Level Selector, Topic Filter & Counter */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex flex-wrap items-center gap-1">
                {(['Alle', 'A1', 'A2', 'B1', 'B2'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      setActiveLevel(lvl);
                      setSelectedTopic('Alle');
                      setCurrentIdx(0);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-colors cursor-pointer ${
                      activeLevel === lvl
                        ? 'bg-[#B91C1C] text-white'
                        : 'bg-white dark:bg-[#26211A] text-[#57524C] dark:text-[#C8C1B8] border border-[#E6DECE] dark:border-[#3A352F]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <label htmlFor="satzbau-topic-filter" className="sr-only">
                Filter topik tata bahasa
              </label>
              <select
                id="satzbau-topic-filter"
                value={effectiveTopic}
                onChange={(e) => {
                  setSelectedTopic(e.target.value);
                  setCurrentIdx(0);
                }}
                className="min-h-[34px] px-3 py-1 rounded-lg border border-[#E6DECE] dark:border-[#3A352F] bg-white dark:bg-[#26211A] text-[12.5px] font-semibold text-[#1C1917] dark:text-[#F5F2EB] focus:border-[#B91C1C] focus:outline-none"
              >
                <option value="Alle">Semua Topik ({levelItems.length})</option>
                {availableTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <span className="text-[12.5px] font-bold text-[#786E64] dark:text-[#C8C1B8]">
              Kalimat {safeIdx + 1} dari {filteredItems.length}
            </span>
          </div>

          {/* Prompt Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1E1B17] border border-[#E6DECE] dark:border-[#332D23] shadow-xs space-y-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FAF8F4] dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] text-[#B91C1C] dark:text-[#FCA5A5]">
                  {currentItem.level}
                </span>
                <span className="text-[12px] font-semibold text-[#786E64] dark:text-[#C8C1B8]">
                  Topik: {currentItem.topic}
                </span>
                {completedIds.includes(currentItem.id) && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Selesai
                  </span>
                )}
              </div>
              <p className="text-[15.5px] sm:text-[17px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                🇮🇩 “{currentItem.meaningId}”
              </p>
            </div>

            {/* Answer Construction Area */}
            <div
              aria-label="Area susunan kalimat"
              className={`min-h-[68px] p-3.5 rounded-xl border-2 border-dashed flex flex-wrap items-center gap-2 transition-colors ${
                checked
                  ? isCorrect
                    ? 'border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30 dark:border-emerald-700'
                    : 'border-red-400 bg-red-50/70 dark:bg-red-950/30 dark:border-red-700'
                  : 'border-[#DFCBB5] bg-[#FAF8F4] dark:border-[#423A30] dark:bg-[#26211A]'
              }`}
            >
              {placedChips.length === 0 ? (
                <span className="text-[13px] text-[#786E64] dark:text-[#9E968C]">
                  Klik balok kata di bawah untuk menyusun kalimat Jerman...
                </span>
              ) : (
                placedChips.map((chip) => (
                  <button
                    key={chip.idx}
                    type="button"
                    disabled={checked}
                    onClick={() => handleRemoveChip(chip.idx)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1E1B17] border border-[#D4C7B4] dark:border-[#4A4238] text-[14px] font-bold text-[#1C1917] dark:text-[#F5F2EB] shadow-2xs hover:border-[#B91C1C] transition-all cursor-pointer disabled:cursor-default"
                  >
                    {chip.text}
                  </button>
                ))
              )}
            </div>

            {/* Scrambled Word Bank */}
            <div className="space-y-1.5">
              <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#786E64] dark:text-[#9E968C]">
                Pilihan Kata
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {bankChips.map((chip) => {
                  const isUsed = placedIndexSet.has(chip.idx);
                  return (
                    <button
                      key={chip.idx}
                      type="button"
                      disabled={isUsed || checked}
                      onClick={() => handlePlaceChip(chip)}
                      className={`px-3.5 py-2 rounded-xl border text-[14px] font-semibold transition-all ${
                        isUsed
                          ? 'border-[#EFEAE0] bg-[#F3EFE6] text-transparent select-none dark:border-[#2E2A25] dark:bg-[#191714] cursor-default'
                          : 'border-[#DFCBB5] bg-[#FAF8F4] text-[#1C1917] hover:border-[#B91C1C] hover:bg-white dark:border-[#3A352F] dark:bg-[#26211A] dark:text-[#F5F2EB] cursor-pointer shadow-2xs'
                      }`}
                    >
                      {chip.text}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback Banner with Audio Replay + Grammar Tip */}
            {checked && (
              <div
                className={`p-4 rounded-xl border space-y-2 ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-100'
                    : 'bg-red-50 border-red-300 text-red-950 dark:bg-red-950/40 dark:border-red-800 dark:text-red-100'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <p className="font-bold text-[14px]">
                        {isCorrect ? 'Tepat sekali!' : 'Susunan belum tepat.'}
                      </p>
                      <p className="text-[13.5px]">
                        Kalimat benar:{' '}
                        <strong className="font-bold">{currentItem.tokens.join(' ')}</strong>
                      </p>
                      <p className="text-[12.5px] opacity-90 pt-0.5">
                        💡 <strong>Catatan Tata Bahasa:</strong> {currentItem.grammarTipId}
                      </p>
                    </div>
                  </div>

                  {currentItem.audioPath && (
                    <button
                      type="button"
                      onClick={() => playSentenceAudio(currentItem.audioPath)}
                      title="Dengarkan pengucapan kalimat"
                      className="px-3 py-2 rounded-xl bg-white/90 dark:bg-[#1E1B17] border border-black/10 dark:border-white/10 text-[#B91C1C] dark:text-[#EF4444] text-[12px] font-bold inline-flex items-center gap-1.5 cursor-pointer shrink-0 hover:bg-white transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Dengarkan</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 border-t border-[#EFEAE0] dark:border-[#2E2A25] flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetSentence}
                  className="px-3.5 py-2 rounded-xl border border-[#E6DECE] dark:border-[#3A352F] bg-white dark:bg-[#26211A] text-[12.5px] font-semibold text-[#57524C] dark:text-[#C8C1B8] hover:border-[#B91C1C] cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{checked && !isCorrect ? 'Coba Lagi' : 'Reset'}</span>
                </button>

                {!checked && placedChips.length < currentItem.tokens.length && (
                  <button
                    type="button"
                    onClick={handleHintNextWord}
                    className="px-3.5 py-2 rounded-xl border border-[#E6DECE] dark:border-[#3A352F] bg-[#FAF5EC] dark:bg-[#26211A] text-[12.5px] font-semibold text-[#854D0E] dark:text-[#FCD34D] hover:border-[#854D0E] cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Petunjuk (+1 Kata)</span>
                  </button>
                )}
              </div>

              {!checked ? (
                <button
                  type="button"
                  disabled={placedChips.length !== currentItem.tokens.length}
                  onClick={handleCheckAnswer}
                  className="px-5 py-2.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] disabled:opacity-40 text-white text-[13.5px] font-bold cursor-pointer transition-colors"
                >
                  Periksa Kalimat
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextSentence}
                  className="px-5 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#332E2A] dark:bg-[#F5F2EB] dark:text-[#1C1917] text-white text-[13.5px] font-bold cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Kalimat Berikutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
