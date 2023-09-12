import { describe, it, expect } from "vitest";
import {
  isConstant,
  isLeftParenthesis,
  isNamedFunction,
  isNumber,
  isOperator,
  isRightParenthesis,
  isVariable,
} from "../queries";
import { Types } from "../types";

describe("queries", () => {
  it("isNumber", () => {
    expect(
      isNumber({
        type: Types.NUMBER,
        value: "3",
      }),
    ).toBe(true);

    expect(
      isNumber({
        type: Types.CONSTANT,
        value: "pi",
      }),
    ).toBe(false);
  });

  it("isConstant", () => {
    expect(
      isConstant({
        type: Types.NUMBER,
        value: "3",
      }),
    ).toBe(false);

    expect(
      isConstant({
        type: Types.CONSTANT,
        value: "pi",
      }),
    ).toBe(true);
  });

  it("isVariable", () => {
    expect(
      isVariable({
        type: Types.VARIABLE,
        value: "x",
      }),
    ).toBe(true);

    expect(
      isVariable({
        type: Types.NUMBER,
        value: "3",
      }),
    ).toBe(false);
  });

  it("isOperator", () => {
    expect(
      isOperator({
        type: Types.OPERATOR,
        value: "+",
        args: 0,
        precedence: 0,
      }),
    ).toBe(true);

    expect(
      isOperator({
        type: Types.NUMBER,
        value: "3",
      }),
    ).toBe(false);
  });

  it("isNamedFunction", () => {
    expect(
      isNamedFunction({
        type: Types.NAMED_FUNCTION,
        value: "sin",
        args: 0,
        precedence: 0,
      }),
    ).toBe(true);

    expect(
      isNamedFunction({
        type: Types.NUMBER,
        value: "3",
      }),
    ).toBe(false);
  });

  it("isLeftParenthesis", () => {
    expect(
      isLeftParenthesis({
        type: Types.LEFT_PARENTHESIS,
        value: "(",
      }),
    ).toBe(true);

    expect(
      isLeftParenthesis({
        type: Types.NUMBER,
        value: "3",
      }),
    ).toBe(false);
  });

  it("isRightParenthesis", () => {
    expect(
      isRightParenthesis({
        type: Types.RIGHT_PARENTHESIS,
        value: ")",
      }),
    ).toBe(true);

    expect(
      isRightParenthesis({
        type: Types.NUMBER,
        value: "3",
      }),
    ).toBe(false);
  });
});
