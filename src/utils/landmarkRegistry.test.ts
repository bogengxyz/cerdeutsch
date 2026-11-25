import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GERMAN_LANDMARKS_BY_LEVEL,
  getLandmarkForLevel,
  isValidCEFRLevel,
} from './landmarkRegistry';

test('getLandmarkForLevel maps each CEFR level to its assigned German landmark', () => {
  assert.equal(getLandmarkForLevel('A1').name, 'Brandenburger Tor');
  assert.equal(getLandmarkForLevel('A1').city, 'Berlin');

  assert.equal(getLandmarkForLevel('A2').name, 'Kölner Dom');
  assert.equal(getLandmarkForLevel('A2').city, 'Köln');

  assert.equal(getLandmarkForLevel('B1').name, 'Schloss Neuschwanstein');
  assert.equal(getLandmarkForLevel('B1').region, 'Bayern');

  assert.equal(getLandmarkForLevel('B2').name, 'Elbphilharmonie & Speicherstadt');
  assert.equal(getLandmarkForLevel('B2').city, 'Hamburg');
});

test('all CEFR levels have distinct image keys and descriptive German alt texts', () => {
  const levels = ['A1', 'A2', 'B1', 'B2'] as const;
  const imageKeys = new Set(levels.map((lvl) => GERMAN_LANDMARKS_BY_LEVEL[lvl].imageKey));
  assert.equal(imageKeys.size, 4);

  for (const lvl of levels) {
    const landmark = GERMAN_LANDMARKS_BY_LEVEL[lvl];
    assert.ok(landmark.alt.length > 15, `Alt text should be descriptive for ${lvl}`);
    assert.ok(landmark.name.length > 0);
    assert.ok(landmark.city.length > 0);
  }
});

test('getLandmarkForLevel falls back safely to A1 for unexpected values', () => {
  assert.equal(isValidCEFRLevel('B2'), true);
  assert.equal(isValidCEFRLevel('C1'), false);
  assert.equal(getLandmarkForLevel(undefined).level, 'A1');
  assert.equal(getLandmarkForLevel(null).level, 'A1');
  assert.equal(getLandmarkForLevel('C2').imageKey, 'berlin_brandenburg');
});
