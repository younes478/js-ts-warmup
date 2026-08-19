/**
 * PHASE 2, FILE 1 — types.ts
 *
 * Nothing here compiles to any JavaScript at all. Types are erased when tsc
 * runs; they exist purely to catch your mistakes in the editor. That is worth
 * remembering the first time you wonder where your interfaces went.
 *
 * In a real framework this file is your domain model: Loan, Account, Applicant,
 * whatever your product actually has.
 */

// ---------------------------------------------------------------------------
// TODO 1 — Describe the shapes coming back from the API.
// Look at https://jsonplaceholder.typicode.com/users/1 in a browser and write
// interfaces for what you see. You do NOT have to model every field — only
// what your code touches. Over-modelling is a common beginner tax.
//
// Company:  name, catchPhrase, bs           (all strings)
// User:     id (number), name, username, email, company (Company)
// Post:     id, userId (numbers), title, body (strings)
// Todo:     id, userId (numbers), title (string), completed (boolean)
// ---------------------------------------------------------------------------

// your interfaces here

// ---------------------------------------------------------------------------
// TODO 2 — A union type for status.
//   export type AccountStatus = 'active' | 'behind';
//
// This is one of the highest-value things TypeScript gives test automation.
// Write 'Active' instead of 'active' and it fails to COMPILE, instead of
// silently never matching and giving you a test that passes for the wrong
// reason. Every status/enum field in your product should be a union.
// ---------------------------------------------------------------------------

// your union type here

// ---------------------------------------------------------------------------
// TODO 3 — The Summary shape your report produces.
//   name, email, company: string
//   postCount, todosTotal, todosCompleted: number
//   completionRate: string
//   status: AccountStatus
//
// Add one OPTIONAL field with `?` to see how it behaves:
//   lastPostTitle?: string
// Under strict mode, TypeScript will now force you to handle the case where
// it is missing. That nagging is the feature.
// ---------------------------------------------------------------------------

// your Summary interface here
