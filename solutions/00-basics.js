/**
 * SOLUTION — Exercise 0
 * Run with:  node solutions/00-basics.js
 */

console.log('\n===== PART 1 — an arrow function is a shorter spelling =====\n');

function double(n) {
  return n * 2;
}
const doubleA = function (n) {
  return n * 2;
};
const doubleB = (n) => {
  return n * 2;
};
const doubleC = (n) => n * 2;
const doubleD = (n) => n * 2;

console.log(double(5), doubleA(5), doubleB(5), doubleC(5), doubleD(5));

const brokenDouble = (n) => {
  n * 2;
};
console.log('  brokenDouble(5) ->', brokenDouble(5)); // undefined

// TODO 1
function isSlow(ms) {
  return ms > 1000;
}
const isSlowA = function (ms) {
  return ms > 1000;
};
const isSlowB = (ms) => {
  return ms > 1000;
};
const isSlowC = (ms) => ms > 1000;

console.log('  ', isSlow(1500), isSlowA(1500), isSlowB(1500), isSlowC(1500));
// -> true true true true

// The rule, in one line:
//   braces  ->  you must write `return`
//   no braces  ->  the value is returned for you
//
// That is the only thing you have to remember about arrow syntax.

console.log('\n===== PART 2 — a function is a value you can hold =====\n');

const greet = () => console.log('  hello!');

console.log('  typeof greet   ->', typeof greet);
greet();

// TODO 2
const sayBye = () => console.log('  bye');

console.log('  typeof sayBye  ->', typeof sayBye); // 'function' — the recipe
sayBye(); //  logs 'bye'      — cooking it

// The difference in one sentence:
//   sayBye    hands you the function itself. Nothing runs.
//   sayBye()  runs it right now and hands back whatever it returned.
//
// Everything in Part 3 depends on this. If it is still fuzzy, re-read these
// four lines before continuing — it is worth ten more minutes here.

console.log('\n===== PART 3 — giving a function to another function =====\n');

function runTwice(fn) {
  fn();
  fn();
}

runTwice(greet); // the recipe goes in; runTwice chooses when to cook it

setTimeout(greet, 200);
setTimeout(() => console.log('  inline callback ran'), 300);

// TODO 3
function repeat(times, fn) {
  for (let i = 0; i < times; i++) {
    fn();
  }
}

repeat(3, greet);
repeat(2, () => console.log('  ping'));

// Notice `repeat` has no idea what fn does. It just calls it. That is the
// whole point of a callback: the caller supplies the behaviour.
//
// You have been using this pattern for eight years without naming it:
//
//   setTimeout(fn, ms)              call it later
//   results.map((r) => ...)         call it once per item
//   new Promise((resolve) => ...)   call it to start the work
//   test('name', async () => {})    call it when the runner reaches this test
//
// Four things that looked unrelated. One pattern.

console.log('\n===== PART 4 — array methods are loops that take a callback =====\n');

const results = [
  { name: 'login', durationMs: 1240, passed: false },
  { name: 'logout', durationMs: 320, passed: true },
  { name: 'checkout', durationMs: 2100, passed: true },
  { name: 'search', durationMs: 180, passed: false },
];

const namesTheLongWay = [];
for (const r of results) {
  namesTheLongWay.push(r.name);
}
console.log('  for...of  ->', namesTheLongWay);

const namesTheShortWay = results.map((r) => r.name);
console.log('  .map      ->', namesTheShortWay);

const failed = results.filter((r) => r.passed === false);
console.log('  .filter   ->', failed.length, 'failed');

const checkout = results.find((r) => r.name === 'checkout');
console.log('  .find     ->', checkout.durationMs);

// TODO 4a
const durations = results.map((r) => r.durationMs);
console.log('  a)', durations); // [ 1240, 320, 2100, 180 ]

// TODO 4b
const slow = results.filter((r) => r.durationMs > 1000);
console.log('  b)', slow.length, 'slow tests'); // 2

// TODO 4c
const search = results.find((r) => r.name === 'search');
console.log('  c)', search.durationMs); // 180

// TODO 4d — THE IMPORTANT ONE
const nope = results.find((r) => r.name === 'nope');
console.log('  d)', nope); // undefined

// console.log(nope.name);
// ^ uncomment and you get:
//     TypeError: Cannot read properties of undefined (reading 'name')
//
// You have seen this error in test logs. This is where it comes from:
// .find looked, found nothing, and handed back `undefined`. Nothing warned
// you. The crash happens later, at the point where you finally use it.
//
// In plain JavaScript you find out when it blows up — usually in CI, at night,
// on someone else's pull request.
//
// In TypeScript, .find is typed as "a result OR undefined", so the compiler
// refuses to let you write `nope.name` at all. Red squiggle, before you save.
//
// That is the strongest single argument for TypeScript in test automation.

console.log('\n===== PART 5 — now read the line from exercise 1 =====\n');

// TODO 5
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Read it aloud, slowly:
//
//   "return a new Promise. To build one, I have to give it a function.
//    JavaScript runs my function straight away and passes in `resolve`.
//    `resolve` is itself a function — calling it means the promise is done.
//    So I schedule resolve to run after ms milliseconds."
//
// Compare the two lines side by side:
//
//   setTimeout(greet,   200)   <- Part 3. Hand over a function, run later.
//   setTimeout(resolve, ms )   <- identical shape.
//
// It was never a new idea. It was Part 3 wearing a different name.

wait(500).then(() => console.log('  finished waiting 500ms'));

// TODO 6
setTimeout(() => console.log('  X'), 0);
console.log('  Y');
//
// Prints Y, then X — even at 0 milliseconds.
//
// Anything scheduled for "later" (timers, promises, network calls) waits until
// the current block of code has completely finished. There is no "slightly
// later". Only "after everything else".
//
// That one rule explains the Cypress bug:
//
//   let count = 0
//   cy.get('.item').then($i => { count = $i.length })
//   expect(count).to.equal(3)   // still 0 — .then hasn't run yet
//
// and this Playwright bug, which is the same thing in different clothes:
//
//   expect(page.getByText('Invalid')).toBeVisible();   // no await
//   // the test ends here, having checked nothing at all

setTimeout(() => console.log('\n===== done. now go to exercise 1 =====\n'), 600);
