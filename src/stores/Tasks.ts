import { makeAutoObservable } from 'mobx';

import { Task } from './Task';
import { type TaskStatus } from '@/enitities/types';
import { CreateTask, createNewTask, getTasks } from '@/shared/api';

class TasksStore {
  tasks: Record<TaskId, Task> = {};

  constructor() {
    makeAutoObservable(this);
    this.loadTasks();
  }

  async loadTasks() {
    const tasks = await getTasks();
    
    tasks.forEach((task) => {
      this.tasks[task.id] = new Task(task);
    });
  }

  getById(id: TaskId) {
    return this.tasks[id] || null;
  }

  getByStatus(status: TaskStatus) {
    return Object.values(this.tasks).filter((task) => task.data.status === status);
  }

  async addTask(createTask: CreateTask) {
    const createdTask = await createNewTask(createTask);
    this.tasks[createdTask.id] = new Task(createdTask);
  }
}

export const tasksStore = new TasksStore();
