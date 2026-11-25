import React, { useMemo, useState } from 'react';
import { Shuffle, Sparkles } from 'lucide-react';
import {
  PracticeCountOption,
  PracticeSelectionMode,
  buildRandomPracticeExercise,
  collectObjectiveQuestionPool,
} from '../../services/randomPracticeService';
import { CEFRLevel, DifficultyLevel, Exercise, ModuleSkill } from '../../types/exercise';
import { BookmarkCollection, MistakeRecord } from '../../types/phase4';
import { TouchButton } from '../ui/TouchFlowPrimitives';

interface RandomPracticePanelProps {
  exercises: Exercise[];
  defaultSkill: ModuleSkill | 'Alle';
  defaultLevel: CEFRLevel | 'Alle';
  mistakes: MistakeRecord[];
  bookmarks: BookmarkCollection;
  recentQuestionIds: string[];
  onStartExercise: (exercise: Exercise) => void;
  title?: string;
  compact?: boolean;
}

export function RandomPracticePanel({
  exercises,
  defaultSkill,
  defaultLevel,
  mistakes,
  bookmarks,
  recentQuestionIds,
  onStartExercise,
  title = 'Zufallstraining & Gezielte Übung',
  compact = false,
}: RandomPracticePanelProps) {
  const [mode, setMode] = useState<PracticeSelectionMode>('random');
  const [count, setCount] = useState<PracticeCountOption>(20);
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'Alle'>('Alle');
  const [selectedTopic, setSelectedTopic] = useState<string>('Alle');
  const [notice, setNotice] = useState<string | null>(null);

  const availableTopics = useMemo(() => {
    const set = new Set<string>();
    for (const ex of exercises) {
      if (defaultLevel !== 'Alle' && ex.level !== defaultLevel) continue;
      if (defaultSkill !== 'Alle' && ex.skill !== defaultSkill) continue;
      set.add(ex.topic);
    }
    return [...set].sort((a, b) => a.localeCompare(b, 'de'));
  }, [exercises, defaultLevel, defaultSkill]);

  const effectiveTopic =
    selectedTopic !== 'Alle' && !availableTopics.includes(selectedTopic)
      ? 'Alle'
      : selectedTopic;

  const matchingPoolCount = useMemo(
    () =>
      collectObjectiveQuestionPool({
        exercises,
        mode,
        count,
        level: defaultLevel,
        skill: defaultSkill,
        topic: effectiveTopic,
        difficulty,
        mistakes,
        bookmarks,
      }).length,
    [
      exercises,
      mode,
      count,
      defaultLevel,
      defaultSkill,
      effectiveTopic,
      difficulty,
      mistakes,
      bookmarks,
    ],
  );

  const handleLaunch = () => {
    setNotice(null);
    const built = buildRandomPracticeExercise({
      exercises,
      mode,
      count: mode === 'topic' ? 'all' : count,
      level: defaultLevel,
      skill: defaultSkill,
      topic: effectiveTopic,
      difficulty,
      mistakes,
      bookmarks,
      recentQuestionIds,
      seed: Date.now(),
    });

    if (!built) {
      setNotice(
        'Für diese Filterkombination stehen aktuell keine passenden objektiven Fragen zur Verfügung.',
      );
      return;
    }

    onStartExercise(built);
  };

  return (
    <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 sm:p-6 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_2px_10px_rgba(28,25,23,0.03)] space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
            <Shuffle className="w-4 h-4 text-[#B91C1C] dark:text-[#EF4444]" />
            {title}
          </h2>
          {!compact && (
            <p className="text-[13px] text-[#57524C] dark:text-[#B5AEA5]">
              Stelle dir ein Set aus gespeicherten Fragen zusammen — zufällig ohne sofortige
              Wiederholung, nach Thema, Schwierigkeitsgrad, offenen Fehlern oder Lesezeichen.
            </p>
          )}
        </div>
        <span className="text-[12px] font-semibold text-[#B91C1C] dark:text-[#F87171] tabular-nums bg-[#FDF2F2] dark:bg-[#2C1A19] border border-[#E9B8B8] dark:border-[#5C2926] px-3 py-1 rounded-lg">
          {matchingPoolCount} verfügbare Fragen
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="space-y-1">
          <label
            htmlFor={`rp-mode-${defaultSkill}`}
            className="text-[12px] font-semibold text-[#6B6560] dark:text-[#B5AEA5] block"
          >
            Übungsmodus
          </label>
          <select
            id={`rp-mode-${defaultSkill}`}
            value={mode}
            onChange={(e) => setMode(e.target.value as PracticeSelectionMode)}
            className="w-full min-h-[44px] px-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] text-[14px] text-[#1C1917] focus:border-[#B91C1C] focus:outline-none dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB]"
          >
            <option value="random">Zufällige Fragen</option>
            <option value="topic">Ganzes Thema üben</option>
            <option value="incorrect">Nur falsche Fragen</option>
            <option value="bookmarked">Nur gespeicherte Fragen</option>
          </select>
        </div>

        <div className="space-y-1">
          <label
            htmlFor={`rp-count-${defaultSkill}`}
            className="text-[12px] font-semibold text-[#6B6560] dark:text-[#B5AEA5] block"
          >
            Anzahl Fragen
          </label>
          <select
            id={`rp-count-${defaultSkill}`}
            value={mode === 'topic' ? 'all' : String(count)}
            disabled={mode === 'topic'}
            onChange={(e) => {
              const val = e.target.value;
              setCount(val === 'all' ? 'all' : (Number(val) as 10 | 20 | 30 | 50));
            }}
            className="w-full min-h-[44px] px-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] text-[14px] text-[#1C1917] focus:border-[#B91C1C] focus:outline-none disabled:opacity-60 dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB]"
          >
            <option value="10">10 Fragen</option>
            <option value="20">20 Fragen</option>
            <option value="30">30 Fragen</option>
            <option value="50">50 Fragen</option>
            <option value="all">Alle verfügbaren</option>
          </select>
        </div>

        <div className="space-y-1">
          <label
            htmlFor={`rp-topic-${defaultSkill}`}
            className="text-[12px] font-semibold text-[#6B6560] dark:text-[#B5AEA5] block"
          >
            Thema
          </label>
          <select
            id={`rp-topic-${defaultSkill}`}
            value={effectiveTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
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

        <div className="space-y-1">
          <label
            htmlFor={`rp-diff-${defaultSkill}`}
            className="text-[12px] font-semibold text-[#6B6560] dark:text-[#B5AEA5] block"
          >
            Schwierigkeit
          </label>
          <select
            id={`rp-diff-${defaultSkill}`}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as DifficultyLevel | 'Alle')}
            className="w-full min-h-[44px] px-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] text-[14px] text-[#1C1917] focus:border-[#B91C1C] focus:outline-none dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB]"
          >
            <option value="Alle">Alle Stufen</option>
            <option value="Leicht">Leicht</option>
            <option value="Mittel">Mittel</option>
            <option value="Anspruchsvoll">Anspruchsvoll</option>
          </select>
        </div>
      </div>

      {notice && (
        <p className="text-[13px] text-[#B45309] dark:text-[#FBBF24]" role="status">
          {notice}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
        <span className="text-[12px] text-[#6B6560] dark:text-[#B5AEA5]">
          {defaultLevel === 'Alle' ? 'Niveaus: A1–B2' : `Niveau: ${defaultLevel}`}
          {defaultSkill !== 'Alle' ? ` · Modul: ${defaultSkill}` : ''}
        </span>
        <TouchButton
          variant="primary"
          size="sm"
          disabled={matchingPoolCount === 0}
          onClick={handleLaunch}
        >
          <Sparkles className="w-4 h-4" />
          Training starten
        </TouchButton>
      </div>
    </section>
  );
}
