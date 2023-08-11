class FilesPage {

    elements = {
        logOutButton: () => cy.get('button[id="logout"]'),
        getUrl: () => cy.url()
    }

    clickLogOutButton() {
        this.elements.logOutButton().click();
    }

    checkUrl() {
        this.elements.getUrl().should('equal', 'http://51.250.1.158:49153/files/')
    }

}

export default new FilesPage();