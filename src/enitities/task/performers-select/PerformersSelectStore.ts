import { makeAutoObservable } from 'mobx';

import { debounce } from '@/shared/lib/debounce';
import { searchUsers } from '@/shared/api/users';
import { boardStore } from '@/stores';
import { User } from '../../user/user.types';

export class PerformersSelectStore {
  search = '';
  foundedUsers: User[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  debouncedSearch = debounce(async (search: string) => {
    const users = await searchUsers(boardStore.boardUuid, { search });
    this.foundedUsers = users || [];
  });

  searchUsers = async (search: string) => {
    this.search = search;
    this.debouncedSearch(search);
  };
}
