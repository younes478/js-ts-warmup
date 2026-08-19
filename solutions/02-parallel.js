/**
 * SOLUTION — Exercise 2
 * Run with:  node solutions/02-parallel.js
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function slowCall(label, ms = 300) {
  await delay(ms);
  console.log(`    done: ${label}`);
  return label.toUpperCase();
}

async function time(name, fn) {
  console.log(`\n=== ${name} ===`);
  const start = Date.now();
  const result = await fn();
  console.log(`  -> ${name} took ${Date.now() - start}ms`);
  return result;
}

// TODO 1 — Sequential: ~900ms.
// Each await parks the function until that call finishes before starting the
// next. Correct when call #2 needs the ID that call #1 returned. Wasteful when
// they are independent, which is most of the time.
async function sequential() {
  const loan = await slowCall('loan');
  const user = await slowCall('user');
  const branch = await slowCall('branch');
  return [loan, user, branch];
}

// TODO 2 — Parallel: ~300ms.
// All three start immediately; Promise.all waits for the slowest.
// Destructuring keeps the results in the order you listed them, NOT the order
// they happened to finish — which is why this stays readable.
async function parallel() {
  const [loan, user, branch] = await Promise.all([
    slowCall('loan'),
    slowCall('user'),
    slowCall('branch'),
  ]);
  return [loan, user, branch];
}

// TODO 3 — THE TRAP: reports ~0ms, then the calls finish long afterwards.
// forEach calls your async callback, gets a promise back, and throws it away.
// It has no mechanism to wait. The function returns before any work is done.
async function forEachTrap() {
  const items = ['trap-a', 'trap-b', 'trap-c'];
  items.forEach(async (i) => {
    await slowCall(i);
  });
  // Nothing here waits. Execution falls straight off the end.
}

// TODO 4 — for...of: ~900ms, and it actually waits.
// Unlike forEach, a for...of loop is real control flow, so `await` inside it
// pauses the loop. Reach for this when order matters or you must not flood the
// API with concurrent requests.
async function forOfFix() {
  const items = ['forof-a', 'forof-b', 'forof-c'];
  const results = [];
  for (const i of items) {
    results.push(await slowCall(i));
  }
  return results;
}

// TODO 5 — Promise.all(map): ~300ms, and it actually waits.
// .map RETURNS the promises, .forEach discards them. That one difference is
// the whole lesson. This is the version you want most days.
async function mapFix() {
  const items = ['map-a', 'map-b', 'map-c'];
  return Promise.all(items.map((i) => slowCall(i)));
}

// TODO 6 — listen-then-trigger.
// Some events fire once and are gone. If you trigger first and subscribe
// second, you miss them and hang until timeout. Putting both in one
// Promise.all — listener FIRST — guarantees you are already listening.
//
// The Playwright equivalents you will write constantly:
//   const [popup]    = await Promise.all([page.waitForEvent('popup'), page.click('#open')]);
//   const [download] = await Promise.all([page.waitForEvent('download'), page.click('#export')]);
const listeners = [];
function waitForEvent() {
  return new Promise((resolve) => listeners.push(resolve));
}
function triggerEvent() {
  // Fires on the next tick. If nobody subscribed by then, the event is lost.
  setTimeout(() => listeners.forEach((resolve) => resolve('exported.csv')), 50);
}

async function bonus() {
  const [event] = await Promise.all([
    waitForEvent(), // start listening
    triggerEvent(), // then fire
  ]);
  console.log(`    caught event: ${event}`);
  return event;
}

async function main() {
  await time('sequential', sequential);
  await time('parallel', parallel);
  await time('forEachTrap', forEachTrap);
  await time('forOfFix', forOfFix);
  await time('mapFix', mapFix);
  await time('bonus (listen-then-trigger)', bonus);

  await delay(500);
  console.log('\n(the stray "done: trap-*" lines came from forEachTrap,');
  console.log(' printing long after it claimed to be finished)');
}

main();
