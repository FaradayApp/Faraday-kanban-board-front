import { request } from '@/shared/http';
import { taskInfoDtoToTask, validateTaskInfoDto } from './dtos';

export async function restoreTask(boardUuid: BoardUuid, taskId: TaskId) {
  const response = await request.post(`board/${boardUuid}/tasks/${taskId}/restore/`).json();
  return taskInfoDtoToTask(validateTaskInfoDto(response));
}
