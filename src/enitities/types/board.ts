import { BoardTask, TaskStatus } from ".";

export type BoardColumn = {
  id: string;
  status: TaskStatus;
  tasks: BoardTask[];
}
