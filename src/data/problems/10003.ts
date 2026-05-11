import type { ProblemData } from "@/types/problem";

export default {
  id: "10003",
  title: "时光之谜·变倍年龄",
  grade: "三年级",
  difficulty: "进阶",
  module: "应用题",
  question:
    "父亲对儿子说：“我像你这么大时，你才 3 岁；当你像我这么大时，我就 78 岁了。”\n\n问父亲和儿子现在各多少岁？",
  solutions: [
    {
      key: "segment",
      label: "线段图法",
      steps: [
        {
          text: "分析：每过一年，父亲和儿子各长 1 岁，所以两人的年龄差始终不变。从过去儿子 3 岁到未来父亲 78 岁，时间轴上正好跨越 3 个年龄差。",
          scenes: [
            {
              kind: "number-line",
              min: 3,
              max: 78,
              points: [
                { value: 3, label: "过去儿子", sublabel: "3", tone: "muted" },
                {
                  value: 78,
                  label: "未来父亲",
                  sublabel: "78",
                  tone: "primary",
                },
              ],
            },
          ],
        },
        {
          text: "总跨度 78 − 3 = 75 岁，包含 3 个年龄差，故 d = 75 ÷ 3 = 25 岁。",
          scenes: [
            {
              kind: "number-line",
              min: 3,
              max: 78,
              points: [
                { value: 3, label: "过去儿子", sublabel: "3", tone: "muted" },
                { value: 28, sublabel: "?", tone: "accent" },
                { value: 53, sublabel: "?", tone: "accent" },
                {
                  value: 78,
                  label: "未来父亲",
                  sublabel: "78",
                  tone: "primary",
                },
              ],
              segments: [
                { from: 3, to: 28, label: "d", tone: "accent" },
                { from: 28, to: 53, label: "d", tone: "accent" },
                { from: 53, to: 78, label: "d", tone: "accent" },
              ],
            },
          ],
        },
        {
          text: "儿子现在 3 + 25 = 28 岁，父亲现在 28 + 25 = 53 岁。",
          scenes: [
            {
              kind: "number-line",
              min: 3,
              max: 78,
              points: [
                { value: 3, sublabel: "3", tone: "muted" },
                {
                  value: 28,
                  label: "现在儿子",
                  sublabel: "28",
                  tone: "accent",
                },
                {
                  value: 53,
                  label: "现在父亲",
                  sublabel: "53",
                  tone: "accent",
                },
                { value: 78, sublabel: "78", tone: "primary" },
              ],
              segments: [
                { from: 3, to: 28, label: "25", tone: "primary" },
                { from: 28, to: 53, label: "25", tone: "primary" },
                { from: 53, to: 78, label: "25", tone: "primary" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "equation",
      label: "方程法",
      steps: [
        {
          text: "分析：两人年龄差 d 始终不变。设现在儿子 x 岁、父亲 y 岁，则 y − x = d。两句话可翻译为：过去儿子 x − d = 3，未来父亲 y + d = 78。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "x − d (过去儿子 ①)", rhs: "3" },
                { lhs: "y + d (未来父亲 ②)", rhs: "78" },
                { lhs: "y − x (年龄差 ③)", rhs: "d" },
              ],
            },
          ],
        },
        {
          text: "② − ① 消去 x、y，得 3d = 75，故 d = 25。代回得 x = 28、y = 53。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "(y + d) − (x − d) (② − ①)", rhs: "78 − 3" },
                { lhs: "(y − x) + 2d", rhs: "75", status: "keep" },
                { lhs: "d + 2d = 3d (代入 ③)", rhs: "75", status: "keep" },
                { lhs: "d", rhs: "25", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "哥哥对弟弟说：“当我是你现在的年龄时，你才 5 岁；当你是我现在的年龄时，我已经 47 岁了。” 哥哥现在多少岁？",
    fields: [
      {
        key: "brother",
        label: "哥哥年龄",
      },
    ],
    answer: {
      brother: 33,
    },
    hint: "画出时间轴，找出年龄差是解题关键。",
  },
  tags: ["线段图法", "方程法", "不变量"],
} satisfies ProblemData;
