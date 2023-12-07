import { orderLineReducer } from '../orderLineReducers';
import getOrderStatusReducer from '../orderDetailsReducers';
import { GET_ORDER_STATUS } from '../../../utils/constants';

const initialState = {
  status: 'OFFLINE',
  orderLineData: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  error: '',
};

describe('reducer for orderLineReducers', () => {
  it('should return the initial state', () => {
    expect(orderLineReducer(undefined, {})).toEqual(initialState);
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
});
