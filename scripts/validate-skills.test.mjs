import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const validator = join(dirname(fileURLToPath(import.meta.url)), 'validate-skills.mjs');
const valid = '---\nname: valid-skill\ndescription: A usable fixture for testing validation.\n---\n\n# Valid Skill\n\nRead the source.\n';
function fixture(t, content = valid) {
  const root = mkdtempSync(join(tmpdir(), 'pi-skill-validation-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, 'valid-skill'));
  writeFileSync(join(root, 'valid-skill/SKILL.md'), content);
  return root;
}
function run(root, ...args) {
  const result = spawnSync(process.execPath, [validator, root, ...args], { encoding: 'utf8' });
  return { status: result.status, output: result.stdout + result.stderr };
}
test('valid collection loads through Pi', t => {
  const result = run(fixture(t));
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /PASS 1 skills/);
});
test('manual-only is valid Pi frontmatter', t => {
  const result = run(fixture(t, valid.replace('description:', 'disable-model-invocation: true\ndescription:')));
  assert.equal(result.status, 0, result.output);
});
test('duplicate skill names fail', t => {
  const root = fixture(t);
  mkdirSync(join(root, 'other-skill'));
  writeFileSync(join(root, 'other-skill/SKILL.md'), valid);
  const result = run(root);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /collision/);
});
test('broken reference fails', t => {
  const result = run(fixture(t, valid + '\n[missing](references/absent.md)\n'));
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /Missing local link/);
});
test('literal newline escape fails', t => {
  const result = run(fixture(t, valid + 'first\\nsecond\n'));
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /Literal escaped newline/);
});
test('malformed YAML fails', t => {
  const result = run(fixture(t, valid.replace('A usable fixture for testing validation.', '[unterminated')));
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /FAIL/);
});
test('stale harness dependency fails', t => {
  const result = run(fixture(t, valid + '\nUse the Task tool.\n'));
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /Stale harness dependency/);
});
test('external and fragment links are not local files', t => {
  const result = run(fixture(t, valid + '\n[docs](https://example.com/docs) [section](#valid-skill)\n'));
  assert.equal(result.status, 0, result.output);
});
test('unregistered collection fails installed check', t => {
  const root = fixture(t);
  const result = run(root, '--check-installed');
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /not registered/);
});
