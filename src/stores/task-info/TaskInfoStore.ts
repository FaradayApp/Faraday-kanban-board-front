import { makeAutoObservable } from 'mobx';

import { getTaskInfo } from '@/shared/api';
import { DataCache } from '@/shared/lib/DataCache';
import { TaskInfo } from '@/enitities/task';

export class TaskInfoStore {
  taskId?: string;
  taskInfo = new DataCache<TaskInfo | null>({ defaultValue: null });

  constructor() {
    makeAutoObservable(this);
  }

  init = async (taskId: string, boardId: string) => {
    if ((this.taskInfo.isEmpty || this.taskId !== taskId) && boardId) {
      this.taskId = taskId;
      await this.taskInfo.set(() => getTaskInfo(boardId, taskId).then(({ taskInfo }) => taskInfo));
    }
  };

  updateTaskInfo = (updatedTaskInfo: TaskInfo) => {
    if (this.taskInfo.data?.id === updatedTaskInfo.id) {
      this.taskInfo.update(updatedTaskInfo);
    }
  };
}

export const taskInfoStore = new TaskInfoStore();
