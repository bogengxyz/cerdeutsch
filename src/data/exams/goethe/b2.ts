import { ExamConfiguration } from '../../../types/exam';
import { buildSpeakingRubric, buildWritingRubric } from '../rubrics';

export const GOETHE_B2_EXAM: ExamConfiguration = {
  id: 'goethe-b2',
  provider: 'goethe',
  level: 'B2',
  officialName: 'Goethe-Zertifikat B2',
  totalDurationMinutes: 195,
  totalPoints: 400,
  moduleIndependence: 'per-module',
  perModulePassingPercent: 60,
  passingRuleSummaryDe:
    'Modulare Prüfung: Alle vier Module (Lesen, Hören, Schreiben, Sprechen) werden unabhängig mit je 100 Punkten bewertet; bestanden ab 60 Punkten (60 %) pro Modul.',
  passingRuleSummaryId:
    'Goethe-Zertifikat B2 bersifat modular: setiap modul (Lesen, Hören, Schreiben, Sprechen) bernilai 100 poin dan harus mencapai minimal 60 poin (60%) secara terpisah agar lulus.',
  formatNotesDe:
    'Lesen (65 Min., 5 Teile, 100 Pkt.), Hören (40 Min., 4 Teile, 100 Pkt.), Schreiben (75 Min., 2 Teile, 100 Pkt.), Sprechen (15 Min., 2 Teile, 100 Pkt.).',
  verificationSource: 'goethe.de — Prüfungsordnung & Durchführungsbestimmungen Goethe-Zertifikat B2 (modulares Format)',
  lastVerifiedDate: '2026-11-22',
  modules: [
    {
      moduleKey: 'lesen',
      titleDe: 'Lesen',
      officialModuleTitleDe: 'Modul Lesen (Goethe B2)',
      durationMinutes: 65,
      officialPoints: 100,
      passingPoints: 60,
      instructionsDe:
        'Das Modul Lesen umfasst anspruchsvolle Kommentare, Fachartikel und Meinungsbeiträge aus Gesellschaft, Wirtschaft und Wissenschaft.',
      sections: [
        {
          id: 'g-b2-lesen-t1',
          titleDe: 'Teil 1 & 2: Gesellschaft & Arbeitswelt',
          subtitleDe: 'Zuordnung & Detailverstehen',
          instructionsDe: 'Analysiere die Standpunkte genau und achte auf feine Nuancen.',
          durationMinutes: 30,
          points: 50,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-b2-l-1',
              partLabelDe: 'Lesen · Teil 1',
              type: 'text-matching',
              passageTitleDe: 'Vier Stimmen zur Vier-Tage-Woche',
              passageTypeDe: 'Stellungnahmen',
              passageDe:
                'Person A (Dr. Lorenz, Ökonom): „Produktivität steigt nur dort, wo Arbeitsabläufe gleichzeitig digitalisiert werden; pauschale Arbeitszeitverkürzung schwächt hingegen Engpassberufe.“ | Person B (Svenja, Pflegekraft): „Im Schichtdienst fehlt uns nicht ein freier Freitag, sondern verlässliche Dienstpläne ohne kurzfristige Überstunden.“ | Person C (Tarek, IT-Leiter): „Seit wir freitags nur noch Notfälle abdecken, gehen deutlich weniger Krankschreibungen ein.“',
              promptDe: 'Ordne die Aussagen den passenden Personen zu.',
              matchingPairs: [
                { left: 'Sieht weniger Krankheitstage als positiven Effekt.', right: 'Person C' },
                { left: 'Betont Planbarkeit statt eines einzelnen freien Tages.', right: 'Person B' },
                { left: 'Warnt vor Problemen in Branchen mit Personalmangel.', right: 'Person A' },
              ],
              matchingRightChoices: ['Person A', 'Person B', 'Person C'],
              points: 25,
              isEstimatedPracticePoints: true,
              explanationId:
                'Person C menyebut penurunan izin sakit (weniger Krankschreibungen). Person B menekankan jadwal kerja yang pasti (verlässliche Dienstpläne). Person A memperingatkan sektor dengan kekurangan tenaga kerja (Engpassberufe).',
              keyVocabulary: [
                { de: 'der Engpassberuf', id: 'profesi dengan kekurangan tenaga kerja' },
                { de: 'die Krankschreibung', id: 'surat keterangan sakit' },
              ],
            },
            {
              id: 'g-b2-l-2',
              partLabelDe: 'Lesen · Teil 2',
              type: 'single-choice',
              passageTitleDe: 'Mikroplastik in städtischen Gewässern',
              passageTypeDe: 'Wissenschaftsartikel',
              passageDe:
                'Lange galt vor allem der Verpackungsmüll als Hauptquelle für Mikroplastik in Flüssen. Neuere Messungen zeigen jedoch, dass Reifenabrieb im Straßenverkehr einen mindestens ebenso großen Anteil ausmacht. Kommunen testen daher spezielle Filterbecken entlang stark befahrener Bundesstraßen, bevor Regenwasser in Flüsse gelangt.',
              promptDe: 'Welche neue Erkenntnis hebt der Text hervor?',
              options: [
                'Der Abrieb von Autoreifen trägt erheblich zur Belastung bei.',
                'Verpackungsmüll gelangt inzwischen nicht mehr in Flüsse.',
                'Filterbecken entlang von Straßen haben sich als wirkungslos erwiesen.',
              ],
              correctAnswer: 'Der Abrieb von Autoreifen trägt erheblich zur Belastung bei.',
              points: 25,
              isEstimatedPracticePoints: true,
              explanationId:
                'Teks menekankan temuan baru („Neuere Messungen zeigen jedoch“), yaitu gesekan ban kendaraan (Reifenabrieb) menyumbang porsi yang sama besarnya dengan sampah kemasan.',
            },
          ],
        },
        {
          id: 'g-b2-lesen-t3',
          titleDe: 'Teil 3–5: Argumentation & Textstruktur',
          subtitleDe: 'Textrekonstruktion und Sprachlogik',
          instructionsDe: 'Vervollständige den Textzusammenhang und prüfe komplexe Aussagen.',
          durationMinutes: 35,
          points: 50,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-b2-l-3',
              partLabelDe: 'Lesen · Teil 3',
              type: 'dropdown',
              passageTitleDe: 'Chancen urbaner Begrünung',
              passageTypeDe: 'Fachkommentar',
              passageDe: 'Wähle die präzisen Konnektoren und Nomen-Verb-Verbindungen im Kontext.',
              promptDe: 'Ergänze den Kommentar fachsprachlich korrekt.',
              blankFields: [
                {
                  id: 'g-b2-b1',
                  labelDe: 'Dachgärten leisten einen wichtigen Beitrag zur Kühlung, ______ sie Regenwasser speichern.',
                  options: ['indem', 'obwohl', 'sobald'],
                  correctAnswer: 'indem',
                },
                {
                  id: 'g-b2-b2',
                  labelDe: 'Viele Städte stellen jedoch zu wenig Fördermittel ______.',
                  options: ['zur Verfügung', 'in Frage', 'zum Ausdruck'],
                  correctAnswer: 'zur Verfügung',
                },
              ],
              points: 25,
              isEstimatedPracticePoints: true,
              explanationId:
                '„indem“ menyatakan cara/metode (dengan cara menyimpan air hujan). „zur Verfügung stellen“ adalah Nomen-Verb-Verbindung B2 yang berarti menyediakan (dana subsidi).',
              grammarNoteId: 'Konnektor modal „indem“ (dengan cara) + verba akhir.',
            },
            {
              id: 'g-b2-l-4',
              partLabelDe: 'Lesen · Teil 5',
              type: 'multiple-select',
              passageTitleDe: 'Verhaltensregeln im Universitätslabor',
              passageTypeDe: 'Laborordnung',
              passageDe:
                'Der Zutritt zu den Chemielaboren ist ausschließlich nach vorheriger Sicherheitsunterweisung gestattet. Schutzbrillen und Laborkittel sind während des gesamten Aufenthalts zu tragen. Private Getränke dürfen weder gelagert noch konsumiert werden.',
              promptDe: 'Welche zwei Regeln gelten verbindlich laut Laborordnung?',
              options: [
                'Ohne Sicherheitsunterweisung darf niemand das Labor betreten.',
                'Im Labor gilt ein striktes Trinkverbot für private Getränke.',
                'Schutzbrillen müssen nur beim Mischen von Säuren getragen werden.',
                'Kittel können erst nach dem Experiment angezogen werden.',
              ],
              correctAnswer: [
                'Ohne Sicherheitsunterweisung darf niemand das Labor betreten.',
                'Im Labor gilt ein striktes Trinkverbot für private Getränke.',
              ],
              points: 25,
              isEstimatedPracticePoints: true,
              explanationId:
                'Akses hanya diizinkan setelah pengarahan keselamatan („nach vorheriger Sicherheitsunterweisung“) dan minuman pribadi dilarang disimpan maupun diminum („weder gelagert noch konsumiert“).',
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'hoeren',
      titleDe: 'Hören',
      officialModuleTitleDe: 'Modul Hören (Goethe B2)',
      durationMinutes: 40,
      officialPoints: 100,
      passingPoints: 60,
      instructionsDe:
        'Das Modul Hören prüft das Verständnis längerer Podcasts, Rundfunkbeiträge und Fachinterviews.',
      sections: [
        {
          id: 'g-b2-hoeren-t1',
          titleDe: 'Teil 1 & 2: Podcast & Fachgespräch',
          subtitleDe: 'Argumente und Positionen erfassen',
          instructionsDe: 'Beantworte die Aufgaben zu den Hörbeiträgen.',
          durationMinutes: 40,
          points: 100,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-b2-h-1',
              partLabelDe: 'Hören · Teil 1',
              type: 'single-choice',
              promptDe: 'Worin sieht der Stadtplaner das größte Hindernis beim Ausbau des Nahverkehrs?',
              options: [
                'In langwierigen Genehmigungsverfahren zwischen verschiedenen Behörden',
                'Im mangelnden Interesse der Fahrgäste an Straßenbahnen',
                'In zu niedrigen Ticketpreisen im Stadtgebiet',
              ],
              correctAnswer: 'In langwierigen Genehmigungsverfahren zwischen verschiedenen Behörden',
              points: 50,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/goethe/b2/teil1-alltag-podcast.mp3',
                status: 'missing',
                titleDe: 'Wissenschaftspodcast: Mobilität der Zukunft',
                durationLabel: '1:50',
                playLimit: 1,
                transcriptDe:
                  'Host: Woran scheitert ein schnellerer Ausbau neuer Straßenbahnlinien? | Planer: An der Nachfrage liegt es sicher nicht — die Züge sind voll. Das Hauptproblem sind vielmehr extrem langwierige Abstimmungen und Genehmigungen zwischen Land, Kreis und Kommune.',
              },
              explanationId:
                'Perencana tata kota menegaskan bahwa masalah utama bukan kurangnya minat penumpang, melainkan koordinasi dan prosedur izin yang berlarut-larut antarinstansi („langwierige Abstimmungen und Genehmigungen“).',
            },
            {
              id: 'g-b2-h-2',
              partLabelDe: 'Hören · Teil 2',
              type: 'single-choice',
              promptDe: 'Welche Maßnahme empfiehlt die Arbeitsforscherin für Weiterbildungen im Betrieb?',
              options: [
                'Lernzeit fest innerhalb der bezahlten Arbeitszeit einzuplanen',
                'Seminare grundsätzlich auf das Wochenende zu verlegen',
                'Kurse ohne Rücksprache mit den Teams einzuführen',
              ],
              correctAnswer: 'Lernzeit fest innerhalb der bezahlten Arbeitszeit einzuplanen',
              points: 50,
              isEstimatedPracticePoints: true,
              audio: {
                url: '/audio/exams/goethe/b2/teil2-fachgespraech.mp3',
                status: 'missing',
                titleDe: 'Fachinterview: Lebenslanges Lernen im Beruf',
                durationLabel: '2:10',
                playLimit: 2,
                transcriptDe:
                  'Interviewer: Wie motiviert man Beschäftigte zu Fortbildungen? | Forscherin: Wenn Weiterbildung als unbezahlte Zusatzpflicht am Feierabend erwartet wird, sinkt die Akzeptanz. Erfolgreiche Firmen reservieren dafür feste Zeitfenster während der regulären Arbeitszeit.',
              },
              explanationId:
                'Peneliti menyarankan perusahaan menyediakan slot waktu tetap di dalam jam kerja reguler („feste Zeitfenster während der regulären Arbeitszeit“).',
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'schreiben',
      titleDe: 'Schreiben',
      officialModuleTitleDe: 'Modul Schreiben (Goethe B2)',
      durationMinutes: 75,
      officialPoints: 100,
      passingPoints: 60,
      instructionsDe:
        'Das Modul Schreiben besteht aus zwei Teilen: Teil 1 (Forumsbeitrag zur gesellschaftlichen Debatte, ca. 150 Wörter) und Teil 2 (formelle Nachricht an Vorgesetzte/Behörden, ca. 100 Wörter).',
      sections: [
        {
          id: 'g-b2-schreiben-t1',
          titleDe: 'Teil 1: Argumentativer Forumsbeitrag',
          subtitleDe: 'Mindestens 150 Wörter',
          instructionsDe: 'Schreibe einen differenzierten Beitrag mit allen vier Leitpunkten.',
          durationMinutes: 50,
          points: 65,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-b2-s-1',
              partLabelDe: 'Schreiben · Teil 1',
              type: 'forum-post',
              promptDe:
                'Thema: „Sollte der öffentliche Nahverkehr in Großstädten kostenlos sein?“\n• Äußern Sie Ihre Meinung zu diesem Vorschlag.\n• Nennen Sie Gründe, warum kostenlose Tickets sinnvoll sein können.\n• Nennen Sie alternative Möglichkeiten zur Entlastung des Straßenverkehrs.\n• Beschreiben Sie Vor- oder Nachteile solcher Alternativen.',
              wordCountRange: { min: 150, max: 230 },
              points: 65,
              isEstimatedPracticePoints: true,
              explanationId:
                'Pada Goethe B2 Teil 1 (~150 kata), gunakan ragam bahasa baku, konektor bertingkat („einerseits ... andererseits“, „darüber hinaus“, „infolgedessen“), dan argumen seimbang sebelum menyimpulkan.',
              sampleAnswerDe:
                'In der aktuellen Debatte über nachhaltige Mobilität gewinnt die Forderung nach einem kostenlosen Nahverkehr zunehmend an Bedeutung. Meiner Ansicht nach wäre ein völlig gebührenfreier Nahverkehr zwar ein starkes Signal, stößt jedoch auf erhebliche finanzielle Grenzen.\n\nEinerseits würde der Wegfall von Ticketpreisen insbesondere Haushalte mit geringerem Einkommen entlasten und könnte Autofahrer zum Umstieg bewegen. Andererseits benötigen Verkehrsbetriebe enorme Mittel für Wartung, Personal und den Ausbau neuer Linien. Fehlt dieses Geld, drohen sinkende Qualität und überfüllte Züge.\n\nEine sinnvolle Alternative stellen stark vergünstigte Jahrestickets in Kombination mit dichteren Taktzeiten sowie dem Ausbau sicherer Fahrradwege dar. Diese Lösung bietet einerseits verlässliche Einnahmen für Investitionen, setzt andererseits aber politischen Willen zur Priorisierung des öffentlichen Raums voraus.',
              sampleTranslationId:
                'Dalam perdebatan mobilitas berkelanjutan, tuntutan transportasi umum gratis kian menguat. Menurut pandangan saya hal tersebut sinyal kuat, namun menghadapi batas finansial besar... Di satu sisi meringankan rumah tangga berpenghasilan rendah, di sisi lain perusahaan transportasi butuh dana perawatan. Alternatifnya adalah tiket tahunan bersubsidi dan jalur sepeda yang aman.',
              rubricCriteria: buildWritingRubric(65),
            },
          ],
        },
        {
          id: 'g-b2-schreiben-t2',
          titleDe: 'Teil 2: Formelle E-Mail am Arbeitsplatz',
          subtitleDe: 'Mindestens 100 Wörter',
          instructionsDe: 'Formulieren Sie eine professionelle und lösungsorientierte E-Mail.',
          durationMinutes: 25,
          points: 35,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-b2-s-2',
              partLabelDe: 'Schreiben · Teil 2',
              type: 'email-writing',
              promptDe:
                'In Ihrem Büro funktioniert die Klimaanlage seit einer Woche nicht richtig, sodass es im Arbeitsraum zu warm ist. Schreiben Sie an Ihre Teamleiterin Frau Dr. Berg:\n• Beschreiben Sie das Problem genau.\n• Bitten Sie um Verständnis für Ihre Anfrage.\n• Machen Sie konkrete Vorschläge zur Überbrückung.\n• Bitten Sie um eine baldige Rückmeldung.',
              wordCountRange: { min: 95, max: 150 },
              points: 35,
              isEstimatedPracticePoints: true,
              explanationId:
                'Teil 2 B2 menilai kesantunan profesional (Konjunktiv II seperti „wäre es möglich“, „könnten Sie“), pemaparan masalah yang objektif tanpa nada marah, dan solusi praktis.',
              sampleAnswerDe:
                'Sehr geehrte Frau Dr. Berg,\n\nich wende mich heute wegen der technischen Situation in unserem Großraumbüro an Sie. Seit vergangenem Montag lässt sich die Klimaanlage in Raum 308 nicht mehr regulieren, weshalb die Raumtemperatur am Nachmittag regelmäßig über 29 Grad steigt. Dadurch lässt unsere Konzentration bei längeren Besprechungen spürbar nach.\n\nIch hoffe sehr auf Ihr Verständnis, dass ich mich mit diesem Anliegen direkt an Sie wende. Bis die Hausverwaltung den Defekt behoben hat, könnten wir möglicherweise vorübergehend zwei Ventilatoren aufstellen oder an besonders heißen Tagen teilweise im Homeoffice arbeiten.\n\nÜber eine kurze Rückmeldung, welche Übergangslösung für Sie infrage kommt, würde ich mich sehr freuen.\n\nMit freundlichen Grüßen\nRama Wijaya',
              sampleTranslationId:
                'Yth. Ibu Dr. Berg, saya menghubungi Anda terkait kondisi teknis di ruang kerja kami. Sejak Senin lalu AC di ruang 308 tidak dapat diatur sehingga suhu naik di atas 29 derajat... Sambil menunggu perbaikan, mungkin kita dapat memasang kipas sementara atau bekerja dari rumah. Terima kasih atas tanggapannya.',
              rubricCriteria: buildWritingRubric(35),
            },
          ],
        },
      ],
    },
    {
      moduleKey: 'sprechen',
      titleDe: 'Sprechen',
      officialModuleTitleDe: 'Modul Sprechen (Goethe B2)',
      durationMinutes: 15,
      officialPoints: 100,
      passingPoints: 60,
      instructionsDe:
        'Das Modul Sprechen umfasst Teil 1 (Kurzvortrag zu einem gesellschaftlichen Thema, ca. 4 Min.) und Teil 2 (Diskussion mit dem Partner über eine kontroverse Frage, ca. 5 Min.).',
      sections: [
        {
          id: 'g-b2-sprechen-t1',
          titleDe: 'Teil 1 & 2: Vortrag & Debatte',
          subtitleDe: 'Differenziert argumentieren und abwägen',
          instructionsDe: 'Halte zunächst den Kurzvortrag und reagiere danach auf Gegenargumente.',
          durationMinutes: 15,
          points: 100,
          isEstimatedPracticePoints: true,
          questions: [
            {
              id: 'g-b2-sp-1',
              partLabelDe: 'Sprechen · Teil 1 & 2',
              type: 'speaking-prompt',
              promptDe:
                'Teil 1 (Vortrag): „Arbeitsplatzwechsel: Sollte man alle paar Jahre den Arbeitgeber wechseln?“ (Verschiedene Möglichkeiten darstellen → eine Option näher erläutern → Vor- und Nachteile abwägen).\nTeil 2 (Diskussion): „Sollten Unternehmen eine feste Quote für Homeoffice einführen?“',
              preparationSeconds: 180,
              speakingSeconds: 360,
              partnerPromptsDe: [
                'Partner (Teil 2): „Ich bezweifle, dass ein häufiger Jobwechsel wirklich gut für den Lebenslauf ist. Man wirkt schnell unentschlossen.“',
                'Partner (Teil 2): „Wie soll die Einarbeitung neuer Kolleginnen gelingen, wenn alle im Homeoffice sitzen?“',
              ],
              points: 100,
              isEstimatedPracticePoints: true,
              explanationId:
                'Di Goethe B2 Sprechen, gunakan ungkapan penyeimbang argumen: „Dem würde ich entgegenhalten, dass...“, „Das ist zwar ein berechtigter Einwand, dennoch...“, dan simpulkan kompromi di Teil 2.',
              sampleAnswerDe:
                'Teil 1: Ein bewusster Arbeitgeberwechsel bietet die Chance, neue Arbeitsmethoden kennenzulernen und Gehaltssprünge zu erzielen. Gleichzeitig verliert man gewachsene Netzwerke im alten Betrieb. Eine Alternative stellt die interne Weiterentwicklung innerhalb eines größeren Unternehmens dar.\nTeil 2: Da hast du einen wichtigen Punkt angesprochen, allerdings hängt eine gute Einarbeitung eher von klaren Mentoring-Strukturen als von ständiger Anwesenheit ab. Ein Hybridmodell mit drei Präsenztagen könnte beide Interessen verbinden.',
              sampleTranslationId:
                'Bagian 1: Pindah perusahaan memberi peluang mengenal metode kerja baru dan peningkatan gaji, namun kita kehilangan jejaring lama... Bagian 2: Poinmu penting, tetapi proses adaptasi lebih bergantung pada sistem mentoring yang jelas daripada kehadiran penuh.',
              rubricCriteria: buildSpeakingRubric(100),
            },
          ],
        },
      ],
    },
  ],
};
