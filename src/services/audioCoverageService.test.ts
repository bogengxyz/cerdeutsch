import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
  AUDIO_MANIFEST,
  getManifestEntryByAudioPath,
  getManifestEntryByExerciseId,
  resolveAudioStatusForPath,
} from '../data/audioManifest';
import { ALL_EXAM_CONFIGURATIONS } from '../data/exams';
import {
  ALL_LISTENING_SCRIPTS,
  GOETHE_LISTENING_SCRIPTS,
  TELC_LISTENING_SCRIPTS,
  getListeningScriptsByProviderAndLevel,
  toPracticeExercise,
  validateListeningScript,
} from '../data/listeningScripts';
import { loadAllListeningScriptsAcrossAppAsync } from '../data/practiceListeningScripts';
import { loadAllCombinedExercises } from '../data/questionBank';
import { buildAudioCoverageReport, buildFullAudioCoverageReportAsync } from './audioCoverageService';

test('Goethe and telc listening scripts are strictly separated and cover A1-B2 x 4 parts (32 scripts)', () => {
  assert.equal(GOETHE_LISTENING_SCRIPTS.length, 16);
  assert.equal(TELC_LISTENING_SCRIPTS.length, 16);
  assert.equal(ALL_LISTENING_SCRIPTS.length, 32);

  for (const level of ['A1', 'A2', 'B1', 'B2'] as const) {
    const goetheParts = getListeningScriptsByProviderAndLevel('goethe', level);
    const telcParts = getListeningScriptsByProviderAndLevel('telc', level);
    assert.equal(goetheParts.length, 4);
    assert.equal(telcParts.length, 4);
    assert.deepEqual(
      goetheParts.map((p) => p.partNumber),
      [1, 2, 3, 4],
    );
    assert.deepEqual(
      telcParts.map((p) => p.partNumber),
      [1, 2, 3, 4],
    );
    assert.ok(goetheParts.every((p) => p.provider === 'goethe'));
    assert.ok(telcParts.every((p) => p.provider === 'telc'));
  }
});

test('all 208 listening scripts across exams and regular practice units have valid paths, unique IDs, speaker turns, German feedback, and Indonesian explanations', async () => {
  const allScripts = await loadAllListeningScriptsAcrossAppAsync();
  assert.equal(allScripts.length, 208);

  const scriptIds = new Set<string>();
  const exerciseIds = new Set<string>();
  const audioPaths = new Set<string>();
  const questionIds = new Set<string>();

  for (const script of allScripts) {
    const issues = validateListeningScript(script);
    assert.deepEqual(issues, [], `Unexpected validation issues in ${script.exerciseId}: ${issues.join('; ')}`);

    assert.equal(scriptIds.has(script.scriptId), false, `Duplicate scriptId: ${script.scriptId}`);
    assert.equal(exerciseIds.has(script.exerciseId), false, `Duplicate exerciseId: ${script.exerciseId}`);
    assert.equal(audioPaths.has(script.audioPath), false, `Duplicate audioPath: ${script.audioPath}`);
    scriptIds.add(script.scriptId);
    exerciseIds.add(script.exerciseId);
    audioPaths.add(script.audioPath);

    for (const q of script.questions) {
      assert.equal(questionIds.has(q.id), false, `Duplicate question id: ${q.id}`);
      questionIds.add(q.id);
    }
  }
});

test('every regular Hoeren unit across ALL_EXERCISES and questionBank has canonical audioUrl and resolves to AUDIO_MANIFEST', async () => {
  const combined = await loadAllCombinedExercises();
  const hoerenUnits = combined.filter((ex) => ex.skill === 'hoeren');
  assert.equal(hoerenUnits.length, 176);

  for (const ex of hoerenUnits) {
    const expectedPath = `/audio/practice/${ex.level.toLowerCase()}/${ex.id}.mp3`;
    assert.equal(ex.audioUrl, expectedPath);
    const entry = getManifestEntryByAudioPath(ex.audioUrl);
    assert.ok(entry, `Expected manifest entry for practice Hoeren unit ${ex.id} (${ex.audioUrl})`);
    assert.equal(entry.provider, 'practice');
    assert.equal(entry.level, ex.level);
  }
});

test('every exam Hoeren audio URL resolves to a manifest entry and no fake MP3 files exist on disk', () => {
  let examAudioCount = 0;
  for (const exam of ALL_EXAM_CONFIGURATIONS) {
    const hoerenMod = exam.modules.find((m) => m.moduleKey === 'hoeren');
    if (!hoerenMod) continue;
    for (const section of hoerenMod.sections) {
      for (const q of section.questions) {
        if (!q.audio) continue;
        examAudioCount += 1;
        const entry = getManifestEntryByAudioPath(q.audio.url);
        assert.ok(entry, `Expected manifest entry for exam audio URL: ${q.audio.url}`);
        assert.equal(entry.provider, exam.provider);
        assert.equal(entry.level, exam.level);
      }
    }
  }
  assert.equal(examAudioCount, 16);

  // Confirm AUDIO_MANIFEST never falsely marks nonexistent disk files as 'available'
  for (const entry of AUDIO_MANIFEST) {
    const diskPath = path.join(process.cwd(), 'public', entry.audioPath.replace(/^\//, ''));
    const existsOnDisk = fs.existsSync(diskPath);
    if (!existsOnDisk) {
      assert.notEqual(entry.status, 'available');
      assert.notEqual(resolveAudioStatusForPath(entry.audioPath, 'missing'), 'available');
    }
  }
});

test('full audio coverage report accurately tracks all 208 tracks with 0 broken/duplicate/unlinked items', async () => {
  const syncReport = buildAudioCoverageReport();
  assert.equal(syncReport.totalListeningExercises, 208);
  assert.equal(syncReport.totalUniqueAudioFiles, 208);
  assert.equal(syncReport.examScriptCount, 32);
  assert.equal(syncReport.practiceUnitCount, 176);
  assert.equal(syncReport.byProviderAndLevel.length, 12);

  const fullReport = await buildFullAudioCoverageReportAsync();
  assert.equal(fullReport.scriptCount, 208);
  assert.equal(fullReport.totalListeningExercises, 208);
  assert.equal(fullReport.totalUniqueAudioFiles, 208);
  assert.equal(fullReport.examAudioCount, 16);
  assert.equal(fullReport.practiceHoerenQuestionCount, 829);
  assert.equal(fullReport.actualMp3AvailableCount, 0);
  assert.equal(fullReport.missingMp3Count, 16);
  assert.equal(fullReport.pendingAudioCount, 192);
  assert.equal(fullReport.coveragePercentage, 0);
  assert.deepEqual(fullReport.brokenPathExerciseIds, []);
  assert.deepEqual(fullReport.invalidScriptExerciseIds, []);
  assert.deepEqual(fullReport.duplicateAudioPaths, []);
  assert.deepEqual(fullReport.unlinkedPracticeIds, []);
  assert.equal(fullReport.byProviderAndLevel.length, 12);
});

test('toPracticeExercise converts listening script with locked transcript metadata and bilingual feedback', () => {
  const script = ALL_LISTENING_SCRIPTS[0];
  const manifest = getManifestEntryByExerciseId(script.exerciseId);
  const exercise = toPracticeExercise(script, manifest);

  assert.equal(exercise.id, script.exerciseId);
  assert.equal(exercise.skill, 'hoeren');
  assert.equal(exercise.audioUrl, script.audioPath);
  assert.equal(exercise.audioStatus, 'missing');
  assert.equal(exercise.transcript, script.fullTranscriptDe);
  assert.equal(exercise.questions.length, script.questions.length);
  assert.ok(exercise.questions[0].explanationDe);
  assert.ok(exercise.questions[0].explanationId);
});
