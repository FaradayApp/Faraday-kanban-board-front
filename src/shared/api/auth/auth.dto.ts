import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';
import { BadResponseError } from '@/shared/errors';

const AuthTokensDto = t.type({
  access: t.string,
  refresh: t.string,
});

export function validateAuthResponse(data: unknown) {
  const tokens = AuthTokensDto.decode(data);

  if (isLeft(tokens)) {
    return new BadResponseError();
  } else {
    return tokens.right;
  }
}
