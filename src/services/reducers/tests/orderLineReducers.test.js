import { orderLineReducer } from '../orderLineReducers';
import {
  WS_ORDER_LINE_CLOSE,
  WS_ORDER_LINE_CONNECTING, WS_ORDER_LINE_ERROR,
  WS_ORDER_LINE_MESSAGE,
  WS_ORDER_LINE_OPEN,
} from '../../../utils/constants';

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

  it('should handle WS_ORDER_LINE_CONNECTING', () => {
    expect(
      orderLineReducer(initialState, {
        type: WS_ORDER_LINE_CONNECTING,
      }),
    ).toEqual({
      ...initialState,
      status: 'CONNECTING...',
    });
  });

  it('should handle WS_ORDER_LINE_OPEN', () => {
    expect(
      orderLineReducer(initialState, {
        type: WS_ORDER_LINE_OPEN,
      }),
    ).toEqual({
      ...initialState,
      status: 'ONLINE',
    });
  });

  it('should handle WS_ORDER_LINE_CLOSE', () => {
    expect(
      orderLineReducer(initialState, {
        type: WS_ORDER_LINE_CLOSE,
      }),
    ).toEqual({
      ...initialState,
      status: 'OFFLINE',
    });
  });

  it('should handle WS_ORDER_LINE_ERROR', () => {
    expect(
      orderLineReducer(initialState, {
        type: WS_ORDER_LINE_ERROR,
        payload: 'err message',
      }),
    ).toEqual({
      ...initialState,
      status: 'OFFLINE',
      error: 'err message',
    });
  });

  it('should handle WS_ORDER_LINE_MESSAGE', () => {
    const orderLineDataTest = {
      success: true,
      orders: [{ order_1: '' }, { order_2: '' }],
      total: 1,
      totalToday: 1,
    };

    expect(
      orderLineReducer(initialState, {
        type: WS_ORDER_LINE_MESSAGE,
        payload: orderLineDataTest,
      }),
    ).toEqual({
      ...initialState,
      orderLineData: orderLineDataTest,
    });
  });
});
