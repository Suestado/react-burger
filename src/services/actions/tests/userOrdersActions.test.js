import {
  userOrdersConnect,
  userOrdersDisconnect,
  wsUserOrdersClose,
  wsUserOrdersConnecting,
  wsUserOrdersError,
  wsUserOrdersMessage,
  wsUserOrdersOpen,
} from '../userOrdersActions';
import {
  USER_ORDERS_CONNECTION,
  USER_ORDERS_DISCONNECT,
  WS_USER_ORDERS_CLOSE,
  WS_USER_ORDERS_CONNECTING,
  WS_USER_ORDERS_ERROR,
  WS_USER_ORDERS_MESSAGE,
  WS_USER_ORDERS_OPEN,
} from '../../../utils/constants';

describe('Action creators for userOrderActions', () => {
  it('should create an USER_ORDERS_CONNECTION', () => {

    const expectedAction = {
      type: USER_ORDERS_CONNECTION,
      payload: 'test url',
    };
    expect(userOrdersConnect('test url')).toEqual(expectedAction);
  });

  it('should create an USER_ORDERS_DISCONNECT', () => {
    const expectedAction = {
      type: USER_ORDERS_DISCONNECT,
    };
    expect(userOrdersDisconnect()).toEqual(expectedAction);
  });

  it('should create an WS_USER_ORDERS_CONNECTING', () => {
    const expectedAction = {
      type: WS_USER_ORDERS_CONNECTING,
    };
    expect(wsUserOrdersConnecting()).toEqual(expectedAction);
  });

  it('should create an WS_USER_ORDERS_OPEN', () => {
    const expectedAction = {
      type: WS_USER_ORDERS_OPEN,
    };
    expect(wsUserOrdersOpen()).toEqual(expectedAction);
  });

  it('should create an WS_USER_ORDERS_MESSAGE', () => {
    const expectedAction = {
      type: WS_USER_ORDERS_MESSAGE,
      payload: ['some data'],
    };
    expect(wsUserOrdersMessage(['some data'])).toEqual(expectedAction);
  });

  it('should create an WS_USER_ORDERS_CLOSE', () => {
    const expectedAction = {
      type: WS_USER_ORDERS_CLOSE,
    };
    expect(wsUserOrdersClose()).toEqual(expectedAction);
  });

  it('should create an WS_USER_ORDERS_ERROR', () => {
    const expectedAction = {
      type: WS_USER_ORDERS_ERROR,
      payload: 'err message',
    };
    expect(wsUserOrdersError('err message')).toEqual(expectedAction);
  });

});

