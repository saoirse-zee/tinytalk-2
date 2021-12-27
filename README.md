# Tinytalk 2

I'm loosely following https://craftinginterpreters.com/, with the idea of making
a little
[Logo-like lang](https://el.media.mit.edu/logo-foundation/what_is_logo/logo_programming.html).
🐢

Keeping track of notes from my reading [here](./notes.md), and issues
[here](https://github.com/saoirse-zee/tinytalk-2/issues).

## Getting started

This project uses [Deno](https://deno.land/). Follow the steps on the Deno site to install Deno on your system. For Mac, it's `brew install deno`.

# Helpful commands

Run Tinytalk on a file:

```
deno run --allow-read src/tinytalk.ts examples/hello.tiny
```

Run Tinytalk REPL:

```
deno run src/tinytalk.ts
```

Generate docs:

```
deno doc read.ts
```

Run tests:

```
deno test
```

Format everything:

```
deno fmt
```
