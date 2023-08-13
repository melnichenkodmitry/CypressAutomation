import FilesPage from '../support/pages/FilesPage.js'
import LogInPage from '../support/pages/LogInPage.js';

describe('Тестирование директории files', function () {

    beforeEach(function () {
        cy.visit('/login');
        cy.login('admin', 'admin');
    })

    it('1. Выход из учетной записи', () => {

        FilesPage.elements.logOutButton().click()
        cy.url().should('equal', 'http://51.250.1.158:49153/login')
    })
})