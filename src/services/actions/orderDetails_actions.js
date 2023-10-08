import {
  GET_ORDER_STATUS,
  GET_ORDER_STATUS_SUCCESS,
  GET_ORDER_STATUS_FAILURE,
} from '../../utils/constants';
import OrderApi from '../../utils/OrderApi';

function getOrderStatus(ingredients) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_STATUS,
    });
    OrderApi.getOrderNumber(ingredients)
      .then((res) => {
        if (res && res.success) {
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
        })
        console.error(err)
      });
  };
}

export default getOrderStatus;
