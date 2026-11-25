import re

with open('src/data/vocabulary/a1.ts', 'r', encoding='utf-8') as f:
    text = f.read()

words_to_check = ['Haltestelle', 'Verspätung', 'Nachricht', 'sparen']
entries = text.split('  {\n')
found = []
for idx, entry in enumerate(entries[1:], 1):
    for w in words_to_check:
        if f'word: "{w}"' in entry or f"word: '{w}'" in entry:
            id_m = re.search(r'id:\s*["\']([^"\']+)["\']', entry)
            entry_id = id_m.group(1) if id_m else 'unknown'
            found.append((entry_id, w, entry[:200]))

print(f"Found {len(found)} entries in A1:")
for f_id, f_w, snippet in found:
    print(f"  {f_id}: {f_w}")
