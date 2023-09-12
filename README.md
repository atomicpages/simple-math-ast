# simple-math-ast

## Introduction

Simple Math AST serves two purposes:

1. Splitting math expression into the array of smallest units (tokens).
2. Building Math AST using tokens via Shunting-Yard Algorithm

Read my blog posts about tokenizer &amp; parser construction

**[Math AST: Tokenizer](https://www.esimovmiras.cc/articles/02-build-math-ast-tokenizer)**

**[Math AST: Parser](https://www.esimovmiras.cc/articles/03-build-math-ast-parser)**

## Install

```shell
npm install @djthoms/simple-math-ast
yarn add @djthoms/simple-math-ast
pnpm add @djthoms/simple-math-ast
```

## Use

### Code example

```ts
import { build } from "@djthoms/simple-math-ast";

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

we can convert the tree to JSON as well:

```ts
const tree = build("2.5 * x + (sin(pi / 2) / cosx) ^ 3 - 4 * 2");
console.log(tree.toJSON());

/**
{
  value: '-',
  type: 'OPERATOR',
  args: 2,
  precedence: 1,
  left: {
    value: '+',
    type: 'OPERATOR',
    args: 2,
    precedence: 1,
    left: {
      value: '*',
      type: 'OPERATOR',
      args: 2,
      precedence: 2,
      left: [Object],
      right: [Object]
    },
    right: {
      value: '^',
      type: 'OPERATOR',
      args: 2,
      precedence: 3,
      left: [Object],
      right: [Object]
    }
  },
  right: {
    value: '*',
    type: 'OPERATOR',
    args: 2,
    precedence: 2,
    left: { value: '4', type: 'NUMBER', left: undefined, right: undefined },
    right: { value: '2', type: 'NUMBER', left: undefined, right: undefined }
  }
}
 */
```

```ts
import { tokenize } from "@djthoms/simple-math-ast/tokenize";

// or using legacy imports...
import { tokenize } from "@djthoms/simple-math-ast";

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

## Benchmarks

Benchmarks are powered by tinybench and vitest. Below are the benchmarks for the
tokenizer and parser. See
[parser benchmarks](./src/parse/__tests__/parse.bench.ts) and the
[tokenizer benchmarks](./src/tokenize/__tests__/tokenize.bench.ts) to see which
expressions are tested.

```sh
✓ src/tokenize/__tests__/tokenize.bench.ts (3) 1820ms
   ✓ tokenize benchmarks (3) 1817ms
     name                                     hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · simple tokenize benchmarks        20,924.02  0.0427  0.2670  0.0478  0.0464  0.1438  0.1691  0.2065  ±0.59%    10464   fastest
   · complex tokenize benchmarks       12,000.27  0.0751  0.2771  0.0833  0.0811  0.1883  0.2082  0.2478  ±0.54%     6001
   · very complex tokenize benchmarks   6,033.61  0.1487  0.7075  0.1657  0.1616  0.3765  0.4024  0.4308  ±0.77%     3017   slowest
 ✓ src/parse/__tests__/parse.bench.ts (3) 1819ms
   ✓ parse benchmarks (3) 1817ms
     name                                  hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · simple parse benchmarks        19,903.71  0.0450  0.2519  0.0502  0.0488  0.1416  0.1648  0.2069  ±0.56%     9952   fastest
   · complex parse benchmarks       11,330.63  0.0796  0.2845  0.0883  0.0860  0.1935  0.2122  0.2535  ±0.52%     5666
   · very complex parse benchmarks   5,569.83  0.1586  2.7357  0.1795  0.1725  0.3872  0.4268  0.6210  ±1.32%     2785   slowest
```

## Credits &amp; Acknowledgements

Originally written by
[Esimov Miras](https://github.com/Flyr1Q/simple-math-ast.git).
