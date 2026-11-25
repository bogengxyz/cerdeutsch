import re
import json

with open('src/data/vocabulary/b1.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract items
entries = []
# split by { ... }
import re
id_matches = re.findall(r'id:\s*["\']([^"\']+)["\']', text)
word_matches = re.findall(r'word:\s*["\']([^"\']+)["\']', text)
topic_matches = re.findall(r'topic:\s*["\']([^"\']+)["\']', text)

print(f"Total entries in B1: {len(id_matches)}")
for i, w, t in zip(id_matches, word_matches, topic_matches):
    print(f"  {i}: {w} ({t})")
