import { ExamConfiguration } from '../../../types/exam';
import { buildSpeakingRubric, buildWritingRubric } from '../rubrics';

export const TELC_B2_EXAM: ExamConfiguration = {
  id: 'telc-b2',
  provider: 'telc',
  level: 'B2',
  officialName: 'telc Deutsch B2',
  totalDurationMinutes: 155,
  totalPoints: 300,
  moduleIndependence: 'written-oral-split',
  writtenTotalPoints: 225,
  writtenPassingPoints: 135,
  oralTotalPoints: 75,
  oralPassingPoints: 45,
  passingRuleSummaryDe:
    'Mindestens 135 von 225 Punkten (60 %) in der schriftlichen Prüfung UND mindestens 45 von 75 Punkten (60 %) in der mündlichen Prüfung erforderlich.',
  passingRuleSummaryId:
    'telc Deutsch B2 mensyaratkan kelulusan terpisah: minimal 135 dari 225 poin (60%) pada ujian tertulis (Leseverstehen 75 + Sprachbausteine 30 + Hörverstehen 75 + Schriftlicher Ausdruck 45) DAN minimal 45 dari 75 poin (60%) pada ujian lisan.',
  formatNotesDe:
    'Schriftlich: Leseverstehen & Sprachbausteine (90 Min., 75 + 30 = 105 Pkt.), Hörverstehen (ca. 20 Min., 75 Pkt.), Schriftlicher Ausdruck (30 Min., Beschwerde oder Informationsbitte, 45 Pkt.). Mündlich: Paarprüfung (15 Min. + 20 Min. Vorbereitung, 3 Teile, 75 Pkt.).',
  verificationSource: 'telc.net — Prüfungsordnung & Modelltest telc Deutsch B2',
  lastVerifiedDate: '2026-11-22',
  modules: [
    {
      moduleKey: 'lesen',
      titleDe: 'Lesen & Sprachbausteine',
      officialModuleTitleDe: 'Leseverstehen (75 Pkt.) + Sprachbausteine (30 Pkt.)',
      durationMinutes: 90,
      officialPoints: 105,
      instructionsDe:
        'Kombinierter 90-Minuten-Prüfungsteil: Leseverstehen (Teile 1–3, 75 Punkte) und Sprachbausteine (Teile 1–2, 30 Punkte).',
      sections: [
        {
          id: 't-b2-lesen-t1',
          titleDe: 'Leseverstehen · Teil 1–3',
          subtitleDe: 'Überschriften, Sachtexte & Situationen (75 Punkte)',
          instructionsDe: 'Analysiere Fachtexte aus Wissenschaft, Arbeitswelt und Gesellschaft.',
          durationMinutes: 60,
          points: 75,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-b2-l-1',
              partLabelDe: 'Leseverstehen · Teil 2',
              type: 'single-choice',
              passageTitleDe: 'Schlafmangel und kognitive Leistungsfähigkeit',
              passageTypeDe: 'Wissenschaftstext',
              passageDe:
                'Neurowissenschaftliche Untersuchungen belegen, dass chronischer Schlafmangel nicht nur die Reaktionsgeschwindigkeit verlangsamt, sondern auch die Fähigkeit beeinträchtigt, komplexe Entscheidungen unter Zeitdruck abzuwägen. Bemerkenswert ist, dass Betroffene ihre eigene Müdigkeit häufig unterschätzen, während objektive Tests bereits deutliche Fehlerquoten anzeigen.',
              promptDe: 'Welche Beobachtung heben die Forschenden besonders hervor?',
              options: [
                'Viele Menschen merken selbst nicht, wie stark Schlafmangel ihre Leistung mindert.',
                'Reaktionszeit bleibt bei Schlafmangel unverändert stabil.',
                'Kurze Nickerchen ersetzen dauerhaft den Nachtschlaf.',
              ],
              correctAnswer:
                'Viele Menschen merken selbst nicht, wie stark Schlafmangel ihre Leistung mindert.',
              points: 40,
              isEstimatedPracticePoints: true,
              explanationId:
                'Kalimat kedua menegaskan bahwa penderita sering meremehkan kelelahannya sendiri („ihre eigene Müdigkeit häufig unterschätzen“), padahal tes objektif sudah menunjukkan tingkat kesalahan tinggi.',
              keyVocabulary: [
                { de: 'beeinträchtigen', id: 'mengganggu / menurunkan kualitas' },
                { de: 'unterschätzen', id: 'meremehkan / menilai terlalu rendah' },
              ],
            },
            {
              id: 't-b2-l-2',
              partLabelDe: 'Leseverstehen · Teil 3',
              type: 'text-matching',
              passageTitleDe: 'Qualifizierungsprogramme für Fachkräfte',
              passageTypeDe: 'Kursausschreibungen',
              passageDe:
                'Angebot A: „Berufsbegleitender Zertifikatskurs Projektmanagement (agil & klassisch), abends online.“ | Angebot B: „Intensivseminar Verhandlungsführung auf Deutsch für internationale Teams, zweitägig vor Ort.“ | Angebot C: „Praxistraining Datenschutz-Grundverordnung (DSGVO) für Personalabteilungen.“',
              promptDe: 'Welche Ausschreibung passt zu welcher Situation?',
              matchingPairs: [
                { left: 'Nadia arbeitet im HR-Bereich und braucht Rechtswissen zu Bewerberdaten.', right: 'Angebot C' },
                { left: 'Karim leitet internationale Meetings und möchte sicherer verhandeln.', right: 'Angebot B' },
                { left: 'Elena will neben dem Beruf strukturierte Methoden zur Projektplanung lernen.', right: 'Angebot A' },
              ],
              matchingRightChoices: ['Angebot A', 'Angebot B', 'Angebot C'],
              points: 35,
              isEstimatedPracticePoints: true,
              explanationId:
                'HR dan data pelamar cocok dengan Angebot C (DSGVO für Personalabteilungen), negosiasi tim internasional dengan Angebot B, dan manajemen proyek paruh waktu dengan Angebot A.',
            },
          ],
        },
        {
          id: 't-b2-sprachbausteine',
          titleDe: 'Sprachbausteine · Teil 1 & 2',
          subtitleDe: 'Komplexe Grammatik und Lexik im Kontext (30 Punkte)',
          instructionsDe: 'Ergänze formale Ausdrücke, Konnektoren und Rektionen auf B2-Niveau.',
          durationMinutes: 30,
          points: 30,
          isSprachbausteine: true,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-b2-sb-1',
              partLabelDe: 'Sprachbausteine · Teil 1',
              type: 'dropdown',
              passageTitleDe: 'Formelles Schreiben an ein Tagungshotel',
              passageTypeDe: 'Lückentext',
              passageDe:
                'Sehr geehrte Damen und Herren, _____(1) unserer telefonischen Vereinbarung bestätige ich hiermit die Buchung des Konferenzraums. _____(2) der hohen Teilnehmerzahl bitten wir darum, zusätzliche Mikrofone zur Verfügung _____(3) stellen.',
              promptDe: 'Wähle die passenden sprachlichen Mittel.',
              blankFields: [
                {
                  id: 'b2-sb-1',
                  labelDe: 'Lücke (1)',
                  options: ['entsprechend', 'während', 'statt'],
                  correctAnswer: 'entsprechend',
                },
                {
                  id: 'b2-sb-2',
                  labelDe: 'Lücke (2)',
                  options: ['Angesichts', 'Trotz', 'Ungeachtet'],
                  correctAnswer: 'Angesichts',
                },
                {
                  id: 'b2-sb-3',
                  labelDe: 'Lücke (3)',
                  options: ['zu', 'um', 'für'],
                  correctAnswer: 'zu',
                },
              ],
              points: 30,
              isEstimatedPracticePoints: true,
              explanationId:
                '„entsprechend unserer Vereinbarung“ (sesuai kesepakatan kita), „Angesichts der hohen Teilnehmerzahl“ (mengingat tingginya jumlah peserta, + Genitiv), dan konstruksi infinitif „bitten darum, ... zur Verfügung zu stellen“.',
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'hoeren',
      titleDe: 'Hören',
      officialModuleTitleDe: 'Hörverstehen (telc Deutsch B2)',
      durationMinutes: 20,
      officialPoints: 75,
      instructionsDe:
        'Das Hörverstehen besteht aus Kurznachrichten, einem längeren Interview und kurzen Informationen (75 Punkte).',
      sections: [
        {
          id: 't-b2-hoeren-t1',
          titleDe: 'Teil 1 & 2: Nachrichten & Interview',
          subtitleDe: 'Richtig oder Falsch (75 Punkte)',
          instructionsDe: 'Beurteile die Aussagen auf Basis der vorgesehenen Audiodateien.',
          durationMinutes: 20,
          points: 75,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-b2-h-1',
              partLabelDe: 'Hörverstehen · Teil 1',
              type: 'true-false',
              promptDe: 'Die neue Schnellbahnlinie verkürzt die Fahrzeit zwischen den beiden Städten um fast die Hälfte.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Richtig',
              points: 35,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/telc/b2/teil1-nachrichten.mp3',
                status: 'missing',
                titleDe: 'Wirtschafts- und Verkehrsnachrichten',
                durationLabel: '1:05',
                playLimit: 1,
                transcriptDe:
                  'Nach vierjähriger Bauzeit wird am kommenden Montag die neue Schnellbahnstrecke eröffnet. Die Fahrtzeit sinkt dadurch von bisher 75 Minuten auf künftig 40 Minuten.',
              },
              explanationId:
                'Benar (Richtig). Waktu tempuh turun dari 75 menit menjadi 40 menit — mendekati setengahnya („fast die Hälfte“).',
            },
            {
              id: 't-b2-h-2',
              partLabelDe: 'Hörverstehen · Teil 2',
              type: 'true-false',
              promptDe: 'Der Architekt kritisiert, dass beim Holzbau ausschließlich hohe Kosten entstehen.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Falsch',
              points: 40,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/telc/b2/teil2-interview.mp3',
                status: 'missing',
                titleDe: 'Radiointerview: Nachhaltiges Bauen mit Holz',
                durationLabel: '1:55',
                playLimit: 1,
                transcriptDe:
                  'Architekt: Zwar sind einzelne Holzelemente in der Anschaffung etwas teurer, doch die Bauzeit vor Ort halbiert sich durch Vorfertigung, was Finanzierungskosten spart.',
              },
              explanationId:
                'Salah (Falsch). Arsitek menjelaskan bahwa biaya awal sedikit lebih tinggi, tetapi waktu konstruksi berkurang setengahnya sehingga menghemat biaya pembiayaan.',
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'schreiben',
      titleDe: 'Schreiben',
      officialModuleTitleDe: 'Schriftlicher Ausdruck (telc Deutsch B2)',
      durationMinutes: 30,
      officialPoints: 45,
      instructionsDe:
        'Wähle in der echten Prüfung zwischen einer Beschwerde oder einer Bitte um Information. Verfasse hier eine formelle Beschwerde (mindestens 150 Wörter).',
      sections: [
        {
          id: 't-b2-schreiben-t1',
          titleDe: 'Formelle Beschwerde',
          subtitleDe: 'Mindestens 150 Wörter (45 Punkte)',
          instructionsDe: 'Schreibe einen sachlichen, höflichen und bestimmten Beschwerdebrief.',
          durationMinutes: 30,
          points: 45,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-b2-s-1',
              partLabelDe: 'Schriftlicher Ausdruck · Beschwerde',
              type: 'letter-writing',
              promptDe:
                'Sie haben ein Wochenendseminar „Berufliche Kommunikation“ gebucht, aber der Ablauf entsprach nicht der Werbung (zu große Gruppe, veraltete Unterlagen, fehlende Einzelgespräche). Schreiben Sie eine formelle Beschwerde an den Veranstalter:\n• Schildern Sie, was Sie laut Anzeige erwartet haben.\n• Beschreiben Sie die konkreten Mängel.\n• Erklären Sie, welche Folgen dies für Sie hatte.\n• Fordern Sie eine konkrete Entschädigung (z. B. Teilrückerstattung) und setzen Sie eine Frist.',
              wordCountRange: { min: 150, max: 240 },
              points: 45,
              isEstimatedPracticePoints: true,
              explanationId:
                'Pada surat keluhan telc B2, jaga nada tegas namun profesional (Sie-Form), jelaskan kesenjangan antara janji iklan dan kenyataan, lalu sebutkan tuntutan konkret beserta tenggat waktu (Fristsetzung, mis. „innerhalb von 14 Tagen“).',
              sampleAnswerDe:
                'Sehr geehrte Damen und Herren,\n\nim vergangenen Monat habe ich bei Ihrem Institut das Wochenendseminar „Berufliche Kommunikation“ zum Preis von 420 Euro gebucht. Leider sah ich mich nach Abschluss der Veranstaltung gezwungen, Ihnen diese Beschwerde zu schreiben, da die gebotene Leistung erheblich von Ihrer Ausschreibung abwich.\n\nIn Ihrem Programm wurden kleine Arbeitsgruppen mit maximal acht Teilnehmenden, aktuelle Fallstudien sowie ein individuelles Feedbackgespräch versprochen. Tatsächlich befanden sich jedoch 22 Personen in einem zu engen Raum, sodass kaum Raum für praktische Übungen blieb. Darüber hinaus enthielten die verteilten Handouts veraltete Statistiken, und das angekündigte Einzelgespräch fiel aus Zeitmangel komplett aus. Infolgedessen konnte ich für meine berufliche Praxis kaum konkreten Nutzen mitnehmen.\n\nAus diesem Grund halte ich eine anteilige Rückerstattung von 50 Prozent der Seminargebühr für angemessen. Bitte überweisen Sie den Betrag innerhalb von 14 Tagen auf mein Konto.\n\nMit freundlichen Grüßen\nHendro Prasetyo',
              sampleTranslationId:
                'Dengan hormat, bulan lalu saya memesan seminar akhir pekan di lembaga Anda seharga 420 Euro. Sayangnya pelaksanaannya jauh berbeda dari iklan: dijanjikan kelompok kecil maksimal 8 orang, studi kasus terbaru, dan umpan balik personal, namun kenyataannya 22 orang di ruang sempit tanpa sesi personal. Oleh karena itu saya meminta pengembalian dana sebagian sebesar 50% dalam waktu 14 hari. Hormat saya, Hendro Prasetyo.',
              rubricCriteria: buildWritingRubric(45),
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'sprechen',
      titleDe: 'Sprechen',
      officialModuleTitleDe: 'Mündliche Prüfung (telc Deutsch B2)',
      durationMinutes: 15,
      officialPoints: 75,
      passingPoints: 45,
      instructionsDe:
        'Paarprüfung (plus 20 Min. Vorbereitung): Teil 1 Präsentation (1,5 Min.), Teil 2 Diskussion eines kontroversen Textes, Teil 3 Gemeinsame Problemlösung.',
      sections: [
        {
          id: 't-b2-sprechen-t1',
          titleDe: 'Teil 1–3: Präsentation, Diskussion & Problemlösung',
          subtitleDe: '75 Punkte (Bestehensgrenze: 45 Punkte)',
          instructionsDe: 'Bereite deinen Kurzbeitrag vor und verhandle gemeinsam eine Lösung.',
          durationMinutes: 15,
          points: 75,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-b2-sp-1',
              partLabelDe: 'Mündliche Prüfung · Teil 2 & 3',
              type: 'speaking-prompt',
              promptDe:
                'Teil 2 (Diskussion): „Sollte Künstliche Intelligenz oder Automatisierung im Kundenservice menschliche Beratung teilweise ersetzen?“\nTeil 3 (Problemlösung): Ihre Firma möchte einen internationalen Gesundheitstag organisieren. Einigen Sie sich auf Zielgruppe, Budgetverteilung, Programm und Termin.',
              preparationSeconds: 180,
              speakingSeconds: 360,
              partnerPromptsDe: [
                'Partner (Teil 2): „Ich befürchte, dass ältere Kundinnen mit rein digitalen Systemen überfordert sind. Wie schätzt du das ein?“',
                'Partner (Teil 3): „Wenn wir einen externen Ernährungsberater einladen, bleibt kaum Geld für Sportkurse übrig.“',
              ],
              points: 75,
              isEstimatedPracticePoints: true,
              explanationId:
                'Di telc B2 Sprechen Teil 2 & 3, tunjukkan kemampuan memparafrasekan argumen partner („Wenn ich dich richtig verstehe, meinst du...“) dan mencari kompromi realistis di Teil 3.',
              sampleAnswerDe:
                'Teil 2: Standardanfragen wie Öffnungszeiten lassen sich effizient digital klären, aber bei komplexen Beschwerden bleibt menschliches Einfühlungsvermögen unverzichtbar.\nTeil 3: Da hast du recht mit dem Budget. Wir könnten statt eines teuren externen Beraters interne Kolleginnen aus dem Betriebssport einbinden und das Geld für gesunde Verpflegung nutzen.',
              sampleTranslationId:
                'Bagian 2: Pertanyaan standar dapat ditangani secara digital, namun untuk keluhan kompleks empati manusia tetap tak tergantikan. Bagian 3: Benar soal anggaran; kita bisa melibatkan rekan internal untuk sesi olahraga sehingga dana dapat dipakai untuk katering sehat.',
              rubricCriteria: buildSpeakingRubric(75),
            },
          ],
        },
      ],
    },
  ],
};
