import LogInPage from '../../support/pages/LogInPage.js';
import FilesPage from '../../support/pages/FilesPage.js'
import spok from "cy-spok";

describe('Тестирование директории login', function () {

    beforeEach(function () {

        cy.visit('/login');
    })

    function checkErrorMessageAndItsVisibility() {

        LogInPage.elements.errorMessage().should('be.visible')
        LogInPage.elements.errorMessage().should('have.text', 'Неверные данные')
    }

    it('1. Успешная авторизация. user=admin, pass=admin', () => {

        cy.login('admin', 'admin');
        cy.url().should('equal', 'http://51.250.1.158:49153/files/')
    })

    it('2. Неуспешная авторизация. user=admin, pass=password', () => {

        cy.login('admin', 'password');
        checkErrorMessageAndItsVisibility()
    })

    it('3. Неуспешная авторизация. user=admin, pass=empty', () => {

        LogInPage.elements.usernameField().type('admin')
        LogInPage.elements.logInButton().click()
        checkErrorMessageAndItsVisibility()
    })

    it('4. Неуспешная авторизация. user=username, pass=admin', () => {

        cy.login('username', 'admin')
        checkErrorMessageAndItsVisibility()
    })

    it('5. Неуспешная авторизация. user=username, pass=password', () => {

        cy.login('username', 'password');
        checkErrorMessageAndItsVisibility()
    })

    it('6. Неуспешная авторизация. user=username, pass=empty', () => {

        LogInPage.elements.usernameField().type('username')
        LogInPage.elements.logInButton().click()
        checkErrorMessageAndItsVisibility()
    })

    it('7. Неуспешная авторизация. user=empty, pass=admin', () => {

        LogInPage.elements.passwordField().type('admin')
        LogInPage.elements.logInButton().click()
        checkErrorMessageAndItsVisibility()
    })

    it('8. Неуспешная авторизация. user=empty, pass=password', () => {

        LogInPage.elements.passwordField().type('password')
        LogInPage.elements.logInButton().click()
        checkErrorMessageAndItsVisibility()
    })

    it('9. Неуспешная авторизация. user=empty, pass=empty', () => {

        LogInPage.elements.logInButton().click()
        checkErrorMessageAndItsVisibility()
    })

    it('10. Подмена на статус код 500', () => {

        cy.intercept('POST', '**/api/login', {
            statusCode: 500
        }).as('login');

        cy.login('admin', 'admin');

        cy.wait('@login').its('response.statusCode').should('equal', 500);
    })

    it('11. Проверка наличия изображения на странице', () => {

        LogInPage.elements.image().should('exist')
    })

    it('12. Проверка наличия названия File Browser', () => {

        LogInPage.elements.fileBrowser().should('have.text', 'File Browser')
    })

    it('13. Проверка placeholder\'а Имя пользователя', () => {

        LogInPage.elements.usernameField().should('have.attr', 'placeholder', 'Имя пользователя')
    })

    it('14. Проверка placeholder\'а Пароль', () => {

        LogInPage.elements.passwordField().should('have.attr', 'placeholder', 'Пароль')
    })

    it('15. Проверка значения кнопки Войти', () => {

        LogInPage.elements.logInButton().should('have.attr', 'value', 'Войти')
    })

    it('16. Проверка правильной отправки запроса login', () => {

        cy.intercept('POST', '**/login').as('login');
        cy.login('admin', 'admin');
        cy.wait('@login').its('request.body').should(
            spok(Cypress._.cloneDeep(        {
                'username':'admin',
                'password':'admin',
                'recaptcha':''
            })))
    })
})