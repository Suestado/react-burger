import {
  PUT_BURGER_BUN,
  PUT_BURGER_FILLING,
  DELETE_BURGER_BUN,
  DELETE_BURGER_FILLING,
  REPLACE_BURGER_FILLING,
} from '../../utils/constants';

const putBurgerBun = (bunIngredient) => ({
  type: PUT_BURGER_BUN,
  bunIngredient: bunIngredient,
})

const putBurgerFilling = (fillingIngredient) => ({
  type: PUT_BURGER_FILLING,
  fillingIngredient: fillingIngredient,
})

const deleteBurgerBun = () => ({
  type: DELETE_BURGER_BUN,
})

const deleteBurgerFilling = (fillingIngredient) => ({
  type: DELETE_BURGER_FILLING,
  deleteIngredientID: fillingIngredient._id
})

const replaceBurgerFilling = (fillingIngredient) => ({
  type: REPLACE_BURGER_FILLING,
})

export {
  putBurgerBun,
  putBurgerFilling,
  deleteBurgerBun,
  deleteBurgerFilling,
  replaceBurgerFilling,
}
