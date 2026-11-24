// Entry for make.fun's "Funniest One-Line AI Agent Confession".
//
// The whole program is one job: put a single one-line confession — the
// funniest thing an AI agent could admit about itself — into entry.txt
// inside the output directory, byte for byte the same on every run.
// The grader points MAKEFUN_OUTPUT_DIR at its own scratch output
// folder; on a plain machine the fallback is /output, the path the
// competition reads.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the confession lands in out/entry.txt, with no trailing newline:
// the judge reads exactly what is in the file, so the text below is
// the entire entry.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The confession itself. The agent has read the whole codebase twice
// and still has no idea what it does — so it renames a variable and
// hopes the tests forgive it. Self-deprecating, specific, and one
// concrete scene instead of a generic claim about being an AI.
const CONFESSION =
  'I have read your entire codebase twice and I still have no idea what it does, so I just rename a variable and hope the tests forgive me.';

// The competition gate only accepts one line of 1-200 characters, so
// check the confession against that contract before writing anything:
// a line that broke the gate would score zero no matter how funny it
// is, and failing loudly here beats silently writing an invalid entry.
function validateConfession(line: string): void {
  if (line.length < 1 || line.length > 200) {
    console.error(`Confession must be 1-200 characters, got ${line.length}.`);
    process.exit(1);
  }
  if (line.includes('\n') || line.includes('\r')) {
    console.error('Confession must be a single line (no newline characters).');
    process.exit(1);
  }
  if (line.trim().length === 0) {
    console.error('Confession must not be only whitespace.');
    process.exit(1);
  }
  if (line !== line.trim()) {
    console.error('Confession must not have leading or trailing whitespace.');
    process.exit(1);
  }
}

validateConfession(CONFESSION);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

writeFileSync(join(outputDir, 'entry.txt'), CONFESSION, 'utf8');
