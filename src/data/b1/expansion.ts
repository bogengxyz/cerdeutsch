import { Exercise } from '../../types/exercise';

export const B1_EXPANSION_EXERCISES: Exercise[] = [
  {
    id: 'b1-lesen-4',
    level: 'B1',
    skill: 'lesen',
    topic: 'Umwelt',
    title: 'Mehrwegbecher statt Einwegmüll im Café',
    subtitle: 'Einen Sachtext lesen und Argumente sowie Details zuordnen',
    learningObjectiveDe: 'Kernaussagen und Begründungen aus einem Umweltartikel auf B1-Niveau erschließen.',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Leseverstehen · Artikel & Multiple-Choice',
    instructions: 'Lies den Artikel sorgfältig und beantworte die Fragen.',
    passageTitle: 'Pfandsystem für Kaffeebecher setzt sich durch',
    passageType: 'Artikel',
    passage:
      'In vielen deutschen Städten testen Cafés und Bäckereien seit zwei Jahren ein gemeinsames Pfandsystem für Kaffeebecher. Kundinnen und Kunden zahlen beim Kauf zwei Euro Pfand und erhalten dafür einen stabilen Mehrwegbecher. Diesen können sie später in jedem teilnehmenden Geschäft wieder abgeben, unabhängig davon, wo sie den Kaffee gekauft haben. Obwohl die Reinigung anfangs mehr Zeit kostet, berichten viele Inhaber von weniger Müll auf den Straßen und einer höheren Zufriedenheit bei Stammgästen.',
    questions: [
      {
        id: 'b1-lesen-4-q1',
        type: 'multiple-choice',
        question: 'Wo darf man den Mehrwegbecher zurückgeben?',
        options: [
          'Nur in demselben Café, in dem man ihn gekauft hat',
          'In jedem Café, das an dem Pfandsystem teilnimmt',
          'Nur an Automaten am Hauptbahnhof',
        ],
        correctAnswer: 'In jedem Café, das an dem Pfandsystem teilnimmt',
        explanationDe: 'Im Text steht: „in jedem teilnehmenden Geschäft wieder abgeben, unabhängig davon, wo sie den Kaffee gekauft haben“.',
        explanationId:
          'Gelas dapat dikembalikan di toko mana pun yang ikut dalam sistem deposit tersebut ("in jedem teilnehmenden Geschäft"), tidak harus di toko tempat membeli.',
        keyVocabulary: [
          { de: 'das Pfand', id: 'uang jaminan' },
          { de: 'unabhängig davon', id: 'terlepas dari itu' },
        ],
        points: 10,
      },
      {
        id: 'b1-lesen-4-q2',
        type: 'true-false',
        question: 'Die Reinigung der Becher erfordert für die Cafés keinerlei zusätzlichen Aufwand.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationDe: 'Im Artikel heißt es: „Obwohl die Reinigung anfangs mehr Zeit kostet...“.',
        explanationId:
          'Salah (Falsch), karena artikel menyebutkan bahwa pencucian gelas awalnya memakan lebih banyak waktu.',
        commonMistakeId: 'Kata "Obwohl" memperkenalkan hal yang menantang/kontras sebelum dampak positifnya.',
        points: 10,
      },
    ],
  },
  {
    id: 'b1-hoeren-4',
    level: 'B1',
    skill: 'hoeren',
    topic: 'Bildung',
    title: 'Erfahrungsbericht: Sprachlern-Tandem',
    subtitle: 'Einem Interview folgen und Vor- sowie Nachteile notieren',
    learningObjectiveDe: 'Meinungen und persönliche Tipps aus einem Gespräch verstehen.',
    difficulty: 'Mittel',
    durationMinutes: 10,
    formatLabel: 'Hörverstehen · Interview',
    instructions: 'Höre das Interview und wähle die richtigen Aussagen aus.',
    audioStatus: 'missing',
    transcript:
      'Moderatorin: Jonas, du lernst seit sechs Monaten Spanisch im Tandem. Wie funktioniert das genau?\nJonas: Ich treffe mich einmal pro Woche mit Lucia aus Madrid. Wir sprechen 30 Minuten lang Deutsch und danach 30 Minuten Spanisch. Am Anfang hatte ich Angst, Fehler zu machen, aber Lucia korrigiert mich immer freundlich. Wichtig ist nur, dass man vorher ein kleines Thema festlegt, sonst redet man nur über das Wetter.',
    questions: [
      {
        id: 'b1-hoeren-4-q1',
        type: 'multiple-choice',
        question: 'Welchen Tipp gibt Jonas für ein gutes Tandem-Treffen?',
        options: [
          'Man sollte jedes Mal zwei Stunden lang nur Grammatik üben.',
          'Man sollte vor dem Treffen ein Thema festlegen.',
          'Man sollte Fehler niemals korrigieren.',
        ],
        correctAnswer: 'Man sollte vor dem Treffen ein Thema festlegen.',
        explanationDe: 'Jonas sagt: „Wichtig ist nur, dass man vorher ein kleines Thema festlegt...“.',
        explanationId:
          'Jonas menyarankan agar menentukan topik pembicaraan terlebih dahulu sebelum bertemu ("vorher ein kleines Thema festlegt").',
        points: 10,
      },
      {
        id: 'b1-hoeren-4-q2',
        type: 'true-false',
        question: 'Jonas und Lucia sprechen bei jedem Treffen jeweils eine halbe Stunde auf jeder Sprache.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Richtig',
        explanationDe: 'Sie sprechen 30 Minuten Deutsch und 30 Minuten Spanisch.',
        explanationId:
          'Benar (Richtig), 30 menit berbahasa Jerman lalu 30 menit berbahasa Spanyol.',
        points: 10,
      },
    ],
  },
  {
    id: 'b1-grammatik-4',
    level: 'B1',
    skill: 'grammatik',
    topic: 'Meinungen äußern',
    title: 'Konnektoren, Plusquamperfekt und Verben mit Präpositionen',
    subtitle: 'Satzverbindungen und feste Präpositionen auf B1-Niveau meistern',
    learningObjectiveDe: 'obwohl/trotzdem, um...zu/damit, nachdem + Plusquamperfekt und Verb-Präposition-Verbindungen korrekt anwenden.',
    difficulty: 'Mittel',
    durationMinutes: 12,
    formatLabel: 'Grammatiktraining · Satzverbindungen',
    instructions: 'Wähle für jede Lücke die passende Struktur.',
    questions: [
      {
        id: 'b1-grammatik-4-q1',
        type: 'multiple-choice',
        question: 'Ich lerne intensiv Deutsch, ___ meine Chancen auf dem Arbeitsmarkt zu verbessern.',
        options: ['damit', 'um', 'weil'],
        correctAnswer: 'um',
        explanationDe: 'Gleiches Subjekt („ich“) + „zu + Infinitiv“ am Ende → „um ... zu“.',
        explanationId:
          'Karena subjek kedua klausa sama ("ich") dan di akhir ada "zu verbessern", maka dipakai struktur tujuan "um ... zu".',
        relatedGrammarTopicId: 'gram-b1-4',
        points: 10,
      },
      {
        id: 'b1-grammatik-4-q2',
        type: 'multiple-choice',
        question: 'Es hat den ganzen Morgen geregnet. ___ sind wir mit dem Fahrrad gefahren.',
        options: ['Obwohl', 'Trotzdem', 'Deshalb'],
        correctAnswer: 'Trotzdem',
        explanationDe: 'Nach dem Punkt steht Position 1 + konjugiertes Verb („sind“) → Konjunktionaladverb „Trotzdem“.',
        explanationId:
          'Ini dua kalimat utama terpisah dan kata kerja "sind" langsung di posisi 2; untuk menyatakan pertentangan ("meskipun demikian") dipakai "Trotzdem".',
        relatedGrammarTopicId: 'gram-b1-10',
        points: 10,
      },
      {
        id: 'b1-grammatik-4-q3',
        type: 'multiple-choice',
        question: 'Nachdem ich meine Bewerbung abgeschickt ___, bekam ich zwei Tage später eine Einladung.',
        options: ['habe', 'hatte', 'bin'],
        correctAnswer: 'hatte',
        explanationDe: 'Bei „nachdem“ vor einem Präteritum-Hauptsatz („bekam“) steht das Plusquamperfekt („hatte abgeschickt“).',
        explanationId:
          'Karena kalimat utama memakai lampau ("bekam"), kejadian sebelumnya setelah "nachdem" menggunakan Plusquamperfekt: "hatte abgeschickt".',
        relatedGrammarTopicId: 'gram-b1-6',
        points: 10,
      },
      {
        id: 'b1-grammatik-4-q4',
        type: 'multiple-choice',
        question: '___ wartest du schon seit zwanzig Minuten? — Auf die Straßenbahn.',
        options: ['Auf wen', 'Worauf', 'Wofür'],
        correctAnswer: 'Worauf',
        explanationDe: '„warten auf“ für eine Sache (Straßenbahn) bildet das Fragewort „wo(r) + auf = Worauf“.',
        explanationId:
          '"warten auf" merujuk pada benda (trem), sehingga kata tanya yang tepat adalah "wo + r + auf" = "Worauf".',
        relatedGrammarTopicId: 'gram-b1-9',
        points: 10,
      },
    ],
  },
  {
    id: 'b1-schreiben-4',
    level: 'B1',
    skill: 'schreiben',
    topic: 'Medien',
    title: 'Forumsbeitrag: Smartphones im Unterricht',
    subtitle: 'Einen strukturierten Meinungsbeitrag mit Begründung und Beispiel schreiben',
    learningObjectiveDe: 'Im Forum klar Position beziehen, Vor- und Nachteile abwägen und ein Fazit formulieren.',
    difficulty: 'Mittel',
    durationMinutes: 20,
    formatLabel: 'Schriftlicher Ausdruck · Forumsbeitrag',
    instructions:
      'Im Online-Kursforum wird diskutiert: „Sollen Smartphones im Sprachunterricht erlaubt sein?“ Schreibe deine Meinung (ca. 80–110 Wörter). Gehe auf Vorteile, Nachteile und deine eigene Erfahrung ein.',
    questions: [
      {
        id: 'b1-schreiben-4-q1',
        type: 'writing-task',
        question:
          'Verfasse einen Forumsbeitrag (80–110 Wörter) zur Nutzung von Smartphones im Unterricht.',
        wordLimit: { min: 80, max: 120 },
        preparationGuidanceDe:
          'Bagi tulisanmu menjadi 4 bagian ringkas: 1) Pendapat awal, 2) Kelebihan (kamus/riset cepat), 3) Risiko (gangguan fokus), 4) Kesimpulan / solusi aturan.',
        usefulExpressionsDe: [
          { de: 'Meiner Meinung nach hat dieses Thema sowohl Vor- als auch Nachteile.', id: 'Menurut pendapat saya topik ini punya kelebihan dan kekurangan.' },
          { de: 'Einerseits helfen Apps beim schnellen Nachschlagen...', id: 'Di satu sisi aplikasi membantu mencari arti dengan cepat...' },
          { de: 'Andererseits lenken Nachrichten oft vom Lernen ab.', id: 'Di sisi lain notifikasi pesan sering mengganggu fokus belajar.' },
          { de: 'Deshalb bin ich dafür, dass...', id: 'Oleh karena itu saya setuju bahwa...' },
        ],
        sampleAnswer:
          'Hallo zusammen,\ndas Thema finde ich sehr wichtig. Meiner Meinung nach können Smartphones im Unterricht sinnvoll sein, wenn es klare Regeln gibt. Einerseits helfen Wörterbuch-Apps sofort, neue Begriffe zu verstehen oder Aussprache zu üben. Andererseits lenken private Nachrichten viele Lernende stark ab, sodass man dem Gespräch nicht mehr folgt. In meinem letzten Kurs durften wir das Handy nur während der Gruppenarbeit benutzen. Das hat sehr gut funktioniert. Deshalb sollte man Smartphones nicht komplett verbieten, sondern gezielt einsetzen.',
        rubricCriteria: [
          { criterion: 'Posisi pendapat jelas & logis', descriptionId: 'Menyatakan pendapat pribadi dengan alasan yang masuk akal.' },
          { criterion: 'Pro dan kontra terstruktur', descriptionId: 'Menggunakan kata hubung (einerseits/andererseits, deshalb, obwohl).' },
          { criterion: 'Ketepatan tata bahasa B1', descriptionId: 'Struktur anak kalimat dan penggunaan kosakata media/belajar akurat.' },
        ],
        checklist: [
          'Ich habe eine klare eigene Meinung formuliert.',
          'Ich habe mindestens einen Vorteil und einen Nachteil genannt.',
          'Ich habe ein eigenes Beispiel oder eine Lösung vorgeschlagen.',
          'Ich habe Konnektoren (weil, obwohl, deshalb) benutzt.',
        ],
        explanationId:
          'Di ujian Goethe B1 Teil 2 (Forumsbeitrag), pembaca menilai kejelasan sikap pribadi, argumen pendukung, serta penggunaan konektor B1.',
        points: 25,
      },
    ],
  },
  {
    id: 'b1-sprechen-4',
    level: 'B1',
    skill: 'sprechen',
    topic: 'Beruf und Ausbildung',
    title: 'Kurzvortrag (Präsentation): Homeoffice vs. Büro',
    subtitle: 'Ein Thema frei strukturiert präsentieren und Vor- und Nachteile nennen',
    learningObjectiveDe: 'Eine kurze strukturierte Präsentation (Einleitung, eigene Erfahrung, Heimatland, Pro/Kontra, Abschluss) auf B1-Niveau halten.',
    difficulty: 'Mittel',
    durationMinutes: 15,
    formatLabel: 'Mündliche Kommunikation · Kurzvortrag',
    instructions:
      'Bereite eine kurze Präsentation zum Thema „Arbeiten im Homeoffice“ vor. Gehe auf 1) Einleitung, 2) Situation in deinem Heimatland, 3) Vor- und Nachteile und 4) deine Meinung ein.',
    questions: [
      {
        id: 'b1-sprechen-4-q1',
        type: 'speaking-task',
        question:
          'Halte deine Präsentation laut (ca. 2–3 Minuten) mit klarer Gliederung von der Begrüßung bis zum Dank am Schluss.',
        preparationSeconds: 60,
        speakingDurationSeconds: 150,
        preparationGuidanceDe:
          'Ikuti struktur presentasi resmi B1: Sapaan -> Pengenalan topik -> Pengalaman/situasi di Indonesia -> Kelebihan & kekurangan -> Pendapat pribadi -> Penutup & terima kasih.',
        usefulExpressionsDe: [
          { de: 'Mein Thema heute lautet: „Arbeiten im Homeoffice“.', id: 'Topik saya hari ini adalah: "Bekerja dari rumah".' },
          { de: 'In meinem Heimatland ist es üblich, dass...', id: 'Di negara asal saya sudah umum bahwa...' },
          { de: 'Zum Schluss möchte ich betonen, dass...', id: 'Sebagai penutup saya ingin menekankan bahwa...' },
          { de: 'Vielen Dank für Ihre Aufmerksamkeit!', id: 'Terima kasih atas perhatian Anda!' },
        ],
        sampleAnswer:
          'Guten Tag! Mein Thema heute lautet „Arbeiten im Homeoffice“. Zunächst möchte ich von meinen Erfahrungen berichten: In Indonesien arbeiten viele Büroangestellte seit einigen Jahren teilweise von zu Hause aus, besonders in Großstädten mit viel Verkehr. Ein großer Vorteil ist die Zeitersparnis, weil man nicht im Stau steht. Außerdem kann man den Tag flexibler planen. Ein Nachteil ist jedoch, dass der persönliche Kontakt zu den Kollegen fehlt. Meiner Meinung nach ist ein gemischtes Modell am besten. Vielen Dank für Ihre Aufmerksamkeit! Haben Sie noch Fragen?',
        rubricCriteria: [
          { criterion: 'Struktur 5 bagian lengkap', descriptionId: 'Ada pembuka, isi pengalaman/negara asal, pro-kontra, opini, dan penutup.' },
          { criterion: 'Transisi antar bagian', descriptionId: 'Menggunakan penanda struktur seperti Zunächst, Außerdem, Zum Schluss.' },
        ],
        checklist: [
          'Ich habe das Thema vorgestellt und meine Zuhörer begrüßt.',
          'Ich habe über die Situation in meinem Heimatland gesprochen.',
          'Ich habe Vor- und Nachteile abgewogen.',
          'Ich habe meine Präsentation höflich beendet.',
        ],
        explanationId:
          'Bagian prezentasi Goethe B1 Teil 2 menuntut urutan poin yang jelas dan redemittel transisi agar pendengar mudah mengikuti alur pembicaraan.',
        points: 25,
      },
    ],
  },
];
