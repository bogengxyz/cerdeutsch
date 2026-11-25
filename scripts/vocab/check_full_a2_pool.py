import re
import sys
sys.path.append('scripts/vocab')
from generator_core import parse_tuple
from generate_a2 import EXISTING_A2
from a2_topics_part1 import PART_1
from a2_topics_part2 import PART_2
from a2_topics_part3 import PART_3
from a2_supplement_part4 import SUPPLEMENT_PART4
from a2_supplement_part5 import SUPPLEMENT_PART5
from generate_a2_fill import CANDIDATES

# 1. Load A1
with open('src/data/vocabulary/a1.ts', 'r', encoding='utf-8') as f:
    a1_text = f.read()
a1_lemmas = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', a1_text))

seen = set()
entries = []

# Existing A2
for e in EXISTING_A2:
    w = e['word'].strip().lower()
    entries.append(e)
    seen.add(w)

parts = [PART_1, PART_2, PART_3, SUPPLEMENT_PART4, SUPPLEMENT_PART5]
for part in parts:
    for tup in part:
        p = parse_tuple(tup, 'A2')
        w = p['word'].strip().lower()
        if w not in seen and w not in a1_lemmas:
            seen.add(w)
            entries.append(p)

for topic, c_list in CANDIDATES.items():
    for tup in c_list:
        p = parse_tuple(tup, 'A2')
        w = p['word'].strip().lower()
        if w not in seen and w not in a1_lemmas:
            seen.add(w)
            entries.append(p)

print(f"Total clean unique entries in pool: {len(entries)}")
print(f"Needed to reach 900: {900 - len(entries)}")

topic_counts = {}
for e in entries:
    t = e['topic']
    topic_counts[t] = topic_counts.get(t, 0) + 1

print("\nCurrent Topic Distribution:")
for t, c in sorted(topic_counts.items(), key=lambda x: x[1]):
    print(f"  {t}: {c}")
