import dayjs from 'dayjs';
import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';

import { BadResponseError } from '@/shared/errors';
import { type Task } from '@/enitities/task';
import { getTaskPriority, getTaskStatus } from '../utils';

const TaskDto = t.type({
  id: t.number,
  title: t.string,
  expiration_date: t.string,
  status: t.number,
  priority: t.number,
  performers: t.UnknownArray,
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

export function toTask(task: TaskDto): Task {
  return {
    id: task.id,
    title: task.title,
    expiration_date: dayjs(task.expiration_date),
    status: { type: getTaskStatus(task.status), weight: task.status },
    priority: { type: getTaskPriority(task.priority), weight: task.priority },
    performers: task.performers,
  };
}
