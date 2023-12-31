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

  constructor(public type: TaskStatus) {
    makeAutoObservable(this);
  }

  get isEmpty() {
    return this.tasks.length === 0;
  }

  findTaskById = (id: TaskId) => {
    return this.tasks.find((task) => task.id === id);
  };

  addTask = (task: Task) => {
    const existingTask = this.findTaskById(task.id);
    if (!existingTask) {
      this.tasks.push(task);
    }
    if (this.options.sort) {
      this.sort(this.options.sort);
    }
  };

  addTaskAtPlace = (task: Task, ind: number) => {
    const existingTask = this.findTaskById(task.id);
    if (existingTask) {
      this.removeTask(task);
    }
    this.tasks.splice(ind, 0, task);
  };

  removeTask = (taskToRemove: Task) => {
    this.tasks = this.tasks.filter((task) => task.id !== taskToRemove.id);
  };

  updateTask = (taskToUpdate: Task) => {
    const task = this.tasks.find((task) => task.id === taskToUpdate.id);
    if (task?.status.type !== taskToUpdate.status.type) {
      this.removeTask(taskToUpdate);
    } else {
      Object.assign(task, taskToUpdate);
    }
  };

  sort = (type: SortType) => {
    this.options.sort = type;
    this.tasks = sortTasks(this.tasks, this.options.sort);
  };
}
