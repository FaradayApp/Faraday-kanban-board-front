import { z } from 'zod';
import dayjs from 'dayjs';

import { BadResponseError } from '@/shared/errors';
import { TaskComment } from '@/enitities/task';
import { UserDto, toUser } from '../../users';

export const TaskCommentDto = z.object({
  id: z.number(),
  text: z.string(),
  created_at: z.string(),
  user: UserDto,
});

type TaskCommentDto = z.infer<typeof TaskCommentDto>;

export function validateTaskCommentDto(data: unknown) {
  const commentDto = TaskCommentDto.safeParse(data);

  if (!commentDto.success) {
    throw new BadResponseError();
  }

  return commentDto.data;
}

export function toTaskComment(taskDto: TaskCommentDto): TaskComment {
  return {
    id: taskDto.id,
    text: taskDto.text,
    created_at: dayjs(taskDto.created_at),
    user: toUser(taskDto.user),
  };
}
