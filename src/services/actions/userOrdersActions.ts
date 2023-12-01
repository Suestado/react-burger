import {
  USER_ORDERS_CONNECTION,
  USER_ORDERS_DISCONNECT,
  WS_USER_ORDERS_CONNECTING,
  WS_USER_ORDERS_OPEN,
  WS_USER_ORDERS_MESSAGE,
  WS_USER_ORDERS_CLOSE,
  WS_USER_ORDERS_ERROR,
} from '../../utils/constants';
import { createAction } from "@reduxjs/toolkit";
import { IOrderData } from "./orderLineActions";

export interface IUserOrdersData {
  success: boolean;
  orders: IOrderData[];
  total: number;
  totalToday: number;
}

//принимает экшен, в дженерике принимает 2 типа: тип payload и тип action. Тип action можно передать просто строкой без typeof
const userOrdersConnect = createAction<string, typeof USER_ORDERS_CONNECTION>(USER_ORDERS_CONNECTION);
const userOrdersDisconnect = createAction<undefined, typeof USER_ORDERS_DISCONNECT>(USER_ORDERS_DISCONNECT);
const wsUserOrdersConnecting = createAction<undefined, typeof WS_USER_ORDERS_CONNECTING>(WS_USER_ORDERS_CONNECTING);
const wsUserOrdersOpen = createAction<undefined, typeof WS_USER_ORDERS_OPEN>(WS_USER_ORDERS_OPEN);
const wsUserOrdersMessage = createAction<IUserOrdersData, typeof WS_USER_ORDERS_MESSAGE>(WS_USER_ORDERS_MESSAGE);
const wsUserOrdersClose = createAction<undefined, typeof WS_USER_ORDERS_CLOSE>(WS_USER_ORDERS_CLOSE);
const wsUserOrdersError = createAction<string, typeof WS_USER_ORDERS_ERROR>(WS_USER_ORDERS_ERROR);

export type UTUserOrdersActions =
  ReturnType<typeof userOrdersConnect> |
  ReturnType<typeof userOrdersDisconnect> |
  ReturnType<typeof wsUserOrdersConnecting> |
  ReturnType<typeof wsUserOrdersOpen> |
  ReturnType<typeof wsUserOrdersMessage> |
  ReturnType<typeof wsUserOrdersClose> |
  ReturnType<typeof wsUserOrdersError>;

export const wsUserOrdersActions = {
  wsConnect: userOrdersConnect,
  wsDisconnect: userOrdersDisconnect,
  wsConnecting: wsUserOrdersConnecting,
  onOpen: wsUserOrdersOpen,
  onClose: wsUserOrdersMessage,
  onError: wsUserOrdersClose,
  onMessage: wsUserOrdersError,
}

export {
  userOrdersConnect,
  userOrdersDisconnect,
  wsUserOrdersConnecting,
  wsUserOrdersOpen,
  wsUserOrdersMessage,
  wsUserOrdersClose,
  wsUserOrdersError,
}
