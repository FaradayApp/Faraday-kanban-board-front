import { makeAutoObservable } from 'mobx';

import { type TaskStatus, type Task } from '@/enitities/task';
import { type SortType, sortTasks } from '@/features/tasks';

type Options = {
  sort?: SortType;
};

export class BoardColumnStore {
  tasks: Task[] = [];

  options: Options = {
    sort: undefined,
  };

  constructor(public title: TaskStatus) {
    makeAutoObservable(this);
  }

  get isEmpty() {
    return this.tasks.length === 0;
  }

  addTask = (task: Task) => {
    this.tasks.push(task);
  };

  sort = (type: SortType) => {
    this.options.sort = type;
    this.tasks = sortTasks(this.tasks, this.options.sort);
  };
}
