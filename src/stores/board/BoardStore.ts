import { makeAutoObservable, runInAction } from 'mobx';

import { getAllTasks } from '@/shared/api';
import { DataCache } from '@/shared/lib/DataCache';
import { type TaskStatus, type Task } from '@/enitities/task';
import { BoardColumnStore } from './BoardColumnStore';

type MoveTask = {
  from: TaskStatus;
  to: TaskStatus;
  id: TaskId;
  at: number;
};

function createEmptyColumns() {
  const columns: Partial<Record<TaskStatus, BoardColumnStore>> = {};
  const types: TaskStatus[] = ['BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE', 'ARCHIVE'];
  
  types.forEach((type) => {
    columns[type] = new BoardColumnStore(type);
  });
  return columns;
}

function createColumns(tasks: Task[]) {
  const columns = createEmptyColumns();
  tasks.forEach((task) => columns[task.status.type]?.addTask(task));
  return Object.values(columns);
}

export class BoardStore {
  boardUuid = '';

  tasks = new DataCache<Task[]>({ defaultValue: [] });
  columns: BoardColumnStore[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  init = async () => {
    if (this.tasks.isEmpty && this.boardUuid) {
      await this.tasks.set(() => getAllTasks(this.boardUuid));
      runInAction(() => {
        this.columns = createColumns(this.tasks.data);
      });
    }
  };

  setBoardUuid = (boardUuid: string) => {
    if (!this.boardUuid || this.boardUuid !== boardUuid) {
      this.boardUuid = boardUuid;
    }
  };

  findColumnByStatus = (status: TaskStatus) => {
    return this.columns.find((column) => column.type === status);
  };

  findTaskById = (id: TaskId) => {
    return this.tasks.data.find((task) => task.id === id);
  };

  addNewTask = (newTask: Task) => {
    let column = this.findColumnByStatus(newTask.status.type);

    if (!column) {
      column = new BoardColumnStore(newTask.status.type);
      this.columns.push(column);
    }
    column.addTask(newTask);
  };

  moveTask = ({ from, to, id, at }: MoveTask) => {
    const fromColumn = this.findColumnByStatus(from);
    const toColumn = this.findColumnByStatus(to);
    const task = this.findTaskById(id);

    if (task) {
      fromColumn?.removeTask(task);
      toColumn?.addTaskAtPlace(task, at);
    }
  };

  updateTask = (updatedTask: Task) => {
    const outdatedTask = this.findTaskById(updatedTask.id);

    if (!outdatedTask) {
      return;
    }

    const column = this.findColumnByStatus(outdatedTask?.status.type);
    const isSameColumn = outdatedTask?.status.type === updatedTask.status.type;

    if (isSameColumn) {
      column?.updateTask(updatedTask);
    } else {
      column?.removeTask(updatedTask);
      this.addNewTask(updatedTask);
    }

    Object.assign(outdatedTask, updatedTask);
  };
}

export const boardStore = new BoardStore();
