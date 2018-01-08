jest.mock('api/users');

import { getUser, getUsers, User } from 'api/users';
import { Store } from 'react-redux';
import { combineReducers } from 'redux';
import { mockStoreCreator } from 'store/mockStore';
import { FetchStatus, RootState } from 'store/state';
import * as actions from './users.actions';
import * as reducers from './users.reducers';
import * as selectors from './users.selectors';

const user1: Partial<User> = {
  id: 1,
  name: 'Z User 1',
};
const user2: Partial<User> = {
  id: 2,
  name: 'A User2',
};

const mockGetUsers = getUsers as jest.Mock<{}>;
const mockGetUser = getUser as jest.Mock<{}>;

beforeEach(() => {
  mockGetUsers.mockReturnValue(Promise.resolve([user1, user2]));
  mockGetUser.mockReturnValue(Promise.resolve(user1));
});

describe('userList', () => {
  const storeCreator = mockStoreCreator<reducers.UserListState>(reducers.userListReducer);
  let store: Store<reducers.UserListState>;

  beforeEach(() => {
    store = storeCreator();
  });

  it('defaults state', () => {
    expect(store.getState()).toMatchSnapshot();
  });

  it('handles successful fetchUsers action', async () => {
    const promise = store.dispatch(actions.fetchUsers());
    expect(store.getState()).toMatchSnapshot();
    await promise;
    expect(store.getState()).toMatchSnapshot();
  });

  it('handles failed fetchUsers action', async () => {
    try {
      // Unhandled promise rejection without some sort of catch
      mockGetUsers.mockReturnValue(Promise.reject('Error'));
      await store.dispatch(actions.fetchUsers());
    } catch (_) { } //tslint:disable-line
    expect(store.getState()).toMatchSnapshot();
  });
});

describe('users', () => {
  const storeCreator = mockStoreCreator<reducers.UserListState>(reducers.usersReducer);
  let store: Store<reducers.UserListState>;

  beforeEach(() => {
    store = storeCreator();
  });

  it('defaults state', () => {
    expect(store.getState()).toMatchSnapshot();
  });

  it('handles successful fetchUsers action', async () => {
    await store.dispatch(actions.fetchUsers());
    expect(store.getState()).toMatchSnapshot();
  });

  it('handles successful fetchUser action', async () => {
    const promise =  store.dispatch(actions.fetchUser(user1.id));
    expect(store.getState()).toMatchSnapshot();
    await promise;
    expect(store.getState()).toMatchSnapshot();
  });

  it('handles failed fetchUser action', async () => {
    try {
      // Unhandled promise rejection without some sort of catch
      mockGetUser.mockReturnValue(Promise.reject('Error'));
      await store.dispatch(actions.fetchUser(user1.id));
    } catch (_) { } //tslint:disable-line
    expect(store.getState()).toMatchSnapshot();
  });
});

describe('selectors', () => {
  let store: Store<Pick<RootState, 'users' | 'userList'>>;
  const createStore = mockStoreCreator<Pick<RootState, 'users' | 'userList'>>(
    combineReducers({
      users: reducers.usersReducer,
      userList: reducers.userListReducer,
    }),
  );

  beforeEach(async () => {
    store = createStore();
    await store.dispatch(actions.fetchUsers());
  });

  it('selectUserFetchStatus defaults to none', () => {
    expect(selectors.selectUserFetchStatus(store.getState(), 1000)).toBe(FetchStatus.none);
  });

  it('selectUserListSorted sorts user list using sortKey in userList state', () => {
    expect(selectors.selectUserListSorted(store.getState())).toMatchSnapshot();
  });

  it('selectUserListSorted returns same result if state is unchanged', () => {
    const first = selectors.selectUserListSorted(store.getState());
    const second = selectors.selectUserListSorted(store.getState());
    expect(first).toBe(second);
  });
});
