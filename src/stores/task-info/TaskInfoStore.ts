import { makeAutoObservable } from 'mobx';

import { getTaskInfo } from '@/shared/api';
import { DataCache } from '@/shared/lib/DataCache';
import { TaskInfo } from '@/enitities/task';
import { boardStore } from '../board';

export class TaskInfoStore {
  taskId?: string;
  taskInfo = new DataCache<TaskInfo | null>({ defaultValue: null });

  constructor() {
    makeAutoObservable(this);
  }

  init = async (taskId: string) => {
    if (this.taskInfo.isEmpty || this.taskId !== taskId) {
      this.taskId = taskId;
      await this.taskInfo.set(() => getTaskInfo(boardStore.boardId, taskId));
    }
  };
}

export const taskInfoStore = new TaskInfoStore();
