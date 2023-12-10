import burgerConstructorReducer from '../burgerConstructorReducers';
import {
  CLEAR_BURGER_FILLINGS,
  DELETE_BURGER_FILLING,
  PUT_BURGER_BUN,
  PUT_BURGER_FILLING,
  REPLACE_BURGER_BUN, REPLACE_BURGER_FILLING,
} from '../../../utils/constants';
import { testIngredient } from '../../actions/tests/testData';

const burgerIngredients = [
  { ...testIngredient, testID: 1 },
  { ...testIngredient, testID: 2 },
  { ...testIngredient, testID: 3 },
];

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
        customerBurgerIngredients: burgerIngredients,
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
    const payload = [
      { ...testIngredient, testID: 1 },
      { ...testIngredient, testID: 3 },
      { ...testIngredient, testID: 2 },
    ];

    expect(
      burgerConstructorReducer({
        customerBurgerIngredients: burgerIngredients,
      }, {
        type: REPLACE_BURGER_FILLING,
        newIngredientsList: payload,
      }),
    ).toEqual({
        customerBurgerIngredients: payload,
      },
    );
  });

  it('should handle CLEAR_BURGER_FILLINGS', () => {
    expect(
      burgerConstructorReducer({
        customerBurgerIngredients: burgerIngredients,
      }, {
        type: CLEAR_BURGER_FILLINGS,
      }),
    ).toEqual({ customerBurgerIngredients: [] },
    );
  });

});


