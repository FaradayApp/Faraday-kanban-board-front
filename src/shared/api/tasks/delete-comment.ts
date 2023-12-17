import { request } from '@/shared/http';

export async function deleteTaskComment(boardUuid: BoardUuid, taskId: TaskId, commentId: CommentId) {
  return request.delete(`board/${boardUuid}/tasks/${taskId}/comments/${commentId}/`);
}
