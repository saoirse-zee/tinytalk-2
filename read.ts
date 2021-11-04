/**
 * Reads a Tinytalk source file and prints the contents.
 * @param {string} file - source file location
 */
export async function readSourceFile(file: string) {
  console.log(`Got a source file: ${file}`);

  const text = await Deno.readTextFile(file);
  console.log(text);
}

if (Deno.args.length < 1) {
  console.log("Make sure you pass a filename to the script!");
  Deno.exit(1);
}

await readSourceFile(Deno.args[0]);
