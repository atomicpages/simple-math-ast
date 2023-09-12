import { Types } from "./types";

export const UNKNOWN_RULE = {
  key: ".+",
  data: {
    type: Types.UNKNOWN,
  },
} as const;

export const config = {
  rules: [
    {
      key: "sin|cos|tg|ctg|log|sqrt|abs",
      data: {
        type: Types.NAMED_FUNCTION,
        args: 1,
        precedence: 4,
      },
    },
    {
      key: "PI|E|pi|e|π",
      data: {
        type: Types.CONSTANT,
      },
    },
    {
      key: "[\\^]",
      data: {
        type: Types.OPERATOR,
        args: 2,
        precedence: 3,
      },
    },
    {
      key: "[\\*\\/]",
      data: {
        type: Types.OPERATOR,
        args: 2,
        precedence: 2,
      },
    },
    {
      key: "[\\+\\-]",
      data: {
        type: Types.OPERATOR,
        args: 2,
        precedence: 1,
      },
    },
    { key: "[(\\[]", data: { type: Types.LEFT_PARENTHESIS } },
    { key: "[)\\]]", data: { type: Types.RIGHT_PARENTHESIS } },
    { key: "[0-9.,]+", data: { type: Types.NUMBER } },
    { key: "[a-zA-Z]", data: { type: Types.VARIABLE } },
  ],
};
