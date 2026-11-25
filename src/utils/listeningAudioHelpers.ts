import { CEFRLevel, Exercise } from '../types/exercise';
import {
  DialogueTurn,
  ListeningProvider,
  ManifestAudioStatus,
  SpeakerProfile,
} from '../types/listeningAudio';

const PRACTICE_PATH_REGEX = /^\/audio\/practice\/(a1|a2|b1|b2)\/[a-z0-9-]+\.mp3$/;
const EXAM_PATH_REGEX = /^\/audio\/exams\/(goethe|telc)\/(a1|a2|b1|b2)\/[a-z0-9-]+\.mp3$/;

const NON_SPEAKER_LABELS = new Set([
  'achtung',
  'hinweis',
  'wichtig',
  'tipp',
  'beispiel',
  'regel',
  'problem',
  'service',
  'verkehrsservice',
  'öffnungszeiten',
  'nächster halt',
  'zusammenfassung',
  'fazit',
  'ergebnis',
  'preis',
  'preise',
  'datum',
  'uhrzeit',
  'ort',
  'adresse',
  'telefon',
  'notfall',
]);

const FEMALE_VOICES = ['de-DE-KatjaNeural', 'de-DE-AmalaNeural', 'de-DE-SeraphinaMultilingualNeural'];
const MALE_VOICES = ['de-DE-ConradNeural', 'de-DE-KillianNeural', 'de-DE-FlorianMultilingualNeural'];

const FEMALE_NAMES = new Set([
  'anna',
  'lisa',
  'mara',
  'mia',
  'hannah',
  'katja',
  'kerstin',
  'sophie',
  'laura',
  'emma',
  'lena',
  'clara',
  'marie',
  'sara',
  'sarah',
  'nina',
  'julia',
  'sabine',
  'petra',
  'mutter',
  'chefin',
  'frau',
  'rezeption',
  'apotheke',
  'praxis',
  'taxizentrale',
]);

const MALE_NAMES = new Set([
  'tom',
  'max',
  'paul',
  'ben',
  'jonas',
  'sven',
  'markus',
  'jan',
  'lukas',
  'tim',
  'felix',
  'leon',
  'david',
  'tobias',
  'stefan',
  'michael',
  'thomas',
  'martin',
  'vater',
  'herr',
  'kellner',
  'trainer',
  'hausmeister',
  'vermieter',
  'rezeptionist',
  'kunde',
  'gast',
  'anrufer',
  'patient',
  'mieter',
  'arzt',
]);

export function getPracticeAudioPath(level: CEFRLevel, exerciseId: string): string {
  return `/audio/practice/${level.toLowerCase()}/${exerciseId}.mp3`;
}

export function isValidAudioAssetPath(
  audioPath: string,
  provider: ListeningProvider,
  level: CEFRLevel,
): boolean {
  if (!audioPath) return false;
  if (provider === 'practice') {
    const match = audioPath.match(PRACTICE_PATH_REGEX);
    if (!match) return false;
    return match[1] === level.toLowerCase();
  }
  const match = audioPath.match(EXAM_PATH_REGEX);
  if (!match) return false;
  const [, pathProvider, pathLevel] = match;
  return pathProvider === provider && pathLevel === level.toLowerCase();
}

export function normalizeAudioExercise(
  exercise: Exercise,
  resolveStatus: (audioUrl?: string, fallbackStatus?: ManifestAudioStatus) => ManifestAudioStatus,
): Exercise {
  if (exercise.skill !== 'hoeren') {
    return exercise;
  }
  const canonicalUrl = exercise.audioUrl?.trim() || getPracticeAudioPath(exercise.level, exercise.id);
  const resolvedStatus = resolveStatus(canonicalUrl, exercise.audioStatus ?? 'pending');
  return {
    ...exercise,
    audioUrl: canonicalUrl,
    audioStatus: resolvedStatus,
  };
}

export function getRateOffsetForCefr(level: CEFRLevel): number {
  switch (level) {
    case 'A1':
      return -12;
    case 'A2':
      return -6;
    case 'B1':
      return 0;
    case 'B2':
      return 4;
  }
}

export function getPacingDescriptionForCefr(level: CEFRLevel): {
  targetPacingDe: string;
  cefrRateHint: string;
} {
  switch (level) {
    case 'A1':
      return {
        targetPacingDe: 'Langsames, klar artikuliertes Sprachtempo (ca. 105–115 Wörter/Min.)',
        cefrRateHint: '-12%',
      };
    case 'A2':
      return {
        targetPacingDe: 'Ruhiges Alltagstempo mit deutlichen Satzpausen (ca. 120–130 Wörter/Min.)',
        cefrRateHint: '-6%',
      };
    case 'B1':
      return {
        targetPacingDe: 'Natürliches Standardtempo (ca. 135–145 Wörter/Min.)',
        cefrRateHint: '0%',
      };
    case 'B2':
      return {
        targetPacingDe: 'Flüssiges, authentisches Diskussionstempo (ca. 145–160 Wörter/Min.)',
        cefrRateHint: '+4%',
      };
  }
}

function isLikelySpeakerLabel(rawLabel: string): boolean {
  const clean = rawLabel.trim();
  if (!clean || clean.length > 28) return false;
  if (/\d/.test(clean)) return false;
  const words = clean.split(/\s+/);
  if (words.length > 3) return false;
  const lower = clean.toLowerCase();
  if (NON_SPEAKER_LABELS.has(lower)) return false;
  if (words.some((w) => NON_SPEAKER_LABELS.has(w.toLowerCase()))) return false;
  // Require uppercase initial on first word (and avoid lowercase-only phrases)
  if (!/^[A-ZÄÖÜ]/.test(clean)) return false;
  return true;
}

function inferGender(label: string, fallbackIndex: number): 'female' | 'male' {
  const lower = label.toLowerCase().trim();
  const tokens = lower.split(/\s+/);
  if (tokens[0] === 'frau' || tokens[0] === 'fr.' || tokens[0] === 'kuratorin') return 'female';
  if (tokens[0] === 'herr' || tokens[0] === 'hr.') return 'male';

  for (const tok of tokens) {
    if (FEMALE_NAMES.has(tok)) return 'female';
    if (MALE_NAMES.has(tok)) return 'male';
    if (
      tok.endsWith('in') &&
      tok.length > 4 &&
      !['termin', 'berlin', 'wien', 'klein', 'stein'].includes(tok)
    ) {
      return 'female';
    }
  }
  return fallbackIndex % 2 === 0 ? 'female' : 'male';
}

function tryParseNewlineDialogue(transcript: string): Array<{ label: string; text: string }> | null {
  const lines = transcript
    .split(/\r?\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) return null;

  const parsed: Array<{ label: string; text: string }> = [];
  for (const line of lines) {
    const match = line.match(/^([A-ZÄÖÜ][A-Za-zÄÖÜäöüß.-]*(?:\s+[A-ZÄÖÜ][A-Za-zÄÖÜäöüß.-]*){0,2}):\s+(.+)$/);
    if (match && isLikelySpeakerLabel(match[1])) {
      parsed.push({ label: match[1].trim(), text: match[2].trim() });
    } else if (parsed.length > 0) {
      parsed[parsed.length - 1].text = `${parsed[parsed.length - 1].text} ${line}`;
    } else {
      return null;
    }
  }

  const distinctSpeakers = new Set(parsed.map((p) => p.label.toLowerCase()));
  return parsed.length >= 2 && distinctSpeakers.size >= 2 ? parsed : null;
}

function tryParseInlineDialogue(transcript: string): Array<{ label: string; text: string }> | null {
  const compact = transcript.replace(/\s+/g, ' ').trim();
  const speakerRegex =
    /(?:^|(?:[.!?»"“]\s+))((?:(?:Dr|Prof|Hr|Fr)\.\s+)?[A-ZÄÖÜ][A-Za-zÄÖÜäöüß-]*(?:\s+[A-ZÄÖÜ][A-Za-zÄÖÜäöüß-]*){0,2}):\s+/g;

  const hits: Array<{ labelStart: number; textStart: number; label: string }> = [];
  let match: RegExpExecArray | null;

  while ((match = speakerRegex.exec(compact)) !== null) {
    const label = match[1].trim();
    if (!isLikelySpeakerLabel(label)) continue;
    const labelStart = match.index + match[0].indexOf(label);
    const textStart = match.index + match[0].length;
    hits.push({ labelStart, textStart, label });
  }

  if (hits.length < 2) return null;
  const distinctSpeakers = new Set(hits.map((h) => h.label.toLowerCase()));
  if (distinctSpeakers.size < 2) return null;

  const turns: Array<{ label: string; text: string }> = [];
  for (let i = 0; i < hits.length; i += 1) {
    const start = hits[i].textStart;
    const end = i + 1 < hits.length ? hits[i + 1].labelStart : compact.length;
    const text = compact.slice(start, end).trim();
    if (!text) return null;
    turns.push({ label: hits[i].label, text });
  }

  return turns.length >= 2 ? turns : null;
}

export function estimateDurationSecondsFromText(text: string, level: CEFRLevel, turnCount: number): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const wpm = level === 'A1' ? 105 : level === 'A2' ? 120 : level === 'B1' ? 135 : 148;
  const speechSecs = Math.round((words / wpm) * 60);
  const pauseSecs = Math.round((Math.max(0, turnCount - 1) * (level === 'A1' || level === 'A2' ? 0.6 : 0.45)));
  return Math.max(12, speechSecs + pauseSecs);
}

export function formatDurationLabel(seconds: number): string {
  const rounded = Math.max(1, Math.round(seconds));
  const mins = Math.floor(rounded / 60);
  const secs = rounded % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export function parseTranscriptToSpeakersAndTurns(params: {
  transcript: string;
  level: CEFRLevel;
  unitIndex?: number;
}): {
  speakers: SpeakerProfile[];
  turns: DialogueTurn[];
} {
  const { transcript, level, unitIndex = 0 } = params;
  const rateOffset = getRateOffsetForCefr(level);
  const pauseMs = level === 'A1' || level === 'A2' ? 600 : 450;

  const rawTurns =
    tryParseNewlineDialogue(transcript) ??
    tryParseInlineDialogue(transcript) ?? [
      {
        label: 'Sprecher',
        text: transcript.trim(),
      },
    ];

  const speakerMap = new Map<string, SpeakerProfile>();
  let femaleIdx = unitIndex;
  let maleIdx = unitIndex;
  const usedVoices = new Set<string>();

  const pickVoice = (gender: 'female' | 'male'): string => {
    const pool = gender === 'female' ? FEMALE_VOICES : MALE_VOICES;
    for (let offset = 0; offset < pool.length; offset += 1) {
      const idx = (gender === 'female' ? femaleIdx : maleIdx) + offset;
      const candidate = pool[idx % pool.length];
      if (!usedVoices.has(candidate)) {
        usedVoices.add(candidate);
        if (gender === 'female') femaleIdx += 1;
        else maleIdx += 1;
        return candidate;
      }
    }
    const fallback = pool[(gender === 'female' ? femaleIdx : maleIdx) % pool.length];
    if (gender === 'female') femaleIdx += 1;
    else maleIdx += 1;
    return fallback;
  };

  const turns: DialogueTurn[] = rawTurns.map((rt, idx) => {
    const normKey = rt.label.toLowerCase();
    let profile = speakerMap.get(normKey);
    if (!profile) {
      const spkNumber = speakerMap.size + 1;
      const gender =
        rawTurns.length === 1
          ? unitIndex % 2 === 0
            ? 'female'
            : 'male'
          : inferGender(rt.label, spkNumber - 1 + unitIndex);
      const displayLabel =
        rawTurns.length === 1 && rt.label === 'Sprecher'
          ? gender === 'female'
            ? 'Sprecherin'
            : 'Sprecher'
          : rt.label;
      profile = {
        speakerId: `spk-${spkNumber}`,
        name: displayLabel,
        roleDe: rawTurns.length === 1 ? 'Einzelsprecher / Ansage' : displayLabel,
        gender,
        edgeVoiceDe: pickVoice(gender),
        rateOffsetPercent: rateOffset,
      };
      speakerMap.set(normKey, profile);
    }

    return {
      turnIndex: idx + 1,
      speakerId: profile.speakerId,
      speakerLabel: profile.name,
      textDe: rt.text,
      pauseAfterMs: idx === rawTurns.length - 1 ? 0 : pauseMs,
    };
  });

  return {
    speakers: [...speakerMap.values()],
    turns,
  };
}
