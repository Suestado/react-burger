export {}

describe('ingredientModal', () => {
  beforeEach(() => {
    // Чтобы не писать полный Url в конфиге cypress нужно указать базовый Url
    cy.visit('/')

    // Аргументы - метод, эндпоинт (только послений), возвращаемое значение
    cy.intercept('GET', 'ingredients', {fixture: "ingredientsArr.json"})
  })

  it('should open and close ingredient modal', () => {
    cy.visit('/')
    cy.get('[data-testid=ingredientCardLink]').first().click()
    cy.get('[data-testid=ingredientDetails-page]').as('ingredientModal').then(() => {
      cy.contains('Детали ингредиента')

      cy.get(`[data-testid=test-picture]`).invoke('attr', 'src').should('eq', "https://code.s3.yandex.net/react/code/bun-02-large.png")
      cy.get('[data-testid=test-ingredientName]').should('contain', "Краторная булка N-200i")
      cy.get('[data-testid=test-calories]').should('contain', 420)
      cy.get('[data-testid=test-proteins]').should('contain', 80)
      cy.get('[data-testid=test-fat]').should('contain', 24)
      cy.get('[data-testid=test-carbohydrates]').should('contain', 53)
    })

    cy.get('[data-testid=test-modalClose]').click().then(() => {
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/')
      })
    })
  })
})
