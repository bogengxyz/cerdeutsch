import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeVocabSpokenText,
  getVocabAudioRelativePath,
  getVocabAudioDiskPath,
  patchVocabTsFileContent,
  findEdgeTtsExecutable,
} from './vocabAudioHelpers.ts';

test('normalizeVocabSpokenText prepends article for nouns', () => {
  assert.equal(
    normalizeVocabSpokenText({ word: 'Begrüßung', article: 'die', partOfSpeech: 'Nomen' }),
    'die Begrüßung',
  );
  assert.equal(
    normalizeVocabSpokenText({ word: 'Apfel', article: 'der', partOfSpeech: 'Nomen' }),
    'der Apfel',
  );
  assert.equal(
    normalizeVocabSpokenText({ word: 'Buch', article: 'das', partOfSpeech: 'Nomen' }),
    'das Buch',
  );
});

test('normalizeVocabSpokenText avoids double-prefixing if word already starts with article', () => {
  assert.equal(
    normalizeVocabSpokenText({ word: 'die Begrüßung', article: 'die', partOfSpeech: 'Nomen' }),
    'die Begrüßung',
  );
  assert.equal(
    normalizeVocabSpokenText({ word: 'der Tisch', article: 'der', partOfSpeech: 'Nomen' }),
    'der Tisch',
  );
});

test('normalizeVocabSpokenText returns plain word for verbs, adjectives, and words without article', () => {
  assert.equal(
    normalizeVocabSpokenText({ word: 'heißen', partOfSpeech: 'Verb' }),
    'heißen',
  );
  assert.equal(
    normalizeVocabSpokenText({ word: 'pünktlich', partOfSpeech: 'Adjektiv' }),
    'pünktlich',
  );
  assert.equal(
    normalizeVocabSpokenText({ word: 'Guten Tag', partOfSpeech: 'Ausdruck' }),
    'Guten Tag',
  );
});

test('getVocabAudioRelativePath and getVocabAudioDiskPath formats correct paths', () => {
  const rel = getVocabAudioRelativePath('A1', 'voc-a1-1');
  assert.equal(rel, '/audio/vocab/a1/voc-a1-1.mp3');

  const disk = getVocabAudioDiskPath('C:\\test\\public', 'A1', 'voc-a1-1');
  assert.ok(disk.endsWith('public\\audio\\vocab\\a1\\voc-a1-1.mp3') || disk.endsWith('public/audio/vocab/a1/voc-a1-1.mp3'));
});

test('findEdgeTtsExecutable finds edge-tts executable on machine', () => {
  const found = findEdgeTtsExecutable();
  assert.ok(found !== null, 'edge-tts executable should be discovered');
  assert.ok(found.includes('edge-tts'));
});

test('patchVocabTsFileContent correctly adds audioPath when audio exists', () => {
  const sampleTs = `
export const A1_VOCAB_WORDS = [
  {
    id: "voc-a1-1",
    word: "Begrüßung",
    difficulty: "Leicht",
    relatedWords: ["begrüßen"],
  },
  {
    id: "voc-a1-2",
    word: "heißen",
    difficulty: "Leicht",
  },
];
`;

  const map = new Map<string, boolean>();
  map.set('voc-a1-1', true);
  map.set('voc-a1-2', false);

  const { updatedContent, addedCount, removedCount } = patchVocabTsFileContent(
    sampleTs,
    map,
    'A1',
  );

  assert.equal(addedCount, 1);
  assert.equal(removedCount, 0);
  assert.ok(updatedContent.includes("audioPath: '/audio/vocab/a1/voc-a1-1.mp3'"));
  assert.ok(!updatedContent.includes("audioPath: '/audio/vocab/a1/voc-a1-2.mp3'"));
});

test('patchVocabTsFileContent cleanly removes audioPath when audio no longer exists', () => {
  const sampleTs = `
export const A1_VOCAB_WORDS = [
  {
    id: "voc-a1-1",
    word: "Begrüßung",
    difficulty: "Leicht",
    audioPath: '/audio/vocab/a1/voc-a1-1.mp3',
    relatedWords: ["begrüßen"],
  },
];
`;

  const map = new Map<string, boolean>();
  map.set('voc-a1-1', false); // Missing audio

  const { updatedContent, addedCount, removedCount } = patchVocabTsFileContent(
    sampleTs,
    map,
    'A1',
  );

  assert.equal(addedCount, 0);
  assert.equal(removedCount, 1);
  assert.ok(!updatedContent.includes('audioPath:'));
});
