import json
with open('src/data/vocabulary/b1.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect the first 18 items
lines = text.split('  {\n')
print(f"Total raw blocks: {len(lines) - 1}")
for i in range(1, min(19, len(lines))):
    print(f"--- Item {i} ---")
    print(lines[i][:250])
