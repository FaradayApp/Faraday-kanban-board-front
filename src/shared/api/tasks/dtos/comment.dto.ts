import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';

import { BadResponseError } from '@/shared/errors';
import { UserDto } from '../../users';
import { TaskComment } from '@/enitities/task';
import dayjs from 'dayjs';

const TaskCommentDto = t.type({
  id: t.number,
  text: t.string,
  created_at: t.string,
  user: UserDto,
});

type TaskCommentDto = t.TypeOf<typeof TaskCommentDto>;

export function validateTaskCommentDto(data: unknown) {
  const commentDto = TaskCommentDto.decode(data);

  if (isLeft(commentDto)) {
    throw new BadResponseError();
  }

  return commentDto.right;
}

export function toTaskComment(taskDto: TaskCommentDto): TaskComment {
  return {
    id: taskDto.id,
    text: taskDto.text,
    created_at: dayjs(taskDto.created_at),
    user: taskDto.user,
  };
}
