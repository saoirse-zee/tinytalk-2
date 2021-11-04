import { Token, TokenType } from "./token.ts";

import { scanner } from "./scanner.ts";

/**
 * Takes Tinytalk source and returns tokens
 * @param source Tinytalk source as a string
 * @returns tokens
 */
export function run(source: string): Token[] {
  let hadError = false; // Should this go here?

  const tokens = scanner(source);

  return tokens;
}
