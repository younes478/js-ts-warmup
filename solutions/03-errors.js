/**
 * SOLUTION — Exercise 3
 * Run with:  node solutions/03-errors.js
 */

const BASE = process.env.BASE_URL ?? 'https://jsonplaceholder.typicode.com';

// TODO 1 — the helper you will rewrite in every job you ever have.
//
// The critical line is `if (!res.ok)`. fetch resolves happily on a 404 or a
// 500 — it only rejects when the network itself fails (DNS, connection reset).
// Without that check, res.json() on an error page gives you `{}` or throws a
// parse error, and three functions later you get
// "Cannot read properties of undefined (reading 'id')" with no idea why.
async function fetchJson(path) {
  const url = `${BASE}${path}`;
  const res = await fetch(url);

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `GET ${url} -> ${res.status} ${res.statusText}\n` +
        `Body: ${body.slice(0, 300)}`
    );
  }

  return res.json();
}

// TODO 2 — happy path.
async function happyPath() {
  const user = await fetchJson('/users/1');
  console.log(`  ${user.name} <${user.email}>`);
}

// TODO 3 — catch a real failure.
// try/catch works on await exactly like it does on synchronous code. That is
// the main ergonomic win of await over .then()/.catch() chains.
async function caught404() {
  try {
    await fetchJson('/users/9999');
    console.log('  should never reach here');
  } catch (err) {
    console.log('  caught:', err.message.split('\n')[0]);
    // "caught: GET https://.../users/9999 -> 404 Not Found"
    //
    // Compare that to what you would have got without the res.ok check:
    // a silent {} now, and a confusing TypeError somewhere else later.
  }
}

// TODO 4 — Promise.all fails fast.
// The moment one promise rejects, Promise.all rejects with that error and the
// results of the successful calls are unreachable. The others are NOT
// cancelled — they keep running, you just cannot get at their values.
//
// This is the behaviour you want for SETUP: if seeding the loan failed, do not
// run a test that assumes the loan exists. Fail immediately and loudly.
async function allFailsFast() {
  try {
    const results = await Promise.all([
      fetchJson('/users/1'),
      fetchJson('/users/9999'), // 404
      fetchJson('/users/3'),
    ]);
    console.log('  should never reach here', results.length);
  } catch (err) {
    console.log('  Promise.all rejected:', err.message.split('\n')[0]);
    console.log('  note: users 1 and 3 succeeded, but you get nothing back');
  }
}

// TODO 5 — Promise.allSettled reports every outcome.
// Never rejects. You get an array of { status, value } or { status, reason }.
//
// This is the behaviour you want for TEARDOWN: one failed cleanup must not
// stop the other four from running, and you want to see all the failures at
// once rather than fixing them one CI run at a time.
async function allSettledReport() {
  const results = await Promise.allSettled([
    fetchJson('/users/1'),
    fetchJson('/users/9999'), // 404
    fetchJson('/users/3'),
  ]);

  results.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      console.log(`  [${i}] fulfilled: ${r.value.name}`);
    } else {
      console.log(`  [${i}] rejected:  ${r.reason.message.split('\n')[0]}`);
    }
  });

  const failed = results.filter((r) => r.status === 'rejected');
  console.log(`  ${failed.length} of ${results.length} failed`);
}

// TODO 6 — THE SILENT KILLER.
// No await, no .catch(). The rejection has nowhere to go.
//
// Node prints an UnhandledPromiseRejection warning and exits non-zero. Inside
// a test runner it is worse: the test itself has already passed and moved on,
// so you get a green tick and a warning nobody reads.
//
// This is the SAME BUG as forgetting await on a Playwright assertion:
//     expect(page.getByText('Invalid')).toBeVisible();   // no await
// The assertion never runs. The test cannot fail. It sits in your suite
// looking like coverage for months.
//
// You cannot rely on spotting these by eye. Step 11 of the README wires up
// the ESLint rule that catches them automatically.
async function floatingPromise() {
  fetchJson('/users/9999').catch((err) => {
    // Demonstrating the fix, not the bug — otherwise this file crashes here
    // and you never see the rest of the output. Comment out this .catch()
    // once, run it, and watch Node's unhandled-rejection message. Then put
    // it back.
    console.log('  handled by .catch():', err.message.split('\n')[0]);
  });

  console.log('  function finished, apparently fine');
  //
  // Note the ORDER in the output: "function finished" prints BEFORE the error
  // arrives. The function did not wait. That is the entire problem.
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

  await new Promise((r) => setTimeout(r, 500));
}

main();
