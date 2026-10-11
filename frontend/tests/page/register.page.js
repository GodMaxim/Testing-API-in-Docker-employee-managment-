export class RegisterPage {
    constructor(page) {
        this.page = page
        this.title = page.locator('h3')
        this.firstNameInput = page.locator('#firstName')
        this.lastNameInput = page.locator('#lastName')
        this.middleNameInput = page.locator('#middleName')
        this.emailInput = page.locator('#email')
        this.passwordInput = page.locator('#password')
        this.phoneInput = page.locator('#phone')
        this.birthdayInput = page.locator('#birthDate')
        this.programmeLanguageSelect = page.locator('#programmingLanguage')
        this.role = page.locator('#role')
        this.create = page.locator('button[type="submit"]')
    }
}
