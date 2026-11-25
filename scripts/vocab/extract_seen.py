import re

def get_words(path):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    return set(re.findall(r"word:\s*['\"]([^'\"]+)['\"]", text))

a1 = get_words('src/data/vocabulary/a1.ts')
a2 = get_words('src/data/vocabulary/a2.ts')
b1 = get_words('src/data/vocabulary/b1.ts')
print(f'A1 words: {len(a1)}')
print(f'A2 words: {len(a2)}')
print(f'B1 words: {len(b1)}')
total_seen = a1 | a2 | b1
print(f'Total unique A1+A2+B1: {len(total_seen)}')
