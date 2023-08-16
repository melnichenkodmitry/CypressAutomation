import {mockRequests} from "./mock";
import filesPage from "../../support/pages/FilesPage";

describe('Тесты, не относящиеся к экшенамм', function () {

    beforeEach(function () {

        mockRequests()
        cy.loginUI('melnichenko', '1');
        filesPage.waitForPageToLoad()
    })

    it('Проверка открытия файла', () => {

        filesPage.elements.melnichenkoFile().click()
        cy.get('div[class="ace_line"]').should('have.text', 'melnichenko')
    })

    it('Проверка существования экшенов с файлом', () => {

        filesPage.elements.renameButton().should('exist')
        filesPage.elements.copyButton().should('exist')
        filesPage.elements.moveButton().should('exist')
        filesPage.elements.deleteButton().should('exist')
        filesPage.elements.viewButton().should('exist')
    })

    it('e2e тест на logout', () => {

        filesPage.elements.logOutButton().click()
        cy.url().should('equals', 'http://51.250.1.158:49153/login')
    })

})