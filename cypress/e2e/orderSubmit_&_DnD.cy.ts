export {}

describe('ingredientModal', () => {
  beforeEach(() => {

    window.localStorage.setItem('accessToken', 'test-accessToken')
    window.localStorage.setItem('refreshToken', 'test-refreshToken')

    // Чтобы не писать полный Url в конфиге cypress нужно указать базовый Url
    cy.visit('/')

    // Аргументы - метод, эндпоинт (только послений), возвращаемое значение
    cy.intercept('GET', 'ingredients', {fixture: "ingredientsArr.json"})
    cy.intercept('GET', 'user', {fixture: "login.json"})
    cy.intercept('PATCH', 'user', {fixture: "login.json"})
    cy.intercept('POST', 'orders', {fixture: "orderResp.json"})
  })

  afterEach(() => {
    cy.clearLocalStorage()
  })

  it("should drag bun & submit order", function () {
    cy.get('[data-testid=ingredientCardLink]').first()
      .trigger("dragstart");
    cy.get("[data-testid=burgerConstructorBun]").trigger("drop");
    cy.get('[data-testid=ingredientCardLink]').last()
      .trigger("dragstart");
    cy.get("[data-testid=burgerConstructorFilling]").trigger("drop");

    cy.get('[data-testid=submitOrder]').click().then(() => {
      cy.contains(12345)
    })

    cy.get('[data-testid=test-modalClose]').click().then(() => {
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/')
      })
    })
  })
})
