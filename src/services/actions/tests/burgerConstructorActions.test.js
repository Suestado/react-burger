import {
  CLEAR_BURGER_FILLINGS,
  DELETE_BURGER_FILLING,
  PUT_BURGER_BUN,
  PUT_BURGER_FILLING,
  REPLACE_BURGER_BUN, REPLACE_BURGER_FILLING,
} from '../../../utils/constants';
import { testIngredient } from './testData';
import {
  clearBurgerFillings,
  deleteBurgerFilling,
  putBurgerBun,
  putBurgerFilling,
  replaceBurgerBun,
  replaceBurgerFilling,
} from '../burgerConstructorActions';


describe('Action creators', () => {
  it('should create an PUT_BURGER_BUN action with correct bun ingredients', () => {

    const expectedAction = {
      type: PUT_BURGER_BUN,
      bunIngredient: testIngredient
    }
    expect(putBurgerBun(testIngredient)).toMatchObject(expectedAction)
  })

  it('should create an PUT_BURGER_FILLING action with correct bun ingredients', () => {

    const expectedAction = {
      type: PUT_BURGER_FILLING,
      fillingIngredient: testIngredient
    }
    expect(putBurgerFilling(testIngredient)).toMatchObject(expectedAction)
  })

  it('should create an REPLACE_BURGER_BUN action with correct bun ingredients', () => {

    const expectedAction = {
      type: REPLACE_BURGER_BUN,
      newBun: testIngredient
    }
    expect(replaceBurgerBun(testIngredient)).toEqual(expectedAction)
  })

  it('should create an DELETE_BURGER_FILLING action with correct index', () => {

    const expectedAction = {
      type: DELETE_BURGER_FILLING,
      deleteIngredientIndex: 0
    }
    expect(deleteBurgerFilling(0)).toEqual(expectedAction)
  })

  it('should create an REPLACE_BURGER_FILLING action with correct array', () => {
    const newOrderArray = [
      {...testIngredient, testId: 1},
      {...testIngredient, testId: 2},
      {...testIngredient, testId: 3}
    ]
    const expectedAction = {
      type: REPLACE_BURGER_FILLING,
      newIngredientsList: newOrderArray,
    }
    expect(replaceBurgerFilling(newOrderArray)).toEqual(expectedAction)
  })

  it('should create an CLEAR_BURGER_FILLINGS action with correct array', () => {
    const expectedAction = {
      type: CLEAR_BURGER_FILLINGS,
    }
    expect(clearBurgerFillings()).toEqual(expectedAction)
  })
})
