export interface AlphabetLetter {
  letter: string;
  name: string;
  phoneticId: string;
  exampleWord: string;
  exampleMeaningId: string;
  tip?: string;
}

export interface SpecialSound {
  symbol: string;
  name: string;
  pronunciationId: string;
  explanationId: string;
  examples: { word: string; phonetic: string; meaningId: string }[];
}

export interface SurvivalPhrase {
  id: string;
  category: 'salam' | 'perkenalan' | 'kesopanan' | 'darurat';
  categoryLabelId: string;
  german: string;
  indonesian: string;
  phoneticId: string;
  contextId: string;
}

export interface CoreSecret {
  number: number;
  titleId: string;
  titleDe: string;
  summaryId: string;
  detailsId: string[];
  examples: { german: string; indonesian: string; note?: string }[];
}

export interface BeginnerQuizQuestion {
  id: string;
  question: string;
  explanationId: string;
  options: string[];
  correctIndex: number;
}

export const GERMAN_ALPHABET: AlphabetLetter[] = [
  { letter: 'A a', name: 'Ah', phoneticId: 'a (seperti pada "Apel")', exampleWord: 'der Apfel', exampleMeaningId: 'apel' },
  { letter: 'B b', name: 'Be', phoneticId: 'be (seperti pada "Buku")', exampleWord: 'der Ball', exampleMeaningId: 'bola' },
  { letter: 'C c', name: 'Tse', phoneticId: 'tse / k (sebelum a/o/u dibaca k, sebelum e/i dibaca tse)', exampleWord: 'das Café', exampleMeaningId: 'kafe' },
  { letter: 'D d', name: 'De', phoneticId: 'de (di akhir kata terdengar tegas mirip t)', exampleWord: 'das Danke', exampleMeaningId: 'terima kasih' },
  { letter: 'E e', name: 'Eh', phoneticId: 'e (bisa e terbuka atau e tertutup)', exampleWord: 'der Elefant', exampleMeaningId: 'gajah' },
  { letter: 'F f', name: 'Eff', phoneticId: 'ef (seperti pada "Foto")', exampleWord: 'die Familie', exampleMeaningId: 'keluarga' },
  { letter: 'G g', name: 'Ge', phoneticId: 'ge (selalu g keras seperti "Gajah", bukan j)', exampleWord: 'der Garten', exampleMeaningId: 'taman' },
  { letter: 'H h', name: 'Hah', phoneticId: 'h (di awal kata dihembuskan; di tengah setelah vokal hanya memperpanjang vokal)', exampleWord: 'das Haus', exampleMeaningId: 'rumah' },
  { letter: 'I i', name: 'Ihh', phoneticId: 'i (seperti pada "Ibu")', exampleWord: 'die Insel', exampleMeaningId: 'pulau' },
  { letter: 'J j', name: 'Yot', phoneticId: 'DIBACA "Y" (seperti pada "Yoyo")', exampleWord: 'Ja', exampleMeaningId: 'Ya', tip: 'Perhatian: Huruf J dalam bahasa Jerman selalu dibaca seperti huruf Y!' },
  { letter: 'K k', name: 'Kah', phoneticId: 'k (dengan sedikit hembusan nafas)', exampleWord: 'der Kaffee', exampleMeaningId: 'kopi' },
  { letter: 'L l', name: 'Ell', phoneticId: 'el (lidah menyentuh langit-langit)', exampleWord: 'die Lampe', exampleMeaningId: 'lampu' },
  { letter: 'M m', name: 'Emm', phoneticId: 'em (bibir tertutup rapat)', exampleWord: 'die Musik', exampleMeaningId: 'musik' },
  { letter: 'N n', name: 'Enn', phoneticId: 'en (seperti pada "Nasi")', exampleWord: 'die Nacht', exampleMeaningId: 'malam' },
  { letter: 'O o', name: 'Oh', phoneticId: 'o (seperti pada "Obat")', exampleWord: 'die Orange', exampleMeaningId: 'jeruk' },
  { letter: 'P p', name: 'Peh', phoneticId: 'p (dengan letupan nafas lembut)', exampleWord: 'das Papier', exampleMeaningId: 'kertas' },
  { letter: 'Q q', name: 'Kuh', phoneticId: 'selalu bergandengan dengan u (qu) dibaca "kv"', exampleWord: 'die Quelle', exampleMeaningId: 'sumber / mata air' },
  { letter: 'R r', name: 'Err', phoneticId: 'r (sering digetarkan di pangkal tenggorokan)', exampleWord: 'das Radio', exampleMeaningId: 'radio' },
  { letter: 'S s', name: 'Ess', phoneticId: 'di awal kata sebelum vokal dibaca desis "Z"; di akhir kata dibaca "S" tajam', exampleWord: 'die Sonne', exampleMeaningId: 'matahari' },
  { letter: 'T t', name: 'Teh', phoneticId: 't (seperti pada "Tari")', exampleWord: 'der Tee', exampleMeaningId: 'teh' },
  { letter: 'U u', name: 'Uh', phoneticId: 'u (seperti pada "Udang")', exampleWord: 'die Uhr', exampleMeaningId: 'jam / arloji' },
  { letter: 'V v', name: 'Fau', phoneticId: 'DIBACA "F" (pada kata asli Jerman dibaca F!)', exampleWord: 'der Vogel', exampleMeaningId: 'burung', tip: 'Perhatian: Huruf V umumnya dibaca seperti huruf F (Vogel dibaca Fogel)!' },
  { letter: 'W w', name: 'Weh', phoneticId: 'DIBACA "V/W" (bibir atas menyentuh gigi bawah, mirip v)', exampleWord: 'das Wasser', exampleMeaningId: 'air', tip: 'Huruf W dibaca seperti V lembut bahasa Inggris.' },
  { letter: 'X x', name: 'Iks', phoneticId: 'ks (seperti pada kata "Taksi")', exampleWord: 'das Xylofon', exampleMeaningId: 'xilofon' },
  { letter: 'Y y', name: 'Ypsilon', phoneticId: 'biasanya dibaca mirip ü atau i', exampleWord: 'das Yoga', exampleMeaningId: 'yoga' },
  { letter: 'Z z', name: 'Tset', phoneticId: 'DIBACA "TS" (seperti pada kata "Tsunami")', exampleWord: 'der Zug', exampleMeaningId: 'kereta api', tip: 'Huruf Z tidak pernah dibaca Z lebah, melainkan selalu TS (Zug dibaca Tsug)!' },
];

export const UMLAUTS_AND_SPECIALS: SpecialSound[] = [
  {
    symbol: 'Ä ä',
    name: 'A-Umlaut',
    pronunciationId: 'Mirip huruf "E" pada kata "bebek" atau "ember"',
    explanationId: 'Bentuk mulut terbuka seperti ingin mengucapkan A, tetapi posisikan lidah ke depan mengucapkan E.',
    examples: [
      { word: 'Äpfel', phonetic: 'ep-fel', meaningId: 'apel-apel (jamak)' },
      { word: 'das Mädchen', phonetic: 'met-khen', meaningId: 'anak perempuan' },
      { word: 'spät', phonetic: 'sy-pet', meaningId: 'terlambat' },
    ],
  },
  {
    symbol: 'Ö ö',
    name: 'O-Umlaut',
    pronunciationId: 'Bibir bundar membulat (O), tapi lidah mengucapkan (E)',
    explanationId: 'Bulatkan bibir Anda seperti ingin mengucapkan "O", tahan bentuk bibir itu, lalu ucapkan bunyi "E". Mirip bunyi "eu" pada bahasa Sunda atau "peuyeum".',
    examples: [
      { word: 'schön', phonetic: 'syeon', meaningId: 'indah / cantik' },
      { word: 'öffnen', phonetic: 'oef-nen', meaningId: 'membuka' },
      { word: 'hören', phonetic: 'hoe-ren', meaningId: 'mendengarkan' },
    ],
  },
  {
    symbol: 'Ü ü',
    name: 'U-Umlaut',
    pronunciationId: 'Bibir moncong bersiul (U), tapi lidah mengucapkan (I)',
    explanationId: 'Bentuk bibir Anda moncong ke depan seperti bersiul (posisi U), tahan posisi itu, lalu bunyikan suara "I". Jangan gerakkan bibir saat membunyikannya!',
    examples: [
      { word: 'über', phonetic: 'ue-ber', meaningId: 'tentang / di atas' },
      { word: 'die Tür', phonetic: 'tuer', meaningId: 'pintu' },
      { word: 'müde', phonetic: 'mue-de', meaningId: 'lelah / mengantuk' },
    ],
  },
  {
    symbol: 'ß',
    name: 'Eszett / Scharfes S',
    pronunciationId: 'Bunyi "S" ganda yang sangat tajam tanpa getaran',
    explanationId: 'Huruf ini hanya ada dalam bahasa Jerman (tidak ada di Swiss yang memakai ss). Huruf ini tidak pernah muncul di awal kata. Berfungsi menandai vokal sebelumnya dibaca panjang atau diftong.',
    examples: [
      { word: 'die Straße', phonetic: 'sy-tra-se', meaningId: 'jalan raya' },
      { word: 'groß', phonetic: 'gros', meaningId: 'besar' },
      { word: 'heiß', phonetic: 'hais', meaningId: 'panas' },
    ],
  },
];

export const ESSENTIAL_DIPHTHONGS: SpecialSound[] = [
  {
    symbol: 'ei',
    name: 'Kombinasi EI',
    pronunciationId: 'DIBACA "AI" (seperti pada "pantai")',
    explanationId: 'Kombinasi paling sering mengecoh pemula. Ingat rumus: huruf E ketemu I dibaca AI!',
    examples: [
      { word: 'nein', phonetic: 'nain', meaningId: 'tidak' },
      { word: 'mein', phonetic: 'main', meaningId: 'milik saya' },
      { word: 'zwei', phonetic: 'tsvai', meaningId: 'dua' },
    ],
  },
  {
    symbol: 'ie',
    name: 'Kombinasi IE',
    pronunciationId: 'DIBACA "I" PANJANG (seperti pada "tii")',
    explanationId: 'Kebalikan dari ei! Huruf I ketemu E dibaca huruf I panjang yang santai.',
    examples: [
      { word: 'sie / Sie', phonetic: 'zii', meaningId: 'dia / Anda' },
      { word: 'wie', phonetic: 'vii', meaningId: 'bagaimana / seperti' },
      { word: 'hier', phonetic: 'hiir', meaningId: 'di sini' },
    ],
  },
  {
    symbol: 'eu / äu',
    name: 'Kombinasi EU & ÄU',
    pronunciationId: 'DIBACA "OI" (seperti pada "amboi")',
    explanationId: 'Kedua kombinasi huruf ini menghasilkan bunyi "oi" yang identik.',
    examples: [
      { word: 'Euro', phonetic: 'oi-ro', meaningId: 'mata uang Euro' },
      { word: 'heute', phonetic: 'hoi-te', meaningId: 'hari ini' },
      { word: 'Häuser', phonetic: 'hoi-zer', meaningId: 'rumah-rumah' },
    ],
  },
  {
    symbol: 'ch',
    name: 'Bunyi CH (Desis Lembut vs Tenggorokan)',
    pronunciationId: 'Desis halus (ich) atau desis tenggorokan dalam (ach)',
    explanationId: 'Setelah e/i/ä/ö/ü desis lidah lembut seperti angin (ich). Setelah a/o/u desis dalam tenggorokan (Nacht, Buch).',
    examples: [
      { word: 'ich', phonetic: 'ikh (lembut)', meaningId: 'saya' },
      { word: 'nicht', phonetic: 'nikht (lembut)', meaningId: 'bukan / tidak' },
      { word: 'das Buch', phonetic: 'bukh (dalam)', meaningId: 'buku' },
    ],
  },
  {
    symbol: 'sp / st',
    name: 'SP & ST di Awal Kata',
    pronunciationId: 'DIBACA "SY-P" dan "SY-T"',
    explanationId: 'Jika huruf S bertemu P atau T di awal kata, bunyinya berubah menjadi "sy" tebal bahasa Indonesia.',
    examples: [
      { word: 'der Sport', phonetic: 'sy-port', meaningId: 'olahraga' },
      { word: 'die Stadt', phonetic: 'sy-tat', meaningId: 'kota' },
      { word: 'verstehen', phonetic: 'fer-sy-te-hen', meaningId: 'memahami' },
    ],
  },
];

export const SURVIVAL_PHRASES: SurvivalPhrase[] = [
  // 1. Salam & Sapaan
  {
    id: 'sp-1',
    category: 'salam',
    categoryLabelId: 'Salam & Sapaan',
    german: 'Hallo!',
    indonesian: 'Halo!',
    phoneticId: 'Ha-lo!',
    contextId: 'Sapaan santai yang bisa digunakan kapan saja kepada siapa saja.',
  },
  {
    id: 'sp-2',
    category: 'salam',
    categoryLabelId: 'Salam & Sapaan',
    german: 'Guten Morgen!',
    indonesian: 'Selamat pagi!',
    phoneticId: 'Gu-ten Mor-gen!',
    contextId: 'Digunakan saat pagi hari hingga sekitar pukul 10.00-11.00.',
  },
  {
    id: 'sp-3',
    category: 'salam',
    categoryLabelId: 'Salam & Sapaan',
    german: 'Guten Tag!',
    indonesian: 'Selamat siang / sore!',
    phoneticId: 'Gu-ten Tak!',
    contextId: 'Salam standar paling aman sepanjang siang hingga sore menjelang malam.',
  },
  {
    id: 'sp-4',
    category: 'salam',
    categoryLabelId: 'Salam & Sapaan',
    german: 'Guten Abend!',
    indonesian: 'Selamat malam!',
    phoneticId: 'Gu-ten A-bent!',
    contextId: 'Salam saat bertemu seseorang di waktu senja/malam (mulai pukul 18.00).',
  },
  {
    id: 'sp-5',
    category: 'salam',
    categoryLabelId: 'Salam & Sapaan',
    german: 'Gute Nacht!',
    indonesian: 'Selamat tidur!',
    phoneticId: 'Gu-te Nakht!',
    contextId: 'PERHATIAN: Hanya diucapkan saat hendak pamit tidur, bukan untuk salam temu di malam hari.',
  },
  {
    id: 'sp-6',
    category: 'salam',
    categoryLabelId: 'Salam & Sapaan',
    german: 'Tschüss!',
    indonesian: 'Dadah / Sampai jumpa!',
    phoneticId: 'Cyuus!',
    contextId: 'Salam perpisahan paling populer dan akrab dalam percakapan sehari-hari.',
  },
  {
    id: 'sp-7',
    category: 'salam',
    categoryLabelId: 'Salam & Sapaan',
    german: 'Auf Wiedersehen!',
    indonesian: 'Sampai berjumpa lagi!',
    phoneticId: 'Auf Vi-der-ze-hen!',
    contextId: 'Salam pamit yang lebih sopan dan resmi (misal di toko, kantor, atau kepada orang yang dihormati).',
  },

  // 2. Perkenalan Diri
  {
    id: 'sp-8',
    category: 'perkenalan',
    categoryLabelId: 'Perkenalan Diri',
    german: 'Ich heiße ...',
    indonesian: 'Nama saya adalah ...',
    phoneticId: 'Ikh hai-se ...',
    contextId: 'Pola standar untuk menyebutkan nama diri Anda.',
  },
  {
    id: 'sp-9',
    category: 'perkenalan',
    categoryLabelId: 'Perkenalan Diri',
    german: 'Wie heißt du?',
    indonesian: 'Siapa namamu?',
    phoneticId: 'Vii haist du?',
    contextId: 'Pertanyaan santai untuk menanyakan nama teman sebaya atau dalam situasi akrab.',
  },
  {
    id: 'sp-10',
    category: 'perkenalan',
    categoryLabelId: 'Perkenalan Diri',
    german: 'Ich komme aus Indonesien.',
    indonesian: 'Saya berasal dari Indonesia.',
    phoneticId: 'Ikh ko-me aus In-do-ne-zi-en.',
    contextId: 'Kalimat ajaib untuk memberitahu negara asal Anda kepada orang Jerman.',
  },
  {
    id: 'sp-11',
    category: 'perkenalan',
    categoryLabelId: 'Perkenalan Diri',
    german: 'Freut mich!',
    indonesian: 'Senang berkenalan denganmu!',
    phoneticId: 'Froit mikh!',
    contextId: 'Diucapkan sambil tersenyum atau berjabat tangan saat baru pertama kali diperkenalkan.',
  },

  // 3. Kesopanan Sehari-hari
  {
    id: 'sp-12',
    category: 'kesopanan',
    categoryLabelId: 'Kesopanan Sehari-hari',
    german: 'Danke schön! / Vielen Dank!',
    indonesian: 'Terima kasih banyak!',
    phoneticId: 'Dang-ke syoen! / Fii-len Dangk!',
    contextId: 'Ungkapan rasa terima kasih yang hangat dan tulus.',
  },
  {
    id: 'sp-13',
    category: 'kesopanan',
    categoryLabelId: 'Kesopanan Sehari-hari',
    german: 'Bitte schön! / Gern geschehen!',
    indonesian: 'Sama-sama! / Dengan senang hati!',
    phoneticId: 'Bi-te syoen! / Gern ge-sye-hen!',
    contextId: 'Jawaban sopan saat orang lain mengucapkan terima kasih kepada Anda.',
  },
  {
    id: 'sp-14',
    category: 'kesopanan',
    categoryLabelId: 'Kesopanan Sehari-hari',
    german: 'Entschuldigung!',
    indonesian: 'Permisi / Maaf!',
    phoneticId: 'Ent-syul-di-gung!',
    contextId: 'Bisa berarti "maaf" saat berbuat salah kecil, atau "permisi" saat ingin lewat atau memanggil pelayan.',
  },
  {
    id: 'sp-15',
    category: 'kesopanan',
    categoryLabelId: 'Kesopanan Sehari-hari',
    german: 'Kein Problem!',
    indonesian: 'Tidak masalah / Tidak apa-apa!',
    phoneticId: 'Kain Prob-leem!',
    contextId: 'Menenangkan orang lain jika mereka meminta maaf atau berterima kasih.',
  },

  // 4. Ungkapan Darurat & Penyelamat
  {
    id: 'sp-16',
    category: 'darurat',
    categoryLabelId: 'Penyelamat Darurat',
    german: 'Ich verstehe nicht.',
    indonesian: 'Saya tidak mengerti / tidak paham.',
    phoneticId: 'Ikh fer-sye-he nikht.',
    contextId: 'Gunakan ini tanpa ragu saat lawan bicara berbicara terlalu cepat atau Anda bingung.',
  },
  {
    id: 'sp-17',
    category: 'darurat',
    categoryLabelId: 'Penyelamat Darurat',
    german: 'Wie bitte?',
    indonesian: 'Bagaimana tadi? / Tolong ulangi?',
    phoneticId: 'Vii bi-te?',
    contextId: 'Cara paling sopan di Jerman untuk meminta seseorang mengulangi apa yang baru saja mereka katakan.',
  },
  {
    id: 'sp-18',
    category: 'darurat',
    categoryLabelId: 'Penyelamat Darurat',
    german: 'Sprechen Sie Englisch?',
    indonesian: 'Apakah Anda berbicara bahasa Inggris?',
    phoneticId: 'Sy-pre-khen Zii Eng-lisy?',
    contextId: 'Gunakan saat Anda benar-benar butuh bantuan cepat dan belum menguasai kata-kata Jermannya.',
  },
  {
    id: 'sp-19',
    category: 'darurat',
    categoryLabelId: 'Penyelamat Darurat',
    german: 'Langsamer, bitte!',
    indonesian: 'Tolong bicara lebih lambat!',
    phoneticId: 'Lang-za-mer, bi-te!',
    contextId: 'Sangat efektif membuat penutur asli Jerman menyesuaikan tempo bicara mereka agar Anda paham.',
  },
  {
    id: 'sp-20',
    category: 'darurat',
    categoryLabelId: 'Penyelamat Darurat',
    german: 'Wo ist die Toilette, bitte?',
    indonesian: 'Di mana toiletnya, tolong?',
    phoneticId: 'Vo ist di Toa-le-te, bi-te?',
    contextId: 'Kalimat emas paling krusial saat Anda berada di restoran, stasiun, atau tempat umum di Jerman.',
  },
];

export const CORE_SECRETS: CoreSecret[] = [
  {
    number: 1,
    titleId: 'Semua Kata Benda Ditulis Huruf Kapital!',
    titleDe: 'Alle Nomen schreibt man groß!',
    summaryId: 'Ini adalah fitur paling unik bahasa Jerman: kata benda selalu diawali huruf besar di mana pun letaknya dalam kalimat.',
    detailsId: [
      'Dalam bahasa Indonesia atau Inggris, huruf kapital hanya untuk awal kalimat atau nama orang/tempat.',
      'Di bahasa Jerman, SEMUA kata benda (meja, buku, kopi, cinta, mobil) WAJIB diawali huruf kapital.',
      'Keuntungan besar: Saat Anda membaca teks bahasa Jerman, Anda bisa langsung mengetahui dengan cepat mana kata yang merupakan benda!',
    ],
    examples: [
      { german: 'Ich trinke Wasser.', indonesian: 'Saya minum air. (Wasser = Nomen/benda -> huruf besar W)' },
      { german: 'Der Tisch ist groß.', indonesian: 'Meja itu besar. (Tisch = Nomen/benda -> huruf besar T)' },
    ],
  },
  {
    number: 2,
    titleId: 'Trio Gender Magis: der, die, das',
    titleDe: 'Die drei Artikel: Maskulin, Feminin, Neutral',
    summaryId: 'Kata benda memiliki gender gramatikal, bukan jenis kelamin fisik.',
    detailsId: [
      'der = Maskulin (Laki-laki) -> contoh: der Tisch (meja), der Mond (bulan).',
      'die = Feminin (Perempuan) -> contoh: die Lampe (lampu), die Sonne (matahari).',
      'das = Netral -> contoh: das Buch (buku), das Auto (mobil).',
      'TIPS EMAS PEMULA: Jangan pernah menghafal kata secara terpisah seperti "buku = Buch". Selalu hafalkan satu paket: "buku = das Buch". Ini akan menyelamatkan masa depan belajar bahasa Jerman Anda!',
    ],
    examples: [
      { german: 'der Kaffee', indonesian: 'kopi (Maskulin)', note: 'der' },
      { german: 'die Milch', indonesian: 'susu (Feminin)', note: 'die' },
      { german: 'das Brot', indonesian: 'roti (Netral)', note: 'das' },
    ],
  },
  {
    number: 3,
    titleId: 'Aturan Emas: Kata Kerja Selalu di Posisi Nomor 2!',
    titleDe: 'Verb auf Position 2 im Hauptsatz',
    summaryId: 'Dalam kalimat berita bahasa Jerman, kata kerja yang terkonjugasi SELALU menempati posisi nomor 2.',
    detailsId: [
      'Posisi 1 bisa diisi oleh Subjek (Saya, Kamu), tapi bisa juga diisi oleh Keterangan Waktu (Hari ini, Besok).',
      'Apa pun yang ada di posisi 1, kata kerjanya HARUS tetap berada di urutan nomor 2.',
      'Jika keterangan waktu maju ke posisi 1, subjek otomatis bergeser ke posisi 3 setelah kata kerja!',
    ],
    examples: [
      { german: 'Ich [1] lerne [2] heute Deutsch.', indonesian: 'Saya belajar bahasa Jerman hari ini.' },
      { german: 'Heute [1] lerne [2] ich Deutsch.', indonesian: 'Hari ini saya belajar bahasa Jerman. (Kata kerja "lerne" tetap nomor 2!)' },
    ],
  },
];

export const BEGINNER_QUIZ_QUESTIONS: BeginnerQuizQuestion[] = [
  {
    id: 'bq-1',
    question: 'Huruf "J" dalam bahasa Jerman dibaca mirip dengan bunyi huruf apa dalam bahasa Indonesia?',
    options: ['Bunyi "Y" (seperti pada kata "Yoyo")', 'Bunyi "J" (seperti pada kata "Jeruk")', 'Bunyi "H" (seperti pada kata "Hari")', 'Bunyi "S" (seperti pada kata "Satu")'],
    correctIndex: 0,
    explanationId: 'Huruf J di bahasa Jerman bernama "Yot" dan selalu dibaca seperti huruf Y. Contoh: kata "Ja" dibaca "Ya".',
  },
  {
    id: 'bq-2',
    question: 'Bagaimana cara membaca kata "nein" (artinya: tidak) yang benar?',
    options: ['Dibaca "Nain"', 'Dibaca "Ne-in"', 'Dibaca "Nen"', 'Dibaca "Non"'],
    correctIndex: 0,
    explanationId: 'Kombinasi huruf "ei" dalam bahasa Jerman selalu dibaca "ai". Jadi "nein" dibaca "nain".',
  },
  {
    id: 'bq-3',
    question: 'Jika lawan bicara berbicara dan Anda tidak jelas mendengarnya, kalimat sopan apa yang tepat untuk meminta diulangi?',
    options: ['Wie bitte?', 'Tschüss!', 'Gute Nacht!', 'Danke schön!'],
    correctIndex: 0,
    explanationId: '"Wie bitte?" adalah ungkapan sopan standar di Jerman yang berarti "Bisa tolong diulang kembali?".',
  },
  {
    id: 'bq-4',
    question: 'Manakah aturan penulisan kata benda (Nomen) yang benar dalam kalimat bahasa Jerman?',
    options: [
      'Semua kata benda selalu diawali huruf kapital, di mana pun posisinya.',
      'Kata benda hanya berhuruf kapital jika terletak di awal kalimat saja.',
      'Huruf kapital hanya untuk nama orang dan nama kota saja.',
      'Penulisan huruf kapital bebas terserah si penulis.',
    ],
    correctIndex: 0,
    explanationId: 'Dalam bahasa Jerman, seluruh kata benda (Nomen) WAJIB diawali huruf kapital, bahkan di tengah kalimat sekalipun.',
  },
  {
    id: 'bq-5',
    question: 'Jika seorang warga Jerman berkata kepada Anda "Danke schön!", apa respon balasan yang paling tepat dan alami?',
    options: ['Bitte schön!', 'Auf Wiedersehen!', 'Guten Morgen!', 'Entschuldigung!'],
    correctIndex: 0,
    explanationId: '"Bitte schön!" (atau "Gern geschehen!") berarti "Sama-sama / Dengan senang hati", pasangan jawaban untuk ucapan terima kasih.',
  },
];
