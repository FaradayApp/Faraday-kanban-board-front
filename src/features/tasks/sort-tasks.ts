import { Task } from '@/enitities/task';

export type SortType = 'date' | 'title' | 'priority';

function byTitle(taskA: Task, taskB: Task) {
  return taskA.title.localeCompare(taskB.title);
}

function byPriority(taskA: Task, taskB: Task) {
  return taskB.priority.weight - taskA.priority.weight;
}

function byDate(taskA: Task, taskB: Task) {
  return taskA.expiration_date.isAfter(taskB.expiration_date) ? 1 : -1;
}

export function getTasksComparator(type: SortType) {
  switch (type) {
    case 'date':
      return byDate;
    case 'title':
      return byTitle;
    case 'priority':
      return byPriority;
    default:
      return byTitle;
  }
}

export function sortTasks(tasks: Task[], type: SortType) {
  return tasks.slice().sort(getTasksComparator(type));
}
