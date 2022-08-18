/* eslint-disable no-undef */
describe('Display/Hide sidebar', () => {
  it('Hide sidebar', () => {
    cy.login('mrainforth0@theguardian.com', 'm0sah4TV');
    cy.get('[data-cy="sidebar"]')
      .should('have.css', 'display')
      .and('match', /block/);

    cy.get('[data-cy="menuButton"]').click();

    cy.get('[data-cy="sidebar"]')
      .should('have.css', 'display')
      .and('match', /none/);
  });

  it('Show sidebar', () => {
    cy.get('[data-cy="menuButton"]').click();

    cy.get('[data-cy="sidebar"]')
      .should('have.css', 'display')
      .and('match', /block/);
  });
});
