import { request } from '@/shared/http';
import { toUser, validateUserDto } from './dtos';

export async function getMe() {
  const response = await request.get('user/');
  return toUser(validateUserDto(response));
}
