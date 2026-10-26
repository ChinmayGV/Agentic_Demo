describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5174/')
    cy.get('input[name="email"]').type('student@example.com ')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
  })
})