import type { KnowledgeEntry } from "@/types/knowledge";
import svg1 from "./figures/word-1.svg?raw";

const entry: KnowledgeEntry = {
  slug: "drawing-method",
  name: "画图法",
  tag: "画图法",
  category: "word",
  summary: "把抽象数量关系画成圆圈、线段、条形，让“多/少/倍”一眼可见。",
  intuition:
    "低年级看文字吃力，但看到“长的一条线段比短的一条长出一小段”就立刻能指出差在哪里。画图就是把语言翻译成“可指的图形”。",
  derivation: [
    "找到题目里的主角（对象）和它们之间的关系：相等、相差、相倍、总和。",
    "为每个主角画一条线段（或一排圆圈），让长度/数量正比于它代表的量。",
    "把“差”或“总和”标在图上，变成一段明显可测量的长度。",
    "从图上直接读出“1 份 = 多少”，再还原回原题。",
  ],
  keyPoints: [
    "和差问题：画两条长短不同的线段，总和标在上方，差标在突出的一段。",
    "倍数问题：把“1 倍量”当作 1 格，大量画成 n 格，一眼看出一共几格。",
  ],
  examples: [
    {
      title: "和差问题",
      problem: "甲乙两人共有糖 30 颗，甲比乙多 6 颗。各几颗？",
      solution: [
        "画两条线段，甲稍长于乙。",
        "从甲的线段末端截掉 6 颗，两条一样长，总数变成 30 − 6 = 24 颗。",
        "一条 = 24 ÷ 2 = 12 颗，所以乙 = 12，甲 = 12 + 6 = 18。",
      ],
    },
    {
      title: "倍数 + 差",
      problem: "姐姐的年龄是妹妹的 3 倍，姐姐比妹妹大 8 岁。各几岁？",
      solution: [
        "画妹妹 1 格，姐姐 3 格，两人相差 3 − 1 = 2 格。",
        "2 格对应 8 岁，所以 1 格 = 4 岁。",
        "妹妹 4 岁，姐姐 12 岁。",
      ],
      takeaway: "图上“几格对应多少”是线段图最关键的一步。",
    },
  ],
  pitfalls: [
    "线段长度要大致按比例，否则误导自己。",
    "遇到多次变化（比如“再过 3 年”），画两排线段对照更清晰。",
  ],
  relatedSlugs: ["hypothesis-method", "equation-method"],
  figures: [
    {
      svg: svg1,
      alt: "两条长短不同的线段图示和差问题",
      caption: "和差问题：两条线段差 6、总 30，一眼可见。",
    },
  ],
};

export default entry;
