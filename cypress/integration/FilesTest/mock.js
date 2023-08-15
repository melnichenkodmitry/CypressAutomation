export const mockRequests = () => {
    cy.intercept('GET', '**/resources/').as('resources');
    cy.intercept('GET', '**/usage/').as('usage');
    cy.intercept('POST', '**/login').as('login');
}