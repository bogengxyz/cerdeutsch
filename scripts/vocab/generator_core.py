"""
Core generator utilities for cerDeutsch vocabulary expansion.
"""
import json
import re

CANONICAL_TOPICS = [
    'Alltag',
    'Familie und Beziehungen',
    'Essen und Trinken',
    'Wohnen',
    'Arbeit und Beruf',
    'Schule und Bildung',
    'Gesundheit',
    'Reisen und Verkehr',
    'Einkaufen',
    'Freizeit und Hobbys',
    'Natur und Umwelt',
    'Gesellschaft',
    'Politik und Wirtschaft',
    'Wissenschaft und Technik',
    'Kommunikation',
    'Gefühle und Meinungen',
    'Medien und Digitalisierung',
    'Kultur und Geschichte'
]

def parse_tuple(tup, default_level="A1"):
    word = tup[0]
    pos = tup[1]
    extra1 = tup[2]
    extra2 = tup[3]
    topic = tup[4]
    subtopic = tup[5]
    mean_id = tup[6]
    ex_de = tup[7]
    ex_id = tup[8]
    diff = tup[9] if len(tup) > 9 and tup[9] else "Leicht"

    if topic not in CANONICAL_TOPICS:
        raise ValueError(f"Invalid topic '{topic}' for word '{word}'")

    entry = {
        'level': default_level,
        'word': word,
        'partOfSpeech': pos,
        'topic': topic,
        'subtopic': subtopic,
        'meaningId': mean_id,
        'exampleDe': ex_de,
        'exampleId': ex_id,
        'difficulty': diff,
    }

    if pos == 'Nomen':
        entry['article'] = extra1
        entry['plural'] = extra2
    elif pos == 'Verb':
        if isinstance(extra1, (list, tuple)) and len(extra1) == 4:
            entry['praesens'] = extra1[0]
            entry['praeteritum'] = extra1[1]
            entry['perfekt'] = extra1[2]
            entry['partizip2'] = extra1[3]
    elif pos == 'Adjektiv':
        if extra1:
            entry['comparative'] = extra1
        if extra2:
            entry['superlative'] = extra2

    return entry

def json_repr(val):
    return json.dumps(val, ensure_ascii=False)

def format_ts_entry(entry):
    lines = ['  {']
    lines.append(f"    id: {json_repr(entry['id'])},")
    lines.append(f"    level: {json_repr(entry['level'])},")
    lines.append(f"    topic: {json_repr(entry['topic'])},")
    if 'subtopic' in entry and entry['subtopic']:
        lines.append(f"    subtopic: {json_repr(entry['subtopic'])},")
    lines.append(f"    word: {json_repr(entry['word'])},")
    if 'article' in entry and entry['article']:
        lines.append(f"    article: {json_repr(entry['article'])},")
    if 'plural' in entry and entry['plural']:
        lines.append(f"    plural: {json_repr(entry['plural'])},")
    lines.append(f"    partOfSpeech: {json_repr(entry['partOfSpeech'])},")
    if 'praesens' in entry and entry['praesens']:
        lines.append(f"    praesens: {json_repr(entry['praesens'])},")
    if 'praeteritum' in entry and entry['praeteritum']:
        lines.append(f"    praeteritum: {json_repr(entry['praeteritum'])},")
    if 'perfekt' in entry and entry['perfekt']:
        lines.append(f"    perfekt: {json_repr(entry['perfekt'])},")
    if 'partizip2' in entry and entry['partizip2']:
        lines.append(f"    partizip2: {json_repr(entry['partizip2'])},")
    if 'comparative' in entry and entry['comparative']:
        lines.append(f"    comparative: {json_repr(entry['comparative'])},")
    if 'superlative' in entry and entry['superlative']:
        lines.append(f"    superlative: {json_repr(entry['superlative'])},")
    lines.append(f"    meaningId: {json_repr(entry['meaningId'])},")
    lines.append(f"    exampleDe: {json_repr(entry['exampleDe'])},")
    lines.append(f"    exampleId: {json_repr(entry['exampleId'])},")
    if 'difficulty' in entry and entry['difficulty']:
        lines.append(f"    difficulty: {json_repr(entry['difficulty'])},")
    if 'audioPath' in entry and entry['audioPath']:
        lines.append(f"    audioPath: {json_repr(entry['audioPath'])},")
    if 'relatedWords' in entry and entry['relatedWords']:
        rw_str = ', '.join([json_repr(r) for r in entry['relatedWords']])
        lines.append(f"    relatedWords: [{rw_str}],")
    lines.append('  }')
    return '\n'.join(lines)
