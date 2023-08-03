import { request } from '@/shared/http';
import { toTaskComment, validateTaskCommentDto } from './dtos';
import { serialize } from '@/shared/lib/serialize';

export async function createNewTaskComment(boardUuid: BoardUuid, taskId: TaskId, comment: string) {
  const options = { body: serialize({ text: comment }) };
  const response = await request
    .post(`board/${boardUuid}/tasks/${taskId}/comments/`, options)
    .json();
  return toTaskComment(validateTaskCommentDto(response));
}
