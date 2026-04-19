#!/usr/bin/env node
// One-shot normalization of problem `tags` to the method-only whitelist.
// Surgical: only the `"tags": [...]` block is rewritten; rest of the file
// (including hand-tuned compact inline formatting) is preserved verbatim.
// Idempotent — safe to re-run.
import fs from "node:fs";
import path from "node:path";

const DIR = "src/data/problems";

const WHITELIST = new Set([
  // counting
  "加乘原理", "加法原理", "乘法原理", "容斥原理", "抽屉原理", "枚举法",
  "捆绑法", "插空法", "隔板法", "排除法", "标数法", "消序法",
  "特殊元素优先法", "固定参照物法", "分类讨论", "对应思想", "递推法",
  // word / travel
  "方程法", "假设法", "份数法", "比例法", "画图法", "线段图法",
  "逆向推理", "十字交叉法", "整体代换",
  // number theory / calc
  "整除特征", "同余", "质因数分解", "位值原理",
  "凑整法", "裂项", "平方差", "乘法分配律", "首尾配对",
  // geometry
  "面积法", "等积变形", "蝴蝶模型", "鸟头模型", "相似模型", "燕尾模型", "勾股定理", "平移法",
  // magic square / number arrays
  "累加法", "中心数法", "比较法", "等差数列法", "试填法",
  // general thinking
  "奇偶性", "不变量", "最不利原则",
]);

// Aliases → canonical whitelist tag
const ALIAS = {
  "方程": "方程法",
  "鸽巢原理": "抽屉原理",
  "固定参照物": "固定参照物法",
  "十字交叉": "十字交叉法",
  "代换消元": "整体代换",
  "换元": "整体代换",
  "同余问题": "同余",
  "分数裂项": "裂项",
  "拆项法": "裂项",
  "年龄差不变": "不变量",
  "归纳递推": "递推法",
  "递推": "递推法",
  "分类加法原理": "加法原理",
  "分类计数": "分类讨论",
  "分组法": "分类讨论",
  "对应法": "对应思想",
  "对应": "对应思想",
  "量率对应": "对应思想",
  "韦恩图": "容斥原理",
  "重叠问题": "容斥原理",
  "倍比法": "比例法",
  "分步计算": "乘法原理",
  "树形图": "枚举法",
  "提取公因数": "乘法分配律",
};

const MODULE_LABELS = new Set(["计算", "几何", "数论", "应用题", "行程", "计数", "杂题"]);
const GRADES = new Set(["三年级", "四年级", "五年级", "六年级"]);
const DIFFS = new Set(["基础", "进阶", "挑战"]);

function normalizeOne(tag) {
  if (GRADES.has(tag) || DIFFS.has(tag) || MODULE_LABELS.has(tag)) return null;
  const canon = ALIAS[tag] ?? tag;
  return WHITELIST.has(canon) ? canon : null;
}

// Match the whole `"tags": [ ... ]` block, tolerating multi-line arrays.
// Assumes no nested arrays inside tags (strings only), which is true per schema.
const TAGS_RE = /"tags"\s*:\s*\[[^\]]*\]/;

function formatTags(arr, indentSpaces) {
  if (arr.length === 0) return `"tags": []`;
  const pad = " ".repeat(indentSpaces);
  const inner = arr.map((t) => `${pad}  ${JSON.stringify(t)}`).join(",\n");
  return `"tags": [\n${inner}\n${pad}]`;
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json")).sort();
let changed = 0;
const dropped = new Map();

for (const f of files) {
  const abs = path.join(DIR, f);
  const raw = fs.readFileSync(abs, "utf8");
  const data = JSON.parse(raw);

  const seen = new Set();
  const out = [];
  for (const t of data.tags ?? []) {
    const n = normalizeOne(t);
    if (n == null) {
      dropped.set(t, (dropped.get(t) ?? 0) + 1);
      continue;
    }
    if (!seen.has(n)) {
      seen.add(n);
      out.push(n);
    }
  }

  const m = raw.match(TAGS_RE);
  if (!m) {
    console.error(`! ${f}: could not locate "tags" block`);
    continue;
  }
  // Detect indent of the `"tags"` key from the line start
  const before = raw.slice(0, m.index);
  const lineStart = before.lastIndexOf("\n") + 1;
  const indent = m.index - lineStart;
  const replacement = formatTags(out, indent);
  const next = raw.slice(0, m.index) + replacement + raw.slice(m.index + m[0].length);

  if (next === raw) continue;
  // Sanity: ensure still valid JSON
  JSON.parse(next);
  fs.writeFileSync(abs, next);
  changed++;
  console.log(`${data.id}  → [${out.join(", ")}]`);
}

console.log(`\n${changed}/${files.length} files updated.`);
console.log("\nDropped tag histogram (top 30):");
[...dropped.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30).forEach(([k, v]) => {
  console.log(`  ${v.toString().padStart(3)} ${k}`);
});
