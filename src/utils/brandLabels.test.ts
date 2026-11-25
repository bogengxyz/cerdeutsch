import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BRAND_DESCRIPTION,
  BRAND_NAME,
  BRAND_TAGLINE,
  getNeutralExamLevelLabel,
  getNeutralExamTitle,
  getNeutralModuleLabel,
  getNeutralProviderShortLabel,
  sanitizeExamBrandingText,
} from './brandLabels';

test('brand constants reflect Cerdeutsch identity', () => {
  assert.equal(BRAND_NAME, 'Cerdeutsch');
  assert.equal(BRAND_DESCRIPTION, 'Platform belajar bahasa Jerman.');
  assert.equal(BRAND_TAGLINE, 'Belajar Bahasa Jerman bersama Cerdeutsch.');
});

test('neutral exam labels remove Goethe/telc branding and expose Persiapan Ujian A1-B2', () => {
  assert.equal(getNeutralExamLevelLabel('A1'), 'Persiapan Ujian A1');
  assert.equal(getNeutralExamLevelLabel('B2'), 'Persiapan Ujian B2');
  assert.equal(getNeutralExamTitle('goethe', 'A1'), 'Persiapan Ujian A1 — Paket Latihan A');
  assert.equal(getNeutralExamTitle('telc', 'B1'), 'Persiapan Ujian B1 — Paket Latihan B');
  assert.equal(getNeutralProviderShortLabel('practice'), 'Latihan Harian');
  assert.equal(getNeutralModuleLabel('lesen'), 'Latihan Membaca (Lesen)');
  assert.equal(getNeutralModuleLabel('hoeren'), 'Latihan Mendengarkan (Hören)');
  assert.equal(getNeutralModuleLabel('schreiben'), 'Latihan Menulis (Schreiben)');
  assert.equal(getNeutralModuleLabel('sprechen'), 'Latihan Berbicara (Sprechen)');
});

test('sanitizeExamBrandingText removes exam branding while preserving street names and cultural content', () => {
  assert.equal(
    sanitizeExamBrandingText('Die Adresse ist Goethestraße 19, dritter Stock.'),
    'Die Adresse ist Goethestraße 19, dritter Stock.',
  );
  assert.equal(
    sanitizeExamBrandingText('Nachmittags besichtigten wir das Wohnhaus von Goethe in Weimar.'),
    'Nachmittags besichtigten wir das Wohnhaus von Goethe in Weimar.',
  );
  assert.equal(
    sanitizeExamBrandingText('Mereka mengunjungi rumah Goethe dan mencicipi hidangan.'),
    'Mereka mengunjungi rumah Goethe dan mencicipi hidangan.',
  );

  const sanitizedA = sanitizeExamBrandingText('Goethe-Zertifikat A1: Start Deutsch 1');
  assert.equal(/goethe|telc/i.test(sanitizedA), false);

  const sanitizedB = sanitizeExamBrandingText(
    'Pada ujian sprechen A1 (Goethe/telc Bagian 1) dan telc Deutsch B2.',
  );
  assert.equal(/goethe|telc/i.test(sanitizedB), false);

  const sanitizedC = sanitizeExamBrandingText('DeutschMeister AI · Modul Hören (Goethe B1)');
  assert.equal(sanitizedC.includes('Cerdeutsch'), true);
  assert.equal(/deutschmeister|goethe|telc/i.test(sanitizedC), false);
});
