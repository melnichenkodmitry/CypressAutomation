class FilesPage {

    elements = {
        melnichenkoFile: () => cy.get('div[aria-label="melnichenko"]'),
        folder: () => cy.get('div[aria-label="folder"]'),
        file: () => cy.get('div[aria-label="file"]'),
        filefile: () => cy.get('div[aria-label="filefile"]'),
        logOutButton: () => cy.get('nav[class] > :nth-child(3) > :nth-child(2)'),
        renameButton: () => cy.get('div[id="dropdown"] > :nth-child(2)'),
        copyButton: () => cy.get('#copy-button'),
        moveButton: () => cy.get('#move-button'),
        deleteButton: () => cy.get('#delete-button'),
        viewButton: () => cy.get('div[id="dropdown"] > :nth-child(7)'),
        createFolderButton: () => cy.get('nav[class] > :nth-child(2) > :nth-child(1)'),
        createFileButton: () => cy.get('nav[class] > :nth-child(2) > :nth-child(2)'),
        newNameFileOrFolder: () => cy.get('input[class="input input--block"]'),
        chooseFolder: () => cy.get('li[aria-label="folder"]'),
        acceptDeletion: () => cy.get('button[class="button button--flat button--red"]'),
        acceptCopyAndMoveAndRename: () => cy.get('button[class="button button--flat"]'),
        errorObject: () => cy.get('.noty_body'),
        errorReport: () => cy.get('div[class="noty_buttons"] > :nth-child(1)'),
        errorClose: () => cy.get('div[class="noty_buttons"] > :nth-child(2)')
    }

    waitForPageToLoad() {

        cy.wait('@resources')
        cy.wait('@usage')
        this.elements.melnichenkoFile().click()
    }

    createFolder() {

        cy.intercept('GET', '**/resources/folder*').as('resourcesFolder')
        cy.intercept('GET', '**/usage/folder*').as('usageFolder')
        this.elements.createFolderButton().click()
        this.elements.newNameFileOrFolder().type('folder{enter}')
        cy.wait('@usageFolder')
        cy.wait('@resourcesFolder')
        cy.visit('/files')
    }

    createFile() {

        cy.intercept('GET', '**/resources/file*').as('resourcesFile')
        cy.intercept('GET', '**/usage/file*').as('usageFile')
        this.elements.createFileButton().click()
        this.elements.newNameFileOrFolder().type('file{enter}')
        cy.wait('@usageFile')
        cy.wait('@resourcesFile')
        cy.visit('/files')
    }

    deleteFolder() {

        this.elements.folder().click()
        this.elements.deleteButton().click()
        this.elements.acceptDeletion().click()
        cy.reload()
    }

    deleteFile(file) {

        cy.get('div[aria-label="' + file + '"]').click()
        this.elements.deleteButton().click()
        this.elements.acceptDeletion().click()
        cy.reload()
    }

    checkError() {

        this.elements.errorObject().should('exist').and('have.text', '[object Object]')
        this.elements.errorReport().should('exist').and('have.text', 'Сообщить о проблеме')
        this.elements.errorClose().should('exist').and('have.text', 'Закрыть')
    }

}

export default new FilesPage();