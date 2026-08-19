/**
 * EXERCISE 2 — Sequential vs parallel, and the forEach trap
 * Run with:  npm run 02
 *
 * This is the exercise that pays for itself. Test setup that runs three API
 * calls sequentially instead of in parallel costs you 600ms x every test in
 * the suite. On 400 tests that is four minutes of CI time per run.
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Stand-in for an API call that takes 300ms. */
async function slowCall(label, ms = 300) {
  await delay(ms);
  console.log(`    done: ${label}`);
  return label.toUpperCase();
}

/** Times an async function and prints how long it took. */
async function time(name, fn) {
  console.log(`\n=== ${name} ===`);
  const start = Date.now();
  const result = await fn();
  console.log(`  -> ${name} took ${Date.now() - start}ms`);
  return result;
}

// ---------------------------------------------------------------------------
// TODO 1 — Sequential
// Await three slowCall()s one after another: 'loan', 'user', 'branch'.
// Return them as an array. PREDICT the total time before running.
// ---------------------------------------------------------------------------
async function sequential() {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 2 — Parallel
// Same three calls, but with Promise.all and array destructuring:
//   const [loan, user, branch] = await Promise.all([...])
// PREDICT the total time before running.
// ---------------------------------------------------------------------------
async function parallel() {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 3 — THE TRAP
// Write this exactly as shown, run it, and read the output carefully:
//
//   const items = ['trap-a', 'trap-b', 'trap-c'];
//   items.forEach(async (i) => {
//     await slowCall(i);
//   });
//
// The "took Xms" line prints BEFORE any of the calls finish. forEach ignores
// the promise the callback returns, so nothing is ever waited on.
//
// In a real suite this means: your teardown "runs", the test ends, and the
// records are still there. Or your setup "runs" and the test starts against
// data that does not exist yet. This is a top-3 cause of flaky tests.
// ---------------------------------------------------------------------------
async function forEachTrap() {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 4 — Fix it, sequentially, with for...of
// Use this when order matters or you must not hammer the API.
// ---------------------------------------------------------------------------
async function forOfFix() {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 5 — Fix it, in parallel, with Promise.all(map)
// Use this when the calls are independent. This is the one you want most days.
//   await Promise.all(items.map((i) => slowCall(i)))
//
// Note: .map DOES return the promises, .forEach throws them away.
// That single difference is the whole lesson.
// ---------------------------------------------------------------------------
async function mapFix() {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 6 — BONUS: the listen-then-trigger pattern
// Some events must be subscribed to BEFORE the action that causes them, or you
// miss them entirely. You will hit this constantly in Playwright with popups,
// downloads and navigations. Simulate it:
//
//   const [event] = await Promise.all([
//     waitForEvent(),   // start listening
//     triggerEvent(),   // then fire
//   ]);
//
// Write waitForEvent/triggerEvent however you like. The point is the shape:
// both go inside one Promise.all, listener first.
// ---------------------------------------------------------------------------

async function main() {
  await time('sequential', sequential);
  await time('parallel', parallel);
  await time('forEachTrap', forEachTrap);
  await time('forOfFix', forOfFix);
  await time('mapFix', mapFix);

  // Give the orphaned forEach promises time to land so you can see them
  // print long after their timer said the function was "done".
  await delay(500);
  console.log('\n(the stray "done:" lines above came from forEachTrap)');
}

main();
