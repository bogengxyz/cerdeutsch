import { Exercise } from '../../../types/exercise';
import { buildProductiveExercise } from '../helpers';

export const B2_PRODUKTIV_SCHREIBEN: Exercise[] = [
  buildProductiveExercise({
    id: 'qb-b2-sch-001',
    level: 'B2',
    skill: 'schreiben',
    topic: 'Argumentation',
    title: 'Stellungnahme: „Homeoffice-Pflicht oder freiwillige Präsenz im Büro?“',
    subtitle: 'Einen strukturierten Forumsbeitrag mit Abwägung und Lösungsvorschlag schreiben',
    diff: 'Mittel',
    mins: 30,
    format: 'Schreiben · Stellungnahme (Goethe B2 Teil 1)',
    instr: 'Schreibe einen sachlichen Diskussionsbeitrag für ein Online-Magazin (ca. 160–200 Wörter).',
    prompt:
      'In vielen Unternehmen wird diskutiert, ob Beschäftigte an mindestens drei Tagen pro Woche verbindlich ins Büro zurückkehren sollten. Verfasse eine Stellungnahme: 1. Nenne die Argumente der Unternehmen für mehr Präsenz. 2. Stelle die Perspektive der Mitarbeitenden (Flexibilität, Pendelzeit, Konzentration) gegenüber. 3. Entwickle ein ausgewogenes Hybridmodell als eigene Position.',
    explanationDe:
      'Auf B2 werden differenzierte Verknüpfungen („einerseits ... andererseits“, „wenngleich“, „infolgedessen“) sowie ein klarer Aufbau aus Einleitung, Pro/Contra und Fazit erwartet.',
    explanationId:
      'Pada tingkat B2, tulis opini terstruktur memakai konektor kontrastif ("wenngleich", "demgegenüber"), bahas perspektif perusahaan dan karyawan, lalu ajukan solusi hibrida.',
    wordLimit: { min: 140, max: 240 },
    sampleAnswer:
      'In der aktuellen Debatte um hybrides Arbeiten stehen Produktivität und Flexibilität häufig scheinbar im Widerspruch. Unternehmen argumentieren zu Recht, dass spontane Gespräche in der Teeküche, schnelle Abstimmungen und die Einarbeitung neuer Fachkräfte in Präsenz deutlich leichter gelingen. Gerade bei komplexen Projekten lässt sich persönliche Zusammenarbeit nicht vollständig durch Videokonferenzen ersetzen.\n\nDemgegenüber profitieren Beschäftigte im Homeoffice erheblich von wegfallenden Pendelzeiten, ruhigeren Arbeitsphasen ohne Großraumbürolärm und einer besseren Vereinbarkeit von Beruf und Familie. Eine starre Präsenzpflicht an drei festgelegten Tagen birgt zudem das Risiko, qualifizierte Bewerberinnen abzuschrecken, denen zeitliche Souveränität wichtig ist.\n\nDeshalb halte ich verbindliche Team-Ankertage für sinnvoller als eine pauschale Anwesenheitsquote. Wenn Abteilungen beispielsweise dienstags und donnerstags gemeinsam vor Ort zusammenarbeiten und die übrigen Tage flexibel gestalten dürfen, lassen sich Innovation im Team und konzentrierte Einzelarbeit optimal verbinden.',
    checklist: [
      'Einleitung mit Relevanz des Themas formuliert',
      'Unternehmenssicht und Perspektive der Beschäftigten sachlich abgewogen',
      'Mindestens zwei gehobene Konnektoren („demgegenüber“, „zudem“, „deshalb“) verwendet',
      'Konkreten Kompromiss- oder Lösungsvorschlag begründet',
    ],
    rubric: [
      { criterion: 'Inhalt & Argumentationstiefe', descriptionId: 'Argumen perusahaan dan karyawan seimbang serta ditutup usulan solusi konkret.' },
      { criterion: 'Textaufbau & Kohäsion', descriptionId: 'Paragraf rapi dengan penanda wacana B2 yang bervariasi.' },
      { criterion: 'Ausdruck & Korrektheit', descriptionId: 'Kosakata dunia kerja B2 dan struktur kalimat majemuk tepat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b2-sch-002',
    level: 'B2',
    skill: 'schreiben',
    topic: 'Kommunikation',
    title: 'Formelle Beschwerde an eine Sprach- oder Weiterbildungsakademie',
    subtitle: 'Sachlich reklamieren, konkrete Mängel belegen und eine Frist setzen',
    diff: 'Anspruchsvoll',
    mins: 30,
    format: 'Schreiben · Formelle Beschwerde (telc B2)',
    instr: 'Schreibe eine formelle Beschwerde-E-Mail an die Geschäftsführung eines Weiterbildungsinstituts (ca. 160–200 Wörter).',
    prompt:
      'Du hast ein teures Wochenendseminar für Projektmanagement gebucht, aber mehrere zugesagte Leistungen blieben aus (veraltete Unterlagen, ständiger Dozentenwechsel, verspäteter Beginn ohne Ausgleich). Schreibe eine Beschwerde: 1. Nenne Kursdaten und Buchungsumfang. 2. Vergleiche Werbeversprechen und Realität sachlich. 3. Fordere konkret eine Nachbesserung oder anteilige Erstattung mit klarer Frist.',
    explanationDe:
      'Bleibe auch bei berechtigter Verärgerung höflich-bestimmt. Präpositionen mit Genitiv („entgegen Ihrer Zusage“, „aufgrund der Ausfälle“) und Passivformen wirken besonders professionell.',
    explanationId:
      'Jaga nada tetap sopan namun tegas, bandingkan janji penawaran dengan fakta di kelas, dan tetapkan batas tanggal respons yang jelas.',
    wordLimit: { min: 140, max: 240 },
    sampleAnswer:
      'Sehr geehrte Damen und Herren,\n\nam vergangenen Wochenende habe ich an Ihrem Intensivseminar „Agiles Projektmanagement“ zum Preis von 420 Euro teilgenommen. Leider sah ich mich nach Abschluss der Veranstaltung veranlasst, mich über erhebliche Mängel in der Durchführung zu beschweren.\n\nEntgegen Ihrer ausdrücklichen Beschreibung im Kursprogramm wurden uns ausschließlich veraltete Kopien aus dem Jahr 2018 ausgehändigt; der angekündigte Praxisworkshop zur aktuellen Software entfiel ersatzlos. Darüber hinaus begann der Unterricht am Samstag wegen fehlender Raumzuweisung mit vierzig Minuten Verspätung, und die Lehrkraft wechselte am Sonntag unangekündigt ohne inhaltliche Übergabe.\n\nDa zentrale Bestandteile Ihres Angebots somit nicht erfüllt wurden, bitte ich Sie um eine schriftliche Stellungnahme sowie um eine anteilige Rückerstattung von 30 Prozent der Kursgebühr bis spätestens zum 15. dieses Monats. Sollte bis dahin keine zufriedenstellende Lösung gefunden werden, behalte ich mir weitere Schritte vor.\n\nMit freundlichen Grüßen\nHendra Wijaya',
    checklist: [
      'Formelle Anrede, konkreter Anlass und gezahlter Betrag genannt',
      'Mindestens drei Mängel sachlich mit der Zusage kontrastiert',
      'Klare Forderung (Erstattung/Ersatz) mit genauem Datum formuliert',
      'Register konsequent formell gehalten („Sie“, Passiv, Genitivpräpositionen)',
    ],
    rubric: [
      { criterion: 'Register & Angemessenheit', descriptionId: 'Gaya surat keluhan profesional, objektif, dan bebas ungkapan emosional.' },
      { criterion: 'Vollständigkeit der Mängel', descriptionId: 'Seluruh poin kekurangan dan tuntutan kompensasi tercakup lengkap.' },
      { criterion: 'Grammatische Präzision', descriptionId: 'Struktur pasif, preposisi Genitiv, dan koma klausa akurat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b2-sch-003',
    level: 'B2',
    skill: 'schreiben',
    topic: 'Arbeitswelt',
    title: 'Formelle Bitte um Terminverschiebung und Aufgabenübergabe',
    subtitle: 'Einer Projektleitung oder Kundschaft professionell absagen und Alternativen anbieten',
    diff: 'Mittel',
    mins: 25,
    format: 'Schreiben · Formelle Nachricht (Goethe B2 Teil 2)',
    instr: 'Schreibe eine professionelle E-Mail an deine Abteilungsleiterin Frau Dr. Keller (ca. 130–170 Wörter).',
    prompt:
      'Du sollst nächste Woche die Präsentation für einen wichtigen Partnertermin halten, musst aber wegen eines unaufschiebbaren Behördentermins zur Aufenthaltsverlängerung genau zu dieser Uhrzeit abwesend sein. Schreibe Frau Dr. Keller: 1. Erkläre den Anlass sachlich und entschuldige dich für die Umstände. 2. Schlage vor, wie dein Kollege die Präsentation mit deiner Vorbereitung übernehmen kann (oder bitte um Verschiebung). 3. Biete an, alle Folien und Notizen vorher vollständig fertigzustellen.',
    explanationDe:
      'Zeige Verantwortungsbewusstsein, indem du nicht nur ein Problem meldest, sondern gleich eine fertige Übergabelösung präsentierst.',
    explanationId:
      'Sampaikan alasan izin secara transparan dan langsung tawarkan solusi konkret agar tim maupun rapat tetap berjalan lancar.',
    wordLimit: { min: 115, max: 210 },
    sampleAnswer:
      'Sehr geehrte Frau Dr. Keller,\n\nich wende mich heute mit einer dringenden Bitte bezüglich unseres Partnertermins am kommenden Mittwoch um 10:00 Uhr an Sie. Leider habe ich heute Morgen erst eine kurzfristige, verpflichtende Vorladung der Ausländerbehörde genau für diesen Vormittag erhalten, deren Verschiebung eine mehrmonatige Wartezeit bedeuten würde.\n\nEs tut mir sehr leid, dass sich dadurch kurzfristig Überschneidungen ergeben. Um einen reibungslosen Ablauf zu gewährleisten, habe ich bereits mit unserem Kollegen Herrn Weber gesprochen, der alle Projektzahlen kennt und bereit wäre, meinen Part zu übernehmen. Selbstverständlich stelle ich sämtliche Präsentationsfolien sowie ein detailliertes Sprechmanuskript bis Montagabend fertig und gehe alles gemeinsam mit ihm durch. Alternativ könnte der Termin auch auf Donnerstagvormittag verschoben werden.\n\nVielen Dank im Voraus für Ihr Verständnis und eine kurze Rückmeldung, welche Option Sie bevorzugen.\n\nMit freundlichen Grüßen\nDewi Sartika',
    checklist: [
      'Grund der Abwesenheit höflich und nachvollziehbar erklärt',
      'Um Verständnis gebeten ohne Übertreibung',
      'Konkrete Vertretungs- oder Terminlösung angeboten',
      'Konjunktiv II für höfliche Vorschläge richtig verwendet',
    ],
    rubric: [
      { criterion: 'Situationsangemessenheit', descriptionId: 'Nada profesional, bertanggung jawab, dan berorientasi solusi.' },
      { criterion: 'Vollständigkeit', descriptionId: 'Alasan resmi, alternatif kolaborasi, serta kesiapan materi terjawab tuntas.' },
      { criterion: 'Sprache B2', descriptionId: 'Penggunaan Konjunktiv II sopan dan kalimat majemuk akurat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b2-sch-004',
    level: 'B2',
    skill: 'schreiben',
    topic: 'Wirtschaft',
    title: 'Bewerbungsschreiben um ein fachbezogenes Praktikum in Deutschland',
    subtitle: 'Motivation, Qualifikationen und Mehrwert für das Unternehmen überzeugend darstellen',
    diff: 'Anspruchsvoll',
    mins: 30,
    format: 'Schreiben · Bewerbung (telc B2)',
    instr: 'Schreibe ein formelles Anschreiben für eine sechsmonatige Praktikumsstelle (ca. 160–210 Wörter).',
    prompt:
      'Ein mittelständisches Unternehmen für nachhaltige Logistik sucht eine Praktikantin oder einen Praktikanten im Projektmanagement (Deutsch B2, Englisch fließend, erste Teamerfahrung). Schreibe deine Bewerbung: 1. Beziehe dich auf die Ausschreibung und deinen Studien- oder Berufshintergrund. 2. Belege anhand konkreter Erfahrungen, warum du in das Team passt. 3. Nenne dein mögliches Startdatum und bitte um ein Gespräch.',
    explanationDe:
      'Vermeide bloße Behauptungen („Ich bin sehr teamfähig“); nenne kurze Belege („Während meines Studiums koordinierte ich...“).',
    explanationId:
      'Hindari klaim kosong dalam surat lamaran Jerman; sertakan bukti konkret pengalaman proyek atau studi serta motivasi melamar.',
    wordLimit: { min: 140, max: 245 },
    sampleAnswer:
      'Sehr geehrte Damen und Herren,\n\nmit großem Interesse habe ich Ihre Ausschreibung für ein sechsmonatiges Praktikum im Bereich nachhaltige Projektlogistik gelesen, da ich genau in diesem Zukunftssektor meine theoretischen Kenntnisse praxisnah vertiefen möchte.\n\nDerzeit studiere ich Wirtschaftsingenieurwesen im sechsten Semester und habe bereits mehrere Studienprojekte zur Optimierung regionaler Lieferketten geleitet. Dabei übernahm ich nicht nur die Terminplanung und Protokollführung, sondern koordinierte auch den Austausch zwischen internationalen Arbeitsgruppen auf Deutsch und Englisch. Zudem konnte ich während einer dreimonatigen Werkstudententätigkeit erste Erfahrungen im Umgang mit Datenanalysen und Lieferantenkommunikation sammeln. Zuverlässigkeit, strukturiertes Arbeiten und schnelle Auffassungsgabe zeichnen meine Arbeitsweise besonders aus.\n\nDa ich ab dem 1. September vollständig einsatzbereit bin, würde ich Ihr Team sehr gern ab diesem Zeitpunkt unterstützen. Über die Einladung zu einem persönlichen Vorstellungsgespräch freue ich mich sehr.\n\nMit freundlichen Grüßen\nBagus Santoso',
    checklist: [
      'Bezug auf Stellenanzeige und eigenes Fachprofil hergestellt',
      'Mindestens zwei Kompetenzen mit konkreten Erfahrungen belegt',
      'Motivation für genau diese Branche genannt',
      'Startdatum und Wunsch nach einem Vorstellungsgespräch formuliert',
    ],
    rubric: [
      { criterion: 'Überzeugungskraft & Belege', descriptionId: 'Kompetensi dibuktikan melalui pengalaman nyata studi atau magang.' },
      { criterion: 'Bewerbungsstil', descriptionId: 'Ungkapan resmi surat lamaran Jerman digunakan secara alami.' },
      { criterion: 'Grammatik & Lexik', descriptionId: 'Kosa kata manajemen dan struktur kalimat B2 tanpa kesalahan besar.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b2-sch-005',
    level: 'B2',
    skill: 'schreiben',
    topic: 'Umwelt',
    title: 'Leserbrief: „Tempo 30 in Innenstädten – Mehr Lebensqualität oder Verkehrschaos?“',
    subtitle: 'Auf einen Zeitungsartikel reagieren und eigene Argumente fundiert einbringen',
    diff: 'Mittel',
    mins: 28,
    format: 'Schreiben · Leserbrief',
    instr: 'Schreibe einen Leserbrief an die Redaktion einer Tageszeitung (ca. 150–190 Wörter).',
    prompt:
      'In deiner Lokalzeitung erschien ein kritischer Artikel über Pläne für flächendeckendes Tempo 30 in der Innenstadt. Schreibe einen Leserbrief: 1. Beziehe dich konkret auf die Debatte im Artikel. 2. Bewerte Argumente zu Sicherheit, Lärmschutz und Verkehrsfluss. 3. Formuliere eine realistische Empfehlung für den Ausbau von Bus- und Radwegen.',
    explanationDe:
      'Beziehe dich gleich zu Beginn auf den Artikel („Mit großem Interesse habe ich Ihren Beitrag vom ... verfolgt“) und argumentiere sachlich statt polemisch.',
    explanationId:
      'Mulailah dengan merujuk artikel koran terkait, lalu evaluasi aspek keselamatan, kebisingan, serta kelancaran arus lalu lintas secara berimbang.',
    wordLimit: { min: 135, max: 225 },
    sampleAnswer:
      'Sehr geehrte Redaktion,\n\nmit großem Interesse habe ich Ihren gestrigen Beitrag zur geplanten Einführung von Tempo 30 in unserer Innenstadt gelesen. Entgegen der darin geäußerten Sorge vor endlosen Staus halte ich diese Maßnahme für einen längst überfälligen Schritt.\n\nZahlreiche kommunale Erfahrungen belegen, dass geringere Geschwindigkeiten den Verkehrsfluss sogar verstetigen, weil seltener stark abgebremst und beschleunigt werden muss. Entscheidender ist jedoch der Gewinn an Sicherheit: Für Kinder, ältere Menschen und Radfahrende sinkt das Unfallrisiko bei 30 Stundenkilometern drastisch. Gleichzeitig nehmen Verkehrslärm und Feinstaub messbar ab, wovon Geschäfte und Straßencafés im Zentrum profitieren.\n\nNatürlich reicht eine reine Geschwindigkeitsbegrenzung allein nicht aus. Damit mehr Pendler freiwillig auf das Auto verzichten, sollten parallel die Bustaktung verdichtet und baulich getrennte Radwege geschaffen werden. Nur eine solche Doppelstrategie macht unsere Innenstadt langfristig lebenswerter.\n\nMit freundlichen Grüßen\nLarasati Putri',
    checklist: [
      'Bezugnahme auf den Zeitungsartikel im ersten Satz',
      'Vorurteil oder Gegenargument sachlich entkräftet',
      'Konkrete Vorteile (Sicherheit, Lärm, Verkehrsfluss) begründet',
      'Ergänzende Infrastrukturmaßnahme empfohlen',
    ],
    rubric: [
      { criterion: 'Leserbrief-Charakter', descriptionId: 'Rujukan terhadap artikel jelas dan nada argumentasi publik terjaga.' },
      { criterion: 'Argumentationslogik', descriptionId: 'Sanggahan terhadap kekhawatiran kemacetan ditopang alasan logis.' },
      { criterion: 'Wortschatz & Satzbau', descriptionId: 'Istilah lalu lintas perkotaan dan penghubung kalimat B2 akurat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b2-sch-006',
    level: 'B2',
    skill: 'schreiben',
    topic: 'Technologie',
    title: 'Erörterung: „Künstliche Intelligenz an Schulen und Hochschulen“',
    subtitle: 'Chancen, Risiken für eigenständiges Denken und sinnvolle Prüfungsregeln diskutieren',
    diff: 'Anspruchsvoll',
    mins: 30,
    format: 'Schreiben · Pro-Contra-Erörterung',
    instr: 'Schreibe eine strukturierte Stellungnahme zur Nutzung von KI-Textprogrammen im Studium (ca. 160–210 Wörter).',
    prompt:
      'Immer mehr Studierende nutzen digitale Schreib- und Übersetzungswerkzeuge für Hausarbeiten. Nimm Stellung: 1. Welche Lernchancen bieten solche Systeme (z. B. beim Sprachlernen oder der Strukturierung)? 2. Wo liegen Gefahren für wissenschaftliche Redlichkeit und eigene Schreibkompetenz? 3. Wie sollten Hochschulen Prüfungen und Regeln künftig gestalten?',
    explanationDe:
      'Verbinde Pro- und Contra-Blöcke flüssig mit Überleitungen wie „Trotz dieser unbestreitbaren Vorzüge darf nicht übersehen werden, dass...“.',
    explanationId:
      'Bahas peluang belajar dan risiko integritas akademik akibat AI secara berimbang, lalu usulkan aturan atau format evaluasi baru bagi kampus.',
    wordLimit: { min: 140, max: 245 },
    sampleAnswer:
      'Digitale Schreib- und Übersetzungswerkzeuge haben den Studienalltag in kurzer Zeit tiefgreifend verändert. Einerseits bieten sie wertvolle Unterstützung, insbesondere für internationale Studierende: Man kann komplexe Fachtexte verständlicher zusammenfassen lassen, Gliederungsentwürfe testen oder gezielt Grammatikfeedback einholen. Richtig eingesetzt fungieren solche Programme somit als jederzeit erreichbarer Lernassistent.\n\nTrotz dieser unbestreitbaren Vorzüge birgt ein unkritischer Einsatz erhebliche Risiken. Wer ganze Kapitel generieren lässt, umgeht die eigene gedankliche Auseinandersetzung mit Fachliteratur und gefährdet damit sowohl seine Urteilskraft als auch die wissenschaftliche Redlichkeit. Zudem liefern automatisierte Systeme bisweilen fehlerhafte Quellenangaben, die ohne fundiertes Grundwissen kaum auffallen.\n\nAus diesem Grund halte ich pauschale Verbote für wenig wirksam. Sinnvoller wäre es, den transparenten Umgang mit digitalen Werkzeugen verbindlich zu lehren und gleichzeitig Prüfungsformen anzupassen – etwa durch mündliche Verteidigungen, Prozessbegleitung und eigenständige Laborprojekte. So bleibt echtes Verständnis im Mittelpunkt.',
    checklist: [
      'Konkrete Lernvorteile realistisch benannt',
      'Risiken für Eigenständigkeit und Quellenqualität erläutert',
      'Pauschale Verbote kritisch bewertet und Reformvorschlag entwickelt',
      'Passende B2-Nomen-Verb-Verbindungen und Nebensätze verwendet',
    ],
    rubric: [
      { criterion: 'Tiefe der Abwägung', descriptionId: 'Menimbang manfaat asisten belajar dan bahaya ketergantungan secara matang.' },
      { criterion: 'Kohärenz', descriptionId: 'Transisi antar paragraf mengalir mulus tanpa loncatan ide.' },
      { criterion: 'Sprachliche Qualität', descriptionId: 'Kosakata akademik B2 dan tata bahasa kompleks terjaga baik.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b2-sch-007',
    level: 'B2',
    skill: 'schreiben',
    topic: 'Gesellschaft',
    title: 'Vorschlag an die Stadtverwaltung: „Einbindung ehrenamtlicher Helfer im Stadtteil“',
    subtitle: 'Einen konstruktiven Projektvorschlag inklusive Nutzen und Finanzierung einreichen',
    diff: 'Mittel',
    mins: 28,
    format: 'Schreiben · Formeller Vorschlag',
    instr: 'Schreibe einen offiziellen Vorschlag an das Bezirksamt deiner Stadt (ca. 150–195 Wörter).',
    prompt:
      'Viele neue Einwohner und ältere Menschen fühlen sich im Stadtteil isoliert. Schlage der Stadtverwaltung ein Nachbarschaftscafé mit Reparatur- und Lernhilfe vor: 1. Beschreibe deine Beobachtung im Viertel. 2. Stelle Idee, Zielgruppen und ehrenamtliche Organisation vor. 3. Bitte um Räumlichkeiten sowie ein Gespräch zur Umsetzung.',
    explanationDe:
      'Nutze überzeugende finale Strukturen („um ... zu fördern“, „damit ... zusammenfinden“) und höfliche Konjunktiv-II-Bitten.',
    explanationId:
      'Sampaikan gagasan proyek sosial lingkungan secara resmi kepada pemerintah distrik, lengkapi dengan sasaran penerima manfaat dan dukungan ruang yang dibutuhkan.',
    wordLimit: { min: 135, max: 225 },
    sampleAnswer:
      'Sehr geehrte Damen und Herren,\n\nals langjährige Bewohnerin unseres Stadtteils möchte ich Ihnen heute eine Initiative zur Stärkung des sozialen Zusammenhalts vorschlagen. In Gesprächen mit Nachbarinnen fällt immer wieder auf, dass sowohl ältere Alleinstehende als auch neu zugezogene Familien kaum unkomplizierte Begegnungsorte im Viertel finden.\n\nDeshalb regt unsere Nachbarschaftsgruppe an, zweimal monatlich ein offenes „Stadtteil-Café mit Lern- und Reparaturtisch“ einzurichten. Ehrenamtliche Helferinnen könnten dort kostenlose Unterstützung bei kleinen Alltagsreparaturen, digitalen Anträgen sowie Deutsch-Hausaufgaben anbieten, während Nachbarn aller Generationen bei Kaffee ins Gespräch kommen. Ein solches Angebot würde nicht nur Einsamkeit entgegenwirken, sondern auch die Integration vor Ort nachhaltig fördern.\n\nFür den Start benötigen wir lediglich einen barrierefreien Gemeinderaum am Samstagnachmittag sowie Unterstützung bei der Bekanntmachung über den städtischen Aushang. Über einen kurzen Gesprächstermin zur weiteren Planung würde sich unsere Initiative sehr freuen.\n\nMit freundlichen Grüßen\nRatna Dewi',
    checklist: [
      'Gesellschaftliches Problem im Stadtteil konkret geschildert',
      'Ablauf und Nutzen des Projekts klar umrissen',
      'Konkreten Unterstützungsbedarf (Raum, Bekanntmachung) formuliert',
      'Höfliche Schlussbitte um ein Planungsgespräch eingebaut',
    ],
    rubric: [
      { criterion: 'Projektklarheit', descriptionId: 'Konsep kegiatan sosial, kelompok sasaran, dan peran sukarelawan tergambar jelas.' },
      { criterion: 'Persuasion & Stil', descriptionId: 'Gaya surat resmi kepada instansi daerah sopan dan persuasif.' },
      { criterion: 'Sprachliche Korrektheit', descriptionId: 'Klausa tujuan dan kosakata kemasyarakatan tepat.' },
    ],
  }),
];

export const B2_PRODUKTIV_SPRECHEN: Exercise[] = [
  buildProductiveExercise({
    id: 'qb-b2-spr-001',
    level: 'B2',
    skill: 'sprechen',
    topic: 'Bildung',
    title: 'Kurzvortrag: „Mehrsprachigkeit als Schlüsselkompetenz in einer globalisierten Welt“',
    subtitle: 'Goethe B2 Sprechen Teil 1 – strukturierten Vortrag mit Beispielen und Fazit halten',
    diff: 'Mittel',
    mins: 15,
    format: 'Sprechen · Vortrag (Teil 1)',
    instr: 'Bereite dich 3 Minuten vor und halte dann einen frei gesprochenen Vortrag von ca. 4 Minuten.',
    prompt:
      'Halte einen strukturierten Vortrag zum Thema „Mehrsprachigkeit im Beruf und Alltag“: 1. Stelle verschiedene Formen der Mehrsprachigkeit (Familie, Schule, Beruf) vor. 2. Vergleiche konkrete Vorteile für Karriere und interkulturelles Verständnis. 3. Nenne mögliche Hürden beim Sprachenlernen und ziehe ein klares Fazit.',
    explanationDe:
      'Gliedere den Vortrag hörbar in Einleitung, Hauptpunkte, Abwägung und Schluss; benenne konkrete Beispiele aus dem Alltag.',
    explanationId:
      'Susun presentasi B2 dengan pembukaan menarik, bahas jenis dan manfaat multibahasa, jelaskan tantangannya, lalu tutup dengan kesimpulan kuat.',
    prepSeconds: 180,
    speakSeconds: 240,
    sampleAnswer:
      'Guten Tag! In meinem heutigen Vortrag beschäftige ich mich mit der Frage, warum Mehrsprachigkeit weit mehr ist als nur ein Pluspunkt im Lebenslauf. Viele Menschen wachsen bereits zweisprachig in ihren Familien auf, andere eignen sich Englisch, Deutsch oder weitere Sprachen gezielt in der Schule und für internationale Berufe an. Auf dem Arbeitsmarkt eröffnet diese Fähigkeit enorme Chancen: Wer mehrere Sprachen beherrscht, versteht Kundinnen direkter, vermeidet Missverständnisse in globalen Projekten und bewegt sich souveräner zwischen verschiedenen Arbeitskulturen. Darüber hinaus schult jede neue Sprache die geistige Flexibilität und Empathie, weil man Sachverhalte aus unterschiedlichen Perspektiven betrachten lernt. Natürlich erfordert echtes Sprachniveau viel Ausdauer, regelmäßige Praxis und Mut, Fehler zuzulassen – oft fehlt im Berufsalltag schlicht die Zeit. Dennoch bin ich überzeugt, dass gezielte Förderung von Mehrsprachigkeit bereits ab der Grundschule unverzichtbar bleibt. Zusammenfassend lässt sich festhalten, dass Sprachen keine Hürde, sondern eine der wertvollsten Brücken unserer vernetzten Welt darstellen.',
    checklist: [
      'Thema attraktiv eingeleitet und Ziel des Vortrags benannt',
      'Mindestens zwei Vorteile (Beruf, Kultur/Kognition) mit Beispielen erklärt',
      'Herausforderungen beim Lernen realistisch erwähnt',
      'Deutliches Schlussfazit gesprochen',
    ],
    rubric: [
      { criterion: 'Aufbau & Kohärenz', descriptionId: 'Alur presentasi logis dengan penanda transisi yang jelas.' },
      { criterion: 'Wortschatz B2', descriptionId: 'Penggunaan kosakata abstrak tentang bahasa dan karier bervariasi.' },
      { criterion: 'Aussprache & Flüssigkeit', descriptionId: 'Tempo teratur, intonasi mantap, dan artikulasi jelas.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b2-spr-002',
    level: 'B2',
    skill: 'sprechen',
    topic: 'Umwelt',
    title: 'Kontroverse Diskussion: „Sollte der öffentliche Nahverkehr komplett kostenlos sein?“',
    subtitle: 'Goethe B2 Sprechen Teil 2 – Position vertreten, auf Gegenargumente reagieren, Kompromiss finden',
    diff: 'Anspruchsvoll',
    mins: 15,
    format: 'Sprechen · Diskussion (Teil 2)',
    instr: 'Formuliere eine fundierte mündliche Pro-/Contra-Diskussion (ca. 3–4 Minuten).',
    prompt:
      'Diskutiere die Frage eines kostenlosen Nahverkehrs in Großstädten: 1. Welche Umwelt- und Sozialvorteile brächte ein Nulltarif? 2. Welche Finanzierungs- und Qualitätsprobleme sehen Kritikerinnen (Überfüllung, fehlendes Geld für neue Linien)? 3. Welchen tragfähigen Kompromiss (z. B. günstiges Deutschlandticket oder kostenfreie Wochenenden) schlägst du vor?',
    explanationDe:
      'Übe Reaktionen auf Gegenpositionen („Da stimme ich Ihnen teilweise zu, gebe jedoch zu bedenken, dass...“) und belege jeden Punkt kurz.',
    explanationId:
      'Latih ungkapan menanggapi sanggahan secara konstruktif, bahas aspek anggaran dan kapasitas, lalu ajukan kompromi yang realistis.',
    prepSeconds: 120,
    speakSeconds: 210,
    sampleAnswer:
      'Die Idee eines völlig kostenlosen Nahverkehrs klingt auf den ersten Blick sozial gerecht und ökologisch sinnvoll. Wenn niemand mehr Fahrkarten kaufen müsste, könnten einkommensschwache Haushalte erheblich entlastet werden, und deutlich mehr Menschen würden beim Einkaufen oder Pendeln auf Bus und Bahn umsteigen. Auf der anderen Seite darf man das Finanzierungsproblem nicht unterschätzen: Ohne Ticketeinnahmen müssten Kommunen enorme Summen über Steuern aufbringen, und Studien zeigen, dass ein Nulltarif allein Autofahrende kaum überzeugt, solange Züge auf dem Land unpünktlich bleiben oder zu selten fahren. Deshalb überzeugt mich ein gestufter Kompromiss am meisten: Ein preisgünstiges Monatsticket für alle sowie kostenfreie Fahrten für Schülerinnen, Studierende und Rentnerinnen, während die dadurch stabilen Mittel gezielt in dichtere Takte und moderne Züge fließen.',
    checklist: [
      'Soziale und ökologische Argumente für kostenfreien ÖPNV benannt',
      'Gegenargumente (Finanzierung, Netzausbau, Taktqualität) sachlich eingebaut',
      'Überzeugende Kompromisslösung entwickelt',
    ],
    rubric: [
      { criterion: 'Interaktive Argumentation', descriptionId: 'Mampu mengakui argumen lawan sambil mempertahankan solusi seimbang.' },
      { criterion: 'Sprachliche Mittel', descriptionId: 'Konektor konsesif dan Konjunktiv II ("müssten", "könnten") tepat.' },
      { criterion: 'Überzeugungskraft', descriptionId: 'Usulan kompromi realistis dan terstruktur rapi.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b2-spr-003',
    level: 'B2',
    skill: 'sprechen',
    topic: 'Technologie',
    title: 'Kurzvortrag: „Chancen und Risiken flexibler Arbeitszeitmodelle“',
    subtitle: 'Viertagewoche, Vertrauensarbeitszeit und Entgrenzung kritisch beleuchten',
    diff: 'Mittel',
    mins: 15,
    format: 'Sprechen · Vortrag (Teil 1)',
    instr: 'Bereite dich 3 Minuten vor und halte einen strukturierten Kurzvortrag (ca. 4 Minuten).',
    prompt:
      'Stelle flexible Arbeitszeitmodelle wie die Viertagewoche oder Gleitzeit vor: 1. Warum fordern immer mehr Beschäftigte flexiblere Modelle? 2. Welche wirtschaftlichen Vorteile und organisatorischen Hürden erleben Betriebe? 3. Welche Regeln schützen Beschäftigte vor Überlastung?',
    explanationDe:
      'Strukturiere sauber zwischen Perspektive der Angestellten, Sicht der Betriebe und Schutzregeln.',
    explanationId:
      'Bandingkan motivasi karyawan dengan tantangan operasional perusahaan, lalu tutup dengan aturan perlindungan jam kerja.',
    prepSeconds: 180,
    speakSeconds: 240,
    sampleAnswer:
      'Hallo zusammen, heute möchte ich über flexible Arbeitszeitmodelle sprechen, die unsere Arbeitswelt derzeit grundlegend verändern. Viele Beschäftigte wünschen sich Gleitzeit oder eine Viertagewoche, um Beruf, Weiterbildung und Familie stressfreier zu verbinden und zu ihren persönlich produktivsten Zeiten zu arbeiten. Für Unternehmen bietet das klare Vorteile: Sie gewinnen leichter qualifizierte Fachkräfte, verzeichnen oft weniger Krankheitsausfälle und steigern die Motivation im Team. Dennoch bringt große Freiheit auch Risiken mit sich, etwa schwierige Erreichbarkeit bei Kundenkontakten oder die Gefahr der Entgrenzung, wenn Arbeit bis spät in den Abend hinein verschoben wird. Deshalb brauchen flexible Modelle verlässliche Leitplanken – beispielsweise klare Kernarbeitszeiten für gemeinsame Meetings sowie eine digitale Zeiterfassung, die vor unbezahlten Überstunden schützt. So profitieren am Ende beide Seiten gleichermaßen.',
    checklist: [
      'Beispiele flexibler Modelle (Gleitzeit, Viertagewoche) konkret genannt',
      'Vorteile für beide Seiten sowie organisatorische Risiken erklärt',
      'Schutzmaßnahmen gegen Entgrenzung formuliert',
    ],
    rubric: [
      { criterion: 'Inhalt & Struktur', descriptionId: 'Cakupan perspektif pekerja, perusahaan, dan aturan batas sangat lengkap.' },
      { criterion: 'B2-Ausdruck', descriptionId: 'Istilah dunia kerja modern (Entgrenzung, Kernarbeitszeit, Fachkräfte) digunakan tepat.' },
      { criterion: 'Flüssigkeit', descriptionId: 'Penuturan lancar dengan jeda intonasi yang alami.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b2-spr-004',
    level: 'B2',
    skill: 'sprechen',
    topic: 'Alltag',
    title: 'Gemeinsam ein Problem lösen: „Barrierefreie und umweltfreundliche Campus-Anbindung“',
    subtitle: 'telc B2 Sprechen Teil 3 – Vorschläge abwägen, Prioritäten setzen, Maßnahmenplan vereinbaren',
    diff: 'Anspruchsvoll',
    mins: 14,
    format: 'Sprechen · Gemeinsam etwas planen (telc B2)',
    instr: 'Entwickle einen überzeugenden Planungsbeitrag bzw. Dialog mit klaren Prioritäten (ca. 3 Minuten).',
    prompt:
      'Der neue Universitätscampus liegt am Stadtrand, und Studierende klagen über überfüllte Busse, fehlende sichere Fahrradstellplätze und lange Fußwege ohne Beleuchtung. Entwirf gemeinsam mit einem Partner einen Maßnahmenplan: 1. Welche Maßnahme löst das dringendste Sicherheitsproblem sofort? 2. Wie finanziert oder organisiert ihr überdachte Fahrradstationen und Shuttles? 3. Wer spricht wann mit Stadtwerken und Studierendenvertretung?',
    explanationDe:
      'Zeige kooperative Gesprächsführung („Einverstanden, lass uns das priorisieren...“, „Dem möchte ich ergänzen, dass...“).',
    explanationId:
      'Susun skala prioritas solusi, bedakan langkah jangka pendek dan panjang, serta bagi tugas koordinasi secara jelas.',
    prepSeconds: 90,
    speakSeconds: 180,
    sampleAnswer:
      'Wenn wir uns die Situation am neuen Campus anschauen, sollten wir zunächst dringende Sicherheitslücken von langfristigen Projekten trennen. Am allerwichtigsten scheint mir die fehlende Beleuchtung entlang des Fußwegs – da müssen wir gleich morgen beim Bauamt beantragen, provisorische LED-Lampen aufzustellen, weil es im Herbst schon um siebzehn Uhr dunkel wird. Zweitens sollten wir mit den Stadtwerken über eine zusätzliche Taktung zu den Vorlesungszeiten um acht und zehn Uhr verhandeln; vielleicht ließe sich auch ein günstiges Semester-Shuttle testen. Für die überdachten Fahrradstellplätze schlage ich vor, einen Antrag beim Nachhaltigkeitsfonds der Hochschule zu stellen. Was hältst du davon, wenn du bis Freitag den Entwurf für die Stadtwerke vorbereitest und ich mit der Studierendenvertretung erste Unterschriften als Beleg sammle?',
    checklist: [
      'Sofortmaßnahme (Sicherheit/Licht) klar priorisiert',
      'Realistische Lösungen für Busse und Fahrräder vorgeschlagen',
      'Konkrete Zuständigkeiten und Fristen vereinbart',
    ],
    rubric: [
      { criterion: 'Kooperation & Planungslogik', descriptionId: 'Langkah darurat dan solusi jangka menengah tertata realistis.' },
      { criterion: 'Interaktionssignale', descriptionId: 'Ungkapan ajakan diskusi dan pembagian peran terdengar komunikatif.' },
      { criterion: 'Grammatik', descriptionId: 'Konjunktiv II ("ließe sich", "sollten") dan kalimat sebab-akibat tepat.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b2-spr-005',
    level: 'B2',
    skill: 'sprechen',
    topic: 'Medien',
    title: 'Kurzvortrag: „Algorithmen und Filterblasen – Wie informieren wir uns heute?“',
    subtitle: 'Medienwandel, Personalisierung von Nachrichten und Gegenstrategien vorstellen',
    diff: 'Anspruchsvoll',
    mins: 15,
    format: 'Sprechen · Vortrag (Teil 1)',
    instr: 'Bereite dich 3 Minuten vor und halte einen differenzierten Vortrag (ca. 4 Minuten).',
    prompt:
      'Präsentiere das Thema „Nachrichten in Zeiten von Algorithmen“: 1. Wie wählen soziale Plattformen und Feeds heute Inhalte für uns aus? 2. Welche Gefahren entstehen durch sogenannte Filterblasen für die gesellschaftliche Debatte? 3. Welche konkreten Gewohnheiten helfen im Alltag, vielfältig und seriös informiert zu bleiben?',
    explanationDe:
      'Erkläre den Fachbegriff („Filterblase“) zu Beginn kurz und verständlich, bevor du Lösungen vorstellst.',
    explanationId:
      'Definisikan konsep gelembung filter secara ringkas, jelaskan dampaknya bagi debat publik, dan beri tips menjaga keberagaman sumber berita.',
    prepSeconds: 180,
    speakSeconds: 240,
    sampleAnswer:
      'Guten Tag! Wenn wir heute morgens Nachrichten auf dem Smartphone öffnen, entscheidet selten nur eine Redaktion, was wir sehen – sondern meist ein lernender Algorithmus. Diese Programme merken sich, welche Themen wir anklicken, und spielen uns gezielt ähnliche Inhalte aus. Dadurch entstehen leicht sogenannte Filterblasen: Man liest fast nur noch Meinungen, die das eigene Weltbild bestätigen. Einerseits wirkt das bequem, andererseits erschwert es gesellschaftliche Kompromisse, weil unterschiedliche Perspektiven aus dem Blick geraten und zugespitzte Emotionen oft mehr Reichweite erhalten als nüchterne Fakten. Umso wichtiger wird aktive Medienkompetenz im Alltag. Ich versuche deshalb bewusst, zwei bis drei unabhängige Qualitätszeitungen oder öffentlich-rechtliche Formate direkt zu lesen, gelegentlich gezielt andere Standpunkte anzuhören und brisante Schlagzeilen vor dem Teilen stets über Originalquellen gegenzuprüfen. Nur wer seine Informationsquellen selbst wählt, bleibt wirklich mündig.',
    checklist: [
      'Funktionsweise algorithmischer Feeds verständlich skizziert',
      'Folgen für Meinungsbildung und Kompromissfähigkeit erklärt',
      'Konkrete eigene Strategien zur Quellenprüfung benannt',
    ],
    rubric: [
      { criterion: 'Begriffserklärung & Tiefe', descriptionId: 'Konsep algoritma dan dampaknya bagi masyarakat dijelaskan gamblang.' },
      { criterion: 'Wortschatz B2', descriptionId: 'Istilah media ("Filterblase", "Quellenprüfung", "Reichweite") akurat.' },
      { criterion: 'Sprechfluss', descriptionId: 'Penyampaian runtut, jelas, dan meyakinkan.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b2-spr-006',
    level: 'B2',
    skill: 'sprechen',
    topic: 'Wirtschaft',
    title: 'Diskussion: „Konsumverzicht vs. grünes Wachstum – Was schützt das Klima wirklich?“',
    subtitle: 'Wirtschaftspolitische und individuelle Strategien kontrovers abwägen',
    diff: 'Anspruchsvoll',
    mins: 15,
    format: 'Sprechen · Diskussion (Teil 2)',
    instr: 'Nimm ca. 3,5 Minuten lang differenziert Stellung und wäge beide Ansätze ab.',
    prompt:
      'Diskutiere zwei Ansätze im Klimaschutz: 1. Warum setzen einige Fachleute auf technische Innovationen und grüne Energie („grünes Wachstum“)? 2. Warum betonen andere, dass wir insgesamt weniger konsumieren und länger reparieren müssen? 3. Wie lässt sich beides politisch und im Alltag sinnvoll verbinden?',
    explanationDe:
      'Vermeide Schwarz-Weiß-Antworten; zeige auf B2-Niveau, inwiefern sich Technik und bewusster Konsum ergänzen.',
    explanationId:
      'Hindari jawaban hitam-putih; tunjukkan bagaimana inovasi teknologi bersih dan pengurangan konsumsi saling melengkapi.',
    prepSeconds: 120,
    speakSeconds: 210,
    sampleAnswer:
      'In der Klimadebatte stehen sich häufig zwei Lager gegenüber: Befürworter von grünem Wachstum vertrauen stark auf Innovationen wie Solarstrom, Wärmepumpen und Recyclingtechniken, um Wohlstand und Klimaschutz zu verbinden. Kritiker wenden jedoch zu Recht ein, dass neue Technik allein das Problem nicht löst, solange der Gesamtverbrauch immer weiter steigt und seltene Rohstoffe verschwendet werden. Tatsächlich greifen beide Strategien nur zusammen: Ohne saubere Technologien bleiben globale Energieziele unerreichbar, doch ohne längere Nutzungszeiten und ein starkes Recht auf Reparatur verpufft ein Teil der Einsparungen durch sogenannte Rebound-Effekte. Deshalb sollte die Politik einerseits gezielt Forschung fördern und andererseits langlebige, reparierbare Produkte steuerlich belohnen. Im Alltag kann jeder Einzelne dazu beitragen, indem man seltener neukauft, stärker teilt und auf Qualität statt Wegwerfware setzt.',
    checklist: [
      'Ansatz „grünes Wachstum / Innovation“ fair erläutert',
      'Ansatz „Konsumreduktion / Reparatur“ begründet gegenübergestellt',
      'Verknüpfung beider Strategien auf politischer und privater Ebene gezeigt',
    ],
    rubric: [
      { criterion: 'Differenzierung', descriptionId: 'Menganalisis kekuatan dan keterbatasan kedua strategi iklim secara tajam.' },
      { criterion: 'Sprache & Stil', descriptionId: 'Ungkapan sanggahan ("wenden jedoch zu Recht ein") dan kosakata ekonomi hijau tepat.' },
      { criterion: 'Fazit', descriptionId: 'Kesimpulan memadukan kebijakan publik dan peran warga secara logis.' },
    ],
  }),
  buildProductiveExercise({
    id: 'qb-b2-spr-007',
    level: 'B2',
    skill: 'sprechen',
    topic: 'Globalisierung',
    title: 'Kurzvortrag: „Ehrenamt und Zivilgesellschaft – Warum engagieren sich Menschen freiwillig?“',
    subtitle: 'Bedeutung von Vereinen, Nachbarschaftshilfe und staatlicher Anerkennung reflektieren',
    diff: 'Mittel',
    mins: 15,
    format: 'Sprechen · Vortrag (Teil 1)',
    instr: 'Bereite dich 3 Minuten vor und halte dann einen etwa vierminütigen Vortrag.',
    prompt:
      'Halte eine Präsentation über ehrenamtliches Engagement: 1. In welchen Bereichen (Sport, Katastrophenschutz, Nachbarschaft, Bildung) prägen Freiwillige unsere Gesellschaft? 2. Was gewinnen Engagierte persönlich neben dem Nutzen für andere? 3. Warum stößt das Ehrenamt heute manchmal an Grenzen und wie kann man es stärken?',
    explanationDe:
      'Verbinde allgemeine gesellschaftliche Bedeutung mit konkreten Beispielen und realistischen Unterstützungsmaßnahmen.',
    explanationId:
      'Hubungkan peran sosial relawan dengan manfaat pribadi yang didapat, lalu bahas kendala waktu dan cara pemerintah/komunitas mendukungnya.',
    prepSeconds: 180,
    speakSeconds: 240,
    sampleAnswer:
      'Sehr geehrte Zuhörerinnen und Zuhörer, in meinem Vortrag geht es um ein Thema, das unseren Alltag oft unsichtbar zusammenhält: das ehrenamtliche Engagement. Ob bei der Freiwilligen Feuerwehr, als Jugendtrainer im Sportverein oder in Sprachcafés für Geflüchtete – Millionen Menschen investieren ihre Freizeit unbezahlt in das Gemeinwohl. Dabei profitieren nicht nur die Empfänger der Hilfe: Auch die Freiwilligen selbst knüpfen wertvolle Kontakte, erwerben Organisationsfähigkeiten und erleben das stärkende Gefühl, konkret etwas bewegen zu können. Allerdings geraten viele Vereine heute unter Druck, weil Berufstätige immer flexiblere Arbeitszeiten haben und bürokratische Hürden abschrecken. Damit das Ehrenamt attraktiv bleibt, sollten Kommunen unkomplizierte Versicherungen, steuerliche Freibeträge und digitale Fortbildungen anbieten sowie Engagementzeiten für Studium oder Beruf noch stärker anerkennen. Zusammenfassend ist eine lebendige Zivilgesellschaft kein selbstverständliches Geschenk, sondern verdient verlässliche Wertschätzung und Unterstützung.',
    checklist: [
      'Konkrete Einsatzfelder des Ehrenamts genannt',
      'Nutzen für Gesellschaft und persönliche Entwicklung der Helfenden erklärt',
      'Grenzen/Belastungen benannt und politische/kommunale Lösungen vorgeschlagen',
    ],
    rubric: [
      { criterion: 'Aufbau & Beispiele', descriptionId: 'Contoh bidang kerelawanan konkret dan menyatu mulus ke argumen.' },
      { criterion: 'Wortschatz B2', descriptionId: 'Istilah sosial ("Gemeinwohl", "Zivilgesellschaft", "Wertschätzung") digunakan akurat.' },
      { criterion: 'Flüssigkeit & Ton', descriptionId: 'Penyampaian hangat, persuasif, dan percaya diri.' },
    ],
  }),
];

export const B2_PRODUKTIV_EXERCISES: Exercise[] = [
  ...B2_PRODUKTIV_SCHREIBEN,
  ...B2_PRODUKTIV_SPRECHEN,
];
