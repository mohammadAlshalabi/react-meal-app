const locators = require('./locators')

/**
 * Add a meal to the menu
 *
 * @param {string} mealName  the name of the meal to add
 * @param {string} mealPrice the price of the meal to add
 * @param {string?} mealDescription (optional) the description of the meal to add
 */
export const addMealToTheMenu = (mealName = 'meal name', mealPrice = '1.5', mealDescription) => {
  cy.get(locators.mealNameInput).type(mealName)
  cy.get(locators.mealPriceInput).type(mealPrice);
  if (mealDescription) cy.get(locators.mealDescriptionInput).type(mealDescription)
  cy.get(locators.addMealButton).click();
}
