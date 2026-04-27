import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "place-value",
  name: "位值原理",
  tag: "位值原理",
  category: "numberCalc",
  summary:
    "一个 n 位数 = 各位数字 × 其位权之和；遇到“数字交换”或“数字约束”的题，必须从位值写起。",
  intuition:
    "数字 “234” 不是 “2、3、4 三个符号”，而是 2 × 100 + 3 × 10 + 4 × 1。把数字拆开按位权加权，题目里的“十位是什么”“交换前后”瞬间就有代数表达。",
  derivation: [
    "三位数 abc = 100a + 10b + c（a, b, c 为数字，1 ≤ a ≤ 9）。",
    "数字交换：交换后新数 − 原数 = 位值差 · 数字差。",
    "带约束的“寻数”题，通常列出位值表达，再用整除 / 奇偶分析逐位确定。",
  ],
  keyPoints: [
    "两位数 ab 翻转后减原数 = 9(b − a)。",
    "三位数百位与个位交换，差 = 99(c − a)。",
  ],
  examples: [
    {
      title: "数字交换",
      problem:
        "一个两位数，交换十位与个位后比原数大 36。原数十位与个位差多少？",
      solution: [
        "设原数为 10a + b，交换后 10b + a。",
        "(10b + a) − (10a + b) = 9(b − a) = 36，b − a = 4。",
      ],
    },
    {
      title: "三位数重组",
      problem:
        "一个三位数的百位、十位、个位分别为 a, b, c。把它倒过来写成三位数（c, b, a），原数与新数之差是多少？",
      solution: [
        "原数 = 100a + 10b + c，新数 = 100c + 10b + a。",
        "原数 − 新数 = 99a − 99c = 99(a − c)。",
        "结论：差值一定是 99 的倍数，与十位无关。",
      ],
      takeaway:
        "位值展开后，数字的加减立刻对应到“位权 × 数字差”，中间位常常消掉。",
    },
  ],
  pitfalls: [
    "首位数字不能为 0。",
    "写成位值后别忘了数字本身的取值范围（0–9）。",
  ],
  relatedSlugs: ["congruence"],
};

export default entry;
