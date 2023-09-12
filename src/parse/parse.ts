import {
  isNumber,
  isConstant,
  isVariable,
  isOperator,
  isNamedFunction,
  isLeftParenthesis,
  isRightParenthesis,
} from "../queries";

import { ASTNode } from "./node";
import type { ConstantToken, OperatorToken, Token } from "../types";
import { last } from "../tokenize/utils";

const addOperandNode = (nodes: ASTNode[], token: ConstantToken) => {
  const node = new ASTNode(token);

  nodes.push(node);
};

const addOperatorNode = (nodes: ASTNode[], token: OperatorToken) => {
  const node = new ASTNode(token);

  if (token.args && token.args > 1) {
    node.setRight(nodes.pop()!);
  }

  node.setLeft(nodes.pop()!);

  nodes.push(node);
};

export const parse = (tokens: Token[]) => {
  const ops: Token[] = [];
  const nodes: ASTNode[] = [];

  tokens.forEach((token) => {
    if (isNumber(token) || isVariable(token) || isConstant(token)) {
      addOperandNode(nodes, token as ConstantToken);
    }

    if (isLeftParenthesis(token)) {
      ops.push(token);
    }

    if (isRightParenthesis(token)) {
      while (last(ops) && !isLeftParenthesis(last(ops)!)) {
        addOperatorNode(nodes, ops.pop()! as OperatorToken);
      }

      ops.pop();
    }

    if (isOperator(token) || isNamedFunction(token)) {
      while (
        last(ops) &&
        last<OperatorToken>(ops as OperatorToken[]).precedence >=
          (token as OperatorToken).precedence &&
        !isLeftParenthesis(token)
      ) {
        addOperatorNode(nodes, ops.pop()! as OperatorToken);
      }

      ops.push(token);
    }
  });

  while (ops.length > 0) {
    addOperatorNode(nodes, ops.pop()! as OperatorToken);
  }

  return nodes.pop();
};
