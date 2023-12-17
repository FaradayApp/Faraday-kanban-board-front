import { z } from 'zod';

import { type TaskInfo } from '@/enitities/task';
import { getTaskPriorityId, getTaskStatusId } from '../utils';

const EditTaskInfoDto = z.object({
  title: z.string(),
  description: z.string(),
  expiration_date: z.string(),
  performers: z.array(z.number()),
  status: z.number(),
  priority: z.number(),
}).partial();

type EditTaskInfoDto = z.infer<typeof EditTaskInfoDto>;

export function toEditTaskInfoDto(taskInfo: Partial<TaskInfo>): EditTaskInfoDto {
  return {
    title: taskInfo.title,
    description: taskInfo.description,
    expiration_date: taskInfo.expiration_date?.format('YYYY-MM-DD') || undefined,
    performers: taskInfo.performers?.map((user) => user.id),
    status: taskInfo.status ? getTaskStatusId(taskInfo.status) : undefined,
    priority: taskInfo.priority ? getTaskPriorityId(taskInfo.priority) : undefined,
  };
}
