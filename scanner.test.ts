import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { scanner } from "./scanner.ts";

// Simple name and function, compact form, but not configurable
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
