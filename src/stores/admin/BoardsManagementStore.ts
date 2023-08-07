import { makeAutoObservable } from 'mobx';

import { getAllBoards } from '@/shared/api/admin';
import { DataCache } from '@/shared/lib/DataCache';
import { type Board } from '@/enitities/admin';

export class BoardsManagementStore {
  boards = new DataCache<Board[]>({ defaultValue: [] });

  showCreateBoardModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  init = async () => {
    if (this.boards.isEmpty) {
      await this.boards.set(() => getAllBoards());
    }
  };

  removeBoard = (boardId: BoardId) => {
    this.boards.update(this.boards.data.filter((board) => board.id !== boardId));
  };

  addBoard = (board: Board) => {
    this.boards.update([...this.boards.data, board]);
  };

  openCreateBoardModal = () => {
    this.showCreateBoardModal = true;
  };

  closeCreateBoardModal = () => {
    this.showCreateBoardModal = false;
  };
}

export const boardsManagementStore = new BoardsManagementStore();
