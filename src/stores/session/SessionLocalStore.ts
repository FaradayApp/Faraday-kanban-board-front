import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';

import { serialize } from '@/shared/lib/serialize';

const SavedSession = t.type({
  access: t.string,
  refresh: t.string,
});

type SavedSession = t.TypeOf<typeof SavedSession>;

export class SessionLocalStore {
  constructor(private readonly SESSION_KEY: string) {}

  async getSavedSession() {
    const data = localStorage.getItem(this.SESSION_KEY);

    if (!data) {
      return null;
    }

    const session = SavedSession.decode(JSON.parse(data));

    if (isLeft(session)) {
      return null;
    }

    return session.right;
  }

  async saveSession(session: SavedSession) {
    localStorage.setItem(this.SESSION_KEY, serialize(session));
  }

  async deleteSavedSession() {
    localStorage.removeItem(this.SESSION_KEY);
  }
}
