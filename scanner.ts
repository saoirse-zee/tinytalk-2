import { Token, TokenType } from "./token.ts";

import { report } from "./report.ts";

const END_OF_LINE = "\n";

/**
 * Takes Tinytalk source and returns tokens
 * @param source Tinytalk source as a string
 * @returns tokens
 */
export function scanner(source: string): Token[] {
  let hadError = false;
  const tokens: Token[] = [];

  let start = 0; // points to the first character in the lexeme being scanned
  let current = 0; // points at the character currently being considered
  let line = 1; // what source line current is on

  while (!isAtEnd()) {
    scanToken();
  }

  function isAtEnd() {
    return current >= source.length;
  }

  function scanToken() {
    const char = source.slice(current, current + 1);
    switch (char) {
      case "(":
        addToken(TokenType.LEFT_PAREN);
        break;
      case ")":
        addToken(TokenType.LEFT_PAREN);
        break;
      case "{":
        addToken(TokenType.LEFT_BRACE);
        break;
      case "}":
        addToken(TokenType.RIGHT_BRACE);
        break;
      case ",":
        addToken(TokenType.COMMA);
        break;
      case ".":
        addToken(TokenType.DOT);
        break;
      case "-":
        addToken(TokenType.MINUS);
        break;
      case "+":
        addToken(TokenType.PLUS);
        break;
      case ";":
        addToken(TokenType.SEMICOLON);
        break;
      case "*":
        addToken(TokenType.STAR);
        break;
      case "!":
        addToken(match("=") ? TokenType.BANG_EQUAL : TokenType.BANG);
        break;
      case "=":
        addToken(match("=") ? TokenType.EQUAL_EQUAL : TokenType.EQUAL);
        break;
      case "<":
        addToken(match("=") ? TokenType.LESS_EQUAL : TokenType.LESS);
        break;
      case ">":
        addToken(match("=") ? TokenType.GREATER_EQUAL : TokenType.GREATER);
        break;
      case "/":
        if (match("/")) {
          while (peek() !== END_OF_LINE && !isAtEnd()) {
            current++;
          }
        } else {
          addToken(TokenType.SLASH);
        }
        break;

      case " ":
      case "\r":
        break;

      case "\n":
        line++;
        break;

      default:
        report(line, `Tinytalk doesn't know about this character: ${char}`);
        hadError = true;
    }
    current++;
  }

  function addToken(type: TokenType) {
    const token: Token = {
      type,
      line,
    };
    tokens.push(token);
  }

  function match(expected: string) {
    if (isAtEnd()) return false;
    if (peek() !== expected) return false;

    current++;
    return true;
  }

  /**
   *
   * @returns next character in source
   */
  function peek() {
    return source.charAt(current);
  }

  // TODO: return hadError along with tokens in a tuple.
  return tokens;
}
