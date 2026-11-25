import { Exercise } from '../../types/exercise';

export const B2_EXPANSION_EXERCISES: Exercise[] = [
  {
    id: 'b2-lesen-4',
    level: 'B2',
    skill: 'lesen',
    topic: 'Wissenschaft',
    title: 'Tiefschlaf, Gedächtnis und Lernstrategien',
    subtitle: 'Wissenschaftliche Ergebnisse differenziert erfassen und Schlussfolgerungen prüfen',
    learningObjectiveDe: 'Differenzierte Kausalzusammenhänge und Einschränkungen in einem wissenschaftlichen Beitrag exakt bestimmen.',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 14,
    formatLabel: 'Leseverstehen · Wissenschaftlicher Bericht',
    instructions: 'Lies den Text sorgfältig und entscheide, welche Aussagen zutreffen.',
    passageTitle: 'Warum Pausen und Schlaf den Lernerfolg sichern',
    passageType: 'Artikel',
    passage:
      'Neurowissenschaftliche Untersuchungen belegen, dass komplexe Inhalte nicht allein durch stundenlanges Pauken dauerhaft im Langzeitgedächtnis verankert werden. Entscheidend sind vielmehr gezielte Wiederholungsintervalle sowie erholsamer Tiefschlaf. Während des Schlafs werden neu gebildete neuronale Verbindungen gefestigt und unwichtige Reize gefiltert. Wer hingegen unter chronischem Schlafmangel leidet, büßt trotz hohen Lernaufwands messbar an Konzentrationsfähigkeit ein. Forschende betonen jedoch, dass kurze Lernpausen am Tag den nächtlichen Schlaf nicht ersetzen können, sondern ihn lediglich sinnvoll ergänzen.',
    questions: [
      {
        id: 'b2-lesen-4-q1',
        type: 'multiple-choice',
        question: 'Welche Aussage entspricht dem Text?',
        options: [
          'Kurze Pausen tagsüber machen nächtlichen Tiefschlaf überflüssig.',
          'Chronischer Schlafmangel kann die Konzentration selbst bei langem Lernen mindern.',
          'Stundenlanges ununterbrochenes Pauken garantiert den besten Lernerfolg.',
        ],
        correctAnswer: 'Chronischer Schlafmangel kann die Konzentration selbst bei langem Lernen mindern.',
        explanationDe: 'Im Text steht: „Wer hingegen unter chronischem Schlafmangel leidet, büßt trotz hohen Lernaufwands messbar an Konzentrationsfähigkeit ein.“',
        explanationId:
          'Teks menyatakan bahwa kurang tidur kronis menurunkan kemampuan konsentrasi secara terukur meskipun durasi belajarnya tinggi ("trotz hohen Lernaufwands").',
        keyVocabulary: [
          { de: 'einbüßen', id: 'kehilangan / mengalami penurunan' },
          { de: 'verankern', id: 'menanamkan secara permanen' },
        ],
        points: 10,
      },
      {
        id: 'b2-lesen-4-q2',
        type: 'true-false',
        question: 'Laut Forschenden genügen kurze Pausen am Tag als vollständiger Ersatz für Tiefschlaf.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationDe: 'Der letzte Satz betont, dass Tagespausen den Schlaf „nicht ersetzen können, sondern ihn lediglich sinnvoll ergänzen“.',
        explanationId:
          'Salah (Falsch), kalimat terakhir menegaskan jeda singkat di siang hari tidak dapat menggantikan tidur malam, melainkan hanya melengkapinya.',
        points: 10,
      },
    ],
  },
  {
    id: 'b2-hoeren-4',
    level: 'B2',
    skill: 'hoeren',
    topic: 'Globalisierung',
    title: 'Fachvortrag: Resiliente Lieferketten',
    subtitle: 'Einem wirtschaftlichen Kurzvortrag folgen und Kernaussagen herausfiltern',
    learningObjectiveDe: 'Argumentationslinien, Ursachen und wirtschaftliche Strategien aus einem B2-Fachvortrag verstehen.',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 12,
    formatLabel: 'Hörverstehen · Fachvortrag',
    instructions: 'Höre den Ausschnitt aus einem Fachvortrag und löse die Aufgaben.',
    audioStatus: 'missing',
    transcript:
      'Infolge internationaler Transportengpässe überdenken viele mittelständische Betriebe ihre Beschaffungsstrategie. Lange galt es als wirtschaftlich am günstigsten, sämtliche Vorprodukte von einem einzigen Anbieter aus Übersee zu beziehen. Zwar senkt dies kurzfristig die Stückkosten, doch bei einem Ausfall steht oft die gesamte Produktion still. Deshalb setzen immer mehr Unternehmen auf eine Kombination aus globalen Partnern und regionalen Zulieferern, auch wenn dies zunächst höhere Lagerkosten verursacht.',
    questions: [
      {
        id: 'b2-hoeren-4-q1',
        type: 'multiple-choice',
        question: 'Welchen Nachteil nennt der Vortrag für den Bezug von nur einem globalen Anbieter?',
        options: [
          'Die Stückkosten steigen kurzfristig stark an.',
          'Bei einem Ausfall kann die gesamte Produktion stillstehen.',
          'Regionale Zulieferer verlieren sofort ihre Aufträge.',
        ],
        correctAnswer: 'Bei einem Ausfall kann die gesamte Produktion stillstehen.',
        explanationDe: 'Der Vortrag erklärt: „doch bei einem Ausfall steht oft die gesamte Produktion still“.',
        explanationId:
          'Risikonya adalah jika pemasok tunggal tersebut gagal kirim, seluruh produksi bisa terhenti total ("steht oft die gesamte Produktion still").',
        points: 10,
      },
      {
        id: 'b2-hoeren-4-q2',
        type: 'true-false',
        question: 'Die Einbindung regionaler Zulieferer ist für Unternehmen völlig kostenlos.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationDe: 'Am Ende heißt es: „auch wenn dies zunächst höhere Lagerkosten verursacht“.',
        explanationId:
          'Salah (Falsch), karena kombinasi dengan pemasok regional awalnya menimbulkan biaya penyimpanan (Lagerkosten) yang lebih tinggi.',
        points: 10,
      },
    ],
  },
  {
    id: 'b2-grammatik-4',
    level: 'B2',
    skill: 'grammatik',
    topic: 'Argumentation',
    title: 'Konjunktiv II Vergangenheit, subjektive Modalverben & Satzgefüge',
    subtitle: 'Komplexe B2-Strukturen präzise anwenden',
    learningObjectiveDe: 'Irreale Vergangenheit (hätte/wäre + Partizip II), Vermutungen mit Modalverben und Korrelate im Satzgefüge sicher beherrschen.',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 14,
    formatLabel: 'Grammatiktraining · Gehobener Ausdruck',
    instructions: 'Wähle die präzise B2-Struktur.',
    questions: [
      {
        id: 'b2-grammatik-4-q1',
        type: 'multiple-choice',
        question: 'Wenn wir die Daten rechtzeitig geprüft ___, wäre der Fehler nicht passiert.',
        options: ['haben', 'hätten', 'würden'],
        correctAnswer: 'hätten',
        explanationDe: 'Irrealer Konditionalsatz der Vergangenheit mit „prüfen“ (Perfekt mit haben) → hätten geprüft.',
        explanationId:
          'Pengandaian masa lalu (Konjunktiv II Vergangenheit) untuk kata kerja "prüfen" memakai "hätten" + Partizip II.',
        relatedGrammarTopicId: 'gram-b2-8',
        points: 10,
      },
      {
        id: 'b2-grammatik-4-q2',
        type: 'multiple-choice',
        question: 'Die Sitzung dauert schon drei Stunden — der neue Plan ___ ziemlich umstritten sein.',
        options: ['dürfte', 'sollte', 'will'],
        correctAnswer: 'dürfte',
        explanationDe: '„dürfte“ drückt eine begründete, hohe Wahrscheinlichkeit/Vermutung des Sprechers aus.',
        explanationId:
          '"dürfte" adalah bentuk subjektif Modalverb untuk menyatakan dugaan kuat berdasarkan bukti ("kemungkinan besar").',
        relatedGrammarTopicId: 'gram-b2-9',
        points: 10,
      },
      {
        id: 'b2-grammatik-4-q3',
        type: 'multiple-choice',
        question: 'Die Expertin wies ausdrücklich ___ hin, dass verlässliche Quellen entscheidend sind.',
        options: ['damit', 'darauf', 'dafür'],
        correctAnswer: 'darauf',
        explanationDe: 'Das Verb heißt „hinweisen auf + Akkusativ“ → Korrelat „darauf“ vor dem dass-Satz.',
        explanationId:
          'Kata kerja "hinweisen" berpasangan dengan preposisi "auf", sehingga kata rujukan (Korrelat) sebelum anak kalimat "dass" adalah "darauf".',
        relatedGrammarTopicId: 'gram-b2-7',
        points: 10,
      },
    ],
  },
  {
    id: 'b2-schreiben-4',
    level: 'B2',
    skill: 'schreiben',
    topic: 'Kommunikation',
    title: 'Formeller Beschwerdebrief wegen mangelhafter Kursleistung',
    subtitle: 'Sachlich reklamieren, konkrete Mängel belegen und eine Lösung fordern',
    learningObjectiveDe: 'Einen überzeugenden, höflich-bestimmten Beschwerdebrief auf B2-Niveau nach telc- und Goethe-Standards verfassen.',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 25,
    formatLabel: 'Schriftlicher Ausdruck · Beschwerdebrief',
    instructions:
      'Du hast einen teuren Online-Sprachkurs gebucht, aber mehrere versprochene Leistungen wurden nicht erfüllt (keine Korrektur der Hausaufgaben, instabile Plattform, verspäteter Unterrichtsbeginn). Schreibe eine formelle Beschwerde an die Kursleitung (ca. 150–190 Wörter).',
    questions: [
      {
        id: 'b2-schreiben-4-q1',
        type: 'writing-task',
        question:
          'Schreibe einen sachlichen Beschwerdebrief mit Einleitung, konkreter Schilderung der Mängel, Erwartung/Fristsetzung und formellem Schluss.',
        wordLimit: { min: 140, max: 210 },
        preparationGuidanceDe:
          'Struktur surat keluhan B2: 1) Alasan menulis & informasi kursus, 2) Perbandingan janji iklan vs kenyataan (pakai "Obwohl zugesichert wurde..."), 3) Tuntutan solusi konkret + tenggat waktu, 4) Penutup sopan namun tegas.',
        usefulExpressionsDe: [
          { de: 'Hiermit möchte ich mich über die Durchführung des Kurses beschweren.', id: 'Dengan ini saya ingin menyampaikan keluhan mengenai pelaksanaan kursus.' },
          { de: 'Entgegen der ausdrücklichen Zusage in Ihrer Anzeige...', id: 'Bertentangan dengan janji tertulis dalam iklan Anda...' },
          { de: 'Ich bitte Sie um eine Stellungnahme sowie eine Teilrückerstattung bis zum...', id: 'Saya meminta tanggapan serta pengembalian sebagian biaya paling lambat tanggal...' },
        ],
        sampleAnswer:
          'Sehr geehrte Damen und Herren,\n\nim vergangenen Monat habe ich bei Ihrem Institut den B2-Intensivkurs „Beruf und Kommunikation“ zum Preis von 480 Euro gebucht. Leider muss ich mich heute über erhebliche Mängel bei der Durchführung beschweren.\n\nEntgegen der ausdrücklichen Zusage in Ihrer Kursbeschreibung wurden unsere eingereichten Schreibaufgaben bisher kein einziges Mal individuell korrigiert. Darüber hinaus fällt die Lernplattform während des Live-Unterrichts regelmäßig aus, sodass jede Unterrichtseinheit mit mindestens zwanzig Minuten Verspätung beginnt.\n\nDa der vereinbarte Leistungsumfang somit nicht erfüllt wird, erwarte ich ab sofort eine verlässliche technische Lösung sowie eine zeitnahe Korrektur aller offenen Texte. Sollte dies innerhalb der nächsten sieben Tage nicht möglich sein, bitte ich um eine angemessene Teilrückerstattung der Kursgebühr. Über eine schriftliche Rückmeldung bis Freitag freue ich mich.\n\nMit freundlichen Grüßen\nPutri Maharani',
        rubricCriteria: [
          { criterion: 'Nada formal & objektif', descriptionId: 'Tegas dan jelas tanpa bahasa emosional atau kasar.' },
          { criterion: 'Bukti kekurangan spesifik', descriptionId: 'Membandingkan janji program dengan fakta kendala secara runtut.' },
          { criterion: 'Tuntutan & batas waktu jelas', descriptionId: 'Menyebutkan solusi yang diharapkan (perbaikan / kompensasi + tenggat).' },
        ],
        checklist: [
          'Ich habe den Anlass meiner Beschwerde und das gebuchte Angebot genannt.',
          'Ich habe mindestens zwei konkrete Mängel sachlich beschrieben.',
          'Ich habe eine konkrete Lösung bzw. Erstattung mit Frist gefordert.',
          'Ich habe gehobene Konnektoren und Passiv-/Nominalstrukturen genutzt.',
        ],
        explanationId:
          'Surat keluhan (Beschwerdebrief) merupakan format klasik telc Deutsch B2. Kunci nilainya adalah objektivitas, kontras antara "Zusage" dan realita, serta tuntutan solusi yang jelas.',
        points: 30,
      },
    ],
  },
  {
    id: 'b2-sprechen-4',
    level: 'B2',
    skill: 'sprechen',
    topic: 'Technologie',
    title: 'Pro- und Kontra-Diskussion: Digitale Überwachung am Arbeitsplatz',
    subtitle: 'Einen Standpunkt differenziert vertreten, Gegenargumente entkräften und Kompromisse vorschlagen',
    learningObjectiveDe: 'In einer B2-Diskussion Positionen begründen, höflich widersprechen und tragfähige Kompromisse entwickeln.',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 15,
    formatLabel: 'Mündliche Kommunikation · Pro/Kontra-Diskussion',
    instructions:
      'Diskutiere das Thema: „Sollten Unternehmen im Homeoffice Software zur Arbeitszeit- und Aktivitätskontrolle einsetzen?“ Nenne Argumente für beide Seiten und formuliere einen Kompromiss.',
    questions: [
      {
        id: 'b2-sprechen-4-q1',
        type: 'speaking-task',
        question:
          'Sprich frei und argumentativ (ca. 3 Minuten): 1) Ausgangslage/Position, 2) Argumente für Kontrolle vs. Datenschutz/Vertrauen, 3) Kompromissvorschlag.',
        preparationSeconds: 60,
        speakingDurationSeconds: 180,
        preparationGuidanceDe:
          'Gunakan pola diskusi B2: Akui argumen lawan ("Zwar lässt sich nachvollziehen, dass..."), lalu sanggah dengan argumen inti ("Dennoch überwiegen die Risiken für..."), dan tutup dengan kompromi realistis.',
        usefulExpressionsDe: [
          { de: 'Auf der einen Seite spricht für eine solche Maßnahme, dass...', id: 'Di satu sisi hal yang mendukung langkah tersebut adalah...' },
          { de: 'Auf der anderen Seite darf man nicht außer Acht lassen, dass...', id: 'Di sisi lain kita tidak boleh mengabaikan bahwa...' },
          { de: 'Als tragfähigen Kompromiss würde ich vorschlagen, dass...', id: 'Sebagai kompromi yang dapat diterapkan saya menyarankan agar...' },
        ],
        sampleAnswer:
          'Bei der Frage nach digitaler Kontrolle im Homeoffice stehen zwei berechtigte Interessen gegenüber. Auf der einen Seite möchten Arbeitgeber sicherstellen, dass vereinbarte Arbeitszeiten eingehalten und Projekte fristgerecht erledigt werden. Auf der anderen Seite greift eine permanente Aktivitätsmessung tief in die Privatsphäre ein und signalisiert Misstrauen gegenüber den Beschäftigten. Studien zeigen zudem, dass Vertrauen und klare Ergebnisziele motivierender wirken als ständige Überwachung. Als Kompromiss ließe sich eine einfache, selbst eingetragene Zeiterfassung mit regelmäßigen Team-Abstimmungen kombinieren — so bleibt die Leistung transparent, ohne den Datenschutz zu verletzen.',
        rubricCriteria: [
          { criterion: 'Argumentasi berimbang (Pro & Kontra)', descriptionId: 'Menimbang sudut pandang perusahaan dan hak privasi karyawan.' },
          { criterion: 'Bahasa diskusi tingkat B2', descriptionId: 'Menggunakan ungkapan kontras dan usulan kompromi yang matang.' },
        ],
        checklist: [
          'Ich habe Argumente beider Seiten fair dargestellt.',
          'Ich habe Datenschutz und Vertrauen als Gegenargument begründet.',
          'Ich habe einen konkreten Kompromiss vorgeschlagen.',
        ],
        explanationId:
          'Pada diskusi Goethe/telc B2, kemampuan menanggapi argumen lawan secara diplomatis ("Zwar..., dennoch...") dan mencari titik temu (Kompromiss) sangat menentukan nilai tinggi.',
        points: 30,
      },
    ],
  },
];
