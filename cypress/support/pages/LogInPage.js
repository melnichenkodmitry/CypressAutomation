class LogInPage {

    elements = {
        usernameField: () => cy.get('input[type="text"]'),
        passwordField: () => cy.get('input[type="password"]'),
        errorMessage: () => cy.get('div[class="wrong"]'),
        logInButton: () => cy.get('input[type="submit"]'),
        getUrl: () => cy.url(),
        image: () => cy.get('img'),
        fileBrowser: () => cy.get('h1')
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

    checkUrl() {
        this.elements.getUrl().should('equal', 'http://51.250.1.158:49153/login');
    }

    checkImage() {
        this.elements.image().should('exist');
    }

    checkFileBrowser() {
        this.elements.fileBrowser().should('have.text', 'File Browser');
    }

    checkUsernamePlaceholder() {
        this.elements.usernameField().should('have.attr', 'placeholder', 'Имя пользователя');
    }

    checkPasswordPlaceholder() {
        this.elements.passwordField().should('have.attr', 'placeholder', 'Пароль');
    }

    checkLogInButtonPlaceholder() {
        this.elements.logInButton().should('have.attr', 'value', 'Войти');
    }

}

export default new LogInPage();