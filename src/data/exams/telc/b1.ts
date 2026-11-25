import { ExamConfiguration } from '../../../types/exam';
import { buildSpeakingRubric, buildWritingRubric } from '../rubrics';

export const TELC_B1_EXAM: ExamConfiguration = {
  id: 'telc-b1',
  provider: 'telc',
  level: 'B1',
  officialName: 'telc Deutsch B1 (Zertifikat Deutsch)',
  totalDurationMinutes: 165,
  totalPoints: 300,
  moduleIndependence: 'written-oral-split',
  writtenTotalPoints: 225,
  writtenPassingPoints: 135,
  oralTotalPoints: 75,
  oralPassingPoints: 45,
  passingRuleSummaryDe:
    'Strikte Trennung schriftlich / mündlich: Mindestens 135 von 225 Punkten (60 %) in der schriftlichen Prüfung (Leseverstehen + Sprachbausteine + Hörverstehen + Schriftlicher Ausdruck) UND mindestens 45 von 75 Punkten (60 %) in der mündlichen Prüfung.',
  passingRuleSummaryId:
    'telc Deutsch B1 memiliki aturan kelulusan terpisah yang ketat: minimal 135 dari 225 poin (60%) pada ujian tertulis (Leseverstehen 75 + Sprachbausteine 30 + Hörverstehen 75 + Schriftlicher Ausdruck 45) DAN minimal 45 dari 75 poin (60%) pada ujian lisan.',
  formatNotesDe:
    'Leseverstehen & Sprachbausteine bilden einen gemeinsamen 90-Minuten-Block (75 + 30 = 105 Punkte), gefolgt von Hörverstehen (ca. 30 Min., 75 Pkt.), Schriftlichem Ausdruck (30 Min., 45 Pkt.) und Mündlicher Prüfung (15 Min. + 20 Min. Vorbereitung, 75 Pkt.).',
  verificationSource: 'telc.net — Prüfungsordnung & Modelltest telc Deutsch B1 (Zertifikat Deutsch)',
  lastVerifiedDate: '2026-11-22',
  modules: [
    {
      moduleKey: 'lesen',
      titleDe: 'Lesen & Sprachbausteine',
      officialModuleTitleDe: 'Leseverstehen (75 Pkt.) + Sprachbausteine (30 Pkt.)',
      durationMinutes: 90,
      officialPoints: 105,
      instructionsDe:
        'Dieser 90-Minuten-Block kombiniert Leseverstehen (Teile 1–3, 75 Punkte) mit den typischen telc-Sprachbausteinen (Teile 1–2, 30 Punkte).',
      sections: [
        {
          id: 't-b1-lesen-t1',
          titleDe: 'Leseverstehen · Teil 1 & 2',
          subtitleDe: 'Globalverstehen & Detailverstehen (75 Punkte)',
          instructionsDe: 'Ordne Überschriften zu und beantworte Detailfragen zum Zeitungsartikel.',
          durationMinutes: 55,
          points: 75,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-b1-l-1',
              partLabelDe: 'Leseverstehen · Teil 1',
              type: 'text-matching',
              passageTitleDe: 'Kurzmeldungen aus der Gesellschaft',
              passageTypeDe: 'Meldungen',
              passageDe:
                'Text 1: „Immer mehr Seniorinnen lernen im Stadtteilzentrum den Umgang mit Videotelefonie und Online-Banking, unterstützt von jugendlichen Freiwilligen.“ | Text 2: „Eine neue Studie belegt, dass gemeinsames Singen im Chor Stresshormone senkt und das Immunsystem stärkt.“',
              promptDe: 'Ordne jedem Text die passende Überschrift zu.',
              matchingPairs: [
                { left: 'Text 1', right: 'Jung hilft Alt in der digitalen Welt' },
                { left: 'Text 2', right: 'Warum Musik in der Gruppe gesund hält' },
              ],
              matchingRightChoices: [
                'Jung hilft Alt in der digitalen Welt',
                'Warum Musik in der Gruppe gesund hält',
                'Neue Öffnungszeiten für Musikschulen',
              ],
              points: 35,
              isEstimatedPracticePoints: true,
              explanationId:
                'Teks 1 membahas relawan muda membantu lansia belajar teknologi digital („Jung hilft Alt in der digitalen Welt“). Teks 2 membahas manfaat kesehatan bernyanyi bersama di paduan suara.',
            },
            {
              id: 't-b1-l-2',
              partLabelDe: 'Leseverstehen · Teil 2',
              type: 'single-choice',
              passageTitleDe: 'Reparieren statt Wegwerfen',
              passageTypeDe: 'Artikel',
              passageDe:
                'In vielen deutschen Städten öffnen sogenannte Repair-Cafés ihre Türen. Ehrenamtliche Techniker helfen Besucherinnen dabei, defekte Kaffeemaschinen, Fahrräder oder Laptops kostenlos zu reparieren. Wichtig ist dabei das Prinzip „Hilfe zur Selbsthilfe“: Die Gäste schauen nicht nur zu, sondern lernen selbst einfache Handgriffe.',
              promptDe: 'Was ist das besondere Ziel von Repair-Cafés?',
              options: [
                'Besucher lernen, wie sie Dinge künftig selbst reparieren können.',
                'Gebrauchte Elektrogeräte werden dort zu hohen Preisen verkauft.',
                'Nur ausgebildete Ingenieure dürfen dort arbeiten.',
              ],
              correctAnswer: 'Besucher lernen, wie sie Dinge künftig selbst reparieren können.',
              points: 40,
              isEstimatedPracticePoints: true,
              explanationId:
                'Teks menekankan prinsip „Hilfe zur Selbsthilfe“: pengunjung tidak hanya menonton, melainkan belajar langkah perbaikan sendiri.',
            },
          ],
        },
        {
          id: 't-b1-sprachbausteine',
          titleDe: 'Sprachbausteine · Teil 1 & 2',
          subtitleDe: 'Grammatik und Wortschatz im Kontext (30 Punkte)',
          instructionsDe:
            'Wähle für jede Lücke das grammatisch und lexikalisch passende Wort aus.',
          durationMinutes: 35,
          points: 30,
          isSprachbausteine: true,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-b1-sb-1',
              partLabelDe: 'Sprachbausteine · Teil 1',
              type: 'dropdown',
              passageTitleDe: 'Brief an die Vermieterin',
              passageTypeDe: 'Lückenbrief',
              passageDe:
                'Sehr geehrte Frau Meier, seit gestern funktioniert die Heizung im Wohnzimmer nicht mehr, _____(1) es draußen sehr kalt ist. Ich schreibe Ihnen heute direkt, _____(2) der Hausmeister leider im Urlaub ist. Könnten Sie bitte einen Techniker schicken, _____(3) sich das Problem anschaut?',
              promptDe: 'Wähle die drei passenden Wörter für die Lücken (1), (2) und (3).',
              blankFields: [
                {
                  id: 'sb-1',
                  labelDe: 'Lücke (1)',
                  options: ['obwohl', 'deshalb', 'trotzdem'],
                  correctAnswer: 'obwohl',
                },
                {
                  id: 'sb-2',
                  labelDe: 'Lücke (2)',
                  options: ['weil', 'aber', 'deswegen'],
                  correctAnswer: 'weil',
                },
                {
                  id: 'sb-3',
                  labelDe: 'Lücke (3)',
                  options: ['der', 'den', 'dessen'],
                  correctAnswer: 'der',
                },
              ],
              points: 15,
              isEstimatedPracticePoints: true,
              explanationId:
                '(1) „obwohl“ (meskipun) adalah subjungsi kontras yang menempatkan kata kerja „ist“ di akhir klausa. (2) „weil“ (karena) juga merupakan subjungsi (Nebensatz) yang mengirim „ist“ ke akhir klausa dan menjelaskan alasan menghubungi langsung. (3) Pronomina relatif maskulin Nominativ tunggal untuk „ein Techniker“ adalah „der“.',
              grammarNoteId: 'Subjunktion „obwohl“ mengirim verba ke akhir kalimat; pronomina relatif maskulin Nominativ tunggal adalah „der“ (mengacu pada „ein Techniker“).',
            },
            {
              id: 't-b1-sb-2',
              partLabelDe: 'Sprachbausteine · Teil 2',
              type: 'dropdown',
              passageTitleDe: 'Mitteilung über ein Praktikum',
              passageTypeDe: 'Kontext-Lückentext',
              passageDe:
                'Ich interessiere mich sehr _____(1) eine Ausbildung in Ihrem Betrieb, _____(2) ich schon ein Praktikum in der Buchhaltung absolviert habe.',
              promptDe: 'Ergänze die Präposition und die Konjunktion.',
              blankFields: [
                {
                  id: 'sb-4',
                  labelDe: 'Lücke (1): „sich interessieren ___“',
                  options: ['für', 'auf', 'über'],
                  correctAnswer: 'für',
                },
                {
                  id: 'sb-5',
                  labelDe: 'Lücke (2)',
                  options: ['da', 'trotzdem', 'deswegen'],
                  correctAnswer: 'da',
                },
              ],
              points: 15,
              isEstimatedPracticePoints: true,
              explanationId:
                'Verba refleksif „sich interessieren für“ (+ Akkusativ) selalu berpasangan dengan preposisi „für“. Konjunktion „da“ (= weil) menempatkan verba „habe“ di akhir kalimat.',
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'hoeren',
      titleDe: 'Hören',
      officialModuleTitleDe: 'Hörverstehen (telc Deutsch B1)',
      durationMinutes: 30,
      officialPoints: 75,
      instructionsDe:
        'Das Hörverstehen besteht aus drei Teilen: Globalverstehen, Detailverstehen und selektives Verstehen.',
      sections: [
        {
          id: 't-b1-hoeren-t1',
          titleDe: 'Teil 1–3: Hörverstehen',
          subtitleDe: 'Aussagen prüfen (75 Punkte)',
          instructionsDe: 'Entscheide nach dem Anhören der lokalen Audiodateien.',
          durationMinutes: 30,
          points: 75,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-b1-h-1',
              partLabelDe: 'Hörverstehen · Teil 1',
              type: 'true-false',
              promptDe: 'Die Sprecherin möchte im nächsten Urlaub lieber in die Berge als ans Meer fahren.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Richtig',
              points: 35,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/telc/b1/teil1-globalverstehen.mp3',
                status: 'missing',
                titleDe: 'Alltagsmeinung: Sommerurlaub',
                durationLabel: '0:55',
                playLimit: 1,
                transcriptDe:
                  'Letztes Jahr lagen wir zwei Wochen am Strand, aber diese Hitze war mir zu anstrengend. Diesmal wünsche ich mir frische Luft und lange Wanderungen in den Alpen.',
              },
              explanationId:
                'Benar (Richtig). Pembicara merasa panas pantai terlalu melelahkan dan kini menginginkan udara segar serta pendakian di pegunungan Alpen.',
            },
            {
              id: 't-b1-h-2',
              partLabelDe: 'Hörverstehen · Teil 2',
              type: 'true-false',
              promptDe: 'Für die Stadtführung am Abend muss man sich vorher online anmelden.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Richtig',
              points: 40,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/telc/b1/teil2-detailverstehen.mp3',
                status: 'missing',
                titleDe: 'Radiobericht über Nachtführungen',
                durationLabel: '1:25',
                playLimit: 2,
                transcriptDe:
                  'Die beliebten Laternenführungen durch die Altstadt finden jeden Freitag statt. Da maximal 15 Personen teilnehmen dürfen, ist eine vorherige Online-Reservierung zwingend erforderlich.',
              },
              explanationId:
                'Benar (Richtig). Karena kuota maksimal 15 orang, reservasi daring sebelumnya bersifat wajib („zwingend erforderlich“).',
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'schreiben',
      titleDe: 'Schreiben',
      officialModuleTitleDe: 'Schriftlicher Ausdruck (telc Deutsch B1)',
      durationMinutes: 30,
      officialPoints: 45,
      instructionsDe:
        'Du antwortest auf einen Brief oder eine E-Mail und gehst auf alle vier Leitpunkte ein.',
      sections: [
        {
          id: 't-b1-schreiben-t1',
          titleDe: 'Brief / E-Mail schreiben',
          subtitleDe: '45 Punkte',
          instructionsDe: 'Beachte Anrede, Einleitung, alle vier Leitpunkte und Grußformel.',
          durationMinutes: 30,
          points: 45,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-b1-s-1',
              partLabelDe: 'Schriftlicher Ausdruck',
              type: 'letter-writing',
              promptDe:
                'Ihr ehemaliger Deutschkurs-Kollege Jonas schreibt, dass er ab nächstem Monat ein Praktikum in Ihrer Stadt macht und eine günstige Unterkunft sucht. Schreiben Sie ihm eine E-Mail mit allen vier Punkten:\n• Reagieren Sie auf seine gute Nachricht.\n• Geben Sie konkrete Tipps zur Wohnungssuche.\n• Machen Sie einen Vorschlag für ein Treffen nach seiner Ankunft.\n• Bieten Sie Ihre Hilfe beim Einzug oder im Alltag an.',
              wordCountRange: { min: 100, max: 160 },
              points: 45,
              isEstimatedPracticePoints: true,
              explanationId:
                'Di telc B1 Schriftlicher Ausdruck, pastikan keempat poin dijawab dalam paragraf yang rapi dengan kata penghubung B1 (deshalb, außerdem, weil, wenn).',
              sampleAnswerDe:
                'Lieber Jonas,\n\nwie schön, von dir zu hören! Herzlichen Glückwunsch zu deinem Praktikumsplatz hier in Stuttgart — das sind wirklich tolle Neuigkeiten.\n\nDa bezahlbare Wohnungen im Zentrum schwer zu finden sind, empfehle ich dir, auf Portalen wie WG-Gesucht nach einem Zwischenmiet-Zimmer zu suchen. Außerdem lohnt sich ein Blick in Stadtteile wie Bad Cannstatt, weil man dort mit der S-Bahn in zehn Minuten in der Innenstadt ist.\n\nSobald du angekommen bist, können wir uns sehr gern am Wochenende in einem Café treffen und die Stadt erkunden. Wenn du Hilfe beim Umzug oder bei Behördengängen brauchst, sag mir einfach Bescheid!\n\nBis ganz bald\nLina',
              sampleTranslationId:
                'Jonas yang baik, senang mendengar kabarmu! Selamat atas tempat magangmu di Stuttgart... Karena apartemen terjangkau sulit dicari, saya sarankan mencari kamar subsewa di WG-Gesucht... Begitu tiba, kita bisa bertemu di kafe akhir pekan dan saya siap membantu saat pindahan. Sampai jumpa, Lina.',
              rubricCriteria: buildWritingRubric(45),
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'sprechen',
      titleDe: 'Sprechen',
      officialModuleTitleDe: 'Mündliche Prüfung (telc Deutsch B1)',
      durationMinutes: 15,
      officialPoints: 75,
      passingPoints: 45,
      instructionsDe:
        'Paarprüfung (plus 20 Min. Vorbereitung): Teil 1 Kontaktaufnahme, Teil 2 Gespräch über ein Thema (Impulstext), Teil 3 Gemeinsam etwas planen.',
      sections: [
        {
          id: 't-b1-sprechen-t1',
          titleDe: 'Teil 1–3: Mündliche Paarprüfung',
          subtitleDe: '75 Punkte (Bestehensgrenze: 45 Punkte)',
          instructionsDe: 'Bereite deine Argumente kurz vor und interagiere aktiv.',
          durationMinutes: 15,
          points: 75,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 't-b1-sp-1',
              partLabelDe: 'Mündliche Prüfung · Teil 2 & 3',
              type: 'speaking-prompt',
              promptDe:
                'Teil 2 (Gespräch über ein Thema): „Immer mehr Menschen arbeiten im Schichtdienst oder am Wochenende.“ Berichte über Erfahrungen und tausche dich mit deinem Partner aus.\nTeil 3 (Gemeinsam planen): Euer Sprachkurs endet nächste Woche. Plant eine gemeinsame Abschiedsfeier (Ort, Essen, Musik, Budget).',
              preparationSeconds: 180,
              speakingSeconds: 300,
              partnerPromptsDe: [
                'Partner (Teil 2): „In meinem Heimatland sind Geschäfte sogar am Sonntag geöffnet. Wie siehst du das?“',
                'Partner (Teil 3): „Ich würde vorschlagen, dass jeder ein typisches Gericht aus seinem Land mitbringt. Einverstanden?“',
              ],
              points: 75,
              isEstimatedPracticePoints: true,
              explanationId:
                'Pada telc B1, interaksi aktif dengan pasangan sangat dinilai tinggi: ajukan pertanyaan balik („Wie ist das bei dir?“), setujui atau modifikasi saran dengan sopan.',
              sampleAnswerDe:
                'Teil 2: Ich finde, Schichtarbeit hat Vorteile wie freie Tage unter der Woche, aber für Familien ist es oft schwierig. In Indonesien arbeiten viele im Einzelhandel auch sonntags.\nTeil 3: Ein internationales Büfett finde ich eine großartige Idee! Ich kann gebratenen Reis mitbringen. Sollen wir die Feier am Freitag um 17 Uhr im Kursraum machen?',
              sampleTranslationId:
                'Bagian 2: Menurut saya kerja sif punya sisi positif seperti hari libur di tengah pekan, tetapi sering sulit bagi keluarga... Bagian 3: Prasmanan internasional ide bagus! Saya bisa membawa nasi goreng.',
              rubricCriteria: buildSpeakingRubric(75),
            },
          ],
        },
      ],
    },
  ],
};
