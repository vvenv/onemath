import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10048-1.svg?raw";

export default {
  "id": "10048",
  "title": "等量互换·浓度相等",
  "grade": "六年级",
  "module": "word",
  "difficulty": "挑战",
  "question": "甲容器有浓度为 12% 的盐水 500 克，乙容器有浓度为 20% 的盐水 300 克。分别从两个容器中各取出等量的一杯盐水进行交换，交换后两个容器中的盐水浓度恰好相等。那么取出的这杯盐水重多少克？",
  "solutions": [
    {
      "key": "equal_conc",
      "label": "最终浓度相等法",
      "steps": [
        "分析：交换后甲、乙质量不变、盐量守恒，故两杯的最终浓度必同时等于整体浓度 = (500 × 12% + 300 × 20%) ÷ (500 + 300) = 120 ÷ 800 = 15%。",
        "甲杯最终盐量 = 500 × 15% = 75 克，比原有 60 克增 15 克；这 15 克正是「倒出 x 克 12% 盐水、倒入 x 克 20% 盐水」的净效应 x · (20% − 12%) = 0.08x。",
        "解 0.08x = 15 得 x = 187.5 克。"
      ],
      "scenes": [
        {
          "kind": "svg",
          "svg": svg1,
          "caption": "交换前：甲 500g（12%，含盐 60g），乙 300g（20%，含盐 60g）。"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "最终浓度",
              "rhs": "(500×12% + 300×20%) ÷ (500+300)",
              "status": "keep"
            },
            {
              "lhs": "=",
              "rhs": "120 ÷ 800 = 15%",
              "status": "keep",
              "badge": "关键"
            },
            {
              "lhs": "甲最终盐量",
              "rhs": "500 × 15% = 75g",
              "status": "keep"
            },
            {
              "lhs": "甲盐量变化",
              "rhs": "75 - 60 = 15g (增加)",
              "status": "keep"
            },
            {
              "lhs": "盐量变化原因",
              "rhs": "x×20% - x×12% = 0.08x",
              "status": "keep"
            },
            {
              "lhs": "方程",
              "rhs": "0.08x = 15",
              "status": "keep"
            },
            {
              "lhs": "解得 x",
              "rhs": "187.5 克",
              "status": "keep",
              "badge": "答案"
            }
          ],
          "caption": "利用最终浓度相等的性质，列出方程求解"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "🧪",
              "count": "187.5",
              "label": "取出的盐水（克）"
            }
          ],
          "caption": "验证：交换后两容器浓度均为 15%"
        }
      ]
    }
  ],
  "variant": {
    "question": "甲杯 400g 浓度 8%，乙杯 200g 浓度 14%。交换等量后浓度相等，求交换量。",
    "fields": [
      {
        "key": "amount",
        "label": "交换量（克）"
      }
    ],
    "answer": {
      "amount": "400/3"
    },
    "hint": "整体浓度 = (400 × 8% + 200 × 14%) ÷ 600 = 10%。甲最终盐量 40g − 原 32g = 8g，x · (14% − 8%) = 0.06x = 8 ⇒ x = 400/3 ≈ 133.33 克。"
  },
  "tags": [
    "不变量",
    "方程法"
  ]
} satisfies ProblemData;
