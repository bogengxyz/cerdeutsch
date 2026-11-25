import test from 'node:test';
import assert from 'node:assert/strict';
import { loadVocabularyForLevel } from '../data/vocabulary';
import { getAllAvailableTopics, searchLearningContent } from './searchService';

test('searchLearningContent filters accurately across level, module, difficulty, and query', async () => {
  const b2Vocab = await loadVocabularyForLevel('B2');
  const b2Results = searchLearningContent({
    query: 'Technologie',
    level: 'B2',
    module: 'Alle',
    kind: 'Alle',
    difficulty: 'Alle',
    topic: 'Alle',
    vocabList: b2Vocab,
  });

  assert.ok(b2Results.totalCount > 0);
  assert.ok(b2Results.exercises.every((e) => e.level === 'B2'));
  assert.ok(b2Results.vocab.every((v) => v.level === 'B2'));

  const hardListening = searchLearningContent({
    query: '',
    level: 'Alle',
    module: 'hoeren',
    kind: 'exercise',
    difficulty: 'Anspruchsvoll',
    topic: 'Alle',
  });

  assert.ok(hardListening.exercises.length > 0);
  assert.ok(
    hardListening.exercises.every(
      (e) => e.skill === 'hoeren' && e.difficulty === 'Anspruchsvoll',
    ),
  );
  assert.equal(hardListening.vocab.length, 0);
  assert.equal(hardListening.grammar.length, 0);

  const topicsA1 = getAllAvailableTopics('A1');
  assert.ok(topicsA1.length > 0);
});
