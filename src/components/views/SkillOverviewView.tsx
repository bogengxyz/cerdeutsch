import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock,
  Headphones,
  SignalHigh,
  SignalLow,
  SignalMedium,
} from 'lucide-react';
import { SKILL_META } from '../../data/curriculum';
import { useQuestionBankExercises } from '../../hooks/useQuestionBankExercises';
import { CEFRLevel, DifficultyLevel, Exercise } from '../../types/exercise';
import { SkillType } from '../../types/learning';
import { BookmarkCollection, MistakeRecord } from '../../types/phase4';
import { ExerciseScoreRecord } from '../../types/progress';
import { getNeutralModuleLabel, sanitizeExamBrandingText } from '../../utils/brandLabels';
import { RandomPracticePanel } from '../practice/RandomPracticePanel';
import { SkillIcon, TouchButton } from '../ui/TouchFlowPrimitives';

interface SkillOverviewViewProps {
  skill: SkillType;
  levelFilter: CEFRLevel | 'Alle';
  onLevelFilterChange: (lvl: CEFRLevel | 'Alle') => void;
  completedIds: string[];
  exerciseScores: Record<string, ExerciseScoreRecord>;
  bookmarkedIds?: string[];
  onToggleBookmark?: (id: string) => void;
  onStartExercise: (exercise: Exercise) => void;
  mistakes?: MistakeRecord[];
  bookmarks?: BookmarkCollection;
  recentQuestionIds?: string[];
}

const PAGE_SIZE = 12;

export function SkillOverviewView({
  skill,
  levelFilter,
  onLevelFilterChange,
  completedIds,
  exerciseScores,
  bookmarkedIds = [],
  onToggleBookmark,
  onStartExercise,
  mistakes = [],
  bookmarks,
  recentQuestionIds = [],
}: SkillOverviewViewProps) {
  const meta = SKILL_META[skill];
  const { exercises, loading } = useQuestionBankExercises(skill, levelFilter);
  const [topicFilter, setTopicFilter] = useState<string>('Alle');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | 'Alle'>('Alle');
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setTopicFilter('Alle');
  }, [skill, levelFilter]);

  const availableTopics = useMemo(() => {
    const set = new Set(exercises.map((e) => e.topic));
    return [...set].sort((a, b) => a.localeCompare(b, 'de'));
  }, [exercises]);

  const filtered = useMemo(() => {
    return exercises.filter((ex) => {
      if (topicFilter !== 'Alle' && ex.topic !== topicFilter) return false;
      if (difficultyFilter !== 'Alle' && ex.difficulty !== difficultyFilter) return false;
      return true;
    });
  }, [exercises, topicFilter, difficultyFilter]);

  const visibleExercises = filtered.slice(0, visibleCount);
  const totalQuestionCount = useMemo(
    () => filtered.reduce((sum, ex) => sum + ex.questions.length, 0),
    [filtered],
  );

  const renderDifficultyIcon = (difficulty: Exercise['difficulty']) => {
    if (difficulty === 'Leicht') return <SignalLow className="w-4 h-4 text-[#15803D]" />;
    if (difficulty === 'Mittel') return <SignalMedium className="w-4 h-4 text-[#B45309]" />;
    return <SignalHigh className="w-4 h-4 text-[#B91C1C]" />;
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-start justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FDF2F2] dark:bg-[#2C1A19] border border-[#EED8D2] dark:border-[#4A2624] text-[#B91C1C] dark:text-[#EF4444] flex items-center justify-center shrink-0">
              <SkillIcon skill={skill} className="w-5 h-5" />
            </div>
            <h1 className="font-display text-2xl sm:text-[30px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              {getNeutralModuleLabel(skill)}
            </h1>
          </div>
          <p className="text-[15px] leading-relaxed text-[#57524C] dark:text-[#C8C1B8]">
            {meta.longDescription}
          </p>
          <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095] tabular-nums">
            Aufgabenformate: {meta.focusFormats.join(' · ')} · {filtered.length} Einheiten (
            {totalQuestionCount} Aufgaben)
          </p>
        </div>

        {/* Interactive Level Filter */}
        <div
          role="group"
          aria-label="Nach Sprachniveau filtern"
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

      {/* Randomized Practice Launcher for Objective Modules */}
      {(skill === 'lesen' || skill === 'hoeren') && bookmarks && (
        <RandomPracticePanel
          exercises={exercises}
          defaultSkill={skill}
          defaultLevel={levelFilter}
          mistakes={mistakes}
          bookmarks={bookmarks}
          recentQuestionIds={recentQuestionIds}
          onStartExercise={onStartExercise}
        />
      )}

      {/* Topic & Difficulty Sub-filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label
            htmlFor="skill-topic-filter"
            className="text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8]"
          >
            Thema:
          </label>
          <select
            id="skill-topic-filter"
            value={topicFilter}
            onChange={(e) => {
              setTopicFilter(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            className="min-h-[42px] px-3 rounded-xl border border-[#E6E0D4] bg-white text-[14px] text-[#1C1917] focus:border-[#B91C1C] focus:outline-none dark:border-[#3A352F] dark:bg-[#1F1D1A] dark:text-[#F5F2EB]"
          >
            <option value="Alle">Alle Themen ({availableTopics.length})</option>
            {availableTopics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="skill-diff-filter"
            className="text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8]"
          >
            Schwierigkeit:
          </label>
          <select
            id="skill-diff-filter"
            value={difficultyFilter}
            onChange={(e) => {
              setDifficultyFilter(e.target.value as DifficultyLevel | 'Alle');
              setVisibleCount(PAGE_SIZE);
            }}
            className="min-h-[42px] px-3 rounded-xl border border-[#E6E0D4] bg-white text-[14px] text-[#1C1917] focus:border-[#B91C1C] focus:outline-none dark:border-[#3A352F] dark:bg-[#1F1D1A] dark:text-[#F5F2EB]"
          >
            <option value="Alle">Alle Stufen</option>
            <option value="Leicht">Leicht</option>
            <option value="Mittel">Mittel</option>
            <option value="Anspruchsvoll">Anspruchsvoll</option>
          </select>
        </div>
      </div>

      {loading && exercises.length === 0 ? (
        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-8 text-center border border-[#E6E0D4] dark:border-[#2E2A25] text-[15px] text-[#57524C] dark:text-[#C8C1B8]">
          Übungen werden geladen...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-8 text-center border border-[#E6E0D4] dark:border-[#2E2A25] space-y-3">
          <p className="text-[15px] text-[#57524C] dark:text-[#C8C1B8]">
            Für diese Auswahl wurden keine Übungen gefunden.
          </p>
          <TouchButton
            variant="secondary"
            size="sm"
            onClick={() => {
              setTopicFilter('Alle');
              setDifficultyFilter('Alle');
              onLevelFilterChange('Alle');
            }}
          >
            Alle Niveaus anzeigen
          </TouchButton>
        </div>
      ) : (
        <div className="space-y-6">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
            {visibleExercises.map((ex) => {
              const isDone = completedIds.includes(ex.id);
              const scoreRecord = exerciseScores[ex.id];
              const isBookmarked = bookmarkedIds.includes(ex.id);

              return (
                <article
                  key={ex.id}
                  className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-[18px] sm:p-5 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_1px_3px_rgba(28,25,23,0.04)] flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#6B6560] dark:text-[#A8A095] pt-1">
                        <span>
                          {ex.level} · {ex.topic} · {sanitizeExamBrandingText(ex.formatLabel)}
                        </span>
                        {isDone && (
                          <span className="inline-flex items-center gap-1 text-[#15803D] dark:text-emerald-400 font-semibold shrink-0 tabular-nums">
                            <CheckCircle2 className="w-4 h-4" />
                            {scoreRecord ? `${scoreRecord.percentage} %` : 'Erledigt'}
                          </span>
                        )}
                      </div>

                      {onToggleBookmark && (
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(ex.id)}
                          aria-pressed={isBookmarked}
                          aria-label={
                            isBookmarked
                              ? `${sanitizeExamBrandingText(ex.title)} aus Sammlung entfernen`
                              : `${sanitizeExamBrandingText(ex.title)} in Sammlung speichern`
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

                    <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      {sanitizeExamBrandingText(ex.title)}
                    </h2>
                    <p className="text-[14px] leading-5 text-[#57524C] dark:text-[#C8C1B8]">
                      {sanitizeExamBrandingText(ex.subtitle)}
                    </p>

                    {ex.learningObjectiveDe && (
                      <p className="text-[12px] text-[#B91C1C] dark:text-[#FCA5A5] font-medium">
                        Lernziel: {sanitizeExamBrandingText(ex.learningObjectiveDe)}
                      </p>
                    )}

                    {ex.skill === 'hoeren' && (
                      <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095] inline-flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5 text-[#B91C1C] dark:text-[#EF4444]" />
                        {ex.audioStatus === 'available' && ex.audioUrl
                          ? 'Lokale Audiodatei verfügbar'
                          : 'Audio ausstehend (Transkript nach Abgabe)'}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
                    <div className="flex items-center gap-4 text-[13px] text-[#57524C] dark:text-[#C8C1B8]">
                      <span className="inline-flex items-center gap-1.5">
                        {renderDifficultyIcon(ex.difficulty)}
                        {ex.difficulty}
                      </span>
                      <span className="inline-flex items-center gap-1.5 tabular-nums">
                        <Clock className="w-4 h-4 text-[#8E867C]" />
                        {ex.durationMinutes} Min.
                      </span>
                      <span className="tabular-nums text-[#6B6560] dark:text-[#A8A095]">
                        {ex.questions.length} {ex.questions.length === 1 ? 'Aufgabe' : 'Aufgaben'}
                      </span>
                    </div>

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
          </section>

          {visibleCount < filtered.length && (
            <div className="flex justify-center pt-2">
              <TouchButton
                variant="secondary"
                size="md"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              >
                Weitere Übungen laden ({filtered.length - visibleCount} verbleibend)
              </TouchButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
