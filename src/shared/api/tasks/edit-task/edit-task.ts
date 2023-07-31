import { TaskInfo } from '@/enitities/task';
import { request } from '@/shared/http';
import { toDto } from './edit-task.dto';
import { serialize } from '@/shared/lib/serialize';

export function editTask(boardId: string, taskId: string, taskInfo: Partial<TaskInfo>) {
  const options = { body: serialize(toDto(taskInfo)) };
  return request.patch(`board/${boardId}/tasks/${taskId}/`, options);
}
