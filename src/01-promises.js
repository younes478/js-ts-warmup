/**
 * EXERCISE 1 — Promises and await
 * Run with:  npm run 01
 *
 * Do exercise 0 first. This file assumes you can read `(n) => n * 2` and
 * `setTimeout(greet, 100)` without hesitating.
 *
 * Goal: stop guessing what `await` does.
 *
 * RULE FOR THIS FILE: before you run it, write down on paper what you think
 * each log will print. Then run it. The gap between your prediction and the
 * output is exactly the thing you need to learn.
 */

// ---------------------------------------------------------------------------
// TODO 1
// Make delay() return a promise that resolves after `ms` milliseconds.
// This is the same line you wrote in exercise 0, part 5.
// Hint: new Promise((resolve) => setTimeout(resolve, ms))
// ---------------------------------------------------------------------------
function delay(ms) {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 2
// Make fetchCustomer() async. It should wait `ms`, then return the object below.
// This is a stand-in for a real API call.
//   { id, name: `Customer ${id}`, tier: 'standard' }
//
// Careful: write this at the LEFT MARGIN, not inside another function.
// ---------------------------------------------------------------------------
function fetchCustomer(id, ms = 200) {
  // your code here
}

// ---------------------------------------------------------------------------
// TODO 3
// Leave this one alone — it is here to prove a rule:
// an `async` function ALWAYS returns a Promise, even when you return a number.
// ---------------------------------------------------------------------------
async function alwaysAPromise() {
  return 42;
}

async function main() {
  console.log('--- TODO 4: no await ---');
  // TODO 4: call fetchCustomer(1) WITHOUT await and log the result.
  //         Predict first: what exactly prints?

  console.log('--- TODO 5: with await ---');
  // TODO 5: call fetchCustomer(1) WITH await and log the result.

  console.log('--- TODO 6: async always returns a promise ---');
  // TODO 6: log alwaysAPromise() without await, then with await.
  //         This rule is why one `async` on a page-object method forces
  //         `await` on every single caller, all the way up your framework.

  console.log('--- TODO 7: the same thing with .then() ---');
  // TODO 7: rewrite TODO 5 using .then() instead of await.
  //         You will read a lot of older code written this way.
  //         Return the promise so main() waits for it.

  console.log('--- TODO 8: order of execution ---');
  // TODO 8: predict the order these three lines print, then run it.
  //   console.log('A');
  //   delay(0).then(() => console.log('B'));
  //   console.log('C');
  //
  // If you predicted A, B, C you have just found a real gap. Fix your mental
  // model before moving on: promise callbacks never run in the same tick.
}

main();
