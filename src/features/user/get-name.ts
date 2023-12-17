import { User } from '@/enitities/user';

export function getUserName(user: User) {
  if (user.first_name || user.last_name) {
    return `${user.first_name} ${user.last_name}`.trim();
  }
  return user.username;
}
