import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE,
} from '../../utils/constants';
import MainApi from '../../utils/MainApi';

function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });
    MainApi.getIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            fullIngredientList: res.data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILURE,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILURE,
        });
        console.error(err)
      });
  };
}

export default getIngredients;

