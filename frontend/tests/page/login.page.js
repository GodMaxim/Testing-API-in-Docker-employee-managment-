export class LoginPage {
    constructor(page) {
        this.page = page
        this.title = page.locator('h3')
        this.emailInput = page.locator('#email')
        this.passwordInput = page.locator('#password')
        this.submitButton = page.locator('button[type="submit"]')
        this.registerLink = page.locator('a[href="/register"]')
    }

    async clickRegisterLink() {
        await this.registerLink.click()
    }
    
}

