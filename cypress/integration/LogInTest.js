import LogInPage from '../support/pages/LogInPage.js';
import FilesPage from '../support/pages/FilesPage.js'

describe('Тестирование пути login', function () {

    beforeEach(function () {
        cy.visit('/');
        cy.clearCookies();
        cy.clearLocalStorage();
    })

    it('1. Успешная авторизация. user=admin, pass=admin', () => {

        cy.login('admin', 'admin');
        FilesPage.checkUrl();
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

    it('11. Проверка наличия изображения на странице', () => {

        LogInPage.checkImage();
    })

    it('12. Проверка наличия названия File Browser', () => {

        LogInPage.checkFileBrowser();
    })

    it('13. Проверка placeholder\'а Имя пользователя', () => {

        LogInPage.checkUsernamePlaceholder();
    })

    it('14. Проверка placeholder\'а Пароль', () => {

        LogInPage.checkPasswordPlaceholder();
    })

    it('15. Проверка значения кнопки Войти', () => {

        LogInPage.checkLogInButtonPlaceholder();
    })
})