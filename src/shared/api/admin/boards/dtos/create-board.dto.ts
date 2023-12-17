import { z } from 'zod';

import { type CreateBoard } from '@/enitities/admin';

const CreateBoardDto = z.object({
  title: z.string(),
});

type CreateBoardDto = z.infer<typeof CreateBoardDto>;

export function toCreateBoardDto(data: CreateBoard): CreateBoardDto {
  return {
    title: data.title,
  };
}
