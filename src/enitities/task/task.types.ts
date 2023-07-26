export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVE';
export type TaskPriority = 'MEDIUM' | 'LOW' | 'HIGH';

export type Task = {
  id: number;
  title: string;
  expiration_date: string;
  status: TaskStatus;
  priority: TaskPriority;
  // backend will be changed
  performers: unknown[];
};
