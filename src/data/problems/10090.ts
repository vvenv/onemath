import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10090-1.svg?raw";

export default {
  "id": "10090",
  "title": "六阶幻方·幻和求值",
  "grade": "五年级",
  "module": "misc",
  "difficulty": "进阶",
  "question": "把 1, 2, 3, …, 36 这 36 个数字各用一次，填入 6 × 6 方格中，使每一行、每一列、两条对角线上 6 个数之和都相等。问：这个公共和（幻和）是多少？",
  "figures": [
    {
      "svg": svg1,
      "caption": "空的 6×6 方格",
      "alt": "空的 6×6 方格"
    }
  ],
  "solutions": [
    {
      "key": "sum",
      "label": "累加法",
      "steps": [
        "分析：6 行把 1–36 每个数字各覆盖一次，所以 6 行之和就等于 1 + 2 + … + 36。",
        "1 + 2 + … + 36 = (1+36) × 36 / 2 = 37 × 18 = 666。",
        "设幻和为 S，则 6S = 666，得 S = 111。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "1+2+…+36",
              "rhs": "(1+36)·36/2 = 666"
            },
            {
              "lhs": "6S",
              "rhs": "666"
            },
            {
              "lhs": "S",
              "rhs": "111",
              "status": "keep",
              "badge": "幻和"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "n 阶幻方用 1 到 n² 填满，n=8 时幻和等于多少？",
    "fields": [
      {
        "key": "sum",
        "label": "幻和",
        "type": "number"
      }
    ],
    "answer": {
      "sum": 260
    },
    "hint": "S = n × (n²+1) / 2 = 8 × 65 / 2 = 260。"
  },
  "tags": [
    "累加法",
    "首尾配对"
  ]
} satisfies ProblemData;
