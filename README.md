# simple-math-ast

## Introduction

Simple Math AST serves two purposes:

1. Splitting math expression into the array of smallest units (tokens).
2. Building Math AST using tokens via Shunting-Yard Algorithm

Read my blog posts about tokenizer &amp; parser construction

**[Math AST: Tokenizer](https://www.esimovmiras.cc/articles/02-build-math-ast-tokenizer)**

**[Math AST: Parser](https://www.esimovmiras.cc/articles/03-build-math-ast-parser)**

## Install

First, install:

```sh
npm install @djthoms/simple-math-ast
yarn add @djthoms/simple-math-ast
pnpm add @djthoms/simple-math-ast
```

## Usage

There are three possible outputs from this library:

1. An array of
   [tokens](https://github.com/atomicpages/simple-math-ast/blob/07d101b1fd176f15ac3660d4c9f46001731746d3/src/types.ts#L29)
2. The math AST
3. The JSON version of the math AST

### Math AST

```ts
import { build } from "@djthoms/simple-math-ast";

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

### Math AST as JSON

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

### Tokens Array

```ts
import { tokenize } from "@djthoms/simple-math-ast/tokenize";

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

### Imports

CommonJS, Typings, "classic" ESM, and ESM "exports" are available use:

```ts
import type { Token } from "@djthoms/simple-math-ast";
import { tokenizer } from "@djthoms/simple-math-ast/tokenizer";
import { parser } from "@djthoms/simple-math-ast/parser";

// not using the exports field yet? no worries.
import { tokenizer, parser } from "@djthoms/simple-math-ast";
```

## Benchmarks

Benchmarks are powered by tinybench and vitest on a Apple M1 Pro with 32GB of
memory. Below are the benchmarks for the tokenizer and parser. See
[parser benchmarks](./src/parse/__tests__/parse.bench.ts) and the
[tokenizer benchmarks](./src/tokenize/__tests__/tokenize.bench.ts) to see which
expressions are tested.

```sh
 ✓ src/tokenize/__tests__/tokenize.bench.ts (3) 1821ms
   ✓ tokenize benchmarks (3) 1819ms
     name                                     hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · simple tokenize benchmarks        20,047.83  0.0431  0.4829  0.0499  0.0472  0.1904  0.2198  0.2600  ±0.83%    10024   fastest
   · complex tokenize benchmarks       11,515.52  0.0758  1.1868  0.0868  0.0827  0.2381  0.2705  0.3227  ±0.90%     5758
   · very complex tokenize benchmarks   5,908.49  0.1500  0.8161  0.1692  0.1650  0.3746  0.3931  0.4847  ±0.80%     2955   slowest
 ✓ src/parse/__tests__/parse.bench.ts (6) 3528ms
   ✓ parse benchmarks (3) 3024ms
     name                                  hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · simple parse benchmarks        18,585.22  0.0465  0.4257  0.0538  0.0509  0.1934  0.2276  0.2882  ±0.83%     9293   fastest
   · complex parse benchmarks       10,963.23  0.0821  0.5632  0.0912  0.0892  0.2704  0.3048  0.3828  ±0.74%     5482
   · very complex parse benchmarks   5,580.39  0.1637  0.5968  0.1792  0.1770  0.4059  0.4486  0.5217  ±0.76%     2791   slowest
   ✓ parse to json benchmarks (3) 3526ms
     name                                  hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · simple parse benchmarks        16,094.31  0.0522  1.1004  0.0621  0.0582  0.1311  0.5275  0.6778  ±1.71%     8048   fastest
   · complex parse benchmarks        9,731.21  0.0910  0.6795  0.1028  0.0990  0.4617  0.5343  0.6044  ±1.30%     4866
   · very complex parse benchmarks   4,893.12  0.1809  1.4277  0.2044  0.1975  0.5879  0.6608  0.7894  ±1.35%     2447   slowest
```

Turns out this is fast. I mean _real_ fast. Perfect for storing math expression
typed by a user.

## Credits &amp; Acknowledgements

Originally written by
[Esimov Miras](https://github.com/Flyr1Q/simple-math-ast.git).

Enhancements by yours truly:

- TypeScript conversion
- Unit tests
- Benchmarks
- Modern packaging
- AST -> JSON
