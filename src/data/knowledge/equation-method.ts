import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "equation-method",
  name: "方程法",
  tag: "方程法",
  category: "word",
  summary: "用字母表示未知量，按题意列等式，把推理交给代数运算。",
  intuition:
    "当条件多、关系绕、用算术法很难一步步推时，设未知数是“先承认我不知道”，再让方程替你思考。",
  derivation: [
    "找到“设谁”：通常设题目问的那个量，或设能让其它量最好表达的量。",
    "把每个条件翻译成一个含未知数的等式。",
    "合并同类项、移项，解出未知数。",
    "回代验证：原题的每一个条件是否都成立。",
  ],
  keyPoints: [
    "一元一次：ax + b = c → x = (c − b) ÷ a。",
    "二元一次：消元法（加减 / 代入）。",
  ],
  examples: [
    {
      title: "鸡兔同笼",
      problem: "鸡兔共 30 只，脚共 88 只。各多少只？",
      solution: [
        "设鸡 x 只，兔 y 只。",
        "x + y = 30；2x + 4y = 88。",
        "由第一式 x = 30 − y 代入：2(30 − y) + 4y = 88，解得 y = 14。",
        "所以兔 14 只，鸡 16 只。",
      ],
    },
    {
      title: "年龄问题",
      problem:
        "父亲今年 38 岁，儿子 10 岁。多少年后父亲的年龄是儿子的 3 倍？",
      solution: [
        "设 x 年后，此时父亲 38 + x 岁，儿子 10 + x 岁。",
        "38 + x = 3(10 + x)，解得 x = 4。",
        "所以 4 年后。",
      ],
      takeaway: "年龄问题的不变量是“年龄差”，列方程时要利用这一点。",
    },
  ],
  pitfalls: [
    "设未知数后要明确单位，避免“只”和“元”混淆。",
    "解出答案一定要回代验证。",
  ],
  relatedSlugs: ["hypothesis-method"],
};

export default entry;
