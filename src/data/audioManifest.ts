import { CEFRLevel } from '../types/exercise';
import {
  AudioManifestEntry,
  AudioSourceType,
  ListeningProvider,
  ManifestAudioStatus,
} from '../types/listeningAudio';
import rawGeneratedManifest from './audioManifest.generated.json';
import { ALL_LISTENING_SCRIPTS } from './listeningScripts';

interface GeneratedManifestFileShape {
  generatedAtIso?: string;
  verifiedBy?: string;
  entries?: Array<Partial<AudioManifestEntry>>;
}

const parsedGenerated = rawGeneratedManifest as GeneratedManifestFileShape;
const generatedEntriesByExerciseId = new Map<string, Partial<AudioManifestEntry>>();
for (const entry of parsedGenerated.entries ?? []) {
  if (entry.exerciseId) {
    generatedEntriesByExerciseId.set(entry.exerciseId, entry);
  }
}

function sanitizeManifestStatus(
  generated: Partial<AudioManifestEntry> | undefined,
  hasExamQuestionId: boolean,
): ManifestAudioStatus {
  if (generated?.status === 'available' && (generated.verifiedBytes ?? 0) > 1024) {
    return 'available';
  }
  if (generated?.status === 'missing' || generated?.status === 'pending') {
    return generated.status;
  }
  return hasExamQuestionId ? 'missing' : 'pending';
}

function sanitizeAudioType(raw: unknown): AudioSourceType {
  return raw === 'human_recording' ? 'human_recording' : 'synthetic';
}

function sanitizeProvider(raw: unknown): ListeningProvider {
  if (raw === 'goethe' || raw === 'telc' || raw === 'practice') return raw;
  return 'practice';
}

function sanitizeLevel(raw: unknown): CEFRLevel {
  if (raw === 'A1' || raw === 'A2' || raw === 'B1' || raw === 'B2') return raw;
  return 'A1';
}

const examScriptManifestEntries: AudioManifestEntry[] = ALL_LISTENING_SCRIPTS.map((script) => {
  const generated = generatedEntriesByExerciseId.get(script.exerciseId);
  return {
    exerciseId: script.exerciseId,
    provider: script.provider,
    level: script.level,
    partNumber: script.partNumber,
    titleDe: script.partTitleDe,
    audioPath: script.audioPath,
    scriptId: script.scriptId,
    duration: generated?.duration || script.durationLabel,
    durationSeconds:
      typeof generated?.durationSeconds === 'number' && generated.durationSeconds > 0
        ? generated.durationSeconds
        : script.estimatedDurationSeconds,
    audioType: sanitizeAudioType(generated?.audioType),
    status: sanitizeManifestStatus(generated, Boolean(script.examQuestionId)),
    verifiedBytes: typeof generated?.verifiedBytes === 'number' ? generated.verifiedBytes : 0,
    lastVerifiedIso: generated?.lastVerifiedIso,
  };
});

const seenManifestExerciseIds = new Set(examScriptManifestEntries.map((e) => e.exerciseId));

const extraManifestEntries: AudioManifestEntry[] = (parsedGenerated.entries ?? [])
  .filter((entry): entry is Partial<AudioManifestEntry> & { exerciseId: string; audioPath: string } =>
    Boolean(
      entry.exerciseId &&
        entry.audioPath &&
        !seenManifestExerciseIds.has(entry.exerciseId),
    ),
  )
  .map((generated) => ({
    exerciseId: generated.exerciseId,
    provider: sanitizeProvider(generated.provider),
    level: sanitizeLevel(generated.level),
    partNumber: typeof generated.partNumber === 'number' ? generated.partNumber : 1,
    titleDe: generated.titleDe ?? generated.exerciseId,
    audioPath: generated.audioPath,
    scriptId: generated.scriptId ?? `script-${generated.exerciseId}`,
    duration: generated.duration || '0:30',
    durationSeconds:
      typeof generated.durationSeconds === 'number' && generated.durationSeconds > 0
        ? generated.durationSeconds
        : 30,
    audioType: sanitizeAudioType(generated.audioType),
    status: sanitizeManifestStatus(generated, false),
    verifiedBytes: typeof generated.verifiedBytes === 'number' ? generated.verifiedBytes : 0,
    lastVerifiedIso: generated.lastVerifiedIso,
  }));

export const AUDIO_MANIFEST: AudioManifestEntry[] = [
  ...examScriptManifestEntries,
  ...extraManifestEntries,
];

export const AUDIO_MANIFEST_LAST_VERIFIED_ISO = parsedGenerated.generatedAtIso ?? '';

export function getManifestEntryByExerciseId(
  exerciseId: string,
): AudioManifestEntry | undefined {
  return AUDIO_MANIFEST.find((entry) => entry.exerciseId === exerciseId);
}

export function getManifestEntryByAudioPath(
  audioPath?: string,
): AudioManifestEntry | undefined {
  if (!audioPath) return undefined;
  const normalized = audioPath.trim();
  return AUDIO_MANIFEST.find((entry) => entry.audioPath === normalized);
}

export function resolveAudioStatusForPath(
  audioUrl?: string,
  fallbackStatus: ManifestAudioStatus = 'missing',
): ManifestAudioStatus {
  const entry = getManifestEntryByAudioPath(audioUrl);
  if (entry) {
    return entry.status;
  }
  return fallbackStatus;
}
