const { test, expect } = require('@playwright/test');

test.describe('Auth UI Smoke Tests', () => {
  test('should load the login page and show form elements', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await expect(page).toHaveTitle(/Employee|Management|Login/i);

    const emailInput = page.locator('input[type="email"], input[name="email"], input#email');
    const passwordInput = page.locator('input[type="password"]');
    const submitButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")');

    await expect(emailInput.first()).toBeVisible();
    await expect(passwordInput.first()).toBeVisible();
    await expect(submitButton.first()).toBeVisible();
  });
});