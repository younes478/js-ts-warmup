/**
 * SOLUTION — Phase 2, client.ts
 */

const BASE = process.env.BASE_URL ?? 'https://jsonplaceholder.typicode.com';

/**
 * A typed error carrying the details you actually need when a suite fails
 * in CI at 2am.
 *
 * `public readonly` in the constructor parameters is TypeScript shorthand:
 * it declares the property AND assigns it, so there is no
 * `this.status = status` boilerplate.
 */
export class HttpError extends Error {
  constructor(
    public readonly url: string,
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: string
  ) {
    super(`GET ${url} -> ${status} ${statusText}\nBody: ${body.slice(0, 300)}`);
    this.name = 'HttpError';
  }
}

/**
 * One generic function, correctly typed for every endpoint.
 *
 *   const user  = await fetchJson<User>('/users/1');    // user  : User
 *   const posts = await fetchJson<Post[]>('/posts');    // posts : Post[]
 *
 * <T> is a parameter, just like `path` — except the caller passes a TYPE
 * instead of a value, and it is checked at compile time rather than runtime.
 */
export async function fetchJson<T>(path: string): Promise<T> {
  const url = `${BASE}${path}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new HttpError(url, res.status, res.statusText, await res.text());
  }

  // `as T` is an assertion, not a check. res.json() returns `any` because
  // nothing can know the shape of bytes arriving over a network. You are
  // telling the compiler to trust you.
  //
  // This is the honest weak point of typed API clients, and exactly why
  // runtime schema validation (zod, ajv) exists. If the backend renames a
  // field, TypeScript will NOT catch it — your types will confidently
  // describe a shape that no longer arrives. Worth knowing before you rely
  // on it.
  return (await res.json()) as T;
}
