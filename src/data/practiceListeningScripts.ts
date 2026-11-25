import { Exercise, Question } from '../types/exercise';
import {
  ListeningScriptEntry,
  ListeningScriptQuestion,
} from '../types/listeningAudio';
import {
  estimateDurationSecondsFromText,
  formatDurationLabel,
  getPacingDescriptionForCefr,
  getPracticeAudioPath,
  parseTranscriptToSpeakersAndTurns,
} from '../utils/listeningAudioHelpers';
import { ALL_LISTENING_SCRIPTS } from './listeningScripts';
import { loadCombinedExercisesFor } from './questionBank';

function mapQuestionToScriptQuestion(
  q: Question,
  exercise: Exercise,
): ListeningScriptQuestion {
  const mappedType: ListeningScriptQuestion['type'] =
    q.type === 'true-false' ||
    q.type === 'fill-blank' ||
    q.type === 'short-answer' ||
    q.type === 'multiple-select' ||
    q.type === 'matching'
      ? q.type
      : 'multiple-choice';

  return {
    id: q.id,
    promptDe: q.question,
    type: mappedType,
    ...(q.options ? { options: [...q.options] } : {}),
    ...(q.correctAnswer !== undefined ? { correctAnswer: q.correctAnswer } : {}),
    ...(q.correctAnswers ? { correctAnswers: [...q.correctAnswers] } : {}),
    ...(q.matchingPairs ? { matchingPairs: q.matchingPairs.map((p) => ({ ...p })) } : {}),
    feedbackDe:
      q.explanationDe?.trim() ||
      exercise.learningObjectiveDe?.trim() ||
      `Siehe Hörtext (${exercise.title}).`,
    explanationId: q.explanationId,
    points: q.points,
  };
}

export function convertPracticeExerciseToListeningScript(
  exercise: Exercise,
  unitIndex: number,
  partNumberInLevel: number,
): ListeningScriptEntry {
  const transcript = (exercise.transcript ?? '').trim();
  const audioPath = exercise.audioUrl?.trim() || getPracticeAudioPath(exercise.level, exercise.id);
  const audioFilename = audioPath.split('/').pop() || `${exercise.id}.mp3`;
  const pacing = getPacingDescriptionForCefr(exercise.level);
  const { speakers, turns } = parseTranscriptToSpeakersAndTurns({
    transcript,
    level: exercise.level,
    unitIndex,
  });
  const estimatedDurationSeconds = estimateDurationSecondsFromText(
    transcript,
    exercise.level,
    turns.length,
  );

  return {
    scriptId: `script-practice-${exercise.id}`,
    exerciseId: exercise.id,
    provider: 'practice',
    level: exercise.level,
    partNumber: partNumberInLevel,
    partTitleDe: exercise.title,
    topicDe: exercise.topic,
    contextDe: exercise.subtitle || exercise.formatLabel,
    targetPacingDe: pacing.targetPacingDe,
    cefrRateHint: pacing.cefrRateHint,
    estimatedDurationSeconds,
    durationLabel: formatDurationLabel(estimatedDurationSeconds),
    playLimit: exercise.level === 'B2' ? 1 : 2,
    audioFilename,
    audioPath,
    speakers,
    turns,
    fullTranscriptDe: transcript,
    questions: exercise.questions.map((q) => mapQuestionToScriptQuestion(q, exercise)),
  };
}

export function convertPracticeExercisesToListeningScripts(
  hoerenExercises: Exercise[],
): ListeningScriptEntry[] {
  const perLevelCounter = new Map<string, number>();
  return hoerenExercises
    .filter((ex) => ex.skill === 'hoeren' && Boolean(ex.transcript?.trim()))
    .map((ex, idx) => {
      const nextPart = (perLevelCounter.get(ex.level) ?? 0) + 1;
      perLevelCounter.set(ex.level, nextPart);
      return convertPracticeExerciseToListeningScript(ex, idx, nextPart);
    });
}

export async function loadPracticeListeningScriptsAsync(): Promise<ListeningScriptEntry[]> {
  const allHoeren = await loadCombinedExercisesFor('hoeren', 'Alle');
  return convertPracticeExercisesToListeningScripts(allHoeren);
}

export async function loadAllListeningScriptsAcrossAppAsync(): Promise<ListeningScriptEntry[]> {
  const practiceScripts = await loadPracticeListeningScriptsAsync();
  return [...ALL_LISTENING_SCRIPTS, ...practiceScripts];
}
