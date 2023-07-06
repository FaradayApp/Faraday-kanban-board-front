import { makeAutoObservable } from 'mobx';

import { mockBoard } from './__mocks__';
import { BoardColumnStore } from './BoardColumn';

class BoardStore {
  board: Record<string, BoardColumnStore> = {};

  constructor() {
    makeAutoObservable(this);

    Object.keys(mockBoard).forEach((key) => {
      const boardColumn = mockBoard[key];
      this.board[key] = new BoardColumnStore(boardColumn.id, boardColumn.status, boardColumn.tasks);
    });
  }

  get columns() {
    return Object.values(this.board);
  }
}

export const boardStore = new BoardStore();
