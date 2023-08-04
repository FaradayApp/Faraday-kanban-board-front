import { makeAutoObservable } from 'mobx';

import { User } from '@/enitities/user';
import { DataCache } from '@/shared/lib/DataCache';
import { getMe } from '@/shared/api';

export class ProfileStore {
  profile = new DataCache<User | null>({ defaultValue: null });

  constructor() {
    makeAutoObservable(this);
  }

  init = async () => {
    if (this.profile.isEmpty) {
      await this.profile.set(getMe);
    }
  };
}

export const profileStore = new ProfileStore();
