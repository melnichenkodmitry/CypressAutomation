import {mockRequests} from "./mock";
import filesPage from "../../support/pages/FilesPage";

describe('Тестирование копирования и перемещения файла', function () {

    beforeEach(function () {

        mockRequests()
        cy.loginUI('melnichenko', '1');
        filesPage.waitForPageToLoad()
        filesPage.createFolder()
        filesPage.createFile()
    })

    afterEach(function () {
        filesPage.deleteFolder()
    })

    it('Проверка копирования файла', () => {

        cy.intercept('PATCH', '**/resources/file**').as('resourcesFile');
        filesPage.elements.file().click()
        filesPage.elements.copyButton().click()
        filesPage.elements.chooseFolder().click()
        filesPage.elements.acceptCopyAndMoveAndRename().click()
        cy.wait('@resourcesFile')
        filesPage.elements.file().should('exist')
        cy.visit('/files')
        filesPage.waitForPageToLoad()
        filesPage.elements.file().should('exist')
        filesPage.deleteFile('file')
    })

    it('Проверка копирования файла с ответом 500', () => {

        cy.intercept('PATCH', '**/resources/file**', {
            statusCode: 500
        }).as('resourcesFile');
        filesPage.elements.file().click()
        filesPage.elements.copyButton().click()
        filesPage.elements.chooseFolder().click()
        filesPage.elements.acceptCopyAndMoveAndRename().click()
        cy.wait('@resourcesFile')
        filesPage.checkError()
        cy.reload()
        filesPage.waitForPageToLoad()
        filesPage.elements.file().should('exist')
        filesPage.elements.folder().dblclick()
        filesPage.elements.file().should('not.exist')
        cy.visit('/files')
        filesPage.deleteFile('file')
    })

    it('Проверка перемещения файла', () => {

        cy.intercept('PATCH', '**/resources/file**').as('resourcesFile');
        filesPage.elements.file().click()
        filesPage.elements.moveButton().click()
        filesPage.elements.chooseFolder().click()
        filesPage.elements.acceptCopyAndMoveAndRename().click()
        cy.wait('@resourcesFile')
        filesPage.elements.file().should('exist')
        cy.visit('/files')
        filesPage.waitForPageToLoad()
        filesPage.elements.file().should('not.exist')
    })

    it('Проверка перемещения файла с ответом 500', () => {

        cy.intercept('PATCH', '**/resources/file**', {
            statusCode: 500
        }).as('resourcesFile');
        filesPage.elements.file().click()
        filesPage.elements.moveButton().click()
        filesPage.elements.chooseFolder().click()
        filesPage.elements.acceptCopyAndMoveAndRename().click()
        cy.wait('@resourcesFile')
        filesPage.checkError()
        cy.reload()
        filesPage.waitForPageToLoad()
        filesPage.elements.file().should('exist')
        filesPage.elements.folder().dblclick()
        filesPage.elements.file().should('not.exist')
        cy.visit('/files')
        filesPage.deleteFile('file')
    })
})