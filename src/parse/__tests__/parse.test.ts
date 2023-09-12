import { describe, it, expect } from "vitest";
import { parse } from "../parse";
import { tokenize } from "../../tokenize";
import { ASTNode } from "../node";
import { Types } from "../../types";

describe("parse tests", () => {
  it("should parse a simple expression", () => {
    expect(parse(tokenize("1 + 2"))).toEqual(
      new ASTNode({
        type: Types.OPERATOR,
        value: "+",
        args: 2,
        precedence: 1,
      })
        .setLeft(
          new ASTNode({
            type: Types.NUMBER,
            value: "1",
          }),
        )
        .setRight(
          new ASTNode({
            type: Types.NUMBER,
            value: "2",
          }),
        ),
    );
  });

  it("should parse a complex expression", () => {
    const tokens = tokenize("2.5 * x + (sin(pi / 2) / cosx) ^ 3 - 4 * 2");
    expect(parse(tokens)).toMatchInlineSnapshot(`
        {
          "args": 2,
          "left": {
            "args": 2,
            "left": {
              "args": 2,
              "left": {
                "left": undefined,
                "right": undefined,
                "type": "NUMBER",
                "value": "2.5",
              },
              "precedence": 2,
              "right": {
                "left": undefined,
                "right": undefined,
                "type": "VARIABLE",
                "value": "x",
              },
              "type": "OPERATOR",
              "value": "*",
            },
            "precedence": 1,
            "right": {
              "args": 2,
              "left": {
                "args": 2,
                "left": {
                  "args": 1,
                  "left": {
                    "args": 2,
                    "left": {
                      "left": undefined,
                      "right": undefined,
                      "type": "CONSTANT",
                      "value": "pi",
                    },
                    "precedence": 2,
                    "right": {
                      "left": undefined,
                      "right": undefined,
                      "type": "NUMBER",
                      "value": "2",
                    },
                    "type": "OPERATOR",
                    "value": "/",
                  },
                  "precedence": 4,
                  "right": undefined,
                  "type": "NAMED_FUNCTION",
                  "value": "sin",
                },
                "precedence": 2,
                "right": {
                  "args": 1,
                  "left": {
                    "left": undefined,
                    "right": undefined,
                    "type": "VARIABLE",
                    "value": "x",
                  },
                  "precedence": 4,
                  "right": undefined,
                  "type": "NAMED_FUNCTION",
                  "value": "cos",
                },
                "type": "OPERATOR",
                "value": "/",
              },
              "precedence": 3,
              "right": {
                "left": undefined,
                "right": undefined,
                "type": "NUMBER",
                "value": "3",
              },
              "type": "OPERATOR",
              "value": "^",
            },
            "type": "OPERATOR",
            "value": "+",
          },
          "precedence": 1,
          "right": {
            "args": 2,
            "left": {
              "left": undefined,
              "right": undefined,
              "type": "NUMBER",
              "value": "4",
            },
            "precedence": 2,
            "right": {
              "left": undefined,
              "right": undefined,
              "type": "NUMBER",
              "value": "2",
            },
            "type": "OPERATOR",
            "value": "*",
          },
          "type": "OPERATOR",
          "value": "-",
        }
      `);
  });
});
