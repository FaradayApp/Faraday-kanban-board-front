import { type Dayjs } from 'dayjs';

export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVE';
export type TaskPriority = 'MEDIUM' | 'LOW' | 'HIGH';

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

export type NewTask = {
  title: string;
  description: string;
  expiration_date: Dayjs;
  status: TaskStatus;
  priority: TaskPriority;
  // backend will be changed
  performers: unknown[];
};

export type TaskInfo = {
  id: number;
  title: string;
  staging_date: Dayjs;
  expiration_date: Dayjs;
  status: TaskStatus;
  priority: TaskPriority;
  description: string;
  // backend will be changed
  producer: unknown;
  performers: unknown[];
};
