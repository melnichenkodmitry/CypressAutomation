import {mockRequests} from "./mock";
import logInPage from "../../support/pages/LogInPage";
import LogInPage from "../../support/pages/LogInPage";

describe('Тесты, не относящиеся к экшенамм', function () {

    beforeEach(function () {

        mockRequests()
        cy.loginUI('melnichenko', '1');
        cy.wait('@resources')
        cy.wait('@usage')
        cy.get('div[aria-label="melnichenko"]').click()
    })

    it('Проверка открытия файла', () => {

        cy.get('div[aria-label="melnichenko"]').click()
        cy.get('div[class="ace_line"]').should('have.text', 'melnichenko')
    })

    it('Проверка существования экшенов с файлом', () => {

        cy.get('div[id="dropdown"] > :nth-child(2)').should('exist')
        cy.get('#copy-button').should('exist')
        cy.get('#move-button').should('exist')
        cy.get('#delete-button').should('exist')
        cy.get('div[id="dropdown"] > :nth-child(7)').should('exist')
    })

    it('e2e тест на logout', () => {

        cy.get('nav[class] > :nth-child(3) > :nth-child(2)').click()
        cy.url().should('equals', 'http://51.250.1.158:49153/login')
    })

})