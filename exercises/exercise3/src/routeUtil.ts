import { User } from 'api/users';

export const getUsersRoute = () => '/users';
export const getUserProfileRoute = (user?: User) => `${getUsersRoute()}/${user ? user.id : ':id'}`;
