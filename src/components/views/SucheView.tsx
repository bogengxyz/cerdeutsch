import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Layers,
  RotateCcw,
  Search,
} from 'lucide-react';
import {
  SearchItemKind,
  getAllAvailableTopics,
  searchLearningContent,
} from '../../services/searchService';
import { useVocabulary } from '../../data/vocabulary';
import { CEFRLevel, Exercise, ModuleSkill } from '../../types/exercise';
import { BookmarkCategory, BookmarkCollection } from '../../types/phase4';
import { sanitizeExamBrandingText } from '../../utils/brandLabels';
import { TouchButton } from '../ui/TouchFlowPrimitives';

interface SucheViewProps {
  initialQuery?: string;
  queryNonce?: number;
  completedExerciseIds: string[];
  completedGrammarIds: string[];
  bookmarks: BookmarkCollection;
  onToggleBookmark: (category: BookmarkCategory, itemId: string) => void;
  onStartExercise: (exercise: Exercise) => void;
  onOpenGrammar: (grammarId: string, level: CEFRLevel) => void;
  onOpenVocab: (level: CEFRLevel) => void;
}

const SKILL_LABELS: Record<ModuleSkill, string> = {
  lesen: 'Lesen',
  hoeren: 'Hören',
  sprechen: 'Sprechen',
  schreiben: 'Schreiben',
  grammatik: 'Grammatik',
  wortschatz: 'Wortschatz',
};

export function SucheView({
  initialQuery = '',
  queryNonce = 0,
  completedExerciseIds,
  completedGrammarIds,
  bookmarks,
  onToggleBookmark,
  onStartExercise,
  onOpenGrammar,
  onOpenVocab,
}: SucheViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [level, setLevel] = useState<CEFRLevel | 'Alle'>('Alle');
  const [module, setModule] = useState<ModuleSkill | 'Alle'>('Alle');
  const [kind, setKind] = useState<SearchItemKind | 'Alle'>('Alle');
  const [difficulty, setDifficulty] = useState<Exercise['difficulty'] | 'Alle'>('Alle');
  const [topic, setTopic] = useState<string>('Alle');

  useEffect(() => {
    if (queryNonce > 0) {
      setQuery(initialQuery);
    }
  }, [initialQuery, queryNonce]);

  const { words: vocabWords } = useVocabulary(level);

  const availableTopics = useMemo(() => getAllAvailableTopics(level, vocabWords), [level, vocabWords]);
  const effectiveTopic = topic !== 'Alle' && !availableTopics.includes(topic) ? 'Alle' : topic;

  const results = useMemo(
    () =>
      searchLearningContent({
        query,
        level,
        module,
        kind,
        difficulty,
        topic: effectiveTopic,
        vocabList: vocabWords,
      }),
    [query, level, module, kind, difficulty, effectiveTopic, vocabWords],
  );

  const resetFilters = () => {
    setQuery('');
    setLevel('Alle');
    setModule('Alle');
    setKind('Alle');
    setDifficulty('Alle');
    setTopic('Alle');
  };

  return (
    <div className="space-y-8">
      <section className="space-y-2 max-w-2xl">
        <h1 className="font-display text-2xl sm:text-[30px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          Suche & Lernkatalog
        </h1>
        <p className="text-[15px] leading-relaxed text-[#57524C] dark:text-[#C8C1B8]">
          Durchsuche alle Vokabeln, Grammatikthemen, Übungsaufgaben und Kursthemen von A1 bis B2
          mit kombinierten Filtern.
        </p>
      </section>

      {/* Search & Multi-Filters */}
      <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-4 shadow-[0_1px_3px_rgba(28,25,23,0.04)]">
        <div className="relative">
          <Search className="w-4 h-4 text-[#7C756D] dark:text-[#9E968C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <label htmlFor="global-search-input" className="sr-only">
            Lerninhalte durchsuchen
          </label>
          <input
            id="global-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suchbegriff eingeben (z. B. Dativ, Bewerbung, Fahrkarte, Technologie)..."
            className="w-full min-h-[48px] pl-10 pr-4 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] text-[15px] text-[#1C1917] placeholder:text-[#7C756D] focus:bg-white focus:border-[#B91C1C] focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/10 dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB] dark:focus:bg-[#1A1816]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="space-y-1">
            <label
              htmlFor="search-level"
              className="text-[12px] font-semibold text-[#6B6560] dark:text-[#A8A095] block"
            >
              Niveau
            </label>
            <select
              id="search-level"
              value={level}
              onChange={(e) => setLevel(e.target.value as CEFRLevel | 'Alle')}
              className="w-full min-h-[44px] px-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] text-[14px] text-[#1C1917] focus:border-[#B91C1C] focus:outline-none dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB]"
            >
              <option value="Alle">Alle Niveaus</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="search-kind"
              className="text-[12px] font-semibold text-[#6B6560] dark:text-[#A8A095] block"
            >
              Inhaltstyp
            </label>
            <select
              id="search-kind"
              value={kind}
              onChange={(e) => setKind(e.target.value as SearchItemKind | 'Alle')}
              className="w-full min-h-[44px] px-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] text-[14px] text-[#1C1917] focus:border-[#B91C1C] focus:outline-none dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB]"
            >
              <option value="Alle">Alle Bereiche</option>
              <option value="exercise">Übungen</option>
              <option value="grammar">Grammatik</option>
              <option value="vocab">Wortschatz</option>
              <option value="topic">Themenplan</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="search-module"
              className="text-[12px] font-semibold text-[#6B6560] dark:text-[#A8A095] block"
            >
              Modul
            </label>
            <select
              id="search-module"
              value={module}
              onChange={(e) => setModule(e.target.value as ModuleSkill | 'Alle')}
              className="w-full min-h-[44px] px-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] text-[14px] text-[#1C1917] focus:border-[#B91C1C] focus:outline-none dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB]"
            >
              <option value="Alle">Alle Module</option>
              <option value="lesen">Lesen</option>
              <option value="hoeren">Hören</option>
              <option value="sprechen">Sprechen</option>
              <option value="schreiben">Schreiben</option>
              <option value="grammatik">Grammatik</option>
              <option value="wortschatz">Wortschatz</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="search-difficulty"
              className="text-[12px] font-semibold text-[#6B6560] dark:text-[#A8A095] block"
            >
              Schwierigkeit
            </label>
            <select
              id="search-difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Exercise['difficulty'] | 'Alle')}
              className="w-full min-h-[44px] px-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] text-[14px] text-[#1C1917] focus:border-[#B91C1C] focus:outline-none dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB]"
            >
              <option value="Alle">Alle Stufen</option>
              <option value="Leicht">Leicht</option>
              <option value="Mittel">Mittel</option>
              <option value="Anspruchsvoll">Anspruchsvoll</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="search-topic"
              className="text-[12px] font-semibold text-[#6B6560] dark:text-[#A8A095] block"
            >
              Thema
            </label>
            <select
              id="search-topic"
              value={effectiveTopic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full min-h-[44px] px-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] text-[14px] text-[#1C1917] focus:border-[#B91C1C] focus:outline-none dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB]"
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

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <p className="text-[13px] font-medium text-[#57524C] dark:text-[#C8C1B8] tabular-nums">
            {results.totalCount} Treffer gefunden
          </p>
          <TouchButton variant="ghost" size="sm" onClick={resetFilters}>
            <RotateCcw className="w-4 h-4" />
            Filter zurücksetzen
          </TouchButton>
        </div>
      </section>

      {results.totalCount === 0 ? (
        <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-8 text-center space-y-3 border border-[#E6E0D4] dark:border-[#2E2A25]">
          <p className="text-[15px] text-[#57524C] dark:text-[#C8C1B8]">
            Keine passenden Lerninhalte für diese Suchkombination gefunden.
          </p>
          <TouchButton variant="secondary" size="sm" onClick={resetFilters}>
            Suche zurücksetzen
          </TouchButton>
        </section>
      ) : (
        <div className="space-y-8">
          {/* Exercises Results */}
          {results.exercises.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Übungen ({results.exercises.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                {results.exercises.slice(0, 24).map((ex) => {
                  const isDone = completedExerciseIds.includes(ex.id);
                  const bookmarkCat: BookmarkCategory | null =
                    ex.skill === 'lesen' ||
                    ex.skill === 'hoeren' ||
                    ex.skill === 'schreiben' ||
                    ex.skill === 'sprechen'
                      ? ex.skill
                      : null;
                  const isBookmarked = bookmarkCat
                    ? bookmarks[bookmarkCat].includes(ex.id)
                    : false;

                  return (
                    <article
                      key={ex.id}
                      className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[12px] font-semibold text-[#B91C1C] dark:text-[#EF4444]">
                            {ex.level} · {SKILL_LABELS[ex.skill]} · {ex.topic} · {ex.difficulty}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {isDone && (
                              <CheckCircle2
                                className="w-4 h-4 text-[#15803D] dark:text-emerald-400"
                                aria-label="Abgeschlossen"
                              />
                            )}
                            {bookmarkCat && (
                              <button
                                type="button"
                                onClick={() => onToggleBookmark(bookmarkCat, ex.id)}
                                aria-pressed={isBookmarked}
                                aria-label={
                                  isBookmarked ? 'Aus Sammlung entfernen' : 'In Sammlung speichern'
                                }
                                className={`min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg cursor-pointer ${
                                  isBookmarked
                                    ? 'text-[#B91C1C] dark:text-[#EF4444]'
                                    : 'text-[#8E867C]'
                                }`}
                              >
                                <Bookmark
                                  className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`}
                                />
                              </button>
                            )}
                          </div>
                        </div>
                        <h3 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                          {sanitizeExamBrandingText(ex.title)}
                        </h3>
                        <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
                          {sanitizeExamBrandingText(ex.subtitle)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
                        <span className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">
                          {sanitizeExamBrandingText(ex.formatLabel)} · {ex.durationMinutes} Min.
                        </span>
                        <TouchButton
                          variant="primary"
                          size="sm"
                          onClick={() => onStartExercise(ex)}
                        >
                          Übung starten
                          <ArrowRight className="w-4 h-4" />
                        </TouchButton>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* Grammar Results */}
          {results.grammar.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Grammatik ({results.grammar.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                {results.grammar.slice(0, 20).map((g) => {
                  const isDone = completedGrammarIds.includes(g.id);
                  const isBookmarked = bookmarks.grammar.includes(g.id);
                  return (
                    <article
                      key={g.id}
                      className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[12px] font-semibold text-[#B91C1C] dark:text-[#EF4444] inline-flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            {g.level} · {g.category}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {isDone && (
                              <CheckCircle2 className="w-4 h-4 text-[#15803D] dark:text-emerald-400" />
                            )}
                            <button
                              type="button"
                              onClick={() => onToggleBookmark('grammar', g.id)}
                              aria-pressed={isBookmarked}
                              aria-label={
                                isBookmarked ? 'Aus Sammlung entfernen' : 'In Sammlung speichern'
                              }
                              className={`min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg cursor-pointer ${
                                isBookmarked
                                  ? 'text-[#B91C1C] dark:text-[#EF4444]'
                                  : 'text-[#8E867C]'
                              }`}
                            >
                              <Bookmark
                                className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`}
                              />
                            </button>
                          </div>
                        </div>
                        <h3 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                          {g.title}
                        </h3>
                        <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
                          {g.summary}
                        </p>
                      </div>
                      <div className="flex justify-end pt-3 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
                        <TouchButton
                          variant="secondary"
                          size="sm"
                          onClick={() => onOpenGrammar(g.id, g.level)}
                        >
                          Thema öffnen
                          <ArrowRight className="w-4 h-4" />
                        </TouchButton>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* Vocabulary Results */}
          {results.vocab.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Wortschatz ({results.vocab.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                {results.vocab.slice(0, 20).map((v) => {
                  const displayWord = v.article ? `${v.article} ${v.word}` : v.word;
                  const isBookmarked = bookmarks.vocab.includes(v.id);
                  return (
                    <article
                      key={v.id}
                      className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[12px] font-medium text-[#6B6560] dark:text-[#A8A095]">
                            {v.level} · {v.topic} · {v.partOfSpeech}
                          </span>
                          <button
                            type="button"
                            onClick={() => onToggleBookmark('vocab', v.id)}
                            aria-pressed={isBookmarked}
                            aria-label={
                              isBookmarked ? 'Aus Sammlung entfernen' : 'In Sammlung speichern'
                            }
                            className={`min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg cursor-pointer ${
                              isBookmarked
                                ? 'text-[#B91C1C] dark:text-[#EF4444]'
                                : 'text-[#8E867C]'
                            }`}
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                        <h3 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                          {displayWord}
                        </h3>
                        <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
                          „{v.exampleDe}“
                        </p>
                      </div>
                      <div className="flex justify-end pt-3 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
                        <TouchButton
                          variant="secondary"
                          size="sm"
                          onClick={() => onOpenVocab(v.level)}
                        >
                          Im Wortschatz ansehen
                          <ArrowRight className="w-4 h-4" />
                        </TouchButton>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* Curriculum Topics */}
          {results.topics.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Themenplan ({results.topics.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                {results.topics.map((t) => (
                  <article
                    key={t.id}
                    className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-2"
                  >
                    <p className="text-[12px] font-semibold text-[#B91C1C] dark:text-[#EF4444] inline-flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      {t.level} · {t.grammarFocus}
                    </p>
                    <h3 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      {t.topic}
                    </h3>
                    <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
                      {t.objectiveDe}
                    </p>
                    <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">
                      Schlüsselwörter: {t.keyWords.join(', ')}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
