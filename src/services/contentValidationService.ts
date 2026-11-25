import { resolveAudioStatusForPath } from '../data/audioManifest';
import { GRAMMAR_TOPICS, TOTAL_VOCABULARY_COUNT } from '../data/curriculum';
import { getLoadedVocabulary, loadAllVocabulary } from '../data/vocabulary';
import { ALL_EXAM_CONFIGURATIONS } from '../data/exams';
import { ALL_EXERCISES } from '../data/exercises';
import { loadAllCombinedExercises } from '../data/questionBank';
import { ExamConfiguration } from '../types/exam';
import { CEFRLevel, DifficultyLevel, Exercise } from '../types/exercise';
import { GrammarTopic } from '../types/learning';
import {
  AudioAssetAuditItem,
  ContentAuditReport,
  LevelQuestionBankRow,
  QuestionBankAuditReport,
} from '../types/phase4';
import { VocabularyEntry } from '../types/vocabulary';
import { buildAudioCoverageReport } from './audioCoverageService';
import { isObjectiveQuestionType, validateExerciseDatabase } from './scoringService';

const VALID_LEVELS = new Set<CEFRLevel>(['A1', 'A2', 'B1', 'B2']);
const VALID_ARTICLES = new Set(['der', 'die', 'das']);
const VALID_DIFFICULTIES = new Set<DifficultyLevel>(['Leicht', 'Mittel', 'Anspruchsvoll']);

function normalizeFingerprint(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function buildQuestionBankAuditReport(
  exercises: Exercise[],
): QuestionBankAuditReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  const exReport = validateExerciseDatabase(exercises);
  errors.push(...exReport.errors);

  const seenExIds = new Set<string>();
  const seenQIds = new Set<string>();
  const seenNearFingerprints = new Set<string>();

  let duplicateIdsCount = 0;
  let nearDuplicateCount = 0;
  let invalidQuestionsCount = 0;
  let missingAudioFilesCount = 0;

  const rowMap: Record<CEFRLevel, LevelQuestionBankRow> = {
    A1: {
      level: 'A1',
      lesen: 0,
      hoerenWithAudio: 0,
      hoerenAwaitingAudio: 0,
      grammatik: 0,
      wortschatz: 0,
      schreiben: 0,
      sprechen: 0,
      totalCompletedObjective: 0,
      totalStoredObjective: 0,
    },
    A2: {
      level: 'A2',
      lesen: 0,
      hoerenWithAudio: 0,
      hoerenAwaitingAudio: 0,
      grammatik: 0,
      wortschatz: 0,
      schreiben: 0,
      sprechen: 0,
      totalCompletedObjective: 0,
      totalStoredObjective: 0,
    },
    B1: {
      level: 'B1',
      lesen: 0,
      hoerenWithAudio: 0,
      hoerenAwaitingAudio: 0,
      grammatik: 0,
      wortschatz: 0,
      schreiben: 0,
      sprechen: 0,
      totalCompletedObjective: 0,
      totalStoredObjective: 0,
    },
    B2: {
      level: 'B2',
      lesen: 0,
      hoerenWithAudio: 0,
      hoerenAwaitingAudio: 0,
      grammatik: 0,
      wortschatz: 0,
      schreiben: 0,
      sprechen: 0,
      totalCompletedObjective: 0,
      totalStoredObjective: 0,
    },
  };

  const countsByTopic: Record<string, number> = {};
  const countsByDifficulty: Record<DifficultyLevel, number> = {
    Leicht: 0,
    Mittel: 0,
    Anspruchsvoll: 0,
  };
  const countsByQuestionType: Record<string, number> = {};

  let totalQuestions = 0;
  let totalCompletedObjectiveQuestions = 0;
  let totalAwaitingAudioQuestions = 0;
  let totalProductiveTasks = 0;

  for (const ex of exercises) {
    if (!ex.id || !ex.id.trim()) {
      errors.push('Exercise found with missing id.');
    } else if (seenExIds.has(ex.id)) {
      duplicateIdsCount += 1;
    } else {
      seenExIds.add(ex.id);
    }

    if (!VALID_LEVELS.has(ex.level)) {
      errors.push(`Exercise ${ex.id} has invalid CEFR level: ${ex.level}`);
      continue;
    }

    if (!VALID_DIFFICULTIES.has(ex.difficulty)) {
      errors.push(`Exercise ${ex.id} has invalid difficulty: ${ex.difficulty}`);
    }

    const row = rowMap[ex.level];
    const isHoeren = ex.skill === 'hoeren';
    const hasPlayableAudio =
      !isHoeren || (ex.audioStatus === 'available' && Boolean(ex.audioUrl?.trim()));

    if (isHoeren && !hasPlayableAudio) {
      missingAudioFilesCount += 1;
    }

    for (const q of ex.questions) {
      totalQuestions += 1;
      let questionInvalid = false;

      if (!q.id || !q.id.trim()) {
        questionInvalid = true;
        errors.push(`Exercise ${ex.id} has a question with missing id.`);
      } else if (seenQIds.has(q.id)) {
        duplicateIdsCount += 1;
        questionInvalid = true;
      } else {
        seenQIds.add(q.id);
      }

      if (!q.question || !q.question.trim() || !q.explanationId || !q.explanationId.trim()) {
        questionInvalid = true;
      }

      const qDiff = q.difficulty ?? ex.difficulty;
      if (!VALID_DIFFICULTIES.has(qDiff)) {
        questionInvalid = true;
        errors.push(`Question ${q.id} has invalid difficulty: ${qDiff}`);
      } else {
        countsByDifficulty[qDiff] += 1;
      }

      countsByQuestionType[q.type] = (countsByQuestionType[q.type] ?? 0) + 1;

      const topicKey = `${ex.level}:${ex.topic}`;
      countsByTopic[topicKey] = (countsByTopic[topicKey] ?? 0) + 1;

      // Near-duplicate check: combine level, skill, prompt, answer, and first 80 chars of passage/transcript
      const ansKey =
        q.correctAnswer ||
        (q.correctAnswers && q.correctAnswers.length > 0 ? q.correctAnswers.join('|') : '') ||
        (q.matchingPairs ? q.matchingPairs.map((p) => `${p.left}=${p.right}`).join('|') : '');
      const contextSig = ex.passage
        ? normalizeFingerprint(ex.passage).slice(0, 80)
        : ex.transcript
          ? normalizeFingerprint(ex.transcript).slice(0, 80)
          : '';
      const fp = `${ex.level}::${ex.skill}::${normalizeFingerprint(q.question)}::${normalizeFingerprint(ansKey)}::${contextSig}`;
      if (seenNearFingerprints.has(fp)) {
        nearDuplicateCount += 1;
        warnings.push(`Near-duplicate question detected: ${q.id}`);
      } else {
        seenNearFingerprints.add(fp);
      }

      if (questionInvalid) {
        invalidQuestionsCount += 1;
        continue;
      }

      if (!isObjectiveQuestionType(q.type)) {
        totalProductiveTasks += 1;
        if (ex.skill === 'schreiben') row.schreiben += 1;
        if (ex.skill === 'sprechen') row.sprechen += 1;
        continue;
      }

      // Objective question accounting
      if (ex.skill === 'hoeren') {
        row.totalStoredObjective += 1;
        if (hasPlayableAudio) {
          row.hoerenWithAudio += 1;
          row.totalCompletedObjective += 1;
          totalCompletedObjectiveQuestions += 1;
        } else {
          row.hoerenAwaitingAudio += 1;
          totalAwaitingAudioQuestions += 1;
        }
      } else {
        row.totalStoredObjective += 1;
        row.totalCompletedObjective += 1;
        totalCompletedObjectiveQuestions += 1;
        if (ex.skill === 'lesen') row.lesen += 1;
        if (ex.skill === 'grammatik') row.grammatik += 1;
        if (ex.skill === 'wortschatz') row.wortschatz += 1;
      }
    }
  }

  if (missingAudioFilesCount > 0) {
    warnings.push(
      `${missingAudioFilesCount} Höraufgabe(n) (${totalAwaitingAudioQuestions} Hörfragen) warten noch auf lokale MP3-Audiodateien und werden nicht als abgeschlossene Höraufgaben mit Audio gezählt.`,
    );
  }

  const rowsByLevel: LevelQuestionBankRow[] = [
    rowMap.A1,
    rowMap.A2,
    rowMap.B1,
    rowMap.B2,
  ];

  return {
    valid: errors.length === 0 && invalidQuestionsCount === 0 && duplicateIdsCount === 0,
    generatedAtIso: new Date().toISOString(),
    totalExercises: exercises.length,
    totalQuestions,
    totalCompletedObjectiveQuestions,
    totalAwaitingAudioQuestions,
    totalProductiveTasks,
    rowsByLevel,
    countsByTopic,
    countsByDifficulty,
    countsByQuestionType,
    topicsCoveredCount: Object.keys(countsByTopic).length,
    invalidQuestionsCount,
    duplicateIdsCount,
    nearDuplicateCount,
    missingAudioFilesCount,
    errors,
    warnings,
  };
}

export async function auditFullQuestionBankAsync(): Promise<ContentAuditReport> {
  const combinedExercises = await loadAllCombinedExercises();
  const baseReport = validateAllContent({ exercises: combinedExercises });
  const questionBankAudit = buildQuestionBankAuditReport(combinedExercises);
  const audioCoverage = buildAudioCoverageReport({
    exercises: combinedExercises,
    exams: ALL_EXAM_CONFIGURATIONS,
  });
  return {
    ...baseReport,
    valid: baseReport.valid && questionBankAudit.valid,
    questionBankAudit,
    audioCoverage,
  };
}

export function auditAudioAssets(
  exercises: Exercise[] = ALL_EXERCISES,
  exams: ExamConfiguration[] = ALL_EXAM_CONFIGURATIONS,
): AudioAssetAuditItem[] {
  const items: AudioAssetAuditItem[] = [];

  for (const ex of exercises) {
    if (ex.skill === 'hoeren') {
      const resolved = resolveAudioStatusForPath(ex.audioUrl, ex.audioStatus ?? 'missing');
      const hasValidAudio = resolved === 'available' && Boolean(ex.audioUrl?.trim());
      items.push({
        id: ex.id,
        source: 'exercise',
        level: ex.level,
        title: ex.title,
        audioUrl: ex.audioUrl,
        status: hasValidAudio ? 'available' : 'missing',
      });
    }
  }

  for (const exam of exams) {
    const hoerenMod = exam.modules.find((m) => m.moduleKey === 'hoeren');
    if (!hoerenMod) continue;
    for (const section of hoerenMod.sections) {
      for (const q of section.questions) {
        if (!q.audio) continue;
        const resolved = resolveAudioStatusForPath(q.audio.url, q.audio.status);
        const hasValidAudio = resolved === 'available' && Boolean(q.audio.url?.trim());
        items.push({
          id: `${exam.id}:${q.id}`,
          source: 'exam',
          level: exam.level,
          title: `${exam.officialName} — ${section.titleDe} (${q.partLabelDe})`,
          audioUrl: q.audio.url || undefined,
          status: hasValidAudio ? 'available' : 'missing',
        });
      }
    }
  }

  return items;
}

export function validateAllContent(params?: {
  exercises?: Exercise[];
  grammarTopics?: GrammarTopic[];
  vocabWords?: VocabularyEntry[];
  exams?: ExamConfiguration[];
}): ContentAuditReport {
  const exercises = params?.exercises ?? ALL_EXERCISES;
  const grammarTopics = params?.grammarTopics ?? GRAMMAR_TOPICS;
  const vocabWords = params?.vocabWords ?? getLoadedVocabulary();
  const exams = params?.exams ?? ALL_EXAM_CONFIGURATIONS;

  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Validate Exercises & Questions
  const exReport = validateExerciseDatabase(exercises);
  errors.push(...exReport.errors);

  const exerciseIds = new Set<string>();
  let totalQuestions = 0;

  for (const ex of exercises) {
    if (!ex.id || !ex.id.trim()) {
      errors.push('Exercise found with missing id.');
    } else {
      exerciseIds.add(ex.id);
    }
    if (!VALID_LEVELS.has(ex.level)) {
      errors.push(`Exercise ${ex.id} has invalid CEFR level: ${ex.level}`);
    }
    totalQuestions += ex.questions.length;

    for (const q of ex.questions) {
      if (!q.id || !q.id.trim()) {
        errors.push(`Exercise ${ex.id} contains a question with missing id.`);
      }
      if (q.relatedGrammarTopicId && !grammarTopics.some((g) => g.id === q.relatedGrammarTopicId)) {
        errors.push(
          `Question ${q.id} references unknown relatedGrammarTopicId: ${q.relatedGrammarTopicId}`,
        );
      }
    }
  }

  // 2. Validate Grammar Topics
  const seenGrammarIds = new Set<string>();
  for (const g of grammarTopics) {
    if (!g.id || !g.id.trim()) {
      errors.push('Grammar topic found with missing id.');
      continue;
    }
    if (seenGrammarIds.has(g.id)) {
      errors.push(`Duplicate grammar topic id: ${g.id}`);
    }
    seenGrammarIds.add(g.id);

    if (!VALID_LEVELS.has(g.level)) {
      errors.push(`Grammar topic ${g.id} has invalid CEFR level: ${g.level}`);
    }
    if (!g.title.trim() || !g.explanationDe.trim()) {
      errors.push(`Grammar topic ${g.id} is missing title or German explanation.`);
    }
    if (!g.explanationId.trim()) {
      errors.push(`Grammar topic ${g.id} is missing Indonesian explanation.`);
    }
    if (!g.examples || g.examples.length === 0) {
      errors.push(`Grammar topic ${g.id} has no grammar examples.`);
    }
    if (g.relatedExerciseId && !exerciseIds.has(g.relatedExerciseId)) {
      errors.push(
        `Grammar topic ${g.id} links to missing relatedExerciseId: ${g.relatedExerciseId}`,
      );
    }
  }

  // 3. Validate Vocabulary Entries
  const seenVocabIds = new Set<string>();
  for (const v of vocabWords) {
    if (!v.id || !v.id.trim()) {
      errors.push('Vocabulary entry found with missing id.');
      continue;
    }
    if (seenVocabIds.has(v.id)) {
      errors.push(`Duplicate vocabulary id: ${v.id}`);
    }
    seenVocabIds.add(v.id);

    if (!VALID_LEVELS.has(v.level)) {
      errors.push(`Vocabulary ${v.id} has invalid CEFR level: ${v.level}`);
    }
    if (!v.word.trim() || !v.meaningId.trim()) {
      errors.push(`Vocabulary ${v.id} is missing word or Indonesian meaning.`);
    }
    if (!v.exampleDe.trim() || !v.exampleId.trim()) {
      errors.push(`Vocabulary ${v.id} is missing German or Indonesian example sentence.`);
    }
    if (v.partOfSpeech === 'Nomen') {
      if (!v.article || !VALID_ARTICLES.has(v.article)) {
        errors.push(`Noun ${v.id} (${v.word}) is missing valid German article (der/die/das).`);
      }
      if (!v.plural || !v.plural.trim()) {
        errors.push(`Noun ${v.id} (${v.word}) is missing plural information.`);
      }
    }
  }

  // 4. Audit Audio Assets
  const audioAudit = auditAudioAssets(exercises, exams);
  const availableAudioCount = audioAudit.filter((a) => a.status === 'available').length;
  const missingAudioCount = audioAudit.filter((a) => a.status === 'missing').length;

  if (missingAudioCount > 0) {
    warnings.push(
      `${missingAudioCount} Höraufgabe(n) haben aktuell keine lokale MP3-Audiodatei und werden ehrlich als „Audio nicht verfügbar“ markiert.`,
    );
  }

  const audioCoverage = buildAudioCoverageReport({ exercises, exams });

  return {
    valid: errors.length === 0,
    totalExercises: exercises.length,
    totalQuestions,
    totalGrammarTopics: grammarTopics.length,
    totalVocabulary:
      params?.vocabWords !== undefined
        ? params.vocabWords.length
        : vocabWords.length > 0
          ? vocabWords.length
          : TOTAL_VOCABULARY_COUNT,
    errors,
    warnings,
    audioAudit,
    availableAudioCount,
    missingAudioCount,
    audioCoverage,
  };
}

export async function validateAllContentAsync(params?: {
  exercises?: Exercise[];
  grammarTopics?: GrammarTopic[];
  exams?: ExamConfiguration[];
}): Promise<ContentAuditReport> {
  const allVocab = await loadAllVocabulary();
  return validateAllContent({
    ...params,
    vocabWords: allVocab,
  });
}
