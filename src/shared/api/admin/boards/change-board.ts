import { ChangeBoard } from '@/enitities/admin';
import { request } from '@/shared/http';
import { serialize } from '@/shared/lib/serialize';
import { toBoard, validateBoardDto, toChangeBoardDto } from './dtos';

export async function changeBoard(data: ChangeBoard, boardId: BoardId) {
  const options = { body: serialize(toChangeBoardDto(data)) };
  const response = await request.patch(`board/${boardId}/`, options).json();
  return toBoard(validateBoardDto(response));
}
