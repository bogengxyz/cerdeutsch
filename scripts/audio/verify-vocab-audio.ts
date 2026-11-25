import fs from 'node:fs';
import path from 'node:path';
import { loadVocabularyForLevel, VocabularyLevel } from '../../src/data/vocabulary/index.ts';
import { VocabularyEntry } from '../../src/types/vocabulary.ts';
import {
  getVocabAudioDiskPath,
  getVocabAudioRelativePath,
  patchVocabTsFileContent,
} from './vocabAudioHelpers.ts';

interface VerifyOptions {
  levels: VocabularyLevel[];
  applyPatch: boolean;
}

function parseCliArgs(argv: string[]): VerifyOptions {
  const opts: VerifyOptions = {
    levels: ['A1'],
    applyPatch: false,
  };

  for (const arg of argv) {
    if (arg === '--apply' || arg === '--patch') {
      opts.applyPatch = true;
    } else if (arg.startsWith('--level=')) {
      const val = arg.split('=')[1]?.toUpperCase();
      if (val === 'ALL') {
        opts.levels = ['A1', 'A2', 'B1', 'B2'];
      } else if (val === 'A1' || val === 'A2' || val === 'B1' || val === 'B2') {
        opts.levels = [val];
      }
    }
  }

  return opts;
}

export async function runVocabAudioVerifier(argv: string[] = process.argv.slice(2)): Promise<void> {
  const options = parseCliArgs(argv);
  const projectRoot = process.cwd();
  const publicDir = path.resolve(projectRoot, 'public');

  console.log('===============================================================');
  console.log('🔍 DEUTSCHMEISTER - VOCABULARY AUDIO VERIFIER & AUTO-PATCHER');
  console.log('===============================================================');
  console.log(`Levels      : ${options.levels.join(', ')}`);
  console.log(`Mode        : ${options.applyPatch ? 'APPLY / PATCH DATA FILES' : 'AUDIT REPORT ONLY'}`);
  console.log('---------------------------------------------------------------\n');

  let grandTotalEntries = 0;
  let grandTotalValidAudio = 0;
  let grandTotalMissingAudio = 0;
  let grandTotalTaggedInTs = 0;
  let grandTotalPatchedAdded = 0;
  let grandTotalPatchedRemoved = 0;

  for (const level of options.levels) {
    const levelLower = level.toLowerCase();
    const sourceFilePath = path.resolve(projectRoot, 'src', 'data', 'vocabulary', `${levelLower}.ts`);

    if (!fs.existsSync(sourceFilePath)) {
      console.error(`❌ Source file not found: ${sourceFilePath}`);
      continue;
    }

    const entries: VocabularyEntry[] = await loadVocabularyForLevel(level);
    const audioExistenceMap = new Map<string, boolean>();

    let validAudioCount = 0;
    let missingAudioCount = 0;
    let currentlyTaggedCount = 0;

    for (const entry of entries) {
      const audioDiskPath = getVocabAudioDiskPath(publicDir, level, entry.id);
      let isValidAudio = false;

      if (fs.existsSync(audioDiskPath)) {
        const stats = fs.statSync(audioDiskPath);
        if (stats.size > 1024) {
          isValidAudio = true;
        }
      }

      audioExistenceMap.set(entry.id, isValidAudio);

      if (isValidAudio) {
        validAudioCount += 1;
      } else {
        missingAudioCount += 1;
      }

      if (entry.audioPath) {
        currentlyTaggedCount += 1;
      }
    }

    grandTotalEntries += entries.length;
    grandTotalValidAudio += validAudioCount;
    grandTotalMissingAudio += missingAudioCount;
    grandTotalTaggedInTs += currentlyTaggedCount;

    const coveragePct = ((validAudioCount / entries.length) * 100).toFixed(1);

    console.log(`📊 [Level ${level}] Status Report:`);
    console.log(`   - Total Words Target  : ${entries.length}`);
    console.log(`   - Verified MP3 on Disk: ${validAudioCount} (${coveragePct}%)`);
    console.log(`   - Missing MP3 on Disk : ${missingAudioCount}`);
    console.log(`   - Tagged in .ts File  : ${currentlyTaggedCount}`);

    // If apply patch mode is active
    if (options.applyPatch) {
      const rawSource = fs.readFileSync(sourceFilePath, 'utf8');
      const { updatedContent, addedCount, removedCount } = patchVocabTsFileContent(
        rawSource,
        audioExistenceMap,
        level,
      );

      if (addedCount > 0 || removedCount > 0) {
        fs.writeFileSync(sourceFilePath, updatedContent, 'utf8');
        grandTotalPatchedAdded += addedCount;
        grandTotalPatchedRemoved += removedCount;
        console.log(`   - ✅ PATCH APPLIED to ${path.basename(sourceFilePath)}:`);
        if (addedCount > 0) console.log(`     + Added audioPath to ${addedCount} entries`);
        if (removedCount > 0) console.log(`     - Removed broken audioPath from ${removedCount} entries`);
      } else {
        console.log(`   - ℹ️ Data file is already fully up to date with disk state.`);
      }
    }
    console.log('');
  }

  console.log('===============================================================');
  console.log('📈 GLOBAL AUDIT SUMMARY');
  console.log('===============================================================');
  console.log(`Total Target Entries : ${grandTotalEntries}`);
  console.log(`Total Verified MP3s  : ${grandTotalValidAudio} / ${grandTotalEntries}`);
  console.log(`Total Missing MP3s   : ${grandTotalMissingAudio}`);
  console.log(`Currently Tagged TS  : ${grandTotalTaggedInTs}`);
  if (options.applyPatch) {
    console.log(`Patches Added to TS  : ${grandTotalPatchedAdded}`);
    console.log(`Patches Removed TS   : ${grandTotalPatchedRemoved}`);
  } else {
    console.log('\n💡 To apply verified audio paths into the data files, run:');
    console.log(`   npx tsx scripts/audio/verify-vocab-audio.ts --level=${options.levels.join(',')} --apply\n`);
  }
  console.log('===============================================================\n');
}

if (process.argv[1]?.endsWith('verify-vocab-audio.ts')) {
  runVocabAudioVerifier().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
