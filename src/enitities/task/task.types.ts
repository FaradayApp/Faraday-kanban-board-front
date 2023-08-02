import { type Dayjs } from 'dayjs';
import { User } from '../user';

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
  performers: User[];
};

export type NewTask = {
  title: string;
  description: string;
  expiration_date: Dayjs;
  status: TaskStatus;
  priority: TaskPriority;
  performers: User[];
};

export type TaskInfo = {
  id: number;
  title: string;
  staging_date: Dayjs;
  expiration_date: Dayjs;
  status: TaskStatus;
  priority: TaskPriority;
  description: string;
  producer: User;
  performers: User[];
};
