import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "gap-insertion",
  name: "插空法",
  tag: "插空法",
  category: "counting",
  summary: "要求“不相邻”的对象最后插入，先把其它对象排好，再往“空隙”里放。",
  intuition:
    "要让几个人不相邻，先别让他们上台；让其他人先站好形成若干空隙，再把这些人分别插进不同空隙，天然就不挨着。",
  derivation: [
    "先把“可以随意站”的 m 个对象排列：m! 种。",
    "这 m 个对象形成 m + 1 个空隙（两端也算）。",
    "把不能相邻的 k 个对象从这些空隙里任选 k 个分别放入：A(m+1, k) 种。",
    "总数 = m! × A(m+1, k)。",
  ],
  keyPoints: [
    "不相邻 → 插空。",
    "空隙数 = m + 1；若有“不靠端”等限制，空隙要少算。",
  ],
  examples: [
    {
      title: "不相邻",
      problem: "5 个人排一排，甲乙不能相邻。共多少种排法？",
      solution: [
        "其余 3 人先排：3! = 6。",
        "产生 4 个空隙，甲乙从中选两个分别插入：4 × 3 = 12。",
        "共 6 × 12 = 72 种。",
      ],
      takeaway: "也可用“总排列 − 相邻排列 = 120 − 48 = 72”验证。",
    },
  ],
  pitfalls: ["空隙数要按“已排对象 + 1”计，容易漏掉两端的空隙。"],
  relatedSlugs: ["bundling"],
};

export default entry;
