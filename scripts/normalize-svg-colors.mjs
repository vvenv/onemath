#!/usr/bin/env node
/**
 * Rewrite structural/text/paper colors across all extracted SVG figures to be
 * theme-aware (currentColor / none). Leaves semantic accent colors untouched.
 *
 * Mapping:
 *   #1B4F72, #2E86C1           -> currentColor   (structural outlines / navy text)
 *   #566573, #5D6D7E, #7F8C8D  -> currentColor   (structural gray labels)
 *   fill="#fdfefe"             -> fill="none"    (paper-white background)
 *   fill="#d6eaf8"             -> fill="currentColor" fill-opacity="0.12" (wash)
 *
 * All other hex colors are preserved as semantic accents.
 *
 * Run: node scripts/normalize-svg-colors.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

const STRUCT_COLORS = ["1b4f72", "2e86c1", "566573", "5d6d7e", "7f8c8d"];

function rewrite(svg) {
  let s = svg;
  let changed = 0;

  // Structural -> currentColor for both stroke and fill.
  const structRe = new RegExp(
    `(stroke|fill|stop-color)=(["'])#(?:${STRUCT_COLORS.join("|")})\\2`,
    "gi",
  );
  s = s.replace(structRe, (_m, attr, q) => {
    changed += 1;
    return `${attr}=${q}currentColor${q}`;
  });

  // Paper white fill -> none.
  s = s.replace(/fill=(["'])#fdfefe\1/gi, (_m, q) => {
    changed += 1;
    return `fill=${q}none${q}`;
  });

  // Light blue wash fill -> currentColor + low opacity.
  s = s.replace(/fill=(["'])#d6eaf8\1/gi, (_m, q) => {
    changed += 1;
    return `fill=${q}currentColor${q} fill-opacity=${q}0.12${q}`;
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
    console.log(`✓ ${path.relative(ROOT, f)}  (${changed} substitutions)`);
  }
}
console.log(`\nDone. ${totalFiles} files updated, ${totalChanges} color substitutions.`);
