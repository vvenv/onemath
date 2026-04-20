import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10038-1.svg?raw";

export default {
  "id": "10038",
  "title": "几何计数·数线段和角",
  "grade": "三年级",
  "module": "counting",
  "difficulty": "基础",
  "question": "如图，一条直线上有A、B、C、D、E共5个点。请问：（1）图中共有多少条线段？（2）如果从O点向这5个点各连一条射线，图中共有多少个角？",
  "figures": [
    {
      "svg": svg1,
      "caption": "直线上有A、B、C、D、E五个点",
      "alt": "一条直线上等距分布着5个点"
    }
  ],
  "solutions": [
    {
      "key": "combination-counting",
      "label": "组合计数法",
      "steps": [
        "（1）线段由两个端点确定。从5个点中任选2个作为端点，选法数即为线段数。",
        "线段数 = C(5,2) = (5×4) / 2 = 10 条。",
        "或者按起点分类：以A为起点有4条，以B为起点有3条，以C为起点有2条，以D为起点有1条。4+3+2+1=10。",
        "（2）从O点向5个点连射线，形成5条射线。每两条射线之间形成一个角。",
        "角的总数 = C(5,2) = 10 个。"
      ],
      "scenes": [
        {
          "kind": "number-grid",
          "rows": 1,
          "cols": 5,
          "cells": [
            {
              "row": 0,
              "col": 0,
              "value": "A",
              "tone": "primary"
            },
            {
              "row": 0,
              "col": 1,
              "value": "B",
              "tone": "primary"
            },
            {
              "row": 0,
              "col": 2,
              "value": "C",
              "tone": "primary"
            },
            {
              "row": 0,
              "col": 3,
              "value": "D",
              "tone": "primary"
            },
            {
              "row": 0,
              "col": 4,
              "value": "E",
              "tone": "primary"
            }
          ],
          "caption": "5个点，任选2个组成一条线段"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "线段数",
              "rhs": "C(5,2)",
              "status": "keep"
            },
            {
              "lhs": "=",
              "rhs": "5×4 / 2",
              "status": "keep"
            },
            {
              "lhs": "=",
              "rhs": "10 条",
              "badge": "结果"
            }
          ],
          "caption": "组合公式计算线段数"
        },
        {
          "kind": "statement-table",
          "headers": {
            "speaker": "起点",
            "claim": "可连点数",
            "verdict": "线段数"
          },
          "rows": [
            {
              "speaker": "A",
              "claim": "B,C,D,E",
              "badge": "4"
            },
            {
              "speaker": "B",
              "claim": "C,D,E",
              "badge": "3"
            },
            {
              "speaker": "C",
              "claim": "D,E",
              "badge": "2"
            },
            {
              "speaker": "D",
              "claim": "E",
              "badge": "1"
            }
          ],
          "caption": "分类计数：4+3+2+1=10 条"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "📏",
              "count": 10,
              "label": "线段总数"
            },
            {
              "icon": "📐",
              "count": 10,
              "label": "角的总数"
            }
          ],
          "caption": "线段数和角数都是 C(5,2) = 10"
        }
      ]
    }
  ],
  "variant": {
    "question": "平面上有6个点，任意三点都不在同一直线上。过这些点最多可以画多少条直线？",
    "fields": [
      {
        "key": "lines",
        "label": "直线数"
      }
    ],
    "answer": {
      "lines": 15
    },
    "hint": "每两个点确定一条直线：C(6,2) = 15。"
  },
  "tags": []
} satisfies ProblemData;
