import React from 'react';
import { ArrowLeft, ArrowRight, BookMarked, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { CEFR_LEVELS, SKILL_META, TOPIC_CURRICULUM } from '../../data/curriculum';
import { ALL_EXERCISES } from '../../data/exercises';
import { Exercise } from '../../types/exercise';
import { CEFRLevel, ModuleType, NavPage, SkillType, UserProgressState } from '../../types/learning';
import { calculateLevelProgressPercent, getLevelModuleCounts } from '../../utils/progress';
import { getNeutralModuleLabel, sanitizeExamBrandingText } from '../../utils/brandLabels';
import { SkillIcon, TouchButton, getEditorialLevelColor } from '../ui/TouchFlowPrimitives';

interface LernenViewProps {
  progress: UserProgressState;
  selectedLevel: CEFRLevel | null;
  onSelectLevel: (level: CEFRLevel | null) => void;
  onNavigateWithLevelFilter: (page: NavPage, level: CEFRLevel) => void;
  onStartExercise: (exercise: Exercise) => void;
  onNavigate?: (page: NavPage) => void;
}

export function LernenView({
  progress,
  selectedLevel,
  onSelectLevel,
  onNavigateWithLevelFilter,
  onStartExercise,
  onNavigate,
}: LernenViewProps) {
  if (selectedLevel) {
    const info = CEFR_LEVELS.find((l) => l.level === selectedLevel) ?? CEFR_LEVELS[0];
    const pct = calculateLevelProgressPercent(progress, info.level);
    const counts = getLevelModuleCounts(info.level);
    const levelTopics = TOPIC_CURRICULUM.filter((t) => t.level === info.level);
    const accent = getEditorialLevelColor(info.level);

    const modules: {
      key: ModuleType;
      title: string;
      description: string;
      countLabel: string;
    }[] = [
      {
        key: 'lesen',
        title: getNeutralModuleLabel('lesen'),
        description: SKILL_META.lesen.shortDescription,
        countLabel: `${counts.lesen} latihan`,
      },
      {
        key: 'hoeren',
        title: getNeutralModuleLabel('hoeren'),
        description: SKILL_META.hoeren.shortDescription,
        countLabel: `${counts.hoeren} latihan`,
      },
      {
        key: 'sprechen',
        title: getNeutralModuleLabel('sprechen'),
        description: SKILL_META.sprechen.shortDescription,
        countLabel: `${counts.sprechen} tugas`,
      },
      {
        key: 'schreiben',
        title: getNeutralModuleLabel('schreiben'),
        description: SKILL_META.schreiben.shortDescription,
        countLabel: `${counts.schreiben} tugas`,
      },
      {
        key: 'grammatik',
        title: 'Grammatik',
        description: 'Strukturierte Regeln und Grammatiktraining für dieses Niveau',
        countLabel: `${counts.grammatik} Einheiten`,
      },
      {
        key: 'wortschatz',
        title: 'Wortschatz',
        description: 'Wichtige Begriffe, Artikel und Wortschatz-Übungen nach Themen',
        countLabel: `${counts.wortschatz} Einheiten`,
      },
    ];

    return (
      <div className="space-y-8">
        <div>
          <TouchButton variant="ghost" size="sm" onClick={() => onSelectLevel(null)}>
            <ArrowLeft className="w-4 h-4" />
            Zurück zu allen Niveaustufen
          </TouchButton>
        </div>

        <section className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_2px_8px_rgba(28,25,23,0.05)] space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-[13px] font-semibold text-[#B91C1C] dark:text-[#EF4444]">
                {info.difficultyLabel} · ca. {info.estimatedHours} Lernstunden
              </p>
              <h1 className="font-display text-2xl sm:text-[30px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                {info.title}
              </h1>
              <p className="text-[15px] leading-relaxed text-[#57524C] dark:text-[#C8C1B8] max-w-2xl">
                {info.description}
              </p>
            </div>
            <div className="shrink-0 min-w-[170px] space-y-1.5 rounded-xl bg-[#FAF8F4] dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] p-3.5">
              <div className="flex items-center justify-between text-[13px] text-[#57524C] dark:text-[#C8C1B8] tabular-nums">
                <span>Niveau-Fortschritt</span>
                <span className="font-bold text-[#1C1917] dark:text-[#F5F2EB]">{pct} %</span>
              </div>
              <div className="w-full h-2.5 bg-[#E6E0D4] dark:bg-[#3A352F] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${pct}%`, backgroundColor: accent }}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EFEAE0] dark:border-[#2E2A25]">
            <p className="text-[13px] font-semibold text-[#6B6560] dark:text-[#A8A095] mb-1.5">
              Zentrale Themen auf Niveau {info.level}
            </p>
            <p className="text-[14px] text-[#1C1917] dark:text-[#F5F2EB]">
              {info.topics.join(' · ')}
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Lernmodule für {info.level}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            {modules.map((mod) => (
              <div
                key={mod.key}
                className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-[18px] border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_1px_3px_rgba(28,25,23,0.04)] flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#FDF2F2] dark:bg-[#2C1A19] border border-[#EED8D2] dark:border-[#4A2624] text-[#B91C1C] dark:text-[#EF4444] flex items-center justify-center">
                      {mod.key === 'grammatik' ? (
                        <Layers className="w-5 h-5" />
                      ) : mod.key === 'wortschatz' ? (
                        <BookMarked className="w-5 h-5" />
                      ) : (
                        <SkillIcon skill={mod.key as SkillType} className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-[13px] font-medium text-[#6B6560] dark:text-[#A8A095] tabular-nums">
                      {mod.countLabel}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      {mod.title}
                    </h3>
                    <p className="text-[14px] leading-5 text-[#57524C] dark:text-[#C8C1B8] mt-1">
                      {mod.description}
                    </p>
                  </div>
                </div>

                <TouchButton
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigateWithLevelFilter(mod.key as NavPage, info.level)}
                  className="w-full justify-between"
                >
                  <span>{mod.title} öffnen</span>
                  <ArrowRight className="w-4 h-4" />
                </TouchButton>
              </div>
            ))}
          </div>
        </section>

        {/* 10 Curriculum Topics */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Lehrplan & Themen ({levelTopics.length} Themen für {info.level})
            </h2>
            <p className="text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
              Jedes Thema enthält ein Lernziel, typische Redemittel und eine direkte Übungsempfehlung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
            {levelTopics.map((topicItem, idx) => {
              const topicKey = `${topicItem.level}:${topicItem.topic}`;
              const isTopicDone = progress.completedTopics.includes(topicKey);
              const matchedExercise =
                ALL_EXERCISES.find(
                  (ex) =>
                    ex.level === topicItem.level &&
                    ex.topic.toLowerCase() === topicItem.topic.toLowerCase(),
                ) ?? ALL_EXERCISES.find((ex) => ex.level === topicItem.level);

              return (
                <article
                  key={topicItem.id}
                  className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-3 text-[12px] text-[#6B6560] dark:text-[#A8A095]">
                      <span className="tabular-nums font-semibold text-[#B91C1C] dark:text-[#EF4444]">
                        Thema {idx + 1} · {topicItem.level}
                      </span>
                      {isTopicDone && (
                        <span className="inline-flex items-center gap-1 text-[#15803D] dark:text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          Abgeschlossen
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      {topicItem.topic}
                    </h3>
                    <p className="text-[14px] leading-5 text-[#1C1917] dark:text-[#F5F2EB]">
                      {topicItem.objectiveDe}
                    </p>
                    <p className="text-[13px] leading-5 text-[#57524C] dark:text-[#C8C1B8] bg-[#FAF8F4] dark:bg-[#262320] border border-[#EFEAE0] dark:border-[#342F2A] rounded-xl px-3.5 py-2.5">
                      {topicItem.shortMaterialDe}
                    </p>
                    <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">
                      <strong>Grammatikfokus:</strong> {topicItem.grammarFocus} ·{' '}
                      <strong>Schlüsselwörter:</strong> {topicItem.keyWords.join(', ')}
                    </p>
                  </div>

                  {matchedExercise && (
                    <div className="pt-3 border-t border-[#EFEAE0] dark:border-[#2E2A25] flex items-center justify-between gap-3">
                      <span className="text-[12px] text-[#6B6560] dark:text-[#A8A095] truncate">
                        Latihan: {sanitizeExamBrandingText(matchedExercise.title)}
                      </span>
                      <TouchButton
                        variant="secondary"
                        size="sm"
                        onClick={() => onStartExercise(matchedExercise)}
                      >
                        Üben
                        <ArrowRight className="w-4 h-4" />
                      </TouchButton>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="space-y-2 max-w-2xl">
        <h1 className="font-display text-2xl sm:text-[30px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          Lernen nach GER-Niveaustufen
        </h1>
        <p className="text-[15px] leading-relaxed text-[#57524C] dark:text-[#C8C1B8]">
          Wähle dein Sprachniveau von A1 bis B2, um gezielt Lesen, Hören, Sprechen, Schreiben,
          Grammatik und Wortschatz zu trainieren.
        </p>
      </section>

      {/* A0 Starter Card for Absolute Beginners */}
      {onNavigate && (
        <section
          aria-label="Zona Pemula A0 Erste Schritte"
          className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#FAF2DF] via-[#F6EBD0] to-[#EFE2C2] dark:from-[#262016] dark:via-[#2F271B] dark:to-[#382E1E] border border-[#E8D9B8] dark:border-[#4A3D28] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#B91C1C] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#B91C1C] text-white">
                  Zona Pemula (A0)
                </span>
                <span className="text-[13px] font-bold text-[#854D0E] dark:text-[#FCD34D]">
                  Belum Pernah Belajar Bahasa Jerman?
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Mulai dari Nol: Panduan Alfabet & 20 Kalimat Penyelamat
              </h3>
              <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8]">
                Kuasai cara baca huruf Jerman, bunyi vokal unik (ä, ö, ü, ß), dan 3 aturan dasar kalimat sebelum masuk ke A1.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('a0')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-[13.5px] font-bold transition-all cursor-pointer whitespace-nowrap self-start sm:self-center shadow-xs"
          >
            <span>Buka Modul A0</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
        {CEFR_LEVELS.map((lvl) => {
          const pct = calculateLevelProgressPercent(progress, lvl.level);
          const counts = getLevelModuleCounts(lvl.level);
          const accent = getEditorialLevelColor(lvl.level);
          const availableCount =
            counts.lesen +
            counts.hoeren +
            counts.sprechen +
            counts.schreiben +
            counts.grammatik +
            counts.wortschatz;

          return (
            <article
              key={lvl.level}
              className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_1px_3px_rgba(28,25,23,0.04)] flex flex-col justify-between gap-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] font-semibold text-[#B91C1C] dark:text-[#EF4444]">
                    {lvl.difficultyLabel} · {lvl.topics.length} Themenbereiche
                  </span>
                  <span className="text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8] tabular-nums">
                    {availableCount} Einträge
                  </span>
                </div>

                <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                  {lvl.title}
                </h2>
                <p className="text-[15px] leading-6 text-[#57524C] dark:text-[#C8C1B8]">
                  {lvl.description}
                </p>
                <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095]">
                  Themen: {lvl.topics.join(' · ')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[13px] text-[#6B6560] dark:text-[#A8A095] tabular-nums">
                    <span>Fortschritt</span>
                    <span className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">{pct} %</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#EFEAE0] dark:bg-[#332E27] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${pct}%`, backgroundColor: accent }}
                    />
                  </div>
                </div>

                <TouchButton
                  variant="primary"
                  size="md"
                  onClick={() => onSelectLevel(lvl.level)}
                  className="w-full"
                >
                  Lernen starten
                  <ArrowRight className="w-4 h-4" />
                </TouchButton>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
