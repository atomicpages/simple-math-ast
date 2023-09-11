# simple-math-ast

## Introduction

Simple Math AST serves two purposes:

1.  Splitting math expression into the array of smallest units (tokens).
2.  Building Math AST using tokens via Shunting-Yard Algorithm

Read my blog posts about tokenizer & parser construction

**[Math AST: Tokenizer](https://www.esimovmiras.cc/articles/02-build-math-ast-tokenizer)**

**[Math AST: Parser](https://www.esimovmiras.cc/articles/03-build-math-ast-parser)**

## Install

```shell
npm install simple-math-ast
```

## Use

### Code example

```ts
import { build } from "simple-math-ast";

/**
 * Provide math expression, pass to function & receive Math AST
 */

const tree = build("2.5 * x + (sin(pi / 2) / cosx) ^ 3 - 4 * 2");

console.log(tree);

/**
 * ASTNode {
 *  token: { value: '-', type: 'OPERATOR', args: 2, precedence: 1 },
 *  left:
 *   ASTNode {
 *     token: { value: '+', type: 'OPERATOR', args: 2, precedence: 1 },
 *     left: ASTNode { token: [Object], left: [Object], right: [Object] },
 *     right: ASTNode { token: [Object], left: [Object], right: [Object] } },
 *  right:
 *   ASTNode {
 *     token: { value: ' *', type: 'OPERATOR', args: 2, precedence: 2 },
 *     left: ASTNode { token: [Object], left: null, right: null },
 *     right: ASTNode { token: [Object], left: null, right: null } } }
 */
```

```ts
import { tokenize } from "simple-math-ast/tokenize";

// or using legacy imports...
import { tokenize } from "simple-math-ast";

/**
 * Provide math expression, pass to function and receive array of tokens
 */

const tokens = tokenize("2.5 * x + (sin(pi / 2) / cosx) ^ 3 - 4 * 2");

console.log(tokens);

/**
 * [
 *  { value: "2.5", type: "NUMBER" },
 *  { value: "*", type: "OPERATOR", args: 2, precedence: 2 },
 *  { value: "x", type: "VARIABLE" },
 *  { value: "+", type: "OPERATOR", args: 2, precedence: 1 },
 *  { value: "(", type: "LEFT_PARENTHESIS" },
 *  { value: "sin", type: "NAMED_FUNCTION", args: 1, precedence: 4 },
 *  { value: "(", type: "LEFT_PARENTHESIS" },
 *  { value: "pi", type: "CONSTANT" },
 *  { value: "/", type: "OPERATOR", args: 2, precedence: 2 },
 *  { value: "2", type: "NUMBER" },
 *  { value: ")", type: "RIGHT_PARENTHESIS" },
 *  { value: "/", type: "OPERATOR", args: 2, precedence: 2 },
 *  { value: "cos", type: "NAMED_FUNCTION", args: 1, precedence: 4 },
 *  { value: "x", type: "VARIABLE" },
 *  { value: ")", type: "RIGHT_PARENTHESIS" },
 *  { value: "^", type: "OPERATOR", args: 2, precedence: 3 },
 *  { value: "3", type: "NUMBER" },
 *  { value: "-", type: "OPERATOR", args: 2, precedence: 1 },
 *  { value: "4", type: "NUMBER" },
 *  { value: "*", type: "OPERATOR", args: 2, precedence: 2 },
 *  { value: "2", type: "NUMBER" }
 * ];
 */
```

## Credits &amp; Acknowledgements

Originally written by [Esimov Miras](https://github.com/Flyr1Q/simple-math-ast.git).
