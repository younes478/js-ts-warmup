/**
 * SOLUTION — Phase 2, report.ts
 *
 * Open src/04-report.js next to this file. The logic is line-for-line the
 * same. Only annotations were added.
 */

import { fetchJson, HttpError } from './client.js';
import type { User, Post, Todo, Summary } from './types.js';

/**
 * Note the return type is NOT annotated. TypeScript infers
 * `Promise<{ user: User; posts: Post[]; todos: Todo[] }>` on its own.
 * Hover the function name in VS Code and read it back.
 */
export async function loadUserData(userId: number) {
  const [user, posts, todos] = await Promise.all([
    fetchJson<User>(`/users/${userId}`),
    fetchJson<Post[]>(`/posts?userId=${userId}`),
    fetchJson<Todo[]>(`/todos?userId=${userId}`),
  ]);
  return { user, posts, todos };
}

/**
 * Derived, not written by hand.
 *
 *   typeof loadUserData  ->  the function's type
 *   ReturnType<...>      ->  Promise<{user, posts, todos}>
 *   Awaited<...>         ->  {user, posts, todos}
 *
 * Add a field to loadUserData and this type updates itself. A hand-written
 * copy would silently drift. You will use this constantly for fixture and
 * factory return values.
 */
export type UserData = Awaited<ReturnType<typeof loadUserData>>;

export function buildSummary({ user, posts, todos }: UserData): Summary {
  const todosCompleted = todos.filter((t) => t.completed).length;
  const rate =
    todos.length === 0 ? 0 : Math.round((todosCompleted / todos.length) * 100);

  // `find` returns `Post | undefined`. Under strict mode TypeScript will not
  // let you write `longest.title` — it forces the `?.` or an `if` guard.
  //
  // In plain JS the unguarded version is a TypeError waiting for the first
  // user whose posts all have short titles. Here it is a red squiggle before
  // you save the file.
  const longest = posts.find((p) => p.title.length > 40);

  return {
    name: user.name,
    email: user.email,
    company: user.company.name,
    postCount: posts.length,
    todosTotal: todos.length,
    todosCompleted,
    completionRate: `${rate}%`,
    // The return type is annotated as Summary, so if you typed 'Active' here
    // instead of 'active', this line would not compile.
    status: rate >= 50 ? 'active' : 'behind',
    lastPostTitle: longest?.title,
  };
}

function printSummary(s: Summary): void {
  console.log(
    `  ${s.name.padEnd(22)} ${s.company.padEnd(20)} ` +
      `posts:${String(s.postCount).padStart(3)}  ` +
      `todos:${s.todosCompleted}/${s.todosTotal}  ` +
      `${s.completionRate.padStart(4)}  ${s.status}`
  );
}

async function summarize(userId: number): Promise<Summary> {
  return buildSummary(await loadUserData(userId));
}

async function main(): Promise<void> {
  const userIds = [1, 2, 3];

  console.log('\n=== typed report (parallel) ===');
  const summaries = await Promise.all(userIds.map((id) => summarize(id)));
  summaries.forEach(printSummary);

  console.log('\n=== typed error handling ===');
  try {
    await summarize(9999);
  } catch (err) {
    // Under strict mode `err` is `unknown`. You cannot touch it until you
    // prove what it is. Ten seconds of annoyance, permanently correct: in
    // JavaScript anyone can `throw 'a string'` or throw null.
    if (err instanceof HttpError) {
      // Inside this block err is fully typed. err.status autocompletes.
      console.log(`  HttpError, status ${err.status} on ${err.url}`);
      if (err.status === 404) {
        console.log('  -> 404 specifically, so we could retry or skip here');
      }
    } else {
      console.log('  unexpected error:', err);
    }
  }
}

// The ESLint rule from Step 11 flags this line: main() returns a promise that
// nobody is handling. The `void` operator is the explicit way to say
// "I know, and I mean it" — which is different from having forgotten.
void main();
