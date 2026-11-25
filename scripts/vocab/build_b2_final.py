"""
Final Assembly Script for B2 Vocabulary:
Produces exactly 1,300 unique entries in src/data/vocabulary/b2.ts,
with 72 entries in 14 topics and 73 entries in 4 topics (14 * 72 + 4 * 73 = 1,300).
Zero duplicates, zero overlaps with A1, A2, and B1.
Preserves existing 18 B2 entries (voc-b2-1 through voc-b2-18).
"""
import re
import sys
sys.path.append('scripts/vocab')
from generator_core import parse_tuple, format_ts_entry, CANONICAL_TOPICS
from b2_existing import B2_EXISTING_RAW
from b2_topics_part1 import B2_PART_1_RAW
from b2_part1_supplement import B2_PART1_SUPPLEMENT
from b2_topics_part2 import B2_PART_2_RAW
from b2_part2_supplement import B2_PART2_SUPPLEMENT
from b2_part2_deficit import B2_PART2_DEFICIT
from b2_topics_part3 import B2_PART_3_RAW
from b2_part3_supplement import B2_PART3_SUPPLEMENT
from b2_part3_deficit import B2_PART3_DEFICIT

# 1. Load A1, A2, B1 words to guard against cross-level collisions
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
print(f"Loaded {len(forbidden)} forbidden lemmas from A1 (700) + A2 (900) + B1 (1100).")

# 2. Collect pool of entries
topic_pools = {t: [] for t in CANONICAL_TOPICS}
seen = set()

# A. Insert existing 18 B2 entries first
for e in B2_EXISTING_RAW:
    w = e['word'].strip().lower()
    t = e['topic']
    seen.add(w)
    topic_pools[t].append(e)

print(f"Loaded {len(B2_EXISTING_RAW)} existing B2 entries.")

# B. Process all candidate lists
all_source_lists = [
    B2_PART_1_RAW,
    B2_PART1_SUPPLEMENT,
    B2_PART_2_RAW,
    B2_PART2_SUPPLEMENT,
    B2_PART2_DEFICIT,
    B2_PART_3_RAW,
    B2_PART3_SUPPLEMENT,
    B2_PART3_DEFICIT,
]

added_candidates = 0
for s_list in all_source_lists:
    for tup in s_list:
        parsed = parse_tuple(tup, default_level='B2')
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

# 3. Check that each topic has at least 72 entries
for t in CANONICAL_TOPICS:
    if len(topic_pools[t]) < 72:
        raise ValueError(f"Topic '{t}' has only {len(topic_pools[t])} entries, needs at least 72!")

# 4. Select exactly 1,300 entries:
# 14 topics with 72 entries, 4 topics with 73 entries (14*72 + 4*73 = 1,008 + 292 = 1,300)
sorted_topics_by_pool = sorted(CANONICAL_TOPICS, key=lambda t: len(topic_pools[t]), reverse=True)
top4_topics = set(sorted_topics_by_pool[:4])
print(f"\nTopics receiving 73 entries: {top4_topics}")

final_entries = []
for t in CANONICAL_TOPICS:
    target_count = 73 if t in top4_topics else 72
    selected = topic_pools[t][:target_count]
    final_entries.extend(selected)

print(f"\nTotal selected for B2: {len(final_entries)}")

# 5. Map IDs: existing 18 keep voc-b2-1..voc-b2-18, new entries receive voc-b2-19..voc-b2-1300
existing_ids = {e['id'] for e in B2_EXISTING_RAW}

existing_in_final = [e for e in final_entries if e.get('id') in existing_ids]
new_in_final = [e for e in final_entries if e.get('id') not in existing_ids]

print(f"Existing in final: {len(existing_in_final)}")
print(f"New in final: {len(new_in_final)}")

existing_sorted = sorted(existing_in_final, key=lambda x: int(x['id'].split('-')[-1]))

cur_idx = 19
for e in new_in_final:
    e['id'] = f"voc-b2-{cur_idx}"
    cur_idx += 1

final_list = existing_sorted + new_in_final
print(f"Final list total: {len(final_list)} entries (voc-b2-1 to voc-b2-{cur_idx - 1})")

# 6. Format TypeScript file
ts_lines = [
    'import { VocabularyEntry } from "../../types/vocabulary";',
    '',
    '/**',
    ' * B2 Vocabulary Bank - Expanded to exactly 1,300 curated entries.',
    ' * Topics strictly follow the 18 canonical CEFR categories.',
    ' * Preserves existing 18 B2 entries (voc-b2-1 through voc-b2-18).',
    ' */',
    'export const B2_VOCAB_WORDS: VocabularyEntry[] = ['
]

for idx, item in enumerate(final_list):
    ts_lines.append(format_ts_entry(item) + (',' if idx < len(final_list) - 1 else ''))

ts_lines.append('];\n')
ts_lines.append('export const b2Vocabulary = B2_VOCAB_WORDS;\n')

with open('src/data/vocabulary/b2.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(ts_lines))

print("Successfully wrote src/data/vocabulary/b2.ts!")
