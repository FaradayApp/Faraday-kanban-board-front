import { request } from '@/shared/http';
import { toTaskInfo, validateTaskInfoDto } from './dtos/task-info.dto';

export async function getTaskInfo(boardId: string, taskId: string) {
  const taskInfo = await request.get(`board/${boardId}/tasks/${taskId}/`).json();
  return toTaskInfo(validateTaskInfoDto(taskInfo));
}
