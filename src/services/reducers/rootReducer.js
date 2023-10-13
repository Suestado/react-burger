import { combineReducers } from 'redux';
import getIngredientsReducer from './fullIngredientsListReducers';
import modalIngredientReducer from './ingredientDetailsReducers';
import getOrderStatusReducer from './orderDetailsReducers';
import burgerConstructorReducer from './burgerConstructorReducers';

const rootReducer = combineReducers({
  ingredients: getIngredientsReducer,
  modalIngredient: modalIngredientReducer,
  orderStatus: getOrderStatusReducer,
  customerBurger: burgerConstructorReducer,
});

export default rootReducer;
