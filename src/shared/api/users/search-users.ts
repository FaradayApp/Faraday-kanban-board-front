import { getAllPages } from '@/shared/http';
import { validateUserDto, type UserDto, toUser } from './dtos';

type Options = {
  search: string;
}

export async function searchUsers(boardUuid: BoardUuid, options: Options) {
  const { search } = options;

  const users = await getAllPages<UserDto[]>({
    endpoint: `board/${boardUuid}/users/`,
    searchParams: { search },
  });
  return users.map(validateUserDto).map(toUser);
}
