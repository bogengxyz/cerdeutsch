import re

with open('src/data/vocabulary/b1.ts', 'r', encoding='utf-8') as f:
    b1_text = f.read()

with open('src/data/vocabulary/b2.ts', 'r', encoding='utf-8') as f:
    b2_text = f.read()

b1_existing = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', b1_text))
b2_existing = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', b2_text))
protected_higher = b1_existing | b2_existing

with open('src/data/vocabulary/a2.ts', 'r', encoding='utf-8') as f:
    a2_text = f.read()

a2_words = re.findall(r'word:\s*["\']([^"\']+)["\']', a2_text)

clashing_in_a2 = [w for w in a2_words if w.lower().strip() in protected_higher]
print(f"Words in A2 that collide with existing B1/B2: {len(clashing_in_a2)}")
for w in clashing_in_a2:
    print(f"  {w}")
