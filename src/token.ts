export enum TokenType {
  // Single-character tokens.
  LEFT_PAREN = "(",
  RIGHT_PAREN = ")",
  LEFT_BRACE = "{",
  RIGHT_BRACE = "}",
  COMMA = ",",
  DOT = ".",
  MINUS = "-",
  PLUS = "+",
  SEMICOLON = "x",
  SLASH = "/",
  STAR = "*",

  // One or two character tokens.
  BANG = "!",
  BANG_EQUAL = "!=",
  EQUAL = "=",
  EQUAL_EQUAL = "==",
  GREATER = ">",
  GREATER_EQUAL = ">=",
  LESS = "<",
  LESS_EQUAL = "<=",

  // Literals.
  IDENTIFIER = "identifier",
  STRING = "string",
  NUMBER = "number",

  // Keywords.
  IF = "if",
  WHEN = "when",
  /*
  AND,
  CLASS,
  ELSE,
  FALSE,
  FUN,
  FOR,
  NIL,
  OR,
  PRINT,
  RETURN,
  SUPER,
  THIS,
  TRUE,
  VAR,
  WHILE,

  EOF,
  */
}

export type Token = {
  type: TokenType;
  line: number;
  value?: string | number;
};
