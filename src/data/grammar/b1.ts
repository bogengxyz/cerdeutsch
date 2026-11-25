import { GrammarTopic } from '../../types/learning';

export const B1_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'gram-b1-1',
    level: 'B1',
    title: 'Konjunktiv II',
    category: 'Modus & Höflichkeit',
    summary: 'Wünsche, irreale Bedingungen, Ratschläge und höfliche Bitten mit wäre, hätte, könnte, würde ausdrücken.',
    explanationDe:
      'Der Konjunktiv II beschreibt Situationen, die nicht real sind, sowie höfliche Bitten und Ratschläge. Für die meisten Verben nutzt man „würde + Infinitiv“, während sein (wäre), haben (hätte) und Modalverben eigene Formen haben.',
    explanationId:
      'Konjunktiv II dipakai untuk menyatakan pengandaian, harapan, saran (sollte), atau permintaan sopan (könnte/hätte/wäre). Untuk kebanyakan kata kerja biasa dipakai "würde + Infinitiv".',
    sentenceStructureDe: 'Wenn + Subjekt + ... + hätte/wäre/würde (Ende), + dann + würde/könnte (Pos. 2) + ... + Infinitiv',
    conjugationTable: {
      headers: ['Pronomen', 'sein (wäre)', 'haben (hätte)', 'können (könnte)', 'werden (würde)'],
      rows: [
        ['ich', 'wäre', 'hätte', 'könnte', 'würde'],
        ['du', 'wärst', 'hättest', 'könntest', 'würdest'],
        ['er / sie / es', 'wäre', 'hätte', 'könnte', 'würde'],
        ['wir', 'wären', 'hätten', 'könnten', 'würden'],
        ['sie / Sie', 'wären', 'hätten', 'könnten', 'würden'],
      ],
    },
    commonMistakesId:
      'Menggabungkan "würde" dengan "hätte" atau "wäre" dalam satu klausa (salah: "Wenn ich Zeit würde haben", lebih alami: "Wenn ich Zeit hätte").',
    rulePoints: [
      'Bei „sein“, „haben“ und Modalverben nutzt man keine „würde“-Umschreibung.',
      'Ratschläge formuliert man oft mit „Du solltest...“ oder „An deiner Stelle würde ich...“.',
      'Irreale Wünsche: „Wenn ich doch mehr Zeit hätte!“',
    ],
    examples: [
      {
        german: 'Wenn ich mehr Zeit hätte, würde ich jeden Tag lesen.',
        translationId: 'Seandainya saya punya lebih banyak waktu, saya akan membaca setiap hari.',
        note: 'Irrealer Konditionalsatz',
      },
      {
        german: 'Könnten Sie mir bitte das Formular kurz erklären?',
        translationId: 'Bisakah Anda menjelaskan formulir ini sebentar kepada saya?',
        note: 'Höfliche Bitte',
      },
    ],
    relatedExerciseId: 'b1-grammatik-1',
  },
  {
    id: 'gram-b1-2',
    level: 'B1',
    title: 'Passiv Präsens und Präteritum',
    category: 'Genus Verbi',
    summary: 'Handlungen und Prozesse mit „werden + Partizip II“ in den Vordergrund stellen.',
    explanationDe:
      'Im Vorgangspassiv steht nicht der Handelnde (Täter), sondern die Handlung selbst im Fokus. Es wird mit einer Form von „werden“ und dem Partizip II gebildet.',
    explanationId:
      'Kalimat pasif (Vorgangspassiv) menekankan proses atau kejadiannya daripada pelakunya. Pola Präsens: werden + Partizip II; pola Präteritum: wurde + Partizip II.',
    sentenceStructureDe: 'Subjekt (Thema) + wird / werden / wurde / wurden (Pos. 2) + ... + Partizip II (Ende)',
    conjugationTable: {
      headers: ['Zeitform', 'Singular', 'Plural', 'Beispiel'],
      rows: [
        ['Passiv Präsens', 'wird + Partizip II', 'werden + Partizip II', 'Das Paket wird heute geliefert.'],
        ['Passiv Präteritum', 'wurde + Partizip II', 'wurden + Partizip II', 'Die Straße wurde gestern gesperrt.'],
        ['Passiv Perfekt', 'ist + Partizip II + worden', 'sind + Partizip II + worden', 'Der Fehler ist schon behoben worden.'],
      ],
    },
    commonMistakesId:
      'Memakai "sein" alih-alih "werden" untuk proses yang sedang terjadi, atau memakai "geworden" pada Passiv Perfekt (yang benar adalah "worden").',
    rulePoints: [
      'Der Handelnde kann optional mit „von + Dativ“ (Person/Institution) oder „durch + Akkusativ“ (Mittel) genannt werden.',
      'Ohne Subjekt nutzt man oft ein „Es“ auf Position 1 (Es wird viel diskutiert) oder beginnt mit einer Zeit/Ortsangabe (Hier wird nicht geraucht).',
    ],
    examples: [
      {
        german: 'In diesem Unternehmen wird viel Papier gespart.',
        translationId: 'Di perusahaan ini banyak kertas yang dihemat.',
        note: 'Passiv Präsens',
      },
      {
        german: 'Das Museum wurde im Jahr 1998 eröffnet.',
        translationId: 'Museum tersebut dibuka pada tahun 1998.',
        note: 'Passiv Präteritum',
      },
    ],
    relatedExerciseId: 'b1-grammatik-2',
  },
  {
    id: 'gram-b1-3',
    level: 'B1',
    title: 'Temporale Nebensätze (als, wenn, während, bevor)',
    category: 'Nebensätze',
    summary: 'Zeitliche Abläufe in der Vergangenheit, Gegenwart und Zukunft präzise verknüpfen.',
    explanationDe:
      '„als“ verwendet man für ein einmaliges Ereignis in der Vergangenheit, „wenn“ für wiederholte Ereignisse in der Vergangenheit sowie für Gegenwart und Zukunft. „während“ drückt Gleichzeitigkeit aus.',
    explanationId:
      '"als" hanya untuk kejadian satu kali di masa lampau. "wenn" untuk kejadian berulang di masa lampau atau untuk masa kini dan depan. "während" berarti sementara/selama (bersamaan), dan "bevor" berarti sebelum.',
    sentenceStructureDe: 'als / wenn / während / bevor + Subjekt + ... + konjugiertes Verb (Ende)',
    commonMistakesId:
      'Memakai "wenn" untuk masa kecil atau kejadian sekali di masa lalu (salah: "Wenn ich ein Kind war...", benar: "Als ich ein Kind war...").',
    rulePoints: [
      'Einmalig in der Vergangenheit → immer „als“.',
      'Mehrmals in der Vergangenheit → „immer wenn“.',
      'Gegenwart und Zukunft → immer „wenn“.',
    ],
    examples: [
      {
        german: 'Als ich achtzehn war, zog ich nach Berlin.',
        translationId: 'Ketika saya berusia delapan belas tahun, saya pindah ke Berlin.',
        note: 'Einmaliges Ereignis in der Vergangenheit',
      },
      {
        german: 'Während wir zu Abend essen, sprechen wir über den Tag.',
        translationId: 'Sementara kami makan malam, kami berbicara tentang hari itu.',
        note: 'Gleichzeitigkeit mit „während“',
      },
    ],
    relatedExerciseId: 'b1-grammatik-3',
  },
  {
    id: 'gram-b1-4',
    level: 'B1',
    title: 'Nebensätze: obwohl, damit, um ... zu',
    category: 'Nebensätze',
    summary: 'Gegensätze mit „obwohl“ sowie Zwecke und Ziele mit „damit“ und „um ... zu“ ausdrücken.',
    explanationDe:
      '„obwohl“ leitet einen Widerspruch ein (Konzessivsatz). Ziele drückt man mit „um ... zu + Infinitiv“ (bei gleichem Subjekt) oder mit „damit“ (bei verschiedenen Subjekten) aus.',
    explanationId:
      '"obwohl" (meskipun) menyatakan pertentangan dengan anak kalimat (kata kerja di akhir). Untuk tujuan: pakai "um ... zu + Infinitiv" jika subjeknya sama, dan pakai "damit" jika subjek kalimat utama dan anak kalimat berbeda.',
    sentenceStructureDe: 'Hauptsatz, um ... zu + Infinitiv (gleiches Subjekt)  |  Hauptsatz, damit + Subjekt 2 + ... + Verb',
    commonMistakesId:
      'Memakai "um ... zu" padahal subjeknya berbeda (salah: "Ich erkläre es langsam, um du zu verstehen", benar: "...damit du es verstehst").',
    rulePoints: [
      'Gleiches Subjekt → bevorzugt „um ... zu + Infinitiv“.',
      'Verschiedene Subjekte → zwingend „damit“ (Verb am Ende).',
      'Bei „obwohl“ bleibt das Verb im Nebensatz am Ende.',
    ],
    examples: [
      {
        german: 'Obwohl es stark regnete, gingen wir spazieren.',
        translationId: 'Meskipun hujan deras, kami pergi berjalan-jalan.',
        note: 'Konzessiver Nebensatz',
      },
      {
        german: 'Sie lernt jeden Abend, um die B1-Prüfung zu bestehen.',
        translationId: 'Ia belajar setiap malam agar lulus ujian B1.',
        note: 'Gleiches Subjekt → um ... zu',
      },
    ],
    relatedExerciseId: 'b1-grammatik-4',
  },
  {
    id: 'gram-b1-5',
    level: 'B1',
    title: 'Relativsätze',
    category: 'Nebensätze',
    summary: 'Nomen durch Relativsätze im Nominativ, Akkusativ und Dativ (auch mit Präposition) näher bestimmen.',
    explanationDe:
      'Das Relativpronomen richtet sich in Genus und Numerus nach dem Bezugsnomen im Hauptsatz, aber im Kasus nach seiner Funktion (Verb oder Präposition) im Relativsatz.',
    explanationId:
      'Kata ganti penghubung Relativsatz mengambil jenis kelamin/jumlah dari kata benda yang dijelaskan di kalimat utama, tetapi kasusnya (Nom/Akk/Dat) ditentukan oleh kata kerja atau preposisi di dalam Relativsatz itu sendiri.',
    sentenceStructureDe: 'Bezugsnomen, + (Präposition +) Relativpronomen + ... + konjugiertes Verb (Ende)',
    conjugationTable: {
      headers: ['Kasus', 'Maskulin', 'Feminin', 'Neutrum', 'Plural'],
      rows: [
        ['Nominativ', 'der', 'die', 'das', 'die'],
        ['Akkusativ', 'den', 'die', 'das', 'die'],
        ['Dativ', 'dem', 'der', 'dem', 'denen'],
      ],
    },
    commonMistakesId:
      'Memakai "den" untuk Dativ jamak (yang benar: "denen") atau salah menentukan kasus karena hanya melihat kasus di kalimat utama.',
    rulePoints: [
      'Relativpronomen entsprechen fast alle dem bestimmten Artikel.',
      'Ausnahme im B1-Bereich: Dativ Plural lautet „denen“.',
      'Steht eine Präposition vor dem Relativpronomen, bestimmt sie den Kasus (mit dem, auf die).',
    ],
    examples: [
      {
        german: 'Das ist die Kollegin, der ich gestern geholfen habe.',
        translationId: 'Itu adalah rekan kerja wanita yang kemarin saya bantu.',
        note: 'die Kollegin (f.) + helfen (Dativ) → der',
      },
      {
        german: 'Die Freunde, mit denen wir verreisen, kommen aus Köln.',
        translationId: 'Teman-teman yang pergi berlibur bersama kami berasal dari Köln.',
        note: 'Plural + mit (Dativ) → denen',
      },
    ],
    relatedExerciseId: 'b1-grammatik-1',
  },
  {
    id: 'gram-b1-6',
    level: 'B1',
    title: 'Plusquamperfekt und „nachdem“',
    category: 'Zeitformen',
    summary: 'Vorzeitigkeit in der Vergangenheit ausdrücken: Was war vorher passiert?',
    explanationDe:
      'Das Plusquamperfekt zeigt, dass eine Handlung noch früher als eine andere vergangene Handlung stattfand. Es wird mit „hatte“ oder „war“ + Partizip II gebildet und oft mit „nachdem“ kombiniert.',
    explanationId:
      'Plusquamperfekt (hatte/war + Partizip II) menunjukkan peristiwa yang terjadi LEBIH DULU sebelum peristiwa lampau lainnya. Sering dipasangkan dengan kata sambung "nachdem" (setelah).',
    sentenceStructureDe: 'Nachdem + Subjekt + ... + Partizip II + hatte/war, + Hauptsatz (Präteritum / Perfekt)',
    commonMistakesId:
      'Memakai tense yang sama di kedua klausa setelah "nachdem" padahal ada urutan waktu yang jelas antara kejadian pertama dan kedua.',
    rulePoints: [
      'Vorzeitiges Ereignis: Plusquamperfekt (hatte/war + Partizip II).',
      'Späteres Ereignis in der Vergangenheit: Präteritum oder Perfekt.',
      'Beispiel: Nachdem ich gefrühstückt hatte, ging ich zur Arbeit.',
    ],
    examples: [
      {
        german: 'Nachdem wir die Tickets gekauft hatten, stiegen wir in den Zug ein.',
        translationId: 'Setelah kami membeli tiket, kami naik ke kereta.',
        note: 'Plusquamperfekt vor Präteritum',
      },
      {
        german: 'Als ich am Bahnhof ankam, war der Zug schon abgefahren.',
        translationId: 'Saat saya tiba di stasiun, kereta sudah berangkat.',
        note: 'abfahren mit „war“ (Vorzeitigkeit)',
      },
    ],
    relatedExerciseId: 'b1-grammatik-4',
  },
  {
    id: 'gram-b1-7',
    level: 'B1',
    title: 'Adjektivdeklination',
    category: 'Adjektive & Kasus',
    summary: 'Adjektivendungen nach bestimmtem Artikel, unbestimmtem Artikel und ohne Artikel sicher bestimmen.',
    explanationDe:
      'Steht ein Adjektiv vor einem Nomen, bekommt es eine Endung (-e, -en, -er, -es). Die Endung hängt vom Artikeltyp, dem Genus und dem Kasus ab.',
    explanationId:
      'Kata sifat di depan kata benda menerima akhiran (-e, -en, -er, -es) tergantung jenis artikel (tertentu, tak tentu, atau tanpa artikel), gender, dan kasus.',
    sentenceStructureDe: 'Artikel + Adjektiv (+ -e/-en/-er/-es) + Nomen',
    conjugationTable: {
      headers: ['Kasus', 'Nach best. Artikel (der/die/das)', 'Nach unbest. Artikel (ein/eine)', 'Ohne Artikel (Nullartikel)'],
      rows: [
        ['Nominativ (m/f/n/Pl)', '-e / -e / -e / -en', '-er / -e / -es / -e (keine -en)', '-er / -e / -es / -e'],
        ['Akkusativ (m/f/n/Pl)', '-en / -e / -e / -en', '-en / -e / -es / -e (keine -en)', '-en / -e / -es / -e'],
        ['Dativ (alle)', '-en / -en / -en / -en', '-en / -en / -en / -en', '-em / -er / -em / -en'],
      ],
    },
    commonMistakesId:
      'Lupa menambahkan "-en" setelah Dativ atau Akkusativ maskulin (salah: "mit dem neue Kollege", benar: "mit dem neuen Kollegen").',
    rulePoints: [
      'Im gesamten Dativ (mit Artikel) und nach „den/einen“ endet das Adjektiv immer auf „-en“.',
      'Nach „ein/mein“ im Nominativ zeigt das Adjektiv das fehlende Signal: ein guter Freund, ein neues Auto.',
      'Ohne Artikel übernimmt das Adjektiv die Endung des bestimmten Artikels (frisches Brot, kalte Milch).',
    ],
    examples: [
      {
        german: 'Sie sucht einen flexiblen Arbeitsplatz in der Stadt.',
        translationId: 'Ia mencari tempat kerja yang fleksibel di kota.',
        note: 'Akkusativ maskulin → -en',
      },
      {
        german: 'Mit einer klaren Struktur schreibt man bessere E-Mails.',
        translationId: 'Dengan struktur yang jelas seseorang menulis email yang lebih baik.',
        note: 'Dativ feminin → -en',
      },
    ],
    relatedExerciseId: 'b1-grammatik-3',
  },
  {
    id: 'gram-b1-8',
    level: 'B1',
    title: 'Infinitivsätze mit „zu“',
    category: 'Satzbau & Infinitiv',
    summary: 'Absichten, Pläne und Bewertungen mit „zu + Infinitiv“ elegant ausdrücken.',
    explanationDe:
      'Nach Verben wie planen, versuchen, hoffen, vergessen sowie Ausdrücken wie „Es ist wichtig...“ oder „Ich habe keine Lust...“ folgt ein Infinitivsatz mit „zu“.',
    explanationId:
      'Konstruksi "zu + Infinitiv" dipakai setelah kata kerja rencana/harapan (planen, versuchen, empfehlen) atau frasa penilaian (Es ist wichtig/gesund...). Pada kata kerja terpisah (trennbare Verben), "zu" disisipkan di tengah antara awalan dan kata dasar.',
    sentenceStructureDe: 'Hauptsatz, + ... + (Präfix-) + zu + Infinitiv (Ende)',
    commonMistakesId:
      'Memakai "zu" setelah Modalverben (salah: "Ich kann zu schwimmen", benar: "Ich kann schwimmen") atau salah menaruh "zu" pada kata kerja terpisah (benar: "aufzustehen", bukan "zu aufstehen").',
    rulePoints: [
      'Nach Modalverben steht NIE „zu“.',
      'Bei trennbaren Verben steht „zu“ zwischen Präfix und Stamm (einzukaufen, anzurufen).',
      'Komma trennt den Infinitivsatz meist deutlich vom Hauptsatz ab.',
    ],
    examples: [
      {
        german: 'Es ist wichtig, regelmäßig Pausen zu machen.',
        translationId: 'Penting untuk beristirahat secara teratur.',
        note: 'Infinitiv mit zu nach Bewertung',
      },
      {
        german: 'Vergiss bitte nicht, deine Mutter heute anzurufen.',
        translationId: 'Jangan lupa menelepon ibumu hari ini.',
        note: 'Trennbares Verb: an-zu-rufen',
      },
    ],
    relatedExerciseId: 'b1-grammatik-2',
  },
  {
    id: 'gram-b1-9',
    level: 'B1',
    title: 'Verben mit festen Präpositionen',
    category: 'Verben & Rektion',
    summary: 'Häufige Verb-Präposition-Verbindungen (warten auf, sich interessieren für) samt Kasus anwenden.',
    explanationDe:
      'Viele deutsche Verben verlangen eine ganz bestimmte Präposition und einen festen Kasus (Akkusativ oder Dativ). Für Sachen bildet man Fragewörter mit „wo(r)-“ und Verweise mit „da(r)-“.',
    explanationId:
      'Banyak kata kerja Jerman memiliki pasangan preposisi dan kasus yang baku (misalnya warten auf + Akk, träumen von + Dat). Untuk benda, dipakai bentuk "wo(r)+preposisi" saat bertanya dan "da(r)+preposisi" sebagai rujukan.',
    sentenceStructureDe: 'Subjekt + Verb + Präposition + Objekt (Akk./Dat.)  |  wo(r)- / da(r)- für Sachen',
    commonMistakesId:
      'Menerjemahkan preposisi langsung dari bahasa Indonesia/Inggris (misalnya "bermimpi tentang" menjadi "träumen über", padahal yang benar "träumen von + Dativ").',
    rulePoints: [
      'Mit Akkusativ: warten auf, sich freuen auf/über, sich interessieren für, denken an.',
      'Mit Dativ: träumen von, teilnehmen an, sprechen mit/über (+ Akk.), fragen nach.',
      'Sache: Worauf wartest du? — Ich warte darauf. / Person: Auf wen wartest du?',
    ],
    examples: [
      {
        german: 'Ich freue mich sehr auf das Wochenende.',
        translationId: 'Saya sangat menantikan akhir pekan.',
        note: 'sich freuen auf + Akkusativ (Zukunft)',
      },
      {
        german: 'Wofür interessierst du dich besonders?',
        translationId: 'Kamu tertarik pada hal apa secara khusus?',
        note: 'Sache → wo + für = wofür',
      },
    ],
    relatedExerciseId: 'b1-grammatik-4',
  },
  {
    id: 'gram-b1-10',
    level: 'B1',
    title: 'Kausale und konzessive Konnektoren (deshalb, trotzdem, da)',
    category: 'Satzverbindungen',
    summary: 'Hauptsatz-Konnektoren (Position 1/3) von Subjunktionen (Verb am Ende) unterscheiden.',
    explanationDe:
      '„deshalb“, „deswegen“ und „trotzdem“ verbinden zwei Hauptsätze und stehen auf Position 1 (direkt danach folgt das Verb!). „weil“, „da“ und „obwohl“ leiten Nebensätze mit Verb-Endstellung ein.',
    explanationId:
      '"deshalb" (oleh karena itu) dan "trotzdem" (meskipun demikian) adalah Konjunktionaladverbien pada kalimat utama — kata kerja langsung berada di posisi 2 setelahnya! Sebaliknya, "weil/da/obwohl" mengirim kata kerja ke akhir anak kalimat.',
    sentenceStructureDe: 'Satz 1. Deshalb / Trotzdem + Verb (Pos. 2) + Subjekt ...',
    commonMistakesId:
      'Menempatkan subjek sebelum kata kerja setelah "deshalb/trotzdem" (salah: "Deshalb ich lerne viel", benar: "Deshalb lerne ich viel").',
    rulePoints: [
      'Kausal (Grund): weil / da (Nebensatz) vs. denn (Pos. 0) vs. deshalb / deswegen (Pos. 1 + Verb).',
      'Konzessiv (Gegengrund): obwohl (Nebensatz) vs. trotzdem (Pos. 1 + Verb).',
      '„da“ steht besonders häufig am Satzanfang vor dem Hauptsatz.',
    ],
    examples: [
      {
        german: 'Es regnet stark. Trotzdem gehen wir spazieren.',
        translationId: 'Hujan turun deras. Meskipun begitu, kami tetap berjalan-jalan.',
        note: 'trotzdem (Pos. 1) + gehen (Pos. 2)',
      },
      {
        german: 'Da der Zug Verspätung hatte, kam ich zu spät zum Termin.',
        translationId: 'Karena kereta mengalami keterlambatan, saya tiba terlambat ke janji temu.',
        note: 'da + Nebensatz (Verb am Ende)',
      },
    ],
    relatedExerciseId: 'b1-grammatik-4',
  },
];
