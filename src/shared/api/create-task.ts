import dayjs from 'dayjs';

import { TaskPriority, TaskStatus } from '@/enitities/types';

export type CreateTask = {
  name: string;
  endDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  description: string;
  workers: UserId[];
};

export async function createNewTask(data: CreateTask) {
  const task = {
    id: Date.now().toString(),
    name: data.name,
    status: data.status,
    priority: data.priority,
    description: data.description,
    workers: data.workers,
    producer: '1',
    comments: [],
    dates: {
      start: dayjs().format('DD.MM.YYYY'),
      end: data.endDate,
    },
  };

  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  return task;
}
