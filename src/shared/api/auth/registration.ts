import { request } from '@/shared/http';
import { serialize } from '@/shared/lib/serialize';
import { WrongCredentialsError } from '@/shared/errors';
import { validateAuthResponse } from './auth.dto';

type Registration = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
};

export async function registration(credentials: Registration) {
  try {
    const options = { body: serialize({ ...credentials, avatar: '' }) };
    const response = await request.post('auth/registration/', options).json();

    return validateAuthResponse(response);
  } catch {
    return new WrongCredentialsError();
  }
}
