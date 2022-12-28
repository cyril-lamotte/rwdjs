// Set responsive breakpoints to test.
const sizes = [
  {
    value: 'iphone-8',
    device: 'mobile',
  },
  {
    value: 'ipad-2',
    device: 'mobile',
  },
  {
    value: [1024, 768],
    device: 'desktop',
  },
  {
    value: [1280, 720],
    device: 'desktop',
  },
]

describe('RWDjs execution', () => {

  it('Open localhost', () => {
    cy.visit('/')
  })

  sizes.forEach((size) => {

    it(`Device ${size.value}`, () => {
      if (Cypress._.isArray(size.value)) {
        cy.viewport(size.value[0], size.value[1])
      } else {
        cy.viewport(size.value)
      }

      cy.visit('/')
      if (size.device === 'mobile') {
        cy.get('body.rwd-small')
        // Get the last list item.
        cy.get('#log li:last-child')
        .contains('Breakpoint reached.')
      } else if (size.device === 'desktop') {
        cy.get('body.rwd-large')
        // Get the last list item.
        cy.get('#log li:last-child')
        .contains('Breakpoint not active')
      }

      cy.wait(200)
    })

  })
})
