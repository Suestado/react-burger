import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from "../actions/types";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";

//здесь указываются стоковые типы экшенов, которые есть у самого WS.
export type TWSActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>,
  wsDisconnect: ActionCreatorWithoutPayload,
  wsConnecting: ActionCreatorWithoutPayload,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithPayload<string>,
  onMessage: ActionCreatorWithPayload<any>
}

//TODO
// @ts-ignore
export const socketMiddleware = (wsActions: TWSActionTypes): Middleware<{}, RootState> => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let isConnected: boolean = false;
    let reconnectTimer: number = 0;
    let url: string = '';

    return next => (action) => {
      const {dispatch} = store;
      const {
        wsConnect,
        wsConnecting,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsDisconnect
      } = wsActions;
      if (wsConnect.match(action)) {
        url = action.payload
        socket = new WebSocket(url);
        // socket = new WebSocket(`${url}?token=${user.token}`);
      }
      if (socket) {
        socket.onopen = () => {
          //TODO
// @ts-ignore
          dispatch(wsConnecting())
          //TODO
// @ts-ignore
          dispatch(onOpen());
          isConnected = true
        };

        socket.onerror = (event) => {
          //TODO
// @ts-ignore
          dispatch(onError(event.type));
        };

        socket.onmessage = (event) => {
          const {data} = event;
          const parsedData = JSON.parse(data);
//TODO
// @ts-ignore
          dispatch(onMessage(parsedData));
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            //TODO
// @ts-ignore
            dispatch(onError(event.code.toString()))
          }//TODO
// @ts-ignore
          dispatch(onClose());

          if (isConnected) {
            //TODO
// @ts-ignore
            dispatch(wsConnecting())
            reconnectTimer = window.setTimeout(() => {
              //TODO
// @ts-ignore
              dispatch(wsConnect(url))
            }, 3000)
          }
        };

        if (wsDisconnect.match(action)) {
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          //TODO
// @ts-ignore
          dispatch(onClose());
        }
      }

      next(action);
    };
  });
};
