import { Exercise } from '../../types/exercise';

export const B1_EXERCISES: Exercise[] = [
  // ================= LESEN B1 (3) =================
  {
    id: 'b1-lesen-1',
    level: 'B1',
    skill: 'lesen',
    topic: 'Umwelt',
    title: 'Unverpackt-Läden im Stadtalltag',
    subtitle: 'Sachtext über nachhaltigen Konsum erfassen',
    difficulty: 'Mittel',
    durationMinutes: 15,
    formatLabel: 'Leseverstehen · Sachtext',
    instructions: 'Lies den Artikel und beantworte die Fragen.',
    passageTitle: 'Einkaufen ohne Plastik',
    passageType: 'Artikel',
    passage:
      'Immer mehr Verbraucher achten beim Einkaufen darauf, Verpackungsmüll zu vermeiden. In sogenannten Unverpackt-Läden bringen Kundinnen und Kunden eigene Gläser oder Stoffbeutel mit und füllen Lebensmittel wie Reis, Nudeln oder Nüsse direkt ab. Zwar sind manche Bio-Produkte dort etwas teurer als im Discounter, doch viele schätzen die bewusste Mengenwahl.',
    questions: [
      {
        id: 'b1-lesen-1-q1',
        type: 'multiple-choice',
        question: 'Was ist ein wesentlicher Vorteil von Unverpackt-Läden laut Text?',
        options: [
          'Alle Produkte sind deutlich billiger als im Discounter.',
          'Man kann genau die benötigte Menge abfüllen und Müll sparen.',
          'An der Kasse werden kostenlose Kunststoffbeutel verteilt.',
        ],
        correctAnswer: 'Man kann genau die benötigte Menge abfüllen und Müll sparen.',
        explanationId:
          'Paragraf menjelaskan bahwa pembeli membawa wadah sendiri, mengurangi sampah kemasan plastik, dan bebas memilih jumlah barang sesuai kebutuhan ("bewusste Mengenwahl").',
        keyVocabulary: [
          { de: 'der Verbraucher', id: 'konsumen' },
          { de: 'vermeiden', id: 'menghindari' },
        ],
        points: 10,
      },
      {
        id: 'b1-lesen-1-q2',
        type: 'true-false',
        question: 'In Unverpackt-Läden muss man immer große Familienpackungen kaufen.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationId:
          'Salah (Falsch), pembeli dapat mengisi sesuai jumlah yang diinginkan secara sadar ("bewusste Mengenwahl").',
        points: 10,
      },
    ],
  },
  {
    id: 'b1-lesen-2',
    level: 'B1',
    skill: 'lesen',
    topic: 'Medien',
    title: 'Leserbriefe zur Smartphone-Nutzung',
    subtitle: 'Meinungen in kurzen Stellungnahmen vergleichen',
    difficulty: 'Mittel',
    durationMinutes: 15,
    formatLabel: 'Leseverstehen · Meinungen',
    instructions: 'Lies die beiden Leserbriefe und prüfe, wer welche Position vertritt.',
    passageTitle: 'Brauchen Schulen Handyverbote?',
    passageType: 'Artikel',
    passage:
      'Katrin (38): Im Unterricht lenken Benachrichtigungen stark ab. Deshalb finde ich klare Regeln sinnvoll, sodass Smartphones in der Schultasche bleiben. Ben (29): Ein totales Verbot hilft kaum, weil Jugendliche lernen müssen, digitale Werkzeuge verantwortungsvoll zu nutzen – zum Beispiel für schnelle Recherchen im Projektunterricht.',
    questions: [
      {
        id: 'b1-lesen-2-q1',
        type: 'multiple-choice',
        question: 'Warum befürwortet Katrin klare Regeln für Smartphones?',
        options: [
          'Weil Benachrichtigungen beim Lernen ablenken.',
          'Weil Smartphones zu teuer für Jugendliche sind.',
          'Weil die Schulen kein WLAN haben.',
        ],
        correctAnswer: 'Weil Benachrichtigungen beim Lernen ablenken.',
        explanationId:
          'Katrin menyebutkan "Im Unterricht lenken Benachrichtigungen stark ab" (notifikasi sangat mengganggu konsentrasi di kelas).',
        keyVocabulary: [{ de: 'ablenken', id: 'mengalihkan perhatian / mengganggu' }],
        points: 10,
      },
      {
        id: 'b1-lesen-2-q2',
        type: 'matching',
        question: 'Ordne die Aussagen den passenden Personen zu.',
        matchingPairs: [
          { left: 'Katrin', right: 'Smartphones sollten im Unterricht in der Tasche bleiben.' },
          { left: 'Ben', right: 'Digitale Geräte sind für Projektarbeit und Recherche nützlich.' },
        ],
        explanationId:
          'Katrin mendukung pembatasan agar ponsel tetap di tas, sedangkan Ben menolak larangan total karena ponsel berguna untuk riset proyek.',
        points: 15,
      },
    ],
  },
  {
    id: 'b1-lesen-3',
    level: 'B1',
    skill: 'lesen',
    topic: 'Beruf und Ausbildung',
    title: 'Hausordnung und Hinweise im Praktikum',
    subtitle: 'Lückentext im beruflichen Kontext ergänzen',
    difficulty: 'Mittel',
    durationMinutes: 15,
    formatLabel: 'Leseverstehen · Lückentext',
    instructions: 'Lies den Informationstext für Praktikanten und fülle die Lücken aus.',
    passageTitle: 'Willkommen im Betrieb',
    passageType: 'Informationstext',
    passage:
      'Liebe Praktikantinnen und Praktikanten, unsere Kernarbeitszeit beginnt um 9:00 Uhr. Falls Sie einmal verspätet sind oder sich krankmelden müssen, informieren Sie bitte bis 8:30 Uhr Ihre Teamleitung telefonisch. In der Kantine erhalten Sie mit Ihrem Betriebsausweis täglich eine vergünstigte Mahlzeit.',
    questions: [
      {
        id: 'b1-lesen-3-q1',
        type: 'fill-blank',
        question: 'Bei Krankheit muss man bis ___ Uhr die Teamleitung informieren.',
        correctAnswer: '8:30',
        acceptableAnswers: ['8:30', '08:30', 'halb neun'],
        explanationId:
          'Teks menyebutkan batas waktu pelaporan adalah "bis 8:30 Uhr" (pukul setengah sembilan pagi).',
        points: 10,
      },
      {
        id: 'b1-lesen-3-q2',
        type: 'true-false',
        question: 'Mit dem Betriebsausweis bezahlt man in der Kantine weniger.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Richtig',
        explanationId:
          'Benar (Richtig), kata "vergünstigte Mahlzeit" berarti makanan dengan harga potongan/diskon.',
        keyVocabulary: [{ de: 'vergünstigt', id: 'dengan harga diskon / lebih murah' }],
        points: 10,
      },
    ],
  },

  // ================= HÖREN B1 (3) =================
  {
    id: 'b1-hoeren-1',
    level: 'B1',
    skill: 'hoeren',
    topic: 'Bildung',
    title: 'Gespräch über ein Auslandssemester',
    subtitle: 'Erfahrungen, Gründe und Empfehlungen im Dialog erfassen',
    difficulty: 'Mittel',
    durationMinutes: 14,
    formatLabel: 'Hörverstehen · Alltagsgespräch',
    instructions: 'Höre das Gespräch zwischen Mara und Jonas.',
    audioStatus: 'pending',
    transcript:
      'Jonas: Mara, wie war eigentlich dein Semester in Freiburg? Mara: Anfangs hatte ich Respekt vor den Vorlesungen auf Deutsch, aber die Tandem-Abende an der Uni haben mir enorm geholfen. Dort konnte ich nicht nur Fachbegriffe üben, sondern auch lockere Umgangssprache lernen. Nur die Wohnungssuche war ziemlich stressig.',
    questions: [
      {
        id: 'b1-hoeren-1-q1',
        type: 'multiple-choice',
        question: 'Was fand Mara in Freiburg besonders hilfreich?',
        options: [
          'Die günstigen Wohnheime im Zentrum',
          'Die Tandem-Abende zum Üben der Umgangssprache',
          'Die Online-Klausuren am Semesterende',
        ],
        correctAnswer: 'Die Tandem-Abende zum Üben der Umgangssprache',
        explanationId:
          'Mara menegaskan bahwa acara "Tandem-Abende" sangat membantunya melatih istilah akademik sekaligus bahasa percakapan sehari-hari ("Umgangssprache").',
        keyVocabulary: [{ de: 'die Umgangssprache', id: 'bahasa percakapan sehari-hari' }],
        points: 10,
      },
      {
        id: 'b1-hoeren-1-q2',
        type: 'true-false',
        question: 'Mara hat sofort ohne Probleme eine Wohnung gefunden.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationId:
          'Salah (Falsch), di akhir dialog Mara mengatakan pencarian tempat tinggal cukup membuat stres ("ziemlich stressig").',
        points: 10,
      },
    ],
  },
  {
    id: 'b1-hoeren-2',
    level: 'B1',
    skill: 'hoeren',
    topic: 'Gesundheit',
    title: 'Radiotipps für mehr Bewegung im Büro',
    subtitle: 'Kernaussagen aus einem kurzen Radiobeitrag notieren',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Hörverstehen · Radiobeitrag',
    instructions: 'Höre den Beitrag und beantworte die Fragen.',
    audioStatus: 'pending',
    transcript:
      'Wer acht Stunden am Schreibtisch sitzt, kennt das Problem: Nackenschmerzen und Müdigkeit am Nachmittag. Sportwissenschaftler empfehlen daher, jede Stunde für drei Minuten aufzustehen, kurz durchzulüften und Telefonate möglichst im Stehen zu führen.',
    questions: [
      {
        id: 'b1-hoeren-2-q1',
        type: 'multiple-choice',
        question: 'Was empfehlen Sportwissenschaftler für den Büroalltag?',
        options: [
          'Stündlich kurz aufzustehen und im Stehen zu telefonieren',
          'Morgens drei Stunden ohne Pause zu arbeiten',
          'Alle Besprechungen abzusagen',
        ],
        correctAnswer: 'Stündlich kurz aufzustehen und im Stehen zu telefonieren',
        explanationId:
          'Para ahli menyarankan berdiri selama tiga menit setiap jam, membuka ventilasi udara, dan menelepon sambil berdiri ("im Stehen").',
        points: 10,
      },
    ],
  },
  {
    id: 'b1-hoeren-3',
    level: 'B1',
    skill: 'hoeren',
    topic: 'Gesellschaft',
    title: 'Ehrenamt im Sportverein',
    subtitle: 'Motivation und Aufgaben im Interview verstehen',
    difficulty: 'Mittel',
    durationMinutes: 14,
    formatLabel: 'Hörverstehen · Interview',
    instructions: 'Höre das Interview mit Herrn Becker.',
    audioStatus: 'pending',
    transcript:
      'Moderatorin: Herr Becker, Sie trainieren seit zehn Jahren ehrenamtlich die Jugendmannschaft. Was motiviert Sie? Becker: Am meisten freut es mich zu sehen, wie Kinder aus verschiedenen Schulen hier gemeinsam Teamgeist entwickeln. Natürlich kostet es Zeit, aber man bekommt viel Dankbarkeit zurück.',
    questions: [
      {
        id: 'b1-hoeren-3-q1',
        type: 'true-false',
        question: 'Herr Becker wird für seine Arbeit als Jugendtrainer bezahlt.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationId:
          'Salah (Falsch), kata "ehrenamtlich" berarti sukarela tanpa bayaran gaji.',
        keyVocabulary: [{ de: 'ehrenamtlich', id: 'secara sukarela' }],
        points: 10,
      },
      {
        id: 'b1-hoeren-3-q2',
        type: 'multiple-choice',
        question: 'Was schätzt Herr Becker besonders an seinem Engagement?',
        options: [
          'Dass die Kinder gemeinsam Teamgeist entwickeln',
          'Dass er viele Pokale gewonnen hat',
          'Dass das Training nur einmal im Jahr stattfindet',
        ],
        correctAnswer: 'Dass die Kinder gemeinsam Teamgeist entwickeln',
        explanationId:
          'Ia merasa paling senang melihat anak-anak dari berbagai sekolah membangun semangat kerja sama tim ("Teamgeist entwickeln").',
        points: 10,
      },
    ],
  },

  // ================= SPRECHEN B1 (3) =================
  {
    id: 'b1-sprechen-1',
    level: 'B1',
    skill: 'sprechen',
    topic: 'Meinungen äußern',
    title: 'Kurzvortrag: Homeoffice für Berufsanfänger?',
    subtitle: 'Thema strukturiert präsentieren und eigene Meinung begründen',
    difficulty: 'Mittel',
    durationMinutes: 15,
    formatLabel: 'Sprechen · Präsentation (3 Min.)',
    instructions:
      'Halte eine strukturierte Kurzpräsentation mit Einleitung, eigenen Erfahrungen, Vor-/Nachteilen und Fazit.',
    questions: [
      {
        id: 'b1-sprechen-1-q1',
        type: 'speaking-task',
        question:
          'Sollten Berufsanfänger bereits von Anfang an im Homeoffice arbeiten? Stelle persönliche Erfahrungen, zwei Vorteile, zwei Nachteile und deine Meinung dar.',
        preparationSeconds: 90,
        speakingDurationSeconds: 180,
        checklist: [
          'Klare Einleitung und Vorstellung des Themas',
          'Zwei Vorteile und zwei Nachteile genannt',
          'Eigene Meinung mit Begründung formuliert',
          'Strukturierende Redemittel genutzt („Einerseits“, „Andererseits“, „Zusammenfassend“)',
        ],
        rubricCriteria: [
          {
            criterion: 'Aufbau & Kohärenz',
            descriptionId: 'Presentasi memiliki pembukaan, isi berimbang, dan kesimpulan.',
          },
          {
            criterion: 'Redemittel B1',
            descriptionId: 'Menggunakan ungkapan opini ("Meiner Meinung nach...", "Ich bin überzeugt, dass...").',
          },
        ],
        sampleAnswer:
          'Mein Thema heute lautet „Homeoffice für Berufsanfänger“. Einerseits spart man im Homeoffice viel Pendelzeit und kann konzentriert arbeiten. Andererseits fehlt am Anfang oft der direkte Austausch mit erfahrenen Kolleginnen und Kollegen. Meiner Meinung nach ist ein hybrides Modell ideal: Zwei Tage im Büro zum Lernen und drei Tage flexibel von zu Hause.',
        explanationId:
          'Pada presentasi B1, keseimbangan antara argumen pro dan kontra ("Einerseits... andererseits...") serta kesimpulan yang jelas sangat menentukan nilai.',
        points: 25,
      },
    ],
  },
  {
    id: 'b1-sprechen-2',
    level: 'B1',
    skill: 'sprechen',
    topic: 'Probleme und Lösungen',
    title: 'Gemeinsam einen Nachbarschaftstag planen',
    subtitle: 'Aufgaben verteilen, Ideen abwägen und Kompromisse schließen',
    difficulty: 'Mittel',
    durationMinutes: 15,
    formatLabel: 'Sprechen · Gemeinsam planen',
    instructions: 'Entwickle konkrete Vorschläge zu Ort, Ablauf, Verpflegung und Werbung.',
    questions: [
      {
        id: 'b1-sprechen-2-q1',
        type: 'speaking-task',
        question:
          'Euer Wohnhaus möchte ein Nachbarschaftsfest organisieren. Überlege dir Vorschläge für: Termin, Essen & Getränke, Aktivitäten für Kinder und Einladungsplakate.',
        preparationSeconds: 60,
        speakingDurationSeconds: 150,
        checklist: [
          'Konkrete Vorschläge zu allen vier Punkten gemacht',
          'Mögliche Probleme (z. B. Regen) berücksichtigt',
          'Zustimmung und Alternativen höflich formuliert',
        ],
        rubricCriteria: [
          {
            criterion: 'Problemlösung',
            descriptionId: 'Memberi solusi praktis untuk perencanaan acara bersama.',
          },
          {
            criterion: 'Interaktionsfähigkeit',
            descriptionId: 'Menggunakan kalimat ajakan dan pertimbangan sopan.',
          },
        ],
        sampleAnswer:
          'Ich schlage vor, dass wir das Fest am Samstagnachmittag im Innenhof machen. Falls es regnet, könnten wir in den Gemeinschaftsraum ausweichen. Jede Wohnung könnte eine Kleinigkeit zum Buffet beisteuern, und ich übernehme gern das Drucken der Einladungen.',
        explanationId:
          'Mengantisipasi kendala seperti hujan ("Falls es regnet, könnten wir...") menunjukkan penguasaan kalimat pengandaian B1 yang baik.',
        points: 25,
      },
    ],
  },
  {
    id: 'b1-sprechen-3',
    level: 'B1',
    skill: 'sprechen',
    topic: 'Zukunft',
    title: 'Berufliche Ziele in den nächsten fünf Jahren',
    subtitle: 'Pläne, Wünsche und Bedingungen ausdrücken',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Sprechen · Über Pläne sprechen',
    instructions: 'Sprich zwei Minuten lang über deine beruflichen oder akademischen Ziele.',
    questions: [
      {
        id: 'b1-sprechen-3-q1',
        type: 'speaking-task',
        question:
          'Welche Pläne hast du für die nächsten fünf Jahre? Welche Rolle spielt dabei die deutsche Sprache und welche Schritte möchtest du als Nächstes gehen?',
        preparationSeconds: 60,
        speakingDurationSeconds: 120,
        checklist: [
          'Zukunftspläne mit „vorhaben“, „möchten“ oder „werden“ formuliert',
          'Rolle der Deutschkenntnisse konkret begründet',
          'Nebensätze mit „damit“ oder „um ... zu“ verwendet',
        ],
        rubricCriteria: [
          {
            criterion: 'Finalsätze',
            descriptionId: 'Penggunaan klausa tujuan ("um ... zu" atau "damit") tepat.',
          },
          {
            criterion: 'Wortschatz Zukunft',
            descriptionId: 'Kosakata karier, pendidikan lanjutan, dan rencana masa depan bervariasi.',
          },
        ],
        sampleAnswer:
          'In den nächsten fünf Jahren möchte ich ein Masterstudium in Deutschland absolvieren, um meine Fachkenntnisse im Bereich erneuerbare Energien zu vertiefen. Deshalb bereite ich mich aktuell intensiv auf die B1- und B2-Prüfung vor.',
        explanationId:
          'Konstruksi "um ... zu + Infinitiv" dipakai jika subjek kedua bagian kalimat sama.',
        points: 25,
      },
    ],
  },

  // ================= SCHREIBEN B1 (3) =================
  {
    id: 'b1-schreiben-1',
    level: 'B1',
    skill: 'schreiben',
    topic: 'Gesellschaft',
    title: 'Forumsbeitrag: Ehrenamtliches Engagement',
    subtitle: 'Eigene Meinung begründen und Erfahrungen einbringen',
    difficulty: 'Mittel',
    durationMinutes: 25,
    formatLabel: 'Schreiben · Forumsbeitrag',
    instructions: 'Schreibe einen Forumsbeitrag (80 bis 120 Wörter).',
    questions: [
      {
        id: 'b1-schreiben-1-q1',
        type: 'writing-task',
        question:
          'In einem Online-Forum wird über freiwillige Arbeit diskutiert. Schreibe deine Meinung: 1. Warum engagieren sich viele Menschen ehrenamtlich? 2. Welche Vorteile hat das für die Gesellschaft und für einen selbst? 3. Würdest du selbst gern ein Ehrenamt übernehmen?',
        wordLimit: { min: 75, max: 130 },
        checklist: [
          'Klare Positionierung zum Thema',
          'Gründe und Vorteile nachvollziehbar erklärt',
          'Konnektoren wie „obwohl“, „deshalb“, „weil“ eingesetzt',
          'Persönliches Fazit formuliert',
        ],
        rubricCriteria: [
          {
            criterion: 'Argumentation',
            descriptionId: 'Alasan dan contoh konkret mendukung opini pribadi.',
          },
          {
            criterion: 'Satzverknüpfung B1',
            descriptionId: 'Variasi anak kalimat (weil, obwohl, dass) dan kata hubung tepat.',
          },
        ],
        sampleAnswer:
          'Ich finde ehrenamtliches Engagement sehr wichtig für unsere Gesellschaft. Viele Menschen helfen freiwillig, weil sie anderen Menschen Unterstützung bieten und etwas Sinnvolles tun möchten. Außerdem knüpft man dabei neue Kontakte und sammelt wertvolle Erfahrungen für das Leben. Obwohl ich neben dem Beruf wenig Freizeit habe, würde ich am Wochenende gern in einer Nachbarschaftsinitiative mithelfen.',
        explanationId:
          'Pada tulisan opini B1, gunakan kata sambung konsesif seperti "obwohl" (meskipun) untuk menunjukkan nuansa argumen yang matang.',
        points: 30,
      },
    ],
  },
  {
    id: 'b1-schreiben-2',
    level: 'B1',
    skill: 'schreiben',
    topic: 'Beziehungen',
    title: 'Nachricht an einen Freund nach einem Missverständnis',
    subtitle: 'Gefühle schildern, sich entschuldigen und Lösung vorschlagen',
    difficulty: 'Mittel',
    durationMinutes: 25,
    formatLabel: 'Schreiben · Persönliche E-Mail',
    instructions: 'Schreibe eine E-Mail an deinen Freund Daniel (80 bis 120 Wörter).',
    questions: [
      {
        id: 'b1-schreiben-2-q1',
        type: 'writing-task',
        question:
          'Du hast ein wichtiges Treffen mit Daniel vergessen. Schreibe ihm: 1. Entschuldige dich und erkläre den Grund. 2. Beschreibe, wie es dir danach ging. 3. Schlage ein neues Treffen als Wiedergutmachung vor.',
        wordLimit: { min: 75, max: 125 },
        checklist: [
          'Ehrliche Entschuldigung und Erklärung formuliert',
          'Gefühle oder Bedauern ausgedrückt',
          'Konkreten Ersatztermin vorgeschlagen',
        ],
        rubricCriteria: [
          {
            criterion: 'Tonfall & Empathie',
            descriptionId: 'Nada penulisan tulus, akrab, dan meyakinkan.',
          },
          {
            criterion: 'Vollständigkeit',
            descriptionId: 'Permintaan maaf, penjelasan, dan ajakan pengganti tertulis lengkap.',
          },
        ],
        sampleAnswer:
          'Lieber Daniel,\n\nes tut mir wirklich sehr leid, dass ich gestern unser Treffen verpasst habe. Auf der Arbeit gab es einen unerwarteten Notfall, und ich habe mein Handy im Büro liegen lassen. Als ich es abends gemerkt habe, habe ich mich schrecklich geärgert. Als kleine Wiedergutmachung möchte ich dich am Freitagabend zum Essen einladen. Hast du ab 19:00 Uhr Zeit?\n\nViele Grüße,\nLina',
        explanationId:
          'Ungkapan "Es tut mir wirklich leid, dass..." adalah cara alami untuk meminta maaf secara personal dalam bahasa Jerman.',
        points: 30,
      },
    ],
  },
  {
    id: 'b1-schreiben-3',
    level: 'B1',
    skill: 'schreiben',
    topic: 'Medien',
    title: 'Formelle Beschwerde über einen Online-Kurs',
    subtitle: 'Sachlich reklamieren und eine Lösung fordern',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 25,
    formatLabel: 'Schreiben · Formelle Reklamation',
    instructions: 'Schreibe eine höfliche, aber bestimmte Beschwerde-E-Mail (80 bis 120 Wörter).',
    questions: [
      {
        id: 'b1-schreiben-3-q1',
        type: 'writing-task',
        question:
          'Du hast einen Online-Videokurs gebucht, aber mehrere Lektionen lassen sich nicht abspielen und der Support antwortet nicht. Schreibe an die Firma: 1. Beschreibe das Problem. 2. Erkläre, was du bereits versucht hast. 3. Fordere eine Lösung bis zu einem Datum.',
        wordLimit: { min: 75, max: 130 },
        checklist: [
          'Formelle Anrede und klarer Grund der E-Mail',
          'Technisches Problem präzise geschildert',
          'Konkrete Frist oder Rückerstattung verlangt',
        ],
        rubricCriteria: [
          {
            criterion: 'Sachlichkeit',
            descriptionId: 'Masalah disampaikan sopan namun tegas tanpa bahasa emosional berlebihan.',
          },
          {
            criterion: 'Forderung',
            descriptionId: 'Memuat tuntutan solusi beserta batas waktu yang jelas.',
          },
        ],
        sampleAnswer:
          'Sehr geehrte Damen und Herren,\n\nam 10. November habe ich Ihren Online-Sprachkurs gebucht. Leider lassen sich seit drei Tagen die Videos ab Modul 4 nicht öffnen, obwohl ich es auf zwei verschiedenen Geräten getestet habe. Auf meine erste Anfrage habe ich bisher keine Antwort erhalten. Ich bitte Sie daher, den technischen Fehler bis zum 28. November zu beheben oder mir die Kursgebühr zu erstatten.\n\nMit freundlichen Grüßen\nRina Kusuma',
        explanationId:
          'Dalam surat keluhan formal, sebutkan tanggal transaksi, masalah spesifik, upaya yang sudah dilakukan, dan batas waktu penyelesaian ("bis zum ...").',
        points: 30,
      },
    ],
  },

  // ================= GRAMMATIK B1 (3) =================
  {
    id: 'b1-grammatik-1',
    level: 'B1',
    skill: 'grammatik',
    topic: 'Meinungen äußern',
    title: 'Konjunktiv II und Relativsätze',
    subtitle: 'Höfliche Bitten, irreale Wünsche und genaue Beschreibungen',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Grammatik · Konjunktiv II & Relativsatz',
    instructions: 'Wähle die korrekte Form für den jeweiligen Satz.',
    questions: [
      {
        id: 'b1-gram-1-q1',
        type: 'multiple-choice',
        question: 'Wenn ich mehr Zeit ___, würde ich noch eine Fremdsprache lernen.',
        options: ['habe', 'hätte', 'hatte'],
        correctAnswer: 'hätte',
        explanationId:
          'Kalimat pengandaian yang tidak nyata saat ini membutuhkan Konjunktiv II dari "haben", yaitu "hätte".',
        points: 10,
      },
      {
        id: 'b1-gram-1-q2',
        type: 'multiple-choice',
        question: 'Das ist die Kollegin, ___ ich gestern die Unterlagen gegeben habe.',
        options: ['die', 'der', 'dem'],
        correctAnswer: 'der',
        explanationId:
          'Kata kerja "geben" menuntut objek Dativ untuk penerima ("jemandem etwas geben"). Karena "die Kollegin" feminin, kata ganti relatif Dativ feminin adalah "der".',
        points: 10,
      },
    ],
  },
  {
    id: 'b1-grammatik-2',
    level: 'B1',
    skill: 'grammatik',
    topic: 'Umwelt',
    title: 'Passiv Präsens, Präteritum und „Infinitiv mit zu“',
    subtitle: 'Vorgänge beschreiben und Infinitivkonstruktionen nutzen',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Grammatik · Passiv & Infinitivsätze',
    instructions: 'Ergänze die Sätze korrekt.',
    questions: [
      {
        id: 'b1-gram-2-q1',
        type: 'fill-blank',
        question: 'Passiv Präsens: In diesem Betrieb ___ jeden Tag viel Papier gespart.',
        correctAnswer: 'wird',
        acceptableAnswers: ['wird'],
        explanationId:
          'Subjeknya adalah "viel Papier" (tunggal), sehingga kalimat pasif masa kini menggunakan "wird" + Partizip II ("gespart").',
        points: 10,
      },
      {
        id: 'b1-gram-2-q2',
        type: 'multiple-choice',
        question: 'Es ist wichtig, regelmäßig Sport ___ treiben.',
        options: ['zu', 'um', 'für'],
        correctAnswer: 'zu',
        explanationId:
          'Setelah frasa seperti "Es ist wichtig, ..." digunakan konstruksi infinitif dengan "zu" sebelum kata kerja di akhir kalimat.',
        points: 10,
      },
    ],
  },
  {
    id: 'b1-grammatik-3',
    level: 'B1',
    skill: 'grammatik',
    topic: 'Beruf und Ausbildung',
    title: 'Temporale Nebensätze und Adjektivdeklination',
    subtitle: '„als“, „wenn“, „nachdem“ und Endungen beherrschen',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 15,
    formatLabel: 'Grammatik · Nebensätze & Adjektive',
    instructions: 'Wähle die grammatisch passende Ergänzung.',
    questions: [
      {
        id: 'b1-gram-3-q1',
        type: 'multiple-choice',
        question: '___ ich 18 Jahre alt war, bin ich nach Berlin gezogen.',
        options: ['Als', 'Wenn', 'Wann'],
        correctAnswer: 'Als',
        explanationId:
          'Untuk peristiwa tunggal yang hanya terjadi sekali di masa lalu digunakan "als", bukan "wenn".',
        points: 10,
      },
      {
        id: 'b1-gram-3-q2',
        type: 'multiple-choice',
        question: 'Sie sucht einen ___ Arbeitsplatz in der IT-Branche. (flexibel, Akk. maskulin)',
        options: ['flexibler', 'flexiblen', 'flexibles'],
        correctAnswer: 'flexiblen',
        explanationId:
          'Setelah artikel tak tentu maskulin Akkusativ "einen", kata sifat selalu mendapat akhiran "-en": einen flexiblen Arbeitsplatz.',
        points: 10,
      },
    ],
  },

  // ================= WORTSCHATZ B1 (3) =================
  {
    id: 'b1-wortschatz-1',
    level: 'B1',
    skill: 'wortschatz',
    topic: 'Beruf und Ausbildung',
    title: 'Bewerbung und Arbeitsleben',
    subtitle: 'Zentrale Verben und Nomen rund um den Beruf',
    difficulty: 'Mittel',
    durationMinutes: 10,
    formatLabel: 'Wortschatz · Zuordnung',
    instructions: 'Ordne die Berufsbegriffe den passenden Bedeutungen zu.',
    questions: [
      {
        id: 'b1-wort-1-q1',
        type: 'matching',
        question: 'Verbinde die deutschen Begriffe mit der indonesischen Bedeutung.',
        translationDirection: 'de-to-id',
        matchingPairs: [
          { left: 'die Bewerbung', right: 'lamaran kerja' },
          { left: 'der Lebenslauf', right: 'daftar riwayat hidup (CV)' },
          { left: 'das Vorstellungsgespräch', right: 'wawancara kerja' },
          { left: 'die Berufserfahrung', right: 'pengalaman kerja' },
        ],
        explanationId:
          'Keempat istilah ini adalah kosakata utama saat melamar pekerjaan di negara berbahasa Jerman.',
        points: 20,
      },
    ],
  },
  {
    id: 'b1-wortschatz-2',
    level: 'B1',
    skill: 'wortschatz',
    topic: 'Umwelt',
    title: 'Klima, Energie und Nachhaltigkeit',
    subtitle: 'Umweltbegriffe im Satzkontext anwenden',
    difficulty: 'Mittel',
    durationMinutes: 10,
    formatLabel: 'Wortschatz · Lückentext & Multiple-Choice',
    instructions: 'Ergänze das passende Wort.',
    questions: [
      {
        id: 'b1-wort-2-q1',
        type: 'multiple-choice',
        question: 'Welche Übersetzung passt zu „nachhaltig“?',
        translationDirection: 'de-to-id',
        options: ['berkelanjutan', 'sementara', 'berbahaya'],
        correctAnswer: 'berkelanjutan',
        explanationId:
          '"nachhaltig" berarti berkelanjutan atau ramah lingkungan dalam jangka panjang.',
        points: 10,
      },
      {
        id: 'b1-wort-2-q2',
        type: 'fill-blank',
        question: 'Sonne und Wind liefern erneuerbare ___. (energi)',
        correctAnswer: 'Energie',
        acceptableAnswers: ['Energie', 'Energien'],
        explanationId:
          '"erneuerbare Energie(n)" berarti energi terbarukan.',
        points: 10,
      },
    ],
  },
  {
    id: 'b1-wortschatz-3',
    level: 'B1',
    skill: 'wortschatz',
    topic: 'Meinungen äußern',
    title: 'Redemittel für Diskussionen',
    subtitle: 'Argumente präzise einleiten und verbinden',
    difficulty: 'Mittel',
    durationMinutes: 10,
    formatLabel: 'Wortschatz · Übersetzung',
    instructions: 'Wähle die treffende Entsprechung.',
    questions: [
      {
        id: 'b1-wort-3-q1',
        type: 'short-answer',
        question: 'Ergänze das Verb: „Ich bin davon ___, dass Bildung für alle kostenlos sein sollte.“ (yakin)',
        translationDirection: 'id-to-de',
        correctAnswer: 'überzeugt',
        acceptableAnswers: ['überzeugt'],
        explanationId:
          'Ungkapan "davon überzeugt sein, dass..." berarti yakin sepenuhnya bahwa...',
        points: 10,
      },
      {
        id: 'b1-wort-3-q2',
        type: 'multiple-choice',
        question: 'Was bedeutet „einerseits ... andererseits“?',
        translationDirection: 'de-to-id',
        options: [
          'di satu sisi ... di sisi lain',
          'selain itu ... oleh karena itu',
          'bukan hanya ... melainkan juga',
        ],
        correctAnswer: 'di satu sisi ... di sisi lain',
        explanationId:
          'Konektor dua bagian ini digunakan untuk membandingkan dua aspek berbeda dari satu topik.',
        points: 10,
      },
    ],
  },
];
