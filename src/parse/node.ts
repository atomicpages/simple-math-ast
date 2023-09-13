/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Maybe, Token } from "../types";

export class ASTNode {
  private _token: Token;
  private _left: Maybe<ASTNode> = null;
  private _right: Maybe<ASTNode> = null;

  constructor(token: Token) {
    this._token = token;
  }

  public get token(): Token {
    return this._token;
  }

  public get left(): Maybe<ASTNode> {
    return this._left;
  }

  public get right(): Maybe<ASTNode> {
    return this._right;
  }

  setRight(node: ASTNode): this {
    this._right = node;
    return this;
  }

  setLeft(node: ASTNode): this {
    this._left = node;
    return this;
  }

  /**
   * Recursively converts the ASTNode to a JSON object.
   * @example
   * build("1 + 2").toJSON();
   * @returns
   */
  toJSON(): Record<string, unknown> {
    return {
      ...this._token,
      left: this._left?.toJSON(),
      right: this._right?.toJSON(),
    };
  }
}
