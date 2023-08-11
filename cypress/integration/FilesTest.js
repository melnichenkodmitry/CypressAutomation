import FilesPage from '../support/pages/FilesPage.js'
import LogInPage from '../support/pages/LogInPage.js';

describe('Тестирование пути files', function () {

    beforeEach(function () {
        cy.visit('/');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.login('admin', 'admin');
    })

    it('1. Выход из учетной записи', () => {

        FilesPage.clickLogOutButton();
        LogInPage.checkUrl();
    })
})