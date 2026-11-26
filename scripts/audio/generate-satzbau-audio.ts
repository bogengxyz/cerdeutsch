import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { SATZBAU_ITEMS } from '../../src/data/satzbauData.ts';
import { findEdgeTtsExecutable } from './vocabAudioHelpers.ts';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function patchSatzbauAudioPaths(sourceTs: string, existenceMap: Map<string, boolean>): string {
  const objectBlockRegex = /\{[\s\S]*?id:\s*'([^']+)'[\s\S]*?\n\s*\},?/g;
  return sourceTs.replace(objectBlockRegex, (block, id: string) => {
    const hasAudio = existenceMap.get(id) === true;
    const expectedPath = `/audio/satzbau/${id}.mp3`;
    const hasExisting = /audioPath:\s*['"][^'"]*['"],?\r?\n?/.test(block);

    if (hasAudio) {
      if (hasExisting) {
        return block.replace(/audioPath:\s*['"][^'"]*['"],?/, `audioPath: '${expectedPath}',`);
      }
      return block.replace(/(grammarTipId:\s*'[^']*',?)/, `$1\n    audioPath: '${expectedPath}',`);
    } else if (hasExisting) {
      return block.replace(/\s*audioPath:\s*['"][^'"]*['"],?\r?\n/, '\n');
    }
    return block;
  });
}

async function main() {
  const edgeTts = findEdgeTtsExecutable();
  if (!edgeTts) {
    console.error('edge-tts executable not found!');
    process.exit(1);
  }

  const outDir = path.resolve(process.cwd(), 'public', 'audio', 'satzbau');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const existenceMap = new Map<string, boolean>();
  let rendered = 0;
  let skipped = 0;
  let failed = 0;

  console.log(`🔊 Generating audio for ${SATZBAU_ITEMS.length} Satzbau sentences...`);

  for (let i = 0; i < SATZBAU_ITEMS.length; i += 1) {
    const item = SATZBAU_ITEMS[i];
    const sentence = item.tokens.join(' ');
    const outFile = path.join(outDir, `${item.id}.mp3`);

    if (fs.existsSync(outFile) && fs.statSync(outFile).size > 1024) {
      existenceMap.set(item.id, true);
      skipped += 1;
      continue;
    }

    let ok = false;
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const res = spawnSync(
        edgeTts,
        ['--text', sentence, '--voice', 'de-DE-KillianNeural', '--write-media', outFile],
        { encoding: 'utf8', windowsHide: true, timeout: 15000 },
      );
      if (res.status === 0 && fs.existsSync(outFile) && fs.statSync(outFile).size > 1024) {
        ok = true;
        break;
      }
      await sleep(300);
    }

    if (ok) {
      existenceMap.set(item.id, true);
      rendered += 1;
      console.log(`[${i + 1}/${SATZBAU_ITEMS.length}] ${item.id} -> ✅ (${(fs.statSync(outFile).size / 1024).toFixed(1)} KB)`);
    } else {
      existenceMap.set(item.id, false);
      failed += 1;
      console.error(`[${i + 1}/${SATZBAU_ITEMS.length}] ${item.id} -> ❌ FAILED`);
    }

    await sleep(60);
  }

  // Patch src/data/satzbauData.ts with verified audioPaths
  const dataFile = path.resolve(process.cwd(), 'src', 'data', 'satzbauData.ts');
  const raw = fs.readFileSync(dataFile, 'utf8');
  const updated = patchSatzbauAudioPaths(raw, existenceMap);
  fs.writeFileSync(dataFile, updated, 'utf8');

  console.log(`\n📊 Done! Rendered: ${rendered}, Skipped: ${skipped}, Failed: ${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
