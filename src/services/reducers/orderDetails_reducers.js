import {
  GET_ORDER_STATUS,
  GET_ORDER_STATUS_SUCCESS,
  GET_ORDER_STATUS_FAILURE,
} from '../../utils/constants';

const initialState = {
  orderNumber: null,
  name: '',
  getRequestProcessing: false,
  getRequestFailure: false,
};

const getOrderStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_STATUS: {
      return {
        ...state,
        getRequestProcessing: true,
        getRequestFailure: false,
      };
    }
    case GET_ORDER_STATUS_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        name: action.name,
        getRequestProcessing: false,
      };
    }
    case GET_ORDER_STATUS_FAILURE: {
      return {
        ...state,
        getRequestProcessing: false,
        getRequestFailure: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default getOrderStatusReducer;
