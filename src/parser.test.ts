import { TokenType } from "./token.ts";
import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { parse } from "./parser.ts";

Deno.test(
  "should return a token with the type of NumericLiteral for number tokens",
  () => {
    const tokens = [{ type: TokenType.NUMBER, value: 2, line: 1 }];
    const ast = { type: "NumericLiteral", value: 2 };

    assertEquals(parse(tokens), ast);
  },
);

Deno.test(
  "should return a token with the type of StringLiteral for string tokens",
  (t) => {
    const tokens = [{ type: TokenType.STRING, value: "hello", line: 1 }];
    const ast = { type: "StringLiteral", value: "hello" };

    assertEquals(parse(tokens), ast);
  },
);

Deno.test(
  "should return a token with the type of Identifier for name tokens",
  (t) => {
    const tokens = [{ type: TokenType.IDENTIFIER, value: "sum", line: 1 }];
    const ast = { type: "Identifier", name: "sum" };

    assertEquals(parse(tokens), ast);
  },
);

Deno.test("should return an AST for a basic data structure - no args", (t) => {
  const tokens = [
    { type: TokenType.LEFT_PAREN, line: 1 },
    { type: TokenType.IDENTIFIER, value: "say-hello", line: 1 },
    { type: TokenType.RIGHT_PAREN, line: 1 },
  ];

  const ast = {
    type: "CallExpression",
    name: "say-hello",
    arguments: [],
  };

  const result = parse(tokens);

  assertEquals(result, ast);
});

Deno.test(
  "should return an AST for a basic data structure - with args",
  (t) => {
    const tokens = [
      { type: TokenType.LEFT_PAREN, line: 1 },
      { type: TokenType.IDENTIFIER, value: "add", line: 1 },
      { type: TokenType.NUMBER, value: 2, line: 1 },
      { type: TokenType.NUMBER, value: 3, line: 1 },
      { type: TokenType.RIGHT_PAREN, value: ")", line: 1 },
    ];

    const ast = {
      type: "CallExpression",
      name: "add",
      arguments: [
        { type: "NumericLiteral", value: 2 },
        { type: "NumericLiteral", value: 3 },
      ],
    };

    const result = parse(tokens);

    assertEquals(result, ast);
  },
);

Deno.test("should return an AST for a nested data structure", (t) => {
  const tokens = [
    { type: TokenType.LEFT_PAREN, line: 1 },
    { type: TokenType.IDENTIFIER, value: "add", line: 1 },
    { type: TokenType.NUMBER, value: 2, line: 1 },
    { type: TokenType.NUMBER, value: 3, line: 1 },
    { type: TokenType.LEFT_PAREN, line: 1 },
    { type: TokenType.IDENTIFIER, value: "subtract", line: 1 },
    { type: TokenType.NUMBER, value: 4, line: 1 },
    { type: TokenType.NUMBER, value: 2, line: 1 },
    { type: TokenType.RIGHT_PAREN, line: 1 },
    { type: TokenType.RIGHT_PAREN, line: 1 },
  ];

  const ast = {
    type: "CallExpression",
    name: "add",
    arguments: [
      { type: "NumericLiteral", value: 2 },
      { type: "NumericLiteral", value: 3 },
      {
        type: "CallExpression",
        name: "subtract",
        arguments: [
          { type: "NumericLiteral", value: 4 },
          { type: "NumericLiteral", value: 2 },
        ],
      },
    ],
  };

  const result = parse(tokens);

  assertEquals(result, ast);
});
