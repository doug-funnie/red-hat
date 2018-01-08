import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createRequestMiddleware } from './requestMiddleware';
import { RootState, userListStateKey, usersStateKey } from './state';
import { userListReducer, usersReducer } from './users';

export const rootReducer = combineReducers<RootState>({
  [userListStateKey]: userListReducer,
  [usersStateKey]: usersReducer,
});

export function create() {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunk,
      createRequestMiddleware(),
    ),
  );
}
