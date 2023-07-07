export type TaskPriority = 'hight' | 'medium' | 'low';

export const PRIORITY_WEIGHTS: Record<TaskPriority, number> = {
  hight: 2,
  medium: 1,
  low: 0,
} as const;

export const PRIORITY_OPTIONS: { label: string; value: TaskPriority }[] = [
  { label: 'Высокий', value: 'hight' },
  { label: 'Средний', value: 'medium' },
  { label: 'Низкий', value: 'low' },
];
