const sourceFile = Deno.args[0]
console.log(`Got a source file: ${sourceFile}`);

const text = await Deno.readTextFile(sourceFile);
console.log(text);
