import { ExamConfiguration } from '../../../types/exam';
import { buildSpeakingRubric, buildWritingRubric } from '../rubrics';

export const GOETHE_B1_EXAM: ExamConfiguration = {
  id: 'goethe-b1',
  provider: 'goethe',
  level: 'B1',
  officialName: 'Goethe-Zertifikat B1',
  totalDurationMinutes: 180,
  totalPoints: 400,
  moduleIndependence: 'per-module',
  perModulePassingPercent: 60,
  passingRuleSummaryDe:
    'Modulare Prüfung: Jedes der vier Module (Lesen, Hören, Schreiben, Sprechen) wird einzeln mit je 100 Punkten bewertet und ist ab 60 Punkten (60 %) bestanden.',
  passingRuleSummaryId:
    'Goethe-Zertifikat B1 bersifat modular penuh: keempat modul (Lesen, Hören, Schreiben, Sprechen) masing-masing bernilai 100 poin dan dapat ditempuh/lulus secara terpisah dengan batas minimal 60 poin (60%) per modul.',
  formatNotesDe:
    'Vier unabhängige Module: Lesen (65 Min., 5 Teile, 100 Pkt.), Hören (40 Min., 4 Teile, 100 Pkt.), Schreiben (60 Min., 3 Teile, 100 Pkt.), Sprechen (15 Min., 3 Teile, 100 Pkt.).',
  verificationSource: 'goethe.de — Prüfungsordnung & Durchführungsbestimmungen Goethe-Zertifikat B1',
  lastVerifiedDate: '2026-11-22',
  modules: [
    {
      moduleKey: 'lesen',
      titleDe: 'Lesen',
      officialModuleTitleDe: 'Modul Lesen (Goethe B1)',
      durationMinutes: 65,
      officialPoints: 100,
      passingPoints: 60,
      instructionsDe:
        'Das Modul Lesen umfasst fünf Teile: Blogeintrag, Presseberichte, Anzeigen, Leserbriefe und offizielle Hinweise.',
      sections: [
        {
          id: 'g-b1-lesen-t1',
          titleDe: 'Teil 1: Blogeintrag',
          subtitleDe: 'Richtig oder Falsch',
          instructionsDe: 'Lies den Erfahrungsbericht über ein Jahr ohne Auto und beurteile die Aussagen.',
          durationMinutes: 13,
          points: 20,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-b1-l-1',
              partLabelDe: 'Lesen · Teil 1',
              type: 'true-false',
              passageTitleDe: 'Mein Jahr ohne eigenes Auto',
              passageTypeDe: 'Blogbeitrag',
              passageDe:
                'Vor zwölf Monaten habe ich mein Auto verkauft, obwohl ich auf dem Land wohne. Am Anfang war es schwierig, weil der Bus nur einmal pro Stunde fährt. Deshalb habe ich mir ein E-Bike gekauft. Inzwischen fahre ich damit sogar bei leichtem Regen zur Arbeit und spare im Jahr über 2.500 Euro.',
              promptDe: 'Die Autorin bedauert heute den Verkauf ihres Autos, weil sie auf dem Land wohnt.',
              options: ['Richtig', 'Falsch'],
              correctAnswer: 'Falsch',
              points: 20,
              isEstimatedPracticePoints: true,
              explanationId:
                'Salah (Falsch). Meskipun awalnya sulit (am Anfang war es schwierig), sekarang ia mengendarai E-Bike dan menghemat lebih dari 2.500 Euro per tahun tanpa menyesal.',
              grammarNoteId: 'Klausa konsesif dengan „obwohl“ (meskipun) menempatkan verba terkonjugasi di akhir klausa.',
            },
          ],
        },
        {
          id: 'g-b1-lesen-t2',
          titleDe: 'Teil 2 & 3: Pressebericht & Anzeigen',
          subtitleDe: 'Multiple Choice & Zuordnung',
          instructionsDe: 'Lies den Bericht zum Homeoffice sowie die Anzeigen.',
          durationMinutes: 26,
          points: 40,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-b1-l-2',
              partLabelDe: 'Lesen · Teil 2',
              type: 'single-choice',
              passageTitleDe: 'Flexibles Arbeiten in mittelständischen Betrieben',
              passageTypeDe: 'Presseartikel',
              passageDe:
                'Eine aktuelle Umfrage unter 400 deutschen Betrieben zeigt: Zwei Tage Homeoffice pro Woche erhöhen die Zufriedenheit der Mitarbeitenden deutlich. Gleichzeitig wünschen sich viele Angestellte feste Tage im Büro, damit der persönliche Austausch im Team nicht verloren geht.',
              promptDe: 'Was betonen viele Angestellte laut der Umfrage?',
              options: [
                'Feste Bürotage bleiben für den Teamkontakt wichtig.',
                'Homeoffice sollte komplett abgeschafft werden.',
                'Nur große Konzerne erlauben mobiles Arbeiten.',
              ],
              correctAnswer: 'Feste Bürotage bleiben für den Teamkontakt wichtig.',
              points: 20,
              isEstimatedPracticePoints: true,
              explanationId:
                'Artikel menyebut „wünschen sich viele Angestellte feste Tage im Büro, damit der persönliche Austausch im Team nicht verloren geht“ (hari tetap di kantor diinginkan agar komunikasi tim tidak hilang).',
              grammarNoteId: 'Klausa tujuan „damit“ (agar/supaya) digunakan saat subjek klausa utama dan bawahan berbeda.',
            },
            {
              id: 'g-b1-l-3',
              partLabelDe: 'Lesen · Teil 3',
              type: 'text-matching',
              passageTitleDe: 'Weiterbildungsangebote',
              passageTypeDe: 'Anzeigen',
              passageDe:
                'Anzeige A: „Intensivkurs Präsentationstechnik für den Beruf, abends online.“ | Anzeige B: „Erste-Hilfe-Kurs am Wochenende für Führerscheinneulinge.“ | Anzeige C: „Workshop Finanzplanung für junge Familien, samstags 10 Uhr.“',
              promptDe: 'Ordne die drei Personen der passenden Anzeige zu.',
              matchingPairs: [
                { left: 'Klara möchte lernen, vor Kollegen sicher zu sprechen.', right: 'Anzeige A' },
                { left: 'Leon braucht einen Kurs für seinen Führerschein.', right: 'Anzeige B' },
                { left: 'Herr und Frau Kaya wollen ihr Haushaltsgeld planen.', right: 'Anzeige C' },
              ],
              matchingRightChoices: ['Anzeige A', 'Anzeige B', 'Anzeige C'],
              points: 20,
              isEstimatedPracticePoints: true,
              explanationId:
                'Klara ingin berlatih presentasi (Anzeige A), Leon membutuhkan kursus P3K untuk SIM (Anzeige B), dan keluarga Kaya ingin merencanakan keuangan keluarga (Anzeige C).',
            },
          ],
        },
        {
          id: 'g-b1-lesen-t4',
          titleDe: 'Teil 4 & 5: Meinungen & Regeln',
          subtitleDe: 'Leserbriefe und Hausordnung',
          instructionsDe: 'Entscheide anhand der Stellungnahmen und der Hausordnung.',
          durationMinutes: 26,
          points: 40,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-b1-l-4',
              partLabelDe: 'Lesen · Teil 4',
              type: 'single-choice',
              passageTitleDe: 'Leserbriefe: Schulfach „Ernährung und Kochen“',
              passageTypeDe: 'Lesermeinungen',
              passageDe:
                'Miriam (34): „Jugendliche sollten in der Schule lernen, frisch zu kochen. Viele essen sonst nur Fertiggerichte.“ | Tobias (49): „Die Idee klingt gut, aber die Schulen haben kaum Geld für Schulküchen und Personal.“',
              promptDe: 'Wie ist Tobias’ Haltung zu dem Vorschlag?',
              options: [
                'Er findet die Idee sinnvoll, sieht aber finanzielle Probleme.',
                'Er lehnt das Kochen für Jugendliche grundsätzlich ab.',
                'Er möchte alle anderen Schulfächer kürzen.',
              ],
              correctAnswer: 'Er findet die Idee sinnvoll, sieht aber finanzielle Probleme.',
              points: 20,
              isEstimatedPracticePoints: true,
              explanationId:
                'Di Goethe B1 Teil 4, perhatikan perbedaan „dafür / dagegen / skeptisch“. Tobias berkata ide itu bagus („klingt gut“), namun sekolah kekurangan dana („kaum Geld für Schulküchen“).',
            },
            {
              id: 'g-b1-l-5',
              partLabelDe: 'Lesen · Teil 5',
              type: 'sentence-ordering',
              passageTitleDe: 'Ablauf bei der Bibliotheksanmeldung',
              passageTypeDe: 'Merkblatt',
              passageDe:
                'Bringe die vier Schritte zur Anmeldung in der Stadtbücherei in die logische Reihenfolge.',
              promptDe: 'Ordne die vier Arbeitsschritte von Schritt 1 bis Schritt 4.',
              orderingItems: [
                'Ausweis und Meldebestätigung an der Information vorzeigen.',
                'Das Anmeldeformular am Tablet ausfüllen und unterschreiben.',
                'Die Jahresgebühr von 18 Euro am Automaten bezahlen.',
                'Den persönlichen Bibliotheksausweis direkt mitnehmen.',
              ],
              correctOrder: [
                'Das Anmeldeformular am Tablet ausfüllen und unterschreiben.',
                'Ausweis und Meldebestätigung an der Information vorzeigen.',
                'Die Jahresgebühr von 18 Euro am Automaten bezahlen.',
                'Den persönlichen Bibliotheksausweis direkt mitnehmen.',
              ],
              points: 20,
              isEstimatedPracticePoints: true,
              explanationId:
                'Urutan logis pendaftaran: mengisi & menandatangani formulir → menunjukkan identitas → membayar iuran tahunan → membawa kartu anggota.',
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'hoeren',
      titleDe: 'Hören',
      officialModuleTitleDe: 'Modul Hören (Goethe B1)',
      durationMinutes: 40,
      officialPoints: 100,
      passingPoints: 60,
      instructionsDe:
        'Das Modul Hören hat vier Teile. Du hörst Ansagen, eine Museumsführung, ein Gespräch und eine Radiodiskussion.',
      sections: [
        {
          id: 'g-b1-hoeren-t1',
          titleDe: 'Teil 1 & 2: Nachrichten & Führung',
          subtitleDe: 'Globales und detailliertes Verstehen',
          instructionsDe: 'Beantworte die Fragen anhand der vorgesehenen Hörtexte.',
          durationMinutes: 20,
          points: 50,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-b1-h-1',
              partLabelDe: 'Hören · Teil 1',
              type: 'single-choice',
              promptDe: 'Was empfiehlt der Wetterbericht für den Nachmittag?',
              options: [
                'Auf Spaziergänge im Wald besser zu verzichten',
                'Alle Fenster weit geöffnet zu lassen',
                'Mit dem Fahrrad in die Berge zu fahren',
              ],
              correctAnswer: 'Auf Spaziergänge im Wald besser zu verzichten',
              points: 50,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/goethe/b1/teil1-radio-nachrichten.mp3',
                status: 'missing',
                titleDe: 'Radionachrichten & Wetterwarnung',
                durationLabel: '1:10',
                playLimit: 1,
                transcriptDe:
                  'Hier ist das Regionalradio mit dem Wetter: Ab 15 Uhr ziehen kräftige Windböen über die Region. Die Feuerwehr rät dringend davon ab, am Nachmittag im Wald spazieren zu gehen, da Äste herabfallen können.',
              },
              explanationId:
                'Pemadam kebakaran menyarankan untuk tidak berjalan-jalan di hutan („rät dringend davon ab, im Wald spazieren zu gehen“) karena hembusan angin kencang.',
              keyVocabulary: [
                { de: 'abraten von', id: 'menyarankan untuk tidak melakukan' },
                { de: 'die Windböe', id: 'hembusan angin kencang' },
              ],
            },
          ],
        },
        {
          id: 'g-b1-hoeren-t3',
          titleDe: 'Teil 3 & 4: Interview / Diskussion',
          subtitleDe: 'Standpunkte unterscheiden',
          instructionsDe: 'Achte im Gespräch auf die unterschiedlichen Meinungen der Sprecher.',
          durationMinutes: 20,
          points: 50,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-b1-h-2',
              partLabelDe: 'Hören · Teil 4',
              type: 'single-choice',
              promptDe: 'Welcher Meinung stimmt die Psychologin Frau Dr. Hartmann zu?',
              options: [
                'Feste bildschirmfreie Zeiten am Abend verbessern den Schlaf.',
                'Jugendliche sollten überhaupt kein Smartphone besitzen.',
                'Soziale Medien ersetzen persönliche Gespräche vollständig.',
              ],
              correctAnswer: 'Feste bildschirmfreie Zeiten am Abend verbessern den Schlaf.',
              points: 50,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/goethe/b1/teil2-interview.mp3',
                status: 'missing',
                titleDe: 'Radiodiskussion: Digitale Pause am Abend',
                durationLabel: '1:35',
                playLimit: 2,
                transcriptDe:
                  'Moderator: Frau Dr. Hartmann, sollten Smartphones für Jugendliche verboten werden? | Dr. Hartmann: Nein, ein Verbot bringt wenig. Aber wer das Handy eine Stunde vor dem Schlafen weglegt, schläft deutlich ruhiger.',
              },
              explanationId:
                'Dr. Hartmann menolak larangan total („ein Verbot bringt wenig“), tetapi mendukung waktu bebas layar satu jam sebelum tidur agar tidur lebih tenang.',
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'schreiben',
      titleDe: 'Schreiben',
      officialModuleTitleDe: 'Modul Schreiben (Goethe B1)',
      durationMinutes: 60,
      officialPoints: 100,
      passingPoints: 60,
      instructionsDe:
        'Das Modul Schreiben umfasst drei Aufgaben: persönliche E-Mail (Teil 1), Meinungsäußerung im Forum (Teil 2) und formelle Entschuldigung/Absage (Teil 3).',
      sections: [
        {
          id: 'g-b1-schreiben-t1',
          titleDe: 'Teil 1: Persönliche E-Mail',
          subtitleDe: 'Ca. 80 Wörter',
          instructionsDe: 'Schreibe eine zusammenhängende E-Mail an einen Freund.',
          durationMinutes: 20,
          points: 40,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-b1-s-1',
              partLabelDe: 'Schreiben · Teil 1',
              type: 'email-writing',
              promptDe:
                'Du hast gestern an einem Kochkurs teilgenommen. Schreib deinem Freund Leon eine E-Mail:\n• Beschreibe, wie der Kurs war.\n• Begründe, welches Gericht dir am besten geschmeckt hat.\n• Schlage vor, am Wochenende gemeinsam zu kochen.',
              wordCountRange: { min: 70, max: 110 },
              points: 40,
              isEstimatedPracticePoints: true,
              explanationId:
                'Untuk Goethe B1 Teil 1 (~80 kata), ceritakan pengalaman dengan Perfekt/Präteritum, berikan alasan dengan „weil/da“, lalu ajukan ajakan konkrit.',
              sampleAnswerDe:
                'Lieber Leon,\n\ngestern war ich zum ersten Mal bei einem internationalen Kochkurs und es hat mir richtig Spaß gemacht! Die Gruppe war sehr freundlich und unser Koch hat alles geduldig erklärt. Am besten hat mir das Gemüse-Curry geschmeckt, weil wir frische Gewürze benutzt haben und es nicht zu scharf war. Hast du Lust, am Samstag bei mir gemeinsam zu kochen? Ich könnte schon alles einkaufen.\n\nViele Grüße\nDika',
              sampleTranslationId:
                'Leon yang baik, kemarin untuk pertama kalinya aku mengikuti kursus memasak internasional dan sangat menyenangkan... Yang paling enak menurutku kari sayuran karena kami memakai rempah segar... Apakah kamu mau memasak bersama di rumahku hari Sabtu? Salam, Dika.',
              rubricCriteria: buildWritingRubric(40),
            },
          ],
        },
        {
          id: 'g-b1-schreiben-t2',
          titleDe: 'Teil 2 & 3: Forumsbeitrag & Formelle E-Mail',
          subtitleDe: 'Meinung äußern (ca. 80 W.) & Absage (ca. 40 W.)',
          instructionsDe: 'Verfasse einen Forumsbeitrag zum Thema „Online-Shopping oder Einzelhandel?“ sowie eine kurze formelle Absage.',
          durationMinutes: 40,
          points: 60,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-b1-s-2',
              partLabelDe: 'Schreiben · Teil 2',
              type: 'forum-post',
              promptDe:
                'In einem Online-Forum wird über das Thema „Immer mehr Menschen kaufen Kleidung im Internet“ diskutiert. Schreibe deine Meinung:\n• Wie stehst du zum Online-Shopping?\n• Nenne einen Vorteil und einen Nachteil.\n• Wie kaufst du selbst am liebsten ein?',
              wordCountRange: { min: 70, max: 110 },
              points: 40,
              isEstimatedPracticePoints: true,
              explanationId:
                'Forumsbeitrag B1 menuntut struktur pendapat yang jelas: pembukaan topik („Meiner Meinung nach...“), satu kelebihan („Ein Vorteil ist, dass...“), satu kekurangan („Allerdings...“), dan kebiasaan pribadi.',
              sampleAnswerDe:
                'Das Thema Online-Shopping finde ich sehr aktuell. Ein großer Vorteil ist natürlich, dass man rund um die Uhr bequem von zu Hause aus bestellen und Preise vergleichen kann. Allerdings passt Kleidung oft nicht richtig, sodass viele Pakete zurückgeschickt werden müssen. Das belastet auch die Umwelt. Deshalb kaufe ich Schuhe und Jacken lieber im Geschäft vor Ort, weil ich sie dort direkt anprobieren kann.',
              sampleTranslationId:
                'Menurut saya topik belanja daring sangat relevan. Keuntungan besar adalah bisa memesan kapan saja dan membandingkan harga. Namun pakaian sering tidak pas sehingga banyak paket dikembalikan... Karena itu saya lebih suka membeli sepatu dan jaket langsung di toko.',
              rubricCriteria: buildWritingRubric(40),
            },
            {
              id: 'g-b1-s-3',
              partLabelDe: 'Schreiben · Teil 3',
              type: 'email-writing',
              promptDe:
                'Sie haben nächste Woche einen Termin zur Wohnungsbesichtigung bei Frau Becker, können aber wegen einer Dienstreise nicht kommen. Schreiben Sie eine kurze höfliche E-Mail (ca. 40 Wörter): Entschuldigen Sie sich und bitten Sie um einen neuen Termin.',
              wordCountRange: { min: 35, max: 60 },
              points: 20,
              isEstimatedPracticePoints: true,
              explanationId:
                'Teil 3 B1 adalah pesan formal singkat (~40 kata) untuk meminta maaf dan menjadwalkan ulang janji secara sopan.',
              sampleAnswerDe:
                'Sehr geehrte Frau Becker,\n\nleider muss ich meinen Besichtigungstermin am Dienstag absagen, da ich kurzfristig auf eine Dienstreise fahren muss. Ich bitte um Entschuldigung und möchte fragen, ob wir einen neuen Termin ab Donnerstag vereinbaren könnten.\n\nMit freundlichen Grüßen\nNadia Sari',
              sampleTranslationId:
                'Yth. Ibu Becker, sayangnya saya harus membatalkan janji survei apartemen hari Selasa karena mendadak ada perjalanan dinas. Mohon maaf dan apakah kita bisa membuat jadwal baru mulai Kamis? Hormat saya, Nadia Sari.',
              rubricCriteria: buildWritingRubric(20),
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'sprechen',
      titleDe: 'Sprechen',
      officialModuleTitleDe: 'Modul Sprechen (Goethe B1)',
      durationMinutes: 15,
      officialPoints: 100,
      passingPoints: 60,
      instructionsDe:
        'Das Modul Sprechen umfasst: Teil 1 Gemeinsam etwas planen, Teil 2 Ein Thema präsentieren (ca. 3–4 Min.) und Teil 3 Rückfragen beantworten.',
      sections: [
        {
          id: 'g-b1-sprechen-t1',
          titleDe: 'Teil 1–3: Planen & Präsentation',
          subtitleDe: 'Interaktion & strukturierter Kurzvortrag',
          instructionsDe: 'Bereite dich 1 Minute vor und sprich anschließend strukturiert zu Teil 1 und Teil 2.',
          durationMinutes: 15,
          points: 100,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-b1-sp-1',
              partLabelDe: 'Sprechen · Teil 1 & 2',
              type: 'speaking-prompt',
              promptDe:
                'Teil 1 (Planung): Ein Teilnehmer aus Ihrem Deutschkurs zieht um. Planen Sie mit Ihrem Partner eine kleine Überraschung (Wann? Wo? Geschenk? Essen/Getränke?).\nTeil 2 (Präsentation): „Brauchen Kinder ein eigenes Smartphone?“ (Persönliche Erfahrung → Situation im Heimatland → Vor- und Nachteile → eigene Meinung).',
              preparationSeconds: 120,
              speakingSeconds: 300,
              partnerPromptsDe: [
                'Partner (Teil 1): „Ich denke, ein Buch über unsere Stadt wäre ein schönes Abschiedsgeschenk. Was meinst du?“',
                'Partner (Teil 3 Rückfrage nach Vortrag): „Ab welchem Alter sollten Kinder deiner Meinung nach ein Smartphone bekommen?“',
              ],
              points: 100,
              isEstimatedPracticePoints: true,
              explanationId:
                'Di Goethe B1 Sprechen Teil 2, ikuti urutan 4 slide presentasi (pengalaman pribadi, kondisi di Indonesia, pro & kontra, kesimpulan) dan ucapkan terima kasih kepada pendengar di akhir.',
              sampleAnswerDe:
                'Teil 2: Ich möchte heute über das Thema „Smartphones für Kinder“ sprechen. Zuerst erzähle ich von meinen persönlichen Erfahrungen... In meinem Heimatland Indonesien nutzen viele Kinder schon in der Grundschule ein Handy, oft für Lern-Apps oder um die Eltern anzurufen. Ein Vorteil ist Sicherheit, ein Nachteil ist weniger Bewegung draußen. Zusammenfassend finde ich, dass Kinder erst ab 12 Jahren ein eigenes Gerät mit klaren Zeitregeln haben sollten. Vielen Dank fürs Zuhören!',
              sampleTranslationId:
                'Bagian 2: Hari ini saya ingin berbicara tentang topik „Smartphone untuk anak“... Di Indonesia banyak anak memakai ponsel untuk aplikasi belajar atau menghubungi orang tua. Keuntungannya keamanan, kerugiannya kurang aktivitas luar ruang... Terima kasih sudah mendengarkan!',
              rubricCriteria: buildSpeakingRubric(100),
            },
          ],
        },
      ],
    },
  ],
};
