import { TaskInfo } from '@/enitities/task';
import { request } from '@/shared/http';
import { toEditTaskInfoDto } from './dtos/edit-task.dto';
import { serialize } from '@/shared/lib/serialize';
import { toTaskInfo, validateTaskInfoDto } from './dtos';
import { taskInfoDtoToTask } from './dtos/task-info.dto';

export async function editTask(boardId: string, taskId: string, taskInfo: Partial<TaskInfo>) {
  const options = { body: serialize(toEditTaskInfoDto(taskInfo)) };
  const response = await request.put(`board/${boardId}/tasks/${taskId}/`, options).json();

  const updatedTaskInfo = toTaskInfo(validateTaskInfoDto(response));
  const updatedTask = taskInfoDtoToTask(validateTaskInfoDto(response));
  return { updatedTask, updatedTaskInfo };
}
