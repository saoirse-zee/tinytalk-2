/**
 * Prints an error message.
 *
 * @param line
 * @param message
 */
export function report(line: number, message: string) {
  console.log(`️[${line}]: ${message}`);
}
