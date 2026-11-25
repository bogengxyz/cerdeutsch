import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Gamepad2,
  Layers,
  List,
  Search,
  Volume2,
} from 'lucide-react';
import {
  TOTAL_VOCABULARY_COUNT,
  VOCABULARY_COUNTS,
  useVocabulary,
} from '../../data/vocabulary';
import { useQuestionBankExercises } from '../../hooks/useQuestionBankExercises';
import {
  getDueFlashcardCount,
  getLearnedVocabularyCount,
} from '../../services/spacedRepetitionService';
import { Exercise } from '../../types/exercise';
import { CEFRLevel } from '../../types/learning';
import {
  BookmarkCollection,
  FlashcardRating,
  FlashcardReviewRecord,
  MistakeRecord,
} from '../../types/phase4';
import { ExerciseScoreRecord } from '../../types/progress';
import { RandomPracticePanel } from '../practice/RandomPracticePanel';
import { TouchButton } from '../ui/TouchFlowPrimitives';
import { FlashcardTrainer } from '../vocab/FlashcardTrainer';
import { VocabProgressDashboard } from '../vocab/VocabProgressDashboard';
import { VocabQuizTrainer } from '../vocab/VocabQuizTrainer';

interface WortschatzViewProps {
  levelFilter: CEFRLevel | 'Alle';
  onLevelFilterChange: (lvl: CEFRLevel | 'Alle') => void;
  bookmarkedIds: string[];
  completedExerciseIds: string[];
  exerciseScores: Record<string, ExerciseScoreRecord>;
  srsSchedule: Record<string, FlashcardReviewRecord>;
  onRateFlashcard: (vocabId: string, rating: FlashcardRating) => void;
  onToggleBookmark: (id: string) => void;
  onStartExercise: (exercise: Exercise) => void;
  soundEnabled: boolean;
  mistakes?: MistakeRecord[];
  bookmarks?: BookmarkCollection;
  recentQuestionIds?: string[];
}

export function WortschatzView({
  levelFilter,
  onLevelFilterChange,
  bookmarkedIds,
  completedExerciseIds,
  exerciseScores,
  srsSchedule,
  onRateFlashcard,
  onToggleBookmark,
  onStartExercise,
  soundEnabled,
  mistakes = [],
  bookmarks,
  recentQuestionIds = [],
}: WortschatzViewProps) {
  const [viewMode, setViewMode] = useState<'list' | 'flashcards' | 'quiz' | 'dashboard'>('list');
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState<string>('Alle');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [showAllMeanings, setShowAllMeanings] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [visibleExCount, setVisibleExCount] = useState(12);

  useEffect(() => {
    setVisibleExCount(12);
  }, [levelFilter]);

  const { words, loading } = useVocabulary(levelFilter);

  const availableTopics = useMemo(() => {
    const topics = new Set<string>();
    for (const w of words) {
      if (levelFilter === 'Alle' || w.level === levelFilter) {
        topics.add(w.topic);
      }
    }
    return [...topics].sort((a, b) => a.localeCompare(b, 'de'));
  }, [words, levelFilter]);

  const effectiveTopicFilter =
    topicFilter !== 'Alle' && !availableTopics.includes(topicFilter) ? 'Alle' : topicFilter;

  const filtered = useMemo(() => {
    return words.filter((item) => {
      const matchesLevel = levelFilter === 'Alle' || item.level === levelFilter;
      const matchesTopic = effectiveTopicFilter === 'Alle' || item.topic === effectiveTopicFilter;
      const matchesBookmark = !onlyBookmarked || bookmarkedIds.includes(item.id);
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.word.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q) ||
        (item.subtopic && item.subtopic.toLowerCase().includes(q)) ||
        item.exampleDe.toLowerCase().includes(q) ||
        item.exampleId.toLowerCase().includes(q) ||
        item.meaningId.toLowerCase().includes(q);
      return matchesLevel && matchesTopic && matchesBookmark && matchesSearch;
    });
  }, [words, levelFilter, effectiveTopicFilter, onlyBookmarked, bookmarkedIds, search]);

  const { exercises: vocabExercises } = useQuestionBankExercises('wortschatz', levelFilter);
  const visibleVocabExercises = vocabExercises.slice(0, visibleExCount);
  const totalVocabQuestions = vocabExercises.reduce((sum, ex) => sum + ex.questions.length, 0);
  const dueCount = useMemo(() => getDueFlashcardCount(srsSchedule), [srsSchedule]);
  const learnedCount = useMemo(() => getLearnedVocabularyCount(srsSchedule), [srsSchedule]);

  const handleSpeak = (audioPath?: string) => {
    if (!soundEnabled || !audioPath) {
      return;
    }
    try {
      const audio = new Audio(audioPath);
      audio.play().catch(() => {});
    } catch {
      // Ignore playback errors gracefully
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <h1 className="font-display text-2xl sm:text-[30px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Wortschatz
          </h1>
          <p className="text-[15px] leading-relaxed text-[#57524C] dark:text-[#C8C1B8]">
            {levelFilter === 'Alle'
              ? `${TOTAL_VOCABULARY_COUNT} deutsche Wörter von A1 bis B2`
              : `${VOCABULARY_COUNTS[levelFilter]} deutsche Wörter auf Niveau ${levelFilter}`}{' '}
            mit Artikel, Pluralform, Beispielsatz und interaktivem Karteikartentrainer.
          </p>
          <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095] tabular-nums">
            Persönlicher Lernstand: {learnedCount} Wörter geübt · {dueCount} Karten fällig
          </p>
        </div>

        <div
          role="group"
          aria-label="Wortschatz nach Niveau filtern"
          className="flex flex-wrap items-center gap-1.5 bg-[#EFEAE0] dark:bg-[#262320] p-1 rounded-xl self-start shrink-0 border border-[#E6E0D4] dark:border-[#3A352F]"
        >
          {(['Alle', 'A1', 'A2', 'B1', 'B2'] as const).map((lvl) => {
            const active = levelFilter === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => onLevelFilterChange(lvl)}
                aria-pressed={active}
                className={`min-h-[38px] px-3.5 rounded-lg text-[13px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#B91C1C] text-white shadow-xs dark:bg-[#DC2626]'
                    : 'text-[#57524C] hover:text-[#1C1917] dark:text-[#C8C1B8] dark:hover:text-[#F5F2EB]'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      </section>

      {/* Mode Switcher: Vokabelliste vs. Karteikarten vs. Trainer vs. Dashboard */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Ansichtsmodus Wortschatz"
          className="inline-flex flex-wrap items-center gap-1.5 bg-[#EFEAE0] dark:bg-[#262320] p-1 rounded-xl border border-[#E6E0D4] dark:border-[#3A352F]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'list'}
            onClick={() => setViewMode('list')}
            className={`min-h-[40px] px-3.5 rounded-lg text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'list'
                ? 'bg-[#B91C1C] text-white shadow-xs dark:bg-[#DC2626]'
                : 'text-[#57524C] hover:text-[#1C1917] dark:text-[#C8C1B8]'
            }`}
          >
            <List className="w-4 h-4" />
            Vokabelliste
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'flashcards'}
            onClick={() => setViewMode('flashcards')}
            className={`min-h-[40px] px-3.5 rounded-lg text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'flashcards'
                ? 'bg-[#B91C1C] text-white shadow-xs dark:bg-[#DC2626]'
                : 'text-[#57524C] hover:text-[#1C1917] dark:text-[#C8C1B8]'
            }`}
          >
            <Layers className="w-4 h-4" />
            Karteikarten ({dueCount > 0 ? `${dueCount} fällig` : 'Trainer'})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'quiz'}
            onClick={() => setViewMode('quiz')}
            className={`min-h-[40px] px-3.5 rounded-lg text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'quiz'
                ? 'bg-[#B91C1C] text-white shadow-xs dark:bg-[#DC2626]'
                : 'text-[#57524C] hover:text-[#1C1917] dark:text-[#C8C1B8]'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            Vokabel-Trainer
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'dashboard'}
            onClick={() => setViewMode('dashboard')}
            className={`min-h-[40px] px-3.5 rounded-lg text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewMode === 'dashboard'
                ? 'bg-[#B91C1C] text-white shadow-xs dark:bg-[#DC2626]'
                : 'text-[#57524C] hover:text-[#1C1917] dark:text-[#C8C1B8]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Fortschritt & Dashboard
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <label htmlFor="vocab-topic-filter" className="sr-only">
            Nach Thema filtern
          </label>
          <select
            id="vocab-topic-filter"
            value={effectiveTopicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="min-h-[44px] px-3.5 rounded-xl border border-[#E6E0D4] bg-white text-[14px] text-[#1C1917] focus:border-[#B91C1C] focus:outline-none dark:border-[#3A352F] dark:bg-[#1F1D1A] dark:text-[#F5F2EB]"
          >
            <option value="Alle">Alle Themen</option>
            {availableTopics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && words.length === 0 ? (
        <div className="rounded-2xl border border-[#E6E0D4] bg-[#FAF8F4] p-12 text-center dark:border-[#3A352F] dark:bg-[#1F1D1A]">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#B91C1C] border-t-transparent mb-4"></div>
          <h3 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Kosakata {levelFilter === 'Alle' ? 'A1–B2' : levelFilter} sedang dimuat...
          </h3>
          <p className="text-sm text-[#57524C] dark:text-[#C8C1B8] mt-1">
            Memuat modul kosakata secara efisien untuk menghemat memori dan mempercepat waktu muat.
          </p>
        </div>
      ) : viewMode === 'dashboard' ? (
        <VocabProgressDashboard
          words={words}
          srsSchedule={srsSchedule}
          bookmarkedIds={bookmarkedIds}
          onSelectLevel={(lvl) => {
            onLevelFilterChange(lvl);
            setViewMode('list');
          }}
          onSelectTopic={(t) => {
            setTopicFilter(t);
            setViewMode('list');
          }}
        />
      ) : viewMode === 'quiz' ? (
        <VocabQuizTrainer
          words={filtered}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={onToggleBookmark}
          onRateCard={onRateFlashcard}
          soundEnabled={soundEnabled}
          defaultLevel={levelFilter}
          defaultTopic={effectiveTopicFilter}
          onClose={() => setViewMode('list')}
        />
      ) : viewMode === 'flashcards' ? (
        <FlashcardTrainer
          words={filtered}
          srsSchedule={srsSchedule}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={onToggleBookmark}
          onRateCard={onRateFlashcard}
          soundEnabled={soundEnabled}
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#7C756D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <label htmlFor="vocab-search" className="sr-only">
                Wort oder Thema suchen
              </label>
              <input
                id="vocab-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Wort, Thema oder Beispiel suchen..."
                className="w-full min-h-[48px] pl-10 pr-4 rounded-xl border border-[#E6E0D4] bg-white text-[15px] text-[#1C1917] placeholder:text-[#7C756D] focus:border-[#B91C1C] focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/10 dark:border-[#3A352F] dark:bg-[#1F1D1A] dark:text-[#F5F2EB]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <TouchButton
                variant={showAllMeanings ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setShowAllMeanings((prev) => !prev)}
                aria-pressed={showAllMeanings}
              >
                {showAllMeanings ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showAllMeanings ? 'Bedeutungen verdecken' : 'Alle Bedeutungen zeigen'}
              </TouchButton>

              <TouchButton
                variant={onlyBookmarked ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setOnlyBookmarked((prev) => !prev)}
                aria-pressed={onlyBookmarked}
              >
                <Bookmark className="w-4 h-4" />
                Merkliste ({bookmarkedIds.length})
              </TouchButton>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-8 text-center border border-[#E6E0D4] dark:border-[#2E2A25] space-y-3">
              <p className="text-[15px] text-[#57524C] dark:text-[#C8C1B8]">
                Keine passenden Vokabeln in dieser Ansicht.
              </p>
              <TouchButton
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearch('');
                  setTopicFilter('Alle');
                  setOnlyBookmarked(false);
                  onLevelFilterChange('Alle');
                }}
              >
                Alle Vokabeln anzeigen
              </TouchButton>
            </div>
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
              {filtered.map((item) => {
                const isBookmarked = bookmarkedIds.includes(item.id);
                const displayWord = item.article ? `${item.article} ${item.word}` : item.word;
                const isMeaningShown = showAllMeanings || Boolean(revealedIds[item.id]);

                return (
                  <article
                    key={item.id}
                    className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-[18px] border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_1px_3px_rgba(28,25,23,0.04)] flex flex-col justify-between gap-3.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <p className="text-[12px] font-medium text-[#6B6560] dark:text-[#A8A095]">
                          {item.level} · {item.topic}{item.subtopic ? ` (${item.subtopic})` : ''} · {item.partOfSpeech}
                        </p>
                        <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                          {displayWord}
                        </h2>
                        {item.plural && (
                          <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095]">
                            Plural: {item.plural}
                          </p>
                        )}
                        {item.praesens && (
                          <p className="text-[12px] text-[#854D0E] dark:text-[#FDE047]">
                            Konjugation: {item.praesens} · {item.praeteritum} · {item.perfekt}
                          </p>
                        )}
                        {item.comparative && (
                          <p className="text-[12px] text-[#854D0E] dark:text-[#FDE047]">
                            Steigerung: {item.comparative} · {item.superlative}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {soundEnabled && item.audioPath && (
                          <button
                            type="button"
                            onClick={() => handleSpeak(item.audioPath)}
                            aria-label={`${displayWord} anhören`}
                            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-[#6B6560] hover:bg-[#FAF8F4] hover:text-[#B91C1C] dark:text-[#B5AEA5] dark:hover:bg-[#262320] cursor-pointer transition-colors"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(item.id)}
                          aria-label={
                            isBookmarked
                              ? `${displayWord} aus der Merkliste entfernen`
                              : `${displayWord} zur Merkliste hinzufügen`
                          }
                          aria-pressed={isBookmarked}
                          className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
                            isBookmarked
                              ? 'bg-[#FDF2F2] text-[#B91C1C] dark:bg-[#2C1A19] dark:text-[#EF4444]'
                              : 'text-[#8E867C] hover:bg-[#FAF8F4] hover:text-[#1C1917] dark:hover:bg-[#262320]'
                          }`}
                        >
                          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-[#EFEAE0] dark:border-[#2E2A25] space-y-2.5">
                      <p className="text-[14px] leading-6 text-[#3F3A35] dark:text-[#D1CBC2]">
                        „{item.exampleDe}“
                      </p>

                      {item.relatedWords && item.relatedWords.length > 0 && (
                        <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">
                          Verwandt: {item.relatedWords.join(', ')}
                        </p>
                      )}

                      {isMeaningShown ? (
                        <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] px-3.5 py-2.5 text-[13px] space-y-1">
                          <p className="font-semibold text-[#B91C1C] dark:text-[#FCA5A5]">
                            Bedeutung: {item.meaningId}
                          </p>
                          <p className="text-[#57524C] dark:text-[#C8C1B8]">{item.exampleId}</p>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setRevealedIds((prev) => ({ ...prev, [item.id]: true }))
                          }
                          className="min-h-[36px] text-[13px] font-semibold text-[#B91C1C] hover:underline dark:text-[#EF4444] cursor-pointer"
                        >
                          Bedeutung anzeigen
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
          )}
        </>
      )}

      {/* Interactive Vocabulary Exercises */}
      <section className="space-y-4 pt-2">
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Wortschatz-Übungen ({vocabExercises.length} Einheiten · {totalVocabQuestions} Aufgaben)
          </h2>
          <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
            Trainiere Artikel, Pluralformen, Synonyme, Kollokationen, Zuordnungen und Übersetzungen interaktiv.
          </p>
        </div>

        {bookmarks && (
          <RandomPracticePanel
            exercises={vocabExercises}
            defaultSkill="wortschatz"
            defaultLevel={levelFilter}
            mistakes={mistakes}
            bookmarks={bookmarks}
            recentQuestionIds={recentQuestionIds}
            onStartExercise={onStartExercise}
            title="Wortschatz-Zufallstraining"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          {visibleVocabExercises.map((ex) => {
            const isDone = completedExerciseIds.includes(ex.id);
            const score = exerciseScores[ex.id];
            return (
              <article
                key={ex.id}
                className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-[18px] sm:p-5 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_1px_3px_rgba(28,25,23,0.04)] flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-[13px] text-[#6B6560] dark:text-[#A8A095]">
                    <span>
                      {ex.level} · {ex.topic} · {ex.difficulty}
                    </span>
                    {isDone && (
                      <span className="inline-flex items-center gap-1 text-[#15803D] dark:text-emerald-400 font-semibold tabular-nums">
                        <CheckCircle2 className="w-4 h-4" />
                        {score ? `${score.percentage} %` : 'Erledigt'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                    {ex.title}
                  </h3>
                  <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">{ex.subtitle}</p>
                </div>

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-[#6B6560] dark:text-[#A8A095] tabular-nums">
                    <Clock className="w-4 h-4" />
                    {ex.durationMinutes} Min. · {ex.questions.length}{' '}
                    {ex.questions.length === 1 ? 'Aufgabe' : 'Aufgaben'}
                  </span>
                  <TouchButton
                    variant={isDone ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => onStartExercise(ex)}
                  >
                    {isDone ? 'Nochmals üben' : 'Übung starten'}
                    <ArrowRight className="w-4 h-4" />
                  </TouchButton>
                </div>
              </article>
            );
          })}
        </div>

        {visibleExCount < vocabExercises.length && (
          <div className="flex justify-center pt-2">
            <TouchButton
              variant="secondary"
              size="md"
              onClick={() => setVisibleExCount((c) => c + 12)}
            >
              Weitere Wortschatz-Übungen laden ({vocabExercises.length - visibleExCount} verbleibend)
            </TouchButton>
          </div>
        )}
      </section>
    </div>
  );
}
