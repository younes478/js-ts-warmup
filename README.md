# JS → TS Warm-Up

A small, real project that closes the gap between "8 years of QA with Cypress" and "ready for Playwright in TypeScript".

Two things, in order: **arrow functions and callbacks**, then **async fluency**, then **types on top**.

No framework, no test runner, no Playwright. Just Node, a real API, and your editor.

---

## Start here

**Exercise 0 is not optional.** If you can't read this line without hesitating, start there:

```js
const names = users.map((u) => u.name);
```

Exercise 0 takes about an hour and makes everything after it straightforward. Skipping it is how people end up copying code they can't debug.

**Ground rule for the whole project:** type the code yourself. Do not paste from `solutions/`. Read the solution *after* you've written yours and compare — that comparison is where the learning happens. Use AI to explain *why* something works, never to produce the code you were about to write.

---

## Why these exercises and not a JavaScript course

A general JS course spends 30 hours on things you already know and about 2 hours on the part you actually need. Cypress's command queue meant you never had to understand promises — you wrote `cy.get().click()` and it worked. Playwright is real promises all the way down, and every "why is this test flaky" investigation eventually lands on something that was not awaited.

So: one exercise on the syntax that's in the way, four on async, then the same code again with types.

---

## What you'll build

A small account-reporting tool that fetches users, posts and todos from a public API in parallel, fails loudly when a call breaks, and prints a summary table.

It is deliberately the same shape as a Playwright fixture that seeds test data. When you get to Playwright, `fetchJson` becomes `request.get()` and `loadUserData` becomes the body of a fixture. Nothing else changes.

---

## Step 0 — Check your tools (5 minutes)

```bash
node --version    # need v18 or higher (v20+ preferred)
npm --version
git --version
```

If `node --version` shows anything below 18, install the current LTS from [nodejs.org](https://nodejs.org). Node 18 is the floor because these exercises use the built-in `fetch`.

In VS Code, install one extension: **ESLint** (`dbaeumer.vscode-eslint`). TypeScript support is already built in.

**Folder map:**

```
src/          exercises 0-4, stubbed with TODOs      <- you write here
ts/           the TypeScript phase, stubbed           <- you write here
solutions/    reference implementations               <- read AFTER you write
mock-server.js  offline fallback if your network blocks the public API
tsconfig.json   TypeScript config, strict mode already on
```

---

## Step 1 — Get it on GitHub (10 minutes)

**Easiest route, in VS Code:** open the folder, click the Source Control icon in the left rail (third one down, looks like a branch) → **Initialize Repository** → type a commit message → **Commit** → "stage all?" **Yes** → **Publish Branch** → **public**. That creates the GitHub repo and pushes, handling sign-in through the browser.

**Or from the terminal**, after creating an empty repo on github.com (don't tick any "initialize with" boxes):

```bash
git init
git add .
git commit -m "chore: project scaffold with exercise stubs"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/js-ts-warmup.git
git push -u origin main
```

Sanity check:

```bash
npm run 00
```

You'll get some output and some `undefined`s. Correct — the stubs are empty. That's your starting line.

---

## Step 2 — Exercise 0: arrow functions and callbacks (1 hour)

```bash
git checkout -b exercise/00-basics
```

Open `src/00-basics.js`. Five short parts. **Run `npm run 00` after every part** — it's designed to be run constantly, not once at the end.

**Part 1 — an arrow function is a shorter spelling.** Not a new concept. The same function respelled in three steps:

```js
function double(n) { return n * 2; }        // you already read this
const double = function (n) { return n * 2; };   // 1. put it in a variable
const double = (n) => { return n * 2; };         // 2. drop `function`, add `=>`
const double = (n) => n * 2;                     // 3. one-line body: drop braces + return
```

`=>` doesn't *do* anything. It replaces the word `function`.

The one trap: braces mean "block of statements", so with braces you must write `return`. `const broken = (n) => { n * 2 }` returns `undefined` and doesn't error.

**Part 2 — `greet` vs `greet()`.** The recipe versus cooking it. This is the part that unlocks everything else; don't move past it while it's fuzzy.

**Part 3 — passing a function into a function.** Why `setTimeout(greet, 100)` has no parentheses. You've used this for years without naming it.

**Part 4 — `.map`/`.filter`/`.find` are loops that take a callback:**

```js
// what you already know
const names = [];
for (const u of users) { names.push(u.name); }

// same thing
const names = users.map((u) => u.name);
```

Part 4d matters: `.find()` on something that doesn't exist returns `undefined`, and then `undefined.name` throws `Cannot read properties of undefined`. You've seen that in test logs. This is where it comes from — and it's the strongest argument for TypeScript.

**Part 5 — read the line.** By now `new Promise((resolve) => setTimeout(resolve, ms))` is just Part 3 wearing a different name.

```bash
git add -A
git commit -m "feat(00): arrow functions and callbacks"
git checkout main && git merge exercise/00-basics && git push
```

---

## Step 3 — Exercise 1: promises and await (half a day)

```bash
git checkout -b exercise/01-promises
```

Open `src/01-promises.js` and work through TODOs 1–8.

**Before running anything, write down what you think each log prints.** The gap between your prediction and the actual output is the entire lesson. Skipping the prediction turns this into typing practice.

```bash
npm run 01
```

**What you should come away with:**

- A promise is a receipt, not the goods. `console.log(fetchCustomer(1))` prints `Promise { <pending> }` because the function has *started* but not *finished*.
- An `async` function always returns a promise — even `async function f() { return 42 }` prints `Promise { 42 }`. This is why one `async` page-object method forces `await` on every caller, and `async` on every caller of *those*, all the way up your framework.
- `await x` and `x.then(cb)` do the same job.
- TODO 8 prints **A, C, B** — even with a 0ms timer. Promise callbacks never run in the current synchronous block. Which is exactly the Cypress confusion you've already met:

  ```js
  let count = 0
  cy.get('.item').then($i => { count = $i.length })
  expect(count).to.equal(3)   // still 0
  ```

**Two things that trip people up in this file:**

1. Write your functions at the **left margin**. If you paste them inside the existing empty stub, they're trapped in that function's scope and invisible to everything else.
2. **Save the file** (`Cmd + S`) before running. A dot on the VS Code tab means unsaved — Node will run the old version.

```bash
git add -A
git commit -m "feat(01): promises, await, and execution order"
git checkout main && git merge exercise/01-promises && git push
```

---

## Step 4 — Exercise 2: sequential vs parallel (half a day)

```bash
git checkout -b exercise/02-parallel
```

Work through `src/02-parallel.js`, then `npm run 02`.

**Actual output from the reference solution:**

```
=== sequential ===        -> 917ms
=== parallel ===          -> 310ms
=== forEachTrap ===       ->   1ms     <-- the bug
=== forOfFix ===          -> 914ms
=== mapFix ===            -> 304ms
```

**1. Parallel setup is free money.** Three sequential API calls at 300ms each cost 600ms of pure waiting per test. Across 400 tests that's four minutes of CI time per run, every run.

**2. The forEach trap.** `forEachTrap` reports **1ms** — then its `done:` lines print later, during a completely different function. `forEach` calls your async callback, receives a promise, and throws it away. It has no mechanism to wait.

In a real suite: your teardown "runs", the test ends, and the records are still sitting there poisoning the next test. Top-3 cause of flakiness. The fix is `for...of` (sequential) or `Promise.all(items.map(...))` (parallel) — `.map` returns the promises, `.forEach` discards them.

**3. Listen before you trigger.** Some events fire once and are gone:

```js
const [download] = await Promise.all([
  page.waitForEvent('download'),   // subscribe first
  page.click('#export'),           // then fire
]);
```

Reverse those and it hangs until timeout. You'll write this shape constantly in Playwright.

```bash
git add -A
git commit -m "feat(02): parallel execution and the forEach trap"
git checkout main && git merge exercise/02-parallel && git push
```

---

## Step 5 — Exercise 3: failing loudly (1 day)

```bash
git checkout -b exercise/03-errors
```

This one hits a real public API — `https://jsonplaceholder.typicode.com`, no key, no signup. **If your corporate network blocks it, see [Blocked network](#blocked-network) below.**

Work through `src/03-errors.js`, then `npm run 03`.

**The single most important line in the project:**

```js
if (!res.ok) { throw new Error(...) }
```

`fetch` does **not** throw on a 404 or a 500. It only rejects when the network itself fails. Everyone learns this the hard way exactly once. Without that check, `res.json()` on an error page hands you `{}`, and three functions later you get `Cannot read properties of undefined (reading 'id')` with no clue where it came from.

```
Cannot read properties of undefined (reading 'name')     <- 20 minutes
GET https://.../users/9999 -> 404 Not Found              <- 20 seconds
```

**Also from this exercise:**

- **`Promise.all` fails fast** — first rejection wins, successful results become unreachable. Right for *setup*: if seeding failed, don't run the test.
- **`Promise.allSettled` never rejects** — every outcome comes back. Right for *teardown*: one failed cleanup mustn't stop the other four.
- **The floating promise** (TODO 6) is the headline. An un-awaited, un-caught rejection produces an `UnhandledPromiseRejection` that a test runner will happily swallow. It's the *exact same bug* as:

  ```js
  expect(page.getByText('Invalid credentials')).toBeVisible();   // no await
  ```

  That assertion never runs. The test cannot fail. It sits in your suite looking like coverage for months. **A test that cannot fail is worse than no test.**

```bash
git add -A
git commit -m "feat(03): loud errors, allSettled, and floating promises"
git checkout main && git merge exercise/03-errors && git push
```

---

## Step 6 — Exercise 4: put it together (1 day)

```bash
git checkout -b exercise/04-report
```

Work through `src/04-report.js`, then `npm run 04`.

**Reference output:**

```
=== PARALLEL (9 calls overlapping) ===
  Test User 1     Romaguera-Crona    posts: 10  todos:10/20   50%  active
  Test User 2     Deckow-Crist       posts: 10  todos:7/20    35%  behind
  Test User 3     Romaguera-Jacobson posts: 10  todos:5/20    25%  behind
  -> 228ms

=== SEQUENTIAL (9 calls one at a time) ===
  -> 426ms
```

Two design points that carry straight into framework work:

- **`buildSummary` is a pure function** — data in, summary out, no I/O. You can unit test it with a hardcoded object and no network. That's the difference between a testable framework and one where everything needs a live environment.
- **`loadUserData` is a fixture in disguise.** Fetch several things in parallel, fail loudly if any break, return one tidy object.

```bash
git add -A
git commit -m "feat(04): parallel account report"
git checkout main && git merge exercise/04-report && git push
```

**End of Phase 1.** You now understand async JavaScript well enough for Playwright. Everything from here is types.

---

## Step 7 — TypeScript setup (30 minutes)

```bash
git checkout -b phase2/typescript
npm i -D typescript @types/node
```

`tsconfig.json` is already here. Only three settings matter:

```jsonc
"strict": true,        // where ~90% of TypeScript's value lives
"rootDir": "ts",       // source
"outDir": "dist"       // compiled output
```

Turning `strict` off is the most common way teams end up with TypeScript that catches nothing.

**The reframe:** TypeScript is not a new language. It's JavaScript plus annotations, and the annotations are deleted at compile time. You'll prove this at the end of Step 10.

---

## Step 8 — `ts/types.ts` (2 hours)

Open `https://jsonplaceholder.typicode.com/users/1` in a browser and write interfaces for what you see. Model only the fields your code touches.

The highest-value idea here is the **union type**:

```ts
export type AccountStatus = 'active' | 'behind';
```

Write `'Active'` by mistake and the compiler stops you. Verified output:

```
error TS2322: Type '"Active"' is not assignable to type 'AccountStatus'.
  Did you mean '"active"'?
```

In plain JS that typo produces a test that runs, passes, and asserts nothing meaningful.

---

## Step 9 — `ts/client.ts` (2 hours)

Your `fetchJson`, now generic:

```ts
export async function fetchJson<T>(path: string): Promise<T>
```

`<T>` is a parameter like `path`, except the caller passes a *type*:

```ts
const user  = await fetchJson<User>('/users/1');    // user  is User
const posts = await fetchJson<Post[]>('/posts');    // posts is Post[]
```

One function, correctly typed for every endpoint.

Also write `HttpError extends Error`. A class rather than a plain `Error` means callers can do `err instanceof HttpError && err.status === 404` and react to *specific* failures, instead of regexing a message and hoping.

**One honest caveat:** `return (await res.json()) as T` is an *assertion*, not a check. Nothing can know the shape of bytes arriving over a network. If the backend renames a field, TypeScript will confidently describe a shape that no longer arrives. That's why runtime schema validation (`zod`, `ajv`) exists.

---

## Step 10 — `ts/report.ts` (half a day)

Two bits of syntax that look wrong but aren't:

**1. `import { fetchJson } from './client.js'`** — yes, `.js`, even though the file is `client.ts`. You're importing the file that will exist *after compilation*.

**2. `import type { User } from './types.js'`** — imports only the type, guaranteed to vanish at compile time.

Then the thing that pays rent:

```ts
export type UserData = Awaited<ReturnType<typeof loadUserData>>;
```

Inside-out: the function's type → what it returns (`Promise<{...}>`) → unwrap the promise. Add a field to `loadUserData` later and this updates itself.

**Watch strict mode earn its keep:**

```ts
const longest = posts.find((p) => p.title.length > 40);
```

`find` returns `Post | undefined`, so writing `longest.title` gives you:

```
error TS18048: 'longest' is possibly 'undefined'.
```

Exactly the `undefined.name` crash from Exercise 0 Part 4d — but caught before you save instead of at 2am in CI.

Same in the catch block. Under strict mode `err` is `unknown`:

```
error TS18046: 'err' is of type 'unknown'.
```

You must narrow with `instanceof` before touching it. In JavaScript anyone can `throw 'a string'`.

Build and run:

```bash
npm run ts        # compiles to dist/, then runs it
npm run typecheck # type-check only — this is your CI gate
```

**Now the proof.** Open `dist/types.js`:

```js
export {};
```

86 bytes. Every interface, every union type, gone.

Then open `src/04-report.js` and `ts/report.ts` side by side. **The logic is line-for-line identical.** Only annotations were added.

```bash
git add -A
git commit -m "feat(ts): typed client, generics, and strict-mode report"
git checkout main && git merge phase2/typescript && git push
```

---

## Step 11 — The linter that catches the killer bug (1 hour)

```bash
git checkout -b chore/eslint
npm i -D eslint typescript-eslint
cp solutions/eslint.config.js .
npx eslint ts/
```

| Rule | Catches |
|---|---|
| `no-floating-promises` | A promise you never awaited — i.e. **an assertion that can never fail** |
| `await-thenable` | `await` on a non-promise (usually you forgot to call the function) |
| `no-misused-promises` | An async callback where a sync one is expected — the forEach trap, caught statically |

These need **type information**, which is why plain JS projects can't have them. One more concrete reason to write your framework in TypeScript.

Test it: delete an `await` somewhere in `ts/report.ts` and re-run. Watch it get caught. Put it back.

Set this up on day one of any new framework, not after the suite has 300 tests.

```bash
git add -A
git commit -m "chore: eslint with no-floating-promises"
git checkout main && git merge chore/eslint && git push
```

---

## Step 12 — Make it a portfolio piece (1 hour)

Replace this README with your own. Cover what the project does, how to run it, **what each exercise taught you in your own words**, and the bugs strict mode and ESLint caught, with the actual error messages.

That last section is what a hiring manager reads. Anyone can list "TypeScript" on a CV; describing why `no-floating-promises` matters in a test suite is what 8 years of QA judgment sounds like.

---

## Blocked network

If `jsonplaceholder.typicode.com` is blocked, this repo ships a zero-dependency local stand-in.

**Terminal 1:**

```bash
npm run mock
```

**Terminal 2 (mac/Linux):**

```bash
BASE_URL=http://localhost:3000 npm run 03
```

**Terminal 2 (Windows PowerShell):**

```powershell
$env:BASE_URL="http://localhost:3000"; npm run 03
```

Same response shapes, random latency so the timing lesson still lands, 404s on unknown IDs. Users 1–5 exist.

---

## Self-check

Don't move on to Playwright until you can do all of these **without looking anything up**:

1. Rewrite `function double(n) { return n * 2 }` as a one-line arrow function.
2. Explain the difference between `greet` and `greet()`.
3. Say why `setTimeout(greet, 100)` has no parentheses on `greet`.
4. Rewrite a `for...of` loop that builds an array as a `.map()`.
5. Explain what `Promise { <pending> }` means and why you got it.
6. Predict the output of `console.log('A'); delay(0).then(() => console.log('B')); console.log('C');`
7. Say why `items.forEach(async i => await f(i))` doesn't wait, and give two fixes.
8. Say when you'd choose `Promise.all` over `Promise.allSettled`.
9. Explain why `fetch` doesn't throw on a 500, and what you do about it.
10. Look at `expect(page.getByText('x')).toBeVisible()` and say instantly what's wrong.
11. Write a generic `fetchJson<T>` from memory.
12. Explain why `err` is `unknown` in a catch block under strict mode.

If 10 isn't instant, redo exercise 3. It's the one that matters most.

---

## What's next

| You learned here | Where it lands in Playwright |
|---|---|
| Arrow functions and callbacks | Every test body, every fixture, every locator filter |
| `await` on everything async | Every action and every web-first assertion |
| `Promise.all` listen-then-trigger | `waitForEvent` for popups, downloads, navigation |
| Parallel setup calls | Fixtures that seed test data via API instead of the UI |
| Loud `HttpError` | Debuggable CI failures instead of guesswork |
| Generic `fetchJson<T>` | Typed wrappers around `request.get()` |
| `Awaited<ReturnType<>>` | Fixture and factory return types |
| `no-floating-promises` | Catching assertions that can never fail |

```bash
npm init playwright@latest      # scaffolds TypeScript by default
```

First real task: take three of your existing Cypress specs and rewrite them. Then learn `storageState` (log in once, reuse across the whole suite) and the `request` fixture (set up state via API inside UI tests).
