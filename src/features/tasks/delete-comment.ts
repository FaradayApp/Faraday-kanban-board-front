import { deleteTaskComment as deleteTaskCommentApi, getTaskInfo } from '@/shared/api';
import { TaskInfoStore, BoardStore } from '@/stores';

export function deleteTaskComment(boardStore: BoardStore, taskInfoStore: TaskInfoStore) {
  return async function (commentId: CommentId) {
    if (boardStore.boardUuid && taskInfoStore.taskId && commentId) {
      await deleteTaskCommentApi(boardStore.boardUuid, taskInfoStore.taskId, commentId);

      const { task, taskInfo } = await getTaskInfo(boardStore.boardUuid, taskInfoStore.taskId);
      boardStore.updateTask(task);
      taskInfoStore.updateTaskInfo(taskInfo);
    }
  };
}
