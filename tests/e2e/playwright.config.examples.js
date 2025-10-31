const { defineConfig, devices } = require('@playwright/test');

/**
 * Configuration Playwright spécifique pour les tests E2E des exemples
 * Cette configuration permet de tester plusieurs applications en parallèle
 */

module.exports = defineConfig({
  testDir: './',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Exécuter séquentiellement pour éviter les conflits de ports
  reporter: process.env.CI
    ? [['github'], ['html', { outputFolder: 'playwright-report' }], ['json', { outputFile: 'test-results.json' }]]
    : 'html',
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'next-basic',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
      testMatch: '**/next-basic.spec.ts',
    },
    {
      name: 'next-openai',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3001',
      },
      testMatch: '**/next-openai.spec.ts',
    },
    {
      name: 'next-agent',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3002',
      },
      testMatch: '**/next-agent.spec.ts',
    },
    {
      name: 'security',
      use: {
        ...devices['Desktop Chrome'],
      },
      testMatch: '**/security.spec.ts',
    },
  ],
  webServer: [
    {
      command: 'pnpm --filter @example/next dev',
      port: 3000,
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
      env: { PORT: '3000' },
      cwd: '../..',
    },
    {
      command: 'pnpm --filter @example/next-openai dev',
      port: 3001,
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
      env: { PORT: '3001' },
      cwd: '../..',
    },
    {
      command: 'pnpm --filter @example/next-agent dev',
      port: 3002,
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
      env: { PORT: '3002' },
      cwd: '../..',
    },
  ],
});

