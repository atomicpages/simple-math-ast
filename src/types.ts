export enum Types {
  CONSTANT = "CONSTANT",
  NAMED_FUNCTION = "NAMED_FUNCTION",
  OPERATOR = "OPERATOR",
  VARIABLE = "VARIABLE",
  NUMBER = "NUMBER",
  LEFT_PARENTHESIS = "LEFT_PARENTHESIS",
  RIGHT_PARENTHESIS = "RIGHT_PARENTHESIS",
  UNKNOWN = "UNKNOWN",
}

export type OperatorToken = {
  value: string;
  type: Types.OPERATOR | Types.NAMED_FUNCTION;
  args: number;
  precedence: number;
};

export type ConstantToken = {
  value: string;
  type:
    | Types.NUMBER
    | Types.VARIABLE
    | Types.LEFT_PARENTHESIS
    | Types.RIGHT_PARENTHESIS
    | Types.CONSTANT;
};

export type Token = ConstantToken | OperatorToken;
export type Maybe<T> = T | null;
