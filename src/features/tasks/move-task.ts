import { TaskStatus } from '@/enitities/task';
import { editTask } from '@/shared/api/tasks/edit-task';
import { BoardStore } from '@/stores/board/BoardStore';
import { TaskInfoStore } from '@/stores/task-info';

type MoveTask = {
  from: TaskStatus;
  to: TaskStatus;
  at: number;
  id: number;
};

export function moveTask(boardStore: BoardStore, taskInfoStore: TaskInfoStore, taskId: TaskId) {
  return async function ({ from, to, at, id }: MoveTask) {
    boardStore.moveTask({ from, to, at, id });
    taskInfoStore.clear();

    const { updatedTask } = await editTask(boardStore.boardUuid, taskId, {
      status: to,
    });
    boardStore.updateTask(updatedTask);
  };
}
