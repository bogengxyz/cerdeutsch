import sys
sys.path.insert(0, 'scripts/vocab')
from test_b2_assembly import seen, forbidden

def test_words(word_list):
    clean = []
    bad = []
    for w in word_list:
        wl = w.lower().strip()
        if wl in seen:
            bad.append((w, 'seen'))
        elif wl in forbidden:
            bad.append((w, 'forbidden'))
        else:
            clean.append(w)
    return clean, bad

kom_proposals = [
    "Gesprächsverlauf", "rhetorisch", "Wortgefecht", "Schlagabtausch", "Zwischenbemerkung",
    "Gegenrede", "Klarstellung", "Verhandlungsgeschick", "Redegewandtheit", "Streitpunkt",
    "Konsensfindung", "Zwischenruf", "Wortführer", "Schlichtung", "Ausflucht"
]

gef_proposals = [
    "Verunsicherung", "Bedenken", "Zerrissenheit", "ausgeglichen", "mitfühlen",
    "befürworten", "Missmut", "Verzweiflung", "Seelenruhe", "Bestürzung",
    "Herzensangelegenheit", "Heimatgefühl", "Tatendrang", "Entrüstet", "Verstimmung",
    "Zwiespalt", "Wehmut", "Ergriffenheit", "Fassungslosigkeit", "Wohlwollen"
]

med_proposals = [
    "Datenpanne", "Rechtemanagement", "Nachrichtenagentur", "Medienkompetenz", "Leitmedium",
    "verschlüsselt", "Online-Portal", "Informationsüberflutung", "Sendeformat", "Medienlandschaft",
    "Schnittstelle", "Breitbandausbau", "Quellcode", "Programmiersprache", "Speicherkapazität",
    "Rechnerleistung", "Software-Update", "Klickrate", "Streamingdienst", "Plattformbetreiber"
]

kul_proposals = [
    "Geschichtsschreibung", "Traditionsbewusstsein", "Archiv", "Urkunde", "Überlieferung",
    "Wiederaufbau", "Denkmalpflege", "Kulturerbe", "Brauchtumspflege", "Museumsbesuch",
    "Kulturförderung", "Geschichtsepoche", "Zeitzeugnis", "Völkerverständigung", "Theateraufführung",
    "Stadtgeschichte", "Kulturkreis", "Kulturschaffende", "Prachtbau", "Kulturgüterschutz",
    "Bauwerk", "Nationalfeiertag", "Jahrhundertwende", "Brauerei", "Ausstellungsstück"
]

print("=== KOMMUNIKATION ===")
c, b = test_words(kom_proposals)
print(f"Clean ({len(c)}): {c}")

print("\n=== GEFÜHLE UND MEINUNGEN ===")
c, b = test_words(gef_proposals)
print(f"Clean ({len(c)}): {c}")

print("\n=== MEDIEN UND DIGITALISIERUNG ===")
c, b = test_words(med_proposals)
print(f"Clean ({len(c)}): {c}")

print("\n=== KULTUR UND GESCHICHTE ===")
c, b = test_words(kul_proposals)
print(f"Clean ({len(c)}): {c}")
