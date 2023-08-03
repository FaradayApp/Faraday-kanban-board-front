import { TaskInfo } from '@/enitities/task';
import { request } from '@/shared/http';
import { serialize } from '@/shared/lib/serialize';
import { toTaskInfo, validateTaskInfoDto, taskInfoDtoToTask, toEditTaskInfoDto } from './dtos';

export async function editTask(boardId: string, taskId: string, taskInfo: Partial<TaskInfo>) {
  const options = { body: serialize(toEditTaskInfoDto(taskInfo)) };
  const response = await request.put(`board/${boardId}/tasks/${taskId}/`, options).json();

  const updatedTaskInfo = toTaskInfo(validateTaskInfoDto(response));
  const updatedTask = taskInfoDtoToTask(validateTaskInfoDto(response));
  return { updatedTask, updatedTaskInfo };
}
