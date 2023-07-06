import { TaskPriority, TaskStatus } from '.';
import { User } from './user';

export type BoardTask = {
  id: string;
  name: string;

  workers: User[];
  priority: TaskPriority;
  status: TaskStatus;
  description: string;

  dates: {
    start: string;
    end: string;
  };

  producer: User;
  comments: unknown[];
};
