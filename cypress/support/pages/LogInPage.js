export default class LogInPage {

    elements = {
        usernameField: () => cy.get('input[type="text"]'),
        passwordField: () => cy.get('input[type="password"]'),
        errorMessage: () => cy.get('div[class="wrong"]'),
        logInButton: () => cy.get('input[type="submit"]'),
        getUrl: () => cy.url()
    }

    fillUsernameField(username) {
        this.elements.usernameField().type(username);
    }

    fillPasswordField(password) {
        this.elements.passwordField().type(password);
    }

    checkErrorMessage() {
        this.elements.errorMessage().should('have.text', 'Неверные данные');
    }

    checkErrorMessageVisibility() {
        this.elements.errorMessage().should('be.visible');
    }

    clickLogInButton() {
        this.elements.logInButton().click();
    }

    checkFilesUrl() {
        this.elements.getUrl().should('equal', 'http://51.250.1.158:49153/files/');
    }

    clearCookiesAndLocalStorage() {
        cy.clearCookies();
        cy.clearLocalStorage();
    }
}