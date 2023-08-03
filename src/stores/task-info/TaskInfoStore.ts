import { makeAutoObservable } from 'mobx';

import { getTaskInfo } from '@/shared/api';
import { DataCache } from '@/shared/lib/DataCache';
import { TaskInfo } from '@/enitities/task';

export class TaskInfoStore {
  taskId?: TaskId;
  taskInfo = new DataCache<TaskInfo | null>({ defaultValue: null });

  constructor() {
    makeAutoObservable(this);
  }

  init = async (taskId: TaskId, boardUuid: BoardUuid) => {
    if ((this.taskInfo.isEmpty || this.taskId !== taskId) && boardUuid) {
      this.taskId = taskId;
      await this.taskInfo.set(() =>
        getTaskInfo(boardUuid, taskId).then(({ taskInfo }) => taskInfo)
      );
    }
  };

  updateTaskInfo = (updatedTaskInfo: TaskInfo) => {
    if (this.taskInfo.data?.id === updatedTaskInfo.id) {
      this.taskInfo.update(updatedTaskInfo);
    }
  };
}

export const taskInfoStore = new TaskInfoStore();
