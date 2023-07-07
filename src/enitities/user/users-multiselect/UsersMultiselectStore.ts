import { makeAutoObservable } from "mobx";

import { usersStore } from "@/stores/Users";

export class UsersMultiselectStore {
  search = '';
  foundedUsers: UserId[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  searchUsers(search: string) {
    this.search = search;
    this.foundedUsers = usersStore.searchUsers(search);
  }
}
