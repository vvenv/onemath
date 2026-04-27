import type { ProblemData } from "@/types/problem";

export default {
  "id": "10046",
  "title": "余数性质·星期几",
  "grade": "四年级",
  "module": "数论",
  "difficulty": "基础",
  "question": "2024 年 1 月 1 日是星期一。2024 年 10 月 1 日是星期几？",
  "solutions": [
    {
      "key": "remainder",
      "label": "余数计算法",
      "steps": [
        "1 至 9 月共 31 + 29 + 31 + 30 + 31 + 30 + 31 + 31 + 30 = 274 天，274 ÷ 7 = 39 余 1，星期一 + 1 = 星期二。"
      ],
      "scenes": [
        {
          "kind": "number-grid",
          "rows": 3,
          "cols": 4,
          "cells": [
            {
              "row": 0,
              "col": 0,
              "value": "1月:31"
            },
            {
              "row": 0,
              "col": 1,
              "value": "2月:29"
            },
            {
              "row": 0,
              "col": 2,
              "value": "3月:31"
            },
            {
              "row": 0,
              "col": 3,
              "value": "4月:30"
            },
            {
              "row": 1,
              "col": 0,
              "value": "5月:31"
            },
            {
              "row": 1,
              "col": 1,
              "value": "6月:30"
            },
            {
              "row": 1,
              "col": 2,
              "value": "7月:31"
            },
            {
              "row": 1,
              "col": 3,
              "value": "8月:31"
            },
            {
              "row": 2,
              "col": 0,
              "value": "9月:30"
            },
            {
              "row": 2,
              "col": 1,
              "value": "合计:274"
            }
          ],
          "caption": "2024年1月1日到10月1日，经过 274 天"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "274 ÷ 7",
              "rhs": "39 周 余 1 天",
              "status": "keep"
            }
          ],
          "caption": "每 7 天一个周期，余 1 天"
        },
        {
          "kind": "number-line",
          "min": 0,
          "max": 7,
          "points": [
            {
              "value": 1,
              "label": "一",
              "tone": "primary"
            },
            {
              "value": 2,
              "label": "二",
              "tone": "accent"
            }
          ],
          "caption": "星期一加 1 天 = 星期二"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "📅",
              "count": "星期二",
              "label": "10月1日"
            }
          ],
          "caption": "2024 年 10 月 1 日是星期二"
        }
      ]
    }
  ],
  "variant": {
    "question": "2024 年 3 月 1 日是星期五。2024 年 6 月 1 日是星期几？",
    "fields": [
      {
        "key": "weekday",
        "type": "text",
        "label": "星期几",
        "enum": [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期日"
        ]
      }
    ],
    "answer": {
      "weekday": "星期六"
    },
    "hint": "3月31天，4月30天，5月31天，共92天。92 ÷ 7 = 13 周余 1 天。"
  },
  "tags": ["周期问题"]
} satisfies ProblemData;
