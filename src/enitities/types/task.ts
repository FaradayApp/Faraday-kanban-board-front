import { TaskPriority, TaskStatus } from '.';

export type BoardTask = {
  id: TaskId;
  name: string;
  status: TaskStatus;
  priority: TaskPriority;
  description: string;
  workers: UserId[];
  producer: UserId;
  comments: unknown[];
  dates: {
    start: string;
    end: string;
  };
};
