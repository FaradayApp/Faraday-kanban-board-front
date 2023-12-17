import { type TaskInfo } from '@/enitities/task';
import { createNewTaskComment } from '@/shared/api';
import { editTask } from '@/shared/api/tasks/edit-task';
import { BoardStore } from '@/stores/board/BoardStore';
import { TaskInfoStore } from '@/stores/task-info';

export type EditTaskInfo = Partial<TaskInfo & { comment?: string }>;

export function editTaskInfo(
  boardStore: BoardStore,
  taskInfoStore: TaskInfoStore,
  taskId: TaskId
) {
  return async function (task: EditTaskInfo) {
    if(task.comment) {
      await createNewTaskComment(boardStore.boardUuid, taskId, task.comment);
    }
    const { updatedTask, updatedTaskInfo } = await editTask(boardStore.boardUuid, taskId, task);
    boardStore.updateTask(updatedTask);
    taskInfoStore.updateTaskInfo(updatedTaskInfo);
  };
}
