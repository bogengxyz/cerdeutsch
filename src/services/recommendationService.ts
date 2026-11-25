import { GRAMMAR_TOPICS, getLevelFromVocabId } from '../data/curriculum';
import { ALL_EXERCISES } from '../data/exercises';
import { ExamAttemptRecord } from '../types/exam';
import { CEFRLevel, ModuleSkill } from '../types/exercise';
import { NavPage, UserProgressState } from '../types/learning';
import {
  FlashcardReviewRecord,
  LearningRecommendation,
  MistakeRecord,
} from '../types/phase4';
import { isFlashcardDue } from './spacedRepetitionService';

const SKILL_NAV_MAP: Record<ModuleSkill, NavPage> = {
  lesen: 'lesen',
  hoeren: 'hoeren',
  sprechen: 'sprechen',
  schreiben: 'schreiben',
  grammatik: 'grammatik',
  wortschatz: 'wortschatz',
};

const SKILL_LABELS: Record<ModuleSkill, string> = {
  lesen: 'Lesen',
  hoeren: 'Hören',
  sprechen: 'Sprechen',
  schreiben: 'Schreiben',
  grammatik: 'Grammatik',
  wortschatz: 'Wortschatz',
};

/**
 * Generates deterministic, transparent German learning recommendations based purely
 * on local user data. Returns an empty array when there is insufficient data.
 */
export function generateLearningRecommendations(params: {
  progress: UserProgressState;
  mistakes: MistakeRecord[];
  srsSchedule: Record<string, FlashcardReviewRecord>;
  examHistory: ExamAttemptRecord[];
  nowMs?: number;
}): LearningRecommendation[] {
  const { progress, mistakes, srsSchedule, examHistory, nowMs = Date.now() } = params;

  const totalSignals =
    progress.completedExerciseIds.length +
    progress.completedGrammarIds.length +
    mistakes.length +
    Object.keys(srsSchedule).length +
    examHistory.length;

  // Do not generate recommendations when user data is insufficient
  if (totalSignals === 0) {
    return [];
  }

  const recommendations: LearningRecommendation[] = [];

  // 1. Open mistakes by topic / skill (highest priority)
  const openMistakes = mistakes.filter((m) => !m.corrected);
  if (openMistakes.length > 0) {
    const topicCounts = new Map<string, { count: number; sample: MistakeRecord }>();
    for (const m of openMistakes) {
      const key = `${m.level}::${m.skill}::${m.topic}`;
      const prev = topicCounts.get(key);
      if (prev) {
        prev.count += 1;
      } else {
        topicCounts.set(key, { count: 1, sample: m });
      }
    }

    const sortedTopics = [...topicCounts.values()].sort((a, b) => b.count - a.count);
    const topMistakeGroup = sortedTopics[0];
    if (topMistakeGroup) {
      const { count, sample } = topMistakeGroup;
      const relatedGrammar = GRAMMAR_TOPICS.find(
        (g) =>
          g.level === sample.level &&
          (g.relatedExerciseId === sample.exerciseId ||
            sample.relatedGrammarTopic?.toLowerCase().includes(g.title.toLowerCase())),
      );

      recommendations.push({
        id: `rec-mistake-${sample.level}-${sample.topic}`,
        priority: 'high',
        targetPage: 'fehleranalyse',
        targetLevel: sample.level,
        targetExerciseId: sample.exerciseId,
        targetGrammarId: relatedGrammar?.id,
        titleDe: `Wiederhole ${sample.topic} (${sample.level} · ${SKILL_LABELS[sample.skill]})`,
        reasonDe: `Empfehlung: Wiederhole die Übungen zu „${sample.topic}“, weil du bei diesem Thema zuletzt ${
          count === 1 ? 'einen offenen Fehler' : `${count} offene Fehler`
        } gemacht hast.`,
        actionLabelDe: 'Fehleranalyse öffnen',
      });
    }
  }

  // 2. Due flashcards in personal spaced repetition scheduler
  const dueRecords = Object.values(srsSchedule).filter((r) => isFlashcardDue(r, nowMs));
  if (dueRecords.length > 0) {
    const firstLevel = getLevelFromVocabId(dueRecords[0].vocabId) ?? 'A1';
    recommendations.push({
      id: 'rec-srs-due',
      priority: dueRecords.length >= 5 ? 'high' : 'medium',
      targetPage: 'wortschatz',
      targetLevel: firstLevel,
      titleDe: `${dueRecords.length} fällige Karteikarte${dueRecords.length === 1 ? '' : 'n'} wiederholen`,
      reasonDe: `Empfehlung: Im Wortschatz stehen ${dueRecords.length} Vokabelkarten zur persönlichen Wiederholung an, damit die Begriffe aktiv im Gedächtnis bleiben.`,
      actionLabelDe: 'Karteikarten starten',
    });
  }

  // 3. Lowest objective accuracy module (only if at least one objective exercise scored < 80%)
  const completedObjectiveEntries = Object.entries(progress.exerciseScores).flatMap(
    ([exId, rec]) => {
      const ex = ALL_EXERCISES.find((e) => e.id === exId);
      if (!ex || ex.skill === 'schreiben' || ex.skill === 'sprechen') {
        return [];
      }
      return [{ exercise: ex, record: rec }];
    },
  );

  if (completedObjectiveEntries.length > 0) {
    const bySkill = new Map<ModuleSkill, { sum: number; count: number; lowestExId: string; level: CEFRLevel }>();
    for (const { exercise, record } of completedObjectiveEntries) {
      const cur = bySkill.get(exercise.skill);
      if (cur) {
        cur.sum += record.percentage;
        cur.count += 1;
      } else {
        bySkill.set(exercise.skill, {
          sum: record.percentage,
          count: 1,
          lowestExId: exercise.id,
          level: exercise.level,
        });
      }
    }

    const averages = [...bySkill.entries()]
      .map(([skill, data]) => ({
        skill,
        avg: Math.round(data.sum / data.count),
        lowestExId: data.lowestExId,
        level: data.level,
      }))
      .sort((a, b) => a.avg - b.avg);

    const weakest = averages[0];
    if (weakest && weakest.avg < 80) {
      recommendations.push({
        id: `rec-weak-skill-${weakest.skill}`,
        priority: 'medium',
        targetPage: SKILL_NAV_MAP[weakest.skill],
        targetLevel: weakest.level,
        titleDe: `Modul ${SKILL_LABELS[weakest.skill]} gezielt stärken`,
        reasonDe: `Empfehlung: Dein aktueller Durchschnitt in „${SKILL_LABELS[weakest.skill]}“ liegt bei ${weakest.avg} %. Eine weitere Übung auf Niveau ${weakest.level} festigt dieses Modul.`,
        actionLabelDe: `${SKILL_LABELS[weakest.skill]} öffnen`,
      });
    }
  }

  // 4. Next uncompleted grammar or reading/writing exercise at current level
  if (recommendations.length < 3) {
    const nextGrammar = GRAMMAR_TOPICS.find(
      (g) => g.level === progress.currentLevel && !progress.completedGrammarIds.includes(g.id),
    );
    if (nextGrammar) {
      recommendations.push({
        id: `rec-next-grammar-${nextGrammar.id}`,
        priority: 'low',
        targetPage: 'grammatik',
        targetLevel: nextGrammar.level,
        targetGrammarId: nextGrammar.id,
        titleDe: `Nächstes Grammatikthema: ${nextGrammar.title}`,
        reasonDe: `Empfehlung: Auf deinem aktuellen Niveau ${progress.currentLevel} ist das Thema „${nextGrammar.title}“ noch offen.`,
        actionLabelDe: 'Zur Grammatik',
      });
    } else {
      const nextExercise = ALL_EXERCISES.find(
        (ex) =>
          ex.level === progress.currentLevel &&
          !progress.completedExerciseIds.includes(ex.id),
      );
      if (nextExercise) {
        recommendations.push({
          id: `rec-next-ex-${nextExercise.id}`,
          priority: 'low',
          targetPage: SKILL_NAV_MAP[nextExercise.skill],
          targetLevel: nextExercise.level,
          targetExerciseId: nextExercise.id,
          titleDe: `Neue Übung: ${nextExercise.title}`,
          reasonDe: `Empfehlung: Setze deinen Lernpfad auf Niveau ${progress.currentLevel} mit dieser noch unbearbeiteten Aufgabe im Modul ${SKILL_LABELS[nextExercise.skill]} fort.`,
          actionLabelDe: 'Übung ansehen',
        });
      }
    }
  }

  return recommendations.slice(0, 4);
}
