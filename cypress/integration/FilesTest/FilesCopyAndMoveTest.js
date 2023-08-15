import {mockRequests} from "./mock";

describe('Тестирование копирования и перемещения файла', function () {

    beforeEach(function () {

        mockRequests()
        cy.loginUI('melnichenko', '1');
        waitForPageToLoad()
        createFolder()
        createFile()
    })

    afterEach(function () {
        deleteFolder()
    })

    function waitForPageToLoad() {

        cy.wait('@resources')
        cy.wait('@usage')
        cy.get('div[aria-label="melnichenko"]').click()
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

    function deleteFolder() {

        cy.get('div[aria-label="folder"]').click()
        cy.get('#delete-button').click()
        cy.get('button[class="button button--flat button--red"]').click()
        cy.reload()
    }

    function deleteFile() {

        cy.get('div[aria-label="file"]').click()
        cy.get('#delete-button').click()
        cy.get('button[class="button button--flat button--red"]').click()
        cy.reload()
    }

    it('Проверка копирования файла', () => {

        cy.intercept('PATCH', '**/resources/file**').as('resourcesFile');
        cy.get('div[aria-label="file"]').click()
        cy.get('#copy-button').click()
        cy.get('li[aria-label="folder"]').click()
        cy.get('button[class="button button--flat"]').click()
        cy.wait('@resourcesFile')
        cy.get('div[aria-label="file"]').should('exist')
        cy.visit('/files')
        waitForPageToLoad()
        cy.get('div[aria-label="file"]').should('exist')
        deleteFile()
    })

    it('Проверка копирования файла с ответом 500', () => {

        cy.intercept('PATCH', '**/resources/file**', {
            statusCode: 500
        }).as('resourcesFile');
        cy.get('div[aria-label="file"]').click()
        cy.get('#copy-button').click()
        cy.get('li[aria-label="folder"]').click()
        cy.get('button[class="button button--flat"]').click()
        cy.wait('@resourcesFile')
        cy.get('.noty_body').should('exist').and('have.text', '[object Object]')
        cy.get('div[class="noty_buttons"] > :nth-child(1)').should('exist').and('have.text', 'Сообщить о проблеме')
        cy.get('div[class="noty_buttons"] > :nth-child(2)').should('exist').and('have.text', 'Закрыть')
        cy.reload()
        waitForPageToLoad()
        cy.get('div[aria-label="folder"]').dblclick()
        cy.get('div[aria-label="file"]').should('not.exist')
        cy.visit('/files')
        deleteFile()
    })

    it('Проверка перемещения файла', () => {

        cy.intercept('PATCH', '**/resources/file**').as('resourcesFile');
        cy.get('div[aria-label="file"]').click()
        cy.get('#move-button').click()
        cy.get('li[aria-label="folder"]').click()
        cy.get('button[class="button button--flat"]').click()
        cy.wait('@resourcesFile')
        cy.get('div[aria-label="file"]').should('exist')
        cy.visit('/files')
        waitForPageToLoad()
        cy.get('div[aria-label="file"]').should('not.exist')
    })

    it('Проверка перемещения файла с ответом 500', () => {

        cy.intercept('PATCH', '**/resources/file**', {
            statusCode: 500
        }).as('resourcesFile');
        cy.get('div[aria-label="file"]').click()
        cy.get('#copy-button').click()
        cy.get('li[aria-label="folder"]').click()
        cy.get('button[class="button button--flat"]').click()
        cy.wait('@resourcesFile')
        cy.get('.noty_body').should('exist').and('have.text', '[object Object]')
        cy.get('div[class="noty_buttons"] > :nth-child(1)').should('exist').and('have.text', 'Сообщить о проблеме')
        cy.get('div[class="noty_buttons"] > :nth-child(2)').should('exist').and('have.text', 'Закрыть')
        cy.reload()
        waitForPageToLoad()
        cy.get('div[aria-label="folder"]').dblclick()
        cy.get('div[aria-label="file"]').should('not.exist')
        cy.visit('/files')
        deleteFile()
    })
})