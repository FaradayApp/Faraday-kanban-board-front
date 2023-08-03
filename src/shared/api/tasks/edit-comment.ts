import { request } from '@/shared/http';
import { serialize } from '@/shared/lib/serialize';

export async function editTaskComment(
  boardId: string,
  taskId: string,
  commentId: number,
  message: string
) {
  const options = { body: serialize({ text: message }) };
  return request.put(`board/${boardId}/tasks/${taskId}/comments/${commentId}/`, options);
}
