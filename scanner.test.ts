import { TokenType } from "./token.ts";
import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { scanner } from "./scanner.ts";

Deno.test("Can scan a single paren", () => {
  const source = "(";
  const tokens = scanner(source);

  assertEquals(tokens, [
    {
      type: "(",
      line: 1,
    },
  ]);
});

Deno.test("Can scan a single angle bracket", () => {
  const source = "<";
  const tokens = scanner(source);

  assertEquals(tokens, [
    {
      type: "<",
      line: 1,
    },
  ]);
});

Deno.test("Can scan a single equals", () => {
  const source = "=";
  const tokens = scanner(source);

  assertEquals(tokens, [
    {
      type: "=",
      line: 1,
    },
  ]);
});

Deno.test("Skips meaningless whitespace", () => {
  const source = `   \r\n\n`;
  const tokens = scanner(source);

  assertEquals(tokens, []);
});

Deno.test("Advances to the next line on newline characters", () => {
  const source = `\n(`;
  const tokens = scanner(source);

  assertEquals(tokens, [
    {
      type: "(",
      line: 2,
    },
  ]);
});

Deno.test("Can scan a multi-character token", () => {
  const source = "<=";
  const tokens = scanner(source);

  assertEquals(tokens, [
    {
      type: TokenType.LESS_EQUAL,
      line: 1,
    },
  ]);
});

Deno.test("Can scan a string literal", () => {
  const source = `"abcde"`;
  const tokens = scanner(source);

  assertEquals(tokens, [
    {
      type: TokenType.STRING,
      line: 1,
      value: `abcde`,
    },
  ]);
});

Deno.test("String literal: Can handle line breaks", () => {
  const source = `"abc\nde"`;
  const tokens = scanner(source);

  assertEquals(tokens, [
    {
      type: TokenType.STRING,
      line: 2,
      value: `abc\nde`,
    },
  ]);
});

Deno.test("Number literal: Can scan a non-zero number", () => {
  const source = `1`;
  const tokens = scanner(source);

  assertEquals(tokens, [
    {
      type: TokenType.NUMBER,
      line: 1,
      value: 1,
    },
  ]);
});

Deno.test("Number literal: Can scan a multi-digit number", () => {
  const source = `123`;
  const tokens = scanner(source);

  assertEquals(tokens, [
    {
      type: TokenType.NUMBER,
      line: 1,
      value: 123,
    },
  ]);
});

Deno.test("Number literal: Can scan zero", () => {
  const source = `0`;
  const tokens = scanner(source);

  assertEquals(tokens, [
    {
      type: TokenType.NUMBER,
      line: 1,
      value: 0,
    },
  ]);
});
