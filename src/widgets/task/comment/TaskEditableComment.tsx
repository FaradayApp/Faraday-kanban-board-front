import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './TaskEditableComment.module.scss';
import { type TaskComment, TaskCommentCard, TaskCommentEditCard } from '@/enitities/task';
import { CheckIcon, CloseIcon, EditIcon, TrashIcon } from '@/shared/ui-kit';
import { TaskCommentSchema, taskCommentSchema } from './scheme';

type TaskEditableCommentProps = {
  comment: TaskComment;
  withControls?: boolean;
  deleteComment: (commentId: CommentId) => Promise<unknown>;
  editComment: (commentId: CommentId, message: string) => Promise<unknown>;
};

export const TaskEditableComment = (props: TaskEditableCommentProps) => {
  const { comment, withControls, deleteComment, editComment } = props;
  const [mode, setMode] = useState<'preview' | 'edit'>('preview');

  const { handleSubmit, control, formState } = useForm<TaskCommentSchema>({
    resolver: zodResolver(taskCommentSchema),
  });
  const { errors } = formState;

  const onSubmit: SubmitHandler<TaskCommentSchema> = async (data) => {
    await editComment(comment.id, data.message);
    setMode('preview');
  };

  return mode === 'preview' ? (
    <TaskCommentCard
      comment={comment}
      controls={
        withControls && (
          <>
            <EditIcon onClick={() => setMode('edit')} />
            <TrashIcon onClick={() => deleteComment(comment.id)} />
          </>
        )
      }
    />
  ) : (
    <Controller
      name='message'
      control={control}
      defaultValue={comment.text}
      render={({ field }) => (
        <TaskCommentEditCard
          key={comment.id}
          user={comment.user}
          message={field.value}
          maxLength={600}
          onChange={field.onChange}
          errorMessage={errors.message?.message}
          controls={
            withControls && (
              <>
                <CheckIcon
                  onClick={() => handleSubmit(onSubmit)()}
                  className={styles.taskEditableComment__saveButton}
                />
                <CloseIcon onClick={() => setMode('preview')} />
              </>
            )
          }
        />
      )}
    />
  );
};
