import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';
import dayjs from 'dayjs';

import { TaskInfo } from '@/enitities/task';
import { BadResponseError } from '@/shared/errors';
import { getTaskPriority, getTaskStatus } from '../utils';

const TaskInfoDto = t.type({
  id: t.number,
  title: t.string,
  staging_date: t.string,
  expiration_date: t.string,
  status: t.number,
  priority: t.number,
  producer: t.unknown,
  performers: t.UnknownArray,
  description: t.string,
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
    producer: taskInfoDto.producer,
    performers: taskInfoDto.performers,
  };
}
