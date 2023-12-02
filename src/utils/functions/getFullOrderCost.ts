import { IngredientInterface } from "../commonTypes";

type TgetFullOrderCost = (
  ingredientsList: IngredientInterface[],
  ingredients: string[]
) => number

export const getFullOrderCost: TgetFullOrderCost = (ingredientsList, ingredients) => {
  let cost: number = 0;
  if (ingredientsList && ingredients) {
    ingredients.forEach((elementId) => {
      const itemCost = ingredientsList.find((item) => item._id === elementId)
      cost += itemCost ? itemCost.price : 0
    })
  }
  return cost;
}
