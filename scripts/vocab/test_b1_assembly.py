import re
import sys
sys.path.append('scripts/vocab')
from generator_core import parse_tuple, CANONICAL_TOPICS
from b1_existing import EXISTING_B1
from b1_topics_part1 import B1_PART_1
from b1_topics_part2 import B1_PART_2
from b1_topics_part3 import B1_PART_3

# Load A1 and A2
with open('src/data/vocabulary/a1.ts', 'r', encoding='utf-8') as f:
    a1_text = f.read()
with open('src/data/vocabulary/a2.ts', 'r', encoding='utf-8') as f:
    a2_text = f.read()
with open('src/data/vocabulary/b2.ts', 'r', encoding='utf-8') as f:
    b2_text = f.read()

a1_lemmas = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', a1_text))
a2_lemmas = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', a2_text))
b2_lemmas = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', b2_text))

forbidden = a1_lemmas | a2_lemmas | b2_lemmas
print(f"Total forbidden lemmas (A1 + A2 + B2): {len(forbidden)}")

topic_pools = {t: [] for t in CANONICAL_TOPICS}
seen = set()

# 1. Existing B1 entries
for e in EXISTING_B1:
    w = e['word'].strip().lower()
    t = e['topic']
    seen.add(w)
    topic_pools[t].append(e)

print(f"Loaded {len(EXISTING_B1)} existing B1 entries.")

# 2. Add from Parts 1, 2, 3
skipped_forbidden = 0
skipped_dup = 0
added = 0

for part_name, part in [('Part 1', B1_PART_1), ('Part 2', B1_PART_2), ('Part 3', B1_PART_3)]:
    for tup in part:
        parsed = parse_tuple(tup, default_level='B1')
        w = parsed['word'].strip()
        w_low = w.lower()
        t = parsed['topic']
        if w_low in forbidden:
            skipped_forbidden += 1
            continue
        if w_low in seen:
            skipped_dup += 1
            continue
        seen.add(w_low)
        topic_pools[t].append(parsed)
        added += 1

print(f"Added from parts: {added}")
print(f"Skipped forbidden (in A1/A2/B2): {skipped_forbidden}")
print(f"Skipped duplicates within B1: {skipped_dup}")

total_candidates = sum(len(pool) for pool in topic_pools.values())
print(f"\nTotal candidate entries across all topics: {total_candidates}")
print("\nTopic Breakdown:")
for t in CANONICAL_TOPICS:
    print(f"  {t}: {len(topic_pools[t])}")
