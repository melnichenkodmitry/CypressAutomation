import LogInPage from '../support/pages/LogInPage.js';

describe('Тестирование авторизации пользователя', function () {
    let logInPage = new LogInPage();

    beforeEach(function () {
        cy.visit('/');
        logInPage.clearCookiesAndLocalStorage();
    })

    it('1. Успешная авторизация. user=admin, pass=admin', () => {

        cy.login('admin', 'admin');
        logInPage.checkFilesUrl();
    })

    it('2. Неуспешная авторизация. user=admin, pass=password', () => {

        cy.login('admin', 'password');
        logInPage.checkErrorMessageVisibility();
        logInPage.checkErrorMessage();
    })

    it('3. Неуспешная авторизация. user=admin, pass=empty', () => {

        logInPage.fillUsernameField('admin');
        logInPage.clickLogInButton();
        logInPage.checkErrorMessageVisibility();
        logInPage.checkErrorMessage();
    })

    it('4. Неуспешная авторизация. user=username, pass=admin', () => {

        cy.login('username', 'admin')
        logInPage.checkErrorMessageVisibility();
        logInPage.checkErrorMessage();
    })

    it('5. Неуспешная авторизация. user=username, pass=password', () => {

        cy.login('username', 'password');
        logInPage.checkErrorMessageVisibility();
        logInPage.checkErrorMessage();
    })

    it('6. Неуспешная авторизация. user=username, pass=empty', () => {

        logInPage.fillUsernameField('username');
        logInPage.clickLogInButton();
        logInPage.checkErrorMessageVisibility();
        logInPage.checkErrorMessage();
    })

    it('7. Неуспешная авторизация. user=empty, pass=admin', () => {

        logInPage.fillPasswordField('admin');
        logInPage.clickLogInButton();
        logInPage.checkErrorMessageVisibility();
        logInPage.checkErrorMessage();
    })

    it('8. Неуспешная авторизация. user=empty, pass=password', () => {

        logInPage.fillPasswordField('password');
        logInPage.clickLogInButton();
        logInPage.checkErrorMessageVisibility();
        logInPage.checkErrorMessage();
    })

    it('9. Неуспешная авторизация. user=empty, pass=empty', () => {

        logInPage.clickLogInButton();
        logInPage.checkErrorMessageVisibility();
        logInPage.checkErrorMessage();
    })

    it('10. Подмена на статус код 500', () => {

        cy.intercept('POST', '**/api/login', {
            statusCode: 500
        }).as('login');

        cy.login('admin', 'admin');

        cy.wait('@login').its('response.statusCode').should('equal', 500);

    })
})