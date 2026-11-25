import { NavPage } from '../types/learning';
import { UILanguage } from '../types/progress';

export interface NavTranslation {
  primaryLabel: string;
  subLabel?: string;
}

export const NAV_TRANSLATIONS: Record<UILanguage, Record<NavPage, NavTranslation>> = {
  id: {
    startseite: { primaryLabel: 'Beranda', subLabel: 'Startseite' },
    a0: { primaryLabel: 'Mulai Dari Nol (A0)', subLabel: 'Erste Schritte' },
    lernen: { primaryLabel: 'Kurikulum Belajar', subLabel: 'Lernpfad' },
    'lernen-detail': { primaryLabel: 'Detail Materi', subLabel: 'Lektion' },
    pruefung: { primaryLabel: 'Simulasi Ujian', subLabel: 'Prüfungssimulation' },
    'pruefung-detail': { primaryLabel: 'Sesi Ujian', subLabel: 'Prüfungsmodul' },
    lesen: { primaryLabel: 'Membaca', subLabel: 'Leseverstehen' },
    hoeren: { primaryLabel: 'Mendengarkan', subLabel: 'Hörverstehen' },
    sprechen: { primaryLabel: 'Berbicara', subLabel: 'Sprechen' },
    schreiben: { primaryLabel: 'Menulis', subLabel: 'Schreiben' },
    grammatik: { primaryLabel: 'Tata Bahasa', subLabel: 'Grammatik' },
    wortschatz: { primaryLabel: 'Kosa Kata', subLabel: 'Wortschatz' },
    fortschritt: { primaryLabel: 'Kemajuan Belajar', subLabel: 'Fortschritt' },
    einstellungen: { primaryLabel: 'Pengaturan', subLabel: 'Einstellungen' },
    fehleranalyse: { primaryLabel: 'Buku Evaluasi', subLabel: 'Fehleranalyse' },
    sammlung: { primaryLabel: 'Koleksi Tersimpan', subLabel: 'Merkliste' },
    suche: { primaryLabel: 'Pencarian', subLabel: 'Suche' },
    ueber: { primaryLabel: 'Tentang Aplikasi', subLabel: 'Über cerDeutsch' },
  },
  de: {
    startseite: { primaryLabel: 'Startseite' },
    a0: { primaryLabel: 'Erste Schritte (A0)' },
    lernen: { primaryLabel: 'Lernen' },
    'lernen-detail': { primaryLabel: 'Lektion' },
    pruefung: { primaryLabel: 'Prüfungssimulation' },
    'pruefung-detail': { primaryLabel: 'Prüfung' },
    lesen: { primaryLabel: 'Leseverstehen' },
    hoeren: { primaryLabel: 'Hörverstehen' },
    sprechen: { primaryLabel: 'Sprechen' },
    schreiben: { primaryLabel: 'Schreiben' },
    grammatik: { primaryLabel: 'Grammatik' },
    wortschatz: { primaryLabel: 'Wortschatz' },
    fortschritt: { primaryLabel: 'Fortschritt' },
    einstellungen: { primaryLabel: 'Einstellungen' },
    fehleranalyse: { primaryLabel: 'Fehleranalyse' },
    sammlung: { primaryLabel: 'Sammlung' },
    suche: { primaryLabel: 'Suche' },
    ueber: { primaryLabel: 'Über cerDeutsch' },
  },
};

export const UI_TEXT = {
  id: {
    navLanguageToggle: 'Bahasa Pengantar Antarmuka',
    navLanguageIdTooltip: 'Bahasa Indonesia (Ramah Pemula)',
    navLanguageDeTooltip: 'Deutsch (Vollständiges Deutsch)',
    beginnerBadge: 'Mode Pemula Aktif',
    levelTitle: (lvl: string) => `Tingkat ${lvl}`,
    quickStart: 'Mulai Latihan Cepat',
    notifications: 'Pemberitahuan Belajar',
    noPendingTasks: 'Belum ada pengulangan atau simulasi ujian yang tertunda.',
    resumeExam: 'Lanjutkan simulasi ujian',
    resumeExamSub: 'Sesi simulasi tersimpan tersedia',
    reviewMistakes: 'Periksa analisis kesalahan',
    reviewMistakesSub: (count: number) => `${count} soal perlu diulang`,
    dueCards: 'Kartu kosa kata jatuh tempo',
    dueCardsSub: (count: number) => `${count} kata siap diulang`,
    searchPlaceholder: 'Cari kosa kata, tata bahasa, latihan...',
  },
  de: {
    navLanguageToggle: 'Oberflächensprache',
    navLanguageIdTooltip: 'Indonesisch (Anfängerfreundlich)',
    navLanguageDeTooltip: 'Deutsch (Immersiv)',
    beginnerBadge: 'Anfängermodus aktiv',
    levelTitle: (lvl: string) => `Niveau ${lvl}`,
    quickStart: 'Schnellstart',
    notifications: 'Lernbenachrichtigungen',
    noPendingTasks: 'Keine anstehenden Wiederholungen oder offenen Prüfungen.',
    resumeExam: 'Prüfungssimulation fortsetzen',
    resumeExamSub: 'Gespeicherte Prüfungssitzung verfügbar',
    reviewMistakes: 'Fehleranalyse überprüfen',
    reviewMistakesSub: (count: number) => `${count} Aufgabe(n) zu wiederholen`,
    dueCards: 'Karteikarten fällig',
    dueCardsSub: (count: number) => `${count} Wörter zur Wiederholung bereit`,
    searchPlaceholder: 'Wortschatz, Grammatik, Übungen suchen...',
  },
};
