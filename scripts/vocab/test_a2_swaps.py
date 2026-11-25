import re

with open('src/data/vocabulary/a1.ts', 'r', encoding='utf-8') as f:
    a1_text = f.read()

with open('src/data/vocabulary/a2.ts', 'r', encoding='utf-8') as f:
    a2_text = f.read()

with open('src/data/vocabulary/b1.ts', 'r', encoding='utf-8') as f:
    b1_text = f.read()

with open('src/data/vocabulary/b2.ts', 'r', encoding='utf-8') as f:
    b2_text = f.read()

all_existing = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', a1_text + b1_text + b2_text))

replacements = ['Bewerbungsunterlagen', 'Gleitzeit', 'Arbeitserfahrung', 'hilfsbereit', 'Speisekarte']

for r in replacements:
    print(f"'{r}' already exists: {r.lower() in all_existing}")
