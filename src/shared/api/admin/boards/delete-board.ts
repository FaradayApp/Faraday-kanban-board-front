import { request } from '@/shared/http';

export function deleteBoard(boardId: number | string) {
  return request.delete(`board/${boardId}/`);
}
