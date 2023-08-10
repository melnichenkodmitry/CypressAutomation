import LogInPage from '../support/pages/LogInPage.js';

describe('Тестирование авторизации пользователя', function () {

    beforeEach(function () {
        cy.visit('/');
        LogInPage.clearCookiesAndLocalStorage();
    })

    it('1. Успешная авторизация. user=admin, pass=admin', () => {

        cy.login('admin', 'admin');
        LogInPage.checkUrlAfterLogIn();
    })

    it('2. Неуспешная авторизация. user=admin, pass=password', () => {

        cy.login('admin', 'password');
        LogInPage.checkErrorMessageVisibility();
        LogInPage.checkErrorMessage();
    })

    it('3. Неуспешная авторизация. user=admin, pass=empty', () => {

        LogInPage.fillUsernameField('admin');
        LogInPage.clickLogInButton();
        LogInPage.checkErrorMessageVisibility();
        LogInPage.checkErrorMessage();
    })

    it('4. Неуспешная авторизация. user=username, pass=admin', () => {

        cy.login('username', 'admin')
        LogInPage.checkErrorMessageVisibility();
        LogInPage.checkErrorMessage();
    })

    it('5. Неуспешная авторизация. user=username, pass=password', () => {

        cy.login('username', 'password');
        LogInPage.checkErrorMessageVisibility();
        LogInPage.checkErrorMessage();
    })

    it('6. Неуспешная авторизация. user=username, pass=empty', () => {

        LogInPage.fillUsernameField('username');
        LogInPage.clickLogInButton();
        LogInPage.checkErrorMessageVisibility();
        LogInPage.checkErrorMessage();
    })

    it('7. Неуспешная авторизация. user=empty, pass=admin', () => {

        LogInPage.fillPasswordField('admin');
        LogInPage.clickLogInButton();
        LogInPage.checkErrorMessageVisibility();
        LogInPage.checkErrorMessage();
    })

    it('8. Неуспешная авторизация. user=empty, pass=password', () => {

        LogInPage.fillPasswordField('password');
        LogInPage.clickLogInButton();
        LogInPage.checkErrorMessageVisibility();
        LogInPage.checkErrorMessage();
    })

    it('9. Неуспешная авторизация. user=empty, pass=empty', () => {

        LogInPage.clickLogInButton();
        LogInPage.checkErrorMessageVisibility();
        LogInPage.checkErrorMessage();
    })

    it('10. Подмена на статус код 500', () => {

        cy.intercept('POST', '**/api/login', {
            statusCode: 500
        }).as('login');

        cy.login('admin', 'admin');

        cy.wait('@login').its('response.statusCode').should('equal', 500);

    })
})