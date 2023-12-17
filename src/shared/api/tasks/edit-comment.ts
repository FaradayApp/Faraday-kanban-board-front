import { request } from '@/shared/http';
import { serialize } from '@/shared/lib/serialize';

export async function editTaskComment(
  boardUuid: BoardUuid,
  taskId: TaskId,
  commentId: CommentId,
  message: string
) {
  const options = { body: serialize({ text: message }) };
  return request.put(`board/${boardUuid}/tasks/${taskId}/comments/${commentId}/`, options);
}
