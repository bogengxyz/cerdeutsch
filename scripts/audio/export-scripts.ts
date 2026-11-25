import fs from 'node:fs';
import path from 'node:path';
import {
  GOETHE_LISTENING_SCRIPTS,
  TELC_LISTENING_SCRIPTS,
  validateListeningScript,
} from '../../src/data/listeningScripts/index.ts';
import { loadPracticeListeningScriptsAsync } from '../../src/data/practiceListeningScripts.ts';
import { ListeningScriptEntry } from '../../src/types/listeningAudio.ts';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRate(offsetPercent: number): string {
  if (offsetPercent === 0) return '0%';
  return offsetPercent > 0 ? `+${offsetPercent}%` : `${offsetPercent}%`;
}

function buildSsml(entry: ListeningScriptEntry): string {
  const speakerById = new Map(entry.speakers.map((s) => [s.speakerId, s]));
  const voiceBlocks = entry.turns
    .map((turn) => {
      const spk = speakerById.get(turn.speakerId);
      const voice = spk?.edgeVoiceDe ?? 'de-DE-KatjaNeural';
      const rate = formatRate(spk?.rateOffsetPercent ?? 0);
      const pause = turn.pauseAfterMs > 0 ? `\n    <break time="${turn.pauseAfterMs}ms"/>` : '';
      return [
        `  <voice name="${escapeXml(voice)}">`,
        `    <prosody rate="${escapeXml(rate)}">${escapeXml(turn.textDe)}</prosody>${pause}`,
        `  </voice>`,
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="de-DE">',
    `  <!-- ${entry.scriptId} | ${entry.provider.toUpperCase()} ${entry.level} #${entry.partNumber} | ${entry.audioPath} -->`,
    voiceBlocks,
    '</speak>',
    '',
  ].join('\n');
}

function buildRecordingMarkdownSection(
  providerTitle: string,
  entries: ListeningScriptEntry[],
): string {
  const lines: string[] = [`## ${providerTitle}`, ''];
  for (const entry of entries) {
    lines.push(`### ${entry.partTitleDe} (\`${entry.exerciseId}\`)`);
    lines.push(`- **Niveau / Nr.:** ${entry.level} · #${entry.partNumber}`);
    lines.push(`- **Thema:** ${entry.topicDe}`);
    lines.push(`- **Kontext:** ${entry.contextDe}`);
    lines.push(`- **Sprechtempo:** ${entry.targetPacingDe}`);
    lines.push(`- **Zieldatei:** \`public${entry.audioPath}\``);
    lines.push(`- **Geschätzte Dauer:** ${entry.durationLabel} (${entry.estimatedDurationSeconds}s) · Max. Abspielungen: ${entry.playLimit}×`);
    lines.push('- **Sprecherrollen:**');
    for (const spk of entry.speakers) {
      lines.push(`  - **${spk.name}** (${spk.roleDe}, ${spk.gender}, TTS-Stimme: \`${spk.edgeVoiceDe}\`)`);
    }
    lines.push('');
    lines.push('**Dialog / Sprechtext:**');
    for (const turn of entry.turns) {
      lines.push(`${turn.turnIndex}. **${turn.speakerLabel}:** ${turn.textDe} _(Pause: ${turn.pauseAfterMs} ms)_`);
    }
    lines.push('');
    lines.push('**Fragen:**');
    for (const q of entry.questions) {
      const answerLabel = q.correctAnswer ?? q.correctAnswers?.join(' | ') ?? 'Zuordnung';
      lines.push(`- **${q.id}** (${q.points} P.): ${q.promptDe} -> **Lösung:** ${answerLabel}`);
    }
    lines.push('');
    lines.push('---');
    lines.push('');
  }
  return lines.join('\n');
}

async function main() {
  const outDir = path.join(process.cwd(), 'scripts', 'audio', 'output');
  const ssmlDir = path.join(outDir, 'ssml');
  fs.mkdirSync(ssmlDir, { recursive: true });

  const practiceScripts = await loadPracticeListeningScriptsAsync();
  const allScripts: ListeningScriptEntry[] = [
    ...GOETHE_LISTENING_SCRIPTS,
    ...TELC_LISTENING_SCRIPTS,
    ...practiceScripts,
  ];

  const validationErrors: Array<{ exerciseId: string; issues: string[] }> = [];
  const seenPaths = new Set<string>();
  const duplicatePaths: string[] = [];

  for (const entry of allScripts) {
    if (seenPaths.has(entry.audioPath)) {
      duplicatePaths.push(entry.audioPath);
    } else {
      seenPaths.add(entry.audioPath);
    }
    const issues = validateListeningScript(entry);
    if (issues.length > 0) {
      validationErrors.push({ exerciseId: entry.exerciseId, issues });
    }
    fs.writeFileSync(path.join(ssmlDir, `${entry.scriptId}.ssml`), buildSsml(entry), 'utf8');
  }

  const exportPayload = {
    exportedAtIso: new Date().toISOString(),
    language: 'de-DE',
    totalScripts: allScripts.length,
    uniqueAudioPaths: seenPaths.size,
    goetheCount: GOETHE_LISTENING_SCRIPTS.length,
    telcCount: TELC_LISTENING_SCRIPTS.length,
    practiceCount: practiceScripts.length,
    duplicatePathCount: duplicatePaths.length,
    duplicatePaths,
    validationErrorCount: validationErrors.length,
    validationErrors,
    scripts: allScripts,
  };

  fs.writeFileSync(
    path.join(outDir, 'scripts-export.json'),
    `${JSON.stringify(exportPayload, null, 2)}\n`,
    'utf8',
  );

  const markdown = [
    '# DeutschMeister AI — Gesamtes Sprecher- & Studio-Skriptbuch (Goethe, telc & Übungen A1–B2)',
    '',
    `Exportiert: ${exportPayload.exportedAtIso}`,
    `Anzahl Originalskripte: ${allScripts.length} (Goethe: ${GOETHE_LISTENING_SCRIPTS.length}, telc: ${TELC_LISTENING_SCRIPTS.length}, Übungseinheiten: ${practiceScripts.length})`,
    '',
    buildRecordingMarkdownSection('Goethe-Zertifikat (A1–B2)', GOETHE_LISTENING_SCRIPTS),
    buildRecordingMarkdownSection('telc Deutsch (A1–B2)', TELC_LISTENING_SCRIPTS),
    buildRecordingMarkdownSection('Reguläre Hörübungen (A1–B2)', practiceScripts),
  ].join('\n');

  fs.writeFileSync(path.join(outDir, 'recording-scripts-de.md'), markdown, 'utf8');

  console.log(`Exported ${allScripts.length} listening scripts (${seenPaths.size} unique audio paths):`);
  console.log(`- Goethe exams: ${GOETHE_LISTENING_SCRIPTS.length}`);
  console.log(`- telc exams: ${TELC_LISTENING_SCRIPTS.length}`);
  console.log(`- Practice Hoeren units: ${practiceScripts.length}`);
  console.log(`- JSON: ${path.relative(process.cwd(), path.join(outDir, 'scripts-export.json'))}`);
  console.log(`- SSML: ${path.relative(process.cwd(), ssmlDir)} (${allScripts.length} files)`);
  console.log(`- Guide: ${path.relative(process.cwd(), path.join(outDir, 'recording-scripts-de.md'))}`);
  if (validationErrors.length > 0 || duplicatePaths.length > 0) {
    console.error('Script validation errors detected:', JSON.stringify({ validationErrors, duplicatePaths }, null, 2));
    process.exit(1);
  }
}

void main();
