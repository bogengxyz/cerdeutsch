"""
Final Assembly Script for A2 Vocabulary:
Produces exactly 900 unique entries in src/data/vocabulary/a2.ts,
with exactly 50 entries per each of the 18 canonical topics.
Zero duplicates, zero overlaps with A1.
"""
import re
import sys
sys.path.append('scripts/vocab')
from generator_core import parse_tuple, format_ts_entry, CANONICAL_TOPICS
from generate_a2 import EXISTING_A2
from a2_topics_part1 import PART_1
from a2_topics_part2 import PART_2
from a2_topics_part3 import PART_3
from a2_supplement_part4 import SUPPLEMENT_PART4
from a2_supplement_part5 import SUPPLEMENT_PART5
from generate_a2_fill import CANDIDATES
from a2_final_75 import A2_FINAL_75

# 1. Load A1 lemmas and existing B1/B2 words
with open('src/data/vocabulary/a1.ts', 'r', encoding='utf-8') as f:
    a1_text = f.read()
a1_lemmas = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', a1_text))
print(f"Loaded {len(a1_lemmas)} A1 words to guard against overlap.")

with open('src/data/vocabulary/b1.ts', 'r', encoding='utf-8') as f:
    b1_text = f.read()
with open('src/data/vocabulary/b2.ts', 'r', encoding='utf-8') as f:
    b2_text = f.read()
higher_lemmas = set(m.lower().strip() for m in re.findall(r'word:\s*["\']([^"\']+)["\']', b1_text + b2_text))
print(f"Loaded {len(higher_lemmas)} existing B1/B2 words to guard against overlap.")

# 2. Collect pool of entries
topic_pools = {t: [] for t in CANONICAL_TOPICS}
seen = set(higher_lemmas)

# A. Insert existing 20 A2 entries first
for e in EXISTING_A2:
    w = e['word'].strip().lower()
    t = e['topic']
    seen.add(w)
    topic_pools[t].append(e)

# B. Process all candidate lists
all_source_lists = [
    PART_1,
    PART_2,
    PART_3,
    SUPPLEMENT_PART4,
    SUPPLEMENT_PART5,
]
for topic_name, c_list in CANDIDATES.items():
    all_source_lists.append(c_list)
all_source_lists.append(A2_FINAL_75)

for s_list in all_source_lists:
    for tup in s_list:
        parsed = parse_tuple(tup, default_level='A2')
        w = parsed['word'].strip()
        w_low = w.lower()
        t = parsed['topic']
        if w_low in seen or w_low in a1_lemmas:
            continue
        seen.add(w_low)
        topic_pools[t].append(parsed)

print("\nCandidate counts per topic before selection:")
for t in CANONICAL_TOPICS:
    print(f"  {t}: {len(topic_pools[t])}")

# 3. Select exactly 50 per topic
final_entries = []
for t in CANONICAL_TOPICS:
    pool = topic_pools[t]
    if len(pool) < 50:
        raise ValueError(f"Topic '{t}' has only {len(pool)} entries, needs 50!")
    # Take the first 50 entries
    selected = pool[:50]
    final_entries.extend(selected)

print(f"\nTotal selected for A2: {len(final_entries)}")

# 4. Map IDs: existing 20 keep their IDs or are ordered voc-a2-1..voc-a2-900
# Notice: voc-a2-1 to voc-a2-20 are the existing ones.
# Let's ensure existing A2 entries retain their IDs voc-a2-1 to voc-a2-20,
# and new entries take voc-a2-21 to voc-a2-900!
existing_ids = {e['id'] for e in EXISTING_A2}
assigned_ids = set()

# Put existing entries first or preserve their assigned IDs
final_list = []
# First 20 are the existing entries
existing_in_final = [e for e in final_entries if e.get('id') in existing_ids]
new_in_final = [e for e in final_entries if e.get('id') not in existing_ids]

print(f"Existing in final: {len(existing_in_final)}")
print(f"New in final: {len(new_in_final)}")

# Map IDs 1 to 20 to the existing ones if not already set, or sort them by id
# In EXISTING_A2, the IDs were voc-a2-1 to voc-a2-20.
existing_sorted = sorted(existing_in_final, key=lambda x: int(x['id'].split('-')[-1]))

# Re-assign sequential IDs voc-a2-21 to voc-a2-900 for new entries
cur_idx = 21
for e in new_in_final:
    e['id'] = f"voc-a2-{cur_idx}"
    cur_idx += 1

final_list = existing_sorted + new_in_final
print(f"Final list total: {len(final_list)} entries (voc-a2-1 to voc-a2-{cur_idx - 1})")

# 5. Format TypeScript file
ts_lines = [
    'import { VocabularyEntry } from "../../types/vocabulary";',
    '',
    '/**',
    ' * A2 Vocabulary Bank - Expanded to exactly 900 curated entries.',
    ' * Topics strictly follow the 18 canonical CEFR categories with 50 entries each.',
    ' * Preserves existing 20 A2 entries (voc-a2-1 through voc-a2-20).',
    ' */',
    'export const A2_VOCAB_WORDS: VocabularyEntry[] = ['
]

for idx, item in enumerate(final_list):
    ts_lines.append(format_ts_entry(item) + (',' if idx < len(final_list) - 1 else ''))

ts_lines.append('];\n')
ts_lines.append('export const a2Vocabulary = A2_VOCAB_WORDS;\n')

with open('src/data/vocabulary/a2.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(ts_lines))

print("Successfully wrote src/data/vocabulary/a2.ts!")
