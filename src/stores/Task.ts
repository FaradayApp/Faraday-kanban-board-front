import { makeAutoObservable } from 'mobx';
import dayjs from 'dayjs';

import { TaskStatus, type BoardTask, TaskPriority } from '@/enitities/types';

export class Task {
  constructor(readonly data: BoardTask) {
    makeAutoObservable(this);
  }

  changeStatus(newStatus: TaskStatus) {
    this.data.status = newStatus;
  }

  changePriority(newPriority: TaskPriority) {
    this.data.priority = newPriority;
  }

  changeEndDate(newDate: string) {
    const date = dayjs(newDate);

    if(date.isValid()) {
      this.data.dates.end = date.format('DD.MM.YYYY');
    }
  }

  changeTitle(newTitle: string) {
    this.data.name = newTitle;
  }

  changeDescription(newDesc: string) {
    this.data.description = newDesc;
  }

  addUser(id: string) {
    const user = this.data.workers?.find((user) => user === id);
    if (!user) {
      this.data.workers.push(id);
    }
  }

  removeUser(id: string) {
    const newWorkers = this.data.workers.filter((user) => user !== id);

    if (newWorkers.length !== this.data.workers.length) {
      this.data.workers = newWorkers;
    }
  }
}
