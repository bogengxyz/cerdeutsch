import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { SATZBAU_ITEMS } from './satzbauData';

test('SATZBAU_ITEMS has 100 unique items evenly distributed across A1-B2', () => {
  assert.equal(SATZBAU_ITEMS.length, 100);
  const ids = new Set<string>();
  const byLevel: Record<string, number> = { A1: 0, A2: 0, B1: 0, B2: 0 };

  for (const item of SATZBAU_ITEMS) {
    assert.ok(item.id.trim().length > 0, 'id must not be empty');
    assert.ok(!ids.has(item.id), `duplicate id: ${item.id}`);
    ids.add(item.id);

    assert.ok(item.level in byLevel, `invalid level: ${item.level}`);
    byLevel[item.level] += 1;

    assert.ok(item.topic.trim().length > 0, `${item.id} missing topic`);
    assert.ok(item.meaningId.trim().length > 0, `${item.id} missing meaningId`);
    assert.ok(item.grammarTipId.trim().length > 0, `${item.id} missing grammarTipId`);
    assert.ok(item.tokens.length >= 4, `${item.id} should have at least 4 tokens`);

    if (item.audioPath) {
      const diskPath = path.resolve(process.cwd(), 'public', item.audioPath.replace(/^\//, ''));
      assert.ok(fs.existsSync(diskPath), `${item.id} claims audio at ${item.audioPath} but file does not exist`);
    }
  }

  assert.equal(byLevel.A1, 25);
  assert.equal(byLevel.A2, 25);
  assert.equal(byLevel.B1, 25);
  assert.equal(byLevel.B2, 25);
});
