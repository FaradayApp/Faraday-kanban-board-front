import { type NewTask } from '@/enitities/task';
import { request } from '@/shared/http';
import { serialize } from '@/shared/lib/serialize';
import { toDto } from './create-new-task.dto';

export async function createNewTask(boardId: string, newTask: NewTask) {
  const options = { body: serialize(toDto(newTask)) };
  return request.post(`board/${boardId}/tasks/`, options);
}
