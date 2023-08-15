import spok from 'cy-spok'
import {mockRequests} from "./mock";

describe('Тестирование поисковой строки', function () {

    beforeEach(function () {

        mockRequests()
        cy.loginUI('admin', 'admin');
    })

    function waifForPageToLoad() {

        cy.wait('@resources')
        cy.wait('@usage')
        cy.get('input[type="text"]').click()
    }

    it('Проверка правильной передачи строки через параметры', () => {

        waifForPageToLoad()
        cy.get('input[type="text"]').type('melnichenko{enter}')
        cy.wait('@search').its('request.url').should('include', 'query=melnichenko')
    })

    it('Проверка результатов поиска', () => {

        waifForPageToLoad()
        cy.get('input[type="text"]').type('melnichenko{enter}')
        cy.wait('@search')
        cy.get('a[href="/files/melnichenko/"]').should('have.text', 'folder./melnichenko')
        cy.get('a[href="/files/melnichenko/melnichenko"]').should('have.text', 'insert_drive_file./melnichenko/melnichenko')
        cy.get('a[href="/files/melnichenko/"] > :nth-child(1)').should('have.text', 'folder')
        cy.get('a[href="/files/melnichenko/melnichenko"] > :nth-child(1)').should('have.text', 'insert_drive_file')
    })

    it('Проверка, что при передаче пустой строки запрос не передается', () => {

        cy.intercept({url: '**/search/**'}, (req) => { //отлов нежелательных запросов
            throw new Error('Caught unexpected request ' + req.url)
        }).as('unexpectedRequest')
        waifForPageToLoad()
        cy.get('input[type="text"]').type('{enter}')
    })

    const testData = [
        {
            'value': 'Images',
            'query': 'image'
        },
        {
            'value': 'Music',
            'query': 'audio'
        },
        {
            'value': 'Video',
            'query': 'video'
        },
        {
            'value': 'PDF',
            'query': 'pdf'
        }
    ]

    testData.forEach((type) => {
        it('Проверка предлагаемых результатов с типом ' + type.value, () => {

            waifForPageToLoad()
            cy.get('[aria-label="' + type.value + '"]').click()
            cy.get('input[type="text"]').type('{enter}')
            cy.wait('@search').its('request.url').should('include', 'query=type%3A' + type.query + '%20')
        });
    })

    it('Проверка правильной отправки запроса login', () => {

        cy.get('@login').its('request.body').should(
            spok(Cypress._.cloneDeep(        {
            'username':'admin',
            'password':'admin',
            'recaptcha':''
    })))
    })

    it('Проверка отправки запроса поиска с кодом 500', () => {
        cy.intercept('GET', '**/search/**', {
            statusCode: 500
        }).as('search');
        cy.get('input[type="text"]').type('melnichenko{enter}')
        cy.get('a[href="/files/melnichenko/"]').should('not.exist')
        cy.get('a[href="/files/melnichenko/melnichenko"]').should('not.exist')
        cy.get('a[href="/files/melnichenko/"] > :nth-child(1)').should('not.exist')
        cy.get('a[href="/files/melnichenko/melnichenko"] > :nth-child(1)').should('not.exist')
        cy.get('#noty_layout__bottomRight').should('exist')
        cy.get('.noty_body').should('exist').and('have.text', '[object Object]')
        cy.get('div[class="noty_buttons"] > :nth-child(1)').should('exist').and('have.text', 'Report Issue')
        cy.get('div[class="noty_buttons"] > :nth-child(2)').should('exist').and('have.text', 'Close')
    })
})
