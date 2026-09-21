import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: false,
        include: ['src/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            reportsDirectory: 'coverage/unit',
            reporter: ['text', 'html', 'json-summary'],
            include: ['src/unit-testing-with-vitest/**/*.ts'],
            exclude: ['src/unit-testing-with-vitest/**/*.test.ts'],
            thresholds: {
                statements: 95,
                branches: 90,
                functions: 95,
                lines: 95,
            },
        },
    },
});
