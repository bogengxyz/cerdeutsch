import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock,
  Info,
  RotateCw,
  Shuffle,
  Volume2,
} from 'lucide-react';
import {
  getDifficultFlashcards,
  getDueFlashcards,
} from '../../services/spacedRepetitionService';
import { FlashcardRating, FlashcardReviewRecord } from '../../types/phase4';
import { VocabularyEntry } from '../../types/vocabulary';
import { TouchButton } from '../ui/TouchFlowPrimitives';

interface FlashcardTrainerProps {
  words: VocabularyEntry[];
  srsSchedule: Record<string, FlashcardReviewRecord>;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onRateCard: (vocabId: string, rating: FlashcardRating) => void;
  soundEnabled: boolean;
}

type DeckMode = 'all' | 'due' | 'difficult';

const RATING_BUTTONS: {
  rating: FlashcardRating;
  label: string;
  hint: string;
  className: string;
}[] = [
  {
    rating: 'wiederholen',
    label: 'Wiederholen',
    hint: 'ca. 10 Min.',
    className:
      'bg-[#FDF2F2] text-[#991B1B] hover:bg-[#FCE7E7] border-[#E9B8B8] dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/60',
  },
  {
    rating: 'schwierig',
    label: 'Schwierig',
    hint: '1 Tag',
    className:
      'bg-[#FAF2DF] text-[#92400E] hover:bg-[#F4E6C5] border-[#EADBC0] dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/60',
  },
  {
    rating: 'lernen',
    label: 'Lernen',
    hint: '2–3 Tage',
    className:
      'bg-[#F3EFE6] text-[#1C1917] hover:bg-[#EAE3D5] border-[#DCD3C4] dark:bg-[#262320] dark:text-[#F5F2EB] dark:border-[#3A352F]',
  },
  {
    rating: 'gewusst',
    label: 'Gewusst',
    hint: '4–30 Tage',
    className:
      'bg-[#ECFDF5] text-[#166534] hover:bg-[#D1FAE5] border-[#A7F3D0] dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60',
  },
];

export function FlashcardTrainer({
  words,
  srsSchedule,
  bookmarkedIds,
  onToggleBookmark,
  onRateCard,
  soundEnabled,
}: FlashcardTrainerProps) {
  const [deckMode, setDeckMode] = useState<DeckMode>('all');
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const dueCards = useMemo(() => getDueFlashcards(words, srsSchedule), [words, srsSchedule]);
  const difficultCards = useMemo(
    () => getDifficultFlashcards(words, srsSchedule),
    [words, srsSchedule],
  );

  const baseDeck = useMemo(() => {
    if (deckMode === 'due') return dueCards;
    if (deckMode === 'difficult') return difficultCards;
    return words;
  }, [deckMode, dueCards, difficultCards, words]);

  const deck = useMemo(() => {
    if (shuffleSeed === 0) return baseDeck;
    const copy = [...baseDeck];
    let s = shuffleSeed * 9301 + 49297;
    for (let i = copy.length - 1; i > 0; i -= 1) {
      s = (s * 1664525 + 1013904223) >>> 0;
      const j = s % (i + 1);
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }, [baseDeck, shuffleSeed]);

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [deckMode, words.length, shuffleSeed]);

  const safeIndex = deck.length > 0 ? Math.min(currentIndex, deck.length - 1) : 0;
  const currentCard = deck[safeIndex];

  const handleSpeakWord = (audioPath?: string) => {
    if (!soundEnabled || !audioPath) return;
    try {
      const audio = new Audio(audioPath);
      audio.play().catch(() => {});
    } catch {
      // Audio playback error handled gracefully
    }
  };

  const handleRate = (rating: FlashcardRating) => {
    if (!currentCard) return;
    onRateCard(currentCard.id, rating);
    setIsFlipped(false);
    if (deck.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % deck.length);
    }
  };

  const formatNextReviewHint = (rec: FlashcardReviewRecord | undefined) => {
    if (!rec) return 'Noch nicht bewertet';
    const dueMs = Date.parse(rec.nextReviewAtIso);
    if (Number.isNaN(dueMs)) return 'Geplant';
    if (dueMs <= Date.now()) return 'Jetzt fällig';
    const diffHours = Math.round((dueMs - Date.now()) / (1000 * 60 * 60));
    if (diffHours < 24) return `Nächste Wiederholung in ca. ${Math.max(1, diffHours)} Std.`;
    const diffDays = Math.round(diffHours / 24);
    return `Nächste Wiederholung in ca. ${diffDays} ${diffDays === 1 ? 'Tag' : 'Tagen'}`;
  };

  return (
    <div className="space-y-6">
      {/* Deck Mode & Shuffle Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Kartenstapel auswählen"
          className="flex flex-wrap items-center gap-1.5 bg-[#F3EFE6] dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] p-1 rounded-xl"
        >
          {[
            { id: 'all' as DeckMode, label: `Alle (${words.length})` },
            { id: 'due' as DeckMode, label: `Fällig (${dueCards.length})` },
            { id: 'difficult' as DeckMode, label: `Schwierig (${difficultCards.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setDeckMode(tab.id)}
              aria-pressed={deckMode === tab.id}
              className={`min-h-[40px] px-3.5 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                deckMode === tab.id
                  ? 'bg-[#B91C1C] text-white shadow-xs dark:bg-[#DC2626]'
                  : 'text-[#57524C] hover:text-[#1C1917] dark:text-[#C8C1B8] dark:hover:text-[#F5F2EB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <TouchButton
          variant="secondary"
          size="sm"
          onClick={() => setShuffleSeed((s) => s + 1)}
          disabled={deck.length < 2}
        >
          <Shuffle className="w-4 h-4" />
          Karten mischen
        </TouchButton>
      </div>

      {!currentCard ? (
        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-8 text-center space-y-3 border border-[#E6E0D4] dark:border-[#2E2A25]">
          <CheckCircle2 className="w-8 h-8 text-[#15803D] dark:text-emerald-400 mx-auto" />
          <p className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            {deckMode === 'due'
              ? 'Aktuell sind keine Karten zur Wiederholung fällig.'
              : deckMode === 'difficult'
                ? 'Keine als schwierig markierten Karten in dieser Auswahl.'
                : 'Keine passenden Vokabelkarten für diesen Filter.'}
          </p>
          <p className="text-[14px] text-[#57524C] dark:text-[#B5AEA5]">
            Wechsle auf „Alle“ oder passe Niveau und Thema an, um weiterzulernen.
          </p>
          {deckMode !== 'all' && (
            <TouchButton variant="primary" size="sm" onClick={() => setDeckMode('all')}>
              Alle Karten anzeigen
            </TouchButton>
          )}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-5">
          {/* Card Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[13px] text-[#6B6560] dark:text-[#B5AEA5] tabular-nums">
              <span>
                Karte {safeIndex + 1} von {deck.length}
              </span>
              <span>{formatNextReviewHint(srsSchedule[currentCard.id])}</span>
            </div>
            <div className="w-full h-2 bg-[#EAE4D9] dark:bg-[#2E2A25] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#B91C1C] dark:bg-[#DC2626] rounded-full transition-all duration-300"
                style={{ width: `${Math.round(((safeIndex + 1) / deck.length) * 100)}%` }}
              />
            </div>
          </div>

          {/* Flashcard Surface */}
          {(() => {
            const displayWord = currentCard.article
              ? `${currentCard.article} ${currentCard.word}`
              : currentCard.word;
            const isBookmarked = bookmarkedIds.includes(currentCard.id);

            return (
              <article className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 sm:p-8 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_4px_16px_rgba(28,25,23,0.06)] dark:shadow-none space-y-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-[12px] font-semibold uppercase tracking-wide text-[#B91C1C] dark:text-[#F87171]">
                      {currentCard.level} · {currentCard.topic} · {currentCard.partOfSpeech}
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      {displayWord}
                    </h2>
                    {currentCard.plural && (
                      <p className="text-[14px] text-[#6B6560] dark:text-[#B5AEA5]">
                        Plural: {currentCard.plural}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {soundEnabled && currentCard.audioPath && (
                      <button
                        type="button"
                        onClick={() => handleSpeakWord(currentCard.audioPath)}
                        aria-label={`${displayWord} anhören`}
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-[#6B6560] hover:bg-[#F3EFE6] hover:text-[#B91C1C] dark:text-[#B5AEA5] dark:hover:bg-[#262320] cursor-pointer transition-colors"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(currentCard.id)}
                      aria-pressed={isBookmarked}
                      aria-label={
                        isBookmarked
                          ? `${displayWord} aus Sammlung entfernen`
                          : `${displayWord} in Sammlung speichern`
                      }
                      className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-[#FDF2F2] text-[#B91C1C] dark:bg-[#2C1A19] dark:text-[#F87171]'
                          : 'text-[#8A837A] hover:bg-[#F3EFE6] hover:text-[#1C1917] dark:hover:bg-[#262320]'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* German Example (Front) */}
                <div className="rounded-xl bg-[#F7F4EC] dark:bg-[#1A1816] p-4 border border-[#E6E0D4] dark:border-[#2E2A25]">
                  <p className="text-[12px] font-semibold text-[#6B6560] dark:text-[#B5AEA5] mb-1">
                    Beispielsatz auf Deutsch
                  </p>
                  <p className="font-editorial text-[16px] leading-7 text-[#1C1917] dark:text-[#F5F2EB]">
                    „{currentCard.exampleDe}“
                  </p>
                </div>

                {!isFlipped ? (
                  <div className="flex justify-center pt-2">
                    <TouchButton
                      variant="primary"
                      size="md"
                      onClick={() => setIsFlipped(true)}
                      className="w-full sm:w-auto"
                    >
                      <RotateCw className="w-4 h-4" />
                      Karte umdrehen (Bedeutung zeigen)
                    </TouchButton>
                  </div>
                ) : (
                  <div className="space-y-5 pt-3 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
                    {/* Back Side: Indonesian Meaning & Example */}
                    <div className="rounded-xl bg-[#FAF2DF] dark:bg-[#2B2318] border border-[#EADBC0] dark:border-[#4A3D28] p-4 space-y-2">
                      <div>
                        <p className="text-[12px] font-semibold text-[#B45309] dark:text-[#FBBF24]">
                          Bedeutung (Bahasa Indonesia)
                        </p>
                        <p className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                          {currentCard.meaningId}
                        </p>
                      </div>
                      <p className="text-[14px] text-[#57524C] dark:text-[#D6CFC5]">
                        „{currentCard.exampleId}“
                      </p>
                      {currentCard.praesens && (
                        <p className="text-[13px] text-[#854D0E] dark:text-[#FDE047] pt-1">
                          <strong>Konjugation:</strong> {currentCard.praesens} · {currentCard.praeteritum} · {currentCard.perfekt}
                        </p>
                      )}
                      {currentCard.comparative && (
                        <p className="text-[13px] text-[#854D0E] dark:text-[#FDE047] pt-1">
                          <strong>Steigerung:</strong> {currentCard.comparative} · {currentCard.superlative}
                        </p>
                      )}
                      {currentCard.relatedWords && currentCard.relatedWords.length > 0 && (
                        <p className="text-[13px] text-[#57524C] dark:text-[#D6CFC5] pt-1">
                          <strong>Verwandte Wörter:</strong> {currentCard.relatedWords.join(', ')}
                        </p>
                      )}
                    </div>

                    {/* Personal Spaced Repetition Rating Buttons */}
                    <div className="space-y-2.5">
                      <p className="text-[13px] font-semibold text-[#57524C] dark:text-[#D6CFC5] flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#B91C1C] dark:text-[#EF4444]" />
                        Wie sicher kennst du dieses Wort? (Nächste Wiederholung planen)
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {RATING_BUTTONS.map((btn) => (
                          <button
                            key={btn.rating}
                            type="button"
                            onClick={() => handleRate(btn.rating)}
                            className={`min-h-[52px] px-3 py-2 rounded-xl border text-center transition-colors cursor-pointer ${btn.className}`}
                          >
                            <span className="block text-[14px] font-semibold">{btn.label}</span>
                            <span className="block text-[11px] opacity-80">{btn.hint}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Prev / Next Navigation */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
                  <TouchButton
                    variant="secondary"
                    size="sm"
                    disabled={deck.length <= 1}
                    onClick={() => {
                      setIsFlipped(false);
                      setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
                    }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Vorherige
                  </TouchButton>

                  <TouchButton
                    variant="secondary"
                    size="sm"
                    disabled={deck.length <= 1}
                    onClick={() => {
                      setIsFlipped(false);
                      setCurrentIndex((prev) => (prev + 1) % deck.length);
                    }}
                  >
                    Nächste
                    <ArrowRight className="w-4 h-4" />
                  </TouchButton>
                </div>
              </article>
            );
          })()}

          <p className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5] flex items-center justify-center gap-1.5 text-center">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>
              Einfacher persönlicher Wiederholungsplan — lokal im Browser gespeichert (ohne
              wissenschaftliche Erfolgsgarantie).
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
