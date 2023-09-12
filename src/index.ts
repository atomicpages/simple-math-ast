import { tokenize } from "./tokenize";
import { parse } from "./parse/parse";
import type { Token, Types } from "./types";

export const build = (expression: string) => {
  return parse(tokenize(expression));
};

export { tokenize, parse, Types };
export type { Token };
