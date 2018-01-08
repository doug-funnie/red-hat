import { getUser, getUsers, User } from 'api/users';
import { createRequestAction } from 'store/requestMiddleware';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USER = 'FETCH_USER';

export const fetchUsers = createRequestAction(FETCH_USERS, getUsers);
export const fetchUser = createRequestAction(
  FETCH_USER,
  (id: User['id']) => getUser(id).catch((error) => Promise.reject({ id, error }),
));
