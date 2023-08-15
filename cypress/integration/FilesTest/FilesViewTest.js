import {mockRequests} from "./mock";

describe('Тестирование изменения вида файлов', function () {

    beforeEach(function () {

        mockRequests()
        cy.loginUI('melnichenko', '1');
        cy.wait('@resources')
        cy.wait('@usage')
        cy.get('div[aria-label="melnichenko"]').click()
    })

    it('Проверка существования 3-х состояний вида: mosaic gallery, list, mosaic', () => {

        cy.intercept('PUT', '**/8').as('8')
        cy.get('div[id="dropdown"] > :nth-child(7)').click()
        cy.wait('@8').its('request.body').should('match', /mosaic gallery|list|mosaic/)
        cy.get('div[id="dropdown"] > :nth-child(7)').children('i').invoke('text').should('match', /view_list|view_module|grid_view/)
    })

    it('Проверка подмены статус кода на 500 при изменении вида', () => {

        cy.intercept('PUT', '**/8', {
            statusCode: 500
        }).as('8')
        cy.get('div[id="dropdown"] > :nth-child(7)').click()
        cy.wait('@8')
        cy.get('.noty_body').should('exist').and('have.text', '[object Object]')
        cy.get('div[class="noty_buttons"] > :nth-child(1)').should('exist').and('have.text', 'Сообщить о проблеме')
        cy.get('div[class="noty_buttons"] > :nth-child(2)').should('exist').and('have.text', 'Закрыть')
    })
})