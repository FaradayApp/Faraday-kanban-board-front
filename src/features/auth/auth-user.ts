import { login } from '@/shared/api';
import { type SessionStore } from '@/stores/session/SessionStore';

type Credentials = {
  username: string;
  password: string;
};

export function loginUser(sessionStore: SessionStore) {
  return async function (credentials: Credentials) {
    const data = await login(credentials);

    if (data instanceof Error) {
      return { success: false };
    }

    sessionStore.setSession(data);
    return { success: true };
  };
}
