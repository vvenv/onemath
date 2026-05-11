import type { ProblemData } from "@/types/problem";

export default {
  id: "10156",
  title: "公交车站·最小公倍数",
  grade: "六年级",
  difficulty: "进阶",
  module: "计数",
  question:
    "某公交车站有三路公交车同时发车：\n\n- 1路公交车每8分钟发一班\n- 2路公交车每12分钟发一班\n- 3路公交车每15分钟发一班\n\n问：至少经过多少分钟，这三路公交车会再次同时发车？",
  solutions: [
    {
      key: "lcm",
      label: "最小公倍数法",
      steps: [
        {
          text: "分析：三路公交车同时发车的时间间隔分别是8分钟、12分钟和15分钟，求它们再次同时发车的时间就是求这三个数的最小公倍数。",
        },
        {
          text: "先求8和12的最小公倍数：8 = 2³，12 = 2² × 3，LCM(8, 12) = 2³ × 3 = 24。",
        },
        {
          text: "再求24和15的最小公倍数：24 = 2³ × 3，15 = 3 × 5，LCM(24, 15) = 2³ × 3 × 5 = 120。",
        },
        {
          text: "所以至少经过120分钟，三路公交车会再次同时发车。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "1路车间隔 (8 = 2³)", rhs: "8分钟" },
                { lhs: "2路车间隔 (12 = 2² × 3)", rhs: "12分钟" },
                { lhs: "3路车间隔 (15 = 3 × 5)", rhs: "15分钟" },
                {
                  lhs: "LCM(8, 12, 15) (结论)",
                  rhs: "120分钟",
                  status: "keep",
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
      "某公交车站有两路公交车同时发车：\n\n- A路公交车每6分钟发一班\n- B路公交车每9分钟发一班\n\n问：至少经过多少分钟，这两路公交车会再次同时发车？",
    fields: [
      {
        key: "minutes",
        label: "分钟数",
        type: "text",
      },
    ],
    answer: {
      minutes: "18",
    },
    hint: "求6和9的最小公倍数。6 = 2 × 3，9 = 3²，LCM(6, 9) = 2 × 3² = 18。",
  },
  tags: ["周期问题"],
} satisfies ProblemData;
