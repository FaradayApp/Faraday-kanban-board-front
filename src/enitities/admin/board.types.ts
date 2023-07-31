import { type Dayjs } from 'dayjs';

export type Board = {
  id: number;
  uuid: string;
  title: string;
  created_at: Dayjs;
};
