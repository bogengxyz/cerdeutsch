import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadAllListeningScriptsAcrossAppAsync } from '../../src/data/practiceListeningScripts.ts';
import { ListeningProvider, ListeningScriptEntry } from '../../src/types/listeningAudio.ts';
import {
  buildEdgeTtsArgs,
  buildFfmpegConcatContent,
  execResolvedBinarySync,
  normalizeTtsText,
  resolveExecutablePath,
  runAudioBatchLoop,
  ScriptProcessOutcome,
} from './audioCliHelpers.ts';

type TtsProvider = 'edge-tts' | 'piper' | 'openai';
type BatchScope = 'all' | 'exams' | 'practice';

interface CliOptions {
  provider: TtsProvider;
  scope: BatchScope;
  dryRun: boolean;
  force: boolean;
  only?: string;
  examProvider?: ListeningProvider;
  level?: 'A1' | 'A2' | 'B1' | 'B2';
}

interface ResolvedBinaries {
  ffmpegPath: string | null;
  edgeTtsPath: string | null;
  piperPath: string | null;
}

function parseArgs(argv: string[]): CliOptions {
  const opts: CliOptions = {
    provider: 'edge-tts',
    scope: 'all',
    dryRun: false,
    force: false,
  };
  for (const arg of argv) {
    if (arg === '--dry-run') opts.dryRun = true;
    else if (arg === '--force') opts.force = true;
    else if (arg.startsWith('--provider=')) {
      const val = arg.split('=')[1];
      if (val === 'edge-tts' || val === 'piper' || val === 'openai') {
        opts.provider = val;
      }
    } else if (arg.startsWith('--scope=')) {
      const val = arg.split('=')[1];
      if (val === 'all' || val === 'exams' || val === 'practice') {
        opts.scope = val;
      }
    } else if (arg.startsWith('--only=')) {
      opts.only = arg.split('=')[1];
    } else if (arg.startsWith('--exam=')) {
      const val = arg.split('=')[1];
      if (val === 'goethe' || val === 'telc' || val === 'practice') opts.examProvider = val;
    } else if (arg.startsWith('--level=')) {
      const val = arg.split('=')[1]?.toUpperCase();
      if (val === 'A1' || val === 'A2' || val === 'B1' || val === 'B2') opts.level = val;
    }
  }
  return opts;
}

function synthesizeTurnWithEdgeTts(params: {
  text: string;
  voice: string;
  rateOffsetPercent: number;
  outPath: string;
  edgeTtsPath?: string | null;
}) {
  const args = buildEdgeTtsArgs({
    voice: params.voice,
    rateOffsetPercent: params.rateOffsetPercent,
    text: params.text,
    outPath: params.outPath,
  });
  execResolvedBinarySync('edge-tts', args, {
    resolvedPath: params.edgeTtsPath,
    stdio: 'inherit',
  });
}

function synthesizeTurnWithPiper(params: {
  text: string;
  modelPath: string;
  rateOffsetPercent: number;
  outPath: string;
  piperPath?: string | null;
}) {
  const lengthScale = Math.max(0.75, Math.min(1.4, 1 - params.rateOffsetPercent / 100));
  execResolvedBinarySync(
    'piper',
    ['--model', params.modelPath, '--length_scale', lengthScale.toFixed(2), '--output_file', params.outPath],
    {
      resolvedPath: params.piperPath,
      input: normalizeTtsText(params.text),
      stdio: ['pipe', 'inherit', 'inherit'],
    },
  );
}

async function synthesizeTurnWithOpenAi(params: {
  text: string;
  gender: 'female' | 'male' | 'neutral';
  rateOffsetPercent: number;
  outPath: string;
  apiKey: string;
}) {
  const voice = params.gender === 'male' ? 'onyx' : 'nova';
  const speed = Math.max(0.75, Math.min(1.25, 1 + params.rateOffsetPercent / 100));
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini-tts',
      input: normalizeTtsText(params.text),
      voice,
      speed,
      format: 'mp3',
      instructions: 'Speak clear natural German (de-DE) matching a Goethe/telc listening exam.',
    }),
  });
  if (!response.ok) {
    throw new Error(`OpenAI TTS error (${response.status}): ${await response.text()}`);
  }
  const buf = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(params.outPath, buf);
}

function buildSilenceSegment(durationMs: number, outPath: string, ffmpegPath?: string | null) {
  const seconds = Math.max(0.1, durationMs / 1000);
  execResolvedBinarySync(
    'ffmpeg',
    [
      '-y',
      '-f',
      'lavfi',
      '-i',
      'anullsrc=r=24000:cl=mono',
      '-t',
      seconds.toFixed(3),
      '-acodec',
      'libmp3lame',
      '-b:a',
      '128k',
      outPath,
    ],
    { resolvedPath: ffmpegPath, stdio: 'pipe' },
  );
}

function concatSegmentsToFinalMp3(
  segmentPaths: string[],
  destPath: string,
  tempDir: string,
  ffmpegPath?: string | null,
) {
  const normalizedSegments: string[] = [];
  for (let i = 0; i < segmentPaths.length; i += 1) {
    const normPath = path.join(tempDir, `norm-${i}.mp3`);
    execResolvedBinarySync(
      'ffmpeg',
      [
        '-y',
        '-i',
        segmentPaths[i],
        '-ar',
        '44100',
        '-ac',
        '1',
        '-acodec',
        'libmp3lame',
        '-b:a',
        '128k',
        normPath,
      ],
      { resolvedPath: ffmpegPath, stdio: 'pipe' },
    );
    normalizedSegments.push(normPath);
  }

  const listFile = path.join(tempDir, 'concat.txt');
  const listContent = buildFfmpegConcatContent(normalizedSegments);
  fs.writeFileSync(listFile, listContent, 'utf8');

  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  execResolvedBinarySync(
    'ffmpeg',
    [
      '-y',
      '-f',
      'concat',
      '-safe',
      '0',
      '-i',
      listFile,
      '-af',
      'loudnorm=I=-16:TP=-1.5:LRA=11',
      '-ar',
      '44100',
      '-ac',
      '1',
      '-acodec',
      'libmp3lame',
      '-b:a',
      '128k',
      destPath,
    ],
    { resolvedPath: ffmpegPath, stdio: 'pipe' },
  );
}

async function processScript(
  entry: ListeningScriptEntry,
  opts: CliOptions,
  binaries: ResolvedBinaries,
  piperModel?: string,
): Promise<ScriptProcessOutcome> {
  const destPath = path.join(process.cwd(), 'public', entry.audioPath.replace(/^\//, ''));
  if (!opts.force && fs.existsSync(destPath) && fs.statSync(destPath).size > 1024) {
    console.log(`[skip] ${entry.exerciseId} already exists (${entry.audioPath})`);
    return 'skipped';
  }

  if (opts.dryRun) {
    console.log(
      `[dry-run] Would render ${entry.exerciseId} (${entry.turns.length} turns, provider=${opts.provider}) -> public${entry.audioPath}`,
    );
    return 'dry-run';
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `dm-audio-${entry.scriptId}-`));
  try {
    const speakerById = new Map(entry.speakers.map((s) => [s.speakerId, s]));
    const segmentPaths: string[] = [];

    for (const turn of entry.turns) {
      const spk = speakerById.get(turn.speakerId);
      const voice = spk?.edgeVoiceDe ?? 'de-DE-KatjaNeural';
      const rate = spk?.rateOffsetPercent ?? 0;
      const gender = spk?.gender ?? 'female';

      if (opts.provider === 'edge-tts') {
        const turnMp3 = path.join(tempDir, `turn-${turn.turnIndex}.mp3`);
        synthesizeTurnWithEdgeTts({
          text: turn.textDe,
          voice,
          rateOffsetPercent: rate,
          outPath: turnMp3,
          edgeTtsPath: binaries.edgeTtsPath,
        });
        segmentPaths.push(turnMp3);
      } else if (opts.provider === 'piper') {
        const turnWav = path.join(tempDir, `turn-${turn.turnIndex}.wav`);
        synthesizeTurnWithPiper({
          text: turn.textDe,
          modelPath: piperModel ?? '',
          rateOffsetPercent: rate,
          outPath: turnWav,
          piperPath: binaries.piperPath,
        });
        segmentPaths.push(turnWav);
      } else {
        const turnMp3 = path.join(tempDir, `turn-${turn.turnIndex}.mp3`);
        await synthesizeTurnWithOpenAi({
          text: turn.textDe,
          gender,
          rateOffsetPercent: rate,
          outPath: turnMp3,
          apiKey: process.env.OPENAI_API_KEY ?? '',
        });
        segmentPaths.push(turnMp3);
      }

      if (turn.pauseAfterMs > 0) {
        const pauseMp3 = path.join(tempDir, `pause-${turn.turnIndex}.mp3`);
        buildSilenceSegment(turn.pauseAfterMs, pauseMp3, binaries.ffmpegPath);
        segmentPaths.push(pauseMp3);
      }
    }

    concatSegmentsToFinalMp3(segmentPaths, destPath, tempDir, binaries.ffmpegPath);
    const bytes = fs.statSync(destPath).size;
    console.log(`[ok] Rendered ${entry.exerciseId} -> public${entry.audioPath} (${bytes} bytes)`);
    return 'rendered';
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const allScripts = await loadAllListeningScriptsAcrossAppAsync();

  const targets = allScripts.filter((entry) => {
    if (opts.scope === 'exams' && entry.provider === 'practice') return false;
    if (opts.scope === 'practice' && entry.provider !== 'practice') return false;
    if (opts.only && entry.exerciseId !== opts.only && entry.scriptId !== opts.only) return false;
    if (opts.examProvider && entry.provider !== opts.examProvider) return false;
    if (opts.level && entry.level !== opts.level) return false;
    return true;
  });

  if (targets.length === 0) {
    console.error('No listening scripts matched the provided filters.');
    process.exit(1);
  }

  const binaries: ResolvedBinaries = {
    ffmpegPath: opts.dryRun ? null : resolveExecutablePath('ffmpeg'),
    edgeTtsPath: opts.dryRun || opts.provider !== 'edge-tts' ? null : resolveExecutablePath('edge-tts'),
    piperPath: opts.dryRun || opts.provider !== 'piper' ? null : resolveExecutablePath('piper'),
  };

  if (!opts.dryRun) {
    if (!binaries.ffmpegPath) {
      console.error('Missing required binary: ffmpeg. Please install ffmpeg before generating MP3s.');
      process.exit(1);
    }
    if (opts.provider === 'edge-tts' && !binaries.edgeTtsPath) {
      console.error(
        [
          'No local edge-tts binary found in PATH.',
          'Install on your local workstation (free, no API key needed):',
          '  pip install edge-tts',
          '  npm run audio:generate',
          '  npm run audio:verify',
        ].join('\n'),
      );
      process.exit(1);
    }
    if (opts.provider === 'piper') {
      if (!binaries.piperPath || !process.env.PIPER_MODEL_DE) {
        console.error(
          'Missing piper binary or PIPER_MODEL_DE environment variable pointing to a de_DE .onnx voice model.',
        );
        process.exit(1);
      }
    }
    if (opts.provider === 'openai' && !process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY must be set locally when using --provider=openai.');
      process.exit(1);
    }
  }

  const batchResult = await runAudioBatchLoop({
    targets,
    processItem: (entry) => processScript(entry, opts, binaries, process.env.PIPER_MODEL_DE),
    onFailure: (failure) => {
      console.error(
        `[fail] ${failure.exerciseId} (${failure.audioPath}): ${failure.errorMessage}`,
      );
    },
  });

  if (opts.dryRun) {
    console.log(
      `\n[dry-run summary] total=${batchResult.total}, wouldRender=${batchResult.dryRunCount}, skipped=${batchResult.skipped}, failed=${batchResult.failed}`,
    );
    return;
  }

  console.log('\nBatch summary:');
  console.log(`- Total matched: ${batchResult.total}`);
  console.log(`- Succeeded: ${batchResult.succeeded}`);
  console.log(`- Skipped (existing >1KB MP3): ${batchResult.skipped}`);
  console.log(`- Failed: ${batchResult.failed}`);

  const failureReportPath = path.join(
    process.cwd(),
    'scripts',
    'audio',
    'output',
    'generation-failures.json',
  );

  if (batchResult.failed > 0) {
    fs.mkdirSync(path.dirname(failureReportPath), { recursive: true });
    const failureReport = {
      generatedAtIso: new Date().toISOString(),
      provider: opts.provider,
      scope: opts.scope,
      level: opts.level ?? 'Alle',
      totalMatched: batchResult.total,
      succeeded: batchResult.succeeded,
      skipped: batchResult.skipped,
      failed: batchResult.failed,
      failures: batchResult.failures.map((f) => ({
        ...f,
        retryCommand: `npm run audio:generate -- --only=${f.exerciseId}`,
      })),
    };
    fs.writeFileSync(failureReportPath, `${JSON.stringify(failureReport, null, 2)}\n`, 'utf8');
    console.error(
      `\nFailure report saved to ${path.relative(process.cwd(), failureReportPath)}. Re-run failed items or run the batch command again to resume.`,
    );
    process.exitCode = 1;
    return;
  }

  if (fs.existsSync(failureReportPath)) {
    fs.rmSync(failureReportPath, { force: true });
  }
  console.log('\nNext step: run `npm run audio:verify` to validate MP3 headers and update the manifest.');
}

void main();
