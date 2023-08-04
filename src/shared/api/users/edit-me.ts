import { request } from '@/shared/http';
import { toUser, validateUserDto } from './dtos';
import { serialize } from '@/shared/lib/serialize';

type ProfileData = {
  first_name: string;
  last_name: string;
  avatar: string;
};

export async function editMe(data: ProfileData) {
  const options = {
    body: serialize({
      first_name: data.first_name,
      last_name: data.last_name,
      avatar: data.avatar,
    }),
  };
  const response = await request.post('user/', options).json();
  return toUser(validateUserDto(response));
}
