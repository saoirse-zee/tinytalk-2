import { Token, TokenType } from "./token.ts";

import { report } from "./report.ts";

const END_OF_LINE = "\n";
const NEW_LINE = `\n`;

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

      case `"`: {
        while (peek() !== `"` && !isAtEnd()) {
          // TODO handle newlines
          if (peek() == NEW_LINE) line++;
          current++; // TODO change to advance()?
        }

        // TODO handle unterminated strings

        current++; // Get past that last double quote mark

        // Here we trim surrounding quotes
        const value = source.substring(start + 1, current); // QUESTION: this doesn't match the book. He has current+1. Why?
        addToken(TokenType.STRING, value);
        break;
      }

      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        handleNumber();
        break;

      default:
        report(line, `Tinytalk doesn't know about this character: ${char}`);
        hadError = true;
    }
    current++;
  }

  function handleNumber() {
    while (peek() !== `"` && !isAtEnd()) {
      if (peek() == NEW_LINE) line++;
      current++; // TODO change to advance()?
    }

    current++; // Get past that last double quote mark

    // Here we trim surrounding quotes
    console.log(">>> ", source.substring(start, current));
    const value = Number(source.substring(start, current));
    console.log(">>> ", value);
    addToken(TokenType.NUMBER, value);
  }

  function addToken(type: TokenType, value?: string | number) {
    const token: Token = {
      type,
      line,
    };

    if (value !== undefined) token.value = value;

    tokens.push(token);
  }

  /**
   * Tells you if the next character matches `expected`. Also advances the cursor.
   *
   * @param expected - the character you want to test for
   *
   * @returns boolean
   */
  function match(expected: string) {
    if (isAtEnd()) return false;
    if (peek() !== expected) return false;

    current++;
    return true;
  }
  // TODO add advance here

  /**
   *
   * @returns next character in source
   */
  function peek() {
    return source.charAt(current + 1);
  }

  // TODO: return hadError along with tokens in a tuple.
  return tokens;
}
