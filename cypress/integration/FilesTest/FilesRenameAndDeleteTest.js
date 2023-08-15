import {mockRequests} from "./mock";

describe('Тестирование переименования и удаления файла', function () {

    beforeEach(function () {

        mockRequests()
        cy.loginUI('melnichenko', '1');
        cy.wait('@resources')
        cy.wait('@usage')
        cy.get('div[aria-label="melnichenko"]').click()
        createFile()
    })

    function deleteFile(file) {

        cy.get('div[aria-label="' + file + '"]').click()
        cy.get('#delete-button').click()
        cy.get('button[class="button button--flat button--red"]').click()
        cy.reload()
    }

    function createFolder() {

        cy.intercept('GET', '**/resources/folder*').as('resourcesFolder');
        cy.intercept('GET', '**/usage/folder*').as('usageFolder');
        cy.get('nav[class] > :nth-child(2) > :nth-child(1)').click()
        cy.get('input[class="input input--block"]').type('folder{enter}')
        cy.wait('@usageFolder')
        cy.wait('@resourcesFolder')
        cy.visit('/files')
    }

    function createFile() {

        cy.intercept('GET', '**/resources/file*').as('resourcesFile');
        cy.intercept('GET', '**/usage/file*').as('usageFile');
        cy.get('nav[class] > :nth-child(2) > :nth-child(2)').click()
        cy.get('input[class="input input--block"]').type('file{enter}')
        cy.wait('@usageFile')
        cy.wait('@resourcesFile')
        cy.visit('/files')
    }

    it('Проверка переименования файла', () => {

        cy.intercept('PATCH', '**/resources/file**').as('renameFile');
        cy.get('div[aria-label="file"]').click()
        cy.get('div[id="dropdown"] > :nth-child(2)').click()
        cy.get('input[class="input input--block"]').type('file{enter}')
        cy.wait('@renameFile')
        cy.reload()
        cy.get('div[aria-label="filefile"]').should('exist')
        deleteFile('filefile')
    })

    it('Проверка переименования файла с ответом 500', () => {

        cy.intercept('PATCH', '**/resources/file**', {
            statusCode: 500
        }).as('renameFile');
        cy.get('div[aria-label="file"]').click()
        cy.get('div[id="dropdown"] > :nth-child(2)').click()
        cy.get('input[class="input input--block"]').type('file{enter}')
        cy.wait('@renameFile')
        cy.get('.noty_body').should('exist').and('have.text', '[object Object]')
        cy.get('div[class="noty_buttons"] > :nth-child(1)').should('exist').and('have.text', 'Сообщить о проблеме')
        cy.get('div[class="noty_buttons"] > :nth-child(2)').should('exist').and('have.text', 'Закрыть')
        cy.reload()
        cy.get('div[aria-label="file"]').should('exist')
        cy.get('div[aria-label="filefile"]').should('not.exist')
        deleteFile('file')
    })

    it('Проверка удаления файла', () => {

        cy.intercept('DELETE', '**/resources/**').as('deleteFile');
        cy.get('div[aria-label="file"]').click()
        cy.get('#delete-button').click()
        cy.get('button[class="button button--flat button--red"]').click()
        cy.wait('@deleteFile')
        cy.get('div[aria-label="file"]').should('not.exist')
    })

    it('Проверка удаления файла с ответом 500', () => {

        cy.intercept('DELETE', '**/resources/**', {
            statusCode: 500
        }).as('deleteFile');
        cy.get('div[aria-label="file"]').click()
        cy.get('#delete-button').click()
        cy.get('button[class="button button--flat button--red"]').click()
        cy.wait('@deleteFile')
        cy.get('.noty_body').should('exist').and('have.text', '[object Object]')
        cy.get('div[class="noty_buttons"] > :nth-child(1)').should('exist').and('have.text', 'Сообщить о проблеме')
        cy.get('div[class="noty_buttons"] > :nth-child(2)').should('exist').and('have.text', 'Закрыть')
        cy.get('div[aria-label="file"]').should('exist')
        cy.reload()
    })

})