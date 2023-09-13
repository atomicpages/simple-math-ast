import { tokenize } from "./tokenize";
import { parse } from "./parse/parse";
import { Types } from "./types";
import type { Token, ConstantToken, OperatorToken } from "./types";
import { ASTNode } from "./parse/node";

export const build = (expression: string) => {
  return parse(tokenize(expression));
};

export { tokenize, parse, Types, ASTNode };
export type { Token, ConstantToken, OperatorToken };
