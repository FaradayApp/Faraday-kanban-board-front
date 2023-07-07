import { makeAutoObservable } from 'mobx';

import { User } from '@/enitities/types';
import { getUsers } from '@/shared/api';

class UsersStore {
  users: Record<UserId, User> = {};

  constructor() {
    makeAutoObservable(this);
    this.loadUsers();
  }

  async loadUsers() {
    const users = await getUsers();
    this.users = users;
  }

  searchUsers(search: string): UserId[] {
    return Object.values(this.users)
      .filter((user) => user.name.includes(search))
      .map((user) => user.id);
  }

  getById(id: UserId) {
    return this.users[id] || null;
  }

  getByIds(ids: UserId[]) {
    return ids.map((id) => this.users[id]).filter(Boolean);
  }
}

export const usersStore = new UsersStore();
