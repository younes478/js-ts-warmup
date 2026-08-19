/**
 * EXERCISE 0 — Arrow functions and callbacks
 * Run with:  npm run 00
 *
 * You already know variables, functions, objects and for...of loops.
 * This file covers only the two things between you and exercise 1:
 *
 *   1. arrow functions  ->  (n) => n * 2
 *   2. callbacks        ->  passing a function INTO another function
 *
 * Nothing else. Five short parts. Take an hour, not a day.
 *
 * Run `npm run 00` after every part. It is meant to be run constantly.
 */

console.log('\n===== PART 1 — an arrow function is a shorter spelling =====\n');

// Here is a normal function. You already read this fine.
function double(n) {
  return n * 2;
}

// Now watch it change shape in four steps. NOTHING NEW HAPPENS.
// Each version does exactly the same job. Only the spelling changes.

// STEP 1 — put the function in a variable.
// A function can be stored in a const, like a number or a string can.
// Notice the name moved to the left, and `function` lost its name.
const doubleA = function (n) {
  return n * 2;
};

// STEP 2 — delete the word `function`, add `=>` after the brackets.
// That is the entire arrow syntax. That is all `=>` means.
const doubleB = (n) => {
  return n * 2;
};

// STEP 3 — if the body is ONE line that returns something,
// you may delete the braces AND the word `return`.
// The arrow returns that value for you automatically.
const doubleC = (n) => n * 2;

// STEP 4 — with exactly one parameter, the brackets are optional too.
// (Many teams keep them anyway. Both are fine.)
const doubleD = (n) => n * 2;

console.log(double(5), doubleA(5), doubleB(5), doubleC(5), doubleD(5));
// -> 10 10 10 10 10   ... all five are the same function

// THE ONE TRAP. Braces mean "here comes a block of statements", so if you
// keep the braces you MUST keep the word `return`:
const brokenDouble = (n) => {
  n * 2;
}; // no `return`!
console.log('  brokenDouble(5) ->', brokenDouble(5)); // undefined

// It does not error. It quietly gives you undefined. Remember this shape.

// ---------------------------------------------------------------------------
// TODO 1 — Take this function and rewrite it three ways:
//          as a const holding `function`, as an arrow with braces + return,
//          and as a one-line arrow.
//
//            function isSlow(ms) {
//              return ms > 1000;
//            }
//
//          Log all four with 1500. All four must print true.
// ---------------------------------------------------------------------------

// your code here

console.log('\n===== PART 2 — a function is a value you can hold =====\n');

// This is the idea that makes everything else click. Read slowly.

const greet = () => console.log('  hello!');

// `greet`   is the function itself. Think: a recipe card.
// `greet()` means RUN IT NOW.  Think: cook the recipe.
//
// The parentheses are the difference between having a recipe and eating dinner.

console.log('  typeof greet   ->', typeof greet); // 'function'  (the recipe)
greet(); //  actually runs it

// TODO 2 — make a const `sayBye` holding an arrow function that logs 'bye'.
//          Then log `typeof sayBye` on one line, and call `sayBye()` on the next.
//          Say out loud what the difference is before moving on.

// your code here

console.log('\n===== PART 3 — giving a function to another function =====\n');

// Because a function is a value, you can pass one as an argument.
// The function you hand over is called a CALLBACK — the other function
// will "call it back" when it is ready.

function runTwice(fn) {
  fn(); // runTwice decides WHEN to run it
  fn();
}

runTwice(greet); // <- greet, with NO parentheses

// Why no parentheses?
//   runTwice(greet)    "here is the recipe, you cook it"          CORRECT
//   runTwice(greet())  "I cooked it, here are the leftovers"      BUG
//
// In the second one, greet() runs immediately, returns undefined, and
// runTwice receives undefined. Then `fn()` crashes.
//
// You have used this pattern for years without naming it. setTimeout is
// exactly this — a built-in function that takes a callback:

setTimeout(greet, 200); // "run greet after 200ms"

// Very often people skip naming the function and write it inline instead.
// Same thing, one less name to invent:
setTimeout(() => console.log('  inline callback ran'), 300);

// Read that as: setTimeout( <a function that logs>, 300 )

// TODO 3 — write a function `repeat(times, fn)` that runs `fn` that many
//          times. Use a normal for loop inside. Then call it two ways:
//            repeat(3, greet);
//            repeat(2, () => console.log('  ping'));

// your code here

console.log('\n===== PART 4 — array methods are loops that take a callback =====\n');

const results = [
  { name: 'login', durationMs: 1240, passed: false },
  { name: 'logout', durationMs: 320, passed: true },
  { name: 'checkout', durationMs: 2100, passed: true },
  { name: 'search', durationMs: 180, passed: false },
];

// Start from the loop you already know:
const namesTheLongWay = [];
for (const r of results) {
  namesTheLongWay.push(r.name);
}
console.log('  for...of  ->', namesTheLongWay);

// .map does exactly that, and takes a callback to describe "what to keep".
const namesTheShortWay = results.map((r) => r.name);
console.log('  .map      ->', namesTheShortWay);

// Read `results.map((r) => r.name)` as:
//   "go through results. call each one `r`. give me back r.name for each."
//
// `r` is a name YOU invented — it could be `test`, `item`, `x`. map calls
// your callback once per item and hands the item in as that parameter.

// .filter — same idea, but your callback answers true/false: keep it or not.
const failed = results.filter((r) => r.passed === false);
console.log('  .filter   ->', failed.length, 'failed');

// .find — gives you the FIRST match, or `undefined` if there is none.
const checkout = results.find((r) => r.name === 'checkout');
console.log('  .find     ->', checkout.durationMs);

// TODO 4 — a) use .map to get an array of every durationMs
//          b) use .filter to get only tests that took more than 1000ms
//          c) use .find to get the test named 'search', log its duration
//          d) use .find to look for a test named 'nope' and log the result.
//             What do you get? Then try logging `.name` on it and read the
//             crash carefully — you have seen that error in test logs before.

// your code here

console.log('\n===== PART 5 — now read the line from exercise 1 =====\n');

// This is the line that looked like noise:
//
//     new Promise((resolve) => setTimeout(resolve, ms))
//
// You now know every piece of it. Peel it apart:
//
//   new Promise( ... )
//       creates a promise. It requires you to hand it a function.  <- PART 3
//
//   (resolve) => ...
//       that function, written arrow-style.                        <- PART 1
//
//   resolve
//       a function that JavaScript hands to you. Calling it means
//       "the promise is finished".                                 <- PART 2
//
//   setTimeout(resolve, ms)
//       "run resolve after ms milliseconds".
//       Note: `resolve`, not `resolve()` — the recipe, not the meal. <- PART 3
//
// Altogether: "make a promise that finishes after ms milliseconds."
//
// It is the same shape as setTimeout(greet, 200) from Part 3. That is all.

// TODO 5 — write it yourself, without scrolling up.

function wait(ms) {
  // your code here
}

// Then uncomment this to prove it works:
// wait(500).then(() => console.log('  finished waiting 500ms'));

// TODO 6 — the last one, and the most important.
// Write these two lines exactly, and predict the output BEFORE running:
//
//   setTimeout(() => console.log('  X'), 0);
//   console.log('  Y');
//
// Even with a 0 millisecond timer, Y prints first. Anything scheduled for
// "later" waits until the current block of code has completely finished.
// There is no "slightly later" — only "after everything else".
//
// That single rule is why this Cypress code never worked:
//
//   let count = 0
//   cy.get('.item').then($i => { count = $i.length })
//   expect(count).to.equal(3)   // still 0

// your code here

console.log('\n===== done. now go to exercise 1 =====\n');
