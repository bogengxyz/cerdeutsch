import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from extract_seen import get_words
from b2_existing import B2_EXISTING_RAW
from b2_topics_part1 import B2_PART_1_RAW
from b2_part1_supplement import B2_PART1_SUPPLEMENT
from b2_topics_part2 import B2_PART_2_RAW
from b2_part2_supplement import B2_PART2_SUPPLEMENT
from b2_part2_deficit import B2_PART2_DEFICIT
from b2_topics_part3 import B2_PART_3_RAW

a1 = get_words('src/data/vocabulary/a1.ts')
a2 = get_words('src/data/vocabulary/a2.ts')
b1 = get_words('src/data/vocabulary/b1.ts')
b2_existing_words = {e['word'] for e in B2_EXISTING_RAW}

used_so_far = a1 | a2 | b1 | b2_existing_words | \
    {x[0] for x in B2_PART_1_RAW} | {x[0] for x in B2_PART1_SUPPLEMENT} | \
    {x[0] for x in B2_PART_2_RAW} | {x[0] for x in B2_PART2_SUPPLEMENT} | {x[0] for x in B2_PART2_DEFICIT} | \
    {x[0] for x in B2_PART_3_RAW}

def check(candidates, name="List"):
    clean = []
    for c in candidates:
        if c not in used_so_far:
            clean.append(c)
    print(f"[{name}] Offered: {len(candidates)} -> Clean: {len(clean)}")
    return clean

# Politik: need ~22
p_clean = check([
    "Wirtschaftsminister", "Finanzministerium", "Bundestagsfraktion", "Fraktionsvorsitzender", "Koalitionsausschuss",
    "Parteitag", "Wahlanfechtung", "Volksentscheid", "Referendum", "Gesetzesnovelle",
    "Haushaltsausschuss", "Rechnungshof", "Steuerhinterziehung", "Geldwäschebekämpfung", "Finanztransaktion",
    "Investitionsvolumen", "Kapitalertragsteuer", "Gewerbesteuer", "Umsatzsteuersatz", "Körperschaftsteuer",
    "Zollunion", "Freihandelszone", "Handelsrestriktion", "Wirtschaftsembargo", "Sanktionspaket"
], "Politik")

# Wissenschaft: need ~32
w_clean = check([
    "Forschungsschwerpunkt", "Forschungsgemeinschaft", "Wissenschaftsrat", "Exzellenzinitiative", "Eliteuniversität",
    "Forschungsgelder", "Drittmittelantrag", "Forschungsförderung", "Wissenschaftlerteam", "Laborausstattung",
    "Elektronenmikroskop", "Spektrometer", "Genomsequenzierung", "DNA-Analyse", "Zellkultur",
    "Versuchstier", "Forschungslabor", "Versuchsanordnung", "Forschungsprojektleiter", "Wissenschaftspreis",
    "Forschungsfreiheit", "Wissenschaftsakademie", "Wissenschaftskolleg", "Forschungsverbund", "Wissenschaftsdisziplin",
    "Grundlagenwissenschaft", "Anwendungsorientierung", "Messgenauigkeit", "Messergebnis", "Toleranzbereich",
    "Stichprobengröße", "Signifikanzniveau", "Kausalzusammenhang", "Korrelationsanalyse", "Validierungsstudie"
], "Wissenschaft")

# Kommunikation: need ~35
k_clean = check([
    "Gesprächsatmosphäre", "Verhandlungspartner", "Kompromisslösung", "Einigungswille", "Vermittlungsversuch",
    "Schlichtungsstelle", "Streitbeilegung", "Friedensverhandlung", "Waffenstillstandsabkommen", "Gipfeltreffen",
    "Spitzengespräch", "Vieraugengespräch", "Hintergrundgespräch", "Pressesprecher", "Pressemitteilung",
    "Gegendarstellung", "Klarstellung", "Meinungsverschiedenheit", "Kontroverse", "Grundsatzdebatte",
    "Generaldebatte", "Haushaltsdebatte", "Sachdebatte", "Redebeitrag", "Zwischenbemerkung",
    "Gegenargument", "Einwand", "Bedenkenäußerung", "Wortmeldung", "Diskussionsrunde",
    "Podiumsdiskussion", "Streitgespräch", "Interviewführung", "Bürgersprechstunde", "Fragestunde"
], "Kommunikation")

# Gefühle: need ~42
g_clean = check([
    "Seelenzustand", "Gefühlsausbruch", "Gefühlsregung", "Gemütsruhe", "Gelassenheit",
    "Ausgeglichenheit", "Zufriedenheit", "Dankbarkeitsgefühl", "Freudenträne", "Herzensfreude",
    "Schadenfreude", "Missgunst", "Bitterkeit", "Kränkung", "Demütigung",
    "Verzweiflungstat", "Mutlosigkeit", "Hoffnungslosigkeit", "Pessimismus", "Optimismus",
    "Zuversichtlichkeit", "Zukunftsoptimismus", "Lebensmut", "Tatendrang", "Begeisterungsfähigkeit",
    "Wissbegier", "Abenteuerlust", "Reiselust", "Heimwehgefühl", "Nostalgie",
    "Seelenfrieden", "Herzenslust", "Liebenswürdigkeit", "Warmherzigkeit", "Herzlichkeit",
    "Mißtrauen", "Zweifelsfall", "Zukunftsfreude", "Trostlosigkeit", "Niedergeschlagenheit",
    "Überraschungsmoment", "Erstaunen", "Verwunderung", "Verblüffung", "Fassungslosigkeit"
], "Gefühle")

# Medien: need ~45
m_clean = check([
    "Medienkonzern", "Presseverlag", "Verlagsgruppe", "Zeitungsredaktion", "Nachrichtenredaktion",
    "Rundfunkanstalt", "Fernsehanstalt", "Hörfunksender", "Streamingdienst", "Mediathek",
    "Podcast-Produktion", "Onlineausgabe", "E-Paper", "Paywall", "Abonnementmodell",
    "Reichweitenmessung", "Einschaltquote", "Zielgruppenforschung", "Werbeeinnahmen", "Werbeunterbrechung",
    "Datenschutzgrundverordnung", "Privatsphäreneinstellung", "Cookies-Hinweis", "Verschlüsselungsstandard", "Passwortsicherheit",
    "Phishing-Angriff", "Identitätsdiebstahl", "Trojaner", "Computervirus", "Ransomware",
    "Netzneutralität", "Bandbreitenbegrenzung", "Glasfasernetz", "Mobilfunkmast", "Funkfrequenz",
    "Übertragungsrate", "Ladezeit", "Serverabsturz", "Datenbankfehler", "Backup-Kopie",
    "Dateianhang", "E-Mail-Postfach", "Spamfilter", "Kontaktformular", "Impressumspflicht"
], "Medien")

# Kultur: need ~46
ku_clean = check([
    "Kulturgut", "Denkmalschutzbehörde", "Historikerstreit", "Geschichtsforschung", "Archäologie",
    "Ausgrabungsstätte", "Baudenkmal", "Kulturdenkmal", "Geschichtsdenkmal", "Ehrenmal",
    "Kriegsdenkmal", "Nationalfeiertag", "Tag der Deutschen Einheit", "Gedenktag", "Trauertag",
    "Volkstrauertag", "Brauchtumspflege", "Schützenumzug", "Erntedankfest", "Kulturwoche",
    "Festspielsommer", "Kammermusikfest", "Literaturfestival", "Buchmesse", "Dichterlesung",
    "Autorenlesung", "Theaterpreis", "Filmpreis", "Kulturpreis", "Museumsnacht",
    "Freilichtmuseum", "Volkskundemuseum", "Heimatmuseum", "Stadtarchiv", "Handschriftenabteilung",
    "Historikerin", "Konservator", "Kuratorin", "Museumsdirektor", "Bühnenregisseur",
    "Opernsänger", "Solotänzer", "Prima-Ballerina", "Konzertmeister", "Dirigentenstab"
], "Kultur")

print("--- Final Top-Ups ---")
check([
    "Forschungsaufenthalt", "Laborbericht", "Versuchsreihe", "Publikationsorgan", "Wissenschaftssprache",
    "Hypothesenprüfung", "Modellversuch", "Forschungserfolg", "Theoriegebäude", "Anwendungsbereich"
], "Wissenschaft final")

check([
    "Rhetorikseminar", "Redegewandtheit", "Gesprächsrunde", "Telefongespräch", "Bürgerdialog",
    "Verständigungswille", "Zwischenruf", "Erwiderung", "Bedenkzeit", "Schlusswort"
], "Kommunikation final")

check([
    "Herzenswunsch", "Erleichterungsgefühl", "Glücksmoment", "Lebensoptimismus", "Trauerphase",
    "Abschiedsschmerz", "Herzschmerz", "Verzagtheit", "Zweifelsstunde", "Wohlgefühl",
    "Gefühlschaos", "Gemütsruhe", "Seelenruhe", "Herzenslust", "Dankbarkeitsbekundung"
], "Gefühle final")

check([
    "Webseitenbetreiber", "Internetauftritt", "Onlinepräsenz", "Medienkonsum", "Nachrichtenportal",
    "Kabelnetz", "Glasfaserkabel", "Sicherheitszertifikat", "Benutzerkonto", "Zugangsdaten"
], "Medien final")

check([
    "Kulturgeschichte", "Kulturlandschaft", "Kulturdenkmalpflege", "Epochenbegriff", "Zeitepoche",
    "Kammermusik", "Sinfoniekonzert", "Operninszenierung", "Theaterpremiere", "Schauspielhaus"
], "Kultur final")
