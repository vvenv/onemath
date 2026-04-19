/**
 * Canonical method/technique tags.
 *
 * `tags` on a problem is reserved for **solution methods and thinking techniques**.
 * Do NOT put grade / difficulty / module name into `tags` — those already
 * live on dedicated fields (`grade`, `difficulty`, `module`) and are
 * filtered out at render time anyway (see `@/components/problem-header`).
 *
 * When writing a new problem, pick 1–3 tags from this list. If none of the
 * tags below fits, leave `tags` empty rather than inventing a new one; add
 * the new tag here first, with a clear scope, so the vocabulary stays tight.
 */

export const METHOD_TAGS = {
  counting: [
    "加乘原理",
    "加法原理",
    "乘法原理",
    "容斥原理",
    "抽屉原理",
    "枚举法",
    "捆绑法",
    "插空法",
    "隔板法",
    "排除法",
    "标数法",
    "消序法",
    "特殊元素优先法",
    "固定参照物法",
    "分类讨论",
    "对应思想",
    "递推法",
  ],
  word: [
    "方程法",
    "假设法",
    "份数法",
    "比例法",
    "画图法",
    "线段图法",
    "逆向推理",
    "十字交叉法",
    "整体代换",
  ],
  numberCalc: [
    "整除特征",
    "同余",
    "质因数分解",
    "位值原理",
    "凑整法",
    "裂项",
    "平方差",
    "乘法分配律",
    "首尾配对",
  ],
  geometry: ["面积法", "等积变形", "蝴蝶模型", "勾股定理", "平移法"],
  magicSquare: ["累加法", "中心数法", "比较法", "等差数列法", "试填法"],
  general: ["奇偶性", "不变量", "最不利原则"],
} as const;

export const TAG_WHITELIST: ReadonlySet<string> = new Set(
  Object.values(METHOD_TAGS).flat(),
);

export function isMethodTag(tag: string): boolean {
  return TAG_WHITELIST.has(tag);
}
