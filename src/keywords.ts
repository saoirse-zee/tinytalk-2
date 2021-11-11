import { TokenType } from "./token.ts";

/**
 * Map from Tinytalk keywords to token types
 */
const kw = new Map<string, TokenType>();
kw.set("if", TokenType.IF);
kw.set("when", TokenType.WHEN);

export const keywords = kw;
