export {}

describe('ingredientModal', () => {
  beforeEach(() => {

    window.localStorage.setItem('accessToken', 'test-accessToken')
    window.localStorage.setItem('refreshToken', 'test-refreshToken')

    // Чтобы не писать полный Url в конфиге cypress нужно указать базовый Url
    cy.visit('/')

    // Аргументы - метод, эндпоинт, возвращаемое значение
    cy.intercept('GET', 'ingredients', {fixture: "ingredientsArr.json"})
    cy.intercept('GET', 'user', {fixture: "login.json"})
    cy.intercept('PATCH', 'user', {fixture: "login.json"})
    cy.intercept('POST', 'orders', {fixture: "orderResp.json"})
  })

  afterEach(() => {
    cy.clearLocalStorage()
  })

  it('should open and close ingredient modal', () => {
    cy.visit('/')
    cy.get('[data-testid=ingredientCardLink]').first().click()
    cy.get('[data-testid=ingredientDetails-page]').as('ingredientModal')
    cy.contains('Детали ингредиента')

    cy.get(`[data-testid=test-picture]`).invoke('attr', 'src').should('eq', "https://code.s3.yandex.net/react/code/bun-02-large.png")
    cy.get('[data-testid=test-ingredientName]').should('contain', "Краторная булка N-200i")
    cy.get('[data-testid=test-calories]').should('contain', 420)
    cy.get('[data-testid=test-proteins]').should('contain', 80)
    cy.get('[data-testid=test-fat]').should('contain', 24)
    cy.get('[data-testid=test-carbohydrates]').should('contain', 53)

    cy.get('[data-testid=test-modalClose]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })
  })

  it("should drag bun", function () {
    cy.get('[data-testid=ingredientCardLink]').first()
      .trigger("dragstart");
    cy.get("[data-testid=burgerConstructorBun]").trigger("drop");
    cy.get('[data-testid=ingredientCardLink]').last()
      .trigger("dragstart");
    cy.get("[data-testid=burgerConstructorFilling]").trigger("drop");

    cy.get('[data-testid=submitOrder]').click()
    cy.contains(12345)

    cy.get('[data-testid=test-modalClose]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })
  })
})
