import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildEdgeTtsArgs,
  buildFfmpegConcatContent,
  commandExists,
  formatEdgeRate,
  formatFfmpegConcatLine,
  normalizeTtsText,
  resolveExecutablePath,
  runAudioBatchLoop,
} from './audioCliHelpers.ts';
import { ListeningScriptEntry } from '../../src/types/listeningAudio.ts';

test('resolveExecutablePath detects Windows binaries via where.exe and PATH+PATHEXT fallback', () => {
  const calls: string[] = [];
  const winResolved = resolveExecutablePath('ffmpeg', {
    platform: 'win32',
    env: { PATH: 'C:\\ffmpeg\\bin', PATHEXT: '.EXE;.CMD' },
    existsSync: (p) => p === 'C:\\ffmpeg\\bin\\ffmpeg.exe',
    spawnSyncFn: ((bin: string) => {
      calls.push(bin);
      return { status: 0, stdout: 'C:\\ffmpeg\\bin\\ffmpeg.exe\r\n' } as never;
    }) as never,
  });

  assert.equal(calls[0], 'where.exe');
  assert.equal(winResolved, 'C:\\ffmpeg\\bin\\ffmpeg.exe');

  // Fallback to PATH+PATHEXT scan if where.exe is unavailable or fails
  const fallbackResolved = resolveExecutablePath('edge-tts', {
    platform: 'win32',
    env: {
      PATH: 'C:\\Windows\\System32;C:\\Python312\\Scripts',
      PATHEXT: '.COM;.EXE;.BAT;.CMD',
    },
    existsSync: (p) => p === 'C:\\Python312\\Scripts\\edge-tts.exe',
    spawnSyncFn: (() => ({ status: 1, stdout: '' })) as never,
  });

  assert.equal(fallbackResolved, 'C:\\Python312\\Scripts\\edge-tts.exe');
  assert.equal(
    commandExists('ffprobe', {
      platform: 'win32',
      env: { PATH: 'C:\\ffmpeg\\bin', PATHEXT: '.EXE' },
      existsSync: (p) => p === 'C:\\ffmpeg\\bin\\ffprobe.exe',
      spawnSyncFn: (() => ({ status: 1, stdout: '' })) as never,
    }),
    true,
  );
});

test('resolveExecutablePath detects real ffmpeg and ffprobe binaries in current environment', () => {
  assert.equal(commandExists('ffmpeg'), true);
  assert.equal(commandExists('ffprobe'), true);
});

test('formatFfmpegConcatLine and buildFfmpegConcatContent normalize Windows backslashes and preserve safe quoting', () => {
  const line = formatFfmpegConcatLine("C:\\Users\\Adi O'Brien\\AppData\\Local\\Temp\\norm-0.mp3");
  assert.equal(line, "file 'C:/Users/Adi O'\\''Brien/AppData/Local/Temp/norm-0.mp3'");

  const content = buildFfmpegConcatContent([
    'C:\\Temp\\dm-audio\\turn-1.mp3',
    'C:\\Temp\\dm-audio\\pause-1.mp3',
  ]);
  assert.equal(
    content,
    "file 'C:/Temp/dm-audio/turn-1.mp3'\nfile 'C:/Temp/dm-audio/pause-1.mp3'",
  );
  assert.equal(content.includes('C:\\'), false);
});

test('buildEdgeTtsArgs formats --rate= flag safely for -12%, -6%, +0%, +4% and normalizes multiline text', () => {
  assert.equal(formatEdgeRate(-12), '-12%');
  assert.equal(formatEdgeRate(-6), '-6%');
  assert.equal(formatEdgeRate(0), '+0%');
  assert.equal(formatEdgeRate(4), '+4%');

  const normalized = normalizeTtsText('Guten Tag!\r\nWie geht es   Ihnen heute?\nAlles klar — Grüße aus München.');
  assert.equal(normalized, 'Guten Tag! Wie geht es Ihnen heute? Alles klar — Grüße aus München.');

  const argsA1 = buildEdgeTtsArgs({
    voice: 'de-DE-KatjaNeural',
    rateOffsetPercent: -12,
    text: 'Erste Zeile.\nZweite Zeile.',
    outPath: 'C:\\Temp\\turn-1.mp3',
  });
  assert.deepEqual(argsA1, [
    '--voice',
    'de-DE-KatjaNeural',
    '--rate=-12%',
    '--text',
    'Erste Zeile. Zweite Zeile.',
    '--write-media',
    'C:\\Temp\\turn-1.mp3',
  ]);

  const argsB1 = buildEdgeTtsArgs({
    voice: 'de-DE-ConradNeural',
    rateOffsetPercent: 0,
    text: 'Standardtempo',
    outPath: '/tmp/turn-1.mp3',
  });
  assert.equal(argsB1[2], '--rate=+0%');

  const argsB2 = buildEdgeTtsArgs({
    voice: 'de-DE-FlorianMultilingualNeural',
    rateOffsetPercent: 4,
    text: 'Schnelleres Diskussionstempo',
    outPath: '/tmp/turn-1.mp3',
  });
  assert.equal(argsB2[2], '--rate=+4%');
});

test('runAudioBatchLoop continues after per-script failures, records exact metadata, and returns counts', async () => {
  const makeEntry = (id: string, audioPath: string): ListeningScriptEntry => ({
    scriptId: `script-${id}`,
    exerciseId: id,
    provider: 'practice',
    level: 'B2',
    partNumber: 1,
    partTitleDe: id,
    topicDe: 'Test',
    contextDe: 'Test',
    targetPacingDe: 'Test',
    cefrRateHint: '+4%',
    estimatedDurationSeconds: 20,
    durationLabel: '0:20',
    playLimit: 1,
    audioFilename: `${id}.mp3`,
    audioPath,
    speakers: [],
    turns: [],
    fullTranscriptDe: 'Test',
    questions: [],
  });

  const targets = [
    makeEntry('ex-1', '/audio/practice/b2/ex-1.mp3'),
    makeEntry('ex-2', '/audio/practice/b2/ex-2.mp3'),
    makeEntry('ex-3', '/audio/practice/b2/ex-3.mp3'),
    makeEntry('ex-4', '/audio/practice/b2/ex-4.mp3'),
  ];

  const visited: string[] = [];
  const recordedFailures: string[] = [];

  const result = await runAudioBatchLoop({
    targets,
    processItem: async (entry) => {
      visited.push(entry.exerciseId);
      if (entry.exerciseId === 'ex-1') return 'skipped';
      if (entry.exerciseId === 'ex-2') throw new Error('Edge TTS timeout on turn 2');
      return 'rendered';
    },
    onFailure: (f) => {
      recordedFailures.push(f.exerciseId);
    },
  });

  assert.deepEqual(visited, ['ex-1', 'ex-2', 'ex-3', 'ex-4']);
  assert.deepEqual(recordedFailures, ['ex-2']);
  assert.equal(result.total, 4);
  assert.equal(result.succeeded, 2);
  assert.equal(result.skipped, 1);
  assert.equal(result.failed, 1);
  assert.equal(result.failures.length, 1);
  assert.equal(result.failures[0].exerciseId, 'ex-2');
  assert.equal(result.failures[0].audioPath, '/audio/practice/b2/ex-2.mp3');
  assert.match(result.failures[0].errorMessage, /Edge TTS timeout/);
});
