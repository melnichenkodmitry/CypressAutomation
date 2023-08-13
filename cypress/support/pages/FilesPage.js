class FilesPage {

    elements = {
        logOutButton: () => cy.get('button[id="logout"]'),
    }

}

export default new FilesPage();