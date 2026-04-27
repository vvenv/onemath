import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "overall-substitution",
  name: "整体代换",
  tag: "整体代换",
  category: "word",
  summary:
    "把反复出现的一段式子（或量）当作一个整体变量 t，把复杂关系压缩成对 t 的简单方程。",
  intuition:
    "题目里如果一块相同的表达式不断出现，盯着它的内部细节反而会乱。干脆给它起个名字 t，整个世界瞬间变成“只关于 t”的题目，解出 t 之后再回代。",
  derivation: [
    "识别反复出现的相同子式或相同数量。",
    "令这个整体 = t，其它部分用 t 表达。",
    "在新的简单方程 / 等式里解出 t。",
    "回代还原原来的未知量。",
  ],
  keyPoints: [
    "“整体”可以是多项、可以是比、也可以是“两人距离”“共同时间”等物理量。",
    "代换前后单位和含义要一致。",
  ],
  examples: [
    {
      title: "数列代换",
      problem: "若 a + b + c = 10，求 (a + b + c)² − 2(a + b + c) 的值。",
      solution: [
        "令 t = a + b + c = 10。",
        "原式 = t² − 2t = 100 − 20 = 80。",
      ],
    },
    {
      title: "工程问题",
      problem:
        "甲乙合作 12 天完成，甲单独做 20 天完成。设全工程为 1，乙单独做几天完成？",
      solution: [
        "把“全工程”当整体 1：甲效率 1/20，合作效率 1/12。",
        "乙效率 = 1/12 − 1/20 = (5 − 3)/60 = 2/60 = 1/30。",
        "乙单独做 1 ÷ 1/30 = 30 天。",
      ],
      takeaway: "工程 / 行程题里常把“总工作量 / 总路程”设为 1 做整体代换。",
    },
  ],
  pitfalls: [
    "代换后必须把所有出现的同一子式都替换干净，漏替会出错。",
    "代换变量的取值范围别忘了回到原题检查。",
  ],
  relatedSlugs: ["equation-method", "ratio-method"],
};

export default entry;
