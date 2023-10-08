import { combineReducers } from 'redux';
import getIngredientsReducer from './fullIngredientsList_reducers';
import modalIngredientReducer from './ingredientDetails_reducers';
import getOrderStatusReducer from './orderDetails_reducers';
import burgerConstructorReducer from './burgerConstructor_reducers';

const rootReducer = combineReducers({
  ingredients: getIngredientsReducer,
  modalIngredient: modalIngredientReducer,
  orderStatus: getOrderStatusReducer,
  customerBurger: burgerConstructorReducer,
});

export default rootReducer;
