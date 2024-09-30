describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to navigate to the product page and add it to the cart', () => {
    cy.get('a[href^="/product"]').first().click() // pegando o 1º elemento <a> que comece com href=/product e "clica"
    cy.location('pathname').should('include', '/product') // garantir que a url da navegação tenha "/product"
    cy.contains('Adicionar ao carrinho').click() // Procurar o botão add ao carrinho
    cy.contains('Cart (1)').should('exist') // Garantir que consiga encontrar um elemento que tenha escrito "Cart (1)"
  })
  it('should not count duplicated products on cart', () => {
    cy.get('a[href^="/product"]').first().click()
    cy.location('pathname').should('include', '/product')
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Cart (1)').should('exist')
  })
  it('should be able to search for a product and add it to the cart', () => {
    cy.searchByQuery('moletom')

    cy.get('a[href^="/product"]').first().click()
    cy.location('pathname').should('include', '/product')
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Cart (1)').should('exist')
  })
})
