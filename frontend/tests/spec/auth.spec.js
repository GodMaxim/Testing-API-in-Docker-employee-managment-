import { test, expect } from '@playwright/test'
import { LoginPage } from '../page/login.page.js'
import { RegisterPage } from '../page/register.page.js'

test.describe('Login page UI test', () => {
  let loginPage
  let registerPage

  test.beforeEach (async ({ page }) => {
    loginPage = new LoginPage(page)
    registerPage = new RegisterPage(page)
    await page.goto('http://localhost:5173');
  });

  test('should load the login page and show form elements', async () => {
    await expect(loginPage.title).toHaveText('Sign in to Employee Management');
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
    await expect(loginPage.registerLink).toBeVisible()
  });

  test('should navigate to the register page when clicking the register link and show it`s elements', async () => {
    await loginPage.clickRegisterLink()
    await expect(registerPage.title).toHaveText('Create your account')
    await expect(registerPage.firstNameInput).toBeVisible()
    await expect(registerPage.lastNameInput).toBeVisible()
    await expect(registerPage.middleNameInput).toBeVisible()
    await expect(registerPage.emailInput).toBeVisible()
    await expect(registerPage.passwordInput).toBeVisible()
    await expect(registerPage.phoneInput).toBeVisible()
    await expect(registerPage.birthdayInput).toBeVisible()
    await expect(registerPage.programmeLanguageSelect).toBeVisible()
    await expect(registerPage.role).toBeVisible()
    await expect(registerPage.create).toBeVisible()
   });

});