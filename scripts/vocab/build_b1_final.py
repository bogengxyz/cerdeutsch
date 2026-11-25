"""
Final Assembly Script for B1 Vocabulary:
Produces exactly 1,100 unique entries in src/data/vocabulary/b1.ts,
with 61 entries in 16 topics and 62 entries in 2 topics.
Zero duplicates, zero overlaps with A1, A2, and existing B2 entries.
Preserves existing 18 B1 entries (voc-b1-1 through voc-b1-18).
"""
import re
import sys
sys.path.append('scripts/vocab')
from generator_core import parse_tuple, format_ts_entry, CANONICAL_TOPICS
from b1_existing import EXISTING_B1
from b1_topics_part1 import B1_PART_1
from b1_topics_part2 import B1_PART_2
from b1_topics_part3 import B1_PART_3
from b1_supplement_120 import B1_SUPPLEMENT

# 1. Load A1, A2, B2 words to guard against cross-level collisions
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
print(f"Loaded {len(forbidden)} forbidden lemmas from A1 (700) + A2 (900) + B2 (18).")

# 2. Collect pool of entries
topic_pools = {t: [] for t in CANONICAL_TOPICS}
seen = set()

# A. Insert existing 18 B1 entries first
for e in EXISTING_B1:
    w = e['word'].strip().lower()
    t = e['topic']
    seen.add(w)
    topic_pools[t].append(e)

print(f"Loaded {len(EXISTING_B1)} existing B1 entries.")

# B. Process all candidate lists
all_source_lists = [
    B1_PART_1,
    B1_PART_2,
    B1_PART_3,
    B1_SUPPLEMENT
]

added_candidates = 0
for s_list in all_source_lists:
    for tup in s_list:
        parsed = parse_tuple(tup, default_level='B1')
        w = parsed['word'].strip()
        w_low = w.lower()
        t = parsed['topic']
        if w_low in seen or w_low in forbidden:
            continue
        seen.add(w_low)
        topic_pools[t].append(parsed)
        added_candidates += 1

print(f"Added {added_candidates} candidate entries.")
print("\nCandidate counts per topic before selection:")
for t in CANONICAL_TOPICS:
    print(f"  {t}: {len(topic_pools[t])}")

# 3. Check that each topic has at least 61 entries
for t in CANONICAL_TOPICS:
    if len(topic_pools[t]) < 61:
        raise ValueError(f"Topic '{t}' has only {len(topic_pools[t])} entries, needs at least 61!")

# 4. Select exactly 1,100 entries:
# 16 topics with 61 entries, 2 topics with 62 entries (16*61 + 2*62 = 976 + 124 = 1,100)
# Let's pick 2 topics that have the largest candidate pools to get 62 entries
sorted_topics_by_pool = sorted(CANONICAL_TOPICS, key=lambda t: len(topic_pools[t]), reverse=True)
top2_topics = set(sorted_topics_by_pool[:2])
print(f"\nTopics receiving 62 entries: {top2_topics}")

final_entries = []
for t in CANONICAL_TOPICS:
    target_count = 62 if t in top2_topics else 61
    selected = topic_pools[t][:target_count]
    final_entries.extend(selected)

print(f"\nTotal selected for B1: {len(final_entries)}")

# 5. Map IDs: existing 18 keep voc-b1-1..voc-b1-18, new entries receive voc-b1-19..voc-b1-1100
existing_ids = {e['id'] for e in EXISTING_B1}

existing_in_final = [e for e in final_entries if e.get('id') in existing_ids]
new_in_final = [e for e in final_entries if e.get('id') not in existing_ids]

print(f"Existing in final: {len(existing_in_final)}")
print(f"New in final: {len(new_in_final)}")

existing_sorted = sorted(existing_in_final, key=lambda x: int(x['id'].split('-')[-1]))

cur_idx = 19
for e in new_in_final:
    e['id'] = f"voc-b1-{cur_idx}"
    cur_idx += 1

final_list = existing_sorted + new_in_final
print(f"Final list total: {len(final_list)} entries (voc-b1-1 to voc-b1-{cur_idx - 1})")

# 6. Format TypeScript file
ts_lines = [
    'import { VocabularyEntry } from "../../types/vocabulary";',
    '',
    '/**',
    ' * B1 Vocabulary Bank - Expanded to exactly 1,100 curated entries.',
    ' * Topics strictly follow the 18 canonical CEFR categories.',
    ' * Preserves existing 18 B1 entries (voc-b1-1 through voc-b1-18).',
    ' */',
    'export const B1_VOCAB_WORDS: VocabularyEntry[] = ['
]

for idx, item in enumerate(final_list):
    ts_lines.append(format_ts_entry(item) + (',' if idx < len(final_list) - 1 else ''))

ts_lines.append('];\n')
ts_lines.append('export const b1Vocabulary = B1_VOCAB_WORDS;\n')

with open('src/data/vocabulary/b1.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(ts_lines))

print("Successfully wrote src/data/vocabulary/b1.ts!")
