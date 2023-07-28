import { type TaskPriority, type TaskStatus } from '@/enitities/task';

export function getTaskPriority(id: number): TaskPriority {
  switch (id) {
    case 1:
      return 'HIGH';
    case 2:
      return 'MEDIUM';
    case 3:
      return 'LOW';
    default:
      return '';
  }
}

export function getTaskStatus(id: number): TaskStatus {
  switch (id) {
    case 1:
      return 'BACKLOG';
    case 2:
      return 'TODO';
    case 3:
      return 'IN_PROGRESS';
    case 4:
      return 'DONE';
    case 5:
      return 'ARCHIVE';
    default:
      return '';
  }
}

export function getTaskPriorityId(id: TaskPriority): number {
  switch (id) {
    case 'HIGH':
      return 1;
    case 'MEDIUM':
      return 2;
    case 'LOW':
      return 3;
    default:
      return -1;
  }
}

export function getTaskStatusId(id: TaskStatus): number {
  switch (id) {
    case 'BACKLOG':
      return 1;
    case 'TODO':
      return 2;
    case 'IN_PROGRESS':
      return 3;
    case 'DONE':
      return 4;
    case 'ARCHIVE':
      return 5;
    default:
      return -1;
  }
}
