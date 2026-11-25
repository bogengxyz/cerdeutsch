import { AudioManifestEntry, ListeningProvider, ListeningScriptEntry } from '../../types/listeningAudio';
import { CEFRLevel, DifficultyLevel, Exercise, Question } from '../../types/exercise';
import { isValidAudioAssetPath } from '../../utils/listeningAudioHelpers';
import { GOETHE_LISTENING_SCRIPTS } from './goethe';
import { TELC_LISTENING_SCRIPTS } from './telc';

export { GOETHE_LISTENING_SCRIPTS, TELC_LISTENING_SCRIPTS };

export const ALL_LISTENING_SCRIPTS: ListeningScriptEntry[] = [
  ...GOETHE_LISTENING_SCRIPTS,
  ...TELC_LISTENING_SCRIPTS,
];

export function getListeningScriptById(scriptId: string): ListeningScriptEntry | undefined {
  return ALL_LISTENING_SCRIPTS.find((s) => s.scriptId === scriptId);
}

export function getListeningScriptByExerciseId(exerciseId: string): ListeningScriptEntry | undefined {
  return ALL_LISTENING_SCRIPTS.find((s) => s.exerciseId === exerciseId);
}

export function getListeningScriptsByProviderAndLevel(
  provider: ListeningProvider,
  level: CEFRLevel,
): ListeningScriptEntry[] {
  return ALL_LISTENING_SCRIPTS.filter(
    (s) => s.provider === provider && s.level === level,
  ).sort((a, b) => a.partNumber - b.partNumber);
}

export function isListeningScriptPathValid(entry: ListeningScriptEntry): boolean {
  if (!isValidAudioAssetPath(entry.audioPath, entry.provider, entry.level)) {
    return false;
  }
  if (!entry.audioPath.endsWith(`/${entry.audioFilename}`)) {
    return false;
  }
  return true;
}

export function validateListeningScript(entry: ListeningScriptEntry): string[] {
  const issues: string[] = [];

  if (!entry.scriptId.trim()) issues.push('Missing scriptId');
  if (!entry.exerciseId.trim()) issues.push('Missing exerciseId');
  if (entry.provider !== 'goethe' && entry.provider !== 'telc' && entry.provider !== 'practice') {
    issues.push(`Invalid provider: ${entry.provider}`);
  }
  if (!['A1', 'A2', 'B1', 'B2'].includes(entry.level)) {
    issues.push(`Invalid level: ${entry.level}`);
  }
  if (!isListeningScriptPathValid(entry)) {
    issues.push(`Invalid or mismatched audioPath: ${entry.audioPath}`);
  }
  if (!entry.partTitleDe.trim() || !entry.topicDe.trim() || !entry.contextDe.trim()) {
    issues.push('Missing metadata (partTitleDe/topicDe/contextDe)');
  }
  if (!entry.speakers || entry.speakers.length === 0) {
    issues.push('Missing speakers');
  }
  if (!entry.turns || entry.turns.length === 0) {
    issues.push('Missing dialogue turns');
  } else {
    const speakerIds = new Set(entry.speakers.map((s) => s.speakerId));
    for (const turn of entry.turns) {
      if (!speakerIds.has(turn.speakerId)) {
        issues.push(`Turn ${turn.turnIndex} references unknown speakerId "${turn.speakerId}"`);
      }
      if (!turn.textDe.trim()) {
        issues.push(`Turn ${turn.turnIndex} has empty German text`);
      }
      if (turn.pauseAfterMs < 0) {
        issues.push(`Turn ${turn.turnIndex} has negative pauseAfterMs`);
      }
    }
  }
  if (!entry.fullTranscriptDe.trim()) {
    issues.push('Missing fullTranscriptDe');
  }
  if (!entry.questions || entry.questions.length === 0) {
    issues.push('No listening questions provided');
  } else {
    for (const q of entry.questions) {
      if (!q.id.trim() || !q.promptDe.trim()) {
        issues.push(`Question ${q.id || '(missing id)'} missing promptDe`);
      }
      if (q.type === 'multiple-choice' || q.type === 'true-false') {
        if (!q.options || q.options.length < 2) {
          issues.push(`Question ${q.id} has fewer than 2 options`);
        } else if (!q.correctAnswer || !q.options.includes(q.correctAnswer)) {
          issues.push(`Question ${q.id} correctAnswer "${q.correctAnswer ?? ''}" not in options`);
        }
      } else if (q.type === 'multiple-select') {
        if (!q.options || q.options.length < 2) {
          issues.push(`Question ${q.id} (multiple-select) has fewer than 2 options`);
        } else if (!q.correctAnswers || q.correctAnswers.length === 0) {
          issues.push(`Question ${q.id} (multiple-select) missing correctAnswers`);
        }
      } else if (q.type === 'matching') {
        if (!q.matchingPairs || q.matchingPairs.length < 2) {
          issues.push(`Question ${q.id} (matching) has fewer than 2 pairs`);
        }
      } else if (!q.correctAnswer?.trim()) {
        issues.push(`Question ${q.id} (${q.type}) missing correctAnswer`);
      }
      if (!q.feedbackDe.trim()) {
        issues.push(`Question ${q.id} missing German feedback (feedbackDe)`);
      }
      if (!q.explanationId.trim()) {
        issues.push(`Question ${q.id} missing Indonesian explanation (explanationId)`);
      }
      if (q.points <= 0) {
        issues.push(`Question ${q.id} must have positive points`);
      }
    }
  }

  return issues;
}

function mapLevelDifficulty(level: CEFRLevel): DifficultyLevel {
  if (level === 'A1') return 'Leicht';
  if (level === 'B2') return 'Anspruchsvoll';
  return 'Mittel';
}

export function toPracticeExercise(
  script: ListeningScriptEntry,
  manifestEntry?: AudioManifestEntry,
): Exercise {
  const resolvedStatus =
    manifestEntry?.status === 'available' && (manifestEntry.verifiedBytes ?? 0) > 1024
      ? 'available'
      : manifestEntry?.status ?? (script.examQuestionId ? 'missing' : 'pending');

  const questions: Question[] = script.questions.map((q) => ({
    id: q.id,
    type: q.type,
    question: q.promptDe,
    ...(q.options ? { options: [...q.options] } : {}),
    ...(q.correctAnswer !== undefined ? { correctAnswer: q.correctAnswer } : {}),
    ...(q.correctAnswers ? { correctAnswers: [...q.correctAnswers] } : {}),
    ...(q.matchingPairs ? { matchingPairs: q.matchingPairs.map((p) => ({ ...p })) } : {}),
    explanationDe: q.feedbackDe,
    explanationId: q.explanationId,
    points: q.points,
    difficulty: mapLevelDifficulty(script.level),
  }));

  const providerLabel =
    script.provider === 'goethe'
      ? 'Goethe-Zertifikat'
      : script.provider === 'telc'
        ? 'telc Deutsch'
        : 'Hörtraining';

  return {
    id: script.exerciseId,
    level: script.level,
    skill: 'hoeren',
    topic: script.topicDe,
    title: script.partTitleDe,
    subtitle: `${providerLabel} · ${script.contextDe}`,
    learningObjectiveDe: script.targetPacingDe,
    difficulty: mapLevelDifficulty(script.level),
    durationMinutes: Math.max(2, Math.ceil(script.estimatedDurationSeconds / 20)),
    formatLabel:
      script.provider === 'practice'
        ? `Hören ${script.level} · Einheit ${script.partNumber}`
        : `${script.provider === 'goethe' ? 'Goethe' : 'telc'} ${script.level} · Teil ${script.partNumber}`,
    instructions: `Höre den Beitrag (${script.targetPacingDe}) und beantworte die Fragen. Abspielhinweis: max. ${script.playLimit}× · Dauer ca. ${script.durationLabel}.`,
    audioUrl: script.audioPath,
    audioStatus: resolvedStatus,
    transcript: script.fullTranscriptDe,
    questions,
  };
}
