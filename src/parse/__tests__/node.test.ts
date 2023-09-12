import { describe, expect, it } from "vitest";
import { ASTNode } from "../node";
import { Types } from "../../types";

describe("node", () => {
  it("should build the tree", () => {
    const root = new ASTNode({ type: Types.NUMBER, value: "1" });
    root.setLeft(new ASTNode({ type: Types.NUMBER, value: "2" }));
    root.setRight(new ASTNode({ type: Types.NUMBER, value: "3" }));

    expect(root.token).toEqual({ type: Types.NUMBER, value: "1" });

    expect(root.left?.token).toEqual({
      type: Types.NUMBER,
      value: "2",
    });

    expect(root.left?.left).toBeNull();
    expect(root.left?.right).toBeNull();

    expect(root.right?.token).toEqual({
      type: Types.NUMBER,
      value: "3",
    });

    expect(root.right?.left).toBeNull();
    expect(root.right?.right).toBeNull();
    expect(root.toJSON()).toEqual({
      left: {
        left: undefined,
        right: undefined,
        type: "NUMBER",
        value: "2",
      },
      right: {
        left: undefined,
        right: undefined,
        type: "NUMBER",
        value: "3",
      },
      type: "NUMBER",
      value: "1",
    });
  });
});
