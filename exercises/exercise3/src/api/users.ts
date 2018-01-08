import { Address } from './address';
import { Company } from './company';
import { request } from './request';

const usersBaseUrl = 'http://jsonplaceholder.typicode.com/users';
const avatarBaseUrl = 'https://api.adorable.io/avatars';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export function getUsers() {
  return request<User[]>({ url: usersBaseUrl });
}

export function getUser(userId: User['id']) {
  return request<User>({ url: `${usersBaseUrl}/${userId}` });
}

export function getUserAvatarUrl(email: User['email'], size = 35) {
  return `${avatarBaseUrl}/${size}/${email}.png`;
}
