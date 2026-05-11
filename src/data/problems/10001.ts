import type { ProblemData } from "@/types/problem";

export default {
  id: "10001",
  title: "鸡兔同笼·基础变式",
  grade: "三年级",
  difficulty: "基础",
  module: "应用题",
  question:
    "笼子里有 🐔 和 🐰，共 30 个头，88 只脚。\n\n问 🐔 和 🐰 各有多少只？",
  solutions: [
    {
      key: "drawing",
      label: "画图法",
      steps: [
        {
          text: "用画图法思路：先假设全是 🐔，计算脚数。",
          scenes: [
            {
              kind: "equation-list",
              rows: [{ lhs: "假设全 🐔 脚数", rhs: "30 × 2 = 60" }],
            },
          ],
        },
        {
          text: "实际有 88 只脚，还差 28 只。",
          scenes: [
            {
              kind: "compare-bars",
              rows: [
                { label: "目标", value: 88, max: 88, tone: "primary" },
                {
                  label: "当前",
                  value: 60,
                  max: 88,
                  tone: "muted",
                  marker: true,
                },
              ],
            },
          ],
        },
        {
          text: "每把一只 🐔 变成 🐰，就多 2 只脚，因此 🐰 有 14 只。",
          scenes: [
            {
              kind: "heads-split",
              left: {
                count: 14,
                ticks: [{ count: 2 }, { count: 2, tone: "accent" }],
                tone: "accent",
              },
              right: {
                count: 16,
                ticks: [{ count: 2 }],
              },
            },
          ],
        },
      ],
    },
    {
      key: "hypothesis",
      label: "假设法",
      steps: [
        {
          text: "用假设法：假设全是 🐔，计算脚数差额，再根据每只 🐰 比 🐔 多的脚数求出 🐰 数量。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "假设全 🐔 脚数 (假设)", rhs: "30 × 2 = 60" },
                { lhs: "与实际差 (对比)", rhs: "88 − 60 = 28" },
                { lhs: "每只 🐰 多出脚数 (单价)", rhs: "4 − 2 = 2" },
                { lhs: "🐰", rhs: "28 ÷ 2 = 14", status: "keep" },
                { lhs: "🐔", rhs: "30 − 14 = 16", status: "keep" },
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
          text: "设 🐔 x 只，🐰 y 只。",
        },
        {
          text: "列方程：x + y = 30。",
        },
        {
          text: "列方程：2x + 4y = 88。",
        },
        {
          text: "将第一式乘 2 得 2x + 2y = 60，与第二式相减：2y = 28。",
        },
        {
          text: "解得 y = 14，x = 30 − 14 = 16。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "x + y (头数 ①)", rhs: "30" },
                { lhs: "2x + 4y (脚数 ②)", rhs: "88" },
              ],
            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "2x + 2y (①×2 ①')", rhs: "60", status: "neutral" },
                { lhs: "2x + 4y (保留 ②)", rhs: "88", status: "keep" },
                { lhs: "2y (② − ①' 消 x)", rhs: "28", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "停车场上共有汽车和摩托车 28 辆，轮子总数 86 个，求各有多少辆。",
    fields: [
      {
        key: "car",
        label: "汽车数量",
      },
      {
        key: "motorcycle",
        label: "摩托车数量",
      },
    ],
    answer: {
      car: 15,
      motorcycle: 13,
    },
    hint: "再试一次，检查总辆数和总轮子数。",
  },
  tags: ["画图法", "假设法", "方程法"],
} satisfies ProblemData;
