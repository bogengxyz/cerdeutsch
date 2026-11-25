import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from extract_seen import get_words
from b2_existing import B2_EXISTING_RAW

a1 = get_words('src/data/vocabulary/a1.ts')
a2 = get_words('src/data/vocabulary/a2.ts')
b1 = get_words('src/data/vocabulary/b1.ts')
b2_existing_words = {e['word'] for e in B2_EXISTING_RAW}
forbidden = a1 | a2 | b1 | b2_existing_words

def check_words(word_list, name="Topic"):
    clean = []
    col = []
    for w in word_list:
        if w in forbidden:
            col.append(w)
        else:
            clean.append(w)
    print(f"[{name}] Checked {len(word_list)} -> Clean: {len(clean)}, Collisions: {len(col)}")
    if col:
        print("   Collisions:", col)
    return clean

# Topics 7 to 12
check_words([
    "Vorsorgeuntersuchung", "Heilungsprozess", "Krankheitsverlauf", "Rehabilitationsmaßnahme", "Krankheitserreger",
    "Abwehrkräfte", "Infektionsgefahr", "Wundheilung", "Nebenwirkungsrisiko", "Behandlungsfehler",
    "Schmerztherapie", "Gesundheitsvorsorge", "Hausarztüberweisung", "Facharztermin", "Klinikaufenthalt",
    "Operationssaal", "Narkosemittel", "Nachsorgebehandlung", "Genesungsphase", "Bluthochdruck",
    "Kreislaufbeschwerden", "Stoffwechselstörung", "Organversagen", "Arzthelfer", "Chefärztin",
    "Intensivstation", "Notaufnahme", "Krankenhausbett", "Pflegedienst", "Symptomlinderung"
], "7. Gesundheit")

check_words([
    "Verkehrsnetz", "Infrastrukturmaßnahme", "Reisebeschränkung", "Fernreiseziel", "Berufsverkehrszeit",
    "Fahrplanauskunft", "Schienennetz", "Flugstreichung", "Anschlusszug", "Streckensperrung",
    "Gleisänderung", "Fahrgastrechte", "Zugbegleiter", "Speisewagen", "Sitzplatzreservierung",
    "Fahrkartenkontrolle", "Pannenhilfe", "Verkehrsleitsystem", "Stauprognose", "Umleitungsstrecke",
    "Tempolimit", "Überholverbot", "Raststättennetz", "Mautgebühr", "Fahrzeugschein",
    "Hauptuntersuchung", "TÜV-Plakette", "Reifendruck", "Scheibenwischerwasser", "Tankstellennetz"
], "8. Reisen und Verkehr")

check_words([
    "Verbraucherschutzzentrale", "Kaufkraftschwund", "Gewährleistungsfrist", "Konsumgewohnheit", "Widerrufsbelehrung",
    "Preis-Leistungs-Gefüge", "Reklamationsgrund", "Umtauschrecht", "Herstellergarantie", "Produktmangel",
    "Lieferverzögerung", "Zahlungsmodalität", "Ratenkauf", "Kreditkartenzahlung", "Lastschriftverfahren",
    "Bonitätsprüfung", "Rechnungsbetrag", "Quittungsbeleg", "Rückgaberecht", "Sonderangebotswoche",
    "Rabattaktion", "Gutscheincode", "Kundenzufriedenheit", "Markenware", "Plagiat",
    "Gefälligkeitskauf", "Fehlkauf", "Spontankauf", "Kaufentscheidung", "Schnäppchenjäger"
], "9. Einkaufen")

check_words([
    "Vereinszugehörigkeit", "Ehrenamtskarte", "Freizeitaktivität", "Leistungsdruckabbau", "Vereinsvorstand",
    "Mitgliederversammlung", "Jahresbeitrag", "Vereinsheim", "Sportanlage", "Trainingslager",
    "Wettkampfvorbereitung", "Turniersieg", "Meisterschaftsfeier", "Pokalfinale", "Schiedsrichterentscheidung",
    "Fairplay", "Spitzensportler", "Breitensport", "Ausgleichssport", "Erholungsurlaub",
    "Naturerlebnis", "Wanderroute", "Klettersteig", "Campingplatzbetreiber", "Zeltlager",
    "Kameradschaft", "Teamgeist", "Spielfreude", "Freizeitgestaltung", "Hobbypilot"
], "10. Freizeit und Hobbys")

check_words([
    "Treibhausgasemission", "Artensterben", "Erneuerbare-Energien-Gesetz", "Naturschutzgebiet", "Ressourcenschonung",
    "Ökosystemschutz", "Klimaschutzabkommen", "Kohlendioxidausstoß", "Meeresspiegelanstieg", "Dürrekatastrophe",
    "Überschwemmungsgebiet", "Sturmtief", "Schmelzen", "Gletscher", "Permafrostboden",
    "Waldsterben", "Borkenkäferplage", "Rodung", "Aufforstungsprogramm", "Biodiversität",
    "Umweltbewusstsein", "Nachhaltigkeitsstrategie", "Mülltrennungssystem", "Recyclingquote", "Plastikmüllflut",
    "Trinkwasserknappheit", "Bodenversiegelung", "Grundwasserspiegel", "Luftreinhalteplan", "Feinstaubbelastung"
], "11. Natur und Umwelt")

check_words([
    "Bürgerbeteiligung", "Demografiewandel", "Altersarmutsrisiko", "Chancengerechtigkeit", "Zivilcourage",
    "Solidargemeinschaft", "Integrationsbeauftragte", "Schichtgesellschaft", "Generationenvertrag", "Sozialstaatlichkeit",
    "Daseinsvorsorge", "Armutsgrenze", "Mindestsicherung", "Bürgergeld", "Obdachlosigkeit",
    "Ehrenamtlichkeit", "Freiwilligendienst", "Vereinswesen", "Gemeinwohl", "Spendenbereitschaft",
    "Zusammenleben", "Toleranzgebot", "Vorurteilsfreiheit", "Diskriminierungsschutz", "Gleichbehandlungsgrundsatz",
    "Minderheitenschutz", "Frauenquote", "Entgeltgleichheit", "Inklusionsbetrieb", "Behindertenbeauftragter"
], "12. Gesellschaft")
