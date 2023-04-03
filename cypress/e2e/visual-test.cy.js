const locators = require('../src/locators')
const defaultMeals = require('../src/data').defaultMeals

describe('React Meals App Validation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should verify the default state of the project elements', () => {
    cy.wait(1000)
    cy.get('#root').compareSnapshot('default-state', 0.0)
  })

  it('should verify the add meal form without errors', () => {
    const mealName = 'added meal 1'
    const mealPrice = '3.54'

    cy.get(locators.mealNameInput).type(mealName)
    cy.get(locators.mealPriceInput).type(mealPrice);
    cy.get('[e2e-data="add-meal-section"]').compareSnapshot('add-new-meal-section', 0.0)
  })

  it('should verify the cart model with items', () => {
    const amountOfMeals = 2
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).clear().type(amountOfMeals)
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.addToCart)).click()

    cy.get(locators.cartButton).click()
    cy.wait(1000)

    cy.get(locators.cartModel).compareSnapshot('cart-with-items', 0.0)
  })

  it('should verify the cart default state', () => {
    cy.get(locators.cartButton).click()

    cy.get(locators.cartModel).compareSnapshot('cart-default-state', 0.0)
  })
})
