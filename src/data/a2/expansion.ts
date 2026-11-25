import { Exercise } from '../../types/exercise';

export const A2_EXPANSION_EXERCISES: Exercise[] = [
  {
    id: 'a2-lesen-4',
    level: 'A2',
    skill: 'lesen',
    topic: 'Kleidung',
    title: 'Reklamation und Umtausch im Online-Shop',
    subtitle: 'E-Mail des Kundenservice verstehen und Details prüfen',
    learningObjectiveDe: 'Bedingungen und Fristen für Rücksendungen aus einer Service-E-Mail erfassen.',
    difficulty: 'Mittel',
    durationMinutes: 10,
    formatLabel: 'Leseverstehen · E-Mail & Detailfragen',
    instructions: 'Lies die Kundenservice-E-Mail und beantworte die Fragen.',
    passageTitle: 'Ihre Rücksendung Nr. 4821',
    passageType: 'E-Mail',
    passage:
      'Sehr geehrter Herr Adi, vielen Dank für Ihre Nachricht. Sie können die Winterjacke in Größe M selbstverständlich innerhalb von 14 Tagen kostenlos umtauschen, wenn das Etikett noch an der Jacke ist. Bitte legen Sie den Lieferschein in das Paket. Sobald das Paket bei uns eintrifft, schicken wir Ihnen sofort Größe L zu.',
    questions: [
      {
        id: 'a2-lesen-4-q1',
        type: 'multiple-choice',
        question: 'Welche Bedingung gilt für den kostenlosen Umtausch?',
        options: [
          'Man muss das Etikett an der Jacke lassen.',
          'Man muss 5 Euro Porto bezahlen.',
          'Der Umtausch gilt nur innerhalb von 3 Tagen.',
        ],
        correctAnswer: 'Man muss das Etikett an der Jacke lassen.',
        explanationDe: 'In der E-Mail steht: „wenn das Etikett noch an der Jacke ist“.',
        explanationId:
          'Syarat penukaran gratis adalah label harga/merek ("das Etikett") masih menempel di jaket dan dikembalikan dalam 14 hari.',
        keyVocabulary: [
          { de: 'umtauschen', id: 'menukar barang' },
          { de: 'der Lieferschein', id: 'surat pengiriman / faktur' },
        ],
        points: 10,
      },
      {
        id: 'a2-lesen-4-q2',
        type: 'true-false',
        question: 'Der Kunde möchte eine kleinere Größe haben.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationDe: 'Er schickt Größe M zurück und erhält Größe L (eine größere Größe).',
        explanationId:
          'Salah (Falsch), karena toko akan mengirimkan ukuran L sebagai pengganti M (ukuran lebih besar, bukan lebih kecil).',
        points: 10,
      },
    ],
  },
  {
    id: 'a2-hoeren-4',
    level: 'A2',
    skill: 'hoeren',
    topic: 'Verkehr',
    title: 'Verkehrsmeldung im Lokalradio',
    subtitle: 'Staus, Baustellen und Umleitungen richtig verstehen',
    learningObjectiveDe: 'Wichtige Verkehrsinformationen und Ausweichrouten aus einer Radiomeldung entnehmen.',
    difficulty: 'Mittel',
    durationMinutes: 8,
    formatLabel: 'Hörverstehen · Radiomeldung',
    instructions: 'Höre die Verkehrsmeldung und löse die Aufgaben.',
    audioStatus: 'missing',
    transcript:
      'Und hier der aktuelle Verkehrsservice für den Großraum Köln: Auf der A3 Richtung Frankfurt gibt es zwischen Leverkusen und Köln-Ost wegen einer Baustelle sechs Kilometer Stau. Bitte fahren Sie ab der Ausfahrt Leverkusen über die B8. In der Innenstadt ist die Nordbrücke heute bis 16 Uhr für Busse und Taxis frei, für Pkw jedoch gesperrt.',
    questions: [
      {
        id: 'a2-hoeren-4-q1',
        type: 'multiple-choice',
        question: 'Warum gibt es auf der A3 einen Stau?',
        options: [
          'Wegen eines Unfalls',
          'Wegen einer Baustelle',
          'Wegen starken Schneefalls',
        ],
        correctAnswer: 'Wegen einer Baustelle',
        explanationDe: 'Die Meldung nennt ausdrücklich eine Baustelle als Ursache.',
        explanationId:
          'Siaran lalu lintas menyebutkan "wegen einer Baustelle" (karena adanya pekerjaan jalan/konstruksi).',
        points: 10,
      },
      {
        id: 'a2-hoeren-4-q2',
        type: 'true-false',
        question: 'Private Autos dürfen heute Nachmittag um 15 Uhr über die Nordbrücke fahren.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationDe: 'Die Nordbrücke ist bis 16 Uhr für Pkw gesperrt.',
        explanationId:
          'Salah (Falsch), karena hingga pukul 16.00 jembatan utara tertutup bagi mobil pribadi ("für Pkw gesperrt").',
        keyVocabulary: [{ de: 'gesperrt sein', id: 'ditutup / diblokir' }],
        points: 10,
      },
    ],
  },
  {
    id: 'a2-grammatik-4',
    level: 'A2',
    skill: 'grammatik',
    topic: 'Gesundheit',
    title: 'Reflexive Verben, Possessivartikel und Imperativ',
    subtitle: 'Sich ausdrücken, Besitz zeigen und höfliche Ratschläge geben',
    learningObjectiveDe: 'Reflexivpronomen (mich, dich, sich), Possessivartikel im Dativ und Imperativformen korrekt anwenden.',
    difficulty: 'Mittel',
    durationMinutes: 10,
    formatLabel: 'Grammatiktraining · Pronomen & Imperativ',
    instructions: 'Wähle die passende grammatische Lösung.',
    questions: [
      {
        id: 'a2-grammatik-4-q1',
        type: 'multiple-choice',
        question: 'Ich fühle ___ heute viel besser als gestern.',
        options: ['sich', 'mich', 'mir'],
        correctAnswer: 'mich',
        explanationDe: 'Bei „ich“ lautet das Reflexivpronomen im Akkusativ „mich“.',
        explanationId:
          'Kata kerja "sich fühlen" memakai Akkusativ; untuk subjek "ich", kata ganti refleksifnya adalah "mich".',
        relatedGrammarTopicId: 'gram-a2-6',
        points: 10,
      },
      {
        id: 'a2-grammatik-4-q2',
        type: 'multiple-choice',
        question: 'Die Ärztin sagt zu dem Patienten: „___ Sie bitte drei Tage im Bett!“',
        options: ['Bleibt', 'Bleib', 'Bleiben'],
        correctAnswer: 'Bleiben',
        explanationDe: 'Der höfliche Imperativ mit „Sie“ verwendet den Infinitiv + Sie.',
        explanationId:
          'Bentuk kalimat perintah/saran sopan dengan "Sie" menggunakan bentuk Infinitiv: "Bleiben Sie bitte...".',
        relatedGrammarTopicId: 'gram-a2-9',
        points: 10,
      },
      {
        id: 'a2-grammatik-4-q3',
        type: 'multiple-choice',
        question: 'Er spricht gerade am Telefon mit ___ Schwester.',
        options: ['seiner', 'seinen', 'ihre'],
        correctAnswer: 'seiner',
        explanationDe: '„mit“ verlangt den Dativ; „die Schwester“ ist feminin → seiner.',
        explanationId:
          'Setelah preposisi "mit" selalu Dativ. Pemiliknya "er" (sein-) dan "die Schwester" berjenis feminin sehingga menjadi "seiner".',
        relatedGrammarTopicId: 'gram-a2-8',
        points: 10,
      },
    ],
  },
  {
    id: 'a2-schreiben-4',
    level: 'A2',
    skill: 'schreiben',
    topic: 'Termine',
    title: 'Anfrage und Terminverschiebung per E-Mail',
    subtitle: 'Einen Arzt- oder Kurstermin höflich verschieben',
    learningObjectiveDe: 'Eine halbformelle/formelle E-Mail schreiben, um einen Termin abzusagen und einen Ersatztermin vorzuschlagen.',
    difficulty: 'Mittel',
    durationMinutes: 15,
    formatLabel: 'Schriftlicher Ausdruck · Terminanfrage',
    instructions:
      'Schreibe eine E-Mail an die Sprachschule (ca. 45–65 Wörter): 1) Nenne deinen bisherigen Beratungstermin. 2) Erkläre kurz, warum du ihn verschieben musst. 3) Bitte um einen neuen Termin nächste Woche.',
    questions: [
      {
        id: 'a2-schreiben-4-q1',
        type: 'writing-task',
        question:
          'Formuliere eine höfliche E-Mail an Frau Becker von der Sprachschule zur Terminverschiebung.',
        wordLimit: { min: 45, max: 70 },
        preparationGuidanceDe:
          'Gunakan sapaan formal "Sehr geehrte Frau Becker,", sampaikan alasan memakai "weil" atau "leider", lalu ajukan dua opsi waktu pengganti.',
        usefulExpressionsDe: [
          { de: 'Leider muss ich meinen Termin am ... verschieben.', id: 'Sayangnya saya harus menggeser janji saya pada...' },
          { de: 'Hätten Sie nächste Woche Zeit für einen neuen Termin?', id: 'Apakah Anda punya waktu minggu depan untuk jadwal baru?' },
          { de: 'Vielen Dank für Ihr Verständnis.', id: 'Terima kasih banyak atas pengertian Anda.' },
        ],
        sampleAnswer:
          'Sehr geehrte Frau Becker,\n\nich habe am Mittwoch um 10:00 Uhr einen Beratungstermin bei Ihnen. Leider muss ich diesen Termin verschieben, weil ich am Mittwochvormittag arbeiten muss. Hätten Sie am Donnerstag oder Freitag nachmittags Zeit für ein kurzes Gespräch?\n\nVielen Dank für Ihr Verständnis.\nMit freundlichen Grüßen\nRama Putra',
        rubricCriteria: [
          { criterion: 'Ketiga poin informasi lengkap', descriptionId: 'Jadwal lama, alasan penundaan, dan usulan jadwal baru jelas.' },
          { criterion: 'Gaya bahasa sopan (Sie)', descriptionId: 'Sapaan awal dan penutup formal tepat.' },
          { criterion: 'Tata bahasa A2', descriptionId: 'Kalimat dengan "weil" atau konjungsi waktu tersusun benar.' },
        ],
        checklist: [
          'Ich habe eine höfliche Anrede und Grußformel benutzt.',
          'Ich habe den alten Termin genau genannt.',
          'Ich habe einen kurzen Grund mit „weil“ oder „denn“ angegeben.',
          'Ich habe konkrete neue Terminvorschläge gemacht.',
        ],
        explanationId:
          'Dalam korespondensi A2, penting menggunakan konjungsi alasan seperti "weil" dengan kata kerja di akhir kalimat serta menjaga bentuk sapaan formal.',
        points: 20,
      },
    ],
  },
  {
    id: 'a2-sprechen-4',
    level: 'A2',
    skill: 'sprechen',
    topic: 'Einladungen',
    title: 'Gemeinsam ein Abschiedsgeschenk planen',
    subtitle: 'Vorschläge machen, reagieren und eine gemeinsame Entscheidung treffen',
    learningObjectiveDe: 'Im Dialog Ideen vorschlagen („Wie wäre es mit...?“) und sich auf einen Plan einigen.',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Mündliche Kommunikation · Gemeinsam planen',
    instructions:
      'Deine Deutschlehrerin verlässt den Kurs. Plane eine kleine Überraschung (Geschenk, Karte, Zeit und Ort zum Einkaufen).',
    questions: [
      {
        id: 'a2-sprechen-4-q1',
        type: 'speaking-task',
        question:
          'Führe laut einen Planungsmonolog/Dialog (ca. 60–90 Sekunden): 1) Was schenken wir? 2) Wie viel Geld sammeln wir? 3) Wann und wo kaufen wir das Geschenk ein?',
        preparationSeconds: 45,
        speakingDurationSeconds: 90,
        preparationGuidanceDe:
          'Susun jawabanmu dengan struktur: Usulan hadiah -> Persetujuan/reaksi -> Pembagian tugas & waktu belanja.',
        usefulExpressionsDe: [
          { de: 'Was hältst du davon, wenn wir ... kaufen?', id: 'Bagaimana pendapatmu jika kita membeli ...?' },
          { de: 'Das ist eine gute Idee! Außerdem könnten wir...', id: 'Itu ide bagus! Selain itu kita bisa...' },
          { de: 'Wann hast du Zeit? Wollen wir uns am Samstag treffen?', id: 'Kapan kamu ada waktu? Mau bertemu hari Sabtu?' },
        ],
        sampleAnswer:
          'Hallo! Unsere Lehrerin hat bald ihren letzten Tag. Ich schlage vor, dass wir ihr ein schönes Fotobuch und Blumen schenken. Jeder könnte vielleicht fünf Euro geben. Außerdem sollten wir eine Karte mit unseren Unterschriften schreiben. Wollen wir am Freitagnachmittag um 16 Uhr vor dem Einkaufszentrum zusammen die Sachen kaufen?',
        rubricCriteria: [
          { criterion: 'Usulan konkret & masuk akal', descriptionId: 'Menyebutkan jenis hadiah, iuran, dan waktu pertemuan.' },
          { criterion: 'Penggunaan frasa negosiasi', descriptionId: 'Menggunakan ungkapan seperti "Ich schlage vor", "könnten wir", "Wollen wir".' },
        ],
        checklist: [
          'Ich habe mindestens zwei konkrete Vorschläge gemacht.',
          'Ich habe Zeit und Treffpunkt klar genannt.',
          'Ich habe höfliche Vorschlagsformen (könnten, wollen) verwendet.',
        ],
        explanationId:
          'Tugas "gemeinsam etwas planen" adalah bagian khas Goethe dan telc A2. Fokus pada kalimat ajakan dan kesepakatan waktu.',
        points: 20,
      },
    ],
  },
];
