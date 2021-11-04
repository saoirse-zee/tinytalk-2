const sourceFile = Deno.args[0];

if (!sourceFile) {
  console.log("Make sure you pass a filename to the script!");
  Deno.exit(1);
}

console.log(`Got a source file: ${sourceFile}`);

const text = await Deno.readTextFile(sourceFile);
console.log(text);
