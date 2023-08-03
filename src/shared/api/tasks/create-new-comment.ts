import { request } from "@/shared/http";
import { toTaskComment, validateTaskCommentDto } from "./dtos/comment.dto";
import { serialize } from "@/shared/lib/serialize";

export async function createNewTaskComment(boardId: string, taskId: string, comment: string) {
  const options = { body: serialize({ text: comment }) }; 
  const response = await request.post(`board/${boardId}/tasks/${taskId}/comments/`, options).json();
  return toTaskComment(validateTaskCommentDto(response));
}
