import {
  ORDER_LINE_CONNECTION,
  ORDER_LINE_DISCONNECT, WS_ORDER_LINE_CLOSE,
  WS_ORDER_LINE_CONNECTING, WS_ORDER_LINE_ERROR, WS_ORDER_LINE_MESSAGE,
  WS_ORDER_LINE_OPEN,
} from '../../../utils/constants';
import {
  orderLineConnect,
  orderLineDisconnect, wsOrderLineClose,
  wsOrderLineConnecting, wsOrderLineError,
  wsOrderLineMessage,
  wsOrderLineOpen,
} from '../orderLineActions';


describe('Action creators for orderLineActions', () => {
  it('should create an ORDER_LINE_CONNECTION', () => {

    const expectedAction = {
      type: ORDER_LINE_CONNECTION,
      payload: 'test url',
    };
    expect(orderLineConnect('test url')).toEqual(expectedAction);
  });

  it('should create an ORDER_LINE_DISCONNECT', () => {
    const expectedAction = {
      type: ORDER_LINE_DISCONNECT,
    };
    expect(orderLineDisconnect()).toEqual(expectedAction);
  });

  it('should create an WS_ORDER_LINE_CONNECTING', () => {
    const expectedAction = {
      type: WS_ORDER_LINE_CONNECTING,
    };
    expect(wsOrderLineConnecting()).toEqual(expectedAction);
  });

  it('should create an WS_ORDER_LINE_OPEN', () => {
    const expectedAction = {
      type: WS_ORDER_LINE_OPEN,
    };
    expect(wsOrderLineOpen()).toEqual(expectedAction);
  });

  it('should create an WS_ORDER_LINE_MESSAGE', () => {
    const expectedAction = {
      type: WS_ORDER_LINE_MESSAGE,
      payload: ['some data'],
    };
    expect(wsOrderLineMessage(['some data'])).toEqual(expectedAction);
  });

  it('should create an WS_ORDER_LINE_CLOSE', () => {
    const expectedAction = {
      type: WS_ORDER_LINE_CLOSE,
    };
    expect(wsOrderLineClose()).toEqual(expectedAction);
  });

  it('should create an WS_ORDER_LINE_ERROR', () => {
    const expectedAction = {
      type: WS_ORDER_LINE_ERROR,
      payload: 'err message',
    };
    expect(wsOrderLineError('err message')).toEqual(expectedAction);
  });

});

