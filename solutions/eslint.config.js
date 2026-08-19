// SOLUTION — Step 11, eslint.config.js
//
// Install first:
//   npm i -D eslint typescript-eslint
//
// Run with:  npx eslint ts/
//
// The rules below are the entire reason to bother with ESLint on a test
// framework. They need TYPE information to work (that is what projectService
// enables), which is why plain JS projects cannot have them — and one more
// concrete reason to write your framework in TypeScript.

import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/', 'src/', 'solutions/'],
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Flags any promise you created but never awaited, returned, or
      // .catch()-ed. This is the rule that catches:
      //   expect(page.getByText('x')).toBeVisible();   // missing await
      // i.e. an assertion that can never fail. Non-negotiable.
      '@typescript-eslint/no-floating-promises': 'error',

      // Flags `await` on something that is not a promise. Usually means you
      // forgot to actually call the function, or misremembered an API.
      '@typescript-eslint/await-thenable': 'error',

      // Flags passing an async function where a sync callback is expected —
      // this is the forEach trap from exercise 2, caught statically.
      '@typescript-eslint/no-misused-promises': 'error',
    },
  }
);
