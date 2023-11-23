import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE,
} from '../../utils/constants';
import { IngredientInterface } from "../../utils/commonTypes";
import { TApplicationActions } from "../actions/types";

interface IFullIngredientsState {
  fullIngredientList: IngredientInterface[],
  getRequestProcessing: boolean,
  getRequestFailure: boolean,
}

const initialState: IFullIngredientsState = {
  fullIngredientList: [],
  getRequestProcessing: false,
  getRequestFailure: false,
};

const getIngredientsReducer = (state = initialState, action: TApplicationActions) => {
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
