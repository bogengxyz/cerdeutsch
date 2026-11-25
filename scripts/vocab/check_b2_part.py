from extract_seen import get_words
from b2_topics_part1 import B2_PART_1
from b2_existing import B2_EXISTING_RAW
from generator_core import parse_tuple

a1 = get_words('src/data/vocabulary/a1.ts')
a2 = get_words('src/data/vocabulary/a2.ts')
b1 = get_words('src/data/vocabulary/b1.ts')
b2_existing_words = {e['word'] for e in B2_EXISTING_RAW}

forbidden = a1 | a2 | b1 | b2_existing_words
print(f"Total forbidden lemmas: {len(forbidden)}")

seen_part1 = set()
errors = []
topic_counts = {}

for tup in B2_PART_1:
    word = tup[0]
    topic = tup[4]
    topic_counts[topic] = topic_counts.get(topic, 0) + 1
    
    if word in forbidden:
        errors.append(f"Collision with forbidden word: '{word}'")
    if word in seen_part1:
        errors.append(f"Duplicate within Part 1: '{word}'")
    seen_part1.add(word)
    
    try:
        entry = parse_tuple(tup, default_level="B2")
    except Exception as e:
        errors.append(f"Parse error for '{word}': {e}")

print(f"Part 1 total: {len(B2_PART_1)}, unique: {len(seen_part1)}")
print(f"Topic counts: {topic_counts}")
if errors:
    print(f"Errors found ({len(errors)}):")
    for err in errors:
        print("  -", err)
else:
    print("Part 1 validation clean! No errors, zero clashes with A1, A2, B1, or existing B2.")
