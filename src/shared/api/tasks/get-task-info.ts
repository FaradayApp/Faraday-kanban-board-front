import { request } from '@/shared/http';
import { taskInfoDtoToTask, toTaskInfo, validateTaskInfoDto } from './dtos';

export async function getTaskInfo(boardUuid: BoardUuid, taskId: TaskId) {
  const response = await request.get(`board/${boardUuid}/tasks/${taskId}/`).json();

  const taskInfo = toTaskInfo(validateTaskInfoDto(response));
  const task = taskInfoDtoToTask(validateTaskInfoDto(response));
  return { task, taskInfo };
}
