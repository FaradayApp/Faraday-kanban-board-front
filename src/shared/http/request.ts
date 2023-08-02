import ky from 'ky';

import { RefreshTokenError } from '@/shared/errors';
import { validateAuthResponse } from '@/shared/api/auth';
import { sessionStore } from '@/stores/session/SessionStore';
import { serialize } from '../lib/serialize';

export const baseRequest = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  headers: { 'content-type': 'application/json' },
});

function setAccessHeader(request: Request) {
  if (sessionStore.isUser) {
    request.headers.set('Authorization', `Bearer ${sessionStore.tokens.access}`);
  }
  return request;
}

async function tryRefreshToken() {
  const options = { body: serialize({ refresh: sessionStore.tokens.refresh }) };
  const response = await baseRequest.post('auth/refresh/', options).json();
  const data = validateAuthResponse(response);

  if (data instanceof Error) {
    sessionStore.clearSession();
    throw new RefreshTokenError();
  }

  sessionStore.setSession(data);
}

export const request = baseRequest.extend({
  hooks: {
    beforeRequest: [setAccessHeader],
    afterResponse: [
      async (request, _, response) => {
        if (response.status === 401) {
          await tryRefreshToken();
          return ky(setAccessHeader(request));
        }
        return response;
      },
    ],
  },
});
