import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10073-1.svg?raw";

export default {
  id: "10073",
  title: "双工序加工·最短总工时",
  grade: "六年级",
  module: "杂题",
  difficulty: "进阶",
  question:
    "一批工件共 5 件（A、B、C、D、E），每件都要先在机床甲上加工，再到机床乙上加工（顺序不能颠倒；同一机床一次只能加工一件）。各工件在两台机床上需要的时间（单位：小时）见下表。请合理安排 5 件工件在机床甲上的加工顺序，使全部完成的总工时最短。最短总工时是多少？",
  figures: [
    {
      svg: svg1,
      caption: "5 件工件在机床甲、乙上的加工用时（小时）",
      alt: "5 件工件在两台机床上的加工用时表",
    },
  ],
  solutions: [
    {
      key: "johnson",
      label: "约翰逊规则（分组排序）",
      steps: [
        {
          text: "约翰逊规则：甲≤乙的A,C按甲升序(A→C)；甲>乙的B,D,E按乙降序(E→D→B)。总序A→C→E→D→B，乙在27小时完工。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "A：甲 0–3，乙 3–9",
                  rhs: "乙空等 3，做 6",
                },
                {
                  lhs: "C：甲 3–7，乙 9–16",
                  rhs: "乙接着做 7",
                },
                {
                  lhs: "E：甲 7–13，乙 16–20",
                  rhs: "乙接着做 4",
                },
                {
                  lhs: "D：甲 13–18，乙 20–23",
                  rhs: "乙接着做 3",
                },
                {
                  lhs: "B：甲 18–25，乙 25–27",
                  rhs: "乙等到甲做完 B 再做 2",
                  badge: "终点",
                },
                {
                  lhs: "最短总工时",
                  rhs: "27 小时",
                  status: "keep",
                },
              ],
              caption: "按 A→C→E→D→B 排产时两台机床的时间安排",
            },
            {
              kind: "result-badges",
              items: [
                {
                  icon: "⚙️",
                  count: 27,
                  label: "小时",
                },
              ],
              caption: "最短总工时",
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "4 件工件在甲、乙两台机床上先后加工，用时如下：A(2,5), B(6,3), C(4,6), D(5,2)。请排出甲上的顺序使总工时最短，最短总工时是多少小时？",
    fields: [
      {
        key: "answer",
        label: "最短总工时",
        type: "number",
      },
    ],
    answer: {
      answer: 19,
    },
    hint: "第 1 组 A、C（甲≤乙），按甲升序 A→C；第 2 组 B、D（甲>乙），按乙降序 B→D。顺序 A→C→B→D：甲 0–2, 2–6, 6–12, 12–17；乙 2–7, 7–13, 13–16, 17–19，终点 19。",
  },
  tags: ["时间统筹"],
} satisfies ProblemData;
