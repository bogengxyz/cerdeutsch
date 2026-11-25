"""
Automated B2 candidate test & builder tool.
"""
from extract_seen import get_words
from b2_existing import B2_EXISTING_RAW
from generator_core import parse_tuple

a1 = get_words('src/data/vocabulary/a1.ts')
a2 = get_words('src/data/vocabulary/a2.ts')
b1 = get_words('src/data/vocabulary/b1.ts')
b2_existing_words = {e['word'] for e in B2_EXISTING_RAW}

forbidden = a1 | a2 | b1 | b2_existing_words

def check_list(lst, label="Candidates"):
    clean = []
    seen = set()
    collisions = []
    topic_counts = {}
    
    for tup in lst:
        word = tup[0]
        topic = tup[4]
        if word in forbidden:
            collisions.append(word)
            continue
        if word in seen:
            continue
        seen.add(word)
        try:
            entry = parse_tuple(tup, default_level="B2")
            clean.append(tup)
            topic_counts[topic] = topic_counts.get(topic, 0) + 1
        except Exception as e:
            print(f"Error parsing '{word}': {e}")
            
    print(f"[{label}] Valid clean entries: {len(clean)}, Collisions: {len(collisions)}")
    print(f"[{label}] Topic distribution: {topic_counts}")
    return clean, collisions
