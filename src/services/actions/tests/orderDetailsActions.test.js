import thunk from 'redux-thunk';
import { testIngredient } from './testData';
import {
  CLEAR_BURGER_FILLINGS,
  CLEAR_ORDER_STATUS,
  GET_ORDER_STATUS,
  GET_ORDER_STATUS_SUCCESS,
} from '../../../utils/constants';
import { clearOrderStatus, getOrderStatus } from '../orderDetailsActions';

const configureMockStore = require('redux-mock-store').default;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions for orderDetailsAction', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        { result: 'OK' },
      ),
      ok: true,
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should creates GET_ORDER_STATUS_SUCCESS when fetching has been done', () => {
    fetch.mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        name: 'test',
        order: {
          number: 12345,
        },
      }),
    }));

    const expectedActions = [
      { type: GET_ORDER_STATUS },
      { type: GET_ORDER_STATUS_SUCCESS, orderNumber: 12345, name: 'test' },
      { type: CLEAR_BURGER_FILLINGS },
    ];
    const store = mockStore({});

    return store.dispatch(getOrderStatus([testIngredient])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should creates CLEAR_ORDER_STATUS when fetching has been done', function () {
    const expectedAction = {
      type: CLEAR_ORDER_STATUS,
    };
    expect(clearOrderStatus()).toEqual(expectedAction);
  });
});
