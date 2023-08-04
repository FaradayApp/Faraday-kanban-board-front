import { type NewTask } from '@/enitities/task';
import { request } from '@/shared/http';
import { serialize } from '@/shared/lib/serialize';
import { toCreateNewTaskDto, toTask, validateTaskDto } from './dtos';

export async function createNewTask(boardUuid: BoardUuid, newTask: NewTask) {
  const options = { body: serialize(toCreateNewTaskDto(newTask)) };
  const response = await request.post(`board/${boardUuid}/tasks/`, options).json();
  return toTask(validateTaskDto(response));
}
