import dayjs from 'dayjs';
import { makeAutoObservable } from 'mobx';

import {
  PRIORITY_WEIGHTS,
  TaskPriority,
  SortOptions,
  TaskStatus,
  BoardTask,
} from '@/enitities/types';

const sortByDate = (a: string, b: string) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1);
const sortByPriority = (a: TaskPriority, b: TaskPriority) =>
  PRIORITY_WEIGHTS[b] - PRIORITY_WEIGHTS[a];

export class BoardColumnStore {
  constructor(readonly id: string, readonly status: TaskStatus, readonly tasks: BoardTask[]) {
    makeAutoObservable(this);
  }

  sortTasks(sortType: SortOptions) {
    switch (sortType) {
      case 'byDate':
        return this.sortByDate();
      case 'byName':
        return this.sortByName();
      case 'byPriority':
        return this.sortByPriority();
    }
  }

  private sortByName() {
    this.tasks.sort((a, b) => a.name.localeCompare(b.name));
  }

  private sortByPriority() {
    this.tasks.sort((a, b) => sortByPriority(a.priority, b.priority));
  }

  private sortByDate() {
    this.tasks.sort((a, b) => sortByDate(a.dates.end, b.dates.end));
  }
}
