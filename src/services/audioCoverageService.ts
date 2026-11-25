import { AUDIO_MANIFEST, getManifestEntryByAudioPath } from '../data/audioManifest';
import { ALL_EXAM_CONFIGURATIONS } from '../data/exams';
import { ALL_EXERCISES } from '../data/exercises';
import {
  ALL_LISTENING_SCRIPTS,
  isListeningScriptPathValid,
  validateListeningScript,
} from '../data/listeningScripts';
import { convertPracticeExercisesToListeningScripts } from '../data/practiceListeningScripts';
import { loadAllCombinedExercises } from '../data/questionBank';
import { ExamConfiguration } from '../types/exam';
import { CEFRLevel, Exercise } from '../types/exercise';
import {
  AudioCoverageBreakdownRow,
  AudioCoverageSummary,
  ListeningProvider,
} from '../types/listeningAudio';
import { isValidAudioAssetPath } from '../utils/listeningAudioHelpers';

const PROVIDERS: ListeningProvider[] = ['goethe', 'telc', 'practice'];
const LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2'];

export function buildAudioCoverageReport(params?: {
  exercises?: Exercise[];
  exams?: ExamConfiguration[];
}): AudioCoverageSummary {
  const exercises = params?.exercises ?? ALL_EXERCISES;
  const exams = params?.exams ?? ALL_EXAM_CONFIGURATIONS;

  const practiceScripts = convertPracticeExercisesToListeningScripts(exercises);
  const allScriptsToValidate = [...ALL_LISTENING_SCRIPTS, ...practiceScripts];

  const brokenPathExerciseIds: string[] = [];
  const invalidScriptExerciseIds: string[] = [];
  const seenAudioPaths = new Set<string>();
  const duplicateAudioPaths: string[] = [];

  for (const script of allScriptsToValidate) {
    if (!isListeningScriptPathValid(script)) {
      brokenPathExerciseIds.push(script.exerciseId);
    }
    if (validateListeningScript(script).length > 0) {
      invalidScriptExerciseIds.push(script.exerciseId);
    }
    if (seenAudioPaths.has(script.audioPath)) {
      duplicateAudioPaths.push(script.audioPath);
    } else {
      seenAudioPaths.add(script.audioPath);
    }
  }

  const unlinkedPracticeIds: string[] = [];
  let practiceHoerenQuestionCount = 0;
  for (const ex of exercises) {
    if (ex.skill !== 'hoeren') continue;
    practiceHoerenQuestionCount += ex.questions.length;

    const validPath = Boolean(
      ex.audioUrl && isValidAudioAssetPath(ex.audioUrl, 'practice', ex.level),
    );
    const inManifest = Boolean(getManifestEntryByAudioPath(ex.audioUrl));
    if (!validPath || !inManifest) {
      unlinkedPracticeIds.push(ex.id);
    }
  }

  let examAudioCount = 0;
  for (const exam of exams) {
    const hoerenMod = exam.modules.find((m) => m.moduleKey === 'hoeren');
    if (!hoerenMod) continue;
    for (const section of hoerenMod.sections) {
      for (const q of section.questions) {
        if (q.audio) examAudioCount += 1;
      }
    }
  }

  const actualMp3AvailableCount = AUDIO_MANIFEST.filter(
    (e) => e.status === 'available' && (e.verifiedBytes ?? 0) > 1024,
  ).length;
  const missingMp3Count = AUDIO_MANIFEST.filter((e) => e.status === 'missing').length;
  const pendingAudioCount = AUDIO_MANIFEST.filter((e) => e.status === 'pending').length;

  const examScriptCount = ALL_LISTENING_SCRIPTS.length;
  const manifestPracticeCount = AUDIO_MANIFEST.filter((e) => e.provider === 'practice').length;
  const practiceUnitCount = Math.max(practiceScripts.length, manifestPracticeCount);
  const scriptCount = examScriptCount + practiceUnitCount;
  const totalListeningExercises = AUDIO_MANIFEST.length;
  const totalUniqueAudioFiles = new Set(AUDIO_MANIFEST.map((e) => e.audioPath)).size;

  const coveragePercentage =
    totalListeningExercises > 0
      ? Math.round((actualMp3AvailableCount / totalListeningExercises) * 100)
      : 0;

  const byProviderAndLevel: AudioCoverageBreakdownRow[] = [];
  for (const provider of PROVIDERS) {
    for (const level of LEVELS) {
      const subset = AUDIO_MANIFEST.filter(
        (e) => e.provider === provider && e.level === level,
      );
      const available = subset.filter(
        (e) => e.status === 'available' && (e.verifiedBytes ?? 0) > 1024,
      ).length;
      const missing = subset.filter((e) => e.status === 'missing').length;
      const pending = subset.filter((e) => e.status === 'pending').length;
      byProviderAndLevel.push({
        provider,
        level,
        total: subset.length,
        available,
        missing,
        pending,
        coveragePercent: subset.length > 0 ? Math.round((available / subset.length) * 100) : 0,
      });
    }
  }

  return {
    totalListeningExercises,
    totalUniqueAudioFiles,
    scriptCount,
    examScriptCount,
    practiceUnitCount,
    examAudioCount,
    practiceHoerenQuestionCount,
    actualMp3AvailableCount,
    missingMp3Count,
    pendingAudioCount,
    coveragePercentage,
    brokenPathExerciseIds,
    invalidScriptExerciseIds,
    duplicateAudioPaths,
    unlinkedPracticeIds,
    byProviderAndLevel,
    manifestEntries: AUDIO_MANIFEST,
  };
}

export async function buildFullAudioCoverageReportAsync(): Promise<AudioCoverageSummary> {
  const combinedExercises = await loadAllCombinedExercises();
  return buildAudioCoverageReport({
    exercises: combinedExercises,
    exams: ALL_EXAM_CONFIGURATIONS,
  });
}
