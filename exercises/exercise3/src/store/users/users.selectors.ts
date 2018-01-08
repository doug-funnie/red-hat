import { User } from 'api/users';
import { createSelector } from 'reselect';
import { FetchStatus, RootState, SortDirection } from '../state';

export const selectUsersState = (state: RootState) => state.users;
export const selectUserById = (state: RootState, id: User['id']) => selectUsersState(state).byId[id];
export const selectUserError = (state: RootState, id: User['id']) => selectUsersState(state).errors[id];
export const selectUserFetchStatus = (state: RootState, id: User['id']) => (
  selectUsersState(state).fetchStatus[id] || FetchStatus.none
);

export const selectUserListState = (state: RootState) => state.userList;
export const selectUserListUsers = (state: RootState) => selectUserListState(state).users;
export const selectUserListFetchStatus = (state: RootState) => selectUserListState(state).fetchStatus;
export const selectUserListSortDirection = (state: RootState) => selectUserListState(state).sortDirection;
export const selectUserListSortKey = (state: RootState) => selectUserListState(state).sortKey;
export const selectUserList = createSelector(
  [selectUserListUsers, selectUsersState],
  (userIds, usersState) => userIds.map((uId) => usersState.byId[uId]),
);
export const selectUserListSorted = createSelector(
  [selectUserList, selectUserListSortDirection, selectUserListSortKey],
  (userList, sortDirection, sortKey) => [...userList].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    const isAsc = sortDirection === SortDirection.asc;
    if (aValue > bValue) { return isAsc ? 1 : -1; }
    if (aValue < bValue) { return isAsc ? -1 : 1; }
    return 0;
  }),
);
