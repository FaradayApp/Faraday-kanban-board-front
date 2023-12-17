import dayjs from 'dayjs';
import { z } from 'zod';

import { BadResponseError } from '@/shared/errors';
import { type Board } from '@/enitities/admin';

const BoardDto = z.object({
  id: z.number(),
  uuid: z.string().nullable(),
  title: z.string().nullable(),
  created_at: z.string(),
});

type BoardDto = z.infer<typeof BoardDto>;

export function validateBoardDto(data: unknown) {
  const board = BoardDto.safeParse(data);
  if (!board.success) {
    throw new BadResponseError();
  }
  return board.data;
}

export function toBoard(dto: BoardDto): Board {
  return {
    id: dto.id,
    uuid: dto.uuid || '',
    title: dto.title || '',
    created_at: dayjs(dto.created_at),
  };
}
