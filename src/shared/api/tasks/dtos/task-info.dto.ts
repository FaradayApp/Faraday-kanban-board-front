import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';
import dayjs from 'dayjs';

import { Task, TaskInfo } from '@/enitities/task';
import { BadResponseError } from '@/shared/errors';
import { TaskCommentDto, toTaskComment } from './comment.dto';
import { getTaskPriority, getTaskStatus } from '../utils';
import { UserDto, toUser } from '../../users';

const TaskInfoDto = t.type({
  id: t.number,
  title: t.string,
  staging_date: t.string,
  expiration_date: t.string,
  status: t.number,
  priority: t.number,
  producer: UserDto,
  performers: t.array(UserDto),
  description: t.string,
  comments: t.array(TaskCommentDto),
});

type TaskInfoDto = t.TypeOf<typeof TaskInfoDto>;

export function validateTaskInfoDto(data: unknown) {
  const taskInfoDto = TaskInfoDto.decode(data);
  if (isLeft(taskInfoDto)) {
    throw new BadResponseError();
  }
  return taskInfoDto.right;
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
