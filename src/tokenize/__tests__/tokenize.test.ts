import { describe, it, expect } from "vitest";
import { tokenize } from "..";
import { Types } from "../../types";

describe("tokenize", () => {
  it("should return an array of tokens", () => {
    expect(tokenize("1 + 2")).toEqual([
      { type: "NUMBER", value: "1" },
      { type: "OPERATOR", value: "+", precedence: 1, args: 2 },
      { type: "NUMBER", value: "2" },
    ]);
  });

  it("should tokenize a complex expression", () => {
    expect(tokenize("2.5 * x + (sin(pi / 2) / cosx) ^ 3 - 4 * 2")).toEqual([
      { type: Types.NUMBER, value: "2.5" },
      { type: Types.OPERATOR, value: "*", args: 2, precedence: 2 },
      { type: Types.VARIABLE, value: "x" },
      { type: Types.OPERATOR, value: "+", args: 2, precedence: 1 },
      { type: Types.LEFT_PARENTHESIS, value: "(" },
      { type: Types.NAMED_FUNCTION, value: "sin", args: 1, precedence: 4 },
      { type: Types.LEFT_PARENTHESIS, value: "(" },
      { type: Types.CONSTANT, value: "pi" },
      { type: Types.OPERATOR, value: "/", args: 2, precedence: 2 },
      { type: Types.NUMBER, value: "2" },
      { type: Types.RIGHT_PARENTHESIS, value: ")" },
      { type: Types.OPERATOR, value: "/", args: 2, precedence: 2 },
      { type: Types.NAMED_FUNCTION, value: "cos", args: 1, precedence: 4 },
      { type: Types.VARIABLE, value: "x" },
      { type: Types.RIGHT_PARENTHESIS, value: ")" },
      { type: Types.OPERATOR, value: "^", args: 2, precedence: 3 },
      { type: Types.NUMBER, value: "3" },
      { type: Types.OPERATOR, value: "-", args: 2, precedence: 1 },
      { type: Types.NUMBER, value: "4" },
      { type: Types.OPERATOR, value: "*", args: 2, precedence: 2 },
      { type: Types.NUMBER, value: "2" },
    ]);
  });
});
