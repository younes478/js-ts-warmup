/**
 * EXERCISE 4 — Put it together
 * Run with:  npm run 04
 *
 * Build a small "account summary" tool. This is deliberately the same shape as
 * a Playwright fixture that seeds test data: fetch several things in parallel,
 * fail loudly if any of them fail, hand back one tidy object.
 *
 * When you convert this to TypeScript in Phase 2, you will not change any of
 * the logic. You will only add types. That is the point.
 */

const BASE = process.env.BASE_URL ?? 'https://jsonplaceholder.typicode.com';

// ---------------------------------------------------------------------------
// TODO 1 — Copy your fetchJson from exercise 3 into this file.
// (In a real framework this would live in its own module and be imported.
// You will do exactly that in Phase 2.)
// ---------------------------------------------------------------------------
async function fetchJson(path) {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 2 — Fetch these three IN PARALLEL for a given userId:
//   `/users/${userId}`
//   `/posts?userId=${userId}`
//   `/todos?userId=${userId}`
// Return them destructured: const [user, posts, todos] = await Promise.all([...])
// ---------------------------------------------------------------------------
async function loadUserData(userId) {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 3 — Build a summary object from that raw data:
//   {
//     name, email, company,          // from user
//     postCount,                     // posts.length
//     todosTotal, todosCompleted,    // todos.length, and the ones where completed === true
//     completionRate,                // e.g. "45%"
//     status,                        // 'active' if completionRate >= 50, else 'behind'
//   }
// Use .filter() and .length. Do the maths with Math.round.
// ---------------------------------------------------------------------------
function buildSummary(user, posts, todos) {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 4 — Print it. Anything readable is fine.
// ---------------------------------------------------------------------------
function printSummary(summary) {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 5 — Do it for THREE users at once (ids 1, 2, 3) with Promise.all,
// so all nine HTTP calls overlap instead of running one after another.
// Time it, then change it to a sequential for...of loop and time that too.
// Note the difference. That difference is your CI bill.
// ---------------------------------------------------------------------------
async function main() {
  // your code here
}

main();
