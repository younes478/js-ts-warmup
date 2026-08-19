/**
 * Offline fallback — a tiny stand-in for jsonplaceholder.typicode.com
 *
 * Use this if your network blocks the public API (common on corporate laptops).
 *
 *   Terminal 1:  npm run mock
 *   Terminal 2:  BASE_URL=http://localhost:3000 npm run 03
 *
 * On Windows PowerShell, terminal 2 is:
 *   $env:BASE_URL="http://localhost:3000"; npm run 03
 *
 * Same response shapes as the real API, a small random delay so the
 * parallel-vs-sequential timing lesson still lands, and 404s on unknown ids so
 * the error-handling exercises still work.
 *
 * No dependencies — just Node's built-in http module.
 */

import { createServer } from 'node:http';

const PORT = process.env.PORT ?? 3000;

const COMPANIES = ['Romaguera-Crona', 'Deckow-Crist', 'Romaguera-Jacobson'];

const USERS = [1, 2, 3, 4, 5].map((id) => ({
  id,
  name: `Test User ${id}`,
  username: `user${id}`,
  email: `user${id}@example.com`,
  company: {
    name: COMPANIES[(id - 1) % COMPANIES.length],
    catchPhrase: 'Synergistic paradigm shift',
    bs: 'harness real-time e-markets',
  },
}));

const POSTS = USERS.flatMap((u) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: u.id * 100 + i,
    userId: u.id,
    title:
      i % 3 === 0
        ? `A deliberately long post title for user ${u.id}, number ${i}, to exercise the find() branch`
        : `Short title ${i}`,
    body: 'Lorem ipsum dolor sit amet.',
  }))
);

const TODOS = USERS.flatMap((u) =>
  Array.from({ length: 20 }, (_, i) => ({
    id: u.id * 100 + i,
    userId: u.id,
    title: `Todo ${i} for user ${u.id}`,
    // Varies per user so completionRate differs and you see both
    // 'active' and 'behind' statuses in the report.
    completed: i % (u.id + 1) === 0,
  }))
);

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const server = createServer(async (req, res) => {
  // Random latency so parallel really does beat sequential.
  await delay(80 + Math.random() * 120);

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;
  const userId = url.searchParams.get('userId');

  const send = (status, payload) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
  };

  const userMatch = path.match(/^\/users\/(\d+)$/);
  if (userMatch) {
    const user = USERS.find((u) => u.id === Number(userMatch[1]));
    return user ? send(200, user) : send(404, {});
  }

  if (path === '/users') return send(200, USERS);

  if (path === '/posts') {
    return send(200, userId ? POSTS.filter((p) => p.userId === Number(userId)) : POSTS);
  }

  if (path === '/todos') {
    return send(200, userId ? TODOS.filter((t) => t.userId === Number(userId)) : TODOS);
  }

  send(404, { error: 'Not Found', path });
});

server.listen(PORT, () => {
  console.log(`Mock API listening on http://localhost:${PORT}`);
  console.log('Users 1-5 exist. Anything else returns 404.');
  console.log('Stop with Ctrl+C.');
});
