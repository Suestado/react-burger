import { nanoid } from 'nanoid';
import {
  PUT_BURGER_BUN,
  PUT_BURGER_FILLING,
  REPLACE_BURGER_BUN,
  DELETE_BURGER_FILLING,
  REPLACE_BURGER_FILLING,
  CLEAR_BURGER_FILLINGS,
} from '../../utils/constants';
import { IngredientInterface } from "../../utils/commonTypes";

export interface IPutBurgerBunAction {
  readonly type: typeof PUT_BURGER_BUN;
  bunIngredient: IngredientInterface;
}

export interface IPutBurgerFillingAction {
  readonly type: typeof PUT_BURGER_FILLING;
  fillingIngredient: IngredientInterface;
}

export interface IReplaceBurgerBunAction {
  readonly type: typeof REPLACE_BURGER_BUN;
  newBun: IngredientInterface;
}

export interface IDeleteBurgerFillingAction {
  readonly type: typeof DELETE_BURGER_FILLING;
  deleteIngredientIndex: number;
}

export interface IReplaceBurgerFillingAction {
  readonly type: typeof REPLACE_BURGER_FILLING;
  newIngredientsList: IngredientInterface[]
}

export interface IClearBurgerFillings {
  readonly type: typeof CLEAR_BURGER_FILLINGS;
}

export type UTBurgerConstructorActions =
  IPutBurgerBunAction |
  IPutBurgerFillingAction |
  IReplaceBurgerBunAction |
  IDeleteBurgerFillingAction |
  IReplaceBurgerFillingAction |
  IClearBurgerFillings;

const putBurgerBun = (bunIngredient: IngredientInterface): IPutBurgerBunAction => ({
  type: PUT_BURGER_BUN,
  bunIngredient: {...bunIngredient, id: nanoid()},
});

const putBurgerFilling = (fillingIngredient: IngredientInterface): IPutBurgerFillingAction => ({
  type: PUT_BURGER_FILLING,
  fillingIngredient: {...fillingIngredient, id: nanoid()},
});

const replaceBurgerBun = (newBun: IngredientInterface): IReplaceBurgerBunAction => ({
  type: REPLACE_BURGER_BUN,
  newBun: newBun,
});

const deleteBurgerFilling = (fillingIngredientIndex: number): IDeleteBurgerFillingAction => ({
  type: DELETE_BURGER_FILLING,
  deleteIngredientIndex: fillingIngredientIndex,
});

const replaceBurgerFilling = (newIngredientsList: IngredientInterface[]): IReplaceBurgerFillingAction => ({
  type: REPLACE_BURGER_FILLING,
  newIngredientsList: newIngredientsList,
});

const clearBurgerFillings = (): IClearBurgerFillings => ({
  type: CLEAR_BURGER_FILLINGS,
})

export {
  putBurgerBun,
  putBurgerFilling,
  replaceBurgerBun,
  deleteBurgerFilling,
  replaceBurgerFilling,
  clearBurgerFillings,
};
