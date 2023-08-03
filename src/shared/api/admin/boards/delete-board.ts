import { request } from '@/shared/http';

export function deleteBoard(id: BoardId) {
  return request.delete(`board/${id}/`);
}
