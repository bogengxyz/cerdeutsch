import { CEFRLevel } from '../types/learning';
import { LearningGoal } from '../types/progress';

export interface LearningGoalOption {
  id: LearningGoal;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'Briefcase' | 'GraduationCap' | 'Award' | 'Compass';
}

export interface PlacementQuestion {
  id: string;
  levelTarget: 'A0' | 'A1' | 'A2';
  question: string;
  options: string[];
  correctIndex: number;
  explanationId: string;
}

export const LEARNING_GOAL_OPTIONS: LearningGoalOption[] = [
  {
    id: 'ausbildung',
    title: 'Kerja & Ausbildung',
    subtitle: 'Karir, Ausbildung, Medis/Pflege, atau Bekerja di Jerman',
    description: 'Fokus pada kosakata profesional, percakapan sehari-hari, dan komunikasi praktis di tempat kerja.',
    iconName: 'Briefcase',
  },
  {
    id: 'studium',
    title: 'Kuliah & Studienkolleg',
    subtitle: 'Pendidikan Tinggi, Riset, & Studi Universitas',
    description: 'Fokus pada tata bahasa formal, pemahaman teks ilmiah, serta persiapan sertifikat akademis (TestDaF / DSH).',
    iconName: 'GraduationCap',
  },
  {
    id: 'pruefung',
    title: 'Persiapan Ujian Resmi',
    subtitle: 'Goethe-Zertifikat atau telc Deutsch (A1–B2)',
    description: 'Fokus pada latihan 4 keterampilan (Lesen, Hören, Schreiben, Sprechen) dan simulasi ujian dengan batas waktu.',
    iconName: 'Award',
  },
  {
    id: 'hobi',
    title: 'Hobi & Budaya Jerman',
    subtitle: 'Wisata, Minat Pribadi, Film, & Percakapan Santai',
    description: 'Belajar secara santai tanpa tekanan ujian, menguasai frasa penting untuk liburan dan menikmati budaya Jerman.',
    iconName: 'Compass',
  },
];

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: 'pq-1',
    levelTarget: 'A0',
    question: 'Dalam bahasa Jerman, bagaimana cara membaca kata "Wein" (anggur)?',
    options: ['Dibaca "Wain" (kombinasi ei = ai)', 'Dibaca "Wein"', 'Dibaca "Wen"', 'Dibaca "Wiin"'],
    correctIndex: 0,
    explanationId: 'Kombinasi huruf "ei" dalam bahasa Jerman selalu dibaca "ai". Contoh: Wein dibaca Wain, nein dibaca nain.',
  },
  {
    id: 'pq-2',
    levelTarget: 'A1',
    question: 'Bagaimana cara menyapa "Selamat pagi" yang lazim di Jerman?',
    options: ['Guten Morgen', 'Gute Nacht', 'Auf Wiedersehen', 'Danke schön'],
    correctIndex: 0,
    explanationId: '"Guten Morgen" adalah sapaan standar untuk selamat pagi (diucapkan hingga sekitar pukul 10.00-11.00).',
  },
  {
    id: 'pq-3',
    levelTarget: 'A1',
    question: 'Manakah artikel yang benar untuk kata benda "Buch" (buku)?',
    options: ['das Buch (Netral)', 'der Buch (Maskulin)', 'die Buch (Feminin)', 'den Buch'],
    correctIndex: 0,
    explanationId: '"Buch" bergender netral, sehingga artikel definitnya adalah "das Buch".',
  },
  {
    id: 'pq-4',
    levelTarget: 'A1',
    question: 'Lengkapi kalimat: "Ich ______ aus Indonesien." (kata kerja: kommen)',
    options: ['komme', 'kommst', 'kommt', 'kommen'],
    correctIndex: 0,
    explanationId: 'Konjugasi kata kerja untuk subjek "ich" (saya) selalu berakhiran -e: "Ich komme".',
  },
  {
    id: 'pq-5',
    levelTarget: 'A1',
    question: 'Lengkapi kalimat objek akusatif: "Ich habe ______ Hund." (der Hund = maskulin)',
    options: ['einen', 'ein', 'eine', 'einem'],
    correctIndex: 0,
    explanationId: 'Kata benda maskulin (der) saat menjadi objek penderita (Akkusativ) berubah artikelnya menjadi "einen".',
  },
  {
    id: 'pq-6',
    levelTarget: 'A2',
    question: 'Manakah kalimat lampau (Perfekt) yang gramatikal?',
    options: [
      'Ich habe gestern ein Buch gelesen.',
      'Ich habe gestern ein Buch liest.',
      'Ich bin gestern ein Buch gelesen.',
      'Ich habe gestern ein Buch lesen.',
    ],
    correctIndex: 0,
    explanationId: 'Bentuk lampau Perfekt untuk kata kerja "lesen" menggunakan kata bantu "haben" dan Partizip II "gelesen".',
  },
];

export function evaluatePlacementScore(score: number): {
  recommendedLevel: CEFRLevel | 'A0';
  targetCEFR: CEFRLevel;
  directToA0: boolean;
  levelBadge: string;
  feedbackTitle: string;
  feedbackDescription: string;
} {
  if (score <= 2) {
    return {
      recommendedLevel: 'A0',
      targetCEFR: 'A1',
      directToA0: true,
      levelBadge: 'Level Rekomendasi: A0 (Langkah Pertama)',
      feedbackTitle: 'Mulai dari Pondasi Nol (A0)',
      feedbackDescription:
        'Sangat disarankan untuk membuka modul "A0: Langkah Pertama" terlebih dahulu guna menguasai cara membaca alfabet, bunyi vokal unik, dan kalimat darurat sebelum masuk ke A1.',
    };
  }

  if (score <= 4) {
    return {
      recommendedLevel: 'A1',
      targetCEFR: 'A1',
      directToA0: false,
      levelBadge: 'Level Rekomendasi: A1 (Tingkat Dasar)',
      feedbackTitle: 'Siap untuk Kurikulum A1',
      feedbackDescription:
        'Anda sudah memiliki intuisi dasar bahasa Jerman yang baik! Kurikulum A1 akan memperkuat penguasaan kosa kata dan tata bahasa harian Anda.',
    };
  }

  return {
    recommendedLevel: 'A2',
    targetCEFR: 'A2',
    directToA0: false,
    levelBadge: 'Level Rekomendasi: A2 (Pra-Menengah)',
    feedbackTitle: 'Fondasi Kuat, Langsung ke A2!',
    feedbackDescription:
      'Luar biasa! Pemahaman gramatikal dasar Anda sudah kokoh. Anda bisa langsung memulai dari kurikulum A2 untuk memperluas kemampuan percakapan dan membaca.',
  };
}
