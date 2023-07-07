import dayjs from 'dayjs';
import { makeAutoObservable } from 'mobx';

import { PRIORITY_WEIGHTS, SortOptions, TaskStatus } from '@/enitities/types';
import { tasksStore } from './Tasks';
import { type Task } from './Task';

export class BoardColumnStore {
  sortFn: ((a: Task, b: Task) => number) | null = null;

  constructor(readonly id: string, readonly status: TaskStatus) {
    makeAutoObservable(this);
  }

  get tasks() {
    if (this.sortFn) {
      return tasksStore.getByStatus(this.status).sort(this.sortFn);
    }
    return tasksStore.getByStatus(this.status);
  }

  sortTasks(sortType: SortOptions) {
    if (sortType === 'byDate') {
      this.sortFn = this.sortByDate;
    } else if (sortType === 'byName') {
      this.sortFn = this.sortByName;
    } else if (sortType === 'byPriority') {
      this.sortFn = this.sortByPriority;
    }
  }

  private sortByName(taskA: Task, taskB: Task) {
    return taskA.data.name.localeCompare(taskB.data.name);
  }

  private sortByPriority(taskA: Task, taskB: Task) {
    const priorityA = taskA.data.priority;
    const priorityB = taskB.data.priority;

    return PRIORITY_WEIGHTS[priorityB] - PRIORITY_WEIGHTS[priorityA];
  }

  private sortByDate(taskA: Task, taskB: Task) {
    const dayA = taskA.data.dates.end;
    const dayB = taskB.data.dates.end;

    return dayjs(dayA).isAfter(dayjs(dayB)) ? 1 : -1;
  }
}
