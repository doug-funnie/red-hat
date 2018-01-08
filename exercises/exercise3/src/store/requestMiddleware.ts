import { Middleware } from 'redux';
import { Action } from 'redux-actions';

export enum Lifecycle {
  requested,
  success,
  error,
}

interface RequestAction<SP = any, RP = undefined> {
  type: string;
  request(a: RP): Promise<SP>;
  payload: RP;
  meta?: any;
}

export interface RequestMiddlewareAction<P = any> {
  type: string;
  payload: P;
  meta: {
    'request-middleware': Lifecycle;
    [key: string]: any;
  };
  error?: boolean;
}

// forces typings to match
type RequestMiddlewareKey = keyof Pick<RequestMiddlewareAction['meta'], 'request-middleware'>;
export const requestMiddlewareKey: RequestMiddlewareKey = 'request-middleware';

const isRequestAction = (action: RequestAction): action is RequestAction => !!action.request;
const isRequestMiddlewareAction = (action: RequestMiddlewareAction): action is RequestMiddlewareAction => (
  action.meta && action.meta[requestMiddlewareKey] !== null
);

export function createRequestAction<SP>(type: string, request: () => Promise<SP>): () => RequestAction<SP>;
export function createRequestAction<RP, SP>(
  type: string,
  request: (requestPayload: RP) => Promise<SP>,
): (a: RP) => RequestAction<SP, RP>;
export function createRequestAction(type, request) {
  return (a): RequestAction => ({
    type,
    request,
    payload: a,
  });
}

const requestHasExpired = (lastRequestedTime: number) => {
  if (!lastRequestedTime) {
    return true;
  }
  const diff = performance.now() - lastRequestedTime;
  return diff >= 300000; // 5 Minutes
};

export const createRequestMiddleware = () => {
  const requestCache: {
    [url: string]: {
      request: Promise<any>;
      lastRequestedTime: number;
    };
  } = {};
  const cacheRequest = (type: string, request: Promise<any>) => {
    requestCache[type] = {
      request,
      lastRequestedTime: performance.now(),
    };
  };

  const middleware: Middleware = ({ dispatch }) => (next) => async (action) => {
    if (!isRequestAction(action)) {
      return next(action);
    }

    const cachedRequest = requestCache[action.type];
    if (cachedRequest && cachedRequest.request && !requestHasExpired(cachedRequest.lastRequestedTime)) {
      return cachedRequest.request;
    }

    const createRequestMiddlewareAction = (lifecycle: Lifecycle, payload: any): RequestMiddlewareAction => ({
      payload,
      type: action.type,
      error: lifecycle === Lifecycle.error,
      meta: {
        ...action.meta,
        [requestMiddlewareKey]: lifecycle,
      },
    });

    dispatch(createRequestMiddlewareAction(Lifecycle.requested, action.payload));
    try {
      const request = action.request(action.payload);
      cacheRequest(action.type, request);
      const data = await(request);
      dispatch(createRequestMiddlewareAction(Lifecycle.success, data));
      return data;
    } catch (err) {
      dispatch(createRequestMiddlewareAction(Lifecycle.error, err));
      return Promise.reject(err);
    }
  };

  return middleware;
};

type RequestActionHandler<S = any, P = any> = (prevState: S, action: Action<P>) => S;

interface RequestActionHandlers<S, RP, SP, EP> {
  requested?: RequestActionHandler<S, RP>;
  success?: RequestActionHandler<S, SP>;
  error?: RequestActionHandler<S, EP>;
  finally?: RequestActionHandler<S, RP | EP>;
}

export function handleRequestAction<S, SP, RP = any, EP = any>(
  type: string,
  handlers: RequestActionHandlers<S, RP, SP, EP>,
  defaultState: S,
) {
  return (state: S = defaultState, action: RequestMiddlewareAction) => {
    if (action.type !== type) {
      return state;
    }

    if (!isRequestMiddlewareAction(action)) {
      return state;
    }

    const lifecycle = action.meta[requestMiddlewareKey];
    const handler = handlers[Lifecycle[lifecycle]];
    if (handler) {
      return handler(state, action);
    }
    return state;
  };
}
