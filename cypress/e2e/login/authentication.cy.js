/* eslint-disable no-undef */
describe('Authentication', () => {
  it('Redirigir a /login', () => {
    cy.visit('localhost:3000/');
    cy.location('pathname').should('eq', '/login');
  });

  it('Login incorrecto', () => {
    cy.login('incorrecto@theguardian.com', 'incorrecto');

    cy.location('pathname').should('eq', '/login');
  });

  it('Login correcto', () => {
    cy.login('mrainforth0@theguardian.com', 'm0sah4TV');
    cy.location('pathname').should('eq', '/');
  });
});
