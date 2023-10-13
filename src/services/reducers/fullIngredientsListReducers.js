import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE,
} from '../../utils/constants';

const initialState = {
  fullIngredientList: [],
  getRequestProcessing: false,
  getRequestFailure: false,
};

const getIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS : {
      return {
        ...state,
        getRequestProcessing: true,
        getRequestFailure: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        fullIngredientList: action.fullIngredientList,
        getRequestProcessing: false,
      };
    }
    case GET_INGREDIENTS_FAILURE: {
      return {
        ...state,
        getRequestProcessing: false,
        getRequestFailure: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default getIngredientsReducer;
