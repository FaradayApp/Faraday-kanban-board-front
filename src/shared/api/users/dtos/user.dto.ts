import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';

import { BadResponseError } from '@/shared/errors';
import { User } from '@/enitities/user';

export const UserDto = t.type({
  id: t.number,
  username: t.string,
  first_name: t.union([t.string, t.null]),
  last_name: t.union([t.string, t.null]),
  avatar: t.union([t.string, t.null]),
});

export type UserDto = t.TypeOf<typeof UserDto>;

export function validateUserDto(data: unknown) {
  const userDto = UserDto.decode(data);

  if (isLeft(userDto)) {
    throw new BadResponseError();
  }

  return userDto.right;
}

export function toUser(userDto: UserDto): User {
  return {
    id: userDto.id,
    username: userDto.username,
    first_name: userDto.first_name || '',
    last_name: userDto.last_name || '',
    avatar: userDto.avatar || '',
  };
}

export function toUserDto(user: User): UserDto {
  return {
    id: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    avatar: user.avatar,
  };
}
