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

candidates = {
    "Gesundheit": [
        "Vorsorgevollmacht", "Hausarztpraxis", "Betreuungsvollmacht", "Organspendeausweis", "Bluttransfusion",
        "Wunddesinfektion", "Pflasterverband", "Gipsverband", "Röntgenaufnahme", "Ultraschalluntersuchung",
        "Blutsenkung", "Cholesterinspiegel", "Blutzuckerwert", "Schilddrüsenunterfunktion", "Schilddrüsenüberfunktion",
        "Lungenentzündung", "Mandelentzündung", "Blinddarmentzündung", "Gehirnerschütterung", "Schleudertrauma",
        "Muskelzerrung", "Bänderriss", "Knochenfraktur", "Gelenkentzündung", "Arthrose",
        "Rheuma", "Gicht", "Osteoporose", "Allergieschock", "Heuschnupfenzeit",
        "Asthmaspray", "Inhalationsgerät", "Hustenlöser", "Nasenspray", "Fieberthermometer",
        "Schmerzmittel", "Betäubungsspritze", "Wundnaht", "Krankenhausaufenthalt", "Entlassungsbrief"
    ],
    "Reisen und Verkehr": [
        "Nahverkehrsgesellschaft", "Fahrgastbeirat", "S-Bahn-Verbindung", "U-Bahn-Linie", "Straßenbahnnetz",
        "Zugausfall", "Gleisbett", "Bahnhofsvorplatz", "Fahrkartenautomat", "Entwerter",
        "Monatskarte", "Jahresabonnement", "Schülerticket", "Semesterticket", "Gruppenfahrschein",
        "Autobahnkreuz", "Autobahndreieck", "Ausweichroute", "Landstraßennetz", "Kreisverkehr",
        "Vorfahrtsstraße", "Vorfahrtsregelung", "Einbahnstraßenregelung", "Verkehrsberuhigung", "Fußgängerzone",
        "Fahrradstraße", "Radwegebau", "Leihradsystem", "E-Scooter-Verleih", "Fahrzeugzulassung",
        "Kfz-Haftpflichtversicherung", "Kaskoversicherung", "Totalschaden", "Werkstatttermin", "Reifenwechsel"
    ],
    "Einkaufen": [
        "Konsumentenverhalten", "Verbraucherpreisindex", "Inflationsausgleich", "Kaufkraftparität", "Warenvielfalt",
        "Sortimentserweiterung", "Produktpalette", "Massenware", "Nischenprodukt", "Luxusartikel",
        "Konsumverzicht", "Gebrauchtwarenmarkt", "Secondhandladen", "Flohmarktstand", "Pfandflaschenrückgabe",
        "Pfandautomat", "Einkaufswagenchip", "Selbstbedienungskasse", "Barzahlung", "Kartenzahlung",
        "Kontaktloszahlung", "Kreditrahmen", "Dispositionskredit", "Überziehungszins", "Kontoführungsgebühr",
        "Verzugszins", "Mahngebühr", "Inkassoverfahren", "Zahlungserinnerung", "Rechnungsstellung",
        "Lieferkondition", "Versandkostenpauschale", "Expresszuschlag", "Zollabfertigung", "Einfuhrumsatzsteuer",
        "Handelsspanne", "Großhandelspreis", "Einzelhandelspreis", "Ladenhüter", "Verkaufsschlager",
        "Eröffnungsangebot", "Räumungsverkauf", "Schlussverkauf", "Rabattgutschein", "Treuepunkte"
    ],
    "Freizeit und Hobbys": [
        "Vereinstätigkeit", "Ehrenamtsträger", "Mitgliederzuwachs", "Vereinssatzung", "Vereinsbeitrag",
        "Sportveranstaltung", "Freundschaftsspiel", "Auswärtsspiel", "Heimspiel", "Tabellenführer",
        "Tabellenletzter", "Abstiegskampf", "Aufstiegsfeier", "Vereinsgeschichte", "Traditionsverein",
        "Trainingsgelände", "Sporthalle", "Schwimmhalle", "Leichtathletikstadion", "Tennisplatzanlage",
        "Reiterhof", "Segelclub", "Ruderverein", "Schützenverein", "Musikverein",
        "Blasorchester", "Theatergruppe", "Laienschauspieler", "Fotoclub", "Schachclub",
        "Bergwanderung", "Gipfelkreuz", "Almhütte", "Bergbahn", "Seilbahnstation",
        "Skiabfahrt", "Langlaufloipe", "Schneeschuhwanderung", "Kanutour", "Radtouristik"
    ],
    "Natur und Umwelt": [
        "Klimaneutralität", "Emissionszertifikat", "Emissionshandel", "Treibhausgasausstoß", "Kohlenstoffkreislauf",
        "Waldschutz", "Nationalparkverwaltung", "Biotopschutz", "Artenschutzprogramm", "Wildtierbestand",
        "Zugvogel", "Brutgebiet", "Nistplatz", "Pflanzenschutzmittel", "Bienensterben",
        "Insektenrückgang", "Monokultur", "Fruchtfolge", "Bodenfruchtbarkeit", "Humusaufbau",
        "Grundwasserschutz", "Wasserschutzgebiet", "Staudammprojekt", "Hochwasserschutz", "Deichbau",
        "Flutpolder", "Küsenschutz", "Sturmflutgefahr", "Meeresschutzgebiet", "Überfischung",
        "Plastikmüllabgabe", "Wertstoffhof", "Kompostierungsanlage", "Klärwerksanlage", "Abwasserreinigung",
        "Fernwärmenetz", "Biogasanlage", "Solarkraftwerk", "Geothermieanlage", "Energiewende"
    ],
    "Gesellschaft": [
        "Bürgerversammlung", "Stadtratssitzung", "Gemeinderatswahl", "Kommunalpolitik", "Bürgermeisteramt",
        "Sozialhilfeträger", "Wohngeldantrag", "Unterhaltsvorschuss", "Kindergeldkasse", "Familienförderung",
        "Behindertenwerkstatt", "Blindenverband", "Gehörlosengemeinschaft", "Seniorenbeirat", "Jugendamt",
        "Kinderschutzbund", "Frauenhaus", "Telefonseelsorge", "Nachbarschaftshilfe", "Quartiersmanagement",
        "Stadtteilarbeit", "Gemeindezentrum", "Begegnungsstätte", "Flüchtlingsunterkunft", "Asylverfahren",
        "Einbürgerungstest", "Staatsbürgerschaftsurkunde", "Integrationskurs", "Willkommenskultur", "Gleichstellungsbeauftragte",
        "Antidiskriminierungsstelle", "Menschenrechtsorganisation", "Hilfsorganisation", "Katastrophenhilfe", "Rotes Kreuz"
    ]
}

clean_words = check_new(candidates)
