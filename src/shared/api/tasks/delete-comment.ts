import { request } from '@/shared/http';

export async function deleteTaskComment(boardId: string, taskId: string, commentId: number) {
  return request.delete(`board/${boardId}/tasks/${taskId}/comments/${commentId}/`);
}
