import * as t from 'io-ts';

import { type TaskInfo } from '@/enitities/task';
import { getTaskPriorityId, getTaskStatusId } from '../utils';

const EditTaskInfoDto = t.partial({
  title: t.string,
  description: t.string,
  expiration_date: t.string,
  performers: t.UnknownArray,
  status: t.number,
  priority: t.number,
});

type EditTaskInfoDto = t.TypeOf<typeof EditTaskInfoDto>;

export function toEditTaskInfoDto(taskInfo: Partial<TaskInfo>): EditTaskInfoDto {
  return {
    title: taskInfo.title,
    description: taskInfo.description,
    expiration_date: taskInfo.expiration_date?.format('YYYY-MM-DD') || undefined,
    performers: taskInfo.performers,
    status: taskInfo.status ? getTaskStatusId(taskInfo.status) : undefined,
    priority: taskInfo.priority ? getTaskPriorityId(taskInfo.priority) : undefined,
  };
}
