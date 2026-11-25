import { GrammarTopic } from '../../types/learning';

export const A1_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'gram-a1-1',
    level: 'A1',
    title: 'Personalpronomen',
    category: 'Pronomen & Grundlagen',
    summary: 'Alle Personalpronomen im Nominativ (ich, du, er, sie, es, wir, ihr, sie, Sie) sicher verwenden.',
    explanationDe:
      'Personalpronomen ersetzen Nomen oder Personen im Satz. Im Deutschen unterscheidet man zwischen der informellen Anrede (du/ihr) und der formellen Höflichkeitsform (Sie).',
    explanationId:
      'Kata ganti orang (Personalpronomen) menggantikan nama orang atau benda sebagai subjek kalimat. Bentuk formal "Sie" selalu diawali huruf kapital untuk menghormati lawan bicara.',
    sentenceStructureDe: 'Subjekt (Personalpronomen, Pos. 1) + konjugiertes Verb (Pos. 2) + Ergänzung',
    conjugationTable: {
      headers: ['Person', 'Pronomen', 'Beispiel mit „sein“', 'Bedeutung (ID)'],
      rows: [
        ['1. Sg.', 'ich', 'ich bin', 'saya'],
        ['2. Sg. (informell)', 'du', 'du bist', 'kamu'],
        ['3. Sg.', 'er / sie / es', 'er / sie / es ist', 'dia (lk / pr / netral)'],
        ['1. Pl.', 'wir', 'wir sind', 'kami / kita'],
        ['2. Pl. (informell)', 'ihr', 'ihr seid', 'kalian'],
        ['3. Pl. / Formell', 'sie / Sie', 'sie / Sie sind', 'mereka / Anda'],
      ],
    },
    commonMistakesId:
      'Kesalahan umum: menulis "sie" kecil untuk sapaan sopan "Anda", atau menyamakan "ihr" (kalian) dengan "Sie" (Anda).',
    rulePoints: [
      '„ich“ wird im Satzinneren kleingeschrieben; „Sie“ (formell) immer groß.',
      '„er/sie/es“ richtet sich nach dem grammatischen Artikel des Nomens (der Tisch → er, die Lampe → sie, das Buch → es).',
      'Für mehrere Freunde nutzt man „ihr“; für mehrere Unbekannte ebenfalls „Sie“.',
    ],
    examples: [
      {
        german: 'Meine Schwester und ich sind aus Surabaya.',
        translationId: 'Saya dan saudara perempuan saya berasal dari Surabaya.',
        note: 'wir-Form → sind',
      },
      {
        german: 'Woher kommen Sie, Frau Weber?',
        translationId: 'Dari mana asal Anda, Ibu Weber?',
        note: 'Höflichkeitsform „Sie“',
      },
    ],
    relatedExerciseId: 'a1-grammatik-1',
  },
  {
    id: 'gram-a1-2',
    level: 'A1',
    title: 'Artikel: der, die, das',
    category: 'Nomen & Genus',
    summary: 'Die drei bestimmten Artikel (maskulin, feminin, neutrum) und Plural „die“ erkennen.',
    explanationDe:
      'Jedes deutsche Nomen hat ein festes grammatisches Geschlecht: maskulin (der), feminin (die) oder neutrum (das). Im Plural lautet der bestimmte Artikel immer „die“.',
    explanationId:
      'Setiap kata benda bahasa Jerman selalu memiliki artikel gender (der = maskulin, die = feminin, das = netral). Pada bentuk jamak (Plural), semua gender memakai artikel "die".',
    sentenceStructureDe: 'Bestimmter Artikel (der / die / das / die Pl.) + Nomen (immer großgeschrieben)',
    commonMistakesId:
      'Menghafal kata benda tanpa artikelnya. Di bahasa Jerman, gender tidak selalu sesuai dengan jenis kelamin biologis atau logika benda (misalnya: das Mädchen = netral).',
    rulePoints: [
      'Nomen auf „-ung“, „-heit“, „-keit“, „-schaft“ sind immer feminin (die Wohnung).',
      'Nomen auf „-chen“ oder „-lein“ sind immer neutrum (das Brötchen).',
      'Viele männliche Berufe und Tage/Monate sind maskulin (der Lehrer, der Montag).',
    ],
    examples: [
      {
        german: 'Der Kaffee ist heiß, aber die Milch ist kalt.',
        translationId: 'Kopinya panas, tetapi susunya dingin.',
        note: 'der Kaffee (m.) / die Milch (f.)',
      },
      {
        german: 'Das Brot und die Brötchen liegen auf dem Tisch.',
        translationId: 'Roti dan roti gulungnya terletak di atas meja.',
        note: 'das (n.) vs. die (Plural)',
      },
    ],
    relatedExerciseId: 'a1-grammatik-2',
  },
  {
    id: 'gram-a1-3',
    level: 'A1',
    title: 'Satzstellung und Wortstellung',
    category: 'Satzbau',
    summary: 'Verbposition 2 im Aussagesatz sowie Inversion bei Zeit- oder Ortsangaben am Satzanfang.',
    explanationDe:
      'Im deutschen Aussagesatz steht das konjugierte Verb immer an zweiter Satzposition. Beginnt der Satz mit einer Zeitangabe, rückt das Subjekt direkt hinter das Verb (Position 3).',
    explanationId:
      'Aturan emas kalimat berita bahasa Jerman (V2): kata kerja yang terkonjugasi wajib berada di posisi ke-2. Jika keterangan waktu atau tempat ditaruh di posisi ke-1, subjek bergeser ke posisi ke-3.',
    sentenceStructureDe: 'Position 1 (Subjekt oder Zeit/Ort) + Position 2 (konjugiertes Verb) + Position 3+ (Subjekt/Rest)',
    commonMistakesId:
      'Meniru susunan bahasa Inggris/Indonesia seperti "Am Samstag ich fahre..." — ini salah karena kata kerja menjadi di posisi 3. Yang benar: "Am Samstag fahre ich...".',
    rulePoints: [
      'Normale Wortstellung: Subjekt (1) + Verb (2) + Zeit/Ort (3).',
      'Inversion: Zeit/Ort (1) + Verb (2) + Subjekt (3).',
      'Bei Modalverben bildet das konjugierte Verb (Pos. 2) mit dem Infinitiv (Ende) eine Satzklammer.',
    ],
    examples: [
      {
        german: 'Am Samstag fahre ich nach Köln.',
        translationId: 'Pada hari Sabtu saya pergi ke Köln.',
        note: 'Inversion: Verb auf Pos. 2',
      },
      {
        german: 'Morgen früh trinken wir zusammen Kaffee.',
        translationId: 'Besok pagi kami minum kopi bersama.',
        note: 'Zeitangabe Pos. 1 → Verb Pos. 2',
      },
    ],
    relatedExerciseId: 'a1-grammatik-3',
  },
  {
    id: 'gram-a1-4',
    level: 'A1',
    title: 'Verbkonjugation im Präsens',
    category: 'Verben & Zeitformen',
    summary: 'Regelmäßige Verben sowie „sein“, „haben“ und Verben mit Vokalwechsel im Präsens konjugieren.',
    explanationDe:
      'Regelmäßige Verben verlieren die Infinitivendung „-en“ und erhalten Personalendungen (-e, -st, -t, -en, -t, -en). „sein“ und „haben“ sowie starke Verben wie „fahren“ haben eigene Formen.',
    explanationId:
      'Kata kerja beraturan dibentuk dengan membuang "-en" lalu menambahkan akhiran sesuai subjek (-e, -st, -t, -en, -t, -en). Kata kerja seperti "fahren" atau "sprechen" mengalami perubahan vokal pada du dan er/sie/es.',
    sentenceStructureDe: 'Verbstamm + Personalendung (-e / -st / -t / -en / -t / -en)',
    conjugationTable: {
      headers: ['Pronomen', 'wohnen (regelmäßig)', 'fahren (a→ä)', 'haben (unregelm.)'],
      rows: [
        ['ich', 'wohne', 'fahre', 'habe'],
        ['du', 'wohnst', 'fährst', 'hast'],
        ['er / sie / es', 'wohnt', 'fährt', 'hat'],
        ['wir', 'wohnen', 'fahren', 'haben'],
        ['ihr', 'wohnt', 'fahrt', 'habt'],
        ['sie / Sie', 'wohnen', 'fahren', 'haben'],
      ],
    },
    commonMistakesId:
      'Lupa mengubah vokal pada du/er/sie/es (misalnya menulis "du fahrst" padahal yang benar "du fährst", atau "er sprechst" padahal "er spricht").',
    rulePoints: [
      'Endungsschema Präsens: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.',
      'Endet der Verbstamm auf -t oder -d (arbeiten), wird vor -st/-t ein „-e-“ eingeschoben (du arbeitest, er arbeitet).',
      'Vokalwechsel (a→ä, e→i/ie) tritt nur bei du und er/sie/es auf.',
    ],
    examples: [
      {
        german: 'Er arbeitet als Ingenieur und spricht gut Deutsch.',
        translationId: 'Dia bekerja sebagai insinyur dan berbicara bahasa Jerman dengan baik.',
        note: 'arbeiten (+e) & sprechen (e→i)',
      },
      {
        german: 'Wie viele Geschwister hast du?',
        translationId: 'Berapa banyak saudara kandung yang kamu punya?',
        note: 'haben → du hast',
      },
    ],
    relatedExerciseId: 'a1-grammatik-1',
  },
  {
    id: 'gram-a1-5',
    level: 'A1',
    title: 'Unbestimmte Artikel: ein, eine',
    category: 'Nomen & Artikel',
    summary: 'Unbestimmte Artikel für neue, nicht näher bekannte Dinge im Nominativ und Akkusativ nutzen.',
    explanationDe:
      'Wenn man über etwas zum ersten Mal oder allgemein spricht, verwendet man den unbestimmten Artikel (ein / eine). Im Plural gibt es keinen unbestimmten Artikel.',
    explanationId:
      'Artikel tak tentu (ein/eine, berarti "sebuah/seorang") digunakan saat menyebut benda/orang untuk pertama kali atau secara umum. Dalam bentuk jamak, artikel tak tentu tidak digunakan.',
    sentenceStructureDe: 'ein (maskulin/neutrum Nom.) · eine (feminin) · einen (maskulin Akk.)',
    commonMistakesId:
      'Menggunakan "ein" untuk kata benda jamak (salah: "Ich habe ein Bücher", benar: "Ich habe Bücher").',
    rulePoints: [
      'Maskulin (der): ein (Nominativ) → einen (Akkusativ).',
      'Feminin (die): eine (Nominativ & Akkusativ).',
      'Neutrum (das): ein (Nominativ & Akkusativ).',
      'Plural: kein unbestimmter Artikel (z. B. „Ich kaufe Äpfel“).',
    ],
    examples: [
      {
        german: 'Auf dem Tisch liegt ein Buch und eine Zeitung.',
        translationId: 'Di atas meja ada sebuah buku dan sebuah koran.',
        note: 'das Buch → ein / die Zeitung → eine',
      },
      {
        german: 'Ich trinke morgens gern einen Tee.',
        translationId: 'Di pagi hari saya suka minum teh.',
        note: 'der Tee im Akkusativ → einen',
      },
    ],
    relatedExerciseId: 'a1-grammatik-2',
  },
  {
    id: 'gram-a1-6',
    level: 'A1',
    title: 'Nominativ',
    category: 'Kasus',
    summary: 'Das Subjekt eines Satzes sowie Nomen nach „sein“ und „werden“ im Nominativ erkennen.',
    explanationDe:
      'Der Nominativ ist die Grundform des Nomens und markiert das Subjekt (Wer oder was tut etwas?). Auch nach „sein“ steht immer der Nominativ.',
    explanationId:
      'Nominativ adalah kasus dasar kata benda yang berfungsi sebagai subjek kalimat (menjawab pertanyaan "Wer?/Siapa?" atau "Was?/Apa?"). Setelah kata kerja "sein", kata benda juga selalu berbentuk Nominativ.',
    sentenceStructureDe: 'Subjekt (Nominativ: der / die / das / ein / eine) + Verb + ...',
    commonMistakesId:
      'Menggunakan Akkusativ setelah kata kerja "sein" (salah: "Das ist einen Tisch", benar: "Das ist ein Tisch").',
    rulePoints: [
      'Kontrollfrage für Personen: Wer? / Für Sachen: Was?',
      'Nach „sein“ (ist, sind) steht niemals Akkusativ, sondern immer Nominativ.',
      'Artikel im Nominativ: der/ein, die/eine, das/ein, Plural die.',
    ],
    examples: [
      {
        german: 'Das ist ein bequemer Stuhl.',
        translationId: 'Ini adalah sebuah kursi yang nyaman.',
        note: 'Nominativ nach „sein“',
      },
      {
        german: 'Die Lehrerin erklärt das Wort.',
        translationId: 'Ibu guru itu menjelaskan kata tersebut.',
        note: 'Die Lehrerin = Subjekt (Nominativ)',
      },
    ],
    relatedExerciseId: 'a1-grammatik-2',
  },
  {
    id: 'gram-a1-7',
    level: 'A1',
    title: 'Akkusativ',
    category: 'Kasus',
    summary: 'Das direkte Objekt nach transitiven Verben und Präpositionen wie „für“ korrekt deklinieren.',
    explanationDe:
      'Viele Verben (haben, kaufen, essen, trinken, brauchen, suchen) brauchen ein direktes Objekt im Akkusativ. Nur der maskuline Artikel verändert sich: der → den, ein → einen, kein → keinen.',
    explanationId:
      'Kasus Akkusativ menandai objek langsung (menjawab "Wen?/Was?"). Perubahan artikel hanya terjadi pada kata benda maskulin: der → den, ein → einen, kein → keinen. Feminin, netral, dan jamak tetap sama seperti Nominativ.',
    sentenceStructureDe: 'Subjekt (Nom.) + Verb + direktes Objekt (Akk.: den / einen / keinen)',
    conjugationTable: {
      headers: ['Genus', 'Nominativ', 'Akkusativ', 'Beispielsatz'],
      rows: [
        ['Maskulin (der)', 'der / ein / kein', 'den / einen / keinen', 'Ich kaufe einen Apfel.'],
        ['Feminin (die)', 'die / eine / keine', 'die / eine / keine', 'Ich kaufe eine Banane.'],
        ['Neutrum (das)', 'das / ein / kein', 'das / ein / kein', 'Ich kaufe ein Brot.'],
        ['Plural (die)', 'die / — / keine', 'die / — / keine', 'Ich kaufe keine Kekse.'],
      ],
    },
    commonMistakesId:
      'Lupa menambahkan akhiran "-en" pada artikel maskulin setelah kata kerja "haben" atau "brauchen" (misalnya menulis "Ich habe ein Bruder" alih-alih "einen Bruder").',
    rulePoints: [
      'Nur maskulin Singular ändert sich im Akkusativ (der → den, ein → einen).',
      'Typische Akkusativverben: haben, kaufen, trinken, essen, sehen, besuchen, suchen.',
      'Präpositionen immer mit Akkusativ: für, ohne, durch, gegen, um.',
    ],
    examples: [
      {
        german: 'Ich habe einen Bruder und eine Schwester.',
        translationId: 'Saya punya seorang saudara laki-laki dan seorang saudara perempuan.',
        note: 'der Bruder → einen Bruder',
      },
      {
        german: 'Das Geschenk ist für meinen Vater.',
        translationId: 'Hadiah itu untuk ayah saya.',
        note: 'Präposition „für“ + Akkusativ',
      },
    ],
    relatedExerciseId: 'a1-grammatik-4',
  },
  {
    id: 'gram-a1-8',
    level: 'A1',
    title: 'W-Fragen',
    category: 'Fragesätze',
    summary: 'Fragen mit Fragewörtern wie Wer, Was, Wo, Woher, Wohin, Wann und Wie bilden.',
    explanationDe:
      'W-Fragen beginnen immer mit einem Fragewort auf Position 1. Direkt danach folgt das konjugierte Verb auf Position 2 und erst dann das Subjekt.',
    explanationId:
      'Kalimat tanya terbuka (W-Fragen) diawali kata tanya di posisi 1 (Wer, Was, Wo, Wann, Wie, Warum), diikuti langsung kata kerja di posisi 2, lalu subjek.',
    sentenceStructureDe: 'Fragewort (Pos. 1) + konjugiertes Verb (Pos. 2) + Subjekt (Pos. 3) + ...?',
    commonMistakesId:
      'Tertukar antara "Wo" (di mana / diam), "Woher" (dari mana / asal), dan "Wohin" (ke mana / tujuan).',
    rulePoints: [
      'Wo? (Ort/Position), Woher? (Herkunft), Wohin? (Richtung/Ziel).',
      'Wie viel? (Menge/Preis), Wie viele? (zählbare Nomen im Plural).',
      'Das Verb steht auch in der W-Frage immer an Position 2.',
    ],
    examples: [
      {
        german: 'Wann beginnt der Unterricht heute?',
        translationId: 'Kapan pelajaran hari ini dimulai?',
        note: 'Wann (Pos. 1) + beginnt (Pos. 2)',
      },
      {
        german: 'Wie viel kostet das Kilo Tomaten?',
        translationId: 'Berapa harga satu kilo tomat?',
        note: 'W-Frage nach dem Preis',
      },
    ],
    relatedExerciseId: 'a1-grammatik-3',
  },
  {
    id: 'gram-a1-9',
    level: 'A1',
    title: 'Ja/Nein-Fragen',
    category: 'Fragesätze',
    summary: 'Entscheidungsfragen mit dem Verb auf Position 1 korrekt formulieren.',
    explanationDe:
      'Bei einer Ja/Nein-Frage gibt es kein Fragewort. Das konjugierte Verb steht ganz am Anfang auf Position 1, gefolgt vom Subjekt auf Position 2.',
    explanationId:
      'Kalimat tanya Ya/Tidak (Ja/Nein-Fragen) menempatkan kata kerja terkonjugasi di posisi paling depan (posisi 1), diikuti oleh subjek di posisi 2.',
    sentenceStructureDe: 'Konjugiertes Verb (Pos. 1) + Subjekt (Pos. 2) + Rest ...?',
    commonMistakesId:
      'Menambahkan kata bantu seperti "Do" dalam bahasa Inggris atau mempertahankan susunan kalimat berita dengan intonasi tanya saja.',
    rulePoints: [
      'Verb auf Position 1: Kommst du morgen?',
      'Bei trennbaren Verben bleibt das Präfix am Satzende: Kaufst du heute ein?',
      'Auf negative Fragen antwortet man positiv mit „Doch!“ statt „Ja“.',
    ],
    examples: [
      {
        german: 'Sprechen Sie auch Englisch?',
        translationId: 'Apakah Anda juga berbicara bahasa Inggris?',
        note: 'Verb „Sprechen“ auf Position 1',
      },
      {
        german: 'Hast du heute Nachmittag Zeit?',
        translationId: 'Apakah kamu punya waktu sore ini?',
        note: 'Ja / Nein als Antwort',
      },
    ],
    relatedExerciseId: 'a1-grammatik-3',
  },
  {
    id: 'gram-a1-10',
    level: 'A1',
    title: 'Modalverben (können, müssen, möchten, wollen)',
    category: 'Verben & Satzklammer',
    summary: 'Fähigkeiten, Pflichten und Wünsche mit Modalverben und Satzklammer ausdrücken.',
    explanationDe:
      'Modalverben stehen konjugiert auf Position 2, während das zweite Verb im Infinitiv ganz am Satzende steht. Bei Modalverben sind die 1. und 3. Person Singular (ich / er, sie, es) immer gleich und haben keine Endung.',
    explanationId:
      'Modalverb diletakkan di posisi 2 dalam bentuk terkonjugasi, sedangkan kata kerja utama tetap dalam bentuk dasar (Infinitiv) di paling akhir kalimat. Bentuk "ich" dan "er/sie/es" selalu identik tanpa akhiran -e/-t.',
    sentenceStructureDe: 'Subjekt (Pos. 1) + Modalverb konjugiert (Pos. 2) + Ergänzungen + Infinitiv (Satzende)',
    conjugationTable: {
      headers: ['Pronomen', 'können', 'müssen', 'möchten'],
      rows: [
        ['ich', 'kann', 'muss', 'möchte'],
        ['du', 'kannst', 'musst', 'möchtest'],
        ['er / sie / es', 'kann', 'muss', 'möchte'],
        ['wir', 'können', 'müssen', 'möchten'],
        ['ihr', 'könnt', 'müsst', 'möchtet'],
        ['sie / Sie', 'können', 'müssen', 'möchten'],
      ],
    },
    commonMistakesId:
      'Mengkonjugasi kedua kata kerja (salah: "Ich kann spiele Fußball") atau menaruh kata kerja kedua tepat di sebelah Modalverb.',
    rulePoints: [
      'ich kann = er/sie/es kann (keine -t-Endung bei er/sie/es).',
      'Das Vollverb am Satzende bleibt immer im Infinitiv.',
      '„möchten“ drückt eine höfliche Bitte oder einen Wunsch aus.',
    ],
    examples: [
      {
        german: 'Wir können morgen gemeinsam lernen.',
        translationId: 'Besok kita bisa belajar bersama.',
        note: 'Satzklammer: können ... lernen',
      },
      {
        german: 'Ich muss heute bis 18 Uhr arbeiten.',
        translationId: 'Hari ini saya harus bekerja sampai pukul 18.00.',
        note: 'müssen + Infinitiv am Ende',
      },
    ],
    relatedExerciseId: 'a1-grammatik-3',
  },
  {
    id: 'gram-a1-11',
    level: 'A1',
    title: 'Trennbare Verben',
    category: 'Verben & Satzbau',
    summary: 'Verben mit trennbaren Vorsilben (aufstehen, einkaufen, anrufen) im Präsens korrekt trennen.',
    explanationDe:
      'Viele deutsche Verben haben ein betontes Präfix wie ab-, an-, auf-, aus-, ein-, mit-, vor- oder zurück-. Im Hauptsatz wandert dieses Präfix ans Satzende.',
    explanationId:
      'Kata kerja terpisah (trennbare Verben) memiliki awalan bertekanan suara (ab-, an-, auf-, aus-, ein-, mit-, zurück-). Di kalimat utama Präsens, awalan tersebut dipisahkan dan diletakkan di akhir kalimat.',
    sentenceStructureDe: 'Subjekt (Pos. 1) + Verbstamm konjugiert (Pos. 2) + ... + Präfix (Satzende)',
    commonMistakesId:
      'Membiarkan kata kerja tetap utuh (salah: "Ich aufstehe um 7 Uhr", benar: "Ich stehe um 7 Uhr auf").',
    rulePoints: [
      'Typische trennbare Präfixe: auf-, ein-, an-, ab-, mit-, fern-, zurück-.',
      'Untrennbare Präfixe (nie getrennt): be-, ver-, er-, ent-, ge-.',
      'Steht das Verb mit einem Modalverb, bleibt es zusammen im Infinitiv am Ende (Ich muss früh aufstehen).',
    ],
    examples: [
      {
        german: 'Ich stehe jeden Tag um halb sieben auf.',
        translationId: 'Saya bangun setiap hari pukul setengah tujuh.',
        note: 'aufstehen → stehe ... auf',
      },
      {
        german: 'Rufst du mich heute Abend zurück?',
        translationId: 'Apakah kamu menelepon saya kembali malam ini?',
        note: 'zurückrufen → Rufst ... zurück',
      },
    ],
    relatedExerciseId: 'a1-grammatik-5',
  },
  {
    id: 'gram-a1-12',
    level: 'A1',
    title: 'Negation: nicht und kein',
    category: 'Verneinung',
    summary: 'Wann man Nomen mit „kein“ und wann man Verben, Adjektive oder Sätze mit „nicht“ verneint.',
    explanationDe:
      '„kein / keine / keinen“ verneint Nomen mit unbestimmtem Artikel oder ohne Artikel. „nicht“ verneint Verben, Adjektive, Ortsangaben oder Nomen mit bestimmtem Artikel/Possessivartikel.',
    explanationId:
      '"kein/keine/keinen" dipakai untuk menyangkal kata benda tak tentu (ein/eine) atau kata benda tanpa artikel. "nicht" dipakai untuk menyangkal kata kerja, kata sifat, keterangan tempat/waktu, atau kata benda dengan artikel tertentu (der/die/das/mein).',
    sentenceStructureDe: 'kein + Nomen  |  Subjekt + Verb + ... + nicht (+ Adjektiv/Ort)',
    commonMistakesId:
      'Memakai "nicht" untuk menyangkal kata benda tak tentu (salah: "Ich habe nicht Zeit", benar: "Ich habe keine Zeit").',
    rulePoints: [
      'kein dekliniert genau wie „ein“ im Singular und wie „meine“ im Plural.',
      '„nicht“ steht bei Verben meist am Satzende, aber vor Adjektiven und Ortsangaben.',
      'Beispiel Gegensatz: Das ist kein Buch (Nomen ohne best. Artikel) vs. Das ist nicht mein Buch.',
    ],
    examples: [
      {
        german: 'Ich habe heute leider keine Zeit.',
        translationId: 'Sayangnya hari ini saya tidak punya waktu.',
        note: 'die Zeit (ohne Artikel) → keine Zeit',
      },
      {
        german: 'Der Film ist heute nicht interessant.',
        translationId: 'Filmnya hari ini tidak menarik.',
        note: 'Adjektiv mit „nicht“ verneint',
      },
    ],
    relatedExerciseId: 'a1-grammatik-4',
  },
];
