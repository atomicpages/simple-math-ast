import { describe, it, expect } from "vitest";
import { wrap, compact, zipConcat } from "../utils";

describe("utils tests", () => {
  it("wrap", () => {
    expect(wrap("foo")).toEqual(["foo"]);
  });

  it("compact", () => {
    expect(compact(["foo", "", "bar", 0, false, null, undefined, []])).toEqual([
      "foo",
      "bar",
      [],
    ]);
  });

  it("zipConcat", () => {
    expect(zipConcat(["foo", "bar"], ["baz", "qux"])).toEqual([
      "foo",
      "baz",
      "bar",
      "qux",
    ]);
  });
});
