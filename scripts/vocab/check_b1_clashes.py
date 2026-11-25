import re

with open('src/data/vocabulary/a1.ts', 'r', encoding='utf-8') as f:
    a1_text = f.read()

with open('src/data/vocabulary/a2.ts', 'r', encoding='utf-8') as f:
    a2_text = f.read()

a1_lemmas = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', a1_text))
a2_lemmas = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', a2_text))

with open('src/data/vocabulary/b1.ts', 'r', encoding='utf-8') as f:
    b1_text = f.read()

b1_words = re.findall(r'word:\s*["\']([^"\']+)["\']', b1_text)

print(f"Total existing B1 words: {len(b1_words)}")
for w in b1_words:
    in_a1 = w.lower() in a1_lemmas
    in_a2 = w.lower() in a2_lemmas
    print(f"  {w}: in A1={in_a1}, in A2={in_a2}")
