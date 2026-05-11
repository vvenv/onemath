import type { ProblemData } from "@/types/problem";

export default {
  id: "10189",
  title: "最小公倍数·周期相遇",
  grade: "六年级",
  difficulty: "挑战",
  module: "数论",
  question:
    "甲、乙、丙三人定期去图书馆。甲每 4 天去一次，乙每 6 天去一次，丙每 8 天去一次。\n\n如果三人 1 月 1 日同时在图书馆相遇，那么他们下一次同时在图书馆相遇是哪一天？",
  solutions: [
    {
      key: "lcm",
      label: "最小公倍数法",
      steps: [
        {
          text: "分析：三人同时相遇的间隔天数必须是 4、6、8 的公倍数。\n\n1 月 1 日后 24 天是 1 月 25 日（1 月有 31 天），即三人下一次同时相遇的日期。",
        },
      ],
    },
  ],
  variant: {
    question:
      "甲、乙、丙三人定期去公园。甲每 5 天去一次，乙每 10 天去一次，丙每 15 天去一次。如果三人 3 月 1 日同时在公园相遇，那么他们下一次同时在公园相遇是哪一天？",
    fields: [
      {
        key: "date",
        label: "下次相遇日期",
        type: "text",
      },
    ],
    answer: {
      date: "3 月 31 日",
    },
    hint: "求 5、10、15 的最小公倍数，然后从 3 月 1 日开始推算日期。",
  },
  tags: ["最小公倍数", "周期问题"],
} satisfies ProblemData;
