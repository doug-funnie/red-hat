import { MapDispatchToProps, MapStateToProps } from 'react-redux';
import { UserListState, UsersState } from './users';

export interface RootState {
  users: UsersState;
  userList: UserListState;
}

export const enum SortDirection {
  asc,
  desc,
}

export const enum FetchStatus {
  none = 'none',
  inProgress = 'inProgress',
  complete = 'complete',
}

const createStateKey = <K extends keyof RootState>(key: K): K => key;
export const usersStateKey = createStateKey('users');
export const userListStateKey = createStateKey('userList');

export type TypedMapStateToProps<InnerProps, OuterProps> = MapStateToProps<InnerProps, OuterProps, RootState>;
export type TypedMapDispatchToProps<DispatchProps> = MapDispatchToProps<DispatchProps, any>;
