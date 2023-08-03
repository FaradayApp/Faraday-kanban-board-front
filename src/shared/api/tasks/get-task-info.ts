import { request } from '@/shared/http';
import { taskInfoDtoToTask, toTaskInfo, validateTaskInfoDto } from './dtos/task-info.dto';

export async function getTaskInfo(boardId: string, taskId: string) {
  const response = await request.get(`board/${boardId}/tasks/${taskId}/`).json();

  const taskInfo = toTaskInfo(validateTaskInfoDto(response));
  const task = taskInfoDtoToTask(validateTaskInfoDto(response));

  return { task, taskInfo };
}
