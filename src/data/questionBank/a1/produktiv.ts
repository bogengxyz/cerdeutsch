import { Exercise } from '../../../types/exercise';
import { buildProductiveExercise } from '../helpers';

export const A1_PRODUKTIV_SCHREIBEN: Exercise[] = [
  buildProductiveExercise({
    id: 'qb-a1-sch-001',
    level: 'A1',
    skill: 'schreiben',
    topic: 'Familie',
    title: 'Postkarte aus dem Familienurlaub',
    subtitle: 'Kurze Grüße mit einfachen Sätzen schreiben',
    diff: 'Leicht',
    mins: 15,
    format: 'Schreiben · Postkarte',
    instr: 'Schreibe eine kurze Postkarte an deine Freundin Lena (ca. 35–50 Wörter).',
    prompt:
      'Du bist mit deiner Familie im Urlaub am Meer. Schreibe an Lena: 1. Wo seid ihr? 2. Wie ist das Wetter? 3. Was macht ihr jeden Tag?',
    explanationDe:
      'Auf A1 genügen einfache, klare Hauptsätze mit „wir“, Ort, Wetter und Freizeitaktivitäten.',
    explanationId:
      'Di tingkat A1 gunakan kalimat tunggal yang jelas tentang lokasi, cuaca, dan kegiatan sehari-hari.',
    wordLimit: { min: 30, max: 70 },
    sampleAnswer:
      'Liebe Lena,\nviele Grüße aus Rügen! Ich bin mit meiner Familie seit Montag hier am Meer. Das Wetter ist wunderbar: Die Sonne scheint und es hat 24 Grad. Jeden Tag gehen wir schwimmen, essen Eis und spazieren am Strand. Am Sonntag fahren wir zurück.\nBis bald!\nDein/e Budi',
    checklist: [
      'Passende Anrede („Liebe Lena,“) geschrieben',
      'Alle 3 Inhaltspunkte beantwortet (Ort, Wetter, Aktivität)',
      'Verb auf Position 2 richtig konjugiert',
      'Passenden Gruß am Ende („Viele Grüße“) benutzt',
    ],
    rubric: [
      { criterion: 'Inhalt', descriptionId: 'Semua 3 poin pertanyaan terjawab jelas.' },
      { criterion: 'Sprache A1', descriptionId: 'Kata kerja dan urutan kalimat dasar benar.' },
      { criterion: 'Aufbau', descriptionId: 'Ada salam pembuka dan salam penutup.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a1-sch-002',
    level: 'A1',
    skill: 'schreiben',
    topic: 'Einkaufen',
    title: 'Einkaufsliste & Nachricht an den Mitbewohner',
    subtitle: 'Um Einkäufe bitten und Mengen nennen',
    diff: 'Leicht',
    mins: 15,
    format: 'Schreiben · Kurznachricht',
    instr: 'Schreibe eine kurze Nachricht an deinen Mitbewohner Paul (ca. 35–50 Wörter).',
    prompt:
      'Du hast heute Abend leider keine Zeit zum Einkaufen, willst aber morgen kochen. Schreibe Paul: 1. Warum kannst du nicht einkaufen? 2. Welche drei Lebensmittel braucht ihr? 3. Wann bezahlst du ihm das Geld zurück?',
    explanationDe:
      'Verwende klare Mengenangaben („ein Kilo“, „500 Gramm“) und höfliche Bitten („Kannst du bitte...?“).',
    explanationId:
      'Gunakan satuan berat/jumlah yang jelas serta kalimat permintaan yang sopan.',
    wordLimit: { min: 30, max: 70 },
    sampleAnswer:
      'Hallo Paul,\nheute muss ich leider bis 20 Uhr arbeiten und kann nicht einkaufen gehen. Kannst du bitte ein Kilo Kartoffeln, sechs Eier und einen Liter Milch mitbringen? Morgen früh gebe ich dir das Geld sofort zurück. Vielen Dank für deine Hilfe!\nBis später,\nNadia',
    checklist: [
      'Grund für die Bitte genannt',
      'Drei konkrete Lebensmittel mit Menge notiert',
      'Zeitpunkt für die Rückzahlung angegeben',
      'Freundlichen Dank und Gruß formuliert',
    ],
    rubric: [
      { criterion: 'Aufgabenstellung', descriptionId: 'Ketiga poin tersampaikan lengkap.' },
      { criterion: 'Wortschatz', descriptionId: 'Kosakata bahan makanan dan takaran tepat.' },
      { criterion: 'Kommunikative Angemessenheit', descriptionId: 'Bahasa sopan untuk teman serumah.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a1-sch-003',
    level: 'A1',
    skill: 'schreiben',
    topic: 'Wohnen',
    title: 'Anfrage zu einer Wohnungsanzeige',
    subtitle: 'Formelle Kurz-E-Mail an einen Vermieter',
    diff: 'Mittel',
    mins: 20,
    format: 'Schreiben · Formelle E-Mail',
    instr: 'Schreibe eine kurze E-Mail an Herrn Becker (ca. 40–60 Wörter).',
    prompt:
      'Du interessierst dich für eine 1-Zimmer-Wohnung in Hamburg. Schreibe Herrn Becker: 1. Stelle dich kurz vor (Name, Beruf/Studium). 2. Frage nach der Warmmiete. 3. Bitte um einen Besichtigungstermin nächste Woche.',
    explanationDe:
      'Achte bei der formellen E-Mail auf „Sehr geehrter Herr Becker,“ und „Sie“-Anrede sowie „Mit freundlichen Grüßen“.',
    explanationId:
      'Untuk surat resmi kepada pemilik rumah gunakan sapaan hormat "Sie" dan penutup formal.',
    wordLimit: { min: 35, max: 80 },
    sampleAnswer:
      'Sehr geehrter Herr Becker,\nmein Name ist Sari Dewi und ich studiere seit Oktober in Hamburg. Ihre 1-Zimmer-Wohnung gefällt mir sehr gut. Wie hoch ist die Warmmiete pro Monat? Kann ich die Wohnung nächste Woche am Dienstag oder Mittwoch besichtigen?\nMit freundlichen Grüßen\nSari Dewi',
    checklist: [
      'Formelle Anrede („Sehr geehrter Herr Becker,“)',
      'Eigene Vorstellung mit Name und Tätigkeit',
      'Frage nach der Warmmiete und Besichtigungstermin',
      'Formelle Verabschiedung („Mit freundlichen Grüßen“)',
    ],
    rubric: [
      { criterion: 'Register', descriptionId: 'Menggunakan ragam formal "Sie" secara konsisten.' },
      { criterion: 'Vollständigkeit', descriptionId: 'Semua informasi wajib tercakup.' },
      { criterion: 'Grammatik', descriptionId: 'Struktur kalimat tanya dan pernyataan benar.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a1-sch-004',
    level: 'A1',
    skill: 'schreiben',
    topic: 'Körper',
    title: 'Entschuldigung im Deutschkurs wegen Krankheit',
    subtitle: 'Kursleitung per E-Mail informieren',
    diff: 'Leicht',
    mins: 15,
    format: 'Schreiben · Entschuldigungsmail',
    instr: 'Schreibe eine E-Mail an deine Lehrerin Frau Sommer (ca. 35–55 Wörter).',
    prompt:
      'Du bist krank und kannst heute nicht in den Deutschkurs kommen. Schreibe Frau Sommer: 1. Warum fehlst du? 2. Wie lange bleibst du zu Hause? 3. Frage nach den Hausaufgaben für Freitag.',
    explanationDe:
      'Nenne ein konkretes Symptom („Halsschmerzen“, „Fieber“) und frage höflich nach den Aufgaben.',
    explanationId:
      'Sebutkan keluhan kesehatan secara sederhana dan tanyakan tugas kelas dengan sopan.',
    wordLimit: { min: 30, max: 75 },
    sampleAnswer:
      'Liebe Frau Sommer,\nleider kann ich heute nicht zum Deutschkurs kommen. Ich habe starke Kopfschmerzen und etwas Fieber. Der Arzt sagt, ich muss zwei Tage im Bett bleiben. Können Sie mir bitte die Hausaufgaben für Freitag per E-Mail schicken? Vielen Dank!\nMit freundlichen Grüßen\nRafi Pratama',
    checklist: [
      'Höfliche Anrede an die Lehrerin',
      'Krankheitsgrund verständlich genannt',
      'Dauer der Abwesenheit angegeben',
      'Nach den Hausaufgaben gefragt',
    ],
    rubric: [
      { criterion: 'Inhalt', descriptionId: 'Ketiga poin tugas terjawab rapi.' },
      { criterion: 'Wortschatz', descriptionId: 'Kosakata kesehatan dasar dipakai tepat.' },
      { criterion: 'Lesbarkeit', descriptionId: 'Kalimat singkat, jelas, dan mudah dipahami.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a1-sch-005',
    level: 'A1',
    skill: 'schreiben',
    topic: 'Freizeit',
    title: 'Antwort auf eine Geburtstagseinladung',
    subtitle: 'Zusagen und etwas mitbringen',
    diff: 'Leicht',
    mins: 15,
    format: 'Schreiben · Persönliche Nachricht',
    instr: 'Schreibe deinem Freund Marco eine Antwort (ca. 35–55 Wörter).',
    prompt:
      'Marco lädt dich zu seiner Geburtstagsparty am Samstag um 19:00 Uhr ein. Schreibe ihm: 1. Danke für die Einladung und sage zu. 2. Frage nach der genauen Adresse. 3. Was möchtest du zu essen oder zu trinken mitbringen?',
    explanationDe:
      'Nutze einfache Ausdrücke wie „Vielen Dank für...“, „Ich komme sehr gern“ und „Ich bringe ... mit.“',
    explanationId:
      'Gunakan ungkapan terima kasih, konfirmasi hadir, pertanyaan alamat, dan makanan/minuman yang dibawa.',
    wordLimit: { min: 30, max: 70 },
    sampleAnswer:
      'Lieber Marco,\nvielen Dank für deine Einladung! Ich komme am Samstag um 19:00 Uhr sehr gern zu deiner Party. Kannst du mir noch deine genaue Adresse schicken? Ich bringe einen frischen Obstsalat und zwei Flaschen Apfelsaft mit. Bis Samstag!\nDein Freund Tarek',
    checklist: [
      'Bedankt und fest zugesagt',
      'Nach der Adresse gefragt',
      'Konkretes Essen oder Getränk genannt',
      'Persönlicher Schlussgruß',
    ],
    rubric: [
      { criterion: 'Inhaltspunkte', descriptionId: 'Semua poin undangan direspons lengkap.' },
      { criterion: 'Verbstruktur', descriptionId: 'Kata kerja terpisah seperti "mitbringen" digunakan benar.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a1-sch-006',
    level: 'A1',
    skill: 'schreiben',
    topic: 'Verkehr',
    title: 'Hotelzimmer für ein Wochenende buchen',
    subtitle: 'Buchungsanfrage schreiben',
    diff: 'Mittel',
    mins: 20,
    format: 'Schreiben · Formelle E-Mail',
    instr: 'Schreibe eine E-Mail an das Hotel „Alte Mühle“ (ca. 40–60 Wörter).',
    prompt:
      'Du möchtest im Juli ein Wochenende in Dresden verbringen. Schreibe ans Hotel: 1. Für welches Datum und wie viele Nächte suchst du ein Einzelzimmer? 2. Frage nach dem Preis mit Frühstück. 3. Frage, ob das Hotel einen Parkplatz hat.',
    explanationDe:
      'Achte auf Daten („vom 10. bis 12. Juli“) und indirekte/direkte Fragen im Sie-Register.',
    explanationId:
      'Perhatikan penulisan tanggal serta pertanyaan tentang sarapan dan tempat parkir dengan sapaan resmi.',
    wordLimit: { min: 35, max: 80 },
    sampleAnswer:
      'Sehr geehrte Damen und Herren,\nich möchte vom 10. bis zum 12. Juli (zwei Nächte) ein ruhiges Einzelzimmer in Ihrem Hotel buchen. Wie viel kostet das Zimmer inklusive Frühstück? Haben Sie auch einen Parkplatz für Gäste?\nVielen Dank und mit freundlichen Grüßen\nDewi Lestari',
    checklist: [
      'Formelle Anrede („Sehr geehrte Damen und Herren,“)',
      'Datum, Nächte und Zimmerart genannt',
      'Nach Frühstückspreis und Parkplatz gefragt',
      'Formeller Gruß mit vollständigem Namen',
    ],
    rubric: [
      { criterion: 'Form & Höflichkeit', descriptionId: 'Format surat pemesanan hotel sesuai standar.' },
      { criterion: 'Genauigkeit', descriptionId: 'Angka, tanggal, dan kata benda tepat.' },
    ],
  }),
];

export const A1_PRODUKTIV_SPRECHEN: Exercise[] = [
  buildProductiveExercise({
    id: 'qb-a1-spr-001',
    level: 'A1',
    skill: 'sprechen',
    topic: 'Begrüßung',
    title: 'Sich selbst im Deutschkurs vorstellen',
    subtitle: 'A1 Prüfungsteil 1: Persönliche Angaben sprechen',
    diff: 'Leicht',
    mins: 8,
    format: 'Sprechen · Vorstellung',
    instr: 'Sprich 45–60 Sekunden frei über dich selbst.',
    prompt:
      'Stelle dich einer neuen Gruppe vor: Nenne deinen Namen, dein Alter, dein Heimatland, deinen Wohnort, deine Sprachen und deine Hobbys.',
    explanationDe:
      'Sprich langsam und deutlich. Verbinde einfache Sätze mit „und“ oder „aber“.',
    explanationId:
      'Berbicaralah perlahan dan jelas menggunakan kalimat dasar tentang identitas diri.',
    prepSeconds: 30,
    speakSeconds: 60,
    sampleAnswer:
      'Hallo! Ich heiße Putri und bin 23 Jahre alt. Ich komme aus Jakarta in Indonesien, aber jetzt wohne ich in München. Ich spreche Indonesisch, Englisch und ein bisschen Deutsch. In meiner Freizeit höre ich gern Musik und koche oft mit Freunden.',
    checklist: [
      'Name und Alter klar genannt',
      'Herkunft und aktuellen Wohnort gesagt',
      'Sprachen erwähnt',
      'Mindestens ein Hobby genannt',
    ],
    rubric: [
      { criterion: 'Verständlichkeit', descriptionId: 'Pelafalan angka, kota, dan kata kerja jelas.' },
      { criterion: 'Inhalt', descriptionId: 'Keenam poin perkenalan diri tersampaikan.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a1-spr-002',
    level: 'A1',
    skill: 'sprechen',
    topic: 'Essen',
    title: 'Im Café bestellen und bezahlen',
    subtitle: 'Rollenspiel: Gast im Café',
    diff: 'Leicht',
    mins: 8,
    format: 'Sprechen · Rollenspiel',
    instr: 'Übe die Sätze laut, als wärst du Gast in einem Café.',
    prompt:
      'Begrüße den Kellner, bestelle ein Getränk und ein Stück Kuchen, frage nach dem WLAN-Passwort und bitte am Ende um die Rechnung.',
    explanationDe:
      'Benutze höfliche Formeln wie „Ich hätte gern...“, „Entschuldigung...“ und „Die Rechnung, bitte!“',
    explanationId:
      'Gunakan ungkapan pemesanan sopan seperti "Ich hätte gern..." dan "Die Rechnung, bitte!".',
    prepSeconds: 30,
    speakSeconds: 60,
    sampleAnswer:
      'Guten Tag! Ich hätte gern einen Cappuccino und ein Stück Apfelkuchen, bitte. Entschuldigung, haben Sie hier WLAN und wie ist das Passwort? ... Vielen Dank, es war sehr lecker. Die Rechnung, bitte! Ich möchte mit Karte zahlen.',
    checklist: [
      'Höfliche Begrüßung und Bestellung mit „bitte“',
      'Nach WLAN gefragt',
      'Um die Rechnung gebeten',
      'Zahlungsart (bar / mit Karte) genannt',
    ],
    rubric: [
      { criterion: 'Höflichkeit', descriptionId: 'Menggunakan kata "bitte", "danke", dan struktur permintaan sopan.' },
      { criterion: 'Flüssigkeit', descriptionId: 'Berbicara lancar dengan jeda alami.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a1-spr-003',
    level: 'A1',
    skill: 'sprechen',
    topic: 'Uhrzeit',
    title: 'Über meinen Tagesablauf erzählen',
    subtitle: 'Uhrzeiten und trennbare Verben sprechen',
    diff: 'Mittel',
    mins: 10,
    format: 'Sprechen · Monolog',
    instr: 'Beschreibe deinen typischen Wochentag von morgens bis abends.',
    prompt:
      'Erzähle laut über deinen Tag: Wann stehst du auf? Was frühstückst du? Wann arbeitest oder lernst du? Was machst du am Abend?',
    explanationDe:
      'Achte auf die trennbaren Verben („Ich stehe um ... auf“, „Ich kaufe ... ein“) und die Uhrzeiten.',
    explanationId:
      'Perhatikan kata kerja terpisah (aufstehen, einkaufen) dan penyebutan jam dengan preposisi "um".',
    prepSeconds: 45,
    speakSeconds: 75,
    sampleAnswer:
      'Von Montag bis Freitag stehe ich um halb sieben auf. Um sieben Uhr frühstücke ich Brot mit Käse und trinke Tee. Um acht Uhr fahre ich mit dem Bus zur Sprachschule. Nachmittags lerne ich Deutsch und kaufe ein. Abends koche ich um 19 Uhr und gehe um halb elf schlafen.',
    checklist: [
      'Mindestens 3 genaue Uhrzeiten mit „um“ genannt',
      'Mindestens 1 trennbares Verb korrekt benutzt',
      'Aktivitäten am Morgen, Mittag und Abend beschrieben',
    ],
    rubric: [
      { criterion: 'Zeitangaben', descriptionId: 'Jam dan waktu bagian hari diucapkan akurat.' },
      { criterion: 'Grammatik', descriptionId: 'Posisi kata kerja ke-2 terjaga saat kalimat diawali jam.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a1-spr-004',
    level: 'A1',
    skill: 'sprechen',
    topic: 'Einkaufen',
    title: 'Um Informationen und Hilfe bitten',
    subtitle: 'A1 Prüfungsteil 3: Bitten formulieren',
    diff: 'Mittel',
    mins: 8,
    format: 'Sprechen · Bitten',
    instr: 'Formuliere zu jeder Situation eine passende Frage oder Bitte.',
    prompt:
      'Sprich drei kurze Situationen laut: 1. Im Supermarkt suchst du Milch. 2. Am Bahnhof weißt du das Gleis nach Köln nicht. 3. Im Geschäft möchtest du eine Jacke anprobieren.',
    explanationDe:
      'Beginne Bitten mit „Entschuldigung...“ und nutze „Wo finde ich...?“, „Können Sie mir sagen...?“.',
    explanationId:
      'Awali permintaan bantuan dengan "Entschuldigung..." dan kalimat tanya yang sopan.',
    prepSeconds: 30,
    speakSeconds: 60,
    sampleAnswer:
      '1. Entschuldigung, wo finde ich bitte die Milch? 2. Entschuldigen Sie, auf welchem Gleis fährt der Zug nach Köln ab? 3. Guten Tag, kann ich diese blaue Jacke in Größe M bitte anprobieren? Wo ist die Kabine?',
    checklist: [
      'Alle 3 Alltagssituationen klar abgedeckt',
      'Höfliche „Sie“-Form verwendet',
      'Passende W-Fragen oder Ja/Nein-Fragen benutzt',
    ],
    rubric: [
      { criterion: 'Situationsangemessenheit', descriptionId: 'Pertanyaan cocok dengan konteks toko, stasiun, dan supermarket.' },
      { criterion: 'Aussprache', descriptionId: 'Intonasi kalimat tanya terdengar jelas.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a1-spr-005',
    level: 'A1',
    skill: 'sprechen',
    topic: 'Wohnen',
    title: 'Meine Wohnung oder mein Zimmer beschreiben',
    subtitle: 'Räume, Möbel und Lage mündlich erklären',
    diff: 'Leicht',
    mins: 10,
    format: 'Sprechen · Beschreibung',
    instr: 'Beschreibe in 45–60 Sekunden dein Zuhause.',
    prompt:
      'Erkläre, wie du wohnst: Wohnst du in einer Wohnung oder im Haus? Wie viele Zimmer gibt es? Welche Möbel stehen in deinem Lieblingszimmer?',
    explanationDe:
      'Nutze „Es gibt...“ und einfache Ortsangaben („rechts“, „neben dem Fenster“, „in der Küche“).',
    explanationId:
      'Gunakan frasa "Es gibt..." dan keterangan tempat sederhana untuk mendeskripsikan ruangan.',
    prepSeconds: 45,
    speakSeconds: 60,
    sampleAnswer:
      'Ich wohne in einer kleinen Wohnung im zweiten Stock. Die Wohnung hat zwei Zimmer, eine Küche, ein Bad und einen Balkon. Mein Lieblingszimmer ist das Wohnzimmer. Dort stehen ein bequemes Sofa, ein Holztisch und ein großes Bücherregal am Fenster.',
    checklist: [
      'Wohnform und Zimmeranzahl genannt',
      'Mindestens 3 Möbelstücke erwähnt',
      '„Es gibt“ oder lokale Präpositionen benutzt',
    ],
    rubric: [
      { criterion: 'Wortschatz', descriptionId: 'Kosakata ruangan dan perabotan digunakan dengan tepat.' },
      { criterion: 'Satzbau', descriptionId: 'Struktur kalimat deskripsi rapi.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a1-spr-006',
    level: 'A1',
    skill: 'sprechen',
    topic: 'Verkehr',
    title: 'Nach dem Weg fragen und Weg beschreiben',
    subtitle: 'Orientierung in der Stadt',
    diff: 'Mittel',
    mins: 8,
    format: 'Sprechen · Wegbeschreibung',
    instr: 'Stelle zuerst eine Frage nach dem Weg und erkläre dann selbst einen kurzen Weg.',
    prompt:
      '1. Frage einen Passanten nach dem Weg zur nächsten U-Bahn-Station. 2. Erkläre einem Freund den Weg vom Bahnhof zu deinem Deutschkurs (z. B. geradeaus, links, Ampel, zwei Minuten).',
    explanationDe:
      'Nutze den Imperativ („Gehen Sie geradeaus, biegen Sie links ab“) und klare Richtungsangaben.',
    explanationId:
      'Gunakan kalimat perintah sopan (Gehen Sie...) dan penunjuk arah dasar.',
    prepSeconds: 30,
    speakSeconds: 60,
    sampleAnswer:
      '1. Entschuldigung, wie komme ich hier zur nächsten U-Bahn-Station? Ist es weit zu Fuß? 2. Vom Bahnhof gehst du zuerst fünfzig Meter geradeaus bis zur Ampel. An der Ampel gehst du links in die Parkstraße. Nach zwei Minuten siehst du die Sprachschule rechts.',
    checklist: [
      'Wegfrage höflich gestellt',
      'Mindestens 3 Richtungsangaben verwendet (geradeaus, links, rechts, Ampel)',
      'Verständliche zeitliche/räumliche Abfolge',
    ],
    rubric: [
      { criterion: 'Klarheit', descriptionId: 'Petunjuk arah berurutan secara logis dan mudah diikuti.' },
      { criterion: 'Wortschatz', descriptionId: 'Kata arah dan transportasi tepat.' },
    ],
  }),
];

export const A1_PRODUKTIV_EXERCISES: Exercise[] = [
  ...A1_PRODUKTIV_SCHREIBEN,
  ...A1_PRODUKTIV_SPRECHEN,
];

export default A1_PRODUKTIV_EXERCISES;
