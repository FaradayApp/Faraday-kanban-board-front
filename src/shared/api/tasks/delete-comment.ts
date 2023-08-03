import { request } from '@/shared/http';

export async function deleteTaskComment(boardId: BoardUuid, taskId: TaskId, commentId: CommentId) {
  return request.delete(`board/${boardId}/tasks/${taskId}/comments/${commentId}/`);
}
