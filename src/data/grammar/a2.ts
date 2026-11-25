import { GrammarTopic } from '../../types/learning';

export const A2_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'gram-a2-1',
    level: 'A2',
    title: 'Perfekt mit „haben“ und „sein“',
    category: 'Zeitformen',
    summary: 'Über abgeschlossene Handlungen und Erlebnisse in der gesprochenen Vergangenheit berichten.',
    explanationDe:
      'Das Perfekt besteht aus einem konjugierten Hilfsverb (haben oder sein) auf Position 2 und dem Partizip II am Satzende. Verben der Orts- oder Zustandsveränderung sowie „sein“ und „bleiben“ verwenden „sein“.',
    explanationId:
      'Perfekt adalah bentuk lampau utama dalam percakapan sehari-hari. Polanya: haben/sein di posisi 2 + Partizip II di akhir kalimat. Kata kerja perpindahan tempat (gehen, fahren, fliegen) atau perubahan kondisi (aufstehen, einschlafen) memakai "sein".',
    sentenceStructureDe: 'Subjekt (Pos. 1) + haben / sein (Pos. 2) + ... + Partizip II (Satzende)',
    conjugationTable: {
      headers: ['Verbtyp', 'Infinitiv', 'Hilfsverb', 'Partizip II'],
      rows: [
        ['Regelmäßig', 'kaufen', 'haben', 'gekauft'],
        ['Trennbar', 'einkaufen', 'haben', 'eingekauft'],
        ['Untrennbar / -ieren', 'besuchen / studieren', 'haben', 'besucht / studiert'],
        ['Bewegung (stark)', 'fahren / gehen', 'sein', 'gefahren / gegangen'],
      ],
    },
    commonMistakesId:
      'Menggunakan "haben" untuk kata kerja gerak (salah: "Ich habe nach Berlin gefahren") atau menambahkan "ge-" pada kata kerja berawalan be-/ver- atau berakhiran -ieren (salah: "gebesucht", "gestudiert").',
    rulePoints: [
      'Regelmäßiges Partizip II: ge- + Verbstamm + -t (gemacht, gelernt).',
      'Trennbare Verben: Präfix + ge- + Stamm (aufgestanden, eingekauft).',
      'Untrennbare Präfixe (be-, ver-, er-) und Verben auf „-ieren“ bilden das Partizip II ohne „ge-“.',
    ],
    examples: [
      {
        german: 'Gestern sind wir mit dem Zug nach München gefahren.',
        translationId: 'Kemarin kami pergi ke München dengan kereta api.',
        note: 'Bewegungsverb → sein + gefahren',
      },
      {
        german: 'Ich habe gestern frisches Obst eingekauft.',
        translationId: 'Kemarin saya berbelanja buah segar.',
        note: 'Trennbares Verb → ein-ge-kauft',
      },
    ],
    relatedExerciseId: 'a2-grammatik-1',
  },
  {
    id: 'gram-a2-2',
    level: 'A2',
    title: 'Dativ (Verben, Präpositionen & Artikel)',
    category: 'Kasus',
    summary: 'Den Dativ nach bestimmten Verben (helfen, danken, gefallen) und festen Dativpräpositionen anwenden.',
    explanationDe:
      'Der Dativ bezeichnet häufig den Empfänger einer Handlung (Wem?). Feste Dativpräpositionen wie aus, bei, mit, nach, seit, von, zu verlangen immer den Dativ.',
    explanationId:
      'Kasus Dativ menandai objek tidak langsung / penerima (menjawab "Wem? / Kepada siapa?"). Preposisi aus, bei, mit, nach, seit, von, zu serta kata kerja seperti helfen, danken, gefallen, gehören selalu menuntut Dativ.',
    sentenceStructureDe: 'Dativ-Artikel: dem (m./n.) · der (f.) · den + Nomen-n (Pl.)',
    conjugationTable: {
      headers: ['Genus', 'Bestimmter Artikel', 'Unbestimmter Artikel', 'Personalpronomen'],
      rows: [
        ['Maskulin', 'dem', 'einem', 'ihm'],
        ['Feminin', 'der', 'einer', 'ihr'],
        ['Neutrum', 'dem', 'einem', 'ihm'],
        ['Plural', 'den (+ -n am Nomen)', '— (keinen)', 'ihnen'],
      ],
    },
    commonMistakesId:
      'Menggunakan Akkusativ setelah "mit" atau "helfen" (salah: "Ich helfe dich", benar: "Ich helfe dir"; salah: "mit den Bus", benar: "mit dem Bus").',
    rulePoints: [
      'Dativpräpositionen: aus, bei, mit, nach, seit, von, zu, gegenüber.',
      'Wichtige Dativverben: helfen, danken, gefallen, schmecken, gehören, antworten.',
      'Im Dativ Plural bekommt fast jedes Nomen ein „-n“ (mit den Kindern, zu den Freunden).',
    ],
    examples: [
      {
        german: 'Kannst du deinem Kollegen bitte bei der Präsentation helfen?',
        translationId: 'Bisakah kamu membantu rekan kerjamu pada presentasi itu?',
        note: 'helfen + Dativ / bei + Dativ',
      },
      {
        german: 'Der Ausflug hat mir sehr gut gefallen.',
        translationId: 'Wisatanya sangat saya sukai (menyenangkan bagi saya).',
        note: 'gefallen + Dativpronomen (mir)',
      },
    ],
    relatedExerciseId: 'a2-grammatik-2',
  },
  {
    id: 'gram-a2-3',
    level: 'A2',
    title: 'Nebensätze mit „weil“, „dass“ und „wenn“',
    category: 'Satzbau',
    summary: 'Begründungen, Aussagen und Bedingungen mit Verb-Endstellung formulieren.',
    explanationDe:
      'Subjunktionen wie „weil“, „dass“ und „wenn“ leiten einen Nebensatz ein. Im Nebensatz steht das konjugierte Verb ganz am Ende, und vor der Subjunktion steht immer ein Komma.',
    explanationId:
      'Kata penghubung anak kalimat (weil = karena, dass = bahwa, wenn = jika/ketika) memindahkan kata kerja terkonjugasi ke paling akhir anak kalimat. Selalu gunakan tanda koma sebelum kata sambung tersebut.',
    sentenceStructureDe: 'Hauptsatz, + weil / dass / wenn + Subjekt + ... + konjugiertes Verb (Ende)',
    commonMistakesId:
      'Meletakkan kata kerja di posisi 2 setelah "weil" (salah: "weil ich bin müde", benar: "weil ich müde bin").',
    rulePoints: [
      'Bei „weil“, „dass“ und „wenn“ steht das konjugierte Verb am Ende.',
      'Steht ein Modalverb im Nebensatz, steht es ganz am Ende hinter dem Infinitiv (..., weil ich lernen muss).',
      'Beginnt der Satz mit dem Nebensatz, folgt sofort das Verb des Hauptsatzes (Weil ich müde bin, schlafe ich).',
    ],
    examples: [
      {
        german: 'Ich bleibe heute zu Hause, weil ich leichtes Fieber habe.',
        translationId: 'Hari ini saya tinggal di rumah karena saya sedikit demam.',
        note: '„habe“ am Satzende',
      },
      {
        german: 'Ich hoffe, dass du morgen pünktlich kommen kannst.',
        translationId: 'Saya harap besok kamu bisa datang tepat waktu.',
        note: 'Modalverb „kannst“ ganz am Ende',
      },
    ],
    relatedExerciseId: 'a2-grammatik-3',
  },
  {
    id: 'gram-a2-4',
    level: 'A2',
    title: 'Präteritum von „sein“, „haben“ und Modalverben',
    category: 'Zeitformen',
    summary: 'Vergangene Zustände und Möglichkeiten im Alltag mit dem Präteritum ausdrücken.',
    explanationDe:
      'In der gesprochenen Sprache benutzt man für die meisten Verben das Perfekt. Bei „sein“, „haben“ und Modalverben (können, müssen, wollen, dürfen) verwendet man jedoch auch im Alltag fast immer das Präteritum.',
    explanationId:
      'Walaupun percakapan Jerman memakai Perfekt, khusus untuk "sein" (war), "haben" (hatte), dan Modalverben (konnte, musste, wollte, durfte), orang Jerman hampir selalu menggunakan bentuk Präteritum.',
    sentenceStructureDe: 'Subjekt + war / hatte / konnte / musste / wollte (Pos. 2) + ...',
    conjugationTable: {
      headers: ['Pronomen', 'sein', 'haben', 'können', 'müssen'],
      rows: [
        ['ich', 'war', 'hatte', 'konnte', 'musste'],
        ['du', 'warst', 'hattest', 'konntest', 'musstest'],
        ['er / sie / es', 'war', 'hatte', 'konnte', 'musste'],
        ['wir', 'waren', 'hatten', 'konnten', 'mussten'],
        ['ihr', 'wart', 'hattet', 'konntet', 'musstet'],
        ['sie / Sie', 'waren', 'hatten', 'konnten', 'mussten'],
      ],
    },
    commonMistakesId:
      'Mempertahankan umlaut pada bentuk Präteritum Modalverb (salah: "ich könnte", benar untuk lampau: "ich konnte"; "könnte" adalah Konjunktiv II!).',
    rulePoints: [
      'Modalverben verlieren im Präteritum ihren Umlaut (können → konnte, müssen → musste, dürfen → durfte).',
      '„ich“ und „er/sie/es“ sind im Präteritum immer identisch.',
      'Beispiele: Letzte Woche war ich in Hamburg. Ich hatte keine Zeit.',
    ],
    examples: [
      {
        german: 'Letztes Jahr war das Wetter im Urlaub wunderbar.',
        translationId: 'Tahun lalu cuaca saat liburan sangat indah.',
        note: 'sein → war',
      },
      {
        german: 'Wir mussten gestern länger im Büro bleiben.',
        translationId: 'Kemarin kami harus tinggal lebih lama di kantor.',
        note: 'müssen → mussten (ohne Umlaut)',
      },
    ],
    relatedExerciseId: 'a2-grammatik-1',
  },
  {
    id: 'gram-a2-5',
    level: 'A2',
    title: 'Wechselpräpositionen (Wo? vs. Wohin?)',
    category: 'Kasus & Präpositionen',
    summary: 'Position (Dativ) und Richtungsbewegung (Akkusativ) mit in, an, auf, unter, über, vor, hinter, neben, zwischen unterscheiden.',
    explanationDe:
      'Die neun Wechselpräpositionen regieren den Dativ bei einer festen Position (Wo?) und den Akkusativ bei einer Bewegung zu einem Ziel (Wohin?).',
    explanationId:
      'Sembilan preposisi dua arah (in, an, auf, neben, unter, über, vor, hinter, zwischen) menggunakan Dativ untuk menyatakan posisi diam ("Wo?") dan Akkusativ untuk menyatakan arah tujuan ("Wohin?").',
    sentenceStructureDe: 'Wo? (stehen/liegen/hängen/sitzen) → Dativ  |  Wohin? (stellen/legen/hängen/setzen) → Akkusativ',
    commonMistakesId:
      'Tertukar pasangan kata kerja posisi dan arah (misalnya memakai "legen" untuk benda yang sudah diam, atau memakai Dativ setelah "stellen").',
    rulePoints: [
      'Positionsverben (Wo? + Dativ): liegen, stehen, sitzen, hängen, sein.',
      'Richtungsverben (Wohin? + Akkusativ): legen, stellen, setzen, hängen, gehen, fahren.',
      'Kurzformen: in + dem = im, in + das = ins, an + dem = am, auf + das = aufs.',
    ],
    examples: [
      {
        german: 'Die Lampe hängt über dem Tisch.',
        translationId: 'Lampu itu tergantung di atas meja.',
        note: 'Wo? → Dativ (dem Tisch)',
      },
      {
        german: 'Ich stelle die Tasche neben den Stuhl.',
        translationId: 'Saya meletakkan tas itu di samping kursi.',
        note: 'Wohin? → Akkusativ (den Stuhl)',
      },
    ],
    relatedExerciseId: 'a2-grammatik-2',
  },
  {
    id: 'gram-a2-6',
    level: 'A2',
    title: 'Reflexive Verben',
    category: 'Verben & Pronomen',
    summary: 'Verben mit Reflexivpronomen (mich, dich, sich, uns, euch) im Alltag richtig verwenden.',
    explanationDe:
      'Bei reflexiven Verben bezieht sich die Handlung auf das Subjekt zurück (z. B. sich beeilen, sich freuen, sich ausruhen). Im A2-Bereich stehen die meisten Reflexivpronomen im Akkusativ.',
    explanationId:
      'Kata kerja refleksif merujuk kembali pada subjek kalimat (misalnya sich beeilen = bergegas, sich freuen = senang). Hanya pada kata ganti "ich" dan "du" yang berubah menjadi "mich/mir" dan "dich/dir", sedangkan "er/sie/es/sie/Sie" selalu memakai "sich".',
    sentenceStructureDe: 'Subjekt + Verb (Pos. 2) + Reflexivpronomen (mich/dich/sich/uns/euch) + Rest',
    conjugationTable: {
      headers: ['Subjekt', 'Akkusativ', 'Dativ (bei weiterem Akk.-Objekt)', 'Beispiel'],
      rows: [
        ['ich', 'mich', 'mir', 'Ich beeile mich. / Ich putze mir die Zähne.'],
        ['du', 'dich', 'dir', 'Du freust dich. / Du wäschst dir die Hände.'],
        ['er/sie/es', 'sich', 'sich', 'Er zieht sich warm an.'],
        ['wir', 'uns', 'uns', 'Wir treffen uns um 18 Uhr.'],
        ['ihr', 'euch', 'euch', 'Ihr ruht euch aus.'],
        ['sie / Sie', 'sich', 'sich', 'Setzen Sie sich bitte!'],
      ],
    },
    commonMistakesId:
      'Lupa meletakkan "sich" atau menggunakan "sich" untuk subjek "ich" (salah: "Ich freue sich", benar: "Ich freue mich").',
    rulePoints: [
      'Bei 1. & 2. Person unterscheiden sich Akkusativ (mich/dich) und Dativ (mir/dir).',
      'Bei 3. Person Singular, Plural und Höflichkeitsform lautet es immer „sich“.',
      'Wichtige A2-Verben: sich beeilen, sich freuen, sich ärgern, sich erholen, sich anziehen.',
    ],
    examples: [
      {
        german: 'Beeilt euch, sonst verpassen wir den Bus!',
        translationId: 'Cepatlah, kalau tidak kita ketinggalan bus!',
        note: 'ihr → euch',
      },
      {
        german: 'Ich ziehe mir eine warme Jacke an.',
        translationId: 'Saya memakai jaket hangat.',
        note: 'Dativ (mir) + Akkusativobjekt (eine Jacke)',
      },
    ],
    relatedExerciseId: 'a2-grammatik-4',
  },
  {
    id: 'gram-a2-7',
    level: 'A2',
    title: 'Komparativ und Superlativ',
    category: 'Adjektive & Vergleiche',
    summary: 'Eigenschaften vergleichen und Höchstgrade mit „als“, „so ... wie“ und „am ...-sten“ bilden.',
    explanationDe:
      'Der Komparativ vergleicht zwei Dinge (schneller als). Gleichheit drückt man mit „so + Positiv + wie“ aus. Der Superlativ nennt den höchsten Grad (am schnellsten).',
    explanationId:
      'Komparativ (akhiran -er) digunakan untuk membandingkan perbedaan bersama kata "als" (lebih ... daripada). Kesetaraan memakai "so ... wie" (sama ... seperti). Superlativ memakai "am ...-sten".',
    sentenceStructureDe: 'so + Positiv + wie  |  Komparativ (-er) + als  |  am + Superlativ (-sten)',
    conjugationTable: {
      headers: ['Positiv', 'Komparativ', 'Superlativ', 'Besonderheit'],
      rows: [
        ['schnell', 'schneller', 'am schnellsten', 'regelmäßig'],
        ['alt / groß', 'älter / größer', 'am ältesten / am größten', 'Umlaut + -est / -t'],
        ['gut', 'besser', 'am besten', 'unregelmäßig'],
        ['viel / gern', 'mehr / lieber', 'am meisten / am liebsten', 'unregelmäßig'],
      ],
    },
    commonMistakesId:
      'Memakai "wie" setelah Komparativ (salah: "schneller wie das Auto", benar: "schneller als das Auto") atau membentuk "guter" alih-alih "besser".',
    rulePoints: [
      'Unterschied: Gleichheit = „so gut wie“, Ungleichheit = „besser als“.',
      'Kurze Adjektive mit a, o, u erhalten oft einen Umlaut (alt → älter, jung → jünger).',
      'Adjektive auf -t, -d, -s, -ß, -z bilden den Superlativ mit -esten (am ältesten).',
    ],
    examples: [
      {
        german: 'Der Zug ist deutlich schneller als das Auto.',
        translationId: 'Kereta api jauh lebih cepat daripada mobil.',
        note: 'Komparativ + als',
      },
      {
        german: 'Im Sommer fahre ich am liebsten an die Ostsee.',
        translationId: 'Di musim panas saya paling suka pergi ke Laut Baltik.',
        note: 'gern → lieber → am liebsten',
      },
    ],
    relatedExerciseId: 'a2-grammatik-3',
  },
  {
    id: 'gram-a2-8',
    level: 'A2',
    title: 'Possessivartikel',
    category: 'Artikel & Pronomen',
    summary: 'Besitz und Zugehörigkeit mit mein, dein, sein, ihr, unser, euer, Ihr im Nominativ, Akkusativ und Dativ zeigen.',
    explanationDe:
      'Possessivartikel zeigen, wem etwas gehört. Der Stamm richtet sich nach dem Besitzer (ich → mein, wir → unser), während die Endung sich nach dem Nomen richtet (wie bei „ein/kein“).',
    explanationId:
      'Possessivartikel menunjukkan kepemilikan (mein = milik saya, dein = milik kamu, sein/ihr = miliknya, unser = milik kami). Akar kata mengikuti pemilik, sedangkan akhirannya mengikuti gender dan kasus kata benda yang dimiliki.',
    sentenceStructureDe: 'Besitzerstamm (mein/dein/sein/ihr/unser/euer/Ihr) + Kasusendung des Nomens',
    commonMistakesId:
      'Tertukar "sein" (milik laki-laki/netral) dengan "ihr" (milik perempuan/jamak), atau lupa menambahkan "-en" pada Akkusativ maskulin dan "-em/-er" pada Dativ.',
    rulePoints: [
      '„euer“ verliert bei Endung das innere „e“: eure Wohnung, mit eurem Auto.',
      'Akkusativ maskulin: meinen / deinen / unseren Bruder.',
      'Dativ maskulin/neutrum: meinem; Dativ feminin: meiner; Dativ Plural: meinen (+ -n).',
    ],
    examples: [
      {
        german: 'Wir besuchen am Wochenende unsere Großeltern.',
        translationId: 'Akhir pekan ini kami mengunjungi kakek-nenek kami.',
        note: 'Plural Akkusativ → unsere',
      },
      {
        german: 'Sie spricht gerade mit ihrem Chef.',
        translationId: 'Dia sedang berbicara dengan atasannya.',
        note: 'Dativ maskulin → mit ihrem Chef',
      },
    ],
    relatedExerciseId: 'a2-grammatik-4',
  },
  {
    id: 'gram-a2-9',
    level: 'A2',
    title: 'Imperativ',
    category: 'Satzarten & Aufforderungen',
    summary: 'Bitten, Tipps und Anweisungen für du, ihr und Sie höflich und korrekt bilden.',
    explanationDe:
      'Der Imperativ drückt eine Aufforderung, eine Bitte oder einen Ratschlag aus. Das Verb steht immer auf Position 1.',
    explanationId:
      'Kalimat perintah / saran (Imperativ) selalu menempatkan kata kerja di posisi 1. Untuk bentuk "du", akhiran "-st" dan kata "du" dibuang. Untuk "ihr", kata "ihr" dibuang. Untuk bentuk sopan "Sie", kata "Sie" tetap ditulis setelah kata kerja.',
    sentenceStructureDe: 'du: Verbstamm!  |  ihr: Verb (-t)!  |  Sie: Verb (-en) + Sie!',
    commonMistakesId:
      'Mempertahankan umlaut atau kata "du" pada Imperativ (salah: "Fährst du langsam!", benar: "Fahr langsam!"; namun perubahan e→i tetap ada: "Sprich laut!").',
    rulePoints: [
      'du-Form: ohne „du“ und ohne „-st“ (Mach das Fenster auf! / Lies den Text!).',
      'Umlaut bei starken Verben entfällt im Imperativ (du fährst → Fahr!).',
      'Sonderformen „sein“: Sei pünktlich! / Seid ruhig! / Seien Sie vorsichtig!',
      'Mit „bitte“ wirkt jede Aufforderung freundlich.',
    ],
    examples: [
      {
        german: 'Nehmen Sie bitte diese Tabletten dreimal täglich.',
        translationId: 'Silakan minum tablet ini tiga kali sehari.',
        note: 'Höflicher Imperativ (Sie-Form)',
      },
      {
        german: 'Gib mir bitte kurz das Wörterbuch!',
        translationId: 'Tolong berikan saya kamus itu sebentar!',
        note: 'e → i Wechsel bleibt (geben → Gib!)',
      },
    ],
    relatedExerciseId: 'a2-grammatik-4',
  },
  {
    id: 'gram-a2-10',
    level: 'A2',
    title: 'Temporalpräpositionen (am, im, um, seit, vor)',
    category: 'Präpositionen',
    summary: 'Zeitpunkte und Zeitdauer mit den passenden Präpositionen und Fällen ausdrücken.',
    explanationDe:
      'Im Deutschen hat jede Zeiteinheit eine feste Präposition: „am“ für Tage/Tageszeiten, „im“ für Monate/Jahreszeiten und „um“ für Uhrzeiten. „seit“ beschreibt etwas, das noch andauert.',
    explanationId:
      'Preposisi waktu di bahasa Jerman memiliki pasangan tetap: "um" untuk jam, "am" untuk hari/bagian hari/tanggal, "im" untuk bulan/musim. Untuk durasi yang masih berlangsung hingga kini digunakan "seit" (+ Dativ).',
    sentenceStructureDe: 'um + Uhrzeit  |  am + Tag/Datum  |  im + Monat/Jahreszeit  |  seit / vor + Dativ',
    commonMistakesId:
      'Menggunakan "in" untuk hari (salah: "in Montag", benar: "am Montag") atau memakai lampau setelah "seit" untuk hal yang masih terjadi sekarang (seharusnya Präsens).',
    rulePoints: [
      'um 14 Uhr / am Montag, am Morgen / im Juli, im Sommer.',
      'seit (+ Dativ) + Präsens: Handlung begann in der Vergangenheit und dauert noch an.',
      'vor (+ Dativ) + Perfekt/Präteritum: abgeschlossener Zeitpunkt in der Vergangenheit.',
    ],
    examples: [
      {
        german: 'Ich lerne schon seit einem Jahr Deutsch.',
        translationId: 'Saya sudah belajar bahasa Jerman selama satu tahun (masih berlangsung).',
        note: 'seit + Dativ + Präsens',
      },
      {
        german: 'Vor zwei Monaten bin ich nach Berlin umgezogen.',
        translationId: 'Dua bulan yang lalu saya pindah ke Berlin.',
        note: 'vor + Dativ + Perfekt',
      },
    ],
    relatedExerciseId: 'a2-grammatik-2',
  },
];
