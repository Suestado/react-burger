import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE,
} from '../../utils/constants';
import { getIngredients as getIngredientsApi } from '../../utils/MainApi';
import { IngredientInterface } from "../../utils/commonTypes";
import { AppDispatch } from "./types";


interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS;
}

interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  fullIngredientList: IngredientInterface[];
}

interface IGetIngredientsFailureAction {
  readonly type: typeof GET_INGREDIENTS_FAILURE;
}

export type UTFullIngredientsActions =
  IGetIngredientsAction |
  IGetIngredientsSuccessAction |
  IGetIngredientsFailureAction;

const getIngredients = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS
  });
  getIngredientsApi()
    .then((res) => {
      console.log(res.data)
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          fullIngredientList: res.data,
        });
    })
    .catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_FAILURE,
      });
      console.error(err);
    });
};


export default getIngredients;

