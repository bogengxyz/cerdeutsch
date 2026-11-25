import re
import sys
sys.path.append('scripts/vocab')
from generator_core import parse_tuple
from generate_a2 import EXISTING_A2
from a2_topics_part1 import PART_1
from a2_topics_part2 import PART_2
from a2_topics_part3 import PART_3

# Load A1 words
with open('src/data/vocabulary/a1.ts', 'r', encoding='utf-8') as f:
    a1_text = f.read()

a1_lemmas = set()
for match in re.finditer(r'word:\s*["\']([^"\']+)["\']', a1_text):
    a1_lemmas.add(match.group(1).lower().strip())

print(f"Loaded {len(a1_lemmas)} A1 words.")

# Collect existing A2
a2_entries = []
seen = set()

for e in EXISTING_A2:
    w = e['word'].strip()
    a2_entries.append(e)
    seen.add(w.lower())

print(f"Existing A2 entries: {len(a2_entries)}")

# Collect from parts, checking against A1 and already seen A2
clash_a1 = []
for part_name, part in [('PART_1', PART_1), ('PART_2', PART_2), ('PART_3', PART_3)]:
    for tup in part:
        parsed = parse_tuple(tup, default_level='A2')
        w = parsed['word'].strip()
        w_low = w.lower()
        if w_low in seen:
            continue
        if w_low in a1_lemmas:
            clash_a1.append(w)
            continue
        seen.add(w_low)
        a2_entries.append(parsed)

print(f"Total non-clashing unique A2 entries collected: {len(a2_entries)}")
print(f"Clashes with A1 skipped: {len(clash_a1)}")
print(f"Needed to reach 900: {900 - len(a2_entries)}")

# Show distribution by topic
topic_counts = {}
for e in a2_entries:
    t = e['topic']
    topic_counts[t] = topic_counts.get(t, 0) + 1

print("\nCurrent Topic Distribution in A2:")
for t, c in sorted(topic_counts.items(), key=lambda x: x[1]):
    print(f"  {t}: {c}")
