import sys
sys.path.insert(0, 'scripts/vocab')
from test_b2_assembly import seen, forbidden

candidates = [
    # Kommunikation
    "Gesprächsverlauf", "rhetorisch", "Zwischenton", "einräumen", "widerlegen",
    # Gefühle und Meinungen
    "Verunsicherung", "Nostalgie", "Bedenken", "Zerrissenheit", "ausgeglichen",
    "Verbitterung", "mitfühlen", "Zuversicht", "befürworten", "argwöhnisch",
    "Empörung", "Gelassenheit",
    # Medien und Digitalisierung
    "Urheberrecht", "Datenpanne", "Benutzeroberfläche", "Suchmaschine",
    "Rechtemanagement", "Nachrichtenagentur", "Medienkompetenz", "Leitmedium",
    "Cloud-Speicher", "Netzabdeckung", "verschlüsselt", "Online-Portal",
    # Kultur und Geschichte
    "Weltkulturerbe", "Denkmalschutz", "Geschichtsschreibung", "Brauchtum",
    "Ausgrabung", "Gedenkstätte", "Restaurierung", "zeitgenössisch",
    "Epoche", "Traditionsbewusstsein", "Kunstwerk", "Archiv",
    "Baudenkmal", "Urkunde", "Überlieferung", "Wiederaufbau",
    "Kulturgut", "Museumslandschaft"
]

all_bad = []
for c in candidates:
    cl = c.lower().strip()
    if cl in seen:
        all_bad.append((c, 'in seen'))
    elif cl in forbidden:
        all_bad.append((c, 'in forbidden'))

print(f"Checked {len(candidates)} candidates.")
print(f"Conflicts ({len(all_bad)}): {all_bad}")
