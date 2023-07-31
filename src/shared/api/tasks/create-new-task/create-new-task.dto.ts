import * as t from 'io-ts';

import { NewTask } from '@/enitities/task';
import { getTaskPriorityId, getTaskStatusId } from '../utils';

const CreateNewTaskDto = t.type({
  title: t.string,
  description: t.string,
  expiration_date: t.string,
  performers: t.UnknownArray,
  status: t.number,
  priority: t.number,
});

type CreateNewTaskDto = t.TypeOf<typeof CreateNewTaskDto>;

export function toDto(newTask: NewTask): CreateNewTaskDto {
  return CreateNewTaskDto.encode({
    title: newTask.title,
    description: newTask.description,
    expiration_date: newTask.expiration_date.format('YYYY-MM-DD'),
    performers: newTask.performers,
    status: getTaskStatusId(newTask.status),
    priority: getTaskPriorityId(newTask.priority),
  });
}
