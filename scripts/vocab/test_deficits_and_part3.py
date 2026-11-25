import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from extract_seen import get_words
from b2_existing import B2_EXISTING_RAW
from b2_topics_part1 import B2_PART_1_RAW
from b2_part1_supplement import B2_PART1_SUPPLEMENT
from b2_topics_part2 import B2_PART_2_RAW
from b2_part2_supplement import B2_PART2_SUPPLEMENT

a1 = get_words('src/data/vocabulary/a1.ts')
a2 = get_words('src/data/vocabulary/a2.ts')
b1 = get_words('src/data/vocabulary/b1.ts')
b2_existing_words = {e['word'] for e in B2_EXISTING_RAW}

used_so_far = a1 | a2 | b1 | b2_existing_words | \
    {x[0] for x in B2_PART_1_RAW} | {x[0] for x in B2_PART1_SUPPLEMENT} | \
    {x[0] for x in B2_PART_2_RAW} | {x[0] for x in B2_PART2_SUPPLEMENT}

def check(candidates, name="List"):
    clean = []
    for c in candidates:
        if c not in used_so_far:
            clean.append(c)
    print(f"[{name}] Total: {len(candidates)} -> Clean: {len(clean)}")
    return clean

# Reisen deficit (~25)
check([
    "Fahrpreiserhöhung", "Verkehrsknotenpunkt", "Bahnübergang", "Schrankenwärter", "Gleisanschluss",
    "Lokomotivführer", "Triebwagen", "Waggon", "Schlafwagen", "Liegewagen",
    "Großraumabteil", "Bordbistro", "Bahnhofsmission", "Reisezentrum", "Wartesaal",
    "Gepäckaufbewahrung", "Gepäckschließfach", "Kofferkuli", "Bordkarte", "Sicherheitskontrolle",
    "Handgepäckbestimmung", "Fluggastbrücke", "Startbahn", "Landebahn", "Fluglotse"
], "Reisen")

# Einkaufen deficit (~35)
check([
    "Warenangebot", "Marktsegment", "Herstellerpreis", "Verkaufspreis", "Aktionspreis",
    "Einführungspreis", "Dauertiefpreis", "Mengenrabatt", "Treuerabatt", "Barzahlungsrabatt",
    "Skonto", "Rechnungsprüfung", "Kaufbeleg", "Zahlungsziel", "Fälligkeitsdatum",
    "Zahlungsverzug", "Zahlungsausfall", "Mahnverfahren", "Vollstreckungsbescheid", "Verbraucherdarlehen",
    "Kreditwürdigkeit", "Schufa-Auskunft", "Kreditinstitut", "Filialnetz", "Onlineversandhandel",
    "Warenhauskette", "Fachgeschäft", "Boutique", "Ladenlokal", "Schaufensterdekoration",
    "Werbekampagne", "Produktplatzierung", "Verkaufskanal", "Kundenrezension", "Bewertungsportal"
], "Einkaufen")

# Freizeit deficit (~30)
check([
    "Vereinsgründung", "Vereinsregister", "Gemeinnützigkeitsstatus", "Mitgliedsbeitrag", "Fördermitglied",
    "Ehrenmitglied", "Vereinsjubiläum", "Schützenfest", "Trachtenverein", "Heimatverein",
    "Volkstanzgruppe", "Laienbühne", "Theaterensemble", "Probenraum", "Konzertsaal",
    "Kammerorchester", "Jugendorchester", "Blaskapelle", "Chorgesang", "Kirchenchor",
    "Lauftreff", "Volkslauf", "Staffellauf", "Hindernislauf", "Zehnkampf",
    "Siebenkampf", "Sportabzeichen", "Schwimmabzeichen", "Rettungsschwimmer", "Wasserwacht"
], "Freizeit")

# Natur deficit (~30)
check([
    "Klimaschutzmaßnahme", "Klimaziel", "Erderwärmung", "Treibhauseffekt", "Ozonschicht",
    "Ozonloch", "Luftverschmutzung", "Gewässerverschmutzung", "Bodenverseuchung", "Altlastensanierung",
    "Deponie", "Müllverbrennungsanlage", "Schadstoffsammlung", "Giftmüll", "Sondermüll",
    "Umweltauflage", "Umweltgutachten", "Landschaftsschutzgebiet", "Naturpark", "Biosphärenreservat",
    "Urwaldschutz", "Waldbrandgefahr", "Feuerlöschflugzeug", "Waldbrandbekämpfung", "Trockenperiode",
    "Hitzewelle", "Unwetterwarnung", "Hagelschlag", "Sturmschaden", "Windbruch"
], "Natur")

# Gesellschaft deficit (~30)
check([
    "Gesellschaftsordnung", "Sozialgefüge", "Gemeinwesen", "Zusammenleben", "Bürgergesellschaft",
    "Zivilengagement", "Freiwilligenagentur", "Spendenaktion", "Spendenkonto", "Hilfswerk",
    "Wohlfahrtsverband", "Caritas", "Diakonie", "Arbeiterwohlfahrt", "Paritätischer",
    "Sozialstation", "Armutsbekämpfung", "Tafel", "Suppenküche", "Obdachlosenunterkunft",
    "Wohnungslosenhilfe", "Schuldnerberatung", "Suchtberatung", "Drogenhilfe", "Bewährungshilfe",
    "Gefängnisseelsorge", "Opferschutz", "Weißer Ring", "Rechtshilfe", "Streitschlichter"
], "Gesellschaft")

# Test Part 3 top-ups
print("--- Part 3 top-ups ---")
check([
    "Finanzaufsicht", "Zentralbankpräsident", "Wirtschaftsweise", "Konjunkturbarometer", "Branchenverband",
    "Gewerkschaftsbund", "Arbeitgeberpräsident", "Tarifautonomie", "Lohn-Preis-Spirale", "Verbraucherpreis"
], "Politik top-up")

check([
    "Forschungsschwerpunkt", "Forschungsgemeinschaft", "Wissenschaftsrat", "Exzellenzinitiative", "Eliteuniversität",
    "Forschungsgelder", "Drittmittelantrag", "Forschungsförderung", "Wissenschaftlerteam", "Laborausstattung",
    "Elektronenmikroskop", "Spektrometer", "Genomsequenzierung", "DNA-Analyse", "Zellkultur",
    "Versuchstier", "Forschungslabor", "Versuchsanordnung", "Forschungsprojektleiter", "Wissenschaftspreis"
], "Wissenschaft top-up")

check([
    "Gesprächsatmosphäre", "Verhandlungspartner", "Kompromisslösung", "Einigungswille", "Vermittlungsversuch",
    "Schlichtungsstelle", "Streitbeilegung", "Friedensverhandlung", "Waffenstillstandsabkommen", "Gipfeltreffen",
    "Spitzengespräch", "Vieraugengespräch", "Hintergrundgespräch", "Pressesprecher", "Pressemitteilung",
    "Stellungnahme", "Gegendarstellung", "Klarstellung", "Meinungsverschiedenheit", "Kontroverse",
    "Grundsatzdebatte", "Generaldebatte", "Haushaltsdebatte", "Sachdebatte", "Redebeitrag"
], "Kommunikation top-up")

check([
    "Seelenzustand", "Gefühlsausbruch", "Gefühlsregung", "Gemütsruhe", "Gelassenheit",
    "Ausgeglichenheit", "Zufriedenheit", "Dankbarkeitsgefühl", "Freudenträne", "Herzensfreude",
    "Schadenfreude", "Missgunst", "Bitterkeit", "Kränkung", "Demütigung",
    "Verzweiflungstat", "Mutlosigkeit", "Hoffnungslosigkeit", "Pessimismus", "Optimismus",
    "Zuversichtlichkeit", "Zukunftsoptimismus", "Lebensmut", "Tatendrang", "Begeisterungsfähigkeit",
    "Wissbegier", "Abenteuerlust", "Reiselust", "Heimwehgefühl", "Nostalgie"
], "Gefühle top-up")

check([
    "Medienkonzern", "Presseverlag", "Verlagsgruppe", "Zeitungsredaktion", "Nachrichtenredaktion",
    "Rundfunkanstalt", "Fernsehanstalt", "Hörfunksender", "Streamingdienst", "Mediathek",
    "Podcast-Produktion", "Onlineausgabe", "E-Paper", "Paywall", "Abonnementmodell",
    "Reichweitenmessung", "Einschaltquote", "Zielgruppenforschung", "Werbeeinnahmen", "Werbeunterbrechung",
    "Datenschutzgrundverordnung", "Privatsphäreneinstellung", "Cookies-Hinweis", "Verschlüsselungsstandard", "Passwortsicherheit",
    "Phishing-Angriff", "Identitätsdiebstahl", "Trojaner", "Computervirus", "Ransomware"
], "Medien top-up")

check([
    "Kulturgut", "Denkmalschutzbehörde", "Historikerstreit", "Geschichtsforschung", "Archäologie",
    "Ausgrabungsstätte", "Baudenkmal", "Kulturdenkmal", "Geschichtsdenkmal", "Ehrenmal",
    "Kriegsdenkmal", "Nationalfeiertag", "Tag der Deutschen Einheit", "Gedenktag", "Trauertag",
    "Volkstrauertag", "Brauchtumspflege", "Schützenumzug", "Erntedankfest", "Kulturwoche",
    "Festspielsommer", "Kammermusikfest", "Literaturfestival", "Buchmesse", "Dichterlesung",
    "Autorenlesung", "Theaterpreis", "Filmpreis", "Kulturpreis", "Museumsnacht"
], "Kultur top-up")
