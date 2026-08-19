/**
 * SOLUTION — Exercise 4
 * Run with:  node solutions/04-report.js
 */

const BASE = process.env.BASE_URL ?? 'https://jsonplaceholder.typicode.com';

// TODO 1 — same helper as exercise 3.
async function fetchJson(path) {
  const url = `${BASE}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `GET ${url} -> ${res.status} ${res.statusText}\nBody: ${body.slice(0, 300)}`
    );
  }
  return res.json();
}

// TODO 2 — three calls, one round trip's worth of waiting.
//
// This is structurally identical to a Playwright fixture that seeds test data.
// When you get to Playwright, `fetchJson` becomes `request.get()` and this
// function becomes the body of a fixture. The shape does not change.
async function loadUserData(userId) {
  const [user, posts, todos] = await Promise.all([
    fetchJson(`/users/${userId}`),
    fetchJson(`/posts?userId=${userId}`),
    fetchJson(`/todos?userId=${userId}`),
  ]);
  return { user, posts, todos };
}

// TODO 3 — pure function: data in, summary out. No I/O, no awaits.
//
// Keeping the transformation separate from the fetching means you can unit
// test this with a hardcoded object and no network at all. Worth doing on
// purpose — it is the difference between a testable framework and one where
// everything needs a live environment.
function buildSummary(user, posts, todos) {
  const todosCompleted = todos.filter((t) => t.completed).length;
  const rate =
    todos.length === 0 ? 0 : Math.round((todosCompleted / todos.length) * 100);

  return {
    name: user.name,
    email: user.email,
    company: user.company.name,
    postCount: posts.length,
    todosTotal: todos.length,
    todosCompleted,
    completionRate: `${rate}%`,
    status: rate >= 50 ? 'active' : 'behind',
  };
}

// TODO 4 — print it.
function printSummary(summary) {
  console.log(
    `  ${summary.name.padEnd(22)} ${summary.company.padEnd(20)} ` +
      `posts:${String(summary.postCount).padStart(3)}  ` +
      `todos:${summary.todosCompleted}/${summary.todosTotal}  ` +
      `${summary.completionRate.padStart(4)}  ${summary.status}`
  );
}

async function summarize(userId) {
  const { user, posts, todos } = await loadUserData(userId);
  return buildSummary(user, posts, todos);
}

// TODO 5 — three users, nine HTTP calls, two different strategies.
async function main() {
  const userIds = [1, 2, 3];

  console.log('\n=== PARALLEL (9 calls overlapping) ===');
  const parallelStart = Date.now();
  const summaries = await Promise.all(userIds.map((id) => summarize(id)));
  summaries.forEach(printSummary);
  const parallelMs = Date.now() - parallelStart;
  console.log(`  -> ${parallelMs}ms`);

  console.log('\n=== SEQUENTIAL (9 calls one at a time) ===');
  const seqStart = Date.now();
  for (const id of userIds) {
    printSummary(await summarize(id));
  }
  const seqMs = Date.now() - seqStart;
  console.log(`  -> ${seqMs}ms`);

  console.log(
    `\n  Sequential was ${(seqMs / parallelMs).toFixed(1)}x slower ` +
      `(${seqMs - parallelMs}ms wasted).`
  );
  console.log('  Multiply that by every test in a suite. That is your CI bill.');

  console.log('\n=== loud failure ===');
  try {
    await summarize(9999);
  } catch (err) {
    console.log('  ' + err.message.split('\n')[0]);
    console.log('  ^ one line, and you know exactly which call broke and why.');
  }
}

main();
