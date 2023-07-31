import { type TaskInfo } from '@/enitities/task';
import { editTask } from '@/shared/api/tasks/edit-task';
import { BoardStore } from '@/stores/board/BoardStore';

export function editTaskInfo(boardStore: BoardStore, taskId: string) {
  return async function (task: Partial<TaskInfo>) {
    await editTask(boardStore.boardId, taskId, task);
  };
}
