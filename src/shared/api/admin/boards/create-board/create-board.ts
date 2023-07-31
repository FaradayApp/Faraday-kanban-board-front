import { CreateBoard } from '@/enitities/admin';
import { request } from '@/shared/http';
import { serialize } from '@/shared/lib/serialize';
import { toDto } from './create-board.dto';

export function createBoard(data: CreateBoard) {
  const options = { body: serialize(toDto(data)) };
  return request.post('board/', options);
}
