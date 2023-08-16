import {mockRequests} from "./mock";
import filesPage from "../../support/pages/FilesPage";

describe('Тестирование переименования и удаления файла', function () {

    beforeEach(function () {

        mockRequests()
        cy.loginUI('melnichenko', '1');
        filesPage.waitForPageToLoad()
        filesPage.createFile()
    })

    it('Проверка переименования файла', () => {

        cy.intercept('PATCH', '**/resources/file**').as('renameFile');
        filesPage.elements.file().click()
        filesPage.elements.renameButton().click()
        filesPage.elements.newNameFileOrFolder().type('file{enter}')
        cy.wait('@renameFile')
        cy.reload()
        filesPage.elements.filefile().should('exist')
        filesPage.elements.file().should('not.exist')
        filesPage.deleteFile('filefile')
    })

    it('Проверка переименования файла с ответом 500', () => {

        cy.intercept('PATCH', '**/resources/file**', {
            statusCode: 500
        }).as('renameFile');
        filesPage.elements.file().click()
        filesPage.elements.renameButton().click()
        filesPage.elements.newNameFileOrFolder().type('file{enter}')
        cy.wait('@renameFile')
        filesPage.checkError()
        cy.reload()
        filesPage.elements.filefile().should('not.exist')
        filesPage.elements.file().should('exist')
        filesPage.deleteFile('file')
    })

    it('Проверка удаления файла', () => {

        cy.intercept('DELETE', '**/resources/**').as('deleteFile');
        filesPage.elements.file().click()
        filesPage.elements.deleteButton().click()
        filesPage.elements.acceptDeletion().click()
        cy.wait('@deleteFile')
        filesPage.elements.file().should('not.exist')
    })

    it('Проверка удаления файла с ответом 500', () => {

        cy.intercept('DELETE', '**/resources/**', {
            statusCode: 500
        }).as('deleteFile');
        filesPage.elements.file().click()
        filesPage.elements.deleteButton().click()
        filesPage.elements.acceptDeletion().click()
        cy.wait('@deleteFile')
        filesPage.checkError()
        filesPage.elements.file().should('exist')
        cy.reload()
    })

})