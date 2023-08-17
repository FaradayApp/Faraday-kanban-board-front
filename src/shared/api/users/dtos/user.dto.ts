import { z } from 'zod';

import { BadResponseError } from '@/shared/errors';
import { User } from '@/enitities/user';

export const UserDto = z.object({
  id: z.number(),
  username: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  avatar: z.string().nullable(),
});

export type UserDto = z.infer<typeof UserDto>;

export function validateUserDto(data: unknown) {
  const userDto = UserDto.safeParse(data);

  if (!userDto.success) {
    throw new BadResponseError();
  }

  return userDto.data;
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
