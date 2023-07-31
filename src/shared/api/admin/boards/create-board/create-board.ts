import { CreateBoard } from '@/enitities/admin';
import { request } from '@/shared/http';
import { serialize } from '@/shared/lib/serialize';
import { toDto } from './create-board.dto';
import { toBoard, validateBoardDto } from '../board.dto';

export async function createBoard(data: CreateBoard) {
  const options = { body: serialize(toDto(data)) };
  const response = await request.post('board/', options).json();
  return toBoard(validateBoardDto(response));
}
