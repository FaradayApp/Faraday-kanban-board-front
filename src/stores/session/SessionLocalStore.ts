import { z } from 'zod';

import { serialize } from '@/shared/lib/serialize';

const SavedSession = z.object({
  access: z.string(),
  refresh: z.string(),
});

type SavedSession = z.infer<typeof SavedSession>;

export class SessionLocalStore {
  constructor(private readonly SESSION_KEY: string) {}

  async getSavedSession() {
    const data = localStorage.getItem(this.SESSION_KEY);

    if (!data) {
      return null;
    }

    const session = SavedSession.safeParse(JSON.parse(data));

    if (!session.success) {
      return null;
    }

    return session.data;
  }

  async saveSession(session: SavedSession) {
    localStorage.setItem(this.SESSION_KEY, serialize(session));
  }

  async deleteSavedSession() {
    localStorage.removeItem(this.SESSION_KEY);
  }
}
