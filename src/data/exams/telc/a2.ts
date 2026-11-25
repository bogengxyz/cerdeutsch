import { ExamConfiguration } from '../../../types/exam';
import { buildSpeakingRubric, buildWritingRubric } from '../rubrics';

export const TELC_A2_EXAM: ExamConfiguration = {
  id: 'telc-a2',
  provider: 'telc',
  level: 'A2',
  officialName: 'telc Deutsch A2 (Start Deutsch 2)',
  totalDurationMinutes: 85,
  totalPoints: 60,
  moduleIndependence: 'overall',
  overallPassingPoints: 36,
  writtenTotalPoints: 45,
  oralTotalPoints: 15,
  passingRuleSummaryDe:
    'Mindestens 36 von 60 Punkten (60 %) insgesamt über alle vier Prüfungsteile (Lesen, Hören, Schreiben, Sprechen) erforderlich.',
  passingRuleSummaryId:
    'Pada telc Deutsch A2, total skor maksimal adalah 60 poin (masing-masing 15 poin per keterampilan). Kandidat lulus jika mencapai minimal 36 dari 60 poin keseluruhan.',
  formatNotesDe:
    'Schriftliche Prüfung (ca. 70 Min.: Lesen, Hören, Schreiben = 45 Punkte) sowie eine paarweise mündliche Prüfung (ca. 15 Min. ohne Vorbereitungsraum = 15 Punkte).',
  verificationSource: 'telc.net — Prüfungsformat & Bewertungsskala telc Deutsch A2',
  lastVerifiedDate: '2026-11-22',
  modules: [
    {
      moduleKey: 'lesen',
      titleDe: 'Lesen',
      officialModuleTitleDe: 'Leseverstehen (telc Deutsch A2)',
      durationMinutes: 25,
      officialPoints: 15,
      instructionsDe:
        'Lies Informationen aus dem Kaufhaus, kurze Zeitungsberichte und Kleinanzeigen.',
      sections: [
        {
          id: 't-a2-lesen-t1',
          titleDe: 'Teil 1 & 2: Wegweiser & Meldung',
          subtitleDe: 'Informationen finden & Detailverstehen',
          instructionsDe: 'Beantworte die Aufgaben präzise anhand der Texte.',
          durationMinutes: 15,
          points: 10,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-a2-l-1',
              partLabelDe: 'Lesen · Teil 1',
              type: 'matching',
              passageTitleDe: 'Rathaus — Wegweiser für Bürger',
              passageTypeDe: 'Gebäudeübersicht',
              passageDe:
                'Erdgeschoss: Information & Fundsachen | 1. Obergeschoss: Meldeamt & Reisepässe | 2. Obergeschoss: Standesamt & Familienbüro',
              promptDe: 'In welches Stockwerk muss jede Person gehen?',
              matchingPairs: [
                { left: 'Paul hat seinen Regenschirm im Bus verloren.', right: 'Erdgeschoss' },
                { left: 'Anna möchte einen neuen Reisepass beantragen.', right: '1. Obergeschoss' },
                { left: 'Tom und Lea möchten ihre Hochzeit anmelden.', right: '2. Obergeschoss' },
              ],
              matchingRightChoices: ['Erdgeschoss', '1. Obergeschoss', '2. Obergeschoss'],
              points: 5,
              isEstimatedPracticePoints: true,
              explanationId:
                'Barang hilang (Fundsachen) ada di Erdgeschoss, paspor (Reisepässe) di 1. Obergeschoss, dan pencatatan pernikahan (Standesamt) di 2. Obergeschoss.',
            },
            {
              id: 't-a2-l-2',
              partLabelDe: 'Lesen · Teil 2',
              type: 'single-choice',
              passageTitleDe: 'Neuer Wochenmarkt am Rathausplatz',
              passageTypeDe: 'Lokalnachricht',
              passageDe:
                'Ab Mai findet jeden Donnerstag von 14 bis 19 Uhr ein kleiner Feierabendmarkt vor dem Rathaus statt. Zwölf regionale Bauernhöfe verkaufen dort frisches Gemüse, Käse und Brot. Bei starkem Gewitter entfällt der Markt.',
              promptDe: 'Was ist richtig über den Markt?',
              options: [
                'Man kann dort nachmittags bis abends regionale Lebensmittel kaufen.',
                'Der Markt findet auch am Sonntagvormittag statt.',
                'Bei Gewitter zieht der Markt in das Rathaus um.',
              ],
              correctAnswer: 'Man kann dort nachmittags bis abends regionale Lebensmittel kaufen.',
              points: 5,
              isEstimatedPracticePoints: true,
              explanationId:
                'Pasar berlangsung setiap Kamis pukul 14–19 (sore hingga malam) dan menjual produk lokal dari 12 peternakan.',
            },
          ],
        },
        {
          id: 't-a2-lesen-t3',
          titleDe: 'Teil 3: Anzeigen',
          subtitleDe: 'Passende Angebote finden',
          instructionsDe: 'Entscheide, ob die Anzeige zum Wunsch passt.',
          durationMinutes: 10,
          points: 5,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-a2-l-3',
              partLabelDe: 'Lesen · Teil 3',
              type: 'true-false',
              passageTitleDe: 'Anzeige: Nachhilfe in Mathematik',
              passageTypeDe: 'Kleinanzeige',
              passageDe:
                'Studentin gibt Nachhilfe in Mathe für Klassen 5 bis 9. Nur dienstags und donnerstags ab 16 Uhr, 15 Euro pro Stunde.',
              promptDe: 'Ein Schüler der 7. Klasse kann am Dienstag um 17 Uhr Nachhilfe nehmen.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Richtig',
              points: 5,
              isEstimatedPracticePoints: true,
              explanationId:
                'Benar (Richtig). Kelas 7 masuk rentang kelas 5–9, dan hari Selasa mulai pukul 16 tersedia.',
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'hoeren',
      titleDe: 'Hören',
      officialModuleTitleDe: 'Hörverstehen (telc Deutsch A2)',
      durationMinutes: 20,
      officialPoints: 15,
      instructionsDe:
        'Du hörst Telefonansagen und ein Radiointerview über Freizeitgewohnheiten.',
      sections: [
        {
          id: 't-a2-hoeren-t1',
          titleDe: 'Teil 1 & 2: Telefonansage & Radio',
          subtitleDe: 'Einzelinformationen erfassen',
          instructionsDe: 'Beantworte die Aufgaben anhand der lokalen Audiodateien.',
          durationMinutes: 20,
          points: 15,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-a2-h-1',
              partLabelDe: 'Hören · Teil 1',
              type: 'single-choice',
              promptDe: 'Wann ruft die Kundin am besten noch einmal bei der Werkstatt an?',
              options: [
                'Am Donnerstagvormittag ab 9 Uhr',
                'Am Mittwoch um 15 Uhr',
                'Am Samstagabend um 19 Uhr',
              ],
              correctAnswer: 'Am Donnerstagvormittag ab 9 Uhr',
              points: 8,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/telc/a2/teil1-telefonansagen.mp3',
                status: 'missing',
                titleDe: 'Anrufbeantworter der Autowerkstatt',
                durationLabel: '0:40',
                playLimit: 2,
                transcriptDe:
                  'Autohaus Nord: Sie rufen außerhalb unserer Öffnungszeiten an. Mittwochnachmittags ist unsere Werkstatt geschlossen. Ab Donnerstagvormittag um 9 Uhr sind wir wieder persönlich für Sie da.',
              },
              explanationId:
                'Pesan mesin penjawab menyebut bengkel buka kembali Kamis pagi mulai pukul 9 („Ab Donnerstagvormittag um 9 Uhr“).',
            },
            {
              id: 't-a2-h-2',
              partLabelDe: 'Hören · Teil 2',
              type: 'true-false',
              promptDe: 'Der Interviewpartner fährt jeden Morgen mit der U-Bahn zur Arbeit.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Falsch',
              points: 7,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/telc/a2/teil2-radio.mp3',
                status: 'missing',
                titleDe: 'Kurzes Radiointerview: Arbeitsweg',
                durationLabel: '0:50',
                playLimit: 1,
                transcriptDe:
                  'Reporter: Wie kommen Sie morgens ins Büro? | Gast: Früher bin ich mit der U-Bahn gefahren, aber seit einem halben Jahr gehe ich jeden Tag dreißig Minuten zu Fuß durch den Park.',
              },
              explanationId:
                'Salah (Falsch). Dulu ia naik U-Bahn („Früher“), tetapi sejak setengah tahun terakhir ia berjalan kaki 30 menit melalui taman.',
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'schreiben',
      titleDe: 'Schreiben',
      officialModuleTitleDe: 'Schriftlicher Ausdruck (telc Deutsch A2)',
      durationMinutes: 25,
      officialPoints: 15,
      instructionsDe:
        'Schreibe eine persönliche E-Mail an einen Bekannten mit allen vorgegebenen Leitpunkten.',
      sections: [
        {
          id: 't-a2-schreiben-t1',
          titleDe: 'E-Mail schreiben',
          subtitleDe: 'Ca. 50 Wörter',
          instructionsDe: 'Antworte auf alle vier Inhaltspunkte.',
          durationMinutes: 25,
          points: 15,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-a2-s-1',
              partLabelDe: 'Schreiben · Aufgabe',
              type: 'email-writing',
              promptDe:
                'Dein Kollege Lukas hat eine neue Wohnung gefunden und macht eine Einweihungsfeier. Schreib ihm eine E-Mail:\n• Bedanke dich für die Einladung.\n• Frag nach der genauen Adresse und Uhrzeit.\n• Schreib, was du zum Essen mitbringst.\n• Frag, wer noch zur Feier kommt.',
              wordCountRange: { min: 45, max: 85 },
              points: 15,
              isEstimatedPracticePoints: true,
              explanationId:
                'Pada telc A2 Schreiben, pastikan keempat poin ditanyakan/dijawab lengkap dengan gaya akrab (du-Form), ditambah sapaan awal dan salam penutup.',
              sampleAnswerDe:
                'Lieber Lukas,\n\nvielen Dank für deine Einladung zur Einweihungsfeier! Ich freue mich sehr und komme gern. Kannst du mir bitte noch deine neue Adresse und die genaue Uhrzeit schreiben? Ich möchte gern einen Kartoffelsalat mitbringen. Wer kommt denn noch alles aus unserem Team?\n\nViele Grüße\nTari',
              sampleTranslationId:
                'Lukas yang baik, terima kasih atas undangan syukuran rumah barunya! Aku senang sekali dan pasti datang. Bisakah kamu menuliskan alamat barumu dan jam pastinya? Aku ingin membawa salad kentang. Siapa lagi dari tim kita yang datang? Salam hangat, Tari.',
              rubricCriteria: buildWritingRubric(15),
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'sprechen',
      titleDe: 'Sprechen',
      officialModuleTitleDe: 'Mündliche Prüfung (telc Deutsch A2)',
      durationMinutes: 15,
      officialPoints: 15,
      instructionsDe:
        'Paarprüfung: Teil 1 Sich kennenlernen (4 Fragen), Teil 2 Ein Gespräch führen (Alltagsthema), Teil 3 Etwas gemeinsam planen.',
      sections: [
        {
          id: 't-a2-sprechen-t1',
          titleDe: 'Teil 1–3: Alltagssituationen & Planung',
          subtitleDe: 'Paarweises Gespräch ohne Vorbereitungszeit',
          instructionsDe: 'Sprich spontan über Freizeit und plane einen Termin.',
          durationMinutes: 15,
          points: 15,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-a2-sp-1',
              partLabelDe: 'Sprechen · Teil 2 & 3',
              type: 'speaking-prompt',
              promptDe:
                'Teil 2: Erzähle über deine letzte Reise oder einen Ausflug (Wohin? Mit wem? Wie lange? Was hast du gemacht?).\nTeil 3: Ihr wollt am Sonntag gemeinsam Deutsch lernen. Plant Uhrzeit, Ort und Material.',
              preparationSeconds: 20,
              speakingSeconds: 210,
              partnerPromptsDe: [
                'Partner (Teil 2): „War das Hotel dort teuer oder günstig?“',
                'Partner (Teil 3): „Am Sonntagvormittag schlafe ich gern länger. Geht es auch um 14 Uhr?“',
              ],
              points: 15,
              isEstimatedPracticePoints: true,
              explanationId:
                'Dalam telc A2 tanpa ruang persiapan, gunakan Perfekt untuk menceritakan perjalanan („Ich bin nach Bali geflogen, wir haben...“) dan tanggapi usulan jam partner secara kooperatif.',
              sampleAnswerDe:
                'Teil 2: Im letzten Sommer bin ich mit meiner Familie nach Yogyakarta gefahren. Wir sind drei Tage geblieben und haben Tempel besucht.\nTeil 3: Ja, 14 Uhr passt mir prima! Sollen wir uns in der Bibliothek treffen? Ich bringe das Grammatikbuch mit.',
              sampleTranslationId:
                'Bagian 2: Musim panas lalu saya pergi bersama keluarga ke Yogyakarta selama tiga hari... Bagian 3: Ya, jam 14 cocok sekali untuk saya! Bagaimana kalau bertemu di perpustakaan?',
              rubricCriteria: buildSpeakingRubric(15),
            },
          ],
        },
      ],
    },
  ],
};
