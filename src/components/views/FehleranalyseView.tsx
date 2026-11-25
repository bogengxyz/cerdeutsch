import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { findCombinedExerciseById, loadAllCombinedExercises } from '../../data/questionBank';
import { buildRandomPracticeExercise } from '../../services/randomPracticeService';
import { CEFRLevel, Exercise, ModuleSkill } from '../../types/exercise';
import { NavPage } from '../../types/learning';
import { MistakeRecord } from '../../types/phase4';
import { sanitizeExamBrandingText } from '../../utils/brandLabels';
import { TouchButton } from '../ui/TouchFlowPrimitives';

interface FehleranalyseViewProps {
  mistakes: MistakeRecord[];
  onToggleCorrected: (mistakeId: string) => void;
  onDeleteMistake: (mistakeId: string) => void;
  onStartExercise: (exercise: Exercise) => void;
  onNavigate: (page: NavPage) => void;
  recentQuestionIds?: string[];
}

const SKILL_LABELS: Record<ModuleSkill, string> = {
  lesen: 'Lesen',
  hoeren: 'Hören',
  sprechen: 'Sprechen',
  schreiben: 'Schreiben',
  grammatik: 'Grammatik',
  wortschatz: 'Wortschatz',
};

export function FehleranalyseView({
  mistakes,
  onToggleCorrected,
  onDeleteMistake,
  onStartExercise,
  onNavigate,
  recentQuestionIds = [],
}: FehleranalyseViewProps) {
  const [levelFilter, setLevelFilter] = useState<CEFRLevel | 'Alle'>('Alle');
  const [moduleFilter, setModuleFilter] = useState<ModuleSkill | 'Alle'>('Alle');
  const [topicFilter, setTopicFilter] = useState<string>('Alle');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'corrected'>('all');
  const [launchingPractice, setLaunchingPractice] = useState(false);

  const handlePracticeMistakes = async () => {
    setLaunchingPractice(true);
    try {
      const allExercises = await loadAllCombinedExercises();
      const built = buildRandomPracticeExercise({
        exercises: allExercises,
        mode: 'incorrect',
        count: 30,
        level: levelFilter,
        skill: moduleFilter,
        topic: effectiveTopicFilter,
        difficulty: 'Alle',
        mistakes,
        recentQuestionIds,
        includePendingAudio: true,
      });
      if (built) {
        onStartExercise(built);
      }
    } finally {
      setLaunchingPractice(false);
    }
  };

  const handleOpenMistakeExercise = async (mistake: MistakeRecord) => {
    const found = await findCombinedExerciseById(
      mistake.exerciseId,
      mistake.level,
      mistake.skill,
    );
    if (found) {
      onStartExercise(found);
    }
  };

  const availableTopics = useMemo(() => {
    const set = new Set<string>();
    for (const m of mistakes) {
      if (
        (levelFilter === 'Alle' || m.level === levelFilter) &&
        (moduleFilter === 'Alle' || m.skill === moduleFilter)
      ) {
        set.add(m.topic);
      }
    }
    return [...set].sort((a, b) => a.localeCompare(b, 'de'));
  }, [mistakes, levelFilter, moduleFilter]);

  const effectiveTopicFilter =
    topicFilter !== 'Alle' && !availableTopics.includes(topicFilter) ? 'Alle' : topicFilter;

  const filtered = useMemo(() => {
    return mistakes.filter((m) => {
      if (levelFilter !== 'Alle' && m.level !== levelFilter) return false;
      if (moduleFilter !== 'Alle' && m.skill !== moduleFilter) return false;
      if (effectiveTopicFilter !== 'Alle' && m.topic !== effectiveTopicFilter) return false;
      if (statusFilter === 'open' && m.corrected) return false;
      if (statusFilter === 'corrected' && !m.corrected) return false;
      return true;
    });
  }, [mistakes, levelFilter, moduleFilter, effectiveTopicFilter, statusFilter]);

  const openCount = mistakes.filter((m) => !m.corrected).length;
  const correctedCount = mistakes.filter((m) => m.corrected).length;

  const formatDate = (iso: string) => {
    const ms = Date.parse(iso);
    if (Number.isNaN(ms)) return '';
    return new Date(ms).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <h1 className="font-display text-2xl sm:text-[30px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Fehleranalyse
          </h1>
          <p className="text-[15px] leading-relaxed text-[#57524C] dark:text-[#C8C1B8]">
            Hier findest du falsch beantwortete Aufgaben aus objektiv bewerteten Übungen (Lesen,
            Hören, Grammatik und Wortschatz) mit Lösung, Erklärung und direkter Wiederholung.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[13px] tabular-nums">
          <span className="px-3.5 py-2 rounded-xl bg-[#FDF2F2] text-[#991B1B] border border-[#EED8D2] dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/40 font-semibold">
            {openCount} offen
          </span>
          <span className="px-3.5 py-2 rounded-xl bg-[#ECFDF5] text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/40 font-semibold">
            {correctedCount} korrigiert
          </span>
          {openCount > 0 && (
            <TouchButton
              variant="primary"
              size="sm"
              disabled={launchingPractice}
              onClick={() => void handlePracticeMistakes()}
            >
              <RotateCcw className="w-4 h-4" />
              {launchingPractice ? 'Wird geladen...' : 'Falsche Fragen jetzt üben'}
            </TouchButton>
          )}
        </div>
      </section>

      {/* Filters */}
      {mistakes.length > 0 && (
        <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-4 sm:p-5 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label
                htmlFor="mistake-level-filter"
                className="text-[12px] font-semibold text-[#6B6560] dark:text-[#A8A095] block"
              >
                Sprachniveau
              </label>
              <select
                id="mistake-level-filter"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value as CEFRLevel | 'Alle')}
                className="w-full min-h-[44px] px-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] text-[14px] text-[#1C1917] dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB]"
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
                htmlFor="mistake-module-filter"
                className="text-[12px] font-semibold text-[#6B6560] dark:text-[#A8A095] block"
              >
                Modul
              </label>
              <select
                id="mistake-module-filter"
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value as ModuleSkill | 'Alle')}
                className="w-full min-h-[44px] px-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] text-[14px] text-[#1C1917] dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB]"
              >
                <option value="Alle">Alle Module</option>
                <option value="lesen">Lesen</option>
                <option value="hoeren">Hören</option>
                <option value="grammatik">Grammatik</option>
                <option value="wortschatz">Wortschatz</option>
              </select>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="mistake-topic-filter"
                className="text-[12px] font-semibold text-[#6B6560] dark:text-[#A8A095] block"
              >
                Thema
              </label>
              <select
                id="mistake-topic-filter"
                value={effectiveTopicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="w-full min-h-[44px] px-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] text-[14px] text-[#1C1917] dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB]"
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
                htmlFor="mistake-status-filter"
                className="text-[12px] font-semibold text-[#6B6560] dark:text-[#A8A095] block"
              >
                Status
              </label>
              <select
                id="mistake-status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'open' | 'corrected')}
                className="w-full min-h-[44px] px-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] text-[14px] text-[#1C1917] dark:border-[#3A352F] dark:bg-[#262320] dark:text-[#F5F2EB]"
              >
                <option value="all">Alle ({mistakes.length})</option>
                <option value="open">Offen ({openCount})</option>
                <option value="corrected">Korrigiert ({correctedCount})</option>
              </select>
            </div>
          </div>
        </section>
      )}

      {/* Mistake List or Empty State */}
      {mistakes.length === 0 ? (
        <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-8 text-center space-y-4 border border-[#E6E0D4] dark:border-[#2E2A25]">
          <CheckCircle2 className="w-10 h-10 text-[#15803D] dark:text-emerald-400 mx-auto" />
          <div className="space-y-1.5 max-w-lg mx-auto">
            <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Noch keine gespeicherten Fehler
            </h2>
            <p className="text-[14px] leading-6 text-[#57524C] dark:text-[#C8C1B8]">
              Sobald du eine objektiv bewertete Übung abschließt und dort eine Antwort falsch ist,
              erscheint sie automatisch hier zur gezielten Nachbereitung. Persönliche Schreib- und
              Sprechentwürfe werden hier nicht als Fehler gespeichert.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <TouchButton variant="primary" size="sm" onClick={() => onNavigate('grammatik')}>
              Grammatik üben
              <ArrowRight className="w-4 h-4" />
            </TouchButton>
            <TouchButton variant="secondary" size="sm" onClick={() => onNavigate('lernen')}>
              Zum Lernzentrum
            </TouchButton>
          </div>
        </section>
      ) : filtered.length === 0 ? (
        <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-8 text-center space-y-3 border border-[#E6E0D4] dark:border-[#2E2A25]">
          <AlertCircle className="w-7 h-7 text-[#8E867C] mx-auto" />
          <p className="text-[15px] text-[#57524C] dark:text-[#C8C1B8]">
            Keine Fehlereinträge für die gewählten Filter gefunden.
          </p>
          <TouchButton
            variant="secondary"
            size="sm"
            onClick={() => {
              setLevelFilter('Alle');
              setModuleFilter('Alle');
              setTopicFilter('Alle');
              setStatusFilter('all');
            }}
          >
            Filter zurücksetzen
          </TouchButton>
        </section>
      ) : (
        <section className="space-y-4">
          {filtered.map((mistake) => {
            const dateStr = formatDate(mistake.recordedAt);

            return (
              <article
                key={mistake.id}
                className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 sm:p-6 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_1px_3px_rgba(28,25,23,0.04)] space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <p className="text-[12px] font-medium text-[#6B6560] dark:text-[#A8A095]">
                      {mistake.level} · {SKILL_LABELS[mistake.skill]} · {mistake.topic}
                      {dateStr ? ` · ${dateStr}` : ''}
                    </p>
                    <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      {mistake.originalQuestion}
                    </h2>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-lg text-[12px] font-semibold shrink-0 ${
                      mistake.corrected
                        ? 'bg-[#ECFDF5] text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'bg-[#FDF2F2] text-[#991B1B] dark:bg-red-950/40 dark:text-red-300'
                    }`}
                  >
                    {mistake.corrected ? 'Korrigiert' : 'Offen'}
                  </span>
                </div>

                {/* User Answer vs Correct Answer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px]">
                  <div className="rounded-xl bg-[#FDF2F2] dark:bg-red-950/30 border border-[#EED8D2] dark:border-red-900/40 p-3.5 space-y-0.5">
                    <p className="text-[12px] font-semibold text-[#B91C1C] dark:text-red-400">
                      Deine Antwort
                    </p>
                    <p className="text-[#7F1D1D] dark:text-red-100 font-medium">
                      {mistake.userAnswer || 'Keine Antwort'}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#ECFDF5] dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 p-3.5 space-y-0.5">
                    <p className="text-[12px] font-semibold text-[#15803D] dark:text-emerald-400">
                      Richtige Antwort
                    </p>
                    <p className="text-emerald-950 dark:text-emerald-100 font-medium">
                      {mistake.correctAnswer}
                    </p>
                  </div>
                </div>

                {/* Explanations & Grammar/Vocab Notes */}
                <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] p-4 space-y-2.5 border border-[#E6E0D4] dark:border-[#3A352F]">
                  {mistake.explanationDe && (
                    <p className="text-[13px] leading-5 text-[#4B453F] dark:text-[#D1CBC2]">
                      <strong>Erklärung (DE):</strong>{' '}
                      {sanitizeExamBrandingText(mistake.explanationDe)}
                    </p>
                  )}

                  <div className="space-y-1">
                    <p className="text-[12px] font-semibold text-[#B91C1C] dark:text-[#FCA5A5] flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                      Penjelasan (Bahasa Indonesia)
                    </p>
                    <p className="text-[14px] leading-6 text-[#1C1917] dark:text-[#F5F2EB]">
                      {sanitizeExamBrandingText(mistake.explanationId)}
                    </p>
                  </div>

                  {mistake.relatedGrammarTopic && (
                    <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8] pt-1.5 border-t border-[#E6E0D4] dark:border-[#3A352F]">
                      <strong>Grammatik-Hinweis:</strong> {mistake.relatedGrammarTopic}
                    </p>
                  )}

                  {mistake.relatedVocabulary && mistake.relatedVocabulary.length > 0 && (
                    <div className="pt-1.5 border-t border-[#E6E0D4] dark:border-[#3A352F] space-y-1">
                      <p className="text-[12px] font-semibold text-[#57524C] dark:text-[#C8C1B8] flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 shrink-0" />
                        Relevante Vokabeln
                      </p>
                      <p className="text-[13px] text-[#1C1917] dark:text-[#F5F2EB]">
                        {mistake.relatedVocabulary.map((v) => `${v.de} (${v.id})`).join(' · ')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <TouchButton
                      variant={mistake.corrected ? 'secondary' : 'primary'}
                      size="sm"
                      onClick={() => onToggleCorrected(mistake.id)}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {mistake.corrected ? 'Wieder als offen markieren' : 'Als korrigiert markieren'}
                    </TouchButton>

                    <TouchButton
                      variant="secondary"
                      size="sm"
                      onClick={() => void handleOpenMistakeExercise(mistake)}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Übung wiederholen
                    </TouchButton>
                  </div>

                  <TouchButton
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteMistake(mistake.id)}
                    aria-label="Fehlereintrag löschen"
                  >
                    <Trash2 className="w-4 h-4 text-[#B91C1C]" />
                    Löschen
                  </TouchButton>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
