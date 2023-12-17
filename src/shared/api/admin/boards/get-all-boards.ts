import { getAllPages } from '@/shared/http';
import { Board } from '@/enitities/admin';
import { toBoard, validateBoardDto } from './dtos';

export async function getAllBoards() {
  const tasks = await getAllPages<Board>({ endpoint: `board/` });
  return tasks.map(validateBoardDto).map(toBoard);
}
