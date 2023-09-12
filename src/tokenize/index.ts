/* eslint-disable @typescript-eslint/no-unsafe-return */
import { config } from "../config";

import { rules } from "./rules";
import { buildToken, isToken } from "./token";
import { zipConcat, compact, wrap } from "./utils";
import { isUnknown } from "../queries";
import type { Token } from "../types";

type Rule = {
  data: any;
  key: RegExp;
};

function applyRuleOnTarget({ data, key }: Rule, target: string | Token) {
  if (isToken(target as Token)) {
    return target;
  }

  const matches =
    (target as string).match(key) ?? ([] as unknown as RegExpMatchArray);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return zipConcat(
    (target as string).split(key),
    matches.map((match) => buildToken(data as Partial<Token>, match)) as any[],
  );
}

function applyRuleOnTargets(targets: (string | Token)[], rule: Rule): Token[] {
  return targets.flatMap((target) => applyRuleOnTarget(rule, target));
}

export function tokenize(expr: string): Token[] {
  const tokenizedExp = rules(config).reduce(
    (result, rule) => {
      return applyRuleOnTargets(result, rule as Rule);
    },
    wrap(expr) as unknown as Token[],
  );

  return compact(tokenizedExp.filter((token) => !isUnknown(token)));
}
