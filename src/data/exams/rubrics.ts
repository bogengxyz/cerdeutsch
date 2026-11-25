import { ExamRubricCriterion } from '../../types/exam';

export function buildWritingRubric(totalPoints: number): ExamRubricCriterion[] {
  const weights = [0.22, 0.18, 0.16, 0.16, 0.18, 0.1];
  const raw = weights.map((w) => Math.max(1, Math.round(totalPoints * w)));
  const sumExceptLast = raw.slice(0, 5).reduce((a, b) => a + b, 0);
  const last = Math.max(1, totalPoints - sumExceptLast);

  return [
    {
      id: 'aufgabenerfuellung',
      criterionDe: 'Aufgabenerfüllung',
      criterionId: 'Ketuntasan Tugas',
      maxPoints: raw[0],
      descriptorId: 'Apakah semua poin panduan dan tujuan komunikasi (salam, pembuka, isi, penutup) telah dijawab lengkap?',
    },
    {
      id: 'inhaltliche-relevanz',
      criterionDe: 'Inhaltliche Relevanz',
      criterionId: 'Relevansi Isi',
      maxPoints: raw[1],
      descriptorId: 'Apakah informasi yang ditulis sesuai dengan situasi, register (du/Sie), dan konteks soal?',
    },
    {
      id: 'aufbau-kohaerenz',
      criterionDe: 'Aufbau & Kohärenz',
      criterionId: 'Struktur & Koherensi',
      maxPoints: raw[2],
      descriptorId: 'Apakah alur paragraf logis dan menggunakan kata penghubung yang tepat?',
    },
    {
      id: 'wortschatz',
      criterionDe: 'Wortschatz',
      criterionId: 'Kosakata',
      maxPoints: raw[3],
      descriptorId: 'Apakah pilihan kata bervariasi dan sesuai tingkat CEFR yang diujikan?',
    },
    {
      id: 'grammatik',
      criterionDe: 'Grammatik',
      criterionId: 'Tata Bahasa',
      maxPoints: raw[4],
      descriptorId: 'Apakah konjugasi kata kerja, posisi kata, kasus, dan struktur kalimat akurat?',
    },
    {
      id: 'rechtschreibung',
      criterionDe: 'Rechtschreibung',
      criterionId: 'Ejaan & Tanda Baca',
      maxPoints: last,
      descriptorId: 'Apakah huruf kapital pada nomina (Großschreibung), umlaut, dan tanda baca sudah tepat?',
    },
  ];
}

export function buildSpeakingRubric(totalPoints: number): ExamRubricCriterion[] {
  const p1 = Math.max(1, Math.round(totalPoints * 0.35));
  const p2 = Math.max(1, Math.round(totalPoints * 0.25));
  const p3 = Math.max(1, Math.round(totalPoints * 0.2));
  const p4 = Math.max(1, totalPoints - p1 - p2 - p3);

  return [
    {
      id: 'aufgabenbewaeltigung',
      criterionDe: 'Aufgabenbewältigung & Interaktion',
      criterionId: 'Penyelesaian Tugas & Interaksi',
      maxPoints: p1,
      descriptorId: 'Apakah pesan tersampaikan jelas, relevan, dan responsif terhadap lawan bicara/partner?',
    },
    {
      id: 'aussprache-fluessigkeit',
      criterionDe: 'Aussprache & Flüssigkeit',
      criterionId: 'Pelafalan & Kelancaran',
      maxPoints: p2,
      descriptorId: 'Apakah pelafalan, intonasi pertanyaan/pernyataan, dan jeda bicara mudah dipahami?',
    },
    {
      id: 'wortschatz-ausdruck',
      criterionDe: 'Wortschatz & Ausdruck',
      criterionId: 'Kosakata & Ungkapan',
      maxPoints: p3,
      descriptorId: 'Apakah ungkapan sapaan, permintaan, atau argumentasi sesuai situasi formal/informal?',
    },
    {
      id: 'grammatische-korrektheit',
      criterionDe: 'Grammatische Korrektheit',
      criterionId: 'Ketepatan Tata Bahasa',
      maxPoints: p4,
      descriptorId: 'Apakah kesalahan tata bahasa tidak menghambat pemahaman pesan utama?',
    },
  ];
}
