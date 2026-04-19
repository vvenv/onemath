import type { KnowledgeEntry } from "./types";

export const magicSquareEntries: KnowledgeEntry[] = [
  {
    slug: "accumulation-method",
    name: "累加法",
    tag: "累加法",
    category: "magicSquare",
    summary:
      "把所有行（或列、对角线）的和累加起来，用“总和的总和”反求单元格之和。",
    intuition:
      "幻方里每行、每列、每对角线的和都相等，都等于“幻和”。把所有行加在一起，其实就是把每个格子加了一次——于是总和 = 行数 × 幻和。反过来就能求幻和。",
    derivation: [
      "幻方 n × n 的格子总和 S = 所有数字之和。",
      "所有行的和之和 = n × 幻和 = S。",
      "所以 幻和 = S ÷ n。",
      "结合某一行/列已有的部分数字，即可解出其余。",
    ],
    keyPoints: [
      "3 阶幻方用 1..9，总和 45，幻和 = 15。",
      "n 阶幻方（用 1..n²）幻和 = n(n² + 1) / 2。",
    ],
    examples: [
      {
        title: "三阶幻和",
        problem: "用 1–9 填入 3×3 幻方，每行/列/对角线之和相等。求这个和。",
        solution: [
          "总和 = 1 + 2 + … + 9 = 45。",
          "3 行相加 = 3 × 幻和 = 45，幻和 = 15。",
        ],
      },
      {
        title: "部分已填",
        problem:
          "三阶幻方中某行已知两个数 8 和 3，求该行第三个。",
        solution: ["幻和 = 15；第三个数 = 15 − 8 − 3 = 4。"],
      },
    ],
    pitfalls: [
      "当填入的数字不是 1..n² 时，幻和要按给定数字集合重新算。",
    ],
    relatedSlugs: ["center-number-method"],
  },
  {
    slug: "center-number-method",
    name: "中心数法",
    tag: "中心数法",
    category: "magicSquare",
    summary: "三阶幻方的中心数 = 幻和 ÷ 3 = 所有数字平均值。",
    intuition:
      "三阶幻方有 4 条线过中心（2 条对角线 + 中间行 + 中间列），每条线和 = 幻和。把这 4 条加起来，中心被数了 4 次，其它格子各数了 1 次。稍一整理，中心数就浮出来了。",
    derivation: [
      "4 条过中心的线：和 = 4 × 幻和。",
      "左边展开：中心 × 4 + 其余 8 个数字各一次。",
      "设数字总和为 S，中心数为 c：4 × 幻和 = 4c + (S − c) = S + 3c。",
      "由 3 × 幻和 = S，得 4 × 幻和 = S + 3c → c = 幻和 / 3。",
    ],
    keyPoints: [
      "3 阶幻方中心 = 所有 9 个数的平均数。",
      "用 1..9 填时中心必为 5。",
    ],
    examples: [
      {
        title: "经典",
        problem: "3×3 幻方填 1–9。中心是几？",
        solution: ["幻和 15，中心 = 15/3 = 5。"],
      },
      {
        title: "变形",
        problem: "3×3 幻方填 2, 4, 6, …, 18（9 个偶数）。求中心。",
        solution: [
          "总和 2 + 4 + … + 18 = 90，幻和 = 30。",
          "中心 = 30 / 3 = 10。",
        ],
      },
    ],
    pitfalls: [
      "中心数法只对“3 阶”幻方成立，更大阶需要其他工具。",
    ],
    relatedSlugs: ["accumulation-method"],
    figures: [
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130"><rect x="45" y="45" width="40" height="40" fill="currentColor" fill-opacity="0.18"/><g stroke="currentColor" stroke-width="1" fill="none"><rect x="5" y="5" width="120" height="120"/><line x1="45" y1="5" x2="45" y2="125"/><line x1="85" y1="5" x2="85" y2="125"/><line x1="5" y1="45" x2="125" y2="45"/><line x1="5" y1="85" x2="125" y2="85"/></g><g stroke="currentColor" stroke-width="1.4" stroke-opacity="0.55" stroke-dasharray="3 2" fill="none"><line x1="65" y1="5" x2="65" y2="125"/><line x1="5" y1="65" x2="125" y2="65"/><line x1="5" y1="5" x2="125" y2="125"/><line x1="125" y1="5" x2="5" y2="125"/></g><text x="60" y="71" font-size="13" font-family="serif" fill="currentColor" stroke="none">c</text></svg>`,
        alt: "3×3 幻方过中心的四条线",
        caption: "四条过中心的线（中列、中行、两条对角线）各等于幻和。",
      },
    ],
  },
  {
    slug: "arithmetic-sequence-method",
    name: "等差数列法",
    tag: "等差数列法",
    category: "magicSquare",
    summary:
      "幻方里的数字常形成等差（或多个等差段）；用“首尾配对 + 平均值”一次性算出幻和与中心。",
    intuition:
      "幻方的数字不是随便乱给的——它们几乎总能写成等差数列。一旦发现“数字等差”，总和、平均、幻和这些都是等差公式的直接产出。",
    derivation: [
      "设幻方里的数字是公差为 d 的等差数列。",
      "总和 = n² × (首 + 末) / 2（n 阶幻方用 n² 个数）。",
      "幻和 = 总和 / n = n × (首 + 末) / 2。",
      "3 阶幻方的中心 = 平均值 = (首 + 末) / 2。",
    ],
    keyPoints: [
      "等差数列求和公式是入口。",
      "幻和 = n × 平均值（n 阶）。",
    ],
    examples: [
      {
        title: "非 1..9 的 3 阶",
        problem: "用 1, 3, 5, 7, 9, 11, 13, 15, 17 填 3 阶幻方。幻和与中心？",
        solution: [
          "等差数列：首 1，末 17，共 9 项。",
          "平均 = (1 + 17)/2 = 9，中心 = 9。",
          "幻和 = 3 × 9 = 27。",
        ],
      },
    ],
    pitfalls: [
      "不能确定数字真的构成等差时，先验证。",
    ],
    relatedSlugs: ["center-number-method", "accumulation-method", "head-tail-pairing"],
  },
];
