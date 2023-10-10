import {
  GET_ORDER_STATUS,
  GET_ORDER_STATUS_SUCCESS,
  GET_ORDER_STATUS_FAILURE,
  CLEAR_ORDER_STATUS,
} from '../../utils/constants';

const initialState = {
  orderNumber: null,
  name: '',
  orderRequestProcessing: false,
  orderRequestFailure: false,
};

const getOrderStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_STATUS: {
      return {
        ...state,
        orderRequestProcessing: true,
        orderRequestFailure: false,
      };
    }
    case GET_ORDER_STATUS_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        name: action.name,
        orderRequestProcessing: false,
      };
    }
    case GET_ORDER_STATUS_FAILURE: {
      return {
        ...state,
        orderRequestProcessing: false,
        orderRequestFailure: true,
      };
    }
    case CLEAR_ORDER_STATUS: {
      return {
        ...initialState
      }
    }
    default: {
      return state;
    }
  }
};

export default getOrderStatusReducer;
