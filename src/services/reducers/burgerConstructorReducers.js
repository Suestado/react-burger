import {
  PUT_BURGER_BUN,
  PUT_BURGER_FILLING,
  REPLACE_BURGER_BUN,
  DELETE_BURGER_FILLING,
  REPLACE_BURGER_FILLING,
} from '../../utils/constants';

const initialState = {
  customerBurgerIngredients: [],
};

const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_BURGER_BUN: {
      return {
        ...state,
        customerBurgerIngredients: [
          ...state.customerBurgerIngredients,
          action.bunIngredient,
          action.bunIngredient,
        ],
      };
    }
    case PUT_BURGER_FILLING: {
      return {
        ...state,
        customerBurgerIngredients: [
          ...state.customerBurgerIngredients,
          action.fillingIngredient,
        ],
      };
    }
    case REPLACE_BURGER_BUN: {
      return {
        ...state,
        customerBurgerIngredients: state.customerBurgerIngredients.map((item) => {
          return item.type === 'bun' ? action.newBun : item;
        }),
      };
    }
    case DELETE_BURGER_FILLING: {
      return {
        ...state,
        customerBurgerIngredients: state.customerBurgerIngredients.filter((item, index) => {
          return index !== action.deleteIngredientIndex;
        }),
      };
    }
    case REPLACE_BURGER_FILLING: {
      return {
        customerBurgerIngredients: action.newIngredientsList
      };
    }
    default: {
      return state;
    }
  }
};

export default burgerConstructorReducer;
