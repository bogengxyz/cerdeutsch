#!/usr/bin/env python3
"""
Final A1 builder: Produces exactly 700 validated entries in src/data/vocabulary/a1.ts.
"""
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from a1_topics_part1 import PART_1
from a1_topics_part2 import PART_2
from a1_topics_part3 import PART_3
from generate_a1 import EXISTING_A1
from generator_core import parse_tuple, format_ts_entry, CANONICAL_TOPICS

EXTRA_6 = [
    ['Gabel', 'Nomen', 'die', 'Gabeln', 'Essen und Trinken', 'Besteck', 'garpu', 'Ich esse den Salat mit einer Gabel.', 'Saya makan salad dengan garpu.', 'Leicht'],
    ['Löffel', 'Nomen', 'der', 'Löffel', 'Essen und Trinken', 'Besteck', 'sendok', 'Die Suppe isst man mit einem Löffel.', 'Sup dimakan dengan sendok.', 'Leicht'],
    ['Messer', 'Nomen', 'das', 'Messer', 'Essen und Trinken', 'Besteck', 'pisau', 'Das Messer schneidet das Brot gut.', 'Pisau itu memotong roti dengan baik.', 'Leicht'],
    ['Teller', 'Nomen', 'der', 'Teller', 'Essen und Trinken', 'Geschirr', 'piring', 'Das Essen liegt auf dem weißen Teller.', 'Makanan itu ada di piring putih.', 'Leicht'],
    ['Tasse', 'Nomen', 'die', 'Tassen', 'Essen und Trinken', 'Geschirr', 'cangkir', 'Eine Tasse Tee wärmt im Winter.', 'Secangkir teh menghangatkan di musim dingin.', 'Leicht'],
    ['Glas', 'Nomen', 'das', 'Gläser', 'Essen und Trinken', 'Geschirr', 'gelas', 'Ich trinke ein Glas frisches Wasser.', 'Saya minum segelas air segar.', 'Leicht'],
]

def main():
    final_entries = []
    seen_words = set()

    # 1. Existing 25
    for item in EXISTING_A1:
        w_lower = item['word'].lower()
        seen_words.add(w_lower)
        final_entries.append(item)

    # 2. Candidate raw tuples
    all_raw = PART_1 + PART_2 + PART_3 + EXTRA_6

    next_id_num = 26
    for t in all_raw:
        w = t[0]
        w_lower = w.lower()
        if w_lower in seen_words:
            continue
        seen_words.add(w_lower)

        entry = parse_tuple(t, default_level="A1")
        entry['id'] = f"voc-a1-{next_id_num}"
        next_id_num += 1
        final_entries.append(entry)

        if len(final_entries) == 700:
            break

    print(f"Total A1 entries built: {len(final_entries)}")
    if len(final_entries) != 700:
        print(f"Error: Expected 700, got {len(final_entries)}")
        sys.exit(1)

    # Write out src/data/vocabulary/a1.ts
    out_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../src/data/vocabulary/a1.ts'))
    
    lines = [
        "import { VocabularyEntry } from '../../types/vocabulary';",
        "",
        "export const A1_VOCAB_WORDS: VocabularyEntry[] = [",
    ]
    for e in final_entries:
        lines.append(format_ts_entry(e))
    lines.append("];")
    lines.append("")

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    print(f"Successfully wrote {len(final_entries)} entries to {out_path}")

if __name__ == '__main__':
    main()
