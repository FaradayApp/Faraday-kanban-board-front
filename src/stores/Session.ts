import { makeAutoObservable } from 'mobx';

import { login } from '@/shared/api';
import { LocalStore } from './LocalStore';

type AuthTokens = {
  access: string;
  refresh: string;
};

class SessionStore {
  tokens: AuthTokens = {
    access: '',
    refresh: '',
  };

  constructor(private readonly localStore: LocalStore) {
    makeAutoObservable(this);
    this.tryRestoreSession();
  }

  get isUser(): boolean {
    return !!this.tokens.access;
  }

  get isGuest(): boolean {
    return !this.tokens.access;
  }

  private async tryRestoreSession() {
    const session = await this.localStore.getSavedSession();

    if (session) {
      this.setTokens(session);
    }
  }

  setTokens(tokens: AuthTokens) {
    this.tokens.access = tokens.access;
    this.tokens.refresh = tokens.refresh;
  }

  async logout() {
    this.localStore.deleteSavedSession();
    this.tokens.access = '';
    this.tokens.refresh = '';
  }

  async login(data: { login: string; password: string }) {
    return login(data).then(({ access, refresh }) => {
      this.setTokens({ access, refresh });
      this.localStore.saveSession(this.tokens);
    });
  }
}

export const sessionStore = new SessionStore(new LocalStore('session'));
