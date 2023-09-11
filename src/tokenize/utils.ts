import { filter, identity } from "ramda";

export const zipConcat = (source1: string[], source2: string[]) => {
  const output = [];

  for (let i = 0; i < Math.max(source1.length, source2.length); i += 1) {
    if (i < source1.length) {
      output.push(source1[i]);
    }

    if (i < source2.length) {
      output.push(source2[i]);
    }
  }

  return output;
};

export const compact = filter(identity);
export const wrap = <T = any>(value: T) => [value];
