import { CEFRLevel } from './exercise';

export type ListeningProvider = 'goethe' | 'telc' | 'practice';
export type AudioSourceType = 'human_recording' | 'synthetic';
export type ManifestAudioStatus = 'available' | 'missing' | 'pending';

export interface SpeakerProfile {
  speakerId: string;
  name: string;
  roleDe: string;
  gender: 'female' | 'male' | 'neutral';
  edgeVoiceDe: string;
  rateOffsetPercent: number;
}

export interface DialogueTurn {
  turnIndex: number;
  speakerId: string;
  speakerLabel: string;
  textDe: string;
  pauseAfterMs: number;
}

export interface ListeningScriptQuestion {
  id: string;
  promptDe: string;
  type:
    | 'multiple-choice'
    | 'true-false'
    | 'fill-blank'
    | 'short-answer'
    | 'multiple-select'
    | 'matching';
  options?: string[];
  correctAnswer?: string;
  correctAnswers?: string[];
  matchingPairs?: Array<{ left: string; right: string }>;
  feedbackDe: string;
  explanationId: string;
  points: number;
}

export interface ListeningScriptEntry {
  scriptId: string;
  exerciseId: string;
  examQuestionId?: string;
  provider: ListeningProvider;
  level: CEFRLevel;
  partNumber: number;
  partTitleDe: string;
  topicDe: string;
  contextDe: string;
  targetPacingDe: string;
  cefrRateHint: string;
  estimatedDurationSeconds: number;
  durationLabel: string;
  playLimit: 1 | 2;
  audioFilename: string;
  audioPath: string;
  speakers: SpeakerProfile[];
  turns: DialogueTurn[];
  fullTranscriptDe: string;
  questions: ListeningScriptQuestion[];
}

export interface AudioManifestEntry {
  exerciseId: string;
  provider: ListeningProvider;
  level: CEFRLevel;
  partNumber: number;
  titleDe: string;
  audioPath: string;
  scriptId: string;
  duration: string;
  durationSeconds: number;
  audioType: AudioSourceType;
  status: ManifestAudioStatus;
  verifiedBytes?: number;
  lastVerifiedIso?: string;
}

export interface AudioCoverageBreakdownRow {
  provider: ListeningProvider;
  level: CEFRLevel;
  total: number;
  available: number;
  missing: number;
  pending: number;
  coveragePercent: number;
}

export interface AudioCoverageSummary {
  totalListeningExercises: number;
  totalUniqueAudioFiles: number;
  scriptCount: number;
  examScriptCount: number;
  practiceUnitCount: number;
  examAudioCount: number;
  practiceHoerenQuestionCount: number;
  actualMp3AvailableCount: number;
  missingMp3Count: number;
  pendingAudioCount: number;
  coveragePercentage: number;
  brokenPathExerciseIds: string[];
  invalidScriptExerciseIds: string[];
  duplicateAudioPaths: string[];
  unlinkedPracticeIds: string[];
  byProviderAndLevel: AudioCoverageBreakdownRow[];
  manifestEntries: AudioManifestEntry[];
}
