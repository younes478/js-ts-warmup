/**
 * PHASE 2, FILE 3 — report.ts
 *
 * The same logic as src/04-report.js. Compare them side by side when you are
 * done: the logic is IDENTICAL. Only annotations were added. That is the whole
 * story of "do I need to learn TypeScript separately" — no, you do not.
 */

// ---------------------------------------------------------------------------
// TODO 1 — Imports.
//   import { fetchJson, HttpError } from './client.js';
//   import type { User, Post, Todo, Summary } from './types.js';
//
// TWO THINGS THAT LOOK WRONG BUT ARE NOT:
//
// 1. './client.js' — yes, .js, even though the file is client.ts. You are
//    importing the file that will EXIST AFTER COMPILATION. This trips up
//    everyone once. (Playwright's runner is more forgiving; plain Node ESM
//    is not.)
//
// 2. `import type` — imports only the type, guaranteed to vanish at compile
//    time. Use it whenever you are importing something you never call.
// ---------------------------------------------------------------------------

// your imports here

// ---------------------------------------------------------------------------
// TODO 2 — loadUserData(userId: number)
// Same Promise.all as before, but now each call declares its type:
//   fetchJson<User>(`/users/${userId}`)
//   fetchJson<Post[]>(`/posts?userId=${userId}`)
//   fetchJson<Todo[]>(`/todos?userId=${userId}`)
//
// Do NOT annotate the return type. Let TypeScript infer it — then hover over
// the function name in VS Code and read what it worked out. Inference doing
// the work for you is most of the day-to-day experience.
// ---------------------------------------------------------------------------

// your loadUserData function here

// ---------------------------------------------------------------------------
// TODO 3 — Derive a type instead of writing one.
//   export type UserData = Awaited<ReturnType<typeof loadUserData>>;
//
// Read it inside-out:
//   typeof loadUserData     the function's type
//   ReturnType<...>         what it returns -> Promise<{user, posts, todos}>
//   Awaited<...>            unwrap the Promise -> {user, posts, todos}
//
// Why bother: if you add a field to loadUserData later, this type updates
// itself. A hand-written duplicate would silently drift out of date. In a real
// framework you do this constantly for fixture return values.
// ---------------------------------------------------------------------------

// your UserData type here

// ---------------------------------------------------------------------------
// TODO 4 — buildSummary(data: UserData): Summary
//
// Same filtering and maths as the JS version. Then add this line to meet
// strict mode properly:
//
//   const longest = posts.find((p) => p.title.length > 40);
//
// `find` returns `Post | undefined`, so TypeScript REFUSES to let you write
// `longest.title`. You must narrow it first:
//
//   lastPostTitle: longest?.title
//        or
//   if (longest) { ... }
//
// In plain JS that same line is a runtime crash the first time no post matches
// — most likely in CI, at night, on someone else's PR. Here it is a red
// squiggle before you have even saved.
// ---------------------------------------------------------------------------

// your buildSummary function here

// ---------------------------------------------------------------------------
// TODO 5 — main()
// Summarise users 1, 2 and 3 in parallel, print them, then deliberately
// request user 9999 inside try/catch. In the catch, narrow the error:
//
//   if (err instanceof HttpError) {
//     console.log(`status ${err.status}`);   // fully typed, autocompletes
//   }
//
// Note: `err` in a catch block is `unknown` under strict mode — you cannot
// touch it until you prove what it is. Annoying for ten seconds, correct
// forever, because errors genuinely can be anything in JavaScript.
// ---------------------------------------------------------------------------

// your main function here
