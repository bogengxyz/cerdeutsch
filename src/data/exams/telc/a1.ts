import { ExamConfiguration } from '../../../types/exam';
import { buildSpeakingRubric, buildWritingRubric } from '../rubrics';

export const TELC_A1_EXAM: ExamConfiguration = {
  id: 'telc-a1',
  provider: 'telc',
  level: 'A1',
  officialName: 'telc Deutsch A1 (Start Deutsch 1)',
  totalDurationMinutes: 80,
  totalPoints: 60,
  moduleIndependence: 'overall',
  overallPassingPoints: 36,
  writtenTotalPoints: 45,
  oralTotalPoints: 15,
  passingRuleSummaryDe:
    'Mindestens 36 von 60 Punkten (60 %) in der Gesamtprüfung aus allen vier Teilen (Hören, Lesen, Schreiben, Sprechen) erforderlich.',
  passingRuleSummaryId:
    'Pada telc Deutsch A1, skor total maksimal adalah 60 poin (masing-masing 15 poin untuk Hören, Lesen, Schreiben, Sprechen). Batas lulus adalah minimal 36 dari 60 poin secara keseluruhan.',
  formatNotesDe:
    'Schriftliche Prüfung (ca. 65 Min.: Hören 20 Min., Lesen und Schreiben 45 Min. = 45 Punkte) und mündliche Gruppenprüfung (Sprechen ca. 15 Min. = 15 Punkte). Kein separater Teil Sprachbausteine.',
  verificationSource: 'telc.net — Prüfungsformat & Bewertungsskala telc Deutsch A1',
  lastVerifiedDate: '2026-11-22',
  modules: [
    {
      moduleKey: 'lesen',
      titleDe: 'Lesen',
      officialModuleTitleDe: 'Leseverstehen (telc Deutsch A1)',
      durationMinutes: 25,
      officialPoints: 15,
      instructionsDe:
        'Lies die kurzen Mitteilungen, Wohnungsanzeigen und Hinweise und wähle jeweils die passende Antwort.',
      sections: [
        {
          id: 't-a1-lesen-t1',
          titleDe: 'Teil 1: Kurze Nachrichten',
          subtitleDe: 'Richtig oder Falsch',
          instructionsDe: 'Lies den kurzen Brief und entscheide.',
          durationMinutes: 8,
          points: 5,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-a1-l-1',
              partLabelDe: 'Lesen · Teil 1',
              type: 'true-false',
              passageTitleDe: 'Postkarte aus München',
              passageTypeDe: 'Postkarte',
              passageDe:
                'Liebe Oma, ich bin seit Dienstag in München. Das Wetter ist sonnig und wir gehen heute ins Deutsche Museum. Am Sonntag fahre ich mit dem Zug zurück nach Köln. Bis bald! Jonas',
              promptDe: 'Jonas bleibt bis Dienstag in München.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Falsch',
              points: 5,
              isEstimatedPracticePoints: true,
              explanationId:
                'Salah (Falsch). Jonas sudah berada di München sejak hari Selasa („seit Dienstag“), dan akan pulang ke Köln hari Minggu („Am Sonntag fahre ich zurück“).',
            },
          ],
        },
        {
          id: 't-a1-lesen-t2',
          titleDe: 'Teil 2 & 3: Informationen & Schilder',
          subtitleDe: 'Zuordnung & Alltagshinweise',
          instructionsDe: 'Wähle die richtige Information für den Alltag.',
          durationMinutes: 17,
          points: 10,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-a1-l-2',
              partLabelDe: 'Lesen · Teil 2',
              type: 'single-choice',
              passageTitleDe: 'Hausarztpraxis Dr. Klein',
              passageTypeDe: 'Praxisschild',
              passageDe:
                'Sprechzeiten: Mo–Fr 08:00–12:00 Uhr. Nachmittags nur nach Terminvereinbarung. Mittwochnachmittag geschlossen.',
              promptDe: 'Wann kann man ohne Termin in die Praxis kommen?',
              options: [
                'Von Montag bis Freitag am Vormittag',
                'Am Mittwochnachmittag',
                'Jeden Nachmittag bis 18 Uhr',
              ],
              correctAnswer: 'Von Montag bis Freitag am Vormittag',
              points: 5,
              isEstimatedPracticePoints: true,
              explanationId:
                'Jam praktik pagi (08:00–12:00) dari Senin hingga Jumat terbuka tanpa catatan khusus, sedangkan sore hari hanya dengan perjanjian („nur nach Terminvereinbarung“).',
            },
            {
              id: 't-a1-l-3',
              partLabelDe: 'Lesen · Teil 3',
              type: 'true-false',
              passageTitleDe: 'Schild im Schwimmbad',
              passageTypeDe: 'Hinweisschild',
              passageDe: 'Vor dem Schwimmen bitte duschen! Kinder unter 6 Jahren nur in Begleitung Erwachsener.',
              promptDe: 'Ein fünfjähriges Kind darf allein im Schwimmbad bleiben.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Falsch',
              points: 5,
              isEstimatedPracticePoints: true,
              explanationId:
                'Salah (Falsch). Anak di bawah usia 6 tahun hanya boleh masuk dengan pendampingan orang dewasa („nur in Begleitung Erwachsener“).',
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'hoeren',
      titleDe: 'Hören',
      officialModuleTitleDe: 'Hörverstehen (telc Deutsch A1)',
      durationMinutes: 20,
      officialPoints: 15,
      instructionsDe:
        'Du hörst kurze Alltagsgespräche und Durchsagen. Achte auf Uhrzeiten, Preise und Orte.',
      sections: [
        {
          id: 't-a1-hoeren-t1',
          titleDe: 'Teil 1 & 2: Kurzgespräche & Durchsagen',
          subtitleDe: 'Verstehen wichtiger Einzelheiten',
          instructionsDe: 'Nutze die bereitgestellte Audiodatei, sobald sie lokal vorliegt.',
          durationMinutes: 20,
          points: 15,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-a1-h-1',
              partLabelDe: 'Hören · Teil 1',
              type: 'single-choice',
              promptDe: 'Was bestellt der Gast im Restaurant?',
              options: [
                'Eine Gemüsesuppe und ein Mineralwasser',
                'Einen Fisch mit Kartoffeln und Kaffee',
                'Eine Pizza und einen Orangensaft',
              ],
              correctAnswer: 'Eine Gemüsesuppe und ein Mineralwasser',
              points: 8,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/telc/a1/teil1-kurzgespraeche.mp3',
                status: 'missing',
                titleDe: 'Kurzgespräch im Restaurant',
                durationLabel: '0:38',
                playLimit: 2,
                transcriptDe:
                  'Kellner: Was möchten Sie essen? | Gast: Ich nehme bitte eine Gemüsesuppe. | Kellner: Und zu trinken? Kaffee oder Wasser? | Gast: Ein großes Mineralwasser, bitte.',
              },
              explanationId:
                'Tamu memesan sup sayuran („eine Gemüsesuppe“) dan air mineral („ein großes Mineralwasser“).',
            },
            {
              id: 't-a1-h-2',
              partLabelDe: 'Hören · Teil 2',
              type: 'true-false',
              promptDe: 'Der Bus nach Frankfurt fährt heute von Bussteig 7 ab.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Richtig',
              points: 7,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/telc/a1/teil2-durchsagen.mp3',
                status: 'missing',
                titleDe: 'Durchsage am Busbahnhof',
                durationLabel: '0:30',
                playLimit: 1,
                transcriptDe:
                  'Achtung, Fahrgäste nach Frankfurt! Der Reisebus um 14:20 Uhr fährt heute ausnahmsweise nicht von Bussteig 3, sondern von Bussteig 7 ab.',
              },
              explanationId:
                'Benar (Richtig). Pengumuman menyebut bus hari ini berangkat dari peron bus 7 („nicht von Bussteig 3, sondern von Bussteig 7“).',
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'schreiben',
      titleDe: 'Schreiben',
      officialModuleTitleDe: 'Schriftlicher Ausdruck (telc Deutsch A1)',
      durationMinutes: 20,
      officialPoints: 15,
      instructionsDe:
        'Teil 1: Fülle ein Anmeldeformular aus. Teil 2: Schreibe eine kurze Mitteilung oder E-Mail.',
      sections: [
        {
          id: 't-a1-schreiben-t1',
          titleDe: 'Teil 1: Formular ausfüllen',
          subtitleDe: 'Angaben für einen Sportverein',
          instructionsDe:
            'Herr Budi Santoso wohnt in der Goethestraße 8 in 50674 Köln. Er möchte ab dem 1. Juli im Verein Fußball spielen. Ergänze die Felder.',
          durationMinutes: 8,
          points: 6,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-a1-s-1',
              partLabelDe: 'Schreiben · Teil 1',
              type: 'form-completion',
              promptDe: 'Trage die Daten aus der Situation in das Formular ein.',
              blankFields: [
                {
                  id: 'plz',
                  labelDe: 'Postleitzahl (PLZ)',
                  placeholderDe: '5 Ziffern',
                  correctAnswer: '50674',
                },
                {
                  id: 'ort',
                  labelDe: 'Stadt',
                  placeholderDe: 'Stadt',
                  correctAnswer: 'Köln',
                },
                {
                  id: 'sportart',
                  labelDe: 'Sportart',
                  placeholderDe: 'z. B. Schwimmen',
                  correctAnswer: 'Fußball',
                  acceptableAnswers: ['Fußball', 'Fussball'],
                },
              ],
              points: 6,
              isEstimatedPracticePoints: true,
              explanationId:
                'Kode pos (PLZ) adalah 50674, kota Köln, dan cabang olahraga adalah Fußball.',
            },
          ],
        },
        {
          id: 't-a1-schreiben-t2',
          titleDe: 'Teil 2: Kurzer Brief',
          subtitleDe: 'An die Nachbarin',
          instructionsDe: 'Schreibe ca. 30 Wörter zu allen drei Punkten.',
          durationMinutes: 12,
          points: 9,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-a1-s-2',
              partLabelDe: 'Schreiben · Teil 2',
              type: 'letter-writing',
              promptDe:
                'Sie fahren am Wochenende weg. Schreiben Sie Ihrer Nachbarin Frau Weber eine kurze Nachricht:\n• Wann fahren Sie weg?\n• Bitten Sie sie, Ihre Blumen zu gießen.\n• Bedanken Sie sich herzlich.',
              wordCountRange: { min: 25, max: 50 },
              points: 9,
              isEstimatedPracticePoints: true,
              explanationId:
                'Untuk surat pendek kepada tetangga, gunakan sapaan sopan („Liebe Frau Weber,“), sebut waktu kepergian, minta tolong menyiram tanaman („Können Sie bitte meine Blumen gießen?“), dan ucapkan terima kasih.',
              sampleAnswerDe:
                'Liebe Frau Weber,\n\nich fahre von Freitag bis Sonntag nach Hamburg. Können Sie bitte am Samstag meine Blumen auf dem Balkon gießen? Vielen Dank für Ihre Hilfe!\n\nViele Grüße\nBudi Santoso',
              sampleTranslationId:
                'Ibu Weber yang terhormat, saya pergi ke Hamburg dari Jumat sampai Minggu. Bisakah Anda menyiram bunga saya di balkon pada hari Sabtu? Terima kasih banyak atas bantuan Anda! Salam hangat, Budi Santoso.',
              rubricCriteria: buildWritingRubric(9),
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'sprechen',
      titleDe: 'Sprechen',
      officialModuleTitleDe: 'Mündliche Prüfung (telc Deutsch A1)',
      durationMinutes: 15,
      officialPoints: 15,
      instructionsDe:
        'Gruppenprüfung in drei Teilen: Sich vorstellen, um Informationen bitten (Wortkarten) und auf Bitten reagieren.',
      sections: [
        {
          id: 't-a1-sprechen-t1',
          titleDe: 'Teil 1–3: Vorstellung & Fragen',
          subtitleDe: 'Basis-Alltagskommunikation',
          instructionsDe: 'Übe laut anhand der Wortkarten und Partnerimpulse.',
          durationMinutes: 15,
          points: 15,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-a1-sp-1',
              partLabelDe: 'Sprechen · Teil 1–3',
              type: 'speaking-prompt',
              promptDe:
                '1. Stelle dich vor (Name, Alter, Wohnort, Sprachen, Beruf).\n2. Thema „Freizeit“ — Frage deinen Partner mit dem Stichwort „Wochenende“.\n3. Formuliere eine höfliche Bitte zum Stichwort „Stift“.',
              preparationSeconds: 30,
              speakingSeconds: 180,
              partnerPromptsDe: [
                'Prüfer: „Können Sie bitte Ihre Telefonnummer nennen?“',
                'Partner: „Am Wochenende gehe ich gern spazieren. Und Sie?“',
              ],
              points: 15,
              isEstimatedPracticePoints: true,
              explanationId:
                'Gunakan kalimat jelas: „Am Wochenende spiele ich gern Badminton. Was machen Sie am Wochenende?“ dan untuk permintaan: „Können Sie mir bitte einen Stift geben?“',
              sampleAnswerDe:
                '1. Ich heiße Dewi, bin 25 Jahre alt und wohne in Surabaya. Ich spreche Indonesisch, Englisch und ein bisschen Deutsch.\n2. Was machen Sie gern am Wochenende?\n3. Entschuldigung, haben Sie bitte einen Stift für mich?',
              sampleTranslationId:
                '1. Nama saya Dewi, umur 25 tahun, tinggal di Surabaya... 2. Apa yang suka Anda lakukan di akhir pekan? 3. Permisi, apakah Anda punya pulpen untuk saya?',
              rubricCriteria: buildSpeakingRubric(15),
            },
          ],
        },
      ],
    },
  ],
};
