import { IngredientInterface } from "../commonTypes";

type TgetFullOrderCost = (
  ingredientsList: IngredientInterface[],
  ingredients: string[]
) => number

export const getFullOrderCost: TgetFullOrderCost = (ingredientsList, ingredients) => {
  let cost: number = 0;
  if (ingredientsList && ingredients) {
    ingredients.forEach((elementId: string) => {
      //TODO
      // @ts-ignore
      cost += ingredientsList.find((item: IngredientInterface) => item._id === elementId).price
    })
  }
  return cost;
}
