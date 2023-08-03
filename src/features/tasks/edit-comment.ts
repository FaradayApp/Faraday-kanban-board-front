import { editTaskComment as editTaskCommentApi, getTaskInfo } from '@/shared/api';
import { BoardStore, TaskInfoStore } from '@/stores';

export function editTaskComment(boardStore: BoardStore, taskInfoStore: TaskInfoStore) {
  return async function (commentId: CommentId, message: string) {
    if (boardStore.boardUuid && taskInfoStore.taskId && commentId) {
      await editTaskCommentApi(boardStore.boardUuid, taskInfoStore.taskId, commentId, message);

      const { task, taskInfo } = await getTaskInfo(boardStore.boardUuid, taskInfoStore.taskId);
      boardStore.updateTask(task);
      taskInfoStore.updateTaskInfo(taskInfo);
    }
  };
}
