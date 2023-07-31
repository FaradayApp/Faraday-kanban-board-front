import { makeAutoObservable } from 'mobx';

export class UsersMultiselectStore {
  search = '';
  foundedUsers: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  searchUsers(search: string) {
    this.search = search;
    this.foundedUsers = [];
  }
}
