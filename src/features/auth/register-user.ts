import { registration } from '@/shared/api';
import { type SessionStore } from '@/stores/session/SessionStore';

type Registration = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
};

export function registerUser(sessionStore: SessionStore) {
  return async function (credentials: Registration) {
    const data = await registration(credentials);

    if (data instanceof Error) {
      return { success: false, message: data.message };
    }

    sessionStore.setSession(data);
    return { success: true };
  };
}
