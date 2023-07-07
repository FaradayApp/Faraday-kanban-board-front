import { mockTasks } from './__mocks__';

export async function getTasks() {
  return Object.values(mockTasks);
}
