import { editTaskComment as editTaskCommentApi, getTaskInfo } from '@/shared/api';
import { BoardStore, TaskInfoStore } from '@/stores';

export function editTaskComment(boardStore: BoardStore, taskInfoStore: TaskInfoStore) {
  return async function (commentId: CommentId, message: string) {
    if (boardStore.boardId && taskInfoStore.taskId && commentId) {
      await editTaskCommentApi(boardStore.boardId, taskInfoStore.taskId, commentId, message);

      const { task, taskInfo } = await getTaskInfo(boardStore.boardId, taskInfoStore.taskId);
      boardStore.updateTask(task);
      taskInfoStore.updateTaskInfo(taskInfo);
    }
  };
}
