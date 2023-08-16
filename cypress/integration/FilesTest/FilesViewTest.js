import {mockRequests} from "./mock";
import filesPage from "../../support/pages/FilesPage";

describe('Тестирование изменения вида файлов', function () {

    beforeEach(function () {

        mockRequests()
        cy.loginUI('melnichenko', '1');
        filesPage.waitForPageToLoad()
    })

    it('Проверка существования 3-х состояний вида: mosaic gallery, list, mosaic', () => {

        cy.intercept('PUT', '**/8').as('8')
        filesPage.elements.viewButton().click()
        cy.wait('@8').its('request.body').should('match', /mosaic gallery|list|mosaic/)
        filesPage.elements.viewButton().children('i').invoke('text').should('match', /view_list|view_module|grid_view/)
    })

    it('Проверка подмены статус кода на 500 при изменении вида', () => {

        cy.intercept('PUT', '**/8', {
            statusCode: 500
        }).as('8')
        filesPage.elements.viewButton().click()
        cy.wait('@8')
        filesPage.checkError()
    })
})