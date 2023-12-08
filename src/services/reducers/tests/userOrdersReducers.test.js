import { userOrdersReducer } from '../userOrdersReducers';
import {
  WS_USER_ORDERS_CLOSE,
  WS_USER_ORDERS_CONNECTING,
  WS_USER_ORDERS_ERROR,
  WS_USER_ORDERS_MESSAGE,
  WS_USER_ORDERS_OPEN,
} from '../../../utils/constants';

const initialState = {
  status: 'OFFLINE',
  userOrdersData: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  error: '',
};

describe('reducer for userOrdersReducers', () => {
  it('should return the initial state', () => {
    expect(userOrdersReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle WS_USER_ORDERS_CONNECTING', () => {
    expect(
      userOrdersReducer(initialState, {
        type: WS_USER_ORDERS_CONNECTING,
      }),
    ).toEqual({
      ...initialState,
      status: 'CONNECTING...',
    });
  });

  it('should handle WS_USER_ORDERS_OPEN', () => {
    expect(
      userOrdersReducer(initialState, {
        type: WS_USER_ORDERS_OPEN,
      }),
    ).toEqual({
      ...initialState,
      status: 'ONLINE',
    });
  });

  it('should handle WS_USER_ORDERS_CLOSE', () => {
    expect(
      userOrdersReducer(initialState, {
        type: WS_USER_ORDERS_CLOSE,
      }),
    ).toEqual({
      ...initialState,
      status: 'OFFLINE',
    });
  });

  it('should handle WS_USER_ORDERS_ERROR', () => {
    expect(
      userOrdersReducer(initialState, {
        type: WS_USER_ORDERS_ERROR,
        payload: 'err message',
      }),
    ).toEqual({
      ...initialState,
      status: 'OFFLINE',
      error: 'err message',
    });
  });

  it('should handle WS_USER_ORDERS_MESSAGE', () => {
    const orderLineDataTest = {
      success: true,
      orders: [{ order_1: '' }, { order_2: '' }],
      total: 1,
      totalToday: 1,
    };

    expect(
      userOrdersReducer(initialState, {
        type: WS_USER_ORDERS_MESSAGE,
        payload: orderLineDataTest,
      }),
    ).toEqual({
      ...initialState,
      userOrdersData: orderLineDataTest,
    });
  });
})
