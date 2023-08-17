import { makeAutoObservable } from 'mobx';

import { getAllBoards } from '@/shared/api/admin';
import { DataCache } from '@/shared/lib/DataCache';
import { type Board } from '@/enitities/admin';

function boardsComparator(a: Board, b: Board) {
  return a.title.localeCompare(b.title);
}

export class BoardsManagementStore {
  boards = new DataCache<Board[]>({ defaultValue: [] });

  showCreateBoardModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  get boardsList() {
    return this.boards.data.slice().sort(boardsComparator);
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
