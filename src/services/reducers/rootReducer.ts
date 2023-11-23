import { combineReducers } from 'redux';
import getIngredientsReducer from './fullIngredientsListReducers';
import getOrderStatusReducer from './orderDetailsReducers';
import burgerConstructorReducer from './burgerConstructorReducers';
import getUserCredentialsReducer from './userReducers';

const rootReducer = combineReducers({
  ingredients: getIngredientsReducer,
  orderStatus: getOrderStatusReducer,
  customerBurger: burgerConstructorReducer,
  currentUser: getUserCredentialsReducer,
});

export default rootReducer;
