import * as t from 'io-ts';

import { type ChangeBoard } from '@/enitities/admin';

const ChangeBoardDto = t.type({
  title: t.string,
});

type ChangeBoardDto = t.TypeOf<typeof ChangeBoardDto>;

export function toChangeBoardDto(data: ChangeBoard): ChangeBoardDto {
  return {
    title: data.title,
  };
}
