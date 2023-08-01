import { type TaskInfo } from '@/enitities/task';
import { editTask } from '@/shared/api/tasks/edit-task';
import { BoardStore } from '@/stores/board/BoardStore';
import { TaskInfoStore } from '@/stores/task-info';

export function editTaskInfo(
  boardStore: BoardStore,
  taskInfoStore: TaskInfoStore,
  taskId: string
) {
  return async function (task: Partial<TaskInfo>) {
    const { updatedTask, updatedTaskInfo } = await editTask(boardStore.boardId, taskId, task);
    boardStore.updateTask(updatedTask);
    taskInfoStore.updateTaskInfo(updatedTaskInfo);
  };
}
