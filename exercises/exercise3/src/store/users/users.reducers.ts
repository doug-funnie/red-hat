import { User } from 'api/users';
import reduceReducers from 'reduce-reducers';
import { handleRequestAction } from 'store/requestMiddleware';
import { FetchStatus, SortDirection } from '../state';
import { FETCH_USER, FETCH_USERS } from './users.actions';

export interface UsersState {
  byId: { [key: number]: User; };
  errors: { [key: number]: any; };
  fetchStatus: { [key: number]: FetchStatus; };
}

export interface UserListState {
  error: any;
  sortDirection: SortDirection;
  sortKey: keyof User;
  users: User['id'][];
  fetchStatus: FetchStatus;
}

const defaultUsersState: UsersState = {
  byId: {},
  errors: {},
  fetchStatus: {},
};

const defaultUserListState: UserListState = {
  error: null,
  sortDirection: SortDirection.asc,
  sortKey: 'name',
  users: [],
  fetchStatus: FetchStatus.none,
};

export const usersReducer = reduceReducers(
  handleRequestAction<UsersState, User[]>(FETCH_USERS, {
    success: (state, { payload: users }) => users.reduce((acc, user) => ({
      ...acc,
      byId: {
        ...acc.byId,
        [user.id]: user,
      },
      fetchStatus: {
        ...acc.fetchStatus,
        [user.id]: FetchStatus.complete,
      },
    }), state),
  }, defaultUsersState),
  handleRequestAction<UsersState, User, User['id']>(FETCH_USER, {
    requested: (state, { payload: id }) => ({
      ...state,
      fetchStatus: {
        ...state.fetchStatus,
        [id]: FetchStatus.inProgress,
      },
    }),
    success: (state, { payload: user }) => ({
      ...state,
      byId: {
        ...state.byId,
        [user.id]: user,
      },
      fetchStatus: {
        ...state.fetchStatus,
        [user.id]: FetchStatus.complete,
      },
    }),
    error: (state, { payload: { id, error } }) => ({
      ...state,
      errors: {
        ...state.byId,
        [id]: error,
      },
      fetchStatus: {
        ...state.fetchStatus,
        [id]: FetchStatus.complete,
      },
    }),
  }, defaultUsersState),
);

export const userListReducer = handleRequestAction<UserListState, User[]>(FETCH_USERS, {
  requested: (state) => ({
    ...state,
    fetchStatus: FetchStatus.inProgress,
  }),
  success: (state, { payload: users }) => ({
    ...state,
    fetchStatus: FetchStatus.complete,
    users: users.map((u) => u.id),
  }),
  error: (state, { payload: error }) => ({
    ...state,
    error,
    fetchStatus: FetchStatus.complete,
  }),
}, defaultUserListState);
