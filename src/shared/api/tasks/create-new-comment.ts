import { request } from "@/shared/http";
import { toTaskComment, validateTaskCommentDto } from "./dtos";
import { serialize } from "@/shared/lib/serialize";

export async function createNewTaskComment(boardId: BoardUuid, taskId: TaskId, comment: string) {
  const options = { body: serialize({ text: comment }) }; 
  const response = await request.post(`board/${boardId}/tasks/${taskId}/comments/`, options).json();
  return toTaskComment(validateTaskCommentDto(response));
}
