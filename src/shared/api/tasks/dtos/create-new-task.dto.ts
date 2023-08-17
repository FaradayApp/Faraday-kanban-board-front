import { z } from 'zod';

import { NewTask } from '@/enitities/task';
import { getTaskPriorityId, getTaskStatusId } from '../utils';

const CreateNewTaskDto = z.object({
  title: z.string(),
  description: z.string(),
  expiration_date: z.string(),
  performers: z.array(z.number()),
  status: z.number(),
  priority: z.number(),
});

type CreateNewTaskDto = z.infer<typeof CreateNewTaskDto>;

export function toCreateNewTaskDto(newTask: NewTask): CreateNewTaskDto {
  return {
    title: newTask.title,
    description: newTask.description,
    expiration_date: newTask.expiration_date.format('YYYY-MM-DD'),
    performers: newTask.performers.map((user) => user.id),
    status: getTaskStatusId(newTask.status),
    priority: getTaskPriorityId(newTask.priority),
  };
}
