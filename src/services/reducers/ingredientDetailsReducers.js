import {
  GET_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
} from '../../utils/constants';

const initialState = {
  modalIngredient: {
    name: '',
    image_large: '',
    calories: null,
    proteins: null,
    fat: null,
    carbohydrates: null,
  },
};

const modalIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENT_DETAILS: {
      return {
        name: action.name,
        image_large: action.image_large,
        calories: action.calories,
        proteins: action.proteins,
        fat: action.fat,
        carbohydrates: action.carbohydrates,
      };
    }
    case DELETE_INGREDIENT_DETAILS: {
      return {
        ...initialState.modalIngredient
      };
    }
    default: {
      return state;
    }
  }
};

export default modalIngredientReducer;
