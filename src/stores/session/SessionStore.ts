import { makeAutoObservable } from 'mobx';
import { SessionLocalStore } from './SessionLocalStore';

type Tokens = {
  access: string;
  refresh: string;
};

export class SessionStore {
  tokens: Tokens = {
    access: '',
    refresh: '',
  };

  constructor(private readonly localStore: SessionLocalStore) {
    makeAutoObservable(this);
    this.restoreSession();
  }

  get isUser(): boolean {
    return !!this.tokens.access;
  }

  get isGuest(): boolean {
    return !this.tokens.access;
  }

  private async restoreSession() {
    const tokens = await this.localStore.getSavedSession();

    if (tokens) {
      this.setTokens(tokens);
    }
  }

  setTokens(tokens: Tokens) {
    this.tokens.access = tokens.access;
    this.tokens.refresh = tokens.refresh;
  }

  clearTokens() {
    this.tokens.access = '';
    this.tokens.refresh = '';
  }

  setSession(tokens: Tokens) {
    this.setTokens(tokens);
    this.localStore.saveSession(this.tokens);
  }

  clearSession() {
    this.clearTokens();
    this.localStore.deleteSavedSession();
  }
}

const localStore = new SessionLocalStore('session');
export const sessionStore = new SessionStore(localStore);
