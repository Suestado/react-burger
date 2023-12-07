import getIngredientsReducer from '../fullIngredientsListReducers';
import { GET_INGREDIENTS, GET_INGREDIENTS_FAILURE, GET_INGREDIENTS_SUCCESS } from '../../../utils/constants';
import { testIngredient } from '../../actions/tests/testData';

const initialState = {
  fullIngredientList: [],
  getRequestProcessing: false,
  getRequestFailure: false,
};

describe('reducer for fullIngredientsListReducer', () => {
  it('should return the initial state', () => {
    expect(getIngredientsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_INGREDIENTS', () => {
    expect(getIngredientsReducer(initialState, {
      type: GET_INGREDIENTS,
    })).toEqual({
      ...initialState,
      getRequestProcessing: true,
      getRequestFailure: false,
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(getIngredientsReducer({ ...initialState, getRequestProcessing: true }, {
      type: GET_INGREDIENTS_SUCCESS,
      fullIngredientList: [testIngredient, testIngredient, testIngredient],
    })).toEqual({
      ...initialState,
      getRequestProcessing: false,
      fullIngredientList: [testIngredient, testIngredient, testIngredient],
    });
  });

  it('should handle GET_INGREDIENTS_FAILURE', () => {
    expect(getIngredientsReducer(initialState, {
      type: GET_INGREDIENTS_FAILURE,
    })).toEqual({
      ...initialState,
      getRequestProcessing: false,
      getRequestFailure: true,
    });
  });
});
