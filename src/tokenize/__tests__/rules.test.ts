/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe, it, expect } from "vitest";
import { rules } from "../rules";
import { config } from "../../config";

describe("rules", () => {
  it("build the rules", () => {
    const ruleSet = rules(config);
    expect(ruleSet).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          key: expect.any(RegExp),
          data: expect.objectContaining({
            type: expect.any(String),
            args: expect.any(Number),
            precedence: expect.any(Number),
          }),
        }),
      ]),
    );
  });
});
