import { A1_VOCAB_WORDS } from '../../src/data/vocabulary/a1';
import { A2_VOCAB_WORDS } from '../../src/data/vocabulary/a2';
import { B1_VOCAB_WORDS } from '../../src/data/vocabulary/b1';
import { B2_VOCAB_WORDS } from '../../src/data/vocabulary/b2';
import { validateVocabularyEntries } from './helpers';

console.log('=== VALIDATING A1 VOCABULARY ===');
const resA1 = validateVocabularyEntries(A1_VOCAB_WORDS, 'A1', 700);
console.log(`A1 Total: ${resA1.total}`);
console.log(`A1 Unique IDs: ${resA1.uniqueIds}`);
console.log(`A1 Unique Words: ${resA1.uniqueWords}`);
console.log(`A1 Errors: ${resA1.errors.length}`);
console.log(`A1 Warnings: ${resA1.warnings.length}`);
if (resA1.errors.length > 0) {
  console.error('A1 Errors:', resA1.errors.slice(0, 10));
}

console.log('\n=== VALIDATING A2 VOCABULARY ===');
const resA2 = validateVocabularyEntries(A2_VOCAB_WORDS, 'A2', 900);
console.log(`A2 Total: ${resA2.total}`);
console.log(`A2 Unique IDs: ${resA2.uniqueIds}`);
console.log(`A2 Unique Words: ${resA2.uniqueWords}`);
console.log(`A2 Errors: ${resA2.errors.length}`);
console.log(`A2 Warnings: ${resA2.warnings.length}`);
if (resA2.errors.length > 0) {
  console.error('A2 Errors:', resA2.errors.slice(0, 10));
}

console.log('\n=== VALIDATING B1 VOCABULARY ===');
const resB1 = validateVocabularyEntries(B1_VOCAB_WORDS, 'B1', 1100);
console.log(`B1 Total: ${resB1.total}`);
console.log(`B1 Unique IDs: ${resB1.uniqueIds}`);
console.log(`B1 Unique Words: ${resB1.uniqueWords}`);
console.log(`B1 Errors: ${resB1.errors.length}`);
console.log(`B1 Warnings: ${resB1.warnings.length}`);
if (resB1.errors.length > 0) {
  console.error('B1 Errors:', resB1.errors.slice(0, 10));
}

console.log('\n=== VALIDATING B2 VOCABULARY ===');
const resB2 = validateVocabularyEntries(B2_VOCAB_WORDS, 'B2', 1300);
console.log(`B2 Total: ${resB2.total}`);
console.log(`B2 Unique IDs: ${resB2.uniqueIds}`);
console.log(`B2 Unique Words: ${resB2.uniqueWords}`);
console.log(`B2 Errors: ${resB2.errors.length}`);
console.log(`B2 Warnings: ${resB2.warnings.length}`);
if (resB2.errors.length > 0) {
  console.error('B2 Errors:', resB2.errors.slice(0, 10));
}

// Global Unique Check Across A1 + A2 + B1 + B2
const allLemmas = new Map<string, string>();
const allIds = new Map<string, string>();
let wordClashes = 0;
let idClashes = 0;

const levels = [
  { name: 'A1', words: A1_VOCAB_WORDS },
  { name: 'A2', words: A2_VOCAB_WORDS },
  { name: 'B1', words: B1_VOCAB_WORDS },
  { name: 'B2', words: B2_VOCAB_WORDS },
];

const topicStats: Record<string, { A1: number; A2: number; B1: number; B2: number; Total: number }> = {};

for (const lvl of levels) {
  for (const e of lvl.words) {
    // Check ID
    if (allIds.has(e.id)) {
      console.error(`Duplicate ID: ${e.id} in ${lvl.name} and ${allIds.get(e.id)}`);
      idClashes++;
    } else {
      allIds.set(e.id, lvl.name);
    }

    // Check Word
    const k = e.word.trim().toLowerCase();
    if (allLemmas.has(k)) {
      console.error(`Word clash in ${lvl.name} with ${allLemmas.get(k)}: "${e.word}" (${e.id})`);
      wordClashes++;
    } else {
      allLemmas.set(k, `${lvl.name}:${e.id}`);
    }

    // Track Topic
    if (!topicStats[e.topic]) {
      topicStats[e.topic] = { A1: 0, A2: 0, B1: 0, B2: 0, Total: 0 };
    }
    topicStats[e.topic][lvl.name as 'A1' | 'A2' | 'B1' | 'B2']++;
    topicStats[e.topic].Total++;
  }
}

console.log(`\n=== GLOBAL AUDIT SUMMARY (A1 + A2 + B1 + B2) ===`);
console.log(`Total entries: ${allIds.size} / 4000`);
console.log(`Total unique IDs: ${allIds.size}`);
console.log(`ID clashes: ${idClashes}`);
console.log(`Total unique German lemmas: ${allLemmas.size}`);
console.log(`Word clashes: ${wordClashes}`);

console.log('\n=== TOPIC DISTRIBUTION ACROSS ALL LEVELS ===');
console.table(topicStats);

const totalErrors = resA1.errors.length + resA2.errors.length + resB1.errors.length + resB2.errors.length + idClashes + wordClashes;
if (totalErrors === 0 && allIds.size === 4000 && allLemmas.size === 4000) {
  console.log('\n🎉 ALL 4,000 VOCABULARY ENTRIES VALIDATED WITH ZERO ERRORS AND ZERO DUPLICATES! 🎉');
} else {
  console.error(`\n❌ VALIDATION FAILED WITH ${totalErrors} TOTAL ERRORS!`);
  process.exit(1);
}
