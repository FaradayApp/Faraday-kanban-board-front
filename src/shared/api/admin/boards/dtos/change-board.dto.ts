import { z } from 'zod';

import { type ChangeBoard } from '@/enitities/admin';

const ChangeBoardDto = z.object({
  title: z.string(),
});

type ChangeBoardDto = z.infer<typeof ChangeBoardDto>;

export function toChangeBoardDto(data: ChangeBoard): ChangeBoardDto {
  return {
    title: data.title,
  };
}
