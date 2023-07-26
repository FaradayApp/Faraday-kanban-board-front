import ky from 'ky';
import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';

import { sessionStore } from '@/stores/Session';

const AuthTokens = t.type({
  access: t.string,
  refresh: t.string,
});

const kyInstance = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

function trySetAccessHeader(request: Request) {
  if (sessionStore.isUser) {
    request.headers.set('Authorization', `Bearer ${sessionStore.tokens.access}`);
  }
}

function tryRefreshToken() {
  if (!sessionStore.tokens.refresh) {
    throw new Error('REFRESH ERROR');
  }

  return kyInstance
    .post('/refresh', {
      headers: {
        Authorization: `Bearer ${sessionStore.tokens.refresh}`,
      },
    })
    .json();
}

export const request = kyInstance.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        trySetAccessHeader(request);
      },
    ],
    afterResponse: [
      async (request, _, response) => {
        if (response.status === 403) {
          const data = await tryRefreshToken();
          const tokens = AuthTokens.decode(data);

          if (isLeft(tokens)) {
            sessionStore.logout();
            throw new Error('REFRESH ERROR');
          }

          sessionStore.setTokens(tokens.right);
          trySetAccessHeader(request);

          return ky(request);
        }

        return response;
      },
    ],
  },
});
