import { Exercise } from '../../types/exercise';

export const A1_EXERCISES: Exercise[] = [
  // ================= LESEN A1 (3) =================
  {
    id: 'a1-lesen-1',
    level: 'A1',
    skill: 'lesen',
    topic: 'Begrüßung und Vorstellung',
    title: 'Neue Kursteilnehmer im Deutschkurs',
    subtitle: 'Kurze Vorstellungen lesen und Details verstehen',
    difficulty: 'Leicht',
    durationMinutes: 8,
    formatLabel: 'Leseverstehen · Multiple-Choice',
    instructions: 'Lies die Nachricht aufmerksam und wähle die richtige Antwort.',
    passageTitle: 'Nachricht im Kursforum',
    passageType: 'Mitteilung',
    passage:
      'Hallo zusammen! Ich heiße Lukas, bin 26 Jahre alt und komme aus Österreich. Seit zwei Wochen wohne ich in Berlin. Am Dienstag und Donnerstag habe ich vormittags Deutschkurs. In meiner Freizeit spiele ich gern Fußball und koche für meine Freunde.',
    questions: [
      {
        id: 'a1-lesen-1-q1',
        type: 'multiple-choice',
        question: 'Woher kommt Lukas?',
        options: ['Aus Deutschland', 'Aus Österreich', 'Aus der Schweiz'],
        correctAnswer: 'Aus Österreich',
        explanationId:
          'Pada kalimat kedua tertulis "und komme aus Österreich", yang berarti Lukas berasal dari Austria (Österreich).',
        keyVocabulary: [
          { de: 'kommen aus', id: 'berasal dari' },
          { de: 'wohnen', id: 'tinggal' },
        ],
        grammarNoteId: 'Preposisi "aus" selalu digunakan untuk menyatakan negara atau kota asal.',
        points: 10,
      },
      {
        id: 'a1-lesen-1-q2',
        type: 'multiple-choice',
        question: 'Wann besucht Lukas den Deutschkurs?',
        options: [
          'Am Dienstag und Donnerstag vormittags',
          'Jeden Samstagabend',
          'Nur am Montag nachmittags',
        ],
        correctAnswer: 'Am Dienstag und Donnerstag vormittags',
        explanationId:
          'Kalimat keempat menyebutkan "Am Dienstag und Donnerstag habe ich vormittags Deutschkurs" (hari Selasa dan Kamis pagi menjelang siang).',
        keyVocabulary: [
          { de: 'vormittags', id: 'pada pagi/menjelang siang hari' },
          { de: 'der Deutschkurs', id: 'kursus bahasa Jerman' },
        ],
        points: 10,
      },
      {
        id: 'a1-lesen-1-q3',
        type: 'true-false',
        question: 'Lukas wohnt schon seit zwei Jahren in Berlin.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationId:
          'Pernyataan ini salah (Falsch) karena teks menyatakan "Seit zwei Wochen wohne ich in Berlin" (baru dua minggu, bukan dua tahun).',
        keyVocabulary: [
          { de: 'seit zwei Wochen', id: 'sejak dua minggu' },
          { de: 'das Jahr / die Jahre', id: 'tahun' },
        ],
        points: 10,
      },
    ],
  },
  {
    id: 'a1-lesen-2',
    level: 'A1',
    skill: 'lesen',
    topic: 'Essen und Trinken',
    title: 'Einladung und Speisekarte im Café',
    subtitle: 'E-Mails und Angebote im Alltag richtig erfassen',
    difficulty: 'Leicht',
    durationMinutes: 10,
    formatLabel: 'Leseverstehen · Richtig / Falsch & Lückentext',
    instructions: 'Lies den Text und beantworte die Fragen.',
    passageTitle: 'Café Sonnenschein – Wochenangebot',
    passageType: 'Anzeige',
    passage:
      'Café Sonnenschein: Frühstück täglich von 08:00 bis 11:30 Uhr. Unser Tagesmenü am Mittwoch: Tomatensuppe mit frischem Brot (5,50 €) oder Käsekuchen mit Kaffee (6,20 €). Am Sonntag ist das Café geschlossen.',
    questions: [
      {
        id: 'a1-lesen-2-q1',
        type: 'multiple-choice',
        question: 'Bis wann kann man im Café Sonnenschein frühstücken?',
        options: ['Bis 10:00 Uhr', 'Bis 11:30 Uhr', 'Bis 14:00 Uhr'],
        correctAnswer: 'Bis 11:30 Uhr',
        explanationId:
          'Pada iklan tertulis "Frühstück täglich von 08:00 bis 11:30 Uhr", artinya sarapan tersedia setiap hari hingga pukul 11:30.',
        keyVocabulary: [
          { de: 'täglich', id: 'setiap hari' },
          { de: 'das Frühstück', id: 'sarapan' },
        ],
        points: 10,
      },
      {
        id: 'a1-lesen-2-q2',
        type: 'true-false',
        question: 'Man kann am Sonntag im Café frühstücken.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationId:
          'Salah (Falsch), karena kalimat terakhir menyatakan "Am Sonntag ist das Café geschlossen" (tutup pada hari Minggu).',
        keyVocabulary: [{ de: 'geschlossen', id: 'tutup' }],
        points: 10,
      },
      {
        id: 'a1-lesen-2-q3',
        type: 'fill-blank',
        question: 'Ergänze das fehlende Wort: Die Tomatensuppe kostet ___ Euro fünfzig.',
        correctAnswer: 'fünf',
        acceptableAnswers: ['fünf', '5'],
        explanationId:
          'Harga sup tomat adalah 5,50 €, yang dalam bahasa Jerman dibaca "fünf Euro fünfzig".',
        keyVocabulary: [{ de: 'kosten', id: 'berharga' }],
        points: 10,
      },
    ],
  },
  {
    id: 'a1-lesen-3',
    level: 'A1',
    skill: 'lesen',
    topic: 'Termine',
    title: 'Geburtstagsparty und Zuordnung',
    subtitle: 'Einladung lesen und Informationen zuordnen',
    difficulty: 'Leicht',
    durationMinutes: 10,
    formatLabel: 'Leseverstehen · Textzuordnung',
    instructions: 'Lies die E-Mail und löse die Aufgaben.',
    passageTitle: 'E-Mail von Anna',
    passageType: 'E-Mail',
    passage:
      'Liebe Maria, am Samstag mache ich eine Geburtstagsparty. Die Party beginnt um 18:00 Uhr bei mir zu Hause in der Bahnhofstraße 12. Kannst du bitte einen Salat mitbringen? Thomas bringt Getränke mit. Viele Grüße, Anna',
    questions: [
      {
        id: 'a1-lesen-3-q1',
        type: 'multiple-choice',
        question: 'Wann beginnt die Party?',
        options: ['Um 16:00 Uhr', 'Um 18:00 Uhr', 'Um 20:00 Uhr'],
        correctAnswer: 'Um 18:00 Uhr',
        explanationId:
          'Di dalam email tertulis "Die Party beginnt um 18:00 Uhr", jadi pesta dimulai pukul 18.00.',
        keyVocabulary: [{ de: 'beginnen', id: 'dimulai' }],
        grammarNoteId: 'Untuk menyebut jam yang tepat dalam bahasa Jerman digunakan preposisi "um".',
        points: 10,
      },
      {
        id: 'a1-lesen-3-q2',
        type: 'matching',
        question: 'Ordne die Personen den passenden Informationen aus der E-Mail zu.',
        matchingPairs: [
          { left: 'Anna', right: 'macht die Party' },
          { left: 'Maria', right: 'soll einen Salat mitbringen' },
          { left: 'Thomas', right: 'bringt Getränke mit' },
        ],
        explanationId:
          'Anna adalah tuan rumah pesta, Maria diminta membawa salad ("einen Salat mitbringen"), dan Thomas membawa minuman ("Getränke").',
        keyVocabulary: [{ de: 'mitbringen', id: 'membawa serta' }],
        points: 15,
      },
    ],
  },

  // ================= HÖREN A1 (3) =================
  {
    id: 'a1-hoeren-1',
    level: 'A1',
    skill: 'hoeren',
    topic: 'Zahlen und Uhrzeit',
    title: 'Durchsage am Hauptbahnhof',
    subtitle: 'Gleisnummer und Abfahrtszeit verstehen',
    difficulty: 'Leicht',
    durationMinutes: 8,
    formatLabel: 'Hörverstehen · Durchsage',
    instructions: 'Höre die Durchsage und wähle die richtige Antwort.',
    audioStatus: 'pending',
    transcript:
      'Achtung am Gleis 4: Der Regionalexpress nach Hamburg, planmäßige Abfahrt 14:20 Uhr, fährt heute zehn Minuten später von Gleis 7 ab. Wir bitten um Entschuldigung.',
    questions: [
      {
        id: 'a1-hoeren-1-q1',
        type: 'multiple-choice',
        question: 'Von welchem Gleis fährt der Zug heute ab?',
        options: ['Gleis 4', 'Gleis 7', 'Gleis 10'],
        correctAnswer: 'Gleis 7',
        explanationId:
          'Pengumuman menyebutkan bahwa kereta seharusnya di peron 4, tetapi hari ini berangkat dari peron 7 ("von Gleis 7 ab").',
        keyVocabulary: [
          { de: 'das Gleis', id: 'peron / jalur kereta' },
          { de: 'die Abfahrt', id: 'keberangkatan' },
        ],
        points: 10,
      },
      {
        id: 'a1-hoeren-1-q2',
        type: 'multiple-choice',
        question: 'Wie viele Minuten Verspätung hat der Zug?',
        options: ['5 Minuten', '10 Minuten', '20 Minuten'],
        correctAnswer: '10 Minuten',
        explanationId:
          'Kalimat "fährt heute zehn Minuten später ab" berarti kereta berangkat 10 menit lebih lambat.',
        keyVocabulary: [{ de: 'später', id: 'lebih lambat' }],
        points: 10,
      },
    ],
  },
  {
    id: 'a1-hoeren-2',
    level: 'A1',
    skill: 'hoeren',
    topic: 'Einkaufen',
    title: 'Im Supermarkt an der Kasse',
    subtitle: 'Preise und Zahlungsarten im kurzen Dialog erfassen',
    difficulty: 'Leicht',
    durationMinutes: 8,
    formatLabel: 'Hörverstehen · Alltagsdialog',
    instructions: 'Höre das Gespräch an der Kasse und beantworte die Fragen.',
    audioStatus: 'pending',
    transcript:
      'Kassiererin: Guten Tag! Haben Sie eine Kundenkarte? Kunde: Nein, leider nicht. Kassiererin: Kein Problem. Das macht zusammen 14 Euro 80. Möchten Sie bar oder mit Karte zahlen? Kunde: Mit Karte, bitte.',
    questions: [
      {
        id: 'a1-hoeren-2-q1',
        type: 'multiple-choice',
        question: 'Wie viel muss der Kunde bezahlen?',
        options: ['14,08 Euro', '14,80 Euro', '40,80 Euro'],
        correctAnswer: '14,80 Euro',
        explanationId:
          'Kasir menyebutkan "14 Euro 80", yaitu 14,80 Euro.',
        keyVocabulary: [
          { de: 'zusammen', id: 'total / semuanya' },
          { de: 'zahlen', id: 'membayar' },
        ],
        points: 10,
      },
      {
        id: 'a1-hoeren-2-q2',
        type: 'true-false',
        question: 'Der Kunde bezahlt mit Bargeld.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationId:
          'Salah (Falsch), karena pelanggan menjawab "Mit Karte, bitte" (membayar dengan kartu, bukan tunai/Bargeld).',
        keyVocabulary: [
          { de: 'bar zahlen', id: 'membayar tunai' },
          { de: 'mit Karte zahlen', id: 'membayar dengan kartu' },
        ],
        points: 10,
      },
    ],
  },
  {
    id: 'a1-hoeren-3',
    level: 'A1',
    skill: 'hoeren',
    topic: 'Alltag',
    title: 'Telefonnachricht von Sabine',
    subtitle: 'Wichtige Informationen aus einer Mailbox-Nachricht notieren',
    difficulty: 'Mittel',
    durationMinutes: 10,
    formatLabel: 'Hörverstehen · Telefonansage',
    instructions: 'Höre die Nachricht und ergänze die fehlenden Angaben.',
    audioStatus: 'pending',
    transcript:
      'Hallo Paul, hier ist Sabine. Ich kaufe heute Nachmittag Brot und Käse ein. Könntest du bitte noch zwei Liter Milch holen? Ruf mich unter der Nummer 45821 zurück. Bis heute Abend!',
    questions: [
      {
        id: 'a1-hoeren-3-q1',
        type: 'multiple-choice',
        question: 'Was soll Paul noch einkaufen?',
        options: ['Brot und Käse', 'Zwei Liter Milch', 'Wasser und Obst'],
        correctAnswer: 'Zwei Liter Milch',
        explanationId:
          'Sabine sudah membeli roti dan keju, dan meminta Paul membeli dua liter susu ("zwei Liter Milch holen").',
        keyVocabulary: [{ de: 'holen', id: 'mengambil / membelikan' }],
        points: 10,
      },
      {
        id: 'a1-hoeren-3-q2',
        type: 'fill-blank',
        question: 'Wie lautet Sabines Telefonnummer? Nummer: ___',
        correctAnswer: '45821',
        acceptableAnswers: ['45821'],
        explanationId:
          'Nomor telepon yang disebutkan di akhir pesan adalah 45821.',
        keyVocabulary: [{ de: 'zurückrufen', id: 'menelepon balik' }],
        points: 10,
      },
    ],
  },

  // ================= SPRECHEN A1 (3) =================
  {
    id: 'a1-sprechen-1',
    level: 'A1',
    skill: 'sprechen',
    topic: 'Begrüßung und Vorstellung',
    title: 'Sich persönlich vorstellen',
    subtitle: 'Name, Herkunft, Wohnort, Sprachen und Hobbys nennen',
    difficulty: 'Leicht',
    durationMinutes: 10,
    formatLabel: 'Sprechen · Teil 1 (Monolog)',
    instructions:
      'Bereite eine kurze Vorstellung vor und sprich 4 bis 6 einfache Sätze laut auf Deutsch.',
    questions: [
      {
        id: 'a1-sprechen-1-q1',
        type: 'speaking-task',
        question:
          'Stelle dich vor. Nenne dabei: Name, Alter, Land, Wohnort, Sprachen und zwei Hobbys.',
        preparationSeconds: 60,
        speakingDurationSeconds: 90,
        checklist: [
          'Ich habe meinen Namen und mein Alter genannt.',
          'Ich habe gesagt, woher ich komme und wo ich wohne.',
          'Ich habe meine Sprachen erwähnt.',
          'Ich habe zwei Hobbys mit „gern“ formuliert.',
        ],
        rubricCriteria: [
          {
            criterion: 'Vollständigkeit',
            descriptionId: 'Semua 6 poin informasi diri disebutkan dengan jelas.',
          },
          {
            criterion: 'Verständlichkeit',
            descriptionId: 'Pengucapan jelas dengan tempo kalimat sederhana yang teratur.',
          },
          {
            criterion: 'Grammatik A1',
            descriptionId: 'Konjugasi kata kerja dasar (ich heiße, ich komme, ich wohne) tepat.',
          },
        ],
        sampleAnswer:
          'Hallo! Ich heiße Budi und bin 24 Jahre alt. Ich komme aus Indonesien und wohne jetzt in Jakarta. Ich spreche Indonesisch, Englisch und ein bisschen Deutsch. In meiner Freizeit lese ich gern und spiele Badminton.',
        explanationId:
          'Pada ujian sprechen A1 (Goethe/telc Bagian 1), memperkenalkan diri dengan kalimat pendek namun jelas sudah mendapat nilai penuh. Gunakan pola "Ich heiße...", "Ich komme aus...", "Ich wohne in...".',
        points: 20,
      },
    ],
  },
  {
    id: 'a1-sprechen-2',
    level: 'A1',
    skill: 'sprechen',
    topic: 'Familie und Freunde',
    title: 'Über die Familie sprechen',
    subtitle: 'Familienmitglieder und Berufe einfach beschreiben',
    difficulty: 'Leicht',
    durationMinutes: 10,
    formatLabel: 'Sprechen · Fragen beantworten',
    instructions: 'Beantworte die Leitfragen mündlich in vollständigen Sätzen.',
    questions: [
      {
        id: 'a1-sprechen-2-q1',
        type: 'speaking-task',
        question:
          'Wie groß ist deine Familie? Hast du Geschwister? Wo wohnen deine Eltern und was machen sie beruflich?',
        preparationSeconds: 45,
        speakingDurationSeconds: 90,
        checklist: [
          'Ich habe die Anzahl der Familienmitglieder genannt.',
          'Ich habe über Geschwister gesprochen („Ich habe einen Bruder / keine Geschwister“).',
          'Ich habe einen Beruf auf Deutsch genannt.',
        ],
        rubricCriteria: [
          {
            criterion: 'Wortschatz Familie',
            descriptionId: 'Menggunakan kosakata keluarga yang tepat (Eltern, Bruder, Schwester).',
          },
          {
            criterion: 'Artikel & Akkusativ',
            descriptionId: 'Bentuk "Ich habe einen Bruder / eine Schwester" tepat.',
          },
        ],
        sampleAnswer:
          'Meine Familie ist mittelgroß. Ich habe einen Bruder und eine Schwester. Meine Eltern wohnen in Bandung. Mein Vater arbeitet als Lehrer und meine Mutter ist Ärztin.',
        explanationId:
          'Saat menjawab pertanyaan tentang keluarga, perhatikan penggunaan kasus Akkusativ setelah kata kerja "haben": maskulin menjadi "einen Bruder", feminin tetap "eine Schwester".',
        points: 20,
      },
    ],
  },
  {
    id: 'a1-sprechen-3',
    level: 'A1',
    skill: 'sprechen',
    topic: 'Alltag',
    title: 'Den eigenen Tagesablauf beschreiben',
    subtitle: 'Uhrzeiten und tägliche Aktivitäten mündlich schildern',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Sprechen · Alltag beschreiben',
    instructions: 'Beschreibe deinen typischen Tag vom Morgen bis zum Abend.',
    questions: [
      {
        id: 'a1-sprechen-3-q1',
        type: 'speaking-task',
        question:
          'Wann stehst du auf? Wann frühstückst du? Was machst du vormittags und am Abend?',
        preparationSeconds: 60,
        speakingDurationSeconds: 120,
        checklist: [
          'Ich habe mindestens drei Uhrzeiten mit „um“ genannt.',
          'Ich habe trennbare Verben korrekt benutzt (aufstehen, einkaufen).',
          'Ich habe eine klare zeitliche Reihenfolge eingehalten.',
        ],
        rubricCriteria: [
          {
            criterion: 'Zeitangaben',
            descriptionId: 'Penggunaan keterangan waktu (morgens, um 7 Uhr, am Abend) jelas.',
          },
          {
            criterion: 'Satzbau',
            descriptionId: 'Kata kerja terpisah (ich stehe um 6 Uhr auf) ditempatkan dengan benar.',
          },
        ],
        sampleAnswer:
          'Ich stehe jeden Tag um 6:30 Uhr auf. Um 7:00 Uhr frühstücke ich und trinke Kaffee. Von 9:00 bis 16:00 Uhr arbeite ich. Am Abend koche ich, lerne Deutsch und gehe um 22:30 Uhr schlafen.',
        explanationId:
          'Kata kerja terpisah (trennbare Verben) seperti "aufstehen" atau "fernsehen" meletakkan awalan (auf-, fern-) di paling akhir kalimat utama.',
        points: 20,
      },
    ],
  },

  // ================= SCHREIBEN A1 (3) =================
  {
    id: 'a1-schreiben-1',
    level: 'A1',
    skill: 'schreiben',
    topic: 'Freizeit',
    title: 'Kurze Einladung an einen Freund',
    subtitle: 'Einfache E-Mail mit drei Inhaltspunkten verfassen',
    difficulty: 'Leicht',
    durationMinutes: 15,
    formatLabel: 'Schreiben · Kurze E-Mail',
    instructions:
      'Schreibe eine kurze E-Mail (25 bis 50 Wörter) an deinen Freund Tim. Bearbeite alle drei Punkte.',
    questions: [
      {
        id: 'a1-schreiben-1-q1',
        type: 'writing-task',
        question:
          'Du möchtest am Sonntag zusammen ins Kino gehen. Schreibe an Tim: 1. Wann möchtest du gehen? 2. Welchen Film wollt ihr sehen? 3. Wo trefft ihr euch?',
        wordLimit: { min: 25, max: 60 },
        checklist: [
          'Anrede („Lieber Tim,“) und Gruß („Viele Grüße“) verwendet',
          'Tag und Uhrzeit genannt',
          'Filmvorschlag gemacht',
          'Treffpunkt genau angegeben',
        ],
        rubricCriteria: [
          {
            criterion: 'Inhaltspunkte',
            descriptionId: 'Ketiga poin pertanyaan (kapan, film apa, bertemu di mana) terjawab.',
          },
          {
            criterion: 'Textform',
            descriptionId: 'Memiliki salam pembuka (Anrede) dan salam penutup (Grußformel).',
          },
          {
            criterion: 'Sprachliche Richtigkeit',
            descriptionId: 'Posisi kata kerja di posisi ke-2 dan penggunaan huruf kapital pada kata benda.',
          },
        ],
        sampleAnswer:
          'Lieber Tim,\n\nhast du am Sonntag um 17:00 Uhr Zeit? Ich möchte gern ins Kino gehen. Wir können die neue Komödie sehen. Wir treffen uns um 16:45 Uhr vor dem Kino.\n\nViele Grüße,\nLukas',
        explanationId:
          'Pada level A1, pesan singkat tidak harus panjang, namun wajib mencakup semua poin tugas serta memiliki sapaan pembuka ("Lieber Tim,") dan penutup ("Viele Grüße").',
        points: 25,
      },
    ],
  },
  {
    id: 'a1-schreiben-2',
    level: 'A1',
    skill: 'schreiben',
    topic: 'Wohnen',
    title: 'Nachricht über die neue Wohnung',
    subtitle: 'Einfache Sätze über Zimmer und Lage schreiben',
    difficulty: 'Leicht',
    durationMinutes: 15,
    formatLabel: 'Schreiben · Kurznachricht',
    instructions: 'Schreibe deiner Freundin Julia eine kurze Nachricht über deine neue Wohnung.',
    questions: [
      {
        id: 'a1-schreiben-2-q1',
        type: 'writing-task',
        question:
          'Schreibe über deine neue Wohnung: 1. Wo liegt die Wohnung? 2. Wie viele Zimmer hat sie? 3. Lade Julia am Wochenende ein.',
        wordLimit: { min: 25, max: 60 },
        checklist: [
          'Ort oder Stadtteil genannt',
          'Anzahl der Zimmer beschrieben',
          'Eine Einladung formuliert',
        ],
        rubricCriteria: [
          {
            criterion: 'Aufgabenerfüllung',
            descriptionId: 'Lokasi, jumlah kamar, dan ajakan akhir pekan ditulis jelas.',
          },
          {
            criterion: 'Wortschatz',
            descriptionId: 'Kosakata tempat tinggal (Zimmer, Küche, Balkon, zentral) digunakan tepat.',
          },
        ],
        sampleAnswer:
          'Liebe Julia,\n\nich habe jetzt eine neue Wohnung im Zentrum. Sie hat zwei Zimmer, eine kleine Küche und einen Balkon. Möchtest du mich am Samstag besuchen? Ich koche für uns!\n\nLiebe Grüße,\nNina',
        explanationId:
          'Perhatikan bahwa kata benda bahasa Jerman selalu diawali huruf besar (Wohnung, Zimmer, Küche, Samstag).',
        points: 25,
      },
    ],
  },
  {
    id: 'a1-schreiben-3',
    level: 'A1',
    skill: 'schreiben',
    topic: 'Arbeit und Beruf',
    title: 'Anmeldung im Sprachbüro',
    subtitle: 'Persönliche Angaben schriftlich mitteilen',
    difficulty: 'Mittel',
    durationMinutes: 15,
    formatLabel: 'Schreiben · Formelle E-Mail',
    instructions:
      'Schreibe eine höfliche E-Mail an die Sprachschule „Deutsch Aktiv“. Beantworte alle Punkte.',
    questions: [
      {
        id: 'a1-schreiben-3-q1',
        type: 'writing-task',
        question:
          'Du möchtest einen A1-Abendkurs besuchen. Schreibe an Frau Klein: 1. Stelle dich kurz vor (Name und Beruf). 2. Wann hast du Zeit? 3. Frage nach dem Kurspreis.',
        wordLimit: { min: 30, max: 70 },
        checklist: [
          'Formelle Anrede („Sehr geehrte Frau Klein,“) genutzt',
          'Name und Beruf angegeben',
          'Passende Uhrzeit genannt',
          'Frage nach dem Preis gestellt und formell gegrüßt',
        ],
        rubricCriteria: [
          {
            criterion: 'Register (Sie-Form)',
            descriptionId: 'Menggunakan sapaan formal "Sehr geehrte Frau..." dan "Mit freundlichen Grüßen".',
          },
          {
            criterion: 'Inhalt',
            descriptionId: 'Ketiga poin informasi (perkenalan, waktu luang, pertanyaan harga) lengkap.',
          },
        ],
        sampleAnswer:
          'Sehr geehrte Frau Klein,\n\nich heiße Tariq und arbeite als Ingenieur. Ich möchte gern einen Deutschkurs A1 besuchen. Ich habe ab 18:00 Uhr Zeit. Wie viel kostet der Abendkurs?\n\nMit freundlichen Grüßen\nTariq Ahmad',
        explanationId:
          'Untuk email formal kepada staf atau guru yang belum dikenal akrab, gunakan "Sehr geehrte Frau..." atau "Sehr geehrter Herr..." dan tutup dengan "Mit freundlichen Grüßen".',
        points: 25,
      },
    ],
  },

  // ================= GRAMMATIK A1 (3) =================
  {
    id: 'a1-grammatik-1',
    level: 'A1',
    skill: 'grammatik',
    topic: 'Begrüßung und Vorstellung',
    title: 'Personalpronomen, „sein“ und „haben“',
    subtitle: 'Grundlegende Verbformen im Präsens sicher anwenden',
    difficulty: 'Leicht',
    durationMinutes: 10,
    formatLabel: 'Grammatik · Multiple-Choice & Lückentext',
    instructions: 'Wähle oder ergänze die grammatisch richtige Form.',
    questions: [
      {
        id: 'a1-gram-1-q1',
        type: 'multiple-choice',
        question: 'Meine Schwester und ich ___ aus Surabaya.',
        options: ['bin', 'sind', 'seid'],
        correctAnswer: 'sind',
        explanationId:
          '"Meine Schwester und ich" sama dengan kata ganti "wir" (kami). Konjugasi kata kerja "sein" untuk "wir" adalah "sind".',
        grammarNoteId: 'sein: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.',
        points: 10,
      },
      {
        id: 'a1-gram-1-q2',
        type: 'fill-blank',
        question: 'Ergänze das Verb „haben“: Wie viele Geschwister ___ du?',
        correctAnswer: 'hast',
        acceptableAnswers: ['hast'],
        explanationId:
          'Untuk subjek "du", bentuk kata kerja "haben" adalah "hast" (tanpa huruf b).',
        grammarNoteId: 'haben: ich habe, du hast, er/sie/es hat, wir haben.',
        points: 10,
      },
      {
        id: 'a1-gram-1-q3',
        type: 'multiple-choice',
        question: 'Guten Tag, Frau Weber! Wie ___ es Ihnen?',
        options: ['geht', 'gehst', 'gehen'],
        correctAnswer: 'geht',
        explanationId:
          'Subjek kalimatnya adalah "es" (kata ganti netral tunggal), sehingga bentuk kata kerja "gehen" menjadi "geht".',
        points: 10,
      },
    ],
  },
  {
    id: 'a1-grammatik-2',
    level: 'A1',
    skill: 'grammatik',
    topic: 'Einkaufen',
    title: 'Artikel, Nominativ und Akkusativ',
    subtitle: 'Bestimmte und unbestimmte Artikel richtig unterscheiden',
    difficulty: 'Leicht',
    durationMinutes: 10,
    formatLabel: 'Grammatik · Artikeltraining',
    instructions: 'Wähle den passenden Artikel im Nominativ oder Akkusativ.',
    questions: [
      {
        id: 'a1-gram-2-q1',
        type: 'multiple-choice',
        question: 'Ich kaufe ___ Apfel und eine Banane. (der Apfel)',
        options: ['ein', 'einen', 'eine'],
        correctAnswer: 'einen',
        explanationId:
          'Kata kerja "kaufen" menuntut objek Akkusativ. Karena "Apfel" maskulin (der Apfel), artikel tak tentu "ein" berubah menjadi "einen" di Akkusativ.',
        grammarNoteId: 'Maskulin di Akkusativ selalu berubah: der → den, ein → einen, kein → keinen.',
        points: 10,
      },
      {
        id: 'a1-gram-2-q2',
        type: 'multiple-choice',
        question: '___ Kaffee hier schmeckt sehr gut. (der Kaffee)',
        options: ['Der', 'Den', 'Das'],
        correctAnswer: 'Der',
        explanationId:
          '"Der Kaffee" adalah subjek kalimat (Nominativ), sehingga tetap memakai "Der".',
        points: 10,
      },
      {
        id: 'a1-gram-2-q3',
        type: 'fill-blank',
        question: 'Negation: Ich habe ___ Zeit heute. (die Zeit)',
        correctAnswer: 'keine',
        acceptableAnswers: ['keine'],
        explanationId:
          'Karena "Zeit" berjenis kelamin feminin (die Zeit), bentuk penyangkalan kata benda adalah "keine".',
        points: 10,
      },
    ],
  },
  {
    id: 'a1-grammatik-3',
    level: 'A1',
    skill: 'grammatik',
    topic: 'Alltag',
    title: 'W-Fragen, Satzstellung und Modalverben',
    subtitle: 'Verbposition im deutschen Satz beherrschen',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Grammatik · Satzbau',
    instructions: 'Prüfe die Wortstellung und wähle die korrekte Lösung.',
    questions: [
      {
        id: 'a1-gram-3-q1',
        type: 'multiple-choice',
        question: 'Welcher Satz ist grammatisch richtig?',
        options: [
          'Am Samstag ich fahre nach Köln.',
          'Am Samstag fahre ich nach Köln.',
          'Am Samstag nach Köln ich fahre.',
        ],
        correctAnswer: 'Am Samstag fahre ich nach Köln.',
        explanationId:
          'Dalam kalimat berita bahasa Jerman, kata kerja terkonjugasi (fahre) wajib berada di posisi ke-2. Karena "Am Samstag" menempati posisi ke-1, subjek "ich" pindah ke posisi ke-3 (inversi).',
        points: 10,
      },
      {
        id: 'a1-gram-3-q2',
        type: 'multiple-choice',
        question: '___ wohnst du? – In Hamburg.',
        options: ['Wer', 'Wo', 'Wohin'],
        correctAnswer: 'Wo',
        explanationId:
          'Kata tanya "Wo" menanyakan lokasi diam (di mana). "Wohin" berarti ke mana, dan "Wer" berarti siapa.',
        points: 10,
      },
      {
        id: 'a1-gram-3-q3',
        type: 'fill-blank',
        question: 'Modalverb „können“: Wir ___ morgen leider nicht kommen.',
        correctAnswer: 'können',
        acceptableAnswers: ['können'],
        explanationId:
          'Subjek "wir" menggunakan bentuk dasar "können", sedangkan kata kerja kedua "kommen" berada dalam bentuk infinitif di akhir kalimat.',
        points: 10,
      },
    ],
  },

  // ================= WORTSCHATZ A1 (3) =================
  {
    id: 'a1-wortschatz-1',
    level: 'A1',
    skill: 'wortschatz',
    topic: 'Essen und Trinken',
    title: 'Lebensmittel und Artikel (der, die, das)',
    subtitle: 'Grundwortschatz rund ums Essen und Trinken festigen',
    difficulty: 'Leicht',
    durationMinutes: 8,
    formatLabel: 'Wortschatz · Zuordnung & Artikel',
    instructions: 'Löse die Wortschatzaufgaben zu Essen und Trinken.',
    questions: [
      {
        id: 'a1-wort-1-q1',
        type: 'matching',
        question: 'Ordne die deutschen Wörter den passenden indonesischen Bedeutungen zu.',
        translationDirection: 'de-to-id',
        matchingPairs: [
          { left: 'das Brot', right: 'roti' },
          { left: 'das Wasser', right: 'air' },
          { left: 'der Käse', right: 'keju' },
          { left: 'die Kartoffel', right: 'kentang' },
        ],
        explanationId:
          'das Brot = roti, das Wasser = air, der Käse = keju, die Kartoffel = kentang. Biasakan selalu menghafal kata benda bersama artikelnya.',
        points: 20,
      },
      {
        id: 'a1-wort-1-q2',
        type: 'multiple-choice',
        question: 'Welcher Artikel gehört zu „Tasse“?',
        options: ['der', 'die', 'das'],
        correctAnswer: 'die',
        explanationId:
          'Kata benda yang berakhiran "-e" hampir selalu berjenis kelamin feminin: die Tasse (cangkir).',
        points: 10,
      },
    ],
  },
  {
    id: 'a1-wortschatz-2',
    level: 'A1',
    skill: 'wortschatz',
    topic: 'Zahlen und Uhrzeit',
    title: 'Zeitausdrücke im Alltag',
    subtitle: 'Wochentage, Tageszeiten und Uhrzeiten sicher verwenden',
    difficulty: 'Leicht',
    durationMinutes: 8,
    formatLabel: 'Wortschatz · Übersetzung & Lückentext',
    instructions: 'Wähle oder schreibe die richtige Übersetzung bzw. das passende Wort.',
    questions: [
      {
        id: 'a1-wort-2-q1',
        type: 'short-answer',
        question: 'Übersetze ins Deutsche (nur das Wort): „tepat waktu“',
        translationDirection: 'id-to-de',
        correctAnswer: 'pünktlich',
        acceptableAnswers: ['pünktlich'],
        explanationId:
          'Kata sifat "pünktlich" berarti tepat waktu (misalnya: Der Bus kommt pünktlich).',
        points: 10,
      },
      {
        id: 'a1-wort-2-q2',
        type: 'multiple-choice',
        question: 'Was bedeutet „übermorgen“ auf Indonesisch?',
        translationDirection: 'de-to-id',
        options: ['kemarin', 'lusa', 'minggu depan'],
        correctAnswer: 'lusa',
        explanationId:
          '"morgen" = besok, "übermorgen" = lusa (dua hari dari sekarang).',
        points: 10,
      },
    ],
  },
  {
    id: 'a1-wortschatz-3',
    level: 'A1',
    skill: 'wortschatz',
    topic: 'Wohnen',
    title: 'Zimmer und Möbel im Haus',
    subtitle: 'Wichtige Nomen und Pluralformen üben',
    difficulty: 'Leicht',
    durationMinutes: 10,
    formatLabel: 'Wortschatz · Plural & Lückentext',
    instructions: 'Ergänze das passende Wort im Kontext.',
    questions: [
      {
        id: 'a1-wort-3-q1',
        type: 'multiple-choice',
        question: 'Wie heißt der Plural von „das Zimmer“?',
        options: ['die Zimmers', 'die Zimmer', 'die Zimmern'],
        correctAnswer: 'die Zimmer',
        explanationId:
          'Banyak kata benda netral dan maskulin yang berakhiran "-er" tidak berubah di bentuk jamak: das Zimmer → die Zimmer.',
        points: 10,
      },
      {
        id: 'a1-wort-3-q2',
        type: 'fill-blank',
        question: 'Ich koche das Abendessen in der ___. (dapur)',
        correctAnswer: 'Küche',
        acceptableAnswers: ['Küche'],
        explanationId:
          '"die Küche" berarti dapur. Di sini digunakan bentuk Dativ setelah preposisi "in" untuk lokasi diam: "in der Küche".',
        points: 10,
      },
    ],
  },
];
