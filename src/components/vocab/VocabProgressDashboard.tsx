import React, { useMemo } from 'react';
import {
  Award,
  BarChart3,
  BookMarked,
  Brain,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { CEFRLevel } from '../../types/exercise';
import { FlashcardReviewRecord } from '../../types/phase4';
import { VocabularyEntry } from '../../types/vocabulary';

interface VocabProgressDashboardProps {
  words: VocabularyEntry[];
  srsSchedule: Record<string, FlashcardReviewRecord>;
  bookmarkedIds: string[];
  onSelectLevel?: (lvl: CEFRLevel | 'Alle') => void;
  onSelectTopic?: (topic: string) => void;
}

export function VocabProgressDashboard({
  words,
  srsSchedule,
  bookmarkedIds,
  onSelectLevel,
  onSelectTopic,
}: VocabProgressDashboardProps) {
  const stats = useMemo(() => {
    const totalWords = words.length;
    let masteredCount = 0;
    let learningCount = 0;
    let difficultCount = 0;
    let dueCount = 0;

    const levelCounts: Record<CEFRLevel, { total: number; learned: number; mastered: number }> = {
      A1: { total: 0, learned: 0, mastered: 0 },
      A2: { total: 0, learned: 0, mastered: 0 },
      B1: { total: 0, learned: 0, mastered: 0 },
      B2: { total: 0, learned: 0, mastered: 0 },
    };

    const topicCounts: Record<string, { total: number; learned: number }> = {};

    const now = Date.now();

    for (const w of words) {
      if (levelCounts[w.level]) {
        levelCounts[w.level].total += 1;
      }
      if (!topicCounts[w.topic]) {
        topicCounts[w.topic] = { total: 0, learned: 0 };
      }
      topicCounts[w.topic].total += 1;

      const record = srsSchedule[w.id];
      if (record) {
        if (record.lastRating === 'gewusst' && record.intervalDays >= 4) {
          masteredCount += 1;
          if (levelCounts[w.level]) levelCounts[w.level].mastered += 1;
        }
        if (record.repetitions > 0) {
          learningCount += 1;
          if (levelCounts[w.level]) levelCounts[w.level].learned += 1;
          topicCounts[w.topic].learned += 1;
        }
        if (record.difficultCount > 0 || record.lastRating === 'wiederholen' || record.lastRating === 'schwierig') {
          difficultCount += 1;
        }
        const dueMs = Date.parse(record.nextReviewAtIso);
        if (!Number.isNaN(dueMs) && dueMs <= now) {
          dueCount += 1;
        }
      }
    }

    const overallPercentage = totalWords > 0 ? Math.round((learningCount / totalWords) * 100) : 0;
    const masteredPercentage = totalWords > 0 ? Math.round((masteredCount / totalWords) * 100) : 0;

    return {
      totalWords,
      masteredCount,
      learningCount,
      difficultCount,
      dueCount,
      bookmarkedCount: bookmarkedIds.length,
      levelCounts,
      topicCounts,
      overallPercentage,
      masteredPercentage,
    };
  }, [words, srsSchedule, bookmarkedIds]);

  return (
    <div className="space-y-6">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-4 sm:p-5 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#B91C1C] dark:text-[#EF4444]">
            <span className="text-[12px] font-semibold uppercase tracking-wider">Gesamtwortschatz</span>
            <Layers className="w-4 h-4" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
            {stats.totalWords.toLocaleString('de-DE')}
          </p>
          <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">
            4.000 Vokabeleinträge (A1–B2)
          </p>
        </div>

        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-4 sm:p-5 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#15803D] dark:text-emerald-400">
            <span className="text-[12px] font-semibold uppercase tracking-wider">Gelernt / Geübt</span>
            <Brain className="w-4 h-4" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
            {stats.learningCount}
          </p>
          <div className="flex items-center gap-1.5 text-[12px] text-[#57524C] dark:text-[#A8A095]">
            <TrendingUp className="w-3.5 h-3.5 text-[#15803D]" />
            <span>{stats.overallPercentage} % des Gesamtwortschatzes</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-4 sm:p-5 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#B45309] dark:text-amber-400">
            <span className="text-[12px] font-semibold uppercase tracking-wider">Gemeistert</span>
            <Award className="w-4 h-4" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
            {stats.masteredCount}
          </p>
          <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">
            Langzeitgedächtnis (4+ Tage)
          </p>
        </div>

        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-4 sm:p-5 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#2563EB] dark:text-blue-400">
            <span className="text-[12px] font-semibold uppercase tracking-wider">Wiederholung</span>
            <Clock className="w-4 h-4" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
            {stats.dueCount} fällig
          </p>
          <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">
            {stats.difficultCount} als schwierig eingestuft
          </p>
        </div>
      </div>

      {/* Level Breakdown Grid */}
      <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 sm:p-6 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-display text-base sm:text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#B91C1C] dark:text-[#EF4444]" />
              Wortschatz-Fortschritt nach CEFR-Niveau
            </h3>
            <p className="text-[13px] text-[#57524C] dark:text-[#A8A095]">
              Aufschlüsselung von A1 bis B2 mit Zielvorgaben und aktuellem Lernstand
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['A1', 'A2', 'B1', 'B2'] as const).map((lvl) => {
            const data = stats.levelCounts[lvl];
            const pct = data.total > 0 ? Math.round((data.learned / data.total) * 100) : 0;
            const masteredPct = data.total > 0 ? Math.round((data.mastered / data.total) * 100) : 0;

            return (
              <div
                key={lvl}
                onClick={() => onSelectLevel?.(lvl)}
                className="group p-4 rounded-xl border border-[#EFEAE0] dark:border-[#2E2A25] bg-[#FAF8F4] dark:bg-[#262320] hover:border-[#B91C1C]/40 dark:hover:border-[#EF4444]/40 transition-colors cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB] group-hover:text-[#B91C1C] dark:group-hover:text-[#EF4444] transition-colors">
                    Niveau {lvl}
                  </span>
                  <span className="text-[12px] font-semibold px-2 py-0.5 rounded-md bg-white dark:bg-[#1F1D1A] border border-[#E6E0D4] dark:border-[#3A352F] text-[#57524C] dark:text-[#C8C1B8] tabular-nums">
                    {data.learned} / {data.total}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-[#6B6560] dark:text-[#A8A095]">
                    <span>Geübt: {pct}%</span>
                    <span>Gemeistert: {masteredPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#EAE4D9] dark:bg-[#332F2B] rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-[#15803D] dark:bg-emerald-500 transition-all duration-300"
                      style={{ width: `${masteredPct}%` }}
                    />
                    <div
                      className="h-full bg-[#B91C1C] dark:bg-[#DC2626] transition-all duration-300"
                      style={{ width: `${Math.max(0, pct - masteredPct)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topic Coverage Grid */}
      <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 sm:p-6 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-xs space-y-4">
        <div className="space-y-0.5">
          <h3 className="font-display text-base sm:text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#B91C1C] dark:text-[#EF4444]" />
            Themenabdeckung (18 Themenfelder)
          </h3>
          <p className="text-[13px] text-[#57524C] dark:text-[#A8A095]">
            Klicke auf ein Thema, um sofort alle Vokabeln dieses Feldes anzuzeigen
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {Object.entries(stats.topicCounts)
            .sort(([a], [b]) => a.localeCompare(b, 'de'))
            .map(([topic, data]) => {
              const pct = data.total > 0 ? Math.round((data.learned / data.total) * 100) : 0;
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => onSelectTopic?.(topic)}
                  className="p-3 text-left rounded-xl border border-[#EFEAE0] dark:border-[#2E2A25] bg-[#FAF8F4] dark:bg-[#262320] hover:border-[#B91C1C] dark:hover:border-[#EF4444] transition-colors cursor-pointer flex flex-col justify-between gap-2"
                >
                  <p className="text-[12px] font-semibold text-[#1C1917] dark:text-[#F5F2EB] line-clamp-2">
                    {topic}
                  </p>
                  <div className="space-y-1 w-full">
                    <div className="flex justify-between text-[10px] text-[#6B6560] dark:text-[#A8A095] tabular-nums">
                      <span>{data.total} W.</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="w-full h-1 bg-[#EAE4D9] dark:bg-[#332F2B] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#B91C1C] dark:bg-[#DC2626] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
