import re

with open('src/data/vocabulary/a1.ts', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    # voc-a1-309
    'word: "Haltestelle"': 'word: "U-Bahn-Station"',
    'article: "die",\n    plural: "Haltestellen",\n    partOfSpeech: "Nomen",\n    meaningId: "pemberhentian bus / halte"': 'article: "die",\n    plural: "U-Bahn-Stationen",\n    partOfSpeech: "Nomen",\n    meaningId: "stasiun kereta bawah tanah"',
    'exampleDe: "Der Bus hält direkt an der nächsten Haltestelle."': 'exampleDe: "Wir treffen uns direkt vor der U-Bahn-Station."',
    'exampleId: "Bus itu berhenti tepat di halte berikutnya."': 'exampleId: "Kita bertemu tepat di depan stasiun kereta bawah tanah."',

    # voc-a1-319
    'word: "Verspätung"': 'word: "Fahrradweg"',
    'article: "die",\n    plural: "Verspätungen",\n    partOfSpeech: "Nomen",\n    meaningId: "keterlambatan"': 'article: "der",\n    plural: "Fahrradwege",\n    partOfSpeech: "Nomen",\n    meaningId: "jalur sepeda"',
    'exampleDe: "Der Zug hat heute leider zehn Minuten Verspätung."': 'exampleDe: "In der Stadt fahre ich sicher auf dem breiten Fahrradweg."',
    'exampleId: "Keretanya hari ini sayangnya terlambat sepuluh menit."': 'exampleId: "Di kota saya bersepeda dengan aman di jalur sepeda yang lebar."',

    # voc-a1-493
    'word: "sparen"': 'word: "Geldautomat"',
    'partOfSpeech: "Verb",\n    praesens: "spart",\n    praeteritum: "sparte",\n    perfekt: "hat gespart",\n    partizip2: "gespart",\n    meaningId: "menabung / menghemat"': 'article: "der",\n    plural: "Geldautomaten",\n    partOfSpeech: "Nomen",\n    meaningId: "mesin ATM / anjungan tunai mandiri"',
    'exampleDe: "Ich möchte jeden Monat etwas Geld sparen."': 'exampleDe: "Ich hebe am Geldautomaten fünfzig Euro ab."',
    'exampleId: "Saya ingin menabung sedikit uang setiap bulan."': 'exampleId: "Saya mengambil lima puluh euro di mesin ATM."',

    # voc-a1-552
    'word: "Nachricht"': 'word: "Sprachnachricht"',
    'article: "die",\n    plural: "Nachrichten",\n    partOfSpeech: "Nomen",\n    meaningId: "berita / pesan"': 'article: "die",\n    plural: "Sprachnachrichten",\n    partOfSpeech: "Nomen",\n    meaningId: "pesan suara (voice note)"',
    'exampleDe: "Ich habe gestern eine wichtige Nachricht erhalten."': 'exampleDe: "Sie schickte mir eine kurze Sprachnachricht."',
    'exampleId: "Saya kemarin menerima sebuah pesan penting."': 'exampleId: "Dia mengirimi saya sebuah pesan suara singkat."'
}

new_content = content
for old_s, new_s in replacements.items():
    if old_s not in new_content:
        print(f"Warning: could not find target: {old_s[:40]}")
    else:
        new_content = new_content.replace(old_s, new_s, 1)

with open('src/data/vocabulary/a1.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Applied A1 fixes successfully!")
