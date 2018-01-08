import '../../../../testUtils/addJestMatchers';
import * as requestMiddleware from './requestMiddleware';
import { createRequestAction, RequestMiddlewareAction } from './requestMiddleware';

it('createRequestAction returns a request action', () => {
  const request = (_: string) => Promise.resolve('');
  const type = 'REQUEST_ACTION';
  const payload = 'testPayload';
  const actionCreator = requestMiddleware.createRequestAction(type, request);
  const action = actionCreator(payload);
  expect(action.type).toBe(type);
  expect(action.request).toBe(request);
  expect(action.payload).toBe(payload);
});

describe('middleware', () => {
  let middleware = requestMiddleware.createRequestMiddleware();
  const mockDispatch = jest.fn();
  const mockStore: any = {
    dispatch: mockDispatch,
  };
  const mockNext = jest.fn();
  const mockRequest = jest.fn(() => Promise.resolve(''));
  const mockRequestAction = createRequestAction('REQUEST_ACTION', mockRequest)();
  const mockAction = { type: 'ACTION' };

  beforeEach(() => {
    mockRequest.mockReturnValue(Promise.resolve('RESOLVED'));
    middleware = requestMiddleware.createRequestMiddleware();
  });

  it('calls next for actions that are not request actions', () => {
    middleware(mockStore)(mockNext)(mockAction);
    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('dispatches success action', async () => {
    await middleware(mockStore)(mockNext)(mockRequestAction);
    expect(mockDispatch).toBeCalledWithSnapshot();
  });

  it('dispatches error action', async () => {
    try {
      mockRequest.mockReturnValue(Promise.reject('REJECTION'));
      await middleware(mockStore)(mockNext)(mockRequestAction);
    } catch(_) {} //tslint:disable-line
    expect(mockDispatch).toBeCalledWithSnapshot();
  });

  it('returns cached request if is within expiration time', async () => {
    const first = await middleware(mockStore)(mockNext)(mockRequestAction);
    const second = await middleware(mockStore)(mockNext)(mockRequestAction);
    expect(first).toBe(second);
  });
});

describe('handleRequestAction', () => {
  const type = 'ACTION_TYPE';
  const requestedHandler = jest.fn();
  const successHandler = jest.fn();
  const errorHandler = jest.fn();
  const defaultState = {};
  const handler = requestMiddleware.handleRequestAction(type, {
    error: errorHandler,
    success: successHandler,
    requested: requestedHandler,
  }, defaultState);

  const getAction = (lifecycle: requestMiddleware.Lifecycle): RequestMiddlewareAction => ({
    type,
    payload: '',
    meta: {
      'request-middleware': lifecycle,
    },
  });

  it('defaults state', () => {
    const nextState = handler(undefined, {} as any);
    expect(nextState).toBe(defaultState);
  });

  it('ignores actions with non-matching type', () => {
    const nextState = handler(undefined, { type: type + 'OTHER' } as any);
    expect(nextState).toBe(defaultState);
  });

  it('calls requested handler', () => {
    const action = getAction(requestMiddleware.Lifecycle.requested);
    handler(defaultState, action);
    expect(requestedHandler).toBeCalledWith(defaultState, action);
  });

  it('calls success handler', () => {
    const action = getAction(requestMiddleware.Lifecycle.success);
    handler(defaultState, action);
    expect(successHandler).toBeCalledWith(defaultState, action);
  });

  it('calls error handler', () => {
    const action = getAction(requestMiddleware.Lifecycle.error);
    handler(defaultState, action);
    expect(errorHandler).toBeCalledWith(defaultState, action);
  });
});
