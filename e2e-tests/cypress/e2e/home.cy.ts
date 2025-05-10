describe('Home', () => {
    it('loads successfully', () => {
        cy.visit('/');
        cy.contains('Welcome');
    });
});
