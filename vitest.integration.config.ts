import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['packages/core/test/integration/**/*.test.{ts,tsx}'],
    exclude: [
      'node_modules',
      'dist',
      'build',
      'test/integration/performance.test.ts',
      'test/**/*performance*.test.ts',
    ],
    globals: true,
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['packages/core/src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules',
        'test',
        'dist',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'src/eslint.ts', // Exclude ESLint rules from coverage
      ],
    },
    testTimeout: 30000,
    hookTimeout: 30000,
    teardownTimeout: 10000,
    pool: 'forks',
    poolOptions: {
      forks: {
        maxForks: 4,
        minForks: 1,
      },
    },
    sequence: {
      shuffle: false,
    },
    onConsoleLog(log) {
      // Filter out performance benchmark logs in CI
      if (process.env.CI && log.includes('Performance')) {
        return false;
      }
    },
  },
});
