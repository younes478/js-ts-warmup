/**
 * PHASE 2, FILE 2 — client.ts
 *
 * Your fetchJson from exercise 3, now typed and generic.
 */

const BASE = process.env.BASE_URL ?? 'https://jsonplaceholder.typicode.com';

// ---------------------------------------------------------------------------
// TODO 1 — A custom error class.
//   export class HttpError extends Error { ... }
//
// Store url, status, statusText and body as properties, and build a readable
// message in the constructor with super(...). Set this.name = 'HttpError'.
//
// Why a class instead of throwing a plain Error: callers can do
// `if (err instanceof HttpError && err.status === 404)` and react to specific
// failures. With a string message all you can do is regex it and hope.
// ---------------------------------------------------------------------------

// your HttpError class here

// ---------------------------------------------------------------------------
// TODO 2 — The generic fetch helper.
//   export async function fetchJson<T>(path: string): Promise<T>
//
// The <T> is a placeholder the CALLER fills in:
//   const user  = await fetchJson<User>('/users/1');    // user  is User
//   const posts = await fetchJson<Post[]>('/posts');    // posts is Post[]
//
// One function, correctly typed for every endpoint. Without the generic you
// would either write a separate function per endpoint or return `any` and
// throw away the type safety you came for.
//
// Body: build the url, await fetch, throw HttpError if !res.ok,
// otherwise `return (await res.json()) as T;`
//
// Note the `as T`. res.json() returns `any` — TypeScript cannot know the shape
// of data arriving over the network, so you are ASSERTING it. This is a real
// promise you are making to the compiler, and it is why schema validation
// (zod, ajv) exists: to check at runtime that the promise was true. Out of
// scope here, but know that this cast is the honest weak point.
// ---------------------------------------------------------------------------

// your fetchJson function here
