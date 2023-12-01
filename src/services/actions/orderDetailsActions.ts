import {
  GET_ORDER_STATUS,
  GET_ORDER_STATUS_SUCCESS,
  GET_ORDER_STATUS_FAILURE,
  CLEAR_ORDER_STATUS,
} from '../../utils/constants';
import { getOrderNumber } from '../../utils/MainApi';
import { AppDispatch } from "./types";

interface IGetOrderStatusAction {
  readonly type: typeof GET_ORDER_STATUS;
}

interface IGetOrderStatusSuccessAction {
  readonly type: typeof GET_ORDER_STATUS_SUCCESS;
  orderNumber: number,
  name: string,
}

interface IGetOrderStatusFailureAction {
  readonly type: typeof GET_ORDER_STATUS_FAILURE;
}

interface IClearOrderStatus {
  readonly type: typeof CLEAR_ORDER_STATUS;
}

export type UTOrderDetails =
  IGetOrderStatusAction |
  IGetOrderStatusSuccessAction |
  IGetOrderStatusFailureAction |
  IClearOrderStatus;

const getOrderStatus = (ingredients: string[]) => (dispatch: AppDispatch) => {
  const token: string | null = localStorage.getItem('accessToken')
  dispatch({
    type: GET_ORDER_STATUS,
  });
  getOrderNumber(ingredients, token)
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

const clearOrderStatus = (): IClearOrderStatus => ({
  type: CLEAR_ORDER_STATUS,
});

export {
  getOrderStatus,
  clearOrderStatus,
};
