describe('Тестирование логина пользователя', function () {

    beforeEach(function () {
        cy.visit('/')
    })

    it('LogInSuccess', () => {
        cy.login('admin', 'admin')
    })
})