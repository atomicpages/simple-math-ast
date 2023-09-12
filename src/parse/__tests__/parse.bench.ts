import { bench, describe } from "vitest";
import { parse } from "../parse";
import { tokenize } from "../../tokenize";

describe("parse benchmarks", () => {
  bench("simple parse benchmarks", () => {
    parse(tokenize("1 + 2 * 3 / 4 - 5 ^ 6"));
  });

  bench("complex parse benchmarks", () => {
    parse(tokenize("2.5 * x + (sin(pi / 2) / cosx) ^ 3 - 4 * 2"));
  });

  bench("very complex parse benchmarks", () => {
    parse(
      tokenize(
        "2.5 * x + (sin(pi / 2) / cosx) ^ 3 - 4 * (2 + 2.5) * x + (sin(pi / 2) / cosx) ^ 3 - 4 * 2",
      ),
    );
  });
});
