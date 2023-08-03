import { getAllPages } from '@/shared/http';
import { validateTaskDto, toTask, TaskDto } from './dtos';

export async function getAllTasks(boardId: BoardId) {
  const tasks = await getAllPages<TaskDto>({ endpoint: `board/${boardId}/tasks/` });
  return tasks.map(validateTaskDto).map(toTask);
}
