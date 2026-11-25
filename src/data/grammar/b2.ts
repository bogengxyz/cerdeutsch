import { GrammarTopic } from '../../types/learning';

export const B2_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'gram-b2-1',
    level: 'B2',
    title: 'Zweiteilige Konnektoren',
    category: 'Textkohäsion',
    summary: 'Argumente mit „zwar ... aber“, „sowohl ... als auch“, „weder ... noch“ und „je ... desto“ nuanciert verknüpfen.',
    explanationDe:
      'Zweiteilige (paarige) Konnektoren strukturieren Pro- und Kontra-Beziehungen sowie Vergleiche auf B2-Niveau besonders präzise.',
    explanationId:
      'Konektor berpasangan menghubungkan dua gagasan secara seimbang atau kontras (misalnya zwar...aber = memang...tetapi; sowohl...als auch = baik...maupun; weder...noch = tidak...maupun; je...desto = semakin...semakin).',
    sentenceStructureDe: 'zwar ... aber  |  sowohl ... als auch  |  weder ... noch  |  je + Komparativ ... desto + Komparativ',
    commonMistakesId:
      'Tertukar kata kerja posisi 2 pada klausa "desto" — setelah "desto/umso + Komparativ" kata kerja wajib langsung muncul (desto besser wird die Qualität).',
    rulePoints: [
      '„zwar ..., aber ...“: Einschränkung einer Aussage.',
      '„sowohl ... als auch“: positive Aufzählung zweier Elemente.',
      '„weder ... noch“: doppelte Verneinung ohne „nicht/kein“.',
      '„je + Komparativ ... (Verb Ende), desto + Komparativ + Verb ...“: proportionale Steigerung.',
    ],
    examples: [
      {
        german: 'Das System ist zwar schnell, aber ziemlich teuer.',
        translationId: 'Sistem itu memang cepat, tetapi cukup mahal.',
        note: 'zwar ... aber',
      },
      {
        german: 'Je früher wir beginnen, desto ruhiger können wir arbeiten.',
        translationId: 'Semakin awal kita mulai, semakin tenang kita dapat bekerja.',
        note: 'je ... desto mit Komparativ',
      },
    ],
    relatedExerciseId: 'b2-grammatik-1',
  },
  {
    id: 'gram-b2-2',
    level: 'B2',
    title: 'Konjunktiv I (Indirekte Rede)',
    category: 'Gehobener Stil',
    summary: 'Aussagen Dritter in Berichten, Nachrichten und Zusammenfassungen objektiv wiedergeben.',
    explanationDe:
      'In Nachrichten, Sachtexten und Prüfungszusammenfassungen markiert der Konjunktiv I die indirekte Rede, um Neutralität zu wahren. Die 3. Person Singular endet immer auf „-e“ (habe, komme, arbeite); „sein“ bildet „sei“.',
    explanationId:
      'Konjunktiv I digunakan dalam berita, laporan, atau ringkasan untuk menyampaikan ucapan pihak ketiga secara objektif. Bentuk orang ke-3 tunggal berakhiran "-e" (habe, komme), sedangkan "sein" menjadi "sei". Jika sama dengan Indikativ, digunakan Konjunktiv II (hätten/kämen).',
    sentenceStructureDe: 'Redeeinleitung (Die Sprecherin betonte,) + Subjekt + Konjunktiv I (sei / habe / -e)',
    conjugationTable: {
      headers: ['Verb', '3. Sg. (Konjunktiv I)', '3. Pl. Ersatz (Konj. II)', 'Beispiel'],
      rows: [
        ['sein', 'sei', 'seien', 'Er sagte, er sei krank.'],
        ['haben', 'habe', 'hätten', 'Sie erklärte, sie habe keine Zeit.'],
        ['können', 'könne', 'könnten', 'Man betonte, das Projekt könne starten.'],
        ['kommen', 'komme', 'kämen', 'Es hieß, die Gäste kämen später.'],
      ],
    },
    commonMistakesId:
      'Menggunakan Konjunktiv I jamak yang persis sama dengan bentuk Indikativ (sebaiknya ganti dengan Konjunktiv II: "sie hätten" alih-alih "sie haben").',
    rulePoints: [
      '3. Pers. Sg. Konjunktiv I: Verbstamm + -e (sei, habe, wisse, wolle).',
      'Fällt der Konjunktiv I mit dem Indikativ zusammen, weicht man auf den Konjunktiv II aus.',
      'Zeitform Vergangenheit im Konjunktiv I: sei / habe + Partizip II (Er sagte, er habe es gelesen).',
    ],
    examples: [
      {
        german: 'Die Sprecherin betonte, der Vertrag sei bereits unterschrieben.',
        translationId: 'Juru bicara itu menekankan bahwa kontrak tersebut sudah ditandatangani.',
        note: 'Konjunktiv I (sein → sei)',
      },
      {
        german: 'Der Minister erklärte, man habe die Kritik ernst genommen.',
        translationId: 'Menteri itu menyatakan bahwa kritik tersebut telah ditanggapi serius.',
        note: 'Vergangenheit im Konjunktiv I',
      },
    ],
    relatedExerciseId: 'b2-grammatik-2',
  },
  {
    id: 'gram-b2-3',
    level: 'B2',
    title: 'Partizipialattribute (Partizip I & II vor Nomen)',
    category: 'Nominalstil',
    summary: 'Relativsätze durch Partizip I (-end) und Partizip II als kompakte Attribute vor dem Nomen ersetzen.',
    explanationDe:
      'Partizip I (Infinitiv + -d) drückt eine aktive, gleichzeitige Handlung aus; Partizip II drückt meist einen passiven, abgeschlossenen Zustand aus. Beide werden vor dem Nomen wie Adjektive dekliniert.',
    explanationId:
      'Partizip I (Infinitiv + -d) sebagai atribut bermakna aktif dan sedang berlangsung (die steigenden Preise = harga yang sedang naik). Partizip II bermakna pasif dan telah selesai (das gelöste Problem = masalah yang sudah terpecahkan).',
    sentenceStructureDe: 'Artikel + (Erweiterung) + Partizip I / II + Adjektivendung + Nomen',
    commonMistakesId:
      'Tertukar makna aktif vs. pasif antara Partizip I dan II (misalnya menulis "das gelesende Buch" — buku tidak membaca, melainkan dibaca, jadi harus "das gelesene Buch").',
    rulePoints: [
      'Partizip I = aktiv & gleichzeitig (der lachende Gast).',
      'Partizip II = passiv & abgeschlossen (die geschlossene Tür).',
      'Die Adjektivendung richtet sich nach Artikel, Genus und Kasus.',
    ],
    examples: [
      {
        german: 'Die steigenden Energiepreise belasten viele Betriebe.',
        translationId: 'Harga energi yang terus naik membebani banyak perusahaan.',
        note: 'Partizip I Attribut',
      },
      {
        german: 'Das gestern gelöste Problem tritt nicht mehr auf.',
        translationId: 'Masalah yang diselesaikan kemarin tidak muncul lagi.',
        note: 'Erweitertes Partizip II Attribut',
      },
    ],
    relatedExerciseId: 'b2-grammatik-3',
  },
  {
    id: 'gram-b2-4',
    level: 'B2',
    title: 'Passiv mit Modalverben & Passiversatzformen',
    category: 'Genus Verbi',
    summary: 'Notwendigkeiten, Möglichkeiten und Verbote passivisch ausdrücken.',
    explanationDe:
      'Kombiniert man das Passiv mit einem Modalverb, steht das konjugierte Modalverb auf Position 2 und am Satzende steht „Partizip II + werden“. Alternativen sind „sich lassen + Infinitiv“ oder Adjektive auf „-bar“.',
    explanationId:
      'Kalimat pasif dengan Modalverb menempatkan Modalverb terkonjugasi di posisi 2, lalu di akhir kalimat terdapat "Partizip II + werden" (tidak berubah menjadi worden!). Bentuk pengganti pasif (Passiversatz) antara lain "sich lassen + Infinitiv" atau akhiran "-bar" (machbar = dapat dilakukan).',
    sentenceStructureDe: 'Subjekt + Modalverb (Pos. 2) + ... + Partizip II + werden (Ende)',
    commonMistakesId:
      'Mengubah "werden" di akhir kalimat atau lupa memindahkan "werden" setelah Partizip II.',
    rulePoints: [
      'Passiv mit Modalverb Präsens: muss + ... + eingereicht werden.',
      'Passiv mit Modalverb Präteritum: musste + ... + eingereicht werden.',
      'Passiversatz (können + Passiv): lässt sich lösen / ist lösbar / ist zu lösen.',
    ],
    examples: [
      {
        german: 'Der Antrag muss bis Freitag vollständig eingereicht werden.',
        translationId: 'Permohonan tersebut harus diserahkan lengkap paling lambat hari Jumat.',
        note: 'Modalverb + Partizip II + werden',
      },
      {
        german: 'Diese Aufgabe lässt sich mit guter Planung leicht lösen.',
        translationId: 'Tugas ini dapat diselesaikan dengan mudah melalui perencanaan yang baik.',
        note: 'Passiversatz mit „sich lassen“',
      },
    ],
    relatedExerciseId: 'b2-grammatik-2',
  },
  {
    id: 'gram-b2-5',
    level: 'B2',
    title: 'Nominalisierung',
    category: 'Nominalstil',
    summary: 'Verben und Adjektive in Nomen umwandeln, um Sachtexte kompakt zu formulieren.',
    explanationDe:
      'Im wissenschaftlichen und beruflichen Deutsch werden Nebensätze oft durch Präposition + Nomen ersetzt (Nominalstil). Verben werden z. B. mit -ung oder als substantivierter Infinitiv (das Lesen) nominalisiert.',
    explanationId:
      'Nominalisasi mengubah kata kerja atau kata sifat menjadi kata benda agar gaya tulisan lebih ringkas dan formal (sering dipakai di laporan dan teks B2). Misalnya: "bevor der Zug abfährt" → "vor der Abfahrt des Zuges".',
    sentenceStructureDe: 'Präposition (bei, vor, nach, wegen, trotz, durch) + Nomen (+ Genitivattribut)',
    commonMistakesId:
      'Lupa menulis huruf kapital pada kata kerja yang dibendakan (das Lernen, beim Lesen) atau memakai preposisi anak kalimat (weil/obwohl) dengan kata benda alih-alih preposisi frasa benda (wegen/trotz).',
    rulePoints: [
      'weil → wegen (+ Genitiv) / obwohl → trotz (+ Genitiv).',
      'wenn/als → bei (+ Dativ) / nachdem → nach (+ Dativ).',
      'Substantivierte Infinitive sind immer neutrum (das Schreiben, beim Sprechen).',
    ],
    examples: [
      {
        german: 'Beim Lesen komplexer Fachtexte hilft ein klares Ziel.',
        translationId: 'Saat membaca teks ilmiah yang kompleks, tujuan yang jelas sangat membantu.',
        note: 'bei + dem = beim + nominalisierter Infinitiv',
      },
      {
        german: 'Wegen der starken Nachfrage wurde ein Zusatzkurs eingerichtet.',
        translationId: 'Karena tingginya permintaan, kursus tambahan dibuka.',
        note: 'Nominalisierung statt „weil die Nachfrage stark war“',
      },
    ],
    relatedExerciseId: 'b2-grammatik-3',
  },
  {
    id: 'gram-b2-6',
    level: 'B2',
    title: 'Präpositionen mit Genitiv',
    category: 'Kasus & Präpositionen',
    summary: 'Gehobene Präpositionen wie trotz, wegen, während, infolge, aufgrund und angesichts sicher anwenden.',
    explanationDe:
      'In der gehobenen Schriftsprache verlangen Präpositionen wie trotz, wegen, während, infolge, aufgrund, statt und angesichts den Genitiv. Maskuline und neutrale Nomen erhalten meist ein „-s“ oder „-es“.',
    explanationId:
      'Preposisi formal seperti trotz (meskipun), wegen (karena), während (selama), infolge (akibat), aufgrund (berdasarkan), dan angesichts (mengingat) menuntut kasus Genitiv. Artikel maskulin/netral menjadi "des/eines" + akhiran "-s/-es" pada kata benda.',
    sentenceStructureDe: 'trotz / wegen / infolge / aufgrund + des/der/eines/einer + Nomen (+ -s/-es)',
    conjugationTable: {
      headers: ['Genus', 'Genitiv-Artikel', 'Nomen-Endung', 'Beispiel mit „trotz“'],
      rows: [
        ['Maskulin', 'des / eines', '-s / -es', 'trotz des starken Regens'],
        ['Feminin', 'der / einer', 'keine', 'trotz der hohen Kosten (Pl.) / trotz der Kälte'],
        ['Neutrum', 'des / eines', '-s / -es', 'trotz des schlechten Wetters'],
        ['Plural', 'der / —', 'keine', 'trotz der Verzögerungen'],
      ],
    },
    commonMistakesId:
      'Lupa menambahkan "-s/-es" pada akhir kata benda maskulin/netral dalam Genitiv (salah: "wegen des Problem", benar: "wegen des Problems").',
    rulePoints: [
      'Maskulin und Neutrum im Genitiv: des/eines + Nomen-(e)s.',
      'Feminin und Plural im Genitiv: der/einer/meiner (ohne Nomen-Endung).',
      'Ohne Artikel vor Pluralnomen weicht man bei „wegen/trotz“ teils auf den Dativ aus (trotz Regenfällen).',
    ],
    examples: [
      {
        german: 'Infolge von Transportengpässen diversifizieren Betriebe ihre Zulieferer.',
        translationId: 'Akibat kemacetan transportasi, perusahaan mendiversifikasi pemasok mereka.',
        note: 'infolge + Genitiv (oder „von“ ohne Artikel)',
      },
      {
        german: 'Angesichts des digitalen Wandels bleibt Weiterbildung zentral.',
        translationId: 'Mengingat perubahan digital, pelatihan lanjutan tetap menjadi hal utama.',
        note: 'angesichts + Genitiv maskulin',
      },
    ],
    relatedExerciseId: 'b2-grammatik-1',
  },
  {
    id: 'gram-b2-7',
    level: 'B2',
    title: 'Komplexe Satzgefüge',
    category: 'Satzbau',
    summary: 'Hauptsätze mit mehrstufigen Nebensätzen, Präpositionaladverbien (darauf, dass) und Konnektoren verbinden.',
    explanationDe:
      'Auf B2-Niveau werden Informationen häufig in verschachtelten Satzgefügen kombiniert. Korrelate wie „darauf“, „daran“, „deshalb“ oder „es“ verweisen im Hauptsatz auf einen nachfolgenden Nebensatz.',
    explanationId:
      'Kalimat majemuk kompleks menggabungkan kalimat utama dengan beberapa anak kalimat atau memakai kata rujukan (Korrelat) seperti "darauf, dass...", "damit, dass...", atau "es" untuk mengantar anak kalimat.',
    sentenceStructureDe: 'Hauptsatz (+ Korrelat da(r)+Präp.), + Subjunktion (dass/ob/weil) + ... + Verb (Ende)',
    commonMistakesId:
      'Menghilangkan koma antar klausa atau meletakkan kata kerja anak kalimat tidak di ujung masing-masing anak kalimat.',
    rulePoints: [
      'Verben mit Präposition brauchen vor einem „dass“-Satz meist ein Korrelat (Ich freue mich darauf, dass...).',
      'Jeder eingeleitete Nebensatz bildet eine eigene Klammer mit Verb am Ende.',
      'Zu viele verschachtelte Ebenen vermeiden; logische Reihenfolge beibehalten.',
    ],
    examples: [
      {
        german: 'Die Studie weist darauf hin, dass Tiefschlaf das Gedächtnis stärkt.',
        translationId: 'Penelitian tersebut menunjukkan bahwa tidur nyenyak memperkuat daya ingat.',
        note: 'Korrelat „darauf“ + dass-Satz',
      },
      {
        german: 'Es ist entscheidend, wie wir mit diesen Ergebnissen umgehen.',
        translationId: 'Sangat menentukan bagaimana kita menyikapi hasil-hasil ini.',
        note: 'Indirekter Fragesatz als Subjektsatz',
      },
    ],
    relatedExerciseId: 'b2-grammatik-4',
  },
  {
    id: 'gram-b2-8',
    level: 'B2',
    title: 'Konjunktiv II der Vergangenheit',
    category: 'Modus & Zeitformen',
    summary: 'Nicht erfüllte Bedingungen, Bedauern und Kritik an vergangenen Handlungen ausdrücken.',
    explanationDe:
      'Wenn man über etwas spricht, das in der Vergangenheit anders hätte laufen können (aber nicht mehr zu ändern ist), nutzt man den Konjunktiv II der Vergangenheit: „hätte / wäre + Partizip II“.',
    explanationId:
      'Konjunktiv II bentuk lampau (hätte/wäre + Partizip II) dipakai untuk membayangkan situasi masa lalu yang tidak terjadi atau penyesalan/kritik atas hal yang sudah terlanjur lewat.',
    sentenceStructureDe: 'Wenn + Subjekt + ... + Partizip II + hätte/wäre, + dann + hätte/wäre + ... + Partizip II',
    commonMistakesId:
      'Memakai "würde + haben + Partizip II" yang kaku, padahal bentuk baku adalah langsung "hätte/wäre + Partizip II".',
    rulePoints: [
      'Bildung: hätte oder wäre (je nach Perfekt-Hilfsverb) + Partizip II am Ende.',
      'Mit Modalverb (doppelter Infinitiv): hätte + Infinitiv + Modalverb (Ich hätte früher anrufen sollen).',
      'Typische Verwendung: Bedauern oder höfliche Kritik im Rückblick.',
    ],
    examples: [
      {
        german: 'Wenn wir früher losgefahren wären, hätten wir den Zug erreicht.',
        translationId: 'Seandainya tadi kita berangkat lebih awal, kita pasti sudah mengejar kereta itu.',
        note: 'Konjunktiv II Vergangenheit',
      },
      {
        german: 'Sie hätten die Unterlagen besser vorher prüfen sollen.',
        translationId: 'Seharusnya Anda memeriksa dokumen tersebut lebih baik sebelumnya.',
        note: 'Modalverb mit doppeltem Infinitiv',
      },
    ],
    relatedExerciseId: 'b2-grammatik-4',
  },
  {
    id: 'gram-b2-9',
    level: 'B2',
    title: 'Subjektive Bedeutung der Modalverben',
    category: 'Modalität',
    summary: 'Vermutungen, Wahrscheinlichkeiten und fremde Behauptungen mit Modalverben abstufen.',
    explanationDe:
      'Modalverben können auch ausdrücken, wie sicher sich der Sprecher ist (muss > dürfte > könnte > mag) oder ob er eine Behauptung anderer weitergibt (sollen = Gerücht, wollen = Eigenbehauptung).',
    explanationId:
      'Selain makna kemampuan/kewajiban, Modalverb pada level B2 dipakai untuk menyatakan tingkat keyakinan pembicara (muss = hampir pasti; dürfte = kemungkinan besar; könnte = mungkin saja) atau mengutip klaim (sollen = katanya/kabarnya; wollen = mengaku-ngaku).',
    sentenceStructureDe: 'Gegenwart: Subjekt + Modalverb + Infinitiv  |  Vergangenheit: Subjekt + Modalverb + Partizip II + haben/sein',
    commonMistakesId:
      'Mengartikan "Er soll reich sein" sebagai kewajiban ("Dia harus kaya"), padahal makna subjektifnya adalah "Katanya / Kabarnya dia kaya".',
    rulePoints: [
      'muss (95 % sicher), dürfte (75 % wahrscheinlich), könnte/kann (50 % möglich).',
      'sollen: Dritte behaupten etwas („Der Film soll sehr gut sein“).',
      'wollen: Jemand behauptet etwas über sich selbst („Er will alles gesehen haben“).',
    ],
    examples: [
      {
        german: 'Das Licht brennt noch — meine Kollegin dürfte noch im Büro sein.',
        translationId: 'Lampunya masih menyala — rekan saya kemungkinan besar masih ada di kantor.',
        note: 'dürfte = hohe Wahrscheinlichkeit',
      },
      {
        german: 'Die neue Regelung soll ab nächstem Monat gelten.',
        translationId: 'Aturan baru tersebut kabarnya berlaku mulai bulan depan.',
        note: 'soll = Aussage Dritter',
      },
    ],
    relatedExerciseId: 'b2-grammatik-4',
  },
  {
    id: 'gram-b2-10',
    level: 'B2',
    title: 'Funktionsverbgefüge',
    category: 'Wortschatz & Stil',
    summary: 'Feste Verb-Nomen-Verbindungen (eine Entscheidung treffen, in Kraft treten) im beruflichen Alltag nutzen.',
    explanationDe:
      'Funktionsverbgefüge bestehen aus einem bedeutungsarmen Verb (treffen, stellen, nehmen, kommen, stehen) und einem Nomen (oft mit Präposition). Sie wirken formell und ersetzen häufig ein einfaches Verb.',
    explanationId:
      'Funktionsverbgefüge adalah gabungan kata kerja baku dengan kata benda untuk gaya formal/profesional (misalnya eine Entscheidung treffen = entscheiden; zur Verfügung stehen = tersedia). Kata kerjanya tidak boleh diganti sembarangan.',
    sentenceStructureDe: 'Subjekt + Funktionsverb (Pos. 2) + ... + (Präposition +) Nomen',
    commonMistakesId:
      'Mengganti kata kerja pasangannya secara literal (salah: "eine Entscheidung machen", benar: "eine Entscheidung treffen"; salah: "eine Frage tun", benar: "eine Frage stellen").',
    rulePoints: [
      'Aktivische Beispiele: eine Entscheidung treffen, einen Antrag stellen, Rücksicht nehmen.',
      'Passivische/Zustandsbeispiele: zur Verfügung stehen, in Kraft treten, in Frage kommen.',
      'Die Verneinung erfolgt meist mit „kein“ (keine Rolle spielen) oder „nicht“ vor der Präposition (nicht in Frage kommen).',
    ],
    examples: [
      {
        german: 'Vor dem Kauf muss die Leitung eine klare Entscheidung treffen.',
        translationId: 'Sebelum pembelian, pimpinan harus mengambil keputusan yang jelas.',
        note: 'eine Entscheidung treffen (= entscheiden)',
      },
      {
        german: 'Bei technischen Fragen stehen wir Ihnen gern zur Verfügung.',
        translationId: 'Untuk pertanyaan teknis kami siap membantu Anda.',
        note: 'zur Verfügung stehen',
      },
    ],
    relatedExerciseId: 'b2-grammatik-3',
  },
];
