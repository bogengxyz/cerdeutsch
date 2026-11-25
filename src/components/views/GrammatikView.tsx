import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  Search,
} from 'lucide-react';
import { GRAMMAR_TOPICS } from '../../data/curriculum';
import { getExerciseById } from '../../data/exercises';
import { useQuestionBankExercises } from '../../hooks/useQuestionBankExercises';
import { Exercise } from '../../types/exercise';
import { CEFRLevel } from '../../types/learning';
import { BookmarkCollection, MistakeRecord } from '../../types/phase4';
import { ExerciseScoreRecord } from '../../types/progress';
import { RandomPracticePanel } from '../practice/RandomPracticePanel';
import { TouchButton } from '../ui/TouchFlowPrimitives';

interface GrammatikViewProps {
  levelFilter: CEFRLevel | 'Alle';
  onLevelFilterChange: (lvl: CEFRLevel | 'Alle') => void;
  completedGrammarIds: string[];
  completedExerciseIds: string[];
  exerciseScores: Record<string, ExerciseScoreRecord>;
  bookmarkedGrammarIds?: string[];
  highlightedGrammarId?: string | null;
  onToggleGrammarBookmark?: (id: string) => void;
  onToggleGrammar: (id: string, title: string, level: CEFRLevel) => void;
  onStartExercise: (exercise: Exercise) => void;
  mistakes?: MistakeRecord[];
  bookmarks?: BookmarkCollection;
  recentQuestionIds?: string[];
}

export function GrammatikView({
  levelFilter,
  onLevelFilterChange,
  completedGrammarIds,
  completedExerciseIds,
  exerciseScores,
  bookmarkedGrammarIds = [],
  highlightedGrammarId,
  onToggleGrammarBookmark,
  onToggleGrammar,
  onStartExercise,
  mistakes = [],
  bookmarks,
  recentQuestionIds = [],
}: GrammatikViewProps) {
  const [search, setSearch] = useState('');
  const [visibleExCount, setVisibleExCount] = useState(12);
  const [expandedId, setExpandedId] = useState<string | null>(
    highlightedGrammarId ?? GRAMMAR_TOPICS[0]?.id ?? null,
  );
  const [showIdExplanation, setShowIdExplanation] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (highlightedGrammarId) {
      setExpandedId(highlightedGrammarId);
    }
  }, [highlightedGrammarId]);

  useEffect(() => {
    setVisibleExCount(12);
  }, [levelFilter]);

  const filtered = GRAMMAR_TOPICS.filter((topic) => {
    const matchesLevel = levelFilter === 'Alle' || topic.level === levelFilter;
    const q = search.trim().toLowerCase();
    const matchesQuery =
      !q ||
      topic.title.toLowerCase().includes(q) ||
      topic.category.toLowerCase().includes(q) ||
      topic.summary.toLowerCase().includes(q);
    return matchesLevel && matchesQuery;
  });

  const { exercises: grammarExercises } = useQuestionBankExercises('grammatik', levelFilter);
  const visibleGrammarExercises = grammarExercises.slice(0, visibleExCount);
  const totalGrammarQuestions = grammarExercises.reduce((sum, ex) => sum + ex.questions.length, 0);

  return (
    <div className="space-y-8">
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <h1 className="font-display text-2xl sm:text-[30px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Grammatik ({GRAMMAR_TOPICS.length} Themen)
          </h1>
          <p className="text-[15px] leading-relaxed text-[#57524C] dark:text-[#C8C1B8]">
            Strukturierte Regeln, Satzbau-Muster, Konjugationstabellen, Praxisbeispiele und
            interaktive Übungen von A1 bis B2.
          </p>
        </div>

        <div
          role="group"
          aria-label="Grammatik nach Niveau filtern"
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

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-[#7C756D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <label htmlFor="grammar-search" className="sr-only">
          Grammatikthema suchen
        </label>
        <input
          id="grammar-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Thema oder Kategorie suchen..."
          className="w-full min-h-[48px] pl-10 pr-4 rounded-xl border border-[#E6E0D4] bg-white text-[15px] text-[#1C1917] placeholder:text-[#7C756D] focus:border-[#B91C1C] focus:outline-none focus:ring-4 focus:ring-[#B91C1C]/10 dark:border-[#3A352F] dark:bg-[#1F1D1A] dark:text-[#F5F2EB]"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-8 text-center border border-[#E6E0D4] dark:border-[#2E2A25] space-y-3">
          <p className="text-[15px] text-[#57524C] dark:text-[#C8C1B8]">
            Keine passenden Grammatikthemen gefunden.
          </p>
          <TouchButton
            variant="secondary"
            size="sm"
            onClick={() => {
              setSearch('');
              onLevelFilterChange('Alle');
            }}
          >
            Filter zurücksetzen
          </TouchButton>
        </div>
      ) : (
        <section className="space-y-4">
          {filtered.map((topic) => {
            const isExpanded = expandedId === topic.id;
            const isCompleted = completedGrammarIds.includes(topic.id);
            const isBookmarked = bookmarkedGrammarIds.includes(topic.id);
            const showId = Boolean(showIdExplanation[topic.id]);
            const relatedEx = topic.relatedExerciseId
              ? getExerciseById(topic.relatedExerciseId)
              : undefined;

            return (
              <article
                key={topic.id}
                className="bg-white dark:bg-[#1F1D1A] rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_1px_3px_rgba(28,25,23,0.04)] overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2 p-5">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedId(isExpanded ? null : topic.id)}
                    className="flex-1 flex items-start justify-between gap-4 text-left cursor-pointer focus:outline-none"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#6B6560] dark:text-[#A8A095]">
                        <span className="font-semibold text-[#B91C1C] dark:text-[#EF4444]">
                          {topic.level}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{topic.category}</span>
                        {isCompleted && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1 text-[#15803D] dark:text-emerald-400 font-semibold">
                              <CheckCircle2 className="w-4 h-4" />
                              Gelernt
                            </span>
                          </>
                        )}
                      </div>
                      <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                        {topic.title}
                      </h2>
                      <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
                        {topic.summary}
                      </p>
                    </div>
                    <span className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#6B6560] shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  {onToggleGrammarBookmark && (
                    <button
                      type="button"
                      onClick={() => onToggleGrammarBookmark(topic.id)}
                      aria-pressed={isBookmarked}
                      aria-label={
                        isBookmarked
                          ? `${topic.title} aus Sammlung entfernen`
                          : `${topic.title} in Sammlung speichern`
                      }
                      className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl shrink-0 transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-[#FDF2F2] text-[#B91C1C] dark:bg-[#2C1A19] dark:text-[#EF4444]'
                          : 'text-[#8E867C] hover:bg-[#FAF8F4] hover:text-[#1C1917] dark:hover:bg-[#262320]'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  )}
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-4 border-t border-[#EFEAE0] dark:border-[#2E2A25] space-y-5 bg-[#FAF8F4]/70 dark:bg-[#1A1816]">
                    <p className="text-[15px] leading-6 text-[#1C1917] dark:text-[#F5F2EB]">
                      {topic.explanationDe}
                    </p>

                    {topic.sentenceStructureDe && (
                      <div className="rounded-xl bg-white dark:bg-[#1F1D1A] border border-[#E6E0D4] dark:border-[#3A352F] px-4 py-3 space-y-1">
                        <p className="text-[12px] font-semibold text-[#6B6560] dark:text-[#A8A095]">
                          Satzbau & Struktur
                        </p>
                        <p className="text-[14px] font-medium text-[#1C1917] dark:text-[#F5F2EB]">
                          {topic.sentenceStructureDe}
                        </p>
                      </div>
                    )}

                    {topic.conjugationTable && (
                      <div className="space-y-2">
                        <h3 className="text-[13px] font-semibold text-[#6B6560] dark:text-[#A8A095]">
                          Übersicht / Konjugationstabelle
                        </h3>
                        <div className="overflow-x-auto rounded-xl border border-[#E6E0D4] dark:border-[#2E2A25]">
                          <table className="w-full text-left text-[14px] border-collapse">
                            <thead className="bg-[#F3EFE6] dark:bg-[#262320] text-[#1C1917] dark:text-[#F5F2EB]">
                              <tr>
                                {topic.conjugationTable.headers.map((header) => (
                                  <th
                                    key={header}
                                    scope="col"
                                    className="px-3.5 py-2.5 font-semibold border-b border-[#E6E0D4] dark:border-[#3A352F] whitespace-nowrap"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25]">
                              {topic.conjugationTable.rows.map((row, rowIdx) => (
                                <tr
                                  key={`${topic.id}-row-${rowIdx}`}
                                  className="bg-white dark:bg-[#1F1D1A]"
                                >
                                  {row.map((cell, cellIdx) => (
                                    <td
                                      key={`${topic.id}-r${rowIdx}-c${cellIdx}`}
                                      className={`px-3.5 py-2.5 text-[#1C1917] dark:text-[#F5F2EB] ${
                                        cellIdx === 0 ? 'font-semibold whitespace-nowrap' : ''
                                      }`}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <h3 className="text-[13px] font-semibold text-[#6B6560] dark:text-[#A8A095]">
                        Wichtige Regeln
                      </h3>
                      <ul className="space-y-1.5 text-[15px] leading-6 text-[#1C1917] dark:text-[#F5F2EB] list-disc pl-5">
                        {topic.rulePoints.map((rule) => (
                          <li key={rule}>{rule}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-[13px] font-semibold text-[#6B6560] dark:text-[#A8A095]">
                        Beispiele
                      </h3>
                      <div className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25] rounded-xl bg-white dark:bg-[#1F1D1A] border border-[#E6E0D4] dark:border-[#2E2A25]">
                        {topic.examples.map((ex) => (
                          <div key={ex.german} className="px-4 py-3 space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                              <span className="text-[15px] font-medium text-[#1C1917] dark:text-[#F5F2EB]">
                                {ex.german}
                              </span>
                              <span className="text-[13px] text-[#6B6560] dark:text-[#A8A095]">
                                {ex.note}
                              </span>
                            </div>
                            {showId && ex.translationId && (
                              <p className="text-[13px] text-[#B91C1C] dark:text-[#FCA5A5]">
                                → {ex.translationId}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {showId && (
                      <div className="rounded-xl bg-[#FAF2DF] dark:bg-[#252017] border border-[#EADBC0] dark:border-[#3A3122] p-4 space-y-3">
                        <div className="space-y-1">
                          <p className="text-[12px] font-semibold text-[#B91C1C] dark:text-[#FCA5A5]">
                            Erklärung auf Indonesisch (Penjelasan)
                          </p>
                          <p className="text-[14px] leading-6 text-[#1C1917] dark:text-[#F5F2EB]">
                            {topic.explanationId}
                          </p>
                        </div>

                        {topic.commonMistakesId && (
                          <div className="pt-2.5 border-t border-[#EADBC0] dark:border-[#3A3122] space-y-1">
                            <p className="text-[12px] font-semibold text-[#B45309] dark:text-[#F59E0B] flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              Häufige Fehler (Kesalahan Umum)
                            </p>
                            <p className="text-[13px] leading-5 text-[#4B453F] dark:text-[#D1CBC2]">
                              {topic.commonMistakesId}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <TouchButton
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setShowIdExplanation((prev) => ({
                            ...prev,
                            [topic.id]: !prev[topic.id],
                          }))
                        }
                      >
                        <Globe className="w-4 h-4" />
                        {showIdExplanation[topic.id]
                          ? 'Indonesische Erklärung ausblenden'
                          : 'Erklärung auf Indonesisch'}
                      </TouchButton>

                      <div className="flex flex-wrap items-center gap-2.5 ml-auto">
                        {relatedEx && (
                          <TouchButton
                            variant="primary"
                            size="sm"
                            onClick={() => onStartExercise(relatedEx)}
                          >
                            Grammatik üben
                            <ArrowRight className="w-4 h-4" />
                          </TouchButton>
                        )}
                        <TouchButton
                          variant="secondary"
                          size="sm"
                          onClick={() => onToggleGrammar(topic.id, topic.title, topic.level)}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          {isCompleted ? 'Als ungelernt markieren' : 'Als gelernt markieren'}
                        </TouchButton>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      )}

      {/* Interactive Grammar Exercises */}
      <section className="space-y-4 pt-2">
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Grammatik-Übungen ({grammarExercises.length} Einheiten · {totalGrammarQuestions} Aufgaben)
          </h2>
          <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
            Teste dein Wissen mit Multiple-Choice-, Mehrfachauswahl-, Satzbau- und Lückentext-Aufgaben inklusive Erklärung nach dem Absenden.
          </p>
        </div>

        {bookmarks && (
          <RandomPracticePanel
            exercises={grammarExercises}
            defaultSkill="grammatik"
            defaultLevel={levelFilter}
            mistakes={mistakes}
            bookmarks={bookmarks}
            recentQuestionIds={recentQuestionIds}
            onStartExercise={onStartExercise}
            title="Grammatik-Zufallstraining"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          {visibleGrammarExercises.map((ex) => {
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

        {visibleExCount < grammarExercises.length && (
          <div className="flex justify-center pt-2">
            <TouchButton
              variant="secondary"
              size="md"
              onClick={() => setVisibleExCount((c) => c + 12)}
            >
              Weitere Grammatik-Übungen laden ({grammarExercises.length - visibleExCount} verbleibend)
            </TouchButton>
          </div>
        )}
      </section>
    </div>
  );
}
