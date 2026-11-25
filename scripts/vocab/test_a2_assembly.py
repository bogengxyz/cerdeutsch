import re
import sys
sys.path.append('scripts/vocab')
from generator_core import parse_tuple, format_ts_entry
from generate_a2 import EXISTING_A2
from a2_topics_part1 import PART_1
from a2_topics_part2 import PART_2
from a2_topics_part3 import PART_3
from a2_supplement_part4 import SUPPLEMENT_PART4
from a2_supplement_part5 import SUPPLEMENT_PART5

# Load A1 words
with open('src/data/vocabulary/a1.ts', 'r', encoding='utf-8') as f:
    a1_text = f.read()

a1_lemmas = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', a1_text))
print(f"Loaded {len(a1_lemmas)} A1 words.")

entries = []
seen = set()

# 1. Existing A2
for e in EXISTING_A2:
    w = e['word'].strip()
    entries.append(e)
    seen.add(w.lower())

print(f"Existing A2 entries: {len(entries)}")

# 2. Add from all parts
parts = [
    ('Part 1', PART_1),
    ('Part 2', PART_2),
    ('Part 3', PART_3),
    ('Supplement 4', SUPPLEMENT_PART4),
    ('Supplement 5', SUPPLEMENT_PART5)
]

clash_a1_count = 0
dup_a2_count = 0

for name, part in parts:
    added_in_part = 0
    for tup in part:
        parsed = parse_tuple(tup, default_level='A2')
        w = parsed['word'].strip()
        w_low = w.lower()
        if w_low in seen:
            dup_a2_count += 1
            continue
        if w_low in a1_lemmas:
            clash_a1_count += 1
            continue
        seen.add(w_low)
        entries.append(parsed)
        added_in_part += 1
    print(f"{name}: added {added_in_part} entries.")

print(f"\nTotal collected: {len(entries)}")
print(f"Clashes with A1 skipped: {clash_a1_count}")
print(f"Duplicates in A2 skipped: {dup_a2_count}")

# Check topic distribution
topic_counts = {}
for e in entries:
    t = e['topic']
    topic_counts[t] = topic_counts.get(t, 0) + 1

print("\nTopic distribution:")
for t, c in sorted(topic_counts.items()):
    print(f"  {t}: {c}")

print(f"\nDifference from 900: {len(entries) - 900}")
