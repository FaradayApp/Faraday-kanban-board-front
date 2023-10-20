import { request } from '@/shared/http';

export async function deleteTask(boardUuid: BoardUuid, taskId: TaskId) {
  return request.delete(`board/${boardUuid}/tasks/${taskId}/`);
}
