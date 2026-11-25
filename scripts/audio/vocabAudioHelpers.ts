import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { resolveExecutablePath } from './audioCliHelpers.ts';

export interface VocabSpokenTextInput {
  word: string;
  article?: string;
  partOfSpeech?: string;
}

/**
 * Normalizes vocabulary item into clear, natural German spoken text.
 * For nouns (Nomen) with articles, combines the lowercase article and noun:
 * e.g., article "die" + word "Begrüßung" -> "die Begrüßung".
 * If the word already contains the article prefix, avoids double-prefixing.
 */
export function normalizeVocabSpokenText(entry: VocabSpokenTextInput): string {
  const cleanWord = entry.word.trim();
  const art = entry.article?.trim().toLowerCase();

  if (art && (art === 'der' || art === 'die' || art === 'das')) {
    const wordLower = cleanWord.toLowerCase();
    if (wordLower.startsWith(`${art} `)) {
      return cleanWord;
    }
    return `${art} ${cleanWord}`;
  }

  return cleanWord;
}

/**
 * Returns web-facing relative URL path for vocabulary audio:
 * e.g., "/audio/vocab/a1/voc-a1-1.mp3"
 */
export function getVocabAudioRelativePath(level: string, id: string): string {
  return `/audio/vocab/${level.toLowerCase()}/${id}.mp3`;
}

/**
 * Returns absolute local file system path for vocabulary audio:
 * e.g., "<project>/public/audio/vocab/a1/voc-a1-1.mp3"
 */
export function getVocabAudioDiskPath(publicDir: string, level: string, id: string): string {
  return path.join(publicDir, 'audio', 'vocab', level.toLowerCase(), `${id}.mp3`);
}

/**
 * Discovers the edge-tts executable path across PATH and Windows Python script directories.
 */
export function findEdgeTtsExecutable(customPath?: string): string | null {
  if (customPath && fs.existsSync(customPath)) {
    return customPath;
  }

  // 1. Try standard system PATH
  const fromPath = resolveExecutablePath('edge-tts');
  if (fromPath && fs.existsSync(fromPath)) {
    return fromPath;
  }

  // 2. Windows Python Roaming Scripts directory
  if (process.platform === 'win32') {
    const roamingPython = path.join(os.homedir(), 'AppData', 'Roaming', 'Python');
    if (fs.existsSync(roamingPython)) {
      try {
        const pyDirs = fs.readdirSync(roamingPython);
        for (const pyDir of pyDirs) {
          const candidate = path.join(roamingPython, pyDir, 'Scripts', 'edge-tts.exe');
          if (fs.existsSync(candidate)) {
            return candidate;
          }
        }
      } catch {
        // Ignore read errors
      }
    }

    // 3. System-wide Python installs (e.g. C:\Python314\Scripts\edge-tts.exe)
    for (const drive of ['C:', 'D:']) {
      for (const ver of ['Python314', 'Python313', 'Python312', 'Python311', 'Python310']) {
        const candidate = path.join(drive, ver, 'Scripts', 'edge-tts.exe');
        if (fs.existsSync(candidate)) {
          return candidate;
        }
      }
    }
  }

  return null;
}

/**
 * Safely patches a vocabulary TypeScript source file (e.g. a1.ts):
 * - If an entry's audio exists on disk (verified): ensures `audioPath: '/audio/vocab/<level>/<id>.mp3'` is registered.
 * - If an entry's audio is missing: ensures `audioPath` is removed to avoid broken audio claims.
 * Preserves formatting, indentations, and all other properties.
 */
export function patchVocabTsFileContent(
  sourceTs: string,
  audioExistenceMap: Map<string, boolean>,
  level: string,
): { updatedContent: string; addedCount: number; removedCount: number } {
  let addedCount = 0;
  let removedCount = 0;

  // Match each object block in the array: starts with { and contains id: "..."
  const objectBlockRegex = /\{[\s\S]*?id:\s*["']([^"']+)["'][\s\S]*?\n\s*\},?/g;

  const updatedContent = sourceTs.replace(objectBlockRegex, (block, id: string) => {
    const hasAudio = audioExistenceMap.get(id) === true;
    const expectedPath = getVocabAudioRelativePath(level, id);
    const hasExistingAudioPath = /audioPath:\s*["'][^"']*["'],?\r?\n?/.test(block);

    if (hasAudio) {
      if (hasExistingAudioPath) {
        // Update existing audioPath to canonical path if different
        return block.replace(
          /audioPath:\s*["'][^"']*["'],?/,
          `audioPath: '${expectedPath}',`,
        );
      }
      // Insert audioPath right after difficulty: "..."
      addedCount += 1;
      if (/difficulty:\s*["'][^"']*["'],?/.test(block)) {
        return block.replace(
          /(difficulty:\s*["'][^"']*["'],?)/,
          `$1\n    audioPath: '${expectedPath}',`,
        );
      }
      // Fallback: insert right before closing brace
      return block.replace(/(\n\s*\},?)$/, `\n    audioPath: '${expectedPath}',$1`);
    } else {
      if (hasExistingAudioPath) {
        removedCount += 1;
        // Strip out audioPath line cleanly
        return block.replace(/\s*audioPath:\s*["'][^"']*["'],?\r?\n/, '\n');
      }
      return block;
    }
  });

  return { updatedContent, addedCount, removedCount };
}
