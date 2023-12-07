import getOrderStatusReducer from '../orderDetailsReducers';
import {
  GET_ORDER_STATUS,
  GET_ORDER_STATUS_FAILURE,
  GET_ORDER_STATUS_SUCCESS,
} from '../../../utils/constants';

const initialState = {
  orderNumber: null,
  name: '',
  orderRequestProcessing: false,
  orderRequestFailure: false,
};

describe('reducer for orderDetailsReducers', () => {
  it('should return the initial state', () => {
    expect(getOrderStatusReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_ORDER_STATUS', () => {
    expect(
      getOrderStatusReducer(initialState, {
        type: GET_ORDER_STATUS,
      }),
    ).toEqual({
      ...initialState,
      orderRequestProcessing: true,
      orderRequestFailure: false,
    });
  });

  it('should handle GET_ORDER_STATUS_SUCCESS', () => {
    expect(
      getOrderStatusReducer({ ...initialState, orderRequestProcessing: true }, {
        type: GET_ORDER_STATUS_SUCCESS,
        orderNumber: 12345,
        name: 'Test name',
      }),
    ).toEqual({
      ...initialState,
      orderNumber: 12345,
      name: 'Test name',
      orderRequestProcessing: false,
    });
  });

  it('should handle GET_ORDER_STATUS_FAILURE', () => {
    expect(
      getOrderStatusReducer({ ...initialState, orderRequestProcessing: true }, {
        type: GET_ORDER_STATUS_FAILURE,
      }),
    ).toEqual({
      ...initialState,
      orderRequestProcessing: false,
      orderRequestFailure: true,
    });
  });
});
