import { Exercise } from '../../../types/exercise';
import { buildProductiveExercise } from '../helpers';

export const B1_PRODUKTIV_SCHREIBEN: Exercise[] = [
  buildProductiveExercise({
    id: 'qb-b1-sch-001',
    level: 'B1',
    skill: 'schreiben',
    topic: 'Meinungen',
    title: 'Forumsbeitrag zum Thema „Homeoffice vs. Büro“ verfassen',
    subtitle: 'Eigene Meinung begründen und Vor- und Nachteile abwägen',
    diff: 'Mittel',
    mins: 25,
    format: 'Schreiben · Diskussionsbeitrag',
    instr: 'Schreibe einen Forumsbeitrag zum Thema „Arbeiten im Homeoffice“ (ca. 90–120 Wörter).',
    prompt:
      'In einem Online-Forum wird diskutiert, ob Mitarbeiter dauerhaft von zu Hause aus arbeiten sollten. Schreibe deine Meinung: 1. Welche Vorteile hat das Homeoffice aus deiner Sicht? 2. Welche Nachteile oder Probleme siehst du bei reiner Heimarbeit? 3. Welche Lösung findest du für die Zukunft am besten?',
    explanationDe:
      'Nutze auf B1 klare Verknüpfungen („einerseits ... andererseits“, „außerdem“, „deshalb“) und begründe deine Haltung nachvollziehbar.',
    explanationId:
      'Gunakan penghubung argumen B1 seperti "einerseits ... andererseits", "obwohl", dan "deshalb" untuk menyusun opini yang seimbang.',
    wordLimit: { min: 75, max: 160 },
    sampleAnswer:
      'Meiner Meinung nach ist das Homeoffice eine großartige Möglichkeit, aber nicht für jede Situation perfekt. Einerseits sparen Berufstätige viel Zeit und Geld, weil sie nicht täglich durch den Stau pendeln müssen. Außerdem kann man zu Hause oft ruhiger und konzentrierter arbeiten. Andererseits fehlen bei reiner Heimarbeit der persönliche Kontakt und der schnelle Austausch mit Kolleginnen, sodass man sich manchmal einsam fühlt. Zudem fällt es vielen schwer, abends pünktlich Feierabend zu machen. Deshalb halte ich ein hybrides Modell mit zwei bis drei Homeoffice-Tagen pro Woche für die beste Lösung für die Zukunft.',
    checklist: [
      'Klare eigene Position zu Beginn oder am Ende formuliert',
      'Vorteile und Nachteile sachlich gegenübergestellt',
      'Passende B1-Konnektoren („einerseits/andererseits“, „weil“, „deshalb“) benutzt',
      'Konkrete Empfehlung für die Zukunft abgegeben',
    ],
    rubric: [
      { criterion: 'Inhalt & Argumentation', descriptionId: 'Kelebihan, kekurangan, dan solusi masa depan terjawab lengkap.' },
      { criterion: 'Kohärenz & Konnektoren', descriptionId: 'Alur argumen runtut dengan penghubung kalimat B1 yang bervariasi.' },
      { criterion: 'Sprachliche Korrektheit', descriptionId: 'Tata bahasa anak kalimat dan ejaan terjaga baik.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b1-sch-002',
    level: 'B1',
    skill: 'schreiben',
    topic: 'Alltag',
    title: 'Beschwerde-E-Mail an die Hausverwaltung schreiben',
    subtitle: 'Mangel sachlich schildern, Frist setzen und Reaktion erbitten',
    diff: 'Mittel',
    mins: 25,
    format: 'Schreiben · Formelle Beschwerde',
    instr: 'Schreibe eine formelle E-Mail an deine Hausverwaltung (ca. 80–120 Wörter).',
    prompt:
      'Seit einer Woche funktioniert die Beleuchtung im Treppenhaus nicht, und die Haustür schließt nicht richtig. Schreibe der Hausverwaltung: 1. Beschreibe beide Probleme genau. 2. Erkläre, warum die Situation gefährlich oder unangenehm für die Bewohner ist. 3. Bitte um Reparatur bis zu einem konkreten Datum.',
    explanationDe:
      'Bleibe höflich, aber bestimmt. Nutze „Sehr geehrte Damen und Herren,“, „aufgrund + Genitiv“ oder „weil“-Sätze und eine klare Frist.',
    explanationId:
      'Tetap gunakan nada sopan namun tegas, jelaskan risiko masalah bagi penghuni, dan cantumkan batas tanggal perbaikan.',
    wordLimit: { min: 70, max: 150 },
    sampleAnswer:
      'Sehr geehrte Damen und Herren,\nich schreibe Ihnen als Mieter der Wohnung 4 links in der Goethestraße 19. Seit genau einer Woche funktioniert leider das Licht im gesamten Treppenhaus vom ersten bis zum dritten Stock nicht mehr. Außerdem fällt die Haustür nicht mehr richtig ins Schloss, sodass sie nachts oft offensteht. Diese Situation ist für uns Bewohner sehr unangenehm und auch gefährlich, weil man im Dunkeln leicht stolpern kann. Deshalb bitte ich Sie herzlich, beide Mängel bis spätestens kommenden Freitag durch einen Handwerker beheben zu lassen. Bitte geben Sie mir kurz Bescheid, wann der Termin stattfindet.\nMit freundlichen Grüßen\nRizal Pratama',
    checklist: [
      'Formelle Anrede, Adresse/Wohnung und Schlussgruß korrekt',
      'Beide Mängel verständlich beschrieben',
      'Gefahr bzw. Unannehmlichkeit begründet',
      'Konkrete Frist und Bitte um Rückmeldung formuliert',
    ],
    rubric: [
      { criterion: 'Register & Form', descriptionId: 'Surat resmi terstruktur dan konsisten memakai sapaan "Sie".' },
      { criterion: 'Vollständigkeit', descriptionId: 'Kedua masalah, dampak keamanan, dan tenggat waktu tertulis jelas.' },
      { criterion: 'Wortschatz & Grammatik', descriptionId: 'Kosakata keluhan hunian dan struktur "lassen/weil/sodass" tepat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b1-sch-003',
    level: 'B1',
    skill: 'schreiben',
    topic: 'Ausbildung',
    title: 'Einladung eines Kollegen absagen und neuen Termin vorschlagen',
    subtitle: 'Halbformelle Nachricht im Berufsalltag verfassen',
    diff: 'Leicht',
    mins: 20,
    format: 'Schreiben · Berufliche E-Mail',
    instr: 'Schreibe eine E-Mail an deinen Kollegen Markus (ca. 75–100 Wörter).',
    prompt:
      'Markus hat dich für Donnerstagabend zum Abschiedsessen eines Teammitglieds eingeladen, aber du kannst leider nicht kommen. Schreibe ihm: 1. Danke für die Einladung und sage höflich ab. 2. Erkläre den Grund (z. B. dringender Arzttermin oder Familienbesuch). 3. Schlage vor, wie du dich trotzdem beteiligen kannst (z. B. Geschenk mitbezahlen oder vorher gratulieren).',
    explanationDe:
      'Achte auf eine freundliche, kollegiale Anrede, ehrliches Bedauern („Es tut mir wirklich leid...“) und einen konstruktiven Alternativvorschlag.',
    explanationId:
      'Sampaikan penolakan dengan ramah dan konstruktif disertai alasan serta tawaran kontribusi alternatif.',
    wordLimit: { min: 65, max: 130 },
    sampleAnswer:
      'Lieber Markus,\nvielen Dank für die Organisation und die nette Einladung zum Abschiedsessen am Donnerstag! Leider muss ich für diesen Abend absagen, weil meine Mutter spontan aus meiner Heimatstadt zu Besuch kommt und ich sie um 19 Uhr am Bahnhof abholen muss. Das tut mir wirklich sehr leid, denn ich wäre gern dabei gewesen. Ich möchte mich aber trotzdem sehr gern am gemeinsamen Abschiedsgeschenk beteiligen! Kann ich dir meinen Anteil morgen im Büro bar geben? Am Donnerstagvormittag verabschiede ich mich dann noch persönlich von Julia.\nHerzliche Grüße\nSiti',
    checklist: [
      'Freundlich für Organisation und Einladung gedankt',
      'Absage klar formuliert und plausibel begründet',
      'Konstruktiven Vorschlag zur Beteiligung gemacht',
      'Korrekte Satzstellung nach „weil“, „denn“ und „aber“',
    ],
    rubric: [
      { criterion: 'Kommunikatives Ziel', descriptionId: 'Penolakan sopan dan tawaran kontribusi alternatif sangat jelas.' },
      { criterion: 'Ton & Höflichkeit', descriptionId: 'Gaya bahasa akrab-profesional sesuai untuk rekan kerja.' },
      { criterion: 'Grammatik', descriptionId: 'Penggunaan "denn", "weil", dan posisi verba akurat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b1-sch-004',
    level: 'B1',
    skill: 'schreiben',
    topic: 'Umwelt',
    title: 'Leserbrief zu mehr Fahrradwegen und Umweltschutz',
    subtitle: 'Auf einen Zeitungsartikel reagieren und Maßnahmen fordern',
    diff: 'Anspruchsvoll',
    mins: 25,
    format: 'Schreiben · Leserbrief',
    instr: 'Schreibe einen Leserbrief an eine Lokalzeitung (ca. 90–130 Wörter).',
    prompt:
      'In deiner Zeitung erschien ein Artikel über steigende Abgase und Staus in deiner Stadt. Schreibe einen Leserbrief: 1. Beziehe dich auf den Artikel und schildere eigene Beobachtungen im Verkehr. 2. Nenne zwei konkrete Verbesserungen für Radfahrende oder den Busverkehr. 3. Erkläre, warum davon alle Bürgerinnen profitieren.',
    explanationDe:
      'Beziehe dich im ersten Satz klar auf den Artikel („Mit großem Interesse habe ich Ihren Artikel über... gelesen.“) und nutze B1-Passiv oder Modalverben.',
    explanationId:
      'Awali surat pembaca dengan rujukan artikel lalu kemukakan pengalaman, dua usulan konkret, dan manfaat bagi seluruh warga.',
    wordLimit: { min: 80, max: 165 },
    sampleAnswer:
      'Sehr geehrte Redaktion,\nmit großem Interesse habe ich Ihren Artikel über den starken Autoverkehr in unserer Innenstadt gelesen. Jeden Morgen stehe auch ich auf dem Weg zur Arbeit lange im Stau, während viele Radwege leider viel zu schmal und unsicher sind. Deshalb sollten dringend breitere, baulich getrennte Radwege angelegt werden. Außerdem müssten die Stadtbusse am Abend öfter fahren, damit mehr Menschen ihr Auto zu Hause lassen können. Wenn sicherere Radwege und zuverlässige Busse vorhanden sind, profitieren nicht nur Radfahrende, sondern alle: Die Luft wird sauberer, der Lärm nimmt ab und die Innenstadt wird insgesamt lebenswerter.\nMit freundlichen Grüßen\nAdi Nugroho',
    checklist: [
      'Bezug auf den Zeitungsartikel im Einstieg hergestellt',
      'Eigene Alltagserfahrung kurz geschildert',
      'Mindestens zwei konkrete Verkehrsvorschläge genannt',
      'Passiv mit Modalverb oder „damit/wenn“-Sätze eingebaut',
    ],
    rubric: [
      { criterion: 'Textsorte Leserbrief', descriptionId: 'Pembukaan merujuk artikel dan argumen disampaikan meyakinkan.' },
      { criterion: 'Inhaltliche Tiefe', descriptionId: 'Dua usulan solusi dan manfaat kolektif dijelaskan jelas.' },
      { criterion: 'Sprache B1', descriptionId: 'Struktur pasif modal ("sollten ... angelegt werden") dan klausa kondisi tepat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b1-sch-005',
    level: 'B1',
    skill: 'schreiben',
    topic: 'Bildung',
    title: 'Anfrage an eine Sprachschule zu einem B2-Intensivkurs',
    subtitle: 'Informationen über Termine, Kosten und Einstufung einholen',
    diff: 'Leicht',
    mins: 20,
    format: 'Schreiben · Formelle Anfrage',
    instr: 'Schreibe eine E-Mail an das Sekretariat einer Sprachschule (ca. 80–110 Wörter).',
    prompt:
      'Du hast gerade deine B1-Prüfung bestanden und möchtest ab nächstem Monat einen B2-Kurs besuchen. Schreibe der Sprachschule: 1. Stelle dich kurz vor und erkläre dein Lernziel. 2. Frage nach Kurszeiten (Abend- oder Vormittagskurs) und den Gesamtkosten inklusive Büchern. 3. Frage, ob ein Einstufungstest nötig ist und bis wann du dich anmelden musst.',
    explanationDe:
      'Verwende indirekte Fragesätze mit „ob“ und W-Wörtern („Könnten Sie mir bitte mitteilen, ob... / wie viel...“).',
    explanationId:
      'Gunakan pertanyaan tidak langsung sopan ("ob...", "wann...") untuk menanyakan jadwal, biaya, dan tes penempatan.',
    wordLimit: { min: 70, max: 145 },
    sampleAnswer:
      'Sehr geehrte Damen und Herren,\nich habe vor zwei Wochen meine B1-Prüfung erfolgreich bestanden und möchte ab dem kommenden Monat einen B2-Kurs in Ihrer Schule besuchen, um bald in Deutschland eine Ausbildung beginnen zu können. Da ich tagsüber ein Praktikum mache, würde ich mich sehr dafür interessieren, ob Sie auch einen B2-Abendkurs ab 18 Uhr anbieten. Außerdem wüsste ich gern, wie hoch die gesamten Kursgebühren inklusive der Lehrbücher sind. Muss ich vor der Anmeldung noch einen kostenlosen Einstufungstest machen, und bis wann muss meine Anmeldung spätestens bei Ihnen eingehen?\nMit freundlichen Grüßen\nNadia Kusuma',
    checklist: [
      'Lernstand (B1) und künftiges Ziel kurz genannt',
      'Mindestens zwei indirekte Fragen mit „ob“ oder W-Wörtern richtig gebildet',
      'Nach Kurszeiten, Gesamtkosten, Test und Anmeldefrist gefragt',
      'Korrekte formelle E-Mail-Struktur eingehalten',
    ],
    rubric: [
      { criterion: 'Vollständigkeit', descriptionId: 'Semua pertanyaan informasi kursus tercakup.' },
      { criterion: 'Grammatik', descriptionId: 'Pertanyaan tidak langsung ("ob", "wie hoch") menempatkan verba di akhir.' },
      { criterion: 'Wortschatz', descriptionId: 'Kosakata pendidikan dan pendaftaran resmi tepat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b1-sch-006',
    level: 'B1',
    skill: 'schreiben',
    topic: 'Reisen',
    title: 'Reisebericht und Empfehlung an einen Freund schreiben',
    subtitle: 'Vergangene Erlebnisse mit Plusquamperfekt und Tipps kombinieren',
    diff: 'Mittel',
    mins: 20,
    format: 'Schreiben · Persönlicher Brief',
    instr: 'Schreibe deinem Freund Julian über deine letzte Zugreise (ca. 85–115 Wörter).',
    prompt:
      'Du hast am Wochenende einen Städtetrip nach Dresden gemacht. Schreibe Julian: 1. Wie war die Anreise und was hatte vorher nicht ganz geklappt? 2. Was hat dir an der Stadt besonders gefallen? 3. Gib ihm zwei konkrete Reisetipps, falls er bald selbst dorthin fährt.',
    explanationDe:
      'Nutze eine Mischung aus Perfekt/Präteritum (war/hatte) und Plusquamperfekt („nachdem... hatte“) sowie einen Bedingungssatz mit „falls/wenn“.',
    explanationId:
      'Padukan cerita pengalaman dengan Plusquamperfekt/Perfekt dan akhiri dengan saran menggunakan kalimat syarat.',
    wordLimit: { min: 70, max: 150 },
    sampleAnswer:
      'Lieber Julian,\nam Wochenende war ich endlich für drei Tage in Dresden! Die Hinfahrt war allerdings ein kleines Abenteuer: Nachdem ich meinen Zug knapp erreicht hatte, stellte ich fest, dass ich mein Ladegerät zu Hause vergessen hatte. Zum Glück hatte meine Sitznachbarin eine Powerbank dabei. Die historische Altstadt an der Elbe und die Aussicht von der Brühlschen Terrasse haben mir unglaublich gut gefallen! Falls du bald selbst nach Dresden fährst, solltest du unbedingt eine Fahrt auf einem alten Dampfschiff buchen und abends in der Neustadt essen gehen – dort gibt es tolle kleine Cafés.\nViele Grüße\nDian',
    checklist: [
      'Kleines Problem bei der Anreise erzählt',
      'Begeisterung für ein konkretes Highlight beschrieben',
      'Zwei praktische Tipps mit „falls“ oder „solltest“ gegeben',
      'Tempuswechsel zwischen Plusquamperfekt und Präteritum/Perfekt sauber umgesetzt',
    ],
    rubric: [
      { criterion: 'Inhalt', descriptionId: 'Pengalaman perjalanan, sorotan wisata, dan dua saran tersampaikan hidup.' },
      { criterion: 'Grammatik', descriptionId: 'Penggunaan "nachdem + Plusquamperfekt" dan "falls" benar.' },
      { criterion: 'Stil', descriptionId: 'Bahasa surat pribadi hangat, alami, dan menarik dibaca.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b1-sch-007',
    level: 'B1',
    skill: 'schreiben',
    topic: 'Gesundheit',
    title: 'Ratschläge an eine gestresste Freundin formulieren',
    subtitle: 'Empathisch reagieren und konkrete Tipps im Konjunktiv II geben',
    diff: 'Mittel',
    mins: 20,
    format: 'Schreiben · Persönlicher Ratgeberbrief',
    instr: 'Antworte deiner Freundin Lara auf ihre stressige Prüfungsphase (ca. 85–120 Wörter).',
    prompt:
      'Lara hat dir geschrieben, dass sie vor ihren Abschlussprüfungen schlecht schläft, kaum Pausen macht und ständig nervös ist. Schreibe ihr: 1. Zeige Verständnis für ihre Situation. 2. Gib ihr mindestens drei konkrete Ratschläge (mit „Du solltest...“ oder „An deiner Stelle würde ich...“). 3. Biete ihr gemeinsame Entspannung nach der Prüfung an.',
    explanationDe:
      'Kombiniere Mitgefühl („Ich kann gut verstehen, dass...“) mit Konjunktiv-II-Ratschlägen und einer klaren „um...zu“-Begründung.',
    explanationId:
      'Tunjukkan empati terlebih dahulu, lalu berikan tiga saran praktis menggunakan Konjunktiv II dan ajakan relaksasi.',
    wordLimit: { min: 75, max: 150 },
    sampleAnswer:
      'Liebe Lara,\nes tut mir leid zu hören, dass dich die Prüfungszeit gerade so stresst! Ich kann sehr gut verstehen, dass man vor großen Klausuren nervös ist, weil ich das selbst aus dem letzten Jahr kenne. An deiner Stelle würde ich mir abends ab 21 Uhr eine feste Pause gönnen und das Handy weglegen, um wieder tiefer schlafen zu können. Außerdem solltest du jeden Nachmittag zwanzig Minuten spazieren gehen, statt pausenlos am Schreibtisch zu sitzen. Vergiss auch nicht, genug Wasser zu trinken! Nach deiner letzten Prüfung lade ich dich zu einem langen Frühstück ein, damit wir richtig feiern können.\nAlles Liebe,\nTari',
    checklist: [
      'Mitgefühl und eigenes Verständnis ausgedrückt',
      'Mindestens drei konkrete Entlastungstipps gegeben',
      'Konjunktiv II („würde...“, „solltest“) sowie „um ... zu“ / „statt ... zu“ korrekt genutzt',
      'Einladung für die Zeit nach der Prüfung ausgesprochen',
    ],
    rubric: [
      { criterion: 'Empathie & Inhalt', descriptionId: 'Respon hangat, tiga saran masuk akal, dan ajakan perayaan lengkap.' },
      { criterion: 'Grammatik', descriptionId: 'Konjunktiv II dan klausa infinitif "um...zu / statt...zu" tepat.' },
      { criterion: 'Wortschatz', descriptionId: 'Kosakata kesehatan dan manajemen stres bervariasi.' },
    ],
  }),
];

export const B1_PRODUKTIV_SPRECHEN: Exercise[] = [
  buildProductiveExercise({
    id: 'qb-b1-spr-001',
    level: 'B1',
    skill: 'sprechen',
    topic: 'Medien',
    title: 'Kurzpräsentation: „Soziale Medien im Alltag – Chance oder Zeitfresser?“',
    subtitle: 'Prüfungsnahe Präsentation mit Struktur, Beispielen und eigenem Fazit (Teil 2)',
    diff: 'Mittel',
    mins: 15,
    format: 'Sprechen · Themenpräsentation',
    instr: 'Bereite dich 2 Minuten vor und halte dann eine strukturierte Präsentation (ca. 3 Minuten).',
    prompt:
      'Halte einen Kurzvortrag über soziale Medien: 1. Stelle kurz deine persönlichen Erfahrungen mit sozialen Netzwerken vor. 2. Nenne konkrete Vorteile und Risiken im Alltag (z. B. Informationen, Kontakt, Ablenkung). 3. Erkläre, wie die Situation in deinem Heimatland aussieht und ziehe ein eigenes Fazit.',
    explanationDe:
      'Gliedere deinen Vortrag hörbar in Einleitung, Hauptteil und Schluss („Mein Thema heute ist...“, „Auf der einen Seite...“, „Zusammenfassend möchte ich sagen...“).',
    explanationId:
      'Susun presentasi secara jelas dari pembukaan, pengalaman pribadi, pro-kontra, perbandingan negara asal, hingga kesimpulan.',
    prepSeconds: 120,
    speakSeconds: 180,
    sampleAnswer:
      'Guten Tag! In meiner heutigen Präsentation spreche ich über das Thema soziale Medien im Alltag. Ich selbst nutze jeden Tag Messaging-Dienste, um mit meiner Familie in Kontakt zu bleiben, und folge einigen Lernkanälen für Deutsch. Auf der einen Seite bieten soziale Netzwerke große Vorteile: Man erfährt sofort Neuigkeiten, findet hilfreiche Lernvideos und kann Freundschaften über weite Entfernungen pflegen. Auf der anderen Seite sehe ich zwei Risiken: Erstens verliert man schnell viel Zeit durch endloses Scrollen, und zweitens verbreiten sich ungeprüfte Falschmeldungen extrem rasch. In Indonesien nutzen fast alle jungen Menschen soziale Medien sowohl privat als auch für kleine Geschäfte. Zusammenfassend finde ich soziale Netzwerke sehr nützlich, sofern man feste Zeitgrenzen einhält.',
    checklist: [
      'Klare Einleitung und Themenvorstellung gesprochen',
      'Vor- und Nachteile mit konkreten Beispielen verglichen',
      'Bezug zum Heimatland hergestellt',
      'Deutliches Schlussfazit formuliert',
    ],
    rubric: [
      { criterion: 'Struktur & Aufbau', descriptionId: 'Pembukaan, isi berimbang, dan penutup tersusun logis.' },
      { criterion: 'Ausdrucksfähigkeit', descriptionId: 'Kosakata B1 cukup kaya untuk membahas topik media secara mendalam.' },
      { criterion: 'Flüssigkeit & Aussprache', descriptionId: 'Tempo wajar, jeda teratur, dan intonasi meyakinkan.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b1-spr-002',
    level: 'B1',
    skill: 'sprechen',
    topic: 'Alltag',
    title: 'Gemeinsam ein Nachbarschaftsfest organisieren',
    subtitle: 'Interaktiver Planungsdialog mit Vorschlägen und Kompromissen (Teil 1)',
    diff: 'Leicht',
    mins: 12,
    format: 'Sprechen · Gemeinsam planen',
    instr: 'Sprich ein zweiminütiges Planungsgespräch (spiele beide Gesprächsrollen oder formuliere deine Beiträge laut).',
    prompt:
      'Ihr möchtet im Innenhof eures Wohnhauses ein kleines Sommerfest für alle Nachbarn veranstalten. Klärt laut folgende Punkte: 1. Termin, Uhrzeit und Einladungsweg (Aushang/Briefkasten). 2. Essen und Getränke (jeder bringt etwas mit oder gemeinsame Kosten?). 3. Programm und Rücksicht auf Ruhezeiten ab 22 Uhr.',
    explanationDe:
      'Reagiere stets auf Ideen („Das ist ein guter Punkt, aber...“, „Wie wäre es, wenn wir...?“, „Dann übernehme ich...“).',
    explanationId:
      'Gunakan ungkapan bernegosiasi, menyetujui, menanggapi usulan, dan membagi tugas secara alami.',
    prepSeconds: 90,
    speakSeconds: 150,
    sampleAnswer:
      'Hallo Leon, wir wollten doch das Nachbarschaftsfest planen! Passt dir der letzte Samstag im Juni ab 16 Uhr? – Ja, Samstag um 16 Uhr finde ich super, dann haben Familien mit Kindern auch Zeit. Wie laden wir alle ein? – Ich könnte ein buntes Plakat für den Eingang gestalten und wir werfen zusätzlich kleine Zettel in jeden Briefkasten. – Tolle Idee! Und beim Essen schlage ich ein Mitbring-Buffet vor: Jeder Nachbar bringt einen Salat oder Kuchen mit, und wir kaufen nur Getränke und Servietten gemeinsam. – Einverstanden! Wegen der Musik sollten wir ab 21:30 Uhr leiser drehen und um 22 Uhr draußen Schluss machen, damit niemand gestört wird. Ich drucke morgen die Einladungen aus!',
    checklist: [
      'Datum, Uhrzeit und Einladungsmethode abgesprochen',
      'Verpflegung und Kosten fair gelöst',
      'Ruhezeit um 22 Uhr und konkrete Aufgabenverteilung vereinbart',
    ],
    rubric: [
      { criterion: 'Interaktion', descriptionId: 'Tanggapan dua arah terasa hidup, fleksibel, dan solutif.' },
      { criterion: 'Aufgabenabdeckung', descriptionId: 'Seluruh poin logistik acara terjawab tuntas.' },
      { criterion: 'Grammatik & Lexik', descriptionId: 'Kalimat ajakan, modalverben, dan Konjunktiv II tepat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b1-spr-003',
    level: 'B1',
    skill: 'sprechen',
    topic: 'Umwelt',
    title: 'Kurzpräsentation: „Plastikmüll reduzieren – Was kann jeder Einzelne tun?“',
    subtitle: 'Umweltbewusstsein und Alltagstipps strukturiert vortragen',
    diff: 'Mittel',
    mins: 15,
    format: 'Sprechen · Themenpräsentation',
    instr: 'Bereite dich 2 Minuten vor und sprich dann etwa 3 Minuten über Plastikvermeidung.',
    prompt:
      'Präsentiere das Thema „Weniger Plastik im Alltag“: 1. Warum ist Plastikmüll heute ein so großes Problem? 2. Welche drei konkreten Gewohnheiten helfen beim Einkaufen und Unterwegssein? 3. Welche Rolle spielen Geschäfte und Politik neben dem Einzelnen?',
    explanationDe:
      'Verwende „indem“- und „um ... zu“-Sätze, um Ursache und Lösung klar zu verbinden.',
    explanationId:
      'Gunakan kalimat penghubung cara ("indem") dan tujuan ("um ... zu") untuk menjelaskan langkah pengurangan plastik.',
    prepSeconds: 120,
    speakSeconds: 180,
    sampleAnswer:
      'Hallo zusammen! Ich möchte heute darüber sprechen, wie wir im Alltag Plastikmüll reduzieren können. Viele Produkte wie Kaffee-to-go-Becher oder Obstnetze werden nur wenige Minuten benutzt, verschmutzen danach aber über Jahrzehnte unsere Meere und Böden. Jeder Einzelne kann schon viel bewegen, indem er eine eigene Trinkflasche und Stoffbeutel zum Einkaufen mitnimmt, statt jedes Mal neue Tüten zu kaufen. Außerdem lohnt es sich, auf dem Wochenmarkt oder im Unverpackt-Laden einzukaufen, um unnötige Verpackungen zu vermeiden. Natürlich reicht individuelles Handeln allein nicht aus: Geschäfte und Politik müssen ebenfalls Mehrwegsysteme stärker fördern und Plastikverpackungen strenger begrenzen. Nur wenn alle gemeinsam mitmachen, schützen wir unsere Umwelt langfristig.',
    checklist: [
      'Umweltproblem klar eingeleitet',
      'Drei alltagstaugliche Alternativen genannt',
      'Verantwortung von Konsumenten und Politik abgewogen',
      '„indem“ oder „um ... zu“ sinnvoll verwendet',
    ],
    rubric: [
      { criterion: 'Inhalt & Struktur', descriptionId: 'Analisis masalah, solusi pribadi, dan peran kebijakan lengkap.' },
      { criterion: 'Sprachliche Mittel', descriptionId: 'Klausa "indem", "um...zu", dan kosakata lingkungan B1 akurat.' },
      { criterion: 'Aussprache', descriptionId: 'Pelafalan istilah majemuk (Plastikmüll, Mehrwegsystem) jelas.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b1-spr-004',
    level: 'B1',
    skill: 'sprechen',
    topic: 'Arbeit',
    title: 'Pro und Contra: „Sollte man nach Feierabend noch dienstliche E-Mails lesen?“',
    subtitle: 'Stellungnahme mit Rückfragen in einer Diskussion (Teil 3)',
    diff: 'Anspruchsvoll',
    mins: 12,
    format: 'Sprechen · Stellungnahme',
    instr: 'Nimm ca. 2,5 Minuten lang Stellung zu der Frage und begründe beide Seiten.',
    prompt:
      'Erkläre deine Haltung zur Erreichbarkeit nach Feierabend: 1. Warum schauen viele Berufstätige abends noch auf das Diensthandy? 2. Welche Folgen hat ständige Erreichbarkeit für Gesundheit und Familie? 3. Welche Regelung würdest du als Teamleiterin einführen?',
    explanationDe:
      'Übe komplexe Satzverbindungen („obwohl“, „deshalb“, „je ... desto“) und zeige Verständnis für beide Perspektiven.',
    explanationId:
      'Latih penyampaian argumen sebab-akibat dan keseimbangan kerja-hidup menggunakan konjungsi B1.',
    prepSeconds: 90,
    speakSeconds: 150,
    sampleAnswer:
      'Das ist eine sehr wichtige Frage in unserer digitalen Arbeitswelt. Viele Angestellte lesen abends noch E-Mails, weil sie morgens keinen vollen Posteingang haben möchten oder zeigen wollen, dass sie engagiert sind. Bei internationalen Projekten in verschiedenen Zeitzonen kann eine kurze Abstimmung im Ausnahmefall auch praktisch sein. Trotzdem halte ich ständige Erreichbarkeit auf Dauer für gefährlich: Wer nie richtig abschaltet, schläft schlechter, steht ständig unter Druck und hat kaum noch ungestörte Zeit für Familie oder Freunde. Wenn ich ein Team leiten würde, gäbe es eine klare Regel: Nach 18 Uhr müssen keine Mails beantwortet werden – echte Notfälle werden nur telefonisch geklärt.',
    checklist: [
      'Gründe für abendliches Mail-Lesen nachvollziehbar genannt',
      'Gesundheitliche und soziale Nachteile erklärt',
      'Konkrete Teamregel im Konjunktiv II vorgeschlagen',
    ],
    rubric: [
      { criterion: 'Argumentationsqualität', descriptionId: 'Menimbang sisi praktis dan risiko kesehatan secara meyakinkan.' },
      { criterion: 'Grammatik', descriptionId: 'Penggunaan "obwohl/trotzdem" dan Konjunktiv II ("würde/gäbe") tepat.' },
      { criterion: 'Flüssigkeit', descriptionId: 'Penyampaian mantap dan meyakinkan.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b1-spr-005',
    level: 'B1',
    skill: 'sprechen',
    topic: 'Reisen',
    title: 'Kurzpräsentation: „Urlaub im eigenen Land oder Fernreise ins Ausland?“',
    subtitle: 'Reiseformen vergleichen, Klima & Kosten abwägen',
    diff: 'Leicht',
    mins: 12,
    format: 'Sprechen · Themenpräsentation',
    instr: 'Bereite dich 1,5 Minuten vor und sprich ca. 2,5–3 Minuten über die beiden Reisearten.',
    prompt:
      'Vergleiche Urlaub im Heimatland mit Fernreisen: 1. Was spricht für einen Urlaub in der eigenen Region oder im eigenen Land? 2. Warum träumen viele trotzdem von fernen Ländern und anderen Kulturen? 3. Welche Reiseform bevorzugst du persönlich und warum?',
    explanationDe:
      'Nutze Komparative mit „als“ („kürzer als“, „umweltfreundlicher als“) und „einerseits ... andererseits“.',
    explanationId:
      'Bandingkan dua jenis liburan menggunakan kata sifat perbandingan ("als/wie") dan beri alasan pilihan pribadi.',
    prepSeconds: 90,
    speakSeconds: 165,
    sampleAnswer:
      'Heute möchte ich zwei Arten des Reisens vergleichen: Urlaub im eigenen Land und weite Fernreisen. Ein Urlaub im Heimatland hat klare Vorteile: Die Anreise mit Zug oder Auto ist oft deutlich günstiger und umweltfreundlicher als ein Langstreckenflug, man hat keinen Jetlag und entdeckt viele schöne Orte vor der eigenen Haustür, die man noch gar nicht kannte. Auf der anderen Seite erweitern Fernreisen ins Ausland unseren Horizont enorm, weil man fremde Sprachen hört, ungewohnte Küche probiert und ganz andere Lebensweisen kennenlernt. Ich persönlich mache unter dem Jahr gern kurze Zugausflüge in der Region und spare mir alle paar Jahre eine größere Reise ins Ausland auf – so schone ich Budget und Klima und sammle trotzdem unvergessliche Eindrücke.',
    checklist: [
      'Vorteile beider Reisearten ausgewogen präsentiert',
      'Mindestens zwei Komparative mit „als“ korrekt verwendet',
      'Eigene Vorliebe begründet dargestellt',
    ],
    rubric: [
      { criterion: 'Inhalt & Vergleich', descriptionId: 'Perbandingan biaya, lingkungan, dan wawasan budaya sangat jelas.' },
      { criterion: 'Grammatik', descriptionId: 'Komparativ dengan "als" dan struktur kalimat alasan akurat.' },
      { criterion: 'Aussprache', descriptionId: 'Intonasi alami dan artikulasi vokal/umlaut jelas.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b1-spr-006',
    level: 'B1',
    skill: 'sprechen',
    topic: 'Gesundheit',
    title: 'Auf einen Freund reagieren: Ratschläge zu Sport & Bewegung geben',
    subtitle: 'Dialogische Beratung bei Bewegungsmangel im Büroalltag',
    diff: 'Mittel',
    mins: 12,
    format: 'Sprechen · Beratungsgespräch',
    instr: 'Reagiere laut auf das Problem deines Freundes und entwickelt gemeinsam einen Plan (ca. 2 Minuten).',
    prompt:
      'Dein Freund erzählt dir, dass er seit Monaten zehn Stunden täglich sitzt, abends völlig kaputt ist und nicht weiß, wie er wieder fit werden soll. Sprich laut: 1. Zeige Verständnis, warum der Einstieg nach einem langen Arbeitstag schwerfällt. 2. Schlage realistische kleine Schritte vor (Alltagsbewegung, fester Termin, Partner-Sport). 3. Verabredet einen konkreten ersten gemeinsamen Sporttermin.',
    explanationDe:
      'Gib kleine, machbare Empfehlungen statt extremer Pläne und nutze freundliche Einladungen („Wollen wir...“, „Wie wäre es, wenn...“).',
    explanationId:
      'Berikan saran langkah kecil yang realistis secara empatik lalu sepakati jadwal olahraga pertama bersama.',
    prepSeconds: 60,
    speakSeconds: 120,
    sampleAnswer:
      'Ich kann total verstehen, dass man nach zehn Stunden vor dem Bildschirm abends keine Lust mehr auf das Fitnessstudio hat – das geht mir genauso! Deshalb solltest du am Anfang nicht gleich fünfmal pro Woche trainieren wollen. Fang lieber mit kleinen Schritten an: Nimm im Büro die Treppe statt des Aufzugs, oder steig eine Haltestelle früher aus der Bahn aus und geh fünfzehn Minuten zu Fuß. Außerdem hilft es riesig, wenn man nicht allein trainiert. Wollen wir uns ab nächste Woche jeden Dienstag und Donnerstag um 18 Uhr für eine halbe Stunde zum Joggen oder schnellen Spazierengehen im Park treffen? Zusammen fällt der Start viel leichter!',
    checklist: [
      'Verständnis für Erschöpfung gezeigt',
      'Mindestens zwei alltagstaugliche Mini-Gewohnheiten empfohlen',
      'Konkreten gemeinsamen Termin vereinbart',
    ],
    rubric: [
      { criterion: 'Empathie & Praxisnähe', descriptionId: 'Saran masuk akal dan langsung dapat diterapkan.' },
      { criterion: 'Interaktion', descriptionId: 'Ajakan berolahraga bersama terdengar hangat dan persuasif.' },
      { criterion: 'Grammatik', descriptionId: 'Imperativ ramah dan modalverben ("solltest", "wollen wir") tepat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b1-spr-007',
    level: 'B1',
    skill: 'sprechen',
    topic: 'Bildung',
    title: 'Kurzpräsentation: „Lebenslanges Lernen – Warum lohnt sich Weiterbildung?“',
    subtitle: 'Über Berufswandel, Kurse und persönliche Motivation sprechen',
    diff: 'Anspruchsvoll',
    mins: 15,
    format: 'Sprechen · Themenpräsentation',
    instr: 'Bereite dich 2 Minuten vor und halte einen Kurzvortrag von ca. 3 Minuten.',
    prompt:
      'Präsentiere das Thema „Lebenslanges Lernen“: 1. Warum reicht eine einzige Ausbildung heute oft nicht mehr für das ganze Berufsleben aus? 2. Welche Möglichkeiten zur Weiterbildung gibt es (z. B. VHS, Online-Kurse, Bildungsurlaub)? 3. Welche neue Fähigkeit möchtest du selbst in den nächsten zwei Jahren lernen und warum?',
    explanationDe:
      'Verbinde allgemeine Entwicklungen (Digitalisierung, Berufswandel) mit einem persönlichen Lernziel im Futur I („Ich werde...“) oder mit „um ... zu“.',
    explanationId:
      'Hubungkan perubahan dunia kerja dengan opsi pelatihan yang ada serta jelaskan target belajarmu sendiri.',
    prepSeconds: 120,
    speakSeconds: 180,
    sampleAnswer:
      'Guten Tag! Mein Thema lautet „Lebenslanges Lernen“. Früher arbeitete man oft vierzig Jahre lang mit genau demselben Wissen in derselben Firma. Heute verändern sich Programme, Technologien und Arbeitsabläufe jedoch so schnell, dass regelmäßiges Weiterlernen für fast jeden Beruf unverzichtbar geworden ist. Zum Glück gibt es dafür viele flexible Wege: Neben günstigen Abendkursen an der Volkshochschule nutzen viele Beschäftigte digitale Lernplattformen oder das Recht auf Bildungsurlaub. Ich selbst möchte in den nächsten zwei Jahren nicht nur mein Deutsch auf B2-Niveau verbessern, sondern auch einen Kurs in Projektmanagement besuchen, um später komplexere Aufgaben im Team übernehmen zu können. Lernen hält uns schließlich nicht nur beruflich fit, sondern macht auch neugierig und zufrieden.',
    checklist: [
      'Wandel der Arbeitswelt verständlich erklärt',
      'Mindestens zwei konkrete Weiterbildungsformen genannt',
      'Eigenes Lernziel für die nächsten zwei Jahre begründet',
    ],
    rubric: [
      { criterion: 'Inhalt & Struktur', descriptionId: 'Presentasi mengalir dari tren global, sarana belajar, hingga rencana pribadi.' },
      { criterion: 'Wortschatz B1', descriptionId: 'Istilah pendidikan orang dewasa dan karier digunakan akurat.' },
      { criterion: 'Satzbau', descriptionId: 'Kalimat majemuk bertingkat diucapkan dengan lancar.' },
    ],
  }),
];

export const B1_PRODUKTIV_EXERCISES: Exercise[] = [
  ...B1_PRODUKTIV_SCHREIBEN,
  ...B1_PRODUKTIV_SPRECHEN,
];
