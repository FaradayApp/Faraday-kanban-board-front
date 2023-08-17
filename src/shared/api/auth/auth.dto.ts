import { z } from 'zod';
import { BadResponseError } from '@/shared/errors';

const AuthTokensDto = z.object({
  access: z.string(),
  refresh: z.string(),
});

export function validateAuthResponse(data: unknown) {
  const tokens = AuthTokensDto.safeParse(data);

  if (!tokens.success) {
    return new BadResponseError();
  } else {
    return tokens.data;
  }
}
