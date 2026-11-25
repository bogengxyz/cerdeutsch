import { ExamConfiguration } from '../../../types/exam';
import { buildSpeakingRubric, buildWritingRubric } from '../rubrics';

export const GOETHE_A2_EXAM: ExamConfiguration = {
  id: 'goethe-a2',
  provider: 'goethe',
  level: 'A2',
  officialName: 'Goethe-Zertifikat A2',
  totalDurationMinutes: 105,
  totalPoints: 100,
  moduleIndependence: 'written-oral-split',
  overallPassingPoints: 60,
  writtenTotalPoints: 75,
  writtenPassingPoints: 45,
  oralTotalPoints: 25,
  oralPassingPoints: 15,
  passingRuleSummaryDe:
    'Mindestens 60 von 100 Punkten insgesamt, davon mindestens 45/75 Punkte in der schriftlichen Prüfung (Lesen, Hören, Schreiben) UND mindestens 15/25 Punkte in der mündlichen Prüfung (Sprechen).',
  passingRuleSummaryId:
    'Goethe-Zertifikat A2 mensyaratkan minimal 60 dari 100 poin total, DENGAN syarat minimal 45/75 poin di bagian tertulis (Lesen, Hören, Schreiben) DAN minimal 15/25 poin di bagian lisan (Sprechen).',
  formatNotesDe:
    'Schriftliche Prüfung: Lesen (30 Min.), Hören (30 Min.), Schreiben (30 Min.) = 75 Punkte. Mündliche Paarprüfung: Sprechen (ca. 15 Min.) = 25 Punkte.',
  verificationSource: 'goethe.de — Prüfungsordnung & Durchführungsbestimmungen Goethe-Zertifikat A2',
  lastVerifiedDate: '2026-11-22',
  modules: [
    {
      moduleKey: 'lesen',
      titleDe: 'Lesen',
      officialModuleTitleDe: 'Lesen (Goethe-Zertifikat A2)',
      durationMinutes: 30,
      officialPoints: 25,
      instructionsDe:
        'Der Prüfungsteil Lesen besteht aus vier Teilen mit Zeitungsnotizen, Informationstafeln, einer E-Mail und Anzeigen.',
      sections: [
        {
          id: 'g-a2-lesen-t1',
          titleDe: 'Teil 1: Kurzer Zeitungsartikel',
          subtitleDe: 'Multiple Choice',
          instructionsDe: 'Lies den Artikel über ein neues Stadtfahrrad-Projekt und wähle die richtige Lösung.',
          durationMinutes: 10,
          points: 8,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a2-l-1',
              partLabelDe: 'Lesen · Teil 1',
              type: 'single-choice',
              passageTitleDe: 'Mehr Leihräder im Stadtzentrum',
              passageTypeDe: 'Zeitungsnotiz',
              passageDe:
                'Seit Anfang April stehen in der Innenstadt 200 neue Leihräder an insgesamt zwanzig Stationen bereit. Mit einer günstigen Monatskarte für 12 Euro dürfen Pendler jede Fahrt bis zu dreißig Minuten kostenlos nutzen. Besonders Studierende und Berufstätige sparen damit Zeit auf dem Weg zur Arbeit.',
              promptDe: 'Wer bezahlt für Fahrten unter 30 Minuten nichts extra?',
              options: [
                'Personen mit einer Monatskarte für 12 Euro',
                'Nur Studierende unter 25 Jahren',
                'Alle Touristinnen am Wochenende',
              ],
              correctAnswer: 'Personen mit einer Monatskarte für 12 Euro',
              points: 4,
              isEstimatedPracticePoints: true,
              explanationId:
                'Teks menyatakan „Mit einer günstigen Monatskarte für 12 Euro dürfen Pendler jede Fahrt bis zu dreißig Minuten kostenlos nutzen.“ Mahasiswa (Studierende) disebut sebagai kelompok yang paling diuntungkan, bukan satu-satunya.',
              keyVocabulary: [
                { de: 'das Leihrad', id: 'sepeda sewaan' },
                { de: 'der Pendler', id: 'komuter / pekerja ulang-alik' },
                { de: 'kostenlos', id: 'gratis' },
              ],
            },
            {
              id: 'g-a2-l-2',
              partLabelDe: 'Lesen · Teil 1',
              type: 'dropdown',
              passageTitleDe: 'Lückentext zum Projekt',
              passageTypeDe: 'Kurzinfo',
              passageDe: 'Ergänze die passenden Wörter aus dem obigen Textkontext.',
              promptDe: 'Wähle die grammatisch und inhaltlich richtigen Ergänzungen.',
              blankFields: [
                {
                  id: 'g-a2-b1',
                  labelDe: 'Die Fahrräder stehen an zwanzig Stationen ______.',
                  options: ['bereit', 'vorbei', 'zurück'],
                  correctAnswer: 'bereit',
                },
                {
                  id: 'g-a2-b2',
                  labelDe: 'Viele Berufstätige fahren damit ______ zur Arbeit.',
                  options: ['schneller', 'langsam', 'teurer'],
                  correctAnswer: 'schneller',
                },
              ],
              points: 4,
              isEstimatedPracticePoints: true,
              explanationId:
                '„bereitstehen“ adalah verba terpisah yang berarti tersedia/siap pakai. Bentuk komparatif „schneller“ (lebih cepat) sesuai dengan pernyataan menghemat waktu (sparen Zeit).',
              grammarNoteId: 'Verba terpisah (trennbare Verben): „bereitstehen“ → „stehen ... bereit“.',
            },
          ],
        },
        {
          id: 'g-a2-lesen-t2',
          titleDe: 'Teil 2 & 3: E-Mail & Hinweise',
          subtitleDe: 'Detailverstehen und Zuordnung',
          instructionsDe: 'Lies die E-Mail und ordne die Situationen zu.',
          durationMinutes: 20,
          points: 17,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a2-l-3',
              partLabelDe: 'Lesen · Teil 2',
              type: 'multiple-select',
              passageTitleDe: 'E-Mail von der neuen Kollegin',
              passageTypeDe: 'E-Mail',
              passageDe:
                'Lieber Jonas, vielen Dank für die Führung durch die Firma gestern! Am Montag fange ich im Team Marketing an. Kannst du mir sagen, wo ich den Schlüssel für den Fahrradkeller bekomme? Außerdem suche ich noch ein gutes Mittagslokal in der Nähe. Bis Montag! Hanna',
              promptDe: 'Was stimmt über Hanna? (Wähle genau zwei Aussagen aus.)',
              options: [
                'Sie hat gestern das Unternehmen kennengelernt.',
                'Sie beginnt nächste Woche im Marketing-Team.',
                'Sie arbeitet schon seit fünf Jahren in der Firma.',
                'Sie sucht eine Wohnung im Stadtzentrum.',
              ],
              correctAnswer: [
                'Sie hat gestern das Unternehmen kennengelernt.',
                'Sie beginnt nächste Woche im Marketing-Team.',
              ],
              points: 8,
              isEstimatedPracticePoints: true,
              explanationId:
                'Hanna mengucapkan terima kasih atas tur perusahaan kemarin („Führung durch die Firma gestern“) dan baru mulai bekerja hari Senin di tim Marketing („Am Montag fange ich im Team Marketing an“).',
              keyVocabulary: [
                { de: 'die Führung', id: 'tur / pengenalan keliling' },
                { de: 'der Fahrradkeller', id: 'ruang bawah tanah parkir sepeda' },
              ],
            },
            {
              id: 'g-a2-l-4',
              partLabelDe: 'Lesen · Teil 3',
              type: 'matching',
              passageTitleDe: 'Veranstaltungsprogramm am Wochenende',
              passageTypeDe: 'Programmtafel',
              passageDe:
                '1. Kinderkino „Der kleine Drache“ (14 Uhr, Saal 2) | 2. Kochworkshop „Vegetarisch für jeden Tag“ (17 Uhr, Küche B) | 3. Berufsinformationsabend (19 Uhr, Raum 108)',
              promptDe: 'Welche Veranstaltung passt zu welcher Person?',
              matchingPairs: [
                { left: 'Markus sucht Tipps für eine neue Arbeit.', right: 'Berufsinformationsabend' },
                { left: 'Lisa möchte gesunde Gerichte kochen lernen.', right: 'Kochworkshop' },
                { left: 'Familie Weber geht mit ihrem Sohn ins Kino.', right: 'Kinderkino' },
              ],
              matchingRightChoices: ['Kinderkino', 'Kochworkshop', 'Berufsinformationsabend'],
              points: 9,
              isEstimatedPracticePoints: true,
              explanationId:
                'Markus cocok ke Berufsinformationsabend (malam info karier), Lisa ke Kochworkshop (lokakarya memasak), dan keluarga Weber ke Kinderkino.',
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'hoeren',
      titleDe: 'Hören',
      officialModuleTitleDe: 'Hören (Goethe-Zertifikat A2)',
      durationMinutes: 30,
      officialPoints: 25,
      instructionsDe:
        'Du hörst Ansagen aus dem Alltag und ein Gespräch. Achte auf genaue Zahlen, Orte und Gründe.',
      sections: [
        {
          id: 'g-a2-hoeren-t1',
          titleDe: 'Teil 1: Ansagen & Nachrichten',
          subtitleDe: 'Einmal hören',
          instructionsDe: 'Lies die Aufgabe und prüfe die lokale Audiodatei.',
          durationMinutes: 15,
          points: 12,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a2-h-1',
              partLabelDe: 'Hören · Teil 1',
              type: 'single-choice',
              promptDe: 'Warum verspätet sich der Zug nach Hamburg?',
              options: [
                'Wegen Bauarbeiten auf der Strecke',
                'Wegen eines Sturms am Bahnhof',
                'Weil der Lokführer noch fehlt',
              ],
              correctAnswer: 'Wegen Bauarbeiten auf der Strecke',
              points: 12,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/goethe/a2/teil1-ansagen.mp3',
                status: 'missing',
                titleDe: 'Bahnhofsansage IC 204',
                durationLabel: '0:48',
                playLimit: 1,
                transcriptDe:
                  'Achtung am Gleis 4: Der Intercity nach Hamburg Hauptbahnhof hat heute wegen Bauarbeiten auf der Strecke etwa fünfzehn Minuten Verspätung. Wir bitten um Entschuldigung.',
              },
              explanationId:
                'Pengumuman menyebut „wegen Bauarbeiten auf der Strecke“ (karena pekerjaan konstruksi di jalur rel). Preposisi „wegen“ sangat sering muncul di soal alasan Hören A2.',
              grammarNoteId: 'Preposisi kausal „wegen“ + Genitiv/Dativ: „wegen Bauarbeiten“ (karena perbaikan).',
            },
          ],
        },
        {
          id: 'g-a2-hoeren-t2',
          titleDe: 'Teil 2: Gespräch',
          subtitleDe: 'Richtig oder Falsch',
          instructionsDe: 'Höre ein Gespräch zwischen zwei Freunden über das Wochenende.',
          durationMinutes: 15,
          points: 13,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a2-h-2',
              partLabelDe: 'Hören · Teil 2',
              type: 'true-false',
              promptDe: 'Tim und Anna fahren am Sonntag gemeinsam an den See.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Falsch',
              points: 13,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/goethe/a2/teil2-gespraech.mp3',
                status: 'missing',
                titleDe: 'Wochenendplanung',
                durationLabel: '1:05',
                playLimit: 2,
                transcriptDe:
                  'Anna: Wollen wir am Sonntag an den See fahren? | Tim: Tut mir leid, am Sonntag besuche ich meine Großeltern. Wie wäre es am Samstagnachmittag? | Anna: Samstag passt gut! Dann nehme ich Kuchen mit.',
              },
              explanationId:
                'Salah (Falsch). Pada hari Minggu Tim mengunjungi kakek-neneknya („besuche ich meine Großeltern“). Mereka sepakat pergi hari Sabtu sore.',
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'schreiben',
      titleDe: 'Schreiben',
      officialModuleTitleDe: 'Schreiben (Goethe-Zertifikat A2)',
      durationMinutes: 30,
      officialPoints: 25,
      instructionsDe:
        'Du schreibst eine kurze SMS/Nachricht (Teil 1, ca. 20–30 Wörter) und eine halbformelle E-Mail (Teil 2, ca. 30–40 Wörter).',
      sections: [
        {
          id: 'g-a2-schreiben-t1',
          titleDe: 'Teil 1: Kurze Nachricht',
          subtitleDe: 'SMS an eine Freundin',
          instructionsDe: 'Schreibe eine Nachricht mit allen drei Punkten.',
          durationMinutes: 12,
          points: 10,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a2-s-1',
              partLabelDe: 'Schreiben · Teil 1',
              type: 'email-writing',
              promptDe:
                'Du bist mit deiner Freundin Eva im Kino verabredet, aber dein Bus steht im Stau. Schreib ihr:\n• Warum du dich verspätest\n• Wann du am Kino bist\n• Was Eva schon machen kann',
              wordCountRange: { min: 20, max: 45 },
              points: 10,
              isEstimatedPracticePoints: true,
              explanationId:
                'Di Teil 1 A2, jelaskan alasan keterlambatan (macet), perkiraan waktu tiba, dan saran agar teman menunggu atau membeli tiket dulu.',
              sampleAnswerDe:
                'Hallo Eva, es tut mir leid, mein Bus steht im Stau und ich komme 15 Minuten später. Ich bin um 19:15 Uhr am Kino. Kannst du bitte schon die Karten kaufen? Bis gleich! Andi',
              sampleTranslationId:
                'Halo Eva, maaf, busku terjebak macet dan aku datang 15 menit lebih lambat. Aku tiba pukul 19.15 di bioskop. Bisakah kamu membelikan tiketnya dulu? Sampai nanti! Andi.',
              rubricCriteria: buildWritingRubric(10),
            },
          ],
        },
        {
          id: 'g-a2-schreiben-t2',
          titleDe: 'Teil 2: Halbformelle E-Mail',
          subtitleDe: 'Sie-Anrede an einen Kursleiter',
          instructionsDe: 'Achte auf die höfliche Sie-Form und beantworte alle drei Punkte.',
          durationMinutes: 18,
          points: 15,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a2-s-2',
              partLabelDe: 'Schreiben · Teil 2',
              type: 'email-writing',
              promptDe:
                'Ihr Deutschlehrer, Herr Weber, hat Sie zum Abschlussessen eingeladen. Schreiben Sie eine E-Mail:\n• Bedanken Sie sich für die Einladung.\n• Sagen Sie, ob Sie kommen und etwas mitbringen können.\n• Fragen Sie nach der genauen Adresse des Restaurants.',
              wordCountRange: { min: 30, max: 60 },
              points: 15,
              isEstimatedPracticePoints: true,
              explanationId:
                'Karena penerima adalah Herr Weber, wajib memakai sapaan formal („Sehr geehrter Herr Weber,“) dan kata ganti „Sie / Ihnen“. Pastikan ketiga poin terjawab jelas.',
              grammarNoteId: 'Gunakan „Sehr geehrter Herr ...“ untuk pria dan „Mit freundlichen Grüßen“ untuk penutup formal.',
              sampleAnswerDe:
                'Sehr geehrter Herr Weber,\n\nvielen Dank für Ihre freundliche Einladung zum Abschlussessen! Ich komme sehr gerne am Freitagabend. Soll ich noch ein Getränk oder einen Nachtisch mitbringen? Könnten Sie mir bitte noch die genaue Adresse vom Restaurant schreiben?\n\nMit freundlichen Grüßen\nRina Kusuma',
              sampleTranslationId:
                'Yth. Bapak Weber, terima kasih banyak atas undangan makan malam penutup! Saya dengan senang hati datang Jumat malam. Apakah saya perlu membawa minuman atau pencuci mulut? Bisakah Anda menuliskan alamat lengkap restorannya? Hormat saya, Rina Kusuma.',
              rubricCriteria: buildWritingRubric(15),
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'sprechen',
      titleDe: 'Sprechen',
      officialModuleTitleDe: 'Sprechen (Goethe-Zertifikat A2)',
      durationMinutes: 15,
      officialPoints: 25,
      instructionsDe:
        'Paarprüfung in drei Teilen: Teil 1 Fragen zur Person stellen/beantworten, Teil 2 Von sich erzählen, Teil 3 Gemeinsam etwas planen.',
      sections: [
        {
          id: 'g-a2-sprechen-t1',
          titleDe: 'Teil 1–3: Gespräch & Planung',
          subtitleDe: 'Monolog & gemeinsames Planen',
          instructionsDe: 'Sprich zu den Leitpunkten und plane gemeinsam einen Ausflug.',
          durationMinutes: 15,
          points: 25,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-a2-sp-1',
              partLabelDe: 'Sprechen · Teil 2 & 3',
              type: 'speaking-prompt',
              promptDe:
                'Teil 2 (Monolog): Erzähle über dein Wochenende (Wann stehst du auf? Was machst du? Mit wem triffst du dich? Was machst du am liebsten?).\nTeil 3 (Planung): Du möchtest mit einem Freund ein Picknick am Samstag organisieren (Wann? Wo? Wer bringt was mit?).',
              preparationSeconds: 60,
              speakingSeconds: 240,
              partnerPromptsDe: [
                'Partner: „Ich habe am Samstagvormittag Zeit. Sollen wir uns um 11 Uhr treffen?“',
                'Partner: „Welcher Park gefällt dir am besten?“',
                'Partner: „Super, dann bringe ich Sandwiches und Wasser mit!“',
              ],
              points: 25,
              isEstimatedPracticePoints: true,
              explanationId:
                'Di Goethe A2 Sprechen Teil 2, ceritakan topik keseharian dengan kata hubung sederhana (und, aber, denn, deshalb). Di Teil 3, gunakan ungkapan usulan: „Wollen wir...?“, „Wie wäre es um 11 Uhr?“, „Das ist eine gute Idee!“',
              sampleAnswerDe:
                'Teil 2: Am Wochenende stehe ich meistens um acht Uhr auf. Zuerst frühstücke ich mit meiner Familie, denn wir haben unter der Woche wenig Zeit. Am Nachmittag treffe ich Freunde im Café.\nTeil 3: Hallo! Wollen wir am Samstag ein Picknick machen? Wie wäre es um 11 Uhr im Stadtpark? Ich kann Obst und Saft mitbringen.',
              sampleTranslationId:
                'Bagian 2: Saat akhir pekan saya biasanya bangun pukul delapan... Bagian 3: Halo! Mau kita piknik hari Sabtu? Bagaimana kalau pukul 11 di taman kota? Saya bisa membawa buah dan jus.',
              rubricCriteria: buildSpeakingRubric(25),
            },
          ],
        },
      ],
    },
  ],
};
