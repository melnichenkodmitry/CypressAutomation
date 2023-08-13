class LogInPage {

    elements = {
        usernameField: () => cy.get('input[type="text"]'),
        passwordField: () => cy.get('input[type="password"]'),
        errorMessage: () => cy.get('div[class="wrong"]'),
        logInButton: () => cy.get('input[type="submit"]'),
        image: () => cy.get('img'),
        fileBrowser: () => cy.get('h1')
    }

}

export default new LogInPage();