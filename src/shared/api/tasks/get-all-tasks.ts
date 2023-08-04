import { getAllPages } from '@/shared/http';
import { validateTaskDto, toTask, TaskDto } from './dtos';

export async function getAllTasks(boardUuid: BoardUuid) {
  const tasks = await getAllPages<TaskDto>({ endpoint: `board/${boardUuid}/tasks/` });
  return tasks.map(validateTaskDto).map(toTask);
}
