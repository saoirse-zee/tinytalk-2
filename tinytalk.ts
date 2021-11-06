import { readSourceFile } from "./read.ts";
import { scanner } from "./scanner.ts";

// User messed up and passed too many args
if (Deno.args.length > 1) {
  console.log(`Usage: tinytalk [program.tiny]`);
  Deno.exit(1);
}

// User (hopefully) passed a filepath
if (Deno.args.length === 1) {
  const source = await readSourceFile(Deno.args[0]);
  const tokens = scanner(source);
  console.log(tokens);
  Deno.exit(0);
}

// User wants to enter the REPL
console.log("Welcome to Tinytalk!");
console.log(`You can exit by saying "byeee"\n\n`);

while (true) {
  const source = await prompt("tiny> ");
  if (source === "byeee") {
    console.log("Okay, see yaaa!");
    Deno.exit(0);
  }
  const tokens = scanner(source);
  console.log(tokens);
}

/*
 * Prompt for a response
 */
async function prompt(message: string) {
  const buf = new Uint8Array(1024);
  await Deno.stdout.write(new TextEncoder().encode(message + ": "));
  const n = <number> await Deno.stdin.read(buf);
  return new TextDecoder().decode(buf.subarray(0, n)).trim();
}
