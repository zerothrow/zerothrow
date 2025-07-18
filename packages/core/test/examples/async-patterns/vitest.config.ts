import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    testTimeout: 10000
  },
  resolve: {
    alias: {
      '@zerothrow/zerothrow': './src/index.ts'
    }
  }
});