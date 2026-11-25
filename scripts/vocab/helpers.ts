import fs from 'fs';
import path from 'path';
import { CEFRLevel } from '../../src/types/exercise';
import { VocabularyEntry } from '../../src/types/vocabulary';

export const CANONICAL_TOPICS = [
  'Alltag',
  'Familie und Beziehungen',
  'Essen und Trinken',
  'Wohnen',
  'Arbeit und Beruf',
  'Schule und Bildung',
  'Gesundheit',
  'Reisen und Verkehr',
  'Einkaufen',
  'Freizeit und Hobbys',
  'Natur und Umwelt',
  'Gesellschaft',
  'Politik und Wirtschaft',
  'Wissenschaft und Technik',
  'Kommunikation',
  'Gefühle und Meinungen',
  'Medien und Digitalisierung',
  'Kultur und Geschichte',
] as const;

export type CanonicalTopic = typeof CANONICAL_TOPICS[number];

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  total: number;
  uniqueIds: number;
  uniqueWords: number;
  topicDist: Record<string, number>;
}

export function validateVocabularyEntries(
  entries: VocabularyEntry[],
  expectedLevel: CEFRLevel,
  expectedTargetCount?: number,
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seenIds = new Set<string>();
  const seenWords = new Set<string>();
  const topicDist: Record<string, number> = {};

  for (const t of CANONICAL_TOPICS) {
    topicDist[t] = 0;
  }

  for (let i = 0; i < entries.length; i += 1) {
    const v = entries[i];
    const prefix = `[#${i + 1} - ${v.id || 'no-id'} - ${v.word || 'no-word'}]`;

    // 1. ID check
    if (!v.id || !v.id.trim()) {
      errors.push(`${prefix} Missing ID.`);
    } else if (seenIds.has(v.id)) {
      errors.push(`${prefix} Duplicate ID: ${v.id}`);
    } else {
      seenIds.add(v.id);
    }

    // 2. Level check
    if (v.level !== expectedLevel) {
      errors.push(`${prefix} Expected level ${expectedLevel}, got ${v.level}`);
    }

    // 3. Topic check
    if (!v.topic || !CANONICAL_TOPICS.includes(v.topic as CanonicalTopic)) {
      errors.push(`${prefix} Invalid topic: "${v.topic}". Must be one of canonical 18 topics.`);
    } else {
      topicDist[v.topic] = (topicDist[v.topic] || 0) + 1;
    }

    // 4. Subtopic check
    if (!v.subtopic || !v.subtopic.trim()) {
      errors.push(`${prefix} Missing subtopic.`);
    }

    // 5. Word check
    if (!v.word || !v.word.trim()) {
      errors.push(`${prefix} Missing German word.`);
    } else {
      const lowerWord = v.word.trim().toLowerCase();
      if (seenWords.has(lowerWord)) {
        // Warning or error if exact duplicate word in same level
        warnings.push(`${prefix} Duplicate word in same level: "${v.word}"`);
      } else {
        seenWords.add(lowerWord);
      }
    }

    // 6. Word type & specific grammatical checks
    if (!v.partOfSpeech) {
      errors.push(`${prefix} Missing partOfSpeech.`);
    } else if (v.partOfSpeech === 'Nomen') {
      if (!v.article || !['der', 'die', 'das'].includes(v.article)) {
        errors.push(`${prefix} Noun missing valid German article (der/die/das). Got: "${v.article}"`);
      }
      if (!v.plural || !v.plural.trim()) {
        errors.push(`${prefix} Noun missing plural form.`);
      }
    } else if (v.partOfSpeech === 'Verb') {
      if (!v.praesens || !v.praeteritum || !v.perfekt || !v.partizip2) {
        errors.push(`${prefix} Verb missing conjugation forms (praesens, praeteritum, perfekt, partizip2).`);
      }
    }

    // 7. Meaning and examples
    if (!v.meaningId || !v.meaningId.trim()) {
      errors.push(`${prefix} Missing Indonesian meaning (meaningId).`);
    }
    if (!v.exampleDe || !v.exampleDe.trim()) {
      errors.push(`${prefix} Missing German example sentence (exampleDe).`);
    }
    if (!v.exampleId || !v.exampleId.trim()) {
      errors.push(`${prefix} Missing Indonesian example translation (exampleId).`);
    }

    // 8. Difficulty
    if (!v.difficulty || !['Leicht', 'Mittel', 'Anspruchsvoll'].includes(v.difficulty)) {
      errors.push(`${prefix} Missing or invalid difficulty level.`);
    }

    // 9. Audio honesty check: if audioPath is set, file must exist on disk!
    if (v.audioPath) {
      const fullPath = path.resolve(process.cwd(), 'public', v.audioPath.replace(/^\//, ''));
      if (!fs.existsSync(fullPath)) {
        errors.push(`${prefix} Audio file claimed at "${v.audioPath}" but does not exist on disk!`);
      }
    }
  }

  if (expectedTargetCount !== undefined && entries.length !== expectedTargetCount) {
    errors.push(`Expected target count ${expectedTargetCount}, but got ${entries.length} entries.`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    total: entries.length,
    uniqueIds: seenIds.size,
    uniqueWords: seenWords.size,
    topicDist,
  };
}
