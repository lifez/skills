#!/usr/bin/env node
// Validate this collection with Pi's own loader; do not execute any skill workflow.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, realpathSync } from 'node:fs';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const root = resolve(args.find(a => !a.startsWith('--')) ?? join(dirname(fileURLToPath(import.meta.url)), '..'));
const checkInstalled = args.includes('--check-installed');
const packageName = '@earendil-works/pi-coding-agent';
let piDir = process.env.PI_PACKAGE_DIR;
if (!piDir) {
  try { piDir = dirname(createRequire(import.meta.url).resolve(`${packageName}/package.json`)); }
  catch { piDir = join(execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim(), packageName); }
}
if (!existsSync(join(piDir, 'dist/core/skills.js'))) {
  throw new Error('Pi is required. Install Pi or set PI_PACKAGE_DIR to its package directory.');
}
const { loadSkills } = await import(pathToFileURL(join(piDir, 'dist/core/skills.js')).href);
const { parse } = createRequire(join(piDir, 'package.json'))('yaml');
const errors = [];
const allowed = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools', 'disable-model-invocation']);
const dirs = readdirSync(root, { withFileTypes: true }).filter(d => d.isDirectory() && !d.name.startsWith('.') && existsSync(join(root, d.name, 'SKILL.md'))).map(d => d.name).sort();
if (!dirs.length) errors.push('No skill directories found');
const under = (p, base) => { const r = relative(base, p); return r === '' || (!r.startsWith('..') && !isAbsolute(r)); };
const error = (file, message) => errors.push(`${relative(root, file)}: ${message}`);
function markdownFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isSymbolicLink() ? [] : e.isDirectory() ? markdownFiles(join(dir, e.name)) : e.name.endsWith('.md') ? [join(dir, e.name)] : []);
}
for (const name of dirs) {
  const skillFile = join(root, name, 'SKILL.md');
  const content = readFileSync(skillFile, 'utf8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  try {
    if (!match) throw new Error('Missing YAML frontmatter');
    const data = parse(match[1], { uniqueKeys: true });
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Frontmatter must be a mapping');
    if (data.name !== name) error(skillFile, `name must match directory (${name})`);
    if (typeof data.name !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.name) || data.name.length > 64) error(skillFile, 'Invalid skill name');
    if (typeof data.description !== 'string' || !data.description.trim() || data.description.length > 1024) error(skillFile, 'Missing or invalid description');
    for (const key of Object.keys(data)) if (!allowed.has(key)) error(skillFile, `Unsupported frontmatter key ${key}`);
    if ('disable-model-invocation' in data && typeof data['disable-model-invocation'] !== 'boolean') error(skillFile, 'disable-model-invocation must be boolean');
  } catch (e) { error(skillFile, e.message); }
  for (const file of markdownFiles(join(root, name))) {
    const text = readFileSync(file, 'utf8');
    if (/\\n/.test(text)) error(file, 'Literal escaped newline; use real Markdown newlines');
    for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
      const target = match[1].split(/\s+"/)[0];
      if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(target)) continue;
      const path = resolve(dirname(file), decodeURIComponent(target.split('#')[0]));
      if (!existsSync(path)) error(file, `Missing local link ${target}`);
      else if (!under(realpathSync(path), realpathSync(root))) error(file, `Local link escapes collection: ${target}`);
    }
    for (const pattern of [/~\/\.cursor\//, /\bTask tool\b/, /\bconfigured (?:bug-fix|perf-issue|refactoring) model\b/, /per the Subagents section/, /agent-transcripts\//]) {
      if (pattern.test(text)) error(file, `Stale harness dependency ${pattern}`);
    }
  }
}
const loaded = loadSkills({ cwd: root, skillPaths: [root], includeDefaults: false });
for (const diagnostic of loaded.diagnostics) error(diagnostic.path ?? root, diagnostic.message);
if (loaded.skills.length !== dirs.length) errors.push(`Loader accepted ${loaded.skills.length}/${dirs.length} skills`);
if (checkInstalled) {
  const agentDir = process.env.PI_CODING_AGENT_DIR ?? join(homedir(), '.pi/agent');
  const settingsPath = join(agentDir, 'settings.json');
  let settings = {};
  try { settings = JSON.parse(readFileSync(settingsPath, 'utf8')); }
  catch (e) { errors.push(`Cannot read Pi settings: ${e.message}`); }
  const resolveSetting = p => resolve(agentDir, p.startsWith('~/') ? join(homedir(), p.slice(2)) : p);
  if (!(settings.skills ?? []).some(p => typeof p === 'string' && resolveSetting(p) === root)) errors.push('Collection is not registered in user settings.skills');
  const paths = [join(agentDir, 'skills'), join(homedir(), '.agents/skills'), root].filter(existsSync);
  const installed = loadSkills({ cwd: root, skillPaths: paths, includeDefaults: false });
  for (const d of installed.diagnostics) {
    if (under(resolve(d.path ?? '/'), root)) error(d.path ?? root, d.message);
  }
  const local = installed.skills.filter(s => under(resolve(s.filePath), root));
  if (local.length !== dirs.length) errors.push(`Global-name collision: only ${local.length}/${dirs.length} collection skills survived`);
  console.log(`Installed-name check: ${local.length}/${dirs.length} collection skills`);
}
if (errors.length) {
  for (const e of errors) console.error(`FAIL ${e}`);
  process.exitCode = 1;
} else {
  console.log(`PASS ${dirs.length} skills: frontmatter, unique names, Markdown links, harness dependencies, Pi loader${checkInstalled ? ', registration and installed-name collisions' : ''}`);
}
