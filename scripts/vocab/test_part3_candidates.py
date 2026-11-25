import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from extract_seen import get_words
from b2_existing import B2_EXISTING_RAW
from b2_topics_part1 import B2_PART_1_RAW
from b2_part1_supplement import B2_PART1_SUPPLEMENT
from b2_topics_part2 import B2_PART_2_RAW

a1 = get_words('src/data/vocabulary/a1.ts')
a2 = get_words('src/data/vocabulary/a2.ts')
b1 = get_words('src/data/vocabulary/b1.ts')
b2_existing_words = {e['word'] for e in B2_EXISTING_RAW}

used_so_far = a1 | a2 | b1 | b2_existing_words | {x[0] for x in B2_PART_1_RAW} | {x[0] for x in B2_PART1_SUPPLEMENT} | {x[0] for x in B2_PART_2_RAW}

def check_new(word_dict):
    clean_dict = {}
    for topic, words in word_dict.items():
        clean_words = []
        for w in words:
            if w not in used_so_far:
                clean_words.append(w)
        clean_dict[topic] = clean_words
        print(f"[{topic}] Offered: {len(words)} -> Clean: {len(clean_words)}")
    return clean_dict

candidates_part3 = {
    "Politik und Wirtschaft": [
        "Wirtschaftsaufschwung", "Konjunkturflaute", "Leitzinssatz", "Staatsverschuldung", "Haushaltsdefizit",
        "Steuereinnahmen", "Binnenmarkt", "Außenhandelsbilanz", "Exportüberschuss", "Handelsbilanzüberschuss",
        "Währungsstabilität", "Inflationsbekämpfung", "Subventionsabbau", "Strukturwandel", "Wettbewerbsverzerrung",
        "Kartellamt", "Monopolstellung", "Preisabsprache", "Marktdominanz", "Unternehmensfusion",
        "Aktiengesellschaft", "Börsenkurs", "Dividende", "Aufsichtsratsvorsitzende", "Jahresabschlussprüfung",
        "Regierungskoalition", "Oppositionsführer", "Wahlergebnis", "Stimmzettel", "Wahlkreis",
        "Bundesgesetzblatt", "Verfassungsgerichtsurteil", "Rechtsverordnung", "Ministerratsbeschluss", "Sitzungsperiode",
        "Finanzkrise", "Geldpolitik", "Konjunkturpaket", "Schuldenbremse", "Konjunkturzyklus",
        "Zinspolitik", "Wirtschaftswachstum", "Handelspartner", "Zollabkommen", "Investitionsförderung",
        "Wirtschaftsförderung", "Steuerreform", "Bürokratieabbau", "Arbeitsmarktpolitik", "Standortfaktor",
        "Bruttoinlandsprodukt", "Wirtschaftskraft", "Exportnation", "Importvolumen", "Handelsdefizit",
        "privatisieren", "subventionieren", "reformieren", "liberalisieren", "regulieren",
        "wirtschaftsstark", "konjunkturbedingt", "exportorientiert", "marktführend", "insolvent",
        "liquide", "ertragreich", "defizitär", "wettbewerbsfähig", "schuldenfrei",
        "in die Insolvenz gehen", "Schwarze Zahlen schreiben", "Rote Zahlen schreiben", "den Haushalt sanieren"
    ],
    "Wissenschaft und Technik": [
        "Forschungshypothese", "Versuchsreihe", "Laborversuch", "Feldstudie", "Erkenntnisgewinn",
        "Forschungsergebnis", "Wissenschaftsbetrieb", "Fachzeitschrift", "Peer-Review-Verfahren", "Publikationsliste",
        "Zitierhäufigkeit", "Plagiatsvorwurf", "Forschungsethik", "Tierversuchsfreie", "Gentechnikgesetz",
        "Klonen", "Stammzellenforschung", "Nanotechnologie", "Quantencomputer", "Supraleiter",
        "Kernfusion", "Fusionsreaktor", "Teilchenbeschleuniger", "Gravitationswelle", "Astrophysik",
        "Satellitennavigation", "Weltraumforschung", "Raumfahrtbehörde", "Umlaufbahn", "Sonnensystem",
        "Künstliche Intelligenz", "Maschinelles Lernen", "Neuronales Netz", "Algorithmenmodell", "Automatisierungstechnik",
        "Robotertechnologie", "Sensortechnik", "Halbleiterindustrie", "Mikrochip", "Batteriezelle",
        "Energiespeicher", "Wasserstofftechnologie", "Brennstoffzelle", "Werkstoffkunde", "Materialprüfung",
        "verifizieren", "falsifizieren", "postulieren", "extrapolieren", "analysieren",
        "synthetisieren", "simulieren", "modellieren", "protokollieren", "katalysieren",
        "empirisch", "theoretisch", "hypothetisch", "reproduzierbar", "interdisziplinär",
        "bahnbrechend", "innovativ", "hochmodern", "technologieoffen", "zukunftsweisend",
        "eine These aufstellen", "zu einem Schluss kommen", "Licht ins Dunkel bringen", "den Grundstein legen"
    ],
    "Kommunikation": [
        "Gesprächsführung", "Verhandlungsgeschick", "Argumentationskette", "Überzeugungskraft", "Kompromissbereitschaft",
        "Konfliktfähigkeit", "Schlichtungsverfahren", "Konsensfindung", "Meinungsaustausch", "Gedankenaustausch",
        "Debattenkultur", "Rededuell", "Wortgefecht", "Zwischenruf", "Tagesordnungspunkt",
        "Diskussionsleiter", "Podiumsteilnehmer", "Pressekonferenz", "Journalistenfrage", "Klarstellung",
        "Dementi", "Verlautbarung", "Erklärung", "Absichtserklärung", "Grundsatzerklärung",
        "Rhetorik", "Körpersprache", "Blickkontakt", "Gestik", "Mimik",
        "Tonfall", "Zwischenton", "Sprachbarriere", "Übersetzungsfehler", "Dolmetscherdienst",
        "argumentieren", "debattieren", "erörtern", "schlichten", "vermitteln",
        "widerlegen", "bekräftigen", "einlenken", "relativieren", "konkretisieren",
        "präzisieren", "verharmlosen", "beschönigen", "verdeutlichen", "illustrieren",
        "schlagfertig", "redegewandt", "ausdrucksstark", "überzeugend", "diplomatisch",
        "sachlich", "konstruktiv", "pointiert", "widersprüchlich", "vieldeutig",
        "auf den Punkt bringen", "ins Wort fallen", "zur Sprache bringen", "den Faden verlieren"
    ],
    "Gefühle und Meinungen": [
        "Gefühlswelt", "Seelenleben", "Gemütszustand", "Stimmungsschwankung", "Lebensfreude",
        "Zuversicht", "Hoffnungsschimmer", "Erleichterung", "Genugtuung", "Begeisterung",
        "Euphorie", "Glücksgefühl", "Dankbarkeit", "Verbundenheitsgefühl", "Mitgefühl",
        "Schadenfreude", "Verbitterung", "Groll", "Missgunst", "Neid",
        "Enttäuschung", "Verzweiflung", "Hoffnungslosigkeit", "Niedergeschlagenheit", "Traurigkeit",
        "Melancholie", "Wehmut", "Heimweh", "Fernweh", "Sehnsucht",
        "Verunsicherung", "Zukunftsangst", "Versagensangst", "Torschlusspanik", "Skepsis",
        "Misstrauen", "Argwohn", "Vorbehalt", "Gerechtigkeitssinn", "Ehrgefühl",
        "empfinden", "verspüren", "mitempfinden", "zweifeln", "verzweifeln",
        "verzagen", "schwelgen", "trauern", "bereuen", "hoffen",
        "zuversichtlich", "euphorisch", "begeistert", "erleichtert", "genugtuend",
        "skeptisch", "misstrauisch", "argwöhnisch", "verunsichert", "niedergeschlagen",
        "melancholisch", "wehmütig", "sehnsüchtig", "frustriert", "verbittert",
        "einen kühlen Kopf bewahren", "den Mut verlieren", "guter Dinge sein", "aus allen Wolken fallen"
    ],
    "Medien und Digitalisierung": [
        "Medienlandschaft", "Pressefreiheit", "Rundfunkbeitrag", "Öffentlich-rechtlicher", "Privatsender",
        "Nachrichtenagentur", "Investigativjournalismus", "Enthüllungsbericht", "Leitartikel", "Kommentar",
        "Glosse", "Feuilleton", "Leserbrief", "Chefredakteur", "Korrespondent",
        "Auslandskorrespondent", "Kriegsberichterstattung", "Schlagzeile", "Eilmeldung", "Sensationsjournalismus",
        "Falschmeldung", "Desinformation", "Propaganda", "Verschwörungstheorie", "Faktencheck",
        "Algorithmus", "Suchmaschinenoptimierung", "Klickrate", "Reichweite", "Zielgruppenanalyse",
        "Nutzerverhalten", "Benutzeroberfläche", "Bedienkomfort", "Cloud-Dienst", "Serverstandort",
        "Cyberkriminalität", "Hackerangriff", "Schadsoftware", "Sicherheitslücke", "Firewall",
        "Verschlüsselung", "Zwei-Faktor-Authentifizierung", "Passwortmanager", "Datenspeicherung", "Glasfaserausbau",
        "Breitbandanschluss", "Funkloch", "Mobilfunknetz", "Mobilfunkstandard", "Netzabdeckung",
        "digitalisieren", "streamen", "herunterladen", "hochladen", "verschlüsseln",
        "medienkompetent", "benutzerfreundlich", "barrierefrei", "internetfähig", "datenbasiert",
        "virales Video", "ins Netz stellen", "die Werbetrommel rühren", "Schlagzeilen machen"
    ],
    "Kultur und Geschichte": [
        "Kulturerbe", "Weltkulturerbe", "Denkmalschutzgesetz", "Geschichtsbewusstsein", "Epochenwandel",
        "Zeitalter", "Jahrhundertwende", "Antike", "Mittelalter", "Renaissance",
        "Aufklärung", "Romantik", "Moderne", "Zeitgeschichte", "Nachkriegszeit",
        "Wiedervereinigung", "Mauerfall", "Gedenkstätte", "Mahnmal", "Zeitzeuge",
        "Erinnerungskultur", "Brauchtum", "Volksfest", "Karnevalsumzug", "Traditionspflege",
        "Museumslandschaft", "Gemäldegalerie", "Kunstausstellung", "Vernissage", "Finissage",
        "Kuratieren", "Restaurierung", "Kunstsammlung", "Mäzen", "Kulturförderung",
        "Opernhaus", "Philharmonie", "Schauspielhaus", "Freilichtbühne", "Theateraufführung",
        "Uraufführung", "Inszenierung", "Regiearbeit", "Bühnenbild", "Repertoire",
        "überliefern", "wiederentdecken", "restaurieren", "inszenieren", "aufführen",
        "geschichtsträchtig", "traditionsreich", "denkmalgeschützt", "epochemachend", "zeitgenössisch",
        "avantgardistisch", "klassizistisch", "barock", "historisch", "kulturell",
        "Geschichte schreiben", "in die Geschichte eingehen", "aus der Mode kommen", "eine Brücke schlagen"
    ]
}

clean_words_p3 = check_new(candidates_part3)
