import * as t from 'io-ts';

import { type CreateBoard } from '@/enitities/admin';

const CreateBoardDto = t.type({
  title: t.string,
});

type CreateBoardDto = t.TypeOf<typeof CreateBoardDto>;

export function toCreateBoardDto(data: CreateBoard): CreateBoardDto {
  return {
    title: data.title,
  };
}
