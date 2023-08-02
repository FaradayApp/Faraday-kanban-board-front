import dayjs from 'dayjs';
import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';

import { BadResponseError } from '@/shared/errors';
import { type Board } from '@/enitities/admin';

const BoardDto = t.type({
  id: t.number,
  uuid: t.union([t.string, t.null]),
  title: t.union([t.string, t.null]),
  created_at: t.string,
});

type BoardDto = t.TypeOf<typeof BoardDto>;

export function validateBoardDto(data: unknown) {
  const board = BoardDto.decode(data);
  if (isLeft(board)) {
    throw new BadResponseError();
  }
  return board.right;
}

export function toBoard(dto: BoardDto): Board {
  return {
    id: dto.id,
    uuid: dto.uuid || '',
    title: dto.title || '',
    created_at: dayjs(dto.created_at),
  };
}
