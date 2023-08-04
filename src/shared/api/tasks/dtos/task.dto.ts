import dayjs from 'dayjs';
import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';

import { BadResponseError } from '@/shared/errors';
import { type Task } from '@/enitities/task';
import { getTaskPriority, getTaskStatus } from '../utils';
import { UserDto, toUser } from '../../users';

const TaskDto = t.type({
  id: t.number,
  title: t.string,
  expiration_date: t.string,
  status: t.number,
  priority: t.number,
  performers: t.array(UserDto),
  comments_count: t.number,
});

export type TaskDto = t.TypeOf<typeof TaskDto>;

export function validateTaskDto(data: unknown) {
  const task = TaskDto.decode(data);
  if (isLeft(task)) {
    throw new BadResponseError();
  } else {
    return task.right;
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
