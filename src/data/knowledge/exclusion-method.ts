import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "exclusion-method",
  name: "排除法",
  tag: "排除法",
  category: "counting",
  summary: "正面情况多而杂时，先算总数，再减去“不合要求”的反面——补集思维。",
  intuition:
    "要数“至少有一个……”“不全是……”这种条件，正着分类常常漏；反过来数“一个都没有”“全是……”往往只剩一种情形，用总数一减即得答案。",
  derivation: [
    "算出所有情况的总数 N。",
    "算出不满足条件的“反面”情况数 M（通常比正面简单）。",
    "答案 = N − M。",
  ],
  keyPoints: [
    "关键词：“至少”“不全”“含有”——几乎都要先想正难则反。",
    "反面的条件要精确表达：“至少 1 个” 的反面是 “一个也没有”。",
  ],
  examples: [
    {
      title: "至少一次",
      problem: "掷一枚骰子 2 次，至少出现一次 6 点的情况有多少种？",
      solution: [
        "总情况 6 × 6 = 36。",
        "反面（两次都不是 6）：5 × 5 = 25。",
        "至少一次 = 36 − 25 = 11。",
      ],
    },
    {
      title: "含数字",
      problem: "1–100 中含数字 3 的整数有几个？",
      solution: [
        "反面：不含 3。",
        "1 位：1–9 去掉 3 有 8 个；2 位：十位 1–9 去 3 有 8 种，个位 0–9 去 3 有 9 种，8 × 9 = 72;加上 100 一共 1 个不含 3。",
        "不含 3 共 8 + 72 + 1 = 81，含 3 的 = 100 − 81 = 19。",
      ],
      takeaway: "正数 19 个容易错数，反面按位乘法干净利落。",
    },
  ],
  pitfalls: [
    "反面条件写错会整题跑偏，务必再读一遍题目确认。",
    "“至少 1 个”的反面是 0 个，不是 1 个。",
  ],
  relatedSlugs: ["inclusion-exclusion", "case-analysis", "enumeration"],
};

export default entry;
