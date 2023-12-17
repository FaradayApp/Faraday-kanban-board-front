import { z } from 'zod';
import dayjs from 'dayjs';

import { Task, TaskInfo } from '@/enitities/task';
import { BadResponseError } from '@/shared/errors';
import { TaskCommentDto, toTaskComment } from './comment.dto';
import { getTaskPriority, getTaskStatus } from '../utils';
import { UserDto, toUser } from '../../users';

const TaskInfoDto = z.object({
  id: z.number(),
  title: z.string(),
  staging_date: z.string(),
  expiration_date: z.string(),
  status: z.number(),
  priority: z.number(),
  producer: UserDto,
  performers: z.array(UserDto),
  description: z.string(),
  comments: z.array(TaskCommentDto),
  can_edit: z.boolean().optional(),
});

type TaskInfoDto = z.infer<typeof TaskInfoDto>;

export function validateTaskInfoDto(data: unknown) {
  const taskInfoDto = TaskInfoDto.safeParse(data);
  if (!taskInfoDto.success) {
    throw new BadResponseError();
  }
  return taskInfoDto.data;
}

export function toTaskInfo(taskInfoDto: TaskInfoDto): TaskInfo {
  return {
    id: taskInfoDto.id,
    title: taskInfoDto.title,
    staging_date: dayjs(taskInfoDto.staging_date),
    expiration_date: dayjs(taskInfoDto.expiration_date),
    status: getTaskStatus(taskInfoDto.status),
    priority: getTaskPriority(taskInfoDto.priority),
    description: taskInfoDto.description,
    producer: toUser(taskInfoDto.producer),
    performers: taskInfoDto.performers.map(toUser),
    comments: taskInfoDto.comments.map(toTaskComment),
    canEdit: taskInfoDto.can_edit || false,
  };
}

export function taskInfoDtoToTask(taskInfoDto: TaskInfoDto): Task {
  return {
    id: taskInfoDto.id,
    title: taskInfoDto.title,
    expiration_date: dayjs(taskInfoDto.expiration_date),
    status: { type: getTaskStatus(taskInfoDto.status), weight: taskInfoDto.status },
    priority: { type: getTaskPriority(taskInfoDto.priority), weight: taskInfoDto.priority },
    performers: taskInfoDto.performers.map(toUser),
    comments_count: taskInfoDto.comments.length || 0,
  };
}
