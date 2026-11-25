import { Exercise } from '../../types/exercise';

export const B2_EXERCISES: Exercise[] = [
  // ================= LESEN B2 (3) =================
  {
    id: 'b2-lesen-1',
    level: 'B2',
    skill: 'lesen',
    topic: 'Technologie',
    title: 'Hybride Arbeitsmodelle und Entgrenzung',
    subtitle: 'Differenzierte Standpunkte in einem Kommentar analysieren',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 20,
    formatLabel: 'Leseverstehen · Kommentar',
    instructions: 'Lies den Kommentar sorgfältig und beantworte die Detailfragen.',
    passageTitle: 'Flexibilität mit Schattenseiten',
    passageType: 'Artikel',
    passage:
      'Während hybride Arbeitsmodelle Beschäftigten deutlich mehr zeitliche Flexibilität eröffnen, weisen Arbeitspsychologen darauf hin, dass die räumliche Entgrenzung auch Risiken birgt. Ohne klare betriebliche Kommunikationsregeln verschwimmen Feierabend und Erreichbarkeit, was langfristig die Erholungsqualität mindert und zu Erschöpfung führen kann.',
    questions: [
      {
        id: 'b2-lesen-1-q1',
        type: 'multiple-choice',
        question: 'Welche Gefahr sehen Arbeitspsychologen laut dem Kommentar?',
        options: [
          'Hybride Teams treffen sich zu häufig im Büro.',
          'Fehlende Grenzen zwischen Arbeit und Freizeit beeinträchtigen die Erholung.',
          'Unternehmen verzichten vollständig auf digitale Kommunikation.',
        ],
        correctAnswer:
          'Fehlende Grenzen zwischen Arbeit und Freizeit beeinträchtigen die Erholung.',
        explanationId:
          'Teks menyatakan bahwa tanpa aturan komunikasi yang jelas, batas antara jam pulang kerja dan ketersediaan online memudar ("verschwimmen Feierabend und Erreichbarkeit"), sehingga mengurangi kualitas pemulihan ("Erholungsqualität mindert").',
        keyVocabulary: [
          { de: 'die Entgrenzung', id: 'hilangnya batas (ruang/waktu)' },
          { de: 'mindern', id: 'mengurangi / menurunkan' },
        ],
        points: 15,
      },
      {
        id: 'b2-lesen-1-q2',
        type: 'true-false',
        question: 'Der Autor lehnt hybride Arbeitsmodelle grundsätzlich vollständig ab.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationId:
          'Salah (Falsch), penulis mengakui adanya fleksibilitas waktu yang lebih besar ("zeitliche Flexibilität eröffnen"), namun menekankan perlunya aturan komunikasi yang jelas.',
        points: 10,
      },
    ],
  },
  {
    id: 'b2-lesen-2',
    level: 'B2',
    skill: 'lesen',
    topic: 'Wissenschaft',
    title: 'Schlafqualität und Lernleistung',
    subtitle: 'Wissenschaftliche Ergebnisse aus einem Bericht erfassen',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 18,
    formatLabel: 'Leseverstehen · Wissenschaftstext',
    instructions: 'Lies den Bericht und löse die Aufgaben.',
    passageTitle: 'Warum das Gehirn Ruhepausen braucht',
    passageType: 'Informationstext',
    passage:
      'Neurowissenschaftliche Studien belegen, dass neu erworbene sprachliche Strukturen erst während tiefer Schlafphasen stabil im Langzeitgedächtnis verankert werden. Wer vor einer Prüfung die Nacht durchlernt, erzielt zwar kurzfristig einen Wiederholungseffekt, büßt jedoch am Folgetag deutlich an Konzentrationsfähigkeit ein.',
    questions: [
      {
        id: 'b2-lesen-2-q1',
        type: 'multiple-choice',
        question: 'Was passiert laut Studien während des Tiefschlafs?',
        options: [
          'Neue Sprachstrukturen werden dauerhaft im Gedächtnis gespeichert.',
          'Das Gehirn vergisst komplexe Vokabeln.',
          'Die Konzentrationsfähigkeit sinkt langfristig.',
        ],
        correctAnswer: 'Neue Sprachstrukturen werden dauerhaft im Gedächtnis gespeichert.',
        explanationId:
          'Kalimat pertama menjelaskan bahwa struktur bahasa yang baru dipelajari tertanam secara stabil di memori jangka panjang ("Langzeitgedächtnis") selama fase tidur nyenyak.',
        keyVocabulary: [
          { de: 'verankern', id: 'menanamkan / mengukuhkan' },
          { de: 'einbüßen', id: 'kehilangan / mengalami penurunan' },
        ],
        points: 15,
      },
      {
        id: 'b2-lesen-2-q2',
        type: 'fill-blank',
        question: 'Wer die ganze Nacht durchlernt, verliert am nächsten Tag an ___.',
        correctAnswer: 'Konzentrationsfähigkeit',
        acceptableAnswers: ['Konzentrationsfähigkeit', 'Konzentration'],
        explanationId:
          'Di akhir teks tertulis "büßt jedoch am Folgetag deutlich an Konzentrationsfähigkeit ein" (kehilangan kemampuan berkonsentrasi).',
        points: 10,
      },
    ],
  },
  {
    id: 'b2-lesen-3',
    level: 'B2',
    skill: 'lesen',
    topic: 'Globalisierung',
    title: 'Lieferketten und regionale Produktion',
    subtitle: 'Zusammenhänge im Wirtschaftstext zuordnen',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 20,
    formatLabel: 'Leseverstehen · Zuordnung',
    instructions: 'Lies den Abschnitt und ordne Ursache und Folge einander zu.',
    passageTitle: 'Wandel im Welthandel',
    passageType: 'Artikel',
    passage:
      'Infolge globaler Transportengpässe überprüfen viele Industrieunternehmen ihre bisherigen Beschaffungsstrategien. Statt ausschließlich auf einen einzigen kostengünstigen Zulieferer zu setzen, diversifizieren Betriebe ihre Partner oder verlagern kritische Produktionsschritte zurück in europäische Nachbarländer, um Ausfallrisiken zu minimieren.',
    questions: [
      {
        id: 'b2-lesen-3-q1',
        type: 'matching',
        question: 'Ordne die Begriffe aus dem Text ihren Bedeutungen im Zusammenhang zu.',
        matchingPairs: [
          { left: 'Transportengpässe', right: 'Auslöser für das Überdenken der Strategie' },
          { left: 'Diversifizierung der Partner', right: 'Maßnahme gegen Abhängigkeit von einem Zulieferer' },
          { left: 'Minimierung von Ausfallrisiken', right: 'Ziel der regionalen Verlagerung' },
        ],
        explanationId:
          'Hambatan transportasi memicu peninjauan strategi pengadaan; diversifikasi mitra mencegah ketergantungan pada satu pemasok; relokasi regional bertujuan meminimalkan risiko gangguan pasokan.',
        points: 15,
      },
    ],
  },

  // ================= HÖREN B2 (3) =================
  {
    id: 'b2-hoeren-1',
    level: 'B2',
    skill: 'hoeren',
    topic: 'Wirtschaft',
    title: 'Radiointerview zur Mobilitätswende',
    subtitle: 'Expertenargumente und Nuancen im Interview erfassen',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 18,
    formatLabel: 'Hörverstehen · Experteninterview',
    instructions: 'Höre das Interview mit Verkehrsforscherin Dr. Klein.',
    audioStatus: 'pending',
    transcript:
      'Moderator: Frau Dr. Klein, warum steigen im ländlichen Raum noch zu wenige Menschen auf Bus und Bahn um? Dr. Klein: Entscheidend ist nicht allein der Ticketpreis oder die Einrichtung neuer Linien am Vormittag, sondern vor allem eine verlässliche Taktung am späten Abend und am Wochenende. Nur wenn diese Grundversorgung garantiert ist, wird das eigene Auto verzichtbar.',
    questions: [
      {
        id: 'b2-hoeren-1-q1',
        type: 'multiple-choice',
        question: 'Was ist laut Dr. Klein ausschlaggebend für den Erfolg des Nahverkehrs auf dem Land?',
        options: [
          'Kostenlose Parkplätze an Bahnhöfen',
          'Eine verlässliche Taktung auch abends und am Wochenende',
          'Höhere Geschwindigkeiten auf der Autobahn',
        ],
        correctAnswer: 'Eine verlässliche Taktung auch abends und am Wochenende',
        explanationId:
          'Dr. Klein menekankan bahwa bukan hanya harga tiket yang menentukan, melainkan jadwal keberangkatan yang andal pada malam hari dan akhir pekan ("verlässliche Taktung am späten Abend und am Wochenende").',
        keyVocabulary: [{ de: 'verzichtbar', id: 'dapat diabaikan / tidak lagi wajib dimiliki' }],
        points: 15,
      },
    ],
  },
  {
    id: 'b2-hoeren-2',
    level: 'B2',
    skill: 'hoeren',
    topic: 'Kultur',
    title: 'Podiumsdiskussion: Freier Eintritt in Museen?',
    subtitle: 'Unterschiedliche Positionen in einer Gesprächsrunde unterscheiden',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 18,
    formatLabel: 'Hörverstehen · Diskussion',
    instructions: 'Höre den Ausschnitt aus der Diskussion und beantworte die Fragen.',
    audioStatus: 'pending',
    transcript:
      'Kuratorin Weber: Ein eintrittsfreier Sonntag im Monat senkt soziale Hürden deutlich und zieht viele Erstbesucher an. Finanzexperte Brandt: Grundsätzlich begrüße ich das, gebe jedoch zu bedenken, dass Museen ohne eigene Ticketeinnahmen stärker von öffentlichen Haushalten abhängig werden, was langfristig Sonderausstellungen gefährden könnte.',
    questions: [
      {
        id: 'b2-hoeren-2-q1',
        type: 'true-false',
        question: 'Finanzexperte Brandt lehnt den freien Eintritt am Sonntag komplett ab.',
        options: ['Richtig', 'Falsch'],
        correctAnswer: 'Falsch',
        explanationId:
          'Salah (Falsch), Brandt berkata "Grundsätzlich begrüße ich das" (pada prinsipnya ia menyambut baik), namun ia mengingatkan risiko ketergantungan anggaran terhadap pameran khusus.',
        points: 10,
      },
      {
        id: 'b2-hoeren-2-q2',
        type: 'multiple-choice',
        question: 'Welchen Effekt beobachtet Kuratorin Weber beim kostenlosen Sonntag?',
        options: [
          'Es kommen mehr Erstbesucher und soziale Hürden sinken.',
          'Die Museen müssen früher schließen.',
          'Sonderausstellungen werden häufiger verlängert.',
        ],
        correctAnswer: 'Es kommen mehr Erstbesucher und soziale Hürden sinken.',
        explanationId:
          'Kuratorin Weber menyoroti menurunnya hambatan sosial ("senkt soziale Hürden") dan meningkatnya pengunjung baru.',
        points: 10,
      },
    ],
  },
  {
    id: 'b2-hoeren-3',
    level: 'B2',
    skill: 'hoeren',
    topic: 'Kommunikation',
    title: 'Fachvortrag: Konstruktives Feedback im Team',
    subtitle: 'Empfehlungen für berufliche Kommunikation erfassen',
    difficulty: 'Mittel',
    durationMinutes: 15,
    formatLabel: 'Hörverstehen · Kurzvortrag',
    instructions: 'Höre den Vortragsauszug und fülle die Information aus.',
    audioStatus: 'pending',
    transcript:
      'Gutes Feedback beschreibt konkrete Beobachtungen statt pauschaler Bewertungen der Persönlichkeit. Wer beispielsweise statt „Sie sind unzuverlässig“ formuliert „Der Bericht lag am Dienstag noch nicht vor, wodurch sich die Abstimmung verzögert hat“, ermöglicht dem Gegenüber eine sachliche Reaktion.',
    questions: [
      {
        id: 'b2-hoeren-3-q1',
        type: 'multiple-choice',
        question: 'Worauf sollte man laut Vortrag beim Feedback achten?',
        options: [
          'Konkrete Beobachtungen statt pauschaler Urteile zu schildern',
          'Kritik grundsätzlich nur per E-Mail zu senden',
          'Die Persönlichkeit des Gegenübers zu bewerten',
        ],
        correctAnswer: 'Konkrete Beobachtungen statt pauschaler Urteile zu schildern',
        explanationId:
          'Pembicara menekankan pentingnya menyampaikan pengamatan konkret alih-alih penilaian umum terhadap kepribadian ("konkrete Beobachtungen statt pauschaler Bewertungen").',
        points: 10,
      },
    ],
  },

  // ================= SPRECHEN B2 (3) =================
  {
    id: 'b2-sprechen-1',
    level: 'B2',
    skill: 'sprechen',
    topic: 'Argumentation',
    title: 'Debatte: Autofreie Innenstädte',
    subtitle: 'Standpunkt verteidigen, abwägen und Kompromisse entwickeln',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 18,
    formatLabel: 'Sprechen · Diskussion',
    instructions:
      'Formuliere eine ausgewogene Stellungnahme mit klaren Argumenten und einem Kompromissvorschlag.',
    questions: [
      {
        id: 'b2-sprechen-1-q1',
        type: 'speaking-task',
        question:
          'Sollten historische Innenstädte komplett für den privaten Autoverkehr gesperrt werden? Berücksichtige Lebensqualität, Einzelhandel, Lieferverkehr und Barrierefreiheit.',
        preparationSeconds: 120,
        speakingDurationSeconds: 240,
        checklist: [
          'Position differenziert und überzeugend dargestellt',
          'Gegenargumente sachlich aufgegriffen',
          'Konkreten Kompromiss entwickelt (z. B. Zeitfenster für Lieferverkehr)',
          'Gehobene Konnektoren genutzt („infolgedessen“, „dennoch“, „nichtsdestotrotz“)',
        ],
        rubricCriteria: [
          {
            criterion: 'Argumentationsstruktur B2',
            descriptionId: 'Mampu menimbang aspek ekonomi, lingkungan, dan aksesibilitas secara logis.',
          },
          {
            criterion: 'Differenzierter Ausdruck',
            descriptionId: 'Menggunakan kosakata formal dan konektor tingkat B2 secara alami.',
          },
        ],
        sampleAnswer:
          'Befürworter autofreier Innenstädte betonen zu Recht die höhere Aufenthaltsqualität und geringere Luftbelastung. Dennoch darf man die Belange von Menschen mit Mobilitätseinschränkungen sowie des lokalen Einzelhandels nicht außer Acht lassen. Als pragmatischer Kompromiss bietet sich eine Fußgängerzone mit festen Lieferzeiten am frühen Morgen sowie Ausnahmegenehmigungen für Anwohner und Pflegedienste an.',
        explanationId:
          'Di tingkat B2, nilai tinggi diperoleh ketika pembicara tidak hanya menyatakan setuju/tidak setuju, melainkan menawarkan solusi kompromi yang mempertimbangkan berbagai pihak.',
        points: 30,
      },
    ],
  },
  {
    id: 'b2-sprechen-2',
    level: 'B2',
    skill: 'sprechen',
    topic: 'Bildung',
    title: 'Kurzvortrag: Lebenslanges Lernen in der Arbeitswelt',
    subtitle: 'Komplexes Thema strukturiert präsentieren',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 18,
    formatLabel: 'Sprechen · Präsentation (4 Min.)',
    instructions: 'Bereite einen strukturierten Vortrag mit Beispielen und Fazit vor.',
    questions: [
      {
        id: 'b2-sprechen-2-q1',
        type: 'speaking-task',
        question:
          'Warum gewinnt kontinuierliche Weiterbildung angesichts des technologischen Wandels an Bedeutung? Welche Verantwortung tragen Beschäftigte, Unternehmen und der Staat?',
        preparationSeconds: 120,
        speakingDurationSeconds: 240,
        checklist: [
          'Gesellschaftlichen und technologischen Hintergrund erläutert',
          'Rolle von Arbeitnehmern, Arbeitgebern und Staat abgegrenzt',
          'Eigenes Beispiel oder konkrete Maßnahme genannt',
        ],
        rubricCriteria: [
          {
            criterion: 'Thematische Tiefe',
            descriptionId: 'Mengupas tanggung jawab individu, perusahaan, dan negara secara sistematis.',
          },
          {
            criterion: 'Flüssigkeit',
            descriptionId: 'Pemaparan lancar dengan transisi antargagasan yang halus.',
          },
        ],
        sampleAnswer:
          'Angesichts der rasanten Digitalisierung veraltet Fachwissen heute deutlich schneller als noch vor zwanzig Jahren. Lebenslanges Lernen ist daher sowohl eine individuelle Chance als auch eine gemeinsame Aufgabe: Während Unternehmen Weiterbildungszeit zur Verfügung stellen sollten, liegt es an den Beschäftigten, diese Angebote aktiv zu nutzen.',
        explanationId:
          'Gunakan frasa transisi B2 seperti "Angesichts...", "Während..., liegt es an..." untuk memperhalus struktur presentasi.',
        points: 30,
      },
    ],
  },
  {
    id: 'b2-sprechen-3',
    level: 'B2',
    skill: 'sprechen',
    topic: 'Umwelt',
    title: 'Vor- und Nachteile von Verpackungssteuern erläutern',
    subtitle: 'Wirtschaftliche und ökologische Effekte abwägen',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 15,
    formatLabel: 'Sprechen · Stellungnahme',
    instructions: 'Bewerte eine kommunale Verpackungssteuer auf Einwegbecher und -geschirr.',
    questions: [
      {
        id: 'b2-sprechen-3-q1',
        type: 'speaking-task',
        question:
          'Viele Städte diskutieren eine Steuer auf Einwegverpackungen bei Speisen und Getränken zum Mitnehmen. Erläutere Vor- und Nachteile für Gastronomie, Verbraucher und Umwelt.',
        preparationSeconds: 90,
        speakingDurationSeconds: 180,
        checklist: [
          'Ökologische Lenkungswirkung erklärt',
          'Bürokratischen Aufwand für kleine Betriebe erwähnt',
          'Mehrwegsysteme als Alternative bewertet',
        ],
        rubricCriteria: [
          {
            criterion: 'Abwägung',
            descriptionId: 'Menjelaskan dampak positif dan beban administratif secara objektif.',
          },
          {
            criterion: 'Fachwortschatz',
            descriptionId: 'Menggunakan istilah seperti Einwegverpackung, Mehrwegsystem, Lenkungswirkung.',
          },
        ],
        sampleAnswer:
          'Eine Abgabe auf Einwegverpackungen setzt einen klaren finanziellen Anreiz, auf Mehrwegbehälter umzusteigen. Kritiker wenden jedoch ein, dass kleine Imbisse zusätzliche Abrechnungskosten tragen müssen. Entscheidend für den Erfolg ist daher ein unkompliziertes Pfandsystem, das in vielen Geschäften einheitlich funktioniert.',
        explanationId:
          'Struktur klasik B2: argumen utama → keberatan kritikus ("Kritiker wenden ein, dass...") → syarat keberhasilan.',
        points: 30,
      },
    ],
  },

  // ================= SCHREIBEN B2 (3) =================
  {
    id: 'b2-schreiben-1',
    level: 'B2',
    skill: 'schreiben',
    topic: 'Kommunikation',
    title: 'Formeller Beschwerdebrief an einen Seminaranbieter',
    subtitle: 'Sachlich Mängel darlegen und Rückerstattung fordern',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 30,
    formatLabel: 'Schreiben · Formeller Brief',
    instructions: 'Schreibe einen formellen Beschwerdebrief (140 bis 190 Wörter).',
    questions: [
      {
        id: 'b2-schreiben-1-q1',
        type: 'writing-task',
        question:
          'Du hast an einem kostenpflichtigen Fachseminar teilgenommen, das deutlich von der Ausschreibung abwich (überfüllte Gruppe, defekte Technik, verkürzte Übungszeit). Schreibe an die Leitung: 1. Nenne Anlass und Erwartungen. 2. Erläutere die konkreten Mängel. 3. Fordere eine angemessene Teilrückerstattung mit Frist.',
        wordLimit: { min: 135, max: 200 },
        checklist: [
          'Aussagekräftiger Betreff und formelle Anrede',
          'Abweichung zwischen Angebot und Realität präzise belegt',
          'Sachlicher, verbindlicher Ton ohne Polemik',
          'Konkrete Forderung inklusive Fristsetzung',
        ],
        rubricCriteria: [
          {
            criterion: 'Stil & Register B2',
            descriptionId: 'Gaya bahasa resmi konsisten, menggunakan nominalisasi dan kalimat kompleks.',
          },
          {
            criterion: 'Überzeugungskraft',
            descriptionId: 'Fakta keluhan terhubung logis dengan tuntutan pengembalian dana sebagian.',
          },
        ],
        sampleAnswer:
          'Betreff: Reklamation bezüglich des Fachseminars „Wirtschaftsdeutsch“ vom 14. bis 16. November\n\nSehr geehrte Damen und Herren,\n\nin Ihrer Kursbeschreibung garantierten Sie Kleingruppen mit maximal acht Teilnehmenden sowie modernes Audiomaterial. Bedauerlicherweise entsprach die tatsächliche Durchführung nicht den zugesicherten Leistungen.\n\nErstens bestand unsere Gruppe aus achtzehn Personen, wodurch individuelle Sprechübungen kaum möglich waren. Zweitens fiel die Tonanlage am zweiten Seminartag vollständig aus, sodass wertvolle Unterrichtszeit verloren ging.\n\nAngesichts dieser erheblichen Mängel bitte ich Sie um eine Teilrückerstattung von 30 Prozent der Seminargebühr bis zum 5. Dezember. Andernfalls sehe ich mich gezwungen, weitere rechtliche Schritte zu prüfen.\n\nMit freundlichen Grüßen\nAdi Pratama',
        explanationId:
          'Dalam surat pengaduan tingkat B2, perhatikan kontras antara janji penawaran ("zugesicherte Leistungen") dan realita lapangan, lalu tutup dengan tuntutan terukur ("Teilrückerstattung von 30 Prozent bis zum...").',
        points: 35,
      },
    ],
  },
  {
    id: 'b2-schreiben-2',
    level: 'B2',
    skill: 'schreiben',
    topic: 'Gesellschaft',
    title: 'Erörterung: Verpflichtendes soziales Jahr?',
    subtitle: 'Pro- und Kontra-Argumente strukturiert abwägen',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 35,
    formatLabel: 'Schreiben · Argumentativer Text',
    instructions: 'Verfasse einen strukturierten Diskussionsbeitrag (150 bis 200 Wörter).',
    questions: [
      {
        id: 'b2-schreiben-2-q1',
        type: 'writing-task',
        question:
          'Sollte nach der Schule ein verpflichtendes soziales Jahr eingeführt werden? Diskutiere Chancen für den gesellschaftlichen Zusammenhalt, Bedenken hinsichtlich der persönlichen Berufsfreiheit und ziehe ein begründetes Fazit.',
        wordLimit: { min: 145, max: 210 },
        checklist: [
          'Einleitung führt an die Aktualität des Themas heran',
          'Mindestens zwei Pro- und zwei Kontra-Argumente abgewogen',
          'Komplexe Satzstrukturen und Konnektoren eingesetzt',
          'Eigenes Fazit schlüssig abgeleitet',
        ],
        rubricCriteria: [
          {
            criterion: 'Textkohärenz',
            descriptionId: 'Paragraf tersusun rapi (Einleitung, Hauptteil Pro/Kontra, Schluss).',
          },
          {
            criterion: 'Grammatische Komplexität',
            descriptionId: 'Variasi pasif, kalimat relatif, dan konektor B2 tepat.',
          },
        ],
        sampleAnswer:
          'Die Frage nach einem verpflichtenden sozialen Jahr wird in Politik und Gesellschaft kontrovers diskutiert. Befürworter argumentieren zu Recht, dass junge Menschen dadurch soziale Kompetenzen erwerben und Einblicke in pflegerische oder ökologische Berufe gewinnen. Zudem könnte der gesellschaftliche Zusammenhalt gestärkt werden.\n\nAuf der anderen Seite greift eine Pflicht erheblich in die persönliche Lebensplanung junger Erwachsener ein und verzögert den Beginn von Ausbildung oder Studium. Überdies lässt sich echte Hilfsbereitschaft kaum staatlich anordnen.\n\nZusammenfassend halte ich einen attraktiven, gut vergüteten Freiwilligendienst für zielführender als eine gesetzliche Pflicht, da freiwilliges Engagement auf Dauer nachhaltiger wirkt.',
        explanationId:
          'Pada teks argumentasi B2, hindari hanya mendaftar poin; kembangkan setiap argumen dengan penjelasan akibatnya menggunakan kata hubung seperti "zudem", "auf der anderen Seite", dan "überdies".',
        points: 35,
      },
    ],
  },
  {
    id: 'b2-schreiben-3',
    level: 'B2',
    skill: 'schreiben',
    topic: 'Technologie',
    title: 'Stellungnahme: Künstliche Intelligenz im Hochschulstudium',
    subtitle: 'Chancen und akademische Regeln differenziert bewerten',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 30,
    formatLabel: 'Schreiben · Stellungnahme',
    instructions: 'Schreibe eine differenzierte Stellungnahme (140 bis 190 Wörter).',
    questions: [
      {
        id: 'b2-schreiben-3-q1',
        type: 'writing-task',
        question:
          'Wie sollten Universitäten mit digitalen Schreib- und Analysewerkzeugen umgehen? Erörtere Nutzen für das Lernen, Risiken für eigenständiges Denken und schlage sinnvolle Prüfungsformen vor.',
        wordLimit: { min: 135, max: 200 },
        checklist: [
          'Chancen und Risiken differenziert dargestellt',
          'Konkrete Vorschläge für Hochschulen gemacht',
          'Gehobenen Wortschatz (z. B. Quellenkritik, Eigenständigkeit) verwendet',
        ],
        rubricCriteria: [
          {
            criterion: 'Lexik B2',
            descriptionId: 'Menggunakan istilah akademik dan konstruksi nominalisasi yang akurat.',
          },
          {
            criterion: 'Lösungsorientierung',
            descriptionId: 'Menyajikan usulan format ujian atau kebijakan kampus yang realistis.',
          },
        ],
        sampleAnswer:
          'Digitale Assistenzsysteme verändern den akademischen Alltag grundlegend. Richtig eingesetzt erleichtern sie die Strukturierung umfangreicher Literatur oder das Überprüfen sprachlicher Klarheit. Problematisch wird ihr Einsatz jedoch dann, wenn Studierende ganze Argumentationsketten ungeprüft übernehmen und dadurch die eigene Urteilsfähigkeit vernachlässigen.\n\nEin pauschales Verbot erscheint angesichts der technischen Realität kaum durchsetzbar. Sinnvoller wäre es, Transparenzpflichten einzuführen und Prüfungsformate stärker auf mündliche Verteidigungen sowie kritische Quellenanalysen auszurichten. So bleibt wissenschaftliche Eigenständigkeit auch im digitalen Zeitalter gewährleistet.',
        explanationId:
          'Konstruksi Partizipial ("Richtig eingesetzt...") dan ungkapan formal ("angesichts der technischen Realität") memberikan bobot akademik yang kuat pada tulisan B2.',
        points: 35,
      },
    ],
  },

  // ================= GRAMMATIK B2 (3) =================
  {
    id: 'b2-grammatik-1',
    level: 'B2',
    skill: 'grammatik',
    topic: 'Argumentation',
    title: 'Zweiteilige Konnektoren und Genitivpräpositionen',
    subtitle: 'Komplexe logische Beziehungen präzise formulieren',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 15,
    formatLabel: 'Grammatik · Konnektoren & Genitiv',
    instructions: 'Wähle die grammatisch und inhaltlich passende Ergänzung.',
    questions: [
      {
        id: 'b2-gram-1-q1',
        type: 'multiple-choice',
        question: '___ der starken Regenfälle fand das Stadtfest im Freien statt.',
        options: ['Trotz', 'Wegen', 'Infolge'],
        correctAnswer: 'Trotz',
        explanationId:
          'Ada kontras antara hujan deras dan acara tetap berlangsung di luar ruangan, sehingga preposisi Genitiv yang tepat adalah "Trotz" (meskipun).',
        points: 10,
      },
      {
        id: 'b2-gram-1-q2',
        type: 'multiple-choice',
        question: 'Das neue System ist ___ sehr schnell, ___ noch relativ teuer in der Wartung.',
        options: ['sowohl ... als auch', 'zwar ... aber', 'weder ... noch'],
        correctAnswer: 'zwar ... aber',
        explanationId:
          '"zwar ..., aber ..." digunakan untuk mengakui satu sisi positif lalu membatasinya dengan sisi negatif.',
        points: 10,
      },
    ],
  },
  {
    id: 'b2-grammatik-2',
    level: 'B2',
    skill: 'grammatik',
    topic: 'Kommunikation',
    title: 'Konjunktiv I (Indirekte Rede) und Passiv mit Modalverben',
    subtitle: 'Aussagen Dritter objektiv wiedergeben',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 15,
    formatLabel: 'Grammatik · Indirekte Rede',
    instructions: 'Wähle die korrekte Form für die indirekte Rede bzw. das Passiv.',
    questions: [
      {
        id: 'b2-gram-2-q1',
        type: 'multiple-choice',
        question: 'Die Sprecherin betonte, der Vertrag ___ bereits unterschrieben worden.',
        options: ['sei', 'ist', 'wäre'],
        correctAnswer: 'sei',
        explanationId:
          'Dalam bahasa berita dan laporan resmi (indirekte Rede), kata kerja bantu "sein" pada Konjunktiv I orang ketiga tunggal berbentuk "sei".',
        points: 10,
      },
      {
        id: 'b2-gram-2-q2',
        type: 'fill-blank',
        question: 'Passiv mit Modalverb: Der Antrag muss bis Freitag eingereicht ___.',
        correctAnswer: 'werden',
        acceptableAnswers: ['werden'],
        explanationId:
          'Pola Passiv dengan Modalverb adalah: Modalverb + ... + Partizip II + werden (di paling akhir kalimat).',
        points: 10,
      },
    ],
  },
  {
    id: 'b2-grammatik-3',
    level: 'B2',
    skill: 'grammatik',
    topic: 'Wirtschaft',
    title: 'Nominalisierung und Partizipialattribute',
    subtitle: 'Nebensätze kompakt in Nominalgruppen umwandeln',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 15,
    formatLabel: 'Grammatik · Stilistik B2',
    instructions: 'Bestimme das richtige Partizip oder Nomen.',
    questions: [
      {
        id: 'b2-gram-3-q1',
        type: 'multiple-choice',
        question: 'Die ___ Energiepreise stellen viele Betriebe vor Probleme. (steigen, aktiv gleichzeitig)',
        options: ['steigenden', 'gestiegenen', 'steigende'],
        correctAnswer: 'steigenden',
        explanationId:
          'Proses yang sedang berlangsung secara aktif menggunakan Partizip I ("steigend"), dan setelah artikel jamak "Die" mendapat akhiran "-en": die steigenden Energiepreise.',
        points: 10,
      },
      {
        id: 'b2-gram-3-q2',
        type: 'multiple-choice',
        question: 'Das gestern ___ Problem konnte rasch behoben werden. (lösen, passiv abgeschlossen)',
        options: ['lösende', 'gelöste', 'gelösten'],
        correctAnswer: 'gelöste',
        explanationId:
          'Tindakan pasif yang sudah selesai memakai Partizip II ("gelöst"). Setelah artikel netral "Das" bentuk akhirnya adalah "-e": das gelöste Problem.',
        points: 10,
      },
    ],
  },

  // ================= WORTSCHATZ B2 (3) =================
  {
    id: 'b2-wortschatz-1',
    level: 'B2',
    skill: 'wortschatz',
    topic: 'Wirtschaft',
    title: 'Wirtschaft, Markt und Wettbewerb',
    subtitle: 'Gehobene Fachbegriffe für Texte und Diskussionen',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 12,
    formatLabel: 'Wortschatz · Zuordnung',
    instructions: 'Ordne die Wirtschaftsbegriffe den passenden Bedeutungen zu.',
    questions: [
      {
        id: 'b2-wort-1-q1',
        type: 'matching',
        question: 'Ordne die deutschen Fachbegriffe zu.',
        translationDirection: 'de-to-id',
        matchingPairs: [
          { left: 'die Nachfrage', right: 'permintaan pasar' },
          { left: 'der Umsatz', right: 'omzet / pendapatan kotor' },
          { left: 'die Investition', right: 'investasi' },
          { left: 'konkurrenzfähig', right: 'mampu bersaing' },
        ],
        explanationId:
          'Istilah ekonomi ini sering muncul dalam teks bacaan dan soal menulis tingkat B2.',
        points: 20,
      },
    ],
  },
  {
    id: 'b2-wortschatz-2',
    level: 'B2',
    skill: 'wortschatz',
    topic: 'Technologie',
    title: 'Digitalisierung und Datenschutz',
    subtitle: 'Präzise Nomen-Verb-Verbindungen nutzen',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 12,
    formatLabel: 'Wortschatz · Multiple-Choice & Lückentext',
    instructions: 'Ergänze die passenden Wörter zum Thema Technologie.',
    questions: [
      {
        id: 'b2-wort-2-q1',
        type: 'multiple-choice',
        question: 'Was bedeutet „der Datenschutz“ auf Indonesisch?',
        translationDirection: 'de-to-id',
        options: ['perlindungan data', 'kecepatan internet', 'penyimpanan awan'],
        correctAnswer: 'perlindungan data',
        explanationId:
          '"der Schutz" berarti perlindungan, dan "die Daten" berarti data → der Datenschutz = perlindungan data.',
        points: 10,
      },
      {
        id: 'b2-wort-2-q2',
        type: 'fill-blank',
        question: 'Nomen-Verb-Verbindung: Wir müssen eine Entscheidung ___. (mengambil keputusan)',
        correctAnswer: 'treffen',
        acceptableAnswers: ['treffen'],
        explanationId:
          'Kolokasi baku dalam bahasa Jerman untuk mengambil keputusan adalah "eine Entscheidung treffen" (bukan *machen* atau *nehmen*).',
        points: 10,
      },
    ],
  },
  {
    id: 'b2-wortschatz-3',
    level: 'B2',
    skill: 'wortschatz',
    topic: 'Argumentation',
    title: 'Differenzierte Verben für Stellungnahmen',
    subtitle: 'Meinungen nuanciert ausdrücken',
    difficulty: 'Anspruchsvoll',
    durationMinutes: 12,
    formatLabel: 'Wortschatz · Übersetzung',
    instructions: 'Wähle oder ergänze das treffende B2-Verb.',
    questions: [
      {
        id: 'b2-wort-3-q1',
        type: 'short-answer',
        question: 'Welches deutsche Verb bedeutet „menimbang-nimbang“ (Chancen und Risiken ___)?',
        translationDirection: 'id-to-de',
        correctAnswer: 'abwägen',
        acceptableAnswers: ['abwägen'],
        explanationId:
          '"Chancen und Risiken abwägen" berarti menimbang peluang dan risiko secara cermat.',
        points: 10,
      },
      {
        id: 'b2-wort-3-q2',
        type: 'multiple-choice',
        question: 'Welches Verb passt? Man muss verschiedene Aspekte ___. (mempertimbangkan)',
        options: ['berücksichtigen', 'verzichten', 'bestreiten'],
        correctAnswer: 'berücksichtigen',
        explanationId:
          '"etwas berücksichtigen" berarti mempertimbangkan atau memperhitungkan sesuatu.',
        points: 10,
      },
    ],
  },
];
