/**
 * SOLUTION — Exercise 1
 * Run with:  node solutions/01-promises.js
 */

// TODO 1 — a promise that resolves after `ms`.
// Same line as exercise 0 part 5. new Promise takes a function; JavaScript
// hands that function `resolve`; calling resolve() means "finished".
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TODO 2 — async function standing in for an API call.
async function fetchCustomer(id, ms = 200) {
  await delay(ms);
  return { id, name: `Customer ${id}`, tier: 'standard' };
}

// TODO 3 — proves the rule.
async function alwaysAPromise() {
  return 42;
}

async function main() {
  console.log('--- TODO 4: no await ---');
  const noAwait = fetchCustomer(1);
  console.log(noAwait);
  // Prints: Promise { <pending> }
  //
  // The function HAS started running. What you are holding is the receipt,
  // not the goods. Every "undefined is not an object" error in an async
  // codebase traces back to someone using the receipt as if it were the goods.

  console.log('--- TODO 5: with await ---');
  const withAwait = await fetchCustomer(1);
  console.log(withAwait);
  // Prints: { id: 1, name: 'Customer 1', tier: 'standard' }

  console.log('--- TODO 6: async always returns a promise ---');
  console.log(alwaysAPromise()); // Promise { 42 }
  console.log(await alwaysAPromise()); // 42
  //
  // Note there is no delay(), no setTimeout, no I/O in that function. It is
  // still a promise, purely because of the word `async`. This is the rule that
  // cascades: the moment ONE page-object method is async, every caller must
  // await it, and every caller of THOSE must be async too.

  console.log('--- TODO 7: the same thing with .then() ---');
  await fetchCustomer(2).then((customer) => {
    console.log('from .then():', customer.name);
  });
  //
  // `await x` and `x.then(cb)` do the same job. await reads top-to-bottom so
  // it wins for readability, but you will meet .then() in older suites and in
  // places where you cannot use await (like inside a non-async callback).

  console.log('--- TODO 8: order of execution ---');
  console.log('A');
  delay(0).then(() => console.log('B'));
  console.log('C');
  //
  // Prints A, C, B.
  //
  // Even with a 0ms timer, B goes to the back of the queue. JavaScript finishes
  // the current synchronous block before it touches any promise callback.
  //
  // This is precisely the Cypress confusion you have already met:
  //     let count = 0
  //     cy.get('.item').then($i => { count = $i.length })
  //     expect(count).to.equal(3)   // still 0
  // Same mechanic, different wrapper. The assertion runs in the current block;
  // the .then() callback runs later.

  await delay(50); // let B land before the process exits
}

main();
