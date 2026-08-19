/**
 * EXERCISE 3 — Failing loudly
 * Run with:  npm run 03
 *
 * Uses a real public API (no key, no signup): https://jsonplaceholder.typicode.com
 * If your network blocks it, see the "Blocked network" note in the README.
 *
 * The theme: a test that fails with "Cannot read property 'id' of undefined"
 * costs you 20 minutes. A test that fails with
 * "GET /users/9999 -> 404 Not Found" costs you 20 seconds.
 * The difference is entirely in code you write once, here.
 */

const BASE = process.env.BASE_URL ?? 'https://jsonplaceholder.typicode.com';

// ---------------------------------------------------------------------------
// TODO 1 — The helper you will rewrite in every job you ever have.
// fetchJson(path) should:
//   1. await fetch(BASE + path)
//   2. if (!res.ok) throw an Error including method, url, status, statusText,
//      and the response body text
//   3. otherwise return res.json()
//
// Note: fetch does NOT throw on 404 or 500. It only throws if the network
// itself fails. Everyone learns this the hard way once. That `if (!res.ok)`
// is the entire reason this helper exists.
// ---------------------------------------------------------------------------
async function fetchJson(path) {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 2 — Prove the happy path works.
// Fetch '/users/1' and log the user's name and email.
// ---------------------------------------------------------------------------
async function happyPath() {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 3 — Catch a real failure.
// Fetch '/users/9999' (returns 404) inside try/catch and log err.message.
// Confirm your message actually tells you what broke without guessing.
// ---------------------------------------------------------------------------
async function caught404() {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 4 — Promise.all fails FAST.
// Run three fetches in parallel where the middle one is '/users/9999'.
// Catch the rejection. Notice you get NOTHING back from the two that
// succeeded — Promise.all rejects on the first failure and discards the rest.
// This is correct for setup: if seeding failed, do not run the test.
// ---------------------------------------------------------------------------
async function allFailsFast() {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 5 — Promise.allSettled reports EVERY outcome.
// Same three calls, but with allSettled. Log each result's `.status`
// ('fulfilled' or 'rejected').
// This is what you want for teardown: one failed cleanup must not stop the
// other four from running, and you still want to see all the failures.
// ---------------------------------------------------------------------------
async function allSettledReport() {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 6 — THE SILENT KILLER
// Call a rejecting async function WITHOUT await and WITHOUT .catch():
//
//   fetchJson('/users/9999');   // no await
//   console.log('function finished, apparently fine');
//
// Node will print an UnhandledPromiseRejection and, by default, exit non-zero.
// But inside a test runner this often surfaces as a passing test with a weird
// warning in the log that everyone ignores.
//
// This is the exact same bug as forgetting `await` on an assertion in
// Playwright. It is why the ESLint rule in Step 11 is not optional.
// ---------------------------------------------------------------------------
async function floatingPromise() {
  // your code here
}

async function main() {
  console.log('\n=== happy path ===');
  await happyPath();

  console.log('\n=== caught 404 ===');
  await caught404();

  console.log('\n=== Promise.all fails fast ===');
  await allFailsFast();

  console.log('\n=== Promise.allSettled ===');
  await allSettledReport();

  console.log('\n=== floating promise ===');
  await floatingPromise();

  // Keep the process alive briefly so the unhandled rejection can surface.
  await new Promise((r) => setTimeout(r, 500));
}

main();
