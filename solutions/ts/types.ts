/**
 * SOLUTION — Phase 2, types.ts
 */

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: Company;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

/**
 * A union type: the ONLY legal values are these two strings.
 *
 *   const s: AccountStatus = 'Active';   // compile error, capital A
 *
 * In plain JS that typo produces a test that runs, passes, and asserts
 * nothing meaningful. Here it never reaches the runner. Model every status,
 * role, tier and enum in your product this way.
 */
export type AccountStatus = 'active' | 'behind';

export interface Summary {
  name: string;
  email: string;
  company: string;
  postCount: number;
  todosTotal: number;
  todosCompleted: number;
  completionRate: string;
  status: AccountStatus;

  /**
   * The `?` means this may be absent. Under strict mode its type is
   * `string | undefined`, so TypeScript will not let you call .toUpperCase()
   * on it without checking first. That is the whole point of optionals:
   * "might be missing" becomes something the compiler tracks for you instead
   * of something you have to remember.
   */
  lastPostTitle?: string;
}
