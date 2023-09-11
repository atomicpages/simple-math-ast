import { tokenize } from "./tokenize";
import { parse } from "./parse";

export const build = (expression: string) => {
  return parse(tokenize(expression));
};

export { tokenize, parse };
