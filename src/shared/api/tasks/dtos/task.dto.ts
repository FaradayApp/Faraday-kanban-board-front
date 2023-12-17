import dayjs from 'dayjs';
import { z } from 'zod';

import { BadResponseError } from '@/shared/errors';
import { type Task } from '@/enitities/task';
import { getTaskPriority, getTaskStatus } from '../utils';
import { UserDto, toUser } from '../../users';

const TaskDto = z.object({
  id: z.number(),
  title: z.string(),
  expiration_date: z.string(),
  status: z.number(),
  priority: z.number(),
  performers: z.array(UserDto),
  comments_count: z.number(),
});

export type TaskDto = z.infer<typeof TaskDto>;

export function validateTaskDto(data: unknown) {
  const task = TaskDto.safeParse(data);
  if (!task.success) {
    throw new BadResponseError();
  } else {
    return task.data;
  }
}

export function toTask(taskDto: TaskDto): Task {
  return {
    id: taskDto.id,
    title: taskDto.title,
    expiration_date: dayjs(taskDto.expiration_date),
    status: { type: getTaskStatus(taskDto.status), weight: taskDto.status },
    priority: { type: getTaskPriority(taskDto.priority), weight: taskDto.priority },
    performers: taskDto.performers.map(toUser),
    comments_count: taskDto.comments_count,
  };
}
