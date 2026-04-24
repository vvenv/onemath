#!/usr/bin/env node
/**
 * Fix duplicate class attributes in SVG files by merging them.
 *
 * This script fixes cases where an element has multiple class attributes
 * (e.g., class="stroke-blue-500" class="fill-none") and merges them into one.
 *
 * Run: node scripts/fix-duplicate-classes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

function rewrite(svg) {
  let s = svg;
  let changed = 0;

  // Find elements with duplicate class attributes and merge them
  // Pattern: class="..." class="..."
  const duplicateClassRe = /class=(["'])([^"']*)\1\s+class=(["'])([^"']*)\3/g;
  s = s.replace(duplicateClassRe, (match, quote1, class1, quote2, class2) => {
    changed += 1;
    const mergedClass = `${class1} ${class2}`;
    return `class=${quote1}${mergedClass}${quote1}`;
  });

  return { svg: s, changed };
}

function walkSvgs(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...walkSvgs(p));
    else if (name.endsWith(".svg")) out.push(p);
  }
  return out;
}

const files = [
  ...walkSvgs(path.join(ROOT, "src/data/problems/figures")),
  ...walkSvgs(path.join(ROOT, "src/data/knowledge/figures")),
];

let totalFiles = 0;
let totalChanges = 0;
for (const f of files) {
  const raw = fs.readFileSync(f, "utf8");
  const { svg, changed } = rewrite(raw);
  if (changed > 0) {
    fs.writeFileSync(f, svg);
    totalFiles += 1;
    totalChanges += changed;
    console.log(`✓ ${path.relative(ROOT, f)}  (${changed} fixes)`);
  }
}
console.log(`\nDone. ${totalFiles} files updated, ${totalChanges} duplicate class fixes.`);
