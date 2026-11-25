import re

with open('src/data/vocabulary/a1.ts', 'r', encoding='utf-8') as f:
    a1_text = f.read()

with open('src/data/vocabulary/a2.ts', 'r', encoding='utf-8') as f:
    a2_text = f.read()

all_words = set(re.findall(r'word:\s*["\']([^"\']+)["\']', a1_text + a2_text))
all_words_lower = {w.lower() for w in all_words}

candidates = [
    'U-Bahn-Station',
    'Fahrradweg',
    'Geldautomat',
    'Sprachnachricht'
]

for w in candidates:
    print(f"'{w}' in all_words: {w.lower() in all_words_lower}")
