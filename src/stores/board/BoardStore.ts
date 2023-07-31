import { makeAutoObservable, runInAction } from 'mobx';

import { getAllTasks } from '@/shared/api';
import { DataCache } from '@/shared/lib/DataCache';
import { type TaskStatus, type Task } from '@/enitities/task';
import { BoardColumnStore } from './BoardColumnStore';

function createEmptyColumns(tasks: Task[]) {
  const columns: Partial<Record<TaskStatus, BoardColumnStore>> = {};
  tasks.forEach(({ status }) => {
    const { type } = status;
    if (!columns[type]) {
      columns[type] = new BoardColumnStore(type);
    }
  });
  return columns;
}

function createColumns(tasks: Task[]) {
  const columns = createEmptyColumns(tasks);
  tasks.forEach((task) => columns[task.status.type]?.addTask(task));
  return Object.values(columns);
}

export class BoardStore {
  tasks = new DataCache<Task[]>({ defaultValue: [] });
  columns: BoardColumnStore[] = [];
  boardId = '06f77037-1d21-4603-857a-6fabed8b63d6';

  constructor() {
    makeAutoObservable(this);
  }

  init = async () => {
    if (this.tasks.isEmpty && this.boardId) {
      await this.tasks.set(() => getAllTasks(this.boardId));
      runInAction(() => {
        this.columns = createColumns(this.tasks.data);
      });
    }
  };
}

export const boardStore = new BoardStore();
