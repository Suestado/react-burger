import burgerConstructorReducer from '../burgerConstructorReducers';
import {
  CLEAR_BURGER_FILLINGS,
  DELETE_BURGER_FILLING,
  PUT_BURGER_BUN,
  PUT_BURGER_FILLING,
  REPLACE_BURGER_BUN, REPLACE_BURGER_FILLING,
} from '../../../utils/constants';
import { testIngredient } from '../../actions/tests/testData';


describe('reducer for burgerConstructorReducers', () => {
  it('should return the initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual({
      customerBurgerIngredients: [],
    });
  });

  it('should handle PUT_BURGER_BUN', () => {
    expect(
      burgerConstructorReducer({ customerBurgerIngredients: [] }, {
        type: PUT_BURGER_BUN,
        bunIngredient: testIngredient,
      }),
    ).toEqual({ customerBurgerIngredients: [testIngredient, testIngredient] },
    );
  });

  it('should handle PUT_BURGER_FILLING', () => {
    expect(
      burgerConstructorReducer({ customerBurgerIngredients: [] }, {
        type: PUT_BURGER_FILLING,
        fillingIngredient: testIngredient,
      }),
    ).toEqual({ customerBurgerIngredients: [testIngredient] },
    );
  });

  it('should handle REPLACE_BURGER_BUN', () => {
    expect(
      burgerConstructorReducer({
        customerBurgerIngredients: [
          { ...testIngredient, testID: 1 },
          { ...testIngredient, testID: 1 },
        ],
      }, {
        type: REPLACE_BURGER_BUN,
        newBun: { ...testIngredient, testID: 2 },
      }),
    ).toEqual({
        customerBurgerIngredients: [
          { ...testIngredient, testID: 2 },
          { ...testIngredient, testID: 2 },
        ],
      },
    );
  });

  it('should handle DELETE_BURGER_FILLING', () => {
    expect(
      burgerConstructorReducer({
        customerBurgerIngredients: [
          { ...testIngredient, testID: 1 },
          { ...testIngredient, testID: 2 },
          { ...testIngredient, testID: 3 },
        ],
      }, {
        type: DELETE_BURGER_FILLING,
        deleteIngredientIndex: 1,
      }),
    ).toEqual({
        customerBurgerIngredients: [
          { ...testIngredient, testID: 1 },
          { ...testIngredient, testID: 3 },
        ],
      },
    );
  });

  it('should handle REPLACE_BURGER_FILLING', () => {
    expect(
      burgerConstructorReducer({
        customerBurgerIngredients: [
          { ...testIngredient, testID: 1 },
          { ...testIngredient, testID: 2 },
          { ...testIngredient, testID: 3 },
        ],
      }, {
        type: REPLACE_BURGER_FILLING,
        newIngredientsList: [
          { ...testIngredient, testID: 1 },
          { ...testIngredient, testID: 3 },
          { ...testIngredient, testID: 2 },
        ],
      }),
    ).toEqual({
        customerBurgerIngredients: [
          { ...testIngredient, testID: 1 },
          { ...testIngredient, testID: 3 },
          { ...testIngredient, testID: 2 },
        ],
      },
    );
  });

  it('should handle CLEAR_BURGER_FILLINGS', () => {
    expect(
      burgerConstructorReducer({
        customerBurgerIngredients: [
          { ...testIngredient, testID: 1 },
          { ...testIngredient, testID: 2 },
          { ...testIngredient, testID: 3 },
        ],
      }, {
        type: CLEAR_BURGER_FILLINGS,
      }),
    ).toEqual({ customerBurgerIngredients: [] },
    );
  });

});


