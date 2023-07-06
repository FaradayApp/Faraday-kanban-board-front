export type TaskPriority = 'hight' | 'medium' | 'low';

export const PRIORITY_WEIGHTS: Record<TaskPriority, number> = {
  hight: 2,
  medium: 1,
  low: 0,
} as const;
