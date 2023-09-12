import type { config } from "../config";
import { UNKNOWN_RULE } from "../config";

const regexMap = new Map<string, RegExp>();

const transformKeyToRegExp = ({
  key,
  ...rest
}: {
  key: string;
  [k: string]: any;
}) => {
  let re = regexMap.get(key);

  if (!regexMap.has(key)) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    re = new RegExp(key, "g");
    regexMap.set(key, re);
  }

  return {
    key: re!,
    ...rest,
  };
};

export function rules(cfg: typeof config) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  cfg.rules.push(UNKNOWN_RULE);
  return cfg.rules.map(transformKeyToRegExp);
}
