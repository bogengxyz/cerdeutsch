import { Exercise } from '../../types/exercise';

export const A2_EXERCISES: Exercise[] = [
  // ================= LESEN A2 (3) =================
  {
    id: 'a2-lesen-1',
    level: 'A2',
    skill: 'lesen',
    topic: 'Wohnen',
    title: 'Wohnungsanzeige in Köln-Ehrenfeld',
    subtitle: 'Mietkosten, Ausstattung und Bedingungen vergleichen',
    difficulty: 'Leicht',
    durationMinutes: 12,
    formatLabel: 'Leseverstehen · Anzeige',
    instructions: 'Lies die Wohnungsanzeige und prüfe die Aussagen.',
    passageTitle: '2-Zimmer-Wohnung zu vermieten',
    passageType: 'Anzeige',
    passage:
      'Helle 2-Zimmer-Wohnung (54 m²) im 3. Stock ohne Aufzug ab dem 1. Mai zu vermieten. Kaltmiete: 690 €, Nebenkosten: 160 €. Ein kleiner Balkon zum ruhigen Innenhof ist vorhanden. Die U-Bahn-Station liegt drei Minuten zu Fuß entfernt. Haustiere nach Absprache.',
    questions: [
      {
        id: 'a2-lesen-1-q1',
        type: 'multiple-choice',
        question: 'Wie hoch ist die gesamte Miete (Warmmiete) pro Monat?',
        options: ['690 €', '750 €', '850 €'],
        correctAnswer: '850 €',
        explanationId:
          'Kaltmiete (sewa dasar) 690 € ditambah Nebenkosten (biaya tambahan) 160 € sama dengan 850 €.',
        keyVocabulary: [
          { de: 'die Kaltmiete', id: 'sewa dasar tanpa biaya utilitas' },
          { de: 'die Nebenkosten', id: 'biaya tambahan (air, pemanas, dll.)' },
        ],
        points: 10,
      },
      {
        id: 'a2-lesen-1-q2',
        type: 'true-false',
        question: 'In dem Haus gibt es einen Aufzug bis in den dritten Stock.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationId:
          'Salah (Falsch), karena iklan tertulis "im 3. Stock ohne Aufzug" (di lantai 3 tanpa lift).',
        keyVocabulary: [{ de: 'der Aufzug', id: 'lift' }],
        points: 10,
      },
      {
        id: 'a2-lesen-1-q3',
        type: 'multiple-choice',
        question: 'Was stimmt über Haustiere?',
        options: [
          'Haustiere sind streng verboten.',
          'Man muss vorher mit dem Vermieter sprechen.',
          'Nur Hunde sind kostenlos erlaubt.',
        ],
        correctAnswer: 'Man muss vorher mit dem Vermieter sprechen.',
        explanationId:
          'Frasa "nach Absprache" berarti sesuai kesepakatan terlebih dahulu dengan pemilik rumah.',
        points: 10,
      },
    ],
  },
  {
    id: 'a2-lesen-2',
    level: 'A2',
    skill: 'lesen',
    topic: 'Reisen und Urlaub',
    title: 'E-Mail an die Pension Bergblick',
    subtitle: 'Reisepläne und Bitten in einer E-Mail verstehen',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Leseverstehen · E-Mail',
    instructions: 'Lies die E-Mail des Gastes und beantworte die Fragen.',
    passageTitle: 'Anreise am Freitagabend',
    passageType: 'E-Mail',
    passage:
      'Sehr geehrte Frau Weber, wir haben für das kommende Wochenende ein Doppelzimmer reserviert. Leider verspätet sich unser Zug, sodass wir erst gegen 21:30 Uhr ankommen. Könnten Sie uns den Schlüssel bitte an der Rezeption hinterlegen? Vielen Dank im Voraus!',
    questions: [
      {
        id: 'a2-lesen-2-q1',
        type: 'multiple-choice',
        question: 'Warum schreibt der Gast diese E-Mail?',
        options: [
          'Er möchte das Zimmer stornieren.',
          'Er kommt später an und bittet um den Zimmerschlüssel.',
          'Er fragt nach dem Preis für das Frühstück.',
        ],
        correctAnswer: 'Er kommt später an und bittet um den Zimmerschlüssel.',
        explanationId:
          'Kereta tamu terlambat sehingga baru tiba sekitar pukul 21:30 ("verspätet sich unser Zug") dan ia meminta kunci dititipkan di resepsionis.',
        keyVocabulary: [
          { de: 'sich verspäten', id: 'terlambat' },
          { de: 'hinterlegen', id: 'menitipkan' },
        ],
        points: 10,
      },
      {
        id: 'a2-lesen-2-q2',
        type: 'true-false',
        question: 'Der Gast hat ein Einzelzimmer gebucht.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationId:
          'Salah (Falsch). Teks menyatakan "ein Doppelzimmer reserviert" (kamar ganda untuk dua orang, bukan Einzelzimmer).',
        points: 10,
      },
    ],
  },
  {
    id: 'a2-lesen-3',
    level: 'A2',
    skill: 'lesen',
    topic: 'Freizeitaktivitäten',
    title: 'Programm im Stadtteilzentrum',
    subtitle: 'Passende Kurse für verschiedene Personen finden',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Leseverstehen · Textzuordnung',
    instructions: 'Lies die drei Kursangebote und ordne sie den passenden Personen zu.',
    passageTitle: 'Kursprogramm Herbst',
    passageType: 'Informationstext',
    passage:
      'Angebot A – Fotokurs für Anfänger (samstags, 10–13 Uhr): Grundlagen der Kameratechnik und Stadtspaziergang. Angebot B – Kochabend „Italienische Pasta“ (freitags, 18:30 Uhr): Gemeinsam kochen in kleiner Runde. Angebot C – Lauftreff im Park (dienstags und donnerstags, 18:00 Uhr): Fit bleiben an der frischen Luft.',
    questions: [
      {
        id: 'a2-lesen-3-q1',
        type: 'matching',
        question: 'Welches Angebot passt zu welcher Person?',
        matchingPairs: [
          { left: 'Mira arbeitet wochentags und liebt Fotografie.', right: 'Angebot A (Fotokurs)' },
          { left: 'Jonas möchte zweimal pro Woche draußen Sport machen.', right: 'Angebot C (Lauftreff)' },
          { left: 'Leonie kocht gern zusammen mit anderen am Freitag.', right: 'Angebot B (Kochabend)' },
        ],
        explanationId:
          'Mira cocok mengikuti kursus foto hari Sabtu (Angebot A), Jonas ingin berolahraga di luar ruangan dua kali seminggu (Angebot C), dan Leonie ingin memasak pada hari Jumat (Angebot B).',
        points: 15,
      },
    ],
  },

  // ================= HÖREN A2 (3) =================
  {
    id: 'a2-hoeren-1',
    level: 'A2',
    skill: 'hoeren',
    topic: 'Gesundheit',
    title: 'Termin in der Arztpraxis',
    subtitle: 'Wichtige Hinweise am Telefon heraushören',
    difficulty: 'Leicht',
    durationMinutes: 10,
    formatLabel: 'Hörverstehen · Anrufbeantworter',
    instructions: 'Höre die Nachricht der Praxis und beantworte die Fragen.',
    audioStatus: 'pending',
    transcript:
      'Praxis Dr. Hoffmann, guten Tag! Sie können am Donnerstag um 10:15 Uhr zur Untersuchung kommen. Bitte bringen Sie Ihre Versichertenkarte und Ihren Impfpass mit. Wenn Sie den Termin nicht wahrnehmen können, rufen Sie uns bitte einen Tag vorher an.',
    questions: [
      {
        id: 'a2-hoeren-1-q1',
        type: 'multiple-choice',
        question: 'Was soll der Patient zum Termin mitbringen?',
        options: [
          'Nur den Reisepass',
          'Die Versichertenkarte und den Impfpass',
          'Ein aktuelles Passfoto',
        ],
        correctAnswer: 'Die Versichertenkarte und den Impfpass',
        explanationId:
          'Pesan menyebutkan secara eksplisit "Bitte bringen Sie Ihre Versichertenkarte und Ihren Impfpass mit" (kartu asuransi dan buku vaksinasi).',
        keyVocabulary: [
          { de: 'die Versichertenkarte', id: 'kartu asuransi kesehatan' },
          { de: 'der Impfpass', id: 'buku vaksinasi' },
        ],
        points: 10,
      },
      {
        id: 'a2-hoeren-1-q2',
        type: 'true-false',
        question: 'Der Termin findet am Donnerstagvormittag statt.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Richtig',
        explanationId:
          'Benar (Richtig), janji temu berlangsung pada hari Kamis pukul 10:15 pagi ("Donnerstag um 10:15 Uhr").',
        points: 10,
      },
    ],
  },
  {
    id: 'a2-hoeren-2',
    level: 'A2',
    skill: 'hoeren',
    topic: 'Verkehr',
    title: 'Radiomeldung zur Verkehrslage',
    subtitle: 'Umleitungen und Verspätungen verstehen',
    difficulty: 'Mittel',
    durationMinutes: 10,
    formatLabel: 'Hörverstehen · Verkehrsfunk',
    instructions: 'Höre die Verkehrsmeldung und wähle die richtigen Aussagen.',
    audioStatus: 'pending',
    transcript:
      'Hier ist der Verkehrsservice: Auf der Autobahn A3 Richtung Frankfurt gibt es zwischen Wiesbaden und dem Flughafen wegen einer Baustelle 20 Minuten Stau. Außerdem fährt die S-Bahn-Linie S8 heute wegen Bauarbeiten nur alle 30 Minuten.',
    questions: [
      {
        id: 'a2-hoeren-2-q1',
        type: 'multiple-choice',
        question: 'Warum gibt es auf der A3 einen Stau?',
        options: [
          'Wegen eines starken Gewitters',
          'Wegen einer Baustelle',
          'Wegen eines Konzerts',
        ],
        correctAnswer: 'Wegen einer Baustelle',
        explanationId:
          'Laporan lalu lintas menyebutkan "wegen einer Baustelle 20 Minuten Stau" (karena proyek perbaikan jalan).',
        keyVocabulary: [
          { de: 'die Baustelle', id: 'lokasi konstruksi / perbaikan jalan' },
          { de: 'der Stau', id: 'kemacetan' },
        ],
        points: 10,
      },
      {
        id: 'a2-hoeren-2-q2',
        type: 'fill-blank',
        question: 'Die S8 fährt heute nur alle ___ Minuten.',
        correctAnswer: '30',
        acceptableAnswers: ['30', 'dreißig'],
        explanationId:
          'Kereta S8 hanya beroperasi setiap 30 menit ("nur alle 30 Minuten").',
        points: 10,
      },
    ],
  },
  {
    id: 'a2-hoeren-3',
    level: 'A2',
    skill: 'hoeren',
    topic: 'Kleidung',
    title: 'Beratung im Bekleidungsgeschäft',
    subtitle: 'Größen, Farben und Umtausch im Gespräch verstehen',
    difficulty: 'Leicht',
    durationMinutes: 10,
    formatLabel: 'Hörverstehen · Einkaufsgespräch',
    instructions: 'Höre das Gespräch zwischen Kundin und Verkäufer.',
    audioStatus: 'pending',
    transcript:
      'Verkäufer: Kann ich Ihnen helfen? Kundin: Ja, ich suche eine Regenjacke in Größe M. Verkäufer: Diese blaue Jacke hier ist wasserdicht und kostet 59 Euro. Kundin: Haben Sie die auch in Grün? Verkäufer: Leider nur noch in Blau und Schwarz. Sie können sie aber innerhalb von 14 Tagen mit dem Kassenbon umtauschen.',
    questions: [
      {
        id: 'a2-hoeren-3-q1',
        type: 'multiple-choice',
        question: 'Welche Farben gibt es noch in Größe M?',
        options: ['Grün und Blau', 'Blau und Schwarz', 'Nur Grün'],
        correctAnswer: 'Blau und Schwarz',
        explanationId:
          'Penjual berkata "Leider nur noch in Blau und Schwarz" (hanya tersisa warna biru dan hitam).',
        points: 10,
      },
      {
        id: 'a2-hoeren-3-q2',
        type: 'true-false',
        question: 'Man braucht für den Umtausch den Kassenbon.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Richtig',
        explanationId:
          'Benar (Richtig), penjual menyebutkan bahwa penukaran barang dapat dilakukan dalam 14 hari dengan struk belanja ("mit dem Kassenbon").',
        keyVocabulary: [{ de: 'umtauschen', id: 'menukar barang' }],
        points: 10,
      },
    ],
  },

  // ================= SPRECHEN A2 (3) =================
  {
    id: 'a2-sprechen-1',
    level: 'A2',
    skill: 'sprechen',
    topic: 'Reisen und Urlaub',
    title: 'Über eine vergangene Reise berichten',
    subtitle: 'Im Perfekt über Urlaub, Wetter und Aktivitäten sprechen',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Sprechen · Erfahrungen berichten',
    instructions: 'Erzähle eine Minute lang über deinen letzten Urlaub oder einen Ausflug.',
    questions: [
      {
        id: 'a2-sprechen-1-q1',
        type: 'speaking-task',
        question:
          'Wohin bist du gefahren? Wie warst du dort unterwegs? Was hast du gemacht und wie war das Wetter?',
        preparationSeconds: 60,
        speakingDurationSeconds: 120,
        checklist: [
          'Ich habe das Perfekt korrekt gebildet („bin gefahren“, „habe besucht“).',
          'Ich habe Verkehrsmittel und Unterkunft genannt.',
          'Ich habe mindestens zwei Aktivitäten im Urlaub beschrieben.',
        ],
        rubricCriteria: [
          {
            criterion: 'Vergangenheitsform',
            descriptionId: 'Pemilihan kata bantu Perfekt (haben vs. sein) sesuai.',
          },
          {
            criterion: 'Detailreichtum',
            descriptionId: 'Tujuan, cuaca, transportasi, dan aktivitas dijelaskan dengan runtut.',
          },
        ],
        sampleAnswer:
          'Letzten Sommer bin ich mit dem Zug nach Yogyakarta gefahren. Ich habe dort drei Tage in einem kleinen Hotel übernachtet. Das Wetter war sonnig und warm. Ich habe alte Tempel besichtigt und viel leckeres Essen probiert.',
        explanationId:
          'Saat menceritakan perjalanan di masa lalu dalam bahasa Jerman lisan, gunakan bentuk Perfekt. Kata kerja perpindahan tempat seperti "fahren" atau "fliegen" memakai kata bantu "sein" (ich bin gefahren).',
        points: 20,
      },
    ],
  },
  {
    id: 'a2-sprechen-2',
    level: 'A2',
    skill: 'sprechen',
    topic: 'Einladungen',
    title: 'Gemeinsam einen Termin vereinbaren',
    subtitle: 'Vorschläge machen, ablehnen und Alternativen nennen',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Sprechen · Partnergespräch',
    instructions: 'Bereite deine Redebeiträge für ein Planungsgespräch vor.',
    questions: [
      {
        id: 'a2-sprechen-2-q1',
        type: 'speaking-task',
        question:
          'Du möchtest mit einer Freundin am Wochenende zusammen lernen und danach Kaffee trinken. Mache einen Terminvorschlag, reagiere auf ein „Am Samstag kann ich nicht“ und findet zusammen eine Lösung.',
        preparationSeconds: 60,
        speakingDurationSeconds: 120,
        checklist: [
          'Ich habe einen Vorschlag gemacht („Wollen wir am Samstag...?“).',
          'Ich habe eine Alternative angeboten („Wie wäre es am Sonntag?“).',
          'Ich habe einen Treffpunkt und eine Uhrzeit bestätigt.',
        ],
        rubricCriteria: [
          {
            criterion: 'Interaktion',
            descriptionId: 'Menggunakan ungkapan ajakan dan respons yang sopan.',
          },
          {
            criterion: 'Einigung',
            descriptionId: 'Percakapan menghasilkan kesepakatan waktu dan tempat yang jelas.',
          },
        ],
        sampleAnswer:
          'Hallo Sarah! Wollen wir am Samstagvormittag zusammen für den Deutschkurs lernen? – Ach, schade! Wie wäre es dann am Sonntag um 14:00 Uhr in der Bibliothek? Danach können wir einen Kaffee trinken. Passt dir das?',
        explanationId:
          'Dalam dialog perencanaan A2, gunakan frasa kunci seperti "Wollen wir...?", "Wie wäre es am...?" dan "Passt dir das?".',
        points: 20,
      },
    ],
  },
  {
    id: 'a2-sprechen-3',
    level: 'A2',
    skill: 'sprechen',
    topic: 'Arbeit und Beruf',
    title: 'Alltagssituationen erklären',
    subtitle: 'Einen beruflichen oder studentischen Alltag schildern',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Sprechen · Thema erklären',
    instructions: 'Beantworte die Fragen ausführlich in zusammenhängenden Sätzen.',
    questions: [
      {
        id: 'a2-sprechen-3-q1',
        type: 'speaking-task',
        question:
          'Was machst du beruflich oder was studierst du? Was gefällt dir an deiner Aufgabe und was findest du anstrengend?',
        preparationSeconds: 45,
        speakingDurationSeconds: 120,
        checklist: [
          'Ich habe meinen Beruf oder mein Studium genannt.',
          'Ich habe eine Begründung mit „weil“ formuliert.',
          'Ich habe mindestens einen Vorteil und einen Nachteil erwähnt.',
        ],
        rubricCriteria: [
          {
            criterion: 'Nebensatz mit „weil“',
            descriptionId: 'Kata kerja di akhir anak kalimat setelah "weil" benar.',
          },
          {
            criterion: 'Ausdruck',
            descriptionId: 'Mampu menyatakan hal yang disukai dan tantangan kerja.',
          },
        ],
        sampleAnswer:
          'Ich arbeite als Softwareentwicklerin in einem kleinen Team. Die Arbeit gefällt mir sehr, weil ich jeden Tag neue Probleme lösen kann. Manchmal ist es aber anstrengend, weil wir viele lange Besprechungen haben.',
        explanationId:
          'Menghubungkan alasan dengan "weil" adalah ciri penting kemampuan berbicara tingkat A2.',
        points: 20,
      },
    ],
  },

  // ================= SCHREIBEN A2 (3) =================
  {
    id: 'a2-schreiben-1',
    level: 'A2',
    skill: 'schreiben',
    topic: 'Einladungen',
    title: 'Einladung zum Grillabend',
    subtitle: 'Informelle E-Mail mit vier Leitpunkten schreiben',
    difficulty: 'Leicht',
    durationMinutes: 20,
    formatLabel: 'Schreiben · Informelle E-Mail',
    instructions: 'Schreibe eine E-Mail an deine Freunde (50 bis 80 Wörter).',
    questions: [
      {
        id: 'a2-schreiben-1-q1',
        type: 'writing-task',
        question:
          'Du bist in eine neue Wohnung umgezogen und möchtest einen Grillabend machen. Schreibe: 1. Warum schreibst du? 2. Wann findet die Feier statt? 3. Was sollen deine Freunde mitbringen? 4. Bitte um Antwort.',
        wordLimit: { min: 45, max: 90 },
        checklist: [
          'Persönliche Anrede und Einleitung genutzt',
          'Grund der Einladung (Umzug) erwähnt',
          'Datum, Uhrzeit und Adresse angegeben',
          'Mitbringsel und Bitte um Rückmeldung formuliert',
        ],
        rubricCriteria: [
          {
            criterion: 'Inhaltliche Vollständigkeit',
            descriptionId: 'Keempat poin instruksi dijawab secara seimbang.',
          },
          {
            criterion: 'Satzverknüpfung',
            descriptionId: 'Menggunakan kata hubung sederhana (und, aber, deshalb, weil).',
          },
        ],
        sampleAnswer:
          'Liebe Freunde,\n\nendlich bin ich in meine neue Wohnung eingezogen! Deshalb möchte ich am nächsten Samstag um 18:00 Uhr einen gemütlichen Grillabend auf meiner Terrasse machen. Ich besorge Würstchen und Getränke. Könntet ihr bitte einen Salat oder etwas Brot mitbringen? Gebt mir bitte bis Donnerstag Bescheid, ob ihr kommen könnt.\n\nLiebe Grüße,\nFelix',
        explanationId:
          'Pada level A2, kalimat sudah lebih bervariasi dengan kata penghubung seperti "deshalb" (oleh karena itu) dan "ob" (apakah).',
        points: 25,
      },
    ],
  },
  {
    id: 'a2-schreiben-2',
    level: 'A2',
    skill: 'schreiben',
    topic: 'Gesundheit',
    title: 'Entschuldigung beim Kursleiter',
    subtitle: 'Halbformelle Nachricht bei Krankheit verfassen',
    difficulty: 'Leicht',
    durationMinutes: 18,
    formatLabel: 'Schreiben · Halbformelle E-Mail',
    instructions: 'Schreibe deinem Kursleiter Herrn Braun eine E-Mail.',
    questions: [
      {
        id: 'a2-schreiben-2-q1',
        type: 'writing-task',
        question:
          'Du hast eine starke Erkältung und kannst zwei Tage nicht in den Kurs kommen. Schreibe an Herrn Braun: 1. Entschuldige dich und erkläre den Grund. 2. Wann kommst du wieder? 3. Frage nach den Hausaufgaben.',
        wordLimit: { min: 45, max: 85 },
        checklist: [
          'Höfliche Anrede („Sehr geehrter Herr Braun,“)',
          'Krankheit als Grund klar formuliert',
          'Rückkehrdatum genannt',
          'Nach Hausaufgaben gefragt und höflich verabschiedet',
        ],
        rubricCriteria: [
          {
            criterion: 'Höflichkeitsform',
            descriptionId: 'Pemakaian Sie-Form konsisten dari awal hingga akhir.',
          },
          {
            criterion: 'Grammatik',
            descriptionId: 'Penggunaan "weil" atau "deshalb" serta preposisi waktu tepat.',
          },
        ],
        sampleAnswer:
          'Sehr geehrter Herr Braun,\n\nich möchte mich für heute und morgen entschuldigen. Leider habe ich eine starke Erkältung mit Fieber und muss im Bett bleiben. Am Donnerstag komme ich wieder in den Unterricht. Könnten Sie mir bitte die Hausaufgaben per E-Mail schicken?\n\nMit freundlichen Grüßen\nDina Putri',
        explanationId:
          'Untuk bertanya secara sopan kepada pengajar, bentuk Konjunktiv II sederhana "Könnten Sie mir bitte...?" sangat dianjurkan.',
        points: 25,
      },
    ],
  },
  {
    id: 'a2-schreiben-3',
    level: 'A2',
    skill: 'schreiben',
    topic: 'Erfahrungen',
    title: 'Brief über ein schönes Wochenende',
    subtitle: 'Über ein vergangenes Erlebnis berichten',
    difficulty: 'Mittel',
    durationMinutes: 20,
    formatLabel: 'Schreiben · Persönlicher Brief',
    instructions: 'Schreibe deinem Brieffreund Mark über dein letztes Wochenende (50–90 Wörter).',
    questions: [
      {
        id: 'a2-schreiben-3-q1',
        type: 'writing-task',
        question:
          'Berichte über dein Wochenende: 1. Wo warst du und mit wem? 2. Was habt ihr unternommen? 3. Wie hat es dir gefallen und warum?',
        wordLimit: { min: 50, max: 95 },
        checklist: [
          'Vergangenheitsformen (Perfekt / Präteritum von sein/haben) korrekt genutzt',
          'Begleitung und Ort genannt',
          'Aktivitäten und persönliche Bewertung begründet',
        ],
        rubricCriteria: [
          {
            criterion: 'Tempus (Vergangenheit)',
            descriptionId: 'Menggunakan Perfekt untuk aksi dan Präteritum (war/hatte) dengan tepat.',
          },
          {
            criterion: 'Begründung',
            descriptionId: 'Menjelaskan alasan mengapa akhir pekan itu menyenangkan.',
          },
        ],
        sampleAnswer:
          'Lieber Mark,\n\nwie geht es dir? Am letzten Wochenende bin ich mit meinem Bruder in die Berge gefahren. Das Wetter war wunderbar. Am Samstag sind wir drei Stunden gewandert und haben danach in einer kleinen Hütte gegessen. Der Ausflug hat mir sehr gut gefallen, weil die Natur dort so ruhig ist. Bis bald!\n\nDein Alex',
        explanationId:
          'Kata kerja "sein" dan "haben" di masa lalu umumnya menggunakan Präteritum ("war", "hatte"), sedangkan kata kerja lainnya memakai Perfekt ("bin gefahren", "sind gewandert").',
        points: 25,
      },
    ],
  },

  // ================= GRAMMATIK A2 (3) =================
  {
    id: 'a2-grammatik-1',
    level: 'A2',
    skill: 'grammatik',
    topic: 'Vergangene Ereignisse',
    title: 'Perfekt mit „haben“ und „sein“',
    subtitle: 'Partizip II und das richtige Hilfsverb wählen',
    difficulty: 'Leicht',
    durationMinutes: 10,
    formatLabel: 'Grammatik · Perfekt',
    instructions: 'Ergänze oder wähle die richtige Perfektform.',
    questions: [
      {
        id: 'a2-gram-1-q1',
        type: 'multiple-choice',
        question: 'Gestern ___ wir schon um 7:00 Uhr nach München gefahren.',
        options: ['haben', 'sind', 'seid'],
        correctAnswer: 'sind',
        explanationId:
          'Kata kerja perpindahan tempat seperti "fahren" membentuk Perfekt dengan kata bantu "sein". Untuk "wir" bentuknya "sind".',
        points: 10,
      },
      {
        id: 'a2-gram-1-q2',
        type: 'fill-blank',
        question: 'Partizip II von „einkaufen“: Ich habe gestern Obst ___.',
        correctAnswer: 'eingekauft',
        acceptableAnswers: ['eingekauft'],
        explanationId:
          'Untuk kata kerja terpisah (trennbares Verb) seperti "einkaufen", awalan "ge-" disisipkan di antara prefiks dan kata dasar: ein + ge + kauft = eingekauft.',
        points: 10,
      },
      {
        id: 'a2-gram-1-q3',
        type: 'multiple-choice',
        question: 'Was ___ du am Wochenende gemacht?',
        options: ['bist', 'hast', 'warst'],
        correctAnswer: 'hast',
        explanationId:
          '"machen" bukan kata kerja perpindahan/perubahan keadaan, sehingga memakai "haben" → "hast ... gemacht".',
        points: 10,
      },
    ],
  },
  {
    id: 'a2-grammatik-2',
    level: 'A2',
    skill: 'grammatik',
    topic: 'Wohnen',
    title: 'Dativ und Wechselpräpositionen',
    subtitle: 'Wo? (Dativ) vs. Wohin? (Akkusativ) sicher unterscheiden',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Grammatik · Kasus & Präpositionen',
    instructions: 'Wähle den richtigen Kasus nach der Wechselpräposition.',
    questions: [
      {
        id: 'a2-gram-2-q1',
        type: 'multiple-choice',
        question: 'Die Lampe hängt über ___ Tisch. (der Tisch)',
        options: ['dem', 'den', 'der'],
        correctAnswer: 'dem',
        explanationId:
          'Kata kerja "hängen" (menggantung diam) menjawab pertanyaan "Wo?" (di mana?), sehingga menggunakan Dativ. "der Tisch" di Dativ menjadi "dem Tisch".',
        points: 10,
      },
      {
        id: 'a2-gram-2-q2',
        type: 'multiple-choice',
        question: 'Ich stelle die Tasche neben ___ Stuhl. (der Stuhl)',
        options: ['dem', 'den', 'des'],
        correctAnswer: 'den',
        explanationId:
          '"stellen" (meletakkan) menunjukkan arah perpindahan ("Wohin?"), sehingga menggunakan Akkusativ: "der Stuhl" → "den Stuhl".',
        points: 10,
      },
      {
        id: 'a2-gram-2-q3',
        type: 'fill-blank',
        question: 'Dativ Plural: Ich danke ___ Freunden für die Hilfe. (die Freunde)',
        correctAnswer: 'den',
        acceptableAnswers: ['den'],
        explanationId:
          'Artikel jamak pada kasus Dativ selalu berubah menjadi "den", dan kata bendanya mendapat akhiran -n (den Freunden).',
        points: 10,
      },
    ],
  },
  {
    id: 'a2-grammatik-3',
    level: 'A2',
    skill: 'grammatik',
    topic: 'Gesundheit',
    title: 'Nebensätze mit „weil“, „dass“ und Komparativ',
    subtitle: 'Nebensatzstellung und Vergleiche trainieren',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Grammatik · Nebensätze & Vergleich',
    instructions: 'Wähle die korrekte Satzform oder Steigerungsform.',
    questions: [
      {
        id: 'a2-gram-3-q1',
        type: 'multiple-choice',
        question: 'Ich bleibe heute im Bett, weil ich starke Kopfschmerzen ___.',
        options: ['habe', 'hat', 'haben'],
        correctAnswer: 'habe',
        explanationId:
          'Setelah konjungsi "weil", kata kerja terkonjugasi ("habe") diletakkan di bagian paling akhir anak kalimat.',
        points: 10,
      },
      {
        id: 'a2-gram-3-q2',
        type: 'multiple-choice',
        question: 'Der Zug ist schneller ___ das Auto.',
        options: ['wie', 'als', 'so'],
        correctAnswer: 'als',
        explanationId:
          'Untuk perbandingan yang tidak setara (Komparativ seperti schneller, größer, besser) digunakan kata "als", sedangkan untuk perbandingan setara (so schnell...) digunakan "wie".',
        points: 10,
      },
    ],
  },

  // ================= WORTSCHATZ A2 (3) =================
  {
    id: 'a2-wortschatz-1',
    level: 'A2',
    skill: 'wortschatz',
    topic: 'Reisen und Urlaub',
    title: 'Rund um Bahnhof, Hotel und Gepäck',
    subtitle: 'Reisewortschatz sicher zuordnen',
    difficulty: 'Leicht',
    durationMinutes: 8,
    formatLabel: 'Wortschatz · Zuordnung',
    instructions: 'Ordne die Reisebegriffe den richtigen Bedeutungen zu.',
    questions: [
      {
        id: 'a2-wort-1-q1',
        type: 'matching',
        question: 'Ordne die Wörter zu.',
        translationDirection: 'de-to-id',
        matchingPairs: [
          { left: 'der Koffer', right: 'koper' },
          { left: 'umsteigen', right: 'berganti kendaraan' },
          { left: 'die Unterkunft', right: 'penginapan' },
          { left: 'buchen', right: 'memesan' },
        ],
        explanationId:
          'der Koffer = koper, umsteigen = pindah kereta/bus, die Unterkunft = penginapan, buchen = memesan.',
        points: 20,
      },
      {
        id: 'a2-wort-1-q2',
        type: 'short-answer',
        question: 'Wie heißt „memesan tempat“ (z. B. ein Hotelzimmer) auf Deutsch?',
        translationDirection: 'id-to-de',
        correctAnswer: 'reservieren',
        acceptableAnswers: ['reservieren', 'buchen'],
        explanationId:
          'Dalam konteks hotel atau restoran, kata kerja "reservieren" atau "buchen" berarti memesan.',
        points: 10,
      },
    ],
  },
  {
    id: 'a2-wortschatz-2',
    level: 'A2',
    skill: 'wortschatz',
    topic: 'Gesundheit',
    title: 'Beim Arzt und in der Apotheke',
    subtitle: 'Symptome und Ratschläge verstehen',
    difficulty: 'Leicht',
    durationMinutes: 10,
    formatLabel: 'Wortschatz · Multiple-Choice & Lückentext',
    instructions: 'Wähle das passende Wort zum Thema Gesundheit.',
    questions: [
      {
        id: 'a2-wort-2-q1',
        type: 'multiple-choice',
        question: 'Was bekommt man vom Arzt für die Apotheke?',
        options: ['ein Rezept', 'eine Rechnung', 'einen Fahrplan'],
        correctAnswer: 'ein Rezept',
        explanationId:
          '"das Rezept" di bidang kesehatan berarti resep dokter yang dibawa ke apotek.',
        points: 10,
      },
      {
        id: 'a2-wort-2-q2',
        type: 'fill-blank',
        question: 'Gegen Husten nehme ich dreimal täglich ___. (obat)',
        correctAnswer: 'Medizin',
        acceptableAnswers: ['Medizin', 'Tabletten', 'Medikamente'],
        explanationId:
          '"Medizin" atau "Medikamente" berarti obat-obatan.',
        points: 10,
      },
    ],
  },
  {
    id: 'a2-wortschatz-3',
    level: 'A2',
    skill: 'wortschatz',
    topic: 'Verkehr',
    title: 'Unterwegs in der Stadt',
    subtitle: 'Richtungsangaben und Verkehrsmittel',
    difficulty: 'Mittel',
    durationMinutes: 10,
    formatLabel: 'Wortschatz · Übersetzung',
    instructions: 'Beantworte die Wortschatzfragen zum Thema Verkehr.',
    questions: [
      {
        id: 'a2-wort-3-q1',
        type: 'multiple-choice',
        question: 'Was bedeutet „die Kreuzung“ auf Indonesisch?',
        translationDirection: 'de-to-id',
        options: ['persimpangan jalan', 'jembatan', 'tempat parkir'],
        correctAnswer: 'persimpangan jalan',
        explanationId:
          '"die Kreuzung" berasal dari kata "Kreuz" (silang) yang berarti perempatan atau persimpangan jalan.',
        points: 10,
      },
      {
        id: 'a2-wort-3-q2',
        type: 'multiple-choice',
        question: 'Welches Wort passt? An der nächsten ___ müssen wir aussteigen.',
        options: ['Haltestelle', 'Miete', 'Kasse'],
        correctAnswer: 'Haltestelle',
        explanationId:
          '"die Haltestelle" berarti halte bus atau trem tempat penumpang naik dan turun.',
        points: 10,
      },
    ],
  },
];
