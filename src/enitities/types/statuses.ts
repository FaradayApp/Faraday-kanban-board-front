export type TaskStatus = 'TODO' | 'BACKLOG' | 'DONE';

export const STATUS_OPTIONS: { label: string; value: TaskStatus }[] = [
  { label: 'To Do', value: 'TODO' },
  { label: 'Backlog', value: 'BACKLOG' },
  { label: 'Done', value: 'DONE' },
];

export const getStatusValue = (value: TaskStatus | null) => {
  return STATUS_OPTIONS.find((option) => option.value === value) || null;
};
