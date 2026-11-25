import { ExamConfiguration } from '../../../types/exam';
import { buildSpeakingRubric, buildWritingRubric } from '../rubrics';

export const GOETHE_A1_EXAM: ExamConfiguration = {
  id: 'goethe-a1',
  provider: 'goethe',
  level: 'A1',
  officialName: 'Goethe-Zertifikat A1: Start Deutsch 1',
  totalDurationMinutes: 80,
  totalPoints: 100,
  moduleIndependence: 'overall',
  overallPassingPoints: 60,
  writtenTotalPoints: 75,
  oralTotalPoints: 25,
  passingRuleSummaryDe:
    'Insgesamt mindestens 60 von 100 Punkten (60 %) über alle vier Prüfungsteile zusammen erforderlich.',
  passingRuleSummaryId:
    'Pada Goethe-Zertifikat A1: Start Deutsch 1, nilai kelulusan dihitung secara gabungan: minimal 60 dari 100 poin total (60%) dari seluruh bagian (Lesen, Hören, Schreiben, Sprechen) dan semua bagian harus diikuti.',
  formatNotesDe:
    'Schriftliche Gruppenprüfung (Hören, Lesen, Schreiben: ca. 65 Minuten, 75 Punkte) sowie eine mündliche Gruppenprüfung (Sprechen: ca. 15 Minuten, 25 Punkte).',
  verificationSource: 'goethe.de — Prüfungsordnung & Durchführungsbestimmungen Goethe-Zertifikat A1: Start Deutsch 1',
  lastVerifiedDate: '2026-11-22',
  modules: [
    {
      moduleKey: 'lesen',
      titleDe: 'Lesen',
      officialModuleTitleDe: 'Lesen (Start Deutsch 1)',
      durationMinutes: 25,
      officialPoints: 25,
      instructionsDe:
        'Dieser Prüfungsteil hat drei Teile. Lies die kurzen Nachrichten, Anzeigen und Schilder genau und wähle jeweils die richtige Antwort.',
      sections: [
        {
          id: 'g-a1-lesen-t1',
          titleDe: 'Teil 1: Kurze Mitteilungen',
          subtitleDe: 'Richtig oder Falsch',
          instructionsDe: 'Lies die zwei Notizen und entscheide: Sind die Aussagen richtig oder falsch?',
          durationMinutes: 8,
          points: 8,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a1-l-1',
              partLabelDe: 'Lesen · Teil 1',
              type: 'true-false',
              passageTitleDe: 'Nachricht von Lukas',
              passageTypeDe: 'SMS / Kurznachricht',
              passageDe:
                'Hallo Mia, ich bin noch im Büro und komme heute später nach Hause. Der Zug um 17:30 Uhr fährt heute nicht. Ich nehme den Bus um 18:00 Uhr. Bitte kauf noch Milch und Brot. Danke! Lukas',
              promptDe: 'Lukas fährt heute um 17:30 Uhr mit dem Zug nach Hause.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Falsch',
              points: 4,
              isEstimatedPracticePoints: true,
              explanationId:
                'Pernyataan ini salah (Falsch). Dalam pesan tertulis „Der Zug um 17:30 Uhr fährt heute nicht“ (Kereta pukul 17.30 hari ini tidak beroperasi), sehingga Lukas naik bus pukul 18.00.',
              grammarNoteId: 'Negasi dengan „nicht“ di akhir klausa utama: „fährt heute nicht“.',
              keyVocabulary: [
                { de: 'später kommen', id: 'datang lebih lambat' },
                { de: 'der Zug', id: 'kereta api' },
                { de: 'einkaufen / kaufen', id: 'membeli' },
              ],
            },
            {
              id: 'g-a1-l-2',
              partLabelDe: 'Lesen · Teil 1',
              type: 'true-false',
              passageTitleDe: 'Einladung zum Deutschkurs-Treffen',
              passageTypeDe: 'E-Mail',
              passageDe:
                'Liebe Kursteilnehmer, am Freitag machen wir um 15:00 Uhr ein kleines Sommerfest im Garten der Sprachschule. Jede Person bringt bitte ein Getränk oder einen Salat mit. Bei Regen treffen wir uns in Raum 204.',
              promptDe: 'Wenn das Wetter schlecht ist, findet das Fest in Raum 204 statt.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Richtig',
              points: 4,
              isEstimatedPracticePoints: true,
              explanationId:
                'Benar (Richtig). Kalimat terakhir menyebutkan: „Bei Regen treffen wir uns in Raum 204“ (Jika hujan, kita bertemu di Ruang 204).',
              grammarNoteId: 'Frasa kondisional sederhana dengan preposisi „bei“ + nomina tanpa artikel: „Bei Regen“.',
              keyVocabulary: [
                { de: 'das Sommerfest', id: 'pesta musim panas' },
                { de: 'mitbringen', id: 'membawa serta' },
                { de: 'bei Regen', id: 'saat hujan' },
              ],
            },
          ],
        },
        {
          id: 'g-a1-lesen-t2',
          titleDe: 'Teil 2: Informationen finden',
          subtitleDe: 'Multiple Choice & Zuordnung',
          instructionsDe: 'Lies die Informationsschilder und Anzeigen und wähle die passende Information aus.',
          durationMinutes: 9,
          points: 9,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a1-l-3',
              partLabelDe: 'Lesen · Teil 2',
              type: 'single-choice',
              passageTitleDe: 'Stadtbibliothek Mitte — Öffnungszeiten',
              passageTypeDe: 'Aushang',
              passageDe:
                'Montag: geschlossen | Dienstag bis Freitag: 10:00 – 19:00 Uhr | Samstag: 10:00 – 14:00 Uhr | Sonntag: geschlossen. Rückgabe von Büchern am Automaten rund um die Uhr möglich.',
              promptDe: 'Wann kann man in der Bibliothek am Samstag Bücher ausleihen?',
              options: [
                'Von 10:00 bis 14:00 Uhr',
                'Von 10:00 bis 19:00 Uhr',
                'Am Samstag ist die Bibliothek geschlossen',
              ],
              correctAnswer: 'Von 10:00 bis 14:00 Uhr',
              points: 4,
              isEstimatedPracticePoints: true,
              explanationId:
                'Pada papan pengumuman tertulis „Samstag: 10:00 – 14:00 Uhr“. Mesin otomatis hanya untuk pengembalian (Rückgabe), bukan peminjaman di dalam gedung.',
              keyVocabulary: [
                { de: 'die Öffnungszeiten', id: 'jam buka' },
                { de: 'geschlossen', id: 'tutup' },
                { de: 'die Rückgabe', id: 'pengembalian' },
              ],
            },
            {
              id: 'g-a1-l-4',
              partLabelDe: 'Lesen · Teil 2',
              type: 'text-matching',
              passageTitleDe: 'Wohnungs- und Kursanzeigen',
              passageTypeDe: 'Anzeigen',
              passageDe:
                'Anzeige A: „Schwimmkurs für Anfänger im Hallenbad Süd, dienstags 18 Uhr.“ | Anzeige B: „Möbliertes Zimmer in 2er-WG, ab 1. Mai frei, 390 Euro warm.“ | Anzeige C: „Fahrrad-Werkstatt am Bahnhof, Reparatur in 2 Stunden.“',
              promptDe: 'Ordne jede Situation der passenden Anzeige zu.',
              matchingPairs: [
                { left: 'Paul sucht ein Zimmer für den Sommer.', right: 'Anzeige B' },
                { left: 'Sara möchte schwimmen lernen.', right: 'Anzeige A' },
                { left: 'Tims Fahrrad ist kaputt.', right: 'Anzeige C' },
              ],
              matchingRightChoices: ['Anzeige A', 'Anzeige B', 'Anzeige C'],
              points: 5,
              isEstimatedPracticePoints: true,
              explanationId:
                'Anzeige B menawarkan kamar berperabot (möbliertes Zimmer) untuk Paul. Anzeige A menawarkan kursus renang pemula untuk Sara. Anzeige C adalah bengkel sepeda untuk Tim.',
              keyVocabulary: [
                { de: 'möbliert', id: 'berperabot lengkap' },
                { de: 'die Werkstatt', id: 'bengkel' },
                { de: 'ab sofort / ab 1. Mai', id: 'mulai tanggal 1 Mei' },
              ],
            },
          ],
        },
        {
          id: 'g-a1-lesen-t3',
          titleDe: 'Teil 3: Schilder im Alltag',
          subtitleDe: 'Verstehen von Hinweisen',
          instructionsDe: 'Lies den kurzen Hinweis und wähle die richtige Bedeutung.',
          durationMinutes: 8,
          points: 8,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a1-l-5',
              partLabelDe: 'Lesen · Teil 3',
              type: 'true-false',
              passageTitleDe: 'Hinweis im Parkhaus',
              passageTypeDe: 'Schild',
              passageDe: 'Bitte zahlen Sie zuerst am Kassenautomat und fahren Sie erst dann zur Ausfahrt.',
              promptDe: 'Man bezahlt erst direkt bei der Ausfahrt im Auto.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Falsch',
              points: 4,
              isEstimatedPracticePoints: true,
              explanationId:
                'Salah (Falsch). Tanda tersebut meminta pengunjung membayar terlebih dahulu di mesin kasir (zuerst am Kassenautomat) sebelum berkendara ke pintu keluar (Ausfahrt).',
              keyVocabulary: [
                { de: 'der Kassenautomat', id: 'mesin pembayaran' },
                { de: 'die Ausfahrt', id: 'pintu keluar kendaraan' },
              ],
            },
            {
              id: 'g-a1-l-6',
              partLabelDe: 'Lesen · Teil 3',
              type: 'single-choice',
              passageTitleDe: 'Schild an der Bäckerei',
              passageTypeDe: 'Schild',
              passageDe: 'Heute nur Barzahlung möglich — unser Kartengerät ist leider defekt.',
              promptDe: 'Wie kann man heute in der Bäckerei bezahlen?',
              options: ['Nur mit Bargeld', 'Mit Kreditkarte', 'Mit dem Handy'],
              correctAnswer: 'Nur mit Bargeld',
              points: 4,
              isEstimatedPracticePoints: true,
              explanationId:
                '„Nur Barzahlung“ berarti hanya pembayaran tunai (Bargeld) yang diterima karena alat pembayaran kartu (Kartengerät) rusak (defekt).',
              keyVocabulary: [
                { de: 'die Barzahlung', id: 'pembayaran tunai' },
                { de: 'defekt', id: 'rusak / tidak berfungsi' },
              ],
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'hoeren',
      titleDe: 'Hören',
      officialModuleTitleDe: 'Hören (Start Deutsch 1)',
      durationMinutes: 20,
      officialPoints: 25,
      instructionsDe:
        'Du hörst kurze Alltagsgespräche und Durchsagen. Teil 1 wird zweimal gehört, Teil 2 einmal. Prüfe vor dem Start die verfügbare Audiodatei.',
      sections: [
        {
          id: 'g-a1-hoeren-t1',
          titleDe: 'Teil 1: Alltagsgespräche',
          subtitleDe: 'Zweimal hören',
          instructionsDe: 'Beantworte die Frage zum kurzen Telefongespräch.',
          durationMinutes: 10,
          points: 12,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a1-h-1',
              partLabelDe: 'Hören · Teil 1',
              type: 'single-choice',
              promptDe: 'Was kostet der Deutschkurs pro Monat?',
              options: ['85 Euro', '95 Euro', '115 Euro'],
              correctAnswer: '95 Euro',
              points: 12,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/goethe/a1/teil1-alltag.mp3',
                status: 'missing',
                titleDe: 'Alltagsgespräch: Anmeldung zum Abendkurs',
                durationLabel: '0:42',
                playLimit: 2,
                transcriptDe:
                  'Frau König: Sprachschule Zentrum, guten Tag! | Herr Adi: Guten Tag, ich möchte mich für den A1-Abendkurs anmelden. Wie viel kostet der Kurs? | Frau König: Das Lehrbuch kostet 20 Euro extra, aber der Kurs selbst kostet 95 Euro im Monat. | Herr Adi: Alles klar, 95 Euro. Wann beginnt er? | Frau König: Am Montag um 18:30 Uhr.',
              },
              explanationId:
                'Biaya kursus per bulan adalah 95 Euro („der Kurs selbst kostet 95 Euro im Monat“). Angka 20 Euro adalah harga buku pelajaran tambahan.',
              keyVocabulary: [
                { de: 'sich anmelden', id: 'mendaftar' },
                { de: 'das Lehrbuch', id: 'buku pelajaran' },
              ],
            },
          ],
        },
        {
          id: 'g-a1-hoeren-t2',
          titleDe: 'Teil 2: Durchsagen',
          subtitleDe: 'Einmal hören',
          instructionsDe: 'Höre die Durchsage im Kaufhaus und entscheide: Richtig oder Falsch.',
          durationMinutes: 10,
          points: 13,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a1-h-2',
              partLabelDe: 'Hören · Teil 2',
              type: 'true-false',
              promptDe: 'Die Damenmode befindet sich heute im dritten Stock.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Richtig',
              points: 13,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/goethe/a1/teil2-durchsagen.mp3',
                status: 'missing',
                titleDe: 'Durchsage im Kaufhaus',
                durationLabel: '0:35',
                playLimit: 1,
                transcriptDe:
                  'Liebe Kundinnen und Kunden, heute erhalten Sie 20 Prozent Rabatt auf alle Winterjacken. Sie finden unsere Damenmode im dritten Stock und die Kindermode im zweiten Stock. Unser Café im Erdgeschoss hat bis 20 Uhr für Sie geöffnet.',
              },
              explanationId:
                'Benar (Richtig). Pengumuman menyatakan „Sie finden unsere Damenmode im dritten Stock“ (Busana wanita ada di lantai tiga).',
              keyVocabulary: [
                { de: 'der Rabatt', id: 'diskon / potongan harga' },
                { de: 'der dritte Stock', id: 'lantai tiga' },
              ],
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'schreiben',
      titleDe: 'Schreiben',
      officialModuleTitleDe: 'Schreiben (Start Deutsch 1)',
      durationMinutes: 20,
      officialPoints: 25,
      instructionsDe:
        'Teil 1: Fülle ein Formular für eine Reiseanmeldung aus. Teil 2: Schreibe eine kurze E-Mail (ca. 30 Wörter).',
      sections: [
        {
          id: 'g-a1-schreiben-t1',
          titleDe: 'Teil 1: Formular ausfüllen',
          subtitleDe: '5 fehlende Angaben ergänzen',
          instructionsDe:
            'Deine Freundin Dina Putri (26 Jahre, aus Jakarta, wohnt jetzt in der Schillerstraße 12 in Berlin) möchte eine BahnCard bestellen. Sie reist allein und möchte ab dem 1. Juni starten. Ergänze die Felder.',
          durationMinutes: 8,
          points: 10,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a1-s-1',
              partLabelDe: 'Schreiben · Teil 1',
              type: 'form-completion',
              promptDe: 'Ergänze die fehlenden Angaben im Formular.',
              blankFields: [
                {
                  id: 'vorname',
                  labelDe: 'Vorname / Nachname',
                  placeholderDe: 'z. B. Dina Putri',
                  correctAnswer: 'Dina Putri',
                  acceptableAnswers: ['Dina Putri'],
                },
                {
                  id: 'stadt',
                  labelDe: 'Wohnort (Stadt)',
                  placeholderDe: 'Stadt eintragen',
                  correctAnswer: 'Berlin',
                  acceptableAnswers: ['Berlin'],
                },
                {
                  id: 'alter',
                  labelDe: 'Alter',
                  placeholderDe: 'Zahl',
                  correctAnswer: '26',
                  acceptableAnswers: ['26', '26 Jahre'],
                },
                {
                  id: 'personen',
                  labelDe: 'Anzahl der Reisenden',
                  placeholderDe: 'Zahl',
                  correctAnswer: '1',
                  acceptableAnswers: ['1', 'eine', '1 Person'],
                },
              ],
              points: 10,
              isEstimatedPracticePoints: true,
              explanationId:
                'Di ujian Goethe A1 Bagian 1, peserta harus mengekstrak fakta sederhana ke dalam formulir: nama (Dina Putri), kota tinggal saat ini (Berlin), usia (26), dan jumlah peserta (1 karena „allein“).',
              keyVocabulary: [
                { de: 'der Wohnort', id: 'tempat tinggal' },
                { de: 'allein reisen', id: 'bepergian sendirian' },
              ],
            },
          ],
        },
        {
          id: 'g-a1-schreiben-t2',
          titleDe: 'Teil 2: Kurze Mitteilung / E-Mail',
          subtitleDe: 'Ca. 30 Wörter',
          instructionsDe:
            'Schreibe an alle drei Inhaltspunkte und vergiss Anrede und Gruß nicht.',
          durationMinutes: 12,
          points: 15,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a1-s-2',
              partLabelDe: 'Schreiben · Teil 2',
              type: 'email-writing',
              promptDe:
                'Du möchtest am Samstag deine Freundin Laura besuchen. Schreibe ihr eine E-Mail:\n• Warum schreibst du?\n• Wann kommst du genau an?\n• Was möchtest du zusammen machen?',
              wordCountRange: { min: 25, max: 50 },
              points: 15,
              isEstimatedPracticePoints: true,
              explanationId:
                'Untuk A1 Schreiben Teil 2, pastikan sapaan (Liebe Laura,), ketiga poin pertanyaan terjawab dalam kalimat sederhana, dan ada salam penutup (Viele Grüße + nama).',
              grammarNoteId: 'Gunakan urutan kata subjek–kata kerja di posisi 2, serta preposisi waktu „am Samstag“ dan „um 14 Uhr“.',
              keyVocabulary: [
                { de: 'besuchen', id: 'mengunjungi' },
                { de: 'ankommen', id: 'tiba' },
                { de: 'zusammen kochen', id: 'memasak bersama' },
              ],
              sampleAnswerDe:
                'Liebe Laura,\n\nich möchte dich am Samstag gern besuchen! Ich komme am Samstag um 14:00 Uhr am Bahnhof an. Können wir am Nachmittag zusammen Kaffee trinken und kochen?\n\nViele Grüße\nBudi',
              sampleTranslationId:
                'Laura yang baik, aku ingin mengunjungimu hari Sabtu nanti! Aku tiba hari Sabtu pukul 14.00 di stasiun. Bisakah kita minum kopi dan memasak bersama sore nanti? Salam hangat, Budi.',
              rubricCriteria: buildWritingRubric(15),
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'sprechen',
      titleDe: 'Sprechen',
      officialModuleTitleDe: 'Sprechen (Start Deutsch 1)',
      durationMinutes: 15,
      officialPoints: 25,
      instructionsDe:
        'Die mündliche Prüfung hat drei Teile in der Gruppe: Teil 1 (Sich vorstellen), Teil 2 (Um Informationen bitten) und Teil 3 (Bitten formulieren).',
      sections: [
        {
          id: 'g-a1-sprechen-t1',
          titleDe: 'Teil 1–3: Mündliche Kommunikation',
          subtitleDe: 'Vorstellen, Fragen stellen & Bitten äußern',
          instructionsDe:
            'Bearbeite die Aufgaben laut. Nutze optional die Aufnahmefunktion zur Selbstkontrolle. Es erfolgt keine automatische KI-Bewertung.',
          durationMinutes: 15,
          points: 25,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a1-sp-1',
              partLabelDe: 'Sprechen · Teil 1 & 2',
              type: 'speaking-prompt',
              promptDe:
                '1. Stelle dich kurz vor: Name, Alter, Land, Wohnort, Beruf/Studium, Hobbys.\n2. Thema „Einkaufen“ — Stelle deinem Partner eine Frage zum Stichwort „Supermarkt“ und eine Bitte zum Bild „Fenster öffnen“.',
              preparationSeconds: 30,
              speakingSeconds: 180,
              partnerPromptsDe: [
                'Prüfer: „Wie heißt Ihr Familienname? Buchstabieren Sie bitte!“',
                'Partner-Stichwort „Supermarkt“: „Wann gehen Sie am Samstag in den Supermarkt?“',
                'Partner-Antwort zur Bitte: „Ja, natürlich, ich öffne das Fenster sofort.“',
              ],
              points: 25,
              isEstimatedPracticePoints: true,
              explanationId:
                'Pada Goethe A1 Sprechen: bagian 1 memperkenalkan diri (lancar menyebut asal, pekerjaan, hobi, dan mengeja nama/nomor). Bagian 2 membuat W-Frage atau Ja/Nein-Frage dari kartu kata. Bagian 3 membuat permintaan sopan („Können Sie bitte das Fenster öffnen?“).',
              sampleAnswerDe:
                'Teil 1: Guten Tag! Ich heiße Sari. Ich bin 24 Jahre alt und komme aus Indonesien. Ich wohne in Bandung und lerne Deutsch. Meine Hobbys sind Lesen und Kochen.\nTeil 2: Gehen Sie oft in den Supermarkt? Was kaufen Sie dort?\nTeil 3: Entschuldigung, können Sie bitte das Fenster öffnen?',
              sampleTranslationId:
                'Bagian 1: Selamat siang! Nama saya Sari, usia 24 tahun, berasal dari Indonesia... Bagian 2: Apakah Anda sering pergi ke supermarket?... Bagian 3: Permisi, bisakah Anda membuka jendela?',
              rubricCriteria: buildSpeakingRubric(25),
            },
          ],
        },
      ],
    },
  ],
};
