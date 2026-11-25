"""
B2 Pool Builder and Candidate Repository.
Contains rich candidate vocabulary pools for B2 across all 18 canonical topics.
Filters against forbidden lemmas (A1, A2, B1, and existing B2).
"""
import sys
from extract_seen import get_words
from b2_existing import B2_EXISTING_RAW

a1 = get_words('src/data/vocabulary/a1.ts')
a2 = get_words('src/data/vocabulary/a2.ts')
b1 = get_words('src/data/vocabulary/b1.ts')
b2_existing_words = {e['word'] for e in B2_EXISTING_RAW}

forbidden = a1 | a2 | b1 | b2_existing_words
print(f"Loaded {len(forbidden)} forbidden lemmas from A1, A2, B1, and B2 existing.")

def filter_candidates(candidate_list):
    clean = []
    seen = set()
    collisions = []
    for item in candidate_list:
        word = item[0]
        if word in forbidden:
            collisions.append(word)
        elif word in seen:
            pass
        else:
            seen.add(word)
            clean.append(item)
    return clean, collisions
