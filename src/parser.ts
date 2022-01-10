import { Token, TokenType } from "./token.ts";

interface Stmt {
  accept(visitor: any): any;
}

// https://github.com/zlliang/tslox/blob/360b56440821bed65434c9f8a2b2595b8d53d5de/src/ast.ts#L233
export class VarStmt implements Stmt {
  name: Token;
  initializer: any;

  constructor(name: Token, initializer: any | null) {
    this.name = name;
    this.initializer = initializer;
  }

  accept(visitor: any): any {
    return visitor.visitVarStmt(this);
  }
}

export class Parser {
  private tokens;
  private currentTokenIndex;
  private astStatements: Stmt[];

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.currentTokenIndex = 0;
    this.astStatements = [];
  }

  parse() {
    while (!this.isAtEnd()) {
      // Jesus this feels ways too over-abstracted
      const thing = this.consume(
        TokenType.IDENTIFIER,
        "needs to be an identifier",
      );
      const statement: Stmt = {
        accept: () => {},
      };
      this.astStatements.push(statement);
      this.printToken();
      this.advance();
    }
  }

  /**
   * Safely advances the cursor
   * @returns current token
   */
  advance() {
    if (!this.isAtEnd()) {
      this.currentTokenIndex++;
      return this.tokens[this.currentTokenIndex - 1];
    }
    console.log("Already at end. Not advancing.");
  }

  private consume(type: TokenType, message: string) {
    if (this.tokens[this.currentTokenIndex].type === type) {
      return this.advance();
    }

    throw new Error(message);
  }

  isAtEnd() {
    return this.currentTokenIndex === this.tokens.length;
  }

  printToken() {
    console.log(this.tokens[this.currentTokenIndex]);
  }
}
