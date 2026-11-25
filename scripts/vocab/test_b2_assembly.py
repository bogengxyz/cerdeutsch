import sys
import os
sys.path.insert(0, 'scripts/vocab')
from generator_core import parse_tuple, CANONICAL_TOPICS
from b2_existing import B2_EXISTING_RAW
from b2_topics_part1 import B2_PART_1_RAW
from b2_part1_supplement import B2_PART1_SUPPLEMENT
from b2_topics_part2 import B2_PART_2_RAW
from b2_part2_supplement import B2_PART2_SUPPLEMENT
from b2_part2_deficit import B2_PART2_DEFICIT
from b2_topics_part3 import B2_PART_3_RAW
from b2_part3_supplement import B2_PART3_SUPPLEMENT
from b2_part3_deficit import B2_PART3_DEFICIT
import re

# Load forbidden words from A1, A2, B1
with open('src/data/vocabulary/a1.ts', 'r', encoding='utf-8') as f:
    a1_text = f.read()
with open('src/data/vocabulary/a2.ts', 'r', encoding='utf-8') as f:
    a2_text = f.read()
with open('src/data/vocabulary/b1.ts', 'r', encoding='utf-8') as f:
    b1_text = f.read()

a1_lemmas = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', a1_text))
a2_lemmas = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', a2_text))
b1_lemmas = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', b1_text))

forbidden = a1_lemmas | a2_lemmas | b1_lemmas
print(f"Forbidden lemmas: A1 ({len(a1_lemmas)}) + A2 ({len(a2_lemmas)}) + B1 ({len(b1_lemmas)}) = {len(forbidden)}")

topic_pools = {t: [] for t in CANONICAL_TOPICS}
seen = set()

for e in B2_EXISTING_RAW:
    w = e['word'].strip().lower()
    t = e['topic']
    seen.add(w)
    topic_pools[t].append(e)

all_lists = [
    B2_PART_1_RAW,
    B2_PART1_SUPPLEMENT,
    B2_PART_2_RAW,
    B2_PART2_SUPPLEMENT,
    B2_PART2_DEFICIT,
    B2_PART_3_RAW,
    B2_PART3_SUPPLEMENT,
    B2_PART3_DEFICIT,
]

clash_count = 0
for l in all_lists:
    for tup in l:
        parsed = parse_tuple(tup, default_level='B2')
        w = parsed['word'].strip().lower()
        t = parsed['topic']
        if w in seen or w in forbidden:
            clash_count += 1
            continue
        seen.add(w)
        topic_pools[t].append(parsed)

print(f"Excluded clashes/duplicates: {clash_count}")
print("\nUnique valid entries per topic:")
total = 0
below_72 = []
for t in CANONICAL_TOPICS:
    c = len(topic_pools[t])
    total += c
    status = "OK" if c >= 72 else "BELOW 72!"
    print(f"  {t}: {c} [{status}]")
    if c < 72:
        below_72.append((t, c))

print(f"\nTotal available: {total}")
if below_72:
    print(f"ATTENTION: {len(below_72)} topics below 72: {below_72}")
else:
    print("ALL 18 TOPICS HAVE AT LEAST 72 CLEAN CANDIDATES!")
