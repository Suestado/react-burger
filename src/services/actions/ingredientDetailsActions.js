import {
  GET_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
} from '../../utils/constants';

const getIngredient = (ingredient) => ({
  type: GET_INGREDIENT_DETAILS,
  name: ingredient.name,
  image_large: ingredient.image_large,
  calories: ingredient.calories,
  proteins: ingredient.proteins,
  fat: ingredient.fat,
  carbohydrates: ingredient.carbohydrates,
});

const deleteIngredient = () => ({
  type: DELETE_INGREDIENT_DETAILS,
});

export {
  getIngredient,
  deleteIngredient,
};
