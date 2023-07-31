import { type NewTask } from '@/enitities/task';
import { request } from '@/shared/http';
import { serialize } from '@/shared/lib/serialize';
import { toCreateNewTaskDto } from './dtos/create-new-task.dto';
import { toTask, validateTaskDto } from './dtos/task.dto';

export async function createNewTask(boardId: string, newTask: NewTask) {
  const options = { body: serialize(toCreateNewTaskDto(newTask)) };
  const response = request.post(`board/${boardId}/tasks/`, options);
  return toTask(validateTaskDto(response));
}
