import { makeAutoObservable } from 'mobx';

import { getAllBoards } from '@/shared/api/admin';
import { DataCache } from '@/shared/lib/DataCache';
import { type Board } from '@/enitities/admin';

export class BoardsManagementStore {
  boards = new DataCache<Board[]>({ defaultValue: [] });

  boardForDelete: Board | null = null;
  showCreateBoardModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  init = async () => {
    if (this.boards.isEmpty) {
      await this.boards.set(() => getAllBoards());
    }
  };

  removeBoard = (boardId: number) => {
    this.boards.update(this.boards.data.filter((board) => board.id !== boardId));
  };

  addBoard = (board: Board) => {
    this.boards.update([...this.boards.data, board]);
  };

  selectBoardForDelete = (board: Board) => {
    this.boardForDelete = board;
  };

  removeBoardForDelete = () => {
    this.boardForDelete = null;
  };

  openCreateBoardModal = () => {
    this.showCreateBoardModal = true;
  };

  closeCreateBoardModal = () => {
    this.showCreateBoardModal = false;
  };
}

export const boardsManagementStore = new BoardsManagementStore();
