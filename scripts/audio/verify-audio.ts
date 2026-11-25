import fs from 'node:fs';
import path from 'node:path';
import {
  isListeningScriptPathValid,
  validateListeningScript,
} from '../../src/data/listeningScripts/index.ts';
import { loadAllListeningScriptsAcrossAppAsync } from '../../src/data/practiceListeningScripts.ts';
import {
  AudioManifestEntry,
  AudioSourceType,
  ManifestAudioStatus,
} from '../../src/types/listeningAudio.ts';
import { execResolvedBinarySync, resolveExecutablePath } from './audioCliHelpers.ts';

function isValidMp3Buffer(buf: Buffer): boolean {
  if (buf.length < 16) return false;
  // Check ID3v2 header ("ID3")
  if (buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) {
    return true;
  }
  // Check MPEG audio frame sync (11 set bits: 0xFF followed by 0xE0..0xFF)
  if (buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0) {
    return true;
  }
  return false;
}

function formatDurationLabel(seconds: number): string {
  const rounded = Math.max(1, Math.round(seconds));
  const mins = Math.floor(rounded / 60);
  const secs = rounded % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function probeDurationSeconds(filePath: string, ffprobePath?: string | null): number | null {
  try {
    const out = String(
      execResolvedBinarySync(
        'ffprobe',
        [
          '-v',
          'error',
          '-show_entries',
          'format=duration',
          '-of',
          'default=noprint_wrappers=1:nokey=1',
          filePath,
        ],
        {
          resolvedPath: ffprobePath,
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'ignore'],
        },
      ),
    ).trim();
    const parsed = Number(out);
    return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null;
  } catch {
    return null;
  }
}

function loadExistingManifestTypes(manifestPath: string): Map<string, AudioSourceType> {
  const map = new Map<string, AudioSourceType>();
  if (!fs.existsSync(manifestPath)) return map;
  try {
    const raw = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as {
      entries?: Array<{ exerciseId?: string; audioType?: AudioSourceType }>;
    };
    for (const item of raw.entries ?? []) {
      if (item.exerciseId && (item.audioType === 'human_recording' || item.audioType === 'synthetic')) {
        map.set(item.exerciseId, item.audioType);
      }
    }
  } catch {
    // Ignore malformed prior manifest
  }
  return map;
}

async function main() {
  const cliTypeArg = process.argv.find((a) => a.startsWith('--audio-type='));
  const forcedType = cliTypeArg?.split('=')[1];
  const manifestPath = path.join(process.cwd(), 'src', 'data', 'audioManifest.generated.json');
  const reportOutDir = path.join(process.cwd(), 'scripts', 'audio', 'output');
  fs.mkdirSync(reportOutDir, { recursive: true });

  const allScripts = await loadAllListeningScriptsAcrossAppAsync();
  const previousTypes = loadExistingManifestTypes(manifestPath);
  const ffprobePath = resolveExecutablePath('ffprobe');
  const nowIso = new Date().toISOString();

  const brokenPaths: string[] = [];
  const invalidScripts: string[] = [];
  const seenPaths = new Set<string>();
  const duplicatePaths: string[] = [];
  const entries: AudioManifestEntry[] = [];

  for (const script of allScripts) {
    if (!isListeningScriptPathValid(script)) {
      brokenPaths.push(script.exerciseId);
    }
    if (validateListeningScript(script).length > 0) {
      invalidScripts.push(script.exerciseId);
    }
    if (seenPaths.has(script.audioPath)) {
      duplicatePaths.push(script.audioPath);
    } else {
      seenPaths.add(script.audioPath);
    }

    const diskPath = path.join(process.cwd(), 'public', script.audioPath.replace(/^\//, ''));
    let verifiedBytes = 0;
    let status: ManifestAudioStatus = script.examQuestionId ? 'missing' : 'pending';
    let durationSeconds = script.estimatedDurationSeconds;
    let duration = script.durationLabel;

    if (fs.existsSync(diskPath)) {
      const stats = fs.statSync(diskPath);
      if (stats.isFile() && stats.size > 1024) {
        const fd = fs.openSync(diskPath, 'r');
        const header = Buffer.alloc(16);
        fs.readSync(fd, header, 0, 16, 0);
        fs.closeSync(fd);

        if (isValidMp3Buffer(header)) {
          verifiedBytes = stats.size;
          status = 'available';
          if (ffprobePath) {
            const measured = probeDurationSeconds(diskPath, ffprobePath);
            if (measured) {
              durationSeconds = measured;
              duration = formatDurationLabel(measured);
            }
          }
        }
      }
    }

    const audioType: AudioSourceType =
      forcedType === 'human_recording' || forcedType === 'synthetic'
        ? forcedType
        : previousTypes.get(script.exerciseId) ?? 'synthetic';

    entries.push({
      exerciseId: script.exerciseId,
      provider: script.provider,
      level: script.level,
      partNumber: script.partNumber,
      titleDe: script.partTitleDe,
      audioPath: script.audioPath,
      scriptId: script.scriptId,
      duration,
      durationSeconds,
      audioType,
      status,
      verifiedBytes,
      lastVerifiedIso: nowIso,
    });
  }

  const manifestPayload = {
    generatedAtIso: nowIso,
    verifiedBy: 'scripts/audio/verify-audio.ts',
    entries,
  };

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifestPayload, null, 2)}\n`, 'utf8');

  const available = entries.filter((e) => e.status === 'available').length;
  const missing = entries.filter((e) => e.status === 'missing').length;
  const pending = entries.filter((e) => e.status === 'pending').length;
  const coveragePercent = entries.length > 0 ? Math.round((available / entries.length) * 100) : 0;

  const coverageReport = {
    generatedAtIso: nowIso,
    totalScripts: entries.length,
    uniqueAudioFiles: seenPaths.size,
    examScripts: entries.filter((e) => e.provider !== 'practice').length,
    practiceUnits: entries.filter((e) => e.provider === 'practice').length,
    availableMp3Count: available,
    missingMp3Count: missing,
    pendingAudioCount: pending,
    coveragePercent,
    brokenPathExerciseIds: brokenPaths,
    invalidScriptExerciseIds: invalidScripts,
    duplicateAudioPaths: duplicatePaths,
    entries,
  };

  fs.writeFileSync(
    path.join(reportOutDir, 'coverage-report.json'),
    `${JSON.stringify(coverageReport, null, 2)}\n`,
    'utf8',
  );

  console.log('Audio verification complete:');
  console.log(`- Total unique listening audio files: ${seenPaths.size} (${entries.length} entries)`);
  console.log(`- Exam scripts (Goethe & telc): ${coverageReport.examScripts}`);
  console.log(`- Practice Hoeren units (A1-B2): ${coverageReport.practiceUnits}`);
  console.log(`- Verified MP3 files available: ${available}`);
  console.log(`- Missing MP3 files (exam-linked): ${missing}`);
  console.log(`- Pending audio files (supplementary & practice): ${pending}`);
  console.log(`- Audio coverage: ${coveragePercent}%`);
  console.log(
    `- Broken paths: ${brokenPaths.length} | Invalid scripts: ${invalidScripts.length} | Duplicates: ${duplicatePaths.length}`,
  );
}

void main();
