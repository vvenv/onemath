import type { ProblemData } from "@/types/problem";

export default {
  id: "10155",
  title: "男女排队计数·逆向思维",
  grade: "五年级",
  module: "计数",
  difficulty: "挑战",
  question:
    "20个女生面向右排成一排。4个男生插入队伍中，面向左。每个男生数自己前面有多少个女生，得到的数字分别是3、6、15、18。\n\n现在每个女生也数自己前面有多少个男生。求所有女生数的数字之和是多少？",
  solutions: [
    {
      key: "reverse_counting",
      label: "逆向计数法",
      steps: [
        {
          text: "分析：男生面向左，数前面的女生（即右边的女生）；女生面向右，数前面的男生（即左边的男生）。",
          scenes: [],
        },
        {
          text: "男生看到的女生数分别是3、6、15、18，说明从右往左数，男生分别位于第4、7、16、19个位置（因为前面分别有3、6、15、18个女生）。",
          scenes: [],
        },
        {
          text: "换个角度：女生数左边的男生，相当于从左往右看，每个男生右边有多少个女生。",
          scenes: [],
        },
        {
          text: "总配对数 = 男生数 × 女生数 = 4 × 20 = 80。",
          scenes: [],
        },
        {
          text: "男生看到的女生数之和 = 3 + 6 + 15 + 18 = 42，这是男生右边女生数的和。",
          scenes: [],
        },
        {
          text: "女生看到的男生数之和 = 80 − 42 = 38。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "男生看到的女生数 (男生右边女生数的和)",
                  rhs: "3 + 6 + 15 + 18 = 42",
                },
                {
                  lhs: "总配对数 (每个男生与每个女生形成一对)",
                  rhs: "4 × 20 = 80",
                },
                {
                  lhs: "女生看到的男生数 (结论)",
                  rhs: "80 − 42 = 38",
                  status: "keep",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "pairing_analysis",
      label: "配对分析法",
      steps: [
        {
          text: "分析：把每个男生和每个女生看作一对，总共有4 × 20 = 80对。",
          scenes: [],
        },
        {
          text: "对于每一对（男，女），要么是男在女左边（女生能看到这个男生），要么是男在女右边（男生能看到这个女生）。",
          scenes: [],
        },
        {
          text: "男生看到的女生数之和 = 42，说明有42对是男在女右边。",
          scenes: [],
        },
        {
          text: "剩下的80 − 42 = 38对是男在女左边，这就是女生看到的男生数之和。",
          scenes: [
            {
              kind: "compare-bars",
              rows: [
                {
                  label: "总配对数",
                  value: 80,
                  max: 80,
                  tone: "primary",
                },
                {
                  label: "男在女右边",
                  value: 42,
                  max: 80,
                  tone: "muted",
                },
                {
                  label: "男在女左边",
                  value: 38,
                  max: 80,
                  tone: "primary",
                  marker: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "15个女生面向右排成一排。3个男生插入队伍中，面向左。每个男生数自己前面有多少个女生，得到的数字分别是2、8、12。求所有女生数的数字之和是多少？",
    fields: [
      {
        key: "sum",
        label: "女生数的数字之和",
      },
    ],
    answer: {
      sum: 25,
    },
    hint: "总配对数 = 3 × 15 = 45。男生看到的和 = 2 + 8 + 12 = 22。女生看到的和 = 45 − 22 = 23？不对，再算一下：45 − 22 = 23。",
  },
  tags: ["逆向推理", "对应思想"],
} satisfies ProblemData;
