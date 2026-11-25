import { Exercise } from '../../../types/exercise';
import { buildProductiveExercise } from '../helpers';

export const A2_PRODUKTIV_SCHREIBEN: Exercise[] = [
  buildProductiveExercise({
    id: 'qb-a2-sch-001',
    level: 'A2',
    skill: 'schreiben',
    topic: 'Urlaub',
    title: 'Urlaubsbericht an eine Freundin schreiben',
    subtitle: 'Über Erlebnisse im Perfekt berichten und einladen',
    diff: 'Leicht',
    mins: 20,
    format: 'Schreiben · Persönliche E-Mail',
    instr: 'Schreibe eine E-Mail an deine Freundin Mia (ca. 60–80 Wörter).',
    prompt:
      'Du bist gerade von einem Kurzurlaub in Österreich zurückgekommen. Schreibe an Mia: 1. Wohin bist du gefahren und mit wem? 2. Was habt ihr dort gemacht (mindestens zwei Aktivitäten im Perfekt)? 3. Lade Mia für nächstes Wochenende zu dir ein, um Fotos anzuschauen.',
    explanationDe:
      'Auf A2 verbindest du Hauptsätze mit Konnektoren wie „und“, „aber“, „denn“ und benutzt das Perfekt korrekt („sind gefahren“, „haben besichtigt“).',
    explanationId:
      'Pada level A2 gunakan kalimat majemuk dengan konjungsi sederhana dan bentuk lampau Perfekt dengan tepat.',
    wordLimit: { min: 50, max: 110 },
    sampleAnswer:
      'Liebe Mia,\nich bin gestern aus Salzburg zurückgekommen. Ich war vier Tage mit meinem Bruder dort und das Wetter war richtig schön. Am ersten Tag haben wir die Altstadt besichtigt und am nächsten Tag sind wir in die Berge gewandert. Abends haben wir zusammen ein leckeres Schnitzel gegessen. Hast du nächstes Wochenende am Samstag Zeit? Dann kannst du zu mir kommen und wir schauen meine Urlaubsfotos an!\nViele Grüße\nTimo',
    checklist: [
      'Passende persönliche Anrede und Grußformel benutzt',
      'Ziel und Begleitung genannt',
      'Mindestens zwei Aktivitäten korrekt im Perfekt beschrieben',
      'Konkrete Einladung fürs nächste Wochenende formuliert',
    ],
    rubric: [
      { criterion: 'Inhalt', descriptionId: 'Ketiga poin tugas terjawab lengkap dan runtut.' },
      { criterion: 'Grammatik A2', descriptionId: 'Bentuk Perfekt (haben/sein) dan urutan kata tepat.' },
      { criterion: 'Wortschatz & Kohärenz', descriptionId: 'Penghubung kalimat (und, dann, aber) wajar.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a2-sch-002',
    level: 'A2',
    skill: 'schreiben',
    topic: 'Termine',
    title: 'Arzttermin höflich verschieben',
    subtitle: 'Formelle E-Mail an eine Arztpraxis verfassen',
    diff: 'Mittel',
    mins: 20,
    format: 'Schreiben · Formelle E-Mail',
    instr: 'Schreibe eine formelle E-Mail an die Praxis Dr. Weber (ca. 55–80 Wörter).',
    prompt:
      'Du hast am Donnerstag um 10:30 Uhr einen Termin bei Frau Dr. Weber, musst aber arbeiten. Schreibe der Praxis: 1. Sage den Termin am Donnerstag höflich ab und nenne den Grund. 2. Bitte um einen neuen Termin nächste Woche ab 16:00 Uhr. 3. Frage, ob du deine Versichertenkarte mitbringen musst.',
    explanationDe:
      'Achte auf die Sie-Form, höfliche Bitten mit „Könnte ich bitte...“ oder „Wäre es möglich...“ sowie einen klaren Betreff.',
    explanationId:
      'Gunakan ragam resmi "Sie", ungkapan sopan untuk menjadwalkan ulang, serta pembuka dan penutup formal.',
    wordLimit: { min: 45, max: 100 },
    sampleAnswer:
      'Sehr geehrtes Praxisteam,\nich habe am Donnerstag um 10:30 Uhr einen Termin bei Frau Dr. Weber. Leider muss ich diesen Termin absagen, weil ich spontan ein wichtiges Meeting in der Firma habe. Könnte ich bitte nächste Woche einen neuen Termin nach 16:00 Uhr bekommen? Muss ich zu diesem Termin wieder meine Versichertenkarte mitbringen? Vielen Dank für Ihr Verständnis.\nMit freundlichen Grüßen\nLukas Hartmann',
    checklist: [
      'Formelle Anrede („Sehr geehrte(s)...“) verwendet',
      'Ursprünglichen Termin genannt und Absage begründet',
      'Wunschzeit ab 16:00 Uhr in der nächsten Woche angegeben',
      'Frage zur Versichertenkarte gestellt und formell gegrüßt',
    ],
    rubric: [
      { criterion: 'Register', descriptionId: 'Ragam sopan "Sie" konsisten dari awal hingga akhir.' },
      { criterion: 'Vollständigkeit', descriptionId: 'Alasan pembatalan, permintaan jadwal baru, dan pertanyaan kartu ada.' },
      { criterion: 'Satzbau', descriptionId: 'Penggunaan klausa "weil" dan pertanyaan sopan benar.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a2-sch-003',
    level: 'A2',
    skill: 'schreiben',
    topic: 'Wohnung',
    title: 'Einladung zur Einweihungsfeier',
    subtitle: 'Neue Wohnung beschreiben und Gäste informieren',
    diff: 'Leicht',
    mins: 20,
    format: 'Schreiben · Einladung',
    instr: 'Schreibe eine Einladung an deine Kolleginnen und Kollegen (ca. 60–85 Wörter).',
    prompt:
      'Du bist umgezogen und möchtest am Samstag eine kleine Party feiern. Schreibe: 1. Wann und wo findet die Feier statt? 2. Wie gefällt dir die neue Wohnung und wie kommt man dorthin? 3. Was sollen die Gäste mitbringen und bis wann sollen sie antworten?',
    explanationDe:
      'Verwende freundliche Imperative oder Modalverben („ihr könnt...“, „bringt bitte...“) und klare Orts-/Zeitangaben.',
    explanationId:
      'Cantumkan waktu, alamat/arah menuju apartemen baru, serta permintaan balasan yang jelas.',
    wordLimit: { min: 50, max: 110 },
    sampleAnswer:
      'Liebe Kolleginnen und Kollegen,\nich bin letzte Woche umgezogen und möchte am Samstag um 18:00 Uhr meine neue Wohnung feiern! Sie liegt in der Schillerstraße 14 und hat einen schönen, großen Balkon. Ihr könnt einfach mit der U-Bahn Linie 2 bis „Parkplatz“ fahren, von dort sind es nur fünf Minuten zu Fuß. Für Essen sorge ich, bringt bitte nur gute Laune und vielleicht ein Getränk mit. Bitte gebt mir bis Donnerstag Bescheid, ob ihr kommt!\nHerzliche Grüße\nRina',
    checklist: [
      'Datum, Uhrzeit und Adresse klar angegeben',
      'Wohnung kurz beschrieben und Weg erklärt',
      'Mitbringsel und Rückmeldefrist genannt',
      'Angemessener Ton für Kollegen gewählt',
    ],
    rubric: [
      { criterion: 'Inhalt', descriptionId: 'Semua detail acara (waktu, lokasi, rute, RSVP) jelas.' },
      { criterion: 'Wortschatz', descriptionId: 'Kosakata tempat tinggal dan transportasi tepat.' },
      { criterion: 'Grammatik', descriptionId: 'Preposisi lokasi dan waktu digunakan akurat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a2-sch-004',
    level: 'A2',
    skill: 'schreiben',
    topic: 'Dienstleistungen',
    title: 'Reklamation an einen Online-Shop',
    subtitle: 'Defekte Bestellung reklamieren und Lösung fordern',
    diff: 'Anspruchsvoll',
    mins: 25,
    format: 'Schreiben · Reklamation',
    instr: 'Schreibe eine Beschwerde-E-Mail an den Kundenservice (ca. 65–90 Wörter).',
    prompt:
      'Du hast online eine Kaffeemaschine bestellt, aber sie funktioniert nicht. Schreibe an den Kundenservice: 1. Was und wann hast du bestellt (Bestellnummer nennen)? 2. Was genau ist das Problem? 3. Was möchtest du (Umtausch oder Geld zurück) und bis wann erwartest du eine Antwort?',
    explanationDe:
      'Bei einer Reklamation bleibt man sachlich und höflich, nennt Bestelldaten und formuliert eine klare Bitte mit Frist.',
    explanationId:
      'Pada komplain resmi, jelaskan nomor pesanan, kerusakan barang, dan solusi yang diharapkan secara sopan dan tegas.',
    wordLimit: { min: 55, max: 115 },
    sampleAnswer:
      'Sehr geehrte Damen und Herren,\nam 12. Mai habe ich bei Ihnen eine Kaffeemaschine mit der Bestellnummer 48291 gekauft. Gestern ist das Paket angekommen, aber leider funktioniert die Maschine nicht: Sie heizt das Wasser nicht auf und der Knopf klemmt. Deshalb möchte ich das Gerät gern umtauschen oder mein Geld zurückbekommen. Bitte senden Sie mir bis Freitag ein kostenloses Rücksendeetikett per E-Mail.\nMit freundlichen Grüßen\nDewi Santoso',
    checklist: [
      'Formelle Anrede und Grußformel verwendet',
      'Kaufdatum und Bestellnummer genannt',
      'Defekt konkret beschrieben',
      'Klare Forderung (Umtausch/Erstattung) und Frist angegeben',
    ],
    rubric: [
      { criterion: 'Aufgabenbewältigung', descriptionId: 'Data pesanan, keluhan, dan tuntutan solusi lengkap.' },
      { criterion: 'Angemessenheit', descriptionId: 'Nada profesional, sopan, dan objektif.' },
      { criterion: 'Sprachliche Korrektheit', descriptionId: 'Konjungsi "aber", "deshalb" dan urutan verba benar.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a2-sch-005',
    level: 'A2',
    skill: 'schreiben',
    topic: 'Beruf',
    title: 'Kurze Bewerbung um ein Praktikum',
    subtitle: 'Interesse bekunden, Fähigkeiten nennen und um Gespräch bitten',
    diff: 'Anspruchsvoll',
    mins: 25,
    format: 'Schreiben · Formelle E-Mail',
    instr: 'Schreibe eine kurze E-Mail an Frau Krüger von „Bäckerei & Café Sonnenschein“ (ca. 65–90 Wörter).',
    prompt:
      'Du möchtest im August ein vierwöchiges Praktikum im Café machen. Schreibe Frau Krüger: 1. Warum schreibst du und für welchen Zeitraum suchst du das Praktikum? 2. Welche Erfahrungen oder Stärken hast du (z. B. Pünktlichkeit, Deutschkenntnisse, Freundlichkeit)? 3. Frage nach einem persönlichen Vorstellungsgespräch.',
    explanationDe:
      'Verbinde Sätze mit „weil“ und „deshalb“ und zeige Motivation ohne übertriebene Formulierungen.',
    explanationId:
      'Jelaskan alasan melamar magang, periode waktu, kelebihan diri, serta ajakan wawancara secara sopan.',
    wordLimit: { min: 55, max: 115 },
    sampleAnswer:
      'Sehr geehrte Frau Krüger,\nich habe Ihre Anzeige im Schaufenster gelesen und möchte mich gern für ein Praktikum im August bewerben. Ich lerne seit einem Jahr Deutsch und arbeite sehr gern mit Menschen zusammen. Außerdem bin ich pünktlich, zuverlässig und habe schon im Restaurant meiner Familie geholfen. Deshalb glaube ich, dass ich gut in Ihr Team passe. Wann kann ich mich persönlich bei Ihnen vorstellen?\nMit freundlichen Grüßen\nPutri Anjani',
    checklist: [
      'Konkreten Zeitraum (August) und Position genannt',
      'Mindestens zwei persönliche Stärken oder Erfahrungen beschrieben',
      'Konnektoren wie „deshalb“ oder „außerdem“ genutzt',
      'Höflich um ein Gespräch gebeten',
    ],
    rubric: [
      { criterion: 'Inhalt', descriptionId: 'Tujuan lamaran, keunggulan diri, dan permintaan wawancara jelas.' },
      { criterion: 'Form', descriptionId: 'Salam pembuka dan penutup formal sesuai.' },
      { criterion: 'Grammatik', descriptionId: 'Klausa dengan "dass" dan konjungsi lain tepat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a2-sch-006',
    level: 'A2',
    skill: 'schreiben',
    topic: 'Gesundheit',
    title: 'Krankmeldung an die Sprachschule',
    subtitle: 'Abwesenheit melden und um Hausaufgaben bitten',
    diff: 'Leicht',
    mins: 15,
    format: 'Schreiben · Kursnachricht',
    instr: 'Schreibe eine E-Mail an deine Deutschlehrerin Frau Klein (ca. 50–75 Wörter).',
    prompt:
      'Du bist heute krank und kannst nicht zum Deutschkurs kommen. Schreibe Frau Klein: 1. Was tut dir weh und seit wann fühlst du dich krank? 2. Wie lange wirst du voraussichtlich fehlen? 3. Bitte um die Hausaufgaben per E-Mail, damit du zu Hause lernen kannst.',
    explanationDe:
      'Nenne Symptome mit „Ich habe...“ oder „Mir tut ... weh“ und benutze „damit“ oder „deshalb“.',
    explanationId:
      'Gunakan ungkapan gejala sakit yang tepat di level A2 dan minta tugas rumah dengan sopan.',
    wordLimit: { min: 45, max: 95 },
    sampleAnswer:
      'Liebe Frau Klein,\nleider kann ich heute nicht zum Deutschkurs kommen, weil ich seit gestern Abend starkes Fieber und Halsschmerzen habe. Heute Nachmittag gehe ich zum Arzt. Ich denke, dass ich bis Mittwoch zu Hause bleiben muss. Könnten Sie mir bitte die Hausaufgaben für heute und morgen per E-Mail schicken? Dann kann ich im Bett ein bisschen weiterlernen.\nViele Grüße\nBima Pratama',
    checklist: [
      'Symptome und Beginn der Krankheit genannt',
      'Voraussichtliche Dauer der Abwesenheit erwähnt',
      'Höfliche Bitte um die Hausaufgaben formuliert',
      'Passende Anrede und Grußformel gewählt',
    ],
    rubric: [
      { criterion: 'Inhalt', descriptionId: 'Kondisi sakit, lama absen, dan permintaan tugas ada.' },
      { criterion: 'Wortschatz', descriptionId: 'Kosakata kesehatan dan bagian tubuh akurat.' },
      { criterion: 'Grammatik', descriptionId: 'Klausa "weil" dan "dass" dengan posisi verba di akhir.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a2-sch-007',
    level: 'A2',
    skill: 'schreiben',
    topic: 'Reisen',
    title: 'Hotelbuchung per E-Mail vornehmen',
    subtitle: 'Zimmer reservieren und Zusatzwünsche anfragen',
    diff: 'Mittel',
    mins: 20,
    format: 'Schreiben · Formelle Anfrage',
    instr: 'Schreibe eine E-Mail an das „Hotel am See“ (ca. 55–85 Wörter).',
    prompt:
      'Du möchtest vom 10. bis 13. Juli ein Zimmer reservieren. Schreibe dem Hotel: 1. Welches Zimmer möchtest du (Einzel- oder Doppelzimmer) und für wie viele Nächte? 2. Welche Wünsche hast du (z. B. Frühstück, ruhiges Zimmer, Parkplatz)? 3. Frage nach dem Gesamtpreis und den Stornierungsbedingungen.',
    explanationDe:
      'Verwende „Ich möchte ... reservieren“, Datumsangaben mit „vom ... bis zum ...“ und indirekte Fragen mit „ob“.',
    explanationId:
      'Sertakan tanggal menginap, tipe kamar, permintaan tambahan, serta pertanyaan harga total secara formal.',
    wordLimit: { min: 45, max: 110 },
    sampleAnswer:
      'Sehr geehrte Damen und Herren,\nich möchte gern vom 10. bis zum 13. Juli (drei Nächte) ein ruhiges Doppelzimmer mit Frühstück in Ihrem Hotel reservieren. Da wir mit dem Auto anreisen, brauchen wir auch einen Parkplatz. Könnten Sie mir bitte schreiben, wie hoch der Gesamtpreis ist und ob man die Buchung bis zwei Tage vor Anreise kostenlos stornieren kann? Über eine schnelle Antwort freue ich mich.\nMit freundlichen Grüßen\nHanna Widjaja',
    checklist: [
      'Reisedaten und Zimmertyp genau genannt',
      'Mindestens zwei konkrete Wünsche angegeben',
      'Nach Gesamtpreis und Stornierung gefragt',
      'Formell begonnen und beendet',
    ],
    rubric: [
      { criterion: 'Inhalt', descriptionId: 'Tanggal, tipe kamar, fasilitas, dan pertanyaan biaya lengkap.' },
      { criterion: 'Grammatik', descriptionId: 'Pertanyaan tidak langsung ("ob") dan preposisi tanggal benar.' },
      { criterion: 'Register', descriptionId: 'Gaya bahasa resmi untuk pemesanan hotel tepat.' },
    ],
  }),
];

export const A2_PRODUKTIV_SPRECHEN: Exercise[] = [
  buildProductiveExercise({
    id: 'qb-a2-spr-001',
    level: 'A2',
    skill: 'sprechen',
    topic: 'Alltag',
    title: 'Über den eigenen Tagesablauf & Arbeitstag sprechen',
    subtitle: 'Monolog mit Zeitangaben und trennbaren Verben',
    diff: 'Leicht',
    mins: 10,
    format: 'Sprechen · Kurzmonolog (Teil 1)',
    instr: 'Bereite dich 1 Minute vor und sprich dann ca. 1,5–2 Minuten über deinen typischen Tag.',
    prompt:
      'Erzähle laut über deinen typischen Wochentag: 1. Wann stehst du auf und wie beginnst du den Morgen? 2. Wie kommst du zur Arbeit oder zur Uni und was machst du dort? 3. Was machst du am Feierabend zur Entspannung?',
    explanationDe:
      'Achte auf die richtige Wortstellung nach Zeitangaben am Satzanfang („Um sieben Uhr stehe ich auf“) und auf trennbare Verben („aufstehen“, „einkaufen“).',
    explanationId:
      'Perhatikan inversi subjek-predikat setelah keterangan waktu di awal kalimat serta verba terpisah (trennbare Verben).',
    prepSeconds: 60,
    speakSeconds: 120,
    sampleAnswer:
      'An einem normalen Arbeitstag stehe ich um 6:30 Uhr auf. Zuerst dusche ich und trinke einen starken Kaffee mit Brot. Um 7:45 Uhr fahre ich mit der S-Bahn ins Büro, die Fahrt dauert zwanzig Minuten. Dort beantworte ich E-Mails, habe Besprechungen und mache um 12:30 Uhr Mittagspause. Um 17 Uhr fahre ich nach Hause, kaufe manchmal noch Gemüse ein und koche zusammen mit meiner Familie. Abends lese ich gern oder schaue eine Serie.',
    checklist: [
      'Zeitangaben mit Inversion richtig gesprochen („Um 7 Uhr stehe ich...“)',
      'Trennbare Verben am Satzende korrekt getrennt',
      'Alle drei Leitpunkte flüssig abgedeckt',
    ],
    rubric: [
      { criterion: 'Flüssigkeit', descriptionId: 'Berbicara runtut tanpa jeda panjang yang mengganggu.' },
      { criterion: 'Grammatik', descriptionId: 'Urutan kata inversi dan verba terpisah benar.' },
      { criterion: 'Aussprache', descriptionId: 'Pelafalan jam, bunyi ch/sch, dan intonasi jelas.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a2-spr-002',
    level: 'A2',
    skill: 'sprechen',
    topic: 'Freizeit',
    title: 'Gemeinsam einen Ausflug fürs Wochenende planen',
    subtitle: 'Vorschläge machen, ablehnen und einen Kompromiss finden',
    diff: 'Mittel',
    mins: 12,
    format: 'Sprechen · Dialogplanung (Teil 3)',
    instr: 'Plane laut ein Gespräch (ca. 2 Minuten): Sprich beide Rollen oder stelle dir vor, du sprichst mit deinem Partner.',
    prompt:
      'Ihr möchtet am Samstag zusammen einen Ausflug machen. Besprich laut: 1. Wohin wollt ihr fahren (See, Berg oder Stadt)? 2. Wie kommt ihr hin (Zug oder Auto) und wann trefft ihr euch? 3. Was nehmt ihr zu essen und zu trinken mit?',
    explanationDe:
      'Nutze typische A2-Dialogmittel: „Wollen wir...?“, „Ich schlage vor, dass...“, „Das finde ich gut, aber...“, „Einverstanden!“.',
    explanationId:
      'Gunakan ungkapan mengajak, menyetujui, menolak secara halus, dan menyepakati rencana bersama.',
    prepSeconds: 60,
    speakSeconds: 120,
    sampleAnswer:
      'Hallo Alex, hast du am Samstag Zeit für einen Ausflug? – Ja, sehr gern! Wohin sollen wir fahren? – Ich schlage vor, wir fahren an den Starnberger See. – Gute Idee, aber das Wetter soll vielleicht windig sein. Wie wäre es mit einer Wanderung und danach einem Café in der Stadt? – Einverstanden! Wollen wir den Zug um 9:15 Uhr nehmen? – Perfekt, dann treffen wir uns um 9 Uhr am Hauptbahnhof. Ich bringe belegte Brötchen mit und du kannst Wasser mitnehmen. – Abgemacht!',
    checklist: [
      'Mindestens einen Vorschlag gemacht („Wollen wir...?“)',
      'Einen Gegen- oder Alternativvorschlag begründet',
      'Konkrete Uhrzeit, Treffpunkt und Verpflegung vereinbart',
    ],
    rubric: [
      { criterion: 'Interaktion', descriptionId: 'Mampu mengajukan saran dan menanggapi ide lawan bicara.' },
      { criterion: 'Wortschatz', descriptionId: 'Kosakata perencanaan waktu, transportasi, dan kegiatan tepat.' },
      { criterion: 'Verständlichkeit', descriptionId: 'Artikulasi jelas dan tempo alami.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a2-spr-003',
    level: 'A2',
    skill: 'sprechen',
    topic: 'Vergangenheit',
    title: 'Ein schönes Erlebnis aus der Vergangenheit erzählen',
    subtitle: 'Im Perfekt und Präteritum (war/hatte) berichten',
    diff: 'Mittel',
    mins: 10,
    format: 'Sprechen · Erfahrung (Teil 2)',
    instr: 'Bereite dich 1 Minute vor und erzähle ca. 1,5–2 Minuten von einem besonderen Erlebnis.',
    prompt:
      'Erzähle von einem Fest oder einer Feier, die dir besonders gut gefallen hat: 1. Was für ein Fest war es und wann hat es stattgefunden? 2. Wer war dabei und was habt ihr gemacht? 3. Warum hat dir dieses Fest so gut gefallen?',
    explanationDe:
      'Verwende „war“ und „hatte“ im Präteritum sowie andere Verben im Perfekt („haben gefeiert“, „sind gegangen“, „haben gesungen“).',
    explanationId:
      'Kombinasikan "war/hatte" dengan bentuk Perfekt untuk menceritakan peristiwa masa lalu secara alami.',
    prepSeconds: 60,
    speakSeconds: 120,
    sampleAnswer:
      'Letzten Sommer hat meine ältere Schwester geheiratet, und die Hochzeit war wirklich unvergesslich. Über hundert Gäste sind gekommen: unsere ganze Familie und viele alte Freunde. Die Feier hat in einem schönen Garten stattgefunden. Wir haben köstliches Essen gegessen, viel gelacht und bis Mitternacht getanzt. Das Fest hat mir besonders gut gefallen, weil alle so glücklich waren und wir uns nach langer Zeit wieder gesehen haben.',
    checklist: [
      'Zeitpunkt und Anlass klar genannt',
      'Perfekt und „war/hatte“ überwiegend korrekt genutzt',
      'Persönliche Begründung mit „weil“ gegeben',
    ],
    rubric: [
      { criterion: 'Tempusgebrauch', descriptionId: 'Penggunaan Perfekt dan war/hatte konsisten.' },
      { criterion: 'Inhalt', descriptionId: 'Cerita hidup dengan detail tamu, aktivitas, dan alasan.' },
      { criterion: 'Aussprache', descriptionId: 'Intonasi kalimat berita dan penekanan kata tepat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a2-spr-004',
    level: 'A2',
    skill: 'sprechen',
    topic: 'Ernährung',
    title: 'Über Essgewohnheiten und Kochen sprechen',
    subtitle: 'Vorlieben, Häufigkeit und gesundes Essen beschreiben',
    diff: 'Leicht',
    mins: 10,
    format: 'Sprechen · Themenpräsentation',
    instr: 'Sprich ca. 1,5 Minuten über das Thema „Essen und Kochen“.',
    prompt:
      'Beantworte die folgenden Punkte in deinem Kurzvortrag: 1. Was isst du normalerweise zum Frühstück und Mittagessen? 2. Kochst du oft selbst oder gehst du lieber ins Restaurant? 3. Was ist dein Lieblingsgericht und warum?',
    explanationDe:
      'Nutze Häufigkeitsadverbien („meistens“, „selten“, „ab und zu“) und erkläre Vorlieben mit „gern“ und „weil“.',
    explanationId:
      'Gunakan keterangan frekuensi ("meistens", "oft", "selten") dan jelaskan makanan favoritmu dengan alasan singkat.',
    prepSeconds: 45,
    speakSeconds: 90,
    sampleAnswer:
      'Zum Frühstück esse ich meistens Haferflocken mit Obst oder ein Brötchen mit Käse. Mittags esse ich in der Kantine, weil ich wenig Zeit habe. Abends koche ich aber fast jeden Tag selbst, denn frisches Essen ist gesünder und günstiger als das Restaurant. Am liebsten koche ich gebratenen Reis mit Gemüse und Hähnchen, weil das schnell geht und sehr würzig schmeckt.',
    checklist: [
      'Mindestens zwei Häufigkeitsadverbien verwendet',
      'Vergleich („gesünder“, „günstiger“) eingebaut',
      'Lieblingsgericht genannt und begründet',
    ],
    rubric: [
      { criterion: 'Wortschatz', descriptionId: 'Kosakata makanan, rasa, dan frekuensi bervariasi.' },
      { criterion: 'Grammatik', descriptionId: 'Bentuk komparatif dan klausa "weil/denn" tepat.' },
      { criterion: 'Flüssigkeit', descriptionId: 'Penyampaian lancar dan mudah dipahami.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a2-spr-005',
    level: 'A2',
    skill: 'sprechen',
    topic: 'Kleidung',
    title: 'Im Bekleidungsgeschäft umtauschen oder beraten lassen',
    subtitle: 'Alltagsdialog im Geschäft mit Höflichkeitsformen',
    diff: 'Mittel',
    mins: 10,
    format: 'Sprechen · Rollenspiel',
    instr: 'Spiele laut eine Einkaufssituation im Geschäft (ca. 1,5 Minuten).',
    prompt:
      'Du hast letzte Woche eine Jacke gekauft, aber sie ist zu eng und ein Knopf fehlt. Sprich laut als Kunde im Geschäft: 1. Begrüße die Verkäuferin höflich und erkläre das Problem. 2. Frage nach derselben Jacke in einer Nummer größer. 3. Frage, was passiert, falls die Größe nicht mehr da ist (Gutschein oder Geld zurück).',
    explanationDe:
      'Wichtige Redemittel: „Ich möchte gern reklamieren/umtauschen“, „Haben Sie diese Jacke noch in Größe L?“, „Hier ist der Kassenbon.“',
    explanationId:
      'Gunakan frasa transaksi di toko seperti menanyakan ukuran, menunjukkan struk, dan menanyakan pengembalian dana.',
    prepSeconds: 45,
    speakSeconds: 90,
    sampleAnswer:
      'Guten Tag! Ich habe letzte Woche diese blaue Jacke hier gekauft, hier ist auch der Kassenbon. Leider ist mir Größe M zu eng, und außerdem fehlt ein Knopf am Ärmel. Haben Sie dieses Modell vielleicht noch in Größe L? Falls Größe L ausverkauft ist, könnte ich die Jacke dann zurückgeben und mein Geld zurückbekommen? Vielen Dank für Ihre Hilfe!',
    checklist: [
      'Höfliche Begrüßung und Nennung des Kassenbons',
      'Beide Probleme (zu eng, Knopf fehlt) genannt',
      'Alternative (Größe L oder Geld zurück) höflich erfragt',
    ],
    rubric: [
      { criterion: 'Kommunikatives Ziel', descriptionId: 'Keluhan dan permintaan penukaran/refund tersampaikan jelas.' },
      { criterion: 'Höflichkeit', descriptionId: 'Menggunakan kata sopan ("könnte ich", "vielen Dank").' },
      { criterion: 'Aussprache & Struktur', descriptionId: 'Pengucapan jelas dengan kalimat yang utuh.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a2-spr-006',
    level: 'A2',
    skill: 'sprechen',
    topic: 'Verkehr',
    title: 'Nach dem Weg fragen und eine Route erklären',
    subtitle: 'Präpositionen und Richtungsangaben sicher anwenden',
    diff: 'Leicht',
    mins: 10,
    format: 'Sprechen · Alltagssituation',
    instr: 'Erkläre laut einem Touristen den Weg vom Bahnhof zum Stadtmuseum (ca. 1,5 Minuten).',
    prompt:
      'Ein Tourist fragt dich am Hauptbahnhof nach dem Weg zum Stadtmuseum. Erkläre ihm zwei Möglichkeiten: 1. Wie kommt er zu Fuß dorthin (links/rechts/geradeaus, ca. 10 Minuten)? 2. Welche Straßenbahn kann er nehmen und wo muss er aussteigen? 3. Gib einen kurzen Tipp, was er dort noch ansehen kann.',
    explanationDe:
      'Verwende Imperativ in der Sie-Form („Gehen Sie geradeaus“, „Biegen Sie rechts ab“, „Nehmen Sie die Linie 4“).',
    explanationId:
      'Gunakan bentuk perintah sopan "Sie" untuk memberi petunjuk arah jalan kaki dan naik transportasi umum.',
    prepSeconds: 45,
    speakSeconds: 90,
    sampleAnswer:
      'Das Stadtmuseum ist gar nicht weit von hier! Wenn Sie zu Fuß gehen möchten, verlassen Sie den Bahnhof und gehen Sie etwa dreihundert Meter geradeaus durch die Fußgängerzone. An der großen Kreuzung biegen Sie links in die Marktstraße ab. Nach fünf Minuten sehen Sie das Museum auf der rechten Seite neben der Kirche. Wenn es regnet, können Sie auch die Straßenbahn Nummer 4 nehmen und an der dritten Haltestelle „Rathaus“ aussteigen. Gleich neben dem Museum gibt es übrigens ein tolles altes Café!',
    checklist: [
      'Mindestens drei Richtungsangaben richtig benutzt',
      'Straßenbahnlinie und Ausstiegshaltestelle genannt',
      'Imperativ („Gehen Sie...“, „Nehmen Sie...“) korrekt gebildet',
    ],
    rubric: [
      { criterion: 'Klarheit', descriptionId: 'Petunjuk arah mudah diikuti secara logis.' },
      { criterion: 'Grammatik', descriptionId: 'Bentuk imperatif "Sie" dan preposisi lokasi/arah benar.' },
      { criterion: 'Wortschatz', descriptionId: 'Kosakata jalan dan transportasi umum tepat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-a2-spr-007',
    level: 'A2',
    skill: 'sprechen',
    topic: 'Erfahrungen',
    title: 'Über Deutschlernen und eigene Lernerfahrungen sprechen',
    subtitle: 'Gründe, Schwierigkeiten und Tipps formulieren',
    diff: 'Anspruchsvoll',
    mins: 12,
    format: 'Sprechen · Persönliches Statement',
    instr: 'Bereite dich 1 Minute vor und sprich ca. 2 Minuten über deine Erfahrungen beim Deutschlernen.',
    prompt:
      'Sprich über dein Deutschlernen: 1. Seit wann und warum lernst du Deutsch? 2. Was fällt dir leicht und was findest du besonders schwierig (z. B. Artikel, Grammatik, Hören)? 3. Welche Lernmethoden helfen dir im Alltag am meisten?',
    explanationDe:
      'Strukturiere deine Rede mit „Erstens“, „Zweitens“, „Zum Schluss“ und nutze „um ... zu“ oder „weil“ für Begründungen.',
    explanationId:
      'Susun pemaparan secara terstruktur dan jelaskan alasan belajar serta strategi yang membantu Anda.',
    prepSeconds: 60,
    speakSeconds: 120,
    sampleAnswer:
      'Ich lerne jetzt seit ungefähr acht Monaten Deutsch, weil ich später in Deutschland als Ingenieur arbeiten möchte. Am Anfang fand ich die Artikel der, die und das sehr schwer, aber inzwischen verstehe ich das System besser. Das Lesen macht mir viel Spaß und fällt mir relativ leicht. Schwieriger ist manchmal das schnelle Sprechen im Alltag. Mir hilft es am meisten, jeden Tag zwanzig Minuten neue Wörter mit Beispielsätzen zu üben und deutsche Podcasts zu hören.',
    checklist: [
      'Dauer und Motivation für das Deutschlernen genannt',
      'Stärken und Schwierigkeiten konkret benannt',
      'Eigene Lernstrategie beschrieben und Sätze sinnvoll verknüpft',
    ],
    rubric: [
      { criterion: 'Aufbau', descriptionId: 'Presentasi terstruktur dari alasan, tantangan, hingga solusi.' },
      { criterion: 'Sprachliche Mittel', descriptionId: 'Penggunaan "weil", komparatif, dan urutan kata benar.' },
      { criterion: 'Ausdruck', descriptionId: 'Kosakata mencukupi untuk membahas pengalaman belajar.' },
    ],
  }),
];

export const A2_PRODUKTIV_EXERCISES: Exercise[] = [
  ...A2_PRODUKTIV_SCHREIBEN,
  ...A2_PRODUKTIV_SPRECHEN,
];
