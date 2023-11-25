//Actions constants

const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
const GET_INGREDIENTS_FAILURE: 'GET_INGREDIENTS_FAILURE' = 'GET_INGREDIENTS_FAILURE';

const GET_INGREDIENT_DETAILS: 'GET_INGREDIENT_DETAILS' = 'GET_INGREDIENT_DETAILS';

const GET_ORDER_STATUS: 'GET_ORDER_STATUS' = 'GET_ORDER_STATUS';
const GET_ORDER_STATUS_SUCCESS: 'GET_ORDER_STATUS_SUCCESS' = 'GET_ORDER_STATUS_SUCCESS';
const GET_ORDER_STATUS_FAILURE: 'GET_ORDER_STATUS_FAILURE' = 'GET_ORDER_STATUS_FAILURE';
const CLEAR_ORDER_STATUS: 'CLEAR_ORDER_STATUS' = 'CLEAR_ORDER_STATUS';

const PUT_BURGER_BUN: 'PUT_BURGER_BUN' = 'PUT_BURGER_BUN';
const PUT_BURGER_FILLING: 'PUT_BURGER_FILLING' = 'PUT_BURGER_FILLING';
const REPLACE_BURGER_BUN: 'REPLACE_BURGER_BUN' = 'REPLACE_BURGER_BUN';
const DELETE_BURGER_FILLING: 'DELETE_BURGER_FILLING' = 'DELETE_BURGER_FILLING';
const REPLACE_BURGER_FILLING: 'REPLACE_BURGER_FILLING' = 'REPLACE_BURGER_FILLING';

const GET_USER_CREDENTIALS: 'GET_USER_CREDENTIALS' = 'GET_USER_CREDENTIALS';
const GET_USER_CREDENTIALS_SUCCESS: 'GET_USER_CREDENTIALS_SUCCESS' = 'GET_USER_CREDENTIALS_SUCCESS';
const GET_USER_CREDENTIALS_FAILURE: 'GET_USER_CREDENTIALS_FAILURE' = 'GET_USER_CREDENTIALS_FAILURE';
const USER_LOGOUT: 'USER_LOGOUT' = 'USER_LOGOUT';
const USER_RESET_FAILURE: 'USER_RESET_FAILURE' = 'USER_RESET_FAILURE';

const ORDER_LINE_CONNECTION: 'ORDER_LINE_CONNECTION' = 'ORDER_LINE_CONNECTION';
const ORDER_LINE_DISCONNECT: 'ORDER_LINE_DISCONNECT' = 'ORDER_LINE_DISCONNECT';
const WS_ORDER_LINE_CONNECTING: 'WS_ORDER_LINE_CONNECTING' = 'WS_ORDER_LINE_CONNECTING';
const WS_ORDER_LINE_OPEN: 'WS_ORDER_LINE_OPEN' = 'WS_ORDER_LINE_OPEN';
const WS_ORDER_LINE_MESSAGE: 'WS_ORDER_LINE_MESSAGE' = 'WS_ORDER_LINE_MESSAGE';
const WS_ORDER_LINE_CLOSE: 'WS_ORDER_LINE_CLOSE' = 'WS_ORDER_LINE_CLOSE';
const WS_ORDER_LINE_ERROR: 'WS_ORDER_LINE_ERROR' = 'WS_ORDER_LINE_ERROR';
const WS_SERVER_ALL_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all'

export {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE,
  GET_INGREDIENT_DETAILS,
  GET_ORDER_STATUS,
  GET_ORDER_STATUS_SUCCESS,
  GET_ORDER_STATUS_FAILURE,
  CLEAR_ORDER_STATUS,
  PUT_BURGER_BUN,
  PUT_BURGER_FILLING,
  REPLACE_BURGER_BUN,
  DELETE_BURGER_FILLING,
  REPLACE_BURGER_FILLING,
  GET_USER_CREDENTIALS,
  GET_USER_CREDENTIALS_SUCCESS,
  GET_USER_CREDENTIALS_FAILURE,
  USER_LOGOUT,
  USER_RESET_FAILURE,
  ORDER_LINE_CONNECTION,
  ORDER_LINE_DISCONNECT,
  WS_ORDER_LINE_CONNECTING,
  WS_ORDER_LINE_OPEN,
  WS_ORDER_LINE_MESSAGE,
  WS_ORDER_LINE_CLOSE,
  WS_ORDER_LINE_ERROR,
  WS_SERVER_ALL_ORDERS_URL,
};
