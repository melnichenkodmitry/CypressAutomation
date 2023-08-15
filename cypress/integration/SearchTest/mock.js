export const mockRequests = () => {
    cy.intercept('GET', '**/resources/', {fixture: 'Search/resourcesempty.json'}).as('resources');
    cy.intercept('GET', '**/usage/', {fixture: 'Search/usage.json'}).as('usage');
    cy.intercept('POST', '**/login').as('login');
    cy.intercept('GET', '**/search/**', {fixture: 'Search/search.json'}).as('search');
}