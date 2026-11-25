import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { loadVocabularyForLevel, VocabularyLevel } from '../../src/data/vocabulary/index.ts';
import { VocabularyEntry } from '../../src/types/vocabulary.ts';
import {
  findEdgeTtsExecutable,
  getVocabAudioDiskPath,
  normalizeVocabSpokenText,
} from './vocabAudioHelpers.ts';

interface GeneratorOptions {
  levels: VocabularyLevel[];
  dryRun: boolean;
  force: boolean;
  voice: string;
  rate: string;
  delayMs: number;
  limit?: number;
  onlyId?: string;
  edgeTtsPath?: string;
}

function parseCliArgs(argv: string[]): GeneratorOptions {
  const opts: GeneratorOptions = {
    levels: ['A1'],
    dryRun: false,
    force: false,
    voice: 'de-DE-KillianNeural',
    rate: '+0%',
    delayMs: 80,
  };

  for (const arg of argv) {
    if (arg === '--dry-run') {
      opts.dryRun = true;
    } else if (arg === '--force') {
      opts.force = true;
    } else if (arg.startsWith('--level=')) {
      const val = arg.split('=')[1]?.toUpperCase();
      if (val === 'ALL') {
        opts.levels = ['A1', 'A2', 'B1', 'B2'];
      } else if (val === 'A1' || val === 'A2' || val === 'B1' || val === 'B2') {
        opts.levels = [val];
      }
    } else if (arg.startsWith('--voice=')) {
      opts.voice = arg.split('=')[1] || opts.voice;
    } else if (arg.startsWith('--rate=')) {
      opts.rate = arg.split('=')[1] || opts.rate;
    } else if (arg.startsWith('--delay=')) {
      opts.delayMs = parseInt(arg.split('=')[1] || '80', 10);
    } else if (arg.startsWith('--limit=')) {
      opts.limit = parseInt(arg.split('=')[1] || '0', 10);
    } else if (arg.startsWith('--only=')) {
      opts.onlyId = arg.split('=')[1];
    } else if (arg.startsWith('--edge-tts-path=')) {
      opts.edgeTtsPath = arg.split('=')[1];
    }
  }

  return opts;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function renderAudioWithEdgeTts(
  edgeTtsExe: string,
  text: string,
  voice: string,
  rate: string,
  outputPath: string,
): { success: boolean; error?: string } {
  const args = ['--text', text, '--voice', voice, '--rate', rate, '--write-media', outputPath];

  const res = spawnSync(edgeTtsExe, args, {
    encoding: 'utf8',
    windowsHide: true,
    timeout: 15000,
  });

  if (res.status === 0 && fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    if (stats.size > 1024) {
      return { success: true };
    }
    return { success: false, error: `Output file too small (${stats.size} bytes)` };
  }

  const errOutput = (res.stderr || res.stdout || res.error?.message || 'Unknown error').trim();
  return { success: false, error: errOutput };
}

export async function runVocabAudioGenerator(argv: string[] = process.argv.slice(2)): Promise<void> {
  const options = parseCliArgs(argv);
  const projectRoot = process.cwd();
  const publicDir = path.resolve(projectRoot, 'public');

  console.log('===============================================================');
  console.log('🔊 DEUTSCHMEISTER - VOCABULARY AUDIO GENERATION PIPELINE');
  console.log('===============================================================');
  console.log(`Levels         : ${options.levels.join(', ')}`);
  console.log(`Voice          : ${options.voice}`);
  console.log(`Speech Rate    : ${options.rate}`);
  console.log(`Dry Run        : ${options.dryRun ? 'YES (No audio rendered)' : 'NO'}`);
  console.log(`Force Overwrite: ${options.force ? 'YES' : 'NO (Resume enabled)'}`);
  console.log(`Inter-call Delay: ${options.delayMs}ms`);
  if (options.limit) console.log(`Limit          : ${options.limit} items per level`);
  if (options.onlyId) console.log(`Only ID        : ${options.onlyId}`);

  const edgeTtsExe = findEdgeTtsExecutable(options.edgeTtsPath);
  if (!options.dryRun) {
    if (!edgeTtsExe) {
      console.error('\n❌ ERROR: edge-tts executable not found on system.');
      console.error('Please install edge-tts via Python: pip install edge-tts');
      process.exit(1);
    }
    console.log(`edge-tts binary: ${edgeTtsExe}`);
  }
  console.log('---------------------------------------------------------------\n');

  let totalProcessed = 0;
  let totalRendered = 0;
  let totalSkipped = 0;
  let totalFailed = 0;
  let totalDryRun = 0;
  let totalBytesGenerated = 0;

  for (const level of options.levels) {
    console.log(`\n▶ Processing Level ${level}...`);
    const entries: VocabularyEntry[] = await loadVocabularyForLevel(level);

    let targetEntries = entries;
    if (options.onlyId) {
      targetEntries = entries.filter((e) => e.id === options.onlyId);
    }
    if (options.limit && options.limit > 0) {
      targetEntries = targetEntries.slice(0, options.limit);
    }

    const levelDir = path.join(publicDir, 'audio', 'vocab', level.toLowerCase());
    if (!fs.existsSync(levelDir)) {
      fs.mkdirSync(levelDir, { recursive: true });
    }

    console.log(`Found ${targetEntries.length} vocabulary entries for ${level}. Output dir: ${levelDir}\n`);

    for (let i = 0; i < targetEntries.length; i++) {
      const entry = targetEntries[i];
      totalProcessed += 1;
      const spokenText = normalizeVocabSpokenText(entry);
      const outputDiskPath = getVocabAudioDiskPath(publicDir, level, entry.id);
      const prefix = `[${level}] [${i + 1}/${targetEntries.length}] ${entry.id} ("${spokenText}")`;

      // 1. Resume mechanism: Check if file already exists
      if (!options.force && fs.existsSync(outputDiskPath)) {
        const stats = fs.statSync(outputDiskPath);
        if (stats.size > 1024) {
          totalSkipped += 1;
          console.log(`${prefix} -> ⏩ SKIPPED (Already exists: ${(stats.size / 1024).toFixed(1)} KB)`);
          continue;
        }
      }

      // 2. Dry run simulation
      if (options.dryRun) {
        totalDryRun += 1;
        console.log(`${prefix} -> 🔍 DRY-RUN [Would render -> ${path.basename(outputDiskPath)}]`);
        continue;
      }

      // 3. Render audio via edge-tts
      let renderResult = renderAudioWithEdgeTts(
        edgeTtsExe!,
        spokenText,
        options.voice,
        options.rate,
        outputDiskPath,
      );

      // Retry once if failed
      if (!renderResult.success) {
        await sleep(500);
        renderResult = renderAudioWithEdgeTts(
          edgeTtsExe!,
          spokenText,
          options.voice,
          options.rate,
          outputDiskPath,
        );
      }

      if (renderResult.success) {
        totalRendered += 1;
        const stats = fs.statSync(outputDiskPath);
        totalBytesGenerated += stats.size;
        console.log(`${prefix} -> ✅ RENDERED (${(stats.size / 1024).toFixed(1)} KB)`);
      } else {
        totalFailed += 1;
        console.error(`${prefix} -> ❌ FAILED: ${renderResult.error}`);
      }

      if (options.delayMs > 0 && i < targetEntries.length - 1) {
        await sleep(options.delayMs);
      }
    }
  }

  console.log('\n===============================================================');
  console.log('📊 EXECUTION SUMMARY');
  console.log('===============================================================');
  console.log(`Total Processed : ${totalProcessed}`);
  console.log(`Rendered        : ${totalRendered}`);
  console.log(`Skipped (Cached): ${totalSkipped}`);
  console.log(`Dry Run         : ${totalDryRun}`);
  console.log(`Failed          : ${totalFailed}`);
  if (totalBytesGenerated > 0) {
    console.log(`Total Data Gen  : ${(totalBytesGenerated / 1024 / 1024).toFixed(2)} MB`);
  }
  console.log('===============================================================\n');

  if (totalRendered > 0) {
    console.log('💡 NEXT STEP: Run verify and patch script to update audioPath in data files:');
    console.log('   npx tsx scripts/audio/verify-vocab-audio.ts --apply\n');
  }
}

if (process.argv[1]?.endsWith('generate-vocab-audio.ts')) {
  runVocabAudioGenerator().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
