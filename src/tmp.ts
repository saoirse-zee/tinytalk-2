import { Parser } from "./parser.ts";
import { TokenType } from "./token.ts";

const parser = new Parser([
  {
    type: TokenType.IDENTIFIER,
    value: "hi",
    line: 1,
  },
  //   {
  //     type: TokenType.WHEN,
  //     line: 2,
  //   },
  //   {
  //     type: TokenType.NUMBER,
  //     value: 17,
  //     line: 3,
  //   },
]);

parser.parse();
