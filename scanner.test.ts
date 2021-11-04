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
