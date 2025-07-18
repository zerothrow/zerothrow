import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const tsRecommended = tseslint.configs.recommended;

export default [
  // Global ignores - these files will never be linted
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/build/**',
      '**/.git/**',
      '**/*.min.js',
      '**/vendor/**',
      
      // Project-specific ignores
      'scripts/**/*',
      'benchmark/**/*',
      'src/examples/**/*',
      '*.config.js',
      '*.config.ts',
      'vitest.*.config.ts',
      '.husky/**/*',
      'docs/**/*',
      
      // Temporarily disable graph-ext due to TypeScript strict mode issues
      'packages/graph-ext/**/*'
    ],
  },
  
  // Main source files - STRICT rules
  {
    files: ['src/**/*.{ts,tsx}', 'packages/*/src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.eslint.json',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tsRecommended.rules,
      'no-console': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      // Ban old ZeroThrow API names
      'no-restricted-imports': ['error', {
        paths: [{
          name: '@zerothrow/zerothrow',
          importNames: ['tryR', 'tryRSync', 'tryRBatch', 'promise', 'async', 'OK', 'ERR', 'AnyError'],
          message: 'Use the new API: ZT.try() or ZeroThrow.attempt() instead of tryR, ZeroThrow.wrap() instead of promise(), ZeroThrow.fromAsync() instead of async().'
        }]
      }],
    },
  },
  
  // Test files - more relaxed rules
  {
    files: ['test/**/*.{ts,tsx}', 'packages/*/test/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.eslint.json',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        React: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tsRecommended.rules,
      'no-console': 'off', // Allow console in tests
      'no-var': 'error',
      'prefer-const': 'error',
      '@typescript-eslint/no-explicit-any': 'off', // Allow any in tests for mocking
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        args: 'after-used' // Don't complain about unused args if there are used ones after
      }],
      '@typescript-eslint/no-unsafe-function-type': 'off', // Allow Function type in tests
      '@typescript-eslint/no-unused-expressions': 'off', // Allow standalone expressions in tests
      'no-magic-numbers': 'off', // Tests are full of magic numbers
      // Ban old ZeroThrow API names in tests too
      'no-restricted-imports': ['error', {
        paths: [{
          name: '@zerothrow/zerothrow',
          importNames: ['tryR', 'tryRSync', 'tryRBatch', 'promise', 'async', 'OK', 'ERR', 'AnyError'],
          message: 'Use the new API: ZT.try() or ZeroThrow.attempt() instead of tryR, ZeroThrow.wrap() instead of promise(), ZeroThrow.fromAsync() instead of async().'
        }]
      }],
    },
  },
];
