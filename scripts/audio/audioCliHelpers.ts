import { execFileSync, spawnSync, StdioOptions } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ListeningScriptEntry } from '../../src/types/listeningAudio.ts';

export interface CommandLookupDeps {
  platform?: NodeJS.Platform;
  env?: NodeJS.ProcessEnv;
  existsSync?: (targetPath: string) => boolean;
  spawnSyncFn?: typeof spawnSync;
}

export interface BatchFailureEntry {
  exerciseId: string;
  scriptId: string;
  audioPath: string;
  errorMessage: string;
  timestampIso: string;
}

export type ScriptProcessOutcome = 'rendered' | 'skipped' | 'dry-run';

export interface AudioBatchExecutionResult {
  total: number;
  succeeded: number;
  skipped: number;
  failed: number;
  dryRunCount: number;
  failures: BatchFailureEntry[];
}

function getWindowsPathExts(env: NodeJS.ProcessEnv): string[] {
  const raw = env.PATHEXT || '.COM;.EXE;.BAT;.CMD';
  return raw
    .split(';')
    .map((ext) => ext.trim())
    .filter(Boolean);
}

function scanPathForCommand(
  cmd: string,
  platform: NodeJS.Platform,
  env: NodeJS.ProcessEnv,
  existsSyncFn: (targetPath: string) => boolean,
): string | null {
  const pathHelpers = platform === 'win32' ? path.win32 : path.posix;
  const rawPath = platform === 'win32' ? (env.PATH ?? env.Path ?? '') : (env.PATH ?? '');
  if (!rawPath) return null;

  const dirs = rawPath
    .split(pathHelpers.delimiter)
    .map((d) => d.trim().replace(/^"(.*)"$/, '$1'))
    .filter(Boolean);

  if (platform === 'win32') {
    const hasExt = Boolean(pathHelpers.extname(cmd));
    const rawExts = hasExt ? [''] : getWindowsPathExts(env);
    const exts = [...new Set(rawExts.flatMap((ext) => [ext.toLowerCase(), ext]))];
    for (const dir of dirs) {
      for (const ext of exts) {
        const candidate = pathHelpers.join(dir, `${cmd}${ext}`);
        if (existsSyncFn(candidate)) {
          return candidate;
        }
      }
    }
    return null;
  }

  for (const dir of dirs) {
    const candidate = pathHelpers.join(dir, cmd);
    if (existsSyncFn(candidate)) {
      return candidate;
    }
  }
  return null;
}

export function resolveExecutablePath(cmd: string, deps?: CommandLookupDeps): string | null {
  const platform = deps?.platform ?? process.platform;
  const env = deps?.env ?? process.env;
  const existsSyncFn = deps?.existsSync ?? fs.existsSync;
  const spawnSyncFn = deps?.spawnSyncFn ?? spawnSync;

  const trimmed = cmd.trim();
  if (!trimmed) return null;

  if (platform === 'win32') {
    for (const finder of ['where.exe', 'where']) {
      const res = spawnSyncFn(finder, [trimmed], {
        encoding: 'utf8',
        windowsHide: true,
        env,
      });
      if (res.status === 0 && typeof res.stdout === 'string') {
        const lines = res.stdout
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean);
        for (const line of lines) {
          if (existsSyncFn(line)) {
            return line;
          }
        }
        if (lines.length > 0) {
          return lines[0];
        }
      }
    }
    return scanPathForCommand(trimmed, 'win32', env, existsSyncFn);
  }

  const res = spawnSyncFn('which', [trimmed], {
    encoding: 'utf8',
    env,
  });
  if (res.status === 0 && typeof res.stdout === 'string') {
    const first = res.stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find(Boolean);
    if (first) return first;
  }

  return scanPathForCommand(trimmed, platform, env, existsSyncFn);
}

export function commandExists(cmd: string, deps?: CommandLookupDeps): boolean {
  return Boolean(resolveExecutablePath(cmd, deps));
}

export function execResolvedBinarySync(
  cmd: string,
  args: string[],
  options: {
    resolvedPath?: string | null;
    stdio?: StdioOptions;
    input?: string;
    encoding?: BufferEncoding;
  } = {},
): string | Buffer {
  const target = options.resolvedPath?.trim() || cmd;
  const isWinBatchWrapper =
    process.platform === 'win32' && /\.(cmd|bat)$/i.test(target);

  return execFileSync(target, args, {
    stdio: options.stdio ?? 'pipe',
    ...(options.input !== undefined ? { input: options.input } : {}),
    ...(options.encoding ? { encoding: options.encoding } : {}),
    windowsHide: true,
    ...(isWinBatchWrapper ? { shell: true } : {}),
  });
}

export function formatEdgeRate(offsetPercent: number): string {
  if (offsetPercent === 0) return '+0%';
  return offsetPercent > 0 ? `+${offsetPercent}%` : `${offsetPercent}%`;
}

export function normalizeTtsText(text: string): string {
  return text.replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ').trim();
}

export function buildEdgeTtsArgs(params: {
  voice: string;
  rateOffsetPercent: number;
  text: string;
  outPath: string;
}): string[] {
  return [
    '--voice',
    params.voice,
    `--rate=${formatEdgeRate(params.rateOffsetPercent)}`,
    '--text',
    normalizeTtsText(params.text),
    '--write-media',
    params.outPath,
  ];
}

export function normalizeConcatPath(filePath: string): string {
  return filePath.replace(/\\/g, '/');
}

export function formatFfmpegConcatLine(filePath: string): string {
  const normalized = normalizeConcatPath(filePath);
  const escaped = normalized.replace(/'/g, "'\\''");
  return `file '${escaped}'`;
}

export function buildFfmpegConcatContent(segmentPaths: string[]): string {
  return segmentPaths.map((p) => formatFfmpegConcatLine(p)).join('\n');
}

export async function runAudioBatchLoop(params: {
  targets: ListeningScriptEntry[];
  processItem: (entry: ListeningScriptEntry) => Promise<ScriptProcessOutcome>;
  onFailure?: (failure: BatchFailureEntry) => void;
}): Promise<AudioBatchExecutionResult> {
  let succeeded = 0;
  let skipped = 0;
  let failed = 0;
  let dryRunCount = 0;
  const failures: BatchFailureEntry[] = [];

  for (const entry of params.targets) {
    try {
      const outcome = await params.processItem(entry);
      if (outcome === 'rendered') succeeded += 1;
      else if (outcome === 'skipped') skipped += 1;
      else if (outcome === 'dry-run') dryRunCount += 1;
    } catch (error) {
      failed += 1;
      const errorMessage = error instanceof Error ? error.message : String(error);
      const failure: BatchFailureEntry = {
        exerciseId: entry.exerciseId,
        scriptId: entry.scriptId,
        audioPath: entry.audioPath,
        errorMessage,
        timestampIso: new Date().toISOString(),
      };
      failures.push(failure);
      params.onFailure?.(failure);
    }
  }

  return {
    total: params.targets.length,
    succeeded,
    skipped,
    failed,
    dryRunCount,
    failures,
  };
}
