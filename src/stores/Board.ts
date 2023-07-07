import { makeAutoObservable } from 'mobx';

import { BoardColumnStore } from './BoardColumn';
import { getBoardColumns } from '@/shared/api';

class BoardStore {
  board: Record<string, BoardColumnStore> = {};

  constructor() {
    makeAutoObservable(this);
    this.load();
  }

  get columns() {
    return Object.values(this.board);
  }

  async load() {
    const columns = await getBoardColumns();
    
    columns.forEach((column) => {
      this.board[column.id] = new BoardColumnStore(column.id, column.status);
    });
  }
}

export const boardStore = new BoardStore();
