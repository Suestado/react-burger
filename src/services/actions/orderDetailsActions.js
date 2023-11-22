import {
  GET_ORDER_STATUS,
  GET_ORDER_STATUS_SUCCESS,
  GET_ORDER_STATUS_FAILURE,
  CLEAR_ORDER_STATUS,
} from '../../utils/constants';
import { getOrderNumber } from '../../utils/MainApi';

function getOrderStatus(ingredients) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_STATUS,
    });
    getOrderNumber(ingredients)
      .then((res) => {
        if (res) {
          dispatch({
            type: GET_ORDER_STATUS_SUCCESS,
            orderNumber: res.order.number,
            name: res.name,
          });
        } else {
          dispatch({
            type: GET_ORDER_STATUS_FAILURE,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_STATUS_FAILURE,
        });
        console.error(err);
      });
  };
}

const clearOrderStatus = () => ({
  type: CLEAR_ORDER_STATUS,
});

export {
  getOrderStatus,
  clearOrderStatus,
};
