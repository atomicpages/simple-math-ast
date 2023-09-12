/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  curry,
  map,
  pipe,
  split,
  match,
  reduce,
  flatten,
  reject,
  __,
} from "ramda";

import { config } from "../config";

import { rules } from "./rules";
import { buildToken, isToken } from "./token";
import { zipConcat, compact, wrap } from "./utils";
import { isUnknown } from "../queries";
import type { Token } from "../types";

type AnyFunction = (...args: any[]) => any;

type Rule = {
  data: any;
  key: RegExp;
};

const applyRuleOnTarget = curry(
  ({ data, key }: Rule, target: string | Token) => {
    if (isToken(target as Token)) {
      return target;
    }

    return zipConcat(
      split(key, target as string),
      map(
        buildToken(data as Token) as AnyFunction,
        match(key, target as string),
      ),
    );
  },
);

const applyRuleOnTargets = (targets: (string | Token)[], rule: Rule) =>
  pipe(map(applyRuleOnTarget(rule)), flatten, compact)(targets);

export const tokenize: (expr: string) => Token[] = pipe(
  wrap as AnyFunction,
  reduce(applyRuleOnTargets as AnyFunction, __, rules(config)),
  reject(isUnknown),
);
