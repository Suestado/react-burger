import { createReducer } from "@reduxjs/toolkit";
import {
  wsUserOrdersConnecting,
  wsUserOrdersOpen,
  wsUserOrdersMessage,
  wsUserOrdersClose,
  wsUserOrdersError,
} from "../actions/userOrdersActions";
import { WebSocketStatus } from "./orderLineReducers";
import { IOrderLineData } from "../actions/orderLineActions";

interface IUserOrdersState {
  status: WebSocketStatus;
  userOrdersData: IOrderLineData;
  error: string;
}

export const userOrdersInitialState: IUserOrdersState = {
  status: WebSocketStatus.OFFLINE,
  userOrdersData: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  error: ''
}

export const userOrdersReducer = createReducer(userOrdersInitialState, (builder => {
  builder
    .addCase(wsUserOrdersConnecting, (state) => {
      state.status = WebSocketStatus.CONNECTING;
    })
    .addCase(wsUserOrdersOpen, (state) => {
      state.status = WebSocketStatus.ONLINE;
      state.error = '';
    })
    .addCase(wsUserOrdersClose, (state) => {
      state.status = WebSocketStatus.OFFLINE;
      state.error = '';
    })
    .addCase(wsUserOrdersError, (state, action) => {
      state.status = WebSocketStatus.OFFLINE;
      state.error = action.payload;
    })
    .addCase(wsUserOrdersMessage, (state, action) => {
      state.userOrdersData = action.payload
    })
}))
