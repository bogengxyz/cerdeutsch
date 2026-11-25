import { ExamLevel, ExamModuleKey, ExamProvider } from '../types/exam';
import { CEFRLevel } from '../types/learning';
import { ListeningProvider } from '../types/listeningAudio';

export const BRAND_NAME = 'Cerdeutsch';
export const BRAND_DESCRIPTION = 'Platform belajar bahasa Jerman.';
export const BRAND_TAGLINE = 'Belajar Bahasa Jerman bersama Cerdeutsch.';

export function getNeutralExamLevelLabel(level: CEFRLevel | ExamLevel): string {
  return `Persiapan Ujian ${level}`;
}

export function getNeutralProviderShortLabel(provider: ExamProvider | ListeningProvider): string {
  if (provider === 'goethe') return 'Paket Latihan A';
  if (provider === 'telc') return 'Paket Latihan B';
  return 'Latihan Harian';
}

export function getNeutralExamTitle(
  provider: ExamProvider,
  level: CEFRLevel | ExamLevel,
): string {
  return `Persiapan Ujian ${level} — ${getNeutralProviderShortLabel(provider)}`;
}

export function getNeutralModuleLabel(moduleKey: ExamModuleKey | string): string {
  switch (moduleKey) {
    case 'lesen':
      return 'Latihan Membaca (Lesen)';
    case 'hoeren':
      return 'Latihan Mendengarkan (Hören)';
    case 'schreiben':
      return 'Latihan Menulis (Schreiben)';
    case 'sprechen':
      return 'Latihan Berbicara (Sprechen)';
    default:
      return moduleKey;
  }
}

export function sanitizeExamBrandingText(text: string): string {
  if (!text) return text;
  let out = text;

  // Replace platform name if present in copy
  out = out.replace(/DeutschMeister\s*AI/gi, BRAND_NAME);
  out = out.replace(/DeutschMeister/gi, BRAND_NAME);

  // Protect authentic literary/geographical German mentions (street names, Weimar house, museum)
  const protectedTokens: string[] = [];
  const protect = (match: string): string => {
    const idx = protectedTokens.push(match) - 1;
    return `__CERDEUTSCH_KEEP_${idx}__`;
  };

  out = out.replace(/Goethestra(?:ß|ss)e/gi, protect);
  out = out.replace(/\b(?:Wohnhaus von|Haus von|rumah)\s+Goethe\b/gi, protect);
  out = out.replace(/\bJohann Wolfgang(?: von)? Goethe\b/gi, protect);
  out = out.replace(/\bGoethe-(?:Museum|Haus|Denkmal|Park)\b/gi, protect);

  // Replace exam-board compound names and institutional references neutrally
  out = out.replace(
    /Goethe-Zertifikat\s+(A1|A2|B1|B2)(?::\s*Start Deutsch 1)?/gi,
    'Persiapan Ujian $1 (Paket A)',
  );
  out = out.replace(
    /telc\s+Deutsch\s+(A1|A2|B1|B2)(?:\s*\([^)]*\))?/gi,
    'Persiapan Ujian $1 (Paket B)',
  );
  out = out.replace(/\bGoethe-Zertifikat\b/gi, 'Simulasi Ujian Paket A');
  out = out.replace(/\btelc\s+Deutsch\b/gi, 'Simulasi Ujian Paket B');
  out = out.replace(/\b(?:Goethe-Instituts?|telc GmbH)\b/gi, 'lembaga ujian resmi');
  out = out.replace(/\b(?:goethe\.de|telc\.net)\b/gi, 'Kurikulum latihan mandiri');

  // Combined exam references like "Goethe/telc", "Goethe und telc", "telc- und Goethe-Standards"
  out = out.replace(/\btelc-\s+und\s+Goethe-Standards\b/gi, 'internasionalen Prüfungsstandards');
  out = out.replace(
    /\b(?:Goethe|telc)\s*(?:\/|\s*(?:und|dan|oder|atau)\s*)\s*(?:telc|Goethe)\b/gi,
    'Simulasi Ujian',
  );
  out = out.replace(/\b(?:Goethe|telc)-Format\b/gi, 'Format Simulasi');
  out = out.replace(/\b(?:Goethe|telc)-Prüfung(?:en|sordnung|sbewertung)?\b/gi, 'ujian resmi');

  // Level-prefixed exam references like "Goethe A1", "telc B2"
  out = out.replace(/\bGoethe\s+(A1|A2|B1|B2)\b/gi, 'Paket A $1');
  out = out.replace(/\btelc\s+(A1|A2|B1|B2)\b/gi, 'Paket B $1');

  // Any remaining standalone exam-board mentions
  out = out.replace(/\bGoethe\b/gi, 'Paket A');
  out = out.replace(/\btelc\b/gi, 'Paket B');

  // Restore protected cultural/street-name tokens
  out = out.replace(/__CERDEUTSCH_KEEP_(\d+)__/g, (_m, idxStr: string) => {
    const idx = Number(idxStr);
    return protectedTokens[idx] ?? '';
  });

  return out;
}
