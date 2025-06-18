import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/e2e',
    testMatch: /.*\.spec\.ts/,
    timeout: 30 * 1000,
    retries: 0,
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
}); 