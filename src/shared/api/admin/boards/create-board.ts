import { CreateBoard } from '@/enitities/admin';
import { request } from '@/shared/http';
import { serialize } from '@/shared/lib/serialize';
import { toBoard, validateBoardDto, toCreateBoardDto } from './dtos';

export async function createBoard(data: CreateBoard) {
  const options = { body: serialize(toCreateBoardDto(data)) };
  const response = await request.post('board/', options).json();
  return toBoard(validateBoardDto(response));
}
