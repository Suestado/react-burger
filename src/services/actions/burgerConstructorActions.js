import { nanoid } from 'nanoid';
import {
  PUT_BURGER_BUN,
  PUT_BURGER_FILLING,
  REPLACE_BURGER_BUN,
  DELETE_BURGER_FILLING,
  REPLACE_BURGER_FILLING,
} from '../../utils/constants';

const putBurgerBun = (bunIngredient) => ({
  type: PUT_BURGER_BUN,
  bunIngredient: { ...bunIngredient, id: nanoid() },
});

const putBurgerFilling = (fillingIngredient) => ({
  type: PUT_BURGER_FILLING,
  fillingIngredient: { ...fillingIngredient, id: nanoid() },
});

const replaceBurgerBun = (newBun) => ({
  type: REPLACE_BURGER_BUN,
  newBun: newBun,
});

const deleteBurgerFilling = (fillingIngredientIndex) => ({
  type: DELETE_BURGER_FILLING,
  deleteIngredientIndex: fillingIngredientIndex,
});

const replaceBurgerFilling = (newIngredientsList) => ({
  type: REPLACE_BURGER_FILLING,
  newIngredientsList: newIngredientsList,
});

export {
  putBurgerBun,
  putBurgerFilling,
  replaceBurgerBun,
  deleteBurgerFilling,
  replaceBurgerFilling,
};
