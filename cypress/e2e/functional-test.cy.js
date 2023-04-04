const locators = require('../src/locators') //Import locators file
const utils = require('../src/utils')
const defaultMeals = require('../src/data').defaultMeals

describe('React Meals App Validation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should add a new meal to the menu ', () => {
    const mealName = 'added meal 1'
    const mealDescription = 'test description'
    const mealPrice = '3.54'

    cy.get(locators.mealItems).should('have.length', 4)
    utils.addMealToTheMenu(mealName, mealPrice, mealDescription)
    cy.get(locators.addMealButton).click();

    cy.get(locators.mealItems).should('have.length', 5)
      .then((element) => {
        cy.get(element).last().find(locators.mealItemPrice).should('have.text', `$${mealPrice}`)
        cy.get(element).last().find(locators.mealItemName).should('have.text', mealName)
        cy.get(element).last().find(locators.mealItemDescription).should('have.text', mealDescription)
      })
  })

  it('should validate the required inputs of the add new meal form', () => {
    const mealName = 'added meal 1'
    const mealPrice = '3.54'

    // Click on add meal button without filling any data
    cy.get(locators.addMealButton).click();
    // check that the menu items are still 4 items
    cy.get(locators.mealItems).should('have.length', 4)

    // Validate the name error message then check if it's gone after filling the name filed
    cy.get(locators.mealErrorText).should('be.visible').should('have.text', 'Please enter a valid name.')
    cy.get(locators.mealNameInput).type(mealName)
    cy.get(locators.mealErrorText).should('not.exist')

    // Validate the price error message then check if it's gone after filling the price filed
    cy.get(locators.mealPriceErrorText).should('be.visible').should('have.text', 'Please enter a valid price (at least 0.01).')
    cy.get(locators.mealPriceInput).type(mealPrice);
    cy.get(locators.mealPriceErrorText).should('not.exist')
    cy.get(locators.addMealButton).click();

    // check if the new meal was added successfully
    cy.get(locators.mealItems).should('have.length', 5)
  })

  it('should add meal to the menu without adding description', () => {
    const mealName = 'meal name 1'
    const mealPrice = 2.3

    utils.addMealToTheMenu(mealName, mealPrice)
    cy.get(locators.mealItems).should('have.length', 5)
    cy.get(locators.mealItem(mealName)).find(locators.mealItemDescription).should('have.text', '')
  })

  it('should add meal to the cart successfully', () => {
    const mealName = 'meal name 1'
    const mealPrice = 2.3
    const amountOfMeals = 2

    utils.addMealToTheMenu(mealName, mealPrice)
    cy.get(locators.mealItem(mealName, locators.amountInput)).clear().type(amountOfMeals)
    cy.get(locators.mealItem(mealName, locators.addToCart)).click()

    cy.get(locators.cartButton).should('have.text', amountOfMeals).click()
    cy.get(locators.cartItems()).should('have.length', 1)

    cy.get(locators.cartItems(mealName, locators.cartItemName)).should('have.text', mealName)
    cy.get(locators.cartItems(mealName, locators.cartItemPrice)).should('have.text', `$${mealPrice.toFixed(2)}`)
    cy.get(locators.cartItems(mealName, locators.cartItemAmount)).should('have.text', `x ${amountOfMeals}`)

    const totalAmount = mealPrice * amountOfMeals
    cy.get(locators.totalAmount).should('have.text', `$${totalAmount.toFixed(2)}`)
  })

  it('should add multiple meals to the cart successfully and calculate the total amount correctly', () => {
    const amountOfMeals = 2
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).clear().type(amountOfMeals)
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.addToCart)).click()

    cy.get(locators.mealItem(defaultMeals.secondMeal.name, locators.amountInput)).clear().type(amountOfMeals)
    cy.get(locators.mealItem(defaultMeals.secondMeal.name, locators.addToCart)).click()

    cy.get(locators.cartButton).should('have.text', amountOfMeals * 2).click()
    cy.get(locators.cartItems()).should('have.length', 2)

    cy.get(locators.cartItems(defaultMeals.firstMeal.name, locators.cartItemName)).should('have.text', defaultMeals.firstMeal.name)
    cy.get(locators.cartItems(defaultMeals.firstMeal.name, locators.cartItemPrice)).should('have.text', `$${defaultMeals.firstMeal.price.toFixed(2)}`)
    cy.get(locators.cartItems(defaultMeals.firstMeal.name, locators.cartItemAmount)).should('have.text', `x ${amountOfMeals}`)

    cy.get(locators.cartItems(defaultMeals.secondMeal.name, locators.cartItemName)).should('have.text', defaultMeals.secondMeal.name)
    cy.get(locators.cartItems(defaultMeals.secondMeal.name, locators.cartItemPrice)).should('have.text', `$${defaultMeals.secondMeal.price.toFixed(2)}`)
    cy.get(locators.cartItems(defaultMeals.secondMeal.name, locators.cartItemAmount)).should('have.text', `x ${amountOfMeals}`)

    const totalAmount = (defaultMeals.firstMeal.price * amountOfMeals) + (defaultMeals.secondMeal.price * amountOfMeals)
    cy.get(locators.totalAmount).should('have.text', `$${totalAmount.toFixed(2)}`)
  })

  it('should display the order button in the card if there was at least one meal in the cart', () => {
    const amountOfMeals = 1
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).clear().type(amountOfMeals)
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.addToCart)).click()

    cy.get(locators.cartButton).click()
    cy.get(locators.orderButton).should('be.visible')
    cy.get(locators.removeItemFromCart).click()
    cy.get(locators.orderButton).should('not.exist')
  })

  // This test is failing because of a bug
  it('should display the order button in the card if there was more than one meal in the cart', () => {
    const amountOfMeals = 2
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).clear().type(amountOfMeals)
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.addToCart)).click()

    cy.get(locators.cartButton).click()
    cy.get(locators.orderButton).should('be.visible')
    cy.get(locators.removeItemFromCart).click()
    cy.get(locators.orderButton).should('not.exist')
  })

  // the next test case is failing because removing one of the total number of meals removes 2 meals instead of 1
  it('should update the cart meals amount upon removing and adding from the cart', () => {
    const amountOfMeals = 2
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).clear().type(amountOfMeals)
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.addToCart)).click()

    cy.get(locators.cartButton).click()

    cy.get(locators.removeItemFromCart).click()
    cy.get(locators.cartItems(defaultMeals.firstMeal.name, locators.cartItemAmount)).should('have.text', `x ${amountOfMeals - 1}`)
  })

  it('should update the cart meals amount upon adding and adding from the cart', () => {
    const amountOfMeals = 2
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).clear().type(amountOfMeals)
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.addToCart)).click()

    cy.get(locators.cartButton).click()

    cy.get(locators.addItemToCart).click()
    cy.get(locators.cartItems(defaultMeals.firstMeal.name, locators.cartItemAmount)).should('have.text', `x ${amountOfMeals + 1}`)
  })

  it('should update the cart total amount upon removing from the cart', () => {
    const amountOfMeals = 2
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).clear().type(amountOfMeals)
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.addToCart)).click()

    cy.get(locators.cartButton).click()
    const totalAmount = defaultMeals.firstMeal.price * amountOfMeals

    cy.get(locators.removeItemFromCart).click()

    const totalAmountAfterRemovingOneMeal = totalAmount - defaultMeals.firstMeal.price
    cy.get(locators.totalAmount).should('have.text', `$${totalAmountAfterRemovingOneMeal.toFixed(2)}`)
  })

  it('should update the cart total amount upon adding from the cart', () => {
    const amountOfMeals = 2
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).clear().type(amountOfMeals)
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.addToCart)).click()

    cy.get(locators.cartButton).click()
    const totalAmount = defaultMeals.firstMeal.price * amountOfMeals

    cy.get(locators.addItemToCart).click()

    const totalAmountAfterRemovingOneMeal = totalAmount + defaultMeals.firstMeal.price
    cy.get(locators.totalAmount).should('have.text', `$${totalAmountAfterRemovingOneMeal.toFixed(2)}`)
  })

  it('should update the total amount when updating multi meals amount in the cart', () => {
    const amountOfMeals = 2
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).clear().type(amountOfMeals)
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.addToCart)).click()

    cy.get(locators.mealItem(defaultMeals.secondMeal.name, locators.amountInput)).clear().type(amountOfMeals)
    cy.get(locators.mealItem(defaultMeals.secondMeal.name, locators.addToCart)).click()

    cy.get(locators.cartButton).click()

    const totalAmount = (defaultMeals.firstMeal.price * amountOfMeals) + (defaultMeals.secondMeal.price * amountOfMeals)
    cy.get(locators.totalAmount).should('have.text', `$${totalAmount.toFixed(2)}`)

    cy.get(locators.cartItems(defaultMeals.firstMeal.name, locators.addItemToCart)).click()
    cy.get(locators.cartItems(defaultMeals.secondMeal.name, locators.removeItemFromCart)).click()

    const newMealsAmountAfterAddingOneMeal = amountOfMeals + 1
    const newMealsAmountAfterRemovingOneMeal = amountOfMeals - 1

    const totalAmountAfterEditedCart = (defaultMeals.firstMeal.price * newMealsAmountAfterAddingOneMeal) + (defaultMeals.secondMeal.price * newMealsAmountAfterRemovingOneMeal)
    cy.get(locators.totalAmount).should('have.text', `$${totalAmountAfterEditedCart.toFixed(2)}`)
  })

  // Bug +/- are not disabled when reaching lower value
  it('should disable the remove item button when the number of the same meal equal zero', () => {
    const amountOfMeals = 2
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).clear().type(amountOfMeals)
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.addToCart)).click()

    cy.get(locators.cartButton).click()
    cy.get(locators.cartItems(defaultMeals.firstMeal.name, locators.removeItemFromCart)).click()
    cy.get(locators.cartItems(defaultMeals.firstMeal.name, locators.removeItemFromCart)).click()

    cy.get(locators.cartItems(defaultMeals.firstMeal.name, locators.removeItemFromCart)).should('be.disabled')
  })

  // Bug +/- are not disabled when reaching upper value
  it('should disable the add item button when the number of the same meal equal five', () => {
    const amountOfMeals = 5
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).clear().type(amountOfMeals)
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.addToCart)).click()

    cy.get(locators.cartButton).click()

    cy.get(locators.cartItems(defaultMeals.firstMeal.name, locators.addItemToCart)).should('be.disabled')
  })

  it('should not allow the user to add more than 5 items to the cart of the same meal', () => {
    const amountOfMeals = 6
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).clear().type(amountOfMeals)

    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).then(($input) => {
      expect($input[0].validationMessage).to.eq('Value must be less than or equal to 5.')
    })
  })

  it('should not allow the user to add less than 1 item to the cart of the same meal', () => {
    const amountOfMeals = 0
    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).clear().type(amountOfMeals)

    cy.get(locators.mealItem(defaultMeals.firstMeal.name, locators.amountInput)).then(($input) => {
      expect($input[0].validationMessage).to.eq('Value must be greater than or equal to 1.')
    })
  })
})
