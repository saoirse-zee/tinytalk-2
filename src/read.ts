/**
 * Reads a Tinytalk source file and returns its contents
 *
 * @param {string} file - source file location
 * @returns {string} - raw source string
 */
export async function readSourceFile(file: string): Promise<string> {
  console.log(`Got a source file: ${file}`);

  const text = await Deno.readTextFile(file);
  return text;
}
