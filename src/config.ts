import { Types } from "./types";

const config = {
  rules: [
    {
      key: "sin|cos|tg|ctg|log|sqrt",
      data: {
        type: Types.NAMED_FUNCTION,
        args: 1,
        precedence: 4,
      },
    },
    {
      key: "PI|E|pi|e",
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

export default config;
