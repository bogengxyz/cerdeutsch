import assert from 'node:assert/strict';
import test from 'node:test';
import { Exercise } from '../types/exercise';
import {
  getPracticeAudioPath,
  isValidAudioAssetPath,
  normalizeAudioExercise,
  parseTranscriptToSpeakersAndTurns,
} from './listeningAudioHelpers';

test('getPracticeAudioPath and isValidAudioAssetPath validate exam and practice paths strictly', () => {
  assert.equal(getPracticeAudioPath('A1', 'qb-a1-h-001'), '/audio/practice/a1/qb-a1-h-001.mp3');
  assert.equal(getPracticeAudioPath('B2', 'b2-hoeren-2'), '/audio/practice/b2/b2-hoeren-2.mp3');

  assert.equal(isValidAudioAssetPath('/audio/practice/a1/qb-a1-h-001.mp3', 'practice', 'A1'), true);
  assert.equal(isValidAudioAssetPath('/audio/practice/a2/qb-a1-h-001.mp3', 'practice', 'A1'), false);
  assert.equal(isValidAudioAssetPath('/audio/exams/goethe/b1/teil1.mp3', 'goethe', 'B1'), true);
  assert.equal(isValidAudioAssetPath('/audio/exams/telc/b1/teil1.mp3', 'goethe', 'B1'), false);
});

test('normalizeAudioExercise attaches canonical audioUrl and resolves manifest status for hoeren only', () => {
  const hoerenEx: Exercise = {
    id: 'qb-a1-h-001',
    level: 'A1',
    skill: 'hoeren',
    topic: 'Alltag',
    title: 'Anmeldung',
    subtitle: 'Dialog',
    difficulty: 'Leicht',
    durationMinutes: 4,
    formatLabel: 'Hören A1',
    instructions: 'Höre zu.',
    transcript: 'Hallo!',
    questions: [],
  };

  const normalized = normalizeAudioExercise(hoerenEx, () => 'pending');
  assert.equal(normalized.audioUrl, '/audio/practice/a1/qb-a1-h-001.mp3');
  assert.equal(normalized.audioStatus, 'pending');

  const lesenEx: Exercise = { ...hoerenEx, id: 'a1-lesen-1', skill: 'lesen' };
  const untouched = normalizeAudioExercise(lesenEx, () => 'missing');
  assert.equal(untouched.audioUrl, undefined);
});

test('parseTranscriptToSpeakersAndTurns handles newline, inline dialogue, and colons inside monologues cleanly', () => {
  const newlineParsed = parseTranscriptToSpeakersAndTurns({
    transcript: 'Moderator: Willkommen!\nAnna: Danke für die Einladung.\nModerator: Wie war die Reise?',
    level: 'B1',
    unitIndex: 0,
  });
  assert.equal(newlineParsed.speakers.length, 2);
  assert.equal(newlineParsed.turns.length, 3);
  assert.equal(newlineParsed.turns[2].pauseAfterMs, 0);

  const inlineParsed = parseTranscriptToSpeakersAndTurns({
    transcript: 'Kassiererin: Guten Tag! Kunde: Einmal Brot, bitte. Kassiererin: Das macht 3 Euro.',
    level: 'A1',
    unitIndex: 1,
  });
  assert.equal(inlineParsed.speakers.length, 2);
  assert.equal(inlineParsed.turns.length, 3);
  assert.equal(inlineParsed.speakers[0].rateOffsetPercent, -12);

  const monologueParsed = parseTranscriptToSpeakersAndTurns({
    transcript:
      'Achtung am Gleis 4: Der ICE 572 nach Berlin, planmäßige Abfahrt 14:20 Uhr, fährt heute von Gleis 7 ab.',
    level: 'A1',
    unitIndex: 2,
  });
  assert.equal(monologueParsed.speakers.length, 1);
  assert.equal(monologueParsed.turns.length, 1);
});
