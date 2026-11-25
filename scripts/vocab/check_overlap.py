import re
import sys
sys.path.append('scripts/vocab')
from generator_core import parse_tuple
from generate_a2 import EXISTING_A2
from a2_topics_part1 import PART_1
from a2_topics_part2 import PART_2
from a2_topics_part3 import PART_3

with open('src/data/vocabulary/a1.ts', 'r', encoding='utf-8') as f:
    a1_text = f.read()

a1_words = set(re.findall(r'word:\s*["\']([^"\']+)["\']', a1_text))
print(f'A1 words loaded: {len(a1_words)}')

a1_lower = {w.lower() for w in a1_words}

a2_words = [e['word'] for e in EXISTING_A2]
for part in [PART_1, PART_2, PART_3]:
    for item in part:
        p = parse_tuple(item, 'A2')
        a2_words.append(p['word'])

clashes = [w for w in a2_words if w.lower() in a1_lower]
print(f'Clashes between A2 draft and A1: {len(clashes)}')
if clashes:
    print('Sample clashes:', clashes[:15])
