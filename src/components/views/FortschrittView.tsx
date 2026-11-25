import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookMarked,
  CheckCircle2,
  Clock,
  Compass,
  Headphones,
  Info,
  Mic,
  PenLine,
  ShieldCheck,
} from 'lucide-react';
import { CEFR_LEVELS, GRAMMAR_TOPICS, SKILL_META } from '../../data/curriculum';
import { ALL_EXERCISES, getExerciseById } from '../../data/exercises';
import { validateAllContent } from '../../services/contentValidationService';
import {
  getDueFlashcardCount,
  getLearnedVocabularyCount,
} from '../../services/spacedRepetitionService';
import { ExamAttemptRecord } from '../../types/exam';
import { Exercise, ModuleSkill } from '../../types/exercise';
import { NavPage, SkillType, UserProgressState } from '../../types/learning';
import {
  FlashcardReviewRecord,
  LearningRecommendation,
  MistakeRecord,
  WritingSpeakingHistoryEntry,
} from '../../types/phase4';
import {
  calculateLevelProgressPercent,
  calculateOverallProgressPercent,
} from '../../utils/progress';
import {
  getNeutralExamTitle,
  sanitizeExamBrandingText,
} from '../../utils/brandLabels';
import {
  ModalSheet,
  SkillIcon,
  TouchButton,
  getEditorialLevelColor,
} from '../ui/TouchFlowPrimitives';

interface FortschrittViewProps {
  progress: UserProgressState;
  mistakes: MistakeRecord[];
  srsSchedule: Record<string, FlashcardReviewRecord>;
  practiceHistory: WritingSpeakingHistoryEntry[];
  examHistory: ExamAttemptRecord[];
  recommendations: LearningRecommendation[];
  onNavigate: (page: NavPage) => void;
  onStartExercise: (exercise: Exercise) => void;
  onOpenRecommendation: (rec: LearningRecommendation) => void;
}

export function FortschrittView({
  progress,
  mistakes,
  srsSchedule,
  practiceHistory,
  examHistory,
  recommendations,
  onNavigate,
  onStartExercise,
  onOpenRecommendation,
}: FortschrittViewProps) {
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  const overallPercent = calculateOverallProgressPercent(progress);
  const skills: SkillType[] = ['lesen', 'hoeren', 'sprechen', 'schreiben'];
  const skillColors: Record<SkillType, string> = {
    lesen: '#B91C1C',
    hoeren: '#15803D',
    sprechen: '#B45309',
    schreiben: '#1C1917',
  };

  const objectiveBreakdown = useMemo(() => {
    const modules: { skill: ModuleSkill; label: string }[] = [
      { skill: 'lesen', label: 'Lesen' },
      { skill: 'hoeren', label: 'Hören' },
      { skill: 'grammatik', label: 'Grammatik' },
      { skill: 'wortschatz', label: 'Wortschatz' },
    ];

    return modules.map(({ skill, label }) => {
      const matching = ALL_EXERCISES.filter(
        (ex) => ex.skill === skill && progress.exerciseScores[ex.id],
      );
      if (matching.length === 0) {
        return { skill, label, count: 0, averagePercent: null as number | null };
      }
      const totalPct = matching.reduce(
        (sum, ex) => sum + (progress.exerciseScores[ex.id]?.percentage ?? 0),
        0,
      );
      return {
        skill,
        label,
        count: matching.length,
        averagePercent: Math.round(totalPct / matching.length),
      };
    });
  }, [progress.exerciseScores]);

  const writingHistory = useMemo(
    () => practiceHistory.filter((entry) => entry.skill === 'schreiben'),
    [practiceHistory],
  );
  const speakingHistory = useMemo(
    () => practiceHistory.filter((entry) => entry.skill === 'sprechen'),
    [practiceHistory],
  );

  const openMistakes = useMemo(() => mistakes.filter((m) => !m.corrected), [mistakes]);
  const dueCardsCount = useMemo(
    () => getDueFlashcardCount(srsSchedule),
    [srsSchedule],
  );
  const learnedVocabCount = useMemo(() => getLearnedVocabularyCount(srsSchedule), [srsSchedule]);

  const contentAudit = useMemo(() => (auditModalOpen ? validateAllContent() : null), [auditModalOpen]);

  return (
    <div className="space-y-8">
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <h1 className="font-display text-2xl sm:text-[30px] font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Lernfortschritt & Analyse
          </h1>
          <p className="text-[15px] leading-relaxed text-[#57524C] dark:text-[#C8C1B8]">
            Getrennte Auswertung für objektiv bewertete Übungen, Selbstkontrollen (Schreiben &
            Sprechen), Prüfungssimulationen und Wortschatz-Wiederholungen.
          </p>
        </div>

        <TouchButton variant="secondary" size="sm" onClick={() => setAuditModalOpen(true)}>
          <ShieldCheck className="w-4 h-4 text-[#B91C1C] dark:text-[#EF4444]" />
          Inhalts- & Audio-Audit
        </TouchButton>
      </section>

      {/* Overall Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] shadow-[0_2px_8px_rgba(28,25,23,0.05)] space-y-2">
          <p className="text-[13px] font-medium text-[#6B6560] dark:text-[#A8A095]">
            Gesamtfortschritt
          </p>
          <p className="font-display text-3xl font-bold text-[#B91C1C] dark:text-[#EF4444] tabular-nums">
            {overallPercent} %
          </p>
          <div className="w-full h-2.5 bg-[#EFEAE0] dark:bg-[#332E27] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B91C1C] dark:bg-[#DC2626] rounded-full transition-all duration-300"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-1.5">
          <p className="text-[13px] font-medium text-[#6B6560] dark:text-[#A8A095]">
            Absolvierte Übungen
          </p>
          <p className="font-display text-3xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
            {progress.completedExerciseIds.length} / {ALL_EXERCISES.length}
          </p>
          <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095]">
            Alle 6 Module (A1–B2)
          </p>
        </div>

        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-1.5">
          <p className="text-[13px] font-medium text-[#6B6560] dark:text-[#A8A095]">
            Grammatik & Wortschatz
          </p>
          <p className="font-display text-3xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
            {progress.completedGrammarIds.length} / {GRAMMAR_TOPICS.length}
          </p>
          <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095] tabular-nums">
            {learnedVocabCount} Wörter geübt · {dueCardsCount} fällig
          </p>
        </div>

        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-1.5">
          <p className="text-[13px] font-medium text-[#6B6560] dark:text-[#A8A095]">
            Offene Fehler & Prüfungen
          </p>
          <p className="font-display text-3xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
            {openMistakes.length}
          </p>
          <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095] tabular-nums">
            offene Fehler · {examHistory.length}{' '}
            {examHistory.length === 1 ? 'Prüfungsversuch' : 'Prüfungsversuche'}
          </p>
        </div>
      </section>

      {/* Rule-based Personal Learning Recommendations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#B91C1C] dark:text-[#EF4444]" />
            <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Persönliche Lernempfehlungen
            </h2>
          </div>
          <span className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">
            Regelbasiert aus lokalen Lerndaten
          </span>
        </div>

        {recommendations.length === 0 ? (
          <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] text-[14px] text-[#57524C] dark:text-[#C8C1B8]">
            Noch nicht genügend lokale Lerndaten für persönliche Empfehlungen vorhanden. Bearbeite
            einige Übungen oder Karteikarten, um hier konkrete nächste Schritte zu erhalten.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
            {recommendations.map((rec) => (
              <article
                key={rec.id}
                className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] flex flex-col justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <p className="text-[12px] font-semibold text-[#B91C1C] dark:text-[#FCA5A5]">
                    {rec.priority === 'high'
                      ? 'Wichtiger nächster Schritt'
                      : rec.priority === 'medium'
                        ? 'Empfohlene Vertiefung'
                        : 'Weiterlernen'}
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                    {rec.titleDe}
                  </h3>
                  <p className="text-[14px] leading-5 text-[#57524C] dark:text-[#C8C1B8]">
                    {rec.reasonDe}
                  </p>
                </div>
                <div className="flex justify-end">
                  <TouchButton
                    variant="primary"
                    size="sm"
                    onClick={() => onOpenRecommendation(rec)}
                  >
                    {rec.actionLabelDe}
                    <ArrowRight className="w-4 h-4" />
                  </TouchButton>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Progress by CEFR Level & Objective Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-5">
          <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Fortschritt nach Niveaustufe
          </h2>
          <div className="space-y-4">
            {CEFR_LEVELS.map((lvl) => {
              const pct = calculateLevelProgressPercent(progress, lvl.level);
              const accent = getEditorialLevelColor(lvl.level);
              return (
                <div key={lvl.level} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="font-medium text-[#1C1917] dark:text-[#F5F2EB]">
                      {lvl.title}
                    </span>
                    <span className="font-semibold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
                      {pct} %
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#EFEAE0] dark:bg-[#332E27] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${pct}%`, backgroundColor: accent }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Separated Objective Accuracy */}
        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-6 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Objektive Übungsgenauigkeit
            </h2>
            <Award className="w-5 h-5 text-[#B91C1C] dark:text-[#EF4444] shrink-0" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {objectiveBreakdown.map((item) => (
              <div
                key={item.skill}
                className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] p-4 border border-[#E6E0D4] dark:border-[#3A352F] space-y-1"
              >
                <p className="text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8]">
                  {item.label}
                </p>
                <p className="font-display text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
                  {item.averagePercent !== null ? `${item.averagePercent} %` : '—'}
                </p>
                <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095] tabular-nums">
                  {item.count > 0
                    ? `${item.count} ${item.count === 1 ? 'Übung' : 'Übungen'} ausgewertet`
                    : 'Noch keine Übung abgeschlossen'}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {skills.map((skill) => {
              const score = progress.skillScores[skill];
              const radius = 24;
              const circumference = 2 * Math.PI * radius;
              const offset = circumference * (1 - score / 100);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => onNavigate(skill)}
                  className="rounded-xl p-2.5 flex flex-col items-center gap-2 text-center hover:bg-[#FAF8F4] dark:hover:bg-[#262320] transition-colors cursor-pointer"
                >
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 60 60" aria-hidden="true">
                      <circle
                        cx="30"
                        cy="30"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        className="text-[#E6E0D4] dark:text-[#3A352F]"
                      />
                      <circle
                        cx="30"
                        cy="30"
                        r={radius}
                        fill="none"
                        stroke={skillColors[skill]}
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                      />
                    </svg>
                    <span className="absolute font-display text-xs font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
                      {score}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[12px] font-semibold text-[#57524C] dark:text-[#C8C1B8]">
                    <SkillIcon skill={skill} className="w-3.5 h-3.5 text-[#6B6560]" />
                    <span>{SKILL_META[skill].title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Writing & Speaking Self-Assessment History + Exam Simulation Summary */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-[18px]">
        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
              <PenLine className="w-4 h-4 text-[#B91C1C]" />
              Schreiben (Selbstkontrolle)
            </h2>
            <span className="text-[12px] font-semibold text-[#6B6560] tabular-nums">
              {writingHistory.length}
            </span>
          </div>
          {writingHistory.length === 0 ? (
            <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095]">
              Noch keine Schreibaufgaben mit Checkliste abgeschlossen.
            </p>
          ) : (
            <ul className="space-y-2.5 text-[13px]">
              {writingHistory.slice(0, 4).map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] p-3 border border-[#E6E0D4] dark:border-[#3A352F]"
                >
                  <p className="font-semibold text-[#1C1917] dark:text-[#F5F2EB] truncate">
                    {entry.level} · {entry.title}
                  </p>
                  <p className="text-[#6B6560] dark:text-[#A8A095] tabular-nums mt-0.5">
                    {entry.wordCount ?? 0} Wörter · Checkliste {entry.selfCheckCompleted}/
                    {entry.selfCheckTotal} ({entry.selfCheckPercent} %)
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
              <Mic className="w-4 h-4 text-[#B45309]" />
              Sprechen (Selbstkontrolle)
            </h2>
            <span className="text-[12px] font-semibold text-[#6B6560] tabular-nums">
              {speakingHistory.length}
            </span>
          </div>
          {speakingHistory.length === 0 ? (
            <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095]">
              Noch keine Sprechaufgaben mit Selbstbewertung abgeschlossen.
            </p>
          ) : (
            <ul className="space-y-2.5 text-[13px]">
              {speakingHistory.slice(0, 4).map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] p-3 border border-[#E6E0D4] dark:border-[#3A352F]"
                >
                  <p className="font-semibold text-[#1C1917] dark:text-[#F5F2EB] truncate">
                    {entry.level} · {entry.title}
                  </p>
                  <p className="text-[#6B6560] dark:text-[#A8A095] tabular-nums mt-0.5">
                    Checkliste {entry.selfCheckCompleted}/{entry.selfCheckTotal} (
                    {entry.selfCheckPercent} %)
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl p-5 border border-[#E6E0D4] dark:border-[#2E2A25] space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-[#B91C1C]" />
              Prüfungssimulationen
            </h2>
            <span className="text-[12px] font-semibold text-[#6B6560] tabular-nums">
              {examHistory.length}
            </span>
          </div>
          {examHistory.length === 0 ? (
            <div className="space-y-2.5">
              <p className="text-[13px] text-[#6B6560] dark:text-[#A8A095]">
                Belum ada simulasi ujian yang dikirim.
              </p>
              <TouchButton variant="secondary" size="sm" onClick={() => onNavigate('pruefung')}>
                Mulai Simulasi
              </TouchButton>
            </div>
          ) : (
            <ul className="space-y-2.5 text-[13px]">
              {examHistory.slice(0, 3).map((attempt) => (
                <li
                  key={attempt.attemptId}
                  className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] p-3 border border-[#E6E0D4] dark:border-[#3A352F]"
                >
                  <p className="font-semibold text-[#1C1917] dark:text-[#F5F2EB] truncate">
                    {getNeutralExamTitle(attempt.provider, attempt.level)}
                  </p>
                  <p className="text-[#6B6560] dark:text-[#A8A095] tabular-nums mt-0.5">
                    Hasil objektif: {attempt.evaluation.objectivePercentage} % (
                    {attempt.evaluation.objectiveEarnedPoints}/
                    {attempt.evaluation.objectiveMaxPoints} poin)
                  </p>
                </li>
              ))}
            </ul>
          )}
          <p className="text-[11px] text-[#6B6560] dark:text-[#A8A095]">
            Simulasi latihan mandiri ini bukan sertifikat ujian resmi lembaga mana pun.
          </p>
        </div>
      </section>

      {/* Open Mistakes Preview */}
      {openMistakes.length > 0 && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#B91C1C]" />
              <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Offene Fehler zur Wiederholung ({openMistakes.length})
              </h2>
            </div>
            <TouchButton variant="secondary" size="sm" onClick={() => onNavigate('fehleranalyse')}>
              Alle Fehler öffnen
              <ArrowRight className="w-4 h-4" />
            </TouchButton>
          </div>

          <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] overflow-hidden">
            <ul className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25]">
              {openMistakes.slice(0, 5).map((mistake) => {
                const ex = getExerciseById(mistake.exerciseId);
                return (
                  <li
                    key={mistake.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <p className="text-[12px] font-medium text-[#6B6560] dark:text-[#A8A095]">
                        {mistake.level} · {mistake.skill.toUpperCase()} · {mistake.topic}
                      </p>
                      <p className="text-[15px] font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                        {mistake.originalQuestion}
                      </p>
                      <p className="text-[13px] text-[#57524C] dark:text-[#C8C1B8]">
                        <span className="text-[#B91C1C] dark:text-red-400">
                          Deine Antwort: {mistake.userAnswer}
                        </span>{' '}
                        ·{' '}
                        <span className="text-[#15803D] dark:text-emerald-400">
                          Richtig: {mistake.correctAnswer}
                        </span>
                      </p>
                    </div>
                    {ex && (
                      <TouchButton
                        variant="secondary"
                        size="sm"
                        onClick={() => onStartExercise(ex)}
                      >
                        Wiederholen
                        <ArrowRight className="w-4 h-4" />
                      </TouchButton>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Activity History */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          Aktivitätsverlauf
        </h2>
        <div className="bg-white dark:bg-[#1F1D1A] rounded-2xl border border-[#E6E0D4] dark:border-[#2E2A25] overflow-hidden">
          {progress.recentActivities.length === 0 ? (
            <div className="p-8 text-center space-y-3">
              <Clock className="w-6 h-6 text-[#8E867C] mx-auto" />
              <p className="text-[15px] text-[#57524C] dark:text-[#C8C1B8]">
                Es wurden noch keine Aktivitäten aufgezeichnet.
              </p>
              <TouchButton variant="primary" size="sm" onClick={() => onNavigate('lernen')}>
                Jetzt lernen
              </TouchButton>
            </div>
          ) : (
            <ul className="divide-y divide-[#EFEAE0] dark:divide-[#2E2A25]">
              {progress.recentActivities.map((act) => (
                <li
                  key={act.id}
                  className="min-h-[58px] px-5 py-3.5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <CheckCircle2 className="w-5 h-5 text-[#15803D] dark:text-emerald-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[15px] font-medium text-[#1C1917] dark:text-[#F5F2EB] truncate">
                        {act.title}
                      </p>
                      <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">
                        Niveau {act.level} · {act.timestampLabel}
                      </p>
                    </div>
                  </div>
                  <span className="text-[13px] font-semibold text-[#57524C] dark:text-[#C8C1B8] tabular-nums shrink-0">
                    {act.scoreLabel}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Content & Audio Asset Audit Modal */}
      <ModalSheet
        open={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
        title="Qualitätsprüfung & Audio-Audit"
        subtitle="Transparente Prüfung der lokalen Lerninhalte, Antwort-Schlüssel und Hördateien."
      >
        {contentAudit && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] p-3">
                <p className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
                  {contentAudit.totalExercises}
                </p>
                <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">Übungen</p>
              </div>
              <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] p-3">
                <p className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
                  {contentAudit.totalQuestions}
                </p>
                <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">Aufgaben</p>
              </div>
              <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] p-3">
                <p className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
                  {contentAudit.totalGrammarTopics}
                </p>
                <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">Grammatik</p>
              </div>
              <div className="rounded-xl bg-[#FAF8F4] dark:bg-[#262320] border border-[#E6E0D4] dark:border-[#3A352F] p-3">
                <p className="font-display text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] tabular-nums">
                  {contentAudit.totalVocabulary}
                </p>
                <p className="text-[12px] text-[#6B6560] dark:text-[#A8A095]">Vokabeln</p>
              </div>
            </div>

            <div
              className={`rounded-xl p-4 flex items-start gap-2.5 text-[14px] ${
                contentAudit.valid
                  ? 'bg-[#ECFDF5] text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200'
                  : 'bg-[#FDF2F2] text-red-900 dark:bg-red-950/40 dark:text-red-200'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">
                  {contentAudit.valid
                    ? 'Datenbank-Validierung bestanden (0 Strukturfehler)'
                    : `${contentAudit.errors.length} Strukturfehler gefunden`}
                </p>
                {contentAudit.errors.length > 0 && (
                  <ul className="list-disc pl-5 mt-1 text-[13px]">
                    {contentAudit.errors.map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[14px] font-semibold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-[#B91C1C]" />
                  Status der Hörtext-Audiodateien
                </p>
                <span className="text-[12px] text-[#6B6560] tabular-nums">
                  {contentAudit.availableAudioCount} verfügbar · {contentAudit.missingAudioCount}{' '}
                  nicht verfügbar
                </span>
              </div>

              <div className="rounded-xl bg-[#FAF2DF] dark:bg-[#252017] border border-[#EADBC0] dark:border-[#3A3122] p-3 text-[13px] text-[#4B453F] dark:text-[#D1CBC2] flex items-start gap-2">
                <Info className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                <span>
                  Fehlende Audiodateien werden ehrlich als „Audio nicht verfügbar“ angezeigt und
                  nicht durch künstliche Sprachsynthese ersetzt.
                </span>
              </div>

              <div className="max-h-60 overflow-y-auto divide-y divide-[#EFEAE0] dark:divide-[#2E2A25] rounded-xl border border-[#E6E0D4] dark:border-[#2E2A25]">
                {contentAudit.audioAudit.map((item) => (
                  <div
                    key={item.id}
                    className="px-3.5 py-2.5 flex items-center justify-between gap-3 text-[13px]"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-[#1C1917] dark:text-[#F5F2EB] truncate">
                        {item.level} · {sanitizeExamBrandingText(item.title)}
                      </p>
                      <p className="text-[11px] text-[#6B6560] dark:text-[#A8A095]">
                        {item.source === 'exam' ? 'Prüfungsteil' : 'Lernübung'}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold shrink-0 ${
                        item.status === 'available'
                          ? 'bg-[#ECFDF5] text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : 'bg-[#FEF3C7] text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                      }`}
                    >
                      {item.status === 'available' ? 'Verfügbar' : 'Audio nicht verfügbar'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <TouchButton variant="primary" size="sm" onClick={() => setAuditModalOpen(false)}>
                Schließen
              </TouchButton>
            </div>
          </div>
        )}
      </ModalSheet>
    </div>
  );
}
