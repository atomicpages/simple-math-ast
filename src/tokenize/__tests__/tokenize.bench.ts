import { bench, describe } from "vitest";
import { tokenize } from "../..";

describe("tokenize benchmarks", () => {
  bench("simple tokenize benchmarks", () => {
    tokenize("1 + 2 * 3 / 4 - 5 ^ 6");
  });

  bench("complex tokenize benchmarks", () => {
    tokenize("2.5 * x + (sin(pi / 2) / cosx) ^ 3 - 4 * 2");
  });

  bench("very complex tokenize benchmarks", () => {
    tokenize(
      "2.5 * x + (sin(pi / 2) / cosx) ^ 3 - 4 * (2 + 2.5) * x + (sin(pi / 2) / cosx) ^ 3 - 4 * 2",
    );
  });
});
