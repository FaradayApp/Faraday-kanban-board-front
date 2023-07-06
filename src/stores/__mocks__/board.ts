import { BoardColumn, TaskStatus } from '@/enitities/types';
import { mockTasks } from '.';

const pickTasksByStatus = (status: TaskStatus) => {
  return Object.values(mockTasks).filter((task) => task.status === status) || [];
};

export const mockBoard: Record<string, BoardColumn> = {
  '1': {
    id: '1',
    status: 'BACKLOG',
    tasks: pickTasksByStatus('BACKLOG'),
  },
  '2': {
    id: '2',
    status: 'TODO',
    tasks: pickTasksByStatus('TODO'),
  },
  '3': {
    id: '3',
    status: 'DONE',
    tasks: pickTasksByStatus('DONE'),
  },
};
