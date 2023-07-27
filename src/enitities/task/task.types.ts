import { Dayjs } from 'dayjs';

export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVE' | '';
export type TaskPriority = 'MEDIUM' | 'LOW' | 'HIGH' | '';

export type Task = {
  id: number;
  title: string;
  expiration_date: Dayjs;
  status: {
    type: TaskStatus;
    weight: number;
  };
  priority: {
    type: TaskPriority;
    weight: number;
  };
  // backend will be changed
  performers: unknown[];
};
