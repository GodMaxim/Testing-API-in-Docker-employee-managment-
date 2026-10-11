// frontend/playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', 
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  use: {
    baseURL: process.env.BASE_URL || 'http://frontend:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});