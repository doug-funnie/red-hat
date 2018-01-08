import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createRequestMiddleware } from 'store/requestMiddleware';

export function mockStoreCreator<S>(reducer: any) {
  return () => createStore<S>(
    reducer,
    applyMiddleware(
      thunk,
      createRequestMiddleware(),
    ),
  );
}
