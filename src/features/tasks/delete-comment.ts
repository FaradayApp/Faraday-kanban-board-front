import { deleteTaskComment as deleteTaskCommentApi, getTaskInfo } from '@/shared/api';
import { TaskInfoStore, BoardStore } from '@/stores';

export function deleteTaskComment(boardStore: BoardStore, taskInfoStore: TaskInfoStore) {
  return async function (commentId: number) {
    if (boardStore.boardId && taskInfoStore.taskId && commentId) {
      await deleteTaskCommentApi(boardStore.boardId, taskInfoStore.taskId, commentId);

      const { task, taskInfo } = await getTaskInfo(boardStore.boardId, taskInfoStore.taskId);
      boardStore.updateTask(task);
      taskInfoStore.updateTaskInfo(taskInfo);
    }
  };
}
