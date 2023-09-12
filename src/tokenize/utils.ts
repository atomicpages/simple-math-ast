export const zipConcat = <T>(source1: T[], source2: T[]) => {
  const output: T[] = [];
  const len = Math.max(source1.length, source2.length);

  for (let i = 0; i < len; i += 1) {
    if (i < source1.length) {
      output.push(source1[i]);
    }

    if (i < source2.length) {
      output.push(source2[i]);
    }
  }

  return output;
};

export const compact = <T>(a: T[]): T[] => a.filter(Boolean);
export const wrap = <T>(value: T): [T] => [value];
export const isNil = (a: any) => a === null || a === undefined;
export const last = <T>(a: T[]): T => a[a.length - 1];
