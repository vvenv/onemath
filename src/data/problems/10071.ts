import svg1 from "./figures/10071-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10071",
  title: "烙饼问题·3 张饼最短时间",
  grade: "四年级",
  difficulty: "基础",
  module: "杂题",
  question:
    "用一口平底锅烙饼，锅里一次最多同时烙 2 张饼。每张饼有正反两面，每面都要烙 3 分钟才熟。\n现在要烙 3 张饼，最少需要多少分钟？",
  figures: [
    {
      svg: svg1,
      alt: "平底锅烙饼示意",
    },
  ],
  solutions: [
    {
      key: "rotate",
      label: "交替轮换法",
      steps: [
        {
          text: "6面÷2×3=9分钟下限。构造：A1+B1(0-3), A2+C1(3-6), B2+C2(6-9)，锅始终满2面，总9分钟最优。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "第 1 段 (0–3 min)", rhs: "锅：A1 + B1" },
                { lhs: "第 2 段 (3–6 min)", rhs: "锅：A2 + C1" },
                { lhs: "第 3 段 (6–9 min)", rhs: "锅：B2 + C2" },
                {
                  lhs: "总时间 (最优)",
                  rhs: "3 + 3 + 3 = 9 分钟",
                  status: "keep",
                },
              ],
            },
            {
              kind: "result-badges",
              items: [{ icon: "⏱️", count: 9, label: "分钟" }],
            },
          ],
        },
      ],
    },
    {
      key: "bound",
      label: "下限估计法",
      steps: [
        {
          text: "下限 = 6÷2×3=9 分钟，交替轮换法可达此下限，故最少用时 9 分钟。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "面·次总数", rhs: "3 张 × 2 面 = 6" },
                { lhs: "每 3 分钟最多完成", rhs: "2 面" },
                { lhs: "时间下限", rhs: "6 ÷ 2 × 3 = 9 分钟" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "还是这样的平底锅，一次最多烙 2 张饼，每面需 3 分钟。如果要烙 5 张饼，最少需要多少分钟？",
    fields: [
      {
        key: "answer",
        label: "最少分钟数",
        type: "number",
      },
    ],
    answer: {
      answer: 15,
    },
    hint: "5 张饼共 10 个面，下限 = 10 ÷ 2 × 3 = 15 分钟，存在可行排法。",
  },
  tags: ["时间统筹"],
} satisfies ProblemData;
