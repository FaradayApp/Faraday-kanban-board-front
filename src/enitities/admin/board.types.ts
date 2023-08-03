import { type Dayjs } from 'dayjs';

export type Board = {
  id: BoardId;
  uuid: BoardUuid;

  title: string;
  created_at: Dayjs;
};

export type CreateBoard = {
  title: string;
};
